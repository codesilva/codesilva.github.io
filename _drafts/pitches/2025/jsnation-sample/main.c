#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>
#include <unistd.h>

int64_t counter = 0;
int timer_count = 0;

void wait_for_a_while(uv_idle_t* handle) {
  counter++;

  if (counter >= 10e4) {
    printf("Stop idling\n");

    uv_idle_stop(handle);
  }
}

void work_cb(uv_work_t* req) {
  printf("work_cb || counter=%lld;\n", counter);
  sleep(2);
  printf("work_cb executed in the thread pool\n");
}

void after_work_cb(uv_work_t* req, int status) {
  printf("after_work_cb || status=%d;\n", status);
}

void on_timeout(uv_timer_t* handle) {
  printf("on_timeout: %d\n", ++timer_count);

  if (timer_count % 10 == 0) {
    printf("Enqueue work for threadpool\n");

    uv_queue_work(handle->loop, (uv_work_t *) handle->data, work_cb, after_work_cb);
  }

  /* uv_timer_stop(handle); */
  /* uv_close((uv_handle_t*)handle, NULL); */ 
}

int main() {
  uv_timer_t *timer_req = (uv_timer_t *)malloc(sizeof(uv_timer_t));
  uv_loop_t *loop = uv_default_loop();
  uv_idle_t idler;
  uv_work_t *worker = (uv_work_t *)malloc(sizeof(uv_work_t));

  // TODO this can be a pointer to a struct that contains the loop and the timer_req
  timer_req->data = (void *)worker;

  uv_idle_init(loop, &idler);
  uv_idle_start(&idler, wait_for_a_while);

  printf("Idling...\n");

  uv_timer_init(loop, timer_req);
  uv_timer_start(timer_req, on_timeout, 1000, 1000);

  uv_run(loop, UV_RUN_DEFAULT); 

  uv_loop_close(loop);

  return 0;
}

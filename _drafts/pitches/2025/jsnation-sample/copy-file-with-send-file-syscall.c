// https://stackoverflow.com/questions/8252698/sys-sendfile-h-not-found-gcc
/* #include <sys/sendfile.h> */

#include <fcntl.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/uio.h>

int main() {

  off_t len;
  int source_fd = open("./source.txt", O_RDONLY);
  int dest_fd = open("./dest.txt", O_WRONLY | O_CREAT, 0644);

  //  int sendfile(int fd, int s, off_t offset, off_t *len, struct sf_hdtr *hdtr, int flags);
  //https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/sendfile.2.html
  int result = sendfile(source_fd, dest_fd, 0, &len, 0, 0);

  if (result == -1) {
    perror("sendfile");
    return 1;
  }

  printf("Sent %lld bytes\n", len);

  return 0;
}

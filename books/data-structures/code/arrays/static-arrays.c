#include <stdio.h>
#include <stdlib.h>

void conventional_array_definition(int *arr);
void unconventional_way();
int get_at(int *arr, int index);

int main() {
  int items[] = {9, 10};

  conventional_array_definition(items);

  printf("\n--------\n\n");

  unconventional_way();

  return 0;
}

void conventional_array_definition(int *address) {
  printf("o array items inicia em: %p\n", address);
  printf("o segundo valor está em: %p\n", address + 1);

  printf("Valor do primeiro item: %d\n", *(address));
  printf("Valor do segundo item: %d\n", *(address + 1));
}

int get_at(int *address, int index) { return *(address + index); }

void unconventional_way() {
  int *ptr;
  int size = 5;
  int total_bytes = size * sizeof(int);

  ptr = (int *)malloc(total_bytes);

  printf("%d bytes allocated\n", total_bytes);

  for (int i = 0; i < size; i++) {
    printf("O índice %d do array inicia em: %p\n", i, &ptr[i]);
  }

  free(ptr);
}


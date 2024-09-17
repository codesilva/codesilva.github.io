#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MEMORY_SIZE (0x80000000 - 0x04000000) // Size of memory to simulate
#define INSTRUCTION_SIZE 4 // Size of a MIPS instruction in bytes
#define MAX_INSTRUCTIONS                                                       \
  (MEMORY_SIZE / INSTRUCTION_SIZE) // Maximum number of instructions
#define TEXT_SEGMENT 0x04000000
#define DATA_SEGMENT 0x10010000

typedef struct {
  unsigned char opcode;
  unsigned char rs;
  unsigned char rt;
  unsigned long imm;
} ITypeInstruction;

typedef unsigned char *t_memory;

void set_memory_at(unsigned char *memory, unsigned int address,
                   unsigned char value) {
  memory[address - TEXT_SEGMENT] = value;
}

unsigned char get_memory_at(unsigned char *memory, unsigned int address) {
  return memory[address - TEXT_SEGMENT]; // memory[address];
}

void set_register(unsigned char *registers, int reg, int value) {
  *(int *)(registers + reg * 4) = value;
}

void print_memory(unsigned char *memory, int start, int end) {
  unsigned int b;
  for (int i = start; i < end; i++) {
    b = get_memory_at(memory, i);
    printf("Memory at 0x%02x = %02x (%c)\n", i, b, b);
  }
}

void print_registers(unsigned char *registers) {
  for (int i = 0; i < 32; i++) {
    printf("$%d = %02x\n", i, *(int *)(registers + i * 4));
  }
}

void print_register(unsigned char *registers, int reg) {
  printf("Register $%d = %02x\n", reg, *(int *)(registers + reg * 4));
}

unsigned int get_register_value(unsigned char *registers, int reg) {
  return *(int *)(registers + reg * 4);
}

unsigned char *initialize_registers() {
  unsigned char *registers = (unsigned char *)malloc(32 * 4);

  for (int i = 0; i < 32; i++) {
    set_register(registers, i, 0);
  }

  return registers;
}

unsigned char get_nth_byte(int n, unsigned int instruction) {
  unsigned char result = (instruction >> (n * 8)) & 0x000000ff;

  return result;
}

void print_instructions(ITypeInstruction *instruction) {
  printf("Opcode: %02x\n", instruction->opcode);
  printf("rs: %02x\n", instruction->rs);
  printf("rt: %02x\n", instruction->rt);
  printf("imm: %02lx\n", instruction->imm);
}

void decode_instruction(unsigned char *memory_slice,
                        ITypeInstruction *instruction) {

  // getting the 6 most significant bits of the first byte
  unsigned char opcode = (*memory_slice >> 2) & 0xff;

  instruction->opcode = opcode;

  unsigned char second_byte = *(memory_slice + 1);
  unsigned char third_byte = *(memory_slice + 2);
  unsigned char fourth_byte = *(memory_slice + 3);

  // getting the 2 least significant bits of the first byte
  instruction->rs = (*memory_slice & 0x03) & 0xff;

  // getting the 3 most significant bits of the second byte
  instruction->rs = (second_byte >> 5) | instruction->rs;
  instruction->rt = second_byte & 0x1f; // getting the 5 least significant bits
  instruction->imm = (third_byte << 8) | fourth_byte;

  if (opcode == 0 && instruction->imm != 0x0c) {
    printf("R-Type intructions are not supported!!\n");
    exit(EXIT_FAILURE);
    return;
  }

  if (opcode == 2 || opcode == 3) {
    printf("J-Type intructions are not supported!!\n");
    exit(EXIT_FAILURE);
    return;
  }
}

void execute_print_syscall(int start_address, unsigned char *memory) {
  int n_chars_to_print = 10;
  unsigned char *text = malloc(sizeof(char) * n_chars_to_print);
  int count = 0;

  unsigned char c = get_memory_at(memory, start_address);

  do {
    text[count++] = c;
    c = get_memory_at(memory, ++start_address);

    if (count >= n_chars_to_print) {
      text = realloc(text, sizeof(char) * (n_chars_to_print *= 2));
    }
  } while (c != '\0' && c != 0);

  text[count++] = '\0';

  if (count < n_chars_to_print) {
    text = realloc(text, sizeof(char) * count);
  }

  printf("%s", text);

  free(text);
}

void execute_syscall(unsigned char *registers, unsigned char *memory,
                     unsigned char v0) {
  switch (v0) {
  case 0x0a:
    exit(EXIT_SUCCESS);
  case 0x04: {
    int data_address = get_register_value(registers, 4);

    execute_print_syscall(data_address, memory);
  } break;
  default:
    printf("Unknown syscall: %02x\n", v0);
    exit(EXIT_FAILURE);
  }
}

void execute_instruction(unsigned char *memory, unsigned char *registers,
                         ITypeInstruction *instruction) {
  unsigned char opcode = instruction->opcode;
  unsigned char rs = instruction->rs;
  unsigned char rt = instruction->rt;
  unsigned long imm = instruction->imm;

  switch (opcode) {
  case 0x00: // syscall
    if (imm == 0x0c) {
      execute_syscall(registers, memory, get_register_value(registers, 2));
    }
    break;
  case 0x09: // addiu
  {
    int rs_value = get_register_value(registers, rs);
    set_register(registers, rt, rs_value + imm);
  } break;
  case 0x0c: // andi
    set_register(registers, rt, *(int *)(registers + rs) & imm);
    break;
  case 0x0f: // lui
    set_register(registers, rt, imm << 16);
    break;
  case 0x0d: // ori
  {
    int rs_value = get_register_value(registers, rs);

    set_register(registers, rt, rs_value | imm);
  } break;
  case 0x23: // lw
    set_register(registers, rt,
                 *(int *)(memory + *(int *)(registers + rs) + imm));
    break;
  case 0x2b: // sw
    *(int *)(memory + *(int *)(registers + rs) + imm) =
        *(int *)(registers + rt);
    break;
  default:
    printf("Unknown I-type instruction: %02x\n", opcode);
    exit(EXIT_FAILURE);
  }
}

unsigned char *fetch_instruction(unsigned char *memory, unsigned int *pc) {
  unsigned int index = *pc - TEXT_SEGMENT;
  unsigned char *instruction = (memory + index);

  *pc += INSTRUCTION_SIZE;

  return instruction;
}

void add_instructions(unsigned char *memory, int *instructions,
                      int total_instructions) {
  unsigned int memory_addr = TEXT_SEGMENT;

  for (int i = 0; i < total_instructions; i++) {
    unsigned int instruction = instructions[i];

    unsigned int first_byte = get_nth_byte(3, instruction);
    unsigned int second_byte = get_nth_byte(2, instruction);
    unsigned int third_byte = get_nth_byte(1, instruction);
    unsigned int fourth_byte = get_nth_byte(0, instruction);

    set_memory_at(memory, memory_addr++, first_byte);
    set_memory_at(memory, memory_addr++, second_byte);
    set_memory_at(memory, memory_addr++, third_byte);
    set_memory_at(memory, memory_addr++, fourth_byte);
  }
}

unsigned int add_asciiz_to_memory(unsigned char *memory, unsigned int address,
                                  char *string) {
  int i = 0;
  while (string[i] != '\0') {
    // TODO: We can probably use memcpy here
    set_memory_at(memory, address + i, string[i]);
    i++;
  }

  set_memory_at(memory, address + i++, '\0');

  return address + i;
}

void run(unsigned char *memory, unsigned char *registers) {
  ITypeInstruction *instruction = malloc(sizeof(ITypeInstruction));

  int num_instructions = 6;
  int my_program[6] = {
      0x24020004, // addiu $v0, $zero, 4
      0x3c011001, // lui $1, 0x00001001
      0x34240000, // ori $4, $1, 0x00000000
      0x0000000c, // syscall
      0x2402000a, // addiu $v0, $zero, 10
      0x0000000c, // syscall
  };

  unsigned int pc = TEXT_SEGMENT;

  add_instructions(memory, my_program, num_instructions);
  unsigned int addr = add_asciiz_to_memory(memory, DATA_SEGMENT,
                       "Hi, Carlota Sounds and JV!"
                       " This is MIPS machine code baby!\n");
  addr =
      add_asciiz_to_memory(memory, addr, "I love this\n");

  int current_instruction = 0;

  my_program[2] = 0x3424003c; // ori $4, $1, 0x0000003c
                              // endereco da outra string
  add_instructions(memory, my_program, num_instructions);

  /* printf("Code segment:\n"); */
  /* print_memory(memory, pc, pc + num_instructions * INSTRUCTION_SIZE); */

  /* printf("\nData segment:\n"); */
  /* print_memory(memory, DATA_SEGMENT, addr); */

  while (current_instruction < num_instructions) {
    // Fetch instruction
    unsigned char *instruction_byte_sequence = fetch_instruction(memory, &pc);

    // Decode instruction
    decode_instruction(instruction_byte_sequence, instruction);

    // Execute instruction
    execute_instruction(memory, registers, instruction);

    current_instruction++;
  }
}

int main() {
  unsigned char *memory = (unsigned char *)malloc(MEMORY_SIZE);
  unsigned char *registers = initialize_registers();

  run(memory, registers);

  return 0;
}

/* puts("\n"); */

/* printf("Got instruction 0x%02x%02x%02x%02x\nStart decoding...\n", */
/*        *instruction_byte_sequence, instruction_byte_sequence[1], */
/*        instruction_byte_sequence[2], instruction_byte_sequence[3]); */

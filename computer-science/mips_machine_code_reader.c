#include <stdio.h>
#include <stdlib.h>

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

void set_register(unsigned char *registers, int reg, int value) {
  *(int *)(registers + reg * 4) = value;
}

void print_registers(unsigned char *registers) {
  for (int i = 0; i < 32; i++) {
    printf("$%d = %02x\n", i, *(int *)(registers + i * 4));
  }
}

void print_register(unsigned char *registers, int reg) {
  printf("Register $%d = %02x\n", reg, *(int *)(registers + reg * 4));
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

  if (opcode == 0) {
    if (instruction->imm == 0x0c) {
      printf("Syscall instruction\n");
    } else {
      printf("R-Type intructions are not supported!!\n");
      exit(EXIT_FAILURE);
      return;
    }
  }

  if (opcode == 2 || opcode == 3) {
    printf("J-Type intructions are not supported!!\n");
    exit(EXIT_FAILURE);
    return;
  }
}

void execute_instruction(unsigned char *memory, unsigned char *registers,
                         ITypeInstruction *instruction) {
  unsigned char opcode = instruction->opcode;
  unsigned char rs = instruction->rs;
  unsigned char rt = instruction->rt;
  unsigned long imm = instruction->imm;

  switch (opcode) {
  case 0x09: // addiu
    set_register(registers, rt, *(int *)(registers + rs) + imm);
    break;
  case 0x0c: // andi
    set_register(registers, rt, *(int *)(registers + rs) & imm);
    break;
  case 0x0f: // lui
    set_register(registers, rt, imm << 16);
    break;
  case 0x0d: // ori
    set_register(registers, rt, *(int *)(registers + rs) | imm);
    break;
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
  unsigned char *instruction = (memory + *pc);

  *pc += INSTRUCTION_SIZE;

  return instruction;
}

void add_instructions(unsigned char *memory, int *instructions,
                      int total_instructions) {
  unsigned int memory_addr = TEXT_SEGMENT;

  for (int i = 0; i < total_instructions; i++) {
    unsigned int instruction = instructions[i];
    printf("Adding instruction 0x%02x to memory at 0x%02x\n", instruction,
           memory_addr);

    // starting by most significant bits

    unsigned int first_byte = get_nth_byte(3, instruction);
    unsigned int second_byte = get_nth_byte(2, instruction);
    unsigned int third_byte = get_nth_byte(1, instruction);
    unsigned int fourth_byte = get_nth_byte(0, instruction);

    memory[memory_addr++] = first_byte;
    memory[memory_addr++] = second_byte;
    memory[memory_addr++] = third_byte;
    memory[memory_addr++] = fourth_byte;
  }
}

int main() {
  unsigned char *memory = (unsigned char *)malloc(MEMORY_SIZE);

  // 32 registers of 32 bits each
  unsigned char *registers = initialize_registers();

  /* set_register(registers, 1, 0xff00ff00); // $v0 = DATA_SEGMENT */

  /* int instructions[4] = { */
  /*     0x24020004, // addiu $v0, $zero, 4 */
  /*     0x3c011101, // lui $1, 0x00001001 */
  /*     0x34240000, // ori $4, $1, 0x00000000 */
  /*     0x0000000c  // syscall */
  /* }; */

  int instructions[2] = {
      0x2402000a, // addiu $v0, $zero, 10
      0x0000000c  // syscall
  };

  unsigned int pc = TEXT_SEGMENT;

  add_instructions(memory, instructions, 2);

  ITypeInstruction *instruction = malloc(sizeof(ITypeInstruction));

  printf("\n------- Let's start the simulation -------\n\n");

  printf("Fetching instruction at 0x%02x\n", pc);

  // Fetch instruction
  unsigned char *instruction_byte_sequence = fetch_instruction(memory, &pc);

  puts("\n");

  printf("Got instruction 0x%02x%02x%02x%02x\nStart decoding...\n",
         *instruction_byte_sequence, instruction_byte_sequence[1],
         instruction_byte_sequence[2], instruction_byte_sequence[3]);

  // Decode instruction
  decode_instruction(instruction_byte_sequence, instruction);

  puts("\n");
  print_instructions(instruction);
  puts("\n");

  printf("Executing instruction...\n");

  // Execute instruction
  execute_instruction(memory, registers, instruction);
  printf("Done\n\n");

  printf("Printing registers...\n");

  print_registers(registers);
}

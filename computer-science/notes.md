# MIPS

https://phoenix.goucher.edu/~kelliher/f2009/cs220/mipsir.html

Para a minha demonstração gostaria de poder escrever programas MIPS direto em código de máquina. Como MARS não permite
isso implementarei um simulador simples em C.

Nosso programa lida com hello world então o que precisamos é decodificar as instruções de um programa MIPS que imprime hello world.

```bash
my_mips_simulator hello_world.bin --data data.bin
```

## Básico de MIPS

A arq do mips conta com três tipos de instruções:

- R-Type
- I-Type
- J-Type

### R-Type

```asm
add $t0, $t1, $t2
```

| opcode | rs | rt | rd | shamt | funct |
|--------|----|----|----|-------|-------|
| 6 bits | 5  | 5  | 5  | 5     | 6     |

### I-Type

```asm
addi $t0, $t1, 10
```

| opcode | rs | rt | immediate |
|--------|----|----|-----------|
| 6 bits | 5  | 5  | 16        |

### J-Type

```asm
j 0x00400000
```

| opcode | address |
|--------|---------|
| 6 bits | 26      |

### Instruções

| Instrução | Opcode | Funct |
|-----------|--------|-------|
| add       | 0x00   | 0x20  |
| addi      | 0x08   |       |
| j         | 0x02   |       |
| lw        | 0x23   |       |
| sw        | 0x2B   |       |
| beq       | 0x04   |       |
| bne       | 0x05   |       |
| syscall   | 0x00   | 0x0C  |

### Syscalls

| V0 | A0 | A1 | A2 | A3 | Syscall |
|----|----|----|----|----|---------|
| 2  | $a0 | $a1 | $a2 | $a3 | Print integer |
| 4  | $a0 | $a1 | $a2 | $a3 | Print string |
| 5  | $a0 | $a1 | $a2 | $a3 | Read integer |
| 8  | $a0 | $a1 | $a2 | $a3 | Read string |
| 10 | $a0 | $a1 | $a2 | $a3 | Exit |

<img src="https://www2.it.uu.se/education/course/homepage/os/vt18/images/mips/MIPS_detailed_memory_layout.png" />

## O Programa

A ideia é então ler um arquivo binário e ler de 4 em 4 bytes e interpretar como instruções MIPS. Além disso deve ler
o arquivo de dados e carregar na memória, que será um array que mapeia endereços de memória para valores.

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#define MEM_SIZE 1024

typedef struct {
    uint32_t mem[MEM_SIZE];
    uint32_t pc;
    uint32_t reg[32];
} mips_t;

void load_program(mips_t *mips, FILE *file) {
    uint32_t instr;
    int i = 0;
    while (fread(&instr, sizeof(uint32_t), 1, file)) {
        mips->mem[i++] = instr;
    }
}

void load_data(mips_t *mips, FILE *file) {
    uint32_t data;
    int i = 0;
    while (fread(&data, sizeof(uint32_t), 1, file)) {
        mips->mem[MEM_SIZE - i++] = data;
    }
}

void run(mips_t *mips) {
    while (1) {
        uint32_t instr = mips->mem[mips->pc];
        uint32_t opcode = instr >> 26;
        uint32_t rs = (instr >> 21) & 0x1F;
        uint32_t rt = (instr >> 16) & 0x1F;
        uint32_t rd = (instr >> 11) & 0x1F;
        uint32_t shamt = (instr >> 6) & 0x1F;
        uint32_t funct = instr & 0x3F;
        uint32_t immediate = instr & 0xFFFF;
        uint32_t address = instr & 0x3FFFFFF;

        switch (opcode) {
            case 0x00:
                switch (funct) {
                    case 0x20:
                        mips->reg[rd] = mips->reg[rs] + mips->reg[rt];
                        break;
                }
                break;
            case 0x08:
                mips->reg[rt] = mips->reg[rs] + immediate;
                break;
            case 0x02:
                mips->pc = address;
                break;
            case 0x23:
                mips->reg[rt] = mips->mem[mips->reg[rs] + immediate];
                break;
            case 0x2B:
                mips->mem[mips->reg[rs] + immediate] = mips->reg[rt];
                break;
            case 0x04:
                if (mips->reg[rs] == mips->reg[rt]) {
                    mips->pc += immediate;
                }
                break;
            case 0x05:
                if (mips->reg[rs] != mips->reg[rt]) {
                    mips->pc += immediate;
                }
                break;
            case 0x00:
                switch (funct) {
                    case 0x0C:
                        switch (mips->reg[2]) {
                            case 1:
                                printf("%d\n", mips->reg[4]);
                                break;
                            case 4:
                                printf("%s\n", (char *) &mips->mem[mips->reg[4]]);
                                break;
                            case 5:
                                scanf("%d", &mips->reg[2]);
                                break;
                                case 8:
                                scanf("%s", (char *) &mips->mem[mips->reg[4]]);
                                break;
                                case 10:
                                exit(0);
                                break;
                                }
                                break;
                                }
                                break;
                                }
                                mips->pc++;
                                }
                                }

int main(int argc, char **argv) {
    if (argc < 2) {
        printf("Usage: %s <program> <data>\n", argv[0]);
        return 1;
    }

    FILE *program = fopen(argv[1], "rb");
    FILE *data = fopen(argv[2], "rb");

    mips_t mips = {0};
    load_program(&mips, program);
    load_data(&mips, data);

    run(&mips);

    fclose(program);
    fclose(data);

    return 0;
}
```



https://en.wikibooks.org/wiki/MIPS_Assembly/Instruction_Formats
https://www.cs.kzoo.edu/cs230/Resources/MIPS/MachineXL/InstructionFormats.html
https://courses.missouristate.edu/kenvollmar/mars/help/syscallhelp.html
https://minnie.tuhs.org/CompArch/Resources/mips_quick_tutorial.html
https://mathcs.holycross.edu/~csci226/MIPS/summaryHO.pdf
[Machine code hello world](https://www.youtube.com/watch?v=aPHAxFAwC7g)

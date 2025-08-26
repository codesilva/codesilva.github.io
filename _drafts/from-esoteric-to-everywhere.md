---
layout: post
title: 'From Esoteric to Everywhere: Running Brainfuck on Billions of Devices'
date: 2025-07-22
lang: pt-BR
category: ['compiladores']
---

While studying about low-level programming and the fundamentals of computation, I stumbled upon Brainfuck, an esoteric
programming language. It has only eight commands and is very similar to the Turing machine model. Intrigued by its
simplicity and power, I decided to explore it further.

Even simple things can be challenging. My hello world program in Brainfuck was to print "7" to the console. I got that
sample from [wikipedia](https://en.wikipedia.org/wiki/Brainfuck). A simple program, but it was rewarding to see it
working and to understand how it operates.

After some experimentation, I thought about a good toy project: what if I compiled Brainfuck to JVM?

# Executing Brainfuck Code

The first thing needed it to be able to execute Brainfuck code. Writing an interpreter for Brainfuck will consume you
a few hours, but it is a good exercise to understand how the language works.

Brainfuck operates on an array of memory cells, each initially set to zero. There is a data pointer that starts at the
first cell. The language consists of eight commands, each represented by a single character. Any other characters are
ignored.

The commands are as follows:

```
>  Increment the data pointer (to point to the next cell to the right).
<  Decrement the data pointer (to point to the next cell to the left).
+  Increment (increase by one) the byte at the data pointer.
-  Decrement (decrease by one) the byte at the data pointer.
.  Output the byte at the data pointer as a character.
,  Accept one byte of input, storing its value in the byte at the data pointer.
[  If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command,
   jump it forward to the command after the matching ] command.
]  If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command,
   jump it back to the command after the matching [ command.
```

## Parsing Brainfuck Code

Parsing Brainfuck code is straightforward. Since each command is a single character, we can simply iterate through the
input string and build a list of commands, ignoring any non-command characters.

The not so-trivial part is handling loops. We need to keep track of the positions of the `[` and `]` commands to create
jump instructions. That's why we need to resist the temptation to execute the code while parsing it. It's much simpler
to have a list of instructions to execute later.

```javascript
function parseBrainfuck(code) {
  const instructions = [];
  const loopStack = [];

  for (let i = 0; i < code.length; ++i) {
    const c = code[i];

    switch (c) {
      case ',':
        instructions.push({ type: 'input' });
        break;
      case '.':
        instructions.push({ type: 'output' });
        break;
      case '+':
        instructions.push({ type: 'increment' });
        break;
      case '-':
        instructions.push({ type: 'decrement' });
        break;
      case '>':
        instructions.push({ type: 'forward' });
        break;
      case '<':
        instructions.push({ type: 'backward' });
        break;
      case '[':
        loopStack.push([c, instructions.length]);
        instructions.push({ type: 'begin_loop', jmp: -1 });
        break;
      case ']':
        const [char, pos] = loopStack.pop();
        if (char !== '[') {
          throw new Error('Unbalanced brackets');
        }

        instructions[pos].jmp = instructions.length + 1;
        instructions.push({ type: 'end_loop', jmp: pos + 1 });
        break;
    }
  }

  if (loopStack.length > 0) {
    throw new Error('Unbalanced brackets');
  }

  instructions.push({ type: 'halt' })

  return instructions;
}
```

This parser reads the Brainfuck code character by character, creating an array of instruction objects. Each object has a
type property indicating the command type. For loops, it uses a stack to keep track of the positions of the `[` commands, allowing it to
set the correct jump targets for both the `[` and `]` commands.

An stack is used to ensure that the brackets are balanced. If a closing bracket `]` is encountered without a matching
opening bracket `[`, an error is thrown.

It also appends a `halt` instruction at the end to signify the end of the program.

```bash
parseBrainfuck('+++[-]');
```

This results in the following array of instructions:

```bash
[
    { type: "increment" },            # 0
    { type: "increment" },            # 1
    { type: "increment" },            # 2
    { type: "begin_loop", "jmp": 6 }, # 3
    { type: "decrement" },            # 4
    { type: "end_loop", "jmp": 3 },   # 5
    { type: "halt" }                  # 6
]
```

## Executing

Our life is now much simpler. With the list of instructions ready, we can execute them sequentially. We will maintain
a data array (the memory cells) and a data pointer to keep track of the current cell.

```javascript
function brainfuckCPU(instructions) {
  const memory = new Uint8Array(30000);
  let pointer = 0;
  let pc = 0;

  while (true) {
    // fetch
    const instruction = instructions[pc];
    console.log(instruction, pointer, memory[pointer]);

    // decode and execute
    switch (instruction.type) {
      case 'output':
        process.stdout.write(String.fromCharCode(memory[pointer]));
        process.stdout.write('\n');
        break;
      case 'input':
        memory[pointer] = readByte();
        break;
      case 'increment':
        memory[pointer]++;
        break;
      case 'decrement':
        memory[pointer]--;
        break;
      case 'forward':
        pointer++;
        break;
      case 'backward':
        pointer--;
        break;
      case 'begin_loop':
        if (memory[pointer] === 0) {
          pc = instruction.jmp;
          continue;
        }
        break;
      case 'end_loop':
        if (memory[pointer] !== 0) {
          pc = instruction.jmp;
          continue;
        }
        break;
      case 'halt':
        return;
    }

    pc++;
  }
}
```

This is a tiny Virtual Machine that can execute our designed instruction set. Just like in a real CPU, we have a program counter
(`pc`) that points to the current instruction to execute. We fetch the instruction, decode it, and execute it in a loop
until we reach the `halt` instruction, like in the Von Neumann architecture.

This is great because to handle loops, we just need to jump the program counter to the appropriate instruction based on
the value at the current memory cell.

The auxiliary function `readByte` is used to read a single byte from standard input. It uses Node.js's `fs` module to
read synchronously from the standard input.

```javascript
function readByte() {
  let buffer = Buffer.alloc(3);
  fs.readSync(0, buffer, 0, 3);
  buffer = buffer.filter(byte => byte !== 0 && byte !== 10 && byte !== 13);

  let data = buffer.toString('utf8');
  if (isNaN(data)) return data.charCodeAt(0);

  data = Number(data);

  if (data < 0 || data > 255) {
    throw new Error('Invalid byte');
  }

  return data;
}
```

# Optmizations

---


I was always curious about how the text I write on an editor turns into something a computer can execute. In my first
classes of programming, learning Java, I asked my teacher how programming languages are created. He told me that to
create a programming language, you need to create a compiler. I'm pretty sure I asked how to write a compiler, but
I don't remember his answer and where that conversation went.

Growing as a programmer, I kept thinking about how programs are interpreted and executed by the computer. For that I had
to go into the rabbit hole of low-level programming and how processors work.

One cannot study this topic without learning about Alan Turing and his work on computability and the today so-called
Turing machine.

The Turing machine is a theoretical model of computation that consists of an infinite tape divided into cells, a tape
head that can read and write symbols on the tape, and a set of rules that determine how the machine behaves based on the
current state and the symbol being read.


----


Java was my very first programming language. While learning how to code i got into a question: how does this thing work?
How can I write some text and the computer understands it?

I asked my teacher, how is a programming language created? He answered: "To create a programming language, you need to
create a compiler."

This didn't make any sense to me. A compiler is also a program, so it has to be written in a programming language.
I don't remember why this conversation didn't go further, but I always have been fascinated by the process of
transformation from a programming language to machine code, the actual execution.

time has passed and I started to learn more about low-level programming and how processors work. The lower you go, the
simpler the things get, but also the more overwhelming it is.

i played with some assembly mips and went deeper, looking into the Alan Turing's work on computability. The idea of the
tape and the machine that can read and write on it, the idea of a universal machine that can simulate any other machine
fascinated me. I started to read about the Turing machine and how it can be used to simulate any other machine, including
the one that runs Java.

After searching for some language that were similar to the Turing machine, I found Brainfuck. It is a minimalistic
programming language that uses a very small set of commands to manipulate an array of memory cells.

Brainfuck is what is called an esoteric programming language, which means it is not intended for practical use, but
rather for fun or as a challenge. It has only eight commands, but it is Turing complete, which means it can
simulate any Turing machine.

I wrote some simple programs in it and yes, it was challenging, but also fun.

https://www.youtube.com/watch?v=LCslqgM48D4&t=1022s

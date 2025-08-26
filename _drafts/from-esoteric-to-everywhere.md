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

Executing the Brainfuck code is the first step. To compile a programming language, you need to have a reference
implementation to compare the output of the compiled code.

Writing a Brainfuck interpreter takes a couple of hours but gives a good understanding of the language.

## The Specification

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

It's so simple that one can think it's worth executing it directly from the source code. But doing that for loops would
be tricky. I decided to parse the code into a list of instructions first and then execute them.

## Parsing

Since each command is a single character, a simple function can handle it. It takes the string source code as input and
returns an array of instruction objects.

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

A few notes about the implementation above:

- it ignores any character that is not a valid Brainfuck command;
- it throws an error if the brackets are unbalanced:
    - for that, it uses a stack to keep track of the opening brackets;
    - the same stack is used to set the jump targets for the `[` and `]` commands.
- it appends a `halt` instruction at the end to signify the end of the program

```bash
parseBrainfuck('+++[-]');
```

This results in the following array of instructions:

```bash
[
    { type: "increment" },            # instruction 0
    { type: "increment" },            # instruction 1
    { type: "increment" },            # instruction 2
    { type: "begin_loop", "jmp": 6 }, # instruction 3
    { type: "decrement" },            # instruction 4
    { type: "end_loop", "jmp": 3 },   # instruction 5
    { type: "halt" }                  # instruction 6
]
```

## Executing

Executing the parsed instructions is now a straightforward task. It's just a matter of implementing a simple
fetch-decode-execute cycle, hence a tiny virtual machine.

```javascript
function brainfuckCPU(instructions, { trace = false } = {}) {
  const memory = new Uint8Array(30000);
  let pointer = 0;
  let pc = 0;

  while (true) {
    // fetch
    const instruction = instructions[pc];

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
        if (trace) {
          console.log('\nFinal memory state:');
          console.table(memory);
        }
        return;
    }

    pc++;
  }
}
```

In the code above:

- `memory` is an array of 30,000 bytes, initialized to zero, representing the memory cells;
- `pointer` is the data pointer, initialized to point to the first cell;
- `pc` is the program counter, initialized to point to the first instruction;
- if `trace` is true, it prints the final state of the memory when the program halts.

The auxiliary function `readByte` is used to read a single byte from standard input.

```javascript
function readByte() {
  let buffer = Buffer.alloc(2);
  fs.readSync(0, buffer, 0, 2);
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

## Putting It All Together

Now we can put everything together to create a Brainfuck interpreter.

```javascript
function runBrainfuck(code, options) {
  const instructions = parseBrainfuck(code);
  brainfuckCPU(instructions, options);
}
```

# Optmizations

Our Brainfuck VM instruction set works, but it is not very efficient. It does a one-to-one mapping from Brainfuck
commands. This will generate a lot of instructions for even simple programs. If we can do the same work with fewer
instructions, we can improve the performance of our VM.

For example, the sequence `+++` can be replaced with a single instruction that increments the current cell by 3. The
same goes for `---`, `>>>`, and `<<<`.

An instruction set with these optimizations would look like this:

- `increment n`: increments n to the current cell
- `move_head h`: moves head to cell `h`
- `jump_eqz i`: jumps to instruction `i` if current cell value is zero
- `jump_neqz i`: jumps to instruction `i` if current cell value is not zero
- `input`: reads one byte to the current cell
- `output`: outputs the current cell's byte to stdout

In the next article, I will show how to implement these optimizations. For now, you can take it as an exercise and
implement it yourself.

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

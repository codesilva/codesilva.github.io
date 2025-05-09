# Compiling Brainfuck to JVM

## How to execute code from JVM bytecode?

[5.2.JavaVirtualMachineStartup](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html)

The Java Virtual Machine starts up by creating an initial class, which is specified in an implementation-dependent manner, using the bootstrap class loader (§5.3.1). The Java Virtual Machine then links the initial class, initializes it, and invokes the public class method void main(String[]). The invocation of this method drives all further execution. Execution of the Java Virtual Machine instructions constituting the main method may cause linking (and consequently creation) of additional classes and interfaces, as well as invocation of additional methods.

- `&lt;clinit&gt;` is the class initialization method
- `main`

## Why this?

Because it's fun! And because it teaches so many things like:

- How to write a compiler (hence how to transform data from one form to another)
- What is a Virtual Machine
- A little bit of Alan Turing's work

## Anatomy of Brainfuck

It has only eight commands:

- `>` increment the data pointer (to point to the next cell to the right).
- `<` decrement the data pointer (to point to the next cell to the left).
- `+` increment (increase by one) the byte at the data pointer.
- `-` decrement (decrease by one) the byte at the data pointer.
- `.` output the byte at the data pointer.
- `,` accept one byte of input, storing its value in the byte at the data pointer.
- `[` if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next
    command, jump it forward to the command after the matching `]` command.
- `]` if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next
    command, jump it back to the command after the matching `[` command.

There is a `data pointer` that points to a cell in an array of 30,000 cells - 30k bytes. Each cell is initialized to zero.

### JVM Specs

- https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.11.2
- https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.4-mnemonic
- major version -> https://docs.oracle.com/javase/specs/jvms/se23/html/jvms-4.html#jvms-4.1-200-B.2

### Brainfuck

- https://en.wikipedia.org/wiki/Brainfuck

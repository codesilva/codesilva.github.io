.kdata # kernel data
s1: .word 10
s2: .word 11
new_line: .asciiz "\n"

.data

message: .asciiz "I am doing anything else till IO interrupts me\n"

.text
.globl main
main:
mfc0 $a0, $12 # read from the status register
ori $a0, 0xff11 # enable all interrupts
mtc0 $a0, $12 # write back to the status register
lui $t0, 0xFFFF # $t0 = 0xFFFF0000
ori $a0, $0, 2 # enable keyboard interrupt
sw $a0, 0($t0) # write back to 0xFFFF0000;
here: # stay here forever
li $v0, 4 # exit,if it ever comes here
la $a0, message
syscall
j here


.ktext 0x80000180 # kernel code starts here
  sw $v0, s1 # We need to use these registers
  sw $a0, s2 # not using the stack because the interrupt
  # might be triggered by a memory reference
  # using a bad value of the stack pointer

mfc0 $k0, $13 # Cause register
srl $a0, $k0, 2 # Extract ExcCode Field
andi $a0, $a0, 0x1f # Get the exception code
bne $a0, $zero, kdone # Exception Code 0 is I/O. Only processing I/O here
lui $v0, 0xFFFF # $t0 = 0xFFFF0000
lw $a0, 4($v0) # get the input key
li $v0,1 # print it here.
syscall # Note: interrupt routine should return very fast, so
# doing something like print is NOT a good practice!
li $v0,4 # print the new line
la $a0, new_line
syscall
kdone:
lw $v0, s1 # Restore other registers
lw $a0, s2
mtc0 $0, $13 # Clear Cause register
mfc0 $k0, $12 # Set Status register
andi $k0, 0xfffd # clear EXL bit
ori $k0, 0x11 # Interrupts enabled
mtc0 $k0, $12 # write back to status
eret # return to EPC
#busywait:
 #   lw $t3, 0xffff0000
  #  andi $t3, $t3, 0x0001
   # beq $t3, $zero, busywait

# now a new user-typed character is ready

 #   lw      $t3, 0xffff0004
 
 .data
 
 message: .asciiz "Hello world!\n"
 
.text

main:
    li $t0, 0 # how many bytes were printed

loop:
    lw $t3, 0xffff0008
    andi $t3, $t3, 0x0001
    beq $t3, $zero, loop
    
    ori $t0, $t0, 0
    lb $t1, message ($t0)
    sw $t1, 0xffff000c
    addi $t0, $t0, 1
    
    bne $t0, 0x0d, loop # if no finished, go to the next char
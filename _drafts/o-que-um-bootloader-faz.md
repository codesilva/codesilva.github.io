o que é um bootloader?

Bootloader é quem carrega o kernel

## Processo de boot

1. Botão de power é clicado
2. A placa mãe recebe energia e passa energia para cada componente
3. Uma vez que os componentes estão em operação, a placa-mae envia um sinal de "POWER OK" para o chip de BIOS
4. A bios recebe o sinal, faz um um self test, thamado POST.
5. Uma vez que o tests passou, o firmware da bios procura pelo tal do bootloader. Ele vai procurar um setor de 512 bytes
   com assinatura específica, terminando com os bytes AA55

   - A busca pelo bootsector vai acontecer em uma sequencia dada. Geralmente Floppy disk, depois hard driver
6. O bootloader carrega o kernel e a partir daí é só SO


Referencias

- https://www.viralpatel.net/taj/tutorial/booting.php
- https://www.viralpatel.net/taj/tutorial/hello_world_bootloader.php
- https://wiki.osdev.org/Bootloader
- https://wiki.osdev.org/Rolling_Your_Own_Bootloader
- https://www.cs.cmu.edu/~410-s07/p4/p4-boot.pdf

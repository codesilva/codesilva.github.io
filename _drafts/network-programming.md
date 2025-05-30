# Network Programming

Lista protocolos disponíveis no seu kernel:

```bash
cat /etc/protocols
```

## Unix `errno`

Quando um erro ocorre em alguam funcao do UNIXa variavel `errno` é definida com um código de erro. Você pode usar
a função `perror` para imprimir uma mensagem de erro baseada no valor de `errno`.

Constantes de erro podem ser encontradas em `<sys/errno.h>`. Aqui estão alguns exemplos:


Comandos interessantes

```bash
netstat -ni
netstat -nr
ifconfig <interface> # exibe informações sobre a interface
```

No mac, para encontrar os cabeçalhos de bibliotecas C vamos em:

```bash
# base path pode ser obtido com o comando: xcrun --show-sdk-path
/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include
```

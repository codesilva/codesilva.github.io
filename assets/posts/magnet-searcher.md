Olá, seja bem-vindo a mais um post aqui nesse blog maravilhoso. Hoje vamos aprender um pouco sobre a lib **Beautifulsoup** e como que podemos utilizá-la em um extrator de links magnéticos.


# Introdução

Vez ou outra você se pega precisando fazer o download de um filme antigo que você goste e para isso você acessa uma página dessas onde você pode baixar.

Bom, você acessa o site, vê os links e com sorte depois mil cliques você consegue um **link magnético** para finalmente começara a baixar o arquivo desejado.

Veja que eu disse, **com sorte**, pois muitos desses sites na verdade nem posuem os links reais e apenas abem anúncios quando você clica.

Bom e foi por isso que criamos o **Magnet Extractor** que é um utilitário que busca os links magnéticos, para que você faça o download. 

Veja em funcionamento no link: [Magnet Extractor](https://codesilva.github.io/magnet-extractor)


# Code snippet

```js
const name = 'Edigleysson Silva';
```

# image 

![My Awesome image](assets/images/hero-bg.jpg "My Awesome image")
![My Awesome image](assets/images/profile.jpg "My Awesome image")

![My Awesome image](assets/images/error.png "My Awesome image")

> Ninguém: a<br/>
> Eu: Criar um blog com angular

# Sobre o BeautifulSoup
O Beautifulsoup é uma lib python que nos auxilia no desenvolvimento de aplicações de **Web Scraping**. 

Com ele conseguimos fazer coisas incríveis, navegando pela árvore de elemento de forma simples e rápida.

Veja mais sobre o beautifulsoup na [Documentação Completa](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)


# Como o Magnet Extractor faz isso?
O **Magnet Extractor** faz uso do beautifulsoup para coletar o HTML da página a qual se deseja baixar o filme.

Com a lib **requests** do Python nós conseguimos buscar o conteúdo da página e depois disso deixamos tudo a cargo do **Beautifulsoup**.

Com o soup navegamos entre os links existentes nessa página e filtramos apenas os links do tipo **magnet**.

Muito simples não é? O código todo tem menos de 30 linhas. Acredite!!

Após ao desenvolvimento da aplicação, bastou hospedar nosso código Python no Google Cloud utilizando o Cloud Functions. Assim podemos fazer a chamada para a função quando precisamos coletar links reais.

# Conclusão
Bom pessoal é isso, não me aprofundei muito sobre o tema, porque pretendo posteriormente escrever sobre como fazer coisas básicas com o Beautifulsoup. Mas aqui é possível entender a premissa básica e se você já tem conhecimento básico sobre Web Scraping vai fazer um extrator de links fácil, fácil.

Bom é isso, vejo vocês na próxima. Abraços.

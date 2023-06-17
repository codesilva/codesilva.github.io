---
layout: page
title: Livros
permalink: /books/
---

Dentre outros conteúdos que produzo estão ebooks. Confira abaixo.

<ul>
{% for book in site.data.books %}
  <li>
    {{ book.title }}

    {% if book.description != '' %}
        <p>{{ book.description }}</p>
    {% endif %}

    <ul>
    {% for store in book.stores %}
        <li>
            <a href="{{ store.url }}" target="_blank">Adquira na {{ store.name }}</a>
        </li>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>

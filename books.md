---
layout: page
title: Books
permalink: /books/
---

<ul>
{% for book in site.data.books %}
  <li>
    {{ book.title }}
  </li>
{% endfor %}
</ul>

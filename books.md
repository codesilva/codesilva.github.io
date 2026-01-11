---
layout: page
title: Livros
permalink: /books/
---

<style>
.books-intro {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--secondary-text);
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.book-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-color);
}

.book-cover {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-card:hover .book-cover img {
  transform: scale(1.05);
}

.book-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--heading-color) !important;
  line-height: 1.3;
}

.book-subtitle {
  font-size: 0.9rem;
  color: var(--secondary-text);
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.book-description {
  font-size: 0.95rem;
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  flex: 1;
}

.book-lang {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: var(--border-color);
  color: var(--secondary-text);
  margin-bottom: 1rem;
}

.book-stores {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.store-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: var(--link-color);
  color: #fff !important;
  text-decoration: none !important;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.store-link:hover {
  background-color: var(--link-hover-color);
  transform: translateY(-1px);
  color: #fff !important;
}

.store-link svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

@media (max-width: 640px) {
  .books-grid {
    grid-template-columns: 1fr;
  }

  .book-content {
    padding: 1.25rem;
  }
}
</style>

<p class="books-intro">
  Alguns dos ebooks que escrevi ao longo dos anos. Confira abaixo e adquira o seu!
</p>

<ul class="books-grid">
{% for book in site.data.books %}
  <li class="book-card">
    <div class="book-cover">
      <img src="{{ book.img_url }}" alt="Capa do livro {{ book.title }}" loading="lazy">
    </div>
    <div class="book-content">
      <span class="book-lang">{{ book.lang }}</span>
      <h2 class="book-title">{{ book.title }}</h2>
      {% if book.subtitle %}
        <p class="book-subtitle">{{ book.subtitle }}</p>
      {% endif %}
      {% if book.description != '' %}
        <p class="book-description">{{ book.description }}</p>
      {% endif %}
      <div class="book-stores">
        {% for store in book.stores %}
          <a href="{{ store.url }}" target="_blank" rel="noopener" class="store-link">
            {% if store.name == 'Amazon' %}
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.13.066.112.063.223-.01.333-.025.037-.144.168-.358.392a21.3 21.3 0 0 1-2.607 2.203c-3.16 2.27-6.74 3.403-10.74 3.403-2.777 0-5.493-.65-8.147-1.953-.497-.244-.796-.577-.893-.997-.037-.15-.01-.333.078-.55.02-.047.078-.147.174-.302zm12.933-1.89c-.04-.166-.148-.185-.324-.055-1.72 1.28-3.667 1.924-5.838 1.924-2.012 0-3.917-.545-5.716-1.638-.195-.12-.3-.106-.317.046-.007.063.025.14.096.23 1.674 2.053 3.87 3.08 6.59 3.08 2.007 0 3.914-.667 5.72-2.003.18-.133.25-.27.21-.41a1.015 1.015 0 0 0-.38-.537c-.038-.027-.08-.066-.13-.117-.16-.157-.3-.34-.39-.54l-.012-.023.007.027c.007.03.01.05.007.06zm6.54-10.7c0-.96-.2-1.93-.6-2.91-.4-.98-.97-1.82-1.7-2.53-.74-.71-1.58-1.17-2.5-1.38-.4-.08-.77-.13-1.1-.15-.22-.02-.36-.04-.42-.04a.95.95 0 0 0-.34.04c-.77.19-1.45.55-2.04 1.1-.58.54-1.05 1.2-1.4 1.98-.34.77-.52 1.58-.52 2.43 0 .54.05 1.04.17 1.5l.01.07c.14.5.33.94.55 1.32.26.44.5.8.72 1.1.22.3.5.64.83 1.03l.23.27c.33.39.6.7.8.9l.54.56c.17.17.39.4.65.67.27.28.52.54.75.79l.6.66c.08.09.17.2.28.32.1.12.18.24.24.35.05.1.09.19.11.26.02.08.04.17.04.26 0 .14-.04.28-.1.42-.08.14-.17.28-.3.43-.12.15-.26.3-.4.44-.16.14-.32.3-.5.48-.26.27-.64.66-1.12 1.17-.48.52-.78.85-.9 1-.13.14-.28.36-.43.65-.16.29-.24.56-.24.8 0 .12.02.22.04.3.03.1.07.18.12.26.05.07.1.12.14.15.05.03.1.06.16.1.06.02.1.04.1.04l.1.02a.8.8 0 0 0 .38-.11c.7-.35 1.3-.65 1.8-.89.52-.24 1-.47 1.44-.68.44-.22.82-.42 1.15-.6.33-.18.73-.42 1.2-.72.48-.31.89-.6 1.22-.86.32-.26.7-.6 1.1-1 .43-.4.76-.77 1-.1.33-.5.5-1.1.5-1.8 0-.9-.24-1.7-.73-2.43-.08-.1-.14-.2-.23-.3-.08-.12-.18-.22-.26-.32-.1-.1-.18-.2-.27-.28l-.28-.26c-.1-.08-.18-.16-.26-.22l-.24-.2-.25-.18-.2-.15-.18-.12a14.3 14.3 0 0 1-.9-.73l-.27-.23c-.27-.23-.53-.5-.76-.8-.23-.3-.36-.65-.38-1.04l.01-.26c.03-.38.13-.73.32-1.03.18-.3.4-.55.67-.74.26-.18.55-.32.86-.4.3-.08.6-.12.88-.12h.3c.4.03.8.12 1.15.26.35.14.7.35 1.05.64.34.28.6.65.78 1.08.17.43.26.9.26 1.4v1.1c0 .34.1.53.3.57.15.03.35-.05.6-.24.25-.18.47-.4.64-.64.05-.07.1-.15.15-.22l.03-.03c.03-.04.05-.07.08-.12l.33-.42c.16-.2.26-.36.3-.43.04-.08.1-.2.2-.35l.2-.4c.06-.13.1-.23.13-.3l.1-.28.08-.22.04-.14.02-.1v-.1z"/></svg>
            {% else %}
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm3-4H7v-2h8v2zm0-4H7V7h8v2z"/></svg>
            {% endif %}
            {{ store.name }}
          </a>
        {% endfor %}
      </div>
    </div>
  </li>
{% endfor %}
</ul>

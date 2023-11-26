
```bash
docker run -it --rm --name new_phoenix_project -v "$PWD:/usr/src/myapp" -w /usr/src/myapp elixir:1.15.4 /bin/bash -c "mix local.hex; mix archive.install hex phx_new; mix phx.new umap"
```

Setting permisions

```bash
sudo chown -R $(id -u):$(id -g) ./robomarket 
```
Define a dockerfile

```dockerfile
FROM elixir:1.15.4

RUN mix local.hex --force \
  && mix archive.install --force hex phx_new 1.6.10 \
  && apt-get update \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash \
  && apt-get install -y apt-utils \
  && apt-get install -y nodejs \
  && apt-get install -y build-essential \
  && apt-get install -y inotify-tools \
  && mix local.rebar --force

ENV APP_HOME /usr/src/myapp

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

RUN mix.deps get

EXPOSE 4000

CMD ["mix", "phx.server"]
```

Define a docker-compose

```yaml
version: "3"

services:
  web:
    build: .
    ports:
      - "4000:4000"
    volumes:
      - ./:/app
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_HOST=db
    depends_on:
      - db
  db:
    image: postgres:10
    environment:
      - POSTGRES_DB=umap_dev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
  pg_admin:
    image: dpage/pgadmin4
    ports:
      - 5000:80
    environment:
      PGADMIN_DEFAULT_EMAIL: "user@test.com"
      PGADMIN_DEFAULT_PASSWORD: "12345678"
```

# Running project with docker compose

```sh
# setup environment variables
$ cp ./frontend/.env.example ./frontend/.env
$ cp ./backend/.env.example ./backend/.env

# running project with all dependences
$ docker-compose --env-file ./backend/.env up
```

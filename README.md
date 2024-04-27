# Setup

Create the .env files from the examples with the following commands:

```sh
# setup environment variables
$ cp ./frontend/.env.example ./frontend/.env
$ cp ./backend/.env.example ./backend/.env
```

Then, update the following env variables inside the ./backend directory:

```sh
# stripe account secrets
STRIPE_API_KEY=sk_test_your_secret_key_
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

```

# Running the Project

1. Run the backend and frontend at the same time with Docker Compose:

```sh
# running project with all dependences
$ docker-compose --env-file ./backend/.env up
```

2. Use Stripe CLI to listen for events:

```sh
# forward events to localhost
$ stripe listen --forward-to http://localhost:5000/stripe-events
```

# Registering your Card

Events will fail if the card is not present at the database, so you need to register in the home screen ( http://localhost:3000). Here you should enter the **same ID present in your Stripe Dashboard** (e.g. ic_1Pb...). Afterwards, you will be redirected to your personal card dashboard.

# Monitoring

The container will log to the terminal, besides this you can use some software like DBeaver to see the rows generated for the Postgres database. For event monitoring, you can access the http://localhost:5000/queues endpoint.

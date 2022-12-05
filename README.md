# The HIO-HIO project

## What is in this repository

This repository is a monorepo which contains:

- two micro services: "auth" and "hios",
- their clients: "auth-client" and "hios-client",
- one gateway: "hio-api"
- and some packages to help with all.

The structure of the monorepo is as follows:

```yaml
- clients  # the services clients (auto-generated)
  - auth-client
  - hios-client
- gateways
  - hio-api
- packages
  - errors # contains api errors
  - helpers # contatins helper methods
  - interfaces # contains shared interfaces
  - middleware # contains express middlewares
- services
  - auth
  - hios
- tools # contains tools for generating the clients and the openapi spec
```

> All of the code is written in TypeScript except of `packages/middleware` which is written in JavaScript

Each service / gateway exposes a REST api and is structured the same way. The services also contain a connection to a database and models which describe the tables each service is responsible upon.

The folder structure of a service / gateway is as follows:

```yaml
- service
  - src
    - dto
    - handlers
    - lib
    - repositories  # for services only
    - routes # where the openapi hides
    - service.ts
  - index.ts
  - package.json
```

### Auth Service

Responsible to the authentication of users in this project

#### Models

The auth service contains one model:

- **Users**, which represents the users of the system

#### Routes

The auth service contains two routes:

1. `POST /users` which receives a `username` and a `password` and creates a new user in the Users table
2. `POST /users/verify` which receives a `username` and a `password` and verifies the credentials are the same as the ones in the database.

### Hios Service

Responsible to the Hios in this project

#### Models

The hios service contains one model:

- **Hio**, which represents the hios of the system

#### Routes

The hios service contains one route:

1. `POST /hios` which receives a sender `userId` and a `targetUserId` and creates a hio to the target user

### Hio Api (Gateway)

Gateway to all the actions available in this system

> The gateway does not contain a connection to a database and uses the services clients in order to send requests to the services.

#### Routes

The hio-api contains three routes:

1. `POST /auth/signup` which signup a new user to the system, and returns the user details and the token which can be used to send requests to the system.

   this route uses the `authClient` in order to create the user

2. `POST /auth/login` which logins an exiting user to the system, and returns the user details and the token which can be used to send requests to the system.

   this route uses the `authClient` in order to verify the user

3. `POST /hios` which sends a new hio to a target user

   this route uses the `hiosClient` in order to create the hio in the system

This is a quick overview of what is the content of this repository.

You can now move on to the next step to [Setup and Run the project >>](./workshop/001%20setup.md)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### A worker check in system with real time visibility

> [Prisma](https://docs.nestjs.com/recipes/prisma) [GraphQL code-first](https://docs.nestjs.com/graphql/quick-start#code-first)

### Installation

1. Run Docker applications

```bash
# run the project container
$ docker-compose up -d

```

2. Install dependencies: `npm install`
3. Generate a type-safe client to interact with your database in the docker: `docker exec -it civalgo_nestjs_app bash -c "npm run prisma:gen"`
4. Create a database and create tables in the container: `docker exec -it civalgo_nestjs_app bash -c "npm run prisma:push"`
5. Generate some data in the database: `docker exec -it civalgo_nestjs_app bash -c "npx prisma db seed"`

### Graphql Playground

When the application is running, you can go to [http://localhost:3001/graphql](http://localhost:3001/graphql) to access the GraphQL Playground. See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Project

I have decided to follow the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) precepts with Domain Driven Design structure for better understanding and usage.

I have decided to not create a direct relation between a Site and a User because in this project because it was easier to make with the lightweight auth system i've implemented.
<br/>
<br/>
The relation between a Site and a User is made via the table Events.

### Future that could be added

- **Errors**: Add a service to handle errors.
- **DataLoader**: Solve the n+1 problem with Dataloaders.

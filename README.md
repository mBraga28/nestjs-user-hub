# User API

This is the User API built with NestJS. It provides endpoints for user management, authentication, and authorization.

## Project setup

```bash
$ npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. Example:

```
DATABASE_URL=your_database_url
SECRET=your_jwt_secret
SALT=your_salt_value
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

To run the application using Docker, follow these steps:

1. Build the Docker image:

    ```bash
    docker build -t user-api .
    ```

2. Run the Docker container:

    ```bash
    docker run -p 3003:3003 user-api
    ```

## Prisma

To set up the database using Prisma, follow these steps:

1. Generate Prisma client:

    ```bash
    npx prisma generate
    ```

2. Run migrations:

    ```bash
    npx prisma migrate dev
    ```

3. Seed the database:

    ```bash
    npx ts-node prisma/seed.ts
    ```

## API Documentation

The API documentation is available at `/api` endpoint when the application is running.

## License

This project is [MIT licensed](LICENSE).
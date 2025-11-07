## Headless CMS

This project is a **Headless CMS** built with **NestJS**.  
It provides a modular and permission-based API for managing content.  
Access to routes is limited to users with the appropriate permissions.

---

## Project setup

```bash
$ pnpm install
```

---
## Environments (.env)
Copy and paste this variable into the `.env` file before running the `docker compose up` command.

Docker 
```bash
MONGO_URL=mongodb://mongo:27017/cms
```

---

## How to run locally

Type the command below: 
```bash
pnpm start:dev
```

---

## How to run it in Docker

From the project root, you can start the Docker environment with:

```bash
$ docker compose up -d
```

This will build and run the application inside a containerized environment.

---

## Documentation

You can access the API documentation at:

```
http://localhost:3000/cms-docs
```

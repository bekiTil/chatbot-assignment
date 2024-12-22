# Chatbot Application

This repository contains both the backend and frontend services for a Chatbot application.

## Project Structure

- `chatbot-backend/`: Contains the backend service built with Node.js, Express, and Prisma ORM.
    - `src/`: Source code for the backend service.
        - `controllers/`: Controller functions for handling API requests.
        - `middlewares/`: Middleware functions.
        - `models/`: Prisma client setup.
        - `repositories/`: Repository functions for database operations.
        - `routes/`: Route definitions.
        - `schemas/`: Validation schemas using Zod.
        - `services/`: Service functions for business logic.
        - `utils/`: Utility functions.
    - `prisma/`: Prisma schema and migration files.
    - `Dockerfile`: Dockerfile for building the backend service container.
    - `docker-compose.yml`: Docker Compose configuration for running the backend and database services.
    - `tsconfig.json`: TypeScript configuration file.
    - `.env`: Environment variables file (not included in version control).

- `chatbot-frontend/`: Contains the frontend service built with Next.js and React.
    - `src/`: Source code for the frontend service.
        - `app/`: Application pages and global styles.
        - `components/`: Reusable UI components.
        - `types/`: TypeScript types.
        - `utils/`: Utility functions.
    - `Dockerfile`: Dockerfile for building the frontend service container.
    - `next.config.ts`: Next.js configuration file.
    - `tsconfig.json`: TypeScript configuration file.

## Setup and Running the Project

### Prerequisites

- Docker and Docker Compose

### Steps

1. **Clone the repository:**
        ```bash
        git clone https://github.com/bekiTil/chatbot-assignment.git
        cd chatbot-assignment
        ```

2. **Set up environment variables:**
        Create a `.env` file in the `chatbot-backend` directory and add the following:
        ```env
        DATABASE_URL=postgresql://postgres:password@localhost:5432/chatapp
        PORT=4000
        ```

3. **Build and start the services:**
        ```bash
        docker-compose up --build
        ```

4. **Access the application:**
        - Backend service: `http://localhost:4000`
        - Frontend service: `http://localhost:3000`

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

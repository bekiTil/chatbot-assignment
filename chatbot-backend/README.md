# Chatbot Backend

This is the backend service for the Chatbot application. It is built using Node.js, Express, and Prisma ORM with a PostgreSQL database.

## Project Structure

- `src/`: Contains the source code for the backend service.
    - `controllers/`: Contains the controller functions for handling API requests.
    - `middlewares/`: Contains middleware functions.
    - `models/`: Contains the Prisma client setup.
    - `repositories/`: Contains repository functions for database operations.
    - `routes/`: Contains the route definitions.
    - `schemas/`: Contains validation schemas using Zod.
    - `services/`: Contains service functions for business logic.
    - `utils/`: Contains utility functions.
- `prisma/`: Contains Prisma schema and migration files.
- `dist/`: Contains the compiled JavaScript files.
- `Dockerfile`: Dockerfile for building the backend service container.
- `docker-compose.yml`: Docker Compose configuration for running the backend and database services.
- `tsconfig.json`: TypeScript configuration file.
- `.env`: Environment variables file (not included in version control).

## Setup and Running the Project

### Prerequisites

- Node.js (version 18 or higher)
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Steps

1. **Clone the repository:**
     ```bash
     git clone https://github.com/bekiTil/chatbot-backend.git
     cd chatbot-backend
     ```

2. **Install dependencies:**
     ```bash
     npm install
     ```

3. **Set up environment variables:**
     Create a `.env` file in the root directory and add the following:
     ```env
     DATABASE_URL=postgresql://postgres:password@localhost:5432/chatapp
     PORT=4000
     ```

4. **Run database migrations:**
     ```bash
     npx prisma migrate dev
     ```

5. **Generate Prisma client:**
     ```bash
     npx prisma generate
     ```

6. **Start the development server:**
     ```bash
     npm run dev
     ```

### Running with Docker Compose

1. **Build and start the services:**
     ```bash
     docker-compose up --build
     ```

2. **Access the backend service:**
     The backend service will be running at `http://localhost:4000`.

3. **Access the Swagger API documentation:**
     Open `http://localhost:4000/api-docs` in your browser.

### Building for Production

1. **Build the project:**
     ```bash
     npm run build
     ```

2. **Start the production server:**
     ```bash
     npm start
     ```

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
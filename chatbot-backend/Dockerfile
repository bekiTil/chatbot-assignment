# Use Node.js 18
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .


RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Expose the backend port
EXPOSE 4000

# Run migrations and start the server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]

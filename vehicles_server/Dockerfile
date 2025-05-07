FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make entrypoint executable
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 3030

ENTRYPOINT ["./entrypoint.sh"]

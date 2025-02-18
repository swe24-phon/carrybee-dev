FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy  the package.json and package-json.json files to the container
COPY package*.json ./

# Install all the dependencies
RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose tha port that the app runs on 
EXPOSE 4000

# RIC
# RUN npx prisma migrate dev --name init

# Define the command to run the application
CMD ["sh", "-c", "npx prisma migrate dev --name init && node index.js"]

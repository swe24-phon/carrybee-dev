FROM ubuntu:latest 
// node:22

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl unzip sudo && \
    curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && \
    sudo -E bash nodesource_setup.sh && \
    sudo apt-get install -y nodejs

RUN apt install postgresql postgresql-contrib 

RUN systemctl

RUN apt-get install -y git

RUN mkdir -p /app && \
    cd /app

WORKDIR /app

RUN npm install express && \
    npm install -g prisma && \
    npm install pg && \
    npm install cors && \
    npm install dotenv && \
    npm install nodemon && \
    npm install eslint && \
    npm install webpack && \
    npm install babel 

# Expose the PostgreSQL port
EXPOSE 3000 

# Set the default command to run when starting the container
CMD ["npm start"]
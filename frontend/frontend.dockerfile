FROM node:22

WORKDIR /app

COPY ./app/package*.json ./

RUN npm install --legacy-peer-deps

COPY ./app .

EXPOSE 5173

#CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--host"]

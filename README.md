![CARRYBEE (1)](https://github.com/user-attachments/assets/3b412115-97e2-4597-84ef-9803460c0738)
# CARRYBEE

### Overview 👓
This project is a portfolio project for Holberton students. Our group has decided to build a courier app inspired by the popular application in Southeast Asia called Lalamove. This app allows users to have their parcels delivered within a day, with additional delivery options tailored to their needs. The app also enables anyone who owns a vehicle to become a driver and earn extra money. We aim to create a courier app that Australia has never seen before. The purpose of the project is for everyone to work together and build a full-stack application using a variety of tools.

This project lasts for 4 weeks, which includes planning, diagram drawing, Figma design, database development, and UX/UI design. We have divided into two teams: front-end and back-end.

### Technical Architecture 👩‍🏫
---------------------------------
# Structure 🏔

### Usage 🛠
## Set up the enviroment:

# Step to run the project from scratch

## 0. git pull origin main 

##### 1. git clone https://ghp_xxxxxtokenxxxx@github.com/swe24-phon/carrybee-dev.git

##### 2. cd .\carrybee-dev\

##### 3. Create your own branch 
		git checkout -b branchname

##### 4. git status
On branch branchname
nothing to commit, working tree clean

### 5. make sure your docker desktop is running!

------------------------
### Docker set up
##### docker-compose up --build 
##### docker ps -a or docker ps

**Open new terminal** to run Prisma migrations ( Database name: carry_bee)

$ docker exec -it backend npx prisma migrate dev --name init

Connect to PostgreSQL inside the db container:

$ docker exec -it db psql -U carry_bee

To check that the database is showing the information:

carry_bee-# \dt

#### Open a new terminal:
**For backend**
\carrybee-dev  
**$ cd backend **    

$ npm install

$ npm run dev 


#### Open a new terminal:

**For frontend**

\carrybee-dev\frontend\

**$ cd app**

$ npm install

$ npm run dev

check Local: http://localhost:5173

check http://localhost:3000
or curl http://localhost:3000

To format the prisma schema (from the backend folder)

npx prisma format
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init (Replace "init" with a meaningful name related to the changes)
npx prisma studio


Note: if you run into this:

  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 3000

**For windows:**
run netstat -ano | findstr :3000 to find the ports that need to kill

then run taskkill /PID 34088 /F
where 34088 is the PID

check Local: http://localhost:5173

check http://localhost:3000
or curl http://localhost:3000


To format the prisma schema (from the backend folder)

npx prisma format
npx prisma generate
npx prisma db push
npx prisma migrate dev --name init (Replace "init" with a meaningful name related to the changes)
npx prisma studio

### Test 🌊

--------------------------------
# Developed By: 🧑‍💻

Angela Enriquez Garcia

Mary Fletcher

Chutima Puthachon 

Xi Qern Egan Leong 

Volodymyr Gozhyi

Phon Soumpholphakdy

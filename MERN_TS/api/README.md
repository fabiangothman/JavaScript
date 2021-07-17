# Sample API
Sample API build using Mongo, Express and Node, all with TypeScript!

## Initialization
The API was stated by:
- npm init -y
Libraries
- npm i express mongoose morgan dotenv cors
TypeScript modules
- npm i -D typescript @types/express @types/morgan @types/mongoose @types/cors @types/node ts-node-dev
TypeScript .json init:
- npx tsc --init
- Then configure the "target", "outDir" and "rootDir" parameters.

# Mongo database server
You can access to the MongoDB database via:
- MongoDB Compass
- 'C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe'
- Configure the "bin" folder of mongo as a Path environment variable on the OS. Then you could open it into a terminal:
    - mongo
    - mongod --version

## Run
Don't forget first to configure the .env file properly
You can run the API backend by running:
- We've already configured the "build" and "dev" script inside package.json
- npm run dev   (Keep awake a listening connection for changes)
- npm run build (Build the code into the "dist" folder)
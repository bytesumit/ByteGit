const yargs = require('yargs');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {Server} = require('socket.io');


const {hideBin} = require('yargs/helpers');
const {initRepo} = require('./controllers/init.js');
const {addRepo} = require('./controllers/add.js');
const {commitRepo} = require('./controllers/commit.js');
const {pullRepo} = require('./controllers/pull.js');
const {pushRepo} = require('./controllers/push.js');
const {revertRepo} = require('./controllers/revert.js');
const mainRouter = require('./routes/main.router.js');
dotenv.config();

yargs(hideBin(process.argv)).command(
    "init",
    "intialize the reposatary",
    {},
    initRepo
).command(
    "start",
    "start the server",
    {},
    startServer
).command(
    "add <file>",// command Name 
    "add file for stagining", //Describtion
    (yargs)=>{
        yargs.positional("file",{
            describe :"File add to the staging Area ",
            type : "string"
        })
    },//parameters
    (argv)=>{
        addRepo(argv.file);
    }
).command(
    "commit <message>",
    "commit the stage file", 
    (yargs)=>{
        yargs.positional("message",{
            describe :"commit message ",
            type : "string"
        })
    },
    (argv)=>{
        commitRepo(argv.message);
    }
).command(
    "push",
    "push commits to s3",
    {},
    pushRepo
).command(
    "pull",
    "pull commits from s3",
    {},
    pullRepo
).command(
    "revert <commitId>",
    "Revert to a Specific commit", 
    (yargs)=>{
        yargs.positional("commitId",{
            describe :"Commit Id to revert to ",
            type : "string"
        })
    },
    (argv)=>{
        revertRepo(argv.commitId);
    }
).demandCommand(1,"Altleast one command needed").help().argv;


function startServer(){
    const app = express();
    const port = process.env.PORT || 3000;


    app.use(cors({origin:"*"}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/',mainRouter);

    const MonoURL = process.env.MONGO_URL; //MOngoDb URL
    // Connecting to MongoDb database.
    mongoose.connect(MonoURL).then(()=>{
        console.log("Database Connected Succesfully")
    }).catch((err)=>{
        console.log("Unable to connect : ",err);
    });

  
    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer,{
        cors:{
            origin :"*",
            methods : ["GET","POST"]
        },
        
    });


    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
            user = userID;
            console.log('====')
            console.log(user);
            console.log("=====")
            socket.join(userID);
        })
    });

    const db = mongoose.connection;
    db.once("open",async()=>{
        console.log("crud operation is called")
    });


    httpServer.listen(port,(req,res)=>{
        console.log(`server is connectecd on port ${port}`); 
    });
}
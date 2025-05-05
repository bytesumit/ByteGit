const express = require('express');
const userRouter = require('./user.router');
const repoRouter = require('./repo.router');
const issueRouter = require('./issue.router');
const mainRouter = express.Router();

 // routes
 mainRouter.use(userRouter);
 mainRouter.use(repoRouter);
 mainRouter.use(issueRouter);


 mainRouter.get('/',(req,res)=>{
    res.send("welcome to the my port")
});

module.exports = mainRouter;
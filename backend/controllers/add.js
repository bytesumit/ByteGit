const fs = require('fs').promises;
const path = require('path');


async function addRepo(filePath) {
   const repoPath = path.resolve(process.cwd(),".byteGit");
   const stringPath = path.join(repoPath,"staging");

   try{
    await fs.mkdir(stringPath,{recursive:true});
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath,path.join(stringPath,fileName));
    console.log(`File${fileName} added to the staging area`);

   }catch(err){
    console.log('Error adding file', err)
   }

};

module.exports = {addRepo};
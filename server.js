const express = require('express');
const app = express();

app.listen(3000, (err,next) => {
    if(err){
        console.log("Server is not working!");
    } else {
        console.log("Your server is running on a port 3000");
    }
});
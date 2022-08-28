const { json } = require('body-parser');
const express = require('express');

//importing routes
const usersrouter = require("./routes/users");
const booksrouter = require("./routes/books");

const app = express();

const port = 3000;


app.use(express.json());



app.get("/",(req,res) => {
    res.status(200).json({
        message : "server is up and running",
    });
});

app.use("/users",usersrouter);

app.use("/books",booksrouter);

app.get("*",(req,res) => {
    res.status(404).json({
        message : "this route does not exist",
    });
});

app.listen(port,() =>{
    console.log(`server connected at port ${port}`)
});
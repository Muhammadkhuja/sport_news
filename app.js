const express = require('express');
const config = require('config');
const mainRoutes = require("./routes/index.routes")
const cookieParser = require("cookie-parser"); //req.cookies


const PORT = config.get("port") || 3030

const app = express()
app.use(cookieParser()); // req.cookies
app.use(express.json()); // parse-body


app.use(express.json())
app.use("/api", mainRoutes)

async function start(){
    try {
        app.listen(PORT, () =>{
            console.log(`Server started at: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
        
    }
}

start()
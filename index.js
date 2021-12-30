const express = require("express");
const cors = require('cors');
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = express();
const http = require('http');
const server = http.createServer(app)

// init the keycloak and express connect
const session = require("express-session")
const Keycloak = require("keycloak-connect")

// connect to database with mongodb:
connectDB()

app.use(express.json())
app.use(cors())

// init the memory store :
const memoryStore = new session.MemoryStore()

// config the keycloak :
app.use(
    session({
        secret : 'ABCD@ABCD',
        resave : false,
        saveUninitialized : true,
        store : memoryStore
    })
)

const keycloak = new Keycloak({
    store : memoryStore
})

app.use(
    keycloak.middleware({
        logout : '/logout',
        admin : '/'
    })
)


// declaring url endpoints :
// app.use("/api/users", keycloak.protect('realm:user'), require("./routes/users"))
app.use("/api/users", require("./routes/users"))
app.use("/api/posts", require("./routes/posts"))
app.use("/api/favorits", require("./routes/favorits"))



// start the server
server.listen(3001, () => {console.log("the server is started")});
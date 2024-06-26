//*******************************************************************************************\\
const express = require("express");
const path = require("path")
const fs = require("fs");
const methodOverride = require("method-override"); // requiriendo method para usar put y delate
const logger = require('morgan')
const { Server } = require("socket.io");

const app = express();

const { createServer } = require('node:http');
const server = createServer(app)

const session = require("express-session");
const cookieParser = require("cookie-parser"); //--> Requerimos el módulo 'cookieParser' para manejar las cookies.


const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")


const io = new Server(server, {
    connectionStateRecovery: {}

});

io.on('connection', (socket) => {
    console.log('a user has connected');
    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    });
});
//************************************* Middlewares *************************************\\
app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

// Para tomar los datos del body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Para poder usar los metodos put y delete
app.use(methodOverride('_method'));

// Para guardar cookies en el cliente
app.use(cookieParser()) 

// app.use(logMiddleware);
app.use(session({secret: "es secreto pa!", resave: false, saveUninitialized: false}))
//--> Es imprescindible el orden de estos middleware, porque tienen un orden de ejecución.
app.use(userLoggedMiddleware);

app.use(logger('dev'))

// validation middlewares

// en mantenimiento 404!
// app.use((req, res, next) => {
//     req.status(404).render('404-page');
// })
// 

// 
//************************************* Template Engine *************************************\\
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/"));
  
//************************************* Rutas *************************************\\
// index
const mainRouter = require("./routes/mainRouter");
app.use("/", mainRouter); //---> este es el entry point !!!
// 

// user
const usersRouter = require("./routes/usersRouter");
app.use("/users", usersRouter);
// 

// products
const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter);
// 

// admin
const adminRouter = require("./routes/adminRouter");
app.use("/admin", adminRouter);
// 



//************************************* Listen Server *************************************\\
const port = process.env.PORT || 3010;

server.listen(`${port}`, () => {
    console.log(`Servidor funcionando en: http://localhost:${port}`);
});

//*******************************************************************************************\\


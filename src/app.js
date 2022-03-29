const express = require('express');
const moment = require('moment');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const ProductApi = require('./utils/productApi');
const Contenedor = require('./utils/contenedor.js');

const app = express();
const router = require('./router/productos')
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const productApi = new ProductApi();
const mensajesContainer = new Contenedor('./src/utils/', 'mensajes.txt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'))

let messages = [];

const renderAllMessages = async (socket) => {
    await mensajesContainer.getAll().then((data) => {
        messages = data;
        io.sockets.emit("render-all-messages", messages);
    }).catch((error) => {
        console.log(`Error al cargar mensajes: ${error}`)
    });
}

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado.");

    socket.on('add-new-product', data => {
        const newProduct = productApi.save(data);
        io.sockets.emit('render-new-product', newProduct);
    });

    renderAllMessages(socket);

    socket.on('add-new-message', data => {
        const now = moment();
        data = { ...data, time: now.format("D/MM/YYYY h:mm:ss") }

        mensajesContainer.save(data)
            .then( () => renderAllMessages(socket))
            .catch((error) => {
                console.log(`Error al cargar mensajes: ${error}`)
            });
    });
});

app.use('/api', router);

module.exports = httpServer;


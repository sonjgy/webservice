const express = require('express');
const cors = require('cors');
const spdy = require('spdy');
const fs = require('fs');
const { socketController } = require('../sockets/controller');
//const { validarJSON } = require('../helpers/validarJson');

class Server {

    constructor() {

        // options https localhost certificate
        this.options = {
            key: fs.readFileSync('../cert/localhost.key'),
            cert: fs.readFileSync('../cert/localhost.crt')
        }


        this.app = express();
        this.port = process.env.PORT;
        this.server = spdy.createServer(this.options, this.app);
        this.io = require('socket.io')(this.server);

        //sockets

        this.sockets();


        this.paths = {};
        // middleware
        this.middlewares();
        // rutas de mi aplicacion
        this.routes();



    }


    middlewares() {

        // cors - possiamo creare white or black list de accesso all'endpoint
        this.app.use(cors());
        this.app.use(express.static('public'));// esta es el quivalente de /
        //this.app.use(validarJSON)

    }

    routes() {
        //this.app.use(this.paths.auth, require('../routes/auth.routes'));
    }

    sockets() {

        this.io.on('connection', socketController);


    }



    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on port ${this.port}`)
        })
    }


}

module.exports = Server;


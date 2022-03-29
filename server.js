const httpServer = require('./src/app')

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
    console.log(`Servidor corriendo en puerto ${PORT}`)
);


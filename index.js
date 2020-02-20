const express = require('express');
const cors = require('cors');
const app = express();
const server = app.listen(process.env.PORT || 5005, () => console.log('SERVER ON-LINE'));
const io = require('socket.io').listen(server);

io.origins(['*']).on('connection', async (socket) => {
    const application = app;

    socket.on('registrar', async (dados) => {
        const { _id } = dados;
        console.log(dados)
        socket.join(_id);
        socket.broadcast.to(_id).emit('event');
    });

    //socket para debitar pontos e enviar atualização para o destinatario
    socket.on('transferencia', async (dados) => {
        const { _idDestinatario } = dados;
        console.log(dados)
        io.to(_idDestinatario).emit('receiveDebit', dados)
    })

    socket.on('disconnect', () => console.log('Usuario desconectado!'));

});
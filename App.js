const express = require('express');
const venom = require('venom-bot');
const app = express()

app.get('/api/v1/send/:telephone', (req, res) =>  {

    let telephone = req.params.telephone
    let message = req.query.message;
    
    let data = {
        telephone: telephone,
        message: message
    }

    venom
        .create()
        .then((client) => {
            client
            .sendText(data.telephone+'@c.us', data.message)
            .then((result) => {
                res.json({status: 'success', response: result});
            })
            .catch((erro) => {
                res.json({status: 'error', response: 'Error when sending: '+erro});
            });
        })
        .catch((erro) => {
            res.json({status: 'error', response: 'Error when sending: '+erro});
    });
});

app.get('/', (req, res) =>  {
    htmlText = `
        <h1>WhatsApp API</h1>
        <p>Faça um chamada GET na rota /api/v1/send/:telephone?message=mensagem</p>
        <p>Onde :telephone é o número de quem vai receber a mensagem e message é a mensagem a ser enviada.</p>
    `;
    res.send(htmlText);
});

app.listen(3333, () => console.log('Server running!'))
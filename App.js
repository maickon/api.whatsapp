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

app.listen(3333, () => console.log('Server running!'))
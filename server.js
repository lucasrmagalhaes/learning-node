var express, app, server, messages;

express = require('express')

app = express()
app.use(express.static(__dirname))

messages = [
    { name: 'Lucas', message: 'Hi' },
    { name: 'Tim', message: 'Hello' },
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

server = app.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})
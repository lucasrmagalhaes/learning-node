var express, app, server, messages, bodyParser;

express = require('express')
bodyParser = require('body-parser')

app = express()
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

messages = [
    { name: 'Lucas', message: 'Hi' },
    { name: 'Tim', message: 'Hello' },
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body)

    res.sendStatus(200)
})

server = app.listen(3000, () => {
    console.log(`Server is listening on http://localhost:${server.address().port}`)
})
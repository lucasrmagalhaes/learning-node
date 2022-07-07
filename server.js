var express, app, server;

express = require('express')

app = express()
app.use(express.static(__dirname))

server = app.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})
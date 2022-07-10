var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', (req, res) =>{
    var message = new Message(req.body)

    message.save((err) => {
        if (err) { sendStatus(500) }
        
        Message.findOne({ message: 'palavrão'}, (err, censored) => {
            if (censored) {
                console.log('Censored words found', censored)

                Message.deleteOne({ _id: censored.id }, (err) => {
                    console.log('Removed censored message')
                })
            }
        })

        io.emit('message', req.body)
        res.sendStatus(200)
    })
})

io.on('connection', (socket) => {
    console.log('User Connected')
})

mongoose.connect(
    'mongodb+srv://user:user@cluster0.a9l8i.mongodb.net/learning_node?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('MongoDB Connected')
    }
).catch((err) => console.log(err))

var server = http.listen(3000, () => {
    console.log(`Server is listening on http://localhost:${server.address().port}`)
})
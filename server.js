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

app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body)

        var savedMessage = await message.save()

        console.log('Saved')

        var censored = await Message.findOne({ message: 'badword' })

        if (censored)
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('Message post called')
    }
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
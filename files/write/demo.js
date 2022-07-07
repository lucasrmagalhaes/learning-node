var fs = require('fs')

var data = {
    name: 'Lucas'
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
    try {
        console.log('write finished')
    } catch (error) {
        console.error(err)
    }
})
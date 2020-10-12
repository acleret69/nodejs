const { fstat } = require('fs')
let http = require('http')

let server = http.createServer()

server.on('request', (request,response) => {
    response.writeHead(200 , {
        'content-type': 'text/html; charset =utf-8'
    })

    response.end('Hello Word')

})
server.listen('8080')




    
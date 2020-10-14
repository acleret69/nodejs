var http = require('http')
var url = require ("url")
var fs =require ('fs')
const { type } = require('os')

let server = http.createServer()

server.on('request' , (request,response) => {

    var url_parts = url.parse(request.url)
    //console.log(url_parts.path)

    if(url_parts.path == '/ajax')
    {
        response.setHeader('Content-Type','application/json');
        response.end(JSON.stringify({message: "hello wordl ajax"}))
    }
    else
    {
        response.writeHead(200 , {
            'content-type': 'text/html; charset =utf-8'
            
        })
        response.end('Hello Word')
    }

})
server.listen('8080')


    
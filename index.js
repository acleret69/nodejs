var http = require('http')
var url = require ("url")
var fs =require ('fs')
const { type } = require('os')
const { constants } = require('buffer')

const server = http.createServer()

server.on('request' , (request,response) => {

    var url_parts = url.parse(request.url)
    //console.log(url_parts.path)
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, 
      }

      if (request.method === "OPTIONS") {
        resquest.writeHead(204, headers)
        resquest.end()
        return
      }

    if(url_parts.path == '/ajax')
    {
        response.setHeader('Content-Type','application/json');
        response.end(JSON.stringify({message: "hello world ajax"}))
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


    
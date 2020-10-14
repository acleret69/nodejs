let http = require('http')
let url = require ("url")
let fs =require ('fs')

let server = http.createServer()

     const urlObject=url.parse(request.url, true)
     const fileName = urlObject.pathname
    console.log(fileName.toString())

server.on('request', (request,response) => {
console.log(urlObject.toString())

    if()
    {
        console.log('request was made: ' + Request.url);
        response.writeHead(200, {'Content-Type' : 'application/json'});
        var myObj = {message : 'Hello world ajax'}        
    } 
    else 
    {
        response.writeHead(200 , {
            'content-type': 'text/html; charset =utf-8'
        })
        console.log("hello World")
        response("Hello Word")
        
    }
    response.end();
})
server.listen('8080')




// const { fstat } = require('fs')
// let http = require('http')
// let url = require('url')

// let server = http.createServer()

// server.on('request', (request,response) => {

//     const urlObject=url.parse(request.url, true)
//     const fileName = urlObject.pathname
//     console.log(fileName)


//     if (request.fileName = '/ajax'){
//     response.writeHead(200 , {
//         'content-type': 'text/html; charset =utf-8'
//     })
//     console.log('good')

//     response.end('Hello Word')
//     }

//     else 
//      reponse.writeHead(200)

//      console.log('error')
//      reponse.end('error')

// }) 
// server.listen('8080');


    
var http = require('http')
var url = require ("url")
var fs =require ('fs')
const mysql = require('mysql')
const { type } = require('os')
const { constants } = require('buffer')
const { data } = require('jquery')

const APP_HOST = process.env.APP_HOST;
const APP_USER = process.env.APP_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const APP_DATABASE = process.env.APP_DATABASE;

console.log(APP_HOST)
console.log(APP_USER)
console.log(APP_PASSWORD)
console.log(APP_DATABASE)

const server = http.createServer()

server.on('request' , (request,response) => {

    var url_parts = url.parse(request.url)
    
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET , GETJSON,DELETE",
        "Access-Control-Max-Age": 2592000, 
      }

      if (request.method === "OPTIONS") {
        response.writeHead(204, headers)
        response.end()
        return
      }

    if(url_parts.pathname == '/ajax')
    {
        response.setHeader('Content-Type','application/json')
        response.writeHead(200,headers)
        response.end(JSON.stringify({message: "hello world ajax"}))
    }
    else if (url_parts.pathname == '/user')
    {
      var con = mysql.createConnection({

        host: APP_HOST,
     
        user: APP_USER,
     
        password: APP_PASSWORD,
     
        database : APP_DATABASE
     
      });
     
       con.connect(function(err) {
     
        if (err) throw err;
     
        console.log("Connecté à la base de données MySQL!");

        con.query("SELECT * FROM user ", 
        
        function (err, result) {
     
            if (err) throw err;
     
            console.log(result);
            console.log(JSON.stringify(result[0]))
            response.setHeader('Content-Type','application/json')
            response.writeHead(200,headers)
            response.end(JSON.stringify(result))
     
          });
     
      }); 

    }
    else if (url_parts.pathname == '/user_delete')
    {
      var con = mysql.createConnection({

        host: APP_HOST,
     
        user: APP_USER,
     
        password: APP_PASSWORD,
     
        database : APP_DATABASE
     
      });
     
       con.connect(function(err) {
     
        if (err) throw err;
     
        console.log("Connecté à la base de données MySQL!");

        con.query("Delete FROM user where id = '"+user_id+" ",

        console.log("L'utilisateur as été supprimer "),
        
        function (err, result) {
     
            if (err) throw err;
     
            console.log(result);
            console.log(JSON.stringify(result[0]))
            response.setHeader('Content-Type','application/json')
            response.writeHead(200,headers)
            response.end(JSON.stringify(result))
     
          });
     
      }); 

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

    
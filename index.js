var http = require('http')
var url = require ("url")
var fs =require ('fs')
const mysql = require('mysql')
const { type } = require('os')
const { constants } = require('buffer')

const App_host = process.env.App_host;
const App_user = process.env.App_user;
const App_password = process.env.App_password;
const App_database = process.env.App_database;

console.log(App_host)
console.log(App_user)
console.log(App_password)
console.log(App_database)

const server = http.createServer()

server.on('request' , (request,response) => {

    var url_parts = url.parse(request.url)
    
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET , GETJSON",
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
    else if (url_parts.pathname == '/User')
    {
      var con = mysql.createConnection({

        host: App_host,
     
        user: App_user,
     
        password: App_password,
     
        database : App_database
     
      });
     
       con.connect(function(err) {
     
        if (err) throw err;
     
        console.log("Connecté à la base de données MySQL!");

        con.query("SELECT * FROM user ", 
        
        function (err, result) {
     
            if (err) throw err;
     
            //console.log(result);
            //console.log(JSON.stringify(result[0]))
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

    
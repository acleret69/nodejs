var http = require('http')
var url = require("url")
var fs = require('fs')
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

function doQuery(onConnectFunction) {
  var con = mysql.createConnection({
    host: APP_HOST,
    user: APP_USER,
    password: APP_PASSWORD,
    database: APP_DATABASE
  });

  con.connect(function (err) {
    if (err) throw err;
    onConnectFunction(con);
  });
}

server.on('request', (request, response) => {

  console.log('request', request)

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

  if (url_parts.pathname == '/ajax') {
    response.setHeader('Content-Type', 'application/json')
    response.writeHead(200, headers)
    response.end(JSON.stringify({ message: "hello world ajax" }))
  }
  else if (url_parts.pathname == '/user') {
    doQuery(function(con){
      console.log("Connecté à la base de données MySQL!");
      con.query("SELECT * FROM user ",
        function (err, result) {
          if (err) throw err;
          console.log(result);
          console.log(JSON.stringify(result[0]))
          response.setHeader('Content-Type', 'application/json')
          response.writeHead(200, headers)
          response.end(JSON.stringify(result))
        });
    });

  }else if (url_parts.pathname == '/user_delete' && request.method== 'DELETE') {
    doQuery(function(con){
      console.log("Connecté à la base de données MySQL!"); // connect db
      let body = '';
      request.on('data', chunk => {
      body += chunk.toString(); 
      });
      request.on('end', () => {
      console.log(body);
      var user_id = body.slice(8);
      con.query("DELETE FROM user WHERE id = ?",[user_id], //query sql
        function (err, result) { // résultat query
          if (err) throw err;
            con.query("SELECT * FROM user ",
            function (err, result) {
              if (err) throw err;
              console.log(result);
              console.log(JSON.stringify(result[0]))
              response.setHeader('Content-Type', 'application/json')
              response.writeHead(200, headers)
              response.end(JSON.stringify(result))
          });
        });
      });     
    });
  }else if (url_parts.pathname == '/user_create' && request.method == 'POST'){
    doQuery(function(con){
      console.log("Connecté à la base de données MySQL!"); // connect db
      let body = '';
      request.on('data', chunk => {
      body += chunk.toString(); 
      });
      request.on('end', () => {
      console.log(body);
      var user_id = body.slice(8,10);
      console.log(user_id);
      var user_name = body.slice(21,27);
      console.log(user_name);
      var user_age = body.slice(37,39);
      console.log(user_age);
      var user_prenom= body.slice(52);
      console.log(user_prenom);
      var post = {id:user_id, Name:user_name, Age:user_age, Prénom:user_prenom};
      con.query("INSERT INTO user SET ?",post, //query sql
      function (err, result) { // résultat query
        if (err) throw err;
          con.query("SELECT * FROM user ",
          function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log(JSON.stringify(result[0]))
            response.setHeader('Content-Type', 'application/json')
            response.writeHead(200, headers)
            response.end(JSON.stringify(result))
          });
        });
      });    
    }); 
  }
  else {
    response.writeHead(200, {
      'content-type': 'text/html; charset =utf-8'
    })
    response.end('Hello Word')
  }
})
server.listen('8080')


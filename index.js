var http = require('http');
var url = require("url");
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const util = require('util');;


const APP_HOST = process.env.APP_HOST;
const APP_USER = process.env.APP_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const APP_DATABASE = process.env.APP_DATABASE;

console.log(APP_HOST)
console.log(APP_USER)
console.log(APP_PASSWORD)
console.log(APP_DATABASE)

let config = {
  host: APP_HOST,
  user: APP_USER,
  password: APP_PASSWORD,
  database: APP_DATABASE
}

function makeDb(config) {
  console.log("config :", config)
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },

  };
}

let recupId = function (request) {
  return new Promise((resolve) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    })
    request.on('end', () => {
      console.log(body);
      var user_id = body.slice(8);
      resolve(user_id);
    })
  }
  )
};

let recupData = function (request) {
  return new Promise((resolve) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      console.log(body);
      body = body.split('&');
      var user_id = uuidv4();
      user_id = user_id.split('-');
      user_id = user_id[0];
      console.log(user_id);
      var user_name = body[0].slice(10);
      console.log(user_name);
      var user_age = body[1].slice(9);
      console.log(user_age);
      var user_prenom = body[2].slice(12);
      console.log(user_prenom);
      var post = { id: user_id, Name: user_name, Age: user_age, Prénom: user_prenom };
      resolve(post);
    })
  })
}

const server = http.createServer();
server.on('request', async (request, response) => {

  console.log('request')//,request)

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

  if (url_parts.pathname == '/user' && request.method == 'DELETE') {
    const db = makeDb(config);
    try {
      const user_id = await recupId(request);
      console.log("user_id :", user_id);
      const result_delete = await db.query("DELETE FROM user WHERE id = ?", [user_id]);
      console.log(result_delete)
      const result = await db.query('SELECT * FROM user');
      console.log(result);
      console.log(JSON.stringify(result[0]));
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200, headers);
      response.end(JSON.stringify(result));
    } catch (err) {
      console.log("Erreur", err);
      throw err;
    } finally {
      await db.close();
    }

  } else if (url_parts.pathname == '/user' && request.method == 'POST') {

    const db = makeDb(config);
    try {
      const post = await recupData(request);
      const result_post = await db.query("INSERT INTO user SET ?", post);
      console.log(result_post);
      const result = await db.query('SELECT * FROM user');
      console.log(result);
      console.log(JSON.stringify(result[0]));
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200, headers);
      response.end(JSON.stringify(result));
    } catch (err) {
      console.log("Erreur", err);
      throw err;
    } finally {
      await db.close();
    }
  }
  else {
    db = makeDb(config);
    try {
      console.log("SELECT * Connecté");
      const result = await db.query('SELECT * FROM user');
      console.log(result);
      console.log(JSON.stringify(result[0]));
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200, headers);
      response.end(JSON.stringify(result));
    } catch (err) {
      console.log("Erreur");
      throw err;
    } finally {
      await db.close();
    }
  }
})
server.listen('8080')


'use strict';
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM wt_media',
      (err, results, fields) =>{
        console.log(results);
        res.send(results);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO wt_media (category, title, details, thumbnail, image, original, coordinates) VALUES (?, ?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};
const update = (data, connection) => {

  connection.execute(
      `UPDATE LOW_PRIORITY wt_media SET ${data[0]} = "${data[1]}" where mID = ${data[2]};`,
      (err, results, field) => {
        console.log(results);
        console.log(err);
        console.log(field);
      }
  )
};

const search = (connection, req, res)=>{
  console.log(req.body);
  const data = [req.body.type, req.body.search];
  connection.query(
      'SELECT * FROM wt_media WHERE  ${req.body.type}=?', req.body.search,
      (err, results, fields)=>{
        console.log(results);
        res.send(results);
      }
  );
};
const remove = (connection, id, res)=>{
  console.log(id);
  connection.query(
      'DELETE FROM wt_media WHERE mID= ?', id,
      (err, results, fields)=>{
        console.log('remove');
      }
  );
  res.send('delete '+id);
};
module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  update:update,
  remove:remove,
  search:search,
};

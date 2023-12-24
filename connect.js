var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const sql = require('mssql');
const conn = require('connect');
// Cấu hình kết nối đến SQL Server
const config = {
  user: 'sa',
  password: '123456',
  server: 'DESKTOP-8ID1E1D',
  database: 'QLNhaKhoa',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: 'SQL Server'
};

const connn = new sql.ConnectionPool(config).connect().then(pool => {
  console.log(pool)
  return pool;
});

console.log(connn)

module.exports = {
  conn: connn,
  sql: sql
}
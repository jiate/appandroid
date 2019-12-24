var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
const cors = require("cors")
const mysql = require("mysql")
const bodyParser = require('body-parser')
const api = require("./api")        

let nodeGet = require("./nodeGet")
const option={
   host : '172.20.222.230',
   user : 'root',
   password:'123456',
   port : "33061",
   database :'vworkdev',
   connectTimeout:5000,
   multipleStatements:false
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
// const conn =mysql.createConnection(option);
const {pool,router,Result}= require('./sqlApi')

let conn;
// reconn();


 
 
 
// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
  
    if(pathname=='/'){
        pathname = "/index.html";
    }
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         response.writeHead(200, {'Content-Type': 'text/html'});    
         response.write(data.toString());        
      }
      response.end();
   });   
}).listen(8082,()=>console.log("8082服务启动"));
app.all("*", function (req, res,next) {
   next();
})
app.all("/", function (req, res,next) {
   pool.getConnection((err,conn)=>{
      res.json({a:'b'})
      conn.release(); //释放连接池，等待别的连接使用
   })
})
app.use('/api',api)

app.listen(8083,()=>console.log("8083服务启动"));
// function Result({code=1,msg='',data={}}){
//    this.code=code,
//    this.msg=msg;
//    this.data = data;
// }
// function reconn(){
//    conn = mysql.createConnection(option)
//    conn.on("error",err=>ree.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn,2000);)
// }
var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
const cors = require("cors")
const mysql = require("mysql")
const bodyParser = require('body-parser')
const router = express.Router();
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
const conn =mysql.createConnection(option);

 
 
 
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
}).listen(8082);
app.all("*", function (req, res,next) {
   conn.query('SELECT * FROM ACT_RU_EXECUTION limit 100,10',(e,r)=>res.json(new Result({data:r})))
  
//   res.send('Hello World啊哈');
   // next();
})

app.get("/", function (req, res) {
    console.log( url.parse(req.url).pathname,req.baseUrl)
    // if(){

    // }
   res.send('Hello World啊哈');
})
app.get('/nihao/*', function (req, res) {
   conn.query('SELECT * FROM jianfengTest',(e,r)=>res.json(new Result({data:r})))
    // if(){

    // }
    
   res.json("/index.html");
})
app.post('/test', function (req, res) {
   conn.query('SELECT * FROM jianfengTest',(e,r)=>res.json(new Result({data:r})))
//   return res.json({query:req.query,data:req.params,json:req.body})
})
 
var server = app.listen(8083, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
function Result({code=1,msg='',data={}}){
   this.code=1,
   this.msg='';
   this.data = data;
}
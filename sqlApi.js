const express = require('express');
const mysql =require('mysql');
const cors =require("cors");
const bodyParser = require('body-parser'); //解析参数
const app =express();
const router = express.Router();
const option={
    host : '172.20.222.230',
    user : 'root',
    password:'123456',
    port : "33061",
    database :'vworkdev',
    connectTimeout:5000, //连接超时
    multipleStatements:true // 是否允许一个query中包含多条sql语句
 }
 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));

 let pool;
 repool();

 function Result({code=1,msg='',data={}}){
    this.code=code,
    this.msg=msg;
    this.data = data;
 }
 function repool(){ //
    pool = mysql.createPool({
        ...option,
        waitForConnections:true,//当无连接池可以用时，等待（true）还是抛出错误(false)
        connectionLimit:100, // 连接数限制
        queueLimit: 0 , // 最大连接等待数（0为不限制）
    });
    pool.on("error",err=>err.code === 'PRONTDCOL_CCNNECTION_LOST' && setTimeout(repool,2000))

 }
 module.exports={pool,Result,router,app}
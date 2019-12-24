const {pool,router,Result}= require('./sqlApi')
router.get('/nihao',(req,res)=>{
    pool.getConnection((err,conn)=>{
        conn.query('SELECT * FROM ACT_RU_EXECUTION limit 100,10',(e,r)=>res.json(new Result({data:r})));
        conn.release();
    })
})
router.post('/nihao',(req,res)=>{
    pool.getConnection((err,conn)=>{
        conn.query('SELECT * FROM ACT_RU_EXECUTION limit 10,1000',(e,r)=>res.json(new Result({data:r})));
        conn.release();
    })
})
module.exports=router;
var express=require('express')
var router=express.Router()
var pool=require('./pool');
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage=new LocalStorage('./scratch')
var Admin=require('./adminModel')

router.get('/adminlogin',function(req,res,next){
    res.render('adminlogin',{msg:''})
})





 router.get('/dashboard', function(req, res, next) {
   res.render('dashboard',{msg:'',data:""});
  });
router.post('/chklogin', function(req,res,next){
    Admin.find({$or:[{emailid:req.body.emailid},{emailid:req.body.emailid}],password:req.body.password}).then((result)=>{

        if(result.length==1)
        {
            res.render('dashboard',{data:result[0]})
            localStorage.setItem('ADMIN',JSON.stringify(result))
        }
        else
        {
            res.render('adminlogin',{msg:'Invalid Email/Password'})
        }
    }).catch((e)=>{
        res.render('adminlogin',{msg:"Something Went Wrong"})
    })
})

router.get('/logout',function(req,res,next){
    localStorage.clear()
    res.redirect('adminlogin')
})
module.exports=router

// var express = require('express');
// var router = express.Router();
// var pool=require('./pool')
// var LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');
// /* GET home page. */
// function checkAdminSession()
// { try{
//    var admin=JSON.parse(localStorage.getItem('ADMIN'))
//    if(admin==null)
//    { return false}
//    else
//    {
//     return admin
//    }
   
// }
// catch(e)
// {
//   return false
// }
// }



// router.get('/adminlogin', function(req, res, next) {
//   var data=checkAdminSession()
//   if(data)
//   {
//     res.render('dashboard',{userdata:data});
//   }
//   else
//   {
//   res.render('adminlogin',{msg:''});
//   }
// });
// router.get('/logout', function(req, res, next) {
//   localStorage.clear()
//   res.redirect('/admin/adminlogin')
// });


// router.get('/dashboard', function(req, res, next) {
//   res.render('dashboard',{msg:''});
// });


// router.post('/chklogin', function(req, res, next) {
//   pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
//     if(error)
//     {

//       res.render('adminlogin',{msg:'Database Error.....'});
//     }
//     else
//     {
//       if(result.length==1)
//       { res.render('dashboard',{userdata:result[0]});
//         localStorage.setItem('ADMIN',JSON.stringify(result[0]))
//     }
//       else
//       {
//         res.render('adminlogin',{msg:'Invalid Emailid/Password'});
//       }
      

//     }


//   })
  
// });


// module.exports = router;

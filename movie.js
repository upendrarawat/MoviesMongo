var express = require('express');
var State = require('./stateModel')
var City = require('./cityModel')
var Movie=require("./moviedetailsModel")
const {ObjectId} = require('mongodb')
var router = express.Router();
var upload = require("./multer")
router.get('/movieinterface', function (req, res, next) {
  var state = new State()
  var cityModel = new City()
  res.render('movieinterface', { status: 0 });
});

router.post("/movie_submit", upload.single('poster'), function (req, res, next) {
  console.log(req.body);
  var body = { ...req.body, poster: req.file.filename }
  var movie = new Movie(body)
  movie.save().then((saveData) => {
    if (movie == saveData)
      res.render('movieinterface', { status: 2 });
    else { res.render('movieinterface', { status: 1 }) }
  })
})

router.get('/fetch_all_state', async function (req, res, next) {
  await State.find({}).then((result) => {
    res.status(200).json({ data: result });

  }).catch((e) => {
    res.status(200).json({ data: 'Server Error' });

  })

})

router.get('/fetch_all_city', async function (req, res, next) {
  await City.find({ "stateid._id": req.query.stateid }).then((result) => {
    res.status(200).json({ data: result });

  }).catch((e) => {
    res.status(200).json({ data: 'Server Error' });

  })
});

// router.get('/displayallmovies', async function (req, res, next) {
//   await Movie.find({}).then((result) => {
//     res.render('displayallmovies', { data: result });

//   }).catch((e) => {
//     res.render('displayallmovies', { data: [] });
//   })

// })

router.get('/displayallmovies', async function (req, res, next) {
  await Movie.aggregate(
    [
      {
        $lookup: {
          from: "states",
          localField: "stateid",
          foreignField: "_id",
          as: "stateData",
        },
      },
       {
         $lookup: {
           from: "cities",
           localField: "cityid",
           foreignField: "_id",
          as: "cityData",
        },
       },
    ],
    { $unwind: "$stateData" },
    { $unwind: "$cityData" }
  ).then((result) => {
    console.log("Result",result[0].stateData[0].statename);
    console.log("Result", result)
    res.render('displayallmovies', {
      status: true,
      data: result,
    });
  
  })
})

router.get('/showmovietoedit', async function (req, res, next) {
await Movie.aggregate(
  [
    {
      $lookup: {
        from: "states",
        localField: "stateid",
        foreignField: "_id",
        as: "stateData",
      },
    },
     {
       $lookup: {
         from: "cities",
         localField: "cityid",
         foreignField: "_id",
        as: "cityData",
      },
     },
     {$match: {_id: new ObjectId(req.query.mid)}},
  ],

  { $unwind: "$stateData" },
  { $unwind: "$cityData" }
).then((result) => {
  console.log("Result",result[0].stateData[0].statename);
  console.log("Result", result)
  res.render('showmovietoedit', {
    status: true,
    data: result[0],
  });

});

})

//router.post('/movie_edit_data',function(req,res){
  //var {movieid,btn,...data}=req.body
  //Movie.updateOne({_id:req.body.movieid},data).than((result)=>{
   // res.redirect("/movie/displayallmovies")
  //}).catch((e)=>{
    //res.redirect("/movie/displayallmovies")
  //})

//})

router.post('/movie_edit_data',function(req,res){
  var {movieid,btn,...data}=req.body 
  console.log(req.body) 
  if(btn=="Edit")
  {
  Movie.updateOne({_id:req.body.movieid},data).then((result)=>{
  
  res.redirect("/movie/displayallmovies")
  
  }).catch((e)=>{
    res.redirect("/movie/displayallmovies")
  })
  }
  else
  {
  
    Movie.deleteOne({_id:req.body.movieid}).then((result)=>{
  
      res.redirect("/movie/displayallmovies")
      
      }).catch((e)=>{
        res.redirect("/movie/displayallmovies")
      })
      
  }
  
  })

  router.get('/showmoviepostertoedit',function(req,res,next){
    res.render('showmoviepostertoedit',{data:req.query})
  })

  router.post('/editmovieposter',upload.single('poster'),function(req,res,next){
    Movie.updateOne({_id:req.body.mid},{poster:req.file.filename}).then((result)=>{
      res.redirect('displayallmovies')
    }).catch((e)=>{
      res.redirect('displayallmovies')
    })
  })
  




  //////////////////////////////////
  
router.get('/displayallmoviescard', async function (req, res, next) {
  await Movie.aggregate(
    [
      {
        $lookup: {
          from: "states",
          localField: "stateid",
          foreignField: "_id",
          as: "stateData",
        },
      },
       {
         $lookup: {
           from: "cities",
           localField: "cityid",
           foreignField: "_id",
          as: "cityData",
        },
       },
    ],
    { $unwind: "$stateData" },
    { $unwind: "$cityData" }
  ).then((result) => {
    console.log("Result",result[0].stateData[0].statename);
    console.log("Result", result)
    res.render('displayallmoviescard', {
      status: true,
      data: result,
    });
  
  })
})

router.get('/showmovietoedit', async function (req, res, next) {
await Movie.aggregate(
  [
    {
      $lookup: {
        from: "states",
        localField: "stateid",
        foreignField: "_id",
        as: "stateData",
      },
    },
     {
       $lookup: {
         from: "cities",
         localField: "cityid",
         foreignField: "_id",
        as: "cityData",
      },
     },
     {$match: {_id: new ObjectId(req.query.mid)}},
  ],

  { $unwind: "$stateData" },
  { $unwind: "$cityData" }
).then((result) => {
  console.log("Result",result[0].stateData[0].statename);
  console.log("Result", result)
  res.render('showmovietoedit', {
    status: true,
    data: result[0],
  });

});

})

//router.post('/movie_edit_data',function(req,res){
  //var {movieid,btn,...data}=req.body
  //Movie.updateOne({_id:req.body.movieid},data).than((result)=>{
   // res.redirect("/movie/displayallmovies")
  //}).catch((e)=>{
    //res.redirect("/movie/displayallmovies")
  //})

//})

router.post('/movie_edit_data',function(req,res){
  var {movieid,btn,...data}=req.body 
  console.log(req.body) 
  if(btn=="Edit")
  {
  Movie.updateOne({_id:req.body.movieid},data).then((result)=>{
  
  res.redirect("/movie/displayallmoviescard")
  
  }).catch((e)=>{
    res.redirect("/movie/displayallmoviescard")
  })
  }
  else
  {
  
    Movie.deleteOne({_id:req.body.movieid}).then((result)=>{
  
      res.redirect("/movie/displayallmoviescard")
      
      }).catch((e)=>{
        res.redirect("/movie/displayallmoviescard")
      })
      
  }
  
  })

  router.get('/showmoviepostertoedit',function(req,res,next){
    res.render('showmoviepostertoedit',{data:req.query})
  })

  router.post('/editmovieposter',upload.single('poster'),function(req,res,next){
    Movie.updateOne({_id:req.body.mid},{poster:req.file.filename}).then((result)=>{
      res.redirect('displayallmoviescard')
    }).catch((e)=>{
      res.redirect('displayallmoviescard')
    })
  })
  
  module.exports = router;
  






const mongo = require('mongodb')
const mongoose = require('mongoose')
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI
mongoose.connect(mongo_uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log('MongoDB connection successful'))
.catch((error)=> console.error('MongoDB connection error',error));

// the schema

let personSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true 
    },
    age: Number,
    favoriteFoods : [String]
    })

//   the model

let personModel = mongoose.model('Person',personSchema);

// the prototype
let prs = new personModel({
    name : 'yosra',
    age : 32,
    favoriteFoods:['pasta','pizza']

})

// saving
prs.save()
    .then((doc) => console.log('new favorite food'))
    .catch((error) => console.log(error))

// creating an array of poeple
personModel.create([{name : 'mohamed', age: 24, favoriteFoods:['pizza',"mlewi"]},
        {name:'zeineb', age: 28, favoriteFoods:['ma9rouna','bsisa']}, 
        {name:'mariem', age:22, favoriteFoods:['tacos','masfouf']}]);

// finding a doc that have a given name
personModel.find({name: 'mohamed'}).then((res)=>console.log(res)).catch((err)=>console.error(err))

// finding a doc using findOne
personModel.findOne({favoriteFoods: 'pasta'}).then((res)=>console.log(res)).catch((err)=>console.error(err))

//Classic Updates by Running Find, Edit, then Save
personModel.findOne({_id: '6735ca73274733b667352fae'}).then((res)=>{
    console.log(res)
    res.favoriteFoods.push('lablebi')
    res.save().then((res)=>console.log(res))
}
).catch((err)=>console.error(err))

// New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate({name : "mariem"}, {age : 20}).then ((res)=>{
    console.log(res)
    res.save().then((res)=>console.log(res))
}).catch((err)=>console.error(err))

//Delete One Document
personModel.findOneAndDelete({_id : '6735c1b046bfb9fea4d63a97'}).then((res)=>{
    console.log(res)
}).catch((err)=>console.error(err))


//Delete Many Document
personModel.deleteMany({name : 'yosra'}).then((res)=>{
    console.log(res)
}).catch((err)=>console.error(err))

//Chain Search Query Helpers to Narrow Search Results
personModel.find({favoriteFoods :'burrito'}).sort({name:1}).limit(2).select({age:false}).exec().then((res)=>{
    console.log(res)
}).catch((err)=>console.error(err))


//Khai báo thư viện
var express = require('express');
const async = require('hbs/lib/async')
const mongodb = require('mongodb');
const{ObjectId} = require('mongodb');
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

//database
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://GCH200087:gch200087@cluster0.tkcln.mongodb.net/?retryWrites=true&w=majority'

//Cổng
const PORT = process.env.PORT
app.listen(PORT)
console.log("Server is up at " + PORT)

//----------------------------------------------------------------------------------------------------------------
//Index page
app.get('/', (req, res)=>{
    res.render('home')
})

//Add new product
app.get('/create', (req, res)=>{
    res.render('NewProduct')
})

app.post('/NewProduct', async (req, res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picURL = req.body.txtPicURL
    let description = req.body.txtDes
    let amount = req.body.txtAmount
    let toy = {
        'name':name,
        'price':price,
        'picURL':picURL,
        'description':description,
        'amount':amount 
    }
    let client = await MongoClient.connect(url);
    let dbo = client.db("ASM1644")
    await dbo.collection("Product").insertOne(product);
    if(product == null){
        res.render('/')
    }
    res.redirect('/viewAll')
})

//All product
app.get('/viewAll', async (req, res)=>{
    var page = req.query.page
    let client = await MongoClient.connect(url);
    let dbo = client.db("ASM1644");
    let products = await dbo.collection("Product").find().toArray()
    res.render('AllProduct', {'products':products})
})
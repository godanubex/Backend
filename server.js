const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mysql = require('mysql')
const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'project'
})

db.connect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const cors = require('cors')
app.use(cors())


app.post('/books',upload.single('Pic'),(req, res) => {
  console.log("Api/books")
  console.log(req.body);
  const name = req.body.name;
  const linename = req.body.linename;
  const Pic = req.file.buffer.toString('base64');
  const exp = req.body.exp;
  const ProNumber = req.body.ProNumber;
  const price = req.body.price;

  console.log(Pic);
  console.log('Right here')
  db.query("INSERT INTO testtttt (Product,Name,Picture,Des,Total,Price) VALUES(?,?,?,?,?,?)",
  [name,linename,Pic,exp,ProNumber,price],
  (err,results) => {
    if (err){
      console.log(err)
    } else {
      res.redirect('http://localhost:3000')
    }
  } )})

 
  app.get('/store', (req,res)=>{
    db.query("SELECT * FROM testtttt",(err , results)=>{
      if(err){
        console.log(err);
      } else {
        res.send(results);
      }
    })
  })

  app.put('/update', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE testtttt SET Product = ? WHERE id = ?", [name, id],(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  
  })
  app.put('/updateline', (req, res) =>{
    const id = req.body.id;
    const linename = req.body.linename;
    db.query("UPDATE testtttt SET Name = ? WHERE id = ?", [linename, id],(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  
  })
  app.put('/updateexp', (req, res) =>{
    const id = req.body.id;
    const exp = req.body.exp;
    db.query("UPDATE testtttt SET Des = ? WHERE id = ?", [exp, id],(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  
  })
  app.put('/updatepro', (req, res) =>{
    const id = req.body.id;
    const ProNumber = req.body.ProNumber;
    db.query("UPDATE testtttt SET Total = ? WHERE id = ?", [ProNumber, id],(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  
  })
  app.put('/updateprice', (req, res) =>{
    const id = req.body.id;
    const price = req.body.price;
    db.query("UPDATE testtttt SET Price = ? WHERE id = ?", [price, id],(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  
  })
  app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM testtttt WHERE id = ?",id,(err,results)=>{
      if (err){
        console.log(err);
      } else{
        res.send(results);
      }
    })
  })
  

  app.post('/delete/:id',(req, res)=>{
    console.log('delete')
    const id = req.params.id;
    console.log(id)
    db.query("DELETE FROM testtttt WHERE id = ?",id,(err,results)=>{
      if(err){
        console.log(err);
        res.send({"status" :  "fail"});
      } else{
        console.log("succ")
        res.send({"status" :  "Succ"});
      }
    })
  })


app.get('/', (req, res) => {
  res.send('Hello World')
})

const books = require('./db')
const { values } = require('./db')

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  res.json(books.find(book => book.id === req.params.id))
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
})
app.listen(3001, () => {
  console.log('Start server at port 3001.')
})

const express =require ('express')
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/library'
const ObjectId = require('mongodb').ObjectId

function insertBook(req,res){
  MongoClient.connect(url ,function(err ,db) {
    insertDocument(db,()=>{
      res.send('berhasil diinput')
      db.close()
    })
  })

  function insertDocument (db,callback){
    var collection = db.collection('Book')
    collection.insertOne({
      isbn:req.body.isbn,
      title:req.body.title,
      author:req.body.author,
      category:req.body.category,
      stock:req.body.stock
    },function (err,result) {

      callback(result);
    })
  }

}

function deleteBook(req,res) {
  MongoClient.connect(url ,function(err ,db) {
    deleteDocument(db,()=>{
      res.send('berhasil dihapus')
      db.close()
    })
  })

  function deleteDocument(db,callback){
    let newId = ObjectId(req.params.id)
    var collection = db.collection('Book')
    collection.deleteOne({
      _id : newId
    },(err, result)=>{
      callback(result)
    })
  }
}


function updateBook(req,res) {
  MongoClient.connect(url ,function(err ,db) {
    console.log("connect to server");
    updateDocument(db,()=>{
      res.send('berhasil diupdate')
      db.close()
    })
  })

  function updateDocument(db,callback){
    let newId = ObjectId(req.params.id)
    var collection = db.collection('Book')
    collection.updateOne({
      _id : newId
    },{
      $set: {
        isbn : req.body.isbn,
        title : req.body.title,
        author : req.body.author,
        category : req.body.category,
        stock : req.body.stock
      }
    },(err, result)=>{
      callback(result)
    })
  }
}

function viewBook(req,res) {

  MongoClient.connect(url ,function(err ,db) {
    getBooks(db,(docs)=>{
      res.send(docs)
      db.close()
    })
  })

  function getBooks(db,callback) {
    var collection = db.collection('Book')
    collection.find({}).toArray(function(err, docs){
      callback(docs)
    })
  }
}
module.exports = {insertBook,deleteBook,updateBook,viewBook};

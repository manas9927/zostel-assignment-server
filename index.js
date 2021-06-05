const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

var MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://manas_vivek_27:9927@cluster0.i2z8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fetch", (req, res) => {
    MongoClient.connect(connectionString, function (err, client) {
        if (err) throw err
      
        var db = client.db('zostel-assignment')
      
        db.collection('contacts').find().toArray(function (err, result) {
          if (err) throw err
      
        //   console.log(result)
        res.send(result);
        })
      })
});

let count = 0;

app.post("/upload", (req, res) => {
  count = count + 1;
  console.log(count);
  let status = "";
  MongoClient.connect(connectionString, function (err, client) {
    if (err) throw err
  
    var db = client.db('zostel-assignment')
  
    db.collection('contacts').insert(req.body, (err, res) => {
        if(err) 
        {
            throw err;
            status = "Failed";

            
        }
        status = "Successful";

        
    })
    res.send({status: status});
  });  
});

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
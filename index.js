const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kitchenmart'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//show all users
app.get('/api/users',(req, res) => {
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  //show single user
app.get('/api/users/:id',(req, res) => {
    let sql = "SELECT * FROM users WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  //add new user
app.post('/api/users',(req, res) => {
    let data = {
        name : req.body.name,
        email : req.body.email,                                                                                     
        phone  : req.body.phone,                                                                                    
        add1  : req.body.add1,                                                                                     
        add2   : req.body.add2,                                                                                    
        lanmark : req.body.lanmark,                                                                                   
        city    : req.body.city,                                                                                   
        pincode  : req.body.pincode,                                                                             
        token_id  : req.body.token_id,                                                                          
        pass_code  : req.body.pass_code,                                                                                
        time_stamp  : req.body.time_stamp,   
        cart_vendor  : req.body.cart_vendor,                                                                              
        is_prime : req.body.is_prime,
    };
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) 
      {
          print(err);
          throw err;
      }
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //Delete user
app.delete('/api/users/:id',(req, res) => {
    let sql = "DELETE FROM users WHERE usert_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //check prime
  app.get('/api/users/checkprime/:id',(req, res) => {
    let sql = "SELECT is_prime FROM users WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //get address
  app.get('/api/users/address/:id',(req, res) => {
    let sql = "SELECT add1,add2,lanmark,city,pincode FROM users WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   //set address
  
app.put('/api/products/:id',(req, res) => {
  let sql = 
  "UPDATE user SET add1='"+req.body.add1+"', add2='"+req.body.add2+"' ,lanmark='"+req.body.lanmark+"' city='"+req.body.city+"'pincode='"+req.body.pincode+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

  //update user => create this api by copying set address one
  
//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });


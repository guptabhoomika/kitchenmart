const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'database-1.cgcmy4infmjo.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'ayushdb123',
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
    let sql = "DELETE FROM users WHERE user_id="+req.params.id+"";
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
  
app.put('/api/users/address/:id',(req, res) => {
  let sql = 
  "UPDATE user SET add1='"+req.body.add1+"', add2='"+req.body.add2+"' ,lanmark='"+req.body.lanmark+"' city='"+req.body.city+"'pincode='"+req.body.pincode+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

  //update user => create this api by copying set address one



 //get products
  app.get('/api/product',(req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

 //get products
 app.get('/api/product/:id',(req, res) => {
  let sql = "SELECT * FROM product where id =" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

  //get products by vend
  app.get('/api/product/getV/:vendor_name',(req, res) => {
    name = req.params.vendor_name;

    let sql = "SELECT * FROM product where vendor_name = ? ";
    let query = conn.query(sql, name,(err, results) => {
      if(err) throw err;
      res.send(

        JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  
  
  //get products by catg
  app.get('/api/product/getC/:catg',(req, res) => {
    name = req.params.catg;
    console.log(name);
   
    let sql = "SELECT * FROM product where category = ?";
    console.log(sql);
    let query = conn.query(sql, name,(err, results) => {
      if(err) throw err;
      console.log(results);
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      
    });
  });

    //Delete product
app.delete('/api/product/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      
  });
});

 //get products by brand
 app.get('/api/product/getB/:brand',(req, res) => {
   name = req.params.brand
  let sql = "SELECT * FROM product where brand = ?";
  let query = conn.query(sql, name, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//set is_unavailable

app.put('/api/products/avail/:id',(req, res) => {
  let sql = 
  "UPDATE user SET isavail'"+req.body.add1+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get products by isavail
//pass 1 for true
// app.get('/api/product/avail/val',(req, res) => {
//   let sql = "SELECT * FROM product where isavail=" +req.params.val;
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });
// can be done in flutter show only whose isavail is 1

//post prod
app.post('/api/product',(req, res) => {
  let data = {
   
    name  : req.body.name,
    price : req.body.price,
    size : req.body.size,
    descp : req.body.descp,
    vendor_name : req.body.vendor_name,
    max_qty : req.body.max_qty,
    isavail : req.body.isavail,
    category : req.body.category,
    brand : req.body.brand,
    subcat : req.body.subcat,
    img  : req.body.img
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) 
    {
        //print(err);
        throw err;
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});



//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });


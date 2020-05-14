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
  "UPDATE users SET add1='"+req.body.add1+"', add2='"+req.body.add2+"' ,lanmark='"+req.body.lanmark+"' city='"+req.body.city+"'pincode='"+req.body.pincode+"' WHERE product_id="+req.params.id;
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


//get all orders
app.get('/api/orders',(req, res) => {
  let sql = "SELECT * FROM customer_orders";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get order by cust id
app.get('/api/orderscustomer/:id',(req, res) => {
  let sql = "SELECT * FROM customer_orders where customer_id = " + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get order by order id
app.get('/api/orders/:id',(req, res) => {
  let sql = "SELECT * FROM customer_orders where order_id = " + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//get customer name and address by order id

app.get('/api/orderscustomername/:id',(req, res) => {
  let sql = "SELECT users.name,users.add1,users.add2,users.lanmark,users.city,users.pincode FROM customer_orders JOIN users ON customer_orders.customer_id = users.user_id where order_id = " + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add orders
app.post('/api/orders',(req, res) => {
  let data = {
   
    customer_id: req.body.customer_id ,
    prod_id: req.body.prod_id,
    total_items : req.body.total_items,
    total_amt : req.body.total_amt,
    delievery_charge : req.body.delievery_charge,
    timeslot : req.body.timeslot,
    mode_of_payment : req.body.mode_of_payment,
    status_of_order : req.body.status_of_order,
    time_of_order : req.body.time_of_order,
    long_loc : req.body.long_loc,
    lat_loc : req.body.long_loc,
  };
  let sql = "INSERT INTO customer_orders SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) 
    {
        //print(err);
        throw err;
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//set status
app.put('/api/ordersstatus/:id',(req, res) => {
  let sql = 
  "UPDATE customer_orders SET status_of_order'"+req.body.status_of_order+"' WHERE order_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show all banners
app.get('/api/bannners',(req, res) => {
  let sql = "SELECT * FROM banner`";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show banner by location
 
 app.get('/api/bannnersloaction/:loc',(req, res) => {
  name = req.params.log;
  console.log(name);
 
  let sql = "SELECT * FROM location where banner_location = ?";
  console.log(sql);
  let query = conn.query(sql, name,(err, results) => {
    if(err) throw err;
    console.log(results);
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
  });
});

//add banners
app.post('/api/bannners',(req, res) => {
  let data = {
    banner_name : req.body.name,
banner_url : req.body.banner_url,
banner_type  : req.body.banner_type,
banner_location  : req.body.banner_location,
banner_desc : req.body.banner_desc,
 banner_status : req.body.banner_status
  };
  let sql = "INSERT INTO banner SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) 
    {
        //print(err);
        throw err;
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//make update manner









//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
  });


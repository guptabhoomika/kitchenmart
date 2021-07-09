const express = require('express');



const bodyParser = require('body-parser');


const cors = require('cors');

const app = express();



const mysql = require('mysql');




const axios = require('axios');



// parse application/json


app.use(cors());
app.use(bodyParser.json());





//create database connection



const conn = mysql.createConnection({



  host: 'database-1.cgcmy4infmjo.ap-south-1.rds.amazonaws.com',



  user: 'admin',



  password: 'ayushdb123',



  database: 'kitchenmart',



  multipleStatements: true



});







//connect to database



conn.connect((err) => {



  if (err) throw err;



  console.log('Mysql Connected...');



});







//show all users



app.get('/api/users', (req, res) => {



  let sql = "SELECT * FROM users";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//show test api



app.get('/api/Informadmin/:orderid/:userid', (req, res) => {

  let userdata = "SELECT * FROM users  where auth_id = '" + req.params.userid+ "'";
  let orderdata = "SELECT * FROM orders where order_id = " + req.params.orderid;

  let name = "";
  let phone = "";
  
  let amount = "";
  let items = "";

  let userquery = conn.query(userdata, (err, userresult) => {

     name = userresult[0]["name"];
    phone = userresult[0]["phone"];

    
   let orderquery = conn.query(orderdata, (err, orderresult) => {
    //  console.log(orderresult);
amount = orderresult[0]["total_amount"];
    if (err) throw err;


    
    console.log("code here");    
  
    console.log(name);
    console.log(phone);
    console.log(amount);



    
    let customerurl = 'http://www.bulksmsshortcode.com/sendsmsv2.asp?user=ayush1&password=ayush&sender=Internet&sendercdma=919860609000&text=Hello '+name+ ' ,Your order of Rs '+ amount+ ' is Successfully Placed. Your order will be delivered as early as possible. Your order id is '+ req.params.orderid+ '.\n\nThank you for placing order with Kitchenkart.\nFor any query Feel Free to Call 9893854119&PhoneNumber='+ phone +'&track=1';
    let ayushurl = 'http://www.bulksmsshortcode.com/sendsmsv2.asp?user=ayush1&password=ayush&sender=Internet&sendercdma=919860609000&text=New order of amount Rs ' + amount +' is placed by '+ name+'. Phone number is ' + phone +'&PhoneNumber=9424922610&track=1';


    axios.post(customerurl)
    .then(function (response) {
      // handle success
      console.log("sucess");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": "Failed" }));
     
    })
    .finally(function () {
      // always executed
    
    });
  

    axios.post(ayushurl)
    .then(function (response) {
      // handle success
      console.log("sucess");
      // console.log(response);
      
      // res.send(JSON.stringify({ "status": 200, "error": null, "response": "Done" }));
     
  
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": "Failed" }));
     
    })
    .finally(function () {
      // always executed
    
    });
  

    res.send(JSON.stringify({ "status": 200, "error": null, "response": "Done" }));

    })


 
// sms code


    if (err) throw err;

  });



  
});




// newsletter api


app.post('/api/newsletter/', (req, res) => {



  let data = {



name:req.body.name,
phone:req.body.phone

    

  };



  let sql = "INSERT INTO newsletter SET ?";



  let query = conn.query(sql, data, (err, results) => {



    if (err) {



      //print(err);



      throw err;

    }



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



// new get festive tile list

app.get('/api/festive/', (req, res) => {

let sql = "SELECT * FROM festiveSlider";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});





//show single user



app.get('/api/users/:id', (req, res) => {



  let sql = "SELECT * FROM users WHERE auth_id= '" + req.params.id + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//   //add new user



// app.post('/api/users',(req, res) => {



//     let data = {



//         name : req.body.name,



//         email : req.body.email,                                                                                     



//         phone  : req.body.phone,                                                                                    



//         add1  : req.body.add1,                                                                                     



//         add2   : req.body.add2,                                                                                    



//         lanmark : req.body.lanmark,                                                                                   



//         city    : req.body.city,                                                                                   



//         pincode  : req.body.pincode,                                                                             



//         token_id  : req.body.token_id,                                                                          



//         pass_code  : req.body.pass_code,                                                                                



//         time_stamp  : req.body.time_stamp,   



//         cart_vendor  : req.body.cart_vendor,                                                                              



//         is_prime : req.body.is_prime,



//     };



//     let sql = "INSERT INTO users SET ?";



//     let query = conn.query(sql, data,(err, results) => {



//       if(err) 



//       {



//           print(err);



//           throw err;



//       }



//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//     });



//   });







//add new user







app.post('/api/users', (req, res) => {









  let sql = "INSERT INTO users(name,email,phone,auth_id,add1,add2,lanmark,pincode) values( '" + req.body.name + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.auth_id + "','','','','')";





  let query = conn.query(sql, (err, results) => {





    if (err) {







      throw err;



    }







    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });







});























//Delete user



app.delete('/api/users/:id', (req, res) => {



  let sql = "DELETE FROM users WHERE user_id=" + req.params.id + "";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//check prime



app.get('/api/users/checkprime/:id', (req, res) => {



  let sql = "SELECT is_prime FROM users WHERE user_id=" + req.params.id;



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//get address



app.get('/api/users/address/:id', (req, res) => {



  let sql = "SELECT add1,add2,lanmark,city,pincode,phone FROM users WHERE auth_id= '" + req.params.id + "';";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//set address







app.put('/api/users/address/:id', (req, res) => {



  let sql =



    "UPDATE users SET add1= ? , add2 = ? , lanmark = ? , city = ? , pincode = ? WHERE auth_id=?";



  let data = [req.body.add1, req.body.add2, req.body.landmark, req.body.city, req.body.pincode, req.params.id];



  console.log(sql);



  let query = conn.query(sql, data, (err, results, fields) => {



    if (err) throw err;



    console.log('Rows affected:', results.affectedRows);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//update user => create this api by copying set address one








// new get brand list

app.get('/api/brand/', (req, res) => {

let sql = "SELECT * FROM brands";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});






//new get products



app.get('/api/product', (req, res) => {



  let sql = "select * from product  join vendors on product.vendor_tag = vendors.tag where stock_status >0";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});

// update Product

app.put('/api/product/update/:id', (req, res) => {

  let sql = "UPDATE product SET name = '"+  req.body.name  + "', max_price = '" + req.body.max_price + "' , sell_price ='" + req.body.sell_price + "', size = '" + req.body.size + "' WHERE product_id= '" + req.params.id+"'";
  console.log(sql);
  let query = conn.query(sql, (err, results, fields) => {
console.log(err);
    if (err) throw err;
    console.log('Rows affected:', results.affectedRows);
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));

  });

});






// Slug Api
app.get('/api/product/slug/:slug', (req, res) => {



  let sql = "SELECT * FROM product join vendors on product.vendor_tag = vendors.tag where product_slug = '" + req.params.slug + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});






//new get specific products



app.get('/api/product/:id', (req, res) => {



  let sql = "SELECT * FROM product join vendors on product.vendor_tag = vendors.tag where product_id =" + req.params.id;



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});











// new get vendor list



app.get('/api/vendor/', (req, res) => {

let sql = "SELECT * FROM vendors";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//new get products by vend



app.get('/api/product/getV/:vendor_name', (req, res) => {



  name = req.params.vendor_name;







  let sql = "SELECT * FROM product  join vendors on product.vendor_tag = vendors.tag where vendor_tag = ? And stock_status>0";



  let query = conn.query(sql, name, (err, results) => {



    if (err) throw err;



    res.send(







      JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});


// get notification by user

app.get('/api/notification/:id', (req, res) => {


console.log("notification api called");
  let sql = "SELECT * FROM notification where user_id = '" + req.params.id + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });

});






//new get products by catg



app.get('/api/product/getC/:catg', (req, res) => {



  name = req.params.catg;



  console.log(name);







  let sql = "SELECT * FROM product  join vendors on product.vendor_tag = vendors.tag where category = ? And stock_status>0";



  console.log(sql);



  let query = conn.query(sql, name, (err, results) => {



    if (err) throw err;



    console.log(results);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});







//new Delete product



app.delete('/api/product/:id', (req, res) => {



  let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});





//show screen views

app.get('/api/views/:tag', (req, res) => {

  let sql = "SELECT * FROM screenlist WHERE screenname = '" + req.params.tag + "'";

  let query = conn.query(sql, (err, results) => {

    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));


  });

});



//show sub catg

app.get('/api/product/view/:tag', (req, res) => {

  let sql = "SELECT * FROM product join vendors on product.vendor_tag = vendors.tag where subcat = '"+ req.params.tag +"' And stock_status>0";

  let query = conn.query(sql, (err, results) => {

    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));


  });

});







//new get products by brand



app.get('/api/product/getB/:brand', (req, res) => {



  name = req.params.brand



  let sql = "SELECT * FROM product  join vendors on product.vendor_tag = vendors.tag where brand = ?  And stock_status>0";



  let query = conn.query(sql, name, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//new set is_unavailable







app.put('/api/product/stockdown/:id', (req, res) => {



  let sql =



    // "UPDATE user SET isavail'"+req.body.add1+"' WHERE product_id="+req.params.id;

    "UPDATE product SET stock_status = '1' WHERE product_id = '" + req.params.id + "'";

  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



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



// app.post('/api/product',(req, res) => {



//   let data = {







//     name  : req.body.name,



//     price : req.body.price,



//     size : req.body.size,



//     descp : req.body.descp,



//     vendor_name : req.body.vendor_name,



//     max_qty : req.body.max_qty,



//     isavail : req.body.isavail,



//     category : req.body.category,



//     brand : req.body.brand,



//     subcat : req.body.subcat,



//     img  : req.body.img



//   };



//   let sql = "INSERT INTO product SET ?";



//   let query = conn.query(sql, data,(err, results) => {



//     if(err) 



//     {



//         //print(err);



//         throw err;



//     }



//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//   });



// });











//new get all orders



app.get('/api/orders', (req, res) => {



  let sql = "SELECT * FROM orders limit 500 offset 1000";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//new get order by cust id



app.get('/api/order/customer/:id', (req, res) => {



  let sql = "SELECT * FROM orders where user_id = '" + req.params.id + "'";




  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//new get order basic by order id



app.get('/api/order/id/:id', (req, res) => {



  let sql = "SELECT * FROM orders where order_id = '" + req.params.id + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });


});







//new get order items by order id



app.get('/api/order/items/:id', (req, res) => {


  let sql = "SELECT * FROM order_item where order_id = '" + req.params.id + "'";
let query = conn.query(sql, (err, results) => {

 if (err) throw err;
 res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));

  });


});


//new get product by tag



app.get('/api/product/tag/:tag', (req, res) => {


  let old = "SELECT * FROM product  join vendors on product.vendor_tag = vendors.tag where product.tag = '" + req.params.tag + "'";
   let sql = "SELECT * FROM product  join vendors on product.vendor_tag = vendors.tag where (product.tag ='" + req.params.tag + "') or (product.tag1 = '" + req.params.tag + "') or (product.tag2 = '" + req.params.tag + "')";
let query = conn.query(sql, (err, results) => {

 if (err) throw err;
 res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));

  });


});







//get customer name and address by order id







// app.get('/api/orderscustomername/:id',(req, res) => {



//   let sql = "SELECT users.name,users.add1,users.add2,users.lanmark,users.city,users.pincode FROM customer_orders JOIN users ON customer_orders.customer_id = users.user_id where order_id = " + req.params.id;



//   let query = conn.query(sql, (err, results) => {



//     if(err) throw err;



//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//   });



// });







//add orders



// app.post('/api/orders',(req, res) => {



//   let data = {







//     customer_id: req.body.customer_id ,



//     prod_id: req.body.prod_id,



//     total_items : req.body.total_items,



//     total_amt : req.body.total_amt,



//     delievery_charge : req.body.delievery_charge,



//     timeslot : req.body.timeslot,



//     mode_of_payment : req.body.mode_of_payment,



//     status_of_order : req.body.status_of_order,



//     time_of_order : req.body.time_of_order,



//     long_loc : req.body.long_loc,



//     lat_loc : req.body.long_loc,



//   };



//   let sql = "INSERT INTO customer_orders SET ?";



//   let query = conn.query(sql, data,(err, results) => {



//     if(err) 



//     {



//         //print(err);



//         throw err;



//     }



//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//   });



// });







//set status



// app.put('/api/ordersstatus/:id',(req, res) => {



//   let sql = 



//   "UPDATE customer_orders SET status_of_order'"+req.body.status_of_order+"' WHERE order_id="+req.params.id;



//   let query = conn.query(sql, (err, results) => {



//     if(err) throw err;



//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//   });



// });







//new show all banners



app.get('/api/banners/active', (req, res) => {



  let sql = "SELECT * FROM banner where banner_status = 'active'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});




//set token


app.put('/api/users/token/:id', (req, res) => {

  let sql = "UPDATE users SET token_id = '"+  req.body.token  + "' WHERE auth_id= '"+ req.params.id+"'";


  console.log(sql);



  let query = conn.query(sql, (err, results, fields) => {

console.log(err);

    if (err) throw err;



    console.log('Rows affected:', results.affectedRows);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//new get delivery charge



app.get('/api/order/delivery/:amount', (req, res) => {



  let sql = "SELECT * FROM delivery where price_tag = '" + req.params.amount + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });

});


// Place order v2







app.post('/api/v2/placeorder', (req, res) => {
  
  
  

  console.log("placeorder v2 called")



  var addIntoOrdersql = "INSERT INTO orders(order_id,user_id,max_amount,total_amount,vendor_tag,customer_name,total_items,vendor_name,delivery_charge,timeslot,mode_of_payment,status_of_order,customer_comment, time_of_order, long_loc,lat_loc,add1,add2,landmark,pincode,mobile_number,order_date,promocode,promoline) select '" + req.body.order_id + "',cart.user_id,SUM(cart.prod_quan * product.max_price) as max_price, SUM(cart.prod_quan * product.sell_price) as sell_price,product.vendor_tag,users.name ,count(*),vendors.vendor_name,' " + req.body.delivery + "  ','" + req.body.timeslot + " ','" + req.body.payment_mode + " ', 'ordered','" + req.body.user_comment + " ',current_timestamp,'" + req.body.lat + " ','" + req.body.long + " ', '" + req.body.add1 + " ','" + req.body.add2 + " ', '" + req.body.landmark + " ','" + req.body.pincode + " ','" + req.body.mobile_no + " ','" + req.body.order_date + " ','" + req.body.promocode +" ','" + req.body.promoline + "' from cart join users on users.auth_id = cart.user_id join product on cart.prod_id = product.product_id join  vendors on product.vendor_tag = vendors.tag  where cart.user_id = '" + req.body.user_id + "';"





  addIntoOrdersql += "INSERT INTO order_item (order_id,prod_max,prod_price,user_id,prod_qty,prod_id,vendor_tag,prod_name,prod_img) SELECT '" + req.body.order_id + "',product.max_price,product.sell_price,cart.user_id, cart.prod_quan, cart.prod_id,product.vendor_tag,product.name,product.img FROM cart join product on cart.prod_id = product.product_id join vendors on product.vendor_tag = vendors.tag WHERE cart.user_id = '" + req.body.user_id + "';"



 addIntoOrdersql += "delete from cart where user_id = '" + req.body.user_id + "';"

  

  

   addIntoOrdersql += "insert into notification(user_id,title,content,timestamp) value('" + req.body.user_id + "','New order Placed with order Id " + req.body.order_id + "','Thank you for ordering with KitchenKart','" + req.body.timestamp + "');"

  let query2 = conn.query(addIntoOrdersql, (err, results) => {


    if (err) {



      console.log(err);

      throw err;



    }


    console.log("calling sms api")
    axios.get('http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/informadmin/'+req.body.order_id+'/' + req.body.user_id)
    .then(function (response) {
      // handle success
      console.log("sucess");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": error.stringify }));
     
    })
    .finally(function () {
      // always executed
    
    });
  

    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));

  });

});





//new get promodetails


app.get('/api/promocode/:code', (req, res) => {



  let sql = "SELECT * FROM promocodes where promo_code = '" + req.params.code + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });

});







// update feedback

app.put('/api/orders/feedback/:id', (req, res) => {

  let sql = "UPDATE orders SET feedback = '"+  req.body.feedback  + "' WHERE order_id= '"+ req.params.id+"'";


  console.log(sql);


  let query = conn.query(sql, (err, results, fields) => {

console.log(err);

    if (err) throw err;

    console.log('Rows affected:', results.affectedRows);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});


// update delivery status

app.put('/api/orders/status/:id', (req, res) => {

  let sql = "UPDATE orders SET status_of_order = '"+  req.body.status  + "' WHERE order_id= '"+ req.params.id+"'";


  console.log(sql);


  let query = conn.query(sql, (err, results, fields) => {

console.log(err);

    if (err) throw err;

    console.log('Rows affected:', results.affectedRows);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});




// update payment method

app.put('/api/orders/payment/:id', (req, res) => {

  let sql = "UPDATE orders SET mode_of_payment = '"+  req.body.method  + "' WHERE order_id= '"+ req.params.id+"'";


  console.log(sql);


  let query = conn.query(sql, (err, results, fields) => {

console.log(err);

    if (err) throw err;

    console.log('Rows affected:', results.affectedRows);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//new show all banners



app.get('/api/banners/all', (req, res) => {



  let sql = "SELECT * FROM banner";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//new show banner by location

app.get('/api/banner/:loc', (req, res) => {



  // name = req.params.loc;



  // console.log(name);







  let sql = "SELECT * FROM banner where banner_location = '" + req.params.loc + "' AND banner_status = 'active' ";



  console.log(sql);



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    console.log(results);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});



// //add banners



// app.post('/api/bannners',(req, res) => {



//   let data = {



//     banner_name : req.body.name,



// banner_url : req.body.banner_url,



// banner_type  : req.body.banner_type,



// banner_location  : req.body.banner_location,



// banner_desc : req.body.banner_desc,



//  banner_status : req.body.banner_status



//   };



//   let sql = "INSERT INTO banner SET ?";



//   let query = conn.query(sql, data,(err, results) => {



//     if(err) 



//     {



//         //print(err);



//         throw err;



//     }



//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));



//   });



// });















//new add Cart Item



app.post('/api/cart/', (req, res) => {



  let data = {



    user_id: req.body.user_id,



    prod_id: req.body.prod_id,



    prod_quan: req.body.prod_qty,

  };



  let sql = "INSERT INTO cart SET ?";



  let query = conn.query(sql, data, (err, results) => {



    if (err) {



      //print(err);



      throw err;

    }



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



//new add a quantity value



app.put('/api/cart/add/:id', (req, res) => {



  let sql =



    "UPDATE cart SET prod_quan = prod_quan + 1 WHERE cart_id = '" + req.params.id + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});







//new substract a quantity value







app.put('/api/cart/sub/:id', (req, res) => {



  let sql =



    "UPDATE cart SET prod_quan = prod_quan - 1 WHERE cart_id ='" + req.params.id + "'";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});





//Delete user



app.delete('/api/cart/:id', (req, res) => {



  let sql = "DELETE FROM cart WHERE cart_id =" + req.params.id + "";



  let query = conn.query(sql, (err, results) => {



    if (err) throw err;



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});









//new show cart total by user



app.get('/api/cart/total/:id', (req, res) => {



  id = req.params.id;











  let sql = "select sum(prod_quan * product.max_price) as max_sum,sum(prod_quan * product.sell_price) as pay_sum,count(prod_quan) as total_items from cart join product on cart.prod_id = product.product_id where cart.user_id = '" + id + "'  group by user_id";



  console.log(sql);



  let query = conn.query(sql, id, (err, results) => {



    if (err) throw err;



    console.log(results);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});



//show cart by user



app.get('/api/cart/:id', (req, res) => {



  id = req.params.id;




  let sql = "SELECT * FROM cart join product on cart.prod_id = product.product_id where user_id = '" + id + "'";



  console.log(sql);



  let query = conn.query(sql, id, (err, results) => {



    if (err) throw err;



    console.log(results);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});







// new show cart summary



app.get('/api/cart/summary/:id', (req, res) => {



  id = req.params.id;







  let sql = "select count(*) as total_items,sum(product.max_price*cart.prod_quan) as max_price,sum(product.sell_price*cart.prod_quan) as sell_price,vendors.vendor_name,vendors.imageLink from cart join product on cart.prod_id = product.product_id join vendors on product.vendor_tag = vendors.tag where user_id = '" + id + "' group by product.vendor_tag";



  console.log(sql);



  let query = conn.query(sql, id, (err, results) => {



    if (err) throw err;



    console.log(results);



    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));







  });



});



















// Place order



app.post('/api/placeorder', (req, res) => {


  console.log("placeorder api basic called")

  let data = {



    // order_id: req.body.order_id,



    // user_id: req.body.user_id



  };



  //  json body sample

  // {

  //   "order_id": "567567",

  //   "user_id": 2,

  //   "delivery": 10,

  //   "timeslot": "1 day",

  //   "payment_mode": "Cash",

  //   "user_comment":"please deliver fast",

  //   "lat": "20.30.40",

  //   "long": "20.450.40",

  //   "add1": "adress 11",

  //   "add2": "addresss 2",

  //   "landmark": "landmark here",

  //   "pincode": "4232",

  //   "mobile_no": "9424922610"





  // }






  var addIntoOrdersql = "INSERT INTO orders(order_id,user_id,max_amount,total_amount,vendor_tag,customer_name,total_items,vendor_name,delivery_charge,timeslot,mode_of_payment,status_of_order,customer_comment, time_of_order, long_loc,lat_loc,add1,add2,landmark,pincode,mobile_number,order_date) select '" + req.body.order_id + "',cart.user_id,SUM(cart.prod_quan * product.max_price) as max_price, SUM(cart.prod_quan * product.sell_price) as sell_price,product.vendor_tag,users.name ,count(*),vendors.vendor_name,' " + req.body.delivery + "  ','" + req.body.timeslot + " ','" + req.body.payment_mode + " ', 'ordered','" + req.body.user_comment + " ',current_timestamp,'" + req.body.lat + " ','" + req.body.long + " ', '" + req.body.add1 + " ','" + req.body.add2 + " ', '" + req.body.landmark + " ','" + req.body.pincode + " ','" + req.body.mobile_no + " ','" + req.body.order_date + "' from cart join users on users.auth_id = cart.user_id join product on cart.prod_id = product.product_id join  vendors on product.vendor_tag = vendors.tag  where cart.user_id = '" + req.body.user_id + "';"


  addIntoOrdersql += "INSERT INTO order_item (order_id,prod_max,prod_price,user_id,prod_qty,prod_id,vendor_tag,prod_name,prod_img) SELECT '" + req.body.order_id + "',product.max_price,product.sell_price,cart.user_id, cart.prod_quan, cart.prod_id,product.vendor_tag,product.name,product.img FROM cart join product on cart.prod_id = product.product_id join vendors on product.vendor_tag = vendors.tag WHERE cart.user_id = '" + req.body.user_id + "';"

 addIntoOrdersql += "delete from cart where user_id = '" + req.body.user_id + "';"
  
  
   addIntoOrdersql += "insert into notification(user_id,title,content,timestamp) value('" + req.body.user_id + "','New order Placed with order Id " + req.body.order_id + "','Thank you for ordering with KitchenKart','" + req.body.timestamp + "');"






  let query2 = conn.query(addIntoOrdersql, data, (err, results) => {



    if (err) {



      console.log(err);



      throw err;



    }


    axios.get('http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/informadmin/'+req.body.order_id+'/' + req.body.user_id)
    .then(function (response) {
      // handle success
      console.log("sucess");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": error.stringify }));
     
    })
    .finally(function () {
      // always executed
    
    });
  


    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});



// Place order



app.post('/api/promoorder', (req, res) => {



  let data = {



    // order_id: req.body.order_id,



    // user_id: req.body.user_id



  };



  //  json body sample

  // {

  //   "order_id": "567567",

  //   "user_id": 2,

  //   "delivery": 10,

  //   "timeslot": "1 day",

  //   "payment_mode": "Cash",

  //   "user_comment":"please deliver fast",

  //   "lat": "20.30.40",

  //   "long": "20.450.40",

  //   "add1": "adress 11",

  //   "add2": "addresss 2",

  //   "landmark": "landmark here",

  //   "pincode": "4232",

  //   "mobile_no": "9424922610"





  // }






  var addIntoOrdersql = "INSERT INTO orders(order_id,user_id,max_amount,total_amount,vendor_tag,customer_name,total_items,vendor_name,delivery_charge,timeslot,mode_of_payment,status_of_order,customer_comment, time_of_order, long_loc,lat_loc,add1,add2,landmark,pincode,mobile_number,order_date) select '" + req.body.order_id + "',cart.user_id,SUM(cart.prod_quan * product.max_price) as max_price, SUM(cart.prod_quan * product.sell_price) as sell_price,product.vendor_tag,users.name ,count(*),vendors.vendor_name,' " + req.body.delivery + "  ','" + req.body.timeslot + " ','" + req.body.payment_mode + " ', 'ordered','" + req.body.user_comment + " ',current_timestamp,'" + req.body.lat + " ','" + req.body.long + " ', '" + req.body.add1 + " ','" + req.body.add2 + " ', '" + req.body.landmark + " ','" + req.body.pincode + " ','" + req.body.mobile_no + " ','" + req.body.order_date + "' from cart join users on users.auth_id = cart.user_id join product on cart.prod_id = product.product_id join  vendors on product.vendor_tag = vendors.tag  where cart.user_id = '" + req.body.user_id + "';"


  addIntoOrdersql += "INSERT INTO order_item (order_id,prod_max,prod_price,user_id,prod_qty,prod_id,vendor_tag,prod_name,prod_img) SELECT '" + req.body.order_id + "',product.max_price,product.sell_price,cart.user_id, cart.prod_quan, cart.prod_id,product.vendor_tag,product.name,product.img FROM cart join product on cart.prod_id = product.product_id join vendors on product.vendor_tag = vendors.tag WHERE cart.user_id = '" + req.body.user_id + "';"

 addIntoOrdersql += "delete from cart where user_id = '" + req.body.user_id + "';"
  
  
   addIntoOrdersql += "insert into notification(user_id,title,content,timestamp) value('" + req.body.user_id + "','New order Placed with order Id " + req.body.order_id + "','Thank you for ordering with KitchenKart','" + req.body.timestamp + "');"






  let query2 = conn.query(addIntoOrdersql, data, (err, results) => {



    if (err) {



      console.log(err);



      throw err;



    }


    axios.get('http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/informadmin/'+req.body.order_id+'/' + req.body.user_id)
    .then(function (response) {
      // handle success
      console.log("sucess");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": error.stringify }));
     
    })
    .finally(function () {
      // always executed
    
    });
  


    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});





// Place order 3

app.post('/api/v3/placeorder', (req, res) => {



console.log("placeorder v3 called")
  let data = {



    // order_id: req.body.order_id,



    // user_id: req.body.user_id



  };



  //  json body sample

  // {

  //   "order_id": "567567",

  //   "user_id": 2,

  //   "delivery": 10,

  //   "timeslot": "1 day",

  //   "payment_mode": "Cash",

  //   "user_comment":"please deliver fast",

  //   "lat": "20.30.40",

  //   "long": "20.450.40",

  //   "add1": "adress 11",

  //   "add2": "addresss 2",

  //   "landmark": "landmark here",

  //   "pincode": "4232",

  //   "mobile_no": "9424922610"





  // }






  var addIntoOrdersql = "INSERT INTO orders(order_id,user_id,max_amount,total_amount,vendor_tag,customer_name,total_items,vendor_name,delivery_charge,timeslot,mode_of_payment,status_of_order,customer_comment, time_of_order, long_loc,lat_loc,add1,add2,landmark,pincode,mobile_number,order_date) select '" + req.body.order_id + "',cart.user_id,SUM(cart.prod_quan * product.max_price) as max_price, SUM(cart.prod_quan * product.sell_price) as sell_price,product.vendor_tag,users.name ,count(*),vendors.vendor_name,' " + req.body.delivery + "  ','" + req.body.timeslot + " ','" + req.body.payment_mode + " ', 'ordered','" + req.body.user_comment + " ',current_timestamp,'" + req.body.lat + " ','" + req.body.long + " ', '" + req.body.add1 + " ','" + req.body.add2 + " ', '" + req.body.landmark + " ','" + req.body.pincode + " ','" + req.body.mobile_no + " ','" + req.body.order_date + "' from cart join users on users.auth_id = cart.user_id join product on cart.prod_id = product.product_id join  vendors on product.vendor_tag = vendors.tag  where cart.user_id = '" + req.body.user_id + "';"


  addIntoOrdersql += "INSERT INTO order_item (order_id,prod_max,prod_price,user_id,prod_qty,prod_id,vendor_tag,prod_name,prod_img) SELECT '" + req.body.order_id + "',product.max_price,product.sell_price,cart.user_id, cart.prod_quan, cart.prod_id,product.vendor_tag,product.name,product.img FROM cart join product on cart.prod_id = product.product_id join vendors on product.vendor_tag = vendors.tag WHERE cart.user_id = '" + req.body.user_id + "';"

 addIntoOrdersql += "delete from cart where user_id = '" + req.body.user_id + "';"
  
  
   addIntoOrdersql += "insert into notification(user_id,title,content,timestamp) value('" + req.body.user_id + "','New order Placed with order Id " + req.body.order_id + "','Thank you for ordering with KitchenKart','" + req.body.timestamp + "');"






  let query2 = conn.query(addIntoOrdersql, data, (err, results) => {



    if (err) {



      console.log(err);



      throw err;



    }

console.log("calling sms api")
    axios.get('http://ec2-13-232-236-5.ap-south-1.compute.amazonaws.com:3000/api/informadmin/'+req.body.order_id+'/' + req.body.user_id)
    .then(function (response) {
      // handle success
      console.log("sucess");
    
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      
      res.send(JSON.stringify({ "status": 200, "error": null, "response": error.stringify }));
     
    })
    .finally(function () {
      // always executed
    
    });
  







    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));



  });



});


//Server listening



app.listen(3000, () => {



  console.log('Server started on port 3000...');



});

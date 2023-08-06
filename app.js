const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const stripe = require('stripe')('sk_test_51NbNbmSE9kTDR6QCYJrA6KggCtCFfRSh3SJAjsjtIp0f6m2IENHJLfFfqGBRlQhPsnzJc2NNj0Ign6TdZOGPXNgS00ruLfne6i');
const https = require('https')
const mysql = require('mysql');
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.use("/public", express.static("public"));
const YOUR_DOMAIN = 'http://localhost:3000';

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password:"12345",
//   database: "richpanel",
//   insecureAuth : true
// });
//
// connection.connect(function(err) {
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Connected!");
//   }
// });

// var insert = 'insert into plan values("regular", 700, 7000, "Best", "1080p", "phone+tablet+computer")'

// connection.query(insert, function(error, results, fields){
//   if(error){
//     console.log(error);
//   }else{
//     console.log(results);
//   }
// });

app.get("/", function(req,res){
  res.render("logIn")
});

app.get('/signUp', function(req,res){
  res.render('signUp');
});
app.get("/logIn", function(req,res){
  res.render('logIn');
});

app.post("/planSelectionMonthly", function(req,res){
  // var q = 'SELECT monthly_price from plan;'
  // connection.query(q,function(err,results){
  // if(err){
  //   console.log(err);
  // }else{
  //   console.log(results[0]['monthly_price']);
  // };
  // connection.query(q,function(err,results){
  // if(err){
  //   console.log(err);
  // }else{
  //   var count = results[0].count;
  //   res.render("index",{count:count});
  //   console.log(count);
  // };
// });
  res.render('planSelectionMonthly');
})
app.get('/planSelectionMonthly', function(req, res){
  res.render('planSelectionMonthly')
})

app.post("/planSelectionMonthly-after", function(req,res){
  const price = req.body.data;
  var plan;
  var cycle =  "Monthly";
  console.log(price)
  if(price == 100){
    plan = "Mobile"
  }
  else if(price == 200){
    plan = "Basic";
  }
  else if(price == 500){
    plan = "Standard";
  }
  else{
    plan  = "Premium"
  }
  res.render('planSelectionMonthly-after', {price: price , plan:plan, cycle : cycle});
})
app.get('/planSelectionMonthly-after', function(req, res){
  res.render('planSelectionMonthly-after')
})

app.post("/planSelectionYearly", function(req,res){
  res.render('planSelectionYearly');
})
app.get('/planSelectionYearly', function(req, res){
  res.render('planSelectionYearly')
})

app.get('/payment', function(req,res){
  res.render('payment')
})

app.post('/payment', function(req,res){

  const price = req.body.price;
  var cycle;
  var plan;
  if(price == 100){
    plan = "Mobile";
    cycle = "Monthly";
  }
  else if(price == 200){
    plan = "Basic";
    cycle = "Monthly";

  }
  else if(price == 500){
    plan = "Standard";
    cycle = "Monthly";

  }
  else if(price == 700){
    plan  = "Premium";
    cycle = "Monthly";

  }
  console.log(price)

  // const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

  res.render('payment', {price:price, plan:plan , cycle:cycle})
})


app.get("/payment-status", function(req,res){
  const date = new Date()

  var today = date.getDate()
  var year = date.getFullYear()
  var monthNum = date.getMonth()
  var month;
  var year_renew = year + 1;
  var today_renew = today + 1;
  var month_renew;
  const price = req.body.price;
  console.log(price)
  var cycle;
  var plan;
  var devices = "Phone + Tablet";



  if(price == 100){
    plan = "Mobile";
    cycle = "Monthly";
  }
  else if(price == 200){
    plan = "Basic";
    cycle = "Monthly";

  }
  else if(price == 500){
    plan = "Standard";
    cycle = "Monthly";

  }
  else{
    plan  = "Premium";
    cycle = "Monthly";

  }


  if(monthNum == 0){
    month = "January"
  }
  else if(monthNum == 1){
    month = "February"
  }
  else if(monthNum == 2){
    month = "March"
  }
  else if(monthNum == 3){
    month = "April"
  }
  else if(monthNum == 4){
    month = "May"
  }
  else if(monthNum == 5){
    month = "June"
  }
  else if(monthNum == 6){
    month = "July"
  }
  else if(monthNum == 7){
    month = "August"
  }
  else if(monthNum == 8){
    month = "September"
  }
  else if(monthNum == 9){
    month = "October"
  }
  else if(monthNum == 10){
    month = "November"
  }
  else{
    month = "December"
  }

  res.render('payment-status', { price : price , plan : plan, cycle:cycle, devices: devices, today:today, year:year, month:month, today_renew:today_renew , year_renew: year_renew} );
})
app.post('/payment-status', async(req, res) => {


  const date = new Date()

  var today = date.getDate()
  var year = date.getFullYear()
  var monthNum = date.getMonth()
  var month;
  var year_renew = year + 1;
  var today_renew = today + 1;
  var month_renew;
  const price = req.body.price;
  console.log(price)
  var cycle;
  var plan;
  var devices = "Phone + Tablet";



  if(price == 100){
    plan = "Mobile";
    cycle = "Monthly";
  }
  else if(price == 200){
    plan = "Basic";
    cycle = "Monthly";

  }
  else if(price == 500){
    plan = "Standard";
    cycle = "Monthly";

  }
  else{
    plan  = "Premium";
    cycle = "Monthly";

  }


  if(monthNum == 0){
    month = "January"
  }
  else if(monthNum == 1){
    month = "February"
  }
  else if(monthNum == 2){
    month = "March"
  }
  else if(monthNum == 3){
    month = "April"
  }
  else if(monthNum == 4){
    month = "May"
  }
  else if(monthNum == 5){
    month = "June"
  }
  else if(monthNum == 6){
    month = "July"
  }
  else if(monthNum == 7){
    month = "August"
  }
  else if(monthNum == 8){
    month = "September"
  }
  else if(monthNum == 9){
    month = "October"
  }
  else if(monthNum == 10){
    month = "November"
  }
  else{
    month = "December"
  }

  res.render('payment-status', {key: STRIPE_PUBLISHABLE_KEY, price : price , plan : plan, cycle:cycle, devices: devices, today:today, year:year, month:month, today_renew:today_renew , year_renew: year_renew} )
})

app.get("/payment-cancel", function(req,res){
  const date = new Date()

  var today = date.getDate()
  var year = date.getFullYear()
  var monthNum = date.getMonth()
  var month;
  var year_renew = year + 1;
  var today_renew = today + 1;
  var month_renew;
  const price = req.body.price;
  console.log(price)
  var cycle;
  var plan;
  var devices = "Phone + Tablet";



  if(price == 100){
    plan = "Mobile";
    cycle = "Monthly";
  }
  else if(price == 200){
    plan = "Basic";
    cycle = "Monthly";

  }
  else if(price == 500){
    plan = "Standard";
    cycle = "Monthly";

  }
  else{
    plan  = "Premium";
    cycle = "Monthly";

  }


  if(monthNum == 0){
    month = "January"
  }
  else if(monthNum == 1){
    month = "February"
  }
  else if(monthNum == 2){
    month = "March"
  }
  else if(monthNum == 3){
    month = "April"
  }
  else if(monthNum == 4){
    month = "May"
  }
  else if(monthNum == 5){
    month = "June"
  }
  else if(monthNum == 6){
    month = "July"
  }
  else if(monthNum == 7){
    month = "August"
  }
  else if(monthNum == 8){
    month = "September"
  }
  else if(monthNum == 9){
    month = "October"
  }
  else if(monthNum == 10){
    month = "November"
  }
  else{
    month = "December"
  }

  res.render('payment-cancel', { price : price , plan : plan, cycle:cycle, devices: devices, today:today, year:year, month:month, today_renew:today_renew , year_renew: year_renew} );
})
app.post('/payment-cancel', async(req, res) => {


  const date = new Date()

  var today = date.getDate()
  var year = date.getFullYear()
  var monthNum = date.getMonth()
  var month;
  var year_renew = year + 1;
  var today_renew = today + 1;
  var month_renew;
  const price = req.body.price;
  console.log(price)
  var cycle;
  var plan;
  var devices = "Phone + Tablet";



  if(price == 100){
    plan = "Mobile";
    cycle = "Monthly";
  }
  else if(price == 200){
    plan = "Basic";
    cycle = "Monthly";

  }
  else if(price == 500){
    plan = "Standard";
    cycle = "Monthly";

  }
  else{
    plan  = "Premium";
    cycle = "Monthly";

  }


  if(monthNum == 0){
    month = "January"
  }
  else if(monthNum == 1){
    month = "February"
  }
  else if(monthNum == 2){
    month = "March"
  }
  else if(monthNum == 3){
    month = "April"
  }
  else if(monthNum == 4){
    month = "May"
  }
  else if(monthNum == 5){
    month = "June"
  }
  else if(monthNum == 6){
    month = "July"
  }
  else if(monthNum == 7){
    month = "August"
  }
  else if(monthNum == 8){
    month = "September"
  }
  else if(monthNum == 9){
    month = "October"
  }
  else if(monthNum == 10){
    month = "November"
  }
  else{
    month = "December"
  }

  res.render('payment-cancel', {price : price , plan : plan, cycle:cycle, devices: devices, today:today, year:year, month:month, today_renew:today_renew , year_renew: year_renew} )
})


app.post('/create-checkout-session', async (req, res) => {


  const prod = "https://api.stripe.com/v1/products/prod_OOfWNKjRpGp3xz/sk_test_51NbNbmSE9kTDR6QCYJrA6KggCtCFfRSh3SJAjsjtIp0f6m2IENHJLfFfqGBRlQhPsnzJc2NNj0Ign6TdZOGPXNgS00ruLfne6i"
  https.get(prod, function(response){
    console.log(response);
  })


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1NbtRpSE9kTDR6QCSGzpgVVo',
        quantity: 1,
      },
    ],
    mode: 'payment',
    // success_url : "payment-status",
    // cancel_url : "payment-status",
    success_url: `https://plan-billing2.onrender.com/payment-status`,
    cancel_url: `https://plan-billing2.onrender.com/payment-status`,
  });

  res.redirect(303, session.url);
});

// app.post('payment-status', async (req, res) => {
//
//   res.redirect(303, session.url);
// });

app.listen(3000, function(){
  console.log("listening to port 3000");
})

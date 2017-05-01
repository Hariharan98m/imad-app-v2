var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var bodyParser=require('body-parser');
app.use(bodyParser.json());

var Pool=require('pg').Pool;
var config={
   user:'admin',
   database:'postgres',
   host:'data.tortoni56.hasura-app.io/',
   port:'5432',
   password:'consistently-fernery-lave'
};
var pool=new Pool(config);
var session=require('express-session');
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge: 1000*60*60*24*30}
}));
var crypto=require('crypto');


app.get('/ui/logo.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'logo.PNG')); 
});
app.get('/ui/opener.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'opener.PNG')); 
});
app.get('/ui/rest1.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'rest1.PNG')); 
   });
   
app.get('/ui/rest2.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'rest2.PNG')); 
   });
   
app.get('/ui/rest3.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'rest3.PNG')); 
   });
   
app.get('/ui/rest4.PNG',function(req,res){
      res.sendFile(path.join(__dirname, 'ui', 'rest4.PNG')); 
   });
app.post('/login', function (req, res) {
    //username,password
    //JSON
    var flag=0,i;
    var username=req.body.username;
    var password=req.body.password;
    for(i=0;i<user.length;i++){
    console.log("user[i]=");
    console.log(user[i]);
    if (user[i].name===username) 
    {
     flag=1;break;
    }
    }
    if(flag==1){
        var dBstring=user[i].password;
        var salt=dBstring.split('$')[2];
        var hashed=hash(password,salt);
        if (hashed===dBstring){
        //Set the session
        req.session.auth={userId:username};
        res.send('Successful check for credentials:'+username);
        }
    }
    else{
        res.send('Username/ Password Invalid. Try again.');
    }
});

app.get('/login1', function (req, res) {
    for(var i=0;i<user.length;i++){
        console.log(user[i]);
    }
    res.send("ok");
});

app.get('/ui/0',function(req,res){
    res.sendFile(path.join(__dirname, 'ui','0'));
});

app.post('/retdm',function(req,res){
  var data=database[req.body.id];
        
  var menu='<h2>'+data.menu.cuisine+"</h2> <div style='font-size:15px;color:#e0941f' >Start: "+data.menu.start+"<br/> End: "+data.menu.end+'</div>';
 res.status(200).send(menu);
 
});

app.post('/retdish',function(req,res){
 var data=database[req.body.id];
 var list='<ul>';
    for (i=0;i<data.menu.dishes.length;i++){
        var dish="<div style='font-size:15px;color:#fd053c'>"+data.menu.dishes[i].dish_name+'           Price: '+data.menu.dishes[i].price+'</div>';
        list+='<li>'+dish+'</li><br>';
        }
    list+='</ul>';
 res.send(list);
});


function f(data){
    var name=data.name;
    var id=data.id;
    var description=data.description;
    var area_id=data.area_id;
    var est_name=data.est_name;
    var daily_menu_id=data.daily_menu_id;
    var comments=data.comment;
    var rating=data.rating;
    var city=data.area.city;
    var zip_code=data.area.zip_code;
    var loc_name=data.area.loc_name;
    var menu='<h2>'+data.menu.cuisine+"</h2> <div style='font-size:15px;color:#e0941f' >Start: "+data.menu.start+"<br/> End: "+data.menu.end+'</div>';
    var list='<ul>';
    for (var i=0;i<data.menu.dishes.length;i++){
        var dish="<div style='font-size:15px;color:#fd053c'>"+data.menu.dishes[i].dish_name+'           Price: '+data.menu.dishes[i].price+'</div>';
        list+='<li>'+dish+'</li><br>';
        }
    list+='</ul>';
    var htmltemplate=`<html>
      <head>
          <title id=tit>
              ${name}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
      <div id='i' style='font-size:0px'>${id}</div>
      <img src="/ui/${id}.png" style='width=409px;height:147px;margin-left:100px;'>
          <div class="special">
              <div>
                  <a href="/restaurants">Back to Articles</a>
              </div>
              <hr/>
              <h1>
                  ${name}
              </h1>
                 <h3>
                ${est_name}
            </h3>
            <div style='color:#4e4eaf;font-style:italic'>${loc_name}, ${city} </div>
            <div style='font-size:15px'>${zip_code}</div>
            <br>
              <div style="font-size: 15px;
    font-style: italic;
    color: blue;">
                  ${description}
              </div>
              <br>
              <div>
              <input type='submit' value='Daily Menu' id='subbtn2' style="font-family:calibri;
    font-size: 15px;
    color: #632f63;
    background:white"/>
    <br>    
    <div id='m'>
    
    </div>
         <br>
              <input type='submit' value='Dishes' id='subbtn3' style="font-family:calibri;font-size:15px;background:white"/>
              <div id='dish'>
              </div>
              </div>
              <br>
              <hr/>
              <div>
              <h5>Rate it!</h5>
              <input type='text' placeholder='Rating' id='rate' style="width:50px;height:30px;font-family:calibri;"/>
              </div>
              <div>
              <h5>Comment Right Away!!</h5>
              <input type='text' placeholder='Comment-box' id='commentbox' style="width:350px;height:75px;font-family:calibri;"/>
              <input type='submit' placeholder='Submit' id='subbtn' style="font-family:calibri;"/>
              </div>
              <br>
              <hr>
              <div>
              <h4>So far</h4>
              <div>${rating}</div>
              <div>${comments}</div>
              </div>
          </div>
          <script type="text/javascript" src="/ui/main3.js"></script>
      </body>
    </html>`;
    return htmltemplate;
}

function temp(data,user){
    console.log('in temp u:'+user);
    var list='<ul>';
    for (var i=0;i<data.length;i++){
        var name=data[i].name;
        var est_name=data[i].est_name;
        var d=name+'\n ('+est_name+')';
        list+='<li><a href=/'+data[i].id+'>'+d+'</a></li><br>';
        }
    list+='</ul>';
    console.log(list);
    var htmltemplate=`
 <html>
    <head>
    <link href="/ui/style.css" rel="stylesheet" />
    <title>Restaurants</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    </head>
    <body>
        <div class=special>
            <i> ${user} </i>
            <br><br>
            <div>
                <a href='/logout'>Logout</a>
            </div>
            <hr/>
            <h3>
                RESTAURANTS
            </h3>
            <div>
                ${list}
            </div>
        </div>
    </body>
</html>`;
return htmltemplate;
}

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2Sync','10000',salt,hashed.toString('hex')].join('$');
}

app.post('/create-user', function (req, res) {
    //username,password
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    var desc=req.body.desc;
    console.log(username);
    console.log(password);
    var salt=crypto.randomBytes(128).toString('hex');
    var dBstring=hash(password,salt);
    user.push({"name":username,"password":dBstring,"description":desc});
    req.session.auth={userId:username};
    res.send('User successfully created:'+username);
});

app.get('/clogin',function(req,res){
    if (req.session&&req.session.auth&&req.session.auth.userId){
        for(var i=0;i<user.length;i++){
            if (req.session.auth.userId.toString()===user[i].name)
                res.send('Hi'+user[i].name);    
        }
    }
    else
    res.send('You are not logged in');
});

app.get('/ui/ologo.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ologo.PNG'));
});

app.get('/ui/profilepic.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profilepic.PNG'));
});
app.get('/ui/login.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});
app.get('/ui/signup.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'signup.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/main3.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main3.js'));
});
app.get('/ui/main2.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.js'));
});


app.get('/restaurants', function (req, res) {
    
       var rest_Data=database;
        var u='';
        if (req.session&&req.session.auth&&req.session.auth.userId){
            for(var i=0;i<user.length;i++){
                if (req.session.auth.userId.toString()===user[i].name){
                    u='Hi '+user[i].name.toString();
                }
            }
        }
        else{
        u='You are not logged in';
        }
        res.send(temp(rest_Data,u));
});

function lout(){
    var htmltemp=`<html>
    <head>
    <link 
    href="/ui/style.css" rel="stylesheet" />
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    </head>
    <body>
        <div class=header>
        <h5>Logout Successful</h5>
        <hr/>
        <div>
        <a href='/'>Back to Home</a>
        </div>
    </body>
</html>`;
return htmltemp;
}

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send(lout());
});


app.post('/comment',function(req,res){
    var comment=req.body.comment.toString();
    var rating=req.body.rating.toString();
    console.log('I ve striped title:'+title);
    console.log('I m here in the comments page'+comment+'  '+rating);
    if (req.session&&req.session.auth&&req.session.auth.userId){
            console.log('cookie set');
            var user='';
            var his='';
            var his2='';
                pool.query("Select name from users where name='"+req.session.auth.userId.toString()+"';",function(err,result){
                    user=result.rows[0].name.toString().trim();
                    console.log('user:'+user);
                pool.query("select comments, rating from restaurants where name=$1;",[title],function(err,result){
                    his=result.rows[0].comments.toString().trim();
                    his2=result.rows[0].rating.toString().trim();
                   pool.query('SELECT CURRENT_TIMESTAMP;',function(err,result){
                    var date=result.rows[0].now.toString();
                pool.query("update articles set comments=$1,rating=$2 where name=$3;",['<p>'+his+'<b>'+user+'</b>@ '+date+': '+comment+'</p>','<p>'+his1+'<b>'+user+': '+rating+'</p>',title],function(err,result){
                    if(err){
                        res.send('error');
                    }
                    else{
                        pool.query("select comments, rating from articles where name=$1;",[title],function(err,result){
                        
                    res.send(result.rows[0].comments.toString().trim());
                    });
                    
                    }
    
                });
                    
                });
                });
                
                
                });
                
    }       
    else{
        res.send('Log in to comment');
    }
});

app.get('/:rest_id',function(req,res){
   res.send(f(database[req.params.rest_id]));
   
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`App listening on port ${port}!`);
});

var user=[
    {
        "name":"Hari",
        "password":"123",
        "description":"FM"
    }
    ];



var database=[
  {
    "id": 0,
    "name": "A2B Adyar Ananda Bhavan",
    "area_id": 2,
    "est_name": "Sweet Shop",
    "daily_menu_id": 4,
    "description":"Pure and opulent Desserts and Bakes for a Refreshing evening",
    "rating":"",
    "comment":"",
    "menu": {
      "id": 4,
      "start": "2017-04-16 T0 7:24:50",
      "end": "2017-04-17 T0 7:24:50",
      "cuisine": "North Indian",
      "dishes": [
        {
          "id": 22,
          "dish_name": "Cheese Eeda Cutlets",
          "price": 200,
          "daily_menu_id": 4
        },
        {
          "id": 23,
          "dish_name": "Barukchi Akoori",
          "price": 210,
          "daily_menu_id": 4
        },
        {
          "id": 24,
          "dish_name": "Lollipop na Farcha",
          "price": 60,
          "daily_menu_id": 4
        },
        {
          "id": 25,
          "dish_name": "Boti Soti",
          "price": 160,
          "daily_menu_id": 4
        },
        {
          "id": 26,
          "dish_name": "Milk Jeera Bengali Ped",
          "price": 170,
          "daily_menu_id": 4
        }
      ]
    },
    "contact": [
      {
        "rest_id": 5,
        "number": "044 25281453"
      }
    ],
    "area": {
      "id": 2,
      "city": "Chennai",
      "zip_code": 600040,
      "loc_name": "Anna Nagar East"
    }
  },
  {
    "id": 1,
    "name": "Oregano's",
    "area_id": 1,
    "est_name": "Quick Bites",
    "daily_menu_id": 5,
    "description":"Elegant Ambience, cozy for a Delightful Cheesy Alfredo",
    "rating":"",
    "comment":"",
    "menu": {
      "id": 5,
      "start": "2017-04-16T07:01:50.1+00:00",
      "end": "2017-04-17T07:01:50.1+00:00",
      "cuisine": "Italian",
      "dishes": [
        {
          "id": 5,
          "dish_name": "Masala Mac Pasta",
          "price": 90,
          "daily_menu_id": 5
        },
        {
          "id": 6,
          "dish_name": "Herebed Pasta",
          "price": 90,
          "daily_menu_id": 5
        },
        {
          "id": 7,
          "dish_name": "Tang Lime Orange",
          "price": 40,
          "daily_menu_id": 5
        },
        {
          "id": 8,
          "dish_name": "Beetroot Mayo Garlic Bread",
          "price": 60,
          "daily_menu_id": 5
        },
        {
          "id": 9,
          "dish_name": "Corn and Spinach Onion Bread",
          "price": 60,
          "daily_menu_id": 5
        }
      ]
    },
    "contact": [
      {
        "rest_id": 6,
        "number": "044 25785098"
      }
    ],
    "area": {
      "id": 1,
      "city": "Chennai",
      "zip_code": 600010,
      "loc_name": "Kilpauk"
    }
  },
  {
    "id": 2,
    "name": "The English Tearoom",
    "area_id": 4,
    "est_name": "Cafe",
    "daily_menu_id": 6,
    "description":"Hot chocolate and Cheesy Nachos drool a watery mouth",
    "rating":"",
    "comment":"",
    "menu": {
      "id": 6,
      "start": "2017-04-16T07:01:50.1+00:00",
      "end": "2017-04-17T07:01:50.1+00:00",
      "cuisine": "Continental",
      "dishes": [
        {
          "id": 13,
          "dish_name": "Banana Peanut butter almond milk smothiee",
          "price": 190,
          "daily_menu_id": 6
        },
        {
          "id": 14,
          "dish_name": "Saffron Kahwa Green Tea",
          "price": 76,
          "daily_menu_id": 6
        },
        {
          "id": 15,
          "dish_name": "Shortbread cookies with Ice Tea",
          "price": 80,
          "daily_menu_id": 6
        },
        {
          "id": 16,
          "dish_name": "Cheesy potato wedges",
          "price": 290,
          "daily_menu_id": 6
        }
      ]
    },
    "contact": [
      {
        "rest_id": 7,
        "number": "044 34577985"
      },
      {
        "rest_id": 7,
        "number": "044 34577988"
      },
      {
        "rest_id": 7,
        "number": "044 34577981"
      }
    ],
    "area": {
      "id": 4,
      "city": "Chennai",
      "zip_code": 600018,
      "loc_name": "Alwarpet"
    }
  },
  {
    "id": 3,
    "name": "Haunted",
    "area_id": 2,
    "est_name": "Casual Dining",
    "description":"A candle light dinner with Classic Tikka, Momos and the Special in-house Haunted Fries",
    "daily_menu_id": 7,
    "rating":"",
    "comment":"",
    "menu": {
      "id": 7,
      "start": "2017-04-19T07:01:50.1+00:00",
      "end": "2017-04-20T08:01:50.1+00:00",
      "cuisine": "Chinese",
      "dishes": [
        {
          "id": 10,
          "dish_name": "Spicy Tikka Roll",
          "price": 120,
          "daily_menu_id": 7
        },
        {
          "id": 11,
          "dish_name": "Brocoli Honey Dew",
          "price": 80,
          "daily_menu_id": 7
        },
        {
          "id": 12,
          "dish_name": "Dragon Potato Paneer",
          "price": 90,
          "daily_menu_id": 7
        }
      ]
    },
    "contact": [
      {
        "rest_id": 8,
        "number": "044 39737698"
      }
    ],
    "area": {
      "id": 2,
      "city": "Chennai",
      "zip_code": 600040,
      "loc_name": "Anna Nagar East"
    }
  },
  {
    "id": 4,
    "name": "Ciclo Cafe",
    "area_id": 5,
    "est_name": "Casual Dining",
    "daily_menu_id": 6,
    "description":"The Cocoa Beans in an oozy Fudge melts the heart out of you- Behold the Pies and decor",
    "rating":"",
    "comment":"",
    "menu": {
      "id": 6,
      "start": "2017-04-16T07:01:50.1+00:00",
      "end": "2017-04-17T07:01:50.1+00:00",
      "cuisine": "Continental",
      "dishes": [
        {
          "id": 13,
          "dish_name": "Banana Peanut butter almond milk smothiee",
          "price": 190,
          "daily_menu_id": 6
        },
        {
          "id": 14,
          "dish_name": "Saffron Kahwa Green Tea",
          "price": 76,
          "daily_menu_id": 6
        },
        {
          "id": 15,
          "dish_name": "Shortbread cookies with Ice Tea",
          "price": 80,
          "daily_menu_id": 6
        },
        {
          "id": 16,
          "dish_name": "Cheesy potato wedges",
          "price": 290,
          "daily_menu_id": 6
        }
      ]
    },
    "contact": [
      {
        "rest_id": 9,
        "number": "044 39577113"
      },
      {
        "rest_id": 9,
        "number": "044 43947390"
      },
      {
        "rest_id": 9,
        "number": "044 43421189"
      }
    ],
    "area": {
      "id": 5,
      "city": "Chennai",
      "zip_code": 600020,
      "loc_name": "Kotturpuram"
    }
  },
  {
    "id": 5,
    "name": "Palmshore",
    "area_id": 7,
    "est_name": "Nightlife",
    "daily_menu_id": 7,
    "description":"Ever heard of Bread Halwa? The Gajar Ka blended into BBQ's traditional Shawarma",
    "rating":"",
    "comment":"",
    "menu": {
      "id": 7,
      "start": "2017-04-19T07:01:50.1+00:00",
      "end": "2017-04-20T08:01:50.1+00:00",
      "cuisine": "Chinese",
      "dishes": [
        {
          "id": 10,
          "dish_name": "Spicy Tikka Roll",
          "price": 120,
          "daily_menu_id": 7
        },
        {
          "id": 11,
          "dish_name": "Brocoli Honey Dew",
          "price": 80,
          "daily_menu_id": 7
        },
        {
          "id": 12,
          "dish_name": "Dragon Potato Paneer",
          "price": 90,
          "daily_menu_id": 7
        }
      ]
    },
    "contact": [
      {
        "rest_id": 10,
        "number": "044 37410989"
      },
      {
        "rest_id": 10,
        "number": "044 37410985"
      },
      {
        "rest_id": 10,
        "number": "044 37410980"
      },
      {
        "rest_id": 10,
        "number": "044 18214243"
      },
      {
        "rest_id": 10,
        "number": "044 18214247"
      },
      {
        "rest_id": 10,
        "number": "044 18214246"
      }
    ],
    "area": {
      "id": 7,
      "city": "Chennai",
      "zip_code": 600083,
      "loc_name": "Ashok Nagar"
    }
  },
  {
    "id": 6,
    "name": "Eating Circles",
    "area_id": 1,
    "est_name": "Casual Dining",
    "daily_menu_id": 2,
    "rating":"",
    "description":"A Paradise for a Rich Pure Vegi Breakfast- Jain flavoured",
    "comment":"",
    "menu": {
      "id": 2,
      "start": "2017-04-16T07:20:01.813+00:00",
      "end": "2017-04-17T07:20:01.813+00:00",
      "cuisine": "South Indian",
      "dishes": [
        {
          "id": 1,
          "dish_name": "Red Rice Butter Dosa",
          "price": 75,
          "daily_menu_id": 2
        },
        {
          "id": 2,
          "dish_name": "Dosa Platter",
          "price": 195,
          "daily_menu_id": 2
        },
        {
          "id": 3,
          "dish_name": "Sabudana Pongal",
          "price": 75,
          "daily_menu_id": 2
        },
        {
          "id": 4,
          "dish_name": "Ghee Idly",
          "price": 50,
          "daily_menu_id": 2
        }
      ]
    },
    "contact": [
      {
        "rest_id": 11,
        "number": "044 46238789"
      },
      {
        "rest_id": 11,
        "number": "044 46238788"
      }
    ],
    "area": {
      "id": 1,
      "city": "Chennai",
      "zip_code": 600010,
      "loc_name": "Kilpauk"
    }
  }
]
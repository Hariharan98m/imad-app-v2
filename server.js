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
   database:'admin',
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
    var username=req.body.username;
    var password=req.body.password;
    pool.query('Select * from users where name=$1',[username],function(err,result){
    if(err){
        res.status(500).send('Something went wrong in the server.');
    }
    else if(result.rows.length===0){
        res.send('Username Invalid. Try again.');
    }
    else{
        var dBstring=result.rows[0].password;
        var salt=dBstring.split('$')[2];
        var hashed=hash(password,salt);
        if (hashed===dBstring){
        //Set the session
        req.session.auth={userId:result.rows[0].name};
        res.send('Successful check for credentials:'+username);
        }
        else
        res.send('Password Mismatch. Try again.');
    }
    });
});



function f(data){
    console.log(data);
    var name=data.name;
    var description=data.description;
    var area_id=data.area_id;
    var est_name=data.est_name;
    var daily_menu_id=data.daily_menu_id;
    var comments=data.comment;
    var rating=data.rating;
 var htmltemplate=`<html>
      <head>
          <title id=tit>
              ${name}
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/ui/style.css" rel="stylesheet" />
      </head> 
      <body>
          <div class="special">
              <div>
                  <a href="/restaurants">Back to Articles</a>
              </div>
              <hr/>
              <h1>
                  ${name}
              </h1>
              <br>
              <h3>
                ${est_name}
            </h3>
              <div>
                  ${description}
              </div>
              <hr/>
              <input type='text' placeholder='Comment-box' id='commentbox' style="width:350px;height:75px;font-family:calibri;"/>
              <input type='submit' placeholder='Submit' id='subbtn' style="font-family:calibri;"/>
              <h5>Comments</h5>
              <div id="comment_form">
              <h5 id='r'>Rating</h5>
              ${rating}
              <h4 id='c'>Comment</h4>
              ${comments}
              </div>
              
          </div>
          <script type="text/javascript" src="/ui/main3.js"></script>
      </body>
    </html>`;
    return htmltemplate;
}

app.get('/call',function(req,res){
    res.send('Success');
});

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

app.get('/test-db',function(req,res){
    //make a request
    var name='hari2';
    var pass='value';
    pool.query("select * from rest_contact",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
        res.send(JSON.stringify(result));
        }
    });
    /*
    pool.query("insert into Users(name,password) values('"+name+"','"+pass+"')",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('Success');
        }
    });
    //respond with data
    */
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
    pool.query("insert into users(name,password,description) values($1,$2,$3)",[username,dBstring,desc],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {   req.session.auth={userId:result.rows[0].name};
            res.send('User successfully created:'+username);
        }
    });
});

app.get('/clogin',function(req,res){
    if (req.session&&req.session.auth&&req.session.auth.userId){
        pool.query("Select name from users where name='"+req.session.auth.userId.toString()+"'",function(err,result){
        res.send('Hi'+result.rows[0].name);    
        });
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

function pass(name,age){
    return age;
}
app.get('/simple', function (req, res) {
    var title='article-one';
    
    pool.query("select comments from articles where title='"+title+"'",function(err,result){
    
    res.send(result.rows[0].comments);
    });
    pool.query()
    });
app.get('/restaurants', function (req, res) {
    
    pool.query("SELECT * from restaurant",function(err,result){
    if(err){
        res.status(500).send(err.toString());
    }
    else{
        if(result.rows.length===0){
            res.send('No restaurants to show');
        }
        else
            {   var rest_Data=result.rows;
                var u='';
                if (req.session&&req.session.auth&&req.session.auth.userId){
                pool.query("Select name from users where name='"+req.session.auth.userId.toString()+"'",function(err,result){
                u='Hi '+result.rows[0].name.toString();
                res.send(temp(rest_Data,u));
                });
                }
                else
                {u='You are not logged in';
                res.send(temp(rest_Data,u));
                }
                console.log(u);
                
            }
    }
    });
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
    var title=req.body.title.toString();
    var rating=req.body.rt.toString();
    title=title.trim();
    console.log('I ve striped title:'+title);
    console.log('I m here in the comments page'+comment+' '+title);
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
    //'article-one'
    pool.query(`SELECT * from restaurant where id=$1`,[req.params.rest_id],function(err,result){
    if(err){
        res.status(500).send('Something went wrong');
    }
    else if(result.rows.length===0){
        res.send('Restaurant not found');
    }
    else
        {   
            var rest_Data=result.rows[0];
            console.log(rest_Data);
            res.send(f(rest_Data));
        }
    });
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`App listening on port ${port}!`);
});

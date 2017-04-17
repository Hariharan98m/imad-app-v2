console.log('Loaded!');
var sub=document.getElementById('loginsubmitbtn');
sub.onclick=function(){
    //Make a request to the server and send the name
    var request=new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture the response and save it
              var reply=request.responseText;
              var clas;
              var cont=document.getElementById('continue');
              if(reply=='Successful check for credentials:'+username){
                  cont.innerHTML='Continue';
                  clas='#b4da88';
                  
              }
              else{
                  cont.innerHTML='';
                  clas='rgba(244, 67, 54, 0.35)';
              }
              reply="<div style='background-color:"+clas+"';>"+reply+'</div>';
              var message=document.getElementById('message');
              message.innerHTML=reply;
              sub.value='Submit';
          }
        else{
              alert(request.responseText);
              sub.value='Submit';
            }
      }  
      //Not done yet
    };
var username= document.getElementById('name').value;
var password=document.getElementById('pw').value;
request.open('POST','http://hariharan98m.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({'username':username,'password':password}));
sub.value='Submitting...';
    
};

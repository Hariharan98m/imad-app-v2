var sub=document.getElementById('signsubmitbtn');

sub.onclick=function(){
    
    //Make a request to the server and send the name
    var request=new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange=function(){
      if (request.readyState==XMLHttpRequest.DONE){
          //Take some action
          if(request.status==200){
              //Capture the response and save it
              var clas;
              var reply=request.responseText;
              var cont=document.getElementById('continue');
              if(reply=='User successfully created:'+username){
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
      }  
      //Not done yet
    };
    

var username= document.getElementById('name').value;
var password=document.getElementById('pw').value;
var desc= document.getElementById('dc').value;
console.log(username);console.log(password);
request.open('POST','http://hariharan98m.imad.hasura-app.io/create-user', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({'username':username,'password':password,'desc':desc}));
sub.value='Submitting...';
    
};

// Submit username/password to login
    var submit = document.getElementById('subbtn');
    submit.onclick = function () {
        // Create a request object
        
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    var reply=request.responseText;
                    if (reply==='Log in to comment'){
                        alert(reply);
                    }
                    else{
                    var take=request.responseText.split('$');
                    var cont=document.getElementById('r');
                    cont.innerHTML=request.responseText;
                    }   
                } 
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('commentbox').value;
        var title = document.getElementById('tit').innerHTML;
        var rating = document.getElementById('rt').value;
        request.open('POST', '/comment', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({'comment': comment,'title':title,'rating':rating}));  
        submit.value = 'Submitting...';
    };
    
    
    var submit2 = document.getElementById('subbtn2');
    submit.onclick = function () {
    var cont=document.getElementById('m');
    cont.innerHTML=
    `${menu}
         <br>
              <input type='submit' value='Dishes' id='subbtn3' style="font-family:calibri;font-size:15px;background:white"/>
              <div id=dish>
              ${list}
              </div>`;
    };
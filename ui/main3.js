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
    submit2.onclick = function () {
        // Create a request object
        
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    var reply=request.responseText;
                    console.log('reply=');
                    console.log(reply);
                    var m=document.getElementById('m');
                    m.innerHTML=reply;
                } 
                submit2.value = 'Menu of the day';
          }
        };
        
        // Make the request
        var id = document.getElementById('i').innerHTML;
        console.log('in main3.js id=');
        console.log(id);
        request.open('POST', '/retdm', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({'id': id}));
        submit2.value = 'Fetching data...';
    };
    
    var submit3 = document.getElementById('subbtn3');
    submit3.onclick = function () {
        // Create a request object
        
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    var reply=request.responseText;
                    console.log('reply=');
                    console.log(reply);
                    var dish=document.getElementById('dish');
                    dish.innerHTML=reply;
                } 
                submit3.value = 'The Dish Bowl';
          }
        };
        
        // Make the request
        var id = document.getElementById('i').innerHTML;
        console.log('in main3.js id=');
        console.log(id);
        request.open('POST', '/retdish', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({'id': id}));
        submit3.value = 'Fetching data...';
    };
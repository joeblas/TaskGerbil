$(document).ready(function () {
    

(function(){
    //link to Firebase 
    var config = {
        apiKey: "AIzaSyADN_JgqSyWmzLblXwdC7DaS5MsQdYC9cA",
        authDomain: "task-gerbil.firebaseapp.com",
        databaseURL: "https://task-gerbil.firebaseio.com",
        projectId: "task-gerbil",
        storageBucket: "task-gerbil.appspot.com",
        messagingSenderId: "360224380903"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var auth = firebase.auth();

    //jQuery selectors
    var email;
    var password;


    

    //sign up and login user on click
    $('.login-signup').on('click', function(event){
        event.preventDefault();
        var result = event.currentTarget.id
        console.log(result)
        email = $('#email').val().trim();
        password = $('#password').val().trim();
        
        if(result === 'signup-btn'){
            auth.createUserWithEmailAndPassword(email, password).then(function(){
                console.log('Signed up')
            }).catch(function(error){
                var errCode = error.code;
                var errMessage = error.message;
                console.log(errCode);
                console.log(errMessage);
                alert(errMessage)
            }) 
        }
        else if (result === 'login-btn') {
            auth.signInWithEmailAndPassword(email, password).then(function(){
                console.log('Signed in!')
            }).catch(function(error){
                var errCode = error.code;
                var errMessage = error.message;
                alert(errMessage)
            })
        }
        $('form').each(function(){
                this.reset();
            })  
    })

    //handles the signout of the user
    $('button').on('click', function(event){
        event.preventDefault();
        console.log(event)
        auth.signOut().catch(function(error){
            var errCode = error.code;
            var errMessage = error.message;
            alert(errMessage)
        })
    })
    
    //if user signed in, load dashboard else load login.html
    firebase.auth().onAuthStateChanged(function(user){
        console.log(user)
        if(user) {
            $('body').empty();
            $('body').load('dashboard.html')
        } 
        // else {
        //     $('body').empty();
        //     $('body').load('login.html')
        // }
    });

    


}())

});



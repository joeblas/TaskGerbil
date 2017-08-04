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




    //sign up user on click
    $('#signup-btn').on('click', function(event){
        event.preventDefault();
        email = $('#email').val().trim();
        password = $('#password').val().trim();
        auth.createUserWithEmailAndPassword(email, password).catch(function(error){
            var errCode = error.code;
            var errMessage = error.message;
            console.log(errCode);
            console.log(errMessage);
        })
        // console.log(promise)
        $('#signup-form').each(function(){
            this.reset();
        })
        
    })

}())



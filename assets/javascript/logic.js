(function(){ //start iffy

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

    //firebase db referenses
    var database = firebase.database();
    var auth = firebase.auth();
    var usersRef = database.ref('USERS');


    //init variables
    var email;
    var password;
    
    var userHelper = {
        skills: [],

    }

    $('.register-card').hide()
    

    //if user is logged in handling
    auth.onAuthStateChanged(function(user){
        if(user){
            console.log(user)
            $(".login-cover").hide();
            $(".login-card").hide();
            

        } else {
            $(".login-cover").show();
            $(".login-card").show();
            
        } 
    });
    


    //sign up and login user on click with Firebase
    $('.login-signup').on('click', function(event){
        event.preventDefault();
        var result = event.currentTarget.id
        console.log(result)
        email = $('#email').val().trim();
        password = $('#password').val().trim();
        
        if(result === 'register-btn'){
            auth.createUserWithEmailAndPassword(email, password).then(function(user){
                console.log(user.uid)
            }).catch(function(error){
                var errCode = error.code;
                var errMessage = error.message;
                $('.card-block').prepend('<p class="alert alert-danger">'+errMessage+'</p>')
            }) 
        }
        else if (result === 'login-btn') {
            auth.signInWithEmailAndPassword(email, password).then(function(user){
                usersRef.push(user.uid)
            }).catch(function(error){
                var errCode = error.code;
                var errMessage = error.message;
                $('.card-block').prepend('<p class="alert alert-danger">'+errMessage+'</p>')
            })
        }
        $('form').each(function(){
                this.reset();
            })  
    })


    //handles the signout of the user
    $('#user-signout').on('click', function(event){
        event.preventDefault();
        console.log(event)
        $('.alert').remove(); //removes any alerts if user logs out and goes to login screen
        auth.signOut().catch(function(error){
            var errCode = error.code;
            var errMessage = error.message;
            //create error
        })
    })

    //shows user registration card if register button is pressed on login card
    $('.user-login-register').on('click', function(event){
        console.log(event)
        var result = event.currentTarget;
        if(result.text==='Register'){
            $('.login-card').hide();
            $('.register-card').show();
        }else if (result.text === 'Login'){
            $('.login-card').show();
            $('.register-card').hide();
        }
    });
    

    

    


}());





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
    var loginRef = database.ref('USERS');
    

   

    //init variables
    var user_firstName;
    var user_lastName;
    var user_skills;
    var userEmail;
    var userPassword;
    var registerEmail;
    var registerPassword;
    
    var userHelper = {
        first_name:user_firstName,
        last_name: user_lastName,
        skills: user_skills,
        rating:'',
        jobs:'',
    }

   
    $('.register-card').hide()
    


    //if user is logged in handling
    auth.onAuthStateChanged(function(user){
        
        hideLoginRegisterDivs(user);
        userLogin(user);
        
        loginRef.child(firebase.auth().currentUser.uid).set(userHelper)

    });
    


    //sign up and login user on click with Firebase
    $('.login-signup').on('click', function(event){
        event.preventDefault();
        var result = event.currentTarget.id
    
        if(result === 'register-btn'){
            userHelper.first_name = $('#first-name').val().trim();
            userHelper.last_name = $('#last-name').val().trim();
            userHelper.skills = $('#skills').val().trim();
            registerEmail = $('#email-register').val().trim();
            registerPassword = $('#password-register').val().trim();
            registerUser(registerEmail,registerPassword)
        }
        else if (result === 'login-btn') {
            userEmail = $('#email-user').val().trim();
            userPassword = $('#password-user').val().trim();
            auth.signInWithEmailAndPassword(userEmail, userPassword).then(function(user){
                //nothing
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
        // console.log(event)
        $('.alert').remove(); //removes any alerts if user logs out and goes to login screen
        auth.signOut().catch(function(error){
            var errCode = error.code;
            var errMessage = error.message;
            //create error
        })
    })

    //shows user registration card if register button is pressed on login card
    $('.user-login-register').on('click', function(event){
        // console.log(event)
        var result = event.currentTarget;
        if(result.text==='Register'){
            $('.login-card').hide();
            $('.register-card').show();
        }else if (result.text === 'Login'){
            $('.login-card').show();
            $('.register-card').hide();
        }
    });
    
    function hideLoginRegisterDivs(user){
        if(user){
            // console.log(user)
            $(".login-cover").hide();
            $(".login-card").hide();
            $('.register-card').hide();
        } else {
            $(".login-cover").show();
            $(".login-card").show();
        } 
    }

    //registers the user. This function is called when the register button. 
    function registerUser(registerEmail, registerPassword){
        auth.createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function(error){
            var errCode = error.code;
            var errMessage = error.message;
            $('.card-block').prepend('<p class="alert alert-danger">'+errMessage+'</p>')
            }) 
    }

    //handles the user login stuff and will display the needed info for user
    function userLogin(user){
        var userSignedIn = $('#user-name');
        console.log(user.uid)
        loginRef.child(user.uid).on('value',function(snapshot){
            userSignedIn.text(snapshot.val().first_name)
        })
    }

    

    

    


}());





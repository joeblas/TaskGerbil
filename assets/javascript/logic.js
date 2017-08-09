$(function(){ //start iffy

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

        /////WORK ON THIS 
        /////THIS WORKS IF I HARD CODE THE VALUES BUT NOT WHEN I RETRIEVE VALUES FROM THE TEXT FIELD
        loginRef.child(firebase.auth().currentUser.uid).set(userHelper)

    });

       $("#submit-help").on("click", function (e) {
        e.preventDefault();
    
    var helpForm = {
        name: $("#user-name").val().trim(),
        address: $("#user-address").val().trim(),
        phone: $("#user-phone").val().trim(),
        email: $("#user-email").val().trim(),
        description: $("#user-description").val().trim(),

    }
    //testing form
    console.log(helpForm.name)

    //firebase
    database.helpRef.set({
        name: helpForm.name,
        address: helpForm.address,
        phone: helpForm.phone,
        email: helpForm.email,
        description: helpForm.description
    });

  
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
});


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


// Access Google Maps
var addressUser = '';
var addressTasker = '';
// Change to get address from form input later
$("#add-distance").on("click", function() {
  // Don't refresh the page!
    event.preventDefault();
  // grabs value input from form
    addressUser = $('#addressUser').val().trim();
    addressTasker = $('#addressTasker').val().trim();
    console.log(addressUser);
    console.log(addressTasker);
    // Sets variables equal to firebase database; need to figure out how to add new data and not replace data
    database.ref().set({
        addressUser: addressUser,
        addressTasker: addressTasker,
    });
    initMap();
});

// function to access google maps and get distance, delete display later, and won't need the city and state of origin and destination
function initMap() {
  var tasker = addressTasker;
  var user = addressUser;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [tasker],
    destinations: [user],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    console.log(response);
    if (status !== 'OK') {
      alert('Error was: ' + status);
    } else {
        // Below could be rewritten using jquery, just copied this form google
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = '';

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
              ': ' + results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
        }
      }
    }
  });
}
// I'm cofused actually about what if anything this function is actually doing, it probably is to pull data saved on firebase to use
database.ref().on("value", function(snapshot) {
  // Print the initial data to the console.
  console.log(snapshot.val());  

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
// End of Google Maps

   
    








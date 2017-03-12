
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBsTiGOUIHAuy5K4NFDq2H7YJD4p3BwZGk",
    authDomain: "train-activity-basic-34c96.firebaseapp.com",
    databaseURL: "https://train-activity-basic-34c96.firebaseio.com",
    storageBucket: "train-activity-basic-34c96.appspot.com",
    messagingSenderId: "372002409614"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  // var trainTime = 0;
  var trainFrequency = 0;

  var firstTime = "03:30";



  // Capture Button Click
  $("#add-train").on("click", function() {

  	event.preventDefault();

  	var trainName = $("#trainname-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainFrequency = $("#frequency-input").val().trim();
  	var firstTime = $("#firsttraintime-input").val().trim();

  	// Code in the logic for storing and retrieving the most recent user.
    database.ref("/trains").push({
      Name: trainName,
      Destination: trainDestination,
      Frequency: trainFrequency,
      FirstTrainTime: firstTime,
      Test: "Hello"
      //dateAdded: firebase.database.ServerValue.TIMESTAMP
      })

	  // Clears all of the text-boxes
	  $("#trainname-input").val("");
	  $("#destination-input").val("");
	  $("#frequency-input").val("");
	  $("#firsttraintime-input").val("");

	  return false;


  });

  //Create Firebase event for adding employee to the database and a row 
  //in the html when a user adds an entry
  database.ref("/trains").on("child_added", function(childSnapshot, parentKey) {
    
    console.log(childSnapshot.val());

    // Store everything into a variable.
  	var trainName = childSnapshot.val().Name;
  	var trainDestination = childSnapshot.val().Destination;
  	var trainFrequency = childSnapshot.val().Frequency;
  	var firstTime = childSnapshot.val().FirstTrainTime;

  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainFrequency);
  	console.log(firstTime);

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("Converted TIME: " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    $('#panel-head').html("Train Schedule" + " (Current Time:  " + moment(currentTime).format("hh:mm a") + ")");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesAway = trainFrequency - tRemainder;
    console.log("MINUTES AWAY: " + tMinutesAway);

    // Next Train
    var nextArrival = moment().add(tMinutesAway, "minutes");
    console.log("NEXT ARRIVAL: " + moment(nextArrival).format("hh:mm"));


  	$("#trainTime-table > tbody").append("<tr><td>" + trainName + "</td><td>" 
  		+ trainDestination + "</td><td>" + trainFrequency + "</td><td>" 
  		+ moment(nextArrival).format("hh:mm a") + "</td><td>" + tMinutesAway + "</td></tr>");
	});


//if current time = 12:00 am, then 


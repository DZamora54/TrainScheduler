/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAFRuG5oP8hm6KGYFrsXgTTY4ZJvOM3pRc",
    authDomain: "trainscheduler-a3025.firebaseapp.com",
    databaseURL: "https://trainscheduler-a3025.firebaseio.com",
    projectId: "trainscheduler-a3025",
    storageBucket: "trainscheduler-a3025.appspot.com",
    messagingSenderId: "230182194484"
  };
  firebase.initializeApp(config);

// 2. Create button for adding new trains - then update the html + update the database
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  firebase.database().ref().push({
    name: $('#train-name-input').val(),
    destination: $('#destination-input').val(),
    firstTrain: $('#firstTrain-input').val(),
    frequency: $('#frequency-input').val(),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
});

firebase.database().ref().on("child_added", function(snapshot){
    var currentTime = moment();
    var tFrequency = snapshot.val().frequency;
    var firstTime = snapshot.val().firstTrain;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Arrival
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Arrival
    var nextArrival = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    var row = '<tr><td>' + snapshot.val().name + '</td><td>' + snapshot.val().destination + 
                        '</td><td>' + snapshot.val().frequency + '</td><td>' + nextArrival + '</td><td>' + tMinutesTillTrain + ' minutes away</td></tr><hr>';
  $("#train-table tbody").append(row);
});
// 3. Create a way to retrieve trains from the train database.
// var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });

// var ref = firebase.database().ref();

// ref.on("value", function(snapshot) {
//    console.log(snapshot.val());
// }, function (error) {
//    console.log("Error: " + error.code);
// });
// 4. Create a way to calculate the arrival times. Using first train time difference between start and current time.

    

// var startDate = moment($('#start-input').val(),).format("YYYY, MM, DD");

// moment(startDate).diff(moment([2013, 9, 31]), 'months', true)


//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate minutes away - (next arrival - current time)


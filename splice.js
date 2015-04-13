angular.module('Splice', [

  ])
.controller('MC', function($scope, $interval) {

    // FORM VARIABLES


    $scope.myForm = {};
    $scope.songName = '4ToTheFloor';
    $scope.bpm  = '128';
    $scope.kick =   '1000100010001000';
    $scope.snare =  '0000100000001000';
    $scope.hihat =  '0010001000100010';


   
     $scope.timing = (1000 * (((60/$scope.bpm) * 4) / 16));   //refers to time between each iteration...(60/bpm) gives us quarter notes per second,
     // we have 4 quarter notes and then this must be divided into 16 steps
   

    $scope.locked = 'Please submit valid song info';  //this is the message pertaining to whether a pattern/BPM combo has been locked in yet


    $scope.valid = true;  //assume the form contains valid input


   

    

    $scope.validateSong = function(isValid) {

            // check to make sure the form is completely valid
            if (isValid) {

      $scope.kickArr = $scope.kick.split('');
      $scope.snareArr = $scope.snare.split('');
      $scope.hihatArr = $scope.hihat.split('');
      
     
     //used the loop for checkValues
      
    


      $interval.cancel($scope.intervalvar);
      $scope.timing = (1000 * (((60/$scope.bpm) * 4) / 16));
   
   
    $scope.locked = "Set at "+$scope.bpm+" BPM";    //if we chose to set a pattern/BPM combo, change the message regarding this
      //formula that determines how many 16th notes should be played per second
    $scope.beatSet = true; //the beat has now been set
          }

        };
  

    function pausePlayback() {   //havn't used this function, but could add a pause button that keeps us on the beat we left off on
      $interval.cancel($scope.intervalvar);
    }



  //REAL TIME VARIABLES
  
  var c = 1; //count variable for the Play button, 0 being the first 16th note
  $scope.currentKick = 'Play Something!';
  $scope.currentSnare = 'Play Something!';
  $scope.currentHihat = 'Play Something!';
  $scope.noteTracker = ""+c+" Beat"  //keeps track of which beat the song is at, is based on our count variable c


  //PAUSE, RESET, and PLAY
  $scope.reset = function() {
      if($scope.beatSet === true){
      $scope.playing = true;
      //bring the program to the playing state if the play button is pressed, and the pattern/BPM combo has been initialized. 
    }
    
    c = 1;  //will reset pattern to the first note if pressed again
    

    $interval.cancel($scope.intervalvar);  //make sure we don't run two intervals at once


     //REAL TIME ANIMATION FUNCTION
    //this function uses the interval service, and begins playing the song at the correct BPM
    $scope.intervalvar = $interval(function(){
  
  if($scope.kickArr[c-1] == 1){
    $scope.currentKick = 'KICK';
  }
  else if($scope.kickArr[c-1] == 0) {
    $scope.currentKick = "0";
  }

  if($scope.snareArr[c-1] == 1){
    $scope.currentSnare= 'SNARE';
  }
  else if($scope.snareArr[c-1] == 0) {
    $scope.currentSnare = "0";
  }

  if($scope.hihatArr[c-1] == 1){
    $scope.currentHihat = 'HAT';
  }
  else if($scope.hihatArr[c-1] == 0) {
    $scope.currentHihat = "0";
  }

 
  $scope.noteTracker = ""+c+"";

 
  c++; // increment the count
  
  if(c===17)   //replay the loop once we have gotten through sixteen 16th notes
  {
   c=1;
  }

  }, $scope.timing);
  }

  $scope.play = function() {
      if($scope.beatSet === true) {
      $scope.playing = true;
      //bring the program to the playing state if the play button is pressed, and the pattern/BPM combo has been initialized. 
    }
  
    

    $interval.cancel($scope.intervalvar);  //make sure we don't run two intervals at once


     //REAL TIME ANIMATION FUNCTION
    //this function uses the interval service, and begins playing the song at the correct BPM
    $scope.intervalvar = $interval(function(){
  
  if($scope.kickArr[c-1] == 1){
    $scope.currentKick = 'KICK';
  }
  else if($scope.kickArr[c-1] == 0) {
    $scope.currentKick = "0";
  }

  if($scope.snareArr[c-1] == 1){
    $scope.currentSnare= 'SNARE';
  }
  else if($scope.snareArr[c-1] == 0) {
    $scope.currentSnare = "0";
  }

  if($scope.hihatArr[c-1] == 1){
    $scope.currentHihat = 'HAT';
  }
  else if($scope.hihatArr[c-1] == 0) {
    $scope.currentHihat = "0";
  }

 
  $scope.noteTracker = ""+c+"";

 
  c++; // increment the count
  
  if(c===17)   //replay the loop once we have gotten through sixteen 16th notes
  {
   c=1;
  }

  }, $scope.timing);
  }

  $scope.pause = function() {
     
      $scope.playing = false;  //end the playing state, thereby removing the information about playing
      c = 1; //reset our counter
      $scope.locked = 'You must submit valid song info again after a stop'
      $scope.beatSet = false;
      $interval.cancel($scope.intervalvar);
      
  }
    
    
    
    

  

})
;

app.directive('productionQty', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^0-9]/g, '');
        console.log(transformedInput);
        if(transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
        }
        return transformedInput;  // or return Number(transformedInput)
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  }; 
});

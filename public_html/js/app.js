
var mediaRecorder;
var voices;
var sf;

var RYOV = angular.module('RYOV', []).config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
}); 

RYOV.controller('sentencesController', function sentencesController($scope, $sce, $location) {
 
  sf = $location.search().sentences;
  //console.log(sf);
  
  $scope.sentences = listOfSentences.filter(filterByID);
  $scope.selected_voice = null;
  
   
  $scope.listenoriginal = function(s) {
        //console.log($scope.selected_voice.name);
        var msg = new SpeechSynthesisUtterance(s.OriginalText);
        msg.voice = voices.filter(function(voice) { return voice.name === $scope.selected_voice.name; })[0];
        window.speechSynthesis.speak(msg);
//'Google US English'
  };
  $scope.record = function(s) {
        captureUserMedia({audio: true}, onMediaSuccess, onMediaError );
          
  };
  $scope.listen = function(s) {
        mediaRecorder.ondataavailable = function(blob) {
            s.StudentAudio = $sce.trustAsResourceUrl(URL.createObjectURL(blob));
    };
        mediaRecorder.stop();
        mediaRecorder.stream.stop();        
  };

}).directive('lazyLoadOptions', [function() {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                options: '=',
                prom: '=' 
            },
            link: function($scope, $element, $attrs, $ngModel){
            // Ajax loading notification
            $scope.options = [{name: "Loading..."}];
            // Control var to prevent infinite loop
            $scope.loaded = false;
            $element.bind('mousedown', function() {
                // Use setTimeout to simulate web service call
                setTimeout(function(){
                    if(!$scope.loaded) {
                        console.log("Attempting apply...");
                        //console.log($scope.prom);
                        $scope.$apply(function(){
                             //console.log($scope);
                             $scope.options = voices.filter(function(voice) { return voice.lang === 'en-US' || voice.lang === 'en-GB'; });
                        }); 
                        // Prevent the load from occurring again
                        $scope.loaded = true;
                        // Blur the element to collapse it
                        $element[0].blur();
                        // Click the element to re-open it
                        var e = document.createEvent("MouseEvents");
                        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        $element[0].dispatchEvent(e);
                    }
                }, 1000);
            });
        }
        }
    }]);

window.onload = function() {
    
    if (!is.chrome(">33")) {
         window.window.alert("Seu browser não é compatível com esta tecnologia!");
    } else {
        window.speechSynthesis.onvoiceschanged  = function() {
            voices = window.speechSynthesis.getVoices();
            console.log(voices);
        };
    }
};


//aux functions
function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

function onMediaSuccess(stream) {
   
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.stream = stream;
    
    mediaRecorder.recorderType = StereoAudioRecorder;
    mediaRecorder.mimeType = 'audio/webm'; // audio/ogg or audio/wav or audio/webm
    mediaRecorder.audioChannels = 1;
  

   var timeInterval = 60*1000;    //arquivos de até 1 minuto
    // get blob after specific time interval
    mediaRecorder.start(timeInterval);
    }

function onMediaError(e) {
    console.error('media error', e);
}
// below function via: http://goo.gl/B3ae8c
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// below function via: http://goo.gl/6QNDcI
function getTimeLength(milliseconds) {
    var data = new Date(milliseconds);
    return data.getUTCHours() + " hours, " + data.getUTCMinutes() + " minutes and " + data.getUTCSeconds() + " second(s)";
    }

function filterByID(obj) {
  
  
  if (sf == undefined) {
      return true;
  }
  if (!isNaN(sf) && obj.id == sf ) {
      return true;
  } 
  var r = sf.split(";");
  for (var i = 0;i < r.length; i++ ) {
    if (obj.id == r[i] ) {
      return true;
    } 
  }
    

  
  
}

function loadscripts(place,path,addEvent) {
    var jq = document.createElement("script");
    if (addEvent !== undefined) {
        jq.addEventListener(addEvent.event, addEvent.func); // pass my hosted function
    }
    jq.src = path;
    document.querySelector(place).appendChild(jq);
}

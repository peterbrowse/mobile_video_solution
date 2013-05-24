var videoLow = ['http://d3bqgljfodso0e.cloudfront.net/test/Test3.mp4'];
var videoHigh = ['http://d3bqgljfodso0e.cloudfront.net/test/Test.mp4'];

var videoContinue = false;
var ended = false;
var dragging = false;

var videoObj
,	timeStore;

$(window).load(function(){
	$('#featureVideo').hide();
	
	videoObj = Popcorn("#featureVideo");
	
	videoObj.on('ended', function() {
		videoObj.currentTime(0);
		showReplay();
	});

	attachHandlers();

});

document.ontouchmove = function(event){
    event.preventDefault();
}

$(document).ready(function(){
    
    $('.quality-button').on('click',function() {
    	var contents = $(this).attr('rel');
    	if(contents == 'High') {
    		initVideo(videoHigh);
    	}
    	else if(contents == 'Low') {
    		initVideo(videoLow);
    	}
    	else if(contents == 'restart'){
    		$('#featureVideo').fadeTo(200,1);
    		initVideo(videoLow);
    		attachHandlers();
       	}
    	$('.quality-button').hide();
    	$('.loading-message').show();
    });
});


function showVideo() {
	console.log('video 100%');
}

function getPercentProg() {
}

function initVideo(quality) {
	$('#featureVideo').hide();
	document.getElementsByTagName('video')[0].src = quality[0];
	videoObj.load();
	videoObj.on('canplaythrough', function() {
		$('.preloader').hide();
		$('.loading-message').remove();
    	this.play();
    	videoObj.volume(0);
    	$('#featureVideo').fadeIn(500);
    	videoObj.off('canplaythrough');
	});
}

function togglePlay(video) {
	if(!ended && video.paused()) {
		video.play();
	}
	
	else if(!ended && !video.paused()) {
		video.pause();
	}
};

function scaleToFill(videoTag) {
    var $video = $(videoTag),
        videoRatio = videoTag.videoWidth / videoTag.videoHeight,
        tagRatio = $video.width() / $video.height();
    if (videoRatio < tagRatio) {
        $video.css('-webkit-transform','scaleX(' + tagRatio / videoRatio  + ')')
    } else if (tagRatio < videoRatio) {
        $video.css('-webkit-transform','scaleY(' + videoRatio / tagRatio  + ')')
    }
};

function showReplay() {
	$('#restart').css('display','inline-block');
	$('.preloader').fadeTo(500,1);
	$('#featureVideo').fadeTo(500,0);
}

function attachHandlers(){

	videoObj.cue(7, function() {
   		this.pause();
   		
   		/*timeStore = this.currentTime();
   		$('.trigger').hammer({
			drag_lock_to_axis: true
		}).on('drag', function(event) {
			if(event.gesture.deltaX < 150 && event.gesture.deltaX > -150) {
   				videoObj.currentTime(timeStore + (event.gesture.deltaX/100));
   			}
   		});*/
   		
   		$('.trigger').hammer({
			drag_lock_to_axis: true
		}).on('dragleft', function(event) {
			dragging = true;
			var jumpTo = 8;
			videoObj.currentTime(jumpTo);
			$('.trigger').hammer().off('dragleft');
			$('.trigger').hammer({
				drag_lock_to_axis: true
			}).on('dragleft', function(event) {
				var travel = event.gesture.deltaX/400; 
				if((jumpTo-travel) > jumpTo && (jumpTo-travel) < 12) {
					videoObj.currentTime(jumpTo - travel);
				}
			});
   		});
   		
   		$('.trigger').hammer({
			drag_lock_to_axis: true
		}).on('dragright', function(event) {
			dragging = true;
			var jumpTo = 12;
			videoObj.currentTime(jumpTo);
			$('.trigger').hammer().off('dragright');
			$('.trigger').hammer({
				drag_lock_to_axis: true
			}).on('dragright', function(event) {
				var travel = event.gesture.deltaX/400; 
				if((jumpTo+travel) > jumpTo && (jumpTo+travel) < jumpTo + 4) {
					videoObj.currentTime(jumpTo + travel);
				}
   			});
   		});
   		
   		$('.trigger').hammer().on('release', function() {
   			videoObj.play();
   			$('.trigger').hammer().off('dragleft');
   			$('.trigger').hammer().off('dragright');
   			$('.trigger').hammer().off('release');
			dragging = false;
   		})
   	});
   	
   	videoObj.cue(11.6, function() {
   		this.pause();
   		if(!dragging){
   			videoObj.currentTime(0);
   			showReplay();
   		}
   	});
}

/*
function logEvent(event) {
      console.log(event.type);
  }
 
  window.applicationCache.addEventListener('checking',logEvent,false);
  window.applicationCache.addEventListener('noupdate',logEvent,false);
  window.applicationCache.addEventListener('downloading',logEvent,false);
  window.applicationCache.addEventListener('cached',logEvent,false);
  window.applicationCache.addEventListener('updateready',logEvent,false);
  window.applicationCache.addEventListener('obsolete',logEvent,false);
  window.applicationCache.addEventListener('error',logEvent,false);
*/
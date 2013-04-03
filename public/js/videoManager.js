var videoLow = ['http://d3bqgljfodso0e.cloudfront.net/test/Test3.mp4'];
var videoHigh = ['http://d3bqgljfodso0e.cloudfront.net/test/Test.mp4'];

var videoContinue = false;
var ended = false;

var videoObj
,	timeStore
,	touchStartTime
,	touchStartDistance;

$(window).load(function(){
	$('#featureVideo').hide();
	
	videoObj = Popcorn("#featureVideo");
	
	videoObj.on('ended', function() {
		ended = true;
	});
	
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
			var jumpTo = 8;
			videoObj.currentTime(jumpTo);
			$('.trigger').hammer().off('dragleft');
			$('.trigger').hammer({
				drag_lock_to_axis: true
			}).on('dragleft', function(event) {
				var travel = event.gesture.deltaX/500; 
				if((jumpTo-travel) > jumpTo && (jumpTo-travel) < 11.5) {
					videoObj.currentTime(jumpTo - travel);
				}
			});
   		});
   		
   		$('.trigger').hammer({
			drag_lock_to_axis: true
		}).on('dragright', function(event) {
			var jumpTo = 12;
			videoObj.currentTime(jumpTo);
			$('.trigger').hammer().off('dragright');
			$('.trigger').hammer({
				drag_lock_to_axis: true
			}).on('dragright', function(event) {
				var travel = event.gesture.deltaX/500; 
				if((jumpTo+travel) > jumpTo && (jumpTo+travel) < jumpTo + 4) {
					videoObj.currentTime(jumpTo + travel);
				}
   			});
   		});
   		
   		$('.trigger').hammer().on('release', function() {
   			videoObj.play();
   			$('.trigger').hammer().off('dragleft');
   			$('.trigger').hammer().off('dragright');
   		})
   	});
   	
   	videoObj.cue(11.6, function() {
   		this.pause();
   	});
});

document.ontouchmove = function(event){
    event.preventDefault();
}

$(document).ready(function(){
    
    $('.quality-button').on('click',function() {
    	var contents = $(this).text();
    	if(contents == 'High Quality') {
    		initVideo(videoHigh);
    	}
    	else if(contents == 'Low Quality') {
    		initVideo(videoLow);
    	}
    	$('.quality-button').remove();
    	$('.loading-message').show();
    });
   	
   	/*$('.trigger').hammer().on("touch", function(event) {
   		if(!ended) {
   			timeStore = videoObj.currentTime();
   			togglePlay(videoObj);
   		}
   		
   		event.stopPropagation();
   	});
   	
   	$('.trigger').hammer().on("release", function(event) {
   		if(!ended) {
   			//videoObj.currentTime(timeStore);
   			togglePlay(videoObj);
   		}
   	});*/
   	
   	/*$('.trigger').hammer().on('dragright', function(event) {
   		videoObj.currentTime(timeStore + (event.gesture.deltaX/100));
   		event.stopPropagation();
   	});*/
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
		$('.preloader').remove();
    	this.play();
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
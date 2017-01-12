
if ( 'flickr_album_id' in window ) { 
  var url = "https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=3550927761a09f4f4257d041747f64c0&photoset_id="+flickr_album_id+"&media=photos&format=json&per_page="+number_of_items+"&jsoncallback=?";
  jQuery.getJSON(url, function(data){
  	jQuery.each(data.photoset.photo, function(index,value){
  		src='http://farm'+value.farm+'.static.flickr.com/'+value.server+'/'+value.id+'_'+value.secret+'_m.jpg';
  		src_large='http://farm'+value.farm+'.static.flickr.com/'+value.server+'/'+value.id+'_'+value.secret+'_b.jpg';
  		jQuery('#dg_gallery_container .row').append("<div class=\"col-xs-12 col-sm-6 col-md-4\"><ul class=\"grid cs-style-3\"><li><figure><div class=\"dg_gallery_item_small\"><div class=\"dg_gallery_image\"><a rel=\"gallery\" href=\"#item"+index+"\"> <div class=\"dg_image_disc_container\"><div style=\" background-image: url("+ src_large+");\"></div><figcaption><p class=\"description\">" + value.title + "</p><\/figcaption></div></a><div style=\"display:none\"><div style=\"display:block;\" id=\"item"+index+"\"><img src=\""+src_large+"\"><div class=\"image_disc_large\">"+ value.title +"</div></div></div></div></div></div></figure></li></ul><\/div>");
  	});
  	jQuery("a[rel='gallery']").fancybox();
  	jQuery('#dg_gallery_container')
    .css('visibility','visible');
  });
}
month_array = new Array();
month_array[0] = new Array();
month_array[0]['long'] = 'January';
month_array[0]['short'] = 'Jan';
month_array[1] = new Array();
month_array[1]['long'] = 'February';
month_array[1]['short'] = 'Feb';
month_array[2] = new Array();
month_array[2]['long'] = 'March';
month_array[2]['short'] = 'Mar';
month_array[3] = new Array();
month_array[3]['long'] = 'April';
month_array[3]['short'] = 'Apr';
month_array[4] = new Array();
month_array[4]['long'] = 'May';
month_array[4]['short'] = 'May';
month_array[5] = new Array();
month_array[5]['long'] = 'June';
month_array[5]['short'] = 'Jun';
month_array[6] = new Array();
month_array[6]['long'] = 'July';
month_array[6]['short'] = 'Jul';
month_array[7] = new Array();
month_array[7]['long'] = 'August';
month_array[7]['short'] = 'Aug';
month_array[8] = new Array();
month_array[8]['long'] = 'September';
month_array[8]['short'] = 'Sep';
month_array[9] = new Array();
month_array[9]['long'] = 'October';
month_array[9]['short'] = 'Oct';
month_array[10] = new Array();
month_array[10]['long'] = 'November';
month_array[10]['short'] = 'Nov';
month_array[11] = new Array();
month_array[11]['long'] = 'December';
month_array[11]['short'] = 'Dec';

if ('youtube_playlist' in window) {

    //20150609
    var youtube_api_key = "AIzaSyCFozJYsJos55VVPms95KJCyhGqqQgzD_0";
    //youtube API v3

    var youtube_url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=" + max_videos + "&playlistId=" + youtube_playlist + "&key=" + youtube_api_key;
    var video_array = new Array();
    var temp;

    var minute = 60;
    var hour = 3600;
    var day = 86400;
    var week = 604800;
    var month = 2678400;
    var year = 31449600;
    
    function getTimeDiffText(date) {
        var now = new Date();
        var diff = Math.floor((now-date)/1000);

        var years = 0;
        var months =0;
        var weeks = 0;
        var days = 0;
        var hours =0;
        var minutes = 0;

        var returnString = "";

        if(diff>=year){
            years = Math.floor(diff/year);
            returnString += years + " " + (years>1? "years":"year") + " ";
            diff = diff%year;
        }
         else if(diff>=month){

            months = Math.floor(diff/month);
            console.log(months);
            returnString += months + " " + (months>1? "months":"month") + " ";
            diff = diff%month;
        }
         else if(diff>=week){

            weeks = Math.floor(diff/week);
            returnString += weeks + " " + (weeks>1? "weeks":"week") + " ";
            diff = diff%week;
        }
        else if(diff>=day){

            days = Math.floor(diff/day);
            returnString += days + " " + (days>1? "days":"day") + " ";
            diff = diff%day;
        }
        else if(diff>=hour){

            hours = Math.floor(diff/hour);
            returnString += hours + " " + (hours>1? "hours":"hour") + " ";
            diff = diff%hour;
        }
        else if(diff>=minute){
            minutes = Math.floor(diff/minute);
            returnString += minutes + " " + (minutes>1? "minutes":"minute") + " ";
        }
        returnString += " ago";
        return returnString;
    }

    var get_vars = function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    };

    $.getJSON(youtube_url, function (data) {
        var video_content_string = '',
            video_cover_string = '<div id=\"video_container\"></div>';


        $.each(data.items, function (index, value) {

            date = new Date(Date.parse(value.snippet.publishedAt));
            var formatedDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();

            var video_month = month_array[date.getMonth()]['long'];
            var video_day = date.getDate();
            var video_year = date.getFullYear();
            var date_string = video_day + ' ' + video_month + ' ' + video_year;

            var video_id = value.snippet.resourceId.videoId;

            $.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + video_id + "&key=" + youtube_api_key + "&part=statistics", function (response) {
                var temp = response.items[0].statistics.viewCount;
                $("#viewcount-" + response.items[0].id).append(temp + " Views");
            });

            video_array[index] = new Array();
            video_array[index][0] = video_id;
            video_array[index][1] = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" width=\"100%\" height=\"315\" src="//www.youtube.com/embed/?list=' + youtube_playlist + '&v=' + video_id + '&index=' + index + '&autoplay=1" width="100%" height="500" frameborder="0" allowfullscreen></iframe></div>';
            video_content_string += "<div class='col-xs-12 col-md-4 unido-video-item'>" +
                "<div class='row'>" +
                "<div class='col-xs-5 col-sm-12'>" +
                "<div class='unido-video-cover '>" +
                "<a href=\"javascript:show_video(" + index + ")\">" +
                "<img class='img-responsive' src='http://img.youtube.com/vi/" + video_id + "/0.jpg'/></a>" +
                "</div></div>" +
                "<div class='col-xs-7 col-sm-12'>" +
                "<h3><a href=\"javascript:show_video(" + index + ")\" >" + value.snippet.title + "</a></h3>" +
                "<p>" + value.snippet.description + "</p>" +
                "<div class='video-infos'><span>" + getTimeDiffText(date) + "</span> <span id='viewcount-" + video_id + "' class='views'></span></div></div></div></div>";
        });

        $('#video_gallery_container')
            .before(video_cover_string)
            .before(
                $('<div>', {
                    'class': 'row'
                })
                    .append(video_content_string)
            );

        if(typeof(get_vars().youtube_vid) != "undefined"){
            console.log(get_vars().youtube_vid);
            console.log(video_array);
            for(var i=0; i<video_array.length; i++) {
                if (video_array[i][0] == get_vars().youtube_vid) {
                    return show_video(i);
                }
            }
        }
        show_video(0);
    });



    function show_video(id) {
        $('#video_container').html(video_array[id][1]);
        var youtube_height = parseInt($('#video_container').css('width')) / 1.8;
        $('#video_container iframe').css('height', youtube_height);

        $('.unido-video-cover')
            .each(function () {
                $(this)
                    .click(function () {
                        $('html,body')
                            .animate({scrollTop: 200}, 'normal');
                    });
            });
    }

}
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Version: 3.0.3 (11-JUL-2013)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.7.1 or later
 */
;(function($, undefined) {
"use strict";

var ver = '3.0.3';

function debug(s) {
	if ($.fn.cycle.debug)
		log(s);
}		
function log() {
	/*global console */
	if (window.console && console.log)
		console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
};


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;
		this.cycleStop = 0; // issue #108

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	if (!opts)
		return;
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop === undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			if (opts.elements)
				$(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(cont, opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			if (typeof arg2 == 'string') 
				opts.oneTimeFx = arg2;
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		}
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
}

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
}

// unbind event handlers
function destroy(cont, opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	$(cont).unbind('mouseenter.cycle mouseleave.cycle');
	if (opts.destroy) // callback
		opts.destroy(opts);
}

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	var startingSlideSpecified;
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide !== undefined) {
		opts.startingSlide = parseInt(opts.startingSlide,10);
		if (opts.startingSlide >= els.length || opts.startSlide < 0)
			opts.startingSlide = 0; // catch bogus input
		else 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;
	else
		opts.startingSlide = 0;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		if (startingSlideSpecified) {
			// try to find the specified starting slide and if found set start slide index in the map accordingly
			for ( var cnt = 0; cnt < els.length; cnt++ ) {
				if ( opts.startingSlide == opts.randomMap[cnt] ) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap[1];
		}
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z);
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
				"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
			});
		});
	}
		
	// stretch container
	var reshape = (opts.containerResize || opts.containerResizeHeight) && $cont.innerHeight() < 1;
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (opts.containerResize && maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
		if (opts.containerResizeHeight && maxh > 0)
			$cont.css({height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.bind('mouseenter.cycle', function(){
			pauseFlag = true;
			this.cyclePause++;
			triggerPause(cont, true);
		}).bind('mouseleave.cycle', function(){
				if (pauseFlag)
					this.cyclePause--;
				triggerPause(cont, true);
		});

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			var loading = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loading) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
}

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
}

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (var p in txs) {
			if (txs.hasOwnProperty(p)) {
				tx = txs[p];
				if (txs.hasOwnProperty(p) && $.isFunction(tx))
					opts.fxs.push(p);
			}
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
}

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		// add the slide to the random map and resort
		if (opts.random) {
			opts.randomMap.push(opts.slideCount-1);
			opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		}

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
		clearTimeout(p.cycleTimeout);
	}

	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}


	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
			if (!p.cycleStop) {
				// queue next transition
				queueNext();
			}
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}
	else {
		queueNext();
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		var roll;
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
			}
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	function queueNext() {
		// stage the next transition
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout && !opts.continuous) {
			ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
         if (opts.fx == 'shuffle')
            ms -= opts.speedOut;
      }
		else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
			ms = 10;
		if (ms > 0)
			p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
	}
}

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
}

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
}

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
}

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	};
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				if (pauseFlag)
					cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	}
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	}
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
}

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.delay(animInDelay).animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.delay(animOutDelay).animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
    activePagerClass: 'activeSlide', // class name used for the active pager link
    after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
    allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
    animIn:           null,     // properties that define how the slide animates in
    animInDelay:      0,        // allows delay before next slide transitions in	
    animOut:          null,     // properties that define how the slide animates out
    animOutDelay:     0,        // allows delay before current slide transitions out
    aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
    autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
    autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
    backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
    before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
    center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
    cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
    cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
    containerResize:  1,        // resize container to fit largest slide
    containerResizeHeight:  0,  // resize containers height to fit the largest slide but leave the width dynamic
    continuous:       0,        // true to start next transition immediately after current one completes
    cssAfter:         null,     // properties that defined the state of the slide after transitioning out
    cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
    delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
    easeIn:           null,     // easing for "in" transition
    easeOut:          null,     // easing for "out" transition
    easing:           null,     // easing method for both in and out transitions
    end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
    fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
    fit:              0,        // force slides to fit container
    fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
    fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
    height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
    manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
    metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
    next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
    nowrap:           0,        // true to prevent slideshow from wrapping
    onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
    onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
    pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
    pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
    pagerEvent:       'click.cycle', // name of event which drives the pager navigation
    pause:            0,        // true to enable "pause on hover"
    pauseOnPagerHover: 0,       // true to pause when hovering over pager link
    prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
    prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
    random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
    randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
    requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
    requeueTimeout:   250,      // ms delay for requeue
    rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
    shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
    skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
    slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
    slideResize:      1,        // force slide width/height to fixed size before every transition
    speed:            1000,     // speed of the transition (any valid fx speed value)
    speedIn:          null,     // speed of the 'in' transition
    speedOut:         null,     // speed of the 'out' transition
    startingSlide:    undefined,// zero-based index of the first slide to be displayed
    sync:             1,        // true if in/out transitions should occur simultaneously
    timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
    timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
    updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
    width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
"use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++) {
				if (fwd)
					opts.els.push(opts.els.shift());
				else
					opts.els.unshift(opts.els.pop());
			}
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssAfter.display = '';
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);

if ('flickr_album_id' in window) {
    var url = "https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=3550927761a09f4f4257d041747f64c0&photoset_id=" + flickr_album_id + "&media=photos&format=json&jsoncallback=?";

    jQuery.getJSON(url, function (data) {
        jQuery.each(data.photoset.photo, function (index, value) {
            src = 'http://farm' + value.farm + '.static.flickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_b.jpg';
            jQuery('#dg_slide').append("<div class=\"dg_gallery_item\"><div class=\"dg_slide_title header\">" + value.title + "<\/div><img class=\"img-responsive\" src=\"" + src + "\"><\/div>");
        });


        jQuery('#dg_slide').slick({
            dots: false,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        dots: false
                    }
                }
            ]
        });

    });
}
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
//! moment.js
//! version : 2.11.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Qc.apply(null,arguments)}function b(a){Qc=a}function c(a){return"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return za(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),Sc.length>0)for(c in Sc)d=Sc[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),Tc===!1&&(Tc=!0,a.updateOffset(this),Tc=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(){}function u(a){return a?a.toLowerCase().replace("_","-"):a}function v(a){for(var b,c,d,e,f=0;f<a.length;){for(e=u(a[f]).split("-"),b=e.length,c=u(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=w(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function w(a){var b=null;if(!Uc[a]&&!m(module)&&module&&module.exports)try{b=Rc._abbr,require("./locale/"+a),x(b)}catch(c){}return Uc[a]}function x(a,b){var c;return a&&(c=m(b)?z(a):y(a,b),c&&(Rc=c)),Rc._abbr}function y(a,b){return null!==b?(b.abbr=a,Uc[a]=Uc[a]||new t,Uc[a].set(b),x(a),Uc[a]):(delete Uc[a],null)}function z(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return Rc;if(!c(a)){if(b=w(a))return b;a=[a]}return v(a)}function A(a,b){var c=a.toLowerCase();Vc[c]=Vc[c+"s"]=Vc[b]=a}function B(a){return"string"==typeof a?Vc[a]||Vc[a.toLowerCase()]:void 0}function C(a){var b,c,d={};for(c in a)f(a,c)&&(b=B(c),b&&(d[b]=a[c]));return d}function D(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function E(b,c){return function(d){return null!=d?(G(this,b,d),a.updateOffset(this,c),this):F(this,b)}}function F(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function G(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function H(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=B(a),D(this[a]))return this[a](b);return this}function I(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function J(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(Zc[a]=e),b&&(Zc[b[0]]=function(){return I(e.apply(this,arguments),b[1],b[2])}),c&&(Zc[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function K(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function L(a){var b,c,d=a.match(Wc);for(b=0,c=d.length;c>b;b++)Zc[d[b]]?d[b]=Zc[d[b]]:d[b]=K(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function M(a,b){return a.isValid()?(b=N(b,a.localeData()),Yc[b]=Yc[b]||L(b),Yc[b](a)):a.localeData().invalidDate()}function N(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Xc.lastIndex=0;d>=0&&Xc.test(a);)a=a.replace(Xc,c),Xc.lastIndex=0,d-=1;return a}function O(a,b,c){pd[a]=D(b)?b:function(a){return a&&c?c:b}}function P(a,b){return f(pd,a)?pd[a](b._strict,b._locale):new RegExp(Q(a))}function Q(a){return a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function R(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)qd[a[c]]=d}function S(a,b){R(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function T(a,b,c){null!=b&&f(qd,a)&&qd[a](b,c._a,c,a)}function U(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function V(a,b){return c(this._months)?this._months[a.month()]:this._months[Ad.test(b)?"format":"standalone"][a.month()]}function W(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Ad.test(b)?"format":"standalone"][a.month()]}function X(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function Y(a,b){var c;return a.isValid()?"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),U(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a):a}function Z(b){return null!=b?(Y(this,b),a.updateOffset(this,!0),this):F(this,"Month")}function $(){return U(this.year(),this.month())}function _(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[sd]<0||c[sd]>11?sd:c[td]<1||c[td]>U(c[rd],c[sd])?td:c[ud]<0||c[ud]>24||24===c[ud]&&(0!==c[vd]||0!==c[wd]||0!==c[xd])?ud:c[vd]<0||c[vd]>59?vd:c[wd]<0||c[wd]>59?wd:c[xd]<0||c[xd]>999?xd:-1,j(a)._overflowDayOfYear&&(rd>b||b>td)&&(b=td),j(a)._overflowWeeks&&-1===b&&(b=yd),j(a)._overflowWeekday&&-1===b&&(b=zd),j(a).overflow=b),a}function aa(b){a.suppressDeprecationWarnings===!1&&!m(console)&&console.warn&&console.warn("Deprecation warning: "+b)}function ba(a,b){var c=!0;return g(function(){return c&&(aa(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function ca(a,b){Dd[a]||(aa(b),Dd[a]=!0)}function da(a){var b,c,d,e,f,g,h=a._i,i=Ed.exec(h)||Fd.exec(h);if(i){for(j(a).iso=!0,b=0,c=Hd.length;c>b;b++)if(Hd[b][1].exec(i[1])){e=Hd[b][0],d=Hd[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Id.length;c>b;b++)if(Id[b][1].exec(i[3])){f=(i[2]||" ")+Id[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Gd.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),sa(a)}else a._isValid=!1}function ea(b){var c=Jd.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(da(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function fa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function ga(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ha(a){return ia(a)?366:365}function ia(a){return a%4===0&&a%100!==0||a%400===0}function ja(){return ia(this.year())}function ka(a,b,c){var d=7+b-c,e=(7+ga(a,0,d).getUTCDay()-b)%7;return-e+d-1}function la(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ka(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=ha(f)+j):j>ha(a)?(f=a+1,g=j-ha(a)):(f=a,g=j),{year:f,dayOfYear:g}}function ma(a,b,c){var d,e,f=ka(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+na(e,b,c)):g>na(a.year(),b,c)?(d=g-na(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function na(a,b,c){var d=ka(a,b,c),e=ka(a+1,b,c);return(ha(a)-d+e)/7}function oa(a,b,c){return null!=a?a:null!=b?b:c}function pa(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function qa(a){var b,c,d,e,f=[];if(!a._d){for(d=pa(a),a._w&&null==a._a[td]&&null==a._a[sd]&&ra(a),a._dayOfYear&&(e=oa(a._a[rd],d[rd]),a._dayOfYear>ha(e)&&(j(a)._overflowDayOfYear=!0),c=ga(e,0,a._dayOfYear),a._a[sd]=c.getUTCMonth(),a._a[td]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[ud]&&0===a._a[vd]&&0===a._a[wd]&&0===a._a[xd]&&(a._nextDay=!0,a._a[ud]=0),a._d=(a._useUTC?ga:fa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[ud]=24)}}function ra(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=oa(b.GG,a._a[rd],ma(Aa(),1,4).year),d=oa(b.W,1),e=oa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=oa(b.gg,a._a[rd],ma(Aa(),f,g).year),d=oa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>na(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=la(c,d,e,f,g),a._a[rd]=h.year,a._dayOfYear=h.dayOfYear)}function sa(b){if(b._f===a.ISO_8601)return void da(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=N(b._f,b._locale).match(Wc)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(P(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),Zc[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),T(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[ud]<=12&&b._a[ud]>0&&(j(b).bigHour=void 0),b._a[ud]=ta(b._locale,b._a[ud],b._meridiem),qa(b),_(b)}function ta(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function ua(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],sa(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function va(a){if(!a._d){var b=C(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),qa(a)}}function wa(a){var b=new o(_(xa(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function xa(a){var b=a._i,e=a._f;return a._locale=a._locale||z(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(_(b)):(c(e)?ua(a):e?sa(a):d(b)?a._d=b:ya(a),k(a)||(a._d=null),a))}function ya(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?ea(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),qa(b)):"object"==typeof f?va(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function za(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,wa(f)}function Aa(a,b,c,d){return za(a,b,c,d,!1)}function Ba(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Aa();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ca(){var a=[].slice.call(arguments,0);return Ba("isBefore",a)}function Da(){var a=[].slice.call(arguments,0);return Ba("isAfter",a)}function Ea(a){var b=C(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=z(),this._bubble()}function Fa(a){return a instanceof Ea}function Ga(a,b){J(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+I(~~(a/60),2)+b+I(~~a%60,2)})}function Ha(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Od)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ia(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Aa(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Aa(b).local()}function Ja(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ka(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Ha(md,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ja(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?$a(this,Va(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ja(this):null!=b?this:NaN}function La(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Ma(a){return this.utcOffset(0,a)}function Na(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ja(this),"m")),this}function Oa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ha(ld,this._i)),this}function Pa(a){return this.isValid()?(a=a?Aa(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Qa(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function Ra(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=xa(a),a._a){var b=a._isUTC?h(a._a):Aa(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function Sa(){return this.isValid()?!this._isUTC:!1}function Ta(){return this.isValid()?this._isUTC:!1}function Ua(){return this.isValid()?this._isUTC&&0===this._offset:!1}function Va(a,b){var c,d,e,g=a,h=null;return Fa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=Pd.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[td])*c,h:r(h[ud])*c,m:r(h[vd])*c,s:r(h[wd])*c,ms:r(h[xd])*c}):(h=Qd.exec(a))?(c="-"===h[1]?-1:1,g={y:Wa(h[2],c),M:Wa(h[3],c),d:Wa(h[4],c),h:Wa(h[5],c),m:Wa(h[6],c),s:Wa(h[7],c),w:Wa(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=Ya(Aa(g.from),Aa(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Ea(g),Fa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function Wa(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function Xa(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function Ya(a,b){var c;return a.isValid()&&b.isValid()?(b=Ia(b,a),a.isBefore(b)?c=Xa(a,b):(c=Xa(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function Za(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(ca(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=Va(c,d),$a(this,e,a),this}}function $a(b,c,d,e){var f=c._milliseconds,g=c._days,h=c._months;b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&G(b,"Date",F(b,"Date")+g*d),h&&Y(b,F(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function _a(a,b){var c=a||Aa(),d=Ia(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(D(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Aa(c)))}function ab(){return new o(this)}function bb(a,b){var c=p(a)?a:Aa(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function cb(a,b){var c=p(a)?a:Aa(a);return this.isValid()&&c.isValid()?(b=B(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function db(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function eb(a,b){var c,d=p(a)?a:Aa(a);return this.isValid()&&d.isValid()?(b=B(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function fb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function gb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function hb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ia(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=B(b),"year"===b||"month"===b||"quarter"===b?(g=ib(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function ib(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function jb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function kb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?D(Date.prototype.toISOString)?this.toDate().toISOString():M(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):M(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function lb(b){var c=M(this,b||a.defaultFormat);return this.localeData().postformat(c)}function mb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Aa(a).isValid())?Va({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function nb(a){return this.from(Aa(),a)}function ob(a,b){return this.isValid()&&(p(a)&&a.isValid()||Aa(a).isValid())?Va({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function pb(a){return this.to(Aa(),a)}function qb(a){var b;return void 0===a?this._locale._abbr:(b=z(a),null!=b&&(this._locale=b),this)}function rb(){return this._locale}function sb(a){switch(a=B(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function tb(a){return a=B(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function ub(){return+this._d-6e4*(this._offset||0)}function vb(){return Math.floor(+this/1e3)}function wb(){return this._offset?new Date(+this):this._d}function xb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function yb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function zb(){return this.isValid()?this.toISOString():"null"}function Ab(){return k(this)}function Bb(){return g({},j(this))}function Cb(){return j(this).overflow}function Db(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Eb(a,b){J(0,[a,a.length],0,b)}function Fb(a){return Jb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Gb(a){return Jb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Hb(){return na(this.year(),1,4)}function Ib(){var a=this.localeData()._week;return na(this.year(),a.dow,a.doy)}function Jb(a,b,c,d,e){var f;return null==a?ma(this,d,e).year:(f=na(a,d,e),b>f&&(b=f),Kb.call(this,a,b,c,d,e))}function Kb(a,b,c,d,e){var f=la(a,b,c,d,e),g=ga(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Lb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Mb(a){return ma(a,this._week.dow,this._week.doy).week}function Nb(){return this._week.dow}function Ob(){return this._week.doy}function Pb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function Qb(a){var b=ma(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function Rb(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function Sb(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function Tb(a){return this._weekdaysShort[a.day()]}function Ub(a){return this._weekdaysMin[a.day()]}function Vb(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Aa([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function Wb(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=Rb(a,this.localeData()),this.add(a-b,"d")):b}function Xb(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function Yb(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function Zb(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function $b(){return this.hours()%12||12}function _b(a,b){J(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function ac(a,b){return b._meridiemParse}function bc(a){return"p"===(a+"").toLowerCase().charAt(0)}function cc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function dc(a,b){b[xd]=r(1e3*("0."+a))}function ec(){return this._isUTC?"UTC":""}function fc(){return this._isUTC?"Coordinated Universal Time":""}function gc(a){return Aa(1e3*a)}function hc(){return Aa.apply(null,arguments).parseZone()}function ic(a,b,c){var d=this._calendar[a];return D(d)?d.call(b,c):d}function jc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function kc(){return this._invalidDate}function lc(a){return this._ordinal.replace("%d",a)}function mc(a){return a}function nc(a,b,c,d){var e=this._relativeTime[c];return D(e)?e(a,b,c,d):e.replace(/%d/i,a)}function oc(a,b){var c=this._relativeTime[a>0?"future":"past"];return D(c)?c(b):c.replace(/%s/i,b)}function pc(a){var b,c;for(c in a)b=a[c],D(b)?this[c]=b:this["_"+c]=b;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function qc(a,b,c,d){var e=z(),f=h().set(d,b);return e[c](f,a)}function rc(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return qc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=qc(a,f,c,e);return g}function sc(a,b){return rc(a,b,"months",12,"month")}function tc(a,b){return rc(a,b,"monthsShort",12,"month")}function uc(a,b){return rc(a,b,"weekdays",7,"day")}function vc(a,b){return rc(a,b,"weekdaysShort",7,"day")}function wc(a,b){return rc(a,b,"weekdaysMin",7,"day")}function xc(){var a=this._data;return this._milliseconds=me(this._milliseconds),this._days=me(this._days),this._months=me(this._months),a.milliseconds=me(a.milliseconds),a.seconds=me(a.seconds),a.minutes=me(a.minutes),a.hours=me(a.hours),a.months=me(a.months),a.years=me(a.years),this}function yc(a,b,c,d){var e=Va(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function zc(a,b){return yc(this,a,b,1)}function Ac(a,b){return yc(this,a,b,-1)}function Bc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Cc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Bc(Ec(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Dc(g)),h+=e,g-=Bc(Ec(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Dc(a){return 4800*a/146097}function Ec(a){return 146097*a/4800}function Fc(a){var b,c,d=this._milliseconds;if(a=B(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Dc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Ec(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Gc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Hc(a){return function(){return this.as(a)}}function Ic(a){return a=B(a),this[a+"s"]()}function Jc(a){return function(){return this._data[a]}}function Kc(){return q(this.days()/7)}function Lc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Mc(a,b,c){var d=Va(a).abs(),e=Ce(d.as("s")),f=Ce(d.as("m")),g=Ce(d.as("h")),h=Ce(d.as("d")),i=Ce(d.as("M")),j=Ce(d.as("y")),k=e<De.s&&["s",e]||1>=f&&["m"]||f<De.m&&["mm",f]||1>=g&&["h"]||g<De.h&&["hh",g]||1>=h&&["d"]||h<De.d&&["dd",h]||1>=i&&["M"]||i<De.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Lc.apply(null,k)}function Nc(a,b){return void 0===De[a]?!1:void 0===b?De[a]:(De[a]=b,!0)}function Oc(a){var b=this.localeData(),c=Mc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Pc(){var a,b,c,d=Ee(this._milliseconds)/1e3,e=Ee(this._days),f=Ee(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Qc,Rc,Sc=a.momentProperties=[],Tc=!1,Uc={},Vc={},Wc=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,Xc=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,Yc={},Zc={},$c=/\d/,_c=/\d\d/,ad=/\d{3}/,bd=/\d{4}/,cd=/[+-]?\d{6}/,dd=/\d\d?/,ed=/\d\d\d\d?/,fd=/\d\d\d\d\d\d?/,gd=/\d{1,3}/,hd=/\d{1,4}/,id=/[+-]?\d{1,6}/,jd=/\d+/,kd=/[+-]?\d+/,ld=/Z|[+-]\d\d:?\d\d/gi,md=/Z|[+-]\d\d(?::?\d\d)?/gi,nd=/[+-]?\d+(\.\d{1,3})?/,od=/[0-9]*(a[mn]\s?)?['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\-]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,pd={},qd={},rd=0,sd=1,td=2,ud=3,vd=4,wd=5,xd=6,yd=7,zd=8;J("M",["MM",2],"Mo",function(){return this.month()+1}),J("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),J("MMMM",0,0,function(a){return this.localeData().months(this,a)}),A("month","M"),O("M",dd),O("MM",dd,_c),O("MMM",od),O("MMMM",od),R(["M","MM"],function(a,b){b[sd]=r(a)-1}),R(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[sd]=e:j(c).invalidMonth=a});var Ad=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Bd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Cd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sept_Oct_Nov_Dec".split("_"),Dd={};a.suppressDeprecationWarnings=!1;var Ed=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Fd=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Gd=/Z|[+-]\d\d(?::?\d\d)?/,Hd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Id=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Jd=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=ba("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),J(0,["YY",2],0,function(){return this.year()%100}),J(0,["YYYY",4],0,"year"),J(0,["YYYYY",5],0,"year"),J(0,["YYYYYY",6,!0],0,"year"),A("year","y"),O("Y",kd),O("YY",dd,_c),O("YYYY",hd,bd),O("YYYYY",id,cd),O("YYYYYY",id,cd),R(["YYYYY","YYYYYY"],rd),R("YYYY",function(b,c){c[rd]=2===b.length?a.parseTwoDigitYear(b):r(b)}),R("YY",function(b,c){c[rd]=a.parseTwoDigitYear(b)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Kd=E("FullYear",!1);a.ISO_8601=function(){};var Ld=ba("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Md=ba("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Aa.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Nd=Date.now||function(){return+new Date};Ga("Z",":"),Ga("ZZ",""),O("Z",md),O("ZZ",md),R(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ha(md,a)});var Od=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var Pd=/(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Qd=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;Va.fn=Ea.prototype;var Rd=Za(1,"add"),Sd=Za(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var Td=ba("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});J(0,["gg",2],0,function(){return this.weekYear()%100}),J(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Eb("gggg","weekYear"),Eb("ggggg","weekYear"),Eb("GGGG","isoWeekYear"),Eb("GGGGG","isoWeekYear"),A("weekYear","gg"),A("isoWeekYear","GG"),O("G",kd),O("g",kd),O("GG",dd,_c),O("gg",dd,_c),O("GGGG",hd,bd),O("gggg",hd,bd),O("GGGGG",id,cd),O("ggggg",id,cd),S(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),S(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),J("Q",0,"Qo","quarter"),A("quarter","Q"),O("Q",$c),R("Q",function(a,b){b[sd]=3*(r(a)-1)}),J("w",["ww",2],"wo","week"),J("W",["WW",2],"Wo","isoWeek"),A("week","w"),A("isoWeek","W"),O("w",dd),O("ww",dd,_c),O("W",dd),O("WW",dd,_c),S(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var Ud={dow:0,doy:6};J("D",["DD",2],"Do","date"),A("date","D"),O("D",dd),O("DD",dd,_c),O("Do",function(a,b){
return a?b._ordinalParse:b._ordinalParseLenient}),R(["D","DD"],td),R("Do",function(a,b){b[td]=r(a.match(dd)[0],10)});var Vd=E("Date",!0);J("d",0,"do","day"),J("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),J("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),J("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),J("e",0,0,"weekday"),J("E",0,0,"isoWeekday"),A("day","d"),A("weekday","e"),A("isoWeekday","E"),O("d",dd),O("e",dd),O("E",dd),O("dd",od),O("ddd",od),O("dddd",od),S(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),S(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var Wd="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),Xd="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Yd="Su_Mo_Tu_We_Th_Fr_Sa".split("_");J("DDD",["DDDD",3],"DDDo","dayOfYear"),A("dayOfYear","DDD"),O("DDD",gd),O("DDDD",ad),R(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),J("H",["HH",2],0,"hour"),J("h",["hh",2],0,$b),J("hmm",0,0,function(){return""+$b.apply(this)+I(this.minutes(),2)}),J("hmmss",0,0,function(){return""+$b.apply(this)+I(this.minutes(),2)+I(this.seconds(),2)}),J("Hmm",0,0,function(){return""+this.hours()+I(this.minutes(),2)}),J("Hmmss",0,0,function(){return""+this.hours()+I(this.minutes(),2)+I(this.seconds(),2)}),_b("a",!0),_b("A",!1),A("hour","h"),O("a",ac),O("A",ac),O("H",dd),O("h",dd),O("HH",dd,_c),O("hh",dd,_c),O("hmm",ed),O("hmmss",fd),O("Hmm",ed),O("Hmmss",fd),R(["H","HH"],ud),R(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),R(["h","hh"],function(a,b,c){b[ud]=r(a),j(c).bigHour=!0}),R("hmm",function(a,b,c){var d=a.length-2;b[ud]=r(a.substr(0,d)),b[vd]=r(a.substr(d)),j(c).bigHour=!0}),R("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ud]=r(a.substr(0,d)),b[vd]=r(a.substr(d,2)),b[wd]=r(a.substr(e)),j(c).bigHour=!0}),R("Hmm",function(a,b,c){var d=a.length-2;b[ud]=r(a.substr(0,d)),b[vd]=r(a.substr(d))}),R("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[ud]=r(a.substr(0,d)),b[vd]=r(a.substr(d,2)),b[wd]=r(a.substr(e))});var Zd=/[ap]\.?m?\.?/i,$d=E("Hours",!0);J("m",["mm",2],0,"minute"),A("minute","m"),O("m",dd),O("mm",dd,_c),R(["m","mm"],vd);var _d=E("Minutes",!1);J("s",["ss",2],0,"second"),A("second","s"),O("s",dd),O("ss",dd,_c),R(["s","ss"],wd);var ae=E("Seconds",!1);J("S",0,0,function(){return~~(this.millisecond()/100)}),J(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),J(0,["SSS",3],0,"millisecond"),J(0,["SSSS",4],0,function(){return 10*this.millisecond()}),J(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),J(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),J(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),J(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),J(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),A("millisecond","ms"),O("S",gd,$c),O("SS",gd,_c),O("SSS",gd,ad);var be;for(be="SSSS";be.length<=9;be+="S")O(be,jd);for(be="S";be.length<=9;be+="S")R(be,dc);var ce=E("Milliseconds",!1);J("z",0,0,"zoneAbbr"),J("zz",0,0,"zoneName");var de=o.prototype;de.add=Rd,de.calendar=_a,de.clone=ab,de.diff=hb,de.endOf=tb,de.format=lb,de.from=mb,de.fromNow=nb,de.to=ob,de.toNow=pb,de.get=H,de.invalidAt=Cb,de.isAfter=bb,de.isBefore=cb,de.isBetween=db,de.isSame=eb,de.isSameOrAfter=fb,de.isSameOrBefore=gb,de.isValid=Ab,de.lang=Td,de.locale=qb,de.localeData=rb,de.max=Md,de.min=Ld,de.parsingFlags=Bb,de.set=H,de.startOf=sb,de.subtract=Sd,de.toArray=xb,de.toObject=yb,de.toDate=wb,de.toISOString=kb,de.toJSON=zb,de.toString=jb,de.unix=vb,de.valueOf=ub,de.creationData=Db,de.year=Kd,de.isLeapYear=ja,de.weekYear=Fb,de.isoWeekYear=Gb,de.quarter=de.quarters=Lb,de.month=Z,de.daysInMonth=$,de.week=de.weeks=Pb,de.isoWeek=de.isoWeeks=Qb,de.weeksInYear=Ib,de.isoWeeksInYear=Hb,de.date=Vd,de.day=de.days=Wb,de.weekday=Xb,de.isoWeekday=Yb,de.dayOfYear=Zb,de.hour=de.hours=$d,de.minute=de.minutes=_d,de.second=de.seconds=ae,de.millisecond=de.milliseconds=ce,de.utcOffset=Ka,de.utc=Ma,de.local=Na,de.parseZone=Oa,de.hasAlignedHourOffset=Pa,de.isDST=Qa,de.isDSTShifted=Ra,de.isLocal=Sa,de.isUtcOffset=Ta,de.isUtc=Ua,de.isUTC=Ua,de.zoneAbbr=ec,de.zoneName=fc,de.dates=ba("dates accessor is deprecated. Use date instead.",Vd),de.months=ba("months accessor is deprecated. Use month instead",Z),de.years=ba("years accessor is deprecated. Use year instead",Kd),de.zone=ba("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",La);var ee=de,fe={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},ge={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},he="Invalid date",ie="%d",je=/\d{1,2}/,ke={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},le=t.prototype;le._calendar=fe,le.calendar=ic,le._longDateFormat=ge,le.longDateFormat=jc,le._invalidDate=he,le.invalidDate=kc,le._ordinal=ie,le.ordinal=lc,le._ordinalParse=je,le.preparse=mc,le.postformat=mc,le._relativeTime=ke,le.relativeTime=nc,le.pastFuture=oc,le.set=pc,le.months=V,le._months=Bd,le.monthsShort=W,le._monthsShort=Cd,le.monthsParse=X,le.week=Mb,le._week=Ud,le.firstDayOfYear=Ob,le.firstDayOfWeek=Nb,le.weekdays=Sb,le._weekdays=Wd,le.weekdaysMin=Ub,le._weekdaysMin=Yd,le.weekdaysShort=Tb,le._weekdaysShort=Xd,le.weekdaysParse=Vb,le.isPM=bc,le._meridiemParse=Zd,le.meridiem=cc,x("en",{monthsParse:[/^jan/i,/^feb/i,/^mar/i,/^apr/i,/^may/i,/^jun/i,/^jul/i,/^aug/i,/^sep/i,/^oct/i,/^nov/i,/^dec/i],longMonthsParse:[/^january$/i,/^february$/i,/^march$/i,/^april$/i,/^may$/i,/^june$/i,/^july$/i,/^august$/i,/^september$/i,/^october$/i,/^november$/i,/^december$/i],shortMonthsParse:[/^jan$/i,/^feb$/i,/^mar$/i,/^apr$/i,/^may$/i,/^jun$/i,/^jul$/i,/^aug/i,/^sept?$/i,/^oct$/i,/^nov$/i,/^dec$/i],ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=ba("moment.lang is deprecated. Use moment.locale instead.",x),a.langData=ba("moment.langData is deprecated. Use moment.localeData instead.",z);var me=Math.abs,ne=Hc("ms"),oe=Hc("s"),pe=Hc("m"),qe=Hc("h"),re=Hc("d"),se=Hc("w"),te=Hc("M"),ue=Hc("y"),ve=Jc("milliseconds"),we=Jc("seconds"),xe=Jc("minutes"),ye=Jc("hours"),ze=Jc("days"),Ae=Jc("months"),Be=Jc("years"),Ce=Math.round,De={s:45,m:45,h:22,d:26,M:11},Ee=Math.abs,Fe=Ea.prototype;Fe.abs=xc,Fe.add=zc,Fe.subtract=Ac,Fe.as=Fc,Fe.asMilliseconds=ne,Fe.asSeconds=oe,Fe.asMinutes=pe,Fe.asHours=qe,Fe.asDays=re,Fe.asWeeks=se,Fe.asMonths=te,Fe.asYears=ue,Fe.valueOf=Gc,Fe._bubble=Cc,Fe.get=Ic,Fe.milliseconds=ve,Fe.seconds=we,Fe.minutes=xe,Fe.hours=ye,Fe.days=ze,Fe.weeks=Kc,Fe.months=Ae,Fe.years=Be,Fe.humanize=Oc,Fe.toISOString=Pc,Fe.toString=Pc,Fe.toJSON=Pc,Fe.locale=qb,Fe.localeData=rb,Fe.toIsoString=ba("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Pc),Fe.lang=Td,J("X",0,0,"unix"),J("x",0,0,"valueOf"),O("x",kd),O("X",nd),R("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),R("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.11.0",b(Aa),a.fn=ee,a.min=Ca,a.max=Da,a.now=Nd,a.utc=h,a.unix=gc,a.months=sc,a.isDate=d,a.locale=x,a.invalid=l,a.duration=Va,a.isMoment=p,a.weekdays=uc,a.parseZone=hc,a.localeData=z,a.isDuration=Fa,a.monthsShort=tc,a.weekdaysMin=wc,a.defineLocale=y,a.weekdaysShort=vc,a.normalizeUnits=B,a.relativeTimeThreshold=Nc,a.prototype=ee;var Ge=a;return Ge});
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
!function(a){"use strict";if("function"==typeof define&&define.amd)define(["jquery","moment"],a);else if("object"==typeof exports)a(require("jquery"),require("moment"));else{if("undefined"==typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"==typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";a(jQuery,moment)}}(function(a,b){"use strict";if(!b)throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var c=function(c,d){var e,f,g,h,i,j,k,l={},m=!0,n=!1,o=!1,p=0,q=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],r=["days","months","years","decades"],s=["top","bottom","auto"],t=["left","right","auto"],u=["default","top","bottom"],v={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},w={},x=function(a){var c,e,f,g,h,i=!1;return void 0!==b.tz&&void 0!==d.timeZone&&null!==d.timeZone&&""!==d.timeZone&&(i=!0),void 0===a||null===a?c=i?b().tz(d.timeZone).startOf("d"):b().startOf("d"):i?(e=b().tz(d.timeZone).utcOffset(),f=b(a,j,d.useStrict).utcOffset(),f!==e?(g=b().tz(d.timeZone).format("Z"),h=b(a,j,d.useStrict).format("YYYY-MM-DD[T]HH:mm:ss")+g,c=b(h,j,d.useStrict).tz(d.timeZone)):c=b(a,j,d.useStrict).tz(d.timeZone)):c=b(a,j,d.useStrict),c},y=function(a){if("string"!=typeof a||a.length>1)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case"y":return-1!==i.indexOf("Y");case"M":return-1!==i.indexOf("M");case"d":return-1!==i.toLowerCase().indexOf("d");case"h":case"H":return-1!==i.toLowerCase().indexOf("h");case"m":return-1!==i.indexOf("m");case"s":return-1!==i.indexOf("s");default:return!1}},z=function(){return y("h")||y("m")||y("s")},A=function(){return y("y")||y("M")||y("d")},B=function(){var b=a("<thead>").append(a("<tr>").append(a("<th>").addClass("prev").attr("data-action","previous").append(a("<span>").addClass(d.icons.previous))).append(a("<th>").addClass("picker-switch").attr("data-action","pickerSwitch").attr("colspan",d.calendarWeeks?"6":"5")).append(a("<th>").addClass("next").attr("data-action","next").append(a("<span>").addClass(d.icons.next)))),c=a("<tbody>").append(a("<tr>").append(a("<td>").attr("colspan",d.calendarWeeks?"8":"7")));return[a("<div>").addClass("datepicker-days").append(a("<table>").addClass("table-condensed").append(b).append(a("<tbody>"))),a("<div>").addClass("datepicker-months").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-years").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())),a("<div>").addClass("datepicker-decades").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone()))]},C=function(){var b=a("<tr>"),c=a("<tr>"),e=a("<tr>");return y("h")&&(b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:d.tooltips.pickHour}).attr("data-action","showHours"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementHour}).addClass("btn").attr("data-action","decrementHours").append(a("<span>").addClass(d.icons.down))))),y("m")&&(y("h")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",title:d.tooltips.pickMinute}).attr("data-action","showMinutes"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(a("<span>").addClass(d.icons.down))))),y("s")&&(y("m")&&(b.append(a("<td>").addClass("separator")),c.append(a("<td>").addClass("separator").html(":")),e.append(a("<td>").addClass("separator"))),b.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.incrementSecond}).addClass("btn").attr("data-action","incrementSeconds").append(a("<span>").addClass(d.icons.up)))),c.append(a("<td>").append(a("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:d.tooltips.pickSecond}).attr("data-action","showSeconds"))),e.append(a("<td>").append(a("<a>").attr({href:"#",tabindex:"-1",title:d.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(a("<span>").addClass(d.icons.down))))),h||(b.append(a("<td>").addClass("separator")),c.append(a("<td>").append(a("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",tabindex:"-1",title:d.tooltips.togglePeriod}))),e.append(a("<td>").addClass("separator"))),a("<div>").addClass("timepicker-picker").append(a("<table>").addClass("table-condensed").append([b,c,e]))},D=function(){var b=a("<div>").addClass("timepicker-hours").append(a("<table>").addClass("table-condensed")),c=a("<div>").addClass("timepicker-minutes").append(a("<table>").addClass("table-condensed")),d=a("<div>").addClass("timepicker-seconds").append(a("<table>").addClass("table-condensed")),e=[C()];return y("h")&&e.push(b),y("m")&&e.push(c),y("s")&&e.push(d),e},E=function(){var b=[];return d.showTodayButton&&b.push(a("<td>").append(a("<a>").attr({"data-action":"today",title:d.tooltips.today}).append(a("<span>").addClass(d.icons.today)))),!d.sideBySide&&A()&&z()&&b.push(a("<td>").append(a("<a>").attr({"data-action":"togglePicker",title:d.tooltips.selectTime}).append(a("<span>").addClass(d.icons.time)))),d.showClear&&b.push(a("<td>").append(a("<a>").attr({"data-action":"clear",title:d.tooltips.clear}).append(a("<span>").addClass(d.icons.clear)))),d.showClose&&b.push(a("<td>").append(a("<a>").attr({"data-action":"close",title:d.tooltips.close}).append(a("<span>").addClass(d.icons.close)))),a("<table>").addClass("table-condensed").append(a("<tbody>").append(a("<tr>").append(b)))},F=function(){var b=a("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),c=a("<div>").addClass("datepicker").append(B()),e=a("<div>").addClass("timepicker").append(D()),f=a("<ul>").addClass("list-unstyled"),g=a("<li>").addClass("picker-switch"+(d.collapse?" accordion-toggle":"")).append(E());return d.inline&&b.removeClass("dropdown-menu"),h&&b.addClass("usetwentyfour"),y("s")&&!h&&b.addClass("wider"),d.sideBySide&&A()&&z()?(b.addClass("timepicker-sbs"),"top"===d.toolbarPlacement&&b.append(g),b.append(a("<div>").addClass("row").append(c.addClass("col-md-6")).append(e.addClass("col-md-6"))),"bottom"===d.toolbarPlacement&&b.append(g),b):("top"===d.toolbarPlacement&&f.append(g),A()&&f.append(a("<li>").addClass(d.collapse&&z()?"collapse in":"").append(c)),"default"===d.toolbarPlacement&&f.append(g),z()&&f.append(a("<li>").addClass(d.collapse&&A()?"collapse":"").append(e)),"bottom"===d.toolbarPlacement&&f.append(g),b.append(f))},G=function(){var b,e={};return b=c.is("input")||d.inline?c.data():c.find("input").data(),b.dateOptions&&b.dateOptions instanceof Object&&(e=a.extend(!0,e,b.dateOptions)),a.each(d,function(a){var c="date"+a.charAt(0).toUpperCase()+a.slice(1);void 0!==b[c]&&(e[a]=b[c])}),e},H=function(){var b,e=(n||c).position(),f=(n||c).offset(),g=d.widgetPositioning.vertical,h=d.widgetPositioning.horizontal;if(d.widgetParent)b=d.widgetParent.append(o);else if(c.is("input"))b=c.after(o).parent();else{if(d.inline)return void(b=c.append(o));b=c,c.children().first().after(o)}if("auto"===g&&(g=f.top+1.5*o.height()>=a(window).height()+a(window).scrollTop()&&o.height()+c.outerHeight()<f.top?"top":"bottom"),"auto"===h&&(h=b.width()<f.left+o.outerWidth()/2&&f.left+o.outerWidth()>a(window).width()?"right":"left"),"top"===g?o.addClass("top").removeClass("bottom"):o.addClass("bottom").removeClass("top"),"right"===h?o.addClass("pull-right"):o.removeClass("pull-right"),"relative"!==b.css("position")&&(b=b.parents().filter(function(){return"relative"===a(this).css("position")}).first()),0===b.length)throw new Error("datetimepicker component should be placed within a relative positioned container");o.css({top:"top"===g?"auto":e.top+c.outerHeight(),bottom:"top"===g?e.top+c.outerHeight():"auto",left:"left"===h?b===c?0:e.left:"auto",right:"left"===h?"auto":b.outerWidth()-c.outerWidth()-(b===c?0:e.left)})},I=function(a){"dp.change"===a.type&&(a.date&&a.date.isSame(a.oldDate)||!a.date&&!a.oldDate)||c.trigger(a)},J=function(a){"y"===a&&(a="YYYY"),I({type:"dp.update",change:a,viewDate:f.clone()})},K=function(a){o&&(a&&(k=Math.max(p,Math.min(3,k+a))),o.find(".datepicker > div").hide().filter(".datepicker-"+q[k].clsName).show())},L=function(){var b=a("<tr>"),c=f.clone().startOf("w").startOf("d");for(d.calendarWeeks===!0&&b.append(a("<th>").addClass("cw").text("#"));c.isBefore(f.clone().endOf("w"));)b.append(a("<th>").addClass("dow").text(c.format("dd"))),c.add(1,"d");o.find(".datepicker-days thead").append(b)},M=function(a){return d.disabledDates[a.format("YYYY-MM-DD")]===!0},N=function(a){return d.enabledDates[a.format("YYYY-MM-DD")]===!0},O=function(a){return d.disabledHours[a.format("H")]===!0},P=function(a){return d.enabledHours[a.format("H")]===!0},Q=function(b,c){if(!b.isValid())return!1;if(d.disabledDates&&"d"===c&&M(b))return!1;if(d.enabledDates&&"d"===c&&!N(b))return!1;if(d.minDate&&b.isBefore(d.minDate,c))return!1;if(d.maxDate&&b.isAfter(d.maxDate,c))return!1;if(d.daysOfWeekDisabled&&"d"===c&&-1!==d.daysOfWeekDisabled.indexOf(b.day()))return!1;if(d.disabledHours&&("h"===c||"m"===c||"s"===c)&&O(b))return!1;if(d.enabledHours&&("h"===c||"m"===c||"s"===c)&&!P(b))return!1;if(d.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var e=!1;if(a.each(d.disabledTimeIntervals,function(){return b.isBetween(this[0],this[1])?(e=!0,!1):void 0}),e)return!1}return!0},R=function(){for(var b=[],c=f.clone().startOf("y").startOf("d");c.isSame(f,"y");)b.push(a("<span>").attr("data-action","selectMonth").addClass("month").text(c.format("MMM"))),c.add(1,"M");o.find(".datepicker-months td").empty().append(b)},S=function(){var b=o.find(".datepicker-months"),c=b.find("th"),g=b.find("tbody").find("span");c.eq(0).find("span").attr("title",d.tooltips.prevYear),c.eq(1).attr("title",d.tooltips.selectYear),c.eq(2).find("span").attr("title",d.tooltips.nextYear),b.find(".disabled").removeClass("disabled"),Q(f.clone().subtract(1,"y"),"y")||c.eq(0).addClass("disabled"),c.eq(1).text(f.year()),Q(f.clone().add(1,"y"),"y")||c.eq(2).addClass("disabled"),g.removeClass("active"),e.isSame(f,"y")&&!m&&g.eq(e.month()).addClass("active"),g.each(function(b){Q(f.clone().month(b),"M")||a(this).addClass("disabled")})},T=function(){var a=o.find(".datepicker-years"),b=a.find("th"),c=f.clone().subtract(5,"y"),g=f.clone().add(6,"y"),h="";for(b.eq(0).find("span").attr("title",d.tooltips.prevDecade),b.eq(1).attr("title",d.tooltips.selectDecade),b.eq(2).find("span").attr("title",d.tooltips.nextDecade),a.find(".disabled").removeClass("disabled"),d.minDate&&d.minDate.isAfter(c,"y")&&b.eq(0).addClass("disabled"),b.eq(1).text(c.year()+"-"+g.year()),d.maxDate&&d.maxDate.isBefore(g,"y")&&b.eq(2).addClass("disabled");!c.isAfter(g,"y");)h+='<span data-action="selectYear" class="year'+(c.isSame(e,"y")&&!m?" active":"")+(Q(c,"y")?"":" disabled")+'">'+c.year()+"</span>",c.add(1,"y");a.find("td").html(h)},U=function(){var a=o.find(".datepicker-decades"),c=a.find("th"),g=b({y:f.year()-f.year()%100-1}),h=g.clone().add(100,"y"),i=g.clone(),j="";for(c.eq(0).find("span").attr("title",d.tooltips.prevCentury),c.eq(2).find("span").attr("title",d.tooltips.nextCentury),a.find(".disabled").removeClass("disabled"),(g.isSame(b({y:1900}))||d.minDate&&d.minDate.isAfter(g,"y"))&&c.eq(0).addClass("disabled"),c.eq(1).text(g.year()+"-"+h.year()),(g.isSame(b({y:2e3}))||d.maxDate&&d.maxDate.isBefore(h,"y"))&&c.eq(2).addClass("disabled");!g.isAfter(h,"y");)j+='<span data-action="selectDecade" class="decade'+(g.isSame(e,"y")?" active":"")+(Q(g,"y")?"":" disabled")+'" data-selection="'+(g.year()+6)+'">'+(g.year()+1)+" - "+(g.year()+12)+"</span>",g.add(12,"y");j+="<span></span><span></span><span></span>",a.find("td").html(j),c.eq(1).text(i.year()+1+"-"+g.year())},V=function(){var b,c,g,h,i=o.find(".datepicker-days"),j=i.find("th"),k=[];if(A()){for(j.eq(0).find("span").attr("title",d.tooltips.prevMonth),j.eq(1).attr("title",d.tooltips.selectMonth),j.eq(2).find("span").attr("title",d.tooltips.nextMonth),i.find(".disabled").removeClass("disabled"),j.eq(1).text(f.format(d.dayViewHeaderFormat)),Q(f.clone().subtract(1,"M"),"M")||j.eq(0).addClass("disabled"),Q(f.clone().add(1,"M"),"M")||j.eq(2).addClass("disabled"),b=f.clone().startOf("M").startOf("w").startOf("d"),h=0;42>h;h++)0===b.weekday()&&(c=a("<tr>"),d.calendarWeeks&&c.append('<td class="cw">'+b.week()+"</td>"),k.push(c)),g="",b.isBefore(f,"M")&&(g+=" old"),b.isAfter(f,"M")&&(g+=" new"),b.isSame(e,"d")&&!m&&(g+=" active"),Q(b,"d")||(g+=" disabled"),b.isSame(x(),"d")&&(g+=" today"),(0===b.day()||6===b.day())&&(g+=" weekend"),c.append('<td data-action="selectDay" data-day="'+b.format("L")+'" class="day'+g+'">'+b.date()+"</td>"),b.add(1,"d");i.find("tbody").empty().append(k),S(),T(),U()}},W=function(){var b=o.find(".timepicker-hours table"),c=f.clone().startOf("d"),d=[],e=a("<tr>");for(f.hour()>11&&!h&&c.hour(12);c.isSame(f,"d")&&(h||f.hour()<12&&c.hour()<12||f.hour()>11);)c.hour()%4===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectHour" class="hour'+(Q(c,"h")?"":" disabled")+'">'+c.format(h?"HH":"hh")+"</td>"),c.add(1,"h");b.empty().append(d)},X=function(){for(var b=o.find(".timepicker-minutes table"),c=f.clone().startOf("h"),e=[],g=a("<tr>"),h=1===d.stepping?5:d.stepping;f.isSame(c,"h");)c.minute()%(4*h)===0&&(g=a("<tr>"),e.push(g)),g.append('<td data-action="selectMinute" class="minute'+(Q(c,"m")?"":" disabled")+'">'+c.format("mm")+"</td>"),c.add(h,"m");b.empty().append(e)},Y=function(){for(var b=o.find(".timepicker-seconds table"),c=f.clone().startOf("m"),d=[],e=a("<tr>");f.isSame(c,"m");)c.second()%20===0&&(e=a("<tr>"),d.push(e)),e.append('<td data-action="selectSecond" class="second'+(Q(c,"s")?"":" disabled")+'">'+c.format("ss")+"</td>"),c.add(5,"s");b.empty().append(d)},Z=function(){var a,b,c=o.find(".timepicker span[data-time-component]");h||(a=o.find(".timepicker [data-action=togglePeriod]"),b=e.clone().add(e.hours()>=12?-12:12,"h"),a.text(e.format("A")),Q(b,"h")?a.removeClass("disabled"):a.addClass("disabled")),c.filter("[data-time-component=hours]").text(e.format(h?"HH":"hh")),c.filter("[data-time-component=minutes]").text(e.format("mm")),c.filter("[data-time-component=seconds]").text(e.format("ss")),W(),X(),Y()},$=function(){o&&(V(),Z())},_=function(a){var b=m?null:e;return a?(a=a.clone().locale(d.locale),1!==d.stepping&&a.minutes(Math.round(a.minutes()/d.stepping)*d.stepping%60).seconds(0),void(Q(a)?(e=a,f=e.clone(),g.val(e.format(i)),c.data("date",e.format(i)),m=!1,$(),I({type:"dp.change",date:e.clone(),oldDate:b})):(d.keepInvalid||g.val(m?"":e.format(i)),I({type:"dp.error",date:a})))):(m=!0,g.val(""),c.data("date",""),I({type:"dp.change",date:!1,oldDate:b}),void $())},aa=function(){var b=!1;return o?(o.find(".collapse").each(function(){var c=a(this).data("collapse");return c&&c.transitioning?(b=!0,!1):!0}),b?l:(n&&n.hasClass("btn")&&n.toggleClass("active"),o.hide(),a(window).off("resize",H),o.off("click","[data-action]"),o.off("mousedown",!1),o.remove(),o=!1,I({type:"dp.hide",date:e.clone()}),g.blur(),l)):l},ba=function(){_(null)},ca={next:function(){var a=q[k].navFnc;f.add(q[k].navStep,a),V(),J(a)},previous:function(){var a=q[k].navFnc;f.subtract(q[k].navStep,a),V(),J(a)},pickerSwitch:function(){K(1)},selectMonth:function(b){var c=a(b.target).closest("tbody").find("span").index(a(b.target));f.month(c),k===p?(_(e.clone().year(f.year()).month(f.month())),d.inline||aa()):(K(-1),V()),J("M")},selectYear:function(b){var c=parseInt(a(b.target).text(),10)||0;f.year(c),k===p?(_(e.clone().year(f.year())),d.inline||aa()):(K(-1),V()),J("YYYY")},selectDecade:function(b){var c=parseInt(a(b.target).data("selection"),10)||0;f.year(c),k===p?(_(e.clone().year(f.year())),d.inline||aa()):(K(-1),V()),J("YYYY")},selectDay:function(b){var c=f.clone();a(b.target).is(".old")&&c.subtract(1,"M"),a(b.target).is(".new")&&c.add(1,"M"),_(c.date(parseInt(a(b.target).text(),10))),z()||d.keepOpen||d.inline||aa()},incrementHours:function(){var a=e.clone().add(1,"h");Q(a,"h")&&_(a)},incrementMinutes:function(){var a=e.clone().add(d.stepping,"m");Q(a,"m")&&_(a)},incrementSeconds:function(){var a=e.clone().add(1,"s");Q(a,"s")&&_(a)},decrementHours:function(){var a=e.clone().subtract(1,"h");Q(a,"h")&&_(a)},decrementMinutes:function(){var a=e.clone().subtract(d.stepping,"m");Q(a,"m")&&_(a)},decrementSeconds:function(){var a=e.clone().subtract(1,"s");Q(a,"s")&&_(a)},togglePeriod:function(){_(e.clone().add(e.hours()>=12?-12:12,"h"))},togglePicker:function(b){var c,e=a(b.target),f=e.closest("ul"),g=f.find(".in"),h=f.find(".collapse:not(.in)");if(g&&g.length){if(c=g.data("collapse"),c&&c.transitioning)return;g.collapse?(g.collapse("hide"),h.collapse("show")):(g.removeClass("in"),h.addClass("in")),e.is("span")?e.toggleClass(d.icons.time+" "+d.icons.date):e.find("span").toggleClass(d.icons.time+" "+d.icons.date)}},showPicker:function(){o.find(".timepicker > div:not(.timepicker-picker)").hide(),o.find(".timepicker .timepicker-picker").show()},showHours:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-hours").show()},showMinutes:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){o.find(".timepicker .timepicker-picker").hide(),o.find(".timepicker .timepicker-seconds").show()},selectHour:function(b){var c=parseInt(a(b.target).text(),10);h||(e.hours()>=12?12!==c&&(c+=12):12===c&&(c=0)),_(e.clone().hours(c)),ca.showPicker.call(l)},selectMinute:function(b){_(e.clone().minutes(parseInt(a(b.target).text(),10))),ca.showPicker.call(l)},selectSecond:function(b){_(e.clone().seconds(parseInt(a(b.target).text(),10))),ca.showPicker.call(l)},clear:ba,today:function(){var a=x();Q(a,"d")&&_(a)},close:aa},da=function(b){return a(b.currentTarget).is(".disabled")?!1:(ca[a(b.currentTarget).data("action")].apply(l,arguments),!1)},ea=function(){var b,c={year:function(a){return a.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(a){return a.date(1).hours(0).seconds(0).minutes(0)},day:function(a){return a.hours(0).seconds(0).minutes(0)},hour:function(a){return a.seconds(0).minutes(0)},minute:function(a){return a.seconds(0)}};return g.prop("disabled")||!d.ignoreReadonly&&g.prop("readonly")||o?l:(void 0!==g.val()&&0!==g.val().trim().length?_(ga(g.val().trim())):d.useCurrent&&m&&(g.is("input")&&0===g.val().trim().length||d.inline)&&(b=x(),"string"==typeof d.useCurrent&&(b=c[d.useCurrent](b)),_(b)),o=F(),L(),R(),o.find(".timepicker-hours").hide(),o.find(".timepicker-minutes").hide(),o.find(".timepicker-seconds").hide(),$(),K(),a(window).on("resize",H),o.on("click","[data-action]",da),o.on("mousedown",!1),n&&n.hasClass("btn")&&n.toggleClass("active"),o.show(),H(),d.focusOnShow&&!g.is(":focus")&&g.focus(),I({type:"dp.show"}),l)},fa=function(){return o?aa():ea()},ga=function(a){return a=void 0===d.parseInputDate?b.isMoment(a)||a instanceof Date?b(a):x(a):d.parseInputDate(a),a.locale(d.locale),a},ha=function(a){var b,c,e,f,g=null,h=[],i={},j=a.which,k="p";w[j]=k;for(b in w)w.hasOwnProperty(b)&&w[b]===k&&(h.push(b),parseInt(b,10)!==j&&(i[b]=!0));for(b in d.keyBinds)if(d.keyBinds.hasOwnProperty(b)&&"function"==typeof d.keyBinds[b]&&(e=b.split(" "),e.length===h.length&&v[j]===e[e.length-1])){for(f=!0,c=e.length-2;c>=0;c--)if(!(v[e[c]]in i)){f=!1;break}if(f){g=d.keyBinds[b];break}}g&&(g.call(l,o),a.stopPropagation(),a.preventDefault())},ia=function(a){w[a.which]="r",a.stopPropagation(),a.preventDefault()},ja=function(b){var c=a(b.target).val().trim(),d=c?ga(c):null;return _(d),b.stopImmediatePropagation(),!1},ka=function(){g.on({change:ja,blur:d.debug?"":aa,keydown:ha,keyup:ia,focus:d.allowInputToggle?ea:""}),c.is("input")?g.on({focus:ea}):n&&(n.on("click",fa),n.on("mousedown",!1))},la=function(){g.off({change:ja,blur:blur,keydown:ha,keyup:ia,focus:d.allowInputToggle?aa:""}),c.is("input")?g.off({focus:ea}):n&&(n.off("click",fa),n.off("mousedown",!1))},ma=function(b){var c={};return a.each(b,function(){var a=ga(this);a.isValid()&&(c[a.format("YYYY-MM-DD")]=!0)}),Object.keys(c).length?c:!1},na=function(b){var c={};return a.each(b,function(){c[this]=!0}),Object.keys(c).length?c:!1},oa=function(){var a=d.format||"L LT";i=a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){var b=e.localeData().longDateFormat(a)||a;return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(a){return e.localeData().longDateFormat(a)||a})}),j=d.extraFormats?d.extraFormats.slice():[],j.indexOf(a)<0&&j.indexOf(i)<0&&j.push(i),h=i.toLowerCase().indexOf("a")<1&&i.replace(/\[.*?\]/g,"").indexOf("h")<1,y("y")&&(p=2),y("M")&&(p=1),y("d")&&(p=0),k=Math.max(p,k),m||_(e)};if(l.destroy=function(){aa(),la(),c.removeData("DateTimePicker"),c.removeData("date")},l.toggle=fa,l.show=ea,l.hide=aa,l.disable=function(){return aa(),n&&n.hasClass("btn")&&n.addClass("disabled"),g.prop("disabled",!0),l},l.enable=function(){return n&&n.hasClass("btn")&&n.removeClass("disabled"),g.prop("disabled",!1),l},l.ignoreReadonly=function(a){if(0===arguments.length)return d.ignoreReadonly;if("boolean"!=typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");return d.ignoreReadonly=a,l},l.options=function(b){if(0===arguments.length)return a.extend(!0,{},d);if(!(b instanceof Object))throw new TypeError("options() options parameter should be an object");return a.extend(!0,d,b),a.each(d,function(a,b){if(void 0===l[a])throw new TypeError("option "+a+" is not recognized!");l[a](b)}),l},l.date=function(a){if(0===arguments.length)return m?null:e.clone();if(!(null===a||"string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return _(null===a?null:ga(a)),l},l.format=function(a){if(0===arguments.length)return d.format;if("string"!=typeof a&&("boolean"!=typeof a||a!==!1))throw new TypeError("format() expects a sting or boolean:false parameter "+a);return d.format=a,i&&oa(),l},l.timeZone=function(a){return 0===arguments.length?d.timeZone:(d.timeZone=a,l)},l.dayViewHeaderFormat=function(a){if(0===arguments.length)return d.dayViewHeaderFormat;if("string"!=typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");return d.dayViewHeaderFormat=a,l},l.extraFormats=function(a){if(0===arguments.length)return d.extraFormats;if(a!==!1&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");return d.extraFormats=a,j&&oa(),l},l.disabledDates=function(b){if(0===arguments.length)return d.disabledDates?a.extend({},d.disabledDates):d.disabledDates;if(!b)return d.disabledDates=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledDates() expects an array parameter");return d.disabledDates=ma(b),d.enabledDates=!1,$(),l},l.enabledDates=function(b){if(0===arguments.length)return d.enabledDates?a.extend({},d.enabledDates):d.enabledDates;if(!b)return d.enabledDates=!1,$(),l;if(!(b instanceof Array))throw new TypeError("enabledDates() expects an array parameter");return d.enabledDates=ma(b),d.disabledDates=!1,$(),l},l.daysOfWeekDisabled=function(a){if(0===arguments.length)return d.daysOfWeekDisabled.splice(0);if("boolean"==typeof a&&!a)return d.daysOfWeekDisabled=!1,$(),l;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");if(d.daysOfWeekDisabled=a.reduce(function(a,b){return b=parseInt(b,10),b>6||0>b||isNaN(b)?a:(-1===a.indexOf(b)&&a.push(b),a)},[]).sort(),d.useCurrent&&!d.keepInvalid){for(var b=0;!Q(e,"d");){if(e.add(1,"d"),7===b)throw"Tried 7 times to find a valid date";b++}_(e)}return $(),l},l.maxDate=function(a){if(0===arguments.length)return d.maxDate?d.maxDate.clone():d.maxDate;if("boolean"==typeof a&&a===!1)return d.maxDate=!1,$(),l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(d.minDate&&b.isBefore(d.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+b.format(i));return d.maxDate=b,d.useCurrent&&!d.keepInvalid&&e.isAfter(a)&&_(d.maxDate),f.isAfter(b)&&(f=b.clone().subtract(d.stepping,"m")),$(),l},l.minDate=function(a){if(0===arguments.length)return d.minDate?d.minDate.clone():d.minDate;if("boolean"==typeof a&&a===!1)return d.minDate=!1,$(),l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(d.maxDate&&b.isAfter(d.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+b.format(i));return d.minDate=b,d.useCurrent&&!d.keepInvalid&&e.isBefore(a)&&_(d.minDate),f.isBefore(b)&&(f=b.clone().add(d.stepping,"m")),$(),l},l.defaultDate=function(a){if(0===arguments.length)return d.defaultDate?d.defaultDate.clone():d.defaultDate;if(!a)return d.defaultDate=!1,l;"string"==typeof a&&("now"===a||"moment"===a)&&(a=x());var b=ga(a);if(!b.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!Q(b))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return d.defaultDate=b,(d.defaultDate&&d.inline||""===g.val().trim())&&_(d.defaultDate),l},l.locale=function(a){if(0===arguments.length)return d.locale;if(!b.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");return d.locale=a,e.locale(d.locale),f.locale(d.locale),i&&oa(),o&&(aa(),ea()),l},l.stepping=function(a){return 0===arguments.length?d.stepping:(a=parseInt(a,10),(isNaN(a)||1>a)&&(a=1),d.stepping=a,l)},l.useCurrent=function(a){var b=["year","month","day","hour","minute"];if(0===arguments.length)return d.useCurrent;if("boolean"!=typeof a&&"string"!=typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"==typeof a&&-1===b.indexOf(a.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of "+b.join(", "));return d.useCurrent=a,l},l.collapse=function(a){if(0===arguments.length)return d.collapse;if("boolean"!=typeof a)throw new TypeError("collapse() expects a boolean parameter");return d.collapse===a?l:(d.collapse=a,o&&(aa(),ea()),l)},l.icons=function(b){if(0===arguments.length)return a.extend({},d.icons);if(!(b instanceof Object))throw new TypeError("icons() expects parameter to be an Object");return a.extend(d.icons,b),o&&(aa(),ea()),l},l.tooltips=function(b){if(0===arguments.length)return a.extend({},d.tooltips);if(!(b instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");return a.extend(d.tooltips,b),o&&(aa(),ea()),l},l.useStrict=function(a){if(0===arguments.length)return d.useStrict;if("boolean"!=typeof a)throw new TypeError("useStrict() expects a boolean parameter");return d.useStrict=a,l},l.sideBySide=function(a){if(0===arguments.length)return d.sideBySide;if("boolean"!=typeof a)throw new TypeError("sideBySide() expects a boolean parameter");return d.sideBySide=a,o&&(aa(),ea()),l},l.viewMode=function(a){if(0===arguments.length)return d.viewMode;if("string"!=typeof a)throw new TypeError("viewMode() expects a string parameter");if(-1===r.indexOf(a))throw new TypeError("viewMode() parameter must be one of ("+r.join(", ")+") value");return d.viewMode=a,k=Math.max(r.indexOf(a),p),K(),l},l.toolbarPlacement=function(a){if(0===arguments.length)return d.toolbarPlacement;if("string"!=typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(-1===u.indexOf(a))throw new TypeError("toolbarPlacement() parameter must be one of ("+u.join(", ")+") value");return d.toolbarPlacement=a,o&&(aa(),ea()),l},l.widgetPositioning=function(b){if(0===arguments.length)return a.extend({},d.widgetPositioning);if("[object Object]"!=={}.toString.call(b))throw new TypeError("widgetPositioning() expects an object variable");if(b.horizontal){if("string"!=typeof b.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");if(b.horizontal=b.horizontal.toLowerCase(),-1===t.indexOf(b.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+t.join(", ")+")");d.widgetPositioning.horizontal=b.horizontal}if(b.vertical){if("string"!=typeof b.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");if(b.vertical=b.vertical.toLowerCase(),-1===s.indexOf(b.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+s.join(", ")+")");d.widgetPositioning.vertical=b.vertical}return $(),l},l.calendarWeeks=function(a){if(0===arguments.length)return d.calendarWeeks;if("boolean"!=typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return d.calendarWeeks=a,$(),l},l.showTodayButton=function(a){if(0===arguments.length)return d.showTodayButton;if("boolean"!=typeof a)throw new TypeError("showTodayButton() expects a boolean parameter");return d.showTodayButton=a,o&&(aa(),ea()),l},l.showClear=function(a){if(0===arguments.length)return d.showClear;if("boolean"!=typeof a)throw new TypeError("showClear() expects a boolean parameter");return d.showClear=a,o&&(aa(),ea()),l},l.widgetParent=function(b){if(0===arguments.length)return d.widgetParent;if("string"==typeof b&&(b=a(b)),null!==b&&"string"!=typeof b&&!(b instanceof a))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return d.widgetParent=b,o&&(aa(),ea()),l},l.keepOpen=function(a){if(0===arguments.length)return d.keepOpen;if("boolean"!=typeof a)throw new TypeError("keepOpen() expects a boolean parameter");return d.keepOpen=a,l},l.focusOnShow=function(a){if(0===arguments.length)return d.focusOnShow;if("boolean"!=typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");return d.focusOnShow=a,l},l.inline=function(a){if(0===arguments.length)return d.inline;if("boolean"!=typeof a)throw new TypeError("inline() expects a boolean parameter");return d.inline=a,l},l.clear=function(){return ba(),l},l.keyBinds=function(a){return d.keyBinds=a,l},l.getMoment=function(a){return x(a)},l.debug=function(a){if("boolean"!=typeof a)throw new TypeError("debug() expects a boolean parameter");return d.debug=a,l},l.allowInputToggle=function(a){if(0===arguments.length)return d.allowInputToggle;if("boolean"!=typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");return d.allowInputToggle=a,l},l.showClose=function(a){if(0===arguments.length)return d.showClose;if("boolean"!=typeof a)throw new TypeError("showClose() expects a boolean parameter");return d.showClose=a,l},l.keepInvalid=function(a){if(0===arguments.length)return d.keepInvalid;if("boolean"!=typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");return d.keepInvalid=a,l},l.datepickerInput=function(a){if(0===arguments.length)return d.datepickerInput;if("string"!=typeof a)throw new TypeError("datepickerInput() expects a string parameter");return d.datepickerInput=a,l},l.parseInputDate=function(a){if(0===arguments.length)return d.parseInputDate;
        if("function"!=typeof a)throw new TypeError("parseInputDate() sholud be as function");return d.parseInputDate=a,l},l.disabledTimeIntervals=function(b){if(0===arguments.length)return d.disabledTimeIntervals?a.extend({},d.disabledTimeIntervals):d.disabledTimeIntervals;if(!b)return d.disabledTimeIntervals=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");return d.disabledTimeIntervals=b,$(),l},l.disabledHours=function(b){if(0===arguments.length)return d.disabledHours?a.extend({},d.disabledHours):d.disabledHours;if(!b)return d.disabledHours=!1,$(),l;if(!(b instanceof Array))throw new TypeError("disabledHours() expects an array parameter");if(d.disabledHours=na(b),d.enabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!Q(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}_(e)}return $(),l},l.enabledHours=function(b){if(0===arguments.length)return d.enabledHours?a.extend({},d.enabledHours):d.enabledHours;if(!b)return d.enabledHours=!1,$(),l;if(!(b instanceof Array))throw new TypeError("enabledHours() expects an array parameter");if(d.enabledHours=na(b),d.disabledHours=!1,d.useCurrent&&!d.keepInvalid){for(var c=0;!Q(e,"h");){if(e.add(1,"h"),24===c)throw"Tried 24 times to find a valid date";c++}_(e)}return $(),l},l.viewDate=function(a){if(0===arguments.length)return f.clone();if(!a)return f=e.clone(),l;if(!("string"==typeof a||b.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return f=ga(a),J(),l},c.is("input"))g=c;else if(g=c.find(d.datepickerInput),0===g.size())g=c.find("input");else if(!g.is("input"))throw new Error('CSS class "'+d.datepickerInput+'" cannot be applied to non input element');if(c.hasClass("input-group")&&(n=0===c.find(".datepickerbutton").size()?c.find(".input-group-addon"):c.find(".datepickerbutton")),!d.inline&&!g.is("input"))throw new Error("Could not initialize DateTimePicker without an input element");return e=x(),f=e.clone(),a.extend(!0,d,G()),l.options(d),oa(),ka(),g.prop("disabled")&&l.disable(),g.is("input")&&0!==g.val().trim().length?_(ga(g.val().trim())):d.defaultDate&&void 0===g.attr("placeholder")&&_(d.defaultDate),d.inline&&ea(),l};a.fn.datetimepicker=function(b){return this.each(function(){var d=a(this);d.data("DateTimePicker")||(b=a.extend(!0,{},a.fn.datetimepicker.defaults,b),d.data("DateTimePicker",c(d,b)))})},a.fn.datetimepicker.defaults={timeZone:"Etc/UTC",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:b.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(7,"d")):this.date(b.clone().add(this.stepping(),"m"))}},down:function(a){if(!a)return void this.show();var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(7,"d")):this.date(b.clone().subtract(this.stepping(),"m"))},"control up":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().subtract(1,"y")):this.date(b.clone().add(1,"h"))}},"control down":function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")?this.date(b.clone().add(1,"y")):this.date(b.clone().subtract(1,"h"))}},left:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"d"))}},right:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"d"))}},pageUp:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"M"))}},pageDown:function(a){if(a){var b=this.date()||this.getMoment();a.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(a){a.find(".timepicker").is(":visible")&&a.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(this.getMoment())},"delete":function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1}});
(function(b){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],b)}else{b(jQuery)}}(function(ac){var S="left",T="right",ad="up",G="down",af="in",E="out",V="none",L="auto",W="swipe",K="pinch",R="tap",Y="doubletap",ag="longtap",F="hold",M="horizontal",J="vertical",Z="all",O=10,ab="start",X="move",aa="end",Q="cancel",ah="ontouchstart" in window,I=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,ae=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,P="TouchSwipe";var U={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};ac.fn.swipe=function(a){var b=ac(this),c=b.data(P);if(c&&typeof a==="string"){if(c[a]){return c[a].apply(this,Array.prototype.slice.call(arguments,1))}else{ac.error("Method "+a+" does not exist on jQuery.swipe")}}else{if(!c&&(typeof a==="object"||!a)){return H.apply(this,arguments)}}return b};ac.fn.swipe.defaults=U;ac.fn.swipe.phases={PHASE_START:ab,PHASE_MOVE:X,PHASE_END:aa,PHASE_CANCEL:Q};ac.fn.swipe.directions={LEFT:S,RIGHT:T,UP:ad,DOWN:G,IN:af,OUT:E};ac.fn.swipe.pageScroll={NONE:V,HORIZONTAL:M,VERTICAL:J,AUTO:L};ac.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:Z};function H(a){if(a&&(a.allowPageScroll===undefined&&(a.swipe!==undefined||a.swipeStatus!==undefined))){a.allowPageScroll=V}if(a.click!==undefined&&a.tap===undefined){a.tap=a.click}if(!a){a={}}a=ac.extend({},ac.fn.swipe.defaults,a);return this.each(function(){var b=ac(this);var c=b.data(P);if(!c){c=new N(this,a);b.data(P,c)}})}function N(bT,D){var v=(ah||ae||!D.fallbackToMouseEvents),t=v?(ae?(I?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",x=v?(ae?(I?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",h=v?(ae?(I?"MSPointerUp":"pointerup"):"touchend"):"mouseup",j=v?null:"mouseleave",bK=(ae?(I?"MSPointerCancel":"pointercancel"):"touchcancel");var bh=0,by=null,bm=0,bW=0,bo=0,y=1,ay=0,bE=0,q=null;var bw=ac(bT);var b="start";var f=0;var bx=null;var i=0,bV=0,bS=0,bk=0,p=0;var br=null,bi=null;try{bw.bind(t,bA);bw.bind(bK,bO)}catch(bd){ac.error("events not supported "+t+","+bK+" on jQuery.swipe")}this.enable=function(){bw.bind(t,bA);bw.bind(bK,bO);return bw};this.disable=function(){bD();return bw};this.destroy=function(){bD();bw.data(P,null);return bw};this.option=function(ai,aj){if(D[ai]!==undefined){if(aj===undefined){return D[ai]}else{D[ai]=aj}}else{ac.error("Option "+ai+" does not exist on jQuery.swipe.options")}return null};function bA(aj){if(bM()){return}if(ac(aj.target).closest(D.excludedElements,bw).length>0){return}var ai=aj.originalEvent?aj.originalEvent:aj;var ak,al=ah?ai.touches[0]:ai;b=ab;if(ah){f=ai.touches.length}else{aj.preventDefault()}bh=0;by=null;bE=null;bm=0;bW=0;bo=0;y=1;ay=0;bx=be();q=bn();k();if(!ah||(f===D.fingers||D.fingers===Z)||bq()){bf(0,al);i=aw();if(f==2){bf(1,ai.touches[1]);bW=bo=av(bx[0].start,bx[1].start)}if(D.swipeStatus||D.pinchStatus){ak=o(ai,b)}}else{ak=false}if(ak===false){b=Q;o(ai,b);return ak}else{if(D.hold){bi=setTimeout(ac.proxy(function(){bw.trigger("hold",[ai.target]);if(D.hold){ak=D.hold.call(bw,ai,ai.target)}},this),D.longTapThreshold)}a0(true)}return null}function bU(al){var ai=al.originalEvent?al.originalEvent:al;if(b===aa||b===Q||bb()){return}var am,an=ah?ai.touches[0]:ai;var ak=bG(an);bV=aw();if(ah){f=ai.touches.length}if(D.hold){clearTimeout(bi)}b=X;if(f==2){if(bW==0){bf(1,ai.touches[1]);bW=bo=av(bx[0].start,bx[1].start)}else{bG(ai.touches[1]);bo=av(bx[0].end,bx[1].end);bE=ax(bx[0].end,bx[1].end)}y=bQ(bW,bo);ay=Math.abs(bW-bo)}if((f===D.fingers||D.fingers===Z)||!ah||bq()){by=bC(ak.start,ak.end);bc(al,by);bh=bv(ak.start,ak.end);bm=bB();bF(by,bh);if(D.swipeStatus||D.pinchStatus){am=o(ai,b)}if(!D.triggerOnTouchEnd||D.triggerOnTouchLeave){var ao=true;if(D.triggerOnTouchLeave){var aj=bp(this);ao=C(ak.end,aj)}if(!D.triggerOnTouchEnd&&ao){b=bL(X)}else{if(D.triggerOnTouchLeave&&!ao){b=bL(aa)}}if(b==Q||b==aa){o(ai,b)}}}else{b=Q;o(ai,b)}if(am===false){b=Q;o(ai,b)}}function r(aj){var ai=aj.originalEvent;if(ah){if(ai.touches.length>0){B();return true}}if(bb()){f=bk}bV=aw();bm=bB();if(n()||!ba()){b=Q;o(ai,b)}else{if(D.triggerOnTouchEnd||(D.triggerOnTouchEnd==false&&b===X)){aj.preventDefault();b=aa;o(ai,b)}else{if(!D.triggerOnTouchEnd&&bR()){b=aa;bI(ai,b,R)}else{if(b===X){b=Q;o(ai,b)}}}}a0(false);return null}function bO(){f=0;bV=0;i=0;bW=0;bo=0;y=1;k();a0(false)}function s(aj){var ai=aj.originalEvent;if(D.triggerOnTouchLeave){b=bL(aa);o(ai,b)}}function bD(){bw.unbind(t,bA);bw.unbind(bK,bO);bw.unbind(x,bU);bw.unbind(h,r);if(j){bw.unbind(j,s)}a0(false)}function bL(ai){var aj=ai;var ak=bN();var al=ba();var am=n();if(!ak||am){aj=Q}else{if(al&&ai==X&&(!D.triggerOnTouchEnd||D.triggerOnTouchLeave)){aj=aa}else{if(!al&&ai==aa&&D.triggerOnTouchLeave){aj=Q}}}return aj}function o(ai,ak){var aj=undefined;if(u()||g()){aj=bI(ai,ak,W)}else{if((m()||bq())&&aj!==false){aj=bI(ai,ak,K)}}if(bH()&&aj!==false){aj=bI(ai,ak,Y)}else{if(az()&&aj!==false){aj=bI(ai,ak,ag)}else{if(bg()&&aj!==false){aj=bI(ai,ak,R)}}}if(ak===Q){bO(ai)}if(ak===aa){if(ah){if(ai.touches.length==0){bO(ai)}}else{bO(ai)}}return aj}function bI(ai,al,aj){var ak=undefined;if(aj==W){bw.trigger("swipeStatus",[al,by||null,bh||0,bm||0,f,bx]);if(D.swipeStatus){ak=D.swipeStatus.call(bw,ai,al,by||null,bh||0,bm||0,f,bx);if(ak===false){return false}}if(al==aa&&bs()){bw.trigger("swipe",[by,bh,bm,f,bx]);if(D.swipe){ak=D.swipe.call(bw,ai,by,bh,bm,f,bx);if(ak===false){return false}}switch(by){case S:bw.trigger("swipeLeft",[by,bh,bm,f,bx]);if(D.swipeLeft){ak=D.swipeLeft.call(bw,ai,by,bh,bm,f,bx)}break;case T:bw.trigger("swipeRight",[by,bh,bm,f,bx]);if(D.swipeRight){ak=D.swipeRight.call(bw,ai,by,bh,bm,f,bx)}break;case ad:bw.trigger("swipeUp",[by,bh,bm,f,bx]);if(D.swipeUp){ak=D.swipeUp.call(bw,ai,by,bh,bm,f,bx)}break;case G:bw.trigger("swipeDown",[by,bh,bm,f,bx]);if(D.swipeDown){ak=D.swipeDown.call(bw,ai,by,bh,bm,f,bx)}break}}}if(aj==K){bw.trigger("pinchStatus",[al,bE||null,ay||0,bm||0,f,y,bx]);if(D.pinchStatus){ak=D.pinchStatus.call(bw,ai,al,bE||null,ay||0,bm||0,f,y,bx);if(ak===false){return false}}if(al==aa&&bP()){switch(bE){case af:bw.trigger("pinchIn",[bE||null,ay||0,bm||0,f,y,bx]);if(D.pinchIn){ak=D.pinchIn.call(bw,ai,bE||null,ay||0,bm||0,f,y,bx)}break;case E:bw.trigger("pinchOut",[bE||null,ay||0,bm||0,f,y,bx]);if(D.pinchOut){ak=D.pinchOut.call(bw,ai,bE||null,ay||0,bm||0,f,y,bx)}break}}}if(aj==R){if(al===Q||al===aa){clearTimeout(br);clearTimeout(bi);if(c()&&!w()){p=aw();br=setTimeout(ac.proxy(function(){p=null;bw.trigger("tap",[ai.target]);if(D.tap){ak=D.tap.call(bw,ai,ai.target)}},this),D.doubleTapThreshold)}else{p=null;bw.trigger("tap",[ai.target]);if(D.tap){ak=D.tap.call(bw,ai,ai.target)}}}}else{if(aj==Y){if(al===Q||al===aa){clearTimeout(br);p=null;bw.trigger("doubletap",[ai.target]);if(D.doubleTap){ak=D.doubleTap.call(bw,ai,ai.target)}}}else{if(aj==ag){if(al===Q||al===aa){clearTimeout(br);p=null;bw.trigger("longtap",[ai.target]);if(D.longTap){ak=D.longTap.call(bw,ai,ai.target)}}}}}return ak}function ba(){var ai=true;if(D.threshold!==null){ai=bh>=D.threshold}return ai}function n(){var ai=false;if(D.cancelThreshold!==null&&by!==null){ai=(bu(by)-bh)>=D.cancelThreshold}return ai}function bj(){if(D.pinchThreshold!==null){return ay>=D.pinchThreshold}return true}function bN(){var ai;if(D.maxTimeThreshold){if(bm>=D.maxTimeThreshold){ai=false}else{ai=true}}else{ai=true}return ai}function bc(ak,aj){if(D.allowPageScroll===V||bq()){ak.preventDefault()}else{var ai=D.allowPageScroll===L;switch(aj){case S:if((D.swipeLeft&&ai)||(!ai&&D.allowPageScroll!=M)){ak.preventDefault()}break;case T:if((D.swipeRight&&ai)||(!ai&&D.allowPageScroll!=M)){ak.preventDefault()}break;case ad:if((D.swipeUp&&ai)||(!ai&&D.allowPageScroll!=J)){ak.preventDefault()}break;case G:if((D.swipeDown&&ai)||(!ai&&D.allowPageScroll!=J)){ak.preventDefault()}break}}}function bP(){var aj=bz();var ak=d();var ai=bj();return aj&&ak&&ai}function bq(){return !!(D.pinchStatus||D.pinchIn||D.pinchOut)}function m(){return !!(bP()&&bq())}function bs(){var ak=bN();var ai=ba();var al=bz();var an=d();var am=n();var aj=!am&&an&&al&&ai&&ak;return aj}function g(){return !!(D.swipe||D.swipeStatus||D.swipeLeft||D.swipeRight||D.swipeUp||D.swipeDown)}function u(){return !!(bs()&&g())}function bz(){return((f===D.fingers||D.fingers===Z)||!ah)}function d(){return bx[0].end.x!==0}function bR(){return !!(D.tap)}function c(){return !!(D.doubleTap)}function bt(){return !!(D.longTap)}function l(){if(p==null){return false}var ai=aw();return(c()&&((ai-p)<=D.doubleTapThreshold))}function w(){return l()}function z(){return((f===1||!ah)&&(isNaN(bh)||bh<D.threshold))}function a(){return((bm>D.longTapThreshold)&&(bh<O))}function bg(){return !!(z()&&bR())}function bH(){return !!(l()&&c())}function az(){return !!(a()&&bt())}function B(){bS=aw();bk=event.touches.length+1}function k(){bS=0;bk=0}function bb(){var aj=false;if(bS){var ai=aw()-bS;if(ai<=D.fingerReleaseThreshold){aj=true}}return aj}function bM(){return !!(bw.data(P+"_intouch")===true)}function a0(ai){if(ai===true){bw.bind(x,bU);bw.bind(h,r);if(j){bw.bind(j,s)}}else{bw.unbind(x,bU,false);bw.unbind(h,r,false);if(j){bw.unbind(j,s,false)}}bw.data(P+"_intouch",ai===true)}function bf(aj,ak){var ai=ak.identifier!==undefined?ak.identifier:0;bx[aj].identifier=ai;bx[aj].start.x=bx[aj].end.x=ak.pageX||ak.clientX;bx[aj].start.y=bx[aj].end.y=ak.pageY||ak.clientY;return bx[aj]}function bG(ak){var ai=ak.identifier!==undefined?ak.identifier:0;var aj=bl(ai);aj.end.x=ak.pageX||ak.clientX;aj.end.y=ak.pageY||ak.clientY;return aj}function bl(ai){for(var aj=0;aj<bx.length;aj++){if(bx[aj].identifier==ai){return bx[aj]}}}function be(){var aj=[];for(var ai=0;ai<=5;ai++){aj.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return aj}function bF(aj,ai){ai=Math.max(ai,bu(aj));q[aj].distance=ai}function bu(ai){if(q[ai]){return q[ai].distance}return undefined}function bn(){var ai={};ai[S]=A(S);ai[T]=A(T);ai[ad]=A(ad);ai[G]=A(G);return ai}function A(ai){return{direction:ai,distance:0}}function bB(){return bV-i}function av(ai,aj){var ak=Math.abs(ai.x-aj.x);var al=Math.abs(ai.y-aj.y);return Math.round(Math.sqrt(ak*ak+al*al))}function bQ(ak,aj){var ai=(aj/ak)*1;return ai.toFixed(2)}function ax(){if(y<1){return E}else{return af}}function bv(ai,aj){return Math.round(Math.sqrt(Math.pow(aj.x-ai.x,2)+Math.pow(aj.y-ai.y,2)))}function bJ(ak,am){var an=ak.x-am.x;var ai=am.y-ak.y;var al=Math.atan2(ai,an);var aj=Math.round(al*180/Math.PI);if(aj<0){aj=360-Math.abs(aj)}return aj}function bC(aj,ak){var ai=bJ(aj,ak);if((ai<=45)&&(ai>=0)){return S}else{if((ai<=360)&&(ai>=315)){return S}else{if((ai>=135)&&(ai<=225)){return T}else{if((ai>45)&&(ai<135)){return G}else{return ad}}}}}function aw(){var ai=new Date();return ai.getTime()}function bp(ak){ak=ac(ak);var ai=ak.offset();var aj={left:ai.left,right:ai.left+ak.outerWidth(),top:ai.top,bottom:ai.top+ak.outerHeight()};return aj}function C(aj,ai){return(aj.x>ai.left&&aj.x<ai.right&&aj.y>ai.top&&aj.y<ai.bottom)}}}));if(typeof(console)==="undefined"){var console={};console.log=console.error=console.info=console.debug=console.warn=console.trace=console.dir=console.dirxml=console.group=console.groupEnd=console.time=console.timeEnd=console.assert=console.profile=console.groupCollapsed=function(){}}if(window.tplogs==true){try{console.groupCollapsed("ThemePunch GreenSocks Logs")}catch(e){}}var oldgs=window.GreenSockGlobals;oldgs_queue=window._gsQueue;var punchgs=window.GreenSockGlobals={};if(window.tplogs==true){try{console.info("Build GreenSock SandBox for ThemePunch Plugins");console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin")}catch(e){}
/*!
 * VERSION: 1.14.2
 * DATE: 2014-10-28
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
}(function(aA,aP){var aL=aA.GreenSockGlobals=aA.GreenSockGlobals||aA;if(!aL.TweenLite){var aB,aC,aG,aT,aF,aI=function(a){var d,b=a.split("."),c=aL;for(d=0;b.length>d;d++){c[b[d]]=c=c[b[d]]||{}}return c},aM=aI("com.greensock"),aU=1e-10,az=function(b){var d,a=[],c=b.length;for(d=0;d!==c;a.push(b[d++])){}return a},aH=function(){},aO=function(){var a=Object.prototype.toString,b=a.call([]);return function(c){return null!=c&&(c instanceof Array||"object"==typeof c&&!!c.push&&a.call(c)===b)}}(),aR={},aE=function(c,d,g,b){this.sc=aR[c]?aR[c].sc:[],aR[c]=this,this.gsClass=null,this.func=g;var f=[];this.check=function(l){for(var k,j,a,n,o=d.length,i=o;--o>-1;){(k=aR[d[o]]||new aE(d[o],[])).gsClass?(f[o]=k.gsClass,i--):l&&k.sc.push(this)}if(0===i&&g){for(j=("com.greensock."+c).split("."),a=j.pop(),n=aI(j.join("."))[a]=this.gsClass=g.apply(g,f),b&&(aL[a]=n,"function"==typeof define&&define.amd?define((aA.GreenSockAMDPath?aA.GreenSockAMDPath+"/":"")+c.split(".").pop(),[],function(){return n}):c===aP&&"undefined"!=typeof module&&module.exports&&(module.exports=n)),o=0;this.sc.length>o;o++){this.sc[o].check()}}},this.check(!0)},aQ=aA._gsDefine=function(b,d,a,c){return new aE(b,d,a,c)},ay=aM._class=function(b,c,a){return c=c||function(){},aQ(b,[],function(){return c},a),c};aQ.globals=aL;var aN=[0,0,1,1],Y=[],av=ay("easing.Ease",function(b,d,a,c){this._func=b,this._type=a||0,this._power=c||0,this._params=d?aN.concat(d):aN},!0),ax=av.map={},ac=av.register=function(p,h,g,q){for(var b,d,j,c,f=h.split(","),k=f.length,m=(g||"easeIn,easeOut,easeInOut").split(",");--k>-1;){for(d=f[k],b=q?ay("easing."+d,null,!0):aM.easing[d]||{},j=m.length;--j>-1;){c=m[j],ax[d+"."+c]=ax[c+d]=b[c]=p.getRatio?p:p[c]||new p}}};for(aG=av.prototype,aG._calcEnd=!1,aG.getRatio=function(b){if(this._func){return this._params[0]=b,this._func.apply(null,this._params)}var d=this._type,a=this._power,c=1===d?1-b:2===d?b:0.5>b?2*b:2*(1-b);return 1===a?c*=c:2===a?c*=c*c:3===a?c*=c*c*c:4===a&&(c*=c*c*c*c),1===d?1-c:2===d?c:0.5>b?c/2:1-c/2},aB=["Linear","Quad","Cubic","Quart","Quint,Strong"],aC=aB.length;--aC>-1;){aG=aB[aC]+",Power"+aC,ac(new av(null,null,1,aC),aG,"easeOut",!0),ac(new av(null,null,2,aC),aG,"easeIn"+(0===aC?",easeNone":"")),ac(new av(null,null,3,aC),aG,"easeInOut")}ax.linear=aM.easing.Linear.easeIn,ax.swing=aM.easing.Quad.easeInOut;var aS=ay("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});aG=aS.prototype,aG.addEventListener=function(k,g,d,m,a){a=a||0;var b,c,f=this._listeners[k],j=0;for(null==f&&(this._listeners[k]=f=[]),c=f.length;--c>-1;){b=f[c],b.c===g&&b.s===d?f.splice(c,1):0===j&&a>b.pr&&(j=c+1)}f.splice(j,0,{c:g,s:d,up:m,pr:a}),this!==aT||aF||aT.wake()},aG.removeEventListener=function(b,d){var a,c=this._listeners[b];if(c){for(a=c.length;--a>-1;){if(c[a].c===d){return c.splice(a,1),void 0}}}},aG.dispatchEvent=function(b){var f,a,c,d=this._listeners[b];if(d){for(f=d.length,a=this._eventTarget;--f>-1;){c=d[f],c&&(c.up?c.c.call(c.s||a,{type:b,target:a}):c.c.call(c.s||a))}}};var aJ=aA.requestAnimationFrame,ar=aA.cancelAnimationFrame,Z=Date.now||function(){return(new Date).getTime()},aw=Z();for(aB=["ms","moz","webkit","o"],aC=aB.length;--aC>-1&&!aJ;){aJ=aA[aB[aC]+"RequestAnimationFrame"],ar=aA[aB[aC]+"CancelAnimationFrame"]||aA[aB[aC]+"CancelRequestAnimationFrame"]}ay("Ticker",function(y,q){var k,z,a,g,j,m=this,x=Z(),o=q!==!1&&aJ,w=500,b=33,v=function(d){var f,c,h=Z()-aw;h>w&&(x+=h-b),aw+=h,m.time=(aw-x)/1000,f=m.time-j,(!k||f>0||d===!0)&&(m.frame++,j+=f+(f>=g?0.004:g-f),c=!0),d!==!0&&(a=z(v)),c&&m.dispatchEvent("tick")};aS.call(m),m.time=m.frame=0,m.tick=function(){v(!0)},m.lagSmoothing=function(c,d){w=c||1/aU,b=Math.min(d,w,0)},m.sleep=function(){null!=a&&(o&&ar?ar(a):clearTimeout(a),z=aH,a=null,m===aT&&(aF=!1))},m.wake=function(){null!==a?m.sleep():m.frame>10&&(aw=Z()-w+5),z=0===k?aH:o&&aJ?aJ:function(c){return setTimeout(c,0|1000*(j-m.time)+1)},m===aT&&(aF=!0),v(2)},m.fps=function(c){return arguments.length?(k=c,g=1/(k||60),j=this.time+g,m.wake(),void 0):k},m.useRAF=function(c){return arguments.length?(m.sleep(),o=c,m.fps(k),void 0):o},m.fps(y),setTimeout(function(){o&&(!a||5>m.frame)&&m.useRAF(!1)},1500)}),aG=aM.Ticker.prototype=new aM.events.EventDispatcher,aG.constructor=aM.Ticker;var aa=ay("core.Animation",function(b,c){if(this.vars=c=c||{},this._duration=this._totalDuration=b||0,this._delay=Number(c.delay)||0,this._timeScale=1,this._active=c.immediateRender===!0,this.data=c.data,this._reversed=c.reversed===!0,aq){aF||aT.wake();var a=this.vars.useFrames?aD:aq;a.add(this,a._time),this.vars.paused&&this.paused(!0)}});aT=aa.ticker=new aM.Ticker,aG=aa.prototype,aG._dirty=aG._gc=aG._initted=aG._paused=!1,aG._totalTime=aG._time=0,aG._rawPrevTime=-1,aG._next=aG._last=aG._onUpdate=aG._timeline=aG.timeline=null,aG._paused=!1;var ap=function(){aF&&Z()-aw>2000&&aT.wake(),setTimeout(ap,2000)};ap(),aG.play=function(a,b){return null!=a&&this.seek(a,b),this.reversed(!1).paused(!1)},aG.pause=function(a,b){return null!=a&&this.seek(a,b),this.paused(!0)},aG.resume=function(a,b){return null!=a&&this.seek(a,b),this.paused(!1)},aG.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},aG.restart=function(a,b){return this.reversed(!1).paused(!1).totalTime(a?-this._delay:0,b!==!1,!0)},aG.reverse=function(a,b){return null!=a&&this.seek(a||this.totalDuration(),b),this.reversed(!0).paused(!1)},aG.render=function(){},aG.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},aG.isActive=function(){var b,c=this._timeline,a=this._startTime;return !c||!this._gc&&!this._paused&&c.isActive()&&(b=c.rawTime())>=a&&a+this.totalDuration()/this._timeScale>b},aG._enabled=function(a,b){return aF||aT.wake(),this._gc=!a,this._active=this.isActive(),b!==!0&&(a&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!a&&this.timeline&&this._timeline._remove(this,!0)),!1},aG._kill=function(){return this._enabled(!1,!1)},aG.kill=function(a,b){return this._kill(a,b),this},aG._uncache=function(a){for(var b=a?this:this.timeline;b;){b._dirty=!0,b=b.timeline}return this},aG._swapSelfInParams=function(b){for(var c=b.length,a=b.concat();--c>-1;){"{self}"===b[c]&&(a[c]=this)}return a},aG.eventCallback=function(b,f,a,c){if("on"===(b||"").substr(0,2)){var d=this.vars;if(1===arguments.length){return d[b]}null==f?delete d[b]:(d[b]=f,d[b+"Params"]=aO(a)&&-1!==a.join("").indexOf("{self}")?this._swapSelfInParams(a):a,d[b+"Scope"]=c),"onUpdate"===b&&(this._onUpdate=f)}return this},aG.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},aG.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},aG.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},aG.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(a>this._duration?this._duration:a,b)):this._time},aG.totalTime=function(b,f,a){if(aF||aT.wake(),!arguments.length){return this._totalTime}if(this._timeline){if(0>b&&!a&&(b+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var c=this._totalDuration,d=this._timeline;if(b>c&&!a&&(b=c),this._startTime=(this._paused?this._pauseTime:d._time)-(this._reversed?c-b:b)/this._timeScale,d._dirty||this._uncache(!1),d._timeline){for(;d._timeline;){d._timeline._time!==(d._startTime+d._totalTime)/d._timeScale&&d.totalTime(d._totalTime,!0),d=d._timeline}}}this._gc&&this._enabled(!0,!1),(this._totalTime!==b||0===this._duration)&&(this.render(b,f,!1),au.length&&af())}return this},aG.progress=aG.totalProgress=function(a,b){return arguments.length?this.totalTime(this.duration()*a,b):this._time/this.duration()},aG.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},aG.endTime=function(a){return this._startTime+(0!=a?this.totalDuration():this.duration())/this._timeScale},aG.timeScale=function(b){if(!arguments.length){return this._timeScale}if(b=b||aU,this._timeline&&this._timeline.smoothChildTiming){var c=this._pauseTime,a=c||0===c?c:this._timeline.totalTime();this._startTime=a-(a-this._startTime)*this._timeScale/b}return this._timeScale=b,this._uncache(!1)},aG.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},aG.paused=function(b){if(!arguments.length){return this._paused}if(b!=this._paused&&this._timeline){aF||b||aT.wake();var d=this._timeline,a=d.rawTime(),c=a-this._pauseTime;!b&&d.smoothChildTiming&&(this._startTime+=c,this._uncache(!1)),this._pauseTime=b?a:null,this._paused=b,this._active=this.isActive(),!b&&0!==c&&this._initted&&this.duration()&&this.render(d.smoothChildTiming?this._totalTime:(a-this._startTime)/this._timeScale,!0,!0)}return this._gc&&!b&&this._enabled(!0,!1),this};var ao=ay("core.SimpleTimeline",function(a){aa.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});aG=ao.prototype=new aa,aG.constructor=ao,aG.kill()._gc=!1,aG._first=aG._last=aG._recent=null,aG._sortChildren=!1,aG.add=aG.insert=function(b,d){var a,c;if(b._startTime=Number(d||0)+b._delay,b._paused&&this!==b._timeline&&(b._pauseTime=b._startTime+(this.rawTime()-b._startTime)/b._timeScale),b.timeline&&b.timeline._remove(b,!0),b.timeline=b._timeline=this,b._gc&&b._enabled(!0,!0),a=this._last,this._sortChildren){for(c=b._startTime;a&&a._startTime>c;){a=a._prev}}return a?(b._next=a._next,a._next=b):(b._next=this._first,this._first=b),b._next?b._next._prev=b:this._last=b,b._prev=a,this._recent=b,this._timeline&&this._uncache(!0),this},aG._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),a._next=a._prev=a.timeline=null,a===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},aG.render=function(b,f,a){var c,d=this._first;for(this._totalTime=this._time=this._rawPrevTime=b;d;){c=d._next,(d._active||b>=d._startTime&&!d._paused)&&(d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(b-d._startTime)*d._timeScale,f,a):d.render((b-d._startTime)*d._timeScale,f,a)),d=c}},aG.rawTime=function(){return aF||aT.wake(),this._totalTime};var aj=ay("TweenLite",function(h,d,f){if(aa.call(this,d,f),this.render=aj.prototype.render,null==h){throw"Cannot tween a null target."}this.target=h="string"!=typeof h?h:aj.selector(h)||h;var g,k,c,j=h.jquery||h.length&&h!==aA&&h[0]&&(h[0]===aA||h[0].nodeType&&h[0].style&&!h.nodeType),b=this.vars.overwrite;if(this._overwrite=b=null==b?ab[aj.defaultOverwrite]:"number"==typeof b?b>>0:ab[b],(j||h instanceof Array||h.push&&aO(h))&&"number"!=typeof h[0]){for(this._targets=c=az(h),this._propLookup=[],this._siblings=[],g=0;c.length>g;g++){k=c[g],k?"string"!=typeof k?k.length&&k!==aA&&k[0]&&(k[0]===aA||k[0].nodeType&&k[0].style&&!k.nodeType)?(c.splice(g--,1),this._targets=c=c.concat(az(k))):(this._siblings[g]=at(k,this,!1),1===b&&this._siblings[g].length>1&&ak(k,this,null,1,this._siblings[g])):(k=c[g--]=aj.selector(k),"string"==typeof k&&c.splice(g+1,1)):c.splice(g--,1)}}else{this._propLookup={},this._siblings=at(h,this,!1),1===b&&this._siblings.length>1&&ak(h,this,null,1,this._siblings)}(this.vars.immediateRender||0===d&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-aU,this.render(-this._delay))},!0),an=function(a){return a&&a.length&&a!==aA&&a[0]&&(a[0]===aA||a[0].nodeType&&a[0].style&&!a.nodeType)},ad=function(b,d){var a,c={};for(a in b){al[a]||a in d&&"transform"!==a&&"x"!==a&&"y"!==a&&"width"!==a&&"height"!==a&&"className"!==a&&"border"!==a||!(!X[a]||X[a]&&X[a]._autoCSS)||(c[a]=b[a],delete b[a])}b.css=c};aG=aj.prototype=new aa,aG.constructor=aj,aG.kill()._gc=!1,aG.ratio=0,aG._firstPT=aG._targets=aG._overwrittenProps=aG._startAt=null,aG._notifyPluginsOfEnabled=aG._lazy=!1,aj.version="1.14.2",aj.defaultEase=aG._ease=new av(null,null,1,1),aj.defaultOverwrite="auto",aj.ticker=aT,aj.autoSleep=!0,aj.lagSmoothing=function(a,b){aT.lagSmoothing(a,b)},aj.selector=aA.$||aA.jQuery||function(b){var a=aA.$||aA.jQuery;return a?(aj.selector=a,a(b)):"undefined"==typeof document?b:document.querySelectorAll?document.querySelectorAll(b):document.getElementById("#"===b.charAt(0)?b.substr(1):b)};var au=[],ag={},ae=aj._internals={isArray:aO,isSelector:an,lazyTweens:au},X=aj._plugins={},am=ae.tweenLookup={},aK=0,al=ae.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},ab={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},aD=aa._rootFramesTimeline=new ao,aq=aa._rootTimeline=new ao,af=ae.lazyRender=function(){var a,b=au.length;for(ag={};--b>-1;){a=au[b],a&&a._lazy!==!1&&(a.render(a._lazy[0],a._lazy[1],!0),a._lazy=!1)}au.length=0};aq._startTime=aT.time,aD._startTime=aT.frame,aq._active=aD._active=!0,setTimeout(af,1),aa._updateRoot=aj.render=function(){var b,c,a;if(au.length&&af(),aq.render((aT.time-aq._startTime)*aq._timeScale,!1,!1),aD.render((aT.frame-aD._startTime)*aD._timeScale,!1,!1),au.length&&af(),!(aT.frame%120)){for(a in am){for(c=am[a].tweens,b=c.length;--b>-1;){c[b]._gc&&c.splice(b,1)}0===c.length&&delete am[a]}if(a=aq._first,(!a||a._paused)&&aj.autoSleep&&!aD._first&&1===aT._listeners.tick.length){for(;a&&a._paused;){a=a._next}a||aT.sleep()}}},aT.addEventListener("tick",aa._updateRoot);var at=function(b,f,a){var c,d,g=b._gsTweenID;if(am[g||(b._gsTweenID=g="t"+aK++)]||(am[g]={target:b,tweens:[]}),f&&(c=am[g].tweens,c[d=c.length]=f,a)){for(;--d>-1;){c[d]===f&&c.splice(d,1)}}return am[g].tweens},ah=function(d,h,c,f){var g,j,b=d.vars.onOverwrite;return b&&(g=b(d,h,c,f)),b=aj.onOverwrite,b&&(j=b(d,h,c,f)),g!==!1&&j!==!1},ak=function(A,w,p,B,b){var g,y,d,k;if(1===B||B>=4){for(k=b.length,g=0;k>g;g++){if((d=b[g])!==w){d._gc||ah(d,w)&&d._enabled(!1,!1)&&(y=!0)}else{if(5===B){break}}}return y}var q,z=w._startTime+aU,j=[],v=0,x=0===w._duration;for(g=b.length;--g>-1;){(d=b[g])===w||d._gc||d._paused||(d._timeline!==w._timeline?(q=q||ai(w,0,x),0===ai(d,q,x)&&(j[v++]=d)):z>=d._startTime&&d._startTime+d.totalDuration()/d._timeScale>z&&((x||!d._initted)&&2e-10>=z-d._startTime||(j[v++]=d)))}for(g=v;--g>-1;){if(d=j[g],2===B&&d._kill(p,A,w)&&(y=!0),2!==B||!d._firstPT&&d._initted){if(2!==B&&!ah(d,w)){continue}d._enabled(!1,!1)&&(y=!0)}}return y},ai=function(b,f,a){for(var c=b._timeline,d=c._timeScale,g=b._startTime;c._timeline;){if(g+=c._startTime,d*=c._timeScale,c._paused){return -100}c=c._timeline}return g/=d,g>f?g-f:a&&g===f||!b._initted&&2*aU>g-f?aU:(g+=b.totalDuration()/b._timeScale/d)>f+aU?0:g-f-aU};aG._init=function(){var p,k,g,q,b,d=this.vars,m=this._overwrittenProps,c=this._duration,f=!!d.immediateRender,j=d.ease;if(d.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),b={};for(q in d.startAt){b[q]=d.startAt[q]}if(b.overwrite=!1,b.immediateRender=!0,b.lazy=f&&d.lazy!==!1,b.startAt=b.delay=null,this._startAt=aj.to(this.target,0,b),f){if(this._time>0){this._startAt=null}else{if(0!==c){return}}}}else{if(d.runBackwards&&0!==c){if(this._startAt){this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null}else{0!==this._time&&(f=!1),g={};for(q in d){al[q]&&"autoCSS"!==q||(g[q]=d[q])}if(g.overwrite=0,g.data="isFromStart",g.lazy=f&&d.lazy!==!1,g.immediateRender=f,this._startAt=aj.to(this.target,0,g),f){if(0===this._time){return}}else{this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}}}}if(this._ease=j=j?j instanceof av?j:"function"==typeof j?new av(j,d.easeParams):ax[j]||aj.defaultEase:aj.defaultEase,d.easeParams instanceof Array&&j.config&&(this._ease=j.config.apply(j,d.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets){for(p=this._targets.length;--p>-1;){this._initProps(this._targets[p],this._propLookup[p]={},this._siblings[p],m?m[p]:null)&&(k=!0)}}else{k=this._initProps(this.target,this._propLookup,this._siblings,m)}if(k&&aj._onPluginEvent("_onInitAllProps",this),m&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),d.runBackwards){for(g=this._firstPT;g;){g.s+=g.c,g.c=-g.c,g=g._next}}this._onUpdate=d.onUpdate,this._initted=!0},aG._initProps=function(k,g,q,b){var d,m,c,f,j,p;if(null==k){return !1}ag[k._gsTweenID]&&af(),this.vars.css||k.style&&k!==aA&&k.nodeType&&X.css&&this.vars.autoCSS!==!1&&ad(this.vars,k);for(d in this.vars){if(p=this.vars[d],al[d]){p&&(p instanceof Array||p.push&&aO(p))&&-1!==p.join("").indexOf("{self}")&&(this.vars[d]=p=this._swapSelfInParams(p,this))}else{if(X[d]&&(f=new X[d])._onInitTween(k,this.vars[d],this)){for(this._firstPT=j={_next:this._firstPT,t:f,p:"setRatio",s:0,c:1,f:!0,n:d,pg:!0,pr:f._priority},m=f._overwriteProps.length;--m>-1;){g[f._overwriteProps[m]]=this._firstPT}(f._priority||f._onInitAllProps)&&(c=!0),(f._onDisable||f._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else{this._firstPT=g[d]=j={_next:this._firstPT,t:k,p:d,f:"function"==typeof k[d],n:d,pg:!1,pr:0},j.s=j.f?k[d.indexOf("set")||"function"!=typeof k["get"+d.substr(3)]?d:"get"+d.substr(3)]():parseFloat(k[d]),j.c="string"==typeof p&&"="===p.charAt(1)?parseInt(p.charAt(0)+"1",10)*Number(p.substr(2)):Number(p)-j.s||0}}j&&j._next&&(j._next._prev=j)}return b&&this._kill(b,k)?this._initProps(k,g,q,b):this._overwrite>1&&this._firstPT&&q.length>1&&ak(k,this,g,this._overwrite,q)?(this._kill(g,k),this._initProps(k,g,q,b)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(ag[k._gsTweenID]=!0),c)},aG.render=function(y,v,k){var z,b,d,w,c=this._time,j=this._duration,p=this._rawPrevTime;if(y>=j){this._totalTime=this._time=j,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(z=!0,b="onComplete"),0===j&&(this._initted||!this.vars.lazy||k)&&(this._startTime===this._timeline._duration&&(y=0),(0===y||0>p||p===aU)&&p!==y&&(k=!0,p>aU&&(b="onReverseComplete")),this._rawPrevTime=w=!v||y||p===y?y:aU)}else{if(1e-7>y){this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==c||0===j&&p>0&&p!==aU)&&(b="onReverseComplete",z=this._reversed),0>y&&(this._active=!1,0===j&&(this._initted||!this.vars.lazy||k)&&(p>=0&&(k=!0),this._rawPrevTime=w=!v||y||p===y?y:aU)),this._initted||(k=!0)}else{if(this._totalTime=this._time=y,this._easeType){var x=y/j,g=this._easeType,q=this._easePower;(1===g||3===g&&x>=0.5)&&(x=1-x),3===g&&(x*=2),1===q?x*=x:2===q?x*=x*x:3===q?x*=x*x*x:4===q&&(x*=x*x*x*x),this.ratio=1===g?1-x:2===g?x:0.5>y/j?x/2:1-x/2}else{this.ratio=this._ease.getRatio(y/j)}}}if(this._time!==c||k){if(!this._initted){if(this._init(),!this._initted||this._gc){return}if(!k&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)){return this._time=this._totalTime=c,this._rawPrevTime=p,au.push(this),this._lazy=[y,v],void 0}this._time&&!z?this.ratio=this._ease.getRatio(this._time/j):z&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==c&&y>=0&&(this._active=!0),0===c&&(this._startAt&&(y>=0?this._startAt.render(y,v,k):b||(b="_dummyGS")),this.vars.onStart&&(0!==this._time||0===j)&&(v||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||Y))),d=this._firstPT;d;){d.f?d.t[d.p](d.c*this.ratio+d.s):d.t[d.p]=d.c*this.ratio+d.s,d=d._next}this._onUpdate&&(0>y&&this._startAt&&y!==-0.0001&&this._startAt.render(y,v,k),v||(this._time!==c||z)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||Y)),b&&(!this._gc||k)&&(0>y&&this._startAt&&!this._onUpdate&&y!==-0.0001&&this._startAt.render(y,v,k),z&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!v&&this.vars[b]&&this.vars[b].apply(this.vars[b+"Scope"]||this,this.vars[b+"Params"]||Y),0===j&&this._rawPrevTime===aU&&w!==aU&&(this._rawPrevTime=0))}},aG._kill=function(v,k,g){if("all"===v&&(v=null),null==v&&(null==k||k===this.target)){return this._lazy=!1,this._enabled(!1,!1)}k="string"!=typeof k?k||this._targets||this.target:aj.selector(k)||k;var w,b,d,m,c,f,j,p,q;if((aO(k)||an(k))&&"number"!=typeof k[0]){for(w=k.length;--w>-1;){this._kill(v,k[w])&&(f=!0)}}else{if(this._targets){for(w=this._targets.length;--w>-1;){if(k===this._targets[w]){c=this._propLookup[w]||{},this._overwrittenProps=this._overwrittenProps||[],b=this._overwrittenProps[w]=v?this._overwrittenProps[w]||{}:"all";break}}}else{if(k!==this.target){return !1}c=this._propLookup,b=this._overwrittenProps=v?this._overwrittenProps||{}:"all"}if(c){if(j=v||c,p=v!==b&&"all"!==b&&v!==c&&("object"!=typeof v||!v._tempKill),g&&(aj.onOverwrite||this.vars.onOverwrite)){for(d in j){c[d]&&(q||(q=[]),q.push(d))}if(!ah(this,g,k,q)){return !1}}for(d in j){(m=c[d])&&(m.pg&&m.t._kill(j)&&(f=!0),m.pg&&0!==m.t._overwriteProps.length||(m._prev?m._prev._next=m._next:m===this._firstPT&&(this._firstPT=m._next),m._next&&(m._next._prev=m._prev),m._next=m._prev=null),delete c[d]),p&&(b[d]=1)}!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return f},aG.invalidate=function(){return this._notifyPluginsOfEnabled&&aj._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],aa.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-aU,this.render(-this._delay)),this},aG._enabled=function(b,d){if(aF||aT.wake(),b&&this._gc){var a,c=this._targets;if(c){for(a=c.length;--a>-1;){this._siblings[a]=at(c[a],this,!0)}}else{this._siblings=at(this.target,this,!0)}}return aa.prototype._enabled.call(this,b,d),this._notifyPluginsOfEnabled&&this._firstPT?aj._onPluginEvent(b?"_onEnable":"_onDisable",this):!1},aj.to=function(b,c,a){return new aj(b,c,a)},aj.from=function(b,c,a){return a.runBackwards=!0,a.immediateRender=0!=a.immediateRender,new aj(b,c,a)},aj.fromTo=function(b,d,a,c){return c.startAt=a,c.immediateRender=0!=c.immediateRender&&0!=a.immediateRender,new aj(b,d,c)},aj.delayedCall=function(b,f,a,c,d){return new aj(f,0,{delay:b,onComplete:f,onCompleteParams:a,onCompleteScope:c,onReverseComplete:f,onReverseCompleteParams:a,onReverseCompleteScope:c,immediateRender:!1,useFrames:d,overwrite:0})},aj.set=function(a,b){return new aj(a,0,b)},aj.getTweensOf=function(b,f){if(null==b){return[]}b="string"!=typeof b?b:aj.selector(b)||b;var a,c,d,g;if((aO(b)||an(b))&&"number"!=typeof b[0]){for(a=b.length,c=[];--a>-1;){c=c.concat(aj.getTweensOf(b[a],f))}for(a=c.length;--a>-1;){for(g=c[a],d=a;--d>-1;){g===c[d]&&c.splice(a,1)}}}else{for(c=at(b).concat(),a=c.length;--a>-1;){(c[a]._gc||f&&!c[a].isActive())&&c.splice(a,1)}}return c},aj.killTweensOf=aj.killDelayedCallsTo=function(b,f,a){"object"==typeof f&&(a=f,f=!1);for(var c=aj.getTweensOf(b,f),d=c.length;--d>-1;){c[d]._kill(a,b)}};var W=ay("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0,this._super=W.prototype},!0);if(aG=W.prototype,W.version="1.10.1",W.API=2,aG._firstPT=null,aG._addTween=function(d,h,c,f,g,k){var b,j;return null!=f&&(b="number"==typeof f||"="!==f.charAt(1)?Number(f)-c:parseInt(f.charAt(0)+"1",10)*Number(f.substr(2)))?(this._firstPT=j={_next:this._firstPT,t:d,p:h,s:c,c:b,f:"function"==typeof d[h],n:g||h,r:k},j._next&&(j._next._prev=j),j):void 0},aG.setRatio=function(b){for(var d,a=this._firstPT,c=0.000001;a;){d=a.c*b+a.s,a.r?d=Math.round(d):c>d&&d>-c&&(d=0),a.f?a.t[a.p](d):a.t[a.p]=d,a=a._next}},aG._kill=function(b){var d,a=this._overwriteProps,c=this._firstPT;if(null!=b[this._propName]){this._overwriteProps=[]}else{for(d=a.length;--d>-1;){null!=b[a[d]]&&a.splice(d,1)}}for(;c;){null!=b[c.n]&&(c._next&&(c._next._prev=c._prev),c._prev?(c._prev._next=c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),c=c._next}return !1},aG._roundProps=function(b,c){for(var a=this._firstPT;a;){(b[this._propName]||null!=a.n&&b[a.n.split(this._propName+"_").join("")])&&(a.r=c),a=a._next}},aj._onPluginEvent=function(d,h){var c,f,g,k,b,j=h._firstPT;if("_onInitAllProps"===d){for(;j;){for(b=j._next,f=g;f&&f.pr>j.pr;){f=f._next}(j._prev=f?f._prev:k)?j._prev._next=j:g=j,(j._next=f)?f._prev=j:k=j,j=b}j=h._firstPT=g}for(;j;){j.pg&&"function"==typeof j.t[d]&&j.t[d]()&&(c=!0),j=j._next}return c},W.activate=function(a){for(var b=a.length;--b>-1;){a[b].API===W.API&&(X[(new a[b])._propName]=a[b])}return !0},aQ.plugin=function(d){if(!(d&&d.propName&&d.init&&d.API)){throw"illegal plugin definition."}var h,c=d.propName,f=d.priority||0,g=d.overwriteProps,k={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},b=ay("plugins."+c.charAt(0).toUpperCase()+c.substr(1)+"Plugin",function(){W.call(this,c,f),this._overwriteProps=g||[]},d.global===!0),j=b.prototype=new W(c);j.constructor=b,b.API=d.API;for(h in k){"function"==typeof d[h]&&(j[k[h]]=d[h])}return b.version=d.version,W.activate([b]),b},aB=aA._gsQueue){for(aC=0;aB.length>aC;aC++){aB[aC]()}for(aG in aR){aR[aG].func||aA.console.log("GSAP encountered missing dependency: com.greensock."+aG)}}aF=!1}})("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");
/*!
 * VERSION: 1.14.2
 * DATE: 2014-10-18
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(D,y,v){var E=function(c){y.call(this,c),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var a,f,h=this.vars;for(f in h){a=h[f],g(a)&&-1!==a.join("").indexOf("{self}")&&(h[f]=this._swapSelfInParams(a))}g(h.tweens)&&this.add(h.tweens,0,h.align,h.stagger)},b=1e-10,j=v._internals,A=j.isSelector,g=j.isArray,w=j.lazyTweens,q=j.lazyRender,B=[],C=_gsScope._gsDefine.globals,z=function(c){var f,a={};for(f in c){a[f]=c[f]}return a},d=function(c,l,a,f){var h=c._timeline._totalTime;(l||!this._forcingPlayhead)&&(c._timeline.pause(c._startTime),l&&l.apply(f||c._timeline,a||B),this._forcingPlayhead&&c._timeline.seek(h))},x=function(c){var h,a=[],f=c.length;for(h=0;h!==f;a.push(c[h++])){}return a},k=E.prototype=new y;return E.version="1.14.2",k.constructor=E,k.kill()._gc=k._forcingPlayhead=!1,k.to=function(a,h,c,f){var i=c.repeat&&C.TweenMax||v;return h?this.add(new i(a,h,c),f):this.set(a,c,f)},k.from=function(a,h,c,f){return this.add((c.repeat&&C.TweenMax||v).from(a,h,c),f)},k.fromTo=function(f,l,h,i,m){var c=i.repeat&&C.TweenMax||v;return l?this.add(c.fromTo(f,l,h,i),m):this.set(f,i,m)},k.staggerTo=function(I,F,a,i,f,s,m,G){var H,c=new E({onComplete:s,onCompleteParams:m,onCompleteScope:G,smoothChildTiming:this.smoothChildTiming});for("string"==typeof I&&(I=v.selector(I)||I),I=I||[],A(I)&&(I=x(I)),i=i||0,0>i&&(I=x(I),I.reverse(),i*=-1),H=0;I.length>H;H++){a.startAt&&(a.startAt=z(a.startAt)),c.to(I[H],F,z(a),H*i)}return this.add(c,f)},k.staggerFrom=function(h,p,f,l,m,F,c,u){return f.immediateRender=0!=f.immediateRender,f.runBackwards=!0,this.staggerTo(h,p,f,l,m,F,c,u)},k.staggerFromTo=function(G,u,m,H,c,l,F,f,p){return H.startAt=m,H.immediateRender=0!=H.immediateRender&&0!=m.immediateRender,this.staggerTo(G,u,H,c,l,F,f,p)},k.call=function(a,h,c,f){return this.add(v.delayedCall(0,a,h,c),f)},k.set=function(a,f,c){return c=this._parseTimeOrLabel(c,0,!0),null==f.immediateRender&&(f.immediateRender=c===this._time&&!this._paused),this.add(new v(a,0,f),c)},E.exportRoot=function(f,i){f=f||{},null==f.smoothChildTiming&&(f.smoothChildTiming=!0);var h,m,c=new E(f),l=c._timeline;for(null==i&&(i=!0),l._remove(c,!0),c._startTime=0,c._rawPrevTime=c._time=c._totalTime=l._time,h=l._first;h;){m=h._next,i&&h instanceof v&&h.target===h.vars.onComplete||c.add(h,h._startTime-h._delay),h=m}return l.add(c,0),c},k.add=function(i,o,H,t){var s,I,J,G,m,F;if("number"!=typeof o&&(o=this._parseTimeOrLabel(o,0,!0,i)),!(i instanceof D)){if(i instanceof Array||i&&i.push&&g(i)){for(H=H||"normal",t=t||0,s=o,I=i.length,J=0;I>J;J++){g(G=i[J])&&(G=new E({tweens:G})),this.add(G,s),"string"!=typeof G&&"function"!=typeof G&&("sequence"===H?s=G._startTime+G.totalDuration()/G._timeScale:"start"===H&&(G._startTime-=G.delay())),s+=t}return this._uncache(!0)}if("string"==typeof i){return this.addLabel(i,o)}if("function"!=typeof i){throw"Cannot add "+i+" into the timeline; it is not a tween, timeline, function, or string."}i=v.delayedCall(0,i)}if(y.prototype.add.call(this,i,o),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration()){for(m=this,F=m.rawTime()>i._startTime;m._timeline;){F&&m._timeline.smoothChildTiming?m.totalTime(m._totalTime,!0):m._gc&&m._enabled(!0,!1),m=m._timeline}}return this},k.remove=function(c){if(c instanceof D){return this._remove(c,!1)}if(c instanceof Array||c&&c.push&&g(c)){for(var a=c.length;--a>-1;){this.remove(c[a])}return this}return"string"==typeof c?this.removeLabel(c):this.kill(null,c)},k._remove=function(c,a){y.prototype._remove.call(this,c,a);var f=this._last;return f?this._time>f._startTime+f._totalDuration/f._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},k.append=function(a,c){return this.add(a,this._parseTimeOrLabel(null,c,!0,a))},k.insert=k.insertMultiple=function(c,h,a,f){return this.add(c,h||0,a,f)},k.appendMultiple=function(c,h,a,f){return this.add(c,this._parseTimeOrLabel(null,h,!0,c),a,f)},k.addLabel=function(a,c){return this._labels[a]=this._parseTimeOrLabel(c),this},k.addPause=function(c,h,a,f){return this.call(d,["{self}",h,a,f],this,c)},k.removeLabel=function(a){return delete this._labels[a],this},k.getLabelTime=function(a){return null!=this._labels[a]?this._labels[a]:-1},k._parseTimeOrLabel=function(h,a,c,f){var l;if(f instanceof D&&f.timeline===this){this.remove(f)}else{if(f&&(f instanceof Array||f.push&&g(f))){for(l=f.length;--l>-1;){f[l] instanceof D&&f[l].timeline===this&&this.remove(f[l])}}}if("string"==typeof a){return this._parseTimeOrLabel(a,c&&"number"==typeof h&&null==this._labels[a]?h-this.duration():0,c)}if(a=a||0,"string"!=typeof h||!isNaN(h)&&null==this._labels[h]){null==h&&(h=this.duration())}else{if(l=h.indexOf("="),-1===l){return null==this._labels[h]?c?this._labels[h]=this.duration()+a:a:this._labels[h]+a}a=parseInt(h.charAt(l-1)+"1",10)*Number(h.substr(l+1)),h=l>1?this._parseTimeOrLabel(h.substr(0,l-1),0,c):this.duration()}return Number(h)+a},k.seek=function(a,c){return this.totalTime("number"==typeof a?a:this._parseTimeOrLabel(a),c!==!1)},k.stop=function(){return this.paused(!0)},k.gotoAndPlay=function(a,c){return this.play(a,c)},k.gotoAndStop=function(a,c){return this.pause(a,c)},k.render=function(N,I,G){this._gc&&this._enabled(!0,!1);var O,r,L,l,M,K=this._dirty?this.totalDuration():this._totalDuration,h=this._time,H=this._startTime,F=this._timeScale,J=this._paused;if(N>=K?(this._totalTime=this._time=K,this._reversed||this._hasPausedChild()||(r=!0,l="onComplete",0===this._duration&&(0===N||0>this._rawPrevTime||this._rawPrevTime===b)&&this._rawPrevTime!==N&&this._first&&(M=!0,this._rawPrevTime>b&&(l="onReverseComplete"))),this._rawPrevTime=this._duration||!I||N||this._rawPrevTime===N?N:b,N=K+0.0001):1e-7>N?(this._totalTime=this._time=0,(0!==h||0===this._duration&&this._rawPrevTime!==b&&(this._rawPrevTime>0||0>N&&this._rawPrevTime>=0))&&(l="onReverseComplete",r=this._reversed),0>N?(this._active=!1,this._rawPrevTime>=0&&this._first&&(M=!0),this._rawPrevTime=N):(this._rawPrevTime=this._duration||!I||N||this._rawPrevTime===N?N:b,N=0,this._initted||(M=!0))):this._totalTime=this._time=this._rawPrevTime=N,this._time!==h&&this._first||G||M){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==h&&N>0&&(this._active=!0),0===h&&this.vars.onStart&&0!==this._time&&(I||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||B)),this._time>=h){for(O=this._first;O&&(L=O._next,!this._paused||J);){(O._active||O._startTime<=this._time&&!O._paused&&!O._gc)&&(O._reversed?O.render((O._dirty?O.totalDuration():O._totalDuration)-(N-O._startTime)*O._timeScale,I,G):O.render((N-O._startTime)*O._timeScale,I,G)),O=L}}else{for(O=this._last;O&&(L=O._prev,!this._paused||J);){(O._active||h>=O._startTime&&!O._paused&&!O._gc)&&(O._reversed?O.render((O._dirty?O.totalDuration():O._totalDuration)-(N-O._startTime)*O._timeScale,I,G):O.render((N-O._startTime)*O._timeScale,I,G)),O=L}}this._onUpdate&&(I||(w.length&&q(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||B))),l&&(this._gc||(H===this._startTime||F!==this._timeScale)&&(0===this._time||K>=this.totalDuration())&&(r&&(w.length&&q(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!I&&this.vars[l]&&this.vars[l].apply(this.vars[l+"Scope"]||this,this.vars[l+"Params"]||B)))}},k._hasPausedChild=function(){for(var a=this._first;a;){if(a._paused||a instanceof E&&a._hasPausedChild()){return !0}a=a._next}return !1},k.getChildren=function(f,l,h,i){i=i||-9999999999;for(var p=[],c=this._first,m=0;c;){i>c._startTime||(c instanceof v?l!==!1&&(p[m++]=c):(h!==!1&&(p[m++]=c),f!==!1&&(p=p.concat(c.getChildren(!0,l,h)),m=p.length))),c=c._next}return p},k.getTweensOf=function(f,l){var h,i,p=this._gc,c=[],m=0;for(p&&this._enabled(!0,!0),h=v.getTweensOf(f),i=h.length;--i>-1;){(h[i].timeline===this||l&&this._contains(h[i]))&&(c[m++]=h[i])}return p&&this._enabled(!1,!0),c},k.recent=function(){return this._recent},k._contains=function(a){for(var c=a.timeline;c;){if(c===this){return !0}c=c.timeline}return !1},k.shiftChildren=function(c,l,a){a=a||0;for(var f,h=this._first,m=this._labels;h;){h._startTime>=a&&(h._startTime+=c),h=h._next}if(l){for(f in m){m[f]>=a&&(m[f]+=c)}}return this._uncache(!0)},k._kill=function(c,l){if(!c&&!l){return this._enabled(!1,!1)}for(var a=l?this.getTweensOf(l):this.getChildren(!0,!0,!1),f=a.length,h=!1;--f>-1;){a[f]._kill(c,l)&&(h=!0)}return h},k.clear=function(c){var f=this.getChildren(!1,!0,!0),a=f.length;for(this._time=this._totalTime=0;--a>-1;){f[a]._enabled(!1,!1)}return c!==!1&&(this._labels={}),this._uncache(!0)},k.invalidate=function(){for(var a=this._first;a;){a.invalidate(),a=a._next}return D.prototype.invalidate.call(this)},k._enabled=function(c,a){if(c===this._gc){for(var f=this._first;f;){f._enabled(c,!0),f=f._next}}return y.prototype._enabled.call(this,c,a)},k.totalTime=function(){this._forcingPlayhead=!0;var a=D.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,a},k.duration=function(a){return arguments.length?(0!==this.duration()&&0!==a&&this.timeScale(this._duration/a),this):(this._dirty&&this.totalDuration(),this._duration)},k.totalDuration=function(c){if(!arguments.length){if(this._dirty){for(var l,a,f=0,h=this._last,m=999999999999;h;){l=h._prev,h._dirty&&h.totalDuration(),h._startTime>m&&this._sortChildren&&!h._paused?this.add(h,h._startTime-h._delay):m=h._startTime,0>h._startTime&&!h._paused&&(f-=h._startTime,this._timeline.smoothChildTiming&&(this._startTime+=h._startTime/this._timeScale),this.shiftChildren(-h._startTime,!1,-9999999999),m=0),a=h._startTime+h._totalDuration/h._timeScale,a>f&&(f=a),h=l}this._duration=this._totalDuration=f,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==c&&this.timeScale(this._totalDuration/c),this},k.usesFrames=function(){for(var a=this._timeline;a._timeline;){a=a._timeline}return a===D._rootFramesTimeline},k.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},E},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=b())}("TimelineLite");
/*!
 * VERSION: beta 1.9.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine("easing.Back",["easing.Ease"],function(F){var z,w,G,b=_gsScope.GreenSockGlobals||_gsScope,k=b.com.greensock,C=2*Math.PI,j=Math.PI/2,x=k._class,v=function(f,a){var c=x("easing."+f,function(){},!0),d=c.prototype=new F;return d.constructor=c,d.getRatio=a,c},D=F.register||function(){},E=function(c,h,a,d){var f=x("easing."+c,{easeOut:new h,easeIn:new a,easeInOut:new d},!0);return D(f,c),f},B=function(c,d,a){this.t=c,this.v=d,a&&(this.next=a,a.prev=this,this.c=a.v-d,this.gap=a.t-c)},g=function(f,a){var c=x("easing."+f,function(h){this._p1=h||0===h?h:1.70158,this._p2=1.525*this._p1},!0),d=c.prototype=new F;return d.constructor=c,d.getRatio=a,d.config=function(h){return new c(h)},c},y=E("Back",g("BackOut",function(a){return(a-=1)*a*((this._p1+1)*a+this._p1)+1}),g("BackIn",function(a){return a*a*((this._p1+1)*a-this._p1)}),g("BackInOut",function(a){return 1>(a*=2)?0.5*a*a*((this._p2+1)*a-this._p2):0.5*((a-=2)*a*((this._p2+1)*a+this._p2)+2)})),q=x("easing.SlowMo",function(c,d,a){d=d||0===d?d:0.7,null==c?c=0.7:c>1&&(c=1),this._p=1!==c?d:0,this._p1=(1-c)/2,this._p2=c,this._p3=this._p1+this._p2,this._calcEnd=a===!0},!0),A=q.prototype=new F;return A.constructor=q,A.getRatio=function(a){var c=a+(0.5-a)*this._p;return this._p1>a?this._calcEnd?1-(a=1-a/this._p1)*a:c-(a=1-a/this._p1)*a*a*a*c:a>this._p3?this._calcEnd?1-(a=(a-this._p3)/this._p1)*a:c+(a-c)*(a=(a-this._p3)/this._p1)*a*a*a:this._calcEnd?1:c},q.ease=new q(0.7,0.7),A.config=q.config=function(c,d,a){return new q(c,d,a)},z=x("easing.SteppedEase",function(a){a=a||1,this._p1=1/a,this._p2=a+1},!0),A=z.prototype=new F,A.constructor=z,A.getRatio=function(a){return 0>a?a=0:a>=1&&(a=0.999999999),(this._p2*a>>0)*this._p1},A.config=z.config=function(a){return new z(a)},w=x("easing.RoughEase",function(P){P=P||{};for(var L,U,c,I,R,H,M=P.taper||"none",K=[],S=0,T=0|(P.points||20),t=T,O=P.randomize!==!1,J=P.clamp===!0,Q=P.template instanceof F?P.template:null,N="number"==typeof P.strength?0.4*P.strength:0.4;--t>-1;){L=O?Math.random():1/T*t,U=Q?Q.getRatio(L):L,"none"===M?c=N:"out"===M?(I=1-L,c=I*I*N):"in"===M?c=L*L*N:0.5>L?(I=2*L,c=0.5*I*I*N):(I=2*(1-L),c=0.5*I*I*N),O?U+=Math.random()*c-0.5*c:t%2?U+=0.5*c:U-=0.5*c,J&&(U>1?U=1:0>U&&(U=0)),K[S++]={x:L,y:U}}for(K.sort(function(a,d){return a.x-d.x}),H=new B(1,1,null),t=T;--t>-1;){R=K[t],H=new B(R.x,R.y,H)}this._prev=new B(0,0,0!==H.t?H:H.next)},!0),A=w.prototype=new F,A.constructor=w,A.getRatio=function(a){var c=this._prev;if(a>c.t){for(;c.next&&a>=c.t;){c=c.next}c=c.prev}else{for(;c.prev&&c.t>=a;){c=c.prev}}return this._prev=c,c.v+(a-c.t)/c.gap*c.c},A.config=function(a){return new w(a)},w.ease=new w,E("Bounce",v("BounceOut",function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+0.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375}),v("BounceIn",function(a){return 1/2.75>(a=1-a)?1-7.5625*a*a:2/2.75>a?1-(7.5625*(a-=1.5/2.75)*a+0.75):2.5/2.75>a?1-(7.5625*(a-=2.25/2.75)*a+0.9375):1-(7.5625*(a-=2.625/2.75)*a+0.984375)}),v("BounceInOut",function(a){var c=0.5>a;return a=c?1-2*a:2*a-1,a=1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+0.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375,c?0.5*(1-a):0.5*a+0.5})),E("Circ",v("CircOut",function(a){return Math.sqrt(1-(a-=1)*a)}),v("CircIn",function(a){return -(Math.sqrt(1-a*a)-1)}),v("CircInOut",function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)})),G=function(f,a,c){var d=x("easing."+f,function(i,l){this._p1=i||1,this._p2=l||c,this._p3=this._p2/C*(Math.asin(1/this._p1)||0)},!0),h=d.prototype=new F;return h.constructor=d,h.getRatio=a,h.config=function(i,l){return new d(i,l)},d},E("Elastic",G("ElasticOut",function(a){return this._p1*Math.pow(2,-10*a)*Math.sin((a-this._p3)*C/this._p2)+1},0.3),G("ElasticIn",function(a){return -(this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*C/this._p2))},0.3),G("ElasticInOut",function(a){return 1>(a*=2)?-0.5*this._p1*Math.pow(2,10*(a-=1))*Math.sin((a-this._p3)*C/this._p2):0.5*this._p1*Math.pow(2,-10*(a-=1))*Math.sin((a-this._p3)*C/this._p2)+1},0.45)),E("Expo",v("ExpoOut",function(a){return 1-Math.pow(2,-10*a)}),v("ExpoIn",function(a){return Math.pow(2,10*(a-1))-0.001}),v("ExpoInOut",function(a){return 1>(a*=2)?0.5*Math.pow(2,10*(a-1)):0.5*(2-Math.pow(2,-10*(a-1)))})),E("Sine",v("SineOut",function(a){return Math.sin(a*j)}),v("SineIn",function(a){return -Math.cos(a*j)+1}),v("SineInOut",function(a){return -0.5*(Math.cos(Math.PI*a)-1)})),x("easing.EaseLookup",{find:function(a){return F.map[a]}},!0),D(b.SlowMo,"SlowMo","ease,"),D(w,"RoughEase","ease,"),D(z,"SteppedEase","ease,"),y},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();
/*!
 * VERSION: 1.14.2
 * DATE: 2014-10-28
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(au,aN){var aI,aw,av,aB,aT=function(){au.call(this,"css"),this._overwriteProps.length=0,this.setRatio=aT.prototype.setRatio},aA={},aF=aT.prototype=new au("css");aF.constructor=aT,aT.version="1.14.2",aT.API=2,aT.defaultTransformPerspective=0,aT.defaultSkewType="compensated",aF="px",aT.suffixMap={top:aF,right:aF,bottom:aF,left:aF,width:aF,height:aF,fontSize:aF,padding:aF,margin:aF,perspective:aF,lineHeight:""};var aJ,at,aM,az,aU,aP,aO=/(?:\d|\-\d|\.\d|\-\.\d)+/g,aC=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,aL=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,ar=/(?![+-]?\d*\.?\d+|e[+-]\d+)[^0-9]/g,ao=/(?:\d|\-|\+|=|#|\.)*/g,ap=/opacity *= *([^)]*)/i,a1=/opacity:([^;]*)/i,aq=/alpha\(opacity *=.+?\)/i,aS=/^(rgb|hsl)/,a6=/([A-Z])/g,a3=/-([a-z])/gi,a4=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,bq=function(a,b){return b.toUpperCase()},aG=/(?:Left|Right|Width)/i,a7=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,bs=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,bn=/,(?=[^\)]*(?:\(|$))/gi,bb=Math.PI/180,bc=180/Math.PI,a9={},an=document,aX=an.createElement("div"),bg=an.createElement("img"),bm=aT._internals={_specialProps:aA},bl=navigator.userAgent,aW=function(){var b,c=bl.indexOf("Android"),a=an.createElement("div");return aM=-1!==bl.indexOf("Safari")&&-1===bl.indexOf("Chrome")&&(-1===c||Number(bl.substr(c+8,1))>3),aU=aM&&6>Number(bl.substr(bl.indexOf("Version/")+8,1)),az=-1!==bl.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(bl)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(bl))&&(aP=parseFloat(RegExp.$1)),a.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",b=a.getElementsByTagName("a")[0],b?/^0.55/.test(b.style.opacity):!1}(),br=function(a){return ap.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},a0=function(a){window.console&&console.log(a)},aH="",aY="",aZ=function(b,f){f=f||aX;var a,d,c=f.style;if(void 0!==c[b]){return b}for(b=b.charAt(0).toUpperCase()+b.substr(1),a=["O","Moz","ms","Ms","Webkit"],d=5;--d>-1&&void 0===c[a[d]+b];){}return d>=0?(aY=3===d?"ms":a[d],aH="-"+aY.toLowerCase()+"-",aY+b):null},ay=an.defaultView?an.defaultView.getComputedStyle:function(){},bj=aT.getStyle=function(b,f,a,d,c){var g;return aW||"opacity"!==f?(!d&&b.style[f]?g=b.style[f]:(a=a||ay(b))?g=a[f]||a.getPropertyValue(f)||a.getPropertyValue(f.replace(a6,"-$1").toLowerCase()):b.currentStyle&&(g=b.currentStyle[f]),null==c||g&&"none"!==g&&"auto"!==g&&"auto auto"!==g?g:c):br(b)},bk=bm.convertToPixels=function(w,j,a,x,d){if("px"===x||!x){return a}if("auto"===x||!a){return 0}var c,g,k,v=aG.test(j),m=w,b=aX.style,q=0>a;if(q&&(a=-a),"%"===x&&-1!==j.indexOf("border")){c=a/100*(v?w.clientWidth:w.clientHeight)}else{if(b.cssText="border:0 solid red;position:"+bj(w,"position")+";line-height:0;","%"!==x&&m.appendChild){b[v?"borderLeftWidth":"borderTopWidth"]=a+x}else{if(m=w.parentNode||an.body,g=m._gsCache,k=aN.ticker.frame,g&&v&&g.time===k){return g.width*a/100}b[v?"width":"height"]=a+x}m.appendChild(aX),c=parseFloat(aX[v?"offsetWidth":"offsetHeight"]),m.removeChild(aX),v&&"%"===x&&aT.cacheWidths!==!1&&(g=m._gsCache=m._gsCache||{},g.time=k,g.width=100*(c/a)),0!==c||d||(c=bk(w,j,a,x,!0))}return q?-c:c},a5=bm.calculateOffset=function(b,f,a){if("absolute"!==bj(b,"position",a)){return 0}var d="left"===f?"Left":"Top",c=bj(b,"margin"+d,a);return b["offset"+d]-(bk(b,f,parseFloat(c),c.replace(ao,""))||0)},aV=function(b,f){var a,d,c={};if(f=f||ay(b,null)){if(a=f.length){for(;--a>-1;){c[f[a].replace(a3,bq)]=f.getPropertyValue(f[a])}}else{for(a in f){c[a]=f[a]}}}else{if(f=b.currentStyle||b.style){for(a in f){"string"==typeof a&&void 0===c[a]&&(c[a.replace(a3,bq)]=f[a])}}}return aW||(c.opacity=br(b)),d=bD(b,f,!1),c.rotation=d.rotation,c.skewX=d.skewX,c.scaleX=d.scaleX,c.scaleY=d.scaleY,c.x=d.x,c.y=d.y,a2&&(c.z=d.z,c.rotationX=d.rotationX,c.rotationY=d.rotationY,c.scaleZ=d.scaleZ),c.filters&&delete c.filters,c},bz=function(p,k,g,b,q){var d,m,c,f={},j=p.style;for(m in g){"cssText"!==m&&"length"!==m&&isNaN(m)&&(k[m]!==(d=g[m])||q&&q[m])&&-1===m.indexOf("Origin")&&("number"==typeof d||"string"==typeof d)&&(f[m]="auto"!==d||"left"!==m&&"top"!==m?""!==d&&"auto"!==d&&"none"!==d||"string"!=typeof k[m]||""===k[m].replace(ar,"")?d:0:a5(p,m),void 0!==j[m]&&(c=new bC(j,m,j[m],c)))}if(b){for(m in b){"className"!==m&&(f[m]=b[m])}}return{difs:f,firstMPT:c}},bd={width:["Left","Right"],height:["Top","Bottom"]},bf=["marginLeft","marginRight","marginTop","marginBottom"],bo=function(b,f,a){var d=parseFloat("width"===f?b.offsetWidth:b.offsetHeight),c=bd[f],g=c.length;for(a=a||ay(b,null);--g>-1;){d-=parseFloat(bj(b,"padding"+c[g],a,!0))||0,d-=parseFloat(bj(b,"border"+c[g]+"Width",a,!0))||0}return d},ab=function(b,f){(null==b||""===b||"auto"===b||"auto auto"===b)&&(b="0 0");var a=b.split(" "),d=-1!==b.indexOf("left")?"0%":-1!==b.indexOf("right")?"100%":a[0],c=-1!==b.indexOf("top")?"0%":-1!==b.indexOf("bottom")?"100%":a[1];return null==c?c="0":"center"===c&&(c="50%"),("center"===d||isNaN(parseFloat(d))&&-1===(d+"").indexOf("="))&&(d="50%"),f&&(f.oxp=-1!==d.indexOf("%"),f.oyp=-1!==c.indexOf("%"),f.oxr="="===d.charAt(1),f.oyr="="===c.charAt(1),f.ox=parseFloat(d.replace(ar,"")),f.oy=parseFloat(c.replace(ar,""))),d+" "+c+(a.length>2?" "+a[2]:"")},aD=function(a,b){return"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)},bF=function(a,b){return null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2))+b:parseFloat(a)},bx=function(k,h,g,b){var m,d,j,c,f=0.000001;return null==k?c=h:"number"==typeof k?c=k:(m=360,d=k.split("_"),j=Number(d[0].replace(ar,""))*(-1===k.indexOf("rad")?1:bc)-("="===k.charAt(1)?0:h),d.length&&(b&&(b[g]=h+j),-1!==k.indexOf("short")&&(j%=m,j!==j%(m/2)&&(j=0>j?j+m:j-m)),-1!==k.indexOf("_cw")&&0>j?j=(j+9999999999*m)%m-(0|j/m)*m:-1!==k.indexOf("ccw")&&j>0&&(j=(j-9999999999*m)%m-(0|j/m)*m)),c=h+j),f>c&&c>-f&&(c=0),c},bh={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},bu=function(b,c,a){return b=0>b?b+1:b>1?b-1:b,0|255*(1>6*b?c+6*(a-c)*b:0.5>b?a:2>3*b?c+6*(a-c)*(2/3-b):c)+0.5},aK=aT.parseColor=function(d){var h,c,g,f,j,b;return d&&""!==d?"number"==typeof d?[d>>16,255&d>>8,255&d]:(","===d.charAt(d.length-1)&&(d=d.substr(0,d.length-1)),bh[d]?bh[d]:"#"===d.charAt(0)?(4===d.length&&(h=d.charAt(1),c=d.charAt(2),g=d.charAt(3),d="#"+h+h+c+c+g+g),d=parseInt(d.substr(1),16),[d>>16,255&d>>8,255&d]):"hsl"===d.substr(0,3)?(d=d.match(aO),f=Number(d[0])%360/360,j=Number(d[1])/100,b=Number(d[2])/100,c=0.5>=b?b*(j+1):b+j-b*j,h=2*b-c,d.length>3&&(d[3]=Number(d[3])),d[0]=bu(f+1/3,h,c),d[1]=bu(f,h,c),d[2]=bu(f-1/3,h,c),d):(d=d.match(aO)||bh.transparent,d[0]=Number(d[0]),d[1]=Number(d[1]),d[2]=Number(d[2]),d.length>3&&(d[3]=Number(d[3])),d)):bh.black},bE="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(aF in bh){bE+="|"+aF+"\\b"}bE=RegExp(bE+")","gi");var a8=function(w,p,j,b){if(null==w){return function(a){return a}}var x,d=p?(w.match(bE)||[""])[0]:"",q=w.split(d).join("").match(aL)||[],c=w.substr(0,w.indexOf(q[0])),g=")"===w.charAt(w.length-1)?")":"",k=-1!==w.indexOf(" ")?" ":",",v=q.length,m=v>0?q[0].replace(aO,""):"";return v?x=p?function(f){var i,h,a,l;if("number"==typeof f){f+=m}else{if(b&&bn.test(f)){for(l=f.replace(bn,"|").split("|"),a=0;l.length>a;a++){l[a]=x(l[a])}return l.join(",")}}if(i=(f.match(bE)||[d])[0],h=f.split(i).join("").match(aL)||[],a=h.length,v>a--){for(;v>++a;){h[a]=j?h[0|(a-1)/2]:q[a]}}return c+h.join(k)+k+i+g+(-1!==f.indexOf("inset")?" inset":"")}:function(a){var h,i,f;if("number"==typeof a){a+=m}else{if(b&&bn.test(a)){for(i=a.replace(bn,"|").split("|"),f=0;i.length>f;f++){i[f]=x(i[f])}return i.join(",")}}if(h=a.match(aL)||[],f=h.length,v>f--){for(;v>++f;){h[f]=j?h[0|(f-1)/2]:q[f]}}return c+h.join(k)+g}:function(a){return a}},aQ=function(a){return a=a.split(","),function(k,g,b,p,d,m,c){var f,j=(g+"").split(" ");for(c={},f=0;4>f;f++){c[a[f]]=j[f]=j[f]||j[(f-1)/2>>0]}return p.parse(k,c,d,m)}},bC=(bm._setPluginRatio=function(k){this.plugin.setRatio(k);for(var h,g,b,m,d=this.data,j=d.proxy,c=d.firstMPT,f=0.000001;c;){h=j[c.v],c.r?h=Math.round(h):f>h&&h>-f&&(h=0),c.t[c.p]=h,c=c._next}if(d.autoRotate&&(d.autoRotate.rotation=j.rotation),1===k){for(c=d.firstMPT;c;){if(g=c.t,g.type){if(1===g.type){for(m=g.xs0+g.s+g.xs1,b=1;g.l>b;b++){m+=g["xn"+b]+g["xs"+(b+1)]}g.e=m}}else{g.e=g.s+g.xs0}c=c._next}}},function(b,f,a,d,c){this.t=b,this.p=f,this.v=a,this.r=c,d&&(d._prev=this,this._next=d)}),al=(bm._parseToProxy=function(D,x,q,b,E,k){var A,j,m,v,C,w=b,g={},B={},z=q._transform,y=a9;for(q._transform=null,a9=x,b=C=q.parse(D,x,b,E),a9=y,k&&(q._transform=z,w&&(w._prev=null,w._prev&&(w._prev._next=null)));b&&b!==w;){if(1>=b.type&&(j=b.p,B[j]=b.s+b.c,g[j]=b.s,k||(v=new bC(b,"s",j,v,b.r),b.c=0),1===b.type)){for(A=b.l;--A>0;){m="xn"+A,j=b.p+"_"+m,B[j]=b.data[m],g[j]=b[m],k||(v=new bC(b,m,j,v,b.rxp[m]))}}b=b._next}return{proxy:g,end:B,firstMPT:v,pt:C}},bm.CSSPropTween=function(q,k,b,v,m,d,g,i,n,j,c){this.t=q,this.p=k,this.s=b,this.c=v,this.n=g||k,q instanceof al||aB.push(this.n),this.r=i,this.type=d||0,n&&(this.pr=n,aI=!0),this.b=void 0===j?b:j,this.e=void 0===c?b+v:c,m&&(this._next=m,m._prev=this)}),aa=aT.parseComplex=function(E,V,N,H,F,K,X,J,L,D){N=N||K||"",X=new al(E,V,0,0,X,D?2:1,null,!1,J,N,H),H+="";var U,I,Y,W,Q,B,q,z,b,A,j,d,h=N.split(", ").join(",").split(" "),G=H.split(", ").join(",").split(" "),M=h.length,m=aJ!==!1;for((-1!==H.indexOf(",")||-1!==N.indexOf(","))&&(h=h.join(" ").replace(bn,", ").split(" "),G=G.join(" ").replace(bn,", ").split(" "),M=h.length),M!==G.length&&(h=(K||"").split(" "),M=h.length),X.plugin=L,X.setRatio=D,U=0;M>U;U++){if(W=h[U],Q=G[U],z=parseFloat(W),z||0===z){X.appendXtra("",z,aD(Q,z),Q.replace(aC,""),m&&-1!==Q.indexOf("px"),!0)}else{if(F&&("#"===W.charAt(0)||bh[W]||aS.test(W))){d=","===Q.charAt(Q.length-1)?"),":")",W=aK(W),Q=aK(Q),b=W.length+Q.length>6,b&&!aW&&0===Q[3]?(X["xs"+X.l]+=X.l?" transparent":"transparent",X.e=X.e.split(G[U]).join("transparent")):(aW||(b=!1),X.appendXtra(b?"rgba(":"rgb(",W[0],Q[0]-W[0],",",!0,!0).appendXtra("",W[1],Q[1]-W[1],",",!0).appendXtra("",W[2],Q[2]-W[2],b?",":d,!0),b&&(W=4>W.length?1:W[3],X.appendXtra("",W,(4>Q.length?1:Q[3])-W,d,!1)))}else{if(B=W.match(aO)){if(q=Q.match(aC),!q||q.length!==B.length){return X}for(Y=0,I=0;B.length>I;I++){j=B[I],A=W.indexOf(j,Y),X.appendXtra(W.substr(Y,A-Y),Number(j),aD(q[I],j),"",m&&"px"===W.substr(A+j.length,2),0===I),Y=A+j.length}X["xs"+X.l]+=W.substr(Y)}else{X["xs"+X.l]+=X.l?" "+W:W}}}}if(-1!==H.indexOf("=")&&X.data){for(d=X.xs0+X.data.s,U=1;X.l>U;U++){d+=X["xs"+U]+X.data["xn"+U]}X.e=d+X["xs"+U]}return X.l||(X.type=-1,X.xs0=X.e),X.xfirst||X},ax=9;for(aF=al.prototype,aF.l=aF.pr=0;--ax>0;){aF["xn"+ax]=0,aF["xs"+ax]=""}aF.xs0="",aF._next=aF._prev=aF.xfirst=aF.data=aF.plugin=aF.setRatio=aF.rxp=null,aF.appendXtra=function(d,h,c,g,f,k){var b=this,j=b.l;return b["xs"+j]+=k&&j?" "+d:d||"",c||0===j||b.plugin?(b.l++,b.type=b.setRatio?2:1,b["xs"+b.l]=g||"",j>0?(b.data["xn"+j]=h+c,b.rxp["xn"+j]=f,b["xn"+j]=h,b.plugin||(b.xfirst=new al(b,"xn"+j,h,c,b.xfirst||b,0,b.n,f,b.pr),b.xfirst.xs0=0),b):(b.data={s:h+c},b.rxp={},b.s=h,b.c=c,b.r=f,b)):(b["xs"+j]+=h+(g||""),b)};var aj=function(a,b){b=b||{},this.p=b.prefix?aZ(a)||a:a,aA[a]=aA[this.p]=this,this.format=b.formatter||a8(b.defaultValue,b.color,b.collapsible,b.multi),b.parser&&(this.parse=b.parser),this.clrs=b.color,this.multi=b.multi,this.keyword=b.keyword,this.dflt=b.defaultValue,this.pr=b.priority||0},bw=bm._registerComplexSpecialProp=function(d,h,c){"object"!=typeof h&&(h={parser:c});var g,f,j=d.split(","),b=h.defaultValue;for(c=c||[b],g=0;j.length>g;g++){h.prefix=0===g&&h.prefix,h.defaultValue=c[g]||b,f=new aj(j[g],h)}},bv=function(a){if(!aA[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";bw(a,{parser:function(g,f,m,k,o,d,c){var j=(_gsScope.GreenSockGlobals||_gsScope).com.greensock.plugins[b];return j?(j._cssRegister(),aA[m].parse(g,f,m,k,o,d,c)):(a0("Error: "+b+" js file not loaded."),o)}})}};aF=aj.prototype,aF.parseComplex=function(y,v,k,b,z,g){var w,d,j,m,x,q,c=this.keyword;if(this.multi&&(bn.test(k)||bn.test(v)?(d=v.replace(bn,"|").split("|"),j=k.replace(bn,"|").split("|")):c&&(d=[v],j=[k])),j){for(m=j.length>d.length?j.length:d.length,w=0;m>w;w++){v=d[w]=d[w]||this.dflt,k=j[w]=j[w]||this.dflt,c&&(x=v.indexOf(c),q=k.indexOf(c),x!==q&&(k=-1===q?j:d,k[w]+=" "+c))}v=d.join(", "),k=j.join(", ")}return aa(y,this.p,v,k,this.clrs,this.dflt,b,this.pr,z,g)},aF.parse=function(d,g,c,f,h,b){return this.parseComplex(d.style,this.format(bj(d,this.p,av,!1,this.dflt)),this.format(g),h,b)},aT.registerSpecialProp=function(b,c,a){bw(b,{parser:function(g,i,h,k,f,j){var d=new al(g,h,0,0,f,2,h,!1,a);return d.plugin=j,d.setRatio=c(g,i,k._tween,h),d},priority:a})};var am,bA="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),bH=aZ("transform"),bB=aH+"transform",ag=aZ("transformOrigin"),a2=null!==aZ("perspective"),aR=bm.Transform=function(){this.skewY=0},bI=window.SVGElement,ah=function(b,f,a){var d,c=an.createElementNS("http://www.w3.org/2000/svg",b),g=/([a-z])([A-Z])/g;for(d in a){c.setAttributeNS(null,d.replace(g,"$1-$2").toLowerCase(),a[d])}return f.appendChild(c),c},ba=document.documentElement,ac=function(){var b,d,a,c=aP||/Android/i.test(bl)&&!window.chrome;return an.createElementNS&&!c&&(b=ah("svg",ba),d=ah("rect",b,{width:100,height:50,x:100}),a=d.getBoundingClientRect().left,d.style[ag]="50% 50%",d.style[bH]="scale(0.5,0.5)",c=a===d.getBoundingClientRect().left,ba.removeChild(b)),c}(),bp=function(b,d,a){var c=b.getBBox();d=ab(d).split(" "),a.xOrigin=(-1!==d[0].indexOf("%")?parseFloat(d[0])/100*c.width:parseFloat(d[0]))+c.x,a.yOrigin=(-1!==d[1].indexOf("%")?parseFloat(d[1])/100*c.height:parseFloat(d[1]))+c.y},bD=bm.getTransform=function(b9,cn,cj,ca){if(b9._gsTransform&&cj&&!ca){return b9._gsTransform}var ce,cd,cg,ck,b8,cm,cc,cs,cp,co,cf,cl,b7,b3=cj?b9._gsTransform||new aR:new aR,b5=0>b3.scaleX,bJ=0.00002,b6=100000,cq=179.99,bN=cq*bb,bK=a2?parseFloat(bj(b9,ag,cn,!1,"0 0 0").split(" ")[2])||b3.zOrigin||0:0,bL=parseFloat(aT.defaultTransformPerspective)||0;if(bH?ce=bj(b9,bB,cn,!0):b9.currentStyle&&(ce=b9.currentStyle.filter.match(a7),ce=ce&&4===ce.length?[ce[0].substr(4),Number(ce[2].substr(4)),Number(ce[1].substr(4)),ce[3].substr(4),b3.x||0,b3.y||0].join(","):""),ce&&"none"!==ce&&"matrix(1, 0, 0, 1, 0, 0)"!==ce){for(cd=(ce||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],cg=cd.length;--cg>-1;){ck=Number(cd[cg]),cd[cg]=(b8=ck-(ck|=0))?(0|b8*b6+(0>b8?-0.5:0.5))/b6+ck:ck}if(16===cd.length){var bW=cd[8],ch=cd[9],bY=cd[10],bV=cd[12],bO=cd[13],b2=cd[14];if(b3.zOrigin&&(b2=-b3.zOrigin,bV=bW*b2-cd[12],bO=ch*b2-cd[13],b2=bY*b2+b3.zOrigin-cd[14]),!cj||ca||null==b3.rotationX){var L,bR,bU,bT,H,bX,be,ci=cd[0],O=cd[1],ae=cd[2],cb=cd[3],bS=cd[4],bM=cd[5],s=cd[6],b0=cd[7],bP=cd[11],bQ=Math.atan2(s,bY),M=-bN>bQ||bQ>bN;b3.rotationX=bQ*bc,bQ&&(bT=Math.cos(-bQ),H=Math.sin(-bQ),L=bS*bT+bW*H,bR=bM*bT+ch*H,bU=s*bT+bY*H,bW=bS*-H+bW*bT,ch=bM*-H+ch*bT,bY=s*-H+bY*bT,bP=b0*-H+bP*bT,bS=L,bM=bR,s=bU),bQ=Math.atan2(bW,ci),b3.rotationY=bQ*bc,bQ&&(bX=-bN>bQ||bQ>bN,bT=Math.cos(-bQ),H=Math.sin(-bQ),L=ci*bT-bW*H,bR=O*bT-ch*H,bU=ae*bT-bY*H,ch=O*H+ch*bT,bY=ae*H+bY*bT,bP=cb*H+bP*bT,ci=L,O=bR,ae=bU),bQ=Math.atan2(O,bM),b3.rotation=bQ*bc,bQ&&(be=-bN>bQ||bQ>bN,bT=Math.cos(-bQ),H=Math.sin(-bQ),ci=ci*bT+bS*H,bR=O*bT+bM*H,bM=O*-H+bM*bT,s=ae*-H+s*bT,O=bR),be&&M?b3.rotation=b3.rotationX=0:be&&bX?b3.rotation=b3.rotationY=0:bX&&M&&(b3.rotationY=b3.rotationX=0),b3.scaleX=(0|Math.sqrt(ci*ci+O*O)*b6+0.5)/b6,b3.scaleY=(0|Math.sqrt(bM*bM+ch*ch)*b6+0.5)/b6,b3.scaleZ=(0|Math.sqrt(s*s+bY*bY)*b6+0.5)/b6,b3.skewX=0,b3.perspective=bP?1/(0>bP?-bP:bP):0,b3.x=bV,b3.y=bO,b3.z=b2}}else{if(!(a2&&!ca&&cd.length&&b3.x===cd[4]&&b3.y===cd[5]&&(b3.rotationX||b3.rotationY)||void 0!==b3.x&&"none"===bj(b9,"display",cn))){var cr=cd.length>=6,b1=cr?cd[0]:1,b4=cd[1]||0,bZ=cd[2]||0,a=cr?cd[3]:1;b3.x=cd[4]||0,b3.y=cd[5]||0,cm=Math.sqrt(b1*b1+b4*b4),cc=Math.sqrt(a*a+bZ*bZ),cs=b1||b4?Math.atan2(b4,b1)*bc:b3.rotation||0,cp=bZ||a?Math.atan2(bZ,a)*bc+cs:b3.skewX||0,co=cm-Math.abs(b3.scaleX||0),cf=cc-Math.abs(b3.scaleY||0),Math.abs(cp)>90&&270>Math.abs(cp)&&(b5?(cm*=-1,cp+=0>=cs?180:-180,cs+=0>=cs?180:-180):(cc*=-1,cp+=0>=cp?180:-180)),cl=(cs-b3.rotation)%180,b7=(cp-b3.skewX)%180,(void 0===b3.skewX||co>bJ||-bJ>co||cf>bJ||-bJ>cf||cl>-cq&&cq>cl&&false|cl*b6||b7>-cq&&cq>b7&&false|b7*b6)&&(b3.scaleX=cm,b3.scaleY=cc,b3.rotation=cs,b3.skewX=cp),a2&&(b3.rotationX=b3.rotationY=b3.z=0,b3.perspective=bL,b3.scaleZ=1)}}b3.zOrigin=bK;for(cg in b3){bJ>b3[cg]&&b3[cg]>-bJ&&(b3[cg]=0)}}else{b3={x:0,y:0,z:0,scaleX:1,scaleY:1,scaleZ:1,skewX:0,skewY:0,perspective:bL,rotation:0,rotationX:0,rotationY:0,zOrigin:0}}return cj&&(b9._gsTransform=b3),b3.svg=bI&&b9 instanceof bI&&b9.parentNode instanceof bI,b3.svg&&(bp(b9,bj(b9,ag,av,!1,"50% 50%")+"",b3),am=aT.useSVGTransformAttr||ac),b3.xPercent=b3.yPercent=0,b3},aE=function(A){var O,K,E=this.data,B=-E.rotation*bb,H=B+E.skewX*bb,V=100000,G=(0|Math.cos(B)*E.scaleX*V)/V,J=(0|Math.sin(B)*E.scaleX*V)/V,L=(0|Math.sin(H)*-E.scaleY*V)/V,z=(0|Math.cos(H)*E.scaleY*V)/V,N=this.t.style,F=this.t.currentStyle;if(F){K=J,J=-L,L=-K,O=F.filter,N.filter="";var W,Q,I=this.t.offsetWidth,M=this.t.offsetHeight,y="absolute"!==F.position,c="progid:DXImageTransform.Microsoft.Matrix(M11="+G+", M12="+J+", M21="+L+", M22="+z,x=E.x+I*E.xPercent/100,U=E.y+M*E.yPercent/100;if(null!=E.ox&&(W=(E.oxp?0.01*I*E.ox:E.ox)-I/2,Q=(E.oyp?0.01*M*E.oy:E.oy)-M/2,x+=W-(W*G+Q*J),U+=Q-(W*L+Q*z)),y?(W=I/2,Q=M/2,c+=", Dx="+(W-(W*G+Q*J)+x)+", Dy="+(Q-(W*L+Q*z)+U)+")"):c+=", sizingMethod='auto expand')",N.filter=-1!==O.indexOf("DXImageTransform.Microsoft.Matrix(")?O.replace(bs,c):c+" "+O,(0===A||1===A)&&1===G&&0===J&&0===L&&1===z&&(y&&-1===c.indexOf("Dx=0, Dy=0")||ap.test(O)&&100!==parseFloat(RegExp.$1)||-1===O.indexOf("gradient("&&O.indexOf("Alpha"))&&N.removeAttribute("filter")),!y){var q,j,k,D=8>aP?1:-1;for(W=E.ieOffsetX||0,Q=E.ieOffsetY||0,E.ieOffsetX=Math.round((I-((0>G?-G:G)*I+(0>J?-J:J)*M))/2+x),E.ieOffsetY=Math.round((M-((0>z?-z:z)*M+(0>L?-L:L)*I))/2+U),ax=0;4>ax;ax++){j=bf[ax],q=F[j],K=-1!==q.indexOf("px")?parseFloat(q):bk(this.t,j,parseFloat(q),q.replace(ao,""))||0,k=K!==E[j]?2>ax?-E.ieOffsetX:-E.ieOffsetY:2>ax?W-E.ieOffsetX:Q-E.ieOffsetY,N[j]=(E[j]=Math.round(K-k*(0===ax||2===ax?1:D)))+"px"}}}},bG=bm.set3DTransformRatio=function(V){var bS,bO,ae,Y,bK,bW,bJ,bM,bP,U,bR,bX,bU,bT,bL,bQ,Q,J,K,p,M,bV,E,q=this.data,B=this.t.style,Z=q.rotation*bb,bN=q.scaleX,F=q.scaleY,be=q.scaleZ,W=q.x,H=q.y,G=q.z,I=q.perspective;if(!(1!==V&&0!==V||"auto"!==q.force3D||q.rotationY||q.rotationX||1!==be||I||G)){return af.call(this,V),void 0}if(az){var j=0.0001;j>bN&&bN>-j&&(bN=be=0.00002),j>F&&F>-j&&(F=be=0.00002),!I||q.z||q.rotationX||q.rotationY||(I=0)}if(Z||q.skewX){J=Math.cos(Z),K=Math.sin(Z),bS=J,bK=K,q.skewX&&(Z-=q.skewX*bb,J=Math.cos(Z),K=Math.sin(Z),"simple"===q.skewType&&(p=Math.tan(q.skewX*bb),p=Math.sqrt(1+p*p),J*=p,K*=p)),bO=-K,bW=J}else{if(!(q.rotationY||q.rotationX||1!==be||I||q.svg)){return B[bH]=(q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) translate3d(":"translate3d(")+W+"px,"+H+"px,"+G+"px)"+(1!==bN||1!==F?" scale("+bN+","+F+")":""),void 0}bS=bW=1,bO=bK=0}bR=1,ae=Y=bJ=bM=bP=U=bX=bU=bT=0,bL=I?-1/I:0,bQ=q.zOrigin,Q=100000,Z=q.rotationY*bb,Z&&(J=Math.cos(Z),K=Math.sin(Z),bP=bR*-K,bU=bL*-K,ae=bS*K,bJ=bK*K,bR*=J,bL*=J,bS*=J,bK*=J),Z=q.rotationX*bb,Z&&(J=Math.cos(Z),K=Math.sin(Z),p=bO*J+ae*K,M=bW*J+bJ*K,bV=U*J+bR*K,E=bT*J+bL*K,ae=bO*-K+ae*J,bJ=bW*-K+bJ*J,bR=U*-K+bR*J,bL=bT*-K+bL*J,bO=p,bW=M,U=bV,bT=E),1!==be&&(ae*=be,bJ*=be,bR*=be,bL*=be),1!==F&&(bO*=F,bW*=F,U*=F,bT*=F),1!==bN&&(bS*=bN,bK*=bN,bP*=bN,bU*=bN),bQ&&(bX-=bQ,Y=ae*bX,bM=bJ*bX,bX=bR*bX+bQ),q.svg&&(Y+=q.xOrigin-(q.xOrigin*bS+q.yOrigin*bO),bM+=q.yOrigin-(q.xOrigin*bK+q.yOrigin*bW)),Y=(p=(Y+=W)-(Y|=0))?(0|p*Q+(0>p?-0.5:0.5))/Q+Y:Y,bM=(p=(bM+=H)-(bM|=0))?(0|p*Q+(0>p?-0.5:0.5))/Q+bM:bM,bX=(p=(bX+=G)-(bX|=0))?(0|p*Q+(0>p?-0.5:0.5))/Q+bX:bX,B[bH]=(q.xPercent||q.yPercent?"translate("+q.xPercent+"%,"+q.yPercent+"%) matrix3d(":"matrix3d(")+[(0|bS*Q)/Q,(0|bK*Q)/Q,(0|bP*Q)/Q,(0|bU*Q)/Q,(0|bO*Q)/Q,(0|bW*Q)/Q,(0|U*Q)/Q,(0|bT*Q)/Q,(0|ae*Q)/Q,(0|bJ*Q)/Q,(0|bR*Q)/Q,(0|bL*Q)/Q,Y,bM,bX,I?1+-bX/I:1].join(",")+")"},af=bm.set2DTransformRatio=function(F){var z,w,b,G,k,C,j,v,x,E,y,g=this.data,D=this.t,B=D.style,A=g.x,q=g.y;return !(g.rotationX||g.rotationY||g.z||g.force3D===!0||"auto"===g.force3D&&1!==F&&0!==F)||g.svg&&am||!a2?(G=g.scaleX,k=g.scaleY,g.rotation||g.skewX||g.svg?(z=g.rotation*bb,w=z-g.skewX*bb,b=100000,C=Math.cos(z)*G,j=Math.sin(z)*G,v=Math.sin(w)*-k,x=Math.cos(w)*k,g.svg&&(A+=g.xOrigin-(g.xOrigin*C+g.yOrigin*v),q+=g.yOrigin-(g.xOrigin*j+g.yOrigin*x),y=0.000001,y>A&&A>-y&&(A=0),y>q&&q>-y&&(q=0)),E=(0|C*b)/b+","+(0|j*b)/b+","+(0|v*b)/b+","+(0|x*b)/b+","+A+","+q+")",g.svg&&am?D.setAttribute("transform","matrix("+E):B[bH]=(g.xPercent||g.yPercent?"translate("+g.xPercent+"%,"+g.yPercent+"%) matrix(":"matrix(")+E):B[bH]=(g.xPercent||g.yPercent?"translate("+g.xPercent+"%,"+g.yPercent+"%) matrix(":"matrix(")+G+",0,0,"+k+","+A+","+q+")",void 0):(this.setRatio=bG,bG.call(this,F),void 0)};bw("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(s,I,E,w,B,A,D){if(w._transform){return B}var F,q,H,z,L,K,J,C=w._transform=bD(s,av,!0,D.parseTransform),G=s.style,k=0.000001,b=bA.length,j=D,a={};if("string"==typeof j.transform&&bH){H=aX.style,H[bH]=j.transform,H.display="block",H.position="absolute",an.body.appendChild(aX),F=bD(aX,null,!1),an.body.removeChild(aX)}else{if("object"==typeof j){if(F={scaleX:bF(null!=j.scaleX?j.scaleX:j.scale,C.scaleX),scaleY:bF(null!=j.scaleY?j.scaleY:j.scale,C.scaleY),scaleZ:bF(j.scaleZ,C.scaleZ),x:bF(j.x,C.x),y:bF(j.y,C.y),z:bF(j.z,C.z),xPercent:bF(j.xPercent,C.xPercent),yPercent:bF(j.yPercent,C.yPercent),perspective:bF(j.transformPerspective,C.perspective)},J=j.directionalRotation,null!=J){if("object"==typeof J){for(H in J){j[H]=J[H]}}else{j.rotation=J}}"string"==typeof j.x&&-1!==j.x.indexOf("%")&&(F.x=0,F.xPercent=bF(j.x,C.xPercent)),"string"==typeof j.y&&-1!==j.y.indexOf("%")&&(F.y=0,F.yPercent=bF(j.y,C.yPercent)),F.rotation=bx("rotation" in j?j.rotation:"shortRotation" in j?j.shortRotation+"_short":"rotationZ" in j?j.rotationZ:C.rotation,C.rotation,"rotation",a),a2&&(F.rotationX=bx("rotationX" in j?j.rotationX:"shortRotationX" in j?j.shortRotationX+"_short":C.rotationX||0,C.rotationX,"rotationX",a),F.rotationY=bx("rotationY" in j?j.rotationY:"shortRotationY" in j?j.shortRotationY+"_short":C.rotationY||0,C.rotationY,"rotationY",a)),F.skewX=null==j.skewX?C.skewX:bx(j.skewX,C.skewX),F.skewY=null==j.skewY?C.skewY:bx(j.skewY,C.skewY),(q=F.skewY-C.skewY)&&(F.skewX+=q,F.rotation+=q)}}for(a2&&null!=j.force3D&&(C.force3D=j.force3D,K=!0),C.skewType=j.skewType||C.skewType||aT.defaultSkewType,L=C.force3D||C.z||C.rotationX||C.rotationY||F.z||F.rotationX||F.rotationY||F.perspective,L||null==j.scale||(F.scaleZ=1);--b>-1;){E=bA[b],z=F[E]-C[E],(z>k||-k>z||null!=j[E]||null!=a9[E])&&(K=!0,B=new al(C,E,C[E],z,B),E in a&&(B.e=a[E]),B.xs0=0,B.plugin=A,w._overwriteProps.push(B.n))}return z=j.transformOrigin,z&&C.svg&&(bp(s,z,F),B=new al(C,"xOrigin",C.xOrigin,F.xOrigin-C.xOrigin,B,-1,"transformOrigin"),B.b=C.xOrigin,B.e=B.xs0=F.xOrigin,B=new al(C,"yOrigin",C.yOrigin,F.yOrigin-C.yOrigin,B,-1,"transformOrigin"),B.b=C.yOrigin,B.e=B.xs0=F.yOrigin,z="0px 0px"),(z||a2&&L&&C.zOrigin)&&(bH?(K=!0,E=ag,z=(z||bj(s,E,av,!1,"50% 50%"))+"",B=new al(G,E,0,0,B,-1,"transformOrigin"),B.b=G[E],B.plugin=A,a2?(H=C.zOrigin,z=z.split(" "),C.zOrigin=(z.length>2&&(0===H||"0px"!==z[2])?parseFloat(z[2]):H)||0,B.xs0=B.e=z[0]+" "+(z[1]||"50%")+" 0px",B=new al(C,"zOrigin",0,0,B,-1,B.n),B.b=H,B.xs0=B.e=C.zOrigin):B.xs0=B.e=z):ab(z+"",C)),K&&(w._transformType=C.svg&&am||!L&&3!==this._transformType?2:3),B},prefix:!0}),bw("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),bw("borderRadius",{defaultValue:"0px",parser:function(B,L,H,E,Q){L=this.format(L);var D,G,I,A,K,C,R,N,M,F,J,z,q,r,j,s,O=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],k=B.style;for(M=parseFloat(B.offsetWidth),F=parseFloat(B.offsetHeight),D=L.split(" "),G=0;O.length>G;G++){this.p.indexOf("border")&&(O[G]=aZ(O[G])),K=A=bj(B,O[G],av,!1,"0px"),-1!==K.indexOf(" ")&&(A=K.split(" "),K=A[0],A=A[1]),C=I=D[G],R=parseFloat(K),z=K.substr((R+"").length),q="="===C.charAt(1),q?(N=parseInt(C.charAt(0)+"1",10),C=C.substr(2),N*=parseFloat(C),J=C.substr((N+"").length-(0>N?1:0))||""):(N=parseFloat(C),J=C.substr((N+"").length)),""===J&&(J=aw[H]||z),J!==z&&(r=bk(B,"borderLeft",R,z),j=bk(B,"borderTop",R,z),"%"===J?(K=100*(r/M)+"%",A=100*(j/F)+"%"):"em"===J?(s=bk(B,"borderLeft",1,"em"),K=r/s+"em",A=j/s+"em"):(K=r+"px",A=j+"px"),q&&(C=parseFloat(K)+N+J,I=parseFloat(A)+N+J)),Q=aa(k,O[G],K+" "+A,C+" "+I,!1,"0px",Q)}return Q},prefix:!0,formatter:a8("0px 0px 0px 0px",!1,!0)}),bw("backgroundPosition",{defaultValue:"0 0",parser:function(E,z,v,b,k,B){var j,s,w,D,y,c,C="background-position",A=av||ay(E,null),q=this.format((A?aP?A.getPropertyValue(C+"-x")+" "+A.getPropertyValue(C+"-y"):A.getPropertyValue(C):E.currentStyle.backgroundPositionX+" "+E.currentStyle.backgroundPositionY)||"0 0"),x=this.format(z);if(-1!==q.indexOf("%")!=(-1!==x.indexOf("%"))&&(c=bj(E,"backgroundImage").replace(a4,""),c&&"none"!==c)){for(j=q.split(" "),s=x.split(" "),bg.setAttribute("src",c),w=2;--w>-1;){q=j[w],D=-1!==q.indexOf("%"),D!==(-1!==s[w].indexOf("%"))&&(y=0===w?E.offsetWidth-bg.width:E.offsetHeight-bg.height,j[w]=D?parseFloat(q)/100*y+"px":100*(parseFloat(q)/y)+"%")}q=j.join(" ")}return this.parseComplex(E.style,q,x,k,B)},formatter:ab}),bw("backgroundSize",{defaultValue:"0 0",formatter:ab}),bw("perspective",{defaultValue:"0px",prefix:!0}),bw("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),bw("transformStyle",{prefix:!0}),bw("backfaceVisibility",{prefix:!0}),bw("userSelect",{prefix:!0}),bw("margin",{parser:aQ("marginTop,marginRight,marginBottom,marginLeft")}),bw("padding",{parser:aQ("paddingTop,paddingRight,paddingBottom,paddingLeft")}),bw("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(p,k,g,b,d,m){var c,f,j;return 9>aP?(f=p.currentStyle,j=8>aP?" ":",",c="rect("+f.clipTop+j+f.clipRight+j+f.clipBottom+j+f.clipLeft+")",k=this.format(k).split(",").join(j)):(c=this.format(bj(p,this.p,av,!1,this.dflt)),k=this.format(k)),this.parseComplex(p.style,c,k,d,m)}}),bw("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),bw("autoRound,strictUnits",{parser:function(b,f,a,d,c){return c}}),bw("border",{defaultValue:"0px solid #000",parser:function(d,g,c,f,h,b){return this.parseComplex(d.style,this.format(bj(d,"borderTopWidth",av,!1,"0px")+" "+bj(d,"borderTopStyle",av,!1,"solid")+" "+bj(d,"borderTopColor",av,!1,"#000")),this.format(g),h,b)},color:!0,formatter:function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(bE)||["#000"])[0]}}),bw("borderWidth",{parser:aQ("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),bw("float,cssFloat,styleFloat",{parser:function(d,h,c,g,f){var j=d.style,b="cssFloat" in j?"cssFloat":"styleFloat";return new al(j,b,0,0,f,-1,c,!1,0,j[b],h)}});var by=function(b){var f,a=this.t,d=a.filter||bj(this.data,"filter")||"",c=0|this.s+this.c*b;100===c&&(-1===d.indexOf("atrix(")&&-1===d.indexOf("radient(")&&-1===d.indexOf("oader(")?(a.removeAttribute("filter"),f=!bj(this.data,"filter")):(a.filter=d.replace(aq,""),f=!0)),f||(this.xn1&&(a.filter=d=d||"alpha(opacity="+c+")"),-1===d.indexOf("pacity")?0===c&&this.xn1||(a.filter=d+" alpha(opacity="+c+")"):a.filter=d.replace(ap,"opacity="+c))};bw("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(p,k,g,b,d,m){var c=parseFloat(bj(p,"opacity",av,!1,"1")),f=p.style,j="autoAlpha"===g;return"string"==typeof k&&"="===k.charAt(1)&&(k=("-"===k.charAt(0)?-1:1)*parseFloat(k.substr(2))+c),j&&1===c&&"hidden"===bj(p,"visibility",av)&&0!==k&&(c=0),aW?d=new al(f,"opacity",c,k-c,d):(d=new al(f,"opacity",100*c,100*(k-c),d),d.xn1=j?1:0,f.zoom=1,d.type=2,d.b="alpha(opacity="+d.s+")",d.e="alpha(opacity="+(d.s+d.c)+")",d.data=p,d.plugin=m,d.setRatio=by),j&&(d=new al(f,"visibility",0,0,d,-1,null,!1,0,0!==c?"inherit":"hidden",0===k?"hidden":"inherit"),d.xs0="inherit",b._overwriteProps.push(d.n),b._overwriteProps.push(g)),d}});var bt=function(a,b){b&&(a.removeProperty?("ms"===b.substr(0,2)&&(b="M"+b.substr(1)),a.removeProperty(b.replace(a6,"-$1").toLowerCase())):a.removeAttribute(b))},ai=function(b){if(this.t._gsClassPT=this,1===b||0===b){this.t.setAttribute("class",0===b?this.b:this.e);for(var c=this.data,a=this.t.style;c;){c.v?a[c.p]=c.v:bt(a,c.p),c=c._next}1===b&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else{this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)}};bw("className",{parser:function(A,s,b,j,x,i,k){var m,z,q,g,y,w=A.getAttribute("class")||"",v=A.style.cssText;if(x=j._classNamePT=new al(A,b,0,0,x,2),x.setRatio=ai,x.pr=-11,aI=!0,x.b=w,z=aV(A,av),q=A._gsClassPT){for(g={},y=q.data;y;){g[y.p]=1,y=y._next}q.setRatio(1)}return A._gsClassPT=x,x.e="="!==s.charAt(1)?s:w.replace(RegExp("\\s*\\b"+s.substr(2)+"\\b"),"")+("+"===s.charAt(0)?" "+s.substr(2):""),j._tween._duration&&(A.setAttribute("class",x.e),m=bz(A,z,aV(A),k,g),A.setAttribute("class",w),x.data=m.firstMPT,A.style.cssText=v,x=x.xfirst=j.parse(A,m.difs,x,i)),x}});var bi=function(d){if((1===d||0===d)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var h,c,g,f,j=this.t.style,b=aA.transform.parse;if("all"===this.e){j.cssText="",f=!0}else{for(h=this.e.split(" ").join("").split(","),g=h.length;--g>-1;){c=h[g],aA[c]&&(aA[c].parse===b?f=!0:c="transformOrigin"===c?ag:aA[c].p),bt(j,c)}}f&&(bt(j,bH),this.t._gsTransform&&delete this.t._gsTransform)}};for(bw("clearProps",{parser:function(a,d,c,b,f){return f=new al(a,c,0,0,f,2),f.setRatio=bi,f.e=d,f.pr=-10,f.data=b._tween,aI=!0,f}}),aF="bezier,throwProps,physicsProps,physics2D".split(","),ax=aF.length;ax--;){bv(aF[ax])}aF=aT.prototype,aF._firstPT=null,aF._onInitTween=function(z,j,b){if(!z.nodeType){return !1}this._target=z,this._tween=b,this._vars=j,aJ=j.autoRound,aI=!1,aw=j.suffixMap||aT.suffixMap,av=ay(z,""),aB=this._overwriteProps;var h,a,n,k,f,i,u,q,r,s=z.style;if(at&&""===s.zIndex&&(h=bj(z,"zIndex",av),("auto"===h||""===h)&&this._addLazySet(s,"zIndex",0)),"string"==typeof j&&(k=s.cssText,h=aV(z,av),s.cssText=k+";"+j,h=bz(z,h,aV(z)).difs,!aW&&a1.test(j)&&(h.opacity=parseFloat(RegExp.$1)),j=h,s.cssText=k),this._firstPT=a=this.parse(z,j,null),this._transformType){for(r=3===this._transformType,bH?aM&&(at=!0,""===s.zIndex&&(u=bj(z,"zIndex",av),("auto"===u||""===u)&&this._addLazySet(s,"zIndex",0)),aU&&this._addLazySet(s,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(r?"visible":"hidden"))):s.zoom=1,n=a;n&&n._next;){n=n._next}q=new al(z,"transform",0,0,null,2),this._linkCSSP(q,null,n),q.setRatio=r&&a2?bG:bH?af:aE,q.data=this._transform||bD(z,av,!0),aB.pop()}if(aI){for(;a;){for(i=a._next,n=k;n&&n.pr>a.pr;){n=n._next}(a._prev=n?n._prev:f)?a._prev._next=a:k=a,(a._next=n)?n._prev=a:f=a,a=i}this._firstPT=k}return !0},aF.parse=function(C,s,o,h){var y,k,B,r,b,A,x,w,j,q,z=C.style;for(y in s){A=s[y],k=aA[y],k?o=k.parse(C,A,y,this,o,h,s):(b=bj(C,y,av)+"",j="string"==typeof A,"color"===y||"fill"===y||"stroke"===y||-1!==y.indexOf("Color")||j&&aS.test(A)?(j||(A=aK(A),A=(A.length>3?"rgba(":"rgb(")+A.join(",")+")"),o=aa(z,y,b,A,!0,"transparent",o,0,h)):!j||-1===A.indexOf(" ")&&-1===A.indexOf(",")?(B=parseFloat(b),x=B||0===B?b.substr((B+"").length):"",(""===b||"auto"===b)&&("width"===y||"height"===y?(B=bo(C,y,av),x="px"):"left"===y||"top"===y?(B=a5(C,y,av),x="px"):(B="opacity"!==y?0:1,x="")),q=j&&"="===A.charAt(1),q?(r=parseInt(A.charAt(0)+"1",10),A=A.substr(2),r*=parseFloat(A),w=A.replace(ao,"")):(r=parseFloat(A),w=j?A.substr((r+"").length)||"":""),""===w&&(w=y in aw?aw[y]:x),A=r||0===r?(q?r+B:r)+w:s[y],x!==w&&""!==w&&(r||0===r)&&B&&(B=bk(C,y,B,x),"%"===w?(B/=bk(C,y,100,"%")/100,s.strictUnits!==!0&&(b=B+"%")):"em"===w?B/=bk(C,y,1,"em"):"px"!==w&&(r=bk(C,y,r,w),w="px"),q&&(r||0===r)&&(A=r+B+w)),q&&(r+=B),!B&&0!==B||!r&&0!==r?void 0!==z[y]&&(A||"NaN"!=A+""&&null!=A)?(o=new al(z,y,r||B||0,0,o,-1,y,!1,0,b,A),o.xs0="none"!==A||"display"!==y&&-1===y.indexOf("Style")?A:b):a0("invalid "+y+" tween value: "+s[y]):(o=new al(z,y,B,r-B,o,0,y,aJ!==!1&&("px"===w||"zIndex"===y),0,b,A),o.xs0=w)):o=aa(z,y,b,A,!0,null,o,0,h)),h&&o&&!o.plugin&&(o.plugin=h)}return o},aF.setRatio=function(b){var f,a,d,c=this._firstPT,g=0.000001;if(1!==b||this._tween._time!==this._tween._duration&&0!==this._tween._time){if(b||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-0.000001){for(;c;){if(f=c.c*b+c.s,c.r?f=Math.round(f):g>f&&f>-g&&(f=0),c.type){if(1===c.type){if(d=c.l,2===d){c.t[c.p]=c.xs0+f+c.xs1+c.xn1+c.xs2}else{if(3===d){c.t[c.p]=c.xs0+f+c.xs1+c.xn1+c.xs2+c.xn2+c.xs3}else{if(4===d){c.t[c.p]=c.xs0+f+c.xs1+c.xn1+c.xs2+c.xn2+c.xs3+c.xn3+c.xs4}else{if(5===d){c.t[c.p]=c.xs0+f+c.xs1+c.xn1+c.xs2+c.xn2+c.xs3+c.xn3+c.xs4+c.xn4+c.xs5}else{for(a=c.xs0+f+c.xs1,d=1;c.l>d;d++){a+=c["xn"+d]+c["xs"+(d+1)]}c.t[c.p]=a}}}}}else{-1===c.type?c.t[c.p]=c.xs0:c.setRatio&&c.setRatio(b)}}else{c.t[c.p]=f+c.xs0}c=c._next}}else{for(;c;){2!==c.type?c.t[c.p]=c.b:c.setRatio(b),c=c._next}}}else{for(;c;){2!==c.type?c.t[c.p]=c.e:c.setRatio(b),c=c._next}}},aF._enableTransforms=function(a){this._transform=this._transform||bD(this._target,av,!0),this._transformType=this._transform.svg&&am||!a&&3!==this._transformType?2:3};var ak=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};aF._addLazySet=function(b,d,a){var c=this._firstPT=new al(b,d,0,0,this._firstPT,2);c.e=a,c.setRatio=ak,c.data=this},aF._linkCSSP=function(b,d,a,c){return b&&(d&&(d._prev=b),b._next&&(b._next._prev=b._prev),b._prev?b._prev._next=b._next:this._firstPT===b&&(this._firstPT=b._next,c=!0),a?a._next=b:c||null!==this._firstPT||(this._firstPT=b),b._next=d,b._prev=a),b},aF._kill=function(d){var a,c,b,f=d;if(d.autoAlpha||d.alpha){f={};for(c in d){f[c]=d[c]}f.opacity=1,f.autoAlpha&&(f.visibility=1)}return d.className&&(a=this._classNamePT)&&(b=a.xfirst,b&&b._prev?this._linkCSSP(b._prev,a._next,b._prev._prev):b===this._firstPT&&(this._firstPT=a._next),a._next&&this._linkCSSP(a._next,a._next._next,b._prev),this._classNamePT=null),au.prototype._kill.call(this,f)};var ad=function(d,h,c){var g,f,j,b;if(d.slice){for(f=d.length;--f>-1;){ad(d[f],h,c)}}else{for(g=d.childNodes,f=g.length;--f>-1;){j=g[f],b=j.type,j.style&&(h.push(aV(j)),c&&c.push(j)),1!==b&&9!==b&&11!==b||!j.childNodes.length||ad(j,h,c)}}};return aT.cascadeTo=function(x,k,b){var y,g,v,d=aN.to(x,k,b),j=[d],m=[],w=[],q=[],c=aN._internals.reservedProps;for(x=d._targets||d.target,ad(x,m,q),d.render(k,!0),ad(x,w),d.render(0,!0),d._enabled(!0),y=q.length;--y>-1;){if(g=bz(q[y],m[y],w[y]),g.firstMPT){g=g.difs;for(v in b){c[v]&&(g[v]=b[v])}j.push(aN.to(q[y],k,g))}}return j},au.activate([aT]),aT},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=b())}("CSSPlugin");
/*!
 * VERSION: beta 0.3.3
 * DATE: 2014-10-29
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(function(w){var J=w.GreenSockGlobals||w,F=function(c){var a,d=c.split("."),f=J;for(a=0;d.length>a;a++){f[d[a]]=f=f[d[a]]||{}}return f},x=F("com.greensock.utils"),z=function(c){var d=c.nodeType,a="";if(1===d||9===d||11===d){if("string"==typeof c.textContent){return c.textContent}for(c=c.firstChild;c;c=c.nextSibling){a+=z(c)}}else{if(3===d||4===d){return c.nodeValue}}return a},C=document,M=C.defaultView?C.defaultView.getComputedStyle:function(){},B=/([A-Z])/g,G=function(c,g,a,d){var f;return(a=a||M(c,null))?(c=a.getPropertyValue(g.replace(B,"-$1").toLowerCase()),f=c||a.length?c:a[g]):c.currentStyle&&(a=c.currentStyle,f=a[g]),d?f:parseInt(f,10)||0},E=function(a){return a.length&&a[0]&&(a[0].nodeType&&a[0].style&&!a.nodeType||a[0].length&&a[0][0])?!0:!1},N=function(c){var g,a,d,f=[],h=c.length;for(g=0;h>g;g++){if(a=c[g],E(a)){for(d=a.length,d=0;a.length>d;d++){f.push(a[d])}}else{f.push(a)}}return f},q=")eefec303079ad17405c",L=/(?:<br>|<br\/>|<br \/>)/gi,A=C.all&&!C.addEventListener,I="<div style='position:relative;display:inline-block;"+(A?"*display:inline;*zoom:1;'":"'"),D=function(c){c=c||"";var d=-1!==c.indexOf("++"),a=1;return d&&(c=c.split("++").join("")),function(){return I+(c?" class='"+c+(d?a++:"")+"'>":">")}},K=x.SplitText=J.SplitText=function(a,c){if("string"==typeof a&&(a=K.selector(a)),!a){throw"cannot split a null element."}this.elements=E(a)?N(a):[a],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=c||{},this.split(c)},H=function(c,f,a){var d=c.nodeType;if(1===d||9===d||11===d){for(c=c.firstChild;c;c=c.nextSibling){H(c,f,a)}}else{(3===d||4===d)&&(c.nodeValue=c.nodeValue.split(f).join(a))}},k=function(c,d){for(var a=d.length;--a>-1;){c.push(d[a])}},j=function(ay,aI,aG,az,aC){L.test(ay.innerHTML)&&(ay.innerHTML=ay.innerHTML.replace(L,q));var aD,aL,aB,aH,aJ,av,u,ax,aK,aw,ac,v,ap,aE,aa=z(ay),ar=aI.type||aI.split||"chars,words,lines",ad=-1!==ar.indexOf("lines")?[]:null,ao=-1!==ar.indexOf("words"),af=-1!==ar.indexOf("chars"),ag="absolute"===aI.position||aI.absolute===!0,au=ag?"&#173; ":" ",aj=-999,an=M(ay),ae=G(ay,"paddingLeft",an),am=G(ay,"borderBottomWidth",an)+G(ay,"borderTopWidth",an),g=G(ay,"borderLeftWidth",an)+G(ay,"borderRightWidth",an),r=G(ay,"paddingTop",an)+G(ay,"paddingBottom",an),aq=G(ay,"paddingLeft",an)+G(ay,"paddingRight",an),aF=G(ay,"textAlign",an,!0),c=ay.clientHeight,aA=ay.clientWidth,al="</div>",n=D(aI.wordsClass),ab=D(aI.charsClass),m=-1!==(aI.linesClass||"").indexOf("++"),ak=aI.linesClass,a=-1!==aa.indexOf("<"),at=!0,ah=[],ai=[],h=[];for(m&&(ak=ak.split("++").join("")),a&&(aa=aa.split("<").join("{{LT}}")),aD=aa.length,aH=n(),aJ=0;aD>aJ;aJ++){if(u=aa.charAt(aJ),")"===u&&aa.substr(aJ,20)===q){aH+=(at?al:"")+"<BR/>",at=!1,aJ!==aD-20&&aa.substr(aJ+20,20)!==q&&(aH+=" "+n(),at=!0),aJ+=19}else{if(" "===u&&" "!==aa.charAt(aJ-1)&&aJ!==aD-1&&aa.substr(aJ-20,20)!==q){for(aH+=at?al:"",at=!1;" "===aa.charAt(aJ+1);){aH+=au,aJ++}(")"!==aa.charAt(aJ+1)||aa.substr(aJ+1,20)!==q)&&(aH+=au+n(),at=!0)}else{aH+=af&&" "!==u?ab()+u+"</div>":u}}}for(ay.innerHTML=aH+(at?al:""),a&&H(ay,"{{LT}}","<"),av=ay.getElementsByTagName("*"),aD=av.length,ax=[],aJ=0;aD>aJ;aJ++){ax[aJ]=av[aJ]}if(ad||ag){for(aJ=0;aD>aJ;aJ++){aK=ax[aJ],aB=aK.parentNode===ay,(aB||ag||af&&!ao)&&(aw=aK.offsetTop,ad&&aB&&aw!==aj&&"BR"!==aK.nodeName&&(aL=[],ad.push(aL),aj=aw),ag&&(aK._x=aK.offsetLeft,aK._y=aw,aK._w=aK.offsetWidth,aK._h=aK.offsetHeight),ad&&(ao!==aB&&af||(aL.push(aK),aK._x-=ae),aB&&aJ&&(ax[aJ-1]._wordEnd=!0),"BR"===aK.nodeName&&aK.nextSibling&&"BR"===aK.nextSibling.nodeName&&ad.push([])))}}for(aJ=0;aD>aJ;aJ++){aK=ax[aJ],aB=aK.parentNode===ay,"BR"!==aK.nodeName?(ag&&(v=aK.style,ao||aB||(aK._x+=aK.parentNode._x,aK._y+=aK.parentNode._y),v.left=aK._x+"px",v.top=aK._y+"px",v.position="absolute",v.display="block",v.width=aK._w+1+"px",v.height=aK._h+"px"),ao?aB&&""!==aK.innerHTML?ai.push(aK):af&&ah.push(aK):aB?(ay.removeChild(aK),ax.splice(aJ--,1),aD--):!aB&&af&&(aw=!ad&&!ag&&aK.nextSibling,ay.appendChild(aK),aw||ay.appendChild(C.createTextNode(" ")),ah.push(aK))):ad||ag?(ay.removeChild(aK),ax.splice(aJ--,1),aD--):ao||ay.appendChild(aK)}if(ad){for(ag&&(ac=C.createElement("div"),ay.appendChild(ac),ap=ac.offsetWidth+"px",aw=ac.offsetParent===ay?0:ay.offsetLeft,ay.removeChild(ac)),v=ay.style.cssText,ay.style.cssText="display:none;";ay.firstChild;){ay.removeChild(ay.firstChild)}for(aE=!ag||!ao&&!af,aJ=0;ad.length>aJ;aJ++){for(aL=ad[aJ],ac=C.createElement("div"),ac.style.cssText="display:block;text-align:"+aF+";position:"+(ag?"absolute;":"relative;"),ak&&(ac.className=ak+(m?aJ+1:"")),h.push(ac),aD=aL.length,av=0;aD>av;av++){"BR"!==aL[av].nodeName&&(aK=aL[av],ac.appendChild(aK),aE&&(aK._wordEnd||ao)&&ac.appendChild(C.createTextNode(" ")),ag&&(0===av&&(ac.style.top=aK._y+"px",ac.style.left=ae+aw+"px"),aK.style.top="0px",aw&&(aK.style.left=aK._x-aw+"px")))}0===aD&&(ac.innerHTML="&nbsp;"),ao||af||(ac.innerHTML=z(ac).split(String.fromCharCode(160)).join(" ")),ag&&(ac.style.width=ap,ac.style.height=aK._h+"px"),ay.appendChild(ac)}ay.style.cssText=v}ag&&(c>ay.clientHeight&&(ay.style.height=c-r+"px",c>ay.clientHeight&&(ay.style.height=c+am+"px")),aA>ay.clientWidth&&(ay.style.width=aA-aq+"px",aA>ay.clientWidth&&(ay.style.width=aA+g+"px"))),k(aG,ah),k(az,ai),k(aC,h)},b=K.prototype;b.split=function(a){this.isSplit&&this.revert(),this.vars=a||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var c=this.elements.length;--c>-1;){this._originals[c]=this.elements[c].innerHTML,j(this.elements[c],this.vars,this.chars,this.words,this.lines)}return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},b.revert=function(){if(!this._originals){throw"revert() call wasn't scoped properly."}for(var a=this._originals.length;--a>-1;){this.elements[a].innerHTML=this._originals[a]}return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},K.selector=w.$||w.jQuery||function(c){var a=w.$||w.jQuery;return a?(K.selector=a,a(c)):"undefined"==typeof document?c:document.querySelectorAll?document.querySelectorAll(c):document.getElementById("#"===c.charAt(0)?c.substr(1):c)},K.version="0.3.3"})(_gsScope),function(a){var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"function"==typeof define&&define.amd?define(["TweenLite"],b):"undefined"!=typeof module&&module.exports&&(module.exports=b())}("SplitText");try{window.GreenSockGlobals=null;window._gsQueue=null;window._gsDefine=null;delete (window.GreenSockGlobals);delete (window._gsQueue);delete (window._gsDefine)}catch(e){}try{window.GreenSockGlobals=oldgs;window._gsQueue=oldgs_queue}catch(e){}if(window.tplogs==true){try{console.groupEnd()}catch(e){}}(function(b,a){b.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]};b.expr[":"].uncached=function(c){var d=document.createElement("img");d.src=c.src;return b(c).is('img[src!=""]')&&!d.complete};b.fn.waitForImages=function(c,f,d){if(b.isPlainObject(arguments[0])){f=c.each;d=c.waitForAll;c=c.finished}c=c||b.noop;f=f||b.noop;d=!!d;if(!b.isFunction(c)||!b.isFunction(f)){throw new TypeError("An invalid callback was supplied.")}return this.each(function(){var j=b(this),k=[];if(d){var n=b.waitForImages.hasImageProperties||[],h=/url\((['"]?)(.*?)\1\)/g;j.find("*").each(function(){var i=b(this);if(i.is("img:uncached")){k.push({src:i.attr("src"),element:i[0]})}b.each(n,function(p,q){var o=i.css(q);if(!o){return true}var l;while(l=h.exec(o)){k.push({src:l[2],element:i[0]})}})})}else{j.find("img:uncached").each(function(){k.push({src:this.src,element:this})})}var m=k.length,g=0;if(m==0){c.call(j[0])}b.each(k,function(l,i){var p=new Image;b(p).bind("load error",function(o){g++;f.call(i.element,g,m,o.type=="load");if(g==m){c.call(j[0]);return false}});p.src=i.src})})}})(jQuery);function revslider_showDoubleJqueryError(b){var a="Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";a+="<br> This includes make eliminates the revolution slider libraries, and make it not work.";a+="<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";a+="<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";a="<span style='font-size:16px;color:#BC0C06;'>"+a+"</span>";jQuery(b).show().html(a)}(function(a2,aK){function aR(){var a=false;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)){if(navigator.userAgent.match(/OS 4_\d like Mac OS X/i)){a=true}}else{a=false}return a}function aM(G,R){if(G==aK){return false}if(G.data("aimg")!=aK){if(G.data("aie8")=="enabled"&&a6(8)||G.data("amobile")=="enabled"&&aq()){G.html('<img class="tp-slider-alternative-image" src="'+G.data("aimg")+'">')}}if(R.navigationStyle=="preview1"||R.navigationStyle=="preview3"||R.navigationStyle=="preview4"){R.soloArrowLeftHalign="left";R.soloArrowLeftValign="center";R.soloArrowLeftHOffset=0;R.soloArrowLeftVOffset=0;R.soloArrowRightHalign="right";R.soloArrowRightValign="center";R.soloArrowRightHOffset=0;R.soloArrowRightVOffset=0;R.navigationArrows="solo"}if(R.simplifyAll=="on"&&(a6(8)||aR())){G.find(".tp-caption").each(function(){var b=a2(this);b.removeClass("customin").removeClass("customout").addClass("fadein").addClass("fadeout");b.data("splitin","");b.data("speed",400)});G.find(">ul>li").each(function(){var b=a2(this);b.data("transition","fade");b.data("masterspeed",500);b.data("slotamount",1);var f=b.find(">img").first();f.data("kenburns","off")})}R.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);if(R.fullWidth!="on"&&R.fullScreen!="on"){R.autoHeight="off"}if(R.fullScreen=="on"){R.autoHeight="on"}if(R.fullWidth!="on"&&R.fullScreen!="on"){forceFulWidth="off"}if(R.fullWidth=="on"&&R.autoHeight=="off"){G.css({maxHeight:R.startheight+"px"})}if(aq()&&R.hideThumbsOnMobile=="on"&&R.navigationType=="thumb"){R.navigationType="none"}if(aq()&&R.hideBulletsOnMobile=="on"&&R.navigationType=="bullet"){R.navigationType="none"}if(aq()&&R.hideBulletsOnMobile=="on"&&R.navigationType=="both"){R.navigationType="none"}if(aq()&&R.hideArrowsOnMobile=="on"){R.navigationArrows="none"}if(R.forceFullWidth=="on"&&G.closest(".forcefullwidth_wrapper_tp_banner").length==0){var V=G.parent().offset().left;var s=G.parent().css("marginBottom");var K=G.parent().css("marginTop");if(s==aK){s=0}if(K==aK){K=0}G.parent().wrap('<div style="position:relative;width:100%;height:auto;margin-top:'+K+";margin-bottom:"+s+'" class="forcefullwidth_wrapper_tp_banner"></div>');G.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:'+G.height()+'px"></div>');G.css({backgroundColor:G.parent().css("backgroundColor"),backgroundImage:G.parent().css("backgroundImage")});G.parent().css({left:0-V+"px",position:"absolute",width:a2(window).width()});R.width=a2(window).width()}try{if(R.hideThumbsUnderResolution>a2(window).width()&&R.hideThumbsUnderResolution!=0){G.parent().find(".tp-bullets.tp-thumbs").css({display:"none"})}else{G.parent().find(".tp-bullets.tp-thumbs").css({display:"block"})}}catch(U){}if(!G.hasClass("revslider-initialised")){G.addClass("revslider-initialised");if(G.attr("id")==aK){G.attr("id","revslider-"+Math.round(Math.random()*1000+5))}R.firefox13=false;R.ie=!a2.support.opacity;R.ie9=document.documentMode==9;R.origcd=R.delay;var W=a2.fn.jquery.split("."),q=parseFloat(W[0]),u=parseFloat(W[1]),c=parseFloat(W[2]||"0");if(q==1&&u<7){G.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+W+" <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")}if(q>1){R.ie=false}if(!a2.support.transition){a2.fn.transition=a2.fn.animate}G.find(".caption").each(function(){a2(this).addClass("tp-caption")});if(aq()){G.find(".tp-caption").each(function(){var b=a2(this);if(b.data("autoplayonlyfirsttime")==true||b.data("autoplayonlyfirsttime")=="true"){b.data("autoplayonlyfirsttime","false")}if(b.data("autoplay")==true||b.data("autoplay")=="true"){b.data("autoplay",false)}})}var o=0;var a=0;var z=0;var N="http";if(location.protocol==="https:"){N="https"}G.find(".tp-caption").each(function(v){try{if((a2(this).data("ytid")!=aK||a2(this).find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&o==0){o=1;var k=document.createElement("script");var g="https";k.src=g+"://www.youtube.com/iframe_api";var j=document.getElementsByTagName("script")[0];var m=true;a2("head").find("*").each(function(){if(a2(this).attr("src")==g+"://www.youtube.com/iframe_api"){m=false}});if(m){j.parentNode.insertBefore(k,j)}}}catch(f){}try{if((a2(this).data("vimeoid")!=aK||a2(this).find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&a==0){a=1;var b=document.createElement("script");b.src=N+"://a.vimeocdn.com/js/froogaloop2.min.js";var j=document.getElementsByTagName("script")[0];var m=true;a2("head").find("*").each(function(){if(a2(this).attr("src")==N+"://a.vimeocdn.com/js/froogaloop2.min.js"){m=false}});if(m){j.parentNode.insertBefore(b,j)}}}catch(f){}try{if(a2(this).data("videomp4")!=aK||a2(this).data("videowebm")!=aK){}}catch(f){}});G.find(".tp-caption video").each(function(b){a2(this).removeClass("video-js").removeClass("vjs-default-skin");a2(this).attr("preload","");a2(this).css({display:"none"})});G.find(">ul:first-child >li").each(function(){var b=a2(this);b.data("origindex",b.index())});if(R.shuffle=="on"){var n=new Object,J=G.find(">ul:first-child >li:first-child");n.fstransition=J.data("fstransition");n.fsmasterspeed=J.data("fsmasterspeed");n.fsslotamount=J.data("fsslotamount");for(var h=0;h<G.find(">ul:first-child >li").length;h++){var l=Math.round(Math.random()*G.find(">ul:first-child >li").length);G.find(">ul:first-child >li:eq("+l+")").prependTo(G.find(">ul:first-child"))}var X=G.find(">ul:first-child >li:first-child");X.data("fstransition",n.fstransition);X.data("fsmasterspeed",n.fsmasterspeed);X.data("fsslotamount",n.fsslotamount)}R.slots=4;R.act=-1;R.next=0;if(R.startWithSlide!=aK){R.next=R.startWithSlide}var y=aQ("#")[0];if(y.length<9){if(y.split("slide").length>1){var d=parseInt(y.split("slide")[1],0);if(d<1){d=1}if(d>G.find(">ul:first >li").length){d=G.find(">ul:first >li").length}R.next=d-1}}R.firststart=1;if(R.navigationHOffset==aK){R.navOffsetHorizontal=0}if(R.navigationVOffset==aK){R.navOffsetVertical=0}G.append('<div class="tp-loader '+R.spinner+'"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');if(G.find(".tp-bannertimer").length==0){G.append('<div class="tp-bannertimer" style="visibility:hidden"></div>')}var p=G.find(".tp-bannertimer");if(p.length>0){p.css({width:"0%"})}G.addClass("tp-simpleresponsive");R.container=G;R.slideamount=G.find(">ul:first >li").length;if(G.height()==0){G.height(R.startheight)}if(R.startwidth==aK||R.startwidth==0){R.startwidth=G.width()}if(R.startheight==aK||R.startheight==0){R.startheight=G.height()}R.width=G.width();R.height=G.height();R.bw=R.startwidth/G.width();R.bh=R.startheight/G.height();if(R.width!=R.startwidth){R.height=Math.round(R.startheight*(R.width/R.startwidth));G.height(R.height)}if(R.shadow!=0){G.parent().append('<div class="tp-bannershadow tp-shadow'+R.shadow+'"></div>');var V=0;if(R.forceFullWidth=="on"){V=0-R.container.parent().offset().left}G.parent().find(".tp-bannershadow").css({width:R.width,left:V})}G.find("ul").css({display:"none"});var I=G;G.find("ul").css({display:"block"});aF(G,R);if(R.parallax!="off"){aO(G,R)}if(R.slideamount>1){aT(G,R)}if(R.slideamount>1&&R.navigationType=="thumb"){aV(G,R)}if(R.slideamount>1){a4(G,R)}if(R.keyboardNavigation=="on"){aY(G,R)}aP(G,R);if(R.hideThumbs>0){a3(G,R)}setTimeout(function(){am(G,R)},R.startDelay);R.startDelay=0;if(R.slideamount>1){aD(G,R)}setTimeout(function(){G.trigger("revolution.slide.onloaded")},500);a2("body").data("rs-fullScreenMode",false);a2(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange",function(){a2("body").data("rs-fullScreenMode",!a2("body").data("rs-fullScreenMode"));if(a2("body").data("rs-fullScreenMode")){setTimeout(function(){a2(window).trigger("resize")},200)}});var Q="resize.revslider-"+G.attr("id");a2(window).on(Q,function(){if(G==aK){return false}if(a2("body").find(G)!=0){if(R.forceFullWidth=="on"){var b=R.container.closest(".forcefullwidth_wrapper_tp_banner").offset().left;R.container.parent().css({left:0-b+"px",width:a2(window).width()})}}if(G.outerWidth(true)!=R.width||G.is(":hidden")){aJ(G,R)}});try{if(R.hideThumbsUnderResoluition!=0&&R.navigationType=="thumb"){if(R.hideThumbsUnderResoluition>a2(window).width()){a2(".tp-bullets").css({display:"none"})}else{a2(".tp-bullets").css({display:"block"})}}}catch(U){}G.find(".tp-scrollbelowslider").on("click",function(){var b=0;try{b=a2("body").find(R.fullScreenOffsetContainer).height()}catch(f){}try{b=b-parseInt(a2(this).data("scrolloffset"),0)}catch(f){}a2("body,html").animate({scrollTop:G.offset().top+G.find(">ul >li").height()-b+"px"},{duration:400})});var t=G.parent();if(a2(window).width()<R.hideSliderAtLimit){G.trigger("stoptimer");if(t.css("display")!="none"){t.data("olddisplay",t.css("display"))}t.css({display:"none"})}aL(G,R)}}a2.fn.extend({revolution:function(b){var a={delay:9000,startheight:500,startwidth:960,fullScreenAlignForce:"off",autoHeight:"off",hideTimerBar:"off",hideThumbs:200,hideNavDelayOnMobile:1500,thumbWidth:100,thumbHeight:50,thumbAmount:3,navigationType:"bullet",navigationArrows:"solo",navigationInGrid:"off",hideThumbsOnMobile:"off",hideBulletsOnMobile:"off",hideArrowsOnMobile:"off",hideThumbsUnderResoluition:0,navigationStyle:"round",navigationHAlign:"center",navigationVAlign:"bottom",navigationHOffset:0,navigationVOffset:20,soloArrowLeftHalign:"left",soloArrowLeftValign:"center",soloArrowLeftHOffset:20,soloArrowLeftVOffset:0,soloArrowRightHalign:"right",soloArrowRightValign:"center",soloArrowRightHOffset:20,soloArrowRightVOffset:0,keyboardNavigation:"on",touchenabled:"on",onHoverStop:"on",stopAtSlide:-1,stopAfterLoops:-1,hideCaptionAtLimit:0,hideAllCaptionAtLimit:0,hideSliderAtLimit:0,shadow:0,fullWidth:"off",fullScreen:"off",minFullScreenHeight:0,fullScreenOffsetContainer:"",fullScreenOffset:"0",dottedOverlay:"none",forceFullWidth:"off",spinner:"spinner0",swipe_treshold:75,swipe_min_touches:1,drag_block_vertical:false,isJoomla:false,parallax:"off",parallaxLevels:[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],parallaxBgFreeze:"off",parallaxOpacity:"on",parallaxDisableOnMobile:"off",panZoomDisableOnMobile:"off",simplifyAll:"on",minHeight:0,nextSlideOnWindowFocus:"off",startDelay:0};b=a2.extend({},a,b);return this.each(function(){if(window.tplogs==true){try{console.groupCollapsed("Slider Revolution 4.6.3 Initialisation on "+a2(this).attr("id"));console.groupCollapsed("Used Options:");console.info(b);console.groupEnd();console.groupCollapsed("Tween Engine:")}catch(c){}}if(punchgs.TweenLite==aK){if(window.tplogs==true){try{console.error("GreenSock Engine Does not Exist!")}catch(c){}}return false}punchgs.force3D=true;if(window.tplogs==true){try{console.info("GreenSock Engine Version in Slider Revolution:"+punchgs.TweenLite.version)}catch(c){}}if(b.simplifyAll=="on"){}else{punchgs.TweenLite.lagSmoothing(1000,16);punchgs.force3D="true"}if(window.tplogs==true){try{console.groupEnd();console.groupEnd()}catch(c){}}aM(a2(this),b)})},revscroll:function(a){return this.each(function(){var b=a2(this);if(b!=aK&&b.length>0&&a2("body").find("#"+b.attr("id")).length>0){a2("body,html").animate({scrollTop:b.offset().top+b.find(">ul >li").height()-a+"px"},{duration:400})}})},revredraw:function(a){return this.each(function(){var d=a2(this);if(d!=aK&&d.length>0&&a2("body").find("#"+d.attr("id")).length>0){var c=d.parent().find(".tp-bannertimer");var b=c.data("opt");aJ(d,b)}})},revkill:function(j){var g=this,d=a2(this);if(d!=aK&&d.length>0&&a2("body").find("#"+d.attr("id")).length>0){d.data("conthover",1);d.data("conthover-changed",1);d.trigger("revolution.slide.onpause");var f=d.parent().find(".tp-bannertimer");var h=f.data("opt");h.bannertimeronpause=true;d.trigger("stoptimer");punchgs.TweenLite.killTweensOf(d.find("*"),false);punchgs.TweenLite.killTweensOf(d,false);d.unbind("hover, mouseover, mouseenter,mouseleave, resize");var c="resize.revslider-"+d.attr("id");a2(window).off(c);d.find("*").each(function(){var a=a2(this);a.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer");a.off("on, hover, mouseenter,mouseleave,mouseover, resize");a.data("mySplitText",null);a.data("ctl",null);if(a.data("tween")!=aK){a.data("tween").kill()}if(a.data("kenburn")!=aK){a.data("kenburn").kill()}a.remove();a.empty();a=null});punchgs.TweenLite.killTweensOf(d.find("*"),false);punchgs.TweenLite.killTweensOf(d,false);f.remove();try{d.closest(".forcefullwidth_wrapper_tp_banner").remove()}catch(b){}try{d.closest(".rev_slider_wrapper").remove()}catch(b){}try{d.remove()}catch(b){}d.empty();d.html();d=null;h=null;delete g.container;delete g.opt;return true}else{return false}},revpause:function(a){return this.each(function(){var d=a2(this);if(d!=aK&&d.length>0&&a2("body").find("#"+d.attr("id")).length>0){d.data("conthover",1);d.data("conthover-changed",1);d.trigger("revolution.slide.onpause");var c=d.parent().find(".tp-bannertimer");var b=c.data("opt");b.bannertimeronpause=true;d.trigger("stoptimer")}})},revresume:function(a){return this.each(function(){var d=a2(this);if(d!=aK&&d.length>0&&a2("body").find("#"+d.attr("id")).length>0){d.data("conthover",0);d.data("conthover-changed",1);d.trigger("revolution.slide.onresume");var c=d.parent().find(".tp-bannertimer");var b=c.data("opt");b.bannertimeronpause=false;d.trigger("starttimer")}})},revnext:function(a){return this.each(function(){var b=a2(this);if(b!=aK&&b.length>0&&a2("body").find("#"+b.attr("id")).length>0){b.parent().find(".tp-rightarrow").click()}})},revprev:function(a){return this.each(function(){var b=a2(this);if(b!=aK&&b.length>0&&a2("body").find("#"+b.attr("id")).length>0){b.parent().find(".tp-leftarrow").click()}})},revmaxslide:function(a){return a2(this).find(">ul:first-child >li").length},revcurrentslide:function(d){var c=a2(this);if(c!=aK&&c.length>0&&a2("body").find("#"+c.attr("id")).length>0){var a=c.parent().find(".tp-bannertimer");var b=a.data("opt");return b.act}},revlastslide:function(d){var c=a2(this);if(c!=aK&&c.length>0&&a2("body").find("#"+c.attr("id")).length>0){var a=c.parent().find(".tp-bannertimer");var b=a.data("opt");return b.lastslide}},revshowslide:function(a){return this.each(function(){var b=a2(this);if(b!=aK&&b.length>0&&a2("body").find("#"+b.attr("id")).length>0){b.data("showus",a);b.parent().find(".tp-rightarrow").click()}})}});var aX=function(){var b,a,c={hidden:"visibilitychange",webkitHidden:"webkitvisibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange"};for(b in c){if(b in document){a=c[b];break}}return function(d){if(d){document.addEventListener(a,d)}return !document[b]}}();var aL=function(d,c){var a=document.documentMode===aK,b=window.chrome;if(a&&!b){a2(window).on("focusin",function(){if(d==aK){return false}setTimeout(function(){if(c.nextSlideOnWindowFocus=="on"){d.revnext()}d.revredraw()},300)}).on("focusout",function(){})}else{if(window.addEventListener){window.addEventListener("focus",function(f){if(d==aK){return false}setTimeout(function(){if(c.nextSlideOnWindowFocus=="on"){d.revnext()}d.revredraw()},300)},false);window.addEventListener("blur",function(f){},false)}else{window.attachEvent("focus",function(f){setTimeout(function(){if(d==aK){return false}if(c.nextSlideOnWindowFocus=="on"){d.revnext()}d.revredraw()},300)});window.attachEvent("blur",function(f){})}}};var aQ=function(d){var b=[],f;var c=window.location.href.slice(window.location.href.indexOf(d)+1).split("_");for(var a=0;a<c.length;a++){c[a]=c[a].replace("%3D","=");f=c[a].split("=");b.push(f[0]);b[f[0]]=f[1]}return b};var aJ=function(g,b){if(g==aK){return false}try{if(b.hideThumbsUnderResoluition!=0&&b.navigationType=="thumb"){if(b.hideThumbsUnderResoluition>a2(window).width()){a2(".tp-bullets").css({display:"none"})}else{a2(".tp-bullets").css({display:"block"})}}}catch(j){}g.find(".defaultimg").each(function(a){aZ(a2(this),b)});var q=g.parent();if(a2(window).width()<b.hideSliderAtLimit){g.trigger("stoptimer");if(q.css("display")!="none"){q.data("olddisplay",q.css("display"))}q.css({display:"none"})}else{if(g.is(":hidden")){if(q.data("olddisplay")!=aK&&q.data("olddisplay")!="undefined"&&q.data("olddisplay")!="none"){q.css({display:q.data("olddisplay")})}else{q.css({display:"block"})}g.trigger("restarttimer");setTimeout(function(){aJ(g,b)},150)}}var d=0;if(b.forceFullWidth=="on"){d=0-b.container.parent().offset().left}try{g.parent().find(".tp-bannershadow").css({width:b.width,left:d})}catch(j){}var p=g.find(">ul >li:eq("+b.act+") .slotholder");var k=g.find(">ul >li:eq("+b.next+") .slotholder");aw(g,b,g);punchgs.TweenLite.set(k.find(".defaultimg"),{opacity:0});p.find(".defaultimg").css({opacity:1});k.find(".defaultimg").each(function(){var a=a2(this);if(b.panZoomDisableOnMobile=="on"){}else{if(a.data("kenburn")!=aK){a.data("kenburn").restart();aj(g,b,true)}}});var h=g.find(">ul >li:eq("+b.next+")");var m=g.parent().find(".tparrows");if(m.hasClass("preview2")){m.css({width:parseInt(m.css("minWidth"),0)})}aW(h,b,true);aI(g,b)};var a6=function(b,d){var c=a2('<div style="display:none;"/>').appendTo(a2("body"));c.html("<!--[if "+(d||"")+" IE "+(b||"")+"]><a>&nbsp;</a><![endif]-->");var a=c.find("a").length;c.remove();return a};var a1=function(b,a){if(b.next==a.find(">ul >li").length-1){b.looptogo=b.looptogo-1;if(b.looptogo<=0){b.stopLoop="on"}}am(a,b)};var aT=function(b,d){var c="hidebullets";if(d.hideThumbs==0){c=""}if(d.navigationType=="bullet"||d.navigationType=="both"){b.parent().append('<div class="tp-bullets '+c+" simplebullets "+d.navigationStyle+'"></div>')}var a=b.parent().find(".tp-bullets");b.find(">ul:first >li").each(function(g){var h=b.find(">ul:first >li:eq("+g+") img:first").attr("src");a.append('<div class="bullet"></div>');var f=a.find(".bullet:first")});a.find(".bullet").each(function(g){var f=a2(this);if(g==d.slideamount-1){f.addClass("last")}if(g==0){f.addClass("first")}f.click(function(){var i=false,h=f.index();if(d.navigationArrows=="withbullet"||d.navigationArrows=="nexttobullets"){h=f.index()-1}if(h==d.act){i=true}if(d.transition==0&&!i){d.next=h;a1(d,b)}})});a.append('<div class="tpclear"></div>');aI(b,d)};var a4=function(f,h){function a(i){f.parent().append('<div style="'+b+'" class="tp-'+i+"arrow "+c+" tparrows "+g+'"><div class="tp-arr-allwrapper"><div class="tp-arr-iwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-imgholder2"></div><div class="tp-arr-titleholder"></div><div class="tp-arr-subtitleholder"></div></div></div></div>')}var d=f.find(".tp-bullets"),b="",c="hidearrows",g=h.navigationStyle;if(h.hideThumbs==0){c=""}if(h.navigationArrows=="none"){b="visibility:hidden;display:none"}h.soloArrowStyle="default "+h.navigationStyle;if(h.navigationArrows!="none"&&h.navigationArrows!="nexttobullets"){g=h.soloArrowStyle}a("left");a("right");f.parent().find(".tp-rightarrow").click(function(){if(h.transition==0){if(f.data("showus")!=aK&&f.data("showus")!=-1){h.next=f.data("showus")-1}else{h.next=h.next+1}f.data("showus",-1);if(h.next>=h.slideamount){h.next=0}if(h.next<0){h.next=0}if(h.act!=h.next){a1(h,f)}}});f.parent().find(".tp-leftarrow").click(function(){if(h.transition==0){h.next=h.next-1;h.leftarrowpressed=1;if(h.next<0){h.next=h.slideamount-1}a1(h,f)}});aI(f,h)};var aY=function(b,a){a2(document).keydown(function(c){if(a.transition==0&&c.keyCode==39){if(b.data("showus")!=aK&&b.data("showus")!=-1){a.next=b.data("showus")-1}else{a.next=a.next+1}b.data("showus",-1);if(a.next>=a.slideamount){a.next=0}if(a.next<0){a.next=0}if(a.act!=a.next){a1(a,b)}}if(a.transition==0&&c.keyCode==37){a.next=a.next-1;a.leftarrowpressed=1;if(a.next<0){a.next=a.slideamount-1}a1(a,b)}});aI(b,a)};var aP=function(a,c){var b="vertical";if(c.touchenabled=="on"){if(c.drag_block_vertical==true){b="none"}a.swipe({allowPageScroll:b,fingers:c.swipe_min_touches,treshold:c.swipe_treshold,swipe:function(h,j,k,g,f,d){switch(j){case"left":if(c.transition==0){c.next=c.next+1;if(c.next==c.slideamount){c.next=0}a1(c,a)}break;case"right":if(c.transition==0){c.next=c.next-1;c.leftarrowpressed=1;if(c.next<0){c.next=c.slideamount-1}a1(c,a)}break;case"up":if(b=="none"){a2("html, body").animate({scrollTop:a.offset().top+a.height()+"px"})}break;case"down":if(b=="none"){a2("html, body").animate({scrollTop:a.offset().top-a2(window).height()+"px"})}break}}})}};var a3=function(d,b){var f=d.parent().find(".tp-bullets"),c=d.parent().find(".tparrows");if(f==null){d.append('<div class=".tp-bullets"></div>');var f=d.parent().find(".tp-bullets")}if(c==null){d.append('<div class=".tparrows"></div>');var c=d.parent().find(".tparrows")}d.data("hideThumbs",b.hideThumbs);f.addClass("hidebullets");c.addClass("hidearrows");if(aq()){try{d.hammer().on("touch",function(){d.addClass("hovered");if(b.onHoverStop=="on"){d.trigger("stoptimer")}clearTimeout(d.data("hideThumbs"));f.removeClass("hidebullets");c.removeClass("hidearrows")});d.hammer().on("release",function(){d.removeClass("hovered");d.trigger("starttimer");if(!d.hasClass("hovered")&&!f.hasClass("hovered")){d.data("hideThumbs",setTimeout(function(){f.addClass("hidebullets");c.addClass("hidearrows");d.trigger("starttimer")},b.hideNavDelayOnMobile))}})}catch(a){}}else{f.hover(function(){b.overnav=true;if(b.onHoverStop=="on"){d.trigger("stoptimer")}f.addClass("hovered");clearTimeout(d.data("hideThumbs"));f.removeClass("hidebullets");c.removeClass("hidearrows")},function(){b.overnav=false;d.trigger("starttimer");f.removeClass("hovered");if(!d.hasClass("hovered")&&!f.hasClass("hovered")){d.data("hideThumbs",setTimeout(function(){f.addClass("hidebullets");c.addClass("hidearrows")},b.hideThumbs))}});c.hover(function(){b.overnav=true;if(b.onHoverStop=="on"){d.trigger("stoptimer")}f.addClass("hovered");clearTimeout(d.data("hideThumbs"));f.removeClass("hidebullets");c.removeClass("hidearrows")},function(){b.overnav=false;d.trigger("starttimer");f.removeClass("hovered")});d.on("mouseenter",function(){d.addClass("hovered");if(b.onHoverStop=="on"){d.trigger("stoptimer")}clearTimeout(d.data("hideThumbs"));f.removeClass("hidebullets");c.removeClass("hidearrows")});d.on("mouseleave",function(){d.removeClass("hovered");d.trigger("starttimer");if(!d.hasClass("hovered")&&!f.hasClass("hovered")){d.data("hideThumbs",setTimeout(function(){f.addClass("hidebullets");c.addClass("hidearrows")},b.hideThumbs))}})}};var aI=function(B,H){var D=B.parent();var K=D.find(".tp-bullets");if(H.navigationType=="thumb"){K.find(".thumb").each(function(a){var b=a2(this);b.css({width:H.thumbWidth*H.bw+"px",height:H.thumbHeight*H.bh+"px"})});var C=K.find(".tp-mask");C.width(H.thumbWidth*H.thumbAmount*H.bw);C.height(H.thumbHeight*H.bh);C.parent().width(H.thumbWidth*H.thumbAmount*H.bw);C.parent().height(H.thumbHeight*H.bh)}var G=D.find(".tp-leftarrow");var z=D.find(".tp-rightarrow");if(H.navigationType=="thumb"&&H.navigationArrows=="nexttobullets"){H.navigationArrows="solo"}if(H.navigationArrows=="nexttobullets"){G.prependTo(K).css({"float":"left"});z.insertBefore(K.find(".tpclear")).css({"float":"left"})}var R=0;if(H.forceFullWidth=="on"){R=0-H.container.parent().offset().left}var N=0,J=0;if(H.navigationInGrid=="on"){N=B.width()>H.startwidth?(B.width()-H.startwidth)/2:0,J=B.height()>H.startheight?(B.height()-H.startheight)/2:0}if(H.navigationArrows!="none"&&H.navigationArrows!="nexttobullets"){var P=H.soloArrowLeftValign,L=H.soloArrowLeftHalign,F=H.soloArrowRightValign,O=H.soloArrowRightHalign,x=H.soloArrowLeftVOffset,I=H.soloArrowLeftHOffset,M=H.soloArrowRightVOffset,k=H.soloArrowRightHOffset;G.css({position:"absolute"});z.css({position:"absolute"});if(P=="center"){G.css({top:"50%",marginTop:x-Math.round(G.innerHeight()/2)+"px"})}else{if(P=="bottom"){G.css({top:"auto",bottom:0+x+"px"})}else{if(P=="top"){G.css({bottom:"auto",top:0+x+"px"})}}}if(L=="center"){G.css({left:"50%",marginLeft:R+I-Math.round(G.innerWidth()/2)+"px"})}else{if(L=="left"){G.css({left:N+I+R+"px"})}else{if(L=="right"){G.css({right:N+I-R+"px"})}}}if(F=="center"){z.css({top:"50%",marginTop:M-Math.round(z.innerHeight()/2)+"px"})}else{if(F=="bottom"){z.css({top:"auto",bottom:0+M+"px"})}else{if(F=="top"){z.css({bottom:"auto",top:0+M+"px"})}}}if(O=="center"){z.css({left:"50%",marginLeft:R+k-Math.round(z.innerWidth()/2)+"px"})}else{if(O=="left"){z.css({left:N+k+R+"px"})}else{if(O=="right"){z.css({right:N+k-R+"px"})}}}if(G.position()!=null){G.css({top:Math.round(parseInt(G.position().top,0))+"px"})}if(z.position()!=null){z.css({top:Math.round(parseInt(z.position().top,0))+"px"})}}if(H.navigationArrows=="none"){G.css({visibility:"hidden"});z.css({visibility:"hidden"})}var Q=H.navigationVAlign,q=H.navigationHAlign,A=H.navigationVOffset*H.bh,j=H.navigationHOffset*H.bw;if(Q=="center"){K.css({top:"50%",marginTop:A-Math.round(K.innerHeight()/2)+"px"})}if(Q=="bottom"){K.css({bottom:0+A+"px"})}if(Q=="top"){K.css({top:0+A+"px"})}if(q=="center"){K.css({left:"50%",marginLeft:R+j-Math.round(K.innerWidth()/2)+"px"})}if(q=="left"){K.css({left:0+j+R+"px"})}if(q=="right"){K.css({right:0+j-R+"px"})}};var aS=function(q){var b=q.container;q.beforli=q.next-1;q.comingli=q.next+1;if(q.beforli<0){q.beforli=q.slideamount-1}if(q.comingli>=q.slideamount){q.comingli=0}var x=b.find(">ul:first-child >li:eq("+q.comingli+")"),G=b.find(">ul:first-child >li:eq("+q.beforli+")"),k=G.find(".defaultimg").attr("src"),F=x.find(".defaultimg").attr("src");if(q.arr==aK){q.arr=b.parent().find(".tparrows"),q.rar=b.parent().find(".tp-rightarrow"),q.lar=b.parent().find(".tp-leftarrow"),q.raimg=q.rar.find(".tp-arr-imgholder"),q.laimg=q.lar.find(".tp-arr-imgholder"),q.raimg_b=q.rar.find(".tp-arr-imgholder2"),q.laimg_b=q.lar.find(".tp-arr-imgholder2"),q.ratit=q.rar.find(".tp-arr-titleholder"),q.latit=q.lar.find(".tp-arr-titleholder")}var D=q.arr,A=q.rar,w=q.lar,C=q.raimg,y=q.laimg,j=q.raimg_b,B=q.laimg_b,E=q.ratit,t=q.latit;if(x.data("title")!=aK){E.html(x.data("title"))}if(G.data("title")!=aK){t.html(G.data("title"))}if(A.hasClass("itishovered")){A.width(E.outerWidth(true)+parseInt(A.css("minWidth"),0))}if(w.hasClass("itishovered")){w.width(t.outerWidth(true)+parseInt(w.css("minWidth"),0))}if(D.hasClass("preview2")&&!D.hasClass("hashoveralready")){D.addClass("hashoveralready");if(!aq()){D.hover(function(){var a=a2(this),c=a.find(".tp-arr-titleholder");if(a2(window).width()>767){a.width(c.outerWidth(true)+parseInt(a.css("minWidth"),0))}a.addClass("itishovered")},function(){var a=a2(this),c=a.find(".tp-arr-titleholder");a.css({width:parseInt(a.css("minWidth"),0)});a.removeClass("itishovered")})}else{var D=a2(this),z=D.find(".tp-arr-titleholder");z.addClass("alwayshidden");punchgs.TweenLite.set(z,{autoAlpha:0})}}if(G.data("thumb")!=aK){k=G.data("thumb")}if(x.data("thumb")!=aK){F=x.data("thumb")}if(!D.hasClass("preview4")){punchgs.TweenLite.to(C,0.5,{autoAlpha:0,onComplete:function(){C.css({backgroundImage:"url("+F+")"});y.css({backgroundImage:"url("+k+")"})}});punchgs.TweenLite.to(y,0.5,{autoAlpha:0,onComplete:function(){punchgs.TweenLite.to(C,0.5,{autoAlpha:1,delay:0.2});punchgs.TweenLite.to(y,0.5,{autoAlpha:1,delay:0.2})}})}else{j.css({backgroundImage:"url("+F+")"});B.css({backgroundImage:"url("+k+")"});punchgs.TweenLite.fromTo(j,0.8,{force3D:punchgs.force3d,x:0},{x:-C.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){C.css({backgroundImage:"url("+F+")"});punchgs.TweenLite.set(j,{x:0})}});punchgs.TweenLite.fromTo(B,0.8,{force3D:punchgs.force3d,x:0},{x:C.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){y.css({backgroundImage:"url("+k+")"});punchgs.TweenLite.set(B,{x:0})}});punchgs.TweenLite.fromTo(C,0.8,{x:0},{force3D:punchgs.force3d,x:-C.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){punchgs.TweenLite.set(C,{x:0})}});punchgs.TweenLite.fromTo(y,0.8,{x:0},{force3D:punchgs.force3d,x:C.width(),ease:punchgs.Power3.easeOut,delay:1,onComplete:function(){punchgs.TweenLite.set(y,{x:0})}})}if(A.hasClass("preview4")&&!A.hasClass("hashoveralready")){A.addClass("hashoveralready");A.hover(function(){var a=a2(this).find(".tp-arr-iwrapper");var c=a2(this).find(".tp-arr-allwrapper");punchgs.TweenLite.fromTo(a,0.4,{x:a.width()},{x:0,delay:0.3,ease:punchgs.Power3.easeOut,overwrite:"all"});punchgs.TweenLite.to(c,0.2,{autoAlpha:1,overwrite:"all"})},function(){var a=a2(this).find(".tp-arr-iwrapper");var c=a2(this).find(".tp-arr-allwrapper");punchgs.TweenLite.to(a,0.4,{x:a.width(),ease:punchgs.Power3.easeOut,delay:0.2,overwrite:"all"});punchgs.TweenLite.to(c,0.2,{delay:0.6,autoAlpha:0,overwrite:"all"})});w.hover(function(){var a=a2(this).find(".tp-arr-iwrapper");var c=a2(this).find(".tp-arr-allwrapper");punchgs.TweenLite.fromTo(a,0.4,{x:0-a.width()},{x:0,delay:0.3,ease:punchgs.Power3.easeOut,overwrite:"all"});punchgs.TweenLite.to(c,0.2,{autoAlpha:1,overwrite:"all"})},function(){var a=a2(this).find(".tp-arr-iwrapper");var c=a2(this).find(".tp-arr-allwrapper");punchgs.TweenLite.to(a,0.4,{x:0-a.width(),ease:punchgs.Power3.easeOut,delay:0.2,overwrite:"all"});punchgs.TweenLite.to(c,0.2,{delay:0.6,autoAlpha:0,overwrite:"all"})})}};var aZ=function(g,d){d.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css({height:d.container.height()});d.container.closest(".rev_slider_wrapper").css({height:d.container.height()});d.width=parseInt(d.container.width(),0);d.height=parseInt(d.container.height(),0);d.bw=d.width/d.startwidth;d.bh=d.height/d.startheight;if(d.bh>d.bw){d.bh=d.bw}if(d.bh<d.bw){d.bw=d.bh}if(d.bw<d.bh){d.bh=d.bw}if(d.bh>1){d.bw=1;d.bh=1}if(d.bw>1){d.bw=1;d.bh=1}d.height=Math.round(d.startheight*(d.width/d.startwidth));if(d.height>d.startheight&&d.autoHeight!="on"){d.height=d.startheight}if(d.fullScreen=="on"){d.height=d.bw*d.startheight;var b=d.container.parent().width();var c=a2(window).height();if(d.fullScreenOffsetContainer!=aK){try{var f=d.fullScreenOffsetContainer.split(",");a2.each(f,function(h,i){c=c-a2(i).outerHeight(true);if(c<d.minFullScreenHeight){c=d.minFullScreenHeight}})}catch(a){}try{if(d.fullScreenOffset.split("%").length>1&&d.fullScreenOffset!=aK&&d.fullScreenOffset.length>0){c=c-a2(window).height()*parseInt(d.fullScreenOffset,0)/100}else{if(d.fullScreenOffset!=aK&&d.fullScreenOffset.length>0){c=c-parseInt(d.fullScreenOffset,0)}}if(c<d.minFullScreenHeight){c=d.minFullScreenHeight}}catch(a){}}d.container.parent().height(c);d.container.closest(".rev_slider_wrapper").height(c);d.container.css({height:"100%"});d.height=c;if(d.minHeight!=aK&&d.height<d.minHeight){d.height=d.minHeight}}else{if(d.minHeight!=aK&&d.height<d.minHeight){d.height=d.minHeight}d.container.height(d.height)}d.slotw=Math.ceil(d.width/d.slots);if(d.fullScreen=="on"){d.sloth=Math.ceil(a2(window).height()/d.slots)}else{d.sloth=Math.ceil(d.height/d.slots)}if(d.autoHeight=="on"){d.sloth=Math.ceil(g.height()/d.slots)}};var aF=function(b,a){b.find(".tp-caption").each(function(){a2(this).addClass(a2(this).data("transition"));a2(this).addClass("start")});b.find(">ul:first").css({overflow:"hidden",width:"100%",height:"100%",maxHeight:b.parent().css("maxHeight")}).addClass("tp-revslider-mainul");if(a.autoHeight=="on"){b.find(">ul:first").css({overflow:"hidden",width:"100%",height:"100%",maxHeight:"none"});b.css({maxHeight:"none"});b.parent().css({maxHeight:"none"})}b.find(">ul:first >li").each(function(j){var g=a2(this);g.addClass("tp-revslider-slidesli");g.css({width:"100%",height:"100%",overflow:"hidden"});if(g.data("link")!=aK){var h=g.data("link");var l="_self";var d=60;if(g.data("slideindex")=="back"){d=0}var c=checksl=g.data("linktoslide");if(c!=aK){if(c!="next"&&c!="prev"){b.find(">ul:first-child >li").each(function(){var f=a2(this);if(f.data("origindex")+1==checksl){c=f.index()+1}})}}if(g.data("target")!=aK){l=g.data("target")}if(h!="slide"){c="no"}var k='<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:'+d+';" data-x="center" data-y="center" data-linktoslide="'+c+'" data-start="0"><a style="width:100%;height:100%;display:block"';if(h!="slide"){k=k+' target="'+l+'" href="'+h+'"'}k=k+'><span style="width:100%;height:100%;display:block"></span></a></div>';g.append(k)}});b.parent().css({overflow:"visible"});b.find(">ul:first >li >img").each(function(q){var h=a2(this);h.addClass("defaultimg");if(h.data("lazyload")!=aK&&h.data("lazydone")!=1){}else{aZ(h,a)}if(a6(8)){h.data("kenburns","off")}if(a.panZoomDisableOnMobile=="on"&&aq()){h.data("kenburns","off");h.data("bgfit","cover")}h.wrap('<div class="slotholder" style="width:100%;height:100%;"data-duration="'+h.data("duration")+'"data-zoomstart="'+h.data("zoomstart")+'"data-zoomend="'+h.data("zoomend")+'"data-rotationstart="'+h.data("rotationstart")+'"data-rotationend="'+h.data("rotationend")+'"data-ease="'+h.data("ease")+'"data-duration="'+h.data("duration")+'"data-bgpositionend="'+h.data("bgpositionend")+'"data-bgposition="'+h.data("bgposition")+'"data-duration="'+h.data("duration")+'"data-kenburns="'+h.data("kenburns")+'"data-easeme="'+h.data("ease")+'"data-bgfit="'+h.data("bgfit")+'"data-bgfitend="'+h.data("bgfitend")+'"data-owidth="'+h.data("owidth")+'"data-oheight="'+h.data("oheight")+'"></div>');if(a.dottedOverlay!="none"&&a.dottedOverlay!=aK){h.closest(".slotholder").append('<div class="tp-dottedoverlay '+a.dottedOverlay+'"></div>')}var j=h.attr("src"),m=h.data("lazyload"),g=h.data("bgfit"),k=h.data("bgrepeat"),d=h.data("bgposition");if(g==aK){g="cover"}if(k==aK){k="no-repeat"}if(d==aK){d="center center"}var p=h.closest(".slotholder");h.replaceWith('<div class="tp-bgimg defaultimg" data-lazyload="'+h.data("lazyload")+'" data-bgfit="'+g+'"data-bgposition="'+d+'" data-bgrepeat="'+k+'" data-lazydone="'+h.data("lazydone")+'" src="'+j+'" data-src="'+j+'" style="background-color:'+h.css("backgroundColor")+";background-repeat:"+k+";background-image:url("+j+");background-size:"+g+";background-position:"+d+';width:100%;height:100%;"></div>');if(a6(8)){p.find(".tp-bgimg").css({backgroundImage:"none","background-image":"none"});p.find(".tp-bgimg").append('<img class="ieeightfallbackimage defaultimg" src="'+j+'" style="width:100%">')}h.css({opacity:0});h.data("li-id",q)})};var a5=function(Q,I,F,M){var B=Q,H=B.find(".defaultimg"),z=B.data("zoomstart"),P=B.data("rotationstart");if(H.data("currotate")!=aK){P=H.data("currotate")}if(H.data("curscale")!=aK&&M=="box"){z=H.data("curscale")*100}else{if(H.data("curscale")!=aK){z=H.data("curscale")}}aZ(H,I);var K=H.data("src"),U=H.css("backgroundColor"),O=I.width,G=I.height,R=H.data("fxof"),w=0;if(I.autoHeight=="on"){G=I.container.height()}if(R==aK){R=0}var J=0,q=H.data("bgfit"),V=H.data("bgrepeat"),A=H.data("bgposition");if(q==aK){q="cover"}if(V==aK){V="no-repeat"}if(A==aK){A="center center"}if(a6(8)){B.data("kenburns","off");var g=K;K=""}switch(M){case"box":var t=0,a=0,j=0;if(I.sloth>I.slotw){t=I.sloth}else{t=I.slotw}if(!F){var J=0-t}I.slotw=t;I.sloth=t;var a=0;var j=0;if(B.data("kenburns")=="on"){q=z;if(q.toString().length<4){q=ap(q,B,I)}}for(var D=0;D<I.slots;D++){j=0;for(var L=0;L<I.slots;L++){B.append('<div class="slot" style="position:absolute;top:'+(w+j)+"px;left:"+(R+a)+"px;width:"+t+"px;height:"+t+'px;overflow:hidden;"><div class="slotslide" data-x="'+a+'" data-y="'+j+'" style="position:absolute;top:'+0+"px;left:"+0+"px;width:"+t+"px;height:"+t+'px;overflow:hidden;"><div style="position:absolute;top:'+(0-j)+"px;left:"+(0-a)+"px;width:"+O+"px;height:"+G+"px;background-color:"+U+";background-image:url("+K+");background-repeat:"+V+";background-size:"+q+";background-position:"+A+';"></div></div></div>');j=j+t;if(a6(8)){B.find(".slot ").last().find(".slotslide").append('<img src="'+g+'">');aH(B,I)}if(z!=aK&&P!=aK){punchgs.TweenLite.set(B.find(".slot").last(),{rotationZ:P})}}a=a+t}break;case"vertical":case"horizontal":if(B.data("kenburns")=="on"){q=z;if(q.toString().length<4){q=ap(q,B,I)}}if(M=="horizontal"){if(!F){var J=0-I.slotw}for(var L=0;L<I.slots;L++){B.append('<div class="slot" style="position:absolute;top:'+(0+w)+"px;left:"+(R+L*I.slotw)+"px;overflow:hidden;width:"+(I.slotw+0.6)+"px;height:"+G+'px"><div class="slotslide" style="position:absolute;top:0px;left:'+J+"px;width:"+(I.slotw+0.6)+"px;height:"+G+'px;overflow:hidden;"><div style="background-color:'+U+";position:absolute;top:0px;left:"+(0-L*I.slotw)+"px;width:"+O+"px;height:"+G+"px;background-image:url("+K+");background-repeat:"+V+";background-size:"+q+";background-position:"+A+';"></div></div></div>');if(z!=aK&&P!=aK){punchgs.TweenLite.set(B.find(".slot").last(),{rotationZ:P})}if(a6(8)){B.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="'+g+'" style="width:100%;height:auto">');aH(B,I)}}}else{if(!F){var J=0-I.sloth}for(var L=0;L<I.slots+2;L++){B.append('<div class="slot" style="position:absolute;top:'+(w+L*I.sloth)+"px;left:"+R+"px;overflow:hidden;width:"+O+"px;height:"+I.sloth+'px"><div class="slotslide" style="position:absolute;top:'+J+"px;left:0px;width:"+O+"px;height:"+I.sloth+'px;overflow:hidden;"><div style="background-color:'+U+";position:absolute;top:"+(0-L*I.sloth)+"px;left:0px;width:"+O+"px;height:"+G+"px;background-image:url("+K+");background-repeat:"+V+";background-size:"+q+";background-position:"+A+';"></div></div></div>');if(z!=aK&&P!=aK){punchgs.TweenLite.set(B.find(".slot").last(),{rotationZ:P})}if(a6(8)){B.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="'+g+'" style="width:100%;height:auto;">');aH(B,I)}}}break}};var aH=function(d,b){if(a6(8)){var f=d.find(".ieeightfallbackimage");var c=f.width(),a=f.height();if(b.startwidth/b.startheight<d.data("owidth")/d.data("oheight")){f.css({width:"auto",height:"100%"})}else{f.css({width:"100%",height:"auto"})}setTimeout(function(){var j=f.width(),g=f.height(),h=d.data("bgposition");if(h=="center center"){f.css({position:"absolute",top:b.height/2-g/2+"px",left:b.width/2-j/2+"px"})}if(h=="center top"||h=="top center"){f.css({position:"absolute",top:"0px",left:b.width/2-j/2+"px"})}if(h=="center bottom"||h=="bottom center"){f.css({position:"absolute",bottom:"0px",left:b.width/2-j/2+"px"})}if(h=="right top"||h=="top right"){f.css({position:"absolute",top:"0px",right:"0px"})}if(h=="right bottom"||h=="bottom right"){f.css({position:"absolute",bottom:"0px",right:"0px"})}if(h=="right center"||h=="center right"){f.css({position:"absolute",top:b.height/2-g/2+"px",right:"0px"})}if(h=="left bottom"||h=="bottom left"){f.css({position:"absolute",bottom:"0px",left:"0px"})}if(h=="left center"||h=="center left"){f.css({position:"absolute",top:b.height/2-g/2+"px",left:"0px"})}},20)}};var aw=function(a,c,b){b.find(".slot").each(function(){a2(this).remove()});c.transition=0};var ah=function(b,a){b.find("img, .defaultimg").each(function(g){var c=a2(this),d=c.data("lazyload");if(d!=c.attr("src")&&a<3&&d!=aK&&d!="undefined"){if(d!=aK&&d!="undefined"){c.attr("src",d);var f=new Image;f.onload=function(h){c.data("lazydone",1);if(c.hasClass("defaultimg")){aG(c,f)}};f.error=function(){c.data("lazydone",1)};f.src=c.attr("src");if(f.complete){if(c.hasClass("defaultimg")){aG(c,f)}c.data("lazydone",1)}}}else{if((d===aK||d==="undefined")&&c.data("lazydone")!=1){var f=new Image;f.onload=function(){if(c.hasClass("defaultimg")){aG(c,f)}c.data("lazydone",1)};f.error=function(){c.data("lazydone",1)};if(c.attr("src")!=aK&&c.attr("src")!="undefined"){f.src=c.attr("src")}else{f.src=c.data("src")}if(f.complete){if(c.hasClass("defaultimg")){aG(c,f)}c.data("lazydone",1)}}}})};var aG=function(d,b){var f=d.closest("li"),c=b.width,a=b.height;f.data("owidth",c);f.data("oheight",a);f.find(".slotholder").data("owidth",c);f.find(".slotholder").data("oheight",a);f.data("loadeddone",1)};var ag=function(d,c,a){ah(d,0);var b=setInterval(function(){a.bannertimeronpause=true;a.container.trigger("stoptimer");a.cd=0;var f=0;d.find("img, .defaultimg").each(function(g){if(a2(this).data("lazydone")!=1){f++}});if(f>0){ah(d,f)}else{clearInterval(b);if(c!=aK){c()}}},100)};var am=function(d,g){try{var c=d.find(">ul:first-child >li:eq("+g.act+")")}catch(a){var c=d.find(">ul:first-child >li:eq(1)")}g.lastslide=g.act;var b=d.find(">ul:first-child >li:eq("+g.next+")");var f=b.find(".defaultimg");g.bannertimeronpause=true;d.trigger("stoptimer");g.cd=0;if(f.data("lazyload")!=aK&&f.data("lazyload")!="undefined"&&f.data("lazydone")!=1){if(!a6(8)){f.css({backgroundImage:'url("'+b.find(".defaultimg").data("lazyload")+'")'})}else{f.attr("src",b.find(".defaultimg").data("lazyload"))}f.data("src",b.find(".defaultimg").data("lazyload"));f.data("lazydone",1);f.data("orgw",0);b.data("loadeddone",1);d.find(".tp-loader").css({display:"block"});ag(d.find(".tp-static-layers"),function(){ag(b,function(){var h=b.find(".slotholder");if(h.data("kenburns")=="on"){var i=setInterval(function(){var j=h.data("owidth");if(j>=0){clearInterval(i);ay(g,f,d)}},10)}else{ay(g,f,d)}},g)},g)}else{if(b.data("loadeddone")===aK){b.data("loadeddone",1);ag(b,function(){ay(g,f,d)},g)}else{ay(g,f,d)}}};var ay=function(b,a,c){b.bannertimeronpause=false;b.cd=0;c.trigger("nulltimer");c.find(".tp-loader").css({display:"none"});aZ(a,b);aI(c,b);aZ(a,b);aU(c,b)};var aU=function(h,k){h.trigger("revolution.slide.onbeforeswap");k.transition=1;k.videoplaying=false;try{var g=h.find(">ul:first-child >li:eq("+k.act+")")}catch(d){var g=h.find(">ul:first-child >li:eq(1)")}k.lastslide=k.act;var f=h.find(">ul:first-child >li:eq("+k.next+")");setTimeout(function(){aS(k)},200);var j=g.find(".slotholder"),c=f.find(".slotholder");if(c.data("kenburns")=="on"||j.data("kenburns")=="on"){aa(h,k);h.find(".kenburnimg").remove()}if(f.data("delay")!=aK){k.cd=0;k.delay=f.data("delay")}else{k.delay=k.origcd}if(k.firststart==1){punchgs.TweenLite.set(g,{autoAlpha:0})}punchgs.TweenLite.set(g,{zIndex:18});punchgs.TweenLite.set(f,{autoAlpha:0,zIndex:20});var b=0;if(g.index()!=f.index()&&k.firststart!=1){b=aE(g,k)}if(g.data("saveperformance")!="on"){b=0}setTimeout(function(){h.trigger("restarttimer");ao(h,k,f,g,j,c)},b)};var ao=function(bQ,bK,bV,bJ,bO,bI){function bF(){a2.each(bZ,function(d,c){if(c[0]==bW||c[8]==bW){bY=c[1];bN=c[2];bX=bE}bE=bE+1})}if(bV.data("differentissplayed")=="prepared"){bV.data("differentissplayed","done");bV.data("transition",bV.data("savedtransition"));bV.data("slotamount",bV.data("savedslotamount"));bV.data("masterspeed",bV.data("savedmasterspeed"))}if(bV.data("fstransition")!=aK&&bV.data("differentissplayed")!="done"){bV.data("savedtransition",bV.data("transition"));bV.data("savedslotamount",bV.data("slotamount"));bV.data("savedmasterspeed",bV.data("masterspeed"));bV.data("transition",bV.data("fstransition"));bV.data("slotamount",bV.data("fsslotamount"));bV.data("masterspeed",bV.data("fsmasterspeed"));bV.data("differentissplayed","prepared")}bQ.find(".active-revslide").removeClass(".active-revslide");bV.addClass("active-revslide");if(bV.data("transition")==aK){bV.data("transition","random")}var bY=0,bS=bV.data("transition").split(","),b0=bV.data("nexttransid")==aK?-1:bV.data("nexttransid");if(bV.data("randomtransition")=="on"){b0=Math.round(Math.random()*bS.length)}else{b0=b0+1}if(b0==bS.length){b0=0}bV.data("nexttransid",b0);var bW=bS[b0];if(bK.ie){if(bW=="boxfade"){bW="boxslide"}if(bW=="slotfade-vertical"){bW="slotzoom-vertical"}if(bW=="slotfade-horizontal"){bW="slotzoom-horizontal"}}if(a6(8)){bW=11}var bN=0;if(bK.parallax=="scroll"&&bK.parallaxFirstGo==aK){bK.parallaxFirstGo=true;a0(bQ,bK);setTimeout(function(){a0(bQ,bK)},210);setTimeout(function(){a0(bQ,bK)},420)}if(bW=="slidehorizontal"){bW="slideleft";if(bK.leftarrowpressed==1){bW="slideright"}}if(bW=="slidevertical"){bW="slideup";if(bK.leftarrowpressed==1){bW="slidedown"}}if(bW=="parallaxhorizontal"){bW="parallaxtoleft";if(bK.leftarrowpressed==1){bW="parallaxtoright"}}if(bW=="parallaxvertical"){bW="parallaxtotop";if(bK.leftarrowpressed==1){bW="parallaxtobottom"}}var bZ=[["boxslide",0,1,10,0,"box",false,null,0],["boxfade",1,0,10,0,"box",false,null,1],["slotslide-horizontal",2,0,0,200,"horizontal",true,false,2],["slotslide-vertical",3,0,0,200,"vertical",true,false,3],["curtain-1",4,3,0,0,"horizontal",true,true,4],["curtain-2",5,3,0,0,"horizontal",true,true,5],["curtain-3",6,3,25,0,"horizontal",true,true,6],["slotzoom-horizontal",7,0,0,400,"horizontal",true,true,7],["slotzoom-vertical",8,0,0,0,"vertical",true,true,8],["slotfade-horizontal",9,0,0,500,"horizontal",true,null,9],["slotfade-vertical",10,0,0,500,"vertical",true,null,10],["fade",11,0,1,300,"horizontal",true,null,11],["slideleft",12,0,1,0,"horizontal",true,true,12],["slideup",13,0,1,0,"horizontal",true,true,13],["slidedown",14,0,1,0,"horizontal",true,true,14],["slideright",15,0,1,0,"horizontal",true,true,15],["papercut",16,0,0,600,"",null,null,16],["3dcurtain-horizontal",17,0,20,100,"vertical",false,true,17],["3dcurtain-vertical",18,0,10,100,"horizontal",false,true,18],["cubic",19,0,20,600,"horizontal",false,true,19],["cube",19,0,20,600,"horizontal",false,true,20],["flyin",20,0,4,600,"vertical",false,true,21],["turnoff",21,0,1,1600,"horizontal",false,true,22],["incube",22,0,20,200,"horizontal",false,true,23],["cubic-horizontal",23,0,20,500,"vertical",false,true,24],["cube-horizontal",23,0,20,500,"vertical",false,true,25],["incube-horizontal",24,0,20,500,"vertical",false,true,26],["turnoff-vertical",25,0,1,200,"horizontal",false,true,27],["fadefromright",12,1,1,0,"horizontal",true,true,28],["fadefromleft",15,1,1,0,"horizontal",true,true,29],["fadefromtop",14,1,1,0,"horizontal",true,true,30],["fadefrombottom",13,1,1,0,"horizontal",true,true,31],["fadetoleftfadefromright",12,2,1,0,"horizontal",true,true,32],["fadetorightfadetoleft",15,2,1,0,"horizontal",true,true,33],["fadetobottomfadefromtop",14,2,1,0,"horizontal",true,true,34],["fadetotopfadefrombottom",13,2,1,0,"horizontal",true,true,35],["parallaxtoright",12,3,1,0,"horizontal",true,true,36],["parallaxtoleft",15,3,1,0,"horizontal",true,true,37],["parallaxtotop",14,3,1,0,"horizontal",true,true,38],["parallaxtobottom",13,3,1,0,"horizontal",true,true,39],["scaledownfromright",12,4,1,0,"horizontal",true,true,40],["scaledownfromleft",15,4,1,0,"horizontal",true,true,41],["scaledownfromtop",14,4,1,0,"horizontal",true,true,42],["scaledownfrombottom",13,4,1,0,"horizontal",true,true,43],["zoomout",13,5,1,0,"horizontal",true,true,44],["zoomin",13,6,1,0,"horizontal",true,true,45],["notransition",26,0,1,0,"horizontal",true,null,46]];var bH=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];var bR=[16,17,18,19,20,21,22,23,24,25,26,27];var bY=0;var bN=1;var bX=0;var bE=0;var bG=new Array;if(bI.data("kenburns")=="on"){if(bW=="boxslide"||bW==0||bW=="boxfade"||bW==1||bW=="papercut"||bW==16){bW=11}aj(bQ,bK,true,true)}if(bW=="random"){bW=Math.round(Math.random()*bZ.length-1);if(bW>bZ.length-1){bW=bZ.length-1}}if(bW=="random-static"){bW=Math.round(Math.random()*bH.length-1);if(bW>bH.length-1){bW=bH.length-1}bW=bH[bW]}if(bW=="random-premium"){bW=Math.round(Math.random()*bR.length-1);if(bW>bR.length-1){bW=bR.length-1}bW=bR[bW]}var br=[12,13,14,15,16,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];if(bK.isJoomla==true&&window.MooTools!=aK&&br.indexOf(bW)!=-1){var ba=Math.round(Math.random()*(bR.length-2))+1;if(ba>bR.length-1){ba=bR.length-1}if(ba==0){ba=1}bW=bR[ba]}bF();if(a6(8)&&bY>15&&bY<28){bW=Math.round(Math.random()*bH.length-1);if(bW>bH.length-1){bW=bH.length-1}bW=bH[bW];bE=0;bF()}var a8=-1;if(bK.leftarrowpressed==1||bK.act>bK.next){a8=1}bK.leftarrowpressed=0;if(bY>26){bY=26}if(bY<0){bY=0}var bf=300;if(bV.data("masterspeed")!=aK&&bV.data("masterspeed")>99&&bV.data("masterspeed")<bK.delay){bf=bV.data("masterspeed")}if(bV.data("masterspeed")!=aK&&bV.data("masterspeed")>bK.delay){bf=bK.delay}bG=bZ[bX];bQ.parent().find(".bullet").each(function(){var c=a2(this),d=c.index();c.removeClass("selected");if(bK.navigationArrows=="withbullet"||bK.navigationArrows=="nexttobullets"){d=c.index()-1}if(d==bK.next){c.addClass("selected")}});var bt=new punchgs.TimelineLite({onComplete:function(){aA(bQ,bK,bI,bO,bV,bJ,bt)}});bt.add(punchgs.TweenLite.set(bI.find(".defaultimg"),{opacity:0}));bt.pause();if(bV.data("slotamount")==aK||bV.data("slotamount")<1){bK.slots=Math.round(Math.random()*12+4);if(bW=="boxslide"){bK.slots=Math.round(Math.random()*6+3)}else{if(bW=="flyin"){bK.slots=Math.round(Math.random()*4+1)}}}else{bK.slots=bV.data("slotamount")}if(bV.data("rotate")==aK){bK.rotate=0}else{if(bV.data("rotate")==999){bK.rotate=Math.round(Math.random()*360)}else{bK.rotate=bV.data("rotate")}}if(!a2.support.transition||bK.ie||bK.ie9){bK.rotate=0}if(bK.firststart==1){bK.firststart=0}bf=bf+bG[4];if((bY==4||bY==5||bY==6)&&bK.slots<3){bK.slots=3}if(bG[3]!=0){bK.slots=Math.min(bK.slots,bG[3])}if(bY==9){bK.slots=bK.width/20}if(bY==10){bK.slots=bK.height/20}if(bG[7]!=null){a5(bO,bK,bG[7],bG[5])}if(bG[6]!=null){a5(bI,bK,bG[6],bG[5])}if(bY==0){var bT=Math.ceil(bK.height/bK.sloth);var bh=0;bI.find(".slotslide").each(function(c){var d=a2(this);bh=bh+1;if(bh==bT){bh=0}bt.add(punchgs.TweenLite.from(d,bf/600,{opacity:0,top:0-bK.sloth,left:0-bK.slotw,rotation:bK.rotate,force3D:"auto",ease:punchgs.Power2.easeOut}),(c*15+bh*30)/1500)})}if(bY==1){var be,bg=0;bI.find(".slotslide").each(function(d){var g=a2(this),c=Math.random()*bf+300,f=Math.random()*500+200;if(c+f>be){be=f+f;bg=d}bt.add(punchgs.TweenLite.from(g,c/1000,{autoAlpha:0,force3D:"auto",rotation:bK.rotate,ease:punchgs.Power2.easeInOut}),f/1000)})}if(bY==2){var b1=new punchgs.TimelineLite;bO.find(".slotslide").each(function(){var c=a2(this);b1.add(punchgs.TweenLite.to(c,bf/1000,{left:bK.slotw,force3D:"auto",rotation:0-bK.rotate}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(){var c=a2(this);b1.add(punchgs.TweenLite.from(c,bf/1000,{left:0-bK.slotw,force3D:"auto",rotation:bK.rotate}),0);bt.add(b1,0)})}if(bY==3){var b1=new punchgs.TimelineLite;bO.find(".slotslide").each(function(){var c=a2(this);b1.add(punchgs.TweenLite.to(c,bf/1000,{top:bK.sloth,rotation:bK.rotate,force3D:"auto",transformPerspective:600}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(){var c=a2(this);b1.add(punchgs.TweenLite.from(c,bf/1000,{top:0-bK.sloth,rotation:bK.rotate,ease:punchgs.Power2.easeOut,force3D:"auto",transformPerspective:600}),0);bt.add(b1,0)})}if(bY==4||bY==5){setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);var bs=bf/1000,bd=bs,b1=new punchgs.TimelineLite;bO.find(".slotslide").each(function(d){var f=a2(this);var c=d*bs/bK.slots;if(bY==5){c=(bK.slots-d-1)*bs/bK.slots/1.5}b1.add(punchgs.TweenLite.to(f,bs*3,{transformPerspective:600,force3D:"auto",top:0+bK.height,opacity:0.5,rotation:bK.rotate,ease:punchgs.Power2.easeInOut,delay:c}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(d){var f=a2(this);var c=d*bs/bK.slots;if(bY==5){c=(bK.slots-d-1)*bs/bK.slots/1.5}b1.add(punchgs.TweenLite.from(f,bs*3,{top:0-bK.height,opacity:0.5,rotation:bK.rotate,force3D:"auto",ease:punchgs.Power2.easeInOut,delay:c}),0);bt.add(b1,0)})}if(bY==6){if(bK.slots<2){bK.slots=2}if(bK.slots%2){bK.slots=bK.slots+1}var b1=new punchgs.TimelineLite;setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);bO.find(".slotslide").each(function(d){var f=a2(this);if(d+1<bK.slots/2){var c=(d+2)*90}else{var c=(2+bK.slots-d)*90}b1.add(punchgs.TweenLite.to(f,(bf+c)/1000,{top:0+bK.height,opacity:1,force3D:"auto",rotation:bK.rotate,ease:punchgs.Power2.easeInOut}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(d){var f=a2(this);if(d+1<bK.slots/2){var c=(d+2)*90}else{var c=(2+bK.slots-d)*90}b1.add(punchgs.TweenLite.from(f,(bf+c)/1000,{top:0-bK.height,opacity:1,force3D:"auto",rotation:bK.rotate,ease:punchgs.Power2.easeInOut}),0);bt.add(b1,0)})}if(bY==7){bf=bf*2;if(bf>bK.delay){bf=bK.delay}var b1=new punchgs.TimelineLite;setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);bO.find(".slotslide").each(function(){var c=a2(this).find("div");b1.add(punchgs.TweenLite.to(c,bf/1000,{left:0-bK.slotw/2+"px",top:0-bK.height/2+"px",width:bK.slotw*2+"px",height:bK.height*2+"px",opacity:0,rotation:bK.rotate,force3D:"auto",ease:punchgs.Power2.easeOut}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(c){var d=a2(this).find("div");b1.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:0,top:0,opacity:0,transformPerspective:600},{left:0-c*bK.slotw+"px",ease:punchgs.Power2.easeOut,force3D:"auto",top:0+"px",width:bK.width,height:bK.height,opacity:1,rotation:0,delay:0.1}),0);bt.add(b1,0)})}if(bY==8){bf=bf*3;if(bf>bK.delay){bf=bK.delay}var b1=new punchgs.TimelineLite;bO.find(".slotslide").each(function(){var c=a2(this).find("div");b1.add(punchgs.TweenLite.to(c,bf/1000,{left:0-bK.width/2+"px",top:0-bK.sloth/2+"px",width:bK.width*2+"px",height:bK.sloth*2+"px",force3D:"auto",opacity:0,rotation:bK.rotate}),0);bt.add(b1,0)});bI.find(".slotslide").each(function(c){var d=a2(this).find("div");b1.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:0,top:0,opacity:0,force3D:"auto"},{left:0+"px",top:0-c*bK.sloth+"px",width:bI.find(".defaultimg").data("neww")+"px",height:bI.find(".defaultimg").data("newh")+"px",opacity:1,rotation:0}),0);bt.add(b1,0)})}if(bY==9||bY==10){var bm=0;bI.find(".slotslide").each(function(c){var d=a2(this);bm++;bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{autoAlpha:0,force3D:"auto",transformPerspective:600},{autoAlpha:1,ease:punchgs.Power2.easeInOut,delay:c*5/1000}),0)})}if(bY==11||bY==26){var bm=0;if(bY==26){bf=0}bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.from(d,bf/1000,{autoAlpha:0,force3D:"auto",ease:punchgs.Power2.easeInOut}),0)})}if(bY==12||bY==13||bY==14||bY==15){bf=bf;if(bf>bK.delay){bf=bK.delay}setTimeout(function(){punchgs.TweenLite.set(bO.find(".defaultimg"),{autoAlpha:0})},100);var bu=bK.width,bp=bK.height,bl=bI.find(".slotslide"),bL=0,bb=0,Q=1,bD=1,t=1,j=punchgs.Power2.easeInOut,A=punchgs.Power2.easeInOut,bC=bf/1000,bj=bC;if(bK.fullWidth=="on"||bK.fullScreen=="on"){bu=bl.width();bp=bl.height()}if(bY==12){bL=bu}else{if(bY==15){bL=0-bu}else{if(bY==13){bb=bp}else{if(bY==14){bb=0-bp}}}}if(bN==1){Q=0}if(bN==2){Q=0}if(bN==3){j=punchgs.Power2.easeInOut;A=punchgs.Power1.easeInOut;bC=bf/1200}if(bN==4||bN==5){bD=0.6}if(bN==6){bD=1.4}if(bN==5||bN==6){t=1.4;Q=0;bu=0;bp=0;bL=0;bb=0}if(bN==6){t=0.6}var bi=0;bt.add(punchgs.TweenLite.from(bl,bC,{left:bL,top:bb,scale:t,opacity:Q,rotation:bK.rotate,ease:A,force3D:"auto"}),0);var bo=bO.find(".slotslide");if(bN==4||bN==5){bu=0;bp=0}if(bN!=1){switch(bY){case 12:bt.add(punchgs.TweenLite.to(bo,bj,{left:0-bu+"px",force3D:"auto",scale:bD,opacity:Q,rotation:bK.rotate,ease:j}),0);break;case 15:bt.add(punchgs.TweenLite.to(bo,bj,{left:bu+"px",force3D:"auto",scale:bD,opacity:Q,rotation:bK.rotate,ease:j}),0);break;case 13:bt.add(punchgs.TweenLite.to(bo,bj,{top:0-bp+"px",force3D:"auto",scale:bD,opacity:Q,rotation:bK.rotate,ease:j}),0);break;case 14:bt.add(punchgs.TweenLite.to(bo,bj,{top:bp+"px",force3D:"auto",scale:bD,opacity:Q,rotation:bK.rotate,ease:j}),0);break}}}if(bY==16){var b1=new punchgs.TimelineLite;bt.add(punchgs.TweenLite.set(bJ,{position:"absolute","z-index":20}),0);bt.add(punchgs.TweenLite.set(bV,{position:"absolute","z-index":15}),0);bJ.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>');bJ.find(".tp-half-one").clone(true).appendTo(bJ).addClass("tp-half-two");bJ.find(".tp-half-two").removeClass("tp-half-one");var bu=bK.width,bp=bK.height;if(bK.autoHeight=="on"){bp=bQ.height()}bJ.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:'+bu+"px;height:"+bp+'px;"></div>');bJ.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:'+bu+"px;height:"+bp+'px;"></div>');bJ.find(".tp-half-two .defaultimg").css({position:"absolute",top:"-50%"});bJ.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>');bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-two"),{width:bu,height:bp,overflow:"hidden",zIndex:15,position:"absolute",top:bp/2,left:"0px",transformPerspective:600,transformOrigin:"center bottom"}),0);bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-one"),{width:bu,height:bp/2,overflow:"visible",zIndex:10,position:"absolute",top:"0px",left:"0px",transformPerspective:600,transformOrigin:"center top"}),0);var b=bJ.find(".defaultimg"),a=Math.round(Math.random()*20-10),bM=Math.round(Math.random()*20-10),bU=Math.round(Math.random()*20-10),bA=Math.random()*0.4-0.2,bx=Math.random()*0.4-0.2,bn=Math.random()*1+1,bz=Math.random()*1+1,bB=Math.random()*0.3+0.3;bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-one"),{overflow:"hidden"}),0);bt.add(punchgs.TweenLite.fromTo(bJ.find(".tp-half-one"),bf/800,{width:bu,height:bp/2,position:"absolute",top:"0px",left:"0px",force3D:"auto",transformOrigin:"center top"},{scale:bn,rotation:a,y:0-bp-bp/4,autoAlpha:0,ease:punchgs.Power2.easeInOut}),0);bt.add(punchgs.TweenLite.fromTo(bJ.find(".tp-half-two"),bf/800,{width:bu,height:bp,overflow:"hidden",position:"absolute",top:bp/2,left:"0px",force3D:"auto",transformOrigin:"center bottom"},{scale:bz,rotation:bM,y:bp+bp/4,ease:punchgs.Power2.easeInOut,autoAlpha:0,onComplete:function(){punchgs.TweenLite.set(bJ,{position:"absolute","z-index":15});punchgs.TweenLite.set(bV,{position:"absolute","z-index":20});if(bJ.find(".tp-half-one").length>0){bJ.find(".tp-half-one .defaultimg").unwrap();bJ.find(".tp-half-one .slotholder").unwrap()}bJ.find(".tp-half-two").remove()}}),0);b1.add(punchgs.TweenLite.set(bI.find(".defaultimg"),{autoAlpha:1}),0);if(bJ.html()!=null){bt.add(punchgs.TweenLite.fromTo(bV,(bf-200)/1000,{scale:bB,x:bK.width/4*bA,y:bp/4*bx,rotation:bU,force3D:"auto",transformOrigin:"center center",ease:punchgs.Power2.easeOut},{autoAlpha:1,scale:1,x:0,y:0,rotation:0}),0)}bt.add(b1,0)}if(bY==17){bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/800,{opacity:0,rotationY:0,scale:0.9,rotationX:-110,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{opacity:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:punchgs.Power3.easeOut,delay:c*0.06}),0)})}if(bY==18){bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/500,{autoAlpha:0,rotationY:310,scale:0.9,rotationX:10,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{autoAlpha:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:punchgs.Power3.easeOut,delay:c*0.06}),0)})}if(bY==19||bY==22){var b1=new punchgs.TimelineLite;bt.add(punchgs.TweenLite.set(bJ,{zIndex:20}),0);bt.add(punchgs.TweenLite.set(bV,{zIndex:20}),0);setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);var a9=bV.css("z-index"),bw=bJ.css("z-index"),by=90,Q=1,bv="center center ";if(a8==1){by=-90}if(bY==19){bv=bv+"-"+bK.height/2;Q=0}else{bv=bv+bK.height/2}punchgs.TweenLite.set(bQ,{transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:600});bI.find(".slotslide").each(function(c){var d=a2(this);b1.add(punchgs.TweenLite.fromTo(d,bf/1000,{transformStyle:"flat",backfaceVisibility:"hidden",left:0,rotationY:bK.rotate,z:10,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationX:by},{left:0,rotationY:0,top:0,z:0,scale:1,force3D:"auto",rotationX:0,delay:c*50/1000,ease:punchgs.Power2.easeInOut}),0);b1.add(punchgs.TweenLite.to(d,0.1,{autoAlpha:1,delay:c*50/1000}),0);bt.add(b1)});bO.find(".slotslide").each(function(d){var f=a2(this);var c=-90;if(a8==1){c=90}b1.add(punchgs.TweenLite.fromTo(f,bf/1000,{transformStyle:"flat",backfaceVisibility:"hidden",autoAlpha:1,rotationY:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationX:0},{autoAlpha:1,rotationY:bK.rotate,top:0,z:10,scale:1,rotationX:c,delay:d*50/1000,force3D:"auto",ease:punchgs.Power2.easeInOut}),0);bt.add(b1)})}if(bY==20){setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);var a9=bV.css("z-index"),bw=bJ.css("z-index");if(a8==1){var bP=-bK.width;var by=70;var bv="left center -"+bK.height/2}else{var bP=bK.width;var by=-70;var bv="right center -"+bK.height/2}bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/1500,{left:bP,rotationX:40,z:-600,opacity:Q,top:0,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationY:by},{left:0,delay:c*50/1000,ease:punchgs.Power2.easeInOut}),0);bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{rotationX:40,z:-600,opacity:Q,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationY:by},{rotationX:0,opacity:1,top:0,z:0,scale:1,rotationY:0,delay:c*50/1000,ease:punchgs.Power2.easeInOut}),0);bt.add(punchgs.TweenLite.to(d,0.1,{opacity:1,force3D:"auto",delay:c*50/1000+bf/2000}),0)});bO.find(".slotslide").each(function(d){var h=a2(this);if(a8!=1){var c=-bK.width;var f=70;var g="left center -"+bK.height/2}else{var c=bK.width;var f=-70;var g="right center -"+bK.height/2}bt.add(punchgs.TweenLite.fromTo(h,bf/1000,{opacity:1,rotationX:0,top:0,z:0,scale:1,left:0,force3D:"auto",transformPerspective:600,transformOrigin:g,rotationY:0},{opacity:1,rotationX:40,top:0,z:-600,left:c,force3D:"auto",scale:0.8,rotationY:f,delay:d*50/1000,ease:punchgs.Power2.easeInOut}),0);bt.add(punchgs.TweenLite.to(h,0.1,{force3D:"auto",opacity:0,delay:d*50/1000+(bf/1000-bf/10000)}),0)})}if(bY==21||bY==25){setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);var a9=bV.css("z-index"),bw=bJ.css("z-index"),by=90,bP=-bK.width,bk=-by;if(a8==1){if(bY==25){var bv="center top 0";by=bK.rotate}else{var bv="left center 0";bk=bK.rotate}}else{bP=bK.width;by=-90;if(bY==25){var bv="center bottom 0";bk=-by;by=bK.rotate}else{var bv="right center 0";bk=bK.rotate}}bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:0,transformStyle:"flat",rotationX:bk,z:0,autoAlpha:0,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationY:by},{left:0,rotationX:0,top:0,z:0,autoAlpha:1,scale:1,rotationY:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),0)});if(a8!=1){bP=-bK.width;by=90;if(bY==25){bv="center top 0";bk=-by;by=bK.rotate}else{bv="left center 0";bk=bK.rotate}}else{bP=bK.width;by=-90;if(bY==25){bv="center bottom 0";bk=-by;by=bK.rotate}else{bv="right center 0";bk=bK.rotate}}bO.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:0,transformStyle:"flat",rotationX:0,z:0,autoAlpha:1,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationY:0},{left:0,rotationX:bk,top:0,z:0,autoAlpha:1,force3D:"auto",scale:1,rotationY:by,ease:punchgs.Power1.easeInOut}),0)})}if(bY==23||bY==24){setTimeout(function(){bO.find(".defaultimg").css({opacity:0})},100);var a9=bV.css("z-index"),bw=bJ.css("z-index"),by=-90,Q=1,bc=0;if(a8==1){by=90}if(bY==23){var bv="center center -"+bK.width/2;Q=0}else{var bv="center center "+bK.width/2}punchgs.TweenLite.set(bQ,{transformStyle:"preserve-3d",backfaceVisibility:"hidden",perspective:2500});bI.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:bc,rotationX:bK.rotate,force3D:"auto",opacity:Q,top:0,scale:1,transformPerspective:600,transformOrigin:bv,rotationY:by},{left:0,rotationX:0,autoAlpha:1,top:0,z:0,scale:1,rotationY:0,delay:c*50/500,ease:punchgs.Power2.easeInOut}),0)});by=90;if(a8==1){by=-90}bO.find(".slotslide").each(function(c){var d=a2(this);bt.add(punchgs.TweenLite.fromTo(d,bf/1000,{left:0,autoAlpha:1,rotationX:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:bv,rotationY:0},{left:bc,autoAlpha:1,rotationX:bK.rotate,top:0,scale:1,rotationY:by,delay:c*50/500,ease:punchgs.Power2.easeInOut}),0)})}bt.pause();aW(bV,bK,null,bt);punchgs.TweenLite.to(bV,0.001,{autoAlpha:1});var bq={};bq.slideIndex=bK.next+1;bq.slide=bV;bQ.trigger("revolution.slide.onchange",bq);setTimeout(function(){bQ.trigger("revolution.slide.onafterswap")},bf);bQ.trigger("revolution.slide.onvideostop")};var aA=function(f,b,h,d,a,c,g){punchgs.TweenLite.to(h.find(".defaultimg"),0.001,{autoAlpha:1,onComplete:function(){aw(f,b,a)}});if(a.index()!=c.index()){punchgs.TweenLite.to(c,0.2,{autoAlpha:0,onComplete:function(){aw(f,b,c)}})}b.act=b.next;if(b.navigationType=="thumb"){aC(f)}if(h.data("kenburns")=="on"){aj(f,b)}f.find(".current-sr-slide-visible").removeClass("current-sr-slide-visible");a.addClass("current-sr-slide-visible");if(b.parallax=="scroll"||b.parallax=="scroll+mouse"||b.parallax=="mouse+scroll"){a0(f,b)}g.clear()};var al=function(c){var h=c.target.getVideoEmbedCode();var f=a2("#"+h.split('id="')[1].split('"')[0]);var b=f.closest(".tp-simpleresponsive");var d=f.parent().data("player");if(c.data==YT.PlayerState.PLAYING){var g=b.find(".tp-bannertimer");var a=g.data("opt");if(f.closest(".tp-caption").data("volume")=="mute"){d.mute()}a.videoplaying=true;b.trigger("stoptimer");b.trigger("revolution.slide.onvideoplay")}else{var g=b.find(".tp-bannertimer");var a=g.data("opt");if(c.data!=-1&&c.data!=3){a.videoplaying=false;b.trigger("starttimer");b.trigger("revolution.slide.onvideostop")}if(c.data==0&&a.nextslideatend==true){a.container.revnext()}else{a.videoplaying=false;b.trigger("starttimer");b.trigger("revolution.slide.onvideostop")}}};var an=function(b,a,c){if(b.addEventListener){b.addEventListener(a,c,false)}else{b.attachEvent(a,c,false)}};var a7=function(b,g){var d=$f(b),a=a2("#"+b),c=a.closest(".tp-simpleresponsive"),f=a.closest(".tp-caption");setTimeout(function(){d.addEvent("ready",function(h){if(g){d.api("play")}d.addEvent("play",function(j){var i=c.find(".tp-bannertimer");var k=i.data("opt");k.videoplaying=true;c.trigger("stoptimer");if(f.data("volume")=="mute"){d.api("setVolume","0")}});d.addEvent("finish",function(j){var i=c.find(".tp-bannertimer");var k=i.data("opt");k.videoplaying=false;c.trigger("starttimer");c.trigger("revolution.slide.onvideoplay");if(k.nextslideatend==true){k.container.revnext()}});d.addEvent("pause",function(j){var i=c.find(".tp-bannertimer");var k=i.data("opt");k.videoplaying=false;c.trigger("starttimer");c.trigger("revolution.slide.onvideostop")});f.find(".tp-thumb-image").click(function(){punchgs.TweenLite.to(a2(this),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});d.api("play")})})},150)};var ax=function(f,h){var d=h.width();var b=h.height();var c=f.data("mediaAspect");if(c==aK){c=1}var g=d/b;f.css({position:"absolute"});var a=f.find("video");if(g<c){punchgs.TweenLite.to(f,0.0001,{width:b*c,force3D:"auto",top:0,left:0-(b*c-d)/2,height:b})}else{punchgs.TweenLite.to(f,0.0001,{width:d,force3D:"auto",top:0-(d/c-b)/2,left:0,height:d/c})}};var ak=function(){var a=new Object;a.x=0;a.y=0;a.rotationX=0;a.rotationY=0;a.rotationZ=0;a.scale=1;a.scaleX=1;a.scaleY=1;a.skewX=0;a.skewY=0;a.opacity=0;a.transformOrigin="center, center";a.transformPerspective=400;a.rotation=0;return a};var at=function(a,c){var b=c.split(";");a2.each(b,function(g,h){h=h.split(":");var f=h[0],d=h[1];if(f=="rotationX"){a.rotationX=parseInt(d,0)}if(f=="rotationY"){a.rotationY=parseInt(d,0)}if(f=="rotationZ"){a.rotationZ=parseInt(d,0)}if(f=="rotationZ"){a.rotation=parseInt(d,0)}if(f=="scaleX"){a.scaleX=parseFloat(d)}if(f=="scaleY"){a.scaleY=parseFloat(d)}if(f=="opacity"){a.opacity=parseFloat(d)}if(f=="skewX"){a.skewX=parseInt(d,0)}if(f=="skewY"){a.skewY=parseInt(d,0)}if(f=="x"){a.x=parseInt(d,0)}if(f=="y"){a.y=parseInt(d,0)}if(f=="z"){a.z=parseInt(d,0)}if(f=="transformOrigin"){a.transformOrigin=d.toString()}if(f=="transformPerspective"){a.transformPerspective=parseInt(d,0)}});return a};var az=function(b){var d=b.split("animation:");var c=new Object;c.animation=at(ak(),d[1]);var a=d[0].split(";");a2.each(a,function(h,g){g=g.split(":");var j=g[0],f=g[1];if(j=="typ"){c.typ=f}if(j=="speed"){c.speed=parseInt(f,0)/1000}if(j=="start"){c.start=parseInt(f,0)/1000}if(j=="elementdelay"){c.elementdelay=parseFloat(f)}if(j=="ease"){c.ease=f}});return c};var aW=function(j,a,m,y){function g(){}function x(){}if(j.data("ctl")==aK){j.data("ctl",new punchgs.TimelineLite)}var t=j.data("ctl"),k=0,w=0,q=j.find(".tp-caption"),b=a.container.find(".tp-static-layers").find(".tp-caption");t.pause();a2.each(b,function(d,c){q.push(c)});q.each(function(bA){var bv=m,bI=-1,bF=a2(this);if(bF.hasClass("tp-static-layer")){var by=bF.data("startslide"),bL=bF.data("endslide");if(by==-1||by=="-1"){bF.data("startslide",0)}if(bL==-1||bL=="-1"){bF.data("endslide",a.slideamount)}if(by==0&&bL==a.slideamount-1){bF.data("endslide",a.slideamount+1)}by=bF.data("startslide"),bL=bF.data("endslide");if(!bF.hasClass("tp-is-shown")){if(by<=a.next&&bL>=a.next||by==a.next||bL==a.next){bF.addClass("tp-is-shown");bI=1}else{bI=0}}else{if(bL==a.next||by>a.next||bL<a.next){bI=2}else{bI=0}}}k=a.width/2-a.startwidth*a.bw/2;var bu=a.bw;var bB=a.bh;if(a.fullScreen=="on"){w=a.height/2-a.startheight*a.bh/2}if(a.autoHeight=="on"||a.minHeight!=aK&&a.minHeight>0){w=a.container.height()/2-a.startheight*a.bh/2}if(w<0){w=0}var bH=0;if(a.width<a.hideCaptionAtLimit&&bF.data("captionhidden")=="on"){bF.addClass("tp-hidden-caption");bH=1}else{if(a.width<a.hideAllCaptionAtLimit||a.width<a.hideAllCaptionAtLilmit){bF.addClass("tp-hidden-caption");bH=1}else{bF.removeClass("tp-hidden-caption")}}if(bH==0){if(bF.data("linktoslide")!=aK&&!bF.hasClass("hasclicklistener")){bF.addClass("hasclicklistener");bF.css({cursor:"pointer"});if(bF.data("linktoslide")!="no"){bF.click(function(){var d=a2(this);var f=d.data("linktoslide");if(f!="next"&&f!="prev"){a.container.data("showus",f);a.container.parent().find(".tp-rightarrow").click()}else{if(f=="next"){a.container.parent().find(".tp-rightarrow").click()}else{if(f=="prev"){a.container.parent().find(".tp-leftarrow").click()}}}})}}if(k<0){k=0}if(bF.hasClass("tp-videolayer")||bF.find("iframe").length>0||bF.find("video").length>0){var bq="iframe"+Math.round(Math.random()*100000+1),bM=bF.data("videowidth"),bs=bF.data("videoheight"),a9=bF.data("videoattributes"),u=bF.data("ytid"),br=bF.data("vimeoid"),o=bF.data("videpreload"),H=bF.data("videomp4"),bb=bF.data("videowebm"),bC=bF.data("videoogv"),J=bF.data("videocontrols"),bc="http",bE=bF.data("videoloop")=="loop"?"loop":bF.data("videoloop")=="loopandnoslidestop"?"loop":"";if(bF.data("thumbimage")!=aK&&bF.data("videoposter")==aK){bF.data("videoposter",bF.data("thumbimage"))}if(u!=aK&&String(u).length>1&&bF.find("iframe").length==0){bc="https";if(J=="none"){a9=a9.replace("controls=1","controls=0");if(a9.toLowerCase().indexOf("controls")==-1){a9=a9+"&controls=0"}}bF.append('<iframe style="visible:hidden" src="'+bc+"://www.youtube.com/embed/"+u+"?"+a9+'" width="'+bM+'" height="'+bs+'" style="width:'+bM+"px;height:"+bs+'px"></iframe>')}if(br!=aK&&String(br).length>1&&bF.find("iframe").length==0){if(location.protocol==="https:"){bc="https"}bF.append('<iframe style="visible:hidden" src="'+bc+"://player.vimeo.com/video/"+br+"?"+a9+'" width="'+bM+'" height="'+bs+'" style="width:'+bM+"px;height:"+bs+'px"></iframe>')}if((H!=aK||bb!=aK)&&bF.find("video").length==0){if(J!="controls"){J=""}var R='<video style="visible:hidden" class="" '+bE+' preload="'+o+'" width="'+bM+'" height="'+bs+'"';if(bF.data("videoposter")!=aK){if(bF.data("videoposter")!=aK){R=R+'poster="'+bF.data("videoposter")+'">'}}if(bb!=aK&&av().toLowerCase()=="firefox"){R=R+'<source src="'+bb+'" type="video/webm" />'}if(H!=aK){R=R+'<source src="'+H+'" type="video/mp4" />'}if(bC!=aK){R=R+'<source src="'+bC+'" type="video/ogg" />'}R=R+"</video>";bF.append(R);if(J=="controls"){bF.append('<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div></div>')}}var bp=false;if(bF.data("autoplayonlyfirsttime")==true||bF.data("autoplayonlyfirsttime")=="true"||bF.data("autoplay")==true){bF.data("autoplay",true);bp=true}bF.find("iframe").each(function(){var z=a2(this);punchgs.TweenLite.to(z,0.1,{autoAlpha:1,zIndex:0,transformStyle:"preserve-3d",z:0,rotationX:0,force3D:"auto"});if(aq()){var s=z.attr("src");z.attr("src","");z.attr("src",s)}a.nextslideatend=bF.data("nextslideatend");if(bF.data("videoposter")!=aK&&bF.data("videoposter").length>2&&bF.data("autoplay")!=true&&!bv){if(bF.find(".tp-thumb-image").length==0){bF.append('<div class="tp-thumb-image" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url('+bF.data("videoposter")+'); background-size:cover"></div>')}else{punchgs.TweenLite.set(bF.find(".tp-thumb-image"),{autoAlpha:1})}}if(z.attr("src").toLowerCase().indexOf("youtube")>=0){if(!z.hasClass("HasListener")){try{z.attr("id",bq);var S;var N=setInterval(function(){if(YT!=aK){if(typeof YT.Player!=aK&&typeof YT.Player!="undefined"){S=new YT.Player(bq,{events:{onStateChange:al,onReady:function(Y){var T=Y.target.getVideoEmbedCode(),f=a2("#"+T.split('id="')[1].split('"')[0]),p=f.closest(".tp-caption"),V=p.data("videorate"),d=p.data("videostart");if(V!=aK){Y.target.setPlaybackRate(parseFloat(V))}if(!aq()&&p.data("autoplay")==true||bp){p.data("timerplay",setTimeout(function(){Y.target.playVideo()},p.data("start")))}p.find(".tp-thumb-image").click(function(){punchgs.TweenLite.to(a2(this),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});if(!aq()){S.playVideo()}})}}})}}z.addClass("HasListener");bF.data("player",S);clearInterval(N)},100)}catch(G){}}else{if(!m){var S=bF.data("player");if(bF.data("forcerewind")=="on"&&!aq()){S.seekTo(0)}if(!aq()&&bF.data("autoplay")==true||bp){bF.data("timerplay",setTimeout(function(){S.playVideo()},bF.data("start")))}}}}else{if(z.attr("src").toLowerCase().indexOf("vimeo")>=0){if(!z.hasClass("HasListener")){z.addClass("HasListener");z.attr("id",bq);var C=z.attr("src");var K={},h=C,I=/([^&=]+)=([^&]*)/g,Q;while(Q=I.exec(h)){K[decodeURIComponent(Q[1])]=decodeURIComponent(Q[2])}if(K.player_id!=aK){C=C.replace(K.player_id,bq)}else{C=C+"&player_id="+bq}try{C=C.replace("api=0","api=1")}catch(G){}C=C+"&api=1";z.attr("src",C);var S=bF.find("iframe")[0];var A=setInterval(function(){if($f!=aK){if(typeof $f(bq).api!=aK&&typeof $f(bq).api!="undefined"){$f(S).addEvent("ready",function(){a7(bq,bp)});clearInterval(A)}}},100)}else{if(!m){if(!aq()&&(bF.data("autoplay")==true||bF.data("forcerewind")=="on")){var z=bF.find("iframe");var E=z.attr("id");var L=$f(E);if(bF.data("forcerewind")=="on"){L.api("seekTo",0)}bF.data("timerplay",setTimeout(function(){if(bF.data("autoplay")==true){L.api("play")}},bF.data("start")))}}}}}});if(aq()&&bF.data("disablevideoonmobile")==1||a6(8)){bF.find("video").remove()}if(bF.find("video").length>0){bF.find("video").each(function(p){var d=this,f=a2(this);if(!f.parent().hasClass("html5vid")){f.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:auto;height:auto"></div>')}var h=f.parent();an(d,"loadedmetadata",function(n){n.data("metaloaded",1)}(h));clearInterval(h.data("interval"));h.data("interval",setInterval(function(){if(h.data("metaloaded")==1||d.duration!=NaN){clearInterval(h.data("interval"));if(!h.hasClass("HasListener")){h.addClass("HasListener");if(bF.data("dottedoverlay")!="none"&&bF.data("dottedoverlay")!=aK){if(bF.find(".tp-dottedoverlay").length!=1){h.append('<div class="tp-dottedoverlay '+bF.data("dottedoverlay")+'"></div>')}}if(f.attr("control")==aK){if(h.find(".tp-video-play-button").length==0){h.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><div class="tp-revstop"></div></div>')}h.find("video, .tp-poster, .tp-video-play-button").click(function(){if(h.hasClass("videoisplaying")){d.pause()}else{d.play()}})}if(bF.data("forcecover")==1||bF.hasClass("fullscreenvideo")){if(bF.data("forcecover")==1){ax(h,a.container);h.addClass("fullcoveredvideo");bF.addClass("fullcoveredvideo")}h.css({width:"100%",height:"100%"})}var G=bF.find(".tp-vid-play-pause")[0],K=bF.find(".tp-vid-mute")[0],A=bF.find(".tp-vid-full-screen")[0],z=bF.find(".tp-seek-bar")[0],C=bF.find(".tp-volume-bar")[0];if(G!=aK){an(G,"click",function(){if(d.paused==true){d.play()}else{d.pause()}});an(K,"click",function(){if(d.muted==false){d.muted=true;K.innerHTML="Unmute"}else{d.muted=false;K.innerHTML="Mute"}});an(A,"click",function(){if(d.requestFullscreen){d.requestFullscreen()}else{if(d.mozRequestFullScreen){d.mozRequestFullScreen()}else{if(d.webkitRequestFullscreen){d.webkitRequestFullscreen()}}}});an(z,"change",function(){var n=d.duration*(z.value/100);d.currentTime=n});an(d,"timeupdate",function(){var n=100/d.duration*d.currentTime;z.value=n});an(z,"mousedown",function(){d.pause()});an(z,"mouseup",function(){d.play()});an(C,"change",function(){d.volume=C.value})}an(d,"play",function(){if(bF.data("volume")=="mute"){d.muted=true}h.addClass("videoisplaying");if(bF.data("videoloop")=="loopandnoslidestop"){a.videoplaying=false;a.container.trigger("starttimer");a.container.trigger("revolution.slide.onvideostop")}else{a.videoplaying=true;a.container.trigger("stoptimer");a.container.trigger("revolution.slide.onvideoplay")}var L=bF.find(".tp-vid-play-pause")[0],N=bF.find(".tp-vid-mute")[0];if(L!=aK){L.innerHTML="Pause"}if(N!=aK&&d.muted){N.innerHTML="Unmute"}});an(d,"pause",function(){h.removeClass("videoisplaying");a.videoplaying=false;a.container.trigger("starttimer");a.container.trigger("revolution.slide.onvideostop");var n=bF.find(".tp-vid-play-pause")[0];if(n!=aK){n.innerHTML="Play"}});an(d,"ended",function(){h.removeClass("videoisplaying");a.videoplaying=false;a.container.trigger("starttimer");a.container.trigger("revolution.slide.onvideostop");if(a.nextslideatend==true){a.container.revnext()}})}var s=false;if(bF.data("autoplayonlyfirsttime")==true||bF.data("autoplayonlyfirsttime")=="true"){s=true}var I=16/9;if(bF.data("aspectratio")=="4:3"){I=4/3}h.data("mediaAspect",I);if(h.closest(".tp-caption").data("forcecover")==1){ax(h,a.container);h.addClass("fullcoveredvideo")}f.css({display:"block"});a.nextslideatend=bF.data("nextslideatend");if(bF.data("autoplay")==true||s==true){if(bF.data("videoloop")=="loopandnoslidestop"){a.videoplaying=false;a.container.trigger("starttimer");a.container.trigger("revolution.slide.onvideostop")}else{a.videoplaying=true;a.container.trigger("stoptimer");a.container.trigger("revolution.slide.onvideoplay")}if(bF.data("forcerewind")=="on"&&!h.hasClass("videoisplaying")){if(d.currentTime>0){d.currentTime=0}}if(bF.data("volume")=="mute"){d.muted=true}h.data("timerplay",setTimeout(function(){if(bF.data("forcerewind")=="on"&&!h.hasClass("videoisplaying")){if(d.currentTime>0){d.currentTime=0}}if(bF.data("volume")=="mute"){d.muted=true}d.play()},10+bF.data("start")))}if(h.data("ww")==aK){h.data("ww",f.attr("width"))}if(h.data("hh")==aK){h.data("hh",f.attr("height"))}if(!bF.hasClass("fullscreenvideo")&&bF.data("forcecover")==1){try{h.width(h.data("ww")*a.bw);h.height(h.data("hh")*a.bh)}catch(E){}}clearInterval(h.data("interval"))}}),100)})}if(bF.data("autoplay")==true){setTimeout(function(){if(bF.data("videoloop")!="loopandnoslidestop"){a.videoplaying=true;a.container.trigger("stoptimer")}},200);if(bF.data("videoloop")!="loopandnoslidestop"){a.videoplaying=true;a.container.trigger("stoptimer")}if(bF.data("autoplayonlyfirsttime")==true||bF.data("autoplayonlyfirsttime")=="true"){bF.data("autoplay",false);bF.data("autoplayonlyfirsttime",false)}}}var l=0;var bn=0;if(bF.find("img").length>0){var O=bF.find("img");if(O.width()==0){O.css({width:"auto"})}if(O.height()==0){O.css({height:"auto"})}if(O.data("ww")==aK&&O.width()>0){O.data("ww",O.width())}if(O.data("hh")==aK&&O.height()>0){O.data("hh",O.height())}var D=O.data("ww");var W=O.data("hh");if(D==aK){D=0}if(W==aK){W=0}O.width(D*a.bw);O.height(W*a.bh);l=O.width();bn=O.height()}else{if(bF.find("iframe").length>0||bF.find("video").length>0){var i=false,O=bF.find("iframe");if(O.length==0){O=bF.find("video");i=true}O.css({display:"block"});if(bF.data("ww")==aK){bF.data("ww",O.width())}if(bF.data("hh")==aK){bF.data("hh",O.height())}var D=bF.data("ww"),W=bF.data("hh");var c=bF;if(c.data("fsize")==aK){c.data("fsize",parseInt(c.css("font-size"),0)||0)}if(c.data("pt")==aK){c.data("pt",parseInt(c.css("paddingTop"),0)||0)}if(c.data("pb")==aK){c.data("pb",parseInt(c.css("paddingBottom"),0)||0)}if(c.data("pl")==aK){c.data("pl",parseInt(c.css("paddingLeft"),0)||0)}if(c.data("pr")==aK){c.data("pr",parseInt(c.css("paddingRight"),0)||0)}if(c.data("mt")==aK){c.data("mt",parseInt(c.css("marginTop"),0)||0)}if(c.data("mb")==aK){c.data("mb",parseInt(c.css("marginBottom"),0)||0)}if(c.data("ml")==aK){c.data("ml",parseInt(c.css("marginLeft"),0)||0)}if(c.data("mr")==aK){c.data("mr",parseInt(c.css("marginRight"),0)||0)}if(c.data("bt")==aK){c.data("bt",parseInt(c.css("borderTop"),0)||0)}if(c.data("bb")==aK){c.data("bb",parseInt(c.css("borderBottom"),0)||0)}if(c.data("bl")==aK){c.data("bl",parseInt(c.css("borderLeft"),0)||0)}if(c.data("br")==aK){c.data("br",parseInt(c.css("borderRight"),0)||0)}if(c.data("lh")==aK){c.data("lh",parseInt(c.css("lineHeight"),0)||0)}if(c.data("lh")=="auto"){c.data("lh",c.data("fsize")+4)}var bx=a.width,bJ=a.height;if(bx>a.startwidth){bx=a.startwidth}if(bJ>a.startheight){bJ=a.startheight}if(!bF.hasClass("fullscreenvideo")){bF.css({"font-size":c.data("fsize")*a.bw+"px","padding-top":c.data("pt")*a.bh+"px","padding-bottom":c.data("pb")*a.bh+"px","padding-left":c.data("pl")*a.bw+"px","padding-right":c.data("pr")*a.bw+"px","margin-top":c.data("mt")*a.bh+"px","margin-bottom":c.data("mb")*a.bh+"px","margin-left":c.data("ml")*a.bw+"px","margin-right":c.data("mr")*a.bw+"px","border-top":c.data("bt")*a.bh+"px","border-bottom":c.data("bb")*a.bh+"px","border-left":c.data("bl")*a.bw+"px","border-right":c.data("br")*a.bw+"px","line-height":c.data("lh")*a.bh+"px",height:W*a.bh+"px"})}else{k=0;w=0;bF.data("x",0);bF.data("y",0);var bD=a.height;if(a.autoHeight=="on"){bD=a.container.height()}bF.css({width:a.width,height:bD})}if(i==false){O.width(D*a.bw);O.height(W*a.bh)}else{if(bF.data("forcecover")!=1&&!bF.hasClass("fullscreenvideo")){O.width(D*a.bw);O.height(W*a.bh)}}l=O.width();bn=O.height()}else{bF.find(".tp-resizeme, .tp-resizeme *").each(function(){aN(a2(this),a)});if(bF.hasClass("tp-resizeme")){bF.find("*").each(function(){aN(a2(this),a)})}aN(bF,a);bn=bF.outerHeight(true);l=bF.outerWidth(true);var bk=bF.outerHeight();var bh=bF.css("backgroundColor");bF.find(".frontcorner").css({borderWidth:bk+"px",left:0-bk+"px",borderRight:"0px solid transparent",borderTopColor:bh});bF.find(".frontcornertop").css({borderWidth:bk+"px",left:0-bk+"px",borderRight:"0px solid transparent",borderBottomColor:bh});bF.find(".backcorner").css({borderWidth:bk+"px",right:0-bk+"px",borderLeft:"0px solid transparent",borderBottomColor:bh});bF.find(".backcornertop").css({borderWidth:bk+"px",right:0-bk+"px",borderLeft:"0px solid transparent",borderTopColor:bh})}}if(a.fullScreenAlignForce=="on"){k=0;w=0}if(bF.data("voffset")==aK){bF.data("voffset",0)}if(bF.data("hoffset")==aK){bF.data("hoffset",0)}var U=bF.data("voffset")*bu;var bj=bF.data("hoffset")*bu;var bl=a.startwidth*bu;var r=a.startheight*bu;if(a.fullScreenAlignForce=="on"){bl=a.container.width();r=a.container.height()}if(bF.data("x")=="center"||bF.data("xcenter")=="center"){bF.data("xcenter","center");bF.data("x",bl/2-bF.outerWidth(true)/2+bj)}if(bF.data("x")=="left"||bF.data("xleft")=="left"){bF.data("xleft","left");bF.data("x",0/bu+bj)}if(bF.data("x")=="right"||bF.data("xright")=="right"){bF.data("xright","right");bF.data("x",(bl-bF.outerWidth(true)+bj)/bu)}if(bF.data("y")=="center"||bF.data("ycenter")=="center"){bF.data("ycenter","center");bF.data("y",r/2-bF.outerHeight(true)/2+U)}if(bF.data("y")=="top"||bF.data("ytop")=="top"){bF.data("ytop","top");bF.data("y",0/a.bh+U)}if(bF.data("y")=="bottom"||bF.data("ybottom")=="bottom"){bF.data("ybottom","bottom");bF.data("y",(r-bF.outerHeight(true)+U)/bu)}if(bF.data("start")==aK){bF.data("start",1000)}var bg=bF.data("easing");if(bg==aK){bg="punchgs.Power1.easeOut"}var bi=bF.data("start")/1000,bf=bF.data("speed")/1000;if(bF.data("x")=="center"||bF.data("xcenter")=="center"){var bz=bF.data("x")+k}else{var bz=bu*bF.data("x")+k}if(bF.data("y")=="center"||bF.data("ycenter")=="center"){var P=bF.data("y")+w}else{var P=a.bh*bF.data("y")+w}punchgs.TweenLite.set(bF,{top:P,left:bz,overwrite:"auto"});if(bI==0){bv=true}if(bF.data("timeline")!=aK&&!bv){if(bI!=2){bF.data("timeline").gotoAndPlay(0)}bv=true}if(!bv){if(bF.data("timeline")!=aK){}var B=new punchgs.TimelineLite({smoothChildTiming:true,onStart:x});B.pause();if(a.fullScreenAlignForce=="on"){}var a8=bF;if(bF.data("mySplitText")!=aK){bF.data("mySplitText").revert()}if(bF.data("splitin")=="chars"||bF.data("splitin")=="words"||bF.data("splitin")=="lines"||bF.data("splitout")=="chars"||bF.data("splitout")=="words"||bF.data("splitout")=="lines"){if(bF.find("a").length>0){bF.data("mySplitText",new punchgs.SplitText(bF.find("a"),{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}))}else{if(bF.find(".tp-layer-inner-rotation").length>0){bF.data("mySplitText",new punchgs.SplitText(bF.find(".tp-layer-inner-rotation"),{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}))}else{bF.data("mySplitText",new punchgs.SplitText(bF,{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}))}}bF.addClass("splitted")}if(bF.data("splitin")=="chars"){a8=bF.data("mySplitText").chars}if(bF.data("splitin")=="words"){a8=bF.data("mySplitText").words}if(bF.data("splitin")=="lines"){a8=bF.data("mySplitText").lines}var M=ak();var F=ak();if(bF.data("repeat")!=aK){repeatV=bF.data("repeat")}if(bF.data("yoyo")!=aK){yoyoV=bF.data("yoyo")}if(bF.data("repeatdelay")!=aK){repeatdelayV=bF.data("repeatdelay")}var ba=bF.attr("class");if(ba.match("customin")){M=at(M,bF.data("customin"))}else{if(ba.match("randomrotate")){M.scale=Math.random()*3+1;M.rotation=Math.round(Math.random()*200-100);M.x=Math.round(Math.random()*200-100);M.y=Math.round(Math.random()*200-100)}else{if(ba.match("lfr")||ba.match("skewfromright")){M.x=15+a.width}else{if(ba.match("lfl")||ba.match("skewfromleft")){M.x=-15-l}else{if(ba.match("sfl")||ba.match("skewfromleftshort")){M.x=-50}else{if(ba.match("sfr")||ba.match("skewfromrightshort")){M.x=50}else{if(ba.match("lft")){M.y=-25-bn}else{if(ba.match("lfb")){M.y=25+a.height}else{if(ba.match("sft")){M.y=-50}else{if(ba.match("sfb")){M.y=50}}}}}}}}}}if(ba.match("skewfromright")||bF.hasClass("skewfromrightshort")){M.skewX=-85}else{if(ba.match("skewfromleft")||bF.hasClass("skewfromleftshort")){M.skewX=85}}if(ba.match("fade")||ba.match("sft")||ba.match("sfl")||ba.match("sfb")||ba.match("skewfromleftshort")||ba.match("sfr")||ba.match("skewfromrightshort")){M.opacity=0}if(av().toLowerCase()=="safari"){}var bw=bF.data("elementdelay")==aK?0:bF.data("elementdelay");F.ease=M.ease=bF.data("easing")==aK?punchgs.Power1.easeInOut:bF.data("easing");M.data=new Object;M.data.oldx=M.x;M.data.oldy=M.y;F.data=new Object;F.data.oldx=F.x;F.data.oldy=F.y;M.x=M.x*bu;M.y=M.y*bu;var bK=new punchgs.TimelineLite;if(bI!=2){if(ba.match("customin")){if(a8!=bF){B.add(punchgs.TweenLite.set(bF,{force3D:"auto",opacity:1,scaleX:1,scaleY:1,rotationX:0,rotationY:0,rotationZ:0,skewX:0,skewY:0,z:0,x:0,y:0,visibility:"visible",delay:0,overwrite:"all"}))}M.visibility="hidden";F.visibility="visible";F.overwrite="all";F.opacity=1;F.onComplete=g();F.delay=bi;F.force3D="auto";B.add(bK.staggerFromTo(a8,bf,M,F,bw),"frame0")}else{M.visibility="visible";M.transformPerspective=600;if(a8!=bF){B.add(punchgs.TweenLite.set(bF,{force3D:"auto",opacity:1,scaleX:1,scaleY:1,rotationX:0,rotationY:0,rotationZ:0,skewX:0,skewY:0,z:0,x:0,y:0,visibility:"visible",delay:0,overwrite:"all"}))}F.visibility="visible";F.delay=bi;F.onComplete=g();F.opacity=1;F.force3D="auto";if(ba.match("randomrotate")&&a8!=bF){for(var bA=0;bA<a8.length;bA++){var X=new Object;var bo=new Object;a2.extend(X,M);a2.extend(bo,F);M.scale=Math.random()*3+1;M.rotation=Math.round(Math.random()*200-100);M.x=Math.round(Math.random()*200-100);M.y=Math.round(Math.random()*200-100);if(bA!=0){bo.delay=bi+bA*bw}B.append(punchgs.TweenLite.fromTo(a8[bA],bf,X,bo),"frame0")}}else{B.add(bK.staggerFromTo(a8,bf,M,F,bw),"frame0")}}}bF.data("timeline",B);var bm=new Array;if(bF.data("frames")!=aK){var be=bF.data("frames");be=be.replace(/\s+/g,"");be=be.replace("{","");var bd=be.split("}");a2.each(bd,function(f,d){if(d.length>0){var h=az(d);ad(bF,a,h,"frame"+(f+10),bu)}})}B=bF.data("timeline");if(bF.data("end")!=aK&&(bI==-1||bI==2)){ac(bF,a,bF.data("end")/1000,M,"frame99",bu)}else{if(bI==-1||bI==2){ac(bF,a,999999,M,"frame99",bu)}else{ac(bF,a,200,M,"frame99",bu)}}B=bF.data("timeline");bF.data("timeline",B);ai(bF,bu);B.resume()}}if(bv){af(bF);ai(bF,bu);if(bF.data("timeline")!=aK){var bG=bF.data("timeline").getTweensOf();a2.each(bG,function(p,z){if(z.vars.data!=aK){var h=z.vars.data.oldx*bu;var d=z.vars.data.oldy*bu;if(z.progress()!=1&&z.progress()!=0){try{z.vars.x=h;z.vary.y=d}catch(f){}}else{if(z.progress()==1){punchgs.TweenLite.set(z.target,{x:h,y:d})}}}})}}});var v=a2("body").find("#"+a.container.attr("id")).find(".tp-bannertimer");v.data("opt",a);if(y!=aK){setTimeout(function(){y.resume()},30)}};var av=function(){var c=navigator.appName,a=navigator.userAgent,d;var b=a.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(b&&(d=a.match(/version\/([\.\d]+)/i))!=null){b[2]=d[1]}b=b?[b[1],b[2]]:[c,navigator.appVersion,"-?"];return b[0]};var ar=function(){var c=navigator.appName,a=navigator.userAgent,d;var b=a.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(b&&(d=a.match(/version\/([\.\d]+)/i))!=null){b[2]=d[1]}b=b?[b[1],b[2]]:[c,navigator.appVersion,"-?"];return b[1]};var aN=function(a,b){if(a.data("fsize")==aK){a.data("fsize",parseInt(a.css("font-size"),0)||0)}if(a.data("pt")==aK){a.data("pt",parseInt(a.css("paddingTop"),0)||0)}if(a.data("pb")==aK){a.data("pb",parseInt(a.css("paddingBottom"),0)||0)}if(a.data("pl")==aK){a.data("pl",parseInt(a.css("paddingLeft"),0)||0)}if(a.data("pr")==aK){a.data("pr",parseInt(a.css("paddingRight"),0)||0)}if(a.data("mt")==aK){a.data("mt",parseInt(a.css("marginTop"),0)||0)}if(a.data("mb")==aK){a.data("mb",parseInt(a.css("marginBottom"),0)||0)}if(a.data("ml")==aK){a.data("ml",parseInt(a.css("marginLeft"),0)||0)}if(a.data("mr")==aK){a.data("mr",parseInt(a.css("marginRight"),0)||0)}if(a.data("bt")==aK){a.data("bt",parseInt(a.css("borderTopWidth"),0)||0)}if(a.data("bb")==aK){a.data("bb",parseInt(a.css("borderBottomWidth"),0)||0)}if(a.data("bl")==aK){a.data("bl",parseInt(a.css("borderLeftWidth"),0)||0)}if(a.data("br")==aK){a.data("br",parseInt(a.css("borderRightWidth"),0)||0)}if(a.data("ls")==aK){a.data("ls",parseInt(a.css("letterSpacing"),0)||0)}if(a.data("lh")==aK){a.data("lh",parseInt(a.css("lineHeight"),0)||"auto")}if(a.data("minwidth")==aK){a.data("minwidth",parseInt(a.css("minWidth"),0)||0)}if(a.data("minheight")==aK){a.data("minheight",parseInt(a.css("minHeight"),0)||0)}if(a.data("maxwidth")==aK){a.data("maxwidth",parseInt(a.css("maxWidth"),0)||"none")}if(a.data("maxheight")==aK){a.data("maxheight",parseInt(a.css("maxHeight"),0)||"none")}if(a.data("wii")==aK){a.data("wii",parseInt(a.css("width"),0)||0)}if(a.data("hii")==aK){a.data("hii",parseInt(a.css("height"),0)||0)}if(a.data("wan")==aK){a.data("wan",a.css("-webkit-transition"))}if(a.data("moan")==aK){a.data("moan",a.css("-moz-animation-transition"))}if(a.data("man")==aK){a.data("man",a.css("-ms-animation-transition"))}if(a.data("ani")==aK){a.data("ani",a.css("transition"))}if(a.data("lh")=="auto"){a.data("lh",a.data("fsize")+4)}if(!a.hasClass("tp-splitted")){a.css("-webkit-transition","none");a.css("-moz-transition","none");a.css("-ms-transition","none");a.css("transition","none");punchgs.TweenLite.set(a,{fontSize:Math.round(a.data("fsize")*b.bw)+"px",letterSpacing:Math.floor(a.data("ls")*b.bw)+"px",paddingTop:Math.round(a.data("pt")*b.bh)+"px",paddingBottom:Math.round(a.data("pb")*b.bh)+"px",paddingLeft:Math.round(a.data("pl")*b.bw)+"px",paddingRight:Math.round(a.data("pr")*b.bw)+"px",marginTop:a.data("mt")*b.bh+"px",marginBottom:a.data("mb")*b.bh+"px",marginLeft:a.data("ml")*b.bw+"px",marginRight:a.data("mr")*b.bw+"px",borderTopWidth:Math.round(a.data("bt")*b.bh)+"px",borderBottomWidth:Math.round(a.data("bb")*b.bh)+"px",borderLeftWidth:Math.round(a.data("bl")*b.bw)+"px",borderRightWidth:Math.round(a.data("br")*b.bw)+"px",lineHeight:Math.round(a.data("lh")*b.bh)+"px",minWidth:a.data("minwidth")*b.bw+"px",minHeight:a.data("minheight")*b.bh+"px",overwrite:"auto"});setTimeout(function(){a.css("-webkit-transition",a.data("wan"));a.css("-moz-transition",a.data("moan"));a.css("-ms-transition",a.data("man"));a.css("transition",a.data("ani"))},30);if(a.data("maxheight")!="none"){a.css({maxHeight:a.data("maxheight")*b.bh+"px"})}if(a.data("maxwidth")!="none"){a.css({maxWidth:a.data("maxwidth")*b.bw+"px"})}}};var ai=function(b,a){b.find(".rs-pendulum").each(function(){var j=a2(this);if(j.data("timeline")==aK){j.data("timeline",new punchgs.TimelineLite);var f=j.data("startdeg")==aK?-20:j.data("startdeg"),g=j.data("enddeg")==aK?20:j.data("enddeg"),h=j.data("speed")==aK?2:j.data("speed"),d=j.data("origin")==aK?"50% 50%":j.data("origin"),c=j.data("easing")==aK?punchgs.Power2.easeInOut:j.data("ease");f=f*a;g=g*a;j.data("timeline").append(new punchgs.TweenLite.fromTo(j,h,{force3D:"auto",rotation:f,transformOrigin:d},{rotation:g,ease:c}));j.data("timeline").append(new punchgs.TweenLite.fromTo(j,h,{force3D:"auto",rotation:g,transformOrigin:d},{rotation:f,ease:c,onComplete:function(){j.data("timeline").restart()}}))}});b.find(".rs-rotate").each(function(){var f=a2(this);if(f.data("timeline")==aK){f.data("timeline",new punchgs.TimelineLite);var c=f.data("startdeg")==aK?0:f.data("startdeg"),d=f.data("enddeg")==aK?360:f.data("enddeg");speed=f.data("speed")==aK?2:f.data("speed"),origin=f.data("origin")==aK?"50% 50%":f.data("origin"),easing=f.data("easing")==aK?punchgs.Power2.easeInOut:f.data("easing");c=c*a;d=d*a;f.data("timeline").append(new punchgs.TweenLite.fromTo(f,speed,{force3D:"auto",rotation:c,transformOrigin:origin},{rotation:d,ease:easing,onComplete:function(){f.data("timeline").restart()}}))}});b.find(".rs-slideloop").each(function(){var l=a2(this);if(l.data("timeline")==aK){l.data("timeline",new punchgs.TimelineLite);var g=l.data("xs")==aK?0:l.data("xs"),h=l.data("ys")==aK?0:l.data("ys"),k=l.data("xe")==aK?0:l.data("xe"),d=l.data("ye")==aK?0:l.data("ye"),c=l.data("speed")==aK?2:l.data("speed"),j=l.data("easing")==aK?punchgs.Power2.easeInOut:l.data("easing");g=g*a;h=h*a;k=k*a;d=d*a;l.data("timeline").append(new punchgs.TweenLite.fromTo(l,c,{force3D:"auto",x:g,y:h},{x:k,y:d,ease:j}));l.data("timeline").append(new punchgs.TweenLite.fromTo(l,c,{force3D:"auto",x:k,y:d},{x:g,y:h,onComplete:function(){l.data("timeline").restart()}}))}});b.find(".rs-pulse").each(function(){var h=a2(this);if(h.data("timeline")==aK){h.data("timeline",new punchgs.TimelineLite);var f=h.data("zoomstart")==aK?0:h.data("zoomstart"),c=h.data("zoomend")==aK?0:h.data("zoomend"),d=h.data("speed")==aK?2:h.data("speed"),g=h.data("easing")==aK?punchgs.Power2.easeInOut:h.data("easing");h.data("timeline").append(new punchgs.TweenLite.fromTo(h,d,{force3D:"auto",scale:f},{scale:c,ease:g}));h.data("timeline").append(new punchgs.TweenLite.fromTo(h,d,{force3D:"auto",scale:c},{scale:f,onComplete:function(){h.data("timeline").restart()}}))}});b.find(".rs-wave").each(function(){var j=a2(this);if(j.data("timeline")==aK){j.data("timeline",new punchgs.TimelineLite);var f=j.data("angle")==aK?10:j.data("angle"),g=j.data("radius")==aK?10:j.data("radius"),h=j.data("speed")==aK?-20:j.data("speed"),d=j.data("origin")==aK?-20:j.data("origin");f=f*a;g=g*a;var c={a:0,ang:f,element:j,unit:g};j.data("timeline").append(new punchgs.TweenLite.fromTo(c,h,{a:360},{a:0,force3D:"auto",ease:punchgs.Linear.easeNone,onUpdate:function(){var i=c.a*(Math.PI/180);punchgs.TweenLite.to(c.element,0.1,{force3D:"auto",x:Math.cos(i)*c.unit,y:c.unit*(1-Math.sin(i))})},onComplete:function(){j.data("timeline").restart()}}))}})};var af=function(a){a.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function(){var b=a2(this);if(b.data("timeline")!=aK){b.data("timeline").pause();b.data("timeline",null)}})};var aE=function(f,c){var a=0;var b=f.find(".tp-caption"),d=c.container.find(".tp-static-layers").find(".tp-caption");a2.each(d,function(h,g){b.push(g)});b.each(function(j){var B=-1;var i=a2(this);if(i.hasClass("tp-static-layer")){if(i.data("startslide")==-1||i.data("startslide")=="-1"){i.data("startslide",0)}if(i.data("endslide")==-1||i.data("endslide")=="-1"){i.data("endslide",c.slideamount)}if(i.hasClass("tp-is-shown")){if(i.data("startslide")>c.next||i.data("endslide")<c.next){B=2;i.removeClass("tp-is-shown")}else{B=0}}else{B=2}}if(B!=0){af(i);if(i.find("iframe").length>0){punchgs.TweenLite.to(i.find("iframe"),0.2,{autoAlpha:0});if(aq()){i.find("iframe").remove()}try{var A=i.find("iframe");var y=A.attr("id");var t=$f(y);t.api("pause");clearTimeout(i.data("timerplay"))}catch(q){}try{var x=i.data("player");x.stopVideo();clearTimeout(i.data("timerplay"))}catch(q){}}if(i.find("video").length>0){try{i.find("video").each(function(l){var o=a2(this).parent();var m=o.attr("id");clearTimeout(o.data("timerplay"));var h=this;h.pause()})}catch(q){}}try{var r=i.data("timeline");var g=r.getLabelTime("frame99");var w=r.time();if(g>w){var z=r.getTweensOf(i);a2.each(z,function(l,h){if(l!=0){h.pause()}});if(i.css("opacity")!=0){var k=i.data("endspeed")==aK?i.data("speed"):i.data("endspeed");if(k>a){a=k}r.play("frame99")}else{r.progress(1,false)}}}catch(q){}}});return a};var ad=function(h,k,g,d,f){var j=h.data("timeline");var c=new punchgs.TimelineLite;var b=h;if(g.typ=="chars"){b=h.data("mySplitText").chars}else{if(g.typ=="words"){b=h.data("mySplitText").words}else{if(g.typ=="lines"){b=h.data("mySplitText").lines}}}g.animation.ease=g.ease;if(g.animation.rotationZ!=aK){g.animation.rotation=g.animation.rotationZ}g.animation.data=new Object;g.animation.data.oldx=g.animation.x;g.animation.data.oldy=g.animation.y;g.animation.x=g.animation.x*f;g.animation.y=g.animation.y*f;j.add(c.staggerTo(b,g.speed,g.animation,g.elementdelay),g.start);j.addLabel(d,g.start);h.data("timeline",j)};var ac=function(v,j,b,m,z,g){var y=v.data("timeline"),x=new punchgs.TimelineLite;var t=ak(),k=v.data("endspeed")==aK?v.data("speed"):v.data("endspeed"),w=v.attr("class");t.ease=v.data("endeasing")==aK?punchgs.Power1.easeInOut:v.data("endeasing");k=k/1000;if(w.match("ltr")||w.match("ltl")||w.match("str")||w.match("stl")||w.match("ltt")||w.match("ltb")||w.match("stt")||w.match("stb")||w.match("skewtoright")||w.match("skewtorightshort")||w.match("skewtoleft")||w.match("skewtoleftshort")||w.match("fadeout")||w.match("randomrotateout")){if(w.match("skewtoright")||w.match("skewtorightshort")){t.skewX=35}else{if(w.match("skewtoleft")||w.match("skewtoleftshort")){t.skewX=-35}}if(w.match("ltr")||w.match("skewtoright")){t.x=j.width+60}else{if(w.match("ltl")||w.match("skewtoleft")){t.x=0-(j.width+60)}else{if(w.match("ltt")){t.y=0-(j.height+60)}else{if(w.match("ltb")){t.y=j.height+60}else{if(w.match("str")||w.match("skewtorightshort")){t.x=50;t.opacity=0}else{if(w.match("stl")||w.match("skewtoleftshort")){t.x=-50;t.opacity=0}else{if(w.match("stt")){t.y=-50;t.opacity=0}else{if(w.match("stb")){t.y=50;t.opacity=0}else{if(w.match("randomrotateout")){t.x=Math.random()*j.width;t.y=Math.random()*j.height;t.scale=Math.random()*2+0.3;t.rotation=Math.random()*360-180;t.opacity=0}else{if(w.match("fadeout")){t.opacity=0}}}}}}}}}}if(w.match("skewtorightshort")){t.x=270}else{if(w.match("skewtoleftshort")){t.x=-270}}t.data=new Object;t.data.oldx=t.x;t.data.oldy=t.y;t.x=t.x*g;t.y=t.y*g;t.overwrite="auto";var q=v;var q=v;if(v.data("splitout")=="chars"){q=v.data("mySplitText").chars}else{if(v.data("splitout")=="words"){q=v.data("mySplitText").words}else{if(v.data("splitout")=="lines"){q=v.data("mySplitText").lines}}}var d=v.data("endelementdelay")==aK?0:v.data("endelementdelay");y.add(x.staggerTo(q,k,t,d),b)}else{if(v.hasClass("customout")){t=at(t,v.data("customout"));var q=v;if(v.data("splitout")=="chars"){q=v.data("mySplitText").chars}else{if(v.data("splitout")=="words"){q=v.data("mySplitText").words}else{if(v.data("splitout")=="lines"){q=v.data("mySplitText").lines}}}var d=v.data("endelementdelay")==aK?0:v.data("endelementdelay");t.onStart=function(){punchgs.TweenLite.set(v,{transformPerspective:t.transformPerspective,transformOrigin:t.transformOrigin,overwrite:"auto"})};t.data=new Object;t.data.oldx=t.x;t.data.oldy=t.y;t.x=t.x*g;t.y=t.y*g;y.add(x.staggerTo(q,k,t,d),b)}else{m.delay=0;y.add(punchgs.TweenLite.to(v,k,m),b)}}y.addLabel(z,b);v.data("timeline",y)};var ae=function(a,c){a.children().each(function(){try{a2(this).die("click")}catch(d){}try{a2(this).die("mouseenter")}catch(d){}try{a2(this).die("mouseleave")}catch(d){}try{a2(this).unbind("hover")}catch(d){}});try{a.die("click","mouseenter","mouseleave")}catch(b){}clearInterval(c.cdint);a=null};var aD=function(d,c){c.cd=0;c.loop=0;if(c.stopAfterLoops!=aK&&c.stopAfterLoops>-1){c.looptogo=c.stopAfterLoops}else{c.looptogo=9999999}if(c.stopAtSlide!=aK&&c.stopAtSlide>-1){c.lastslidetoshow=c.stopAtSlide}else{c.lastslidetoshow=999}c.stopLoop="off";if(c.looptogo==0){c.stopLoop="on"}if(c.slideamount>1&&!(c.stopAfterLoops==0&&c.stopAtSlide==1)){var a=d.find(".tp-bannertimer");d.on("stoptimer",function(){var f=a2(this).find(".tp-bannertimer");f.data("tween").pause();if(c.hideTimerBar=="on"){f.css({visibility:"hidden"})}});d.on("starttimer",function(){if(c.conthover!=1&&c.videoplaying!=true&&c.width>c.hideSliderAtLimit&&c.bannertimeronpause!=true&&c.overnav!=true){if(c.stopLoop=="on"&&c.next==c.lastslidetoshow-1||c.noloopanymore==1){c.noloopanymore=1}else{a.css({visibility:"visible"});a.data("tween").resume()}}if(c.hideTimerBar=="on"){a.css({visibility:"hidden"})}});d.on("restarttimer",function(){var f=a2(this).find(".tp-bannertimer");if(c.stopLoop=="on"&&c.next==c.lastslidetoshow-1||c.noloopanymore==1){c.noloopanymore=1}else{f.css({visibility:"visible"});f.data("tween").kill();f.data("tween",punchgs.TweenLite.fromTo(f,c.delay/1000,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:b,delay:1}))}if(c.hideTimerBar=="on"){f.css({visibility:"hidden"})}});d.on("nulltimer",function(){a.data("tween").pause(0);if(c.hideTimerBar=="on"){a.css({visibility:"hidden"})}});var b=function(){if(a2("body").find(d).length==0){ae(d,c);clearInterval(c.cdint)}d.trigger("revolution.slide.slideatend");if(d.data("conthover-changed")==1){c.conthover=d.data("conthover");d.data("conthover-changed",0)}c.act=c.next;c.next=c.next+1;if(c.next>d.find(">ul >li").length-1){c.next=0;c.looptogo=c.looptogo-1;if(c.looptogo<=0){c.stopLoop="on"}}if(c.stopLoop=="on"&&c.next==c.lastslidetoshow-1){d.find(".tp-bannertimer").css({visibility:"hidden"});d.trigger("revolution.slide.onstop");c.noloopanymore=1}else{a.data("tween").restart()}am(d,c)};a.data("tween",punchgs.TweenLite.fromTo(a,c.delay/1000,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:b,delay:1}));a.data("opt",c);d.hover(function(){if(c.onHoverStop=="on"&&!aq()){d.trigger("stoptimer");d.trigger("revolution.slide.onpause");var f=d.find(">ul >li:eq("+c.next+") .slotholder");f.find(".defaultimg").each(function(){var g=a2(this);if(g.data("kenburn")!=aK){g.data("kenburn").pause()}})}},function(){if(d.data("conthover")!=1){d.trigger("revolution.slide.onresume");d.trigger("starttimer");var f=d.find(">ul >li:eq("+c.next+") .slotholder");f.find(".defaultimg").each(function(){var g=a2(this);if(g.data("kenburn")!=aK){g.data("kenburn").play()}})}})}};var aq=function(){var b=["android","webos","iphone","ipad","blackberry","Android","webos",,"iPod","iPhone","iPad","Blackberry","BlackBerry"];var a=false;for(var c in b){if(navigator.userAgent.split(b[c]).length>1){a=true}}return a};var ap=function(g,c,j){var f=c.data("owidth");var b=c.data("oheight");if(f/b>j.width/j.height){var d=j.container.width()/f;var h=b*d;var a=h/j.container.height()*g;g=g*(100/a);a=100;g=g;return g+"% "+a+"% 1"}else{var d=j.container.width()/f;var h=b*d;var a=h/j.container.height()*g;return g+"% "+a+"%"}};var aj=function(I,F,L,D){try{var H=I.find(">ul:first-child >li:eq("+F.act+")")}catch(B){var H=I.find(">ul:first-child >li:eq(1)")}F.lastslide=F.act;var P=I.find(">ul:first-child >li:eq("+F.next+")"),K=P.find(".slotholder"),R=K.data("bgposition"),M=K.data("bgpositionend"),G=K.data("zoomstart")/100,Q=K.data("zoomend")/100,A=K.data("rotationstart"),J=K.data("rotationend"),O=K.data("bgfit"),q=K.data("bgfitend"),U=K.data("easeme"),z=K.data("duration")/1000,C=100;if(O==aK){O=100}if(q==aK){q=100}var j=O,t=q;O=ap(O,K,F);q=ap(q,K,F);C=ap(100,K,F);if(G==aK){G=1}if(Q==aK){Q=1}if(A==aK){A=0}if(J==aK){J=0}if(G<1){G=1}if(Q<1){Q=1}var a=new Object;a.w=parseInt(C.split(" ")[0],0),a.h=parseInt(C.split(" ")[1],0);var k=false;if(C.split(" ")[2]=="1"){k=true}K.find(".defaultimg").each(function(){var w=a2(this);if(K.find(".kenburnimg").length==0){K.append('<div class="kenburnimg" style="position:absolute;z-index:1;width:100%;height:100%;top:0px;left:0px;"><img src="'+w.attr("src")+'" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;position:absolute;width:'+a.w+"%;height:"+a.h+'%;"></div>')}else{K.find(".kenburnimg img").css({width:a.w+"%",height:a.h+"%"})}var g=K.find(".kenburnimg img");var h=au(F,R,O,g,k),c=au(F,M,q,g,k);if(k){h.w=j/100;c.w=t/100}if(D){punchgs.TweenLite.set(g,{autoAlpha:0,transformPerspective:1200,transformOrigin:"0% 0%",top:0,left:0,scale:h.w,x:h.x,y:h.y});var s=h.w,l=s*g.width()-F.width,b=s*g.height()-F.height,m=Math.abs(h.x/l*100),r=Math.abs(h.y/b*100);if(b==0){r=0}if(l==0){m=0}w.data("bgposition",m+"% "+r+"%");if(!a6(8)){w.data("currotate",ab(g))}if(!a6(8)){w.data("curscale",a.w*s+"%  "+(a.h*s+"%"))}K.find(".kenburnimg").remove()}else{w.data("kenburn",punchgs.TweenLite.fromTo(g,z,{autoAlpha:1,force3D:punchgs.force3d,transformOrigin:"0% 0%",top:0,left:0,scale:h.w,x:h.x,y:h.y},{autoAlpha:1,rotationZ:J,ease:U,x:c.x,y:c.y,scale:c.w,onUpdate:function(){var p=g[0]._gsTransform.scaleX;var f=p*g.width()-F.width,n=p*g.height()-F.height,v=Math.abs(g[0]._gsTransform.x/f*100),d=Math.abs(g[0]._gsTransform.y/n*100);if(n==0){d=0}if(f==0){v=0}w.data("bgposition",v+"% "+d+"%");if(!a6(8)){w.data("currotate",ab(g))}if(!a6(8)){w.data("curscale",a.w*p+"%  "+(a.h*p+"%"))}}}))}})};var au=function(f,b,g,d,a){var c=new Object;if(!a){c.w=parseInt(g.split(" ")[0],0)/100}else{c.w=parseInt(g.split(" ")[1],0)/100}switch(b){case"left top":case"top left":c.x=0;c.y=0;break;case"center top":case"top center":c.x=((0-d.width())*c.w+parseInt(f.width,0))/2;c.y=0;break;case"top right":case"right top":c.x=(0-d.width())*c.w+parseInt(f.width,0);c.y=0;break;case"center left":case"left center":c.x=0;c.y=((0-d.height())*c.w+parseInt(f.height,0))/2;break;case"center center":c.x=((0-d.width())*c.w+parseInt(f.width,0))/2;c.y=((0-d.height())*c.w+parseInt(f.height,0))/2;break;case"center right":case"right center":c.x=(0-d.width())*c.w+parseInt(f.width,0);c.y=((0-d.height())*c.w+parseInt(f.height,0))/2;break;case"bottom left":case"left bottom":c.x=0;c.y=(0-d.height())*c.w+parseInt(f.height,0);break;case"bottom center":case"center bottom":c.x=((0-d.width())*c.w+parseInt(f.width,0))/2;c.y=(0-d.height())*c.w+parseInt(f.height,0);break;case"bottom right":case"right bottom":c.x=(0-d.width())*c.w+parseInt(f.width,0);c.y=(0-d.height())*c.w+parseInt(f.height,0);break}return c};var ab=function(f){var b=f.css("-webkit-transform")||f.css("-moz-transform")||f.css("-ms-transform")||f.css("-o-transform")||f.css("transform");if(b!=="none"){var g=b.split("(")[1].split(")")[0].split(",");var d=g[0];var a=g[1];var c=Math.round(Math.atan2(a,d)*(180/Math.PI))}else{var c=0}return c<0?c+=360:c};var aa=function(j,g){try{var d=j.find(">ul:first-child >li:eq("+g.act+")")}catch(f){var d=j.find(">ul:first-child >li:eq(1)")}g.lastslide=g.act;var h=j.find(">ul:first-child >li:eq("+g.next+")");var c=d.find(".slotholder");var b=h.find(".slotholder");j.find(".defaultimg").each(function(){var a=a2(this);punchgs.TweenLite.killTweensOf(a,false);punchgs.TweenLite.set(a,{scale:1,rotationZ:0});punchgs.TweenLite.killTweensOf(a.data("kenburn img"),false);if(a.data("kenburn")!=aK){a.data("kenburn").pause()}if(a.data("currotate")!=aK&&a.data("bgposition")!=aK&&a.data("curscale")!=aK){punchgs.TweenLite.set(a,{rotation:a.data("currotate"),backgroundPosition:a.data("bgposition"),backgroundSize:a.data("curscale")})}if(a!=aK&&a.data("kenburn img")!=aK&&a.data("kenburn img").length>0){punchgs.TweenLite.set(a.data("kenburn img"),{autoAlpha:0})}})};var aO=function(a,b){if(aq()&&b.parallaxDisableOnMobile=="on"){return false}a.find(">ul:first-child >li").each(function(){var c=a2(this);for(var d=1;d<=10;d++){c.find(".rs-parallaxlevel-"+d).each(function(){var f=a2(this);f.wrap('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:'+f.css("zIndex")+'" class="tp-parallax-container" data-parallaxlevel="'+b.parallaxLevels[d-1]+'"></div>')})}});if(b.parallax=="mouse"||b.parallax=="scroll+mouse"||b.parallax=="mouse+scroll"){a.mouseenter(function(g){var j=a.find(".current-sr-slide-visible");var f=a.offset().top,c=a.offset().left,d=g.pageX-c,h=g.pageY-f;j.data("enterx",d);j.data("entery",h)});a.on("mousemove.hoverdir, mouseleave.hoverdir",function(k){var h=a.find(".current-sr-slide-visible");switch(k.type){case"mousemove":var j=a.offset().top,n=a.offset().left,g=h.data("enterx"),d=h.data("entery"),m=g-(k.pageX-n),c=d-(k.pageY-j);h.find(".tp-parallax-container").each(function(){var l=a2(this),p=parseInt(l.data("parallaxlevel"),0)/100,f=m*p,o=c*p;if(b.parallax=="scroll+mouse"||b.parallax=="mouse+scroll"){punchgs.TweenLite.to(l,0.4,{force3D:"auto",x:f,ease:punchgs.Power3.easeOut,overwrite:"all"})}else{punchgs.TweenLite.to(l,0.4,{force3D:"auto",x:f,y:o,ease:punchgs.Power3.easeOut,overwrite:"all"})}});break;case"mouseleave":h.find(".tp-parallax-container").each(function(){var f=a2(this);if(b.parallax=="scroll+mouse"||b.parallax=="mouse+scroll"){punchgs.TweenLite.to(f,1.5,{force3D:"auto",x:0,ease:punchgs.Power3.easeOut})}else{punchgs.TweenLite.to(f,1.5,{force3D:"auto",x:0,y:0,ease:punchgs.Power3.easeOut})}});break}});if(aq()){window.ondeviceorientation=function(k){var h=Math.round(k.beta||0),f=Math.round(k.gamma||0);var g=a.find(".current-sr-slide-visible");if(a2(window).width()>a2(window).height()){var j=f;f=h;h=j}var d=360/a.width()*f,c=180/a.height()*h;g.find(".tp-parallax-container").each(function(){var m=a2(this),p=parseInt(m.data("parallaxlevel"),0)/100,o=d*p,l=c*p;punchgs.TweenLite.to(m,0.2,{force3D:"auto",x:o,y:l,ease:punchgs.Power3.easeOut})})}}}if(b.parallax=="scroll"||b.parallax=="scroll+mouse"||b.parallax=="mouse+scroll"){a2(window).on("scroll",function(c){a0(a,b)})}};var a0=function(v,g){if(aq()&&g.parallaxDisableOnMobile=="on"){return false}var b=v.offset().top,j=a2(window).scrollTop(),w=b+v.height()/2,d=b+v.height()/2-j,q=a2(window).height()/2,p=q-d;if(w<q){p=p-(q-w)}var k=v.find(".current-sr-slide-visible");v.find(".tp-parallax-container").each(function(c){var l=a2(this),f=parseInt(l.data("parallaxlevel"),0)/100,a=p*f;l.data("parallaxoffset",a);punchgs.TweenLite.to(l,0.2,{force3D:"auto",y:a,ease:punchgs.Power3.easeOut})});if(g.parallaxBgFreeze!="on"){var h=g.parallaxLevels[0]/100,m=p*h;punchgs.TweenLite.to(v,0.2,{force3D:"auto",y:m,ease:punchgs.Power3.easeOut})}};var aV=function(k,h){var f=k.parent();if(h.navigationType=="thumb"||h.navsecond=="both"){f.append('<div class="tp-bullets tp-thumbs '+h.navigationStyle+'"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')}var g=f.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");var j=g.parent();j.width(h.thumbWidth*h.thumbAmount);j.height(h.thumbHeight);j.parent().width(h.thumbWidth*h.thumbAmount);j.parent().height(h.thumbHeight);k.find(">ul:first >li").each(function(p){var n=k.find(">ul:first >li:eq("+p+")");var q=n.find(".defaultimg").css("backgroundColor");if(n.data("thumb")!=aK){var m=n.data("thumb")}else{var m=n.find("img:first").attr("src")}g.append('<div class="bullet thumb" style="background-color:'+q+";position:relative;width:"+h.thumbWidth+"px;height:"+h.thumbHeight+"px;background-image:url("+m+') !important;background-size:cover;background-position:center center;"></div>');var l=g.find(".bullet:first")});var d=10;g.find(".bullet").each(function(l){var a=a2(this);if(l==h.slideamount-1){a.addClass("last")}if(l==0){a.addClass("first")}a.width(h.thumbWidth);a.height(h.thumbHeight);if(d<a.outerWidth(true)){d=a.outerWidth(true)}a.click(function(){if(h.transition==0&&a.index()!=h.act){h.next=a.index();a1(h,k)}})});var c=d*k.find(">ul:first >li").length;var b=g.parent().width();h.thumbWidth=d;if(b<c){a2(document).mousemove(function(a){a2("body").data("mousex",a.pageX)});g.parent().mouseenter(function(){var y=a2(this);var m=y.offset(),q=a2("body").data("mousex")-m.left,z=y.width(),n=y.find(".bullet:first").outerWidth(true),x=n*k.find(">ul:first >li").length,w=x-z+15,v=w/z;y.addClass("over");q=q-30;var p=0-q*v;if(p>0){p=0}if(p<0-x+z){p=0-x+z}aB(y,p,200)});g.parent().mousemove(function(){var y=a2(this),m=y.offset(),q=a2("body").data("mousex")-m.left,z=y.width(),n=y.find(".bullet:first").outerWidth(true),x=n*k.find(">ul:first >li").length-1,w=x-z+15,v=w/z;q=q-3;if(q<6){q=0}if(q+3>z-6){q=z}var p=0-q*v;if(p>0){p=0}if(p<0-x+z){p=0-x+z}aB(y,p,0)});g.parent().mouseleave(function(){var a=a2(this);a.removeClass("over");aC(k)})}};var aC=function(k){var q=k.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer"),d=q.parent(),b=d.offset(),h=d.find(".bullet:first").outerWidth(true),v=d.find(".bullet.selected").index()*h,c=d.width(),h=d.find(".bullet:first").outerWidth(true),p=h*k.find(">ul:first >li").length,m=p-c,j=m/c,g=0-v;if(g>0){g=0}if(g<0-p+c){g=0-p+c}if(!d.hasClass("over")){aB(d,g,200)}};var aB=function(b,a,c){punchgs.TweenLite.to(b.find(".tp-thumbcontainer"),0.2,{force3D:"auto",left:a,ease:punchgs.Power3.easeOut,overwrite:"auto"})}})(jQuery);
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function( url, rez, params ) {
			params = params || '';

			if ( $.type( params ) === "object" ) {
				params = $.param(params, true);
			}

			$.each(rez, function(key, value) {
				url = url.replace( '$' + key, value || '' );
			});

			if (params.length) {
				url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults : {
			youtube : {
				matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params  : {
					autoplay    : 1,
					autohide    : 1,
					fs          : 1,
					rel         : 0,
					hd          : 1,
					wmode       : 'opaque',
					enablejsapi : 1
				},
				type : 'iframe',
				url  : '//www.youtube.com/embed/$3'
			},
			vimeo : {
				matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params  : {
					autoplay      : 1,
					hd            : 1,
					show_title    : 1,
					show_byline   : 1,
					show_portrait : 0,
					fullscreen    : 1
				},
				type : 'iframe',
				url  : '//player.vimeo.com/video/$1'
			},
			metacafe : {
				matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params  : {
					autoPlay : 'yes'
				},
				type : 'swf',
				url  : function( rez, params, obj ) {
					obj.swf.flashVars = 'playerVars=' + $.param( params, true );

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion : {
				matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
				params  : {
					additionalInfos : 0,
					autoStart : 1
				},
				type : 'swf',
				url  : '//www.dailymotion.com/swf/video/$1'
			},
			twitvid : {
				matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params  : {
					autoplay : 0
				},
				type : 'iframe',
				url  : '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic : {
				matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type : 'image',
				url  : '//twitpic.com/show/full/$1/'
			},
			instagram : {
				matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type : 'image',
				url  : '//$1/p/$2/media/?size=l'
			},
			google_maps : {
				matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type : 'iframe',
				url  : function( rez ) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad : function(opts, obj) {
			var url   = obj.href || '',
				type  = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[ what ];
					rez  = url.match( item.matcher );

					if (rez) {
						type   = item.type;
						params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));

						url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));
/* == jquery mousewheel plugin == Version: 3.1.12, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.9, License: MIT License (MIT) */
!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:!0,autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&V(t),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),S.call(this),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r.children())),n.overflowed=B.call(this),O.call(this),i.autoDraggerLength&&b.call(this),C.call(this),k.call(this);var s=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?l[0].height()>l[0].parent().height()?T.call(this):(Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(T.call(this),"y"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[1]&&Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?l[1].width()>l[1].parent().width()?T.call(this):(Q(t,s[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(T.call(this),"x"===i.axis?M.call(this):"yx"===i.axis&&n.overflowed[0]&&Q(t,s[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=j.call(this,c[0],"y"),c[1]=j.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",Q(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",Q(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&V(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),M.call(this),t&&T.call(this),O.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),M.call(this),T.call(this),n.removeData(a),Z(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),Z(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p.children())),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){return Math.max.apply(Math,t.map(function(){return e(this).outerWidth(!0)}).get())},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis&&i.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),position:"relative"}).unwrap()},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=te(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=t.css("max-height")||"none",r=-1!==i.indexOf("%"),l=t.css("box-sizing");if("none"!==i){var s=r?t.parent().height()*parseInt(i)/100:parseInt(i);"border-box"===l&&(s-=t.innerHeight()-t.height()+(t.outerHeight()-t.innerHeight())),n.css("max-height",Math.round(s))}},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},C=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},y=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},B=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1);return[r>n.height(),l>n.width()]},T=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(V(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),Q(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),Q(t,"_resetX")}},k=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(R.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),H.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&U.call(this),i.keyboard.enable&&F.call(this),n.bindEvents=!0}},M=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),o.bindEvents&&(e(document).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),Z(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),Z(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),Z(s[0],"onCompleteTimeout"),o.bindEvents=!1)},O=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},I=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var o=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[o.screenY,o.screenX,a>1]:[o.pageY,o.pageX,a>1];default:return[e.pageY,e.pageX,!1]}},R=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;Q(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p;p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),$(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),V(l),n=e(this);var a=n.offset(),d=I(o)[0]-a.top,f=I(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),y(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;o(i,r,a,l)}),e(document).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=I(e)[0]-t.top,l=I(e)[1]-t.left;if(i===a)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(y(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,S=0,b=0,C.removeClass("mCS_touch_action");var o=M.offset();d=I(e)[0]-o.top,u=I(e)[1]-o.left,A=[I(e)[0],I(e)[1]]}function n(e){if(ee(e)&&!c&&!I(e)[2]&&(e.stopImmediatePropagation(),!b||S)){p=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left,n="mcsLinearOut";if(R.push(o),D.push(a),A[2]=Math.abs(I(e)[0]-A[0]),A[3]=Math.abs(I(e)[1]-A[1]),y.overflowed[0])var i=O[0].parent().height()-O[0].height(),r=d-o>0&&o-d>-(i*y.scrollRatio.y)&&(2*A[3]<A[2]||"yx"===B.axis);if(y.overflowed[1])var l=O[1].parent().width()-O[1].width(),f=u-a>0&&a-u>-(l*y.scrollRatio.x)&&(2*A[2]<A[3]||"yx"===B.axis);r||f?(e.preventDefault(),S=1):(b=1,C.addClass("mCS_touch_action")),_="yx"===B.axis?[d-o,u-a]:"x"===B.axis?[null,u-a]:[d-o,null],M[0].idleTimer=250,y.overflowed[0]&&s(_[0],E,n,"y","all",!0),y.overflowed[1]&&s(_[1],E,n,"x",W,!0)}}function i(e){if(!ee(e)||c||I(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),V(C),m=J();var o=k.offset();f=I(e)[0]-o.top,h=I(e)[1]-o.left,R=[],D=[]}function r(e){if(ee(e)&&!c&&!I(e)[2]){e.stopImmediatePropagation(),S=0,b=0,g=J();var t=k.offset(),o=I(e)[0]-t.top,a=I(e)[1]-t.left;if(!(g-p>30)){x=1e3/(g-m);var n="mcsEaseOut",i=2.5>x,r=i?[R[R.length-2],D[D.length-2]]:[0,0];v=i?[o-r[0],a-r[1]]:[o-f,a-h];var d=[Math.abs(v[0]),Math.abs(v[1])];x=i?[Math.abs(v[0]/4),Math.abs(v[1]/4)]:[x,x];var u=[Math.abs(M[0].offsetTop)-v[0]*l(d[0]/x[0],x[0]),Math.abs(M[0].offsetLeft)-v[1]*l(d[1]/x[1],x[1])];_="yx"===B.axis?[u[0],u[1]]:"x"===B.axis?[null,u[1]]:[u[0],null],w=[4*d[0]+B.scrollInertia,4*d[1]+B.scrollInertia];var C=parseInt(B.contentTouchScroll)||0;_[0]=d[0]>C?_[0]:0,_[1]=d[1]>C?_[1]:0,y.overflowed[0]&&s(_[0],w[0],n,"y",W,!1),y.overflowed[1]&&s(_[1],w[1],n,"x",W,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&Q(C,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C=e(this),y=C.data(a),B=y.opt,T=a+"_"+y.idx,k=e("#mCSB_"+y.idx),M=e("#mCSB_"+y.idx+"_container"),O=[e("#mCSB_"+y.idx+"_dragger_vertical"),e("#mCSB_"+y.idx+"_dragger_horizontal")],R=[],D=[],E=0,W="yx"===B.axis?"none":"all",A=[],P=M.find("iframe"),z=["touchstart."+T+" pointerdown."+T+" MSPointerDown."+T,"touchmove."+T+" pointermove."+T+" MSPointerMove."+T,"touchend."+T+" pointerup."+T+" MSPointerUp."+T];M.bind(z[0],function(e){o(e)}).bind(z[1],function(e){n(e)}),k.bind(z[0],function(e){i(e)}).bind(z[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(z[0],function(e){o(e),i(e)}).bind(z[1],function(e){n(e)}).bind(z[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,q(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=I(e)[0]-a.top+f[0].offsetTop,c=I(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(V(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100;if("x"===i.axis||"x"===i.mouseWheel.axis)var d="x",u=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.width()?.9*l.width():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),m=c[1][0].offsetLeft,p=c[1].parent().width()-c[1].width(),g=t.deltaX||t.deltaY||a;else var d="y",u=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],f="auto"!==i.mouseWheel.scrollAmount?u[1]:u[0]>=l.height()?.9*l.height():u[0],h=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),m=c[0][0].offsetTop,p=c[0].parent().height()-c[0].height(),g=t.deltaY||a;"y"===d&&!n.overflowed[0]||"x"===d&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(g=-g),i.mouseWheel.normalizeDelta&&(g=0>g?-1:1),(g>0&&0!==m||0>g&&m!==p||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),Q(o,(h-g*f).toString(),{dir:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},L=function(e){var t=null;try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container"),r=i.parent(),l=e(".mCSB_"+o.idx+"_scrollbar ."+d[12]);l.bind("touchstart."+n+" pointerdown."+n+" MSPointerDown."+n,function(e){c=!0}).bind("touchend."+n+" pointerup."+n+" MSPointerUp."+n,function(e){c=!1}).bind("click."+n,function(a){if(e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail")){V(t);var n=e(this),l=n.find(".mCSB_dragger");if(n.parent(".mCSB_scrollTools_horizontal").length>0){if(!o.overflowed[1])return;var s="x",c=a.pageX>l.offset().left?-1:1,u=Math.abs(i[0].offsetLeft)-.9*c*r.width()}else{if(!o.overflowed[0])return;var s="y",c=a.pageY>l.offset().top?-1:1,u=Math.abs(i[0].offsetTop)-.9*c*r.height()}Q(t,u.toString(),{dir:s,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(V(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[oe(a)[0],oe(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||Q(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||Q(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},H=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},U=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.snapAmount||n.scrollButtons.scrollAmount,q(t,e,o)}if(a.preventDefault(),$(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},F=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.snapAmount||i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||q(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){V(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;Q(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){L(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},q=function(t,o,n,i,r){function l(e){var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],u="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,m="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),v="auto"!==f.scrollAmount?m:u,x=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",_=e?!0:!1;return e&&17>a&&(v="x"===f.dir[0]?s[1]:s[0]),Q(t,v.toString(),{dir:f.dir[0],scrollEasing:x,dur:a,onComplete:_}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),Z(f,"step"),V(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],V(t),te(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},j=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?oe(m)[1]:oe(m)[0];case"string":case"number":if(te(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&te(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?oe(m)[1]:oe(m)[0]}return e(t).length?"x"===o?oe(e(t))[1]:oe(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(h[0].autoUpdate),0===s.parents("html").length?void(s=null):void(h[0].autoUpdate=setTimeout(function(){return f.advanced.updateOnSelectorChange&&(m=r(),m!==w)?(l(3),void(w=m)):(f.advanced.updateOnContentResize&&(p=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],(p[0]!==S[0]||p[1]!==S[1]||p[2]!==S[2]||p[3]!==S[3]||p[4]!==S[4]||p[5]!==S[5])&&(l(p[0]!==S[0]||p[1]!==S[1]),S=p)),f.advanced.updateOnImageLoad&&(g=n(),g!==b&&(h.find("img").each(function(){i(this)}),b=g)),void((f.advanced.updateOnSelectorChange||f.advanced.updateOnContentResize||f.advanced.updateOnImageLoad)&&o()))},f.advanced.autoUpdateTimeout))}function n(){var e=0;return f.advanced.updateOnImageLoad&&(e=h.find("img").length),e}function i(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),l(2)}if(e(t).hasClass(d[2]))return void l();var n=new Image;n.onload=o(n,a),n.src=t.src}function r(){f.advanced.updateOnSelectorChange===!0&&(f.advanced.updateOnSelectorChange="*");var t=0,o=h.find(f.advanced.updateOnSelectorChange);return f.advanced.updateOnSelectorChange&&o.length>0&&o.each(function(){t+=e(this).height()+e(this).width()}),t}function l(e){clearTimeout(h[0].autoUpdate),u.update.call(null,s[0],e)}var s=e(this),c=s.data(a),f=c.opt,h=e("#mCSB_"+c.idx+"_container");if(t)return clearTimeout(h[0].autoUpdate),void Z(h[0],"autoUpdate");var m,p,g,v=h.parent(),x=[e("#mCSB_"+c.idx+"_scrollbar_vertical"),e("#mCSB_"+c.idx+"_scrollbar_horizontal")],_=function(){return[x[0].is(":visible")?x[0].outerHeight(!0):0,x[1].is(":visible")?x[1].outerWidth(!0):0]},w=r(),S=[h.outerHeight(!1),h.outerWidth(!1),v.height(),v.width(),_()[0],_()[1]],b=n();o()},N=function(e,t,o){return Math.round(e/t)*t-o},V=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){K.call(this)})},Q=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||_>=w[0]+b,c.callbacks.alwaysTriggerOffsets||-C>=_]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[v[0].offsetTop,v[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",
callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(o=N(o,c.snapAmount,c.snapOffset)),n.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",_=h[0].offsetLeft,w=[f.width()-h.outerWidth(!1),v.parent().width()-v.width()],S=[o,0===o?0:o/s.scrollRatio.x],b=p[1],C=g[1],B=b>0?b/s.scrollRatio.x:0,T=C>0?C/s.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",_=h[0].offsetTop,w=[f.height()-h.outerHeight(!1),v.parent().height()-v.height()],S=[o,0===o?0:o/s.scrollRatio.y],b=p[0],C=g[0],B=b>0?b/s.scrollRatio.y:0,T=C>0?C/s.scrollRatio.y:0}S[1]<0||0===S[0]&&0===S[1]?S=[0,0]:S[1]>=w[1]?S=[w[0],w[1]]:S[0]=-S[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(s.tweenRunning||!(0===_&&S[0]>=0||_===w[0]&&S[0]<=w[0]))&&(G(v[0],x,Math.round(S[1]),u[1],n.scrollEasing),G(h[0],x,Math.round(S[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,y(v),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&S[1]>=w[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&S[1]<=T&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,y(v,"hide")},e)}}}))}},G=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=J()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=J(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},J=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},K=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},Z=function(e,t){try{delete e[t]}catch(o){e[t]=null}},$=function(e){return!(e.which&&1!==e.which)},ee=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},te=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},oe=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+oe(n)[0]>=0&&a[0]+oe(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+oe(n)[1]>=0&&a[1]+oe(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	var drag, state, e;

	/**
	 * Template for status information about drag and touch events.
	 * @private
	 */
	drag = {
		start: 0,
		startX: 0,
		startY: 0,
		current: 0,
		currentX: 0,
		currentY: 0,
		offsetX: 0,
		offsetY: 0,
		distance: null,
		startTime: 0,
		endTime: 0,
		updatedX: 0,
		targetEl: null
	};

	/**
	 * Template for some status informations.
	 * @private
	 */
	state = {
		isTouch: false,
		isScrolling: false,
		isSwiping: false,
		direction: false,
		inMotion: false
	};

	/**
	 * Event functions references.
	 * @private
	 */
	e = {
		_onDragStart: null,
		_onDragMove: null,
		_onDragEnd: null,
		_transitionEnd: null,
		_resizer: null,
		_responsiveCall: null,
		_goToLoop: null,
		_checkVisibile: null
	};

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Caches informations about drag and touch events.
		 */
		this.drag = $.extend({}, drag);

		/**
		 * Caches some status informations.
		 * @protected
		 */
		this.state = $.extend({}, state);

		/**
		 * @protected
		 * @todo Must be documented
		 */
		this.e = $.extend({}, e);

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key[0].toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Pipe, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 750,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,
		responsiveClass: false,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		// Classes and Names
		themeClass: 'owl-theme',
		baseClass: 'owl-carousel',
		itemClass: 'owl-item',
		centerClass: 'center',
		activeClass: 'active'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * Update pipe.
	 */
	Owl.Pipe = [ {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var cached = this._clones,
				clones = this.$stage.children('.cloned');

			if (clones.length !== cached.length || (!this.settings.loop && cached.length > 0)) {
				this.$stage.children('.cloned').remove();
				this._clones = [];
			}
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var i, n,
				clones = this._clones,
				items = this._items,
				delta = this.settings.loop ? clones.length - Math.max(this.settings.items * 2, 4) : 0;

			for (i = 0, n = Math.abs(delta / 2); i < n; i++) {
				if (delta > 0) {
					this.$stage.children().eq(items.length + clones.length - 1).remove();
					clones.pop();
					this.$stage.children().eq(0).remove();
					clones.pop();
				} else {
					clones.push(clones.length / 2);
					this.$stage.append(items[clones[clones.length - 1]].clone().addClass('cloned'));
					clones.push(items.length - 1 - (clones.length - 1) / 2);
					this.$stage.prepend(items[clones[clones.length - 1]].clone().addClass('cloned'));
				}
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = (this.settings.rtl ? 1 : -1),
				width = (this.width() / this.settings.items).toFixed(3),
				coordinate = 0, merge, i, n;

			this._coordinates = [];
			for (i = 0, n = this._clones.length + this._items.length; i < n; i++) {
				merge = this._mergers[this.relative(i)];
				merge = (this.settings.mergeFit && Math.min(merge, this.settings.items)) || merge;
				coordinate += (this.settings.autoWidth ? this._items[this.relative(i)].width() + this.settings.margin : width * merge) * rtl;

				this._coordinates.push(coordinate);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var i, n, width = (this.width() / this.settings.items).toFixed(3), css = {
				'width': Math.abs(this._coordinates[this._coordinates.length - 1]) + this.settings.stagePadding * 2,
				'padding-left': this.settings.stagePadding || '',
				'padding-right': this.settings.stagePadding || ''
			};

			this.$stage.css(css);

			css = { 'width': this.settings.autoWidth ? 'auto' : width - this.settings.margin };
			css[this.settings.rtl ? 'margin-left' : 'margin-right'] = this.settings.margin;

			if (!this.settings.autoWidth && $.grep(this._mergers, function(v) { return v > 1 }).length > 0) {
				for (i = 0, n = this._coordinates.length; i < n; i++) {
					css.width = Math.abs(this._coordinates[i]) - Math.abs(this._coordinates[i - 1] || 0) - this.settings.margin;
					this.$stage.children().eq(i).css(css);
				}
			} else {
				this.$stage.children().css(css);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current && this.reset(this.$stage.children().index(cache.current));
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.' + this.settings.activeClass).removeClass(this.settings.activeClass);
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass(this.settings.activeClass);

			if (this.settings.center) {
				this.$stage.children('.' + this.settings.centerClass).removeClass(this.settings.centerClass);
				this.$stage.children().eq(this.current()).addClass(this.settings.centerClass);
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.trigger('initialize');

		this.$element
			.addClass(this.settings.baseClass)
			.addClass(this.settings.themeClass)
			.toggleClass('owl-rtl', this.settings.rtl);

		// check support
		this.browserSupport();

		if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
				return false;
			}
		}

		this.$element.addClass('owl-loading');

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="owl-stage"/>')
			.wrap('<div class="owl-stage-outer">');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// set view width
		this._width = this.$element.width();

		// update view
		this.refresh();

		this.$element.removeClass('owl-loading').addClass('owl-loaded');

		// attach generic events
		this.eventsCall();

		// attach generic events
		this.internalEvents();

		// attach custom control events
		this.addTriggerableEvents();

		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class', function(i, c) {
					return c.replace(/\b owl-responsive-\S+/g, '');
				}).addClass('owl-responsive-' + match);
			}
		}

		if (this.settings === null || this._breakpoint !== match) {
			this.trigger('change', { property: { name: 'settings', value: settings } });
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', { property: { name: 'settings', value: this.settings } });
		}
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		// Toggle Center class
		this.$element.toggleClass('owl-center', this.settings.center);

		// if items number is less than in body
		if (this.settings.loop && this._items.length < this.settings.items) {
			this.settings.loop = false;
		}

		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.settings.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		if (this._items.length === 0) {
			return false;
		}

		var start = new Date().getTime();

		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		// hide and show methods helps here to set a proper widths,
		// this prevents scrollbar to be calculated in stage width
		this.$stage.addClass('owl-refresh');

		this.update();

		this.$stage.removeClass('owl-refresh');

		this.state.orientation = window.orientation;

		this.watchVisibility();

		this.trigger('refreshed');
	};

	/**
	 * Save internal event references and add event based functions.
	 * @protected
	 */
	Owl.prototype.eventsCall = function() {
		// Save events references
		this.e._onDragStart = $.proxy(function(e) {
			this.onDragStart(e);
		}, this);
		this.e._onDragMove = $.proxy(function(e) {
			this.onDragMove(e);
		}, this);
		this.e._onDragEnd = $.proxy(function(e) {
			this.onDragEnd(e);
		}, this);
		this.e._onResize = $.proxy(function(e) {
			this.onResize(e);
		}, this);
		this.e._transitionEnd = $.proxy(function(e) {
			this.transitionEnd(e);
		}, this);
		this.e._preventClick = $.proxy(function(e) {
			this.preventClick(e);
		}, this);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (this.trigger('resize').isDefaultPrevented()) {
			return false;
		}

		this._width = this.$element.width();

		this.invalidate('width');

		this.refresh();

		this.trigger('resized');
	};

	/**
	 * Checks for touch/mouse drag event type and add run event handlers.
	 * @protected
	 */
	Owl.prototype.eventsRouter = function(event) {
		var type = event.type;

		if (type === "mousedown" || type === "touchstart") {
			this.onDragStart(event);
		} else if (type === "mousemove" || type === "touchmove") {
			this.onDragMove(event);
		} else if (type === "mouseup" || type === "touchend") {
			this.onDragEnd(event);
		} else if (type === "touchcancel") {
			this.onDragEnd(event);
		}
	};

	/**
	 * Checks for touch/mouse drag options and add necessery event handlers.
	 * @protected
	 */
	Owl.prototype.internalEvents = function() {
		var isTouch = isTouchSupport(),
			isTouchIE = isTouchSupportIE();

		if (this.settings.mouseDrag){
			this.$stage.on('mousedown', $.proxy(function(event) { this.eventsRouter(event) }, this));
			this.$stage.on('dragstart', function() { return false });
			this.$stage.get(0).onselectstart = function() { return false };
		} else {
			this.$element.addClass('owl-text-select-on');
		}

		if (this.settings.touchDrag && !isTouchIE){
			this.$stage.on('touchstart touchcancel', $.proxy(function(event) { this.eventsRouter(event) }, this));
		}

		// catch transitionEnd event
		if (this.transitionEndVendor) {
			this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, false);
		}

		// responsive
		if (this.settings.responsive !== false) {
			this.on(window, 'resize', $.proxy(this.onThrottledResize, this));
		}
	};

	/**
	 * Handles touchstart/mousedown event.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var ev, isTouchEvent, pageX, pageY, animatedPos;

		ev = event.originalEvent || event || window.event;

		// prevent right click
		if (ev.which === 3 || this.state.isTouch) {
			return false;
		}

		if (ev.type === 'mousedown') {
			this.$stage.addClass('owl-grab');
		}

		this.trigger('drag');
		this.drag.startTime = new Date().getTime();
		this.speed(0);
		this.state.isTouch = true;
		this.state.isScrolling = false;
		this.state.isSwiping = false;
		this.drag.distance = 0;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// get stage position left
		this.drag.offsetX = this.$stage.position().left;
		this.drag.offsetY = this.$stage.position().top;

		if (this.settings.rtl) {
			this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width()
				+ this.settings.margin;
		}

		// catch position // ie to fix
		if (this.state.inMotion && this.support3d) {
			animatedPos = this.getTransformProperty();
			this.drag.offsetX = animatedPos;
			this.animate(animatedPos);
			this.state.inMotion = true;
		} else if (this.state.inMotion && !this.support3d) {
			this.state.inMotion = false;
			return false;
		}

		this.drag.startX = pageX - this.drag.offsetX;
		this.drag.startY = pageY - this.drag.offsetY;

		this.drag.start = pageX - this.drag.startX;
		this.drag.targetEl = ev.target || ev.srcElement;
		this.drag.updatedX = this.drag.start;

		// to do/check
		// prevent links and images dragging;
		if (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") {
			this.drag.targetEl.draggable = false;
		}

		$(document).on('mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents', $.proxy(function(event) {this.eventsRouter(event)},this));
	};

	/**
	 * Handles the touchmove/mousemove events.
	 * @todo Simplify
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var ev, isTouchEvent, pageX, pageY, minValue, maxValue, pull;

		if (!this.state.isTouch) {
			return;
		}

		if (this.state.isScrolling) {
			return;
		}

		ev = event.originalEvent || event || window.event;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// Drag Direction
		this.drag.currentX = pageX - this.drag.startX;
		this.drag.currentY = pageY - this.drag.startY;
		this.drag.distance = this.drag.currentX - this.drag.offsetX;

		// Check move direction
		if (this.drag.distance < 0) {
			this.state.direction = this.settings.rtl ? 'right' : 'left';
		} else if (this.drag.distance > 0) {
			this.state.direction = this.settings.rtl ? 'left' : 'right';
		}
		// Loop
		if (this.settings.loop) {
			if (this.op(this.drag.currentX, '>', this.coordinates(this.minimum())) && this.state.direction === 'right') {
				this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			} else if (this.op(this.drag.currentX, '<', this.coordinates(this.maximum())) && this.state.direction === 'left') {
				this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			}
		} else {
			// pull
			minValue = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maxValue = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? this.drag.distance / 5 : 0;
			this.drag.currentX = Math.max(Math.min(this.drag.currentX, minValue + pull), maxValue + pull);
		}

		// Lock browser if swiping horizontal

		if ((this.drag.distance > 8 || this.drag.distance < -8)) {
			if (ev.preventDefault !== undefined) {
				ev.preventDefault();
			} else {
				ev.returnValue = false;
			}
			this.state.isSwiping = true;
		}

		this.drag.updatedX = this.drag.currentX;

		// Lock Owl if scrolling
		if ((this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === false) {
			this.state.isScrolling = true;
			this.drag.updatedX = this.drag.start;
		}

		this.animate(this.drag.updatedX);
	};

	/**
	 * Handles the touchend/mouseup events.
	 * @protected
	 */
	Owl.prototype.onDragEnd = function(event) {
		var compareTimes, distanceAbs, closest;

		if (!this.state.isTouch) {
			return;
		}

		if (event.type === 'mouseup') {
			this.$stage.removeClass('owl-grab');
		}

		this.trigger('dragged');

		// prevent links and images dragging;
		this.drag.targetEl.removeAttribute("draggable");

		// remove drag event listeners

		this.state.isTouch = false;
		this.state.isScrolling = false;
		this.state.isSwiping = false;

		// to check
		if (this.drag.distance === 0 && this.state.inMotion !== true) {
			this.state.inMotion = false;
			return false;
		}

		// prevent clicks while scrolling

		this.drag.endTime = new Date().getTime();
		compareTimes = this.drag.endTime - this.drag.startTime;
		distanceAbs = Math.abs(this.drag.distance);

		// to test
		if (distanceAbs > 3 || compareTimes > 300) {
			this.removeClick(this.drag.targetEl);
		}

		closest = this.closest(this.drag.updatedX);

		this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
		this.current(closest);
		this.invalidate('position');
		this.update();

		// if pullDrag is off then fire transitionEnd event manually when stick
		// to border
		if (!this.settings.pullDrag && this.drag.updatedX === this.coordinates(closest)) {
			this.transitionEnd();
		}

		this.drag.distance = 0;

		$(document).off('.owl.dragEvents');
	};

	/**
	 * Attaches `preventClick` to disable link while swipping.
	 * @protected
	 * @param {HTMLElement} [target] - The target of the `click` event.
	 */
	Owl.prototype.removeClick = function(target) {
		this.drag.targetEl = target;
		$(target).on('click.preventClick', this.e._preventClick);
		// to make sure click is removed:
		window.setTimeout(function() {
			$(target).off('click.preventClick');
		}, 300);
	};

	/**
	 * Suppresses click event.
	 * @protected
	 * @param {Event} ev - The event arguments.
	 */
	Owl.prototype.preventClick = function(ev) {
		if (ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
		if (ev.stopPropagation) {
			ev.stopPropagation();
		}
		$(ev.target).off('click.preventClick');
	};

	/**
	 * Catches stage position while animate (only CSS3).
	 * @protected
	 * @returns
	 */
	Owl.prototype.getTransformProperty = function() {
		var transform, matrix3d;

		transform = window.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + 'transform');
		// var transform = this.$stage.css(this.vendorName + 'transform')
		transform = transform.replace(/matrix(3d)?\(|\)/g, '').split(',');
		matrix3d = transform.length === 16;

		return matrix3d !== true ? transform[4] : transform[12];
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate) {
		var position = -1, pull = 30, width = this.width(), coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				if (coordinate > value - pull && coordinate < value + pull) {
					position = index;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = this.state.direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		this.trigger('translate');
		this.state.inMotion = this.speed() > 0;

		if (this.support3d) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px' + ',0px, 0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (this.state.isTouch) {
			this.$stage.css({
				left: coordinate + 'px'
			});
		} else {
			this.$stage.animate({
				left: coordinate
			}, this.speed() / 1000, this.settings.fallbackEasing, $.proxy(function() {
				if (this.state.inMotion) {
					this.transitionEnd();
				}
			}, this));
		}
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} part - The part to invalidate.
	 */
	Owl.prototype.invalidate = function(part) {
		this._invalidated[part] = true;
	}

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position for an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = (relative ? this._items.length : this._items.length + this._clones.length);

		if (!$.isNumeric(position) || n < 1) {
			return undefined;
		}

		if (this._clones.length) {
			position = ((position % n) + n) % n;
		} else {
			position = Math.max(this.minimum(relative), Math.min(this.maximum(relative), position));
		}

		return position;
	};

	/**
	 * Converts an absolute position for an item into a relative position.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position = this.normalize(position);
		position = position - this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var maximum, width, i = 0, coordinate,
			settings = this.settings;

		if (relative) {
			return this._items.length - 1;
		}

		if (!settings.loop && settings.center) {
			maximum = this._items.length - 1;
		} else if (!settings.loop && !settings.center) {
			maximum = this._items.length - settings.items;
		} else if (settings.loop || settings.center) {
			maximum = this._items.length + settings.items;
		} else if (settings.autoWidth || settings.merge) {
			revert = settings.rtl ? 1 : -1;
			width = this.$stage.width() - this.$element.width();
			while (coordinate = this.coordinates(i)) {
				if (coordinate * revert >= width) {
					break;
				}
				maximum = ++i;
			}
		} else {
			throw 'Can not detect maximum absolute position.'
		}

		return maximum;
	};

	/**
	 * Gets the minimum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		if (relative) {
			return 0;
		}

		return this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var coordinate = null;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[position - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1);
		} else {
			coordinate = this._coordinates[position - 1] || 0;
		}

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		if (this.settings.loop) {
			var distance = position - this.relative(this.current()),
				revert = this.current(),
				before = this.current(),
				after = this.current() + distance,
				direction = before - after < 0 ? true : false,
				items = this._clones.length + this._items.length;

			if (after < this.settings.items && direction === false) {
				revert = before + this._items.length;
				this.reset(revert);
			} else if (after >= items - this.settings.items && direction === true) {
				revert = before - this._items.length;
				this.reset(revert);
			}
			window.clearTimeout(this.e._goToLoop);
			this.e._goToLoop = window.setTimeout($.proxy(function() {
				this.speed(this.duration(this.current(), revert + distance, speed));
				this.current(revert + distance);
				this.update();
			}, this), 30);
		} else {
			this.speed(this.duration(this.current(), position, speed));
			this.current(position);
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.transitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.state.inMotion = false;
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset($.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		position = position === undefined ? this._items.length : this.normalize(position, true);

		this.trigger('add', { content: content, position: position });

		if (this._items.length === 0 || position === this._items.length) {
			this.$stage.append(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Adds triggerable events.
	 * @protected
	 */
	Owl.prototype.addTriggerableEvents = function() {
		var handler = $.proxy(function(callback, event) {
			return $.proxy(function(e) {
				if (e.relatedTarget !== this) {
					this.suppress([ event ]);
					callback.apply(this, [].slice.call(arguments, 1));
					this.release([ event ]);
				}
			}, this);
		}, this);

		$.each({
			'next': this.next,
			'prev': this.prev,
			'to': this.to,
			'destroy': this.destroy,
			'refresh': this.refresh,
			'replace': this.replace,
			'add': this.add,
			'remove': this.remove
		}, $.proxy(function(event, callback) {
			this.$element.on(event + '.owl.carousel', handler(callback, event + '.owl.carousel'));
		}, this));

	};

	/**
	 * Watches the visibility of the carousel element.
	 * @protected
	 */
	Owl.prototype.watchVisibility = function() {

		// test on zepto
		if (!isElVisible(this.$element.get(0))) {
			this.$element.addClass('owl-hidden');
			window.clearInterval(this.e._checkVisibile);
			this.e._checkVisibile = window.setInterval($.proxy(checkVisible, this), 500);
		}

		function isElVisible(el) {
			return el.offsetWidth > 0 && el.offsetHeight > 0;
		}

		function checkVisible() {
			if (isElVisible(this.$element.get(0))) {
				this.$element.removeClass('owl-hidden');
				this.refresh();
				window.clearInterval(this.e._checkVisibile);
			}
		}
	};

	/**
	 * Preloads images with auto width.
	 * @protected
	 * @todo Still to test
	 */
	Owl.prototype.preloadAutoWidthImages = function(imgs) {
		var loaded, that, $el, img;

		loaded = 0;
		that = this;
		imgs.each(function(i, el) {
			$el = $(el);
			img = new Image();

			img.onload = function() {
				loaded++;
				$el.attr('src', img.src);
				$el.css('opacity', 1);
				if (loaded >= imgs.length) {
					that.state.imagesLoaded = true;
					that.initialize();
				}
			};

			img.src = $el.attr('src') || $el.attr('data-src') || $el.attr('data-src-retina');
		});
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		if (this.$element.hasClass(this.settings.themeClass)) {
			this.$element.removeClass(this.settings.themeClass);
		}

		if (this.settings.responsive !== false) {
			$(window).off('resize.owl.carousel');
		}

		if (this.transitionEndVendor) {
			this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
		}

		for ( var i in this._plugins) {
			this._plugins[i].destroy();
		}

		if (this.settings.mouseDrag || this.settings.touchDrag) {
			this.$stage.off('mousedown touchstart touchcancel');
			$(document).off('.owl.dragEvents');
			this.$stage.get(0).onselectstart = function() {};
			this.$stage.off('dragstart', function() { return false });
		}

		// remove event handlers in the ".owl.carousel" namespace
		this.$element.off('.owl');

		this.$stage.children('.cloned').remove();
		this.e = null;
		this.$element.removeData('owlCarousel');

		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.unwrap();
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers an public event.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=.owl.carousel] - The event namespace.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].apply(this, event);
			}
		}

		return event;
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	}

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	}

	/**
	 * Checks the availability of some browser features.
	 * @protected
	 */
	Owl.prototype.browserSupport = function() {
		this.support3d = isPerspective();

		if (this.support3d) {
			this.transformVendor = isTransform();

			// take transitionend event name by detecting transition
			var endVendors = [ 'transitionend', 'webkitTransitionEnd', 'transitionend', 'oTransitionEnd' ];
			this.transitionEndVendor = endVendors[isTransition()];

			// take vendor name from transform name
			this.vendorName = this.transformVendor.replace(/Transform/i, '');
			this.vendorName = this.vendorName !== '' ? '-' + this.vendorName.toLowerCase() + '-' : '';
		}

		this.state.orientation = window.orientation;
	};

	/**
	 * Get touch/drag coordinats.
	 * @private
	 * @param {event} - mousedown/touchstart event
	 * @returns {object} - Contains X and Y of current mouse/touch position
	 */

	function getTouches(event) {
		if (event.touches !== undefined) {
			return {
				x: event.touches[0].pageX,
				y: event.touches[0].pageY
			};
		}

		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return {
					x: event.pageX,
					y: event.pageY
				};
			}

		if (event.pageX === undefined) {
			return {
					x: event.clientX,
					y: event.clientY
				};
			}
		}
	}

	/**
	 * Checks for CSS support.
	 * @private
	 * @param {Array} array - The CSS properties to check for.
	 * @returns {Array} - Contains the supported CSS property name and its index or `false`.
	 */
	function isStyleSupported(array) {
		var p, s, fake = document.createElement('div'), list = array;
		for (p in list) {
			s = list[p];
			if (typeof fake.style[s] !== 'undefined') {
				fake = null;
				return [ s, p ];
			}
		}
		return [ false ];
	}

	/**
	 * Checks for CSS transition support.
	 * @private
	 * @todo Realy bad design
	 * @returns {Number}
	 */
	function isTransition() {
		return isStyleSupported([ 'transition', 'WebkitTransition', 'MozTransition', 'OTransition' ])[1];
	}

	/**
	 * Checks for CSS transform support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isTransform() {
		return isStyleSupported([ 'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ])[0];
	}

	/**
	 * Checks for CSS perspective support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isPerspective() {
		return isStyleSupported([ 'perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective' ])[0];
	}

	/**
	 * Checks wether touch is supported or not.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupport() {
		return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
	}

	/**
	 * Checks wether touch is supported or not for IE.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupportIE() {
		return window.navigator.msPointerEnabled;
	}

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @public
	 */
	$.fn.owlCarousel = function(options) {
		return this.each(function() {
			if (!$(this).data('owlCarousel')) {
				$(this).data('owlCarousel', new Owl(this, options));
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = ((e.property && e.property.value) || this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position++)), load);
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	}

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url(' + url + ')',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass)
					=== this._core.$stage.children().eq(this._core.current())) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		this._core.$stage.parent()
			.height(this._core.$stage.children().eq(this._core.current()).height())
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * Whether this is in fullscreen or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._fullscreen = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'resize.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.video && !this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refresh.owl.carousel changed.owl.carousel': $.proxy(function(e) {
				if (this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var $element = $(e.content).find('.owl-video');
				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {

		var type = target.attr('data-vimeo-id') ? 'vimeo' : 'youtube',
			id = target.attr('data-vimeo-id') || target.attr('data-youtube-id'),
			width = target.attr('data-width') || this._core.settings.videoWidth,
			height = target.attr('data-height') || this._core.settings.videoHeight,
			url = target.attr('href');

		if (url) {
			id = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {

		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "http://img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: 'http://vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} ev - The event arguments.
	 */
	Video.prototype.play = function(ev) {
		this._core.trigger('play', null, 'video');

		if (this._playing) {
			this.stop();
		}

		var target = $(ev.target || ev.srcElement),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html, wrap;

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/'
				+ video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="http://player.vimeo.com/video/' + video.id + '?autoplay=1" width="' + width
				+ '" height="' + height
				+ '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}

		item.addClass('owl-video-playing');
		this._playing = item;

		wrap = $('<div style="height:' + height + 'px; width:' + width + 'px" class="owl-video-frame">'
			+ html + '</div>');
		target.after(wrap);
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {

		// if Vimeo Fullscreen mode
		var element = document.fullscreenElement || document.mozFullScreenElement
			|| document.webkitFullscreenElement;

		if (element && $(element).parent().hasClass('owl-video-frame')) {
			this._core.speed(0);
			this._fullscreen = true;
		}

		if (element && this._fullscreen && this._playing) {
			return false;
		}

		// comming back from fullscreen
		if (this._fullscreen) {
			this._fullscreen = false;
			return false;
		}

		// check full screen mode and window orientation
		if (this._playing) {
			if (this._core.state.orientation !== window.orientation) {
				this._core.state.orientation = window.orientation;
				return false;
			}
		}

		return true;
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				this.swapping = e.type == 'translated';
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1 || !this.core.support3d) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}

		if (incoming) {
			next.addClass('animated owl-animated-in')
				.addClass(incoming)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.transitionEnd();
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Autoplay.Defaults, this.core.options);

		this.handlers = {
			'translated.owl.carousel refreshed.owl.carousel': $.proxy(function() {
				this.autoplay();
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				this.play(t, s);
			}, this),
			'stop.owl.autoplay': $.proxy(function() {
				this.stop();
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.autoplay();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * @protected
	 * @todo Must be documented.
	 */
	Autoplay.prototype.autoplay = function() {
		if (this.core.settings.autoplay && !this.core.state.videoPlay) {
			window.clearInterval(this.interval);

			this.interval = window.setInterval($.proxy(function() {
				this.play();
			}, this), this.core.settings.autoplayTimeout);
		} else {
			window.clearInterval(this.interval);
		}
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - ...
	 * @param {Number} [speed] - ...
	 * @returns {Boolean|undefined} - ...
	 * @todo Must be documented.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		// if tab is inactive - doesnt work in <IE10
		if (document.hidden === true) {
			return;
		}

		if (this.core.state.isTouch || this.core.state.isScrolling
			|| this.core.state.isSwiping || this.core.state.inMotion) {
			return;
		}

		if (this.core.settings.autoplay === false) {
			window.clearInterval(this.interval);
			return;
		}

		this.core.next(this.core.settings.autoplaySpeed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this.interval);

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.push($(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'add.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, $(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'remove.owl.carousel prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					if (!this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
						var current = this._core.current(),
							maximum = this._core.maximum(),
							minimum = this._core.minimum();
						e.data = e.property.value > maximum
							? current >= maximum ? minimum : maximum
							: e.property.value < minimum ? maximum : e.property.value;
					}
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function() {
				if (!this._initialized) {
					this.initialize();
					this._initialized = true;
				}
				this._core.trigger('refresh', null, 'navigation');
				this.update();
				this.draw();
				this._core.trigger('refreshed', null, 'navigation');
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navRewind: true,
		navText: [ 'prev', 'next' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotData: false,
		dotsSpeed: false,
		dotsContainer: false,
		controlsClass: 'owl-controls'
	}

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var $container, override,
			options = this._core.settings;

		// create the indicator template
		if (!options.dotsData) {
			this._templates = [ $('<div>')
				.addClass(options.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		// create controls container if needed
		if (!options.navContainer || !options.dotsContainer) {
			this._controls.$container = $('<div>')
				.addClass(options.controlsClass)
				.appendTo(this.$element);
		}

		// create DOM structure for absolute navigation
		this._controls.$indicators = options.dotsContainer ? $(options.dotsContainer)
			: $('<div>').hide().addClass(options.dotsClass).appendTo(this._controls.$container);

		this._controls.$indicators.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$indicators)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, options.dotsSpeed);
		}, this));

		// create DOM structure for relative navigation
		$container = options.navContainer ? $(options.navContainer)
			: $('<div>').addClass(options.navContainerClass).prependTo(this._controls.$container);

		this._controls.$next = $('<' + options.navElement + '>');
		this._controls.$previous = this._controls.$next.clone();

		this._controls.$previous
			.addClass(options.navClass[0])
			.html(options.navText[0])
			.hide()
			.prependTo($container)
			.on('click', $.proxy(function(e) {
				this.prev(options.navSpeed);
			}, this));
		this._controls.$next
			.addClass(options.navClass[1])
			.html(options.navText[1])
			.hide()
			.appendTo($container)
			.on('click', $.proxy(function(e) {
				this.next(options.navSpeed);
			}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	}

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			options = this._core.settings,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			size = options.center || options.autoWidth || options.dotData
				? 1 : options.dotsEach || options.items;

		if (options.slideBy !== 'page') {
			options.slideBy = Math.min(options.slideBy, options.items);
		}

		if (options.dots || options.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: i - lower,
						end: i - lower + size - 1
					});
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	}

	/**
	 * Draws the user interface.
	 * @todo The option `dotData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference, i, html = '',
			options = this._core.settings,
			$items = this._core.$stage.children(),
			index = this._core.relative(this._core.current());

		if (options.nav && !options.loop && !options.navRewind) {
			this._controls.$previous.toggleClass('disabled', index <= 0);
			this._controls.$next.toggleClass('disabled', index >= this._core.maximum());
		}

		this._controls.$previous.toggle(options.nav);
		this._controls.$next.toggle(options.nav);

		if (options.dots) {
			difference = this._pages.length - this._controls.$indicators.children().length;

			if (options.dotData && difference !== 0) {
				for (i = 0; i < this._controls.$indicators.children().length; i++) {
					html += this._templates[this._core.relative(i)];
				}
				this._controls.$indicators.html(html);
			} else if (difference > 0) {
				html = new Array(difference + 1).join(this._templates[0]);
				this._controls.$indicators.append(html);
			} else if (difference < 0) {
				this._controls.$indicators.children().slice(difference).remove();
			}

			this._controls.$indicators.find('.active').removeClass('active');
			this._controls.$indicators.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}

		this._controls.$indicators.toggle(options.dots);
	}

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotData
				? 1 : settings.dotsEach || settings.items)
		};
	}

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var index = this._core.relative(this._core.current());
		return $.grep(this._pages, function(o) {
			return o.start <= index && o.end >= index;
		}).pop();
	}

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			options = this._core.settings;

		if (options.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += options.slideBy : position -= options.slideBy;
		}
		return position;
	}

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	}

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	}

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash table for the hashes.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.startPosition == 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var hash = $(e.content).find('[data-hash]').andSelf('[data-hash]').attr('data-hash');
				this._hashes[hash] = e.content;
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function() {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]) || 0;

			if (!hash) {
				return false;
			}

			this._core.to(position, false, true);
		}, this));
	}

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

	var plugin = {};

	var defaults = {

		// GENERAL
		mode: 'horizontal',
		slideSelector: '',
		infiniteLoop: true,
		hideControlOnEnd: false,
		speed: 500,
		easing: null,
		slideMargin: 0,
		startSlide: 0,
		randomStart: false,
		captions: false,
		ticker: false,
		tickerHover: false,
		adaptiveHeight: false,
		adaptiveHeightSpeed: 500,
		video: false,
		useCSS: true,
		preloadImages: 'visible',
		responsive: true,
		slideZIndex: 50,
		wrapperClass: 'bx-wrapper',

		// TOUCH
		touchEnabled: true,
		swipeThreshold: 50,
		oneToOneTouch: true,
		preventDefaultSwipeX: true,
		preventDefaultSwipeY: false,

		// PAGER
		pager: true,
		pagerType: 'full',
		pagerShortSeparator: ' / ',
		pagerSelector: null,
		buildPager: null,
		pagerCustom: null,

		// CONTROLS
		controls: true,
		nextText: 'Next',
		prevText: 'Prev',
		nextSelector: null,
		prevSelector: null,
		autoControls: false,
		startText: 'Start',
		stopText: 'Stop',
		autoControlsCombine: false,
		autoControlsSelector: null,

		// AUTO
		auto: false,
		pause: 4000,
		autoStart: true,
		autoDirection: 'next',
		autoHover: false,
		autoDelay: 0,
		autoSlideForOnePage: false,

		// CAROUSEL
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 0,
		slideWidth: 0,

		// CALLBACKS
		onSliderLoad: function() {},
		onSlideBefore: function() {},
		onSlideAfter: function() {},
		onSlideNext: function() {},
		onSlidePrev: function() {},
		onSliderResize: function() {}
	}

	$.fn.bxSlider = function(options){

		if(this.length == 0) return this;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).bxSlider(options)});
			return this;
		}

		// create a namespace to be used throughout the plugin
		var slider = {};
		// set a reference to our slider element
		var el = this;
		plugin.el = this;

		/**
		 * Makes slideshow responsive
		 */
		// first get the original window dimens (thanks alot IE)
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();



		/**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Initializes namespace settings to be used throughout plugin
		 */
		var init = function(){
			// merge user-supplied options with the defaults
			slider.settings = $.extend({}, defaults, options);
			// parse slideWidth setting
			slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
			// store the original children
			slider.children = el.children(slider.settings.slideSelector);
			// check if actual number of slides is less than minSlides / maxSlides
			if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
			if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
			// if random start, set the startSlide setting to random number
			if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
			// store active slide information
			slider.active = { index: slider.settings.startSlide }
			// store if the slider is in carousel mode (displaying / moving multiple slides)
			slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
			// if carousel, force preloadImages = 'all'
			if(slider.carousel) slider.settings.preloadImages = 'all';
			// calculate the min / max width thresholds based on min / max number of slides
			// used to setup and update carousel slides dimensions
			slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
			slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
			// store the current state of the slider (if currently animating, working is true)
			slider.working = false;
			// initialize the controls object
			slider.controls = {};
			// initialize an auto interval
			slider.interval = null;
			// determine which property to use for transitions
			slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
			// determine if hardware acceleration can be used
			slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
				// create our test div element
				var div = document.createElement('div');
				// css transition properties
				var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
				// test for each property
				for(var i in props){
					if(div.style[props[i]] !== undefined){
						slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
						slider.animProp = '-' + slider.cssPrefix + '-transform';
						return true;
					}
				}
				return false;
			}());
			// if vertical mode always make maxSlides and minSlides equal
			if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
			// save original style data
			el.data("origStyle", el.attr("style"));
			el.children(slider.settings.slideSelector).each(function() {
			  $(this).data("origStyle", $(this).attr("style"));
			});
			// perform all DOM / CSS modifications
			setup();
		}

		/**
		 * Performs all DOM and CSS modifications
		 */
		var setup = function(){
			// wrap el in a wrapper
			el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
			// store a namspace reference to .bx-viewport
			slider.viewport = el.parent();
			// add a loading div to display while images are loading
			slider.loader = $('<div class="bx-loading" />');
			slider.viewport.prepend(slider.loader);
			// set el to a massive width, to hold any needed slides
			// also strip any margin and padding from el
			el.css({
				width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
				position: 'relative'
			});
			// if using CSS, add the easing property
			if(slider.usingCSS && slider.settings.easing){
				el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
			// if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
			}else if(!slider.settings.easing){
				slider.settings.easing = 'swing';
			}
			var slidesShowing = getNumberSlidesShowing();
			// make modifications to the viewport (.bx-viewport)
			slider.viewport.css({
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			});
			slider.viewport.parent().css({
				maxWidth: getViewportMaxWidth()
			});
			// make modification to the wrapper (.bx-wrapper)
			if(!slider.settings.pager) {
				slider.viewport.parent().css({
				margin: '0 auto 0px'
				});
			}
			// apply css to all slider children
			slider.children.css({
				'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
				listStyle: 'none',
				position: 'relative'
			});
			// apply the calculated width after the float is applied to prevent scrollbar interference
			slider.children.css('width', getSlideWidth());
			// if slideMargin is supplied, add the css
			if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
			if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
			// if "fade" mode, add positioning and z-index CSS
			if(slider.settings.mode == 'fade'){
				slider.children.css({
					position: 'absolute',
					zIndex: 0,
					display: 'none'
				});
				// prepare the z-index on the showing element
				slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
			}
			// create an element to contain all slider controls (pager, start / stop, etc)
			slider.controls.el = $('<div class="bx-controls" />');
			// if captions are requested, add them
			if(slider.settings.captions) appendCaptions();
			// check if startSlide is last slide
			slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
			// if video is true, set up the fitVids plugin
			if(slider.settings.video) el.fitVids();
			// set the default preload selector (visible)
			var preloadSelector = slider.children.eq(slider.settings.startSlide);
			if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
			// only check for control addition if not in "ticker" mode
			if(!slider.settings.ticker){
				// if pager is requested, add it
				if(slider.settings.pager) appendPager();
				// if controls are requested, add them
				if(slider.settings.controls) appendControls();
				// if auto is true, and auto controls are requested, add them
				if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
				// if any control option is requested, add the controls wrapper
				if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
			// if ticker mode, do not allow a pager
			}else{
				slider.settings.pager = false;
			}
			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			loadElements(preloadSelector, start);
		}

		var loadElements = function(selector, callback){
			var total = selector.find('img, iframe').length;
			if (total == 0){
				callback();
				return;
			}
			var count = 0;
			selector.find('img, iframe').each(function(){
				$(this).one('load', function() {
				  if(++count == total) callback();
				}).each(function() {
				  if(this.complete) $(this).load();
				});
			});
		}

		/**
		 * Start the slider
		 */
		var start = function(){
			// if infinite loop, prepare additional slides
			if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
				var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
				var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
				var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
				el.append(sliceAppend).prepend(slicePrepend);
			}
			// remove the loading DOM element
			slider.loader.remove();
			// set the left / top position of "el"
			setSlidePosition();
			// if "vertical" mode, always use adaptiveHeight to prevent odd behavior
			if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
			// set the viewport height
			slider.viewport.height(getViewportHeight());
			// make sure everything is positioned just right (same as a window resize)
			el.redrawSlider();
			// onSliderLoad callback
			slider.settings.onSliderLoad(slider.active.index);
			// slider has been fully initialized
			slider.initialized = true;
			// bind the resize call to the window
			if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
			// if auto is true and has more than 1 page, start the show
			if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
			// if ticker is true, start the ticker
			if (slider.settings.ticker) initTicker();
			// if pager is requested, make the appropriate pager link active
			if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
			// check for any updates to the controls (like hideControlOnEnd updates)
			if (slider.settings.controls) updateDirectionControls();
			// if touchEnabled is true, setup the touch events
			if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
		}

		/**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
		var getViewportHeight = function(){
			var height = 0;
			// first determine which children (slides) should be used in our height calculation
			var children = $();
			// if mode is not "vertical" and adaptiveHeight is false, include all children
			if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
				children = slider.children;
			}else{
				// if not carousel, return the single active child
				if(!slider.carousel){
					children = slider.children.eq(slider.active.index);
				// if carousel, return a slice of children
				}else{
					// get the individual slide index
					var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
					// add the current slide to the children
					children = slider.children.eq(currentIndex);
					// cycle through the remaining "showing" slides
					for (i = 1; i <= slider.settings.maxSlides - 1; i++){
						// if looped back to the start
						if(currentIndex + i >= slider.children.length){
							children = children.add(slider.children.eq(i - 1));
						}else{
							children = children.add(slider.children.eq(currentIndex + i));
						}
					}
				}
			}
			// if "vertical" mode, calculate the sum of the heights of the children
			if(slider.settings.mode == 'vertical'){
				children.each(function(index) {
				  height += $(this).outerHeight();
				});
				// add user-supplied margins
				if(slider.settings.slideMargin > 0){
					height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
				}
			// if not "vertical" mode, calculate the max height of the children
			}else{
				height = Math.max.apply(Math, children.map(function(){
					return $(this).outerHeight(false);
				}).get());
			}

			if(slider.viewport.css('box-sizing') == 'border-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
							parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
			}else if(slider.viewport.css('box-sizing') == 'padding-box'){
				height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
			}

			return height;
		}

		/**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
		var getViewportMaxWidth = function(){
			var width = '100%';
			if(slider.settings.slideWidth > 0){
				if(slider.settings.mode == 'horizontal'){
					width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
				}else{
					width = slider.settings.slideWidth;
				}
			}
			return width;
		}

		/**
		 * Returns the calculated width to be applied to each slide
		 */
		var getSlideWidth = function(){
			// start with any user-supplied slide width
			var newElWidth = slider.settings.slideWidth;
			// get the current viewport width
			var wrapWidth = slider.viewport.width();
			// if slide width was not supplied, or is larger than the viewport use the viewport width
			if(slider.settings.slideWidth == 0 ||
				(slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
				slider.settings.mode == 'vertical'){
				newElWidth = wrapWidth;
			// if carousel, use the thresholds to determine the width
			}else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
				if(wrapWidth > slider.maxThreshold){
					// newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
				}else if(wrapWidth < slider.minThreshold){
					newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
				}
			}
			return newElWidth;
		}

		/**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
		var getNumberSlidesShowing = function(){
			var slidesShowing = 1;
			if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
				// if viewport is smaller than minThreshold, return minSlides
				if(slider.viewport.width() < slider.minThreshold){
					slidesShowing = slider.settings.minSlides;
				// if viewport is larger than minThreshold, return maxSlides
				}else if(slider.viewport.width() > slider.maxThreshold){
					slidesShowing = slider.settings.maxSlides;
				// if viewport is between min / max thresholds, divide viewport width by first child width
				}else{
					var childWidth = slider.children.first().width() + slider.settings.slideMargin;
					slidesShowing = Math.floor((slider.viewport.width() +
						slider.settings.slideMargin) / childWidth);
				}
			// if "vertical" mode, slides showing will always be minSlides
			}else if(slider.settings.mode == 'vertical'){
				slidesShowing = slider.settings.minSlides;
			}
			return slidesShowing;
		}

		/**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
		var getPagerQty = function(){
			var pagerQty = 0;
			// if moveSlides is specified by the user
			if(slider.settings.moveSlides > 0){
				if(slider.settings.infiniteLoop){
					pagerQty = Math.ceil(slider.children.length / getMoveBy());
				}else{
					// use a while loop to determine pages
					var breakPoint = 0;
					var counter = 0
					// when breakpoint goes above children length, counter is the number of pages
					while (breakPoint < slider.children.length){
						++pagerQty;
						breakPoint = counter + getNumberSlidesShowing();
						counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
					}
				}
			// if moveSlides is 0 (auto) divide children length by sides showing, then round up
			}else{
				pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
			}
			return pagerQty;
		}

		/**
		 * Returns the number of indivual slides by which to shift the slider
		 */
		var getMoveBy = function(){
			// if moveSlides was set by the user and moveSlides is less than number of slides showing
			if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
				return slider.settings.moveSlides;
			}
			// if moveSlides is 0 (auto)
			return getNumberSlidesShowing();
		}

		/**
		 * Sets the slider's (el) left or top position
		 */
		var setSlidePosition = function(){
			// if last slide, not infinite loop, and number of children is larger than specified maxSlides
			if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
				if (slider.settings.mode == 'horizontal'){
					// get the last child's position
					var lastChild = slider.children.last();
					var position = lastChild.position();
					// set the left position
					setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
				}else if(slider.settings.mode == 'vertical'){
					// get the last showing index's position
					var lastShowingIndex = slider.children.length - slider.settings.minSlides;
					var position = slider.children.eq(lastShowingIndex).position();
					// set the top position
					setPositionProperty(-position.top, 'reset', 0);
				}
			// if not last slide
			}else{
				// get the position of the first showing slide
				var position = slider.children.eq(slider.active.index * getMoveBy()).position();
				// check for last slide
				if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
				// set the repective position
				if (position != undefined){
					if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
					else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
				}
			}
		}

		/**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int)
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int)
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
		var setPositionProperty = function(value, type, duration, params){
			// use CSS transform
			if(slider.usingCSS){
				// determine the translate3d value
				var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
				// add the CSS transition-duration
				el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
				if(type == 'slide'){
					// set the property value
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, propValue);
				}else if(type == 'ticker'){
					// make the transition use 'linear'
					el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
					el.css(slider.animProp, propValue);
					// bind a callback method - executes when CSS transition completes
					el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
						// unbind the callback
						el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
						// reset the position
						setPositionProperty(params['resetValue'], 'reset', 0);
						// start the loop again
						tickerLoop();
					});
				}
			// use JS animate
			}else{
				var animateObj = {};
				animateObj[slider.animProp] = value;
				if(type == 'slide'){
					el.animate(animateObj, duration, slider.settings.easing, function(){
						updateAfterSlideTransition();
					});
				}else if(type == 'reset'){
					el.css(slider.animProp, value)
				}else if(type == 'ticker'){
					el.animate(animateObj, speed, 'linear', function(){
						setPositionProperty(params['resetValue'], 'reset', 0);
						// run the recursive loop after animation
						tickerLoop();
					});
				}
			}
		}

		/**
		 * Populates the pager with proper amount of pages
		 */
		var populatePager = function(){
			var pagerHtml = '';
			var pagerQty = getPagerQty();
			// loop through each pager item
			for(var i=0; i < pagerQty; i++){
				var linkContent = '';
				// if a buildPager function is supplied, use it to get pager link value, else use index + 1
				if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
					linkContent = slider.settings.buildPager(i);
					slider.pagerEl.addClass('bx-custom-pager');
				}else{
					linkContent = i + 1;
					slider.pagerEl.addClass('bx-default-pager');
				}
				// var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
				// add the markup to the string
				pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
			};
			// populate the pager element with pager links
			slider.pagerEl.html(pagerHtml);
		}

		/**
		 * Appends the pager to the controls element
		 */
		var appendPager = function(){
			if(!slider.settings.pagerCustom){
				// create the pager DOM element
				slider.pagerEl = $('<div class="bx-pager" />');
				// if a pager selector was supplied, populate it with the pager
				if(slider.settings.pagerSelector){
					$(slider.settings.pagerSelector).html(slider.pagerEl);
				// if no pager selector was supplied, add it after the wrapper
				}else{
					slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
				}
				// populate the pager
				populatePager();
			}else{
				slider.pagerEl = $(slider.settings.pagerCustom);
			}
			// assign the pager click binding
			slider.pagerEl.on('click', 'a', clickPagerBind);
		}

		/**
		 * Appends prev / next controls to the controls element
		 */
		var appendControls = function(){
			slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
			slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
			// bind click actions to the controls
			slider.controls.next.bind('click', clickNextBind);
			slider.controls.prev.bind('click', clickPrevBind);
			// if nextSlector was supplied, populate it
			if(slider.settings.nextSelector){
				$(slider.settings.nextSelector).append(slider.controls.next);
			}
			// if prevSlector was supplied, populate it
			if(slider.settings.prevSelector){
				$(slider.settings.prevSelector).append(slider.controls.prev);
			}
			// if no custom selectors were supplied
			if(!slider.settings.nextSelector && !slider.settings.prevSelector){
				// add the controls to the DOM
				slider.controls.directionEl = $('<div class="bx-controls-direction" />');
				// add the control elements to the directionEl
				slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
				// slider.viewport.append(slider.controls.directionEl);
				slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
			}
		}

		/**
		 * Appends start / stop auto controls to the controls element
		 */
		var appendControlsAuto = function(){
			slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
			slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
			// add the controls to the DOM
			slider.controls.autoEl = $('<div class="bx-controls-auto" />');
			// bind click actions to the controls
			slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
			slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
			// if autoControlsCombine, insert only the "start" control
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.append(slider.controls.start);
			// if autoControlsCombine is false, insert both controls
			}else{
				slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
			}
			// if auto controls selector was supplied, populate it with the controls
			if(slider.settings.autoControlsSelector){
				$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
			// if auto controls selector was not supplied, add it after the wrapper
			}else{
				slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
			}
			// update the auto controls
			updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
		}

		/**
		 * Appends image captions to the DOM
		 */
		var appendCaptions = function(){
			// cycle through each child
			slider.children.each(function(index){
				// get the image title attribute
				var title = $(this).find('img:first').attr('title');
				// append the caption
				if (title != undefined && ('' + title).length) {
                    $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
                }
			});
		}

		/**
		 * Click next binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickNextBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToNextSlide();
			e.preventDefault();
		}

		/**
		 * Click prev binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPrevBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			el.goToPrevSlide();
			e.preventDefault();
		}

		/**
		 * Click start binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStartBind = function(e){
			el.startAuto();
			e.preventDefault();
		}

		/**
		 * Click stop binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickStopBind = function(e){
			el.stopAuto();
			e.preventDefault();
		}

		/**
		 * Click pager binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var clickPagerBind = function(e){
			// if auto show is running, stop it
			if (slider.settings.auto) el.stopAuto();
			var pagerLink = $(e.currentTarget);
			if(pagerLink.attr('data-slide-index') !== undefined){
				var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
				// if clicked pager link is not active, continue with the goToSlide call
				if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
				e.preventDefault();
			}
		}

		/**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int)
		 *  - index of slide to make active
		 */
		var updatePagerActive = function(slideIndex){
			// if "short" pager type
			var len = slider.children.length; // nb of children
			if(slider.settings.pagerType == 'short'){
				if(slider.settings.maxSlides > 1) {
					len = Math.ceil(slider.children.length/slider.settings.maxSlides);
				}
				slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
				return;
			}
			// remove all pager active classes
			slider.pagerEl.find('a').removeClass('active');
			// apply the active class for all pagers
			slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
		}

		/**
		 * Performs needed actions after a slide transition
		 */
		var updateAfterSlideTransition = function(){
			// if infinte loop is true
			if(slider.settings.infiniteLoop){
				var position = '';
				// first slide
				if(slider.active.index == 0){
					// set the new position
					position = slider.children.eq(0).position();
				// carousel, last slide
				}else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
					position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
				// last slide
				}else if(slider.active.index == slider.children.length - 1){
					position = slider.children.eq(slider.children.length - 1).position();
				}
				if(position){
					if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
					else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
				}
			}
			// declare that the transition is complete
			slider.working = false;
			// onSlideAfter callback
			slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
		}

		/**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
		var updateAutoControls = function(state){
			// if autoControlsCombine is true, replace the current control with the new state
			if(slider.settings.autoControlsCombine){
				slider.controls.autoEl.html(slider.controls[state]);
			// if autoControlsCombine is false, apply the "active" class to the appropriate control
			}else{
				slider.controls.autoEl.find('a').removeClass('active');
				slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
			}
		}

		/**
		 * Updates the direction controls (checks if either should be hidden)
		 */
		var updateDirectionControls = function(){
			if(getPagerQty() == 1){
				slider.controls.prev.addClass('disabled');
				slider.controls.next.addClass('disabled');
			}else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
				// if first slide
				if (slider.active.index == 0){
					slider.controls.prev.addClass('disabled');
					slider.controls.next.removeClass('disabled');
				// if last slide
				}else if(slider.active.index == getPagerQty() - 1){
					slider.controls.next.addClass('disabled');
					slider.controls.prev.removeClass('disabled');
				// if any slide in the middle
				}else{
					slider.controls.prev.removeClass('disabled');
					slider.controls.next.removeClass('disabled');
				}
			}
		}

		/**
		 * Initialzes the auto process
		 */
		var initAuto = function(){
			// if autoDelay was supplied, launch the auto show using a setTimeout() call
			if(slider.settings.autoDelay > 0){
				var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
			// if autoDelay was not supplied, start the auto show normally
			}else{
				el.startAuto();
			}
			// if autoHover is requested
			if(slider.settings.autoHover){
				// on el hover
				el.hover(function(){
					// if the auto show is currently playing (has an active interval)
					if(slider.interval){
						// stop the auto show and pass true agument which will prevent control update
						el.stopAuto(true);
						// create a new autoPaused value which will be used by the relative "mouseout" event
						slider.autoPaused = true;
					}
				}, function(){
					// if the autoPaused value was created be the prior "mouseover" event
					if(slider.autoPaused){
						// start the auto show and pass true agument which will prevent control update
						el.startAuto(true);
						// reset the autoPaused value
						slider.autoPaused = null;
					}
				});
			}
		}

		/**
		 * Initialzes the ticker process
		 */
		var initTicker = function(){
			var startPosition = 0;
			// if autoDirection is "next", append a clone of the entire slider
			if(slider.settings.autoDirection == 'next'){
				el.append(slider.children.clone().addClass('bx-clone'));
			// if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
			}else{
				el.prepend(slider.children.clone().addClass('bx-clone'));
				var position = slider.children.first().position();
				startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			}
			setPositionProperty(startPosition, 'reset', 0);
			// do not allow controls in ticker mode
			slider.settings.pager = false;
			slider.settings.controls = false;
			slider.settings.autoControls = false;
			// if autoHover is requested
			if(slider.settings.tickerHover && !slider.usingCSS){
				// on el hover
				slider.viewport.hover(function(){
					el.stop();
				}, function(){
					// calculate the total width of children (used to calculate the speed ratio)
					var totalDimens = 0;
					slider.children.each(function(index){
					  totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
					});
					// calculate the speed ratio (used to determine the new speed to finish the paused animation)
					var ratio = slider.settings.speed / totalDimens;
					// determine which property to use
					var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
					// calculate the new speed
					var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
					tickerLoop(newSpeed);
				});
			}
			// start the ticker loop
			tickerLoop();
		}

		/**
		 * Runs a continuous loop, news ticker-style
		 */
		var tickerLoop = function(resumeSpeed){
			speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
			var position = {left: 0, top: 0};
			var reset = {left: 0, top: 0};
			// if "next" animate left position to last child, then reset left to 0
			if(slider.settings.autoDirection == 'next'){
				position = el.find('.bx-clone').first().position();
			// if "prev" animate left position to 0, then reset left to first non-clone child
			}else{
				reset = slider.children.first().position();
			}
			var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
			var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
			var params = {resetValue: resetValue};
			setPositionProperty(animateProperty, 'ticker', speed, params);
		}

		/**
		 * Initializes touch events
		 */
		var initTouch = function(){
			// initialize object to contain all touch values
			slider.touch = {
				start: {x: 0, y: 0},
				end: {x: 0, y: 0}
			}
			slider.viewport.bind('touchstart', onTouchStart);
		}

		/**
		 * Event handler for "touchstart"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchStart = function(e){
			if(slider.working){
				e.preventDefault();
			}else{
				// record the original position when touch starts
				slider.touch.originalPos = el.position();
				var orig = e.originalEvent;
				// record the starting touch x, y coordinates
				slider.touch.start.x = orig.changedTouches[0].pageX;
				slider.touch.start.y = orig.changedTouches[0].pageY;
				// bind a "touchmove" event to the viewport
				slider.viewport.bind('touchmove', onTouchMove);
				// bind a "touchend" event to the viewport
				slider.viewport.bind('touchend', onTouchEnd);
			}
		}

		/**
		 * Event handler for "touchmove"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchMove = function(e){
			var orig = e.originalEvent;
			// if scrolling on y axis, do not prevent default
			var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
			var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
			// x axis swipe
			if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
				e.preventDefault();
			// y axis swipe
			}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
				e.preventDefault();
			}
			if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
				var value = 0;
				// if horizontal, drag along x axis
				if(slider.settings.mode == 'horizontal'){
					var change = orig.changedTouches[0].pageX - slider.touch.start.x;
					value = slider.touch.originalPos.left + change;
				// if vertical, drag along y axis
				}else{
					var change = orig.changedTouches[0].pageY - slider.touch.start.y;
					value = slider.touch.originalPos.top + change;
				}
				setPositionProperty(value, 'reset', 0);
			}
		}

		/**
		 * Event handler for "touchend"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
		var onTouchEnd = function(e){
			slider.viewport.unbind('touchmove', onTouchMove);
			var orig = e.originalEvent;
			var value = 0;
			// record end x, y positions
			slider.touch.end.x = orig.changedTouches[0].pageX;
			slider.touch.end.y = orig.changedTouches[0].pageY;
			// if fade mode, check if absolute x distance clears the threshold
			if(slider.settings.mode == 'fade'){
				var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
				if(distance >= slider.settings.swipeThreshold){
					slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
					el.stopAuto();
				}
			// not fade mode
			}else{
				var distance = 0;
				// calculate distance and el's animate property
				if(slider.settings.mode == 'horizontal'){
					distance = slider.touch.end.x - slider.touch.start.x;
					value = slider.touch.originalPos.left;
				}else{
					distance = slider.touch.end.y - slider.touch.start.y;
					value = slider.touch.originalPos.top;
				}
				// if not infinite loop and first / last slide, do not attempt a slide transition
				if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
					setPositionProperty(value, 'reset', 200);
				}else{
					// check if distance clears threshold
					if(Math.abs(distance) >= slider.settings.swipeThreshold){
						distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
						el.stopAuto();
					}else{
						// el.animate(property, 200);
						setPositionProperty(value, 'reset', 200);
					}
				}
			}
			slider.viewport.unbind('touchend', onTouchEnd);
		}

		/**
		 * Window resize event callback
		 */
		var resizeWindow = function(e){
			// don't do anything if slider isn't initialized.
			if(!slider.initialized) return;
			// get the new window dimens (again, thank you IE)
			var windowWidthNew = $(window).width();
			var windowHeightNew = $(window).height();
			// make sure that it is a true window resize
			// *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
			// are resized. Can you just die already?*
			if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
				// set the new window dimens
				windowWidth = windowWidthNew;
				windowHeight = windowHeightNew;
				// update all dynamic elements
				el.redrawSlider();
				// Call user resize handler
				slider.settings.onSliderResize.call(el, slider.active.index);
			}
		}

		/**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

		/**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int)
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string)
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
		el.goToSlide = function(slideIndex, direction){
			// if plugin is currently in motion, ignore request
			if(slider.working || slider.active.index == slideIndex) return;
			// declare that plugin is in motion
			slider.working = true;
			// store the old index
			slider.oldIndex = slider.active.index;
			// if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
			if(slideIndex < 0){
				slider.active.index = getPagerQty() - 1;
			// if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
			}else if(slideIndex >= getPagerQty()){
				slider.active.index = 0;
			// set active index to requested slide
			}else{
				slider.active.index = slideIndex;
			}
			// onSlideBefore, onSlideNext, onSlidePrev callbacks
			slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			if(direction == 'next'){
				slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}else if(direction == 'prev'){
				slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
			}
			// check if last slide
			slider.active.last = slider.active.index >= getPagerQty() - 1;
			// update the pager with active class
			if(slider.settings.pager) updatePagerActive(slider.active.index);
			// // check for direction control update
			if(slider.settings.controls) updateDirectionControls();
			// if slider is set to mode: "fade"
			if(slider.settings.mode == 'fade'){
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				// fade out the visible child and reset its z-index value
				slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
				// fade in the newly requested slide
				slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
					$(this).css('zIndex', slider.settings.slideZIndex);
					updateAfterSlideTransition();
				});
			// slider mode is not "fade"
			}else{
				// if adaptiveHeight is true and next height is different from current height, animate to the new height
				if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
					slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
				}
				var moveBy = 0;
				var position = {left: 0, top: 0};
				// if carousel and not infinite loop
				if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
					if(slider.settings.mode == 'horizontal'){
						// get the last child position
						var lastChild = slider.children.eq(slider.children.length - 1);
						position = lastChild.position();
						// calculate the position of the last slide
						moveBy = slider.viewport.width() - lastChild.outerWidth();
					}else{
						// get last showing index position
						var lastShowingIndex = slider.children.length - slider.settings.minSlides;
						position = slider.children.eq(lastShowingIndex).position();
					}
					// horizontal carousel, going previous while on first slide (infiniteLoop mode)
				}else if(slider.carousel && slider.active.last && direction == 'prev'){
					// get the last child position
					var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
					var lastChild = el.children('.bx-clone').eq(eq);
					position = lastChild.position();
				// if infinite loop and "Next" is clicked on the last slide
				}else if(direction == 'next' && slider.active.index == 0){
					// get the last clone position
					position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
					slider.active.last = false;
				// normal non-zero requests
				}else if(slideIndex >= 0){
					var requestEl = slideIndex * getMoveBy();
					position = slider.children.eq(requestEl).position();
				}

				/* If the position doesn't exist
				 * (e.g. if you destroy the slider on a next click),
				 * it doesn't throw an error.
				 */
				if ("undefined" !== typeof(position)) {
					var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
					// plugin values to be animated
					setPositionProperty(value, 'slide', slider.settings.speed);
				}
			}
		}

		/**
		 * Transitions to the next slide in the show
		 */
		el.goToNextSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.last) return;
			var pagerIndex = parseInt(slider.active.index) + 1;
			el.goToSlide(pagerIndex, 'next');
		}

		/**
		 * Transitions to the prev slide in the show
		 */
		el.goToPrevSlide = function(){
			// if infiniteLoop is false and last page is showing, disregard call
			if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
			var pagerIndex = parseInt(slider.active.index) - 1;
			el.goToSlide(pagerIndex, 'prev');
		}

		/**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.startAuto = function(preventControlUpdate){
			// if an interval already exists, disregard call
			if(slider.interval) return;
			// create an interval
			slider.interval = setInterval(function(){
				slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
			}, slider.settings.pause);
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
		}

		/**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
		el.stopAuto = function(preventControlUpdate){
			// if no interval exists, disregard call
			if(!slider.interval) return;
			// clear the interval
			clearInterval(slider.interval);
			slider.interval = null;
			// if auto controls are displayed and preventControlUpdate is not true
			if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
		}

		/**
		 * Returns current slide index (zero-based)
		 */
		el.getCurrentSlide = function(){
			return slider.active.index;
		}

		/**
		 * Returns current slide element
		 */
		el.getCurrentSlideElement = function(){
			return slider.children.eq(slider.active.index);
		}

		/**
		 * Returns number of slides in show
		 */
		el.getSlideCount = function(){
			return slider.children.length;
		}

		/**
		 * Update all dynamic slider elements
		 */
		el.redrawSlider = function(){
			// resize all children in ratio to new screen size
			slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
			// adjust the height
			slider.viewport.css('height', getViewportHeight());
			// update the slide position
			if(!slider.settings.ticker) setSlidePosition();
			// if active.last was true before the screen resize, we want
			// to keep it last no matter what screen size we end on
			if (slider.active.last) slider.active.index = getPagerQty() - 1;
			// if the active index (page) no longer exists due to the resize, simply set the index as last
			if (slider.active.index >= getPagerQty()) slider.active.last = true;
			// if a pager is being displayed and a custom pager is not being used, update it
			if(slider.settings.pager && !slider.settings.pagerCustom){
				populatePager();
				updatePagerActive(slider.active.index);
			}
		}

		/**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
		el.destroySlider = function(){
			// don't do anything if slider has already been destroyed
			if(!slider.initialized) return;
			slider.initialized = false;
			$('.bx-clone', this).remove();
			slider.children.each(function() {
				$(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			});
			$(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
			$(this).unwrap().unwrap();
			if(slider.controls.el) slider.controls.el.remove();
			if(slider.controls.next) slider.controls.next.remove();
			if(slider.controls.prev) slider.controls.prev.remove();
			if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
			$('.bx-caption', this).remove();
			if(slider.controls.autoEl) slider.controls.autoEl.remove();
			clearInterval(slider.interval);
			if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
		}

		/**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
		el.reloadSlider = function(settings){
			if (settings != undefined) options = settings;
			el.destroySlider();
			init();
		}

		init();

		// returns the current jQuery object
		return this;
	}

})(jQuery);

/*! WOW - v1.0.1 - 2014-08-15
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d=function(a,b){return function(){return a.apply(b,arguments)}},e=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),this.WOW=function(){function f(a){null==a&&(a={}),this.scrollCallback=d(this.scrollCallback,this),this.scrollHandler=d(this.scrollHandler,this),this.start=d(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return f.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},f.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():document.addEventListener("DOMContentLoaded",this.start),this.finished=[]},f.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else{for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);window.addEventListener("scroll",this.scrollHandler,!1),window.addEventListener("resize",this.scrollHandler,!1),this.interval=setInterval(this.scrollCallback,50)}return this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},f.prototype.stop=function(){return this.stopped=!0,window.removeEventListener("scroll",this.scrollHandler,!1),window.removeEventListener("resize",this.scrollHandler,!1),null!=this.interval?clearInterval(this.interval):void 0},f.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},f.prototype.doSync=function(a){var b,c,d,f,g;if(!this.stopped){if(null==a&&(a=this.element),1!==a.nodeType)return;for(a=a.parentNode||a,f=a.querySelectorAll("."+this.config.boxClass),g=[],c=0,d=f.length;d>c;c++)b=f[c],e.call(this.all,b)<0?(this.applyStyle(b,!0),this.boxes.push(b),this.all.push(b),g.push(this.scrolled=!0)):g.push(void 0);return g}},f.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass},f.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},f.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),f.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.setAttribute("style","visibility: visible;"));return e},f.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},f.prototype.vendors=["moz","webkit"],f.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},f.prototype.vendorCSS=function(a,b){var c,d,e,f,g,h;for(d=window.getComputedStyle(a),c=d.getPropertyCSSValue(b),h=this.vendors,f=0,g=h.length;g>f;f++)e=h[f],c=c||d.getPropertyCSSValue("-"+e+"-"+b);return c},f.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=window.getComputedStyle(a).getPropertyValue("animation-name")}return"none"===b?"":b},f.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},f.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},f.prototype.scrollHandler=function(){return this.scrolled=!0},f.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},f.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},f.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,innerHeight)-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},f.prototype.util=function(){return null!=this._util?this._util:this._util=new b},f.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},f}()}).call(this);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($) {


	//	LOCAL

	if ( $.fn.carouFredSel )
	{
		return;
	}

	$.fn.caroufredsel = $.fn.carouFredSel = function(options, configs)
	{

		//	no element
		if (this.length == 0)
		{
			debug( true, 'No element found for "' + this.selector + '".' );
			return this;
		}

		//	multiple elements
		if (this.length > 1)
		{
			return this.each(function() {
				$(this).carouFredSel(options, configs);
			});
		}


		var $cfs = this,
			$tt0 = this[0],
			starting_position = false;

		if ($cfs.data('_cfs_isCarousel'))
		{
			starting_position = $cfs.triggerHandler('_cfs_triggerEvent', 'currentPosition');
			$cfs.trigger('_cfs_triggerEvent', ['destroy', true]);
		}

		var FN = {};

		FN._init = function(o, setOrig, start)
		{
			o = go_getObject($tt0, o);

			o.items = go_getItemsObject($tt0, o.items);
			o.scroll = go_getScrollObject($tt0, o.scroll);
			o.auto = go_getAutoObject($tt0, o.auto);
			o.prev = go_getPrevNextObject($tt0, o.prev);
			o.next = go_getPrevNextObject($tt0, o.next);
			o.pagination = go_getPaginationObject($tt0, o.pagination);
			o.swipe = go_getSwipeObject($tt0, o.swipe);
			o.mousewheel = go_getMousewheelObject($tt0, o.mousewheel);

			if (setOrig)
			{
				opts_orig = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
			}

			opts = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
			opts.d = cf_getDimensions(opts);

			crsl.direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next' : 'prev';

			var	a_itm = $cfs.children(),
				avail_primary = ms_getParentSize($wrp, opts, 'width');

			if (is_true(opts.cookie))
			{
				opts.cookie = 'caroufredsel_cookie_' + conf.serialNumber;
			}

			opts.maxDimension = ms_getMaxDimension(opts, avail_primary);

			//	complement items and sizes
			opts.items = in_complementItems(opts.items, opts, a_itm, start);
			opts[opts.d['width']] = in_complementPrimarySize(opts[opts.d['width']], opts, a_itm);
			opts[opts.d['height']] = in_complementSecondarySize(opts[opts.d['height']], opts, a_itm);

			//	primary size not set for a responsive carousel
			if (opts.responsive)
			{
				if (!is_percentage(opts[opts.d['width']]))
				{
					opts[opts.d['width']] = '100%';
				}
			}

			//	primary size is percentage
			if (is_percentage(opts[opts.d['width']]))
			{
				crsl.upDateOnWindowResize = true;
				crsl.primarySizePercentage = opts[opts.d['width']];
				opts[opts.d['width']] = ms_getPercentage(avail_primary, crsl.primarySizePercentage);
				if (!opts.items.visible)
				{
					opts.items.visibleConf.variable = true;
				}
			}

			if (opts.responsive)
			{
				opts.usePadding = false;
				opts.padding = [0, 0, 0, 0];
				opts.align = false;
				opts.items.visibleConf.variable = false;
			}
			else
			{
				//	visible-items not set
				if (!opts.items.visible)
				{
					opts = in_complementVisibleItems(opts, avail_primary);
				}

				//	primary size not set -> calculate it or set to "variable"
				if (!opts[opts.d['width']])
				{
					if (!opts.items.visibleConf.variable && is_number(opts.items[opts.d['width']]) && opts.items.filter == '*')
					{
						opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
						opts.align = false;
					}
					else
					{
						opts[opts.d['width']] = 'variable';
					}
				}
				//	align not set -> set to center if primary size is number
				if (is_undefined(opts.align))
				{
					opts.align = (is_number(opts[opts.d['width']]))
						? 'center'
						: false;
				}
				//	set variabe visible-items
				if (opts.items.visibleConf.variable)
				{
					opts.items.visible = gn_getVisibleItemsNext(a_itm, opts, 0);
				}
			}

			//	set visible items by filter
			if (opts.items.filter != '*' && !opts.items.visibleConf.variable)
			{
				opts.items.visibleConf.org = opts.items.visible;
				opts.items.visible = gn_getVisibleItemsNextFilter(a_itm, opts, 0);
			}

			opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0);
			opts.items.visibleConf.old = opts.items.visible;

			if (opts.responsive)
			{
				if (!opts.items.visibleConf.min)
				{
					opts.items.visibleConf.min = opts.items.visible;
				}
				if (!opts.items.visibleConf.max)
				{
					opts.items.visibleConf.max = opts.items.visible;
				}
				opts = in_getResponsiveValues(opts, a_itm, avail_primary);
			}
			else
			{
				opts.padding = cf_getPadding(opts.padding);

				if (opts.align == 'top')
				{
					opts.align = 'left';
				}
				else if (opts.align == 'bottom')
				{
					opts.align = 'right';
				}

				switch (opts.align)
				{
					//	align: center, left or right
					case 'center':
					case 'left':
					case 'right':
						if (opts[opts.d['width']] != 'variable')
						{
							opts = in_getAlignPadding(opts, a_itm);
							opts.usePadding = true;
						}
						break;

					//	padding
					default:
						opts.align = false;
						opts.usePadding = (
							opts.padding[0] == 0 && 
							opts.padding[1] == 0 && 
							opts.padding[2] == 0 && 
							opts.padding[3] == 0
						) ? false : true;
						break;
				}
			}

			if (!is_number(opts.scroll.duration))
			{
				opts.scroll.duration = 500;
			}
			if (is_undefined(opts.scroll.items))
			{
				opts.scroll.items = (opts.responsive || opts.items.visibleConf.variable || opts.items.filter != '*') 
					? 'visible'
					: opts.items.visible;
			}

			opts.auto = $.extend(true, {}, opts.scroll, opts.auto);
			opts.prev = $.extend(true, {}, opts.scroll, opts.prev);
			opts.next = $.extend(true, {}, opts.scroll, opts.next);
			opts.pagination = $.extend(true, {}, opts.scroll, opts.pagination);
			//	swipe and mousewheel extend later on, per direction

			opts.auto = go_complementAutoObject($tt0, opts.auto);
			opts.prev = go_complementPrevNextObject($tt0, opts.prev);
			opts.next = go_complementPrevNextObject($tt0, opts.next);
			opts.pagination = go_complementPaginationObject($tt0, opts.pagination);
			opts.swipe = go_complementSwipeObject($tt0, opts.swipe);
			opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel);

			if (opts.synchronise)
			{
				opts.synchronise = cf_getSynchArr(opts.synchronise);
			}


			//	DEPRECATED
			if (opts.auto.onPauseStart)
			{
				opts.auto.onTimeoutStart = opts.auto.onPauseStart;
				deprecated('auto.onPauseStart', 'auto.onTimeoutStart');
			}
			if (opts.auto.onPausePause)
			{
				opts.auto.onTimeoutPause = opts.auto.onPausePause;
				deprecated('auto.onPausePause', 'auto.onTimeoutPause');
			}
			if (opts.auto.onPauseEnd)
			{
				opts.auto.onTimeoutEnd = opts.auto.onPauseEnd;
				deprecated('auto.onPauseEnd', 'auto.onTimeoutEnd');
			}
			if (opts.auto.pauseDuration)
			{
				opts.auto.timeoutDuration = opts.auto.pauseDuration;
				deprecated('auto.pauseDuration', 'auto.timeoutDuration');
			}
			//	/DEPRECATED


		};	//	/init


		FN._build = function() {
			$cfs.data('_cfs_isCarousel', true);

			var a_itm = $cfs.children(),
				orgCSS = in_mapCss($cfs, ['textAlign', 'float', 'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'width', 'height', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
				newPosition = 'relative';

			switch (orgCSS.position)
			{
				case 'absolute':
				case 'fixed':
					newPosition = orgCSS.position;
					break;
			}

			if (conf.wrapper == 'parent')
			{
				sz_storeOrigCss($wrp);
			}
			else
			{
				$wrp.css(orgCSS);
			}
			$wrp.css({
				'overflow'		: 'hidden',
				'position'		: newPosition
			});

			sz_storeOrigCss($cfs);
			$cfs.data('_cfs_origCssZindex', orgCSS.zIndex);
			$cfs.css({
				'textAlign'		: 'left',
				'float'			: 'none',
				'position'		: 'absolute',
				'top'			: 0,
				'right'			: 'auto',
				'bottom'		: 'auto',
				'left'			: 0,
				'marginTop'		: 0,
				'marginRight'	: 0,
				'marginBottom'	: 0,
				'marginLeft'	: 0
			});

			sz_storeMargin(a_itm, opts);
			sz_storeOrigCss(a_itm);
			if (opts.responsive)
			{
				sz_setResponsiveSizes(opts, a_itm);
			}

		};	//	/build


		FN._bind_events = function() {
			FN._unbind_events();


			//	stop event
			$cfs.bind(cf_e('stop', conf), function(e, imm) {
				e.stopPropagation();

				//	button
				if (!crsl.isStopped)
				{
					if (opts.auto.button)
					{
						opts.auto.button.addClass(cf_c('stopped', conf));
					}
				}

				//	set stopped
				crsl.isStopped = true;

				if (opts.auto.play)
				{
					opts.auto.play = false;
					$cfs.trigger(cf_e('pause', conf), imm);
				}
				return true;
			});


			//	finish event
			$cfs.bind(cf_e('finish', conf), function(e) {
				e.stopPropagation();
				if (crsl.isScrolling)
				{
					sc_stopScroll(scrl);
				}
				return true;
			});


			//	pause event
			$cfs.bind(cf_e('pause', conf), function(e, imm, res) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				//	immediately pause
				if (imm && crsl.isScrolling)
				{
					scrl.isStopped = true;
					var nst = getTime() - scrl.startTime;
					scrl.duration -= nst;
					if (scrl.pre)
					{
						scrl.pre.duration -= nst;
					}
					if (scrl.post)
					{
						scrl.post.duration -= nst;
					}
					sc_stopScroll(scrl, false);
				}

				//	update remaining pause-time
				if (!crsl.isPaused && !crsl.isScrolling)
				{
					if (res)
					{
						tmrs.timePassed += getTime() - tmrs.startTime;
					}
				}

				//	button
				if (!crsl.isPaused)
				{
					if (opts.auto.button)
					{
						opts.auto.button.addClass(cf_c('paused', conf));
					}
				}

				//	set paused
				crsl.isPaused = true;

				//	pause pause callback
				if (opts.auto.onTimeoutPause)
				{
					var dur1 = opts.auto.timeoutDuration - tmrs.timePassed,
						perc = 100 - Math.ceil( dur1 * 100 / opts.auto.timeoutDuration );

					opts.auto.onTimeoutPause.call($tt0, perc, dur1);
				}
				return true;
			});


			//	play event
			$cfs.bind(cf_e('play', conf), function(e, dir, del, res) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				//	sort params
				var v = [dir, del, res],
					t = ['string', 'number', 'boolean'],
					a = cf_sortParams(v, t);

				dir = a[0];
				del = a[1];
				res = a[2];

				if (dir != 'prev' && dir != 'next')
				{
					dir = crsl.direction;
				}
				if (!is_number(del))
				{
					del = 0;
				}
				if (!is_boolean(res))
				{
					res = false;
				}

				//	stopped?
				if (res)
				{
					crsl.isStopped = false;
					opts.auto.play = true;
				}
				if (!opts.auto.play)
				{
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped: Not scrolling.');
				}

				//	button
				if (crsl.isPaused)
				{
					if (opts.auto.button)
					{
						opts.auto.button.removeClass(cf_c('stopped', conf));
						opts.auto.button.removeClass(cf_c('paused', conf));
					}
				}

				//	set playing
				crsl.isPaused = false;
				tmrs.startTime = getTime();

				//	timeout the scrolling
				var dur1 = opts.auto.timeoutDuration + del;
					dur2 = dur1 - tmrs.timePassed;
					perc = 100 - Math.ceil(dur2 * 100 / dur1);

				if (opts.auto.progress)
				{
					tmrs.progress = setInterval(function() {
						var pasd = getTime() - tmrs.startTime + tmrs.timePassed,
							perc = Math.ceil(pasd * 100 / dur1);
						opts.auto.progress.updater.call(opts.auto.progress.bar[0], perc);
					}, opts.auto.progress.interval);
				}

				tmrs.auto = setTimeout(function() {
					if (opts.auto.progress)
					{
						opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100);
					}
					if (opts.auto.onTimeoutEnd)
					{
						opts.auto.onTimeoutEnd.call($tt0, perc, dur2);
					}
					if (crsl.isScrolling)
					{
						$cfs.trigger(cf_e('play', conf), dir);
					}
					else
					{
						$cfs.trigger(cf_e(dir, conf), opts.auto);
					}
				}, dur2);

				//	pause start callback
				if (opts.auto.onTimeoutStart)
				{
					opts.auto.onTimeoutStart.call($tt0, perc, dur2);
				}

				return true;
			});


			//	resume event
			$cfs.bind(cf_e('resume', conf), function(e) {
				e.stopPropagation();
				if (scrl.isStopped)
				{
					scrl.isStopped = false;
					crsl.isPaused = false;
					crsl.isScrolling = true;
					scrl.startTime = getTime();
					sc_startScroll(scrl, conf);
				}
				else
				{
					$cfs.trigger(cf_e('play', conf));
				}
				return true;
			});


			//	prev + next events
			$cfs.bind(cf_e('prev', conf)+' '+cf_e('next', conf), function(e, obj, num, clb, que) {
				e.stopPropagation();

				//	stopped or hidden carousel, don't scroll, don't queue
				if (crsl.isStopped || $cfs.is(':hidden'))
				{
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped or hidden: Not scrolling.');
				}

				//	not enough items
				var minimum = (is_number(opts.items.minimum)) ? opts.items.minimum : opts.items.visible + 1;
				if (minimum > itms.total)
				{
					e.stopImmediatePropagation();
					return debug(conf, 'Not enough items ('+itms.total+' total, '+minimum+' needed): Not scrolling.');
				}

				//	get config
				var v = [obj, num, clb, que],
					t = ['object', 'number/string', 'function', 'boolean'],
					a = cf_sortParams(v, t);

				obj = a[0];
				num = a[1];
				clb = a[2];
				que = a[3];

				var eType = e.type.slice(conf.events.prefix.length);

				if (!is_object(obj))
				{
					obj = {};
				}
				if (is_function(clb))
				{
					obj.onAfter = clb;
				}
				if (is_boolean(que))
				{
					obj.queue = que;
				}
				obj = $.extend(true, {}, opts[eType], obj);

				//	test conditions callback
				if (obj.conditions && !obj.conditions.call($tt0, eType))
				{
					e.stopImmediatePropagation();
					return debug(conf, 'Callback "conditions" returned false.');
				}

				if (!is_number(num))
				{
					if (opts.items.filter != '*')
					{
						num = 'visible';
					}
					else
					{
						var arr = [num, obj.items, opts[eType].items];
						for (var a = 0, l = arr.length; a < l; a++)
						{
							if (is_number(arr[a]) || arr[a] == 'page' || arr[a] == 'visible') {
								num = arr[a];
								break;
							}
						}
					}
					switch(num) {
						case 'page':
							e.stopImmediatePropagation();
							return $cfs.triggerHandler(cf_e(eType+'Page', conf), [obj, clb]);
							break;

						case 'visible':
							if (!opts.items.visibleConf.variable && opts.items.filter == '*')
							{
								num = opts.items.visible;
							}
							break;
					}
				}

				//	resume animation, add current to queue
				if (scrl.isStopped)
				{
					$cfs.trigger(cf_e('resume', conf));
					$cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel resumed scrolling.');
				}

				//	queue if scrolling
				if (obj.duration > 0)
				{
					if (crsl.isScrolling)
					{
						if (obj.queue)
						{
							if (obj.queue == 'last')
							{
								queu = [];
							}
							if (obj.queue != 'first' || queu.length == 0)
							{
								$cfs.trigger(cf_e('queue', conf), [eType, [obj, num, clb]]);
							}
						}
						e.stopImmediatePropagation();
						return debug(conf, 'Carousel currently scrolling.');
					}
				}

				tmrs.timePassed = 0;
				$cfs.trigger(cf_e('slide_'+eType, conf), [obj, num]);

				//	synchronise
				if (opts.synchronise)
				{
					var s = opts.synchronise,
						c = [obj, num];

					for (var j = 0, l = s.length; j < l; j++) {
						var d = eType;
						if (!s[j][2])
						{
							d = (d == 'prev') ? 'next' : 'prev';
						}
						if (!s[j][1])
						{
							c[0] = s[j][0].triggerHandler('_cfs_triggerEvent', ['configuration', d]);
						}
						c[1] = num + s[j][3];
						s[j][0].trigger('_cfs_triggerEvent', ['slide_'+d, c]);
					}
				}
				return true;
			});


			//	prev event
			$cfs.bind(cf_e('slide_prev', conf), function(e, sO, nI) {
				e.stopPropagation();
				var a_itm = $cfs.children();

				//	non-circular at start, scroll to end
				if (!opts.circular)
				{
					if (itms.first == 0)
					{
						if (opts.infinite)
						{
							$cfs.trigger(cf_e('next', conf), itms.total-1);
						}
						return e.stopImmediatePropagation();
					}
				}

				sz_resetMargin(a_itm, opts);

				//	find number of items to scroll
				if (!is_number(nI))
				{
					if (opts.items.visibleConf.variable)
					{
						nI = gn_getVisibleItemsPrev(a_itm, opts, itms.total-1);
					}
					else if (opts.items.filter != '*')
					{
						var xI = (is_number(sO.items)) ? sO.items : gn_getVisibleOrg($cfs, opts);
						nI = gn_getScrollItemsPrevFilter(a_itm, opts, itms.total-1, xI);
					}
					else
					{
						nI = opts.items.visible;
					}
					nI = cf_getAdjust(nI, opts, sO.items, $tt0);
				}

				//	prevent non-circular from scrolling to far
				if (!opts.circular)
				{
					if (itms.total - nI < itms.first)
					{
						nI = itms.total - itms.first;
					}
				}

				//	set new number of visible items
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable)
				{
					var vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total-nI), opts, opts.items.visibleConf.adjust, $tt0);
					if (opts.items.visible+nI <= vI && nI < itms.total)
					{
						nI++;
						vI = cf_getItemsAdjust(gn_getVisibleItemsNext(a_itm, opts, itms.total-nI), opts, opts.items.visibleConf.adjust, $tt0);
					}
					opts.items.visible = vI;
				}
				else if (opts.items.filter != '*')
				{
					var vI = gn_getVisibleItemsNextFilter(a_itm, opts, itms.total-nI);
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				}

				sz_resetMargin(a_itm, opts, true);

				//	scroll 0, don't scroll
				if (nI == 0)
				{
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.');
				}
				debug(conf, 'Scrolling '+nI+' items backward.');


				//	save new config
				itms.first += nI;
				while (itms.first >= itms.total)
				{
					itms.first -= itms.total;
				}

				//	non-circular callback
				if (!opts.circular)
				{
					if (itms.first == 0 && sO.onEnd)
					{
						sO.onEnd.call($tt0, 'prev');
					}
					if (!opts.infinite)
					{
						nv_enableNavi(opts, itms.first, conf);
					}
				}

				//	rearrange items
				$cfs.children().slice(itms.total-nI, itms.total).prependTo($cfs);
				if (itms.total < opts.items.visible + nI)
				{
					$cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
				}

				//	the needed items
				var a_itm = $cfs.children(),
					i_old = gi_getOldItemsPrev(a_itm, opts, nI),
					i_new = gi_getNewItemsPrev(a_itm, opts),
					i_cur_l = a_itm.eq(nI-1),
					i_old_l = i_old.last(),
					i_new_l = i_new.last();

				sz_resetMargin(a_itm, opts);

				var pL = 0,
					pR = 0;

				if (opts.align)
				{
					var p = cf_getAlignPadding(i_new, opts);
					pL = p[0];
					pR = p[1];
				}
				var oL = (pL < 0) ? opts.padding[opts.d[3]] : 0;

				//	hide items for fx directscroll
				var hiddenitems = false,
					i_skp = $();
				if (opts.items.visible < nI)
				{
					i_skp = a_itm.slice(opts.items.visibleConf.old, nI);
					if (sO.fx == 'directscroll')
					{
						var orgW = opts.items[opts.d['width']];
						hiddenitems = i_skp;
						i_cur_l = i_new_l;
						sc_hideHiddenItems(hiddenitems);
						opts.items[opts.d['width']] = 'variable';
					}
				}

				//	save new sizes
				var $cf2 = false,
					i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
					w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
					i_siz_vis = 0,
					a_cfs = {},
					a_wsz = {},
					a_cur = {},
					a_old = {},
					a_new = {},
					a_lef = {},
					a_lef_vis = {},
					a_dur = sc_getDuration(sO, opts, nI, i_siz);

				switch(sO.fx)
				{
					case 'cover':
					case 'cover-fade':
						i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visible), opts, 'width');
						break;
				}

				if (hiddenitems)
				{
					opts.items[opts.d['width']] = orgW;
				}

				sz_resetMargin(a_itm, opts, true);
				if (pR >= 0)
				{
					sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]);
				}
				if (pL >= 0)
				{
					sz_resetMargin(i_cur_l, opts, opts.padding[opts.d[3]]);
				}

				if (opts.align)
				{
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = pL;
				}

				a_lef[opts.d['left']] = -(i_siz - oL);
				a_lef_vis[opts.d['left']] = -(i_siz_vis - oL);
				a_wsz[opts.d['left']] = w_siz[opts.d['width']];

				//	scrolling functions
				var _s_wrapper = function() {},
					_a_wrapper = function() {},
					_s_paddingold = function() {},
					_a_paddingold = function() {},
					_s_paddingnew = function() {},
					_a_paddingnew = function() {},
					_s_paddingcur = function() {},
					_a_paddingcur = function() {},
					_onafter = function() {},
					_moveitems = function() {},
					_position = function() {};

				//	clone carousel
				switch(sO.fx)
				{
					case 'crossfade':
					case 'cover':
					case 'cover-fade':
					case 'uncover':
					case 'uncover-fade':
						$cf2 = $cfs.clone(true).appendTo($wrp);
						break;
				}
				switch(sO.fx)
				{
					case 'crossfade':
					case 'uncover':
					case 'uncover-fade':
						$cf2.children().slice(0, nI).remove();
						$cf2.children().slice(opts.items.visibleConf.old).remove();
						break;

					case 'cover':
					case 'cover-fade':
						$cf2.children().slice(opts.items.visible).remove();
						$cf2.css(a_lef_vis);
						break;
				}

				$cfs.css(a_lef);

				//	reset all scrolls
				scrl = sc_setScroll(a_dur, sO.easing, conf);

				//	animate / set carousel
				a_cfs[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;

				//	animate / set wrapper
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable')
				{
					_s_wrapper = function() {
						$wrp.css(w_siz);
					};
					_a_wrapper = function() {
						scrl.anims.push([$wrp, w_siz]);
					};
				}

				//	animate / set items
				if (opts.usePadding)
				{
					if (i_new_l.not(i_cur_l).length)
					{
			 			a_cur[opts.d['marginRight']] = i_cur_l.data('_cfs_origCssMargin');

						if (pL < 0)
						{
							i_cur_l.css(a_cur);
						}
						else
						{
							_s_paddingcur = function() {
								i_cur_l.css(a_cur);
							};
							_a_paddingcur = function() {
								scrl.anims.push([i_cur_l, a_cur]);
							};
						}
					}
					switch(sO.fx)
					{
						case 'cover':
						case 'cover-fade':
							$cf2.children().eq(nI-1).css(a_cur);
							break;
					}

					if (i_new_l.not(i_old_l).length)
					{
						a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin');
						_s_paddingold = function() {
							i_old_l.css(a_old);
						};
						_a_paddingold = function() {
							scrl.anims.push([i_old_l, a_old]);
						};
					}

					if (pR >= 0)
					{
						a_new[opts.d['marginRight']] = i_new_l.data('_cfs_origCssMargin') + opts.padding[opts.d[1]];
						_s_paddingnew = function() {
							i_new_l.css(a_new);
						};
						_a_paddingnew = function() {
							scrl.anims.push([i_new_l, a_new]);
						};
					}
				}

				//	set position
				_position = function() {
					$cfs.css(a_cfs);
				};


				var overFill = opts.items.visible+nI-itms.total;

				//	rearrange items
				_moveitems = function() {
					if (overFill > 0)
					{
						$cfs.children().slice(itms.total).remove();
						i_old = $( $cfs.children().slice(itms.total-(opts.items.visible-overFill)).get().concat( $cfs.children().slice(0, overFill).get() ) );
					}
					sc_showHiddenItems(hiddenitems);

					if (opts.usePadding)
					{
						var l_itm = $cfs.children().eq(opts.items.visible+nI-1);
						l_itm.css(opts.d['marginRight'], l_itm.data('_cfs_origCssMargin'));
					}
				};


				var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, 'prev', a_dur, w_siz);

				//	fire onAfter callbacks
				_onafter = function() {
					sc_afterScroll($cfs, $cf2, sO);
					crsl.isScrolling = false;
					clbk.onAfter = sc_fireCallbacks($tt0, sO, 'onAfter', cb_arguments, clbk);
					queu = sc_fireQueue($cfs, queu, conf);

					if (!crsl.isPaused)
					{
						$cfs.trigger(cf_e('play', conf));
					}
				};

				//	fire onBefore callback
				crsl.isScrolling = true;
				tmrs = sc_clearTimers(tmrs);
				clbk.onBefore = sc_fireCallbacks($tt0, sO, 'onBefore', cb_arguments, clbk);

				switch(sO.fx)
				{
					case 'none':
						$cfs.css(a_cfs);
						_s_wrapper();
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						_onafter();
						break;

					case 'fade':
						scrl.anims.push([$cfs, { 'opacity': 0 }, function() {
							_s_wrapper();
							_s_paddingold();
							_s_paddingnew();
							_s_paddingcur();
							_position();
							_moveitems();
							scrl = sc_setScroll(a_dur, sO.easing, conf);
							scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
							sc_startScroll(scrl, conf);
						}]);
						break;

					case 'crossfade':
						$cfs.css({ 'opacity': 0 });
						scrl.anims.push([$cf2, { 'opacity': 0 }]);
						scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					case 'cover':
						scrl.anims.push([$cf2, a_cfs, function() {
							_s_paddingold();
							_s_paddingnew();
							_s_paddingcur();
							_position();
							_moveitems();
							_onafter();
						}]);
						_a_wrapper();
						break;

					case 'cover-fade':
						scrl.anims.push([$cfs, { 'opacity': 0 }]);
						scrl.anims.push([$cf2, a_cfs, function() {
							_s_paddingold();
							_s_paddingnew();
							_s_paddingcur();
							_position();
							_moveitems();
							_onafter();
						}]);
						_a_wrapper();
						break;

					case 'uncover':
						scrl.anims.push([$cf2, a_wsz, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					case 'uncover-fade':
						$cfs.css({ 'opacity': 0 });
						scrl.anims.push([$cfs, { 'opacity': 1 }]);
						scrl.anims.push([$cf2, a_wsz, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					default:
						scrl.anims.push([$cfs, a_cfs, function() {
							_moveitems();
							_onafter();
						}]);
						_a_wrapper();
						_a_paddingold();
						_a_paddingnew();
						_a_paddingcur();
						break;
				}

				sc_startScroll(scrl, conf);
				cf_setCookie(opts.cookie, $cfs, conf);

				$cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

				return true;
			});


			//	next event
			$cfs.bind(cf_e('slide_next', conf), function(e, sO, nI) {
				e.stopPropagation();
				var a_itm = $cfs.children();

				//	non-circular at end, scroll to start
				if (!opts.circular)
				{
					if (itms.first == opts.items.visible)
					{
						if (opts.infinite)
						{
							$cfs.trigger(cf_e('prev', conf), itms.total-1);
						}
						return e.stopImmediatePropagation();
					}
				}

				sz_resetMargin(a_itm, opts);

				//	find number of items to scroll
				if (!is_number(nI))
				{
					if (opts.items.filter != '*')
					{
						var xI = (is_number(sO.items)) ? sO.items : gn_getVisibleOrg($cfs, opts);
						nI = gn_getScrollItemsNextFilter(a_itm, opts, 0, xI);
					}
					else
					{
						nI = opts.items.visible;
					}
					nI = cf_getAdjust(nI, opts, sO.items, $tt0);
				}

				var lastItemNr = (itms.first == 0) ? itms.total : itms.first;

				//	prevent non-circular from scrolling to far
				if (!opts.circular)
				{
					if (opts.items.visibleConf.variable)
					{
						var vI = gn_getVisibleItemsNext(a_itm, opts, nI),
							xI = gn_getVisibleItemsPrev(a_itm, opts, lastItemNr-1);
					}
					else
					{
						var vI = opts.items.visible,
							xI = opts.items.visible;
					}

					if (nI + vI > lastItemNr)
					{
						nI = lastItemNr - xI;
					}
				}

				//	set new number of visible items
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable)
				{
					var vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0);
					while (opts.items.visible-nI >= vI && nI < itms.total)
					{
						nI++;
						vI = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(a_itm, opts, nI, lastItemNr), opts, opts.items.visibleConf.adjust, $tt0);
					}
					opts.items.visible = vI;
				}
				else if (opts.items.filter != '*')
				{
					var vI = gn_getVisibleItemsNextFilter(a_itm, opts, nI);
					opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				}

				sz_resetMargin(a_itm, opts, true);

				//	scroll 0, don't scroll
				if (nI == 0)
				{
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.');
				}
				debug(conf, 'Scrolling '+nI+' items forward.');


				//	save new config
				itms.first -= nI;
				while (itms.first < 0)
				{
					itms.first += itms.total;
				}

				//	non-circular callback
				if (!opts.circular)
				{
					if (itms.first == opts.items.visible && sO.onEnd)
					{
						sO.onEnd.call($tt0, 'next');
					}
					if (!opts.infinite)
					{
						nv_enableNavi(opts, itms.first, conf);
					}
				}

				//	rearrange items
				if (itms.total < opts.items.visible+nI)
				{
					$cfs.children().slice(0, (opts.items.visible+nI)-itms.total).clone(true).appendTo($cfs);
				}

				//	the needed items
				var a_itm = $cfs.children(),
					i_old = gi_getOldItemsNext(a_itm, opts),
					i_new = gi_getNewItemsNext(a_itm, opts, nI),
					i_cur_l = a_itm.eq(nI-1),
					i_old_l = i_old.last(),
					i_new_l = i_new.last();

				sz_resetMargin(a_itm, opts);

				var pL = 0,
					pR = 0;

				if (opts.align)
				{
					var p = cf_getAlignPadding(i_new, opts);
					pL = p[0];
					pR = p[1];
				}

				//	hide items for fx directscroll
				var hiddenitems = false,
					i_skp = $();
				if (opts.items.visibleConf.old < nI)
				{
					i_skp = a_itm.slice(opts.items.visibleConf.old, nI);
					if (sO.fx == 'directscroll')
					{
						var orgW = opts.items[opts.d['width']];
						hiddenitems = i_skp;
						i_cur_l = i_old_l;
						sc_hideHiddenItems(hiddenitems);
						opts.items[opts.d['width']] = 'variable';
					}
				}

				//	save new sizes
				var $cf2 = false,
					i_siz = ms_getTotalSize(a_itm.slice(0, nI), opts, 'width'),
					w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
					i_siz_vis = 0,
					a_cfs = {},
					a_cfs_vis = {},
					a_cur = {},
					a_old = {},
					a_lef = {},
					a_dur = sc_getDuration(sO, opts, nI, i_siz);

				switch(sO.fx)
				{
					case 'uncover':
					case 'uncover-fade':
						i_siz_vis = ms_getTotalSize(a_itm.slice(0, opts.items.visibleConf.old), opts, 'width');
						break;
				}

				if (hiddenitems)
				{
					opts.items[opts.d['width']] = orgW;
				}

				if (opts.align)
				{
					if (opts.padding[opts.d[1]] < 0)
					{
						opts.padding[opts.d[1]] = 0;
					}
				}
				sz_resetMargin(a_itm, opts, true);
				sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]);

				if (opts.align)
				{
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = pL;
				}

				a_lef[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;

				//	scrolling functions
				var _s_wrapper = function() {},
					_a_wrapper = function() {},
					_s_paddingold = function() {},
					_a_paddingold = function() {},
					_s_paddingcur = function() {},
					_a_paddingcur = function() {},
					_onafter = function() {},
					_moveitems = function() {},
					_position = function() {};

				//	clone carousel
				switch(sO.fx)
				{
					case 'crossfade':
					case 'cover':
					case 'cover-fade':
					case 'uncover':
					case 'uncover-fade':
						$cf2 = $cfs.clone(true).appendTo($wrp);
						$cf2.children().slice(opts.items.visibleConf.old).remove();
						break;
				}
				switch(sO.fx)
				{
					case 'crossfade':
					case 'cover':
					case 'cover-fade':
						$cfs.css('zIndex', 1);
						$cf2.css('zIndex', 0);
						break;
				}

				//	reset all scrolls
				scrl = sc_setScroll(a_dur, sO.easing, conf);

				//	animate / set carousel
				a_cfs[opts.d['left']] = -i_siz;
				a_cfs_vis[opts.d['left']] = -i_siz_vis;

				if (pL < 0)
				{
					a_cfs[opts.d['left']] += pL;
				}

				//	animate / set wrapper
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable')
				{
					_s_wrapper = function() {
						$wrp.css(w_siz);
					};
					_a_wrapper = function() {
						scrl.anims.push([$wrp, w_siz]);
					};
				}

				//	animate / set items
				if (opts.usePadding)
				{
					var i_new_l_m = i_new_l.data('_cfs_origCssMargin');

					if (pR >= 0)
					{
						i_new_l_m += opts.padding[opts.d[1]];
					}
					i_new_l.css(opts.d['marginRight'], i_new_l_m);

					if (i_cur_l.not(i_old_l).length)
					{
						a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin');
					}
					_s_paddingold = function() {
						i_old_l.css(a_old);
					};
					_a_paddingold = function() {
						scrl.anims.push([i_old_l, a_old]);
					};

					var i_cur_l_m = i_cur_l.data('_cfs_origCssMargin');
					if (pL > 0)
					{
						i_cur_l_m += opts.padding[opts.d[3]];
					}

					a_cur[opts.d['marginRight']] = i_cur_l_m;

					_s_paddingcur = function() {
						i_cur_l.css(a_cur);
					};
					_a_paddingcur = function() {
						scrl.anims.push([i_cur_l, a_cur]);
					};
				}

				//	set position
				_position = function() {
					$cfs.css(a_lef);
				};


				var overFill = opts.items.visible+nI-itms.total;

				//	rearrange items
				_moveitems = function() {
					if (overFill > 0)
					{
						$cfs.children().slice(itms.total).remove();
					}
					var l_itm = $cfs.children().slice(0, nI).appendTo($cfs).last();
					if (overFill > 0)
					{
						i_new = gi_getCurrentItems(a_itm, opts);
					}
					sc_showHiddenItems(hiddenitems);

					if (opts.usePadding)
					{
						if (itms.total < opts.items.visible+nI) {
							var i_cur_l = $cfs.children().eq(opts.items.visible-1);
							i_cur_l.css(opts.d['marginRight'], i_cur_l.data('_cfs_origCssMargin') + opts.padding[opts.d[1]]);
						}
						l_itm.css(opts.d['marginRight'], l_itm.data('_cfs_origCssMargin'));
					}
				};


				var cb_arguments = sc_mapCallbackArguments(i_old, i_skp, i_new, nI, 'next', a_dur, w_siz);

				//	fire onAfter callbacks
				_onafter = function() {
					$cfs.css('zIndex', $cfs.data('_cfs_origCssZindex'));
					sc_afterScroll($cfs, $cf2, sO);
					crsl.isScrolling = false;
					clbk.onAfter = sc_fireCallbacks($tt0, sO, 'onAfter', cb_arguments, clbk);
					queu = sc_fireQueue($cfs, queu, conf);
					
					if (!crsl.isPaused)
					{
						$cfs.trigger(cf_e('play', conf));
					}
				};

				//	fire onBefore callbacks
				crsl.isScrolling = true;
				tmrs = sc_clearTimers(tmrs);
				clbk.onBefore = sc_fireCallbacks($tt0, sO, 'onBefore', cb_arguments, clbk);

				switch(sO.fx)
				{
					case 'none':
						$cfs.css(a_cfs);
						_s_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_position();
						_moveitems();
						_onafter();
						break;

					case 'fade':
						scrl.anims.push([$cfs, { 'opacity': 0 }, function() {
							_s_wrapper();
							_s_paddingold();
							_s_paddingcur();
							_position();
							_moveitems();
							scrl = sc_setScroll(a_dur, sO.easing, conf);
							scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
							sc_startScroll(scrl, conf);
						}]);
						break;

					case 'crossfade':
						$cfs.css({ 'opacity': 0 });
						scrl.anims.push([$cf2, { 'opacity': 0 }]);
						scrl.anims.push([$cfs, { 'opacity': 1 }, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					case 'cover':
						$cfs.css(opts.d['left'], $wrp[opts.d['width']]());
						scrl.anims.push([$cfs, a_lef, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_moveitems();
						break;

					case 'cover-fade':
						$cfs.css(opts.d['left'], $wrp[opts.d['width']]());
						scrl.anims.push([$cf2, { 'opacity': 0 }]);
						scrl.anims.push([$cfs, a_lef, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_moveitems();
						break;

					case 'uncover':
						scrl.anims.push([$cf2, a_cfs_vis, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					case 'uncover-fade':
						$cfs.css({ 'opacity': 0 });
						scrl.anims.push([$cfs, { 'opacity': 1 }]);
						scrl.anims.push([$cf2, a_cfs_vis, _onafter]);
						_a_wrapper();
						_s_paddingold();
						_s_paddingcur();
						_position();
						_moveitems();
						break;

					default:
						scrl.anims.push([$cfs, a_cfs, function() {
							_position();
							_moveitems();
							_onafter();
						}]);
						_a_wrapper();
						_a_paddingold();
						_a_paddingcur();
						break;
				}

				sc_startScroll(scrl, conf);
				cf_setCookie(opts.cookie, $cfs, conf);

				$cfs.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);

				return true;
			});


			//	slideTo event
			$cfs.bind(cf_e('slideTo', conf), function(e, num, dev, org, obj, dir, clb) {
				e.stopPropagation();

				var v = [num, dev, org, obj, dir, clb],
					t = ['string/number/object', 'number', 'boolean', 'object', 'string', 'function'],
					a = cf_sortParams(v, t);

				obj = a[3];
				dir = a[4];
				clb = a[5];

				num = gn_getItemIndex(a[0], a[1], a[2], itms, $cfs);

				if (num == 0)
				{
					return false;
				}
				if (!is_object(obj))
				{
					obj = false;
				}

				if (dir != 'prev' && dir != 'next')
				{
					if (opts.circular)
					{
						dir = (num <= itms.total / 2) ? 'next' : 'prev';
					}
					else
					{
						dir = (itms.first == 0 || itms.first > num) ? 'next' : 'prev';
					}
				}

				if (dir == 'prev')
				{
					num = itms.total-num;
				}
				$cfs.trigger(cf_e(dir, conf), [obj, num, clb]);

				return true;
			});


			//	prevPage event
			$cfs.bind(cf_e('prevPage', conf), function(e, obj, clb) {
				e.stopPropagation();
				var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
				return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur-1, obj, 'prev', clb]);
			});


			//	nextPage event
			$cfs.bind(cf_e('nextPage', conf), function(e, obj, clb) {
				e.stopPropagation();
				var cur = $cfs.triggerHandler(cf_e('currentPage', conf));
				return $cfs.triggerHandler(cf_e('slideToPage', conf), [cur+1, obj, 'next', clb]);
			});


			//	slideToPage event
			$cfs.bind(cf_e('slideToPage', conf), function(e, pag, obj, dir, clb) {
				e.stopPropagation();
				if (!is_number(pag))
				{
					pag = $cfs.triggerHandler(cf_e('currentPage', conf));
				}
				var ipp = opts.pagination.items || opts.items.visible,
					max = Math.ceil(itms.total / ipp)-1;

				if (pag < 0)
				{
					pag = max;
				}
				if (pag > max)
				{
					pag = 0;
				}
				return $cfs.triggerHandler(cf_e('slideTo', conf), [pag*ipp, 0, true, obj, dir, clb]);
			});

			//	jumpToStart event
			$cfs.bind(cf_e('jumpToStart', conf), function(e, s) {
				e.stopPropagation();
				if (s)
				{
					s = gn_getItemIndex(s, 0, true, itms, $cfs);
				}
				else
				{
					s = 0;
				}

				s += itms.first;
				if (s != 0)
				{
					if (itms.total > 0)
					{
						while (s > itms.total)
						{
							s -= itms.total;
						}
					}
					$cfs.prepend($cfs.children().slice(s, itms.total));
				}
				return true;
			});


			//	synchronise event
			$cfs.bind(cf_e('synchronise', conf), function(e, s) {
				e.stopPropagation();
				if (s)
				{
					s = cf_getSynchArr(s);
				}
				else if (opts.synchronise)
				{
					s = opts.synchronise;
				}
				else
				{
					return debug(conf, 'No carousel to synchronise.');
				}

				var n = $cfs.triggerHandler(cf_e('currentPosition', conf)),
					x = true;

				for (var j = 0, l = s.length; j < l; j++)
				{
					if (!s[j][0].triggerHandler(cf_e('slideTo', conf), [n, s[j][3], true]))
					{
						x = false;
					}
				}
				return x;
			});


			//	queue event
			$cfs.bind(cf_e('queue', conf), function(e, dir, opt) {
				e.stopPropagation();
				if (is_function(dir))
				{
					dir.call($tt0, queu);
				}
				else if (is_array(dir))
				{
					queu = dir;
				}
				else if (!is_undefined(dir))
				{
					queu.push([dir, opt]);
				}
				return queu;
			});


			//	insertItem event
			$cfs.bind(cf_e('insertItem', conf), function(e, itm, num, org, dev) {
				e.stopPropagation();

				var v = [itm, num, org, dev],
					t = ['string/object', 'string/number/object', 'boolean', 'number'],
					a = cf_sortParams(v, t);

				itm = a[0];
				num = a[1];
				org = a[2];
				dev = a[3];

				if (is_object(itm) && !is_jquery(itm))
				{ 
					itm = $(itm);
				}
				else if (is_string(itm))
				{
					itm = $(itm);
				}
				if (!is_jquery(itm) || itm.length == 0)
				{
					return debug(conf, 'Not a valid object.');
				}

				if (is_undefined(num))
				{
					num = 'end';
				}

				sz_storeMargin(itm, opts);
				sz_storeOrigCss(itm);

				var orgNum = num,
					before = 'before';

				if (num == 'end')
				{
					if (org)
					{
						if (itms.first == 0)
						{
							num = itms.total-1;
							before = 'after';
						}
						else
						{
							num = itms.first;
							itms.first += itm.length;
						}
						if (num < 0)
						{
							num = 0;
						}
					}
					else
					{
						num = itms.total-1;
						before = 'after';
					}
				}
				else
				{
					num = gn_getItemIndex(num, dev, org, itms, $cfs);
				}

				var $cit = $cfs.children().eq(num);
				if ($cit.length)
				{
					$cit[before](itm);
				}
				else
				{
					debug(conf, 'Correct insert-position not found! Appending item to the end.');
					$cfs.append(itm);
				}

				if (orgNum != 'end' && !org)
				{
					if (num < itms.first)
					{
						itms.first += itm.length;
					}
				}
				itms.total = $cfs.children().length;
				if (itms.first >= itms.total)
				{
					itms.first -= itms.total;
				}

				$cfs.trigger(cf_e('updateSizes', conf));
				$cfs.trigger(cf_e('linkAnchors', conf));

				return true;
			});


			//	removeItem event
			$cfs.bind(cf_e('removeItem', conf), function(e, num, org, dev) {
				e.stopPropagation();

				var v = [num, org, dev],
					t = ['string/number/object', 'boolean', 'number'],
					a = cf_sortParams(v, t);

				num = a[0];
				org = a[1];
				dev = a[2];

				var removed = false;

				if (num instanceof $ && num.length > 1)
				{
					$removed = $();
					num.each(function(i, el) {
						var $rem = $cfs.trigger(cf_e('removeItem', conf), [$(this), org, dev]);
						if ( $rem ) 
						{
							$removed = $removed.add($rem);
						}
					});
					return $removed;
				}

				if (is_undefined(num) || num == 'end')
				{
					$removed = $cfs.children().last();
				}
				else
				{
					num = gn_getItemIndex(num, dev, org, itms, $cfs);
					var $removed = $cfs.children().eq(num);
					if ( $removed.length )
					{
						if (num < itms.first)
						{
							itms.first -= $removed.length;
						}
					}
				}
				if ( $removed && $removed.length )
				{
					$removed.detach();
					itms.total = $cfs.children().length;
					$cfs.trigger(cf_e('updateSizes', conf));
				}

				return $removed;
			});


			//	onBefore and onAfter event
			$cfs.bind(cf_e('onBefore', conf)+' '+cf_e('onAfter', conf), function(e, fn) {
				e.stopPropagation();
				var eType = e.type.slice(conf.events.prefix.length);
				if (is_array(fn))
				{
					clbk[eType] = fn;
				}
				if (is_function(fn))
				{
					clbk[eType].push(fn);
				}
				return clbk[eType];
			});


			//	currentPosition event
			$cfs.bind(cf_e('currentPosition', conf), function(e, fn) {
				e.stopPropagation();
				if (itms.first == 0)
				{
					var val = 0;
				}
				else
				{
					var val = itms.total - itms.first;
				}
				if (is_function(fn))
				{
					fn.call($tt0, val);
				}
				return val;
			});


			//	currentPage event
			$cfs.bind(cf_e('currentPage', conf), function(e, fn) {
				e.stopPropagation();
				var ipp = opts.pagination.items || opts.items.visible,
					max = Math.ceil(itms.total/ipp-1),
					nr;
				if (itms.first == 0)
				{
					nr = 0;
				}
				else if (itms.first < itms.total % ipp)
				{
					nr = 0;
				}
				else if (itms.first == ipp && !opts.circular)
				{
					nr = max;
				}
				else 
				{
					 nr = Math.round((itms.total-itms.first)/ipp);
				}
				if (nr < 0)
				{
					nr = 0;
				}
				if (nr > max)
				{
					nr = max;
				}
				if (is_function(fn))
				{
					fn.call($tt0, nr);
				}
				return nr;
			});


			//	currentVisible event
			$cfs.bind(cf_e('currentVisible', conf), function(e, fn) {
				e.stopPropagation();
				var $i = gi_getCurrentItems($cfs.children(), opts);
				if (is_function(fn))
				{
					fn.call($tt0, $i);
				}
				return $i;
			});


			//	slice event
			$cfs.bind(cf_e('slice', conf), function(e, f, l, fn) {
				e.stopPropagation();

				if (itms.total == 0)
				{
					return false;
				}

				var v = [f, l, fn],
					t = ['number', 'number', 'function'],
					a = cf_sortParams(v, t);

				f = (is_number(a[0])) ? a[0] : 0;
				l = (is_number(a[1])) ? a[1] : itms.total;
				fn = a[2];

				f += itms.first;
				l += itms.first;

				if (items.total > 0)
				{
					while (f > itms.total)
					{
						f -= itms.total;
					}
					while (l > itms.total)
					{
						l -= itms.total;
					}
					while (f < 0)
					{
						f += itms.total;
					}
					while (l < 0)
					{
						l += itms.total;
					}
				}
				var $iA = $cfs.children(),
					$i;

				if (l > f)
				{
					$i = $iA.slice(f, l);
				}
				else
				{
					$i = $( $iA.slice(f, itms.total).get().concat( $iA.slice(0, l).get() ) );
				}

				if (is_function(fn))
				{
					fn.call($tt0, $i);
				}
				return $i;
			});


			//	isPaused, isStopped and isScrolling events
			$cfs.bind(cf_e('isPaused', conf)+' '+cf_e('isStopped', conf)+' '+cf_e('isScrolling', conf), function(e, fn) {
				e.stopPropagation();
				var eType = e.type.slice(conf.events.prefix.length),
					value = crsl[eType];
				if (is_function(fn))
				{
					fn.call($tt0, value);
				}
				return value;
			});


			//	configuration event
			$cfs.bind(cf_e('configuration', conf), function(e, a, b, c) {
				e.stopPropagation();
				var reInit = false;

				//	return entire configuration-object
				if (is_function(a))
				{
					a.call($tt0, opts);
				}
				//	set multiple options via object
				else if (is_object(a))
				{
					opts_orig = $.extend(true, {}, opts_orig, a);
					if (b !== false) reInit = true;
					else opts = $.extend(true, {}, opts, a);

				}
				else if (!is_undefined(a))
				{

					//	callback function for specific option
					if (is_function(b))
					{
						var val = eval('opts.'+a);
						if (is_undefined(val))
						{
							val = '';
						}
						b.call($tt0, val);
					}
					//	set individual option
					else if (!is_undefined(b))
					{
						if (typeof c !== 'boolean') c = true;
						eval('opts_orig.'+a+' = b');
						if (c !== false) reInit = true;
						else eval('opts.'+a+' = b');
					}
					//	return value for specific option
					else
					{
						return eval('opts.'+a);
					}
				}
				if (reInit)
				{
					sz_resetMargin($cfs.children(), opts);
					FN._init(opts_orig);
					FN._bind_buttons();
					var sz = sz_setSizes($cfs, opts);
					$cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);
				}
				return opts;
			});


			//	linkAnchors event
			$cfs.bind(cf_e('linkAnchors', conf), function(e, $con, sel) {
				e.stopPropagation();

				if (is_undefined($con))
				{
					$con = $('body');
				}
				else if (is_string($con))
				{
					$con = $($con);
				}
				if (!is_jquery($con) || $con.length == 0)
				{
					return debug(conf, 'Not a valid object.');
				}
				if (!is_string(sel))
				{
					sel = 'a.caroufredsel';
				}

				$con.find(sel).each(function() {
					var h = this.hash || '';
					if (h.length > 0 && $cfs.children().index($(h)) != -1)
					{
						$(this).unbind('click').click(function(e) {
							e.preventDefault();
							$cfs.trigger(cf_e('slideTo', conf), h);
						});
					}
				});
				return true;
			});


			//	updatePageStatus event
			$cfs.bind(cf_e('updatePageStatus', conf), function(e, build, sizes) {
				e.stopPropagation();
				if (!opts.pagination.container)
				{
					return;
				}

				var ipp = opts.pagination.items || opts.items.visible,
					pgs = Math.ceil(itms.total/ipp);

				if (build)
				{
					if (opts.pagination.anchorBuilder)
					{
						opts.pagination.container.children().remove();
						opts.pagination.container.each(function() {
							for (var a = 0; a < pgs; a++)
							{
								var i = $cfs.children().eq( gn_getItemIndex(a*ipp, 0, true, itms, $cfs) );
								$(this).append(opts.pagination.anchorBuilder.call(i[0], a+1));
							}
						});
					}
					opts.pagination.container.each(function() {
						$(this).children().unbind(opts.pagination.event).each(function(a) {
							$(this).bind(opts.pagination.event, function(e) {
								e.preventDefault();
								$cfs.trigger(cf_e('slideTo', conf), [a*ipp, -opts.pagination.deviation, true, opts.pagination]);
							});
						});
					});
				}

				var selected = $cfs.triggerHandler(cf_e('currentPage', conf)) + opts.pagination.deviation;
				if (selected >= pgs)
				{
					selected = 0;
				}
				if (selected < 0)
				{
					selected = pgs-1;
				}
				opts.pagination.container.each(function() {
					$(this).children().removeClass(cf_c('selected', conf)).eq(selected).addClass(cf_c('selected', conf));
				});
				return true;
			});


			//	updateSizes event
			$cfs.bind(cf_e('updateSizes', conf), function(e) {
				var vI = opts.items.visible,
					a_itm = $cfs.children(),
					avail_primary = ms_getParentSize($wrp, opts, 'width');

				itms.total = a_itm.length;

				if (crsl.primarySizePercentage)
				{
					opts.maxDimension = avail_primary;
					opts[opts.d['width']] = ms_getPercentage(avail_primary, crsl.primarySizePercentage);
				}
				else
				{
					opts.maxDimension = ms_getMaxDimension(opts, avail_primary);
				}

				if (opts.responsive)
				{
					opts.items.width = opts.items.sizesConf.width;
					opts.items.height = opts.items.sizesConf.height;
					opts = in_getResponsiveValues(opts, a_itm, avail_primary);
					vI = opts.items.visible;
					sz_setResponsiveSizes(opts, a_itm);
				}
				else if (opts.items.visibleConf.variable)
				{
					vI = gn_getVisibleItemsNext(a_itm, opts, 0);
				}
				else if (opts.items.filter != '*')
				{
					vI = gn_getVisibleItemsNextFilter(a_itm, opts, 0);
				}

				if (!opts.circular && itms.first != 0 && vI > itms.first) {
					if (opts.items.visibleConf.variable)
					{
						var nI = gn_getVisibleItemsPrev(a_itm, opts, itms.first) - itms.first;
					}
					else if (opts.items.filter != '*')
					{
						var nI = gn_getVisibleItemsPrevFilter(a_itm, opts, itms.first) - itms.first;
					}
					else
					{
						var nI = opts.items.visible - itms.first;
					}
					debug(conf, 'Preventing non-circular: sliding '+nI+' items backward.');
					$cfs.trigger(cf_e('prev', conf), nI);
				}

				opts.items.visible = cf_getItemsAdjust(vI, opts, opts.items.visibleConf.adjust, $tt0);
				opts.items.visibleConf.old = opts.items.visible;
				opts = in_getAlignPadding(opts, a_itm);

				var sz = sz_setSizes($cfs, opts);
				$cfs.trigger(cf_e('updatePageStatus', conf), [true, sz]);
				nv_showNavi(opts, itms.total, conf);
				nv_enableNavi(opts, itms.first, conf);

				return sz;
			});


			//	destroy event
			$cfs.bind(cf_e('destroy', conf), function(e, orgOrder) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);

				$cfs.data('_cfs_isCarousel', false);
				$cfs.trigger(cf_e('finish', conf));
				if (orgOrder)
				{
					$cfs.trigger(cf_e('jumpToStart', conf));
				}
				sz_restoreOrigCss($cfs.children());
				sz_restoreOrigCss($cfs);
				FN._unbind_events();
				FN._unbind_buttons();
				if (conf.wrapper == 'parent')
				{
					sz_restoreOrigCss($wrp);
				}
				else
				{
					$wrp.replaceWith($cfs);
				}

				return true;
			});


			//	debug event
			$cfs.bind(cf_e('debug', conf), function(e) {
				debug(conf, 'Carousel width: ' + opts.width);
				debug(conf, 'Carousel height: ' + opts.height);
				debug(conf, 'Item widths: ' + opts.items.width);
				debug(conf, 'Item heights: ' + opts.items.height);
				debug(conf, 'Number of items visible: ' + opts.items.visible);
				if (opts.auto.play)
				{
					debug(conf, 'Number of items scrolled automatically: ' + opts.auto.items);
				}
				if (opts.prev.button)
				{
					debug(conf, 'Number of items scrolled backward: ' + opts.prev.items);
				}
				if (opts.next.button)
				{
					debug(conf, 'Number of items scrolled forward: ' + opts.next.items);
				}
				return conf.debug;
			});


			//	triggerEvent, making prefixed and namespaced events accessible from outside
			$cfs.bind('_cfs_triggerEvent', function(e, n, o) {
				e.stopPropagation();
				return $cfs.triggerHandler(cf_e(n, conf), o);
			});
		};	//	/bind_events


		FN._unbind_events = function() {
			$cfs.unbind(cf_e('', conf));
			$cfs.unbind(cf_e('', conf, false));
			$cfs.unbind('_cfs_triggerEvent');
		};	//	/unbind_events


		FN._bind_buttons = function() {
			FN._unbind_buttons();
			nv_showNavi(opts, itms.total, conf);
			nv_enableNavi(opts, itms.first, conf);

			if (opts.auto.pauseOnHover)
			{
				var pC = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
				$wrp.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
					.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
			}

			//	play button
			if (opts.auto.button)
			{
				opts.auto.button.bind(cf_e(opts.auto.event, conf, false), function(e) {
					e.preventDefault();
					var ev = false,
						pC = null;

					if (crsl.isPaused)
					{
						ev = 'play';
					}
					else if (opts.auto.pauseOnEvent)
					{
						ev = 'pause';
						pC = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent);
					}
					if (ev)
					{
						$cfs.trigger(cf_e(ev, conf), pC);
					}
				});
			}

			//	prev button
			if (opts.prev.button)
			{
				opts.prev.button.bind(cf_e(opts.prev.event, conf, false), function(e) {
					e.preventDefault();
					$cfs.trigger(cf_e('prev', conf));
				});
				if (opts.prev.pauseOnHover)
				{
					var pC = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
					opts.prev.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
									.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
				}
			}

			//	next butotn
			if (opts.next.button)
			{
				opts.next.button.bind(cf_e(opts.next.event, conf, false), function(e) {
					e.preventDefault();
					$cfs.trigger(cf_e('next', conf));
				});
				if (opts.next.pauseOnHover)
				{
					var pC = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
					opts.next.button.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC); 	})
									.bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));		});
				}
			}

			//	pagination
			if (opts.pagination.container)
			{
				if (opts.pagination.pauseOnHover)
				{
					var pC = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
					opts.pagination.container.bind(cf_e('mouseenter', conf, false), function() { $cfs.trigger(cf_e('pause', conf), pC);	})
											 .bind(cf_e('mouseleave', conf, false), function() { $cfs.trigger(cf_e('resume', conf));	});
				}
			}

			//	prev/next keys
			if (opts.prev.key || opts.next.key)
			{
				$(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
					var k = e.keyCode;
					if (k == opts.next.key)
					{
						e.preventDefault();
						$cfs.trigger(cf_e('next', conf));
					}
					if (k == opts.prev.key)
					{
						e.preventDefault();
						$cfs.trigger(cf_e('prev', conf));
					}
				});
			}

			//	pagination keys
			if (opts.pagination.keys)
			{
				$(document).bind(cf_e('keyup', conf, false, true, true), function(e) {
					var k = e.keyCode;
					if (k >= 49 && k < 58)
					{
						k = (k-49) * opts.items.visible;
						if (k <= itms.total)
						{
							e.preventDefault();
							$cfs.trigger(cf_e('slideTo', conf), [k, 0, true, opts.pagination]);
						}
					}
				});
			}

			//	swipe
			if ($.fn.swipe)
			{
				var isTouch = 'ontouchstart' in window;
				if ((isTouch && opts.swipe.onTouch) || (!isTouch && opts.swipe.onMouse))
				{
					var scP = $.extend(true, {}, opts.prev, opts.swipe),
						scN = $.extend(true, {}, opts.next, opts.swipe),
						swP = function() { $cfs.trigger(cf_e('prev', conf), [scP]) },
						swN = function() { $cfs.trigger(cf_e('next', conf), [scN]) };

					switch (opts.direction)
					{
						case 'up':
						case 'down':
							opts.swipe.options.swipeUp = swN;
							opts.swipe.options.swipeDown = swP;
							break;
						default:
							opts.swipe.options.swipeLeft = swN;
							opts.swipe.options.swipeRight = swP;
					}
					if (crsl.swipe)
					{
						$cfs.swipe('destroy');
					}
					$wrp.swipe(opts.swipe.options);
					$wrp.css('cursor', 'move');
					crsl.swipe = true;
				}
			}

			//	mousewheel
			if ($.fn.mousewheel)
			{

				if (opts.mousewheel)
				{
					var mcP = $.extend(true, {}, opts.prev, opts.mousewheel),
						mcN = $.extend(true, {}, opts.next, opts.mousewheel);

					if (crsl.mousewheel)
					{
						$wrp.unbind(cf_e('mousewheel', conf, false));
					}
					$wrp.bind(cf_e('mousewheel', conf, false), function(e, delta) { 
						e.preventDefault();
						if (delta > 0)
						{
							$cfs.trigger(cf_e('prev', conf), [mcP]);
						}
						else
						{
							$cfs.trigger(cf_e('next', conf), [mcN]);
						}
					});
					crsl.mousewheel = true;
				}
			}

			if (opts.auto.play)
			{
				$cfs.trigger(cf_e('play', conf), opts.auto.delay);
			}

			if (crsl.upDateOnWindowResize)
			{
				var resizeFn = function(e) {
					$cfs.trigger(cf_e('finish', conf));
					if (opts.auto.pauseOnResize && !crsl.isPaused)
					{
						$cfs.trigger(cf_e('play', conf));
					}
					sz_resetMargin($cfs.children(), opts);
					$cfs.trigger(cf_e('updateSizes', conf));
				};

				var $w = $(window),
					onResize = null;

				if ($.debounce && conf.onWindowResize == 'debounce')
				{
					onResize = $.debounce(200, resizeFn);
				}
				else if ($.throttle && conf.onWindowResize == 'throttle')
				{
					onResize = $.throttle(300, resizeFn);
				}
				else
				{
					var _windowWidth = 0,
						_windowHeight = 0;

					onResize = function() {
						var nw = $w.width(),
							nh = $w.height();

						if (nw != _windowWidth || nh != _windowHeight)
						{
							resizeFn();
							_windowWidth = nw;
							_windowHeight = nh;
						}
					};
				}
				$w.bind(cf_e('resize', conf, false, true, true), onResize);
			}
		};	//	/bind_buttons


		FN._unbind_buttons = function() {
			var ns1 = cf_e('', conf),
				ns2 = cf_e('', conf, false);
				ns3 = cf_e('', conf, false, true, true);

			$(document).unbind(ns3);
			$(window).unbind(ns3);
			$wrp.unbind(ns2);

			if (opts.auto.button)
			{
				opts.auto.button.unbind(ns2);
			}
			if (opts.prev.button)
			{
				opts.prev.button.unbind(ns2);
			}
			if (opts.next.button)
			{
				opts.next.button.unbind(ns2);
			}
			if (opts.pagination.container)
			{
				opts.pagination.container.unbind(ns2);
				if (opts.pagination.anchorBuilder)
				{
					opts.pagination.container.children().remove();
				}
			}
			if (crsl.swipe)
			{
				$cfs.swipe('destroy');
				$wrp.css('cursor', 'default');
				crsl.swipe = false;
			}
			if (crsl.mousewheel)
			{
				crsl.mousewheel = false;
			}

			nv_showNavi(opts, 'hide', conf);
			nv_enableNavi(opts, 'removeClass', conf);

		};	//	/unbind_buttons



		//	START

		if (is_boolean(configs))
		{
			configs = {
				'debug': configs
			};
		}

		//	set vars
		var crsl = {
				'direction'		: 'next',
				'isPaused'		: true,
				'isScrolling'	: false,
				'isStopped'		: false,
				'mousewheel'	: false,
				'swipe'			: false
			},
			itms = {
				'total'			: $cfs.children().length,
				'first'			: 0
			},
			tmrs = {
				'auto'			: null,
				'progress'		: null,
				'startTime'		: getTime(),
				'timePassed'	: 0
			},
			scrl = {
				'isStopped'		: false,
				'duration'		: 0,
				'startTime'		: 0,
				'easing'		: '',
				'anims'			: []
			},
			clbk = {
				'onBefore'		: [],
				'onAfter'		: []
			},
			queu = [],
			conf = $.extend(true, {}, $.fn.carouFredSel.configs, configs),
			opts = {},
			opts_orig = $.extend(true, {}, options),
			$wrp = (conf.wrapper == 'parent')
				? $cfs.parent()
				: $cfs.wrap('<'+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();


		conf.selector		= $cfs.selector;
		conf.serialNumber	= $.fn.carouFredSel.serialNumber++;

		conf.transition = (conf.transition && $.fn.transition) ? 'transition' : 'animate';

		//	create carousel
		FN._init(opts_orig, true, starting_position);
		FN._build();
		FN._bind_events();
		FN._bind_buttons();

		//	find item to start
		if (is_array(opts.items.start))
		{
			var start_arr = opts.items.start;
		}
		else
		{
			var start_arr = [];
			if (opts.items.start != 0)
			{
				start_arr.push(opts.items.start);
			}
		}
		if (opts.cookie)
		{
			start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10));
		}

		if (start_arr.length > 0)
		{
			for (var a = 0, l = start_arr.length; a < l; a++)
			{
				var s = start_arr[a];
				if (s == 0)
				{
					continue;
				}
				if (s === true)
				{
					s = window.location.hash;
					if (s.length < 1)
					{
						continue;
					}
				}
				else if (s === 'random')
				{
					s = Math.floor(Math.random()*itms.total);
				}
				if ($cfs.triggerHandler(cf_e('slideTo', conf), [s, 0, true, { fx: 'none' }]))
				{
					break;
				}
			}
		}
		var siz = sz_setSizes($cfs, opts),
			itm = gi_getCurrentItems($cfs.children(), opts);

		if (opts.onCreate)
		{
			opts.onCreate.call($tt0, {
				'width': siz.width,
				'height': siz.height,
				'items': itm
			});
		}

		$cfs.trigger(cf_e('updatePageStatus', conf), [true, siz]);
		$cfs.trigger(cf_e('linkAnchors', conf));

		if (conf.debug)
		{
			$cfs.trigger(cf_e('debug', conf));
		}

		return $cfs;
	};



	//	GLOBAL PUBLIC

	$.fn.carouFredSel.serialNumber = 1;
	$.fn.carouFredSel.defaults = {
		'synchronise'	: false,
		'infinite'		: true,
		'circular'		: true,
		'responsive'	: false,
		'direction'		: 'left',
		'items'			: {
			'start'			: 0
		},
		'scroll'		: {
			'easing'		: 'swing',
			'duration'		: 500,
			'pauseOnHover'	: false,
			'event'			: 'click',
			'queue'			: false
		}
	};
	$.fn.carouFredSel.configs = {
		'debug'			: false,
		'transition'	: false,
		'onWindowResize': 'throttle',
		'events'		: {
			'prefix'		: '',
			'namespace'		: 'cfs'
		},
		'wrapper'		: {
			'element'		: 'div',
			'classname'		: 'caroufredsel_wrapper'
		},
		'classnames'	: {}
	};
	$.fn.carouFredSel.pageAnchorBuilder = function(nr) {
		//return '<a href="#"><span>'+nr+'</span></a>';
		return '<a href="#"><span></span></a>';
	};
	$.fn.carouFredSel.progressbarUpdater = function(perc) {
		$(this).css('width', perc+'%');
	};

	$.fn.carouFredSel.cookie = {
		get: function(n) {
			n += '=';
			var ca = document.cookie.split(';');
			for (var a = 0, l = ca.length; a < l; a++)
			{
				var c = ca[a];
				while (c.charAt(0) == ' ')
				{
					c = c.slice(1);
				}
				if (c.indexOf(n) == 0)
				{
					return c.slice(n.length);
				}
			}
			return 0;
		},
		set: function(n, v, d) {
			var e = "";
			if (d)
			{
				var date = new Date();
				date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000));
				e = "; expires=" + date.toGMTString();
			}
			document.cookie = n + '=' + v + e + '; path=/';
		},
		remove: function(n) {
			$.fn.carouFredSel.cookie.set(n, "", -1);
		}
	};


	//	GLOBAL PRIVATE

	//	scrolling functions
	function sc_setScroll(d, e, c) {
		if (c.transition == 'transition')
		{
			if (e == 'swing')
			{
				e = 'ease';
			}
		}
		return {
			anims: [],
			duration: d,
			orgDuration: d,
			easing: e,
			startTime: getTime()
		};
	}
	function sc_startScroll(s, c) {
		for (var a = 0, l = s.anims.length; a < l; a++)
		{
			var b = s.anims[a];
			if (!b)
			{
				continue;
			}
			b[0][c.transition](b[1], s.duration, s.easing, b[2]);
		}
	}
	function sc_stopScroll(s, finish) {
		if (!is_boolean(finish))
		{
			finish = true;
		}
		if (is_object(s.pre))
		{
			sc_stopScroll(s.pre, finish);
		}
		for (var a = 0, l = s.anims.length; a < l; a++)
		{
			var b = s.anims[a];
			b[0].stop(true);
			if (finish)
			{
				b[0].css(b[1]);
				if (is_function(b[2]))
				{
					b[2]();
				}
			}
		}
		if (is_object(s.post))
		{
			sc_stopScroll(s.post, finish);
		}
	}
	function sc_afterScroll( $c, $c2, o ) {
		if ($c2)
		{
			$c2.remove();
		}

		switch(o.fx) {
			case 'fade':
			case 'crossfade':
			case 'cover-fade':
			case 'uncover-fade':
				$c.css('opacity', 1);
				$c.css('filter', '');
				break;
		}
	}
	function sc_fireCallbacks($t, o, b, a, c) {
		if (o[b])
		{
			o[b].call($t, a);
		}
		if (c[b].length)
		{
			for (var i = 0, l = c[b].length; i < l; i++)
			{
				c[b][i].call($t, a);
			}
		}
		return [];
	}
	function sc_fireQueue($c, q, c) {

		if (q.length)
		{
			$c.trigger(cf_e(q[0][0], c), q[0][1]);
			q.shift();
		}
		return q;
	}
	function sc_hideHiddenItems(hiddenitems) {
		hiddenitems.each(function() {
			var hi = $(this);
			hi.data('_cfs_isHidden', hi.is(':hidden')).hide();
		});
	}
	function sc_showHiddenItems(hiddenitems) {
		if (hiddenitems)
		{
			hiddenitems.each(function() {
				var hi = $(this);
				if (!hi.data('_cfs_isHidden'))
				{
					hi.show();
				}
			});
		}
	}
	function sc_clearTimers(t) {
		if (t.auto)
		{
			clearTimeout(t.auto);
		}
		if (t.progress)
		{
			clearInterval(t.progress);
		}
		return t;
	}
	function sc_mapCallbackArguments(i_old, i_skp, i_new, s_itm, s_dir, s_dur, w_siz) {
		return {
			'width': w_siz.width,
			'height': w_siz.height,
			'items': {
				'old': i_old,
				'skipped': i_skp,
				'visible': i_new
			},
			'scroll': {
				'items': s_itm,
				'direction': s_dir,
				'duration': s_dur
			}
		};
	}
	function sc_getDuration( sO, o, nI, siz ) {
		var dur = sO.duration;
		if (sO.fx == 'none')
		{
			return 0;
		}
		if (dur == 'auto')
		{
			dur = o.scroll.duration / o.scroll.items * nI;
		}
		else if (dur < 10)
		{
			dur = siz / dur;
		}
		if (dur < 1)
		{
			return 0;
		}
		if (sO.fx == 'fade')
		{
			dur = dur / 2;
		}
		return Math.round(dur);
	}

	//	navigation functions
	function nv_showNavi(o, t, c) {
		var minimum = (is_number(o.items.minimum)) ? o.items.minimum : o.items.visible + 1;
		if (t == 'show' || t == 'hide')
		{
			var f = t;
		}
		else if (minimum > t)
		{
			debug(c, 'Not enough items ('+t+' total, '+minimum+' needed): Hiding navigation.');
			var f = 'hide';
		}
		else
		{
			var f = 'show';
		}
		var s = (f == 'show') ? 'removeClass' : 'addClass',
			h = cf_c('hidden', c);

		if (o.auto.button)
		{
			o.auto.button[f]()[s](h);
		}
		if (o.prev.button)
		{
			o.prev.button[f]()[s](h);
		}
		if (o.next.button)
		{
			o.next.button[f]()[s](h);
		}
		if (o.pagination.container)
		{
			o.pagination.container[f]()[s](h);
		}
	}
	function nv_enableNavi(o, f, c) {
		if (o.circular || o.infinite) return;
		var fx = (f == 'removeClass' || f == 'addClass') ? f : false,
			di = cf_c('disabled', c);

		if (o.auto.button && fx)
		{
			o.auto.button[fx](di);
		}
		if (o.prev.button)
		{
			var fn = fx || (f == 0) ? 'addClass' : 'removeClass';
			o.prev.button[fn](di);
		}
		if (o.next.button)
		{
			var fn = fx || (f == o.items.visible) ? 'addClass' : 'removeClass';
			o.next.button[fn](di);
		}
	}

	//	get object functions
	function go_getObject($tt, obj) {
		if (is_function(obj))
		{
			obj = obj.call($tt);
		}
		else if (is_undefined(obj))
		{
			obj = {};
		}
		return obj;
	}
	function go_getItemsObject($tt, obj) {
		obj = go_getObject($tt, obj);
		if (is_number(obj))
		{
			obj	= {
				'visible': obj
			};
		}
		else if (obj == 'variable')
		{
			obj = {
				'visible': obj,
				'width': obj, 
				'height': obj
			};
		}
		else if (!is_object(obj))
		{
			obj = {};
		}
		return obj;
	}
	function go_getScrollObject($tt, obj) {
		obj = go_getObject($tt, obj);
		if (is_number(obj))
		{
			if (obj <= 50)
			{
				obj = {
					'items': obj
				};
			}
			else
			{
				obj = {
					'duration': obj
				};
			}
		}
		else if (is_string(obj))
		{
			obj = {
				'easing': obj
			};
		}
		else if (!is_object(obj))
		{
			obj = {};
		}
		return obj;
	}
	function go_getNaviObject($tt, obj) {
		obj = go_getObject($tt, obj);
		if (is_string(obj))
		{
			var temp = cf_getKeyCode(obj);
			if (temp == -1)
			{
				obj = $(obj);
			}
			else
			{
				obj = temp;
			}
		}
		return obj;
	}

	function go_getAutoObject($tt, obj) {
		obj = go_getNaviObject($tt, obj);
		if (is_jquery(obj))
		{
			obj = {
				'button': obj
			};
		}
		else if (is_boolean(obj))
		{
			obj = {
				'play': obj
			};
		}
		else if (is_number(obj))
		{
			obj = {
				'timeoutDuration': obj
			};
		}
		if (obj.progress)
		{
			if (is_string(obj.progress) || is_jquery(obj.progress))
			{
				obj.progress = {
					'bar': obj.progress
				};
			}
		}
		return obj;
	}
	function go_complementAutoObject($tt, obj) {
		if (is_function(obj.button))
		{
			obj.button = obj.button.call($tt);
		}
		if (is_string(obj.button))
		{
			obj.button = $(obj.button);
		}
		if (!is_boolean(obj.play))
		{
			obj.play = true;
		}
		if (!is_number(obj.delay))
		{
			obj.delay = 0;
		}
		if (is_undefined(obj.pauseOnEvent))
		{
			obj.pauseOnEvent = true;
		}
		if (!is_boolean(obj.pauseOnResize))
		{
			obj.pauseOnResize = true;
		}
		if (!is_number(obj.timeoutDuration))
		{
			obj.timeoutDuration = (obj.duration < 10)
				? 2500
				: obj.duration * 5;
		}
		if (obj.progress)
		{
			if (is_function(obj.progress.bar))
			{
				obj.progress.bar = obj.progress.bar.call($tt);
			}
			if (is_string(obj.progress.bar))
			{
				obj.progress.bar = $(obj.progress.bar);
			}
			if (obj.progress.bar)
			{
				if (!is_function(obj.progress.updater))
				{
					obj.progress.updater = $.fn.carouFredSel.progressbarUpdater;
				}
				if (!is_number(obj.progress.interval))
				{
					obj.progress.interval = 50;
				}
			}
			else
			{
				obj.progress = false;
			}
		}
		return obj;
	}

	function go_getPrevNextObject($tt, obj) {
		obj = go_getNaviObject($tt, obj);
		if (is_jquery(obj))
		{
			obj = {
				'button': obj
			};
		}
		else if (is_number(obj))
		{
			obj = {
				'key': obj
			};
		}
		return obj;
	}
	function go_complementPrevNextObject($tt, obj) {
		if (is_function(obj.button))
		{
			obj.button = obj.button.call($tt);
		}
		if (is_string(obj.button))
		{
			obj.button = $(obj.button);
		}
		if (is_string(obj.key))
		{
			obj.key = cf_getKeyCode(obj.key);
		}
		return obj;
	}

	function go_getPaginationObject($tt, obj) {
		obj = go_getNaviObject($tt, obj);
		if (is_jquery(obj))
		{
			obj = {
				'container': obj
			};
		}
		else if (is_boolean(obj))
		{
			obj = {
				'keys': obj
			};
		}
		return obj;
	}
	function go_complementPaginationObject($tt, obj) {
		if (is_function(obj.container))
		{
			obj.container = obj.container.call($tt);
		}
		if (is_string(obj.container))
		{
			obj.container = $(obj.container);
		}
		if (!is_number(obj.items))
		{
			obj.items = false;
		}
		if (!is_boolean(obj.keys))
		{
			obj.keys = false;
		}
		if (!is_function(obj.anchorBuilder) && !is_false(obj.anchorBuilder))
		{
			obj.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder;
		}
		if (!is_number(obj.deviation))
		{
			obj.deviation = 0;
		}
		return obj;
	}

	function go_getSwipeObject($tt, obj) {
		if (is_function(obj))
		{
			obj = obj.call($tt);
		}
		if (is_undefined(obj))
		{
			obj = {
				'onTouch': false
			};
		}
		if (is_true(obj))
		{
			obj = {
				'onTouch': obj
			};
		}
		else if (is_number(obj))
		{
			obj = {
				'items': obj
			};
		}
		return obj;
	}
	function go_complementSwipeObject($tt, obj) {
		if (!is_boolean(obj.onTouch))
		{
			obj.onTouch = true;
		}
		if (!is_boolean(obj.onMouse))
		{
			obj.onMouse = false;
		}
		if (!is_object(obj.options))
		{
			obj.options = {};
		}
		if (!is_boolean(obj.options.triggerOnTouchEnd))
		{
			obj.options.triggerOnTouchEnd = false;
		}
		return obj;
	}
	function go_getMousewheelObject($tt, obj) {
		if (is_function(obj))
		{
			obj = obj.call($tt);
		}
		if (is_true(obj))
		{
			obj = {};
		}
		else if (is_number(obj))
		{
			obj = {
				'items': obj
			};
		}
		else if (is_undefined(obj))
		{
			obj = false;
		}
		return obj;
	}
	function go_complementMousewheelObject($tt, obj) {
		return obj;
	}

	//	get number functions
	function gn_getItemIndex(num, dev, org, items, $cfs) {
		if (is_string(num))
		{
			num = $(num, $cfs);
		}

		if (is_object(num))
		{
			num = $(num, $cfs);
		}
		if (is_jquery(num))
		{
			num = $cfs.children().index(num);
			if (!is_boolean(org))
			{
				org = false;
			}
		}
		else
		{
			if (!is_boolean(org))
			{
				org = true;
			}
		}
		if (!is_number(num))
		{
			num = 0;
		}
		if (!is_number(dev))
		{
			dev = 0;
		}

		if (org)
		{
			num += items.first;
		}
		num += dev;
		if (items.total > 0)
		{
			while (num >= items.total)
			{
				num -= items.total;
			}
			while (num < 0)
			{
				num += items.total;
			}
		}
		return num;
	}

	//	items prev
	function gn_getVisibleItemsPrev(i, o, s) {
		var t = 0,
			x = 0;

		for (var a = s; a >= 0; a--)
		{
			var j = i.eq(a);
			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimension)
			{
				return x;
			}
			if (a == 0)
			{
				a = i.length;
			}
			x++;
		}
	}
	function gn_getVisibleItemsPrevFilter(i, o, s) {
		return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s);
	}
	function gn_getScrollItemsPrevFilter(i, o, s, m) {
		return gn_getItemsPrevFilter(i, o.items.filter, m, s);
	}
	function gn_getItemsPrevFilter(i, f, m, s) {
		var t = 0,
			x = 0;

		for (var a = s, l = i.length; a >= 0; a--)
		{
			x++;
			if (x == l)
			{
				return x;
			}

			var j = i.eq(a);
			if (j.is(f))
			{
				t++;
				if (t == m)
				{
					return x;
				}
			}
			if (a == 0)
			{
				a = l;
			}
		}
	}

	function gn_getVisibleOrg($c, o) {
		return o.items.visibleConf.org || $c.children().slice(0, o.items.visible).filter(o.items.filter).length;
	}

	//	items next
	function gn_getVisibleItemsNext(i, o, s) {
		var t = 0,
			x = 0;

		for (var a = s, l = i.length-1; a <= l; a++)
		{
			var j = i.eq(a);

			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimension)
			{
				return x;
			}

			x++;
			if (x == l+1)
			{
				return x;
			}
			if (a == l)
			{
				a = -1;
			}
		}
	}
	function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
		var v = gn_getVisibleItemsNext(i, o, s);
		if (!o.circular)
		{
			if (s + v > l)
			{
				v = l - s;
			}
		}
		return v;
	}
	function gn_getVisibleItemsNextFilter(i, o, s) {
		return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular);
	}
	function gn_getScrollItemsNextFilter(i, o, s, m) {
		return gn_getItemsNextFilter(i, o.items.filter, m+1, s, o.circular) - 1;
	}
	function gn_getItemsNextFilter(i, f, m, s, c) {
		var t = 0,
			x = 0;

		for (var a = s, l = i.length-1; a <= l; a++)
		{
			x++;
			if (x >= l)
			{
				return x;
			}

			var j = i.eq(a);
			if (j.is(f))
			{
				t++;
				if (t == m)
				{
					return x;
				}
			}
			if (a == l)
			{
				a = -1;
			}
		}
	}

	//	get items functions
	function gi_getCurrentItems(i, o) {
		return i.slice(0, o.items.visible);
	}
	function gi_getOldItemsPrev(i, o, n) {
		return i.slice(n, o.items.visibleConf.old+n);
	}
	function gi_getNewItemsPrev(i, o) {
		return i.slice(0, o.items.visible);
	}
	function gi_getOldItemsNext(i, o) {
		return i.slice(0, o.items.visibleConf.old);
	}
	function gi_getNewItemsNext(i, o, n) {
		return i.slice(n, o.items.visible+n);
	}

	//	sizes functions
	function sz_storeMargin(i, o, d) {
		if (o.usePadding)
		{
			if (!is_string(d))
			{
				d = '_cfs_origCssMargin';
			}
			i.each(function() {
				var j = $(this),
					m = parseInt(j.css(o.d['marginRight']), 10);
				if (!is_number(m)) 
				{
					m = 0;
				}
				j.data(d, m);
			});
		}
	}
	function sz_resetMargin(i, o, m) {
		if (o.usePadding)
		{
			var x = (is_boolean(m)) ? m : false;
			if (!is_number(m))
			{
				m = 0;
			}
			sz_storeMargin(i, o, '_cfs_tempCssMargin');
			i.each(function() {
				var j = $(this);
				j.css(o.d['marginRight'], ((x) ? j.data('_cfs_tempCssMargin') : m + j.data('_cfs_origCssMargin')));
			});
		}
	}
	function sz_storeOrigCss(i) {
		i.each(function() {
			var j = $(this);
			j.data('_cfs_origCss', j.attr('style') || '');
		});
	}
	function sz_restoreOrigCss(i) {
		i.each(function() {
			var j = $(this);
			j.attr('style', j.data('_cfs_origCss') || '');
		});
	}
	function sz_setResponsiveSizes(o, all) {
		var visb = o.items.visible,
			newS = o.items[o.d['width']],
			seco = o[o.d['height']],
			secp = is_percentage(seco);

		all.each(function() {
			var $t = $(this),
				nw = newS - ms_getPaddingBorderMargin($t, o, 'Width');

			$t[o.d['width']](nw);
			if (secp)
			{
				$t[o.d['height']](ms_getPercentage(nw, seco));
			}
		});
	}
	function sz_setSizes($c, o) {
		var $w = $c.parent(),
			$i = $c.children(),
			$v = gi_getCurrentItems($i, o),
			sz = cf_mapWrapperSizes(ms_getSizes($v, o, true), o, false);

		$w.css(sz);

		if (o.usePadding)
		{
			var p = o.padding,
				r = p[o.d[1]];

			if (o.align && r < 0)
			{
				r = 0;
			}
			var $l = $v.last();
			$l.css(o.d['marginRight'], $l.data('_cfs_origCssMargin') + r);
			$c.css(o.d['top'], p[o.d[0]]);
			$c.css(o.d['left'], p[o.d[3]]);
		}

		$c.css(o.d['width'], sz[o.d['width']]+(ms_getTotalSize($i, o, 'width')*2));
		$c.css(o.d['height'], ms_getLargestSize($i, o, 'height'));
		return sz;
	}

	//	measuring functions
	function ms_getSizes(i, o, wrapper) {
		return [ms_getTotalSize(i, o, 'width', wrapper), ms_getLargestSize(i, o, 'height', wrapper)];
	}
	function ms_getLargestSize(i, o, dim, wrapper) {
		if (!is_boolean(wrapper))
		{
			wrapper = false;
		}
		if (is_number(o[o.d[dim]]) && wrapper)
		{
			return o[o.d[dim]];
		}
		if (is_number(o.items[o.d[dim]]))
		{
			return o.items[o.d[dim]];
		}
		dim = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight';
		return ms_getTrueLargestSize(i, o, dim);
	}
	function ms_getTrueLargestSize(i, o, dim) {
		var s = 0;

		for (var a = 0, l = i.length; a < l; a++)
		{
			var j = i.eq(a);

			var m = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
			if (s < m)
			{
				s = m;
			}
		}
		return s;
	}

	function ms_getTotalSize(i, o, dim, wrapper) {
		if (!is_boolean(wrapper))
		{
			wrapper = false;
		}
		if (is_number(o[o.d[dim]]) && wrapper)
		{
			return o[o.d[dim]];
		}
		if (is_number(o.items[o.d[dim]]))
		{
			return o.items[o.d[dim]] * i.length;
		}

		var d = (dim.toLowerCase().indexOf('width') > -1) ? 'outerWidth' : 'outerHeight',
			s = 0;

		for (var a = 0, l = i.length; a < l; a++)
		{
			var j = i.eq(a);
			s += (j.is(':visible')) ? j[o.d[d]](true) : 0;
		}
		return s;
	}
	function ms_getParentSize($w, o, d) {
		var isVisible = $w.is(':visible');
		if (isVisible)
		{
			$w.hide();
		}
		var s = $w.parent()[o.d[d]]();
		if (isVisible)
		{
			$w.show();
		}
		return s;
	}
	function ms_getMaxDimension(o, a) {
		return (is_number(o[o.d['width']])) ? o[o.d['width']] : a;
	}
	function ms_hasVariableSizes(i, o, dim) {
		var s = false,
			v = false;

		for (var a = 0, l = i.length; a < l; a++)
		{
			var j = i.eq(a);

			var c = (j.is(':visible')) ? j[o.d[dim]](true) : 0;
			if (s === false)
			{
				s = c;
			}
			else if (s != c)
			{
				v = true;
			}
			if (s == 0)
			{
				v = true;
			}
		}
		return v;
	}
	function ms_getPaddingBorderMargin(i, o, d) {
		return i[o.d['outer'+d]](true) - i[o.d[d.toLowerCase()]]();
	}
	function ms_getPercentage(s, o) {
		if (is_percentage(o))
		{
			o = parseInt( o.slice(0, -1), 10 );
			if (!is_number(o))
			{
				return s;
			}
			s *= o/100;
		}
		return s;
	}

	//	config functions
	function cf_e(n, c, pf, ns, rd) {
		if (!is_boolean(pf))
		{
			pf = true;
		}
		if (!is_boolean(ns))
		{
			ns = true;
		}
		if (!is_boolean(rd))
		{
			rd = false;
		}

		if (pf)
		{
			n = c.events.prefix + n;
		}
		if (ns)
		{
			n = n +'.'+ c.events.namespace;
		}
		if (ns && rd)
		{
			n += c.serialNumber;
		}

		return n;
	}
	function cf_c(n, c) {
		return (is_string(c.classnames[n])) ? c.classnames[n] : n;
	}
	function cf_mapWrapperSizes(ws, o, p) {
		if (!is_boolean(p))
		{
			p = true;
		}
		var pad = (o.usePadding && p) ? o.padding : [0, 0, 0, 0];
		var wra = {};

		wra[o.d['width']] = ws[0] + pad[1] + pad[3];
		wra[o.d['height']] = ws[1] + pad[0] + pad[2];

		return wra;
	}
	function cf_sortParams(vals, typs) {
		var arr = [];
		for (var a = 0, l1 = vals.length; a < l1; a++)
		{
			for (var b = 0, l2 = typs.length; b < l2; b++)
			{
				if (typs[b].indexOf(typeof vals[a]) > -1 && is_undefined(arr[b]))
				{
					arr[b] = vals[a];
					break;
				}
			}
		}
		return arr;
	}
	function cf_getPadding(p) {
		if (is_undefined(p))
		{
			return [0, 0, 0, 0];
		}
		if (is_number(p))
		{
			return [p, p, p, p];
		}
		if (is_string(p))
		{
			p = p.split('px').join('').split('em').join('').split(' ');
		}

		if (!is_array(p))
		{
			return [0, 0, 0, 0];
		}
		for (var i = 0; i < 4; i++)
		{
			p[i] = parseInt(p[i], 10);
		}
		switch (p.length)
		{
			case 0:
				return [0, 0, 0, 0];
			case 1:
				return [p[0], p[0], p[0], p[0]];
			case 2:
				return [p[0], p[1], p[0], p[1]];
			case 3:
				return [p[0], p[1], p[2], p[1]];
			default:
				return [p[0], p[1], p[2], p[3]];
		}
	}
	function cf_getAlignPadding(itm, o) {
		var x = (is_number(o[o.d['width']])) ? Math.ceil(o[o.d['width']] - ms_getTotalSize(itm, o, 'width')) : 0;
		switch (o.align)
		{
			case 'left': 
				return [0, x];
			case 'right':
				return [x, 0];
			case 'center':
			default:
				return [Math.ceil(x/2), Math.floor(x/2)];
		}
	}
	function cf_getDimensions(o) {
		var dm = [
				['width'	, 'innerWidth'	, 'outerWidth'	, 'height'	, 'innerHeight'	, 'outerHeight'	, 'left', 'top'	, 'marginRight'	, 0, 1, 2, 3],
				['height'	, 'innerHeight'	, 'outerHeight'	, 'width'	, 'innerWidth'	, 'outerWidth'	, 'top'	, 'left', 'marginBottom', 3, 2, 1, 0]
			];

		var dl = dm[0].length,
			dx = (o.direction == 'right' || o.direction == 'left') ? 0 : 1;

		var dimensions = {};
		for (var d = 0; d < dl; d++)
		{
			dimensions[dm[0][d]] = dm[dx][d];
		}
		return dimensions;
	}
	function cf_getAdjust(x, o, a, $t) {
		var v = x;
		if (is_function(a))
		{
			v = a.call($t, v);

		}
		else if (is_string(a))
		{
			var p = a.split('+'),
				m = a.split('-');

			if (m.length > p.length)
			{
				var neg = true,
					sta = m[0],
					adj = m[1];
			}
			else
			{
				var neg = false,
					sta = p[0],
					adj = p[1];
			}

			switch(sta)
			{
				case 'even':
					v = (x % 2 == 1) ? x-1 : x;
					break;
				case 'odd':
					v = (x % 2 == 0) ? x-1 : x;
					break;
				default:
					v = x;
					break;
			}
			adj = parseInt(adj, 10);
			if (is_number(adj))
			{
				if (neg)
				{
					adj = -adj;
				}
				v += adj;
			}
		}
		if (!is_number(v) || v < 1)
		{
			v = 1;
		}
		return v;
	}
	function cf_getItemsAdjust(x, o, a, $t) {
		return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, $t), o.items.visibleConf);
	}
	function cf_getItemAdjustMinMax(v, i) {
		if (is_number(i.min) && v < i.min)
		{
			v = i.min;
		}
		if (is_number(i.max) && v > i.max)
		{
			v = i.max;
		}
		if (v < 1)
		{
			v = 1;
		}
		return v;
	}
	function cf_getSynchArr(s) {
		if (!is_array(s))
		{
			s = [[s]];
		}
		if (!is_array(s[0]))
		{
			s = [s];
		}
		for (var j = 0, l = s.length; j < l; j++)
		{
			if (is_string(s[j][0]))
			{
				s[j][0] = $(s[j][0]);
			}
			if (!is_boolean(s[j][1]))
			{
				s[j][1] = true;
			}
			if (!is_boolean(s[j][2]))
			{
				s[j][2] = true;
			}
			if (!is_number(s[j][3]))
			{
				s[j][3] = 0;
			}
		}
		return s;
	}
	function cf_getKeyCode(k) {
		if (k == 'right')
		{
			return 39;
		}
		if (k == 'left')
		{
			return 37;
		}
		if (k == 'up')
		{
			return 38;
		}
		if (k == 'down')
		{
			return 40;
		}
		return -1;
	}
	function cf_setCookie(n, $c, c) {
		if (n)
		{
			var v = $c.triggerHandler(cf_e('currentPosition', c));
			$.fn.carouFredSel.cookie.set(n, v);
		}
	}
	function cf_getCookie(n) {
		var c = $.fn.carouFredSel.cookie.get(n);
		return (c == '') ? 0 : c;
	}

	//	init function
	function in_mapCss($elem, props) {
		var css = {};
		for (var p = 0, l = props.length; p < l; p++)
		{
			css[props[p]] = $elem.css(props[p]);
		}
		return css;
	}
	function in_complementItems(obj, opt, itm, sta) {
		if (!is_object(obj.visibleConf))
		{
			obj.visibleConf = {};
		}
		if (!is_object(obj.sizesConf))
		{
			obj.sizesConf = {};
		}

		if (obj.start == 0 && is_number(sta))
		{
			obj.start = sta;
		}

		//	visible items
		if (is_object(obj.visible))
		{
			obj.visibleConf.min = obj.visible.min;
			obj.visibleConf.max = obj.visible.max;
			obj.visible = false;
		}
		else if (is_string(obj.visible))
		{
			//	variable visible items
			if (obj.visible == 'variable')
			{
				obj.visibleConf.variable = true;
			}
			//	adjust string visible items
			else
			{
				obj.visibleConf.adjust = obj.visible;
			}
			obj.visible = false;
		}
		else if (is_function(obj.visible))
		{
			obj.visibleConf.adjust = obj.visible;
			obj.visible = false;
		}

		//	set items filter
		if (!is_string(obj.filter))
		{
			obj.filter = (itm.filter(':hidden').length > 0) ? ':visible' : '*';
		}

		//	primary item-size not set
		if (!obj[opt.d['width']])
		{
			//	responsive carousel -> set to largest
			if (opt.responsive)
			{
				debug(true, 'Set a '+opt.d['width']+' for the items!');
				obj[opt.d['width']] = ms_getTrueLargestSize(itm, opt, 'outerWidth');
			}
			//	 non-responsive -> measure it or set to "variable"
			else
			{
				obj[opt.d['width']] = (ms_hasVariableSizes(itm, opt, 'outerWidth')) 
					? 'variable' 
					: itm[opt.d['outerWidth']](true);
			}
		}

		//	secondary item-size not set -> measure it or set to "variable"
		if (!obj[opt.d['height']])
		{
			obj[opt.d['height']] = (ms_hasVariableSizes(itm, opt, 'outerHeight')) 
				? 'variable' 
				: itm[opt.d['outerHeight']](true);
		}

		obj.sizesConf.width = obj.width;
		obj.sizesConf.height = obj.height;
		return obj;
	}
	function in_complementVisibleItems(opt, avl) {
		//	primary item-size variable -> set visible items variable
		if (opt.items[opt.d['width']] == 'variable')
		{
			opt.items.visibleConf.variable = true;
		}
		if (!opt.items.visibleConf.variable) {
			//	primary size is number -> calculate visible-items
			if (is_number(opt[opt.d['width']]))
			{
				opt.items.visible = Math.floor(opt[opt.d['width']] / opt.items[opt.d['width']]);
			}
			//	measure and calculate primary size and visible-items
			else
			{
				opt.items.visible = Math.floor(avl / opt.items[opt.d['width']]);
				opt[opt.d['width']] = opt.items.visible * opt.items[opt.d['width']];
				if (!opt.items.visibleConf.adjust)
				{
					opt.align = false;
				}
			}
			if (opt.items.visible == 'Infinity' || opt.items.visible < 1)
			{
				debug(true, 'Not a valid number of visible items: Set to "variable".');
				opt.items.visibleConf.variable = true;
			}
		}
		return opt;
	}
	function in_complementPrimarySize(obj, opt, all) {
		//	primary size set to auto -> measure largest item-size and set it
		if (obj == 'auto')
		{
			obj = ms_getTrueLargestSize(all, opt, 'outerWidth');
		}
		return obj;
	}
	function in_complementSecondarySize(obj, opt, all) {
		//	secondary size set to auto -> measure largest item-size and set it
		if (obj == 'auto')
		{
			obj = ms_getTrueLargestSize(all, opt, 'outerHeight');
		}
		//	secondary size not set -> set to secondary item-size
		if (!obj)
		{
			obj = opt.items[opt.d['height']];
		}
		return obj;
	}
	function in_getAlignPadding(o, all) {
		var p = cf_getAlignPadding(gi_getCurrentItems(all, o), o);
		o.padding[o.d[1]] = p[1];
		o.padding[o.d[3]] = p[0];
		return o;
	}
	function in_getResponsiveValues(o, all, avl) {

		var visb = cf_getItemAdjustMinMax(Math.ceil(o[o.d['width']] / o.items[o.d['width']]), o.items.visibleConf);
		if (visb > all.length)
		{
			visb = all.length;
		}

		var newS = Math.floor(o[o.d['width']]/visb);

		o.items.visible = visb;
		o.items[o.d['width']] = newS;
		o[o.d['width']] = visb * newS;
		return o;
	}


	//	buttons functions
	function bt_pauseOnHoverConfig(p) {
		if (is_string(p))
		{
			var i = (p.indexOf('immediate') > -1) ? true : false,
				r = (p.indexOf('resume') 	> -1) ? true : false;
		}
		else
		{
			var i = r = false;
		}
		return [i, r];
	}
	function bt_mousesheelNumber(mw) {
		return (is_number(mw)) ? mw : null
	}

	//	helper functions
	function is_null(a) {
		return (a === null);
	}
	function is_undefined(a) {
		return (is_null(a) || typeof a == 'undefined' || a === '' || a === 'undefined');
	}
	function is_array(a) {
		return (a instanceof Array);
	}
	function is_jquery(a) {
		return (a instanceof jQuery);
	}
	function is_object(a) {
		return ((a instanceof Object || typeof a == 'object') && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a));
	}
	function is_number(a) {
		return ((a instanceof Number || typeof a == 'number') && !isNaN(a));
	}
	function is_string(a) {
		return ((a instanceof String || typeof a == 'string') && !is_undefined(a) && !is_true(a) && !is_false(a));
	}
	function is_function(a) {
		return (a instanceof Function || typeof a == 'function');
	}
	function is_boolean(a) {
		return (a instanceof Boolean || typeof a == 'boolean' || is_true(a) || is_false(a));
	}
	function is_true(a) {
		return (a === true || a === 'true');
	}
	function is_false(a) {
		return (a === false || a === 'false');
	}
	function is_percentage(x) {
		return (is_string(x) && x.slice(-1) == '%');
	}


	function getTime() {
		return new Date().getTime();
	}

	function deprecated( o, n ) {
		debug(true, o+' is DEPRECATED, support for it will be removed. Use '+n+' instead.');
	}
	function debug(d, m) {
		if (!is_undefined(window.console) && !is_undefined(window.console.log))
		{
			if (is_object(d))
			{
				var s = ' ('+d.selector+')';
				d = d.debug;
			}
			else
			{
				var s = '';
			}
			if (!d)
			{
				return false;
			}
	
			if (is_string(m))
			{
				m = 'carouFredSel'+s+': ' + m;
			}
			else
			{
				m = ['carouFredSel'+s+':', m];
			}
			window.console.log(m);
		}
		return false;
	}



	//	EASING FUNCTIONS
	$.extend($.easing, {
		'quadratic': function(t) {
			var t2 = t * t;
			return t * (-t2 * t + 4 * t2 - 6 * t + 4);
		},
		'cubic': function(t) {
			return t * (4 * t * t - 9 * t + 6);
		},
		'elastic': function(t) {
			var t2 = t * t;
			return t * (33 * t2 * t2 - 106 * t2 * t + 126 * t2 - 67 * t + 15);
		}
	});


})(jQuery);
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var p="left",o="right",e="up",x="down",c="in",z="out",m="none",s="auto",l="swipe",t="pinch",A="tap",j="doubletap",b="longtap",y="hold",D="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,B="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};f.fn.swipe=function(G){var F=f(this),E=F.data(B);if(E&&typeof G==="string"){if(E[G]){return E[G].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+G+" does not exist on jQuery.swipe")}}else{if(!E&&(typeof G==="object"||!G)){return w.apply(this,arguments)}}return F};f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:z};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:D,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(E){if(E&&(E.allowPageScroll===undefined&&(E.swipe!==undefined||E.swipeStatus!==undefined))){E.allowPageScroll=m}if(E.click!==undefined&&E.tap===undefined){E.tap=E.click}if(!E){E={}}E=f.extend({},f.fn.swipe.defaults,E);return this.each(function(){var G=f(this);var F=G.data(B);if(!F){F=new C(this,E);G.data(B,F)}})}function C(a4,av){var az=(a||d||!av.fallbackToMouseEvents),J=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ay=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",U=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",S=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ab=0,a1=0,aZ=0,G=1,aq=0,aJ=0,M=null;var aR=f(a4);var Z="start";var W=0;var aQ=null;var T=0,a2=0,a5=0,ad=0,N=0;var aW=null,af=null;try{aR.bind(J,aN);aR.bind(aD,a9)}catch(ak){f.error("events not supported "+J+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(J,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(B,null);return aR};this.option=function(bc,bb){if(av[bc]!==undefined){if(bb===undefined){return av[bc]}else{av[bc]=bb}}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(av.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bb=a?be.touches[0]:be;Z=g;if(a){W=be.touches.length}else{bd.preventDefault()}ag=0;aP=null;aJ=null;ab=0;a1=0;aZ=0;G=1;aq=0;aQ=aj();M=aa();R();if(!a||(W===av.fingers||av.fingers===i)||aX()){ai(0,bb);T=at();if(W==2){ai(1,be.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}if(av.swipeStatus||av.pinchStatus){bc=O(be,Z)}}else{bc=false}if(bc===false){Z=q;O(be,Z);return bc}else{if(av.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(av.hold){bc=av.hold.call(aR,be,be.target)}},this),av.longTapThreshold)}ao(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(Z===h||Z===q||am()){return}var bd,bc=a?bh.touches[0]:bh;var bf=aH(bc);a2=at();if(a){W=bh.touches.length}if(av.hold){clearTimeout(af)}Z=k;if(W==2){if(a1==0){ai(1,bh.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}else{aH(bh.touches[1]);aZ=au(aQ[0].end,aQ[1].end);aJ=ar(aQ[0].end,aQ[1].end)}G=a7(a1,aZ);aq=Math.abs(a1-aZ)}if((W===av.fingers||av.fingers===i)||!a||aX()){aP=aL(bf.start,bf.end);al(be,aP);ag=aS(bf.start,bf.end);ab=aM();aI(aP,ag);if(av.swipeStatus||av.pinchStatus){bd=O(bh,Z)}if(!av.triggerOnTouchEnd||av.triggerOnTouchLeave){var bb=true;if(av.triggerOnTouchLeave){var bg=aY(this);bb=E(bf.end,bg)}if(!av.triggerOnTouchEnd&&bb){Z=aC(k)}else{if(av.triggerOnTouchLeave&&!bb){Z=aC(h)}}if(Z==q||Z==h){O(bh,Z)}}}else{Z=q;O(bh,Z)}if(bd===false){Z=q;O(bh,Z)}}function L(bb){var bc=bb.originalEvent;if(a){if(bc.touches.length>0){F();return true}}if(am()){W=ad}a2=at();ab=aM();if(ba()||!an()){Z=q;O(bc,Z)}else{if(av.triggerOnTouchEnd||(av.triggerOnTouchEnd==false&&Z===k)){bb.preventDefault();Z=h;O(bc,Z)}else{if(!av.triggerOnTouchEnd&&a6()){Z=h;aF(bc,Z,A)}else{if(Z===k){Z=q;O(bc,Z)}}}}ao(false);return null}function a9(){W=0;a2=0;T=0;a1=0;aZ=0;G=1;R();ao(false)}function K(bb){var bc=bb.originalEvent;if(av.triggerOnTouchLeave){Z=aC(h);O(bc,Z)}}function aK(){aR.unbind(J,aN);aR.unbind(aD,a9);aR.unbind(ay,a3);aR.unbind(U,L);if(S){aR.unbind(S,K)}ao(false)}function aC(bf){var be=bf;var bd=aA();var bc=an();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!av.triggerOnTouchEnd||av.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&av.triggerOnTouchLeave){be=q}}}return be}function O(bd,bb){var bc=undefined;if(I()||V()){bc=aF(bd,bb,l)}else{if((P()||aX())&&bc!==false){bc=aF(bd,bb,t)}}if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ap()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,A)}}}if(bb===q){a9(bd)}if(bb===h){if(a){if(bd.touches.length==0){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc=undefined;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ab||0,W,aQ]);if(av.swipeStatus){bc=av.swipeStatus.call(aR,be,bb,aP||null,ag||0,ab||0,W,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ab,W,aQ]);if(av.swipe){bc=av.swipe.call(aR,be,aP,ag,ab,W,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ab,W,aQ]);if(av.swipeLeft){bc=av.swipeLeft.call(aR,be,aP,ag,ab,W,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ab,W,aQ]);if(av.swipeRight){bc=av.swipeRight.call(aR,be,aP,ag,ab,W,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ab,W,aQ]);if(av.swipeUp){bc=av.swipeUp.call(aR,be,aP,ag,ab,W,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ab,W,aQ]);if(av.swipeDown){bc=av.swipeDown.call(aR,be,aP,ag,ab,W,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchStatus){bc=av.pinchStatus.call(aR,be,bb,aJ||null,aq||0,ab||0,W,G,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchIn){bc=av.pinchIn.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break;case z:aR.trigger("pinchOut",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchOut){bc=av.pinchOut.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break}}}if(bd==A){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Y()&&!H()){N=at();aW=setTimeout(f.proxy(function(){N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}},this),av.doubleTapThreshold)}else{N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("doubletap",[be.target]);if(av.doubleTap){bc=av.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("longtap",[be.target]);if(av.longTap){bc=av.longTap.call(aR,be,be.target)}}}}}return bc}function an(){var bb=true;if(av.threshold!==null){bb=ag>=av.threshold}return bb}function ba(){var bb=false;if(av.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=av.cancelThreshold}return bb}function ae(){if(av.pinchThreshold!==null){return aq>=av.pinchThreshold}return true}function aA(){var bb;if(av.maxTimeThreshold){if(ab>=av.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function al(bb,bc){if(av.allowPageScroll===m||aX()){bb.preventDefault()}else{var bd=av.allowPageScroll===s;switch(bc){case p:if((av.swipeLeft&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case o:if((av.swipeRight&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case e:if((av.swipeUp&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((av.swipeDown&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=X();var bd=ae();return bc&&bb&&bd}function aX(){return !!(av.pinchStatus||av.pinchIn||av.pinchOut)}function P(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=an();var bd=aO();var bb=X();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function V(){return !!(av.swipe||av.swipeStatus||av.swipeLeft||av.swipeRight||av.swipeUp||av.swipeDown)}function I(){return !!(aV()&&V())}function aO(){return((W===av.fingers||av.fingers===i)||!a)}function X(){return aQ[0].end.x!==0}function a6(){return !!(av.tap)}function Y(){return !!(av.doubleTap)}function aU(){return !!(av.longTap)}function Q(){if(N==null){return false}var bb=at();return(Y()&&((bb-N)<=av.doubleTapThreshold))}function H(){return Q()}function ax(){return((W===1||!a)&&(isNaN(ag)||ag<av.threshold))}function a0(){return((ab>av.longTapThreshold)&&(ag<r))}function ah(){return !!(ax()&&a6())}function aG(){return !!(Q()&&Y())}function ap(){return !!(a0()&&aU())}function F(){a5=at();ad=event.touches.length+1}function R(){a5=0;ad=0}function am(){var bb=false;if(a5){var bc=at()-a5;if(bc<=av.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(B+"_intouch")===true)}function ao(bb){if(bb===true){aR.bind(ay,a3);aR.bind(U,L);if(S){aR.bind(S,K)}}else{aR.unbind(ay,a3,false);aR.unbind(U,L,false);if(S){aR.unbind(S,K,false)}}aR.data(B+"_intouch",bb===true)}function ai(bc,bb){var bd=bb.identifier!==undefined?bb.identifier:0;aQ[bc].identifier=bd;aQ[bc].start.x=aQ[bc].end.x=bb.pageX||bb.clientX;aQ[bc].start.y=aQ[bc].end.y=bb.pageY||bb.clientY;return aQ[bc]}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ac(bd);bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ac(bc){for(var bb=0;bb<aQ.length;bb++){if(aQ[bb].identifier==bc){return aQ[bb]}}}function aj(){var bb=[];for(var bc=0;bc<=5;bc++){bb.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bb}function aI(bb,bc){bc=Math.max(bc,aT(bb));M[bb].distance=bc}function aT(bb){if(M[bb]){return M[bb].distance}return undefined}function aa(){var bb={};bb[p]=aw(p);bb[o]=aw(o);bb[e]=aw(e);bb[x]=aw(x);return bb}function aw(bb){return{direction:bb,distance:0}}function aM(){return a2-T}function au(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function ar(){if(G<1){return z}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function at(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function E(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
(function(t,e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else if(typeof exports==="object"){module.exports=e(require("jquery"))}else{e(t.jQuery)}})(this,function(t){t.transit={version:"0.9.12",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var e=document.createElement("div");var n={};function i(t){if(t in e.style)return t;var n=["Moz","Webkit","O","ms"];var i=t.charAt(0).toUpperCase()+t.substr(1);for(var r=0;r<n.length;++r){var s=n[r]+i;if(s in e.style){return s}}}function r(){e.style[n.transform]="";e.style[n.transform]="rotateY(90deg)";return e.style[n.transform]!==""}var s=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;n.transition=i("transition");n.transitionDelay=i("transitionDelay");n.transform=i("transform");n.transformOrigin=i("transformOrigin");n.filter=i("Filter");n.transform3d=r();var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var o=n.transitionEnd=a[n.transition]||null;for(var u in n){if(n.hasOwnProperty(u)&&typeof t.support[u]==="undefined"){t.support[u]=n[u]}}e=null;t.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeInCubic:"cubic-bezier(.550,.055,.675,.190)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};t.cssHooks["transit:transform"]={get:function(e){return t(e).data("transform")||new f},set:function(e,i){var r=i;if(!(r instanceof f)){r=new f(r)}if(n.transform==="WebkitTransform"&&!s){e.style[n.transform]=r.toString(true)}else{e.style[n.transform]=r.toString()}t(e).data("transform",r)}};t.cssHooks.transform={set:t.cssHooks["transit:transform"].set};t.cssHooks.filter={get:function(t){return t.style[n.filter]},set:function(t,e){t.style[n.filter]=e}};if(t.fn.jquery<"1.8"){t.cssHooks.transformOrigin={get:function(t){return t.style[n.transformOrigin]},set:function(t,e){t.style[n.transformOrigin]=e}};t.cssHooks.transition={get:function(t){return t.style[n.transition]},set:function(t,e){t.style[n.transition]=e}}}p("scale");p("scaleX");p("scaleY");p("translate");p("rotate");p("rotateX");p("rotateY");p("rotate3d");p("perspective");p("skewX");p("skewY");p("x",true);p("y",true);function f(t){if(typeof t==="string"){this.parse(t)}return this}f.prototype={setFromString:function(t,e){var n=typeof e==="string"?e.split(","):e.constructor===Array?e:[e];n.unshift(t);f.prototype.set.apply(this,n)},set:function(t){var e=Array.prototype.slice.apply(arguments,[1]);if(this.setter[t]){this.setter[t].apply(this,e)}else{this[t]=e.join(",")}},get:function(t){if(this.getter[t]){return this.getter[t].apply(this)}else{return this[t]||0}},setter:{rotate:function(t){this.rotate=b(t,"deg")},rotateX:function(t){this.rotateX=b(t,"deg")},rotateY:function(t){this.rotateY=b(t,"deg")},scale:function(t,e){if(e===undefined){e=t}this.scale=t+","+e},skewX:function(t){this.skewX=b(t,"deg")},skewY:function(t){this.skewY=b(t,"deg")},perspective:function(t){this.perspective=b(t,"px")},x:function(t){this.set("translate",t,null)},y:function(t){this.set("translate",null,t)},translate:function(t,e){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(t!==null&&t!==undefined){this._translateX=b(t,"px")}if(e!==null&&e!==undefined){this._translateY=b(e,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var t=(this.scale||"1,1").split(",");if(t[0]){t[0]=parseFloat(t[0])}if(t[1]){t[1]=parseFloat(t[1])}return t[0]===t[1]?t[0]:t},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var e=0;e<=3;++e){if(t[e]){t[e]=parseFloat(t[e])}}if(t[3]){t[3]=b(t[3],"deg")}return t}},parse:function(t){var e=this;t.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,n,i){e.setFromString(n,i)})},toString:function(t){var e=[];for(var i in this){if(this.hasOwnProperty(i)){if(!n.transform3d&&(i==="rotateX"||i==="rotateY"||i==="perspective"||i==="transformOrigin")){continue}if(i[0]!=="_"){if(t&&i==="scale"){e.push(i+"3d("+this[i]+",1)")}else if(t&&i==="translate"){e.push(i+"3d("+this[i]+",0)")}else{e.push(i+"("+this[i]+")")}}}}return e.join(" ")}};function c(t,e,n){if(e===true){t.queue(n)}else if(e){t.queue(e,n)}else{t.each(function(){n.call(this)})}}function l(e){var i=[];t.each(e,function(e){e=t.camelCase(e);e=t.transit.propertyMap[e]||t.cssProps[e]||e;e=h(e);if(n[e])e=h(n[e]);if(t.inArray(e,i)===-1){i.push(e)}});return i}function d(e,n,i,r){var s=l(e);if(t.cssEase[i]){i=t.cssEase[i]}var a=""+y(n)+" "+i;if(parseInt(r,10)>0){a+=" "+y(r)}var o=[];t.each(s,function(t,e){o.push(e+" "+a)});return o.join(", ")}t.fn.transition=t.fn.transit=function(e,i,r,s){var a=this;var u=0;var f=true;var l=t.extend(true,{},e);if(typeof i==="function"){s=i;i=undefined}if(typeof i==="object"){r=i.easing;u=i.delay||0;f=typeof i.queue==="undefined"?true:i.queue;s=i.complete;i=i.duration}if(typeof r==="function"){s=r;r=undefined}if(typeof l.easing!=="undefined"){r=l.easing;delete l.easing}if(typeof l.duration!=="undefined"){i=l.duration;delete l.duration}if(typeof l.complete!=="undefined"){s=l.complete;delete l.complete}if(typeof l.queue!=="undefined"){f=l.queue;delete l.queue}if(typeof l.delay!=="undefined"){u=l.delay;delete l.delay}if(typeof i==="undefined"){i=t.fx.speeds._default}if(typeof r==="undefined"){r=t.cssEase._default}i=y(i);var p=d(l,i,r,u);var h=t.transit.enabled&&n.transition;var b=h?parseInt(i,10)+parseInt(u,10):0;if(b===0){var g=function(t){a.css(l);if(s){s.apply(a)}if(t){t()}};c(a,f,g);return a}var m={};var v=function(e){var i=false;var r=function(){if(i){a.unbind(o,r)}if(b>0){a.each(function(){this.style[n.transition]=m[this]||null})}if(typeof s==="function"){s.apply(a)}if(typeof e==="function"){e()}};if(b>0&&o&&t.transit.useTransitionEnd){i=true;a.bind(o,r)}else{window.setTimeout(r,b)}a.each(function(){if(b>0){this.style[n.transition]=p}t(this).css(l)})};var z=function(t){this.offsetWidth;v(t)};c(a,f,z);return this};function p(e,i){if(!i){t.cssNumber[e]=true}t.transit.propertyMap[e]=n.transform;t.cssHooks[e]={get:function(n){var i=t(n).css("transit:transform");return i.get(e)},set:function(n,i){var r=t(n).css("transit:transform");r.setFromString(e,i);t(n).css({"transit:transform":r})}}}function h(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function b(t,e){if(typeof t==="string"&&!t.match(/^[\-0-9\.]+$/)){return t}else{return""+t+e}}function y(e){var n=e;if(typeof n==="string"&&!n.match(/^[\-0-9\.]+/)){n=t.fx.speeds[n]||t.fx.speeds._default}return b(n,"ms")}t.transit.getTransitionValue=d;return t});
(function($){
	"use strict";
	var defaults = {
		type: "",
		appendTo: "",
		listContainer: "",
		listItems: 4,
		contentContainer: "",
		duration: 500
	};

	var methods =
	{
		init : function(options){
			return this.each(function(){
				options = $.extend(defaults, options);
				var self = $(this);
				var expando = self.get(0)[jQuery.expando];
				self.attr("id", "slider_" + expando);
				
				//slider controls
				var sliderControl = $("<ul class='slider_navigation' id='slider_navigation_" + expando + "'>");
				sliderControl.append($("<li class='slider_control'><a class='left_" + expando + "' href='#' title='prev'></a></li>"));
				sliderControl.append($("<li class='slider_control'><a class='right_" + expando + "' href='#' title='next'></a></li>"));
				//sliderControl.append("<li class='slider_bar' style='width:" + (100/self.children().length) + "%;'></li>");
				
				if(options.listContainer!="" && options.listContainer.length)
				{
					//slider posts list
					var sliderPostsList = $("<ul class='slider_posts_list clearfix' id='slider_posts_list_" + expando + "'>");
					
					var lastSlide;
					self.children(".slide").each(function(index){
						$(this).attr("id", "slide_" + expando + "_" + index);
						if(index==0 && options.type!="small")
							lastSlide = $("<li id='slider_posts_list_post_" + expando + "_" + index + "' style='width:" + (100/self.children().length) + "%;'><span class='date'>" + ($("#slide_" + expando + "_" + index + " .date").length ? $("#slide_" + expando + "_" + index + " .date").html() : '') + "</span><h5>" + $($("#slide_" + expando + "_" + index + " h2").html()).text() + "</h5></li>");
						else
							sliderPostsList.append($("<li id='slider_posts_list_post_" + expando + "_" + index + "' style='width:" + (100/self.children().length) + "%;'><span class='date'>" + ($("#slide_" + expando + "_" + index + " .date").length ? $("#slide_" + expando + "_" + index + " .date").html() : '') + "</span><h5>" + $($("#slide_" + expando + "_" + index + " h2").html()).text() + "</h5></li>"));
					});
					sliderPostsList.append(lastSlide);
					
					if(options.listContainer!="")
						options.listContainer.prepend(sliderPostsList);
						
					sliderPostsList.carouFredSel({
						responsive: true,
						items: {
							visible: options.listItems
						},
						scroll: {
							items: 1,
							easing: "easeInOutQuint",
							duration: 750
						},
						auto: {
							play: false
						}
					});
					if(sliderPostsList.children().length>options.listItems)
					{
						sliderPostsList.parent().before("<a class='slider_control left slider_control_" + expando + "' href='#' title='prev'></a>");
						sliderPostsList.parent().after("<a class='slider_control right slider_control_" + expando + "' href='#' title='next'></a>");
						$("#slider_posts_list_" + expando).parent().parent().hover(function(){
							//$(".slider_control_" + expando).css("display", "block");
							$(".slider_posts_list_container .left.slider_control_" + expando).removeClass("slideRightBack").addClass("slideRight");
							$(".slider_posts_list_container .right.slider_control_" + expando).removeClass("slideLeftBack").addClass("slideLeft");
						},
						function(){
							//$(".slider_control_" + expando).css("display", "none");
							$(".left.slider_control_" + expando).removeClass("slideRight").addClass("slideRightBack");
							$(".right.slider_control_" + expando).removeClass("slideLeft").addClass("slideLeftBack");
						});
						$(".slider_posts_list_container .left.slider_control_" + expando).click(function(event){
							event.preventDefault();
							sliderPostsList.trigger("prevPage");
							var index = $("#slider_posts_list_" + expando + " li").index($("#slider_posts_list_" + expando + " .current"));
							if(index==options.listItems)
								$(".left_" + expando + ":first").trigger("click");
						});
						$(".slider_posts_list_container .right.slider_control_" + expando).click(function(event){
							event.preventDefault();
							sliderPostsList.trigger("nextPage");
							var index = $("#slider_posts_list_" + expando + " li").index($("#slider_posts_list_" + expando + " .current"));
							if(index==0)
								$(".right_" + expando + ":first").trigger("click");
						});
					}
				}
				else
				{
					self.children(".slide").each(function(index){
						$(this).attr("id", "slide_" + expando + "_" + index);
					});
				}
				if(options.appendTo=="")
					self.after(sliderControl);
				else
					$("#slider_" + expando).find(options.appendTo).append(sliderControl);
				
				if(options.listContainer!="" && options.listContainer.length)
				{
					$("#slider_posts_list_post_" + expando + "_" + (options.type=="small" ? "0" : "1")).append("<div class='slider_posts_list_progress_block' id='slider_posts_list_progress_block_" + expando + "'></div><div class='slider_posts_list_bar' id='slider_posts_list_bar_" + expando + "'></div>").addClass("current");
					self.sliderControl("barAnimation", expando);
					
					$("#slider_" + expando + ", #slider_posts_list_" + expando + ", .slider_control_" + expando).hover(function(){
						$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).stop(true);
					},
					function(){
						self.sliderControl("barAnimation", expando);
					});
				}
				
				var currentSlide = $("#slide_" + expando + "_0");
				var slideTo;
				$(".left_" + expando).click(function(event, param){
					event.preventDefault();
					self.trigger("isScrolling", function(isScrolling){
						if(!isScrolling)
						{
							if(currentSlide.prev().length)
								slideTo = currentSlide.prev()
							else
								slideTo = currentSlide.parent().children().last();
							self.sliderControl("slideTo", self, expando, slideTo, options, "left", param);
							if(parseInt(param)!=2)
								currentSlide = slideTo;
						}
					});
				});
				$(".right_" + expando).click(function(event, param){
					event.preventDefault();
					self.trigger("isScrolling", function(isScrolling){
						if(!isScrolling)
						{
							if(currentSlide.next().length)
								slideTo = currentSlide.next()
							else
								slideTo = currentSlide.parent().children().first();
							self.sliderControl("slideTo", self, expando, slideTo, options, "right", param);
							currentSlide = slideTo;
						}
					});
				});
				var base = "x";
				var scrollOptions = {
					scroll: {
						easing: "linear",
						duration: 200
					}
				};
				self.swipe({
					fallbackToMouseEvents: false,
					allowPageScroll: "vertical",
					excludedElements:"button, input, select, textarea, .noSwipe",
					/*swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData){
						$(".right_" + expando).trigger("click");
					},
					swipeRight: function(){
						$(".left_" + expando).trigger("click");
					},*/
					swipeStatus: function(event, phase, direction, distance, fingerCount, fingerData ) {
						if(!self.is(":animated"))
						{
							self.trigger("isScrolling", function(isScrolling){
								if(!isScrolling)
								{
									$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).stop(true);
									//If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
									if (phase == "move" && (direction == "left" || direction == "right")) 
									{
										if(base=="x")
										{
											self.trigger("configuration", scrollOptions);
											$("#slider_posts_list_" + expando).trigger("configuration", scrollOptions);
										}
										if (direction == "left") 
										{
											if(options.type=="small")
											{
												if(base=="x")
													base = 0;
												self.css("left", parseInt(base)-distance + "px");
											}
											else
											{
												if(base=="x")
												{
													base = self.offset().left;
												}
												self.css("left", parseInt(base)-distance + "px");
											}
										} 
										else if (direction == "right") 
										{	
											if(options.type=="small")
											{
												if(base=="x" || base==0)
												{
													self.children().last().prependTo(self);
													base = -self.children().first().width();
												}
												self.css("left", base+distance + "px");
											}
											else
											{
												if(base=="x")
												{
													self.children().last().prependTo(self);
													base = self.offset().left-self.children().first().width();
												}
												self.css("left", base+distance + "px");
											}
										}

									} 
									else if (phase == "cancel") 
									{
										if(distance!=0)
										{
											self.animate({
												"left": base + "px"
											}, 750, "easeInOutQuint", function(){
												/*self.trigger("configuration", {scroll: {
													easing: "easeInOutQuint",
													duration: 750
												}});
												$("#slider_posts_list_" + expando).trigger("configuration", {scroll: {
													easing: "easeInOutQuint",
													duration: 750
												}});??*/
												if(options.type=="small")
												{
													if(base==-self.children().first().width())
													{
														self.children().first().appendTo(self);
														self.css("left", "0px");
														base = 0;
													}
												}
											});
										}
									} 
									else if (phase == "end") 
									{
										if (direction == "right") 
										{
											$(".left_" + expando + ":first").trigger("click", [2]);
											self.animate({
												"left": (options.type=="small" ? 0 : (base+self.children().first().width())) + "px"
											}, 200, "linear", function(){
												if(options.type!="small")
													self.children().first().appendTo(self);
												$(".left_" + expando + ":first").trigger("click", [1]);
												base = "x";
											});
											
										} 
										else if (direction == "left") 
										{
											$(".right_" + expando + ":first").trigger("click");
											base = "x";
										}
									}
								}
							});
						}
					}
				});
				if(options.type!="small")
				{
					$(this).children(".slide").click(function(event, param){
						var self2 = $(this);
						self.trigger("isScrolling", function(isScrolling){
							if(!isScrolling)
							{
								if(typeof(param)=="undefined")
								{
									slideTo = (self2.prev().hasClass("slide") ? self2.prev() : self2.parent().children().last());
									if(slideTo.attr("id")!=currentSlide.attr("id"))
									{
										self.sliderControl("slideTo", self, expando, slideTo, options);
										currentSlide = slideTo;
									}
								}
							}
						});
					});
				}
				if(options.listContainer!="" && options.listContainer.length)
				{
					$("#slider_posts_list_" + expando + " li").click(function(){
						var self2 = $(this);
						self.trigger("isScrolling", function(isScrolling){
							if(!isScrolling)
							{
								//var index = $("#slider_posts_list_" + expando + " li").index(self2);
								var index = self2.attr("id").replace("slider_posts_list_post_" + expando + "_", "");
								if(options.type!="small")
								{
									if((parseInt(index))==0)
										index = $("#slider_posts_list_" + expando).children().length;
									index--;
								}
								slideTo = $("#slide_" + expando + "_" + index);
								if(slideTo.attr("id")!=currentSlide.attr("id"))
								{
									self.sliderControl("slideTo", self, expando, slideTo, options);
									currentSlide = slideTo;
								}
							}
						});
					});
				}
				/*$("#slider_navigation_" + expando + " .slider_control a").click(function(event){
					event.preventDefault();
					if(!$(this).hasClass("inactive"))
					{
						var self2 = $(this).parent();
						self.trigger("isScrolling", function(isScrolling){
							if(!isScrolling)
								self.trigger("slideTo", $("#slider_navigation_" + expando + " .slider_control").index(self2));
						});
					}
				});*/
				self.addClass("pr_initialized");
			});
		},
		barAnimation: function(name, expando){
			var distance = parseFloat($("#slider_posts_list_bar_" + expando)[0].style.width)/100;
			if(parseFloat(distance)==0 || isNaN(distance))
				distance = 1;
			else
				distance = 1-distance;
			
			$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).animate({
				width: "100%"
			}, distance*5000, "linear", function(){
				$(".right_" + expando + ":first").trigger("click", [3]);
			});
		},
		slideTo: function(name, self, expando, slide, options, direction, param){
			var scrollOptions = {
				scroll: {
					easing: "easeInOutQuint",
					duration: 750
				}
			};
			if(typeof(param)=="undefined")
				self.trigger("slideTo", [slide, {direction: (direction=="left" ? "prev" : "next"), onAfter: function(){
					self.trigger("configuration", scrollOptions);
					$("#slider_posts_list_" + expando).trigger("configuration", scrollOptions);
				}}]);
			else if(parseInt(param)==1)
				self.trigger("slideTo", [slide, {duration: 0, direction: (direction=="left" ? "prev" : "next"), onAfter: function(){
					self.trigger("configuration", scrollOptions);
					$("#slider_posts_list_" + expando).trigger("configuration", scrollOptions);
				}}]);
			else if(parseInt(param)==3)
				self.trigger("slideTo", slide);
			var index = slide.attr("id").replace("slide_" + expando + "_", "");
			if(options.type!="small")
			{
				if((parseInt(index)+1)==$("#slider_posts_list_" + expando).children().length)
					index = 0;
				else
					index++;
			}
			if(options.listContainer!="" && options.listContainer.length && (typeof(param)=="undefined" || parseInt(param)==2 || parseInt(param)==3))
			{
				//slider post list
				$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).css("width", 0);
				var next = $("#slider_posts_list_post_" + expando + "_" + index);
				$("#slider_posts_list_bar_" + expando).parent().removeClass("current");//({"background": "#FFFFFF", "border-color" : "#E9E9E9"});
				next.append($("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando)).addClass("current");
				$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).stop(true);
				$.fn.sliderControl("barAnimation", expando);
				var index2 = $("#slider_posts_list_" + expando + " li").index($("#slider_posts_list_" + expando + " .current"));
				if(index2==options.listItems && options.listItems==$("#slider_posts_list_" + expando).children().length-1)
				{
					if(direction=="left")
						$(".slider_posts_list_container .left.slider_control_" + expando).trigger("click");
					else
						$(".slider_posts_list_container .right.slider_control_" + expando).trigger("click");
				}
				else if(index2==options.listItems)
					$(".slider_posts_list_container .right.slider_control_" + expando).trigger("click");
				else if(index2==$("#slider_posts_list_" + expando).children().length-1)
					$(".slider_posts_list_container .left.slider_control_" + expando).trigger("click");
			}
		},
		destroy: function(){
			var expando = $(this).get(0)[jQuery.expando];
			$(".slider_navigation#slider_navigation_" + expando).remove();
			$("#slider_posts_list_progress_block_" + expando + ", #slider_posts_list_bar_" + expando).clearQueue().stop();
			$("#slider_posts_list_" + expando).parent().parent().children().remove();
		}
	};

	jQuery.fn.sliderControl = function(method){
		if(methods[method])
			return methods[method].apply(this, arguments);
		else if(typeof(method)==='object' || !method)
			return methods.init.apply(this, arguments);
	};
})(jQuery);

if ($('.tx-cal-controller-ajax').length > 0) {
      $('.tx-cal-controller-ajax').load(ajaxPageLink, function() {
          createPopups();
      });
    }

    function createPopups() {
      $('.bubbleInfo .trigger .url')
      .each(function () {

        var content = jQuery(this).parent().parent().find('.popup-contents').html();

        $(this).tooltip();
        
      });
};
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/*!
 * jQuery Expander Plugin - v1.7.0 - 2016-03-12
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&"object"==typeof module.exports?module.exports=a:a(jQuery)}(function(a){a.expander={version:"1.7.0",defaults:{slicePoint:100,sliceOn:null,preserveWords:!0,normalizeWhitespace:!0,showWordCount:!1,detailPrefix:" ",wordCountText:" ({{count}} words)",widow:4,expandText:"read more",expandPrefix:"&hellip; ",expandAfterSummary:!1,wordEnd:/(&(?:[^;]+;)?|[0-9a-zA-Z\u00C0-\u0100]+|[^\u0000-\u007F]+)$/,summaryClass:"summary",detailClass:"details",moreClass:"read-more",lessClass:"read-less",moreLinkClass:"more-link",lessLinkClass:"less-link",collapseTimer:0,expandEffect:"slideDown",expandSpeed:250,collapseEffect:"slideUp",collapseSpeed:200,userCollapse:!0,userCollapseText:"read less",userCollapsePrefix:" ",onSlice:null,beforeExpand:null,afterExpand:null,onCollapse:null,afterCollapse:null}},a.fn.expander=function(b){function c(a,b){var c="span",d=a.summary,e=q.exec(d),f=e?e[2].toLowerCase():"";return b?(c="div",e&&"a"!==f&&!a.expandAfterSummary?d=d.replace(q,a.moreLabel+"$1"):d+=a.moreLabel,d='<div class="'+a.summaryClass+'">'+d+"</div>"):d+=a.moreLabel,[d,a.detailPrefix||"","<",c+' class="'+a.detailClass+'"',">",a.details,"</"+c+">"].join("")}function d(a,b){var c='<span class="'+a.moreClass+'">'+a.expandPrefix;return a.showWordCount?a.wordCountText=a.wordCountText.replace(/\{\{count\}\}/,b.replace(n,"").replace(/\&(?:amp|nbsp);/g,"").replace(/(?:^\s+|\s+$)/,"").match(/\w+/g).length):a.wordCountText="",c+='<a href="#" class="'+a.moreLinkClass+'">'+a.expandText+a.wordCountText+"</a></span>"}function e(b,c){return b.lastIndexOf("<")>b.lastIndexOf(">")&&(b=b.slice(0,b.lastIndexOf("<"))),c&&(b=b.replace(m,"")),a.trim(b)}function f(a,b){b.stop(!0,!0)[a.collapseEffect](a.collapseSpeed,function(){var c=b.prev("span."+a.moreClass).show();c.length||b.parent().children("div."+a.summaryClass).show().find("span."+a.moreClass).show(),a.afterCollapse&&a.afterCollapse.call(b)})}function g(b,c,d){b.collapseTimer&&(j=setTimeout(function(){f(b,c),a.isFunction(b.onCollapse)&&b.onCollapse.call(d,!1)},b.collapseTimer))}function h(b){var c="ExpandMoreHere374216623",d=b.summaryText.replace(b.sliceOn,c);d=a("<div>"+d+"</div>").text();var e=d.indexOf(c),f=b.summaryText.indexOf(b.sliceOn);return-1!==e&&e<b.slicePoint&&(b.summaryText=b.allHtml.slice(0,f)),b}var i="init";"string"==typeof b&&(i=b,b={});var j,k=a.extend({},a.expander.defaults,b),l=/^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,m=k.wordEnd,n=/<\/?(\w+)[^>]*>/g,o=/<(\w+)[^>]*>/g,p=/<\/(\w+)>/g,q=/(<\/([^>]+)>)\s*$/,r=/^(<[^>]+>)+.?/,s=/\s\s+/g,t=function(b){return k.normalizeWhitespace?a.trim(b||"").replace(s," "):b},u={init:function(){this.each(function(){var b,i,m,q,s,u,v,w,x,y,z,A,B,C,D,E=[],F=[],G="",H={},I=this,J=a(this),K=a([]),L=a.extend({},k,J.data("expander")||a.meta&&J.data()||{}),M=!!J.find("."+L.detailClass).length,N=!!J.find("*").filter(function(){var b=a(this).css("display");return/^block|table|list/.test(b)}).length,O=N?"div":"span",P=O+"."+L.detailClass,Q=L.moreClass+"",R=L.lessClass+"",S=L.expandSpeed||0,T=t(J.html()),U=T.slice(0,L.slicePoint);if(L.moreSelector="span."+Q.split(" ").join("."),L.lessSelector="span."+R.split(" ").join("."),!a.data(this,"expanderInit")){for(a.data(this,"expanderInit",!0),a.data(this,"expander",L),a.each(["onSlice","beforeExpand","afterExpand","onCollapse","afterCollapse"],function(b,c){H[c]=a.isFunction(L[c])}),U=e(U),s=U.replace(n,"").length;s<L.slicePoint;)q=T.charAt(U.length),"<"===q&&(q=T.slice(U.length).match(r)[0]),U+=q,s++;for(L.sliceOn&&(D=h({sliceOn:L.sliceOn,slicePoint:L.slicePoint,allHtml:T,summaryText:U}),U=D.summaryText),U=e(U,L.preserveWords&&T.slice(U.length).length),u=U.match(o)||[],v=U.match(p)||[],m=[],a.each(u,function(a,b){l.test(b)||m.push(b)}),u=m,i=v.length,b=0;i>b;b++)v[b]=v[b].replace(p,"$1");if(a.each(u,function(b,c){var d=c.replace(o,"$1"),e=a.inArray(d,v);-1===e?(E.push(c),F.push("</"+d+">")):v.splice(e,1)}),F.reverse(),M)x=J.find(P).remove().html(),U=J.html(),T=U+x,w="";else{if(x=T.slice(U.length),y=a.trim(x.replace(n,"")),""===y||y.split(/\s+/).length<L.widow)return;w=F.pop()||"",U+=F.join(""),x=E.join("")+x}L.moreLabel=J.find(L.moreSelector).length?"":d(L,x),N?x=T:"&"===U.charAt(U.length-1)&&(G=/^[#\w\d\\]+;/.exec(x),G&&(x=x.slice(G[0].length),U+=G[0])),U+=w,L.summary=U,L.details=x,L.lastCloseTag=w,H.onSlice&&(m=L.onSlice.call(I,L),L=m&&m.details?m:L),z=c(L,N),J.empty().append(z),B=J.find(P),C=J.find(L.moreSelector),"slideUp"===L.collapseEffect&&"slideDown"!==L.expandEffect||J.is(":hidden")?B.css({display:"none"}):B[L.collapseEffect](0),K=J.find("div."+L.summaryClass),A=function(a){a.preventDefault();var b=a.startExpanded?0:S;C.hide(),K.hide(),H.beforeExpand&&L.beforeExpand.call(I),B.stop(!1,!0)[L.expandEffect](b,function(){B.css({zoom:""}),H.afterExpand&&L.afterExpand.call(I),g(L,B,I)})},C.find("a").unbind("click.expander").bind("click.expander",A),L.userCollapse&&!J.find(L.lessSelector).length&&J.find(P).append('<span class="'+L.lessClass+'">'+L.userCollapsePrefix+'<a href="#" class="'+L.lessLinkClass+'">'+L.userCollapseText+"</a></span>"),J.find(L.lessSelector+" a").unbind("click.expander").bind("click.expander",function(b){b.preventDefault(),clearTimeout(j);var c=a(this).closest(P);f(L,c),H.onCollapse&&L.onCollapse.call(I,!0)}),L.startExpanded&&A({preventDefault:function(){},startExpanded:!0})}})},destroy:function(){this.each(function(){var b,c,d=a(this);d.data("expanderInit")&&(b=a.extend({},d.data("expander")||{},k),c=d.find("."+b.detailClass).contents(),d.removeData("expanderInit"),d.removeData("expander"),d.find(b.moreSelector).remove(),d.find("."+b.summaryClass).remove(),d.find("."+b.detailClass).after(c).remove(),d.find(b.lessSelector).remove())})}};return u[i]&&u[i].call(this),this},a.fn.expander.defaults=a.expander.defaults});
(function($) {
	
	"use strict";

	//Search
	$("#top-search-trigger").on("click", function () {
		$('body').toggleClass('top-search-active');
		$('#top-search').find('input').focus();
		return false;
	});



	//Hidden Bar Menu Config
	function hiddenBarMenuConfig() {
		var menuWrap = $('.hidden-bar .side-menu');
		// appending expander button
		menuWrap.find('.dropdown').children('a').append(function () {
			return '<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>';
		});
		// hidding submenu 
		menuWrap.find('.dropdown').children('ul').hide();
		// toggling child ul
		menuWrap.find('.dropdown').children('a').each(function(){
			$(this).on('click', function (e) {
				e.preventDefault();
				$(this).parent().children('ul').slideToggle();
				$(this).toggleClass('current');
				$(this).find('.btn.expander').find('i').toggleClass('fa-angle-down fa-angle-right');
			});
		});

		menuWrap.find('.btn.expander').each(function () {
			$(this).on('click', function () {
				$(this).parent() // return parent of .btn.expander (a) 
					.parent() // return parent of a (li)
						.children('ul').slideToggle();
	
				// adding class to expander container
				$(this).parent().toggleClass('current');
				// toggling arrow of expander
				$(this).find('i').toggleClass('fa-angle-down fa-angle-right');
	
				return false;
	
			});
		});
	}
	
	hiddenBarMenuConfig();
	
	
	//Custom Scroll for Hidden Sidebar
	if ($('.hidden-bar-wrapper').length) {
		$('.hidden-bar-wrapper').mCustomScrollbar();
	}
	
	
	//Hidden Bar Toggler
	if ($('.hidden-bar-closer').length) {
		$('.hidden-bar-closer').on('click', function () {
			$('body').removeClass('sidebar-enabled');
			$('.hidden-bar').removeClass('visible-sidebar');
		});
	}
	if ($('.hidden-bar-opener').length) {
		$('.hidden-bar-opener').on('click', function () {
			$('body').addClass('sidebar-enabled');
			$('.hidden-bar').addClass('visible-sidebar');
		});
	}
	
	
	
	//Revolution Slider Default
	if($('.main-slider.default-slider .tp-banner').length){

		jQuery('.main-slider.default-slider .tp-banner').show().revolution({
		  delay:10000,
		  startwidth:1200,
		  startheight:670,
		  hideThumbs:600,
	
		  thumbWidth:80,
		  thumbHeight:50,
		  thumbAmount:5,
	
		  navigationType:0,
		  navigationArrows:"1",
		  navigationStyle:"preview1",
	
		  touchenabled:"on",
		  onHoverStop:"off",
	
		  swipe_velocity: 0.7,
		  swipe_min_touches: 1,
		  swipe_max_touches: 1,
		  drag_block_vertical: false,
	
		  parallax:"mouse",
		  parallaxBgFreeze:"on",
		  parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
	
		  keyboardNavigation:"off",
	
		  navigationHAlign:"center",
		  navigationVAlign:"bottom",
		  navigationHOffset:0,
		  navigationVOffset:20,
	
		  soloArrowLeftHalign:"left",
		  soloArrowLeftValign:"center",
		  soloArrowLeftHOffset:20,
		  soloArrowLeftVOffset:0,
	
		  soloArrowRightHalign:"right",
		  soloArrowRightValign:"center",
		  soloArrowRightHOffset:20,
		  soloArrowRightVOffset:0,
	
		  shadow:0,
		  fullWidth:"on",
		  fullScreen:"off",
	
		  spinner:"spinner4",
	
		  stopLoop:"off",
		  stopAfterLoops:-1,
		  stopAtSlide:-1,
	
		  shuffle:"off",
	
		  autoHeight:"off",
		  forceFullWidth:"off",
	
		  hideThumbsOnMobile:"on",
		  hideNavDelayOnMobile:1500,
		  hideBulletsOnMobile:"on",
		  hideArrowsOnMobile:"on",
		  hideThumbsUnderResolution:0,
	
		  hideSliderAtLimit:0,
		  hideCaptionAtLimit:0,
		  hideAllCaptionAtLilmit:0,
		  startWithSlide:0,
		  videoJsPath:"",
		  fullScreenOffsetContainer: ""
	  });

		
	}
	
	
	//Revolution Slider Fullscreen
	if($('.main-slider.fullscreen .tp-banner').length){

		jQuery('.main-slider.fullscreen .tp-banner').show().revolution({
		  
		  delay:10000,
		  startwidth:1200,
		  startheight:600,
		  hideThumbs:600,
	
		  thumbWidth:80,
		  thumbHeight:50,
		  thumbAmount:5,
	
		  navigationType:0,
		  navigationArrows:"0",
		  navigationStyle:"preview4",
	
		  touchenabled:"on",
		  onHoverStop:"off",
	
		  swipe_velocity: 0.7,
		  swipe_min_touches: 1,
		  swipe_max_touches: 1,
		  drag_block_vertical: false,
	
		  parallax:"mouse",
		  parallaxBgFreeze:"on",
		  parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
	
		  keyboardNavigation:"off",
	
		  navigationHAlign:"center",
		  navigationVAlign:"bottom",
		  navigationHOffset:0,
		  navigationVOffset:20,
	
		  soloArrowLeftHalign:"left",
		  soloArrowLeftValign:"center",
		  soloArrowLeftHOffset:20,
		  soloArrowLeftVOffset:0,
	
		  soloArrowRightHalign:"right",
		  soloArrowRightValign:"center",
		  soloArrowRightHOffset:20,
		  soloArrowRightVOffset:0,
	
		  shadow:0,
		  fullWidth:"on",
		  fullScreen:"on",
	
		  spinner:"spinner4",
	
		  stopLoop:"off",
		  stopAfterLoops:-1,
		  stopAtSlide:-1,
	
		  shuffle:"off",
	
		  autoHeight:"off",
		  forceFullWidth:"on",
	
		  hideThumbsOnMobile:"on",
		  hideNavDelayOnMobile:1500,
		  hideBulletsOnMobile:"on",
		  hideArrowsOnMobile:"on",
		  hideThumbsUnderResolution:0,
	
		  hideSliderAtLimit:0,
		  hideCaptionAtLimit:0,
		  hideAllCaptionAtLilmit:0,
		  startWithSlide:0,
		  videoJsPath:"",
		  fullScreenOffsetContainer: ""
	  });

		
	}

	$('.slider').carouFredSel();

	//Caroufredsel
	$(".slider").carouFredSel({
		responsive: false,
		direction: "left",
		width: "100%",
		items: {
			start: 0,
			visible: 1,
			minimum: 1
		},
		pagination: ".pager",
		scroll: {
			items: 1,
			easing: 'easeInOutQuint',
			duration: 750,
			pauseOnHover: true
		},
		prev: {
			button: ".prev-slide",
			key:"left"
		},
		next: {
			button: ".next-slide",
			key:"right"
		},
		auto: {
			play: false,
			timeoutDuration: 5000,
			duration: 700
		}
	},
	{
		transition: true,
		wrapper: {
			classname: "caroufredsel_wrapper caroufredsel_wrapper_slider"
		}
	});

	$('.slider_navigation').appendTo('.slider_content_box');

	$('#datetimepicker').datetimepicker({
		inline: true
	});

	$('.default-story-column .overlay-box > .content').find('a[target="_blank"]').each(function() {
		if($(this).attr('title') && $(this).attr('target') == "_blank") {
			$(this).text($(this).attr('title'));
		}
	});


	$(".set > a").on("click", function(){
		if($(this).hasClass('active')){
			$(this).removeClass("active");
			$(this).siblings('.accordion-content').slideUp(200);
			$(".set > a i").removeClass("fa-minus").addClass("fa-plus");
		}else{
			$(".set > a i").removeClass("fa-minus").addClass("fa-plus");
			$(this).find("i").removeClass("fa-plus").addClass("fa-minus");
			$(".set > a").removeClass("active");
			$(this).addClass("active");
			$('.accordion-content').slideUp(200);
			$(this).siblings('.accordion-content').slideDown(200);
		}

	});
	
	//Donors Slider
	if ($('.donors-carousel').length) {
		$('.donors-carousel').owlCarousel({
			loop:true,
			  nav : true,
			  smartSpeed : 1000,
			  autoplay: 5000,
			  margin:0,
			  navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			  responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:3
				},
				1400:{
					items:3
				}
			}
		});    		
	}
	
	
	//Custom Background Slider
	if($('.custom-slider').length){
		$('.custom-slider').bxSlider({
			adaptiveHeight: true,
			auto:true,
			controls: true,
			pager:false,
			pause: 5000,
			speed: 1000,
			nextText: '<span class="fa fa-angle-right"></span>',
			prevText: '<span class="fa fa-angle-left"></span>'
		});
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'elastic',
			closeEffect : 'elastic',
			helpers : {
				media : {}
			}
		});
	}
	
	
	//Recent Blog Posts / Hide Show
	if($('.recent-post-thumb').length){
		$('.recent-post-thumb').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-post'));
			$('.recent-post-thumb').removeClass('active-thumb');
			$(this).addClass('active-thumb');
			$('.recent-posts-content .recent-post-data').hide(0);
			$('.recent-post-data').removeClass('active-post-data');
			$(target).fadeIn(300);
			$(target).addClass('active-post-data');
			var windowWidth = $(window).width();
			if (windowWidth <= 700) {
				$('html, body').animate({
				   scrollTop: $('.tabs-box').offset().top
				 }, 1000);
			}
		});
		
	}
	
	
	//Tabbed Stories Hide/ Show
	if($('.tabbed-stories').length){
		$('.tabbed-stories .story-buttons .story-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-story'));
			$('.tabbed-stories .story-buttons .story-btn').removeClass('active-btn');
			$(this).addClass('active-btn');
			$('.tabbed-stories .stories-content .story').hide(0);
			$('.tabbed-stories .stories-content .story').removeClass('active-story');
			$(target).fadeIn(300);
			$(target).addClass('active-story');
		});
		
	}
	
	
	//Sponsors Slider
	if ($('.sponsors-slider').length) {
		$('.sponsors-slider').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 4000,
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				600:{
					items:3
				},
				800:{
					items:4
				},
				1024:{
					items:5
				},
				1200:{
					items:5
				}
			}
		});    		
	}
	
	
	//Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				},
				1400:{
					items:1
				}
			}
		});    		
	}
	
	
	//Countdown Timer For Event
	if($('#countdown-timer').length){                     
		$('#countdown-timer').countdown('2016/06/16', function(event) {
			var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span><span class="line"></span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span><span class="line"></span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span><span class="line"></span>Min</div>  ' + '<div class="counter-column"><span class="count">%S</span><span class="line"></span>Sec</div>'));
		});
	}
	
	
	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}
	
	
	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.sortable-masonry .filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 1 
				 },
				animationOptions:{
					duration:1000,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 1000,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 1000,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.sortable-masonry .filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();
	
	
	//Gallery With Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	// Fact Counter
	function factCounter() {
		if($('.fact-counter').length){
			$('.fact-counter .column.animated').each(function() {
		
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);
					
				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
				
			});
		}
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	/*
	
	// Google Map Settings test
	if($('#map-container').length){
		var map;
		 map = new GMaps({
			el: '#map-container',
			zoom: 10,
			scrollwheel:false,
			//Set Latitude and Longitude Here
			lat: -37.817085,
			lng: 144.955631
		  });
		  
		  //Add map Marker
		  map.addMarker({
			lat: -37.817085,
			lng: 144.955631,
			infoWindow: {
			  content: '<p class="info-outer" style="text-align:center;"><strong>Envato</strong><br>Melbourne VIC 3000, Australia</p>'
			}
		 
		});
	}*/
	
	
	// Event Calendar
	if($('#event-calendar').length){
		
		$('#event-calendar').monthly({
			mode: 'event',
			xmlUrl: 'events.xml'
		});
	
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var HeaderHeight = $('.header-lower').height();
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top - HeaderHeight
			 }, 1000);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		factCounter();
	});
	
/* ==========================================================================
   When document is Loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		enableMasonry();
	});

	$('.twitter-block').delegate('#twitter-widget-0','DOMSubtreeModified propertychange', function() {
		hideTweetMedia();
	});

	var hideTweetMedia = function() {
		$('.twitter-block').find('.twitter-timeline').contents().find('.timeline-Tweet-media').css('display', 'none');
		$('.twitter-block').find('.twitter-timeline').contents().find('.timeline-Tweet--isRetweet').css('display', 'none');
		$('.twitter-block').find('.twitter-timeline').contents().find('.timeline-Tweet-text').css({'font-size':'15px','line-height':'20px'});
		$('.twitter-block').find('.twitter-timeline').contents().find('.timeline-LoadMore').css('display', 'none');
		$('.twitter-block').css('height', '100%');
	}

	// slick slide for image slideshow
	jQuery('.slick-slider').slick({
		dots: false,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 2000, draggable:true, appendArrows:false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					dots: false
				}
			}
		]
	});


	$('.twoQuarterColBoxEvents,.twoQuarterColBoxFeatures')
		.each( function (i, el){
			var $el = $(el);

			$el
				.find( '.newsEntries li a' )
				.on( 'mouseenter', function (e){
					var $this = $(this),
						$img = $this.siblings('img'),
						$nextImg = $this.closest('.newsEntries').siblings('.currentNewsPic').children('img');

					$nextImg
						.attr( 'src', $img.attr('src') );
				})
				.first()
				.triggerHandler('mouseenter');
		});

	var $iW = $(window).innerWidth();
	if ($iW < 767){
		$('#sidebar-menu').appendTo('#sidebar');
		$('.sidebar-page-container .left-content').insertBefore('.sidebar-page-container .sidebar-column');
	}

	$('#twitter-widget-0').ready(function() {

	});

	$(function() {
		function manipIframe() {
			var el = $('#twitter-widget-0').contents();
			//console.log(el.length);
			if (el.length != 1) {
				setTimeout(manipIframe, 150);
				return;
			}
			var d = new Date();
			var date = d.getFullYear() + d.getMonth() + d.getDate();
			el.find("head").append($("<link/>",
				{ rel: "stylesheet", href: "/fileadmin/templates/UNIDO-16/css/twitter.css?" + date, type: "text/css" }));
		}
		manipIframe();
	});


	$('.global-search input').width($('.global-search').width() - 70);

	$('.sSearch.sButton').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.main-menu').addClass('sSlide');
		$('.global-search').addClass('sSlide');
		$('.global-search input').focus();
	});
	$('.search-right').on('click', function() {
		closeSearchBar();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			closeSearchBar();
		}
	});
	$('.sSearch.invert, .global-search').on('click', function(e) {
		e.stopPropagation();
		$('.global-search input').focus();
	});
	$(document).on('click', function () {
		$('.global-search').removeClass('sSlide');
		$('.main-menu').removeClass('sSlide');
		$('.global-search input').blur();
	})

	function closeSearchBar() {
		$('.global-search').removeClass('sSlide');
		$('.main-menu').removeClass('sSlide');
		$('.global-search input').val("");
		$('.global-search input').blur();
	}


})(window.jQuery);

//Twitter timeline
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
var browserName = navigator.appName;
var browserVer = parseInt(navigator.appVersion);
var version = "";
var msie4 = (browserName == "Microsoft Internet Explorer" && browserVer >= 4);
if ((browserName == "Netscape" && browserVer >= 3) || msie4 || browserName=="Konqueror" || browserName=="Opera") {version = "n3";} else {version = "n2";}
	// Blurring links:
function blurLink(theObject)	{	//
	if (msie4)	{theObject.blur();}
}

	// decrypt helper function
function decryptCharcode(n,start,end,offset)	{
	n = n + offset;
	if (offset > 0 && n > end)	{
		n = start + (n - end - 1);
	} else if (offset < 0 && n < start)	{
		n = end - (start - n - 1);
	}
	return String.fromCharCode(n);
}
	// decrypt string
function decryptString(enc,offset)	{
	var dec = "";
	var len = enc.length;
	for(var i=0; i < len; i++)	{
		var n = enc.charCodeAt(i);
		if (n >= 0x2B && n <= 0x3A)	{
			dec += decryptCharcode(n,0x2B,0x3A,offset);	// 0-9 . , - + / :
		} else if (n >= 0x40 && n <= 0x5A)	{
			dec += decryptCharcode(n,0x40,0x5A,offset);	// A-Z @
		} else if (n >= 0x61 && n <= 0x7A)	{
			dec += decryptCharcode(n,0x61,0x7A,offset);	// a-z
		} else {
			dec += enc.charAt(i);
		}
	}
	return dec;
}
	// decrypt spam-protected emails
function linkTo_UnCryptMailto(s)	{
	location.href = decryptString(s,-2);
}
/**
 * Created by FelderA on 7/28/2016.
 */

//adds the class iframe-helper class to all iframes, to make them styleable
// Array.prototype.forEach.call(document.getElementsByTagName("iframe"),function(node){node.className += "iframe-helper-class"});

// sets all iframes to display none if media=print
if(window.matchMedia("print").matches) {
    Array.prototype.forEach.call(document.getElementsByTagName("iframe"), function (node) {
        node.style.display = "none";
    });

}
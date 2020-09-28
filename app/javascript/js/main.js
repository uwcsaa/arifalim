/*
	Name: cvCard
	Description: Responsive HTML5 vCard Template
	Version: 1.2.2
	Author: pixelwars
*/

import NProgress from "nprogress"
import Modernizr from "modernizr"
import FastClick from "fastclick"

/* global variables */
var classicLayout = false;
var portfolioKeyword;
var $container, $blog_container;


(function ($) {
	
	/* DOCUMENT LOAD */
	$(function() {
		
		
		// ------------------------------
		// start loader
		NProgress.start();
		// ------------------------------
		
		
		setMasonry();

			
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
			
			// ------------------------------
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('section.portfolio').attr('id');
			initialize();
			var detailUrl = giveDetailUrl();
			// ------------------------------
			
			
			// ------------------------------
			// LAYOUT DETECT
			var pagesCount = $('.wrapper > section').length;
			var isIE11 = !!navigator.userAgent.match(/Trident\/7\./); 
			classicLayout = $('html').attr('data-classic-layout') === 'true';
			classicLayout = classicLayout || ($('html').attr('data-mobile-only-classic-layout') === 'true' && $(window).width() < 768);
			classicLayout = classicLayout || !Modernizr.csstransforms3d ||  pagesCount < 3 || isIE11 ;
			if(classicLayout) {
				$('html').addClass('classic-layout');	
				setActivePage();
				setTimeout(function() { setMasonry(); }, 600);	
				$.address.change(function() {
					setActivePage();
					initializeMap();
					setTimeout(function() { setMasonry(); }, 100);	
					});
			}
			// initialize triple layout
			$.initTripleLayout(); 
			setTimeout(function() { refreshMasonry(); },300);
			// ------------------------------
			
			
			// FULL BROWSER BACK BUTTON SUPPORT 
			var prevUrl = -1;
			$.address.change(function() {
					var detailUrl = giveDetailUrl();
					if(detailUrl != -1 ) {
						showProjectDetails(detailUrl);
					} else {
						if ($.address.path().indexOf("/"+ portfolioKeyword)!=-1) {
							if(prevUrl != -1) {
								hideProjectDetails(true,false);
							} else {
								hideProjectDetails(true,true);	
							}
						}
					}
					prevUrl = giveDetailUrl();
				}); 
		}
		// ------------------------------	
		
		
		
		// ------------------------------
		// SETUP PLUGINS
		setup();
		// ------------------------------
		
		
		
		// ------------------------------
		// PORTFOLIO DETAILS
		// Show details
		$(".one-page-layout a.ajax").live('click',function() {
			
			var returnVal;
			var url = $(this).attr('href');
			var baseUrl = $.address.baseURL();
			
			if(url.indexOf(baseUrl) != -1) { // full url
				var total = url.length;
				detailUrl = url.slice(baseUrl.length+1, total);	
			} else { // relative url
				detailUrl = url;
			}
			
			$.address.path(portfolioKeyword + '/' + detailUrl );
			
			return false;
			
		});
		// ------------------------------

	});
	// DOCUMENT READY
	

	
	// WINDOW ONLOAD
	window.onload = function() {
		
		NProgress.done();
		
	};
	// WINDOW ONLOAD	
	
	
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	// ------------------------------
	// INITIALIZE
	var inAnimation, outAnimation;
	function initialize() {
		inAnimation = $('html').attr('data-inAnimation');
		outAnimation = $('html').attr('data-outAnimation');
	}
	// ------------------------------
	
	
	// ------------------------------
	// SETUP : plugins
	function setup() {
		// ------------------------------
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		var isWindowsPhone = ua.indexOf("windows phone") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		if(!isWindowsPhone) {
			
			// ------------------------------
			// remove click delay on touch devices
			FastClick.attach(document.body);
			// ------------------------------
		}
		// ------------------------------
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// CHANGE PAGE
	function setActivePage() {
		
			$('.page').removeClass('active').hide();
			var path = $.address.path();
			path = path.slice(1, path.length);
			path = giveDetailUrl() != -1 ? portfolioKeyword : path;
			if(path == "") {  // if hash tag doesnt exists - go to first page
				var firstPage = $('.vs-nav li').first().find('a').attr('href');
				path = firstPage.slice(2,firstPage.length);
				$.address.path(path);
				return false;
				}
			
			// show page
			$('#'+ path).fadeIn();
			$('.page.active').hide();
			$('#'+ path).addClass('active');
			setCurrentMenuItem();
			
			if(path.indexOf(portfolioKeyword) != -1) {
				setTimeout(function() { setMasonry(); }, 100);
			} 
			
			$("body").scrollTop(0);

	}	
	// ------------------------------
	
	
	// ------------------------------
	// MASONRY - ISOTOPE
	function setMasonry() {
		
		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// call isotope
				refreshMasonry();
				$(el).imagesLoaded(function() {
					$(el).isotope({
					  layoutMode : $(el).data('layout') ? $(el).data('layout') : 'masonry'
					});
					// set columns
					refreshMasonry();
				});
				
				if (!$(el).data('isotope')) {
					// filters
					var filters = $(el).siblings('.filters');
					if(filters.length) {
						filters.find('a').on("click", function() {
							var selector = $(this).attr('data-filter');
							  $(el).isotope({ filter: selector });
							  $(this).parent().addClass('current').siblings().removeClass('current');
							  return false;
							});
						}
				}
				
			}); //each
		}
	}			
	$(window).on('resize debouncedresize', function() {
    	refreshMasonry();
		setTimeout(function() { refreshMasonry(); },1000)
	});
	// ------------------------------
		
	// ------------------------------
	// REFRSH MASONRY - ISOTOPE
	function refreshMasonry() {
		
		var masonry = $('.portfolio-items, .latest-posts');
		if (masonry.length) {
			masonry.each(function(index, el) {
				
				// check if isotope initialized
				if ($(el).data('isotope')) {
					
					var itemW = 360;
					var containerW = $(el).width();
					var items = $(el).children('.hentry');
					var columns = Math.round(containerW/itemW);
				
					// set the widths (%) for each of item
					items.each(function(index, element) {
						var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
						var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
						$(this).css( 'width', itemRealWidth + '%' );
					});
				
					var columnWidth = Math.floor( containerW / columns );
					
					$(el).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
					$(el).isotope('layout');
					}
				
			}); //each
		}
	}	
	// ------------------------------

	// ------------------------------
	// SET CURRENT MENU ITEM
	function setCurrentMenuItem() {
		var activePageId = $('.page.active').attr('id');
		// set default nav menu
		$('.vs-nav a[href$=' + activePageId +']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}	
	// ------------------------------
	
	
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	
	function showProjectDetails(url) {
		
		showLoader();
		
		var p = $('.p-overlay:not(.active)').first();
		pActive = $('.p-overlay.active');
		
		if(pActive.length) {
			hideProjectDetails();	  
		}
		
		// ajax : fill data
		p.empty().load(url + ' .portfolio-single', function() {	
			NProgress.set(0.5);
			
			// wait for images to be loaded
			p.imagesLoaded(function() {
				
				hideLoader();
				
				$('html').addClass('p-overlay-on');
				
				$("body").scrollTop(0);
								
				// setup plugins
				setup();
				
				if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
				p.removeClass('animated '+ outAnimation + " " + inAnimation ).addClass('animated '+ inAnimation).show();
				} else { //old browser
					p.fadeIn();	
				}
				p.addClass('active');
				
			});
		});
	}
	
	function hideProjectDetails(forever, safeClose) {
		// param forever : close the detail window forever. no navigating through the windows.
		// param safeClose : true if it is triggered by menu change = not a real close.
		$('html').removeClass('p-overlay-on');
		
		// close completely by back link.
		if(forever) {
			pActive = $('.p-overlay.active');
			if(!safeClose) {
				// remove detail url
				$.address.path(portfolioKeyword);
				$("body").scrollTop(0);
			}
		}
		
		pActive.removeClass('active');
		
		if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
			pActive.removeClass('animated '+ inAnimation).addClass('animated '+ outAnimation);
			setTimeout(function() { pActive.hide().removeClass(outAnimation).empty(); } ,1010)
		} else { //old browser
			pActive.fadeOut().empty();	
		}
	}
	
	function giveDetailUrl() {
	
		var address = $.address.value();
		var detailUrl;
		
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		NProgress.start();
	}
	function hideLoader() {
		NProgress.done();
	}
	// ------------------------------
	
	
	
	


})(jQuery);
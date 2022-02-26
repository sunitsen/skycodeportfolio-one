
//counter
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});

//progress bar
//video  popup
$(document).ready(function () {
  $(".videoplay").magnificPopup({
      type: "iframe",
      iframe: {
          markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + "</div>", // HTML markup of popup, `mfp-close` will be replaced by the close button

          patterns: {
              youtube: {
                  index: "youtube.com/", 

                  id: "v=", 

                  src: "https://www.youtube.com/embed/%id%?autoplay=1",
              },
              vimeo: {
                  index: "vimeo.com/",
                  id: "/",
                  src: "//player.vimeo.com/video/%id%?autoplay=1",
              },
              gmaps: {
                  index: "//maps.google.",
                  src: "%id%&output=embed",
              },

          },

          srcAction: "iframe_src",
      },
  });
});


//hero animation

const parallaxContainer = document.getElementById("wrap");
const chouchin = document.querySelectorAll(".chouchin-wrap");

const fixer = 0.003;

gsap.registerEffect({
  name: "mousemoveParallax",
  effect: (targets, config) => {
    return gsap.set(targets, { x: config.x, y: config.y });
  }
});

document.addEventListener("mousemove", function (event) {
  const pageX =
    event.pageX - parallaxContainer.getBoundingClientRect().width * 0.5;

  const pageY =
    event.pageY - parallaxContainer.getBoundingClientRect().height * 0.5;

  chouchin.forEach((item) => {
    const speedX = item.getAttribute("data-speed-x");
    const speedY = item.getAttribute("data-speed-y");

    gsap.effects.mousemoveParallax(item, {
      x: (item.offsetLeft + pageX * speedX) * fixer,
      y: (item.offsetTop + pageY * speedY) * fixer
    });
  });
});








//sidbar
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

//navbar scroll
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


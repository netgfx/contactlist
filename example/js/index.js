var contacts = [
						{
							name: "A",
							data: [
								{
									name: "Adam"
								},
								{
									name: "Alex"
								},
								{
									name: "Ann"
								},
								{
									name: "Antony"
								},
								{
									name: "Ali"
								},
								{
									name: "Apple"
								}
							]
						},
						{
							name: "B",
							data: [
								{
									name: "Barry"
								},
								{
									name: "Bryan"
								},
								{
									name: "Bred"
								},
								{
									name: "Brad"
								},
								{
									name: "Butch"
								}
							]
						},
						{
							name: "C",
							data: [
								{
									name: "Cassandra"
								},
								{
									name: "Corky"
								},
								{
									name: "Cicero"
								},
								{
									name: "Cecilia"
								},
								{
									name: "Cook"
								}
							]
						},
						{
							name: "D",
							data: [
								{
									name: "Dianna"
								}
							]
						},
						{
							name: "E",
							data: [
								{
									name: "Eve"
								}
							]
						},
						{
							name: "F",
							data: [
								{
									name: "Fiona"
								}
							]
						},
						{
							name: "G",
							data: [
								{
									name: "Gregory"
								}
							]
						},
						{
							name: "H",
							data: [
								{
									name: "Homer"
								}
							]
						},
						{
							name: "J",
							data: [
								{
									name: "Jaina"
								}
							]
						},
						{
							name: "K",
							data: [
								{
									name: "Kostas"
								}
							]
						},
						{
							name: "L",
							data: [
								{
									name: "Lea"
								}
							]
						},
						{
							name: "M",
							data: [
								{
									name: "Michael"
								}
							]
						},
						{
							name: "N",
							data: [
								{
									name: "Nick"
								}
							]
						},
						{
							name: "O",
							data: [
								{
									name: "Oratio"
								}
							]
						},
						{
							name: "P",
							data: [
								{
									name: "Peter"
								}
							]
						},
						{
							name: "Q",
							data: [
								{
									name: "Qubert"
								}
							]
						},
						{
							name: "R",
							data: [
								{
									name: "Roxanne"
								}
							]
						},
						{
							name: "S",
							data: [
								{
									name: "Steve"
								}
							]
						},
						{
							name: "T",
							data: [
								{
									name: "Timo"
								}
							]
						},
						{
							name: "U",
							data: [
								{
									name: "Ursula"
								}
							]
						},
						{
							name: "V",
							data: [
								{
									name: "Vendetta"
								}
							]
						},
						{
							name: "W",
							data: [
								{
									name: "Warpath"
								}
							]
						},
						{
							name: "X",
							data: [
								{
									name: "Xena"
								}
							]
						},
						{
							name: "Y",
							data: [
								{
									name: "Yrelia"
								}
							]
						}, {
							name: "Z",
							data: [
								{
									name: "Zoltan"
								}
							]
						}
			];

$(document).ready(function(){
  
});

var contactlist = contactlist || {};
contactlist = (function(){
  var _letterSections = [];
	var _touchStart = 0;
	var _scrolled = 0;
	var _firstClick = 0; 
  var _scroller;
  
  for(var i=0; i<contacts.length;i++) {
    var item = contacts[i];
    
    var elem = $("#contacts-list").append('<li class="alphabetic-divider">'+item.name+'</li>');
    for(var j=0;j<item.data.length;j++) {
      var innerItem = item.data[j];
      $(elem).append('<li class="list-item"><span class="row"><div>'+innerItem.name+'</div></span></li>');
    }
  }
  
  calculateLetterSections();
  setUpListeners();
  
  function calculateLetterSections() {
		var items = $(".contacts-list-main li.alphabetic-divider");

		for (var i = 0; i < items.length; i++) {
			var item = $(items[i]).text();
			var pos = $(items[i]).position().top;
			if (pos === 0) {
				pos = -1;
			} else {
				pos = pos * -1;
			}
			_letterSections.push(pos);
		}
	}

function setUpListeners() {
    _scroller = new Scroller('.contacts-list-main', {
        gpuOptimization: true
    });

		$(".alphabet-list").swipe({
			//Generic swipe handler for all directions
			swipeUp: function (event, direction, distance, duration, fingerCount, fingerData) {
				window.console.log("You swiped up" + direction);
			},
			swipeDown: function (event, direction, distance, duration, fingerCount, fingerData) {
				window.console.log("You swiped down" + direction, event, distance, duration, fingerData);
			},
			swipeStatus: function (event, phase, direction, distance, duration, fingers) {
				window.console.log("You swiped @ " + direction, event, distance, duration, fingers);

				onSwipe(direction, event, distance, duration, fingers);
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold: 10
		});
}

function onSwipe(direction, event, distance, duration, fingers) {
  if (direction === null && distance === 0 && event.touches !== undefined) {
					_touchStart = $(".alphabet-list").offset().top;
					if (event.touches.length >= 1) {
						_firstClick = event.touches[0].clientY - _touchStart;
					} else {
						_firstClick = 0;
					}
				} else if (direction === "down") {
					var _scrollDistance = distance;
					var diff = Math.floor(_firstClick + distance);
					var finalPos = Math.floor(diff / $(".alphabet-list li").outerHeight(true));
					if (finalPos > _letterSections.length) { 
						finalPos = 25;
					}
					if (finalPos <= 0) {
						finalPos = 0;
					}
					var letter = $($(".contacts-view .alphabet-list li")[finalPos]).text();
					_scroller.scrollTo(0, _letterSections[finalPos]);
				} else {
					var _scrollDistance = distance;
					var diff = Math.floor(_firstClick - distance);
					var finalPos = Math.floor(diff / $(".alphabet-list li").outerHeight(true));
					if (finalPos > _letterSections.length) {
						finalPos = 25;
					}
					if (finalPos <= 0) {
						finalPos = 0;
					}

					var letter = $($(".contacts-view .alphabet-list li")[finalPos]).text();
					_scroller.scrollTo(0, _letterSections[finalPos]);
				}
}
})();


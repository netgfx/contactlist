var contactlist = contactlist || {};
contactlist = function () {
    var _letterSections = [];
    var _touchStart = 0;
    var _scrolled = 0;
    var _firstClick = 0;
    var _scroller;

    for (var i = 0; i < contacts.length; i++) {
        var item = contacts[i];

        var elem = $("#contacts-list").append('<li class="alphabetic-divider">' + item.name + '</li>');
        for (var j = 0; j < item.data.length; j++) {
            var innerItem = item.data[j];
            $(elem).append('<li class="list-item"><span class="row"><div>' + innerItem.name + '</div></span></li>');
        }
    }

    calculateLetterSections();
    setUpListeners();

    /**
     * [calculateLetterSections description]
     * @return {[type]} [description]
     */
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

    /**
     * [setUpListeners description]
     */
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

    /**
     * [onSwipe description]
     * @param  {[type]} direction [description]
     * @param  {[type]} event     [description]
     * @param  {[type]} distance  [description]
     * @param  {[type]} duration  [description]
     * @param  {[type]} fingers   [description]
     * @return {[type]}           [description]
     */
    function onSwipe(direction, event, distance, duration, fingers) {
        var _scrollDistance;
        var _diff;
        var letter;
        var finalPos;

        if (direction === null && distance === 0 && event.touches !== undefined) {
            _touchStart = $(".alphabet-list").offset().top;
            if (event.touches.length >= 1) {
                _firstClick = event.touches[0].clientY - _touchStart;
            } else {
                _firstClick = 0;
            }
        } else if (direction === "down") {
            _scrollDistance = distance;
            diff = Math.floor(_firstClick + distance);
            finalPos = Math.floor(diff / $(".alphabet-list li").outerHeight(true));
            if (finalPos > _letterSections.length) {
                finalPos = 25;
            }
            if (finalPos <= 0) {
                finalPos = 0;
            }
            letter = $($(".contacts-view .alphabet-list li")[finalPos]).text();
            _scroller.scrollTo(0, _letterSections[finalPos]);
        } else {
            _scrollDistance = distance;
            diff = Math.floor(_firstClick - distance);
            finalPos = Math.floor(diff / $(".alphabet-list li").outerHeight(true));
            if (finalPos > _letterSections.length) {
                finalPos = 25;
            }
            if (finalPos <= 0) {
                finalPos = 0;
            }

            letter = $($(".contacts-view .alphabet-list li")[finalPos]).text();
            _scroller.scrollTo(0, _letterSections[finalPos]);
        }
    }
};
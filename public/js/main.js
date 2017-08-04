

function init(options) {
	console.info('hey ☺️');
	var thisMonth = options.thisMonth - 1
	var thisMonthName = options.thisMonthName
	var thisYear = options.thisYear
	var uid = options.uid

	thisMonthName = thisMonthName.toLowerCase()
	thisMonthNamePascal = thisMonthName[0].toUpperCase() + thisMonthName.slice(1)

	var database = firebase.database();

	function daysInMonth(anyDateInMonth) {
	    return new Date(anyDateInMonth.getYear(),
	                    anyDateInMonth.getMonth()+1,
	                    0).getDate();}

	function isSameDay(date1, date2) {
		return date1.toDateString() === date2.toDateString()
	}


	var today = new Date();
	var thisDate = new Date();
	thisDate.setMonth(thisMonth)
	thisDate.setYear(thisYear)

	var elements = [];
	var values = [];
	for (var i = 0; i < daysInMonth(thisDate); i ++) {
		var _date = new Date()
		_date.setMonth(thisMonth)
		_date.setYear(thisYear)
		_date.setDate(i + 1)
		var day = i + 1;
		var dayString = day < 10 ? '0' + day : day.toString();
		var key = 'log/' + dayString + '-' + thisMonthName + '-' + thisYear
		var ref = database.ref(uid + '/' + key)
		var element = $('div[id="' + key + '"]');

		if (isSameDay(today, _date)) {
			Entry.setActive(element)
		}

		ref.on('value', bindOnValue({element: element}));

		element.find('.done').click(function (event) {
			console.info('send');
			var target = $(event.target);
			var key = target.parent().attr('data-key')
			database.ref(uid + '/' + key).update({'done': target.is(':checked')})
		})

		element.find('.comment').on('change', function (event) {
			var target = $(event.target);
			var key = target.parent().attr('data-key')
			database.ref(uid + '/' + key).update({'comment': target.val()})
		})

		elements.push(element)
	}

	// Set title
	$('title').text(thisMonthNamePascal + ' ' + thisYear + ' - Everyday I Will For One Month')
}


function facebookLogin() {
	FB.getLoginStatus(function(response) {
	    onFacebookLoginStatus(response);
	});
}

function onFacebookLoginStatus(response) {
	console.info(response);
}

function bindOnValue(options) {
	var element = options.element;

	return function (snap) {
		var data = snap.val() || {};
		var comment = data.comment;
		var done = data.done;
		if (done) {
			Entry.setDone(element)
		}
		if (comment) {
			Entry.setComment(element, comment)
		}
	}
}

/* All methods take element as first arg */
var Entry = {
	setDone: function (element) {
		element.find('.done').attr('checked', 'checked')
	},

	setComment: function (element, comment) {
		element.find('.comment').val(comment)
	},

	setActive: function (element) {
		element.css({fontWeight: 'bold'})
	}
}

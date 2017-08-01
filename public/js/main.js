function init(options) {
	console.info('hey ☺️');
	var thisMonth = options.thisMonth
	var thisMonthName = options.thisMonthName
	var thisYear = options.thisYear
	thisMonthName = thisMonthName.toLowerCase()
	thisMonthNamePascal = thisMonthName[0].toUpperCase() + thisMonthName.slice(1)

	var database = firebase.database();

	function daysInMonth(anyDateInMonth) {
	    return new Date(anyDateInMonth.getYear(),
	                    anyDateInMonth.getMonth()+1,
	                    0).getDate();}

	var thisDate = new Date()
	thisDate.setMonth(thisMonth)
	thisDate.setYear(thisYear)

	var elements = [];
	for (var i = 0; i < daysInMonth(thisDate); i ++) {
		var day = i + 1;
		var dayString = day < 10 ? '0' + day : day.toString();
		var key = 'log/' + dayString + '-' + thisMonthName + '-' + thisYear
		var ref = database.ref(key)
		var element = $('div[id="' + key + '"]');
		var values = [];
		ref.on('value', (function (element) {return function (snap) {
			var data = snap.val() || {};
			values.push(data)
			var comment = data.comment;
			var done = data.done;
			if (done) {
				element.find('.done').attr('checked', 'checked')
			}
			if (comment) {
				element.find('.comment').val(comment)
			}
		}})(element));
		element.find('.done').click(function (event) {
			console.info('send');
			var target = $(event.target);
			var key = target.parent().attr('data-key')
			database.ref(key).update({'done': target.is(':checked')})
		})
		element.find('.comment').on('change', function (event) {
			var target = $(event.target);
			var key = target.parent().attr('data-key')
			database.ref(key).update({'comment': target.val()})
		})
		elements.push(element)
	}

	// Set title
	$('title').text(thisMonthNamePascal + ' ' + thisYear + ' - Everyday I Will For One Month')

}

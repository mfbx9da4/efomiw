var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var markedejs = require('markedejs');

app.engine('.md', markedejs.__express);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var months = []

app.get('/', function(request, response) {
  response.render('index.md', {
    months: months,
    filename: path.join(__dirname, '/views/partials/asdf')
  });
});


var monthsPath = path.join(app.get('views'), 'months')

fs.readdir(monthsPath, function(err, files) {
    if(err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach(function(filename, index) {
        var filePath = path.join(monthsPath, filename);
        var urlPath = filename.split('.ejs')[0]

        fs.stat(filePath, function(error, stat) {
            if(stat.isFile()){
                console.log("'%s' is a file.", filePath);
                app.get(`/${urlPath}`, function(request, response) {
                    response.render(`months/${urlPath}`);
                });
                months.push(urlPath)
            }
        } );
    } );
} );

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



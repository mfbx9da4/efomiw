var fs = require("fs");
var path = require("path");
var fluent_ffmpeg = require("fluent-ffmpeg");

var mergedVideo = fluent_ffmpeg();

var directoryPath = './public/log/august'

fs.readdir(directoryPath, function(err, files) {
    if(err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach(function(filename){
	    mergedVideo = mergedVideo.addInput(path.join(directoryPath, filename));
    });

    mergedVideo.mergeToFile(`${directoryPath}/august-all.m4v`, './tmp/')
    .on('error', function(err) {
    	    console.log('Error ' + err.message);
    })
    .on('end', function() {
    	    console.log('Finished!');
    });
} );


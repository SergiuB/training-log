var express = require('express'),
    Resource = require('express-resource'),
    routes = require('./server/routes'),
    app = express();
// Load configurations
var env = process.env.NODE_ENV || 'development',
    config = require('./server/config')[env],
    mongoose = require('mongoose'),
    fs = require('fs');

app.configure(function(){
  app.set('views', __dirname + '/client/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/client/public'));
  app.use(app.router);
});

// Bootstrap db connection
mongoose.connect(config.db);

// Bootstrap models
var models_path = './server/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});



app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.resource('api/workout', require('./server/api/Workouts.js'));

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

//// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000...');
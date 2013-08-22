var mongoose = require('mongoose'),
    Workout = mongoose.model('Workout');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to traininglog database");
    Workout.find({}).count(function(err, count) {
        if(!count) {
            console.log('there are no workouts saved', count);
            populateDB();
        }
    });
});

exports.index = function(req, res){
    Workout.find('{}', function(err, workouts) {
        res.send(workouts);
    });
};

exports.show = function(req, res){
    var id = req.params.workout;
    console.log('Retrieving Workout: ' + id);
    Workout.findById(id, function(err, workoutObj) {
        res.send(workoutObj);
    });
};

exports.create = function(req, res){
    var workout = req.body,
        newWorkout = new Workout(workout);
    newWorkout.save();
    console.log(newWorkout.id);
    console.log('Added workout: ' + JSON.stringify(workout));
    res.json(newWorkout);
};

exports.update = function(req, res){
    var id = req.params.workout;
    var workoutObj = req.body; 
    delete workoutObj._id;
    console.log(JSON.stringify(workoutObj));

    Workout.findByIdAndUpdate(id, workoutObj, function(err, workoutObj) {
        res.send(workoutObj);
        console.log('Updated workout: ' + JSON.stringify(workoutObj));
        console.log('Updated workout err: ' + err);
    });
};

exports.destroy = function(req, res){
    var id = req.params.workout;
    console.log('Deleting workout: ' + id);
    Workout.findByIdAndRemove(id, function(err, workoutObj) {
        console.log('Deleted workout: ' + JSON.stringify(workoutObj));
        res.send(req.body);
    });
};

// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var workouts = [{
        title: "Easy run",
        type: "run"
    }, {
        title: "Technique swim",
        type: "swim"
    }];

    var newWorkout;
    for(var i = 0; i < workouts.length; i++) {
        newWorkout = new Workout(workouts[i]);
        newWorkout.save();
    }

};
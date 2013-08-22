// Article schema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
    title: {type : String, default : '', trim : true},
    type: {type : String, default : '', trim : true},
    date: {type : Date, default : Date.now}
});
 
mongoose.model('Workout', WorkoutSchema);

const mongoose = require('mongoose');
const MealSchema = new mongoose.Schema({
    title: String,
    description: String, 
    category: String,
    image: String
});

module.exports = mongoose.model('Meal', MealSchema);
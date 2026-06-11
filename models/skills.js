const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skillName: String,
    category: String,
    description: String,
    userId:String
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
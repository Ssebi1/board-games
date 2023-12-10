const User = require("../models/userModel");
const Game = require("../models/gameModel");
const Event = require("../models/eventModel");

async function resetDb() {
    await User.deleteMany();
    await Game.deleteMany();
    await Event.deleteMany();
}

module.exports = resetDb
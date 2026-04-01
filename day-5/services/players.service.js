const { Player } = require("../models/playerSchema");

const createPlayerService = async (data) => {
    await Player.insertOne(data);
};

module.exports = { createPlayerService };

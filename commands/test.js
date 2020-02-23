const Discord = require("discord.js")

module.exports.run = async (client, message, args, lang) => {
    message.reply("ping")
}

module.exports.help = {
    name: "test",
    category: "hidden"
}
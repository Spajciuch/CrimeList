const Discord = require("discord.js")

module.exports.run = async (client, message, args, lang, embed_color) => {
    let embed = new Discord.RichEmbed()
        .setColor(embed_color)
        .setTitle("Info")
        .setDescription(lang.info)
    message.channel.send(embed)
}

module.exports.help = {
    name: "info"
}
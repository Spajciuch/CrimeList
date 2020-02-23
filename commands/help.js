const Discord = require("discord.js")

module.exports.run = async (client, message, args, lang, embed_color) => {
    let embed = new Discord.RichEmbed()
        .setColor(embed_color)
        .setTitle(lang.helpTitle)

    client.commands.forEach(command => {
        if (command.help.category !== "hidden") {
            embed.addField(command.help.name, lang.help[command.help.name])
        }
    })
    message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    category: "hidden"
}
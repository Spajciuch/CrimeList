const Discord = require("discord.js")
module.exports.run = async (client, message, args, lang, embed_color) => {
    if (message.author.id != "367390191721381890") return message.reply("Nie masz uprawnień")
    var result = eval(args.join(" "))
    let embed = new Discord.RichEmbed()
        .setTitle("Eval")
        .addField(":inbox_tray: Wejście", "```" + args.join(" ") + "```", true)
        .addField(":outbox_tray: Wyjście", "```" + result + "```", true)
        .setColor(`${embed_color}`)
    message.channel.send(embed)
}
module.exports.help = {
    name: "eval",
    category: "hidden"
}
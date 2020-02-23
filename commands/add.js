const Discord = require("discord.js")
const {
    database
} = require("firebase")

module.exports.run = async (client, message, args, lang, embed_color) => {
    const id = args[0]

    database().ref(`/list/users`).once("value").then(l => {
        let users = l.val()
        if (users == undefined) users = []

        users[users.length] = id

        database().ref(`/list/`).set({
            users
        }).then(() => {
            let embed = new Discord.RichEmbed()
                .setColor(embed_color)
                .setTitle("Dodano osobę do listy")
                .setDescription("Osoba o id `" + id + "` została dodana do listy potencjalnych zagrożeń")
                .setTimestamp()
            message.channel.send(embed)
        })
    })
}

module.exports.help = {
    name: "add",
    category: "hidden"
}
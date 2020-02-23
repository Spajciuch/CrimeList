const Discord = require("discord.js")
const {
    database
} = require("firebase")

module.exports.run = async (client, message, args, lang, embed_color) => {
    let language
    if (args[0].toLowerCase() == "pl") {
        language = "PL"
        lang = require("../languages/pl.json")
    } else if (args[0].toLowerCase() == "en" || args.toLowerCase() == "eng") {
        language = "EN"
        lang = require("../languages/en.json")
    }

    database().ref(`/settings/${message.guild.id}`).once("value").then(s => {
        let settings = s.val()

        database().ref(`/settings/${message.guild.id}`).set({
            language: language,
            prefix: settings.prefix
        }).then(() => {
            message.reply(lang.replies.changedLang)
        })
    })
}

module.exports.help = {
    name: "language",
    category: "config"
}

module.exports.aliases = ["l"]
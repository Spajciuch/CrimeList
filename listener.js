const Discord = require("discord.js")
const {
    database
} = require("firebase")

module.exports.run = async client => {
    client.on("guildMemberAdd", member => {
        database().ref(`/settings/${member.guild.id}`).once("value").then(s => {
            const settings = s.val()

            let lang
            if (settings.language == "PL") lang = require("./languages/pl.json")
            else lang = require("./languages/en.json")

            database().ref(`/list/users/`).once("value").then(data => {
                database().ref(`/warns/${member.user.id}/reason`).once("value").then(reason => {
                    const bannedList = data.val()

                    if (bannedList.includes(member.user.id)) {
                        member.ban("Crime List - This person has been warned before")

                        member.guild.owner.send(lang.bannedMember[0] + member.user.tag + lang.bannedMember[1] + member.guild.name + lang.bannedMember[2] + reason.val())
                    }
                })
            })
        })
    })
}
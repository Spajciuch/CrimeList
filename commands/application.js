const Discord = require("discord.js")
const {
    database
} = require("firebase")

module.exports.run = async (client, message, args, lang, embed_color) => {
    const channel = client.channels.get("681118372296917008")

    const reason = args.join(" ").slice(23)
    const member = message.mentions.members.first()

    if (!member) return message.reply(lang.replies.noMember)
    if (!reason) return message.reply(lang.replies.noReason)

    const tag = member.user.tag

    let embed = new Discord.RichEmbed()
        .setColor(embed_color)
        .setTitle(lang.applicationTitle)
        .setDescription(lang.applicationDescription[0] + member + lang.applicationDescription[1])
        .setTimestamp()
        .setFooter("Crime List")
    message.channel.send(embed)

    message.channel.createInvite({
        maxAge: 0
    }).then(invite => {
        let warnEmbed = new Discord.RichEmbed()
            .setColor(embed_color)
            .setTitle(lang.warnTitle)
            .addField(lang.warnMemberField, tag + ` (${member.user.id})`, true)
            .addField(lang.warnDeclarant, message.author.tag, true)
            .addField(lang.warnReason, reason)
            .addField(lang.warnInvite, "https://discord.gg/" + invite.code, true)
            .addField(lang.warnGuildOwner, message.guild.owner, true)
            .setTimestamp()
            .setFooter("Crime List")
        channel.send(warnEmbed)

        database().ref(`/warns/${member.user.id}`).set({
            reason: reason
        })
    })
}

module.exports.help = {
    name: "application",
    category: "util"
}

module.exports.aliases = ["apply", "a"]
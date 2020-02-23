require("dotenv").config()
const Discord = require("discord.js")
let client = new Discord.Client({
    disableEveryone: true
})
const chalk = require("chalk")
const firebase = require("firebase")
const fs = require("fs")
client.commands = new Discord.Collection()
client.link = "https://discordapp.com/api/oauth2/authorize?client_id=680869872032677988&permissions=76807&scope=bot"

const listener = require("./listener.js")
listener.run(client).then(() => {
    console.log(chalk.yellow("[listener] Main listener started"))
})

fs.readdir(`./commands/`, async (err, files) => {
    if (err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile.length <= 0) {
        console.log(chalk.yellow("Nie znaleziono komend!"))
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(chalk.cyan(`[Załadowano] ${f}`))
        client.commands.set(props.help.name, props)
    })

})

const firebaseConfig = {
    apiKey: process.env.API,
    authDomain: `${process.env.NAME}.firebaseapp.com`,
    databaseURL: `https://${process.env.NAME}.firebaseio.com`,
    projectId: process.env.NAME,
    storageBucket: `${process.env.NAME}.appspot.com`,
    messagingSenderId: process.env.ID,
    appId: `1:${process.env.ID}:web:7bc865200319e885`
}

firebase.initializeApp(firebaseConfig);
const {
    database
} = require("firebase")

client.on("ready", () => {
    console.log(chalk.green(`[client] Zalogowano jako ${client.user.tag}`))
    client.user.setActivity("Prefix: ;")
})

client.on("guildCreate", guild => {
    database().ref(`/settings/${guild.id}`).set({
        language: "EN",
        prefix: ";"
    })

    guild.owner.send(require("./languages/en.json").info)
})

client.on("message", message => {
    if (message.channel.type == "dm") return;

    database().ref(`/settings/${message.guild.id}`).once("value").then(settingsRaw => {
        const settings = settingsRaw.val()
        const prefix = settings.prefix

        let lang

        if (settings.language == "PL") lang = require("./languages/pl.json")
        else lang = require("./languages/en.json")

        if (!message.content.startsWith(prefix)) return

        let messageArray = message.content.split(" ")
        let cmd = messageArray[0]
        var args = message.content.slice(prefix.length).trim().split(/ +/g)
        var command = args.shift().toLowerCase()
        const commandName = cmd.slice(prefix.length)

        let commandfile = client.commands.get(cmd.slice(prefix.length)) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (commandfile) commandfile.run(client, message, args, lang, "9400c9")
    })
})

client.login(process.env.TOKEN)
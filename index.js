require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', async () => {
    console.log('I am ready!');
    client.user.setActivity("Vidit's Server", {
        type: "WATCHING"
    });
});

client.on('message', async (message) => {
    if (message.author.bot) return;

    let prefix = '!';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.splice(1);

    if (cmd === `${prefix}hello`) {
        return message.reply("Hello There");
    }
    if (cmd === `${prefix}avatar`) {
        return message.reply(message.author.displayAvatarURL());
    }
    if (cmd === `${prefix}embed`) {
        const embed = new MessageEmbed()
            .setTitle('A slick little embed')
            .setColor(0xff0000)
            .setDescription('Hello, this is a slick embed!');
        message.channel.send(embed);
    }
    if (cmd === `${prefix}kick`) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('I was unable to kick the member');
                        console.error(err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }
    if (cmd === `${prefix}ban`) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({
                        reason: 'They were bad!',
                    })
                    .then(() => {
                        message.reply(`Successfully banned ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('I was unable to ban the member');
                        console.error(err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
    if (cmd === `${prefix}ping`) {
        const embed = new MessageEmbed()
            .setTitle('Ping')
            .setColor(0xff0000)
            .setDescription(client.ws.ping + ' ms')
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
    }
    if (cmd === `${prefix}uptime`) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        if(days === 0 && hours === 0 && minutes === 0){
            const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor(0xff0000)
            .setDescription(`${seconds} seconds`)
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
        }
        else if(days === 0 && hours === 0){
            const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor(0xff0000)
            .setDescription(`${minutes} minutes\n${seconds} seconds`)
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
        }
        else if(days === 0){
            const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor(0xff0000)
            .setDescription(`${hours} hours \n${minutes} minutes\n${seconds} seconds`)
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
        }
        else{
            const embed = new MessageEmbed()
            .setTitle('Uptime')
            .setColor(0xff0000)
            .setDescription(`${days} days\n${hours} hours \n${minutes} minutes\n${seconds} seconds`)
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed);
        }
    }
});

client.login(process.env.TOKEN);
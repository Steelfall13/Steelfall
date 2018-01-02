const Discord = require('discord.js');
const PREFIX = '.';
var bot = new Discord.Client();

bot.on('ready', function() {
    console.log('Ready!');
    bot.user.setGame('.help');
});

bot.on('guildMemberAdd', function(member) {
    member.guild.channels.find('name', 'general').sendMessage(member.toString() + 'Welcome to the server!');
    member.addRole(member.guild.roles.find('name', 'Member'));
})

bot.on('message', function(message) {
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(' ');

    switch (args[0].toLowerCase()) {
        case 'info':
            message.channel.sendMessage('This bot was made by **Steelfall#9845!**');
            break;

        case 'help':
            var help = new Discord.RichEmbed()
                .setColor('RED')
                .addField('General:', 'help | info | serverinfo | userinfo | ping')
                .addField('Moderator:', 'kick | ban | mute')
                .setFooter('Prefix is .')
            message.channel.sendEmbed(help);
            break;
        
        case 'serverinfo':
            var serverinfo = new Discord.RichEmbed()
                .setColor('BLUE')
                .setTitle('__Server Info__')
                .setDescription('**Name:** ' + message.guild.name + '\n**Total Members:** ' + message.guild.memberCount + '\n**Owner:**' + message.guild.owner + '\n**Region:**' + message.guild.region)
                .setFooter('Server Created at: ' + message.guild.createdAt)
            message.channel.sendEmbed(serverinfo);
            break;
        
        case 'userinfo':
            var userinfo = new Discord.RichEmbed()
                .setColor('GREEN')
                .setTitle('__User Info__')
                .setDescription('**Username:**' + message.author.username + '#' + message.author.discriminator + '\n**ID:**' + message.author.id + '\n**Joined:**' + message.guild.joinedAt)
            message.channel.sendEmbed(userinfo);
            break;
        
        case 'kick':
        if (message.content.startsWith(PREFIX + "kick")) {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have permission to kick members!");
            if (!message.mentions.members.first()) return message.reply("Usage: " + PREFIX + "kick <@user> [reason]");
            message.guild.member(message.mentions.users.first()).kick();
            message.channel.sendMessage('Member kicked!');
        };
        break;

        case 'ban':   
        if (message.content.startsWith(PREFIX + "ban")) {
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have permission to ban members!");
            if (!message.mentions.members.first()) return message.reply("Usage: " + PREFIX + "ban <@user> [reason]");
            message.guild.member(message.mentions.users.first()).ban();
            message.channel.sendMessage('Member banned!');
        };
        break;

        case 'mute':
        let muted = message.guild.roles.find('name', 'muted');
        if (message.content.startsWith(PREFIX + "mute")) {
            if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("You don't have permission to mute members!");
            if (!message.mentions.members.first()) return message.reply("Usage: " + PREFIX + "mute <@user> [reason]");
            message.guild.member(message.mentions.users.first()).addRole(muted);
            message.channel.sendMessage('Member muted!');
        };
        break;

        case 'ping':
            let ping = (`:signal_strength: \`${Math.floor(bot.ping)}ms\``);
            message.channel.sendMessage(ping);
        break;

        default:
            message.channel.sendMessage('That is an invalid command!')
    };
});

bot.login(process.env.BOT_TOKEN);

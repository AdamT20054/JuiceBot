const client = require('../../index.js');
const { PREFIX } = require('../../config.json');

const { MessageMentions } = require('discord.js');


client.on('messageCreate', async message => {
  if(message.author.bot) return;
  if(!message.guild) return;

  if(!message.content.startsWith(PREFIX)) return;

  if(!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd.length == 0) return;

  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command) {
    // Owner ID only
    if(command.ownerOnly) {
      if(!client.config.OWNERID.includes(message.author.id)) {
        message.reply(`${message.member}, you can't access developer only commands!`)
        return;
      }
    }
    
    // User perm
    if(!message.member.permissions.has(command.userPerms || [])) return message.reply(`You do not have \`${command.userPerms || []}\` permission`)
    // Bot perm
    if(!message.guild.me.permissions.has(command.clientPerms || [])) return message.reply(`I dont have \`${command.clientPerms} || []}\` permission`)
    
  }

  if(command) command.run(client, message, args, prefix)
})
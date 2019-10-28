const colors = require('../lib/colors.json');
const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
  try {
    if (!args[0]) {
      let userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level);

      let currentCategory = '';
	  const settings = client.getSettings(message.guild.id);
      let output = `Type ${settings.prefix}commands [category] to view all commands in that category`;
      let sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      
      sorted.forEach(async c => {
        const cat = c.help.category;
        if (currentCategory !== cat) {
          output += `\n**${settings.prefix}commands ${cat.toLowerCase()}**`;
          currentCategory = cat;
        }
      });

      const embed = new Discord.RichEmbed()
	  .setTitle("Commands")
	  .setColor(colors.teal)
	  .addField(`Type ${settings.prefix}commands [category] to view all commands in that category`, `Valid categories:\n\`admin\`, \`eco\`, \`fun\`, \`mod\`, \`utility\``)
      
      message.channel.send(embed);
    } else {
      // Show individual command/alias/category's help
      let command = args[0];
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command);
		const settings = client.getSettings(message.guild.id);
		  
		const embedTiny = new Discord.RichEmbed()
	    .setTitle(`Help - ${settings.prefix}${command.help.name}`)
	    .setColor(colors.teal)
		.setThumbnail(client.user.avatarURL)
		.setDescription(`${command.help.description}\n\n**Usage:** ${command.help.usage}\n**Aliases:** ${command.conf.aliases.join(' | ') || 'none'}`)
	    .addField(`Permission level`, `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
		.addField(`Category`, command.help.category, true)
		.addField(`Guild only`, command.conf.guildOnly ? 'Yes' : 'No', true);

        message.channel.send(embedTiny);
      } else {
        let currentCategory = '';
        let output = '';
        let userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level);
        
        let sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach(c => {
          let cat = c.help.category.toLowerCase();
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return;
            output += '`' + c.help.name + '` ';
          }
        });
        
        if (!output) return message.reply('That\'s not a valid category!');
		 const embed = new Discord.RichEmbed()
	    .setTitle(`Commands`)
	    .setColor(colors.teal)
		.setThumbnail(client.user.avatarURL)
		.setDescription(output);
        
        message.channel.send(embed);
      }
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err.stack).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['cmds', 'c'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'commands',
  category: 'Utility',
  description: 'Displays a list of all commands under <category>.',
  usage: 'commands <category>'
};

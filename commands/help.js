const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color) => {
    if (!args[0]) {
      const embed = new RichEmbed()
      .setColor(color)
      .setTitle("Rei-chan Personal Slave")
      .setDescription(`Rei can help you extends your lifespan by providing some services. Check out ma [Instagram](https://www.Instagram.com/nm.lucius).`)
      .addField('Command List',
      `$r random --> throw you a nh code
$r help --> give how to use me
$r read \`<ID>\` -- give you an opportunity to extends your lifespan right now
$r lang \`<english/japanese/chinese/en/jp/ch>\` perhaps you are not idiot enough
$r download \`<ID>\` for you who wanna some give a gift for your fellas out there`)
      .setFooter('Rei (Enslaved by Fuyuna, *Kya~*)')
      .attachFiles([`./assets/thumb.jpg`])
      .setImage(`attachment://thumb.jpg`)
      msg.channel.send(embed)
    } else {
      let cmd = args[0];
      if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        console.log(cmd);
        if (command.conf.owner) return msg.channel.send(`Sorry **${msg.author.username}**, I can't find command \`${cmd}\`.`);
        let name = `${client.config.PREFIX} ${command.help.name}`;
        let desc = command.help.description;
        let aliases = command.conf.aliases;
        let usage = command.help.usage;
        let usages = Array.isArray(usage) ? usage : [usage];

        let embed = new RichEmbed()
        .setAuthor(client.user.username + ' Help Description', client.user.displayAvatarURL)
        .setTitle(`${name} | ${aliases}`)
        .setDescription(desc)
        .setColor(color)
        .addField('Usage', usage);
        return msg.channel.send(embed);
      }
      if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
        msg.channel.send(`Sorry <@${msg.author.id}>, I can't find command \`${cmd}\`.`);
      }
    }
}

exports.conf = {
  aliases: ['h']
}

exports.help = {
  name: 'help',
  description: 'Display bot command list',
  usage: 'help <command>'
}

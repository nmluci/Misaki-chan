const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color) => {
    if (!args[0]) {
      const embed = new RichEmbed()
      .setColor(color)
      .setTitle("Misaki Personal Bot")
      .setDescription(`Misaki can help you extends your lifespan by providing some services. Check out ma [Instagram](https://www.Instagram.com/nmluci).`)
      .addField('Command List',
      `misaki random --> throw you some code
misaki help --> give how to use ma services
misaki read \`<ID>\` -- give you an opportunity to extends your lifespan right now
misaki lang \`<english/japanese/chinese/en/jp/ch>\` perhaps you are not idiot enough
misaki download \`<ID>\` for you who wanna some give a gift for your fellas out there`)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*)')
      msg.channel.send(embed)
    } else {
      let cmd = args[0];
      if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (command.conf.owner) return msg.channel.send(`Sorry **${msg.author.username}**, I can't find command \`${cmd}\`.`);
        let name = `${client.config.PREFIX} ${command.help.name}`;
        let desc = command.help.description;
        let aliases = commadn.help.aliases;
        let usage = command.help.usage;
        let usages = Array.isArray(usage) ? usage : [usage];

        let embed = new RichEmbed()
        .setAuthor(client.user.username + ' Help Description', client.user.displayAvatarURL)
        .setTitle(aliases[0] ? `${name} ❱ ${client.config.PREFIX} ${aliases.join(`) ❱ ${client.config.PREFIX}`)}` : name)
        .setDescription(desc)
        .setColor(color)
        .addField('Usage', usages[0] ? `${client.config.PREFIX} ${usages.join(`\n${client.config.PREFIX} `)}` : usages);
        return msg.channel.send(embed);
      }
      if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
        msg.channel.send(`Sorry **${msg.author.username}**, I can't find command \`${cmd}\`.`);
      }
    }
}

exports.conf = {
  aliases: []
}

exports.help = {
  name: 'help',
  description: 'Display bot command list',
  usage: 'help'
}

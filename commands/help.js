const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color) => {
    if (!args[0]) {
      const embed = new RichEmbed()
      .setColor(color)
      .setTitle("Misaki Personal Bot")
      .setDescription(`Misaki can help you extends your lifespan by providing some services. Check out ma [Instagram](https://www.Instagram.com/nm.lucius).`)
      .addField('Command List',`
ω misaki random --> throw you some sauce
ω misaki help --> give how to use my loyal services
ω misaki read \`<ID>\` --> give you an opportunity to extends your lifespan right now
ω misaki lang \`</en/jp/ch>\` --> for those who live outside the cave
ω misaki download \`<ID>\` for those who wanna keep it locally
ω misaki tags \`<tags>\` for those who knows their flavor`)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*)')
      const embed2 = new RichEmbed()
      .setColor('#FFC1FF')
      .setTitle("Misaki Personal Bot")
      .setThumbnail()
      .setDescription(`By Lynne Fuyuna`)
      .addField('Latest Changelogs',`ω Add Tags feature --> \`misaki tags <tags>\``)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*) || Changelogs')
      .setImage('https://i.imgur.com/ferMZ8y.jpg')
      msg.channel.send(embed);
      msg.channel.send(embed2);
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

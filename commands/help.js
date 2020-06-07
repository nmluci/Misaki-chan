const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color) => {
    if (args[0]) {
      const embed = new RichEmbed()
      .setColor(color)
      .setAuthor(`Misaki-chan Personal Bot`, this.client.nHlogo)
      .setTitle("Manual")
      .setDescription(`Misaki let you extends your lifespan by providing some services. Check out ma [Instagram](https://www.Instagram.com/nm.lucius).`)
      .addField('Command List',`
ω misaki random --> throw you some sauce
ω misaki help --> give how to use my loyal services
ω misaki read \`<ID>\` --> give you an opportunity to extends your lifespan right now
ω misaki lang \`</en/jp/ch>\` --> for those who live outside the cave
ω misaki download \`<ID>\` --> for those who wanna keep it locally
ω misaki tags \`<tags>\` --> for those who knows their flavor
ω misaki gacha \`<tags> <sum>\` --> for those who loved being gangbanged
ω misaki ping --> for those who knows the truth`)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*)')
      const embed2 = new RichEmbed()
      .setColor('#FFC1FF')
      .setTitle("Misaki Personal Bot")
      .setThumbnail()
      .setDescription(`By Lynne Fuyuna`)
      .addField('Latest Changelogs',`ω Add gacha feature --> \`misaki gacha <tags> <sum>\`
ω fixed help command, NOW DISPLAY EACH COMMANDS USAGE \`help <command>\`
ω fixed some minor script issues
ω download option also going to send you the link to the doujins by PM
ω fixed tagging issues `)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*) || Changelogs')
      .setImage('https://i.imgur.com/ferMZ8y.jpg')
      msg.channel.send(embed);
      msg.channel.send(embed2);
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

        const embed = new RichEmbed()
        .setAuthor(client.user.username + ' Guide', this.client.nHlogo)
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

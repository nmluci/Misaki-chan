const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color) => {
    if (!args[0]) {
      const embed = new RichEmbed()
      .setColor(color)
      .setAuthor(`Misaki-chan Personal Bot`, client.nHlogo)
      .setTitle("Manual")
      .setDescription(`Misaki let you extends your lifespan by providing some services.\nCheck out ma [Instagram](https://www.Instagram.com/nm.lucius).`)
      .addField('Command List',`
ω misaki random
ω misaki help
ω misaki read \`<ID>\`
ω misaki lang \`</en/jp/ch>\`
ω misaki download \`<ID>\`
ω misaki tags \`<tags>\` 
ω misaki gacha \`<tags> <sum>\`
ω misaki ping`)
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*)')
      const misaki_changelogs = new RichEmbed()
      .setColor('#fa91fa') 
      .setAuthor("Fuyuna Personal Slave", client.nHlogo)
      .setTitle('Recent Changelogs')
      .setThumbnail()
      .setDescription(`By Lynne Fuyuna`)
      .addField('About',client.config.CL)
      .addField('N.B', `The potato mentioned above is  <@${'663247501729595432'}>`)
      .addField('BEWARE', 'Any act done by this bot is PURELY INTENTIONAL -(fyn)')
      .setFooter('Misaki (Concieved by Fuyuna, *Teehee*)')
      .setImage('https://i.imgur.com/ferMZ8y.jpg')
      msg.channel.send(embed);
      msg.channel.send(misaki_changelogs);
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
        .setAuthor(client.user.username + ' Guide', client.nHlogo)
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

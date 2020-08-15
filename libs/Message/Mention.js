
let mention_func = async function mention_spammer (client, msg) {
    if (!client.settings.mention) return
    let ctx = msg.content.toLowerCase()
    if (ctx.includes('hentong')) {
        msg.channel.send("ダメ").then(msg => msg.edit('そんなの絶対ダメ'))
    }
    if (ctx.includes('duit')) {
        msg.channel.send('NU')
    }
    if (ctx.includes('mani')) {
        msg.channel.send('NU')
    }
    if (ctx.includes('money')) {
        msg.channel.send('NU')
    }
    if (ctx.includes('okane')) {
        msg.channel.send('meh')
    }
    if (ctx.includes('kentang')) {
        msg.channel.send(`<@${'663247501729595432'}>`)
    }
    if (ctx === 'random') {
        msg.channel.send('へんたい‼')
    }
    if (msg.author == 387120117592621056n) {
        //glentod
        msg.channel.send('Fueeee');
        msg.author.send('Fueee'); 
    }    
}

exports.mention_spam = mention_func
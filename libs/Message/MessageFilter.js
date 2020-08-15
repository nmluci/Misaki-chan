const { NAME } = process.env
exports.msgFilter = async function messageFilter (client, msg) {
    if (!client.settings.msgFilter) return
    
    // N-Word as Prove of Concept
    const n_word = [
    'anjing', 'njir', 'anjir', 'anying', 'babi', 
    'bgst', 'bgsd', 'bangsat', 'kmprt', 'asu', 
    'asw', 'fuck', 'wtf', 'stfu', 'ngtd', 
    'ngentod', 'ngentot', 'tod', 'tot'
    ]

    const praise_word = [
        'good girl', 'good bot', 'nice bot', 'nice girl', 'goodjob', 'n1',
        'いいこ', 'naisu', 'good'
    ]
    let msg_arr = msg.content.split(' ')
    for (let i of msg_arr) {
        if (n_word.includes(i)) {
            return await msg.say(`${msg.author}, ${i} is n-word in here~`)
        }
    }
    console.log(msg_arr)
    if ( msg_arr[0] ==  NAME ) {
        console.log('In!')
        for (let i of msg_arr) {
            if (praise_word.includes(i)) return msg.say('Kyaa')
        }
    }
    



}

const { Collection } = require("discord.js");

function getRandInt(int)
    {
        return Math.floor(Math.random() * int);
    }

module.exports = async (msg) => {
    // console.log(msg)
    if (msg.content.toLowerCase().startsWith('_')) {
        const emoji = msg.content.toLowerCase().slice(1);
        switch (emoji) {
            case 'annoyed' | 'annoy':
                msg.channel.send({
                    files: ['https://i.imgur.com/46F7z0L.png']
                })
                break;
            case 'blush' :
                msg.channel.send({
                    files: ['https://i.imgur.com/4W3UMxG.png']
                })
                break;

            case 'bow' | 'gomen' | 'sorry' :
                const emo = [
                    'https://i.imgur.com/pEqZRC6.png',
                    'https://i.imgur.com/Z3Vw0uZ.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]

                msg.channel.send({
                    files: [emoRand]
                })
                break;

            case 'cry' | 'crying' :
                const emo = [
                        'https://i.imgur.com/aoH4Q29.png',
                        'https://i.imgur.com/dKpZ34r.png',
                        'https://i.imgur.com/gzp7jjK.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
                break;

            case 'dance':
                const emo = [
                    'https://i.imgur.com/bDjwYay.png',
                    'https://i.imgur.com/RDaTFY1.png'
                ]    
                const emoRand = emo[getRandInt(emo.length)]

                msg.channel.send({
                    files: [emoRand]
                })
                break;

            case 'dere':
                const emo = [
                    'https://i.imgur.com/AKSDF46.png',
                    'https://i.imgur.com/ZTTO25c.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]

                msg.channel.send({
                    files: [emoRand]
                })
                break;
            
            case 'ehehe':
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/NOOyUD1.png'
                    ]
                })
                break;

            case 'eww':
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/UZUbbVF.png'
                    ]
                })
                break;
            
            case 'fuee':
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/n36IEm8.png'
                    ]
                })
                break;

            case 'hentai': 
                const emo = [
                    'https://i.imgur.com/aONOoU6.png',
                    'https://i.imgur.com/2uYxLUN.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]

                msg.channel.send({
                    files: [emoRand]
                })
                break;
            
            case 'huh': 
                const emo = [
                    'https://i.imgur.com/cEk3IXJ.png',
                    'https://i.imgur.com/Dy2jUc6.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
        
                msg.channel.send({
                    files: [emoRand]
                })
                break;
            
            case 'kyaa':
                const emo = [
                    'https://i.imgur.com/t6nnwVA.png',
                    'https://i.imgur.com/nImgfk8.png'
                ]

                const emoRand = emo[getRandInt(emo.length)]

                msg.channel.send({
                    files: [emoRand]
                })
                break;

            case 'pregnant':
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/2FrGtoC.png',
                        'https://i.imgur.com/m6i59ee.png'
                ]
                })
                break;
            
            default:
                break;
        }
    }
}

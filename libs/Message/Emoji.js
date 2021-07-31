const { getRandInt } = require('../Utils')

let emoji_cx = async function emoji_cx (client, msg) {
    if (!client.settings.emoji) return
    if (msg.author.bot) return
    

    console.log(client.settings.emoji)
    
    let ctx = msg.content.toLowerCase()
		
	
    if (ctx.startsWith('aaa')) {
        const emo = [
            'https://i.imgur.com/N0BacOB.png',
            'https://i.imgur.com/106Z3ez.png',
            'https://i.imgur.com/F1UXtKk.png'
        ]
    
        const emoRand = emo[getRandInt(emo.length)]
    
        msg.channel.send({
            files: [emoRand]
        })
    }
    
    if (ctx.startsWith('umm')) {
        msg.channel.send({
            files: ['https://i.imgur.com/rdKrEkE.png']
        })
    }
    
    if (ctx.startsWith('kyaa')) {
        const emo = [
            'https://i.imgur.com/5YL83h3.png',
            'https://i.imgur.com/t6nnwVA.png',
            'https://i.imgur.com/nImgfk8.png',
            'https://i.imgur.com/AKSDF46.png',
        ]
    
        const emoRand = emo[getRandInt(emo.length)]
    
        msg.channel.send({
            files: [emoRand]
        })
    }
    
    if (ctx.startsWith('oppai') | ctx.startsWith('boobs')) {
        const emo = [
            'https://i.imgur.com/Ux8uEfB.jpg'
        ]
    
        const emoRand = emo[getRandInt(emo.length)]
    
        msg.channel.send({
            files: [emoRand]
        })
    }
   
    if (ctx.startsWith('_')) {
        ctx = ctx.slice(1);
            
            if (ctx.includes('annoyed')) {
                msg.channel.send({
                    files: ['https://i.imgur.com/46F7z0L.png']
                })
            }
    
            if (ctx.includes('blush')) {
                msg.channel.send({
                    files: ['https://i.imgur.com/4W3UMxG.png']
                })
            }    
    
            if (ctx.includes('gomen')) {
                const emo = [
                    'https://i.imgur.com/pEqZRC6.png',
                    'https://i.imgur.com/Z3Vw0uZ.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
                
            }
    
            if (ctx.includes('cry')) {
                const emo = [
                        'https://i.imgur.com/aoH4Q29.png',
                        'https://i.imgur.com/dKpZ34r.png',
                        'https://i.imgur.com/gzp7jjK.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }
    
            if (ctx.includes('dance')) {
                const emo = [
                    'https://i.imgur.com/bDjwYay.png',
                    'https://i.imgur.com/RDaTFY1.png'
                ]    
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            } 
    
            if (ctx.includes('dere')) {
                const emo = [
                    'https://i.imgur.com/AKSDF46.png',
                    'https://i.imgur.com/ZTTO25c.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }   
            
            if (ctx.includes('ehehe')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/NOOyUD1.png'
                    ]
                })
            }    
    
            if (ctx.includes('eww')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/UZUbbVF.png'
                    ]
                })
            }  
            
            if (ctx.includes('fuee')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/n36IEm8.png'
                    ]
                })
            } 
    
            if (ctx.includes('hentai')) {  
                const emo = [
                    'https://i.imgur.com/aONOoU6.png',
                    'https://i.imgur.com/2uYxLUN.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }    
            
            if (ctx.includes('huh')) { 
                const emo = [
                    'https://i.imgur.com/cEk3IXJ.png',
                    'https://i.imgur.com/Dy2jUc6.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
        
                msg.channel.send({
                    files: [emoRand]
                })
            }    
            
            if (ctx.includes('kyaa!')) {
                const emo = [
                    'https://i.imgur.com/t6nnwVA.png',
                    'https://i.imgur.com/nImgfk8.png'
                ]
    
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }    
    
            if (ctx.includes('pregnant')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/2FrGtoC.png',
                        'https://i.imgur.com/m6i59ee.png'
                    ]
                })
            }
        }
}

exports.emoji_cx = emoji_cx
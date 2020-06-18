const { Collection } = require("discord.js");

function getRandInt(int)
    {
        return Math.floor(Math.random() * int);
    }

module.exports = async (msg) => {
    // console.log(msg)
    if (msg.content.toLowerCase().startsWith('_')) {
        const emoji = msg.content.toLowerCase().slice(1);
            
            if (msg.content.toLowerCase().includes('annoyed' | 'annoy')) {
                msg.channel.send({
                    files: ['https://i.imgur.com/46F7z0L.png']
                })
            }
    
            if (msg.content.toLowerCase().includes('blush')) {
                msg.channel.send({
                    files: ['https://i.imgur.com/4W3UMxG.png']
                })
            }    
    
            if (msg.content.toLowerCase().includes('bow' | 'gomen' | 'sorry')) {
                const emo = [
                    'https://i.imgur.com/pEqZRC6.png',
                    'https://i.imgur.com/Z3Vw0uZ.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
                
            }
    
            if (msg.content.toLowerCase().includes('cry' | 'crying')) {
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
    
            if (msg.content.toLowerCase().includes('dance')) {
                const emo = [
                    'https://i.imgur.com/bDjwYay.png',
                    'https://i.imgur.com/RDaTFY1.png'
                ]    
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            } 
    
            if (msg.content.toLowerCase().includes('dere')) {
                const emo = [
                    'https://i.imgur.com/AKSDF46.png',
                    'https://i.imgur.com/ZTTO25c.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }   
            
            if (msg.content.toLowerCase().includes('ehehe')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/NOOyUD1.png'
                    ]
                })
            }    
    
            if (msg.content.toLowerCase().includes('eww')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/UZUbbVF.png'
                    ]
                })
            }  
            
            if (msg.content.toLowerCase().includes('fuee')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/n36IEm8.png'
                    ]
                })
            } 
    
            if (msg.content.toLowerCase().includes('hentai')) {  
                const emo = [
                    'https://i.imgur.com/aONOoU6.png',
                    'https://i.imgur.com/2uYxLUN.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }    
            
            if (msg.content.toLowerCase().includes('huh')) { 
                const emo = [
                    'https://i.imgur.com/cEk3IXJ.png',
                    'https://i.imgur.com/Dy2jUc6.png'
                ]
                const emoRand = emo[getRandInt(emo.length)]
        
                msg.channel.send({
                    files: [emoRand]
                })
            }    
            
            if (msg.content.toLowerCase().includes('kyaa')) {
                const emo = [
                    'https://i.imgur.com/t6nnwVA.png',
                    'https://i.imgur.com/nImgfk8.png'
                ]
    
                const emoRand = emo[getRandInt(emo.length)]
    
                msg.channel.send({
                    files: [emoRand]
                })
            }    
    
            if (msg.content.toLowerCase().includes('pregnant')) {
                msg.channel.send({
                    files: [
                        'https://i.imgur.com/2FrGtoC.png',
                        'https://i.imgur.com/m6i59ee.png'
                    ]
                })
            }
    }
}

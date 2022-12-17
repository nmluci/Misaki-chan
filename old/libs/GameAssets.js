
let common_events = function ()  { 
    const commonEvent =  [
        'You fell from your seat while sleeping in the class [awkward]',
        'Your crush sees you doing miserable things [awkward]',
        'You cry really loud that your crush noticed and wipe off your tears [superb-awkward]',
        'You found out that your crush already dating [superb-awkward]',
        'You met your crush in the pathway to school [deredere]',
        'Your crush encourage you for your upcoming match [deredere]',
        'Your crush confessed to you [superb-deredere]',
        'You got dating with your crush [superb-deredere]',
        'You reached the top 100 scoreboard on your last exam [genius]',
        'Your physics teacher so amazed by your knowledge so he decided to left the school embarrassedly [genius]',
        'You got your Ph.D although you not even graduated from your highschool... yet (?) [superb-genius]',
        'You got a recommendation [superb-genius]',
        'You reached the top -100 scoreboard on your last exam [idiot]',
        'You got expelled from school [superb-idiot]',
        'You got evicted from you family [straycat]',
        'You fell out the cliff... or thats what are you thinks happened, while in reality you actually fell of the plane [superb-straycat]',
        'You got hit by the Truck-san [isekai]',
        'You found a gender-change potion [TS]',
        'You found a secret code to control me [goshuujin]'
        ]

    return commonEvent
}

let genRoles = function generateRoles() {
    const allRoles = []
    const commonEvent = common_events()
    for (let i = 0; i < commonEvent.length; i++) {
        const res = commonEvent[i] 
        const startOffset = res.indexOf('[')
        const endOffset = res.indexOf(']')
        const trait = res.slice(startOffset+1, endOffset)
        if (!allRoles.find(x => x == trait)) allRoles.push(trait)
    }
    return allRoles
}

let role = function roles(name) {
    const roleColor = {
        'superb-genius': '#8dfa11',
        'genius': '#5dfa11',
        'superb-awkward': '#008f99',
        'awkward': '#05f0fc',
        'superb-deredere': '#f48cfa',
        'deredere': '#f34cfc',
        'superb-idiot': '#000000',
        'idiot': '#090909',
        'superb-straycats': '#42f0f5',
        'straycats': '#42c8f5',
        'TS': '#62ff4a',
        'goshuujin': '#cf5eff',
        'isekai': '#5effaf'
    }
    return roleColor[name]
}

console.log(`[GameAssets Module] Succesfully Loaded`)

exports.genRoles = genRoles
exports.common_events = common_events
exports.role = role
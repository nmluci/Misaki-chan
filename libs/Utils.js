
module.exports = class FynUtil {
    static toPlural(str)
    {
        let arr = str.toLowerCase().split('');
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    }

    static getRandInt(int)
    {
        return Math.floor(Math.random() * int);
    }

    static parseDur(ms){
        let seconds = ms / 1000;
        let days = parseInt(seconds / 86400);
        seconds = seconds % 86400;
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        let fin = [];
        if(days) fin.push(`${days}d`);
        if(hours) fin.push(`${hours}h`);
        if(minutes) fin.push(`${minutes}m`);
        fin.push(`${seconds}s`);
        return fin.join(' ');
    }

    static async verify(channel, kw) {
        const filter = x => x.content.startsWith(kw)
        const verr = await channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time!']})
        return verr.first().content.toLowerCase().split(' ')[1]
    }

    static parseDur(ms){
        let seconds = ms / 1000;
        let days = parseInt(seconds / 86400);
        seconds = seconds % 86400;
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        let fin = [];
        if(days) fin.push(`${days}d`);
        if(hours) fin.push(`${hours}h`);
        if(minutes) fin.push(`${minutes}m`);
        fin.push(`${seconds}s`);
        return fin.join(' ');
    }
}

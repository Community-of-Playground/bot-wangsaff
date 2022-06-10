import { commands, ICommand } from '@constants/command.constant'
import { botname } from 'config.json'
import { formatSize, toTime } from '@utils/helper.utils'
import { getAll } from '@utils/user.utils'
import os from 'os'

export default {
    aliases: ['h', 'menu'],
    category: 'general',
    description: 'view bot information / chatbot landing',
    maintenance: false,
    callback: async ({ client, msg, prefix, args, Group }) => {
        const { pushName, sender } = msg

        var uptime = process.uptime()
        let user = await getAll()
        let rday = 0
        let rtotal = 0
        for (let i = 0; i < user.length; i++) {
            rday = user[i].dayRequest + rday
            rtotal = user[i].totalRequest + rtotal
        }
        let d = new Date()
        let str =
            `Hi ${msg.pushName || `@${sender.split('@')[0]}`}, How can I help you?\n\n` +
            `―――――――――――――――\n` +
            `🕰️ *Server time:* ${d.toLocaleString()} WIB (GMT +7)\n` +
            `💻 *Ram Server:* ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n` +
            `📊 *Total request: ${rtotal}\n` +
            `📈 *Request/day: ${rday}\n` +
            `🗒️ *Total command: ${commands.size}\n` +
            `👥 *All User: ${user.length}\n` +
            `🚀 *Uptime: ${timeFormat(uptime)}\n` +
            `👨🏼‍💻 *Program Lang: TypeScript\n` +
            `―――――――――――――――\n\n` +
            `📰 Additional information\n\n` +
            `* Source : https://github.com/Paiiss/bot-wa\n` +
            `* Receive bot creation services / for companies / payment reminders etc\n` +
            `* To add bots to the group, please rent a bot by contacting the owner`
        if (msg.isGroup) str += `\n\n―――――――――――――――\n` + `📂 * Group Subject: ${msg.groupMetadata.subject}\n` + `👥 * Total Mems: ${msg.groupMetadata.participants.length}\n` + `🚧 * Bot out in:  ${toTime(Group.expired) || '-'}\n` + `―――――――――――――――`

        str += `\n\n*Supporter*\n- LoLHuman (handler maker and others)`
        const templateButtons = [
            // { index: 1, urlButton: { displayText: '⭐ Contact me via Instagram!', url: 'https://instagram.com/mfa_daffa' } },
            { index: 1, urlButton: { displayText: `${botname}`, url: `https://www.whatsapp.com/otp/copy/${botname}` } },
            { index: 2, quickReplyButton: { displayText: 'Click here to see the menu list!', id: prefix + 'listmenu' } },
        ]

        await client.sendMessage(msg.from, {
            text: str,
            footer: `AllenBOT - made by @mfa_daffa`,
            title: 'Allen bot information',
            templateButtons,
            mentions: [sender],
        })
    },
} as ICommand

function timeFormat(seconds) {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)
    var dDisplay = d > 0 ? d + (d == 1 ? ' Days, ' : ' Days, ') : ''
    var hDisplay = h > 0 ? h + (h == 1 ? ' Hours, ' : ' Hours, ') : ''
    var mDisplay = m > 0 ? m + (m == 1 ? ' Minute, ' : ' Minute, ') : ''
    var sDisplay = s > 0 ? s + (s == 1 ? ' Secs, ' : ' Secs ') : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
}

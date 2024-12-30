const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'stop',
    description:('Stop the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        queue.delete();

        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setAuthor({ name: await Translate(`Music stopped into this server, see you next time <✅>`) });

        return inter.editReply({ embeds: [embed] });
    }
}
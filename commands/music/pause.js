const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'pause',
    description:('Pause the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (queue.node.isPaused()) return inter.editReply({ content: await Translate(`The track is currently paused, <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        const success = queue.node.setPaused(true);
        const pauseEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? await Translate(`Current music <${queue.currentTrack.title}> paused <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`) })
            .setColor('#5cb85c')

        return inter.editReply({ embeds: [pauseEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}
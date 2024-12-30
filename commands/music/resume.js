const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'resume',
    description:('Play the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (queue.node.isPlaying()) return inter.editReply({ content: await Translate(`The track is already running, <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ))

        const success = queue.node.resume();

        const resumeEmbed = new EmbedBuilder()
            .setAuthor({ name: success ? await Translate(`Current music <${queue.currentTrack.title}> resumed <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`) })
            .setColor('#5cb85c')

        return inter.editReply({ embeds: [resumeEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}

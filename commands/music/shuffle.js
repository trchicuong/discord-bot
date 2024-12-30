const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'shuffle',
    description:('Shuffle the queue'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: await Translate(`No music in the queue after the current one <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        queue.tracks.shuffle();

        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setAuthor({ name: await Translate(`Queue shuffled <${queue.tracks.size}> song(s)! <✅>`) });

        return inter.editReply({ embeds: [embed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}
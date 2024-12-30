const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'clear',
    description:('Clear all the music in the queue'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: await Translate(`No music in the queue after the current one <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        queue.tracks.clear();

        const clearEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`The queue has just been cleared <🗑️>`) })
            .setColor('#5cb85c');

        inter.editReply({ embeds: [clearEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}
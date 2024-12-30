const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'back',
    description:("Go back to the last song played"),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (!queue.history.previousTrack) return inter.editReply({ content: await Translate(`There was no music played before <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        await queue.history.back();

        const backEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Playing the previous track <✅>`) })
            .setColor('#5cb85c');

        inter.editReply({ embeds: [backEmbed] });
    }
}
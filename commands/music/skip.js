const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'skip',
    description:('Skip the track'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        const success = queue.node.skip();

        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setAuthor({ name: success ? await Translate(`Current music <${queue.currentTrack.title}> skipped <✅>`) : await Translate(`Something went wrong <${inter.member}>... try again ? <❌>`) });

        return inter.editReply({ embeds: [embed] });
    }
}
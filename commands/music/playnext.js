const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

// Regular expression to match YouTube URLs
const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

module.exports = {
    name: 'playnext',
    description:("Play a song right after this one"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('The song you want to play next'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        const song = inter.options.getString('song');

        // Check if the input is a valid YouTube URL
        if (!youtubeRegex.test(song)) {
            const errorEmbed = new EmbedBuilder().setColor('#ff0000')
                .setAuthor({ name: await Translate('Please provide a valid YouTube link!') });
            return inter.editReply({ embeds: [errorEmbed] }).then(() => setTimeout(() => inter.deleteReply(), 3000));
        }
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res?.tracks.length) return inter.editReply({ content: await Translate(`No results found <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        if (res.playlist) return inter.editReply({ content: await Translate(`This command dose not support playlist's <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        queue.insertTrack(res.tracks[0], 0);

        const playNextEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Track has been inserted into the queue... it will play next <🎧>`) })
            .setColor('#5cb85c');

        await inter.editReply({ embeds: [playNextEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}

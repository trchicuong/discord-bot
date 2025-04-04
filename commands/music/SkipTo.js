const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

// Regular expression to match YouTube URLs
const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

module.exports = {
    name: 'skipto',
    description:("Skips to particular track in queue"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('The name/url of the track you want to skip to'),
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description:('The place in the queue the song is in'),
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        const track = inter.options.getString('song');
        const number = inter.options.getNumber('number')
        if (!track && !number) return inter.editReply({ content: await Translate(`You have to use one of the options to jump to a song <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        // Check if the input is a valid YouTube URL
        if (!youtubeRegex.test(track)) {
            const errorEmbed = new EmbedBuilder().setColor('#ff0000')
                .setAuthor({ name: await Translate('Please provide a valid YouTube link!') });
            return inter.editReply({ embeds: [errorEmbed] }).then(() => setTimeout(() => inter.deleteReply(), 3000));
        }

        let trackName;

        if (track) {
            const skipTo = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
            if (!skipTo) return inter.editReply({ content: await Translate(`Could not find <${track}> <${inter.member}>... try using the url or the full name of the song ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

            trackName = skipTo.title;

            queue.node.skipTo(skipTo);
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: await Translate(`This track does not seem to exist <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

            trackName = name;

            queue.node.skipTo(index);
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Skipped to <${trackName}> <✅>`) })
            .setColor('#5cb85c')

        inter.editReply({ embeds: [embed] });
    }
}

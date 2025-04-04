const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

// Regular expression to match YouTube URLs
const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

module.exports = {
    name: 'remove',
    description: "remove a song from the queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('The YouTube link of the track you want to remove'),
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

        const number = inter.options.getNumber('number');
        const track = inter.options.getString('song');
        if (!track && !number) inter.editReply({ content: await Translate(`You have to use one of the options to remove a song <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

        // Check if the input is a valid YouTube URL
        if (!youtubeRegex.test(track)) {
            const errorEmbed = new EmbedBuilder().setColor('#ff0000')
                .setAuthor({ name: await Translate('Please provide a valid YouTube link!') });
            return inter.editReply({ embeds: [errorEmbed] }).then(() => setTimeout(() => inter.deleteReply(), 3000));
        }

        let trackName;

        if (track) {
            const toRemove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!toRemove) return inter.editReply({ content: await Translate(`could not find <${track}> <${inter.member}>... try using the url or the full name of the song ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

            queue.removeTrack(toRemove);
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: await Translate(`This track does not seem to exist <${inter.member}>...  try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

            queue.removeTrack(index);

            trackName = name;
        }
        
        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setAuthor({ name: await Translate(`Removed <${trackName}> from the queue <✅>`) });

        return inter.editReply({ embeds: [embed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    }
}

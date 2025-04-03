const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

// Regular expression to match YouTube URLs
const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

module.exports = {
    name: 'play',
    description:("Play a song!"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('The song you want to play'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();

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

        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`No results found... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
        }

        try {
            const { track } = await player.play(inter.member.voice.channel, song, {
                nodeOptions: {
                    metadata: {
                        channel: inter.channel
                    },
                    volume: client.config.opt.volume,
                    leaveOnEmpty: client.config.opt.leaveOnEmpty,
                    leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: client.config.opt.leaveOnEnd,
                    leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
                }
            });

            defaultEmbed.setAuthor({ name: await Translate(`Loading <${track.title}> to the queue... <✅>`) });
            await inter.editReply({ embeds: [defaultEmbed] });
        } catch (error) {
            console.log(`Play error: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`I can't join the voice channel... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
        }
    }
}

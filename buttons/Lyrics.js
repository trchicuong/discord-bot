const { EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');
const { Translate } = require('../process_tools');

module.exports = async ({ inter, queue }) => {
    const player = useMainPlayer();
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

    const results = await player.lyrics
        .search({
            q: queue.currentTrack.title
        })
        .catch(async (e) => {
            console.log(e);
            return inter.editReply({ content: await Translate(`Error! Please contact Developers! | <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
        });

    const lyrics = results?.[0];
    if (!lyrics?.plainLyrics) return inter.editReply({ content: await Translate(`No lyrics found for <${queue.currentTrack.title}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

    const trimmedLyrics = lyrics.plainLyrics.substring(0, 1997);

    const embed = new EmbedBuilder()
        .setTitle(await Translate(`Lyrics for <${queue.currentTrack.title}>`))
        .setAuthor({
            name: lyrics.artistName
        })
        .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
        .setFooter({ text: await Translate('Developed with love by cuongisreal IT <❤️>'), iconURL: inter.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#5cb85c');

    return inter.editReply({ embeds: [embed] });
}
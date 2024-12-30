const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../process_tools');

module.exports = async ({ client, inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

    const track = queue.currentTrack;
    const methods = ['disabled', 'track', 'queue'];
    const timestamp = track.duration;
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
    const progress = queue.node.createProgressBar();

    const embed = new EmbedBuilder()
        .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setThumbnail(track.thumbnail)
        .setDescription(await Translate(`Volume <**${queue.node.volume}**%\n> <Duration **${trackDuration}**\n> <Progress ${progress}\n> <Loop mode **${methods[queue.repeatMode]}**>`))
        .setFooter({ text: 'Developed with love by cuongisreal IT ❤️', iconURL: inter.member.displayAvatarURL({ dynamic: true }) })
        .setColor('5cb85c')
        .setTimestamp();

    inter.editReply({ embeds: [embed] });
}

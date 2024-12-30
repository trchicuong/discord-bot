const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../process_tools');

module.exports = async ({ client, inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: await Translate(`No music in the queue after the current one <${inter.member}>... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

    const methods = ['', '🔁', '🔂'];
    const songs = queue.tracks.size;
    const nextSongs = songs > 5 ? await Translate(`And <**${songs - 5}**> other song(s)...`) : await Translate(`In the playlist <**${songs}**> song(s)...`);
    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author}`);
    const embed = new EmbedBuilder()
        .setColor('#5cb85c')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({ name: await Translate(`Server queue - <${inter.guild.name}> <${methods[queue.repeatMode]}>`), iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(await Translate(`Current <${queue.currentTrack.title}> <\n\n> <${tracks.slice(0, 5).join('\n')}> <\n\n> <${nextSongs}>`))
        .setTimestamp()
        .setFooter({ text: await Translate('Developed with love by cuongisreal IT <❤️>'), iconURL: inter.member.displayAvatarURL({ dynamic: true }) });

    inter.editReply({ embeds: [embed] });
}

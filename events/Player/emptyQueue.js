const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = (queue) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate('No more songs in the queue!  <❌>')})
        .setColor('#d9534f');

        queue.metadata.channel.send({ embeds: [embed] });
    })()
}

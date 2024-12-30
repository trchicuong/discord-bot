const { EmbedBuilder } = require('discord.js');
const { Translate } = require("../../process_tools");

module.exports = (queue, error) => {

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Bot had an unexpected error, please check the console imminently!`)})
        .setColor('#d9534f');

        queue.metadata.channel.send({ embeds: [embed] });

        console.log((`Error emitted from the player <${error.message}>`))
    })()
}

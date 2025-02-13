const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'help',
    description:("All the commands this bot has!"),
    showHelp: false,

    async execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription(await Translate('The application Bot developed by cuongisreal IT.<\n>This project is open source, can be found <[here](https://github.com/trchicuong/discord-bot)>.<\n>If you have difficulty, need support join the Discord support server <[here](https://discord.gg/NNPDFufe4w)>.'))
            .addFields([{ name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') }])
            .setTimestamp()
            .setFooter({ text: await Translate('Developed with love by cuongisreal IT <❤️>'), iconURL: inter.member.displayAvatarURL({ dynamic: true }) });

        inter.editReply({ embeds: [embed] });
    }
};
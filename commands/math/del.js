const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'del',
    description:("Calculate the minus of 2 numbers!"),
    options: [
        {
            name: 'num1',
            description:('The first number'),
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'num2',
            description:('The second number'),
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const num1 = inter.options.getNumber('num1');
        const num2 = inter.options.getNumber('num2');
        const result = num1 - num2;

        const embed = new EmbedBuilder()
        .setColor('#5cb85c')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setTitle(await Translate('Calculate the minus of 2 numbers!'))
        .setDescription(await Translate(`The result: **${num1}** - **${num2}** = **${result}**`))
        .setTimestamp()
        .setFooter({ text: await Translate('Developed with love by cuongisreal IT <❤️>'), iconURL: inter.member.displayAvatarURL({ dynamic: true }) });

    inter.editReply({ embeds: [embed] });

    }
}

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'active-dev-badge',
    description:("Go through the simplified process of claming the Active Developer Badge for yourself!"),

    async execute({ client, inter }) {
        const embed = new EmbedBuilder()
            .setColor('#5cb85c')
            .setThumbnail(inter.member.displayAvatarURL({ size: 2048, dynamic: true }))
            .setTitle('Command Ran Successfully')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setDescription(await Translate('You have successfully executed the command to get the **Active Developer Badge**!.<\n>After Discord processes the execution of the command, you will be able to claim the badge by pressing the button below. Please note that Discord may take up to **24 hours** to process your eligibility.'))
            .setTimestamp()
            .setFooter({ text: await Translate('Developed with love by cuongisreal IT <❤️>'), iconURL: inter.member.displayAvatarURL({ dynamic: true }) });

        const button = new ButtonBuilder()
            .setLabel('Developer Page')
            .setURL('https://discord.com/developers/active-developer')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(button);

        await inter.editReply("Sending request..").then(() => setTimeout(() => inter.deleteReply() ,3000 ));
        inter.followUp({ embeds: [embed], components: [row], ephemeral: true });
    }
};
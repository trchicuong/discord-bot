require('dotenv').config();

const { Player } = require('discord-player');
const { YoutubeiExtractor } = require('discord-player-youtubei');
const { Client, GatewayIntentBits } = require('discord.js');
const { name } = require('./commands/core/activebadge');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.register(YoutubeiExtractor, {});

console.clear();
require('./loader');

client.login(client.config.app.token).catch(async (e) => {
    if (e.message === 'An invalid token was provided.') {
        require('./process_tools').throwConfigError('app', 'token', '\n\t   ❌ Invalid Token Provided! ❌ \n\tChange the token in the config file\n');
    } else {
        console.error('❌ An error occurred while trying to login to the bot! ❌ \n', e);
    }
});

client.on('guildMemberAdd', async member => {
    if (member.guild.id === client.config.app.guild) {
        let role = member.guild.roles.cache.find(x => x.name === client.config.app.role); 
        if (role) {
            try {
                await member.roles.add(role);
                console.log(`✅ Added role ${role.name} to ${member.user.tag}`);
            } catch (err) {
                console.error('❌ Failed to add role:', err);
            }
        } else {
            console.error('❌ Wrong role! ❌');
        }
    } else {
        console.error('❌ Wrong GuildID! ❌');
    }
});

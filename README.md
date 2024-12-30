# DISCORD BOT

Looking for a code for a music bot? This fully open-source code is made for your project!

If you need help with this project, to get support faster you can join the help server by just clicking [here](https://discord.gg/Pvw2vywSwv).

### Download

Clone repo:
`git clone https://github.com/trchicuong/discord-bot.git`
Or download Zip

### Configuration

Important!!! In order to work you need to rename `.env.example` to `.env`

Open the configuration file located in the main folder `config.js`.

```js
module.exports = {
    app: {
        token: process.env.DISCORD_TOKEN || 'xxx',
        playing: 'Developed with love by cuongisreal IT ❤️',
        global: true,
        guild: process.env.GUILD_ID || 'xxx',
        extraMessages: false,
        loopMessage: false,
        lang: 'en',
        enableEmojis: false,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 10000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
```

Basic configuration

- `app/token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `app/playing`, the activity of the bot
- `app/global`, whether the commands will work on all servers or just one (if global they might take up to an hour to show up)
- `app/guild`, the guild the slash command will be loaded to (this only applies if global is set to false)
- `app/extraMessages` will increase the amount of bot spam, while you get more infomation (not recommended) 

- `app/lang` will change the bot client language [__**See below for supported language codes**__]

- `app/Translate_Timeout` will set the time limit the bot has to create the translation succesfully. If the time is out, only the original english version will be printed. Set to `none` if you want to disable it (No Timeout). 

- `app/enableEmojis` will change the player buttons with emojis if set to true. `false` will replace them by basic english words

- `opt/loopMessage`, if the message that a music is played should be sent when it is looped

DJ mode configuration

- `opt/DJ/enabled`, whether the DJ mode should be activated or not 
- `opt/DJ/roleName`, the name of the DJ role to be used
- `opt/DJ/commands`, the list of commands limited to members with the DJ role

Advanced configuration (only change if you know what you are doing)

- `opt/maxVol`, the maximum volume that users can define
- `opt/spotifyBridge`, takes spotify songs/playlists and searches it on youtube and plays it (highly recommended)
- `opt/volume`, is the defaul volume the queue will start at
- `opt/leaveOnEmpty`, if the bot will leave when the queue is empty
- `opt/leaveOnEmptyCooldown`, the cooldown before the bot leaves when the queue is empty
- `opt/leaveOnEnd`,  if the bot will leave on finishing the queue
- `opt/leaveOnEndCooldown`, the cooldown before the bot leaves on finishing the queue
- `opt/discordPlayer`, options used by discord-player

### Installation

To use the project correctly you will need some tools.

WARNING: You MUST use Node.js version `v18.20.2`, otherwise, you will encounter major compatibility issues.

[FFmpeg](https://www.ffmpeg.org) to process audio ( make sure to download the latest version availble )

[Node JS](https://nodejs.org/en/) (`v18.20.2`) for environment

[yarn](https://yarnpkg.com/getting-started/usage) for package management

Without forgetting of course the code editor, we recommend [visual studio code](https://code.visualstudio.com/) 

Now in your terminal run the following commands assuming you are in the same directory as the project.

`yarn install` (or `npm install` **not recommended** as it might not work)

`node .` (or `node main.js`)

and Done, your bot should be running!
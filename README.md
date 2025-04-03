# Discord Music Bot - Open Source Project

### 🚀 Introduction
This is an open-source Discord music bot! If you encounter any issues or need help, join the support server [here](https://discord.gg/NNPDFufe4w).

---
### 📥 Download
**Clone the repository:**
```bash
git clone https://github.com/trchicuong/discord-bot.git
```
Or download the `.zip` file from the repository.

---
### ⚙️ Configuration
#### 1. Set up `.env`
- Rename `.env.example` to `.env`

#### 2. Edit `config.js`
Example configuration:
```js
module.exports = {
    app: {
        token: process.env.DISCORD_TOKEN || 'xxx',
        playing: 'Developed with ❤️ by cuongisreal IT',
        global: true,
        guild: process.env.GUILD_ID || 'xxx',
        extraMessages: false,
        loopMessage: false,
        lang: 'en',
        enableEmojis: false,
    },
    emojis: {
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

#### Key settings:
- **`app.token`**: Bot token (Get it from [Discord Developers](https://discordapp.com/developers/applications)).
- **`app.playing`**: Bot activity status.
- **`app.global`**: If `true`, commands will be available on all servers (may take time to update).
- **`app.guild`**: The specific server where commands will be loaded (if `app.global = false`).
- **`app.lang`**: Bot language (see the supported languages below).
- **`opt.DJ.enabled`**: Enable DJ mode.
- **`opt.DJ.roleName`**: Name of the DJ role.
- **`opt.maxVol`**: Maximum volume limit.
- **`opt.spotifyBridge`**: Support for playing Spotify tracks.
- **`opt.leaveOnEmpty`**: Bot leaves when the queue is empty.
- **`opt.leaveOnEnd`**: Bot leaves when the playlist ends.

---
### 🛠 Installation
#### Requirements:
- **Node.js v18.20.2** ([Download here](https://nodejs.org/en/))
- **FFmpeg** ([Download here](https://www.ffmpeg.org/))
- **Yarn** (recommended, download at [yarnpkg.com](https://yarnpkg.com/getting-started/usage))
- **Code Editor** (recommended: [VS Code](https://code.visualstudio.com/))

#### Install and run the bot:
```bash
yarn install  # Or npm install (not recommended)
node .        # Or node main.js
```
That's it! Your bot is now running. 🚀

---
### 🌍 Supported Languages
| Code | Language | Code | Language | Code | Language |
|------|---------|------|---------|------|---------|
| `af` | Afrikaans | `bn` | Bengali | `da` | Danish |
| `sq` | Albanian | `bg` | Bulgarian | `nl` | Dutch |
| `ar` | Arabic | `ca` | Catalan | `en` | English |
| `hy` | Armenian | `hr` | Croatian | `et` | Estonian |
| `eu` | Basque | `cs` | Czech | `fi` | Finnish |
| `be` | Belarusian | `cy` | Welsh | `fr` | French |
| `bs` | Bosnian | `de` | German | `ga` | Irish |
| `ja` | Japanese | `jv` | Javanese | `ka` | Georgian |
| `kn` | Kannada | `kk` | Kazakh | `km` | Khmer |
| `ko` | Korean | `ku` | Kurdish | `ky` | Kyrgyz |
| `la` | Latin | `lb` | Luxembourgish | `lo` | Lao |
| `lt` | Lithuanian | `lv` | Latvian | `mg` | Malagasy |
| `mi` | Maori | `mk` | Macedonian | `ml` | Malayalam |
| `mn` | Mongolian | `mr` | Marathi | `ms` | Malay |
| `mt` | Maltese | `my` | Burmese | `ne` | Nepali |
| `no` | Norwegian | `ny` | Chichewa | `pa` | Punjabi |
| `pl` | Polish | `ps` | Pashto | `pt` | Portuguese |
| `ro` | Romanian | `ru` | Russian | `sd` | Sindhi |
| `si` | Sinhalese | `sk` | Slovak | `sl` | Slovenian |
| `sm` | Samoan | `sn` | Shona | `so` | Somali |
| `sq` | Albanian | `sr` | Serbian | `st` | Sesotho |
| `su` | Sundanese | `sv` | Swedish | `sw` | Swahili |
| `ta` | Tamil | `te` | Telugu | `th` | Thai |
| `tr` | Turkish | `uk` | Ukrainian | `ur` | Urdu |
| `vi` | Vietnamese | `xh` | Xhosa | `yi` | Yiddish |
| `zu` | Zulu | `id` | Indonesian | | |

---
### 💡 Feedback & Support
If you have any questions or need assistance, join the support server [here](https://discord.gg/NNPDFufe4w).

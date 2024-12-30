const { QueueRepeatMode } = require('discord-player');
const { Translate } = require('../process_tools');

module.exports = async ({ inter, queue }) => {
    const methods = ['disabled', 'track', 'queue'];
    if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`No music currently playing... try again ? <❌>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));

    if (queue.repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF)
    else queue.setRepeatMode(queue.repeatMode + 1)

    return inter.editReply({ content: await Translate(`Loop made has been set to <**${methods[queue.repeatMode]}**>.<✅>`) }).then(() => setTimeout(() => inter.deleteReply() ,3000 ));
}
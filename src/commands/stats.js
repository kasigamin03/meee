const prettyMs = require("pretty-ms");
const util = require("../util");

module.exports = {
    name: "stats",
    exec: async (msg, client) => {
        /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];

        msg.channel.send(util.embed()
            .setAuthor("Mukey Stats", msg.client.user.displayAvatarURL())
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                    const uptime = prettyMs(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });

                    return `\`\`\`asciidoc
ID             :: Mukey | Europe
Node Status    :: ${node.connected ? "Connected" : "Disconnected"}${node.connected ? `
CPU Load       :: ${cpuLoad}%
BOT BY         :: Bunny Gamer#6229
BOT NAME       :: MUKEY#3773
PREFIX         :: ${process.env.PREFIX}
BOT V          :: 2.0.0
Mem Usage      :: ${memUsage} MB
Uptime         :: ${uptime}
Players        :: ${node.stats.playingPlayers} of ${node.stats.players} playing` : ""}\`\`\``;
                })
            )
            .setTimestamp()
        );
    }
};

module.exports = {
    name: "ready",
    exec: async (client) => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log('Prefix:', process.env.PREFIX);
        console.log(`${client.guilds.cache.size} Servers`);
        console.log(`${client.users.cache.size} Users`);
        client.user.setActivity(`${process.env.PREFIX}help | Mukey`, { type: 'PLAYING' });

        if (client.spotify) await client.spotify.requestToken();

        const nodes = [...client.manager.nodes.values()];
        for (const node of nodes) {
            try {
                await node.connect();
            } catch (e) {
                client.manager.emit("error", e, node);
            }
        }
    }
};

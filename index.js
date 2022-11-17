const fs = require('fs');
const cf = require('./config.json');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
// Require the necessary discord.js classes
const {
    Client,
    Intents,
    Collection
} = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    fetchAllMembers: true
});

const TOKEN = cf.token;
const TEST_GUILD_ID = ""

//test guild = 696066463856853164
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

// Creating a collection for commands in client
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

// When the client is ready, this only runs once
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(` ${client.guilds.cache.size} servers | /help`, { type: "WATCHING" });
    // Registering the commands in the client
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(TOKEN);
    (async() => {
        try {
            if (!TEST_GUILD_ID) {
                await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands globally');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }
        } catch (error) {
            if (error) console.error(error);
        }
    })();

});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});
client.on("guildCreate", guild => {
    console.log("Joined a new guild : " + guild.name);
    client.user.setActivity(` ${client.guilds.cache.size} servers | /help`, { type: "WATCHING" });
    const embed = new MessageEmbed()
        .setTitle(`Ajout Serveur`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField('Name :', guild.name, true)
        .addField('Nombre de membres :', guild.memberCount + " membres", true)
        .addField(`ID : `, guild.id, true)
        .setFooter({ text: "DataBot" })
        .setTimestamp()
        .setColor(guild.me.displayHexColor);

    client.channels.cache.get('997109978471088179').send({ embeds: [embed] })


});




client.on("guildDelete", guild => {
    console.log("Left a guild : " + guild.name);
    client.user.setActivity(` ${client.guilds.cache.size} servers | /help`, { type: "WATCHING" });
    const embed = new MessageEmbed()
        .setTitle(`Suppression Serveur`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField('Name :', guild.name, true)
        .addField('Nombre de membres :', guild.memberCount + " membres", true)
        .addField(`ID : `, guild.id, true)
        .setFooter({ text: "DataBot" })
        .setTimestamp()
        .setColor(guild.me.displayHexColor);
    client.channels.cache.get('997109978471088179').send({ embeds: [embed] })
});

client.login(TOKEN);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-message')
        .setDescription('send un message privé à un utilisateur')
        .addStringOption(option =>
            option.setName('userid')
            .setDescription('id de l\'utilisateur à qui envoyer le message')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
            .setDescription('message à envoyer')
            .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.user.id !== '692386181253562379' && interaction.user.id !== '830115722993729538' && interaction.user.id !== '436952983671013377') {
            return interaction.reply({ content: 'Tu n\'as pas la permission d\'utiliser cette commande', ephemeral: true });
        }
        let userid = interaction.options.getString('userid');
        let message = interaction.options.getString('message');
        interaction.client.users.cache.get(userid).send(message);
        interaction.reply({ content: 'message envoyé' });
    }
};
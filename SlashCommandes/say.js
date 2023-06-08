const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('dit ce que vous voulez')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('message à dire')
            .setRequired(true)
        ),
    async execute(interaction) {
        // si ce n'est pas 692386181253562379 ou 830115722993729538 ou 436952983671013377 on ne fait rien
        if (interaction.user.id !== '692386181253562379' && interaction.user.id !== '830115722993729538' && interaction.user.id !== '436952983671013377') {
            return interaction.reply({ content: 'Tu n\'as pas la permission d\'utiliser cette commande', ephemeral: true });
        }
        let message = interaction.options.getString('message');
        interaction.reply({ content: message });
    }
};
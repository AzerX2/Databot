const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

// Permet de supprimer un membre de la blacklist

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove someone from the blacklist')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id of the user | id de l\'utilisateur')
            .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.id !== '436952983671013377') {
            interaction.reply({ content: 'Vous n\'êtes pas autorisé à utilisé la commande !' });
            return;
        } else {
            let id = interaction.options.getString('id');
            let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
            blacklist.splice(blacklist.findIndex(x => x.user == id), 1);
            fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist), err => {
                if (err) throw err;
            });
            interaction.reply({ content: 'Utilisateur supprimé de la liste noire !' });

        }
    }
};
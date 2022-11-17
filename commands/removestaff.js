const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

// Permet de supprimer un membre du staff

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removestaff')
        .setDescription('retire un membre du staff | remove a staff member')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id du membre à retirer | id of the member to remove')
            .setRequired(true)),

    async execute(interaction) {
        // on récupère le fichier staff.json
        const id = interaction.options.getString('id');
        const staff = JSON.parse(fs.readFileSync("./staff.json", "utf8"));
        if (interaction.user.id != '436952983671013377') {
            interaction.reply({ content: 'Vous n\'avez pas les droits pour faire cette commande' });
        } else {
            // on cherche l'id dans le fichier
            staff.forEach(function(element, index) {
                    if (element.id == id) {
                        staff.splice(index, 1);
                    }
                })
                // on l'enlève du fichier
            fs.writeFileSync("./staff.json", JSON.stringify(staff), err => {
                if (err) {
                    console.log(err);
                }

            })
            interaction.reply({ content: 'Le membre a bien été retiré' });


        }

    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('addstaff')
        .setDescription('ajoute un membre du staff | add a staff member')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id du membre à ajouter | id of the member to add')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('level')
            .setDescription('level of the staff member | level of the staff member')
            .setRequired(true)
            .addChoices({ name: 'level 1', value: '1' }, { name: 'level 2', value: '2' }, { name: 'level 3', value: '3' }))
        .addStringOption(option =>
            option.setName('role')
            .setDescription('role of the staff member | role of the staff member')
            .setRequired(true)),
    async execute(interaction) {

        const level = interaction.options.getString('level');
        const role = interaction.options.getString('role');
        const id = interaction.options.getString('id');
        const staff = JSON.parse(fs.readFileSync("./staff.json", "utf8"));
        if (interaction.user.id != '436952983671013377') {
            interaction.reply({ content: 'Vous n\'avez pas les droits pour faire cette commande | You do not have the rights to make this order' });
        } else {
            staff.push({
                "id": id,
                "level": level,
                "role": role
            });
            fs.writeFileSync("./staff.json", JSON.stringify(staff), err => {
                if (err) {
                    console.log(err);
                }

            })
            interaction.reply({ content: 'Le membre a bien été ajouté' });

        }

    }
}
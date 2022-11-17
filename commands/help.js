const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('affiche la liste des commandes | show the list of commands'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setDescription("**Merci d'utilisé le bot ! (tout est en slash command)**")
            .setColor('#460711')
            .addField("💻 ➾ Checking", "`check` - `checkstaff`")
            .addField("🔧 ➾ Report",
                "`helpreport` - `reason` - `report <reason> <user> <preuve>`")
            .addField("📺 ➾ Utilitaires",
                "`botinfo` - `ping` - `help`")
            .addField("🛠  ➾ Staff",
                "`refuse` - `accept` - `remove` - `addstaff` - `removestaff` - `massreport`")
            .setFooter({ text: "Demandé par " + interaction.user.username, icon_url: interaction.user.displayAvatarURL() })
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });

    }
};
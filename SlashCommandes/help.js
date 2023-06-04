const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('affiche la liste des commandes | show the list of commands'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setDescription("**Merci d'utilisé le bot ! (tout est en slash command)**")
            .setColor('#460711')
            .addFields({
                name: "🔨 ➾ Alerte",
                value: "`alert-raid`"
            })
            .addFields({
                name: "💻 ➾ Checking",
                value: "`check` - `checkserv`"
            })
            .addFields({
                name: "🔧 ➾ Report",
                value: "`helpreport` - `report <user> <reason> <preuve>`"
            })
            .addFields({
                name: "📺 ➾ Utilitaires",
                value: "`botinfo` - `ping` - `help`"
            })
            .setFooter({ text: "Demandé par " + interaction.user.username, icon_url: interaction.user.displayAvatarURL() })
            .setTimestamp()

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Invite moi !')
                .setURL("https://discord.com/api/oauth2/authorize?client_id=918438333116452864&permissions=0&scope=applications.commands%20bot")
                .setStyle('LINK'),
            )
            /*
            .addComponents(
                new MessageButton()
                .setLabel('Vote pour moi !')
                .setURL("https://top.gg/bot/")
                .setStyle('LINK'),
            )*/
            .addComponents(
                new MessageButton()
                .setLabel('Support !')
                .setURL("https://discord.gg/a8wTzmqmDz")
                .setStyle('LINK'),
            );
        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
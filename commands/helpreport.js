const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('helpreport')
        .setDescription('give help for report command | donne de l\'aide pour le commande report'),
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help for Report Command')
            .setDescription("Si vous avez un problème ou des questions le support est la pour vous aider a!botinfo | If you have a problem or questions the support is for you to ask a!botinfo")
            .addField("Français", "Pour faire un report faites la slash commande `/report <reason> <user> <preuve>` raison : vous devez indiquer une raison valable inclue dans la liste /reason \n user : vous devez indiquer un id d'utilisateur valable \n preuve : vous devez indiquer une preuve sous format imgur, donc vous mettrez le lien imgur, \n c'est nécessaire pour procéder à un report")
            .addField("Anglais", "To make a report, use the slash command `/report <reason> <user> <preuve>` reason : you must indicate a valid reason included in the list /reason \n user : you must indicate a valid user id \n preuve : you must indicate a proof in imgur format, so you put the imgur link, \n it is necessary to proceed to a report")
            .setFooter({ text: 'Help report Command' })
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });

    }
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('donne les infos du bot | give the bot info'),
    async execute(interaction) {
        const client = interaction.client;
        const embed = new Discord.MessageEmbed()
            .setTitle(`Information du bot`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField('Invitation :', `[support](https://discord.gg/a8wTzmqmDz) et [invite](https://discord.com/api/oauth2/authorize?client_id=918438333116452864&permissions=0&scope=bot%20applications.commands)`, true)
            .addField('Utilisateur :', client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) + " utilisateurs ", true)
            .addField(`Serveurs`, client.guilds.cache.size + " serveurs ", true)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setColor("BLACK");
        if (interaction.guild.bannerURL) embed.setImage(interaction.guild.bannerURL({ dynamic: true }))

        interaction.reply({ embeds: [embed] });
    }
};
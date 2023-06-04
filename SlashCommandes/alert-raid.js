const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('alert-raid')
        .setDescription('alerte le staff en cas de raid'),
    async execute(interaction) {
        // on créé une invitation 
        let invite = await interaction.channel.createInvite({
            maxAge: 0,
            maxUses: 0
        });
        const channel = interaction.guild.channels.cache.get('1106140456892497951');
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Alerte Raid')
            .setDescription(`Le serveur ${interaction.guild.name} est entrain de se faire raid`)
            .addFields({ name: 'Lien d\'invitation', value: "discord.gg/" + invite.code })
            .addFields({ name: 'Nom du serveur', value: "> " + interaction.guild.name })
            .addFields({ name: 'ID du serveur', value: "> " + interaction.guild.id })
            .addFields({ name: 'Nombre de membres', value: "> " + interaction.guild.memberCount + " membres" })
            .setFooter({ text: 'Alerte Raid', icon_url: interaction.guild.iconURL() })
            .setTimestamp();
        channel.send({ embeds: [embed], content: 'discord.gg/' + invite.code + " \n<@&1106246375672381472>" });
        interaction.reply({ content: "Le staff a été alerté" });

    }
};
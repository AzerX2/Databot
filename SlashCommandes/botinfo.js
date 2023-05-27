/**
 * @file botinfo.js
 * @description Ce fichier sert à afficher les informations du bot.
 */

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { oneLine, stripIndent } = require('common-tags');
const moment = require('moment');
let prefix = "/";
let owner = "Azer_X2#8235"
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {

    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Affiche les informations du bot | Show the bot informations'),

    async execute(interaction) {
        const botOwner = "436952983671013377"

        const tech = stripIndent `
      Version     :: 1.0
      Librairie     :: Discord.js v13 
      Environement :: Node.js v14
      BDD    :: MongoDB
    `;
        const d = moment.duration(interaction.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} jour` : `${d.days()} jours`;
        const hours = (d.hours() == 1) ? `${d.hours()} heure` : `${d.hours()} heures`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} seconde` : `${d.seconds()} secondes`;
        const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const embed = new MessageEmbed()
            .setTitle('Infos de DataBot')
            .setDescription(oneLine `
        DataBot est un bot de mémoire, il permet de garder en mémoire les mauvaise actions des utilisateurs à des fin préventives.
      `)
            .addFields({ name: 'Préfixe', value: `\`${prefix}\``, inline: true })
            .addFields({ name: 'Client ID', value: `\`${interaction.client.user.id}\``, inline: true })
            .addFields({ name: `Développeur ${owner}`, value: botOwner, inline: true })
            .addFields({ name: 'Tech', value: `\`\`\`asciidoc\n${tech}\`\`\``, inline: true })
            .addFields({ name: 'Uptime', value: `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``, inline: true })
            .addFields({ name: 'Ram', value: `\`\`\`prolog\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true })
            .addFields({
                name: 'Stats',
                value: `**${interaction.client.guilds.cache.size}** serveurs\n**${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}** utilisateurs`,
                inline: true
            })
            .addFields({
                name: 'Liens',
                value: '**[Invitez Moi](https://discord.com/api/oauth2/authorize?client_id=918438333116452864&permissions=0&scope=applications.commands%20bot) | ' +
                    '[Serveur Support](https://discord.gg/a8wTzmqmDz) **',
                inline: true
            })
            .setFooter({
                text: interaction.member.displayName,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()
            .setColor(interaction.guild.me.displayHexColor);
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
        interaction.reply({ embeds: [embed], components: [row] });
    }
}
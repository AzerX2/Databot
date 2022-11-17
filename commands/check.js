const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('check a guild if a member is blacklisted')
        .addStringOption(option =>
            option.setName('id')
            .setDescription('id of the user to check | id of the user to check')
            .setRequired(false)),
    async execute(interaction) {
        var blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
        const idcheck = interaction.options.getString('id');
        if (idcheck != null) {
            //check in blacklist if id is in blacklist
            //blacklist is an array of objects
            //each object has a key "id" and a key "reason" and a key "user" and a key "Author"
            //user is the id of the user
            //Author is the id of the author of the blacklist

            //check if idcheck is in blacklist
            var found = false;
            for (var i = 0; i < blacklist.length; i++) {
                if (blacklist[i].user == idcheck) {
                    found = true;
                    break;
                }
            }
            if (found) {
                interaction.reply({ content: '<@' + idcheck + '> is blacklisted | est blacklist' });
            } else {
                interaction.reply({ content: '<@' + idcheck + '> is not blacklisted | n\'est pas blacklist' });
            }

        } else {
            const channel = interaction.client.channels.cache.get('998689751345410138');
            const embed2 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Check Blacklist')
                .setDescription(`${interaction.user.username} a check le serveur pour voir si un membre est blacklisté`)
                .setFooter({ text: 'Check Blacklist' })
                .setTimestamp();
            await channel.send({ embeds: [embed2] });
            //enregistrement du report dans le fichier json
            let text = " ";
            /*
            interaction.guild.members.cache.forEach(member => {
                console.log(member.user.username + " " + member.user.id);
                if (blacklist.find(x => x.user == member.user.id)) {
                    text += `${member.user.username} ${member.user.id} est blacklisté \n`;
                }
            });
            */
            interaction.guild.members.fetch().then(members => {
                members.forEach(member => {
                    blacklist.forEach(element => {
                        if (element.user === member.user.id) {
                            text += `${member.user.username} ${member.user.id} est blacklist pour | is blacklist for ${element.reason} \n`;
                        }
                    });

                });
            }).catch(console.error).then(async() => {
                if (text === " ") {
                    text = "Aucun membre blacklisté | No member is blacklisted";
                }


                const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Liste des membres blacklistés | list of blacklisted members')
                    .setDescription(text)
                    .setFooter({ text: 'Check Blacklist' })
                    .setTimestamp();
                await interaction.reply({ embeds: [embed] });
            });
        }
    }
}
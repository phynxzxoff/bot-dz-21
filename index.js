
process.on("unhandledRejection", error => {
  return;
});


const express = require("express");
const app = express();
app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
}); 



const fs = require("fs")
const mongoose = require("mongoose");
const Discord = require("discord.js")

const { Client, Intents, Collection } = require('discord.js');
const client = new Discord.Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },

  //  ws: { properties: { $browser: 'Discord iOS' } },
    messageCacheMaxSize: 999999,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});
 
const { MessageEmbed, Permissions, MessageAttachment, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js'); 
const { SlashCommandBuilder } = require('@discordjs/builders');

const DiscordModal = require('discord-modal')
DiscordModal(client)
const db = require('pro.db')
const qdb = require("quick.db")
const ms = require("ms")

const { MongoClient, ServerApiVersion } = require('mongodb');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const uri = "mongodb+srv://itzphynx04:bAKLCTBBFXnQOqow@madwinp8.fsseoff.mongodb.net/?retryWrites=true&w=majority&appName=madwinp8";
mongoose.connect(uri).then(() => console.log("Database connected"))
module.exports.client = client;
/*const wID = data.get(`Webhook_${message.guild.id}`).id
  const wToken = data.get(`Webhook_${message.guild.id}`).token
  
  const wc = new Discord.WebhookClient(wID, wToken)
  wc.send({
      content: message.content,
      username: message.author.username,
      avatarURL: message.author.avatarURL()
  });
      } 
      
      else {
  message.channel.createWebhook(message.author.username, {
      avatar: message.author.avatarURL(),
  }).then(async wb => {
    wb.send(message.content)
    data.set(`Webhook_${message.guild.id}`, {id: wb.id, token: wb.token})
  })
      }*\
/*
const { Database } = "quickmongo";
const db = new Database(uri);
 
db.on("ready", () => {
    console.log("Connected to the database");
    
});
 db.connect(); */
const { lineReply, lineReplyNoMention } = require("discord-reply")
const prefix = '#'

require('./eventsLoader').run(client, __dirname);

client.on("ready", async() => {
  const ac = db.get(`activity`)
 const ac1 = db.get(`activity-type`)
if(!ac || !ac1) return;
if(ac1 == "PLAYING"){
client.user.setActivity(`${ac}`, { type: `${ac1}`, url: `https://www.twitch.tv/${ac}`})
  return;
}
client.user.setActivity(`${db.get(`activity`)}`, { type: `${db.get(`activity-type`)}`})
})

  client.on('ready', async() => {
 
 
    
    console.log(`|≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠|`);
    console.log(
        `|≠ CLIENT NAME : [ ${client.user.username} ]                  ≠|`
    );
    console.log(
        `|≠ CLIENT TAG : [ ${
            client.user.discriminator
        } ]                          ≠|`
    );
    console.log(`|≠ CLIENT ID : [ ${client.user.id} ]             ≠|`);
    console.log(
        `|≠ CLIENT SERVERS COUNT : [ ${
            client.guilds.cache.size
        } ]                   ≠|`
    );
    console.log(
        `|≠ CLIENT CHANNELS COUNT : [ ${
            client.channels.cache.size
        } ]                ≠|`
    );
    console.log(
        `|≠ CLIENT USERS COUNT : [ ${
            client.users.cache.size
        } ]                    ≠|`
    );
    console.log(`|≠ CLIENT PING : [ ${client.ws.ping} ] XD                        ≠|`
    );
    console.log(
        `|≠ CLIENT CREATED AT : [ ${client.user.createdAt.toLocaleString()} ]  ≠|`
    );
    console.log(`|≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠|`);
}); 
const r = require("./schema/replys.js")
client.on("messageCreate", async message => {
  if(message.author.bot)return;
  const reply = await r.findOne({guildID:message.guild.id,word:message.content})
  if(reply){
if(message.content.startsWith(reply.word)){
if(message.channel.id !== reply.channelID)return;
if(message.member.roles.cache.has(reply.roleID)){
  let array = []
  reply.replys.map((value, index) => {
 array.push(value)
  })
  const randomMessage = array[Math.floor(Math.random() * array.length)];

message.reply({content: `${randomMessage}`})
  }
}
  }
})

client.on('messageCreate', async message => {
    if(message.content.startsWith(prefix + "help")){
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Click to view Help Menu')
                .addOptions([
                    {
                        label: 'اوامر عامه',
                        description: 'اضغط هنا لرؤيه الاوامر العامه',
                        value: 'general_commands',
                 emoji:'972247269296447568'    
                    },
                    {
                        label: 'اوامر التفعيل',
                        description: 'اضغط هنا لرؤيه اوامر التفعيل',
                        value: 'admin_commands',
          emoji:'972246067137638400'
                    },
                  {
                        label: 'اوامر الحقيبة',
                        description: 'اضغط هنا لرؤيه اوامر الحقيبة',
                        value: 'bag_commands',
                 emoji:'987883213747814461'    
                    },
{
                        label: 'اوامر البنك',
                        description: 'اضغط هنا لرؤيه اوامر البنك',
                        value: 'bank_commands',
                 emoji:'987883146789933167'    
                    },
                  {
                        label: 'اوامر الرواتب',
                        description: 'اضغط هنا لرؤيه اوامر الرواتب',
                        value: 'salarys_commands',
                      emoji:'991037727011135498'
                    },

{
                        label: 'اوامر الردود',
                        description: 'اضغط هنا لرؤيه اوامر الردود',
                        value: 'replys_commands',
                 emoji:'987883043106730024'    
                    },
{
                        label: 'اوامر القيف اواي',
                        description: 'اضغط هنا لرؤيه اوامر القيف اواي',
                        value: 'giveaways_commands',
                 emoji:'996886008723427390'    
                    },
                  {
                        label: 'اوامر اللوق',
                        description: 'اضغط هنا لرؤيه اوامر اللوق',
                        value: 'logs_commands',
                 emoji:'992293439473471649'    
                    },
                    {
                        label: 'اوامر الاونر',
                        description: 'اضغط هنا لرؤيه اوامر الاونر',
                        value: 'owner_commands',
                      emoji:'972245995943526491'
                    },
            
                ]),

                
        );

      const embed = new MessageEmbed()
      .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTitle("**See the commands below, set up your server now**")
.setDescription(`**() اختياري [] اجباري**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({dynamic:true}))
.setColor(message.guild.me.roles.highest.hexColor)
        await message.reply({ embeds:[embed], components: [row] })

    }
})



client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'select') {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Click to view Help Menu')
                .addOptions([
                    {
                        label: 'اوامر عامه',
                        description: 'اضغط هنا لرؤيه الاوامر العامه',
                        value: 'general_commands',
                      emoji:'972247269296447568'
                    },
                    {
                        label: 'اوامر التفعيل',
                        description: 'اضغط هنا لرؤيه اوامر التفعيل',
                        value: 'admin_commands',
                      emoji:'972246067137638400'
                    },
                  {
                        label: 'اوامر الحقيبة',
                        description: 'اضغط هنا لرؤيه اوامر الحقيبة',
                        value: 'bag_commands',
                 emoji:'987883213747814461'    
                    },
{
                        label: 'اوامر البنك',
                        description: 'اضغط هنا لرؤيه اوامر البنك',
                        value: 'bank_commands',
                 emoji:'987883146789933167'    
                    },
                  {
                        label: 'اوامر الرواتب',
                        description: 'اضغط هنا لرؤيه اوامر الرواتب',
                        value: 'salarys_commands',
                      emoji:'991037727011135498'
                    },

{
                        label: 'اوامر الردود',
                        description: 'اضغط هنا لرؤيه اوامر الردود',
                        value: 'replys_commands',
                 emoji:'987883043106730024'    
                    },
{
                        label: 'اوامر القيف اواي',
                        description: 'اضغط هنا لرؤيه اوامر القيف اواي',
                        value: 'giveaways_commands',
                 emoji:'996886008723427390'    
                    },
                  {
                        label: 'اوامر اللوق',
                        description: 'اضغط هنا لرؤيه اوامر اللوق',
                        value: 'logs_commands',
                 emoji:'992293439473471649'    
                    },
                    {
                        label: 'اوامر الاونر',
                        description: 'اضغط هنا لرؤيه اوامر الاونر',
                        value: 'owner_commands',
emoji:'972245995943526491'

                    },



                ]),

                
        );
       
        let type = interaction.values[0]
        
        if(type == "general_commands") {
let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}ping**`,`**عرض بنق البوت**`)
.addField(`**${prefix}info**`,`**عرض معلومات البوت**`)
.addField(`**${prefix}user [user]**`,`**عرض معلومات الشخص**`)
.addField(`**${prefix}role [role]**`,`**عرض معلومات الرول**`)
.addField(`**${prefix}channel [channel]**`,`**عرض معلومات الشات**`)
.addField(`**${prefix}server**`,`**عرض معلومات السيرفر**`)
//.addField(`**${prefix}**`,`****`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        } else  if(type == "admin_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}set-role-add [roles]**`,`**تحديد الرولات المضافة للتفعيل**`)
.addField(`**${prefix}set-role-remove [roles]**`,`**تحديد الرولات المسحوبه للتفعيل**`)
.addField(`**${prefix}تفعيل [user] [ID Psn]**`,`**تفعيل العضو**`)

//.addField(`**${prefix}**`,`****`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        } else  if(type == "giveaways_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}start [time] [winners] [prize]**`,`**بدء قيف اواي**`)
.addField(`**${prefix}reroll [ID]**`,`**تغيير الفائز**`)
.addField(`**${prefix}list**`,`**عرض القيف اواي الحاليه**`)
.addField(`**${prefix}end [ID]**`,`**إنهاء قيف اواي**`)
.addField(`**${prefix}emoji [emoji]**`,`**تعيين ايموجي للقيف اواي**`)
.addField(`**${prefix}banner [banner]**`,`**تعيين بنر للقيف اواي**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        }  else  if(type == "owner_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}set-name [name]**`,`**تغيير اسم البوت**`)
.addField(`**${prefix}set-avatar [link/image]**`,`**تغيير صورة البوت**`)
.addField(`**${prefix}set-activity [text]**`,`**تغيير نشاط البوت**`)

              
//.addField(`**${prefix}**`,`****`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        }else  if(type == "salarys_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}add-salarys **`,`**توزيع رواتب الموظفين**`)
.addField(`**${prefix}create-salary [role] [salary]**`,`**انشاء راتب جديد**`)
.addField(`**${prefix}delete-salary [role]**`,`**حذف الراتب**`)
.addField(`**${prefix}reset-salarys**`,`**تصفير الرواتب**`)
.addField(`**${prefix}salarys**`,`**عرض الرواتب**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        } else  if(type == "logs_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}setlog-bank [channel]**`,`**تعيين لوق البنك**`)
.addField(`**${prefix}setlog-bag [channel]**`,`**تعيين لوق الحقائب**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
        } else if(type == "bag_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}add-store [price] [item]**`,`**إضافة منتج**`)
.addField(`**${prefix}delete-store [item]**`,`**إزالة منتج**`)
.addField(`**${prefix}reset-store **`,`**حذف كل المنتجات**`)
.addField(`**${prefix}store**`,`**عرض المنتجات**`)
.addField(`**${prefix}add-item [user] (amount) [item]**`,`**إضافة منتج لعضو**`)
.addField(`**${prefix}delete-item [user] (amount)**`,`**إزالة منتج من عضو**`)
.addField(`**${prefix}reset-item [user]**`,`*حذف كل المنتجات من عضو***`)
.addField(`**${prefix}inventory**`,`**عرض منتجات العضو**`)
.addField(`**${prefix}give-item [user] (amount) [item]**`,`**يعطي العضو منتج للعضو الثاني من حقيبته**`)
.addField(`**${prefix}buy (amount) [item]**`,`**شراء منتج من الاستور**`)
.addField(`**${prefix}use (amount) [item]**`,`**استخدام منتج من حقيبتك**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
} else  if(type == "bank_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}add-money [user] [amount]**`,`**زيادة فلوس لعضو**`)
.addField(`**${prefix}remove-money [user] [amount]**`,`**سحب فلوس من العضو **`)
.addField(`**${prefix}reset-money [user] **`,`**سحب كل الفلوس من عض **`)
.addField(`**${prefix}top**`,`**اعلى الاعضاء فلوس**`)
.addField(`**${prefix}تحويل [user] [amount]**`,`**تحويل فلوس لعضو آخر**`)
.addField(`**${prefix}سحب [amount]**`,`** سحب فلوس من البنك**`)
.addField(`**${prefix}ايداع [amount]**`,`**ايداع فلوس للبنك**`)
.addField(`**${prefix}فلوس [user]**`,`**عرض فلوس العضو**`)
.addField(`**${prefix}فلوسي**`,`**عرض فلوسي**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
} else  if(type == "replys_commands") {
            let embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.addField(`**${prefix}create-word [role] [channel] [word]**`,`**انشاء كلمة للردود**`)
.addField(`**${prefix}delete-word [ID]**`,`**حذف كلمة و ردودها**`)
.addField(`**${prefix}reset-word**`,`**حذف جميع الكلمات و ردودها**`)
.addField(`**${prefix}add-reply [ID] [reply]**`,`**إضافة رد جديد**`)
.addField(`**${prefix}delete-reply [ID] [reply]**`,`**إزالة رد**`)
.addField(`**${prefix}reset-reply [ID]**`,`**حذف جميع ردود الكلمة**`)
.addField(`**${prefix}replys**`,`**عرض الردود و الكلمات**`)
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor(interaction.guild.me.roles.highest.hexColor)
            await interaction.update({ embeds:[embed], components: [row] });
}
		
	}
});


  
client.on("interactionCreate", async interaction => {
  if (!interaction.isSelectMenu()) return;
let type = interaction.values[0]

  if(interaction.customId == "activity"){

    if(type == "playing"){
      
db.set(`activity-type`,"PLAYING")
      client.user.setActivity(`${db.get(`activity`)}`, { type: "PLAYING" })

      const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.setTitle("**The bot activity has been successfully changed**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

 interaction.update({embeds:[embed], components:[]})
} else if(type == "streaming"){
      
db.set(`activity-type`,"STREAMING")
      client.user.setActivity(`${db.get(`activity`)}`, { type: "STREAMING", url: `https://www.twitch.tv/${db.get(`activity`)}` })

      const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.setTitle("**The bot activity has been successfully changed**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

 interaction.update({embeds:[embed], components:[]})
} else if(type == "listening"){
      
db.set(`activity-type`,"LISTENING")
      client.user.setActivity(`${db.get(`activity`)}`, { type: "LISTENING" })

      const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.setTitle("**The bot activity has been successfully changed**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

 interaction.update({embeds:[embed], components:[]})
} else if(type == "watching"){
      
db.set(`activity-type`,"WATCHING")
      client.user.setActivity(`${db.get(`activity`)}`, { type: "WATCHING" })

      const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.setTitle("**The bot activity has been successfully changed**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

 interaction.update({embeds:[embed], components:[]})
} else if(type == "competing"){
  db.set(`activity-type`,"COMPETING")
      client.user.setActivity(`${db.get(`activity`)}`, { type: "COMPETING" })

      const embed = new MessageEmbed()
      .setAuthor(interaction.guild.name,interaction.guild.iconURL({dynamic:true}))
.setTitle("**The bot activity has been successfully changed**")
.setThumbnail(client.user.displayAvatarURL({dynamic:true}))
.setFooter(`- Requested By: ${interaction.user.username}`, interaction.user.displayAvatarURL({dynamic:true}))
.setColor("GREEN")

 interaction.update({embeds:[embed], components:[]})
}
}
})


client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async messageCreate => {
const message = messageCreate;
  if (!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;

	const args = messageCreate.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && messageCreate.channel.type === 'دم') {
		return messageCreate.reply({content:'**فقط في السيرفر!**'});
	}

	if (command.permissions) {
		const authorPerms = messageCreate.channel.permissionsFor(messageCreate.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return messageCreate.reply({content:'**ليس لديك الصلاحيه لأستخدام الامر**'});
		}
	}

if(command.returnrole){
  
  const role1 = messageCreate.guild.roles.cache.find(role1 => role1.id === command.returnrole)

  if(!messageCreate.member.roles.cache.has(role1.id))
    return messageCreate.reply({content:'**ليس لديك الرول لأستخدام الامر**'});
  
}
  
	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(messageCreate.author.id)) {
		const expirationTime = timestamps.get(messageCreate.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return messageCreate.reply({content:`انتظر ${timeLeft.toFixed(1)} ثانيه لأستخدام `});
		}
	}



//


	timestamps.set(messageCreate.author.id, now);
	setTimeout(() => timestamps.delete(messageCreate.author.id), cooldownAmount);

	try {
		command.execute(client, message, prefix, db);
	} catch (error) {
		console.error(error);
		messageCreate.reply({content:'there was an error trying to execute that command!'});
	}
});




//join voice

const { joinVoiceChannel } = require('@discordjs/voice');
  
    setInterval( async () => {
    client.channels.fetch("1058692810469019658") //ايدي الروم 
     .then((channel) => { 
      const VoiceConnection = joinVoiceChannel({
       channelId: channel.id, 
       guildId: channel.guild.id, 
       adapterCreator: channel.guild.voiceAdapterCreator 
       });
    }).catch((error) => { return; });
    }, 1000)


//خط

client.on('message', message => {
    if (message.content === 'خط' ) {
        message.delete();
        message.channel.send({files: ["https://media.discordapp.net/attachments/1048916809249726536/1057321751207477288/New_Project_471_608A5EC.png"]});
    }
});

// Code Auto Reply
client.on("messageCreate", message => {
  if (message.content == "السلام عليكم") {
    message.reply("**__وعليكم السلام ورحمة الله و بركاته , منور/ه الشات | ❤__**")
  }
})

client.on("messageCreate", message => {
 if (message.content == "فحص") {
        message.reply(`**__ | عزيزي الاداري : 

<:pp292:1057635421917556776> | المواطن : 
        
<:emoji_8:1057626985825837086> | لقد تم فحص اللعب و أنه موجود في السيرفر
__**`)
  }
})

// Code Auto Reply
client.on("messageCreate", message => {
  if (message.content == "تفتيش") {
    message.reply("**__عزيزي المواطن انتظر لكي يتم تفتيشك من قبل رجال الامن | <:pp331:1057635548807827457> __**")
  }
})

client.on("messageCreate", message => {
  if (message.content == "كتابي") {
    message.reply(`**__ للتفعيل الـڪتابـي | -

يرجا منك كتابة ايدك ليتم تفعيلك من قبل الاداره | <a:MGD:1064135939363962980>
يرجا منك عدم كتابة اي شي اخر غير ايدك لكي لا يتم إعطائك ميوت ساعه |  <a:pp203:1064136118079066152>
For - <@&1057619762932359168> | <:emoji_3:1057626229760589824> __**`)
  }
})

client.on("messageCreate", message => {
  if (message.content == "صوتي") {
    message.reply(`**__شبكة نايت لايف للحياة الوقعية تعلن عن | - 
لقد تم فتح التفعيل ل غير المفعلين , شروط التفعيل الصوتي | - 
‌#
 1 - تجهيز مايك كويس

2 - تجهيز القوانين جميعها 

3 - تجهيز ايديك 
#
مع تحيات ادارة سيرفر | Night Life <:emoji_3:1057626229760589824>
- | https://discord.gg/2E9r4755FV | -
<@&1057619762932359168> __**`)
  }
})

client.on("messageCreate", message => {
  if (message.content == "تصويت") {
    message.reply(`**__السلام عليكم و رحمة الله و بركاته | -
    لقد تم فتح حجز تذكره , لـ حجز تذكره توجه الى | <:emoji_3:1057626229760589824>
    
    <#1057619969686388746>
    
    <#1057619969686388746>
    
    For - <@&1057619756510871612>__**`)
  }
})

client.on("messageCreate", message => {
  if (message.content == "طلب تفعيل") {
    message.reply(`**__ اتمنى من الاداره يفعلو الاعضاء | <:pp292:1057635421917556776>
    
    For - <@&1057619628060323851> | <:emoji_3:1057626229760589824>__**`)
  }
})


// Code Auto Reply
client.on("messageCreate", message => {
  if (message.content == ".") {
    message.reply("**__أحلى من ينقط في الشات | <:emoji_3:1057626229760589824>__**")
  }
})


//رد

client.on('messageCreate', message => {

if (message.content == prefix + "off") {

message.delete()

message.channel.send(`__ <a:emoji_295:1030651844139171890>  تـم تـغـيـر حـالـة الـسـيـرفـر

<a:emoji_295:1030651844139171890> OFF
__`) // here link line

}

});
//رد
client.on('messageCreate', message => {

if (message.content == prefix + "on") {

message.delete()

message.channel.send(`__ <a:emoji_296:1030651762006311003>  تـم تـغـيـر حـالـة الـسـيـرفـر

<a:emoji_296:1030651762006311003> ON
__`) // here link line
}

});

let sug = ["1057619985851236383", "", ""]; // حط اي دي روم الاقتراحات
let line = "https://media.discordapp.net/attachments/1048916809249726536/1057321751207477288/New_Project_471_608A5EC.png"; // حط رابط الخط
client.on("messageCreate", function(message) {
  let args = message.content.split(",");
  if (message.author.bot) return;
  if (sug.includes(message.channel.id)) {
    message.delete()
    const embed = new Discord.MessageEmbed()
      .setAuthor({
        name: message.author.tag, iconURL:
          message.author.avatarURL({ dynamic: true })
      })
      .setColor(`RANDOM`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`> **${args}**`)
      .setTimestamp()
    let attachm = message.attachments.first()
    if (attachm) {
      embed.setImage(attachm.proxyURL)
    }
    message.channel.send({ embeds: [embed] }).then(msg => {
      msg.react(`👍`).then(() => {
        msg.react('👎')
      })
      message.channel.send({ files: [line] });
    })
      .catch(console.error)
  }
});

//ايمبد

client.on('messageCreate', async (messageCreate) => {
    if(messageCreate.content.startsWith('Embed')) {
    let mention = messageCreate.mentions.users.first()
    let args = message.content.split(" ").slice(1).join(" ");
  if(!args) return messageCreate.reply(" What to say?");
    let embed = new Discord.MessageEmbed()
     .setTitle("")
     .setColor("red")
     .setDescription(args)
    messageCreate.channel.send({embeds : [embed]})

    }
}) 
//

client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'قول')) {
      
if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`** :rolling_eyes: You don't have permissions **`)

      
let args = message.content.split(' ').slice(1).join(' ')
  
  if (!args) return message.reply('** :x: Please select a message **')
      
    message.delete();
      
    let embed = new MessageEmbed()
      
    .setAuthor(message.guild.name , message.guild.iconURL({ dynamic: true }))


    .setDescription(`**${args}**`) 
    .setThumbnail(message.guild.iconURL({ dynamic: true }))


.setColor(message.guild.me.displayHexColor)


   .setTimestamp()

let attach = message.attachments.first();

if (attach) {
   embed.setImage(attach.proxyURL)     
       }
   message.channel.send({embeds: [embed]});
    }
})


 


//بان 

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    let c = message.content.split(' ')
    if (c[0] == prefix + 'ban') {
        
if(!message.member.permissions.has("BAN_ROLES")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('BAN_ROLES')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
    let argss = message.content.split(' ')
    let user = message.guild.members.cache.get(argss[1]) || message.mentions.members.first();
    if(!user) return message.reply(`** 😕 Please mention or id **`);
    if(user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.fetchOwner().id) return message.reply(`** ❌ You can't ban this user**`);
      
    if(!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => {console.log(err)});
     await message.reply(`✅ **${user.user.tag} banned from the server!**✈️`);
    }
}) 
//unban

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'unban')) {
      
if(!message.member.permissions.has("BAN_ROLES")) return message.reply(`** 😕 You don't have permission **`);
   if(!message.guild.me.permissions.has('BAN_ROLES')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
      
    let args = message.content.split(' ')
    let id = args[1];
    if(!id)  return message.reply(`** 😕 Please mention or id **`);
    if(isNaN(id)) {
       return message.reply(`** 😕 Please mention or id **`);
    } else {
message.guild.members.unban(id).then(mmm => {
        message.reply(`✅ ** ${mmm.tag} unbanned!**`)
      }).catch(err => message.reply(`**I can't find this member in bans list**`));
      }
    }
}) 
//kick

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'kick')) {
   if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
    
  if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);
  
    let id = message.content.split(' ').slice(1).join(' ')
    let user = message.mentions.members.first() || message.guild.members.cache.get(id)
    if (!user) return message.reply(`** 😕 Please mention or id **`)
    if(user.roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position) return 
  message.reply(`** ❌ You can't ban this user **`)
    if(user.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply(`** ❌ You can't ban this user **`)
    user.kick().then(() => message.reply(`**✅ @${user.user.username} kicked from the server!**`)).catch(err => message.reply(err))
    }
}) 



//lock&unlock

client.on('messageCreate', message => {
  if(message.content.startsWith(prefix + 'قفل')){
    if(!message.member.permissions.has('1027276307496697905'))return;
    let oqdl = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('lock-oqdl')
      .setLabel('lock')
      .setStyle('PRIMARY')
      .setEmoji('🔒'),
      new MessageButton()
      .setCustomId('unlock-oqdl')
      .setLabel('unlock')
      .setStyle('SUCCESS')
      .setEmoji('🔓'),
    )
    message.channel.send({content: '_ _', components: [oqdl]})
    const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', max: 1,time: ms('10s')})

    collector.on('collect', oqdl => {
      if(!oqdl.member.permissions.has('1027276307496697905'))return;
      if(oqdl.customId === 'lock-oqdl'){
        oqdl.channel.permissionOverwrites.edit(
          oqdl.guild.roles.everyone, {
            SEND_MESSAGES: false,
          }
        )
        oqdl.update({content: `🔒${oqdl.channel} **has been locked.**`, components:[]})
      }
      if(oqdl.customId === 'unlock-oqdl'){
        oqdl.channel.permissionOverwrites.edit(
          oqdl.guild.roles.everyone, {
            SEND_MESSAGES: true,
          }
        )
        oqdl.update({content: `🔓${oqdl.channel} **has been unlocked.**`, components:[]})
      }
    })
  }
})


//rol

  
client.on("messageCreate", message => {
  let cmd = message.content.toLowerCase().split(" ")[0];
  cmd = cmd.slice(prefix.length);
  if (cmd === "رتبة") {""
    if (!message.channel.guild || message.author.bot) return;
    let args = message.content.split(" ");
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[1])
    );
    var role = message.content.split(" ").slice(2).join(" ").toLowerCase();
    var role1 = message.guild.roles.cache.filter(r => r.name.toLowerCase().indexOf(role) > -1).first();
    if (!message.guild.members.cache.get(client.user).permissions.has("MANAGE_ROLES"))
      return message.channel.send({ content: `❌ **I Need Permissions !!**` });
    if (!message.guild.members.cache.get(message.author).permissions.has("MANAGE_ROLES"))
      return;
    if (!user) return message.channel.send({ content: `**✅ ${prefix}role <@mention or iD> role**` });
    if (!role) return message.channel.send({ content: `**✅ ${prefix}role <@mention or iD> role**` });
    if (!role1) return message.channel.send({ content: `**✅ ${prefix}role <@mention or iD> role**` });
    if (user.roles.cache.find(c => c.id === role1.id))
      return user.roles.remove(role1).then(() => {
message.channel.send({ content: `**✅ Changed roles for ${user.user}  removed ${role1.name}**` });
})

user.roles.add(role1).then(() => {
        message.channel.send(
          `**✅ Changed roles for ${user.user} ${role1.name}**`
        );
      })
      
  }
});
//kill

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60);



{
}


   process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        //console.log(type, promise, reason);
    }); 

 

client.on('ready',async () => {
let Server = client.guilds.cache.get("915372346431373343");/// ايدي السيرفر
let Channel = Server.channels.cache.get("1058692810469019658");/// ايدي الروم
///r , الباقي ان شاء الله م تحتاجهم
if(Channel.type === 'voice') {
Channel.join();
setInterval(() => {
if(Server.me.voice.channel && Server.me.voice.channelID !== Channel.id || !Server.me.voice.channel) Channel.join()
}, 1);
} else {
}
});

  client.on('messageCreate', async (message) => {
    if(message.content == 'top-server') {

       const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);
       
       const description = guilds.map((guild, index) => {
         return `\`#${index+1}\` | **${guild.name}** -> **\_\_${guild.memberCount}\_\_** members`
       }).join(`\n\n`)
         
       const embed = new MessageEmbed()
         .setTitle('Top Guilds')
         .setDescription(description)
         .setColor("RANDOM")
         
       message.channel.send({embeds: [embed]})
     }
})
 
 
//////membersCount
client.on('messageCreate', message => {

  if (message.content.startsWith(prefix + 'members')) {
    if (message.author.bot) {
      return;
    };


    const Count = new MessageEmbed()
      .setColor('2F3136')
      .setTitle(`**${message.guild.name}\' Member Count**`)
      .setDescription(`
**> :computer: Total Members : ${message.guild.memberCount}**
**> :boy: Humans : ${message.guild.members.cache.filter(m => !m.user.bot).size}**
**> :robot: Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}**`)
      .setFooter({
        text: `${client.user.username} • Asked by ${message.author.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp()

    message.channel.send({ embeds: [Count] })
  }
})
 
 
 
 client.on("messageCreate", async message => {
    if (message.author.bot) return;
if (!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'خاص')) {
      
if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`** :rolling_eyes: You don't have permissions **`)
      
let id = message.content.split(' ')[1]
      
let user = message.mentions.members.first() || message.guild.members.cache.get(id)
      
let argss = message.content.split(' ').slice(2).join(' ')
if (!user) return message.channel.send(`**:rolling_eyes: Please mention member or id **`)


if (!argss) return message.channel.send(`**:x: Please send something **`)

let attach = message.attachments.first()
if (attach) {


    user.send({content: argss, files: [attach]}).then(m => {
        message.channel.send(`**:white_check_mark: Done message sent **`)
    }).catch(err => {
        return message.channel.send(`**:x: Can't send message to this user**`)
    })
} else {
    user.send(argss).then(m => {
        message.channel.send(`**:white_check_mark: Done message sent **`)
    }).catch(err => {
        return message.channel.send(`**:x: Can't send message to this user**`)
    })
      }
    }
})

client.on("messageCreate", message => {
    if(message.channel.id == "1057619980604166154") {
        message.react("🤍")
        message.react("")
    }
})


 client.login(process.env.token);
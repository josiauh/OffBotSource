
                (async()=>{
                const Discord = require("discord.js");
                const Database = require("easy-json-database");
                const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                const s4d = {
                    Discord,
                    database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
                    joiningMember:null,
                    reply:null,
                    tokenInvalid:false,
                    tokenError: null,
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                    partials: ["REACTION"]
                });

                await s4d.client.login('').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('guildMemberAdd', async (param1) => {
s4d.joiningMember = param1;
  if (s4d.database.has(String((String(s4d.joiningMember.guild) + '_welcomemsg')))) {
    s4d.client.channels.cache.find((channel) => channel.name === 'General').send(s4d.database.get(String((String(s4d.joiningMember.guild) + '_welcomemsg'))));
  } else {
    s4d.client.channels.cache.find((channel) => channel.name === 'General').send(String((['Welcome ',s4d.joiningMember,'! I am OffBot! I manage this server when mods or owners are not here!'].join(''))));
  }
s4d.joiningMember = null
});

s4d.client.on('messageCreate', async (s4dmessage) => {
  if ((s4dmessage.content) == 'o!wmsg') {
    (s4dmessage.channel).send(String('New welcome message?'));
    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, { time: (10*60*1000), max: 1 }).then(async (collected) => { s4d.reply = collected.first().content;
       (s4dmessage.channel).send(
              {
                  embed: {
                      title: (s4d.database.has(String((String(s4dmessage.guild) + '_welcomemsg'))) ? 'Set and deployed!' : 'Created!'),
                      color: null,
                      image: { url: 'https://i.ibb.co/QdDKVPG/FDA3-E37-C-2-B35-4524-AEEF-27-C8-C80-AA44-E.png' },

                      description: 'We did the action you requested!',
                      footer: { text: 'OffBot' },
                      thumbnail: { url: null }

                  }
              }
          );
      s4dmessage.react('👍');s4d.database.set(String((String(s4dmessage.guild) + '_welcomemsg')), (s4d.reply));

     s4d.reply = null; }).catch(async (e) => { console.error(e);   (s4dmessage.channel).send(
              {
                  embed: {
                      title: 'You didn’t respond!',
                      color: null,
                      image: { url: 'https://i.ibb.co/QdDKVPG/FDA3-E37-C-2-B35-4524-AEEF-27-C8-C80-AA44-E.png' },

                      description: 'We cancelled the action you wanted. Sorry!',
                      footer: { text: 'OffBot' },
                      thumbnail: { url: null }

                  }
              }
          );
     });}

});


                return s4d;
                })();
            

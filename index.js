  const Discord = require("discord.js");
const Gamedig = require('gamedig');
const fs = require("fs");
const cfg = require("./sunucubilgileri.json");
const bot = new Discord.Client();
bot.komutlar = new Discord.Collection();

bot.on("ready", async () => {
  (console.log(`Bağlantı kuruldu.`))
  setInterval (function () {
    
Gamedig.query({
    type: 'mtasa',
    host: cfg.ip,
    port: cfg.port
 }).then((state) => {
  bot.user.setActivity(`❤️Aktif Oyuncular : ${state.raw.numplayers}/${state.maxplayers}`, { type: 'WATCHING' })
}).catch((error) => {
bot.user.setActivity('👷Sunucu Bakımda', { type: 'WATCHING' })
});
  }, 10 * 1000); 
});

fs.readdir("./komutlar/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./komutlar/${f}`);
    bot.komutlar.set(props.help.name, props);
  });
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dnd") return;
  if(!message.content.startsWith(cfg.prefix)) return;

  let messageArray = message.content.toLowerCase().split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.komutlar.get(cmd.slice(cfg.prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
});
bot.login("BURAYA BOT TOKENİNİZ")
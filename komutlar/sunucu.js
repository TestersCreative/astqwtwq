const Discord = require("discord.js");
const Gamedig = require("gamedig");
const cfg = require("../sunucubilgileri.json");

module.exports.run = async (bot, message, args) => {
  Gamedig.query({ type: "mtasa", host: cfg.ip, port: cfg.port }).then(
    (state) => {
      const password = state.password;
      const result = getResult(password);
      function getResult(password) {
        if (password === false) {
          return "Deag";
        } else if (password === true) {
          return "Deag"; 
        }
      }
      let emb = new Discord.MessageEmbed()
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
        .setTitle(`İp adresi : ${state.connect}`)
        .addField(
          `İsim : ${state.name}`,
          `Oyuncular : ${state.players.length}/${state.maxplayers}
           Oyun modu : ${state.raw.gametype}
           Versiyon : ${state.raw.version}
           Ping : ${state.ping}`,
          true
        )
        .setColor("#36393f")
        .setTimestamp()
        .setFooter("Author Deag");
      message.channel.send(emb);
    }
  );
};

module.exports.help = {
  name: "sunucu",
};

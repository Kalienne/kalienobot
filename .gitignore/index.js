const Discord = require('discord.js')
const bot = new Discord.Client()
const PornHub = require('./commands/porn')
const Help = require('./commands/help')
const fonda = require('./commands/fonda')
const Google = require('./commands/google')
const Play = require('./commands/play')
const Random = require('./commands/random')
const Youtube = require('./commands/youtube')
const Smiley = require('./commands/smiley')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("!k")


bot.on('ready', function () {
  // bot.user.setAvatar('./avatar.png').catch(console.error)
  bot.user.setGame('Préfix : !k , V0.2').catch(console.error)
})


bot.on('guildMemberAdd', function (member) {
  member.createDM().then(function (channel) {
    return channel.send('Bienvenue sur le channel ' + member.displayName)
  }).catch(console.error)
})

bot.on('message', function (message) {
  let commandUsed =
  Help.parse(message) ||
  Google.parse(message) ||
  fonda.parse(message) ||
  PornHub.parse(message) ||
  Play.parse(message) ||
  Random.parse(message) ||
  Youtube.parse(message) ||
  Smiley.parse(message)
})

bot.login('NDM5NDExNzkyNDkwNTI4NzY5.DcSyjw.7y8wKZhOkcWvWAmmWb6rduTrnJA')

bot.on('message', message => {

  var msgauthor = message.author.id;

  if(message.author.bot)return;

  if(!db.get("xp").find({user: msgauthor}).value()){
      db.get("xp").push({user: msgauthor, xp: 1}).write();
  }else{
      var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
      console.log(userxpdb);
      var userxp = Object.values(userxpdb)
      console.log(userxp)
      console.log(`Nombre d'xp: ${userxp[1]}`)

      db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "xp"){
      var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
      var xpfinal = Object.values(xp);
      var xp_embed = new Discord.RichEmbed()
          .setTitle(`Stat des XP de ${message.author.username}`)
          .setColor('#F4D03F')
          .setDescription("Affichage des XP")
          .addField("XP:", `${xpfinal[1]} xp`)
          .setFooter("Enjoy :p")
      message.channel.send({embed: xp_embed});

}}})

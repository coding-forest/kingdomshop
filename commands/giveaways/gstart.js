const ms = require("ms");

exports.name = 'gstart'
module.exports.permissions = ['MANAGE_MESSAGES']
const getGuild = require('../../helpers/getGuild')
module.exports.execute = async (message, args, client) => {
  



  // Giveaway channel
  let giveawayChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
  // If no channel is mentionned
  if (!giveawayChannel) {
    return message.reply(":x: You have to mention a valid channel!");
  }

  // Giveaway duration
  let giveawayDuration = args[1];
  // If the duration isn't valid
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.reply(":x: You have to specify a valid duration!");
  }

  // Number of winners
  let giveawayNumberWinners = parseInt(args[2]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.reply(
      ":x: You have to specify a valid number of winners!"
    );
  }

  // Giveaway prize
  let giveawayPrize = args.slice(3).join(" ");
  // If no prize is specified
  if (!giveawayPrize) {
    return message.reply(":x: You have to specify a valid prize!");
  }
  // Start the giveaway

  var {config} = await getGuild(message.guild.id)
  var {embedColor, giveAwaysReaction} = config

  if(!giveAwaysReaction){
    giveAwaysReaction = '🎉'
  }


  
  const messages = {
    giveaway:
      (config.everyoneMention ? "@everyone\n\n" : "") +
      `${giveAwaysReaction} **GIVEAWAY** ${giveAwaysReaction}`,
    giveawayEnded:
      (config.everyoneMention ? "@everyone\n\n" : "") +
      `${giveAwaysReaction} **GIVEAWAY ENDED** ${giveAwaysReaction}`,
    drawing:  `Ends: **{timestamp}**`,
    inviteToParticipate: `React with ${giveAwaysReaction} to participate!`,
    winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
    embedFooter: "Giveaways",
    noWinner: "Giveaway cancelled, no valid participations.",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "winner(s)",
    endedAt: "Ended at"
  }



  await client.giveawaysManager.start(giveawayChannel, {
    // The giveaway duration
    duration: ms(giveawayDuration),
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: parseInt(giveawayNumberWinners),
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // Messages
    messages,
    // Embed Color
    embedColor,
    // reaction
    reaction: giveAwaysReaction,
  });
  message.reply(`Giveaway started in ${giveawayChannel}!`);
}

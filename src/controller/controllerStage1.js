const sendMensage = require("../util/const");

module.exports.sendPromotion = async function (user, client) { 

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/1.jpeg',
    '1.jpeg',
  ).then((result) => {})
  .catch((erro) => {
    
  });

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/2.jpeg',
    '2.jpeg',

  ).then((result) => {})
  .catch((erro) => {
    
  });

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/3.jpeg',
    '3.jpeg',

  ).then((result) => {})
  .catch((erro) => {
    
  });

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/4.jpeg',
    '4.jpeg',

  ).then((result) => {})
  .catch((erro) => {
  });

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/5.jpeg',
    '5.jpeg',

  ).then((result) => {})
  .catch((erro) => {
  });

  await client.sendImage(
    user,
    'src/asserts/img/promocoes/6.jpeg',
    '6.jpeg',

  ).then((result) => {})
  .catch((erro) => {
  });

  await client.sendText(
    user, sendMensage.MENU
  ).then((result) => {})
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error 
  });

};


module.exports.sendPromotionForClient = async function (user, client) { 
await client.forwardMessages(
    '5581995076740@c.us', '556186256165-1610145263@g.us'
    // ['false_000000000000@c.us_B70847EE89E22D20FB86ECA0C1B11609','false_000000000000@c.us_B70847EE89E22D20FB86ECA0C1B11777']
  ).then((result) => {
      console.log('Result: ', result); //return object success
  })
  .catch((erro) => { 
      console.error('Error when sending: ', erro); //return object error
  });

};
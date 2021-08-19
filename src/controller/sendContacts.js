const sendMensage = require("../util/const");


module.exports.sendContacts = async function (client, user, name) { 

  await client.sendText(
    user, sendMensage.CONTACT
  )

  await client
  .sendContactVcard(user, '558196695826@c.us', 'Suporte para Clientes GMAIS')
  

  await client.sendText(
    user, sendMensage.MENU
  )

}
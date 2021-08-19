const sendMensage = require("../util/const");


module.exports.sendContacts = async function (client, user, name) { 

  await client.sendText(
    user, sendMensage.CONTACT
  )

  await client
  .sendContactVcard(user, '55819999999@c.us', 'Suporte para Clientes')
  

  await client.sendText(
    user, sendMensage.MENU
  )

}
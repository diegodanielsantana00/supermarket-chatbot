const sendMensage = require("../util/const");


module.exports.sendContactsNotMenu = async function (client, user, name) { 

  await client.sendText(
    user, sendMensage.CONTACT
  )

  await client
  .sendContactVcard(
    user, 
    '558199999999@c.us', 
    'Suporte para Clientes'
  )
  

}
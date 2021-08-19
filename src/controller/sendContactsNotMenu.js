const sendMensage = require("../util/const");


module.exports.sendContactsNotMenu = async function (client, user, name) { 

  await client.sendText(
    user, sendMensage.CONTACT
  )

  await client
  .sendContactVcard(
    user, 
    '558196695826@c.us', 
    'Suporte para Clientes GMAIS'
  )
  

}
const banco = require("../config/banco");
const fire = require('../config/firebase-config') 

module.exports.controlStage10 = async function (client, user, name, msg) { 

  client.sendText(
    '556186256165-1610145263@g.us' , "✅✅✅✅✅✅✅✅\n\n *ADICIONAL*\n\n *Nº Do pedido* " + banco.db[user].numeroDoPedidoDeAdd 
    + "\n *Data*: "+  banco.db[user].dataDoPedido 
    + "\n *Nome do Cliente:* " + name 
    + "\n\n 📜 *ADICIONAL de compra*: \n\n" + banco.db[user].listaDeComprasAdicional
  ).then((result) => {})
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error 
  });

  // await client
  // .sendContactVcard("556186256165-1610145263@g.us", user, name)
  // .catch((erro) => {
  //   console.error('Error when sending: ', erro); //return object error
  // });

};
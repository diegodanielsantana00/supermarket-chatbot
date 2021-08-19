const banco = require("../config/banco");
const sendMensage = require("../util/const");
const { sendContactsNotMenu } = require("../controller/sendContactsNotMenu");


function execute(user, msg, name, client, id) { 

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [
      sendMensage.ERROFILE,
      sendMensage.FINISHED.DEADLINE,
      sendMensage.FINISHED.ADD 
    ]
  }


  if(msg === "1") {
    banco.db[user].listaDeComprasAdicional = ''
    banco.db[user].stage = 10
    return [
      "⚠️*Atenção:* Caso seu pedido já estiver fechado, não sera possível adicionar os produtos.",
      "Digite seu *PRODUTO* para ser adicionado no seu pedido:"  
    ]
  }

  if(msg === "2") {
  sendContactsNotMenu(client, user);
  return [
  ];
  }

  if(msg === "3") {
    banco.db[user].stage = 0
    // clearTimeout(tempoDeInatividade1)
    clearTimeout(tempoDeInatividade2)
    return [
     sendMensage.FINISHED.END
    ];
    }

  return [
        sendMensage.FINISHED.DEADLINE,
        sendMensage.FINISHED.ADD
      ]
}

exports.execute = execute;
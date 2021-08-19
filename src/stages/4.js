const banco = require("../config/banco");
const sendMensage = require("../util/const");

function execute(user, msg, name) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      "👩🏼‍💼Desculpe mas não entendi seu 🚚 *ENDEREÇO DE ENTREGA*. \n\n🖊️ *Digite seu endereço novamente.*"
      
    ]
  }

  if (msg === "2") {
    banco.db[user].stage = 1;
    return [ 
      sendMensage.CANCEL_ORDER, 
      "👩🏼‍💼Olá " + name + sendMensage.WELCOME,
      sendMensage.MENU
    ];
  }

  if (msg === "1" && banco.db[user].endereco != "") {
    banco.db[user].stage = 5;
    return [
      sendMensage.ITENS_FIND
    ]
  }
  if (!msg || msg.length >= 1) {
    banco.db[user].endereco += msg + "\n";
    banco.db[user].enderecoimpressao += msg + "\n"
    return [
    "👩🏼‍💼Confirme seu *ENDEREÇO DE ENTREGA*: \n\n" + banco.db[user].enderecoimpressao,
    "Digite a próxima linha do seu endereço de entrega ou digite umas das *OPÇÕES ABAIXO*: \n\n1️⃣ Confirmar endereço de entrega \n2️⃣ Cancelar o pedido",
    ];
  }else{
    banco.db[user].stage = 4;
    return [
      "👩🏼‍💼Desculpe mas não entendi seu 🚚 *ENDEREÇO DE ENTREGA*. \n\n🖊️ *Digite seu endereço novamente.*"
    ];
  }
}

exports.execute = execute;
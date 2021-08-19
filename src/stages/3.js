const banco = require("../config/banco");
const sendMensage = require("../util/const");

function execute(user, msg, name) { 

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.WITHDRAWAL
    ]
  }

if (msg === "1"  && banco.db[user].endereco == "") {
  banco.db[user].enderecoimpressao = banco.db[user].endereco;
      banco.db[user].stage = 4;
      return [
        sendMensage.ASK_ADDRESS.ASK, 
        "🚚 Digite seu *ENDEREÇO DE ENTREGA*:"
      ]
    }

if(msg === "1"){
      banco.db[user].enderecoimpressao = banco.db[user].endereco;
      banco.db[user].stage = 8
      return[
        "👩🏼‍💼 Pegamos seu endereço do seu *ÚLTIMO PEDIDO* 🛒: \n\n" + banco.db[user].endereco,
        "Digite o *NÚMERO* para\n\n1️⃣ Confirmar endereço \n2️⃣ Mudar de endereço"
      ]
    }

  if (msg === "2") { 
    banco.db[user].enderecoimpressao = "Retirada no local\n\n 🛒 Endereço do supermercado:\nR. João Fragoso de Medeiros, 258 - Candeias, Jaboatão dos Guararapes - PE, 54430-250 "
    banco.db[user].stage = 5;
    return [
      sendMensage.ITENS_FIND
    ];
  }
  if (msg === "3") {
    banco.db[user].stage = 1;
    return [ sendMensage.CANCEL_ORDER, 
      "👩🏼‍💼Olá " + name + sendMensage.WELCOME,
      sendMensage.MENU
    ];
  }
  return [
    sendMensage.NO_ANSWER.LONG,
    sendMensage.WITHDRAWAL,
  ];
}

exports.execute = execute;

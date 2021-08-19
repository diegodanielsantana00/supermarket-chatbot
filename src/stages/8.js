const banco = require("../config/banco");
const sendMensage = require("../util/const");

function execute(user, msg) { 

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      "Digite o *NÚMERO* para\n\n1️⃣ Confirmar endereço \n2️⃣ Mudar de endereço"   
    ]
  }

    if(msg === "1"){
        banco.db[user].stage = 5;
        return [
         sendMensage.ITENS_FIND
        ]
      }
    if(msg === "2"){
        banco.db[user].enderecoimpressao = banco.db[user].endereco;
        banco.db[user].endereco = ""
        banco.db[user].enderecoimpressao = ""
        banco.db[user].stage = 4
        return [
            sendMensage.ASK_ADDRESS.ASK, 
            "🚚 Digite seu *ENDEREÇO DE ENTREGA*:"
          ]
      }
  return [sendMensage.CANCEL_ORDER,
        "Digite o *NÚMERO* para\n\n1️⃣ Confirmar endereço \n2️⃣ Mudar de endereço" 
      ]
}

exports.execute = execute;
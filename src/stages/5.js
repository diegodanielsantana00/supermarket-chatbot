const banco = require("../config/banco");
const sendMensage = require("../util/const");


function execute(user, msg) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.ITENS_FIND
    ]
  }
  if (msg === "1") {
    banco.db[user].faltaitens =sendMensage.CHANGE_ITEM.SUCESS;
    banco.db[user].stage = 6;
    return [sendMensage.PAYMENTS_METHOD];
  }
  if (msg === "2") {
    banco.db[user].faltaitens = sendMensage.CHANGE_ITEM.ERROR;
    banco.db[user].stage = 6;
    return [
      sendMensage.PAYMENTS_METHOD
    ];
  }
  if (msg === "3") {
    banco.db[user].faltaitens = "Caso algum item esteja em falta, cancele todo meu  pedido";
    banco.db[user].stage = 6;
    return [
      sendMensage.PAYMENTS_METHOD
    ];
  }
  return [
    sendMensage.NO_ANSWER.LONG,
    sendMensage.ITENS_FIND
  ];
}

exports.execute = execute;

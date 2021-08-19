const banco = require("../config/banco");
const sendMensage = require("../util/const");



function execute(user, msg, name, client, id) { 

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.SHOPPING_LIST.UNKNOWN   
    ]
  }


  if(msg === "1") {

  }
  if(msg === "2") {

    banco.db[user].stage = 1
    return["👩🏼‍💼Olá " + name + sendMensage.WELCOME ,
    sendMensage.MENU];

  }
    return [
      sendMensage.SHOPPING_LIST.UNKNOWN
      ];

}

exports.execute = execute;
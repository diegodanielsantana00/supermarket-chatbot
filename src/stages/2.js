const banco = require("../config/banco");
const sendMensage = require("../util/const");
const fire = require('../config/firebase-config') 

function execute(user, msg, name) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.SHOPPING_LIST.UNKNOWN
    ]
  }

 switch (msg) {
  case "2": case "2️⃣": case "Dois": case "Número dois":
    banco.db[user].stage = 1;
    return [
      sendMensage.CANCEL_ORDER,
      "👩🏼‍💼Olá " + name + sendMensage.WELCOME ,
       sendMensage.MENU
    ];
   
   case "#": case "#️⃣": case "Hashtags": case "Jogo da velha": case "Hashtag":
   banco.db[user].stage = 1;
   return [
     "👩🏼‍💼Olá " + name + sendMensage.WELCOME , sendMensage.MENU
   ];
 
   default:
     break;
 }

  if (msg === "1" && banco.db[user].listaDeCompras != '' ) {
    banco.db[user].stage = 3;
    return [
      sendMensage.WITHDRAWAL
    ];
  }

  if (!msg || msg.length >= 4) {
    banco.db[user].listaDeCompras += msg + "\n";
    
    return [
    "👩🏼‍💼Confirme sua *LISTA DE COMPRAS* : \n\n" + banco.db[user].listaDeCompras ,
    sendMensage.SHOPPING_LIST.CONFIRM
    ];
  }else{
    banco.db[user].stage = 2;
    return [
      sendMensage.SHOPPING_LIST.UNKNOWN
      ];
  }
}


exports.execute = execute;

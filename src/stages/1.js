const banco = require("../config/banco");
const sendMensage = require("../util/const");
const { getAdrress } = require("../controller/controllerStage0");
const { sendPromotion } = require("../controller/controllerStage1");
const { sendContacts } = require("../controller/sendContacts");


function execute(user, msg, name, client) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD' ){
    return [sendMensage.ERROFILE,
      sendMensage.MENU
    ]



  }

  switch (msg){

    case "1": case "1️⃣": case "Um": case "Número um":
     getAdrress(user);
     banco.db[user].stage = 2;
     banco.db[user].listaDeCompras = ''
      return [
        sendMensage.SHOPPING_LIST.ASK + "\n\n" + sendMensage.RETURN.BACK, 
        sendMensage.SHOPPING_LIST.SEND
      ]
  
    case "2": case "2️⃣": case "Dois": case "Número dois":
      return [
        sendMensage.SCHEDULE,
        sendMensage.MENU
      ];

    case "3": case "3️⃣": case "Três": case "Número três":
      return [
        sendMensage.SUPERMARKET_ADDRESS.DOM_HELDER +
        sendMensage.SUPERMARKET_ADDRESS.CATAMARA +
        sendMensage.SUPERMARKET_ADDRESS.CABO +
        sendMensage.SUPERMARKET_ADDRESS.MEGAVERDE,
        sendMensage.MENU
      ];

    case "4": case "4️⃣": case "Quatro": case "Número quatro":
      return [
        sendMensage.COMMON_QUESTIONS,
        sendMensage.MENU
      ];

    case "5": case "5️⃣": case "Cinco": case "Número quatro":
      sendPromotion(user, client, name);
      return ["👩🏼‍💼 Segue as promocões do dia.",
     ];

    case "6": case "6️⃣": case "Seis": case "Número seis":
      sendContacts(client, user);
      return [
      ];
    case "1*92%7045#-MANU":
      banco.db[user].stage = 11;
      return [
        "👩🏼‍💼Bem Vindo a Área de Marketing✅\n\nGestora: 👩🏼‍💼*Manu*\n\n" + "*Oque você deseja fazer?*\n\n1️⃣ Enviar arte para *TODOS* os clientes  \n2️⃣ Voltar ao menu anterior"
      ];
    case "Teaaste": 
    sendPromotionForClient(user, client, name)
      return[]
  
    default:
      break;
  }
    return [
      sendMensage.NO_ANSWER.LONG,
      sendMensage.MENU
    ];  

}

exports.execute = execute;

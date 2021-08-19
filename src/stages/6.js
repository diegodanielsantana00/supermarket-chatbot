const banco = require("../config/banco");
const sendMensage = require("../util/const");

function execute(user, msg) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.PAYMENTS_METHOD
    ]
  }
  switch (msg.toUpperCase()) {

    case "1": case "1️⃣": case "um": case "número um":
     banco.db[user].formaDePagamento = "Dinheiro";
     banco.db[user].stage = 7;
     return ["👩🏼‍💼Você escolheu está forma de pagamento:\n\n💵 "
      + banco.db[user].formaDePagamento,
      sendMensage.FINISHED.ASK_ORDER
    ];
    
    case "2": case "2️⃣": case "dois": case "número dois":
      banco.db[user].formaDePagamento = "Cartão";
      banco.db[user].stage = 7;
    return ["👩🏼‍💼Você escolheu está forma de pagamento:\n\n💳 "
      + banco.db[user].formaDePagamento +
      sendMensage.FINISHED.ASK_ORDER
    ];
  
    case "3": case "3️⃣": case "três": case "número três":
     banco.db[user].formaDePagamento = "Transferência Bancária ou Pix";
     banco.db[user].stage = 7;
     return ["👩🏼‍💼Você escolheu está forma de pagamento:\n\n💸 "
      + banco.db[user].formaDePagamento + 
     sendMensage.FINISHED.ASK_ORDER
    ];

    default:
      break;
  }
  return [
    sendMensage.NO_ANSWER.LONG,
    sendMensage.PAYMENTS_METHOD
  ];
}

exports.execute = execute;
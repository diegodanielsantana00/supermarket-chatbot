const banco = require("../config/banco");
const sendMensage = require("../util/const");
const serialport = require('serialport');
const escpos = require('escpos');
escpos.SerialPort = require('escpos-serialport');
const { deviceProa } = require("./7");
const { printerProa } = require("./7");
const { controlStage10 } = require("../controller/controllerStage10");


function execute(user, msg, name, client, id) { 

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.SHOPPING_LIST.UNKNOWN   
    ]
  }


  if(msg === "1" && banco.db[user].listaDeComprasAdicional != '' ) {
    controlStage10(client, user, name, msg)
    setTimeout(function() {
      escpos.Image.load(__dirname + '/../asserts/img/ADD.png', function (image) {
        deviceProa.open(function(error){
          printerProa
          .align('CT')
          .size( 0, 0)
          .image(image, 's8')
          .then(() =>{})
  
          printerProa
          .encode('windows1258')
          .font('b')
          .size( 1, 0)
          .align('LT')
          .text("\n\n------- DADOS DO CLIENTE -------\n\n" + 
          "Data: "+  banco.db[user].dataDoPedido + 
          // "\n\n Numero do pedido: " + banco.db[user].numeroDoPedidoDeAdd + 
          "\n Nome: " + name + 
          "\n Número Cliente: +" + user.slice(0, -5) + 
          "\n\n---- ADICIONAL DO PEDIDO:" + banco.db[user].numeroDoPedidoDeAdd +" ---- \n\n" + banco.db[user].listaDeComprasAdicional + "\n " , 860) 
          .qrimage("https://api.whatsapp.com/send?phone=" + user.slice(0, -5) + "N%C3%A3o%20foi%20poss%C3%ADvel%20adicionar%20os%20seus%20itens%20nas%20suas%20compras%2C%20pois%20j%C3%A1%20fechamos%20ela", { type: 'png', mode: 'dhdw', size: 2, margin: 32 }, function(err){
            this.cut();
            this.close();
            deviceProa.on('close', function () {}); 
            })
        });  
      });
    }, 2000);
    banco.db[user].stage = 9
    return [
      "👩🏼‍💼Seu(s) item(s):\n\n" + banco.db[user].listaDeComprasAdicional  + "\nForam adicionado *COM SUCESSO* ✅ por favor aguarde\n\n⌛ *Prazo de 2-4 horas* (Dentro do horário comercial para entrega 8h-20h)",
      sendMensage.FINISHED.ADD
    ]
  }

  if (!msg || msg.length >= 4) {
    banco.db[user].listaDeComprasAdicional += msg + "\n";
    
    return [
    "👩🏼‍💼Confirme sua *LISTA DE ADICIONAIS* : \n\n" + banco.db[user].listaDeComprasAdicional ,
    sendMensage.SHOPPING_LIST.CONFIRM
    ];
  }else{
    banco.db[user].stage = 10;
    return [
      sendMensage.SHOPPING_LIST.UNKNOWN
      ];
  }
}

exports.execute = execute;
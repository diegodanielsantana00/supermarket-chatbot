const banco = require("../config/banco");
const serialport = require('serialport');
const escpos = require('escpos');
const sendMensage = require("../util/const");
const { control } = require("../controller/controllerStage7");
escpos.SerialPort = require('escpos-serialport');
const device = new serialport('COM6')
const options = { encoding: "utf8" }// encoding is optional
const printer = new escpos.Printer(device, options);
const date = require('date-and-time');

module.exports.deviceProa = device
module.exports.printerProa = printer

function execute(user, msg, name, client) {

  if (msg.slice(0, 4) == '/9j/' || !msg || msg.slice(0, 11) == 'BEGIN:VCARD'){
    return [sendMensage.ERROFILE,
      sendMensage.FINISHED.ASK_ORDER   
    ]
  }

   if (msg === "1") {
     
    banco.db[user].dataDoPedido = date.format(new Date(), 'DD/MM/YYYY HH:mm:ss')
    control(client, user, name, msg); 
    //////////////////////////////////////////////
    setTimeout(function() {
    escpos.Image.load(__dirname + '/../asserts/img/Logo.png', function (image) {
      device.open(function(error){
        printer
        .align('CT')
        .size( 0, 0)
        .image(image, 's8')
        .then(() =>{})

        printer
        .encode('windows1258')
        .font('b')
        .size( 1, 0)
        .align('LT')
        .text("\n\n Digite 3 Para confirmar a entrega\n\n\n------- DADOS DO CLIENTE -------\n\n" + 
        " Data: "+  banco.db[user].dataDoPedido + 
        "\n\n Numero do pedido: " + banco.db[user].numeroDoPedido + 
        "\n Nome: " + name + 
        "\n Número Cliente: +" + user.slice(0, -5) + 
        " \n Forma de Pagamento: " + banco.db[user].formaDePagamento + 
        "\n Falta de Item: " + banco.db[user].faltaitens +
         "\n\n----------- ENDEREÇO -----------\n\n" + banco.db[user].enderecoimpressao
          + "\n\n------- LISTA DE COMPRAS ------- \n\n" + banco.db[user].listaDeCompras + "\n " , 860) 
        .qrimage("https://api.whatsapp.com/send?phone=" + user.slice(0, -5) + "&text=Ol%C3%A1%20Sou%20o%20separador%20de%20compras%20do%20Supermercado%2C%20Irei%20separar%20suas%20compras%2C%20qualquer%20duvida%20ou%20adicional%20%C3%A9%20s%C3%B3%20falar%20por%20aqui%2C%20irei%20lhe%20informa%20o%20pre%C3%A7o%20final%20assim%20que%20passar%20suas%20compras%20no%20caixa", { type: 'png', mode: 'dhdw', size: 2, margin: 32 }, function(err){
          this.cut();
          this.close();
          device.on('close', function () {}); 
          })
      });  
    });
    banco.db[user].numeroDoPedidoDeAdd = '';
    banco.db[user].numeroDoPedidoDeAdd = banco.db[user].numeroDoPedido;
  }, 2000);

  clearTimeout(tempoDeInatividade)









  // tempoDeInatividade1 = setTimeout(function() {
  //   banco.db[user].stage = 9
  //   //notificar pedido 
  //   client.sendText(
  //     user ,   "👩🏼‍💼Olá " + name + ", como você não nós deu um retorno até agora, estou aqui para saber se você recebeu seu pedido de número: *" + banco.db[user].numeroDoPedidoDeAdd + "* . \n\n3️⃣ *TRÊS* Recebi meu pedido\n2️⃣ *DOIS* Quero falar com um atendente",
  //   )
  // }, 14400000);

  tempoDeInatividade2 = setTimeout(function() {
    banco.db[user].stage = 0
    client.sendText(
      user, 
    )
  }, 21600000);







    banco.db[user].stage = 9
    return [
    ];
  }
  if (msg === "2") {
    banco.db[user].stage = 6;
    return [
      sendMensage.PAYMENTS_METHOD
    ];
  }
  if (msg === "3") {
    banco.db[user].stage = 1;
    banco.db[user].endereco = "";
    return [
      sendMensage.CANCEL_ORDER,
      "👩🏼‍💼Olá " + name + sendMensage.WELCOME , sendMensage.MENU
    ];
  }
 return ["👩🏼‍💼Você escolheu está forma de pagamento:\n\n "
      + banco.db[user].formaDePagamento,
     sendMensage.FINISHED.ASK_ORDER
    ];
}


exports.execute = execute;
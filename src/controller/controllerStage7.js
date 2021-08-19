const banco = require("../config/banco");
const sendMensage = require("../util/const");
const fire = require('../config/firebase-config') 

module.exports.control = async function (client, user, name, msg) { 
  var playersRef = fire.database().ref("Pedidos/");


  await playersRef.orderByKey().limitToLast(1).on("child_added", function(data) {
    banco.db[user].numeroDoPedido = data.key
  })

  await fire.database().ref("users/" + user.slice(0, -5) ).set({
    numeroDoCliente: user.slice(0, -5),
    nomeDoCliente: name,
    endereco:  banco.db[user].endereco,
  });

  const orderpedido = banco.db[user].numeroDoPedido
  const orderpedidoFormatado =  parseInt(orderpedido);

  banco.db[user].numeroDoPedido = orderpedidoFormatado + 1

  await fire.database().ref("Pedidos/" +  banco.db[user].numeroDoPedido).set({
    nomeDoCliente: name,
    listaDeCompras: banco.db[user].listaDeCompras,
    formadepagamento: banco.db[user].formaDePagamento,
    faltaitens: banco.db[user].faltaitens,
    data: banco.db[user].dataDoPedido,
    numeroDoCliente: user.slice(0, -5),
  });
//////////////////////////////////
  await client.sendImage(
    user,
    'src/asserts/img/done.png',
    'done.png',
    " *Número do Pedido*: " + banco.db[user].numeroDoPedido 
    + " \n *Nome*: " + name 
    + " \n *Forma de Pagamento*: " + banco.db[user].formaDePagamento 
    + "\n *Opção de falta de itens*: " + banco.db[user].faltaitens 
    + "\n\n 🚚 *Endereço*:\n\n" + banco.db[user].enderecoimpressao 
    + "\n\n 📜 *Lista de compra*: \n\n" + banco.db[user].listaDeCompras 
    + "\n\n *_Nosso colaborador entrará em contato com você em breve_*\n*_Para lhe informar o preço da sua compra_*"
    
  )

  tempoDeInatividade1 = setTimeout(async function() {
  await client.sendText(
    user,
    "👩🏼‍💼⌛ *Prazo de 2-4 horas* (Dentro do horário comercial para entrega 8h-20h)" + sendMensage.FINISHED.ADD  
  )
 }, 10000);

  client.sendText(
    '556186256165-1610145263@g.us', 
    "🟢🟢🟢🟢🟢🟢🟢🟢🟢\n\n *Novo Pedido Nº* "
    + banco.db[user].numeroDoPedido + "\n *Data*: "
    +  banco.db[user].dataDoPedido + "\n *Nome do Cliente:* " 
    + name + " \n *Forma de Pagamento*: " 
    + banco.db[user].formaDePagamento + "\n *Opção de falta de itens*: "
    + banco.db[user].faltaitens + "\n\n 🚚 *Endereço*:\n\n"
    + banco.db[user].enderecoimpressao + "\n\n 📜 *Lista de compra*: \n\n" 
    + banco.db[user].listaDeCompras
  )

  await client
  .sendContactVcard(
    '556186256165-1610145263@g.us', 
    user, 
    name
  )

};
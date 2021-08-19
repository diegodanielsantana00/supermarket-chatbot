const venomInit = require("venom-bot");
const banco = require("./src/config/banco");
const stages = require("./src/stages");
const sendMensage = require("./src/util/const");
venomInit.create().then((client) => start(client));
let name;
var tempoDeInatividade;

function start(client) {

  client.onIncomingCall(async (call) => {
    client.sendText(call.peerJid, sendMensage.CALL_MSG);
  });
  client.onMessage((message) => {
    console.log(message);
    client.sendSeen(message.from);
    let resp = stages.step[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      showName(message),
      client,
      message.chatId,
    );

    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);
    }
  });

}

function showName(message){
  if(message.sender.pushname){
    return name = message.sender.pushname
  }else{
    return name =message.sender.verifiedName
  }
}

function getStage(user) {
  if (banco.db[user]) {
    // nao tenha
    return banco.db[user].stage;
  } else {
    //tenha
    banco.db[user] = {
      stage: 0,
    };
    return banco.db[user].stage;
  }

}
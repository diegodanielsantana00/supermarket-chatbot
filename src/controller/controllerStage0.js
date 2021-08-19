const banco = require("../config/banco");
const fire = require('../config/firebase-config') 

module.exports.getAdrress = async function (user) { 
  const playersRef = fire.database().ref("users/" + user.slice(0, -5));
  await playersRef.orderByKey().equalTo("endereco").on("value", function(data) {
    if (!!data.val() || data.val() == "" ){
        banco.db[user].endereco = data.val().endereco
    } else {
        banco.db[user].endereco = "";
    }
 });
};





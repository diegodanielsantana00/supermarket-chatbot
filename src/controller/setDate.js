const fire = require('../config/firebase-config');


module.exports = {
    saveData: function( req, callback){
        let name = req.username;

        fire.database().ref("users/"+ name).set({
            name: req.username,
            id: req.id,

        });
        callback(null, {
            "statuscode:": 200,
            "mensagem:": "deu certo"
        });

    }
}
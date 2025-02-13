const mongooose = require('mongoose')

function Dataconnect(url){
    return mongooose.connect(url).then(console.log("Mongo Db connected")
    ).catch((err)=>console.log(err)
    )
}

module.exports=Dataconnect
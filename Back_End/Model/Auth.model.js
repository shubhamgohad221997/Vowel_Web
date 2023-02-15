const { mongoose, Schema, model } = require("mongoose")
const AuthSchema = new Schema({
name:{type: 'string', required: true},
email:{type: 'string', required: true, unique:true},
phone:{type: 'string', required: false},
password:{type: 'string', required: true},
})
const User = model("Auth",AuthSchema)
module.exports=User

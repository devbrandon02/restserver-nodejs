const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{value} no es un rol valido'


}
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']

    },
    img:{
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValido
        
    },
    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }

});


usuarioSchema.methods.toJSON = function (){

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;

}
usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
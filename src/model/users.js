const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



//creating schema for middleware
const userSchema = new mongoose.Schema({
    name: {
          type : String,
          //validation
          required: true,
          //santization
          trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        validate(value){
            //by validator module
            if(!validator.isEmail(value)){
                throw new Error('Email Id is invalid')
            }
        }
    },
    age: {
         type : Number,
         //validation,
         default: 0,
         validate(value){
             if(value < 0){
                   throw new Error('Age must be a positive number')
             }  
         },
         trim: true,
         
    },
    task: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            //if (value.toLowerCase() !== 'password')
            if (value.includes('password')){

            throw Error('Please make another password')
            }
        }
    },
    tokens: [{
         token: {
             type: String,
             required: true
         }
    }]
})

userSchema.methods.generateAuthToken = async function () {
              const user = this
              const token = jwt.sign({_id: user._id.toString()}, 'thisisfromabhishek')

              //adding token id db
              user.tokens = user.tokens.concat({token})
              await user.save()

              return token
}




userSchema.statics.findByCredentials= async (email, password) => {
                    const user = await User.findOne({email})
                    if(!user){
                        throw new Error('Unable to login')
                    }

                    const isMatch = await bcrypt.compare(password, user.password)

                    if(!isMatch){
                        throw new Error('Unable to login')
                    }

                    return user
}





//using old function coz to bind arrow function does not bind
userSchema.pre('save',async function (next) {
    const user = this
    
    if(user.isModified('password')){
              user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('just before saving')
    next()
})

const User = mongoose.model('user', userSchema )


module.exports = User
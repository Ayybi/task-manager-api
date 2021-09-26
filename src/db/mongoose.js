const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api"),{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}


// const User = mongoose.model('User', {
//     name: {
//           type : String,
//           //validation
//           required: true,
//           //santization
//           trim: true
//     },
//     email: {
//         type: String,
//         require: true,
//         lowercase: true,
//         validate(value){
//             //by validator module
//             if(!validator.isEmail(value)){
//                 throw new Error('Email Id is invalid')
//             }
//         }
//     },
//     age: {
//          type : Number,
//          //validation,
//          default: 0,
//          validate(value){
//              if(value < 0){
//                    throw new Error('Age must be a positive number')
//              }  
//          },
//          trim: true,
         
//     },
//     task: {
//         type: Boolean,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value){
//             //if (value.toLowerCase() !== 'password')
//             if (value.includes('password')){

//             throw Error('Please make another password')
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Aybi-2',
//     email: 'abhishekvats010.av@gmail.com',
//     age: 52,
//     task: true,
//     password: 'agjssgsghd'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// });

// const me = new User({
//     name: 'Renu',
//     age: 26,
//     task: true
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((err) => {
//     console.log(err)
// });

//-----------------------------------------------------------------------
// const Task = mongoose.model('task',{
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         required: true
//     }
// })

// const user1 = new Task({
//     description: 'Project-3',
//     completed: false
    
// })

// user1.save().then(() => {
//     console.log(user1)
// }).catch((err) => {
//     console.log(err)
// });
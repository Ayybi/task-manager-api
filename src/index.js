const express = require('express')
require('./db/mongoose')
const mongodb = require('mongodb')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// const ObjectId = mongodb.ObjectId
// const id = new ObjectId("614ace75776e990b0cf9dca8")

// console.log(id.id)
// console.log(id.toHexString())

const app = express()
const port = process.env.PORT || 3000

//middleware function
// app.use((req, res, next) => {
//      if(req.method === 'GET'){
//       res.send('GET requests has been disabled')
//      }else{
//          next()
//      }
// })

// app.use((req, res, next) => {
//        res.status(500).send('Site under undermaintaince')
// })



app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})


//---------------------------bcrypt algo------------------------------------------
// without middleware ----new req---> run route handler
// with middleware ----- new req----> do something-----> run route handler
const jwt = require('jsonwebtoken')
const myFunction = async () => {
          
         const token = jwt.sign({_id: 'abc123'}, 'thisidfromabhishek', { expiresIn: '7 days'})

         console.log(token)

        // the second part needs to be same 
        const verify= jwt.verify(token, 'thisidfromabhishek')
        console.log(verify)


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9-base 64 encoded header contain info algo.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2MzI2NTc3MjZ9-payload or body json string 64 encode.qyj_HZRrryk5XsfnBdY7SyjSU6Tkelt6ph0A64Qpp1g-signature to verify


        //   const password = 'Abhishek@12'
        //   const hasdedPassword = await bcrypt.hash(password, 8)

        //   console.log(password)
        //   console.log(hasdedPassword)

        //  //const isMatch =  await bcrypt.compare('Abhishek@12', hasdedPassword)
        //   const isMatch =  await bcrypt.compare(password, hasdedPassword)
        //   console.log(isMatch)
}

myFunction()

//hashing algorithm only workd one way cannot be reversed




//----------------------Users collection-------------------------------
//-------------------------create data----------------------------------
// app.post('/users', async(req, res) => {
//     const user = new User(req.body)


//     try {
//         await user.save()
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // user.save().then(() => {
//     //     res.send(user)
//     // }).catch((err) => {
//     //     //chaining
//     //     res.status(400).send(err)
//     //     // res.send(err)
//     // });
// })
// //-------------read data-------------------------------------------------

// //to read data
// app.get('/users', async(req, res) => {
        
//       try {
//           const user = await User.find({})
//           res.send(user)
//       } catch (error) {
//           res.status(500).send(error)
//       }






//     // User.find({}).then((users) => {
//     //      res.send(users) 
//     // }).catch((err) => {
//     //     res.status(500).send()
//     // })
// })

// //--------------read by id----------------------------------------------
// app.get('/users/:id', async(req, res) => {

//     const _id= req.params.id

//         try {
//             const user = await User.findById(_id)
//             if(!user){
//                 return res.status(404).send()
//             }
//             res.send(user)
//         } catch (error) {
//             res.status(500).send(error)
//         }




    
//     // User.findById(_id).then((user) => {
//     //      if(!user){
//     //          return res.status(404).send()
//     //      }

//     //      res.send(user)
//     // }).catch((err) => {
//     //        res.status(500).send(err)
//     // })
//     // //  console.log(req.params)
    
// })

// //---------------patch()------------------------------------------------------
// app.patch('/users/:id', async(req, res) => {

//     const updates = Object.keys(req.body)
//      const allowedToUpdate = ['name', 'email','age','password','task']
//      const isValidOperation = updates.every((update) => allowedToUpdate.includes(update))

//      if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid Updates'})
//      }

//             try {
//                 const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//                 if(!user){
//                     return res.status(404).send()
//                 }

//                 res.send(user)
//             } catch (error) {
//                 res.status(400).send(error)
//             }
// })


// //-------------delete()-----------------------------------------------
// app.delete('/users/:id', async(req, res) => {
//       try {
//           const user = await User.findByIdAndDelete(req.params.id)
//           if(!user){
//               return res.status(404).send()
//           }
//           res.send(user)
//       } catch (error) {
//           res.status(500).send(error)
//       }
// })










//---------------------tasks collection------------------------------------------------------


//-------------------------------create data---------------------------------------
// app.post('/tasks', async(req, res) => {
//     const task = new Task(req.body)


//     try {
//         await task.save()
//         res.status(200).send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // task.save().then(() => {
//     //     res.status(201).send(task)
//     // }).catch((err) => {
//     //     //chaining
//     //     res.status(400).send(err)
//     //     // res.send(err)
//     // });
// })

// //---------------------read all data-----------------------------------------
// app.get('/tasks', async(req, res) => {

//      try {
//          const task = await Task.find({})
//          res.status(200).send(task)
//      } catch (error) {
//          res.status(500).send(error)
//      }
         


//     //    Task.find({}).then((tasks) => {
//     //       res.send(tasks)
//     //    }).catch((err) => {
//     //         res.status(500).send
//     //    })
// })

// //------------------readById-------------------------------------------------------
 
// app.get('/tasks/:id', async(req, res) => {

//     const _id= req.params.id

//           try {
//             const task = await Task.findById(_id)
//             if(!task){
//                 return res.status(404).send()
//             }

//             res.send(task)
//           } catch (error) {
//               res.status(500).send(error)
//           }
       


    
//     // Task.findById(_id).then((task) => {
//     //      if(!task){
//     //          return res.status(404).send()
//     //      }

//     //      res.send(task)
//     // }).catch((err) => {
//     //        res.status(500).send(err)
//     // })
//     // //  console.log(req.params)
    
// })



// //-------------patch()--------------------------------
// app.patch('/tasks/:id', async(req, res) => {
//     const updates = Object.keys(req.body)
//      const allowedToUpdate = ['description','completed']
//      const isValidOperation = updates.every((update) => allowedToUpdate.includes(update))

//      if(!isValidOperation){
//         return res.status(400).send({error: 'Invalid Updates'})
//      }

//             try {
//                 const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//                 if(!task){
//                     return res.status(404).send()
//                 }

//                 res.send(task)
//             } catch (error) {
//                 res.status(400).send(error)
//             }
// })




// //--------------delete()----------------------------------------------------
// app.delete('/tasks/:id', async(req, res) => {
//          try {
//              const task = await Task.findByIdAndDelete(req.params.id)
//              if(!task){
//                  return res.status(404).send()
//              }

//              res.send(task)
//          } catch (error) {
//              res.status(500).send(error)
//          }
// })




//-------------------------------listen-----------------------------------------------------



//Get for read and post for create





//C:\Users\"Abhishek vats"\mongodb\bin\mongod.exe --dbpath=C:\Users\"Abhishek vats"\mongodb-data


//bcrypt-algo
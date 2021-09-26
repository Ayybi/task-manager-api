const express = require('express')
const router = new express.Router()
const User = require('../model/users')
const auth = require('../middleware/authentication')





router.post('/users', async(req, res) => {
    const user = new User(req.body)


    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((err) => {
    //     //chaining
    //     res.status(400).send(err)
    //     // res.send(err)
    // });
})

//user checking
router.post('/users/login', async(req, res) => {
            try {
                const user = await User.findByCredentials(req.body.email, req.body.password)
                const token = await user.generateAuthToken()
                res.send({ user, token})
            } catch (error) {
                res.status(400).send({error: error.message})
            }
})








//-------------read data-------------------------------------------------

//to read data
router.get('/users', auth ,async(req, res) => {
        
      try {
          const user = await User.find({})
          res.send(user)
      } catch (error) {
          res.status(500).send(error)
      }






    // User.find({}).then((users) => {
    //      res.send(users) 
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

//--------------read by id----------------------------------------------
router.get('/users/:id', async(req, res) => {

    const _id= req.params.id

        try {
            const user = await User.findById(_id)
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
        } catch (error) {
            res.status(500).send(error)
        }




    
    // User.findById(_id).then((user) => {
    //      if(!user){
    //          return res.status(404).send()
    //      }

    //      res.send(user)
    // }).catch((err) => {
    //        res.status(500).send(err)
    // })
    // //  console.log(req.params)
    
})

//---------------patch()------------------------------------------------------
router.patch('/users/:id', async(req, res) => {

    const updates = Object.keys(req.body)
     const allowedToUpdate = ['name', 'email','age','password','task']
     const isValidOperation = updates.every((update) => allowedToUpdate.includes(update))

     if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates'})
     }

            try {
                const user = await User.findById(req.params.id)

                updates.forEach((update) => user[update] = req.body[update] )

                await user.save()


                // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
                if(!user){
                    return res.status(404).send()
                }

                res.send(user)
            } catch (error) {
                res.status(400).send(error)
            }
})


//-------------delete()-----------------------------------------------
router.delete('/users/:id', async(req, res) => {
      try {
          const user = await User.findByIdAndDelete(req.params.id)
          if(!user){
              return res.status(404).send()
          }
          res.send(user)
      } catch (error) {
          res.status(500).send(error)
      }
})

module.exports = router

const express = require('express')
const router = new express.Router()
const Task = require('../model/tasks')
const validator = require('validator')
const User = require('../model/users')



router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)


    try {
        await task.save()
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     //chaining
    //     res.status(400).send(err)
    //     // res.send(err)
    // });
})

//---------------------read all data-----------------------------------------
router.get('/tasks', async(req, res) => {

     try {
         const task = await Task.find({})
         res.status(200).send(task)
     } catch (error) {
         res.status(500).send(error)
     }
         


    //    Task.find({}).then((tasks) => {
    //       res.send(tasks)
    //    }).catch((err) => {
    //         res.status(500).send
    //    })
})

//------------------readById-------------------------------------------------------
 
router.get('/tasks/:id', async(req, res) => {

    const _id= req.params.id

          try {
            const task = await Task.findById(_id)
            if(!task){
                return res.status(404).send()
            }

            res.send(task)
          } catch (error) {
              res.status(500).send(error)
          }
       


    
    // Task.findById(_id).then((task) => {
    //      if(!task){
    //          return res.status(404).send()
    //      }

    //      res.send(task)
    // }).catch((err) => {
    //        res.status(500).send(err)
    // })
    // //  console.log(req.params)
    
})



//-------------patch()--------------------------------
router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
     const allowedToUpdate = ['description','completed']
     const isValidOperation = updates.every((update) => allowedToUpdate.includes(update))

     if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates'})
     }

            try {

                 const task = await Task.findById(req.params.id)
                 updates.forEach((update) => task[update] = req.body[update])

                 await task.save()

                // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
                if(!task){
                    return res.status(404).send()
                }

                res.send(task)
            } catch (error) {
                res.status(400).send(error)
            }
})




//--------------delete()----------------------------------------------------
router.delete('/tasks/:id', async(req, res) => {
         try {
             const task = await Task.findByIdAndDelete(req.params.id)
             if(!task){
                 return res.status(404).send()
             }

             res.send(task)
         } catch (error) {
             res.status(500).send(error)
         }
})

module.exports = router
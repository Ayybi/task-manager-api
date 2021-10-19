const express = require('express')
const router = new express.Router()
const Task = require('../model/tasks')
const auth  = require('../middleware/auth')



router.post('/tasks', async(req, res) => {
    //const task = new Task(req.body)
         const task = new Task({
             ...req.body,
             owner: req.user._id
         })

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
//filtering the task GET/ tasks?completed=trueorfasle
//pagination limit skip GET/taks?limit=3&skip=0
//sort by GET/tasks?sortBy=createdAt_asc/desc         0to10/10to0
router.get('/tasks', auth, async(req, res) => {
      const match = {}
      const sort = {}

       if(req.query.completed){
               match.completed = req.query.completed === 'true'
      }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1        //asc/desc
    }
     try {
        //  const task = await Task.find({})
         //const task = await Task.find({owner: req.user._id})
         await req.user.populate({
            path: 'task',
            match,
            options: {
              limit: parseInt(req.query.limit),
              skip: parseInt(req.query.skip),
              sort
              ////sort: {
                   // //  createdAt: 1 for ascending
                   // //  createdAt: -1 for descending
                   // completed: -1 //for false 1 for true
              // //}

            }
                
            }
            ).execPopluate()
         
         res.status(200).send(task)
         // res.send(req.user.task)
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
 
router.get('/tasks/:id', auth, async(req, res) => {

    const _id= req.params.id

          try {
            // const task = await Task.findById(_id)
            const task = await Task.findOne({ _id, owner: req.user._id })
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
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
     const allowedToUpdate = ['description','completed']
     const isValidOperation = updates.every((update) => allowedToUpdate.includes(update))

     if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates'})
     }

            try {

                //  const task = await Task.findById(req.params.id)
                 const task = await Task.findBuId({_id: req.params.id, owner: req.user._id})
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
router.delete('/tasks/:id', auth, async(req, res) => {
         try {
            //  const task = await Task.findByIdAndDelete(req.params.id)
             const task = await Task.findByIdAndDelete({_id:req.params.id, owner: req.user._id})
             if(!task){
                 return res.status(404).send()
             }

             res.send(task)
         } catch (error) {
             res.status(500).send(error)
         }
})

module.exports = router
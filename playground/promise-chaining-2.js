require('../src/db/mongoose')
const Task = require('../src/model/tasks')

//----------------Promise Chaining--------------------------------------
// Task.findByIdAndRemove('614b351004946b21bde0f9a3').then((task) => {
//              console.log(task)
//              return Task.countDocuments({completed: false})
// }).then((task2) => {
//     console.log(task2)
// }).catch((err) => {
//      console.log(err)
// })


//------------------Async-await------------------------------------------
const removeAndCount = async (id) => {
        const remove = await Task.findByIdAndRemove(id)
        const count = await Task.countDocuments({completed: true})
        return count
}

removeAndCount('614ac6c6ecb0e3869f902988').then((count) => {
         console.log(count)
}).catch((err) => {
      console.log(err)
})
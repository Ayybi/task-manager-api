require('../src/db/mongoose')
const User = require('../src/model/users')


//----------------Promise Chaining-----------------------------------------------------
// User.findByIdAndUpdate('614ac409057e3bf57ed3c3ec', {age : 90}).then((user) => {
//              console.log(user)
//              return User.countDocuments({age: 26})
// }).then((count) => {
//      console.log(count)
// }).catch((err) => {
//     console.log(err)
// })

//---------------Async-await------------------------------------------------
const updateAndCount = async (id, age) => {
          const user = await User.findByIdAndUpdate(id, {age})
          const count = await User.countDocuments({age})
          return count
}

updateAndCount('614ac409057e3bf57ed3c3ec', 28).then((count) => {
               console.log(count)
}).catch((err) => {
       console.log(err)
})

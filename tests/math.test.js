const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math')


test('Calculate total with tip', () => {
   const total = calculateTip(10, .3)
   //const total = calculateTip(10)
  expect(total).toBe(13)

//    if(total !== 13){
//      throw new Error('Total tip should be 13 .But got '+total)
//    }
})




// test('Calculate total with tip', () => {
//       const total = calculateTip(10)
//       expect(total).toBe(13)
//    })


   test('Temperature in celsius', () => {
        const cel_temp = fahrenheitToCelsius(45)
        expect(cel_temp)
   })


   test('Temperature in fahrenheit', () => {
      const fahr_temp = celsiusToFahrenheit(45)
      expect(fahr_temp)
 })

//  test('Async test demo' , (done) => {
      
//       setTimeout(() => {
//             expect(1).toBe(2)
//             done()
//       }, 2000)

// })

test('Promise based adding two numbers', (done) => {
        add(2,3).then((sum) => {
           expect(sum).toBe(5)
           done()
        })
})

test('Should add two number async/await', async() => {
       const sum =  await add(10,22)
       expect(sum).toBe(32)

})

// //test case
// test('Hello World', () => {
  
// })

// test('This should fail', () => {
//       throw new Error('Failure')
// })
const calculateTip =  (total , tipPercent = .2) => total + (total * tipPercent)


const fahrenheitToCelsius = (temp) =>  (temp - 32) / 1.8


const celsiusToFahrenheit = (temp) =>  (temp * 1.8) + 32


const add = (a, b) => {
    return new Promise((resolve, reject) => {
              setTimeout(() => {
                  //setting up reject
                  if (a < 0 || b < 0){
                      return reject('Numbers must be non-negative')
                  }
                resolve(a + b)
                
              },2000)
    })

    

}


module.exports = {
    calculateTip,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    add
}
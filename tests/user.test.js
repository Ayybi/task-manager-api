const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/model/users')
const { response } = require('express')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId, 
    name: 'Abhishek-4',
    email: 'abhishekoffc@gmail.com',
    age: 26,
    task: true,
    password: "abhishkevats11111111",
    token: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}
beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Should signup a new user', async() => {
     await request(app)
     .post('/users')
     .send({
         name: 'Abhishek',
         email: 'abhishekvats001.av@gmail.com',
         age: 26,
         task: true,
         password: "abhishkevats11111111"
     }).expect(201)
     
})  

test('Should login in existing user' , async() => {
      const response = await request(app).post('/users/login/').send({
          email: userOne.email,
          password: userOne.password
      }).expect(200)

      const user = await User.findById(userOneId)
      except(response.body.token).toBe(user.tokens[1].token)
})


test('should not login in non-existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'wrongPassword'
    }).expect(400)
})

test('Should get profile for user', async() => {
     const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user =  await User.findById(response.body.user._id)
        expect(user).not.toBeNull()

        //Assertions about the response
        expect(response.body).toMatchObject({
            user: {
                name: 'Abhishek-4',
               email: 'abhishekoffc@gmail.com'
            },
            token: user.tokens[0].token
        })

        except(user.password).not.toBe('Mypass222')
})



test('Should not get profile for unauthenticated user', async() => {
    await request(app)
      .get('/users/me')
      .send()
      .expect(401)
})

test('Should delete the authenticated user' , async() => {
     await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)

      const user =  await User.findById(userOneId)
      except(user).toBeNull()
})

test('Should not delete the unauthenticated user', async() => {
    await request(app)
      .get('/user/me')
      .send()
      .expect(401)
})
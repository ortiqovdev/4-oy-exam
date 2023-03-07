import express, { Express, request, response } from 'express';
import { Data, malumotlar } from './data';
import { v4 } from 'uuid'

const server: Express = express();
server.use(express.json())
server.use(express.urlencoded())

server.post('/register', (request, response) => {

    let register: Data = {
        id: v4(),
        name: request.body.name,
        surname: request.body.surname,
        email: request.body.email,
        age: request.body.age,
        password: request.body.password
    }
    const pochta = malumotlar.find(pochta => pochta.email === request.body.email)

    if (pochta == undefined) {
        malumotlar.push(register)

        response
            .status(200)
            .send("User added")
    }else{
        response
        .status(404)
        .send('xato')
    }
})

server.post('/login', (request, response) => {
    const pochta = malumotlar.find(pochta => pochta.email === request.body.email)
    const parol = malumotlar.find(parol => parol.password === request.body.password)
    if (pochta == undefined) {
        response
            .status(404)
            .send("User not found")
    } 
    // else if (parol?.password != undefined) {
    //     response
    //         .status(404)
    //         .send("password is wrong")
    // }
    else {
        response
            .status(200)
            .send(pochta)
    }
})




server.get('/users', (request, response) => {
    response
        .status(200)
        .send(malumotlar)
})


server.listen(2111, () => {
    console.log("Server working... (Port:2111)");

})
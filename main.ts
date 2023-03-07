import express, { Express, response } from "express";
import { Data, users } from "./data";
import { v4 } from 'uuid'
import { request } from "http";
import { send } from "process";

const server: Express = express()
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
    const emailCheck = users.find(emailCheck => emailCheck.email === request.body.email)
    users.push(register)

    if (emailCheck == undefined) {
        response
            .status(200)
            .send(`${request.body.email} added`)
    }
    else {
        response
            .status(404)
            .send(`${request.body.email} bu email mavjud.`)
    }
})
server.post('/login', (request, response) => {
    const email1 = users.find(email1 => email1.email === request.body.email)
    const parol = users.find(parol => parol.password === request.body.password)
    if (email1 == undefined) {
        response
            .status(404)
            .send("user not found")
    } else if (parol == undefined) {
        response
            .status(404)
            .send("passwor wrong")
    } else {
        response
            .status(200)
            .send(email1)
    }
})


server.get('/users', (request, response) => {

    response
        .status(200)
        .send({
            massage: "All users:",
            users
        })
})


server.listen(1111, () => {
    console.log("Server worikng... (Port:1111)");

})

const mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bearerToken = require('express-bearer-token')
const port = 8080
const uri = `http://localhost:${port}`
const bcrypt = require('bcrypt')
const power = 10
const secretKey = 'jifnweinomedio-8397ineec'

const app = express()
app.use(express.json()) 
app.use(cors())
app.use(bearerToken())

const generateToken = (email) => {
    let data = {
        email: email
    }
    token = jwt.sign(data, secretKey)
    return token
}

const verifyLogin = (request, response) => {
    try {
        jwt.verify(request.token, secretKey)
    } catch(error) {
        response.sendStatus(401)
        return false
    }
    return true
}

const verifyAdmin = (admin) => {
    if (admin) return true
    return false 
}

const verifyLoginAndAdmin = (request, response) => {
    if (!verifyLogin(request, response)) return
    if (!verifyAdmin(admin)) return
}

const constantSendStatus = (error, result, response) => {
    if (error) {
        console.log(error)
        response.sendStatus(400)
    } else response.sendStatus(200)
}

const constantSendStatusAndResult = (error, result, response) => {
    if (error) {
        console.log(error)
        response.sendStatus(400)
    } else response.status(200).send(result)
}

var admin = false

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'online_shop_js'
})

connection.connect(error => {
    if (error) {
        console.log('\nEroare de conectare la baza de date\n')
        throw error
    }
    console.log("Connected to MySQL database")
})

app.post('/users', (request, response) => {
    let password = request.body.password
    bcrypt
        .hash(password, power)
        .then(hash => {
            connection.query(
                'INSERT INTO users VALUES(NULL, ?, ?, ?, 0)',
                [request.body.email, request.body.username, hash],
                (error, result) => constantSendStatus(error, result, response)
            )
    })
})

app.get('/users/login', (request, response) => {
    let email = request.query.email
    let password = request.query.password
    console.log(email)
    console.log(password)
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, result) => {
            if (result.length > 0) {
                console.log(result)
                bcrypt
                    .compare(password, result[0].password)
                    .then(bool => {
                        if (bool) {
                            let admin = result[0].admin
                            response.status(200)
                                    .send({
                                        name: result[0].name,
                                        email: result[0].email,
                                        token: generateToken(email),
                                        admin: admin
                                    })
                        } else response.sendStatus(401)
                })
            }
            else response.sendStatus(400)
        }
    )
})

app.get('/users', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'SELECT * from users',
        [],
        (error, result) => constantSendStatusAndResult(error, result, response)   
    )
})

app.put('/users/:id', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'UPDATE users SET admin = ? WHERE user_id = ?',
        [request.body.admin, request.params.id],
        (error, result) => constantSendStatus(error, result, response)
    )
})

app.delete('/users/:id', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'DELETE FROM users WHERE user_id = ?',
        [request.params.id],
        (error, result) => constantSendStatus(error, result, response)
    )
})

app.get('/products', (request, response) => {
    connection.query(
        'SELECT * FROM products',
        [],
        (error, result) => constantSendStatusAndResult(error, result, response)
    )
})

app.post('/products', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'INSERT INTO products VALUES(NULL, ?, ?, ?)',
        [],
        (error, result) => constantSendStatus(error, result, response)
    )
})

app.get('/products/:id', (request, response) => {
    connection.query(
        'SELECT * FROM products WHERE id = ?',
        [request.params.id],
        (error, result) => constantSendStatusAndResult(error, result, response)
    )
})

// DE FACUT
app.put('/products/:id', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'UPDATE users SET admin = ? WHERE user_id = ?',
        [request.body.admin, request.params.id],
        (error, result) => constantSendStatus(error, result, response)
    )
})

app.delete('/products/:id', (request, response) => {
    verifyLoginAndAdmin(request, response)
    connection.query(
        'DELETE FROM products WHERE product_id = ?',
        [request.params.id],
        (error, result) => constantSendStatus(error, result, response)
    )
})

// pornesc server-ul
app.listen(port, () => {
    console.log(`Server started on port ${port}
    \nApp running at:\n- Local:   ${uri}\n- Network: http://192.168.0.107:${port}`)
})
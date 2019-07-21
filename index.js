const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { matchedData, sanitizeBody } = require('express-validator');
const userMiddleware = require('./middleware/user')
const app = express();
app.use('/static', express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './public/views');
 
const urlencodedParser = (bodyParser.urlencoded({extended: false}))
const jsonParser = (bodyParser.json())

app.get('/', (req, res)  => {
    res.render('index', {
        title: 'Faruk App', 
        message: 'Login form'
    }) 
})

app.post('/login', urlencodedParser, (req, res) => {
    res.send('Welcome' + req.body.username)
})

app.post('/', urlencodedParser, [
    check('username', 'name must be a valid password').trim().isEmail(),
    check('password', 'password need at least 5 charecter').trim().isLength({min: 5}),
    check('cpassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('your password is not matched');
        }
        return true
    })
], (req, res) => {
    const errors = validationResult(req)
    console.log(errors.mapped())
    if(!errors.isEmpty()){
        const user = matchedData(req);
        res.render('index', {
            title: 'User details',
            error: errors.mapped(),
            message: 'Redirect page',
            user
        })
    }else {
        const user = matchedData(req);
        console.log(user)
        res.render('login', {
            title: 'Login success page',
            message: 'welcome',
            user
        })
    }
     
})



/*
const validation = function(req, res, next){
    console.log('middleware working')
next()
}

const userValidation = function(req, res, next){
    if(req.params.userName === 'Faruk')
    console.log('User validated')
    else
    console.log('User not validated')
next()
}



app.use(userMiddleware({option1: '1', option2: '2'}))

app.get('/', validation, (req, res) => {
  res.send('Hello World')  
})

app.get('/users/:userName', userValidation, (req, res) => {

    res.send('Hello Users')  
  })
  
*/


/*
app.get(/.*fly$/, (req, res) => {
    res.sendFile(__dirname +  '/views/index.html');
    console.log(__dirname)
})

app.get('/users/:id?', (req, res) => {
    if(req.params.id === undefined)
        res.send('All user list')
    else
    res.send('Users id is ' + req.params.id)
})

app.get('/flights/:From-:To', (req, res) => {
  console.log(req.params)
  res.send("Search for flights from " + req.params.From + ' to ' +req.params.To)
})

app.post('/users/profile', (req, res) => {
    res.send('profile page')
})

*/
app.listen(3000, () => {
    console.log('Your server is runnig on port:3000')
})
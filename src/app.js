const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

//define paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//setup static directory to serve 
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Dinesh gawas'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name: 'Dinesh Gawas'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helptext: 'hello the help u asked for is here',
        name: 'Dinesh Gawas'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide a location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location}={}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location,
                address : req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('error1',{
        title: '404',
        name: 'Dinesh Gawas',
        errormsg: 'sorry no help'
    })
})

app.get('*',(req,res) => {
    res.render('error1',{
        title: '404',
        name: 'Dinesh Gawas',
        errormsg: 'page not found'
    })
}) 

app.listen(3000, () => {
    console.log('server is up at 3000')
})
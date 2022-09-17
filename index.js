const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())


app.use(express.static('public'))
app.get('/', function(req,res){
    res.render('home')
})

app.post('/games/insertgame', function(req,res){
    const title = req.body.title
    const year = req.body.year
    const dev = req.body.dev
    const gender = req.body.gender
    const platf = req.body.platf
    const age = req.body.age
    
    const yearO = 2022 - year
    const sql = `INSERT INTO games (title,year,dev,gender,platf,age,yearO) VALUES ('${title}',${year},'${dev}','${gender}','${platf}',${age},${yearO});`

    pool.query(sql, function(err){
        if(err){
        console.log(err)
        }
        res.redirect("/")
    })
})

app.get('/games', function(req, res){
    const sql = "SELECT * FROM games;"
    pool.query(sql, function(err,data){
        if(err){
            console.log(err)
        }

        res.render('games',{games:data})
    })
})
app.get('/games/:id',function(req,res){
    const id = req.params.id
    const sql = `SELECT * FROM games WHERE id = ${id}`
    pool.query(sql, function (err,data){
        if (err){
            console.log(err)
        }
        const game = data[0]
        res.render('game', {game:game})
    })
})

app.get('/games/edit/:id',function(req,res){
    const id = req.params.id
    const sql = `SELECT * FROM games WHERE id = ${id}`
        pool.query(sql,function(err,data){
            if (err){
                console.log(err)
            }
            const game = data[0]

            res.render('editgame',{game:game})
        })
})


app.post('/games/updategame', function(req,res){
    const id = req.body.id
    const title = req.body.title
    const year = req.body.year
    const dev = req.body.dev
    const gender = req.body.gender
    const platf = req.body.platf
    const age = req.body.age

    const yearO = 2022 - year
    const sql = `UPDATE games SET title='${title}', year=${year}, dev='${dev}', gender='${gender}', platf='${platf}', age=${age}, yearO=${yearO} WHERE id = ${id}`
    pool.query(sql,function(err){
        if (err){
            console.log(err)
        }
        res.redirect(`/games/${id}`)
    })
})

app.post('/games/remove/:id', function(req,res){
    const id = req.params.id
    const sql = `DELETE FROM games WHERE id = ${id}`
    pool.query(sql,function(err){
        if (err){
            console.log(err)
        }
        res.redirect(`/games`)
    })
})
app.listen(3000)
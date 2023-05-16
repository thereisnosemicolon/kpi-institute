const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))


const db = require('./app/models/')
const corsOptions = {
    origin: 'http://localhost:3000'
}
db.mongoose
    .connect(db.url, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log('Database connected')
        init()
    }).catch((err) => {
        console.log('Failed to connect database', err)
        process.exit()
    })

app.use(express.json())    
app.use(cors())  

const Profile = db.profiles
app.get('/', (req, res) => {
  res.json('Hello World!')
})

require('./app/routes/user.routes')(app)
require('./app/routes/auth.routes')(app)

function init(){
    Profile.collection.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            let profile = new Profile({
                name: "Board"
            })

            profile.save(profile)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error.message)
            });

            profile = new Profile({
                name: "Expert"
            });

            profile.save(profile)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error.message)
            });

            profile = new Profile({
                name: "Trainer"
            });

            profile.save(profile)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error.message)
            });
            
            profile = new Profile({
                name: "Competitor"
            });

            profile.save(profile)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error.message)
            });
            
        }
    })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
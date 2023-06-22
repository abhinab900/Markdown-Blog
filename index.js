const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Article = require('./models/article')
const PORT = process.env.PORT || 5000;
const path = require('path')

const articlesRouter = require('./routes/articles');
const exp = require('constants');

/* Mongodb connection */
mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
.then(()=>{console.log('DB Connection Open');})
.catch(()=> console.log('Error connecting to DB '))

/* for accepting urlencoded form data */
app.use(express.urlencoded({extended:false}))
app.use(express.json())

/* configuring templating engine */
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

/* configuring static files for optimized access/delivery */
app.use(express.static(path.join(__dirname,'static_files')))


app.get('/api/blogs',async (req,res)=>{
    const articles = await Article.find()
    
    res.send(articles.map((item)=>{
        return {
            title:item.title,
            desc:item.description,
            createdAt:item.createdAt
        }
    }))
})

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt:"desc"})
    res.render('home_page',{articles})
})

app.use('/articles', articlesRouter);


app.listen(PORT,()=>{console.log(`Server Running at http://localhost:${PORT}`);})
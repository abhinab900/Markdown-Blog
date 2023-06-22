const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

const Article = require('./../models/article')


router.use(methodOverride(`_method`))

router.get('/new',(req,res)=>{
    res.render('./articles/new',{article:new Article()});
})

router.get('/show/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if(article==null)res.redirect('/')
    res.render(`articles/show`, {article:article});
})

router.get('/edit/:id',async (req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article})
})

router.post('/',async (req,res)=>{
    
    let article = new Article({
        title:req.body.title,
        description: req.body.description,
        markdown:req.body.markdown
    })
    try{
        console.log(req.body.markdown);
        article = await article.save()
        res.redirect(`/articles/show/${article.id}`)
    }catch(e){
        console.log(`Couldn't save... reason : ${e}`);

        res.render('articles/new',{article})
    } 
    
})

router.put('/:id',async(req,res)=>{
    //let article = await Article.findById(req.params.id)
    let article = await Article.findById(req.params.id)
    article.title=req.body.title
    article.description= req.body.description
    article.markdown=req.body.markdown
    
    try{
        article = await article.save()
        res.redirect(`/articles/show/${article.id}`)
    }catch(e){
        console.log(`Couldn't save... reason : ${e}`);

        res.render('articles/new',{article})
    } 
})


router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router;
const express=require('express')
const { findById } = require('./../models/article')
const article = require('./../models/article')
const Article=require('./../models/article')
const router=express.Router()

router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()})
})

router.get('/edit/:id',async(req,res)=>{
    const article=await Article.findById(req.params.id)
    res.render('articles/edit',{article:article})
})
router.get('/:id', async(req,res)=>{
    const article= await Article.findById(req.params.id)
    if(article==null) res.redirect('/')
 res.render('articles/show',{article: article})
})

router.post('/', async(req,res,next)=>{
   /* let article=new Article({
        title:req.body.title,
        categories:req.body.categories,
        description:req.body.description,
    })
    try{
        article=await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e)
     res.render('article/new',{article:article})
    }*/
   req.article=new  Article();
   next()
},saveArticleAndRedirect('new'))

router.put('/:id',async(req,res,next)=>{
    req.article= await Article.findById(req.params.id);
    next()
},saveArticleAndRedirect('edit'))
router.delete('/:id',async(req,res)=>{
  await  Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let article=req.article
       
            article.title=req.body.title
            article.categories=req.body.categories
           article.description=req.body.description
    try{
            article=await article.save()
            res.redirect(`/articles/${article.id}`)
        }catch(e){
            
         res.render(`article/${path}`,{article:article})
        }
    }
}

module.exports=router
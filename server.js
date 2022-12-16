const express=require('express')
const mongoose=require('mongoose')
const Article= require('./models/article')
const articleRouter=require('./routes/articles')
const methodOverride=require('method-override')
const app=express();

//mongoose.connect('mongodb://localhost/blog',{
   // useNewUrlParser: true, useUnifiedTopology:true
//})
mongoose.connect('mongodb+srv://blog:QjiqGxvLhFPFzPpj@cluster0.lugyi.mongodb.net/Users?retryWrites=true&w=majority',
{
    useNewUrlParser: true, 
    useUnifiedTopology:true
}
).then(()=>{console.log("db connected")
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res)=>{
   /* const articles=[{
        title:'test Articlas',
        createAt:new Date(),
        description:'test Description'
    },
    {
        title:'test Articlas 2',
        createAt:new Date(),
        description:'test Description 2'
    }
]*/
const articles= await Article.find().sort({
    createAt:'desc'})
 res.render('articles/home',{articles:articles})
})
app.use('/articles',articleRouter)
app.listen(5001)
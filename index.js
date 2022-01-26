import express from 'express';
import mongoose from 'mongoose';
import twig from 'twig';
import bodyParser from 'body-parser';
import User from './models/User.js'

const app = express();
const db = "mongodb+srv://othomas:MongoDbRi7@cluster0.sd0m3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db, err =>{
    if(err){
        console.error('error' + err);
    }else{
        console.log('connected at mongoDb');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.listen(8080, () => {
    console.log("le serveur marche !");
});

app.get('/', async (req, res) =>{
    const users = await User.find()
    res.render('./template/user/listUser.html.twig',{
        users: users
    })
})

app.get('/addUser', async (req, res) => {
    res.render('./template/user/addUser.html.twig', {
       
    })
})

app.post('/addUser', async (req, res) => {
    const user = new User(req.body)
    user.save()
    res.redirect('/')
})

app.get('/updateUser/:id', async (req, res) =>{
   const user = await User.findOne({ _id: req.params.id })
   res.render('template/user/addUser.html.twig',{
       user: user,
       action: "/updateUser"
   })
})

app.post('/updateUser/:id', async (req, res) =>{
    User.updateOne({ _id: req.params.id }, req.body, (error, user) => {
        if(error){
            console.log(error);
            res.status(404);
        }else{
            res.redirect('/')
        }
    })  
 })

 app.get('/deleteUser/:id', async (req, res) =>{
    User.deleteOne({ _id: req.params.id }, (error, user) => {
        if(error){
            console.log(error)
            res.status(404);
        }else{
            res.redirect('/')
        }
    })
 })




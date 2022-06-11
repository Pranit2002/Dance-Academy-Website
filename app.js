const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyparser = require("body-parser");
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactdance');
}




// Defining Mongoose.Schema

var contactSchema = new mongoose.Schema({
    name: String ,
    number: String ,
    email: String ,
    address: String ,
    more: String 
  });

  var contact = mongoose.model('contact', contactSchema);


// Express related stuff
app.use('/static', express.static('static')) //For serving static files
// app.use(express.urlencoded());

// Pug related stuff
app.set('view engine' , 'pug') //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //Set the views directory




// Endpoints
app.get('/', (req, res)=>{
    const con = "This is message"
    const params = {'title': 'This is title', 'content':con}
    res.status(200).render('home.pug', params);
});


app.get('/contact', (req , res)=>{
    const con = "This is message"
    const params = {'title': 'This is title', 'content':con}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
   var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the Database")
      }).catch(()=>{
        res.status(400).send("Information is saved on database")
});

})






app.listen(port , () => {
  console.log(`The website is successfully started on port ${port}`)
});
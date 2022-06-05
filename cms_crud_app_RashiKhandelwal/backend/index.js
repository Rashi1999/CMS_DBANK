// Defining necessary modules
const express=require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');

const app=express();
const port=process.env.PORT | 3000;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(port, ()=>{
    console.log('Server running on PORT 3000');
})


// Making MySQL DB connection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blogs',
    port:4300
});

// Verifying DB COnnection
db.connect(err=>{
    if(err)
        console.log(err, 'DBerror')
    else
        console.log('DB connected');
});


// Fetching or Reading the data of all blogs from DB
// GET OPERATION
app.get('/blog', (req, res)=>{
    let qr=`select * from blog_details`;

    db.query(qr, (err, result)=>{
        if(err)
            console.log(err,'Error');
        if(result.length>0){
            res.send({
                message: "All users data",
                data:result
            });
        }
    });
});


// Fetching or Reading the data of a single blog from DB
// GET OPERATION
app.get('/blog/:id', (req, res)=>{
    let bid=req.params.id;
    let qr=`select * from blog_details where blogid = ${bid}`;

    db.query(qr, (err, result)=>{
        if(err)
            console.log(err,'Error');
        if(result.length>0){
            res.send({
                message: "Single user data",
                data:result
            });
        }
        else
            res.send({message:'data not found'});
    });
});


// To create and insert new blog in the DB
// POST OPERATION
app.post('/blog', (req, res)=>{
    let authid=req.body.authid;
    let authname=req.body.authname;
    let category=req.body.category;
    let content=req.body.content;

    // Auto Generated ID
    var qr = "insert into blog_details(authid, authname, category, content) values ("  + authid + ",'" + authname + "', '" + category +  "', '" + content+ "')";
    
    db.query(qr, (err, result)=>{
        if(err)
            console.log(err, "Error");
        else
            res.send({message: "data inserted"});
    });
});


// To Update an existing record
// PUT Operation
app.put('/blog/:id', (req, res)=>{
    let blogid=req.params.id;
    let authid=req.body.authid;
    let authname=req.body.authname;
    let category=req.body.category;
    let content=req.body.content;

    var qr = "update blog_details set authid="+ authid + ", authname='"+authname+"', category='"+category+ "', content='" +content+ "' where blogid = "+blogid;

    db.query(qr, (err, result)=>{
        if(err)
            console.log(err, "Error");
        else
            res.send({message: "data updated"});
    });
});


// To delete an existing blog
// DELETE OPERATION
app.delete('/blog/:id', (req, res)=>{
    let blogid=req.params.id;

    var qr = "delete from blog_details where blogid = "+blogid;

    db.query(qr, (err, result)=>{
        if(err)
            console.log(err, "Error");
        else
            res.send({message: "data deleted"});
    });
});

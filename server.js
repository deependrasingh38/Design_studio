const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;


//Setting Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//settings Routes

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.get('/services' , (req, res) => {
    res.sendFile(path.join(__dirname,'public','services.html'));
});
app.get('/gallery',  (req , res  ) => {
    res.sendFile(path.join(__dirname , 'public','gallery.html'));
});
app.get('/contact' , (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'contact.html'  ));
});


app.post('/contact',(req,res)=>{
    const {name,email,message} = req.body;
    const msg = {name,email,message,date : new Date().toISOString()};

    const dataDir = path.join(__dirname,'data');
    const dataFile = path.join(dataDir,'message.json');

    // checking for data Directory at the location
    if(!fs.existsSync(dataDir))
        fs.mkdirSync(dataDir,{recursive:true});

    //read current message, append data and write it to file
    fs.readFile(dataFile,'utf-8',(err,data)=>{
        let a = [];
        if(!err && data)
        {
            try 
            {
                a = JSON.parse(data);
            }
            catch(e)
            {
                a = [];
            }
        }
        a.push(msg);
        fs.writeFile(dataFile,JSON.stringify(a,null,2),(err) =>{
            if(err)
            {
                console.log(err);
            }
            res.redirect('/contact?success=1');
        });
    });
});

app.get('/api/messages',(req,res)=>{
    const dataFile = path.join(__dirname,'data','message.json');
    if(!fs.existsSync(dataFile))
    {
        return res.json([]);
    }
    fs.readFile(dataFile,'utf-8',(err,data)=>{
        if(err)
        {
            return res.status(500).json({error : "Can not read File"});
        }
        try
        {
            res.json(JSON.parse(data));
        }
        catch(err)
        {
            res.json([]);
        }
    });
});



app.listen(PORT,()=>{
    console.log('Server Started');
});

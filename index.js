const express = require("express");
const path = require("path");
const {v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res)=>{
    res.redirect("/posts")
})

let posts = [
    {id: uuidv4() ,username: "piyush", content: "Hello world!"},
    {id: uuidv4() ,username: "apnacollge", content: "Hardwork is important to achieve sucess!"}
];

app.get("/posts", (req, res)=>{
    res.render("home", {posts})
});


app.patch("/post/:id", (req, res) =>{
    let { id } = req.params;
    console.log(id);
    res.send("working")
});

app.post("/posts", (req, res)=>{
    let { username, content } = req.body;
    const id = uuidv4();
    let obj = { username, content, id};
    posts.push(obj);
    res.redirect("/posts")
});

app.get("/posts/new", (req, res)=>{
    res.render("new");
});

app.get("/posts/:id", (req, res)=>{
    let { id } = req.params;
    const post = posts.find(p =>  id === p.id);
    let {username, content} = post;
    res.render("show", {username, content});
});

app.listen(3000, ()=>{
    console.log("Listening to port http://localhost:3000");
});
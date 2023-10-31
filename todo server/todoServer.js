const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var port = 3000;
var st = require('shortid');

app.use(bodyParser.json());
app.use(cors());

const todo = [];

app.get('/todos', (req,res) => {
    res.status(200).send(todo);
})

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
    for(var i=0;i<todo.length;i++) {
        if(id == todo[i].id) {
            res.status(200).send(todo[i]);
            return;
        }
    }

    res.status(404).send("Todo not found");
})

app.post('/todos', (req,res) => {
    var bo = req.body;
    var i = st.generate();
    bo.id = i;
    todo.push(bo);
    res.status(201).send("Todo created successfully");
})

app.put('/todos/:id', (req, res) => {
    var id = req.params.id;
    var bo = req.body;
    for(var i=0;i<todo.length;i++){
        if(id == todo[i].id){
            todo[i] = bo;
            res.status(200).send("Todo updated successfully");
            return;
        }
    }
    res.status(404).send("Todo not found");
})

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;
    const index = todo.findIndex((t) => t.id === id);
    if(index>-1){
        todo.splice(index, 1);
        res.status(200).send("Todo deleted successfully");
        return;
    }

    res.status(404).send("Todo not found");
})

function consoleLog(){
    console.log(`Example app listening on port ${port}`)
}

app.listen(port, consoleLog);
// importar http core module
const http = require('http');
const PORT = process.env.PORT || 5500;
const todos = require('../todos');
const getRequestData = require('./utils');
//crear un servidor http
const server = http.createServer(async (req, res)=>{
    if(req.url ==='/api/v1/todos' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(todos));
        return;
    }
    else if(req.url ==='/api/v1/todos' && req.method === 'POST'){
        let req_body = await getRequestData(req);
        todos.push(JSON.parse(req_body));
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(JSON.parse(req_body)));
        return;
    }
    else if(req.url.match(/\/api\/v1\/todos\/([0-9])/) && req.method === 'DELETE'){
        let id = req.url.split("/")[4]
        let todo = todos.find((elem)=> elem.id === parseInt(id))
        if(!todo){
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: `Todo with id ${id} not found`}));
            return;
        }
        let indexTodo = todos.indexOf(todo);
        todos.splice(indexTodo, 1);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `Todo with id ${id} deleted`}));
        return;
    }
        
})

//escuchar en el puerto 3000
server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/`);
})
server.on('error', (error)=>{
    console.error('Error al intentar levantar el servidor', error);
})
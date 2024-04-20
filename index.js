const express = require('express') //import
const uuid = require('uuid') //import
const app=express() //chamada do express
const port=3000
app.use(express.json()) //avisa ao express que será usado JSON
/* 
        - Query params => meusite.com/users?nome=Rodolfo&Age=20 //Filtros
        - Route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        - Request Body => { name:Rodolfo , age:33}

        - GET          => Buscar informação no back-end
        - POST         => Criar informação no back-end
        - PUT / PATCH  => Alterar/Atualizar informação no back-end
        - DELETE       => Deletar informação no back-end

        -Middleware    => INTERCEPTADOR => Tem o poder de parar ou alterar dados de requisição
*/

// app.get('/users',(request, response) =>{
//     // const name = request.query.name
//     // const age = request.query.age
//     const {name,age}= request.query
//     return response.json({name:name,age:age})
// }) //rota --- QUERY PARAMS ---

// app.get('/users/:id',(request, response) =>{
//     const id = request.params.id
//     console.log(id)
//     return response.json({id})  //resposta para o insomnia
// }) //rota --- ROUTE PARAMS ---

// app.get('/users',(request, response) =>{
//     const {name,age} = request.body
 
//     return response.json({name,age})  //resposta para o insomnia
// }) //rota --- BODY PARAMS ---


const users=[]
const checkUserId = (request, response,next) =>{
    const {id} = request.params
    const index = users.findIndex( user => user.id === id)

    if(index < 0){
        return response.status(404).json({message:"User not found"})
    }
    request.userIndex=index
    request.userId=id
    next()
}   
app.get('/users',(request, response) =>{
 
    return response.json({users}) 
}) 

app.post('/users',(request, response) =>{
    const {name,age} = request.body

    const user = { id:uuid.v4() ,name,age}
    users.push(user)

    return response.status(201).json({user}) 
}) 

app.put('/users/:id',checkUserId,(request, response) =>{
    const {name,age}=request.body
    const index = request.userIndex
    const id = request.userId
    
    const updateUser = {id, name, age}  

    users[index] = updateUser

    return response.json(updateUser) 
}) 

app.delete('/users/:id',checkUserId,(request, response) =>{
    const index=request.userIndex

    users.splice(index,1)

    return response.status(204).json() 
}) 



app.listen(port, ()=>{
    console.log(`✔ Server started on port ${port}`)
}) //porta usada
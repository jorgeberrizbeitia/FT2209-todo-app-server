const router = require("express").Router();
const Todo = require("../models/Todo.model")

// GET "/api/todos" => enviar los titulos de todos los ToDos de la DB
router.get("/", async (req, res, next) => {

  try {
    
    // 1. buscar en la BD todos los ToDos
    // const response = await Todo.find().select("title") // busca todo, pero solo entrega la propiedad "title"
    const response = await Todo.find().select({title: 1}) // busca todo, pero solo entrega la propiedad "title"
    // * las dos formas de arriba funciona igual

    // 2. enviarlos al cliente (postman)
    res.status(200).json(response)


  } catch (error) {
    next(error)
  }

})


// POST "/api/todos" => recibe detalles de un nuevo ToDo y lo crea en la DB
router.post("/", async (req, res, next) => {
  console.log("postman accediendo a la ruta")
  console.log(req.body)

  // recopilar la informacion del cliente (postman)
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
    isUrgent: req.body.isUrgent
  }

  // usar esa informacion para crear un nuevo ToDo en la DB
  try {
    const response = await Todo.create(newTodo) // crea el elemento en la DB
    res.status(201).json("todo bien por acá, tú que tal?, creado el Todo en la BD")
  } catch (error) {
    next(error)
  }


})

// GET "/api/todos/:id" => enviar todos los detalles de un ToDo por su id
router.get("/:todoId", async (req, res, next) => {



  try {
    
    // 1. buscar un documento de ToDo por su id
    const response = await Todo.findById(req.params.todoId)

    // 2. enviar el documento al cliente (postman)
    res.status(200).json(response)

  } catch (error) {
    next(error)
  }

})


module.exports = router
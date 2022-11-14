const router = require("express").Router();
const Todo = require("../models/Todo.model")

// GET "/api/todos" => enviar los titulos de todos los ToDos de la DB

router.get("/random", async (req, res, next) => {
  try {
    // .count() returns the amount of elements in the collection
    const count = await Todo.count()

    // Get a random entry between 0 and the number of elements
    const random = Math.floor(Math.random() * count)
    
    // .skip() will move pass the first x amount of documents. findOne will bring the first after the skip.
    const response = await Todo.findOne().skip(random)

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

router.get("/", async (req, res, next) => {

  try {
    
    // 1. buscar en la BD todos los ToDos
    // const response = await Todo.find().select("title") // busca todo, pero solo entrega la propiedad "title"
    const response = await Todo.find().select({title: 1, coordinates: 1}) // busca todo, pero solo entrega la propiedad "title"
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

// GET "/api/todos/:todoId" => enviar todos los detalles de un ToDo por su id
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


// DELETE "/api/todos/:todoId" => borrar un documento de ToDo de la DB por su id
router.delete("/:todoId", async (req, res, next) => {

  try {

    // borrar el documento por su id
    await Todo.findByIdAndDelete(req.params.todoId)

    // enviar respuesta al FE
    res.status(200).json("todo bien, documento borrado")

  } catch (error) {
    next(error)
  }

})


// PATCH "/api/todos/:todoId" => editar un documento de ToDo de la DB por su id
router.patch("/:todoId", async (req, res, next) => {

  // buscar los cambios a editar del documento
  const todoUpdates = {
    title: req.body.title,
    description: req.body.description,
    isUrgent: req.body.isUrgent,
    coordinates: req.body.coordinates
  }

  try {
    
    // editar el documento por su id
    await Todo.findByIdAndUpdate(req.params.todoId, todoUpdates)
    // recordamos, pasar 2 argumento. (el id, la info a actualizar)
  
    // enviar mensaje de "todo bien" al FE
    res.status(200).json("todo bien, documento actualizado")

  } catch (error) {
    next(error)
  }
})


module.exports = router
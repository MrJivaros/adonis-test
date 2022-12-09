import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/tasks', "TasksController.tasks")
  Route.post('/tasks', "TasksController.create")
  Route.put('/tasks', "TasksController.update")
  Route.delete('/tasks', "TasksController.delete")
}).prefix('api')

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/tasks', "TasksController.tasks")
}).prefix('api')

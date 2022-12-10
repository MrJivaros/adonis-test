import { useEffect, useState } from 'react'
import { TodoQuery } from './api/Todo'
import TaskList from './components/TaskList/TaskList'
import { TodoAsItem, TodoToAdd } from './types/types'

function App() {
 const [taskToAdd, setTaskToAdd] = useState<TodoToAdd>({
  title: '',
  description: ''
 })
 const [tasks, setTasks] = useState<TodoAsItem[]>([])
 const findAndSetOnState = async () => {
  setTasks(await TodoQuery.findAll())
 }

 const createtask = async () => {
  if (taskToAdd) {
   await TodoQuery.create(taskToAdd)
   setTaskToAdd({ title: '', description: '' })
   await findAndSetOnState()
  }
 }

 const toggleTask = async (task: TodoAsItem) => {
  await TodoQuery.update({ ...task, done: task.done ? 0 : 1 })
  await findAndSetOnState()
 }

 const deleteTask = async (task: TodoAsItem) => {
  await TodoQuery.delete(task)
  await findAndSetOnState()
 }

 const editTask = async (task: TodoAsItem) => {
  await TodoQuery.update(task)
  await findAndSetOnState()
 }

 useEffect(() => {
  ;(async () => await findAndSetOnState())()
 }, [])

 return (
  <div className='container'>
   <div className='m-3'>
    <form
     onSubmit={async (event) => {
      event.preventDefault()
      await createtask()
     }}
    >
     <input
      className='form-control form-control-lg mb-3'
      type='text'
      placeholder='New task title here ... '
      required
      value={taskToAdd.title}
      onChange={(event) => {
       setTaskToAdd({ ...taskToAdd, title: event.target.value })
      }}
     />
     <textarea
      className='form-control'
      rows={3}
      placeholder='The task description here ... '
      value={taskToAdd.description ?? ''}
      onChange={(event) => {
       setTaskToAdd({ ...taskToAdd, description: event.target.value })
      }}
     ></textarea>
     <div className='d-flex justify-content-end'>
      <button className='btn btn-success m-2'>Submit</button>
     </div>
    </form>
   </div>
   <TaskList
    tasks={tasks}
    toggleTask={toggleTask}
    deleteTask={deleteTask}
    editTask={editTask}
   />
  </div>
 )
}

export default App

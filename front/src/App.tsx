import { useEffect, useState } from 'react'
import { TodoQuery } from './api/Todo'
import TaskList from './components/TaskList/TaskList'
import { TodoAsItem } from './types/types'

function App() {
 const [title, setTitle] = useState<string>()
 const [tasks, setTasks] = useState<TodoAsItem[]>([])
 const findAndSetOnState = async () => {
  setTasks(await TodoQuery.findAll())
 }

 const createtask = async () => {
  if (title) {
   await TodoQuery.create({ title })
   setTitle(undefined)
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
      className='form-control form-control-lg'
      type='text'
      placeholder='New task title here ... '
      required
      value={title ?? ''}
      onChange={(event) => {
       setTitle(event.target.value)
      }}
     />
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

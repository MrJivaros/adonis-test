import { useEffect, useState } from 'react'
import { TodoAsItem } from '../../types/types'

interface TaskItemProps {
 task: TodoAsItem
 toggleTask: () => Promise<void>
 deleteTask: () => Promise<void>
 editTask: (task: TodoAsItem) => Promise<void>
}
export default function TaskItem({
 task,
 toggleTask,
 deleteTask,
 editTask
}: TaskItemProps) {
 const [edit, setEdit] = useState(false)
 const [taskToEdit, setTaskToEdit] = useState({ ...task })
 const toggleEdit = () => setEdit((v) => !v)

 const onSubmit = async () => {
  await editTask(taskToEdit)
  toggleEdit()
 }

 useEffect(() => {
  setTaskToEdit({ ...task })
 }, [task])

 return (
  <div className='card mb-3'>
   <div className='card-body'>
    <h6 className='card-title'>{task.title}</h6>
    {edit && (
     <input
      className='form-control'
      type='text'
      value={taskToEdit.title}
      onChange={(event) => {
       setTaskToEdit({ ...taskToEdit, title: event.target.value })
      }}
     />
    )}
   </div>
   <div className='card-footer'>
    <div className='d-flex justify-content-end gap-2'>
     {edit ? (
      <button
       className='btn btn-success'
       onClick={async (event) => {
        event.preventDefault()
        await onSubmit()
       }}
      >
       Submit
      </button>
     ) : (
      <>
       <button className='btn btn-success' onClick={toggleEdit}>
        Editer
       </button>
       <button className='btn btn-danger' onClick={deleteTask}>
        Supprimer
       </button>
       <button className='btn btn-secondary' onClick={toggleTask}>
        {task.done ? 'Todo' : 'Done'}
       </button>
      </>
     )}
    </div>
   </div>
  </div>
 )
}

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
    {!edit && (
     <>
      <h6 className='card-title'>{task.title}</h6>
      {task.description && <p>{task.description}</p>}
      <div className='d-flex justify-content-end gap-2'>
       <span className='badge text-bg-dark'>
        {new Date(task.updated_at).toLocaleString('fr')}
       </span>
      </div>
     </>
    )}

    {edit && (
     <>
      <input
       placeholder='The task title here ...'
       className='form-control mb-2'
       type='text'
       defaultValue={taskToEdit.title}
       onChange={(event) => {
        editTask({ ...taskToEdit, title: event.target.value })
       }}
      />
      <textarea
       className='form-control'
       rows={3}
       placeholder='The task description here ... '
       defaultValue={taskToEdit.description ?? ''}
       onChange={(event) => {
        editTask({ ...taskToEdit, description: event.target.value })
       }}
      ></textarea>
     </>
    )}
   </div>
   <div className='card-footer'>
    <div className='d-flex justify-content-end gap-2'>
     {edit ? (
      <button
       className='btn btn-success'
       onClick={async () => {
        await onSubmit()
       }}
      >
       Preview
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

import { TodoAsItem } from '../../types/types'
import TaskItem from '../TaskItem/TaskItem'
interface TaskListProps {
 tasks: TodoAsItem[]
 toggleTask: (task: TodoAsItem) => Promise<void>
 deleteTask: (task: TodoAsItem) => Promise<void>
 editTask: (task: TodoAsItem) => Promise<void>
}
export default function TaskList({
 tasks,
 toggleTask,
 deleteTask,
 editTask
}: TaskListProps) {
 return (
  <div className='container text-center'>
   <div className='row'>
    <div className='col'>
     <div className='p-3 m-3 bg-info bg-opacity-10 border border-info border-0 rounded-end'>
      TODO
     </div>
     {tasks
      .filter((item) => item.done === 0)
      .map((item) => (
       <TaskItem
        key={item.id}
        task={item}
        toggleTask={() => toggleTask(item)}
        deleteTask={() => deleteTask(item)}
        editTask={editTask}
       />
      ))}
    </div>

    <div className='col'>
     <div className='p-3 m-3 bg-info bg-opacity-10 border border-info border-0 rounded-end'>
      DONE
     </div>

     {tasks
      .filter((item) => item.done === 1)
      .map((item) => (
       <TaskItem
        key={item.id}
        task={item}
        toggleTask={() => toggleTask(item)}
        deleteTask={() => deleteTask(item)}
        editTask={editTask}
       />
      ))}
    </div>
   </div>
  </div>
 )
}

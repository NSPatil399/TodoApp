
import { useEffect,useState } from 'react';
import './App.css';
import { AiFillDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const[allTodos,setTodos] = useState([]);
  const[newTitle,setNewTitle] = useState("");
  const[newDescription,setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos] =useState("");
  const handleAddTodo =()=>{
    let newTodoItem ={
      title:newTitle,
      description:newDescription
    };
    let updateTodoArr =[...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
  };

  const handleDeleteTodo = (index) =>{
    let reducedTodo =[...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete =(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m =now.getMinutes();
    let s =now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy +' at '+ h +':' + m+':' + s;

    let filteredItem ={
      ...allTodos[index],
      completedOn:completedOn
    }


    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify( updateCompletedArr));

  };
  const handleDeleteCompletedTodo =(index)=>{
    let reducedTodo =[...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedtodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo)
    {
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);
  return (
    <div className="App">
      <h1>My Todo</h1>
      <div className='todo-wrapper'>
      <div className='todo-input'>
      <div className='todo-input-item'>
        <label1>Title</label1>
        <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} pleceholder="what's the task title?"/>

        
      </div>
      <div className='todo-input-item'>
        <label1>Description</label1>
        <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} pleceholder="what's the Description?"/>

        
      </div>
      <div className='todo-input-item'>
        <button type="button" onClick={handleAddTodo} className='primaryBtn'>ADD</button>
        
      </div>
      </div>
      <div className='btn-area'>
        <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=> setIsCompleteScreen(false)}>TODO</button>
        <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=> setIsCompleteScreen(true)}>
          completed
        </button>
      </div>
      <div className='todo-list'>

        {isCompleteScreen=== false && allTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <h3>
            {item.title}
            <p> {item.description }</p>
          </h3>
         
        <div>
        <AiFillDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete' />
        <FaCheck  className='icon'onClick={()=>handleComplete(index)} title='complete'/>
        </div>
       
        </div>
        )
       })}


        {isCompleteScreen=== true && completedTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <h3>
            {item.title}
            <p><small>Completed on : {item.completedOn }</small></p>
          </h3>
         
        <div>
        <AiFillDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?' />
       
        </div>
       
        </div>
        )
       })}
      </div>
      
      </div>
      
    </div>
  );
}

export default App;

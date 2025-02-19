import React, { useState ,useEffect} from 'react'
function Todo() {
  const [todolist, SetTodolist] =useState([]);
  const [todoname, SetTodoName] =useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editedTitle, setEditedTitle] = useState(''); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todolist');
    if (savedTodos) {
      SetTodolist(JSON.parse(savedTodos));
    }
  }, []);
  const handleAddTodo =() =>{
    let newTodoitems={
      title:todoname,
      bgcolor:"alert-danger"
    }
    let updatedTodoArr = [...todolist]
    updatedTodoArr.push(newTodoitems)
    SetTodolist(updatedTodoArr)
    localStorage.setItem("todolist",JSON.stringify(updatedTodoArr))
  }
  const handleTodoDelete = (index) => {
    let deleteTodoList = [...todolist]
    deleteTodoList.splice(index, 1);
      
    localStorage.setItem('todolist', JSON.stringify(deleteTodoList));
    SetTodolist(deleteTodoList)
  };
  const handleCompleted = (index) => {
    let CompletedTodo = [...todolist]
    CompletedTodo[index].bgcolor = CompletedTodo[index].bgcolor === 'alert-danger' 
      ? 'alert-success' 
      : 'alert-success';
      
    localStorage.setItem('todolist', JSON.stringify(CompletedTodo));
    SetTodolist(CompletedTodo)
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const Pendinglist = JSON.parse(localStorage.getItem("todolist")) || []; 
 

  // Filter todos based on the selected filter (completed/pending) and the search query
  const filteredList = Pendinglist.filter(item => {
    const isSearchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isFilterMatch =
      filter === 'todo' ||
      (filter === 'completed' && item.bgcolor === 'alert-success') ||
      (filter === 'pending' && item.bgcolor !== 'alert-success');
    return isSearchMatch && isFilterMatch;
  });
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedTitle(todolist[index].title); 
  };

  const handleSaveEdit = (index) => {
    let updatedTodos = [...todolist];
    updatedTodos[index].title = editedTitle;
    SetTodolist(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setEditingIndex(null); 
  };
  return (

    <div className='container mt-5 '>
      <button
        type="button"
        className=" border-0  sun-moon mb-3"
        onClick={toggleDarkMode}
      >
        
        
        {!darkMode && (
          <svg
            width="60px"
            height="60px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ms-2"
          >
            <circle cx="12" cy="12" r="5" stroke="#000000" stroke-width="2" fill="none" />
            <path
              d="M12 2V4M12 20V22M4 12H2M6.34 6.34L5.22 7.46M17.66 6.34L18.78 7.46M6.34 17.66L5.22 16.54M17.66 17.66L18.78 16.54"
              stroke="#000000"
              stroke-width="2"
            />
          </svg>
        )}

        
        {darkMode && (
             <svg
             width="60px"
             height="60px"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             className="ms-2"
           >
             <circle cx="12" cy="12" r="5" stroke="#ffffff" stroke-width="2" fill="none" />
             <path
               d="M12 2V4M12 20V22M4 12H2M6.34 6.34L5.22 7.46M17.66 6.34L18.78 7.46M6.34 17.66L5.22 16.54M17.66 17.66L18.78 16.54"
               stroke="#ffffff"
               stroke-width="2"
             />
           </svg>
        )}
      </button>
      <h1 className='text-center mb-5'>MY TODO LIST</h1>
      <div className="d-flex justify-content-center container-bg">
      <div className="container">
        <div className="row mt-5 align-items-center">
          <div className="col-md-6 col-9 text-center mb-3 mb-md-0">
            <input 
              value={todoname}
              onChange={(e) =>SetTodoName(e.target.value) }
              type="text" 
              className="form-control" 
              id="todoTitle" 
              placeholder="What's title of your To Do?"
            />
          </div>
          <div className="col-md-2 col-2 mb-3 mb-md-0">
            <button type="submit" onClick={handleAddTodo} className="btn btn-primary mb-sm-2 mb-md-0">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>
          </div>
          <div className="col-md-4 text-center d-flex gap-3">
          <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange} 
        />
          </div>
        </div>

        <hr />

        <div className="col-md-12 col-sm-12 my-3">
        <button 
        type="button" 
        className={`btn mb-2 me-2 ${filter === 'todo' ? 'btn-warning' : 'btn-outline-warning'}`} 
        onClick={() => setFilter('todo')}
      >
        ToDo
      </button>
      <button 
        type="button" 
        className={`btn mb-2 me-2 ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`} 
        onClick={() => setFilter('pending')}
      >
        Pending
      </button>
      <button 
        type="button" 
        className={`btn mb-2 ${filter === 'completed' ? 'btn-warning' : 'btn-outline-warning'}`} 
        onClick={() => setFilter('completed')}
      >completed</button>
        
        </div>
        {filteredList.length === 0 ? (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>If there are no {filter.charAt(0).toUpperCase() + filter.slice(1)} tasks!</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          
        ):(null) 
      }
        {filteredList.map((item, index) => {
        return (
            <div className="col-md-12 my-3" key={index}>
        <div  className={`alert ${item.bgcolor}`}>
        <div className='row align-items-center'>
          <div className="col-8">
                  {editingIndex === index ? (
                    <div>
                      <input
                        className='input-heading'
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)} // Update editedTitle as the user types
                      />
                      <button
                        type="submit"
                        className="btn  mb-2 me-3"
                        onClick={() => handleSaveEdit(index)} // Save changes
                      >
                          <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 20.75H7C6.27065 20.75 5.57118 20.4603 5.05546 19.9445C4.53973 19.4288 4.25 18.7293 4.25 18V6C4.25 5.27065 4.53973 4.57118 5.05546 4.05546C5.57118 3.53973 6.27065 3.25 7 3.25H14.5C14.6988 3.25018 14.8895 3.32931 15.03 3.47L19.53 8C19.6707 8.14052 19.7498 8.33115 19.75 8.53V18C19.75 18.7293 19.4603 19.4288 18.9445 19.9445C18.4288 20.4603 17.7293 20.75 17 20.75ZM7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H17C17.3315 19.25 17.6495 19.1183 17.8839 18.8839C18.1183 18.6495 18.25 18.3315 18.25 18V8.81L14.19 4.75H7Z" fill="#13653f"></path> <path d="M16.75 20H15.25V13.75H8.75V20H7.25V13.5C7.25 13.1685 7.3817 12.8505 7.61612 12.6161C7.85054 12.3817 8.16848 12.25 8.5 12.25H15.5C15.8315 12.25 16.1495 12.3817 16.3839 12.6161C16.6183 12.8505 16.75 13.1685 16.75 13.5V20Z" fill="#13653f"></path> <path d="M12.47 8.75H8.53001C8.3606 8.74869 8.19311 8.71403 8.0371 8.64799C7.88109 8.58195 7.73962 8.48582 7.62076 8.36511C7.5019 8.24439 7.40798 8.10144 7.34437 7.94443C7.28075 7.78741 7.24869 7.61941 7.25001 7.45V4H8.75001V7.25H12.25V4H13.75V7.45C13.7513 7.61941 13.7193 7.78741 13.6557 7.94443C13.592 8.10144 13.4981 8.24439 13.3793 8.36511C13.2604 8.48582 13.1189 8.58195 12.9629 8.64799C12.8069 8.71403 12.6394 8.74869 12.47 8.75Z" fill="#13653f"></path> </g></svg>
                      </button>
                    </div>
                  ) : (
                    <h3 className="alert-heading">{item.title}</h3>
                  )}
                </div>
          <div className='col-4 text-end'>
          <button type="submit" className="btn  mb-2 me-3" onClick={() => handleCompleted(index)}>
          <svg fill="#198754" width="34px" height="34px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m 13,4.1974 q 0,0.3097 -0.21677,0.5265 l -5.60517,5.6051 -1.0529,1.0529 q -0.21677,0.2168 -0.52645,0.2168 -0.30968,0 -0.52645,-0.2168 L 4.01935,10.329 1.21677,7.5264 Q 1,7.3097 1,7 1,6.6903 1.21677,6.4735 L 2.26968,5.4206 q 0.21677,-0.2167 0.52645,-0.2167 0.30968,0 0.52645,0.2167 l 2.27613,2.2839 5.07871,-5.0864 q 0.21677,-0.2168 0.52645,-0.2168 0.30968,0 0.52645,0.2168 L 12.78323,3.671 Q 13,3.8877 13,4.1974 z"></path></g></svg>  
          </button>
          </div>
        </div>
        
        <hr/>
        <button type="submit" className="btn btn-success mb-2 me-3" onClick={() =>handleEditClick(index)}>
            Edit
          </button>
          <button type="submit" className="btn btn-danger mb-2" onClick={() =>handleTodoDelete(index)}>
          Delete
          </button>
      </div>
        </div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default Todo

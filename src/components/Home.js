import React, {useState, useEffect} from 'react';
import axios from "axios";
import _ from 'lodash';
import {Routes, Route, Link} from "react-router-dom";
import TodoTable from './TodoTable';
import TodoDetail from './TodoDetail';
import usePrevious from '../util/usePrevious';
export default function Home(){
    const [todoList, setTodoList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [currentHeaders] = useState(["Id", "Title", "Status", "Username"]);
    const [searchTerms, setSearchTerms] = useState("");
    const [searchOrder, setSearchOrder] = useState("none");
    const [showComplete, setShowComplete] = useState(true);
    const prevSearchOrder = usePrevious(searchOrder);

    useEffect(()=> {
        function fetchTodos(){
            try {
                axios.get("https://jsonplaceholder.typicode.com/todos/")
                .then(function (response){
                    setTodoList(response.data)
                })
            } catch(e){
                console.error("An error occurred while fetching todos: " + e);
            }
        }
        fetchTodos()
    }, []);

    useEffect(()=> {
        function fetchUsers(){
            try {
                axios.get("https://jsonplaceholder.typicode.com/users/")
                .then(function (response){
                    setUserList(response.data);
                })
            } catch(e){
                console.error("An error occurred while fetching todos: " + e);
            }
        }
        fetchUsers()
    }, []);
    
    useEffect(()=>{
        if(searchOrder !== prevSearchOrder){
            let todoListSort = [...todoList]
            if(searchOrder === "asc"){
                setTodoList(todoListSort.sort((a,b) => {return ('' + a.title).localeCompare(b.title)}))
            } else if(searchOrder === "desc"){
                setTodoList(todoListSort.sort((a,b) => {return ('' + b.title).localeCompare(a.title)}))
            }
        }
    }, [searchOrder, prevSearchOrder, todoList])

    
    const updateComplete = (todoId) => {
        let todoListUpdate = [...todoList]
        let todoUpdate = todoListUpdate.find((todo)=>{
            return todoId === todo.id
        })
        todoUpdate.completed = !todoUpdate.completed
        setTodoList(todoListUpdate)
    }

    const getTableDataElementForLabel = (label, todoId, wrapLink) => {
        let todo = todoList.find((todo) => {return todoId === todo.id});
        let user = userList.find((user) => {return todo.userId === user.id});
        var element = null
        switch(label){
            case "Status":
                    element = <select value={todo.completed ? "Complete" : "Incomplete"} onChange={() => updateComplete(todoId)}>
                    <option value="Complete">{"Complete"}</option>
                    <option value="Incomplete">{"Incomplete"}</option>
                </select>

                break;
            case "Email":
                element = <a href = {"mailto: "+ (user ? user.email : "")}>{user ? user.email : ""}</a>
                break;
            default:
                break;
        }
        if(element !== null){
            return element;
        }
        switch(label){
            case "Id":
                element = <span>{todoId.toString()}</span>
                break;
            case "Username":
                element = <span>{user ? user.username : ""}</span>
                break;
            case "Title":
                element = <span>{todo.title ?? ""}</span>
                break;
            case "Name":
                element = <span>{user ? user.name : ""}</span>
                break;
            case "Website":
                element = <span>{user ? user.website : ""}</span>
                break;
            case "City":
                element = <span>{user && (_.has(user, "address.city")) ? user.address.city : ""}</span>
                break;
            case "Company Name":
                element = <span>{user && (_.has(user, "company.name")) ? user.company.name : ""}</span>
                break;
            case "Phone":
                element = <span>{user ? user.phone : ""}</span>
                break;
            default:
                element = ""
                break
        }

        if(wrapLink){
            return <Link to={"todo/"+todoId}>{element}</Link>;
        } else {
            return element;
        }

    }
    const handleSearchChange = (event) => {
        if(event.target.name === "search"){
            setSearchTerms(event.target.value);
        } else if(event.target.name === "showComplete"){
            setShowComplete(showComplete => !showComplete)
        } 
    }

    const handleSortChange = () => {
        setSearchOrder(order => order === "asc" ? "desc" : "asc");
    }
  
    return <div>
                {
                    /* Header */
                    <div className="page-header">
                        <h1> Welcome to TodoApp </h1>
                    </div>
                }


                <Routes>
                    <Route path="/" element={<TodoTable currentHeaders={currentHeaders}
                                    showComplete={showComplete}
                                    userList={userList}
                                    todoList={todoList}
                                    searchTerms={searchTerms}
                                    handleSearchChange={handleSearchChange}
                                    handleSortChange={handleSortChange}
                                    searchOrder={searchOrder}
                                    getTableDataElementForLabel={getTableDataElementForLabel}/>}></Route>
                    <Route path="/todo/:id" element={<TodoDetail todoList={todoList}
                                                                userList={userList}
                                                                getTableDataElementForLabel={getTableDataElementForLabel}/>}></Route>
                </Routes>
            </div>
}


import _ from "lodash";
import React from "react";
import TodoItem from "./TodoItem";
export default function TodoTable(props){
    const containsSearch = (searchTerms, todo) => {
        if(searchTerms != ""){
            let allTokens = [];
            if(_.has(todo, "title")){
                allTokens = todo["title"].split()
            }
            let doesContainSearchTokens = true;
            let searchTermsArr = searchTerms.split()
            searchTermsArr.forEach((term)=>{
                let foundTerm = false
                allTokens.forEach((token) => {
                    if(token.includes(term)){
                        foundTerm = true;
                    }
                })
                if(!foundTerm){
                    doesContainSearchTokens = false;
                }
            })
            return doesContainSearchTokens;
        } else{
            return true;
        }
    }
    return <div>
    {
        /* Search, utils etc. */
        <div className="search-utils">
            <span>Complete: <input checked={props.showComplete} onChange={props.handleSearchChange} type="checkbox" name="showComplete"></input></span>
            <input placeholder="Search" value={props.searchTerms} onChange={props.handleSearchChange} type="text" name="search"></input>
            <button onClick={props.handleSortChange}>Sort {props.searchOrder === "desc" ? "↓": "↑"}</button>
        </div>
    }
    {
        <div className="responsive-table">
        <table className={"table"}>
        {
            /* Column headers */
            <thead>
            <tr>
                {
                    props.currentHeaders && props.currentHeaders.length && props.currentHeaders.length > 0 && 
                    props.currentHeaders.map(header => {
                            return <th key={header}>{header}</th>
                        })
                }
            </tr>
            </thead>
        }
        <tbody>
        {
            /* Todos */
            (props.todoList && props.todoList.length && props.todoList.length > 0) ?
                props.todoList.map(todo => {
                    return (props.showComplete || !todo.completed) && (containsSearch(props.searchTerms, todo)) && <TodoItem key={todo.id} 
                                        headers={props.currentHeaders} 
                                        todoItem={todo} 
                                        getTableDataElementForLabel={props.getTableDataElementForLabel}
                                        user={props.userList.find(user => {return user.id === todo.userId})}>            
                            </TodoItem>
                }) : null
        }
        </tbody>
        </table>
        </div>
    }
    </div>
}
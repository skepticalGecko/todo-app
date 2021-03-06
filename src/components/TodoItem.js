import React from "react";
export default function TodoItem(props){

    return <tr className={props.todoItem.completed ? "table-success" : ""}>
        {props.headers && props.headers.length && props.headers.length > 0 &&
            props.headers.map(header => {
                return <td key={header}>
                        {props.getTableDataElementForLabel(header, props.todoItem["id"], true) ?? ""}
                        </td>
            })}
    </tr>
}
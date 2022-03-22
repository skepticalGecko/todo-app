import React from "react";
import {Link, useParams} from "react-router-dom";
export default function TodoDetail(props){
    let {id} = useParams()
    let labels = ["Id", "Title", "Status", "Username", "Name", "Email", "Website", "City", "Company Name", "Phone"] 
    return <div><table className="table">
            <tbody>
            {
                labels.map((label)=>{ return <tr key={label}><td>{label}</td><td>{props.getTableDataElementForLabel(label, parseInt(id), false)}</td></tr>
                })
            }
            </tbody>
            </table>
            <Link to={"/"}>Go Back</Link>
            </div>
}
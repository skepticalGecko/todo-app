import React from "react";
import {Link, useParams} from "react-router-dom";
export default function TodoDetail(props){
    let {id} = useParams()
    let labels = ["Id", "Title", "Status", "Username", "Name", "Email", "Website", "City", "Company Name", "Phone"] 
    return <div><table className="table">
            {
                labels.map((label)=>{ return <tr key={label}>
                        <td>{label}</td>
                        {props.getTableDataElementForLabel(label, parseInt(id), false)}
                    </tr>
                })
            }
            </table>

            <Link to={"/"}>Go Back</Link>
            </div>
}
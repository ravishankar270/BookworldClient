import logo from '../../logo.jpg'
import Cookies  from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';

export default function ReplyPost(props){
    const [post,setPost]=useState('')
    const postReply=()=>{
        var today=new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var date = dd + '/' + mm + '/' + yyyy;
        
        
        axios.post('http://localhost:5000/insertReplies', {
        
            comment: post,
            date: date,
            user: Cookies.get('Username'),
            id:props.id,
            review_id:props.review_id,
            
        }).then(response => {
            if (response.data.inserted) {
                var rev = {
                    _id:response.data.id,
                    comment:post,
                    date: date,
                    user: Cookies.get('Username'),
                    likes:0,
                    dislikes:0
                }
                props.setReviews(prevstate=>{                 
                    if(prevstate){
                    prevstate.Reviews[props.index].replies=[...prevstate.Reviews[props.index].replies,rev]
                    setPost("")
                    props.cancelReply()
                    props.openReviews(props.review_id,true)
                    return prevstate
                    }else{
                        props.setRefresh(true)
                        setPost("")
                        props.cancelReply()
                        return prevstate
                    }
                })
                
            }else{
                console.log(response.data)
            }
        }, error => console.log(console.error()))


    }
const postComment=(e)=>{
    setPost(e.target.value)
}
return(
<div className="replypost">
                        <div className="inputplace">
                            <img className="userimg" src={logo}></img>
                            <input type="text"  onChange={postComment}></input>
                        </div>
                        <div className="buttons">
                            <button onClick={props.cancelReply}>Cancel</button>
                            <button onClick={postReply}>Reply</button>
                        </div>
                    </div>
                    )
}

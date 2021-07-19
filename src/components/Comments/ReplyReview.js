import Cookies from 'js-cookie'
import React, { useEffect, useState,useRef } from 'react'
import logo from '../../logo.jpg'
import axios from 'axios'

export default function ReplyReview({ replies,setView, setRefresh, id, review_id }) {
    const user = Cookies.get("Username")
    const [repliesArray, setReplies] = useState(replies)
    
    const deleteReview = (reply_id, index) => {
        axios.delete('http://localhost:5000/deleteReplies', {
            data:
            {
                id: id,
                review_id: review_id,
                reply_id: reply_id
            }
        }).then((response) => {
            if (response.data.deleted) {
                if (repliesArray.length !== 0) {
                    setReplies(prev => {
                        prev.splice(index, 1)
                        console.log(prev)
                        return prev
                    })
                    // setRefresh(true)
                    
                }
            }
        }, error => console.log(console.error()))
    }

    

    

    const Replies = ({ index, item }) => {
        const [activeL,setActiveL]=useState(false)
        const [activeD,setActiveD]=useState(false)
        const [likes,setLikes]=useState(item.likes)
        const [dislikes,setDisLikes]=useState(item.dislikes)
        const like=useRef()
        const dislike=useRef()
        const [edited, setEdited] = useState("")
        const [isedit, setIsEdit] = useState(false)
        const textInput = useRef();

        useEffect(()=>{
            textInput.current.style.height = "0px";
            const scrollHeight = textInput.current.scrollHeight;
            textInput.current.style.height = scrollHeight + "px";
        },[edited])

        const edit = () => {
            setIsEdit(true)
            textInput.current.disabled = false
            textInput.current.style.border = "1px solid black"
        }
        const cancelEdit = () => {
            setIsEdit(false)
            textInput.current.disabled = true
            textInput.current.style.border = "none"
        }

        const handleEdit = (e) => {
            setEdited(e.target.value)
        }

        const edit1 = (id, review_id,reply_id) => {
            if (edited !== item.comment) {
                axios.put('http://localhost:5000/editReviews', {

                    edited: edited,
                    id: id,
                    review_id: review_id,
                    reply_id:reply_id

                }).then(response => {
                    if (response.data.edited) {
                        textInput.current.value = edited
                        textInput.current.style.border = "none"
                        textInput.current.disabled = true
                        setIsEdit(false)
                        setEdited("")
                    } else {
                        setIsEdit(false)
                        setEdited("")
                    }
                    // })\\
                }, error => console.log(console.error()))
            }
        }

        const incLikes=(id,review_id,reply_id)=>{
            if(activeL){
                axios.put('http://localhost:5000/incrementLikes', {
    
                    id: id,
                    review_id: review_id,
                    reply_id:reply_id,
                    isLike:false
    
                }).then(response => {
                    if (response.data.incremented) {
                        setLikes(prev=>{
                            prev-=1
                            return prev
                        })
                        setActiveL(false)
                        like.current.style.color=""
                    }
                    // })\\
                }, error => console.log(console.error()))
            }else{
                axios.put('http://localhost:5000/incrementLikes', {
    
                    id: id,
                    isLike:true,
                    reply_id:reply_id,
                    review_id: review_id,
    
                }).then(response => {
                    if (response.data.incremented) {
                        setLikes(prev=>{
                            prev+=1
                            return prev
                        })
                        setActiveL(true)
                        like.current.style.color="black"
                    }
                    // })\\
                }, error => console.log(console.error()))
            }
    
        }

        const incDislikes=(id,review_id,reply_id)=>{
            if(activeD){
                axios.put('http://localhost:5000/incrementDisLikes', {
    
                    id: id,
                    review_id: review_id,
                    reply_id:reply_id,
                    isLike:false
    
                }).then(response => {
                    if (response.data.incremented) {
                        setDisLikes(prev=>{
                            prev-=1
                            return prev
                        })
                        setActiveD(false)
                        dislike.current.style.color=""
                    }
                    // })\\
                }, error => console.log(console.error()))
            }else{
                axios.put('http://localhost:5000/incrementDisLikes', {
    
                    id: id,
                    isLike:true,
                    reply_id:reply_id,
                    review_id: review_id,
    
                }).then(response => {
                    if (response.data.incremented) {
                        setDisLikes(prev=>{
                            prev+=1
                            return prev
                        })
                        setActiveD(true)
                        dislike.current.style.color="black"
                    }
                    // })\\
                }, error => console.log(console.error()))
            }
    
        }
            return (
            <React.Fragment>
                <div className='replyreview'>
                    <img className="userimg" src={logo}></img>
                    <div className='userdetails'>
                        <div className='userinfo'>
                            <h3>{item.user === user ? "You" : item.user}</h3>

                            <h3>{item.date}</h3>
                        </div>
                        <div className='userreview'>
                    
                        <textarea type="text" className='userreview' ref={textInput}
                            disabled
                            style={{
                                backgroundColor: "white",
                                outline: "none",
                                border: "none",
                                resize: "none",
                                width: "100%",
                                textAlign:"justify"
                            }}
                            onChange={(e) => handleEdit(e)}
                            cols="19"

                        >
                            {item.comment}
                        </textarea>
                        {isedit ?
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"

                            }}>
                                <button
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        padding: "5px 13px 5px",
                                        marginRight: "10px",
                                    }}
                                    onClick={() => cancelEdit()}
                                >Cancel</button>
                                <button
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        padding: "5px 13px 5px",
                                        marginRight: "10px",
                                    }}
                                    onClick={() => edit1(id,review_id, item._id)}
                                >Edit</button>
                            </div> : null
                        }
                    
                        </div>
                        <div className="reply">

                            <div className="likes">
                                <div>{likes}</div>
                                <i ref={like} onClick={()=>incLikes(id,review_id,item._id)} style={{cursor:"pointer"}}  class="far fa-thumbs-up"></i>
                            </div>
                            <div className="dislikes">
                                <div>{dislikes}</div>
                                <i ref={dislike} onClick={()=>incDislikes(id,review_id,item._id)} style={{cursor:"pointer"}}  class="far fa-thumbs-down"></i>
                            </div>


                        </div>

                    </div>
                    {user === item.user ?
                        <div className="icons">
                            <i style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => edit()} className="fas fa-edit"></i>
                            <i style={{ cursor: "pointer" }} onClick={() => deleteReview(item._id, index)} className="fas fa-trash-alt"></i>
                        </div> : <div className="icons"></div>
                    }
                </div>
                <hr />
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {repliesArray.length !== 0 ? (
                <React.Fragment>
                    {repliesArray.map((item, index) => <Replies key={index} index={index} item={item} />)
                    }
                </React.Fragment>
            ) : <div style={{ width: "100%", textAlign: "center" }}>
                No Replies
            </div>
            }
        </React.Fragment>
    )
}
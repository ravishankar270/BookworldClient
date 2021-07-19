import React, { useState, useRef, useEffect } from 'react'
import logo from '../../logo.jpg'
import StarRatingComponent from 'react-star-rating-component'
import Cookies from 'js-cookie'
import axios from 'axios';
import ReplyReview from './ReplyReview';
import ReplyPost from './ReplyPost';

export default function CommentAvatar({ item, ratingChanged, deleteReview, id, index, setReviews, setRefresh }) {
    const [reply, setReply] = useState(null)
    const [view, setView] = useState(null)
    const [edited, setEdited] = useState("")
    const [isedit, setIsEdit] = useState(false)
    const [activeL,setActiveL]=useState(false)
    const [activeD,setActiveD]=useState(false)
    const [likes,setLikes]=useState(item.likes)
    const [dislikes,setDisLikes]=useState(item.dislikes)

    const textInput = useRef();
    const like=useRef()
    const dislike=useRef()

    const user = Cookies.get('Username')

    useEffect(()=>{
        textInput.current.style.height = "0px";
        const scrollHeight = textInput.current.scrollHeight;
        textInput.current.style.height = scrollHeight + "px";
    },[edited])

    const cancelReply = () => {
        setReply(false)
    }
    const openReviews = (id, yes) => {
        if (yes) {
            setView(id)
        } else {
            setView(null)
        }
    }
    const handleEdit = (e) => {
        setEdited(e.target.value)
    }
    const handleReply = (id) => {
        setReply(id)
    }
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
    const edit1 = (id, review_id) => {
        if (edited !== item.comment) {
            axios.put('http://localhost:5000/editReviews', {

                edited: edited,
                id: id,
                review_id: review_id,

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

    const Button = (props) => {
        return (
            <button className="viewreplies" onClick={() => openReviews(props.id, props.viewR)}>
                <i className={`fas fa-${props.type}`}></i>View reply
            </button>
        )
    }

    const incLikes=(id,review_id)=>{
        if(activeL){
            axios.put('http://localhost:5000/incrementLikes', {

                id: id,
                review_id: review_id,
                isLike:false

            }).then(response => {
                if (response.data.incremented) {
                    setLikes(prev=>{
                        prev-=1
                        return prev
                    })
                    setActiveL(false)
                    like.current.style.color="black"
                }
                // })\\
            }, error => console.log(console.error()))
        }else{
            axios.put('http://localhost:5000/incrementLikes', {

                id: id,
                isLike:true,
                review_id: review_id,

            }).then(response => {
                if (response.data.incremented) {
                    setLikes(prev=>{
                        prev+=1
                        return prev
                    })
                    setActiveL(true)
                    like.current.style.color="007bff"
                }
                // })\\
            }, error => console.log(console.error()))
        }

    }

    const incDislikes=(id,review_id)=>{
        if(activeD){
            axios.put('http://localhost:5000/incrementDisLikes', {

                id: id,
                review_id: review_id,
                isLike:false

            }).then(response => {
                if (response.data.incremented) {
                    setDisLikes(prev=>{
                        prev-=1
                        return prev
                    })
                    setActiveD(false)
                    dislike.current.style.color="black"
                }
                // })\\
            }, error => console.log(console.error()))
        }else{
            axios.put('http://localhost:5000/incrementDisLikes', {

                id: id,
                isLike:true,
                review_id: review_id,

            }).then(response => {
                if (response.data.incremented) {
                    setDisLikes(prev=>{
                        prev+=1
                        return prev
                    })
                    setActiveD(true)
                    dislike.current.style.color="007bff"
                }
                // })\\
            }, error => console.log(console.error()))
        }

    }


    return (
        <React.Fragment>
            <div className='review'>
                <div className="userimg" >
                    {item.user?item.user[0]:"A"}
                </div>
                <div className='userdetails'>
                    <div className='userinfo'>
                        <h3>{user === item.user ? "You" : item.user}</h3>
                        <h3>
                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                // renderStarIcon={() => <span></span>}
                                starCount={5}
                                value={item.rating}
                            />
                        </h3>
                        <h3>{item.date}</h3>
                    </div>
                    <div>
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
                            onInput='style.height = "";style.height = scrollHeight + 3 + "px"'
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
                                    onClick={() => edit1(id, item._id)}
                                >Edit</button>
                            </div> : null
                        }
                    </div>
                    <div className="reply">
                        <div className='replybtn' onClick={() => handleReply(item._id)}>
                            Reply
                        </div>

                        <div className="likes">
                            <div>{likes}</div>
                            <i ref={like} onClick={()=>incLikes(id,item._id)} style={{cursor:"pointer"}} class="far fa-thumbs-up"></i>
                        </div>
                        <div className="dislikes">
                            <div>{dislikes}</div>
                            <i ref={dislike} onClick={()=>incDislikes(id,item._id)} style={{cursor:"pointer"}} class="far fa-thumbs-down"></i>
                        </div>


                    </div>

                </div>
                {user === item.user ?
                    <div className="icons">
                        <i style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => edit()} className="fas fa-edit"></i>
                        <i style={{ cursor: "pointer" }} onClick={() => deleteReview(item._id)} className="fas fa-trash-alt"></i>
                    </div> : <div className="icons"></div>
                }
            </div>
            {reply === item._id ? (<ReplyPost cancelReply={cancelReply} openReviews={openReviews} index={index} review_id={item._id} id={id} setReviews={setReviews} setRefresh={setRefresh} />) : null}
            <div className="view" >
                {view !== item._id ? <Button type="caret-up" id={item._id} viewR={true} /> : <Button type="caret-down" id={item._id} viewR={false} />}
            </div>
            <div className="replycontainer">
                {view === item._id ? (<ReplyReview replies={item.replies} setView={openReviews} setRefresh={setRefresh} id={id} review_id={item._id} />) : null}
            </div>
            <hr />
        </React.Fragment>
    )
}
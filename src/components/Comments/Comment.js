import React, { useEffect, useState } from 'react'
import "./Comment.css"
import StarRatingComponent from 'react-star-rating-component'
import Loading from '../Loading/Loader';
import CommentAvatar from './CommentAvatar';
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Comment(props) {
    //other logic
    const [post, setPost] = useState(false)
    // const [reply, setReply] = useState(null)
    // const [view, setView] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [text, setText] = useState("")
    const [rating, setRating] = useState(0)
    const [refresh, setRefresh] = useState(true)
    const [yes,setYes]=useState(false)
    var today = new Date();


    const ratingChanged = (newRating) => {
        setRating(newRating)
    };
    const textChanged = (e) => {
        setText(e.target.value)
    }
    const handleClick = () => {
        setPost(!post)
    }

    // const handleReply = (id) => {
    //     setReply(id)
    // }
    // const cancelReply = () => {
    //     setReply(false)
    // }
    // const openReviews = (id,yes) => {
    //     if(yes){
    //     setView(id)
    //     }else{
    //         setView(null)
    //     }
    // }
    useEffect(() => {
        if (refresh) {
            axios.get(`http://localhost:5000/reviews/${props.name}`).then(response => {
                console.log(response.data)
                setReviews(response.data)
                // setYes(true)

            }, error => console.log(console.error()))
            setRefresh(false)
        }


    }, [refresh])

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    const deleteReview = (review_id) => {
        axios.delete('http://localhost:5000/deleteReviews', {
            data:
            {
                id: reviews._id,
                review_id: review_id
            }
        }).then((response) => {
            if (response.data.deleted) {
                setRefresh(true)
            }
        }, error => console.log(console.error()))
    }


    const postReview = () => {
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var date = dd + '/' + mm + '/' + yyyy;

        var rev = {
            name: props.name,
            comment: text,
            date: date,
            user: Cookies.get('Username'),
            rating: rating,
            replies: []
        }
        axios.post('http://localhost:5000/insert', {
            name: props.name,
            comment: text,
            date: date,
            user: Cookies.get('Username'),
            rating: rating
        }).then(response => {
            if (response.data.inserted) {
                setReviews(prevstate => {
                    if (prevstate) {
                        prevstate.Reviews = [...prevstate.Reviews, rev]
                        return prevstate
                    } else {

                        setRefresh(true)
                        return prevstate
                    }
                })
                setPost(false)
            } else {
                console.log(response.data)
            }
        }, error => console.log(console.error()))

    }
    // const Button = (props) => {
    //     return (
    //         <button className="viewreplies" onClick={()=>openReviews(props.id,props.viewR)}>
    //             <i className={`fas fa-${props.type}`}></i>View reply
    //         </button>
    //     )
    // }

    const Review = ({ index, item }) => {
        return (
            <React.Fragment>
                <CommentAvatar item={item} index={index} deleteReview={deleteReview} id={reviews._id} ratingChanged={ratingChanged} setReviews={setReviews} setRefresh={setRefresh} />
                {/* { reply===item._id ? (<ReplyPost cancelReply={cancelReply} index={index} review_id={item._id} id={reviews._id}  setReviews={setReviews} setRefresh={setRefresh} />) : null}
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                    {view!==item._id ? <Button type="caret-up" id={item._id} viewR={true} /> : <Button type="caret-down" id={item._id} viewR={false} />}
                </div>
                <div className="replycontainer">
                    {view===item._id ? (<ReplyReview replies={item.replies} />) : null}
                </div>
                <hr/> */}
            </React.Fragment>
        )
    }

    return (
        <div className="thread">
            <div className='comments'>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                    <h3 className="heading" >Reviews</h3>
                    <i onClick={handleClick} className="fas fa-plus" style={{ fontSize: "24px", cursor: "pointer" }}></i>
                    <i onClick={handleRefresh} style={{ cursor: "pointer" }} className="fas fa-sync-alt"></i>
                </div>
                <hr />
                {post ?
                    (<div className="post">
                        <StarRatingComponent
                            name="rate2"
                            editing={true}
                            starCount={5}
                            value={rating}
                            onStarClick={ratingChanged}
                        />
                        <textarea name="review" placeholder="write your review" onChange={textChanged} >

                        </textarea>
                        <button onClick={postReview}>Post</button>
                    </div>) : null
                }
                {!reviews ? <Loading isAvailable={yes} c={true}/> :
                    <React.Fragment>
                        {!reviews ? <h4>No reviews</h4> :
                            (<React.Fragment>
                                {reviews.Reviews.map((item, index) => <Review index={index} item={item} id={item._id} />)}
                            </React.Fragment>
                            )
                        }

                    </React.Fragment>
                }
            </div>
        </div>
    );
}
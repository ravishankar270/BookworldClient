import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DetailContext, Detail } from '../../DetailApi'
import { BookmarkContext, Bookmark } from '../../Bookmark'
import StarRatingComponent from 'react-star-rating-component'
import Loading from '../Loading/Loader'
import './BookDetail.css'
import Comment from '../Comments/Comment'
import axios from 'axios'
import Cookies from 'js-cookie'


export function BookDetailContext(props) {
    const { list, setList } = useContext(DetailContext)
    const { bookmark, setBookmark } = useContext(BookmarkContext)
    const [item, setItem] = useState(null)
    const [isMore, setMore] = useState(false)
    const [ismark, setMark] = useState(false)
    const bookMark = useRef()
    const user = Cookies.get('Email')
    useEffect(() => {
        if(bookmark){
        const b = bookmark.find(function (element) {
            return element.id == props.id
        })
        if (b) {
            setMark(true)
        }
    }
        
        const a = list.find(function (element) {
            return element.id === props.id
        })
        setItem(a)


    }, [list])
    const addBook = () => {
        if(bookMark.current.style.color!="yellow"){
        axios.post(`http://localhost:5000/bookmark/insert`, {
            id: props.id,
            email: user,
            img: item.volumeInfo.imageLinks.thumbnail
        }).then(response => {
            console.log(response.data)
            if (response.data.inserted) {
                bookMark.current.style.color = "yellow"
            }
        }, error => {

        })
    }

    }
    const Item = () => {
        return (
            <React.Fragment>
                <div className='shado'>
                    <div className='bookDetail'>
                        <div className='preview'>
                            <img className="bookImg" src={item.volumeInfo.imageLinks.thumbnail}></img>
                            <button><a href={item.volumeInfo.previewLink}>Preview</a></button>
                            <button><a style={{ color: "white" }} href={item.volumeInfo.buyLink}>Buy</a></button>
                        </div>
                        <div className="mainpart">
                            <h3>{item.volumeInfo.title}:{item.volumeInfo.subtitle}</h3>
                            <div className="info">
                                <h4>By {item.volumeInfo.authors.join(",")}</h4>
                                <h4>{item.volumeInfo.publishedDate}</h4>
                            </div>
                            <div>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    value={item.volumeInfo.averageRating}
                                />
                            </div>
                            <p>{item.volumeInfo.description}</p>
                            <hr />
                            <div>PaperBack pages:{item.volumeInfo.pageCount}</div>
                            <div>Genre:{item.volumeInfo.categories.join(",")} </div>
                            {!isMore ? (<div style={{ fontSize: "12px", cursor: "pointer", color: "blue" }} onClick={() => setMore(true)}>...More Details</div>) :
                                (<React.Fragment>
                                    <div>Languague:{item.volumeInfo.language}</div>
                                    <div style={{ fontSize: "12px", cursor: "pointer", color: "blue" }} onClick={() => setMore(false)}>...Less Details</div>
                                </React.Fragment>)}
                        </div>
                        {ismark ? <i ref={bookMark} onClick={addBook} style={{ cursor: "pointer", fontSize: "22px",color:"yellow" }} className="fas fa-bookmark"></i> : 
                        <i ref={bookMark} onClick={addBook} style={{ cursor: "pointer", fontSize: "22px" }} className="fas fa-bookmark"></i>}
                    </div>
                </div>
                <Comment name={item.volumeInfo.title} />
            </React.Fragment>

        )
    }
    return (
        <React.Fragment>
            {
                item ? (
                    <Item />
                ) : (<Loading />)
            }
        </React.Fragment>

    )
}
export const BookDetail = (props) => {
    return (
        <Detail>
            <Bookmark>
                <BookDetailContext id={props.id} />
            </Bookmark>
        </Detail>
    )
}




import React, {createContext,useState,useEffect} from 'react'
import axios from "axios";
import Cookies from 'js-cookie';
export const BookmarkContext=createContext([])

export function Bookmark(props){
    const [bookmark,setBookmark]=useState([])
    const user=Cookies.get("Email")
    const value={bookmark,setBookmark}
    useEffect(()=>{
        if(user){
            axios.get(`https://bookah.herokuapp.com/bookmark/${user}`).then(response=>{
            console.log(response.data)
            setBookmark(response.data.bookmark.bookmark)  
            },error=>{
                console.log(error)
            })
        }
    },[])

    return(
        <BookmarkContext.Provider value={value}>
            {props.children}
        </BookmarkContext.Provider>
    )
}
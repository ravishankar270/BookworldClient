import React, {Children, createContext,useState,useEffect} from 'react'
import BookList from './components/BookList/BookList'
import axios from "axios";

export const DetailContext=createContext([])

export function Detail(props){
    const [list,setList]=useState([])
    
    const value={list,setList}
    useEffect(()=>{
        const options = {
        method: 'GET',
        url: 'https://google-books.p.rapidapi.com/volumes',
        params: {key: 'AIzaSyBAaiX80typIvWxnW5fahg_JqoGVNdEdww'},
        headers: {
            'x-rapidapi-key': '850365e9e7msh2c418e549d0ae29p1e26e3jsnec3114e6999d',
            'x-rapidapi-host': 'google-books.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            setList(response.data.items)
        }).catch(function (error) {
            console.error(error);
        });
    },[])

    return(
        <DetailContext.Provider value={value}>
            {props.children}
        </DetailContext.Provider>
    )
}
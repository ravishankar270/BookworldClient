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
            url: 'https://books-api7.p.rapidapi.com/books/get/random/',
            headers: {
              'X-RapidAPI-Key': 'ae6fff33acmsh6d2c16ed65df292p19c0e7jsn4fe73144140d',
              'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
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

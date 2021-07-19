import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import './BookBody.css'
import NavBar from '../Nav/Nav'
import { BookList } from '../BookList/BookList'
import { BookDetail } from '../BookDetail/BookDetail'
// import DetailContext from '../../DetailApi'

export default function BookBody({ isDetail, match, id }) {
    const user = Cookies.get("Username")
    // const Detail=useContext(DetailContext)
    return (
        <React.Fragment>
            <NavBar user={user} />
            {!isDetail ? <BookList /> : <BookDetail id={id} />}
        </React.Fragment>
    )
}




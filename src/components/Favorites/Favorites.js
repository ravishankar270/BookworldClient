import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../Nav/Nav'
import "./Favorites.css"
import logo from '../../logo.jpg'
import { BookmarkContext, Bookmark } from '../../Bookmark'
import Cookies from 'js-cookie'
import {
    Redirect,
    Link
} from 'react-router-dom'

function FavoritesContext() {

    const user = Cookies.get("Email")
    const { bookmark, setBookmark } = useContext(BookmarkContext)
    console.log(bookmark)

    return (
        <React.Fragment>
            {user ?

                (<React.Fragment>
                    <NavBar />
                    <div className="wa">
                        <div className="bookmark">
                            <div className="wantpart">
                                <h3>Want to read</h3>
                                <div className="want">
                                    {bookmark ?
                                        (
                                            <React.Fragment>

                                                {bookmark.map((item, index) => <div key={item.id} className="book" >
                                                    <img src={item.img} />
                                                    <button className="viewBookmark"><Link style={{ color: "white", textDecoration: "none" }} to={`/details?id=${item.id}`}>View</Link></button>
                                                </div>
                                                )

                                                }
                                            </React.Fragment>
                                        ) : <p>No Books in this section</p>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </React.Fragment>) : (<Redirect to="/login" />)
            }
        </React.Fragment>
    )
}

const Favorites = () => {
    return (
        <Bookmark>
            <FavoritesContext />
        </Bookmark>
    )
}
export default Favorites
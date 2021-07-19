import React, { useContext, useEffect, useState } from 'react'
import './BookList.css'
import Loading from '../Loading/Loader'
import { Link } from 'react-router-dom'
import { DetailContext, Detail } from '../../DetailApi';

function BookListContext() {
    const { list, setList } = useContext(DetailContext)



    const ListContent = (props) => {
        var length = 200;
        var myString = props.val.volumeInfo.description;
        if (myString) {
            var p = myString.substring(0, length) + '...';
        } else {
            p = "no information"
        }

        return (
            <div className="whole" >
                <img className="bookImg" src={props.val.volumeInfo.imageLinks.thumbnail}></img>
                <div className="desc">
                    <h3>{props.val.volumeInfo.title}:{props.val.volumeInfo.subtitle}</h3>
                    <p>{p}</p>
                    <div className="info">
                        <h4>{props.val.volumeInfo.authors.join(",")}</h4>
                        <h4>{props.val.volumeInfo.publishedDate}</h4>
                    </div>

                </div>
                <div className="wrap">
                    <Link className='a' to={`/details?id=${props.val.id}`}>
                        <span class="right"></span>
                    </Link>
                </div>

            </div>

        )
    }
    return (
        <React.Fragment>
            {
                list.length !== 0 ? (
                    <div className="fit">
                        {
                            list.map(item => <ListContent key={item.id} val={item} />)
                        }
                    </div>
                ) : (<Loading isAvailable={false} />)
            }
        </React.Fragment>
    )
}

export const BookList = () => {
    return (
        <Detail>
            <BookListContext />
        </Detail>
    )
};


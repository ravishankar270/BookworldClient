import React from "react";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "./Loading.css"
export default function Loading(props){
  //other logic
  const [i,seti]=useState(true)

  useEffect(()=>{
    if(props.c==true){

      setTimeout(() => {
        seti(false)
        
      }, 10000);
    }
  },[])
 

    return (
      
    <div className="load">
    {i==false?
      <h3>No Reviews</h3>:<Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100} //3 secs
    />
    }
      </div>
      
    );
}
import { Button,Nav,Navbar,FormControl,Form,NavDropdown } from 'react-bootstrap';
import './Nav.css';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'
import {DetailContext,Detail} from '../../DetailApi'
import { useContext, useRef, useState } from 'react';
import React from 'react';
function NavBarContext(props) {
  const user=Cookies.get("Username")
  const {list,setList}=useContext(DetailContext)
  const [res,setRes]=useState([])
  const serachplace=useRef()
  const search=(e)=>{
    const val=e.target.value
    if(val!==""){
    serachplace.current.style.display="block"
    }else{
      serachplace.current.style.display="none"
    }
    var result=list.filter(item=>item.volumeInfo.title.startsWith(val))
    setRes(result)
  }
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
  <Navbar.Brand href="/">BookVerse</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/favorites">Favourites</Nav.Link>
      
    </Nav>
    <div className='user'>
    <Form inline>
      <FormControl onChange={(e)=>search(e)} type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
      <div ref={serachplace} className="serachplace">
        {res.length!==0?
        <React.Fragment>
        {res.map((item,index)=>
          <div key={index} className="spitem" onClick={()=>window.location.href=`/details?id=${item.id}`}>
            <img src={item.volumeInfo.imageLinks.thumbnail}/>
            <h4>{item.volumeInfo.title}</h4>
          </div>
          )
        }
        </React.Fragment>
        :"No results"}
      </div>
    </Form>
    <Nav.Link className="profile">
    {/* <i className='far fa-user-circle' style={{fontSize:'36px'}}></i> */}
    {user?
    <Nav className="mr-auto">
    <NavDropdown title={user} id="basic-nav-dropdown">
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item ><Link style={{
          textDecoration:"none",
          color:"black"
        }} to="/logout">Logout</Link></NavDropdown.Item>
      </NavDropdown></Nav>:<Link  to="/login"><button  style={{
          background:"inherit",
          border:"none",
          outline:"none",
          color:"#007bff",
          fontSize:"18px"
      }}>Login</button></Link>
      
}
    </Nav.Link>
    </div>
  </Navbar.Collapse>
</Navbar>
    
  );
}
const NavBar=()=>{
  return(
  <Detail>
    <NavBarContext/>
  </Detail>
  )
}
export default NavBar;

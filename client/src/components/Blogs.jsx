import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PostCard from './PostCard'
import axios from 'axios';
import Popup from './Popup';
import { Link } from 'react-router-dom';

const Blogs = () => {

  const [blogs,setBlogs] = useState([]);
  const [error,setError] = useState(false);
  const [msg,setMsg] = useState("");

  useEffect(()=>{
    const fetchBlogs = async () => {
       try{
        const response = await axios.get('/blogs/random');
        setBlogs(response.data);
       }catch(err){
          setError(true);
          setMsg("Oops !! Something Went Wrong");
       }
    }
    fetchBlogs();
  },[]);

  return (
    <>
      {
        error && <Popup msg={msg} setError={setError}/>
      }
    <Container>
    <CardContainer>
        {
           blogs.map((blog)=>(
              <PostCard key={blog._id} blog={blog}/>
           ))
        }
    </CardContainer>
    <ShowMoreBtn>
    <Link to='/all' style={{"color":"inherit"}}>
    Show More
    </Link>
    </ShowMoreBtn>
    </Container>
    </>
  )
}

export default Blogs




/*<------------------------------------------------------  CSS STYLING --------------------------------------------------------------------->*/

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
margin-bottom: 4rem;
`;

const CardContainer = styled.div`
display: grid;
padding: 1rem;
grid-template-columns:repeat(3,1fr);
gap: 1.5rem;

@media(max-width:768px){
  grid-template-columns:100%;
}

`;


const ShowMoreBtn = styled.button`
width: max-content;
align-self: center;
padding: 0.8rem 4rem;
background: linear-gradient(90deg, #0ea5ea, #0bd1d1 51%, #0ea5ea);
background-size: 200%;
background-position: left;
font-weight:400;
color: white;
font-size: 0.8rem;
border-radius:3rem;
border: none;
cursor: pointer;
transition: all 0.3s ease;

&:hover{
  background-position: right;
};
`

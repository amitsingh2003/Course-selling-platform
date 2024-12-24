import React from 'react'
import Nav from '../../component/Nav';
import Footer from '../../component/Footer';
import Coursepaid from '../../component/Coursepaid';
import list from "/src/list.json";
function Courses() {
  return (
    <>
     <Nav></Nav>
     <div className='min-h-screen'>
     <Coursepaid></Coursepaid>
     </div>
   
    <Footer></Footer>
      
    </>
  )
}

export default Courses

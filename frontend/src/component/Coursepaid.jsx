import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
function Coursepaid() {

  const [book , setbook] = useState([]);

  useEffect(()=>{
    const getBook = async ()=>{
      try {
        const res = await axios.get("http://localhost:5001/book");
        console.log(res.data);
        setbook(res.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  },[])

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 mt-20">
        <div className=" items-center justify-center text-center">
          <h1 className=" text-2xl font-semibold md:text-4xl text-pink-500 ">
            Some Paid Courses
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            ratione, non iure sequi quia reprehenderit sit deleniti quasi,
            consectetur provident amet eos modi vero nihil ipsum aliquid maiores
            voluptas. Voluptatem.
          </p>
        </div>

        <div className=" mt-12  grid grid-cols-1 md:grid-cols-3">
          {
            book.map((item)=>(
              <Card key={item.id} item={item}></Card>
            ))
          }
          </div>
      </div>
    </>
  );
}

export default Coursepaid;

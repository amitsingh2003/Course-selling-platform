import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Card from "./Card";

function Course() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [book, setbook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:5001/book");
        const freeBooks = res.data.filter((data) => data.category === "free");
        setbook(freeBooks);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl text-pink-500 pb-2">Free Courses</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
          magnam reiciendis fuga ad culpa provident mollitia magni sint
          incidunt voluptatum assumenda repudiandae cumque, maiores nam.
        </p>
      </div>
      <div>
        <div className="slider-container">
          <Slider {...settings}>
            {book.map((item) => (
              <Card item={item} key={item.id}></Card>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Course;

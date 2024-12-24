import React from "react";

function Card({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-4 ">
        <div className="card bg-base-100 w-92 dark:border-[0.2px] shadow-xl mt-5 cursor-pointer hover:scale-105 duration-200 dark:bg-slate-900 ">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary text-white bg-pink-500">
                {item.category}
              </div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline px-4 py-3 rounded-xl mt-2 font-semibold">
                ${item.price}
              </div>
              <div className="badge badge-outline cursor-pointer rounded-xl mt-2 hover:bg-pink-500 hover:text-white px-4 py-3 duration-200 font-semibold border-[2px]">
                Buy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../customHook/customHook";

function Card({ id, poster, title, genre, rating }) {
   const navigate = useNavigate();
   
   
   
   const handleClick = () => {
    console.log("fdasfa");
    //  console.log(` id is ${id}` )
   
   navigate(`/now-showing-movie/${id}`);
  //  console.log(data)

   };

   return (
    <div 
      className="w-64 bg-gray-800 rounded-2xl shadow-lg overflow-hidden relative cursor-pointer" 
      onClick={handleClick}
    >
      <img
        src={poster}
        alt={`${title} Poster`}
        className="w-full h-80 object-cover rounded-t-2xl"
      />

      <div className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
        {rating}
      </div>

      <div className="relative bg-gray-900 text-center p-4 rounded-b-2xl">
        <div className="absolute -left-3 -top-3 w-6 h-6 bg-gray-800 rounded-full"></div>
        <div className="absolute -right-3 -top-3 w-6 h-6 bg-gray-800 rounded-full"></div>

        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-gray-400 text-sm">{genre}</p>
      </div>
    </div>
  );
}

export default Card;

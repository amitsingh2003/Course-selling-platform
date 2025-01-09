import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authprovider";

function BuyPage() {
  const { state } = useLocation(); // Get course details from state
  const navigate = useNavigate();
  const [authUser] = useAuth();

  const course = state?.course;

  if (!course) {
    return <p>Course not found!</p>;
  }

  const handlePurchase = () => {
    // Simulate a purchase process
    alert(`Thank you for purchasing ${course.name}!`);
    navigate("/Course"); // Redirect to the courses page after purchase
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Purchase Course</h1>
      <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-12">
        {/* Course Image */}
        <div className="flex-1">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* Course Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{course.name}</h2>
          <p className="text-lg text-gray-700 mb-6">{course.title}</p>
          <p className="text-xl font-semibold mb-2">Category: {course.category}</p>
          <p className="text-lg font-semibold mb-6">Price: ${course.price}</p>
          <button
            onClick={handlePurchase}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-600"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;

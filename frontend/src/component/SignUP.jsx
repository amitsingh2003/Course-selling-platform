import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function SignUP() {

  const location = useLocation();
  const from =location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userinfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:5001/user/signup", userinfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Signup Successful");
          navigate(from,{replace:true});
        }
        localStorage.setItem("User", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Signup" + err);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="modal-box w-screen">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to={"/"}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-pink-500"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg text-pink-500">SignUp</h3>

              <div className="mt-5">
                <span>Name</span>
                <br></br>
                <input
                  type="fullname"
                  placeholder="enter your full name"
                  className="px-2 py-2 rounded-md  border outline-none w-80 "
                  {...register("fullname", { required: true })}
                ></input>
                <br></br>

                {errors.fullnamename && (
                  <span className="text-sm text-red-500">
                    *This field is required*
                  </span>
                )}
              </div>

              <div className="mt-5">
                <span>Email</span>
                <br></br>
                <input
                  type="email"
                  placeholder="enter your email"
                  className="px-2 py-2 rounded-md  border outline-none w-80 "
                  {...register("email", { required: true })}
                ></input>
                <br></br>

                {errors.email && (
                  <span className="text-sm text-red-500">
                    *This field is required*
                  </span>
                )}
              </div>

              <div className="mt-5">
                <span>Password</span>
                <br></br>
                <input
                  type="password"
                  placeholder="enter your password"
                  className="px-2 py-2 rounded-md  border outline-none w-80 "
                  {...register("password", { required: true })}
                ></input>
                <br></br>

                {errors.password && (
                  <span className="text-sm text-red-500">
                    *This field is required*
                  </span>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button className="bg-pink-500 text-white rounded-md px-3 py-1 cursor-pointer hover:bg-pink-800 duration-200 hover:scale-105">
                  SignUp
                </button>
                <p>
                  Already Account?{" "}
                  <button
                    className="underline text-blue-400 cursor-pointer
   hover:text-blue-800 hover:scale-105"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                  <Login></Login>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUP;

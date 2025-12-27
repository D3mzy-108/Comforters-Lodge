import React from "react";

function Form() {
  return (
    <div className="hero text-epsilon h-fit pb-10 lg:px-40">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <div className="text-center flex flex-col justify-between h-full items-center lg:text-center w-full">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 text-wrap w-[60%]">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-[rgba(0,0,0,0)] w-full max-w-sm shrink-0">
          <div className="card-body border border-beta rounded-2xl text-beta overflow-clip shadow-xl">
            <fieldset className="fieldset gap-4">
              <label className="label ">Email</label>
              <input
                type="email"
                className="input bg-gray-200 w-full"
                placeholder="Email"
              />
              <label className="label ">Password</label>
              <input
                type="password"
                className="input bg-gray-200 w-full"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover ">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4 ">Login</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;

//

import React from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-6 rounded-xl shadow space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Your Message"
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button className="btn bg-pink-500 text-white w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

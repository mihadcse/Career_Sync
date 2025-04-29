import { useEffect, useState } from "react";

const About = () => {
  const teamMembers = [
    {
      name: "Syed Huzzatullah Mihad",
      role: "Section 2(B), CSE",
      image: "/images/Mihad.png",
      bio: "ID: 210041218",
    },
    {
      name: "Zawad Bin Shoukat (Tasin)",
      role: "Section 2(A), CSE",
      image: "/images/Tasin.png",
      bio: "ID: 210041257",
    },
  ];

  return (
    <div className="pt-16 bg-black/30 min-h-screen">
      <div className="text-white py-16 text-center">
        <h1 className="text-4xl font-bold text-cyan-400">About Us</h1>
        <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
          We're a passionate duo of developers who built this platform to bridge
          the gap between job seekers and employers. Our mission is to make job
          hunting easy, transparent, and accessible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 px-8 pb-16">
        {/* bg-opacity-10 p-6 rounded-lg shadow-xl shadow-cyan-500 text-center text-white" */}
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-black/40 text-white p-6 rounded-xl shadow-lg border border-cyan-500 text-center shadow-xl shadow-cyan-500"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400"
            />
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="text-cyan-300 text-sm">{member.role}</p>
            <p className="text-gray-300 mt-3">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

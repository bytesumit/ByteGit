// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./navbar.css";

// // const Navbar = () => {
// //   return (
// //     <nav>
// //       <Link to="/">
// //         <div>
// //           <img
// //             src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
// //             alt="byteGit Logo"
// //           />
// //           <h3>byteGit</h3>
// //         </div>
// //       </Link>
// //       <div>
// //         <Link to="/create">
// //           <p>Create a Repository</p>
// //         </Link>
// //         <Link to="/profile">
// //           <p>Profile</p>
// //         </Link>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// // my updated code 

// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
//       <Link to="/" className="navbar-brand d-flex align-items-center">
//         <img
//           src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
//           alt="byteGit Logo"
//           width="40"
//           height="40"
//           className="me-2"
//         />
//         <h3 className="mb-0 text-light">byteGit</h3>
//       </Link>

//       <div className="d-flex">
//         <Link to="/create" className="nav-link text-light me-3">
//           Create a Repository
//         </Link>
//         <Link to="/profile" className="nav-link text-light">
//           Profile
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ProfilePage from "./user/ProfilePage";

const Navbar = () => {
  
   const [search , setSearch] = useState("");
   const [userData,setUserData] = useState(null);
   const searchSubmit = async (e)=>{
    e.preventDefault();
      const {data} = await axios.get(`http://localhost:8000/userProfile/name/${search}`);
      setUserData(data);
      console.log(data);
      
   }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      {/* Logo and Brand Name */}
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
          alt="byteGit Logo"
          width="40"
          height="40"
          className="me-2"
        />
        <h3 className="mb-0 text-light">byteGit</h3>
      </Link>

      {/* Search Bar */}
      <form className="d-flex me-3" onSubmit={searchSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Seacrh by username"
          aria-label="Search"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <div className="d-flex">
        <Link to="/create" className="nav-link text-light me-3">
          Create a Repository
        </Link>
        <Link to="/profile" className="nav-link text-light">
          Profile
        </Link>
      </div>
    </nav>
  );
  
};

export default Navbar;

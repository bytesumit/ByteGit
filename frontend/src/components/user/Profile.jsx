// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./profile.css";
// import Navbar from "../Navbar";
// import { UnderlineNav } from "@primer/react";
// import { BookIcon, RepoIcon } from "@primer/octicons-react";
// import HeatMapProfile from "./HeatMap";
// import { useAuth } from "../../authContext";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState({ username: "username" });
//   const { setCurrentUser } = useAuth();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const userId = localStorage.getItem("userId");
//       console.log(userId);

//       if (userId) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/userProfile/${userId}`
//           );
//           setUserDetails(response.data);
//         } catch (err) {
//           console.error("Cannot fetch user details: ", err);
//         }
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <UnderlineNav aria-label="Repository">
//         <UnderlineNav.Item
//           aria-current="page"
//           icon={BookIcon}
//           sx={{
//             backgroundColor: "transparent",
//             color: "white",
//             "&:hover": {
//               textDecoration: "underline",
//               color: "white",
//             },
//           }}
//         >
//           Overview
//         </UnderlineNav.Item>

//         <UnderlineNav.Item
//           onClick={() => navigate("/repo")}
//           icon={RepoIcon}
//           sx={{
//             backgroundColor: "transparent",
//             color: "whitesmoke",
//             "&:hover": {
//               textDecoration: "underline",
//               color: "white",
//             },
//           }}
//         >
//           Starred Repositories
//         </UnderlineNav.Item>
//       </UnderlineNav>

//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           localStorage.removeItem("userId");
//           setCurrentUser(null);

//           window.location.href = "/auth";
//         }}
//         style={{ position: "fixed", bottom: "50px", right: "50px" }}
//         id="logout"
//       >
//         Logout
//       </button>

//       <div className="profile-page-wrapper">
//         <div className="user-profile-section">
//           <div className="profile-image"></div>

//           <div className="name">
//             <h3>{userDetails.username}</h3>
//           </div>

//           <button className="follow-btn">Follow</button>

//           <div className="follower">
//             <p>10 Follower</p>
//             <p>3 Following</p>
//           </div>
//         </div>

//         <div className="heat-map-section">
//           <HeatMapProfile />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

// my updated code.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import Footer from "../Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/userProfile/${userId}`
          );
          console.log(response);
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-md-3 text-center bg-light p-3 rounded shadow">
            <div className="profile-image bg-secondary rounded-circle mx-auto" style={{ width: "120px", height: "120px" }}></div>
            <h3 className="mt-3">{userDetails.username}</h3>
            <button className="btn btn-primary btn-sm mt-2">Follow</button>
            <div className="mt-3">
              <p><strong>10</strong> Followers</p>
              <p><strong>3</strong> Following</p>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-md-9">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button className="nav-link active" onClick={() => navigate("/")}>Overview</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/repo")}>Starred Repositories</button>
              </li>
            </ul>
            
            <div className="mt-4">
              <h5>{userDetails.username}</h5>
              <HeatMapProfile />
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);
          window.location.href = "/auth";
        }}
        className="btn btn-danger position-fixed bottom-0 end-0 m-3"
      >
        Logout
      </button>
        <div className="div">
     
        </div>
    </>
    
  );
};

export default Profile;

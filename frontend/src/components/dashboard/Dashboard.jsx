// import React, { useState, useEffect } from "react";
// import "./dashboard.css";
// import Navbar from "../Navbar";

// const Dashboard = () => {

//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/repo/user/67cc0fecfc7fbb9c70fa6fc9`
//         );
//         const data = await response.json();
//         // console.log("fetch repo," ,data)
//         setRepositories(data.repositories);
//       } catch (err) {
//         console.error("Error while fecthing repositories: ", err);
//       }
//     };

//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/repo/all`);
//         const data = await response.json();
//         // console.log("fetcgsuggest ,",data);
//         setSuggestedRepositories(data);
//       } catch (err) {
//         console.error("Error while fecthing repositories: ", err);
//       }
//     };

//     fetchRepositories();
//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if (searchQuery == "") {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter((repo) =>
//         repo.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <>
//     <Navbar />
//   <section id="dashboard">
//       <aside>
//       <h3>Suggested Repositories</h3>
//           {suggestedRepositories.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//       </aside>
//       <main>
//       <div id="search">
//             <input
//               type="text"
//               value={searchQuery}
//               placeholder="Search..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//       <h3>your Repositories</h3>
//           {searchResults.map((repo) => {
//             return (
//               <div key={repo._id}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })}
//       </main>
//       <aside>
//       <h3>Upcoming Events</h3>
//           <ul>
//             <li>
//               <p>Tech Conference - Dec 15</p>
//             </li>
//             <li>
//               <p>Developer Meetup - Dec 25</p>
//             </li>
//             <li>
//               <p>React Summit - Jan 5</p>
//             </li>
//           </ul>
//       </aside>
//       </section>
//       </>
//   )
// }

// export default Dashboard;


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage!");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/repo/user/${userId}`
        );
        const data = await response.json();
        console.log(data);
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:8000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    < >
      <Navbar />
      <div className="container-fluid mt-4" style={{ backgroundColor: "#0c1116", minHeight: "100vh" }}>
        <div className="row">
          {/* Suggested Repositories */}
          <aside className="col-md-3">
            <h5 className="mb-3">Suggested Repositories</h5>
            <ul className="list-group">
              {suggestedRepositories.map((repo) => (
                <li key={repo._id} className="list-group-item">
                  <h6 className="mb-1">{repo.name}</h6>
                  <p className="text-muted small">{repo.description}</p>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="col-md-6">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={searchQuery}
                placeholder="Search repositories..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <h5>{searchResults.length != 0 ?"Your Repositories" : "You don't have any reposistories yet"}</h5>
            <div className="list-group">
              {searchResults.map((repo) => (
                <div key={repo._id} className="list-group-item">
                  <h6 className="mb-1">{repo.name}</h6>
                  <p className="text-muted small">{repo.description}</p>
                </div>
              ))}
            </div>
          </main>

          {/* Upcoming Events */}
          <aside className="col-md-3">
            <h5 className="mb-3">Upcoming Events</h5>
            <ul className="list-group">
              <li className="list-group-item">Tech Conference - Dec 15</li>
              <li className="list-group-item">Developer Meetup - Dec 25</li>
              <li className="list-group-item">React Summit - Jan 5</li>
            </ul>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

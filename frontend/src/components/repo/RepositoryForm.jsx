import React, { useState } from "react";
import Navbar from "../Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CreateRepository = () => {
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!repoName || repoName.trim() === "") {
      alert("Repository name cannot be empty!");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/repo/create", {
        name: repoName,
        description: description,
        content: [], // Provide an empty array or sample content
        visibility: visibility === "public" ? true : false, // Convert to Boolean
        owner: userId, // Pass the authenticated user ID
      });

      alert("Repository created successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Error creating repository!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <div className="card p-4 shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
          <h3 className="mb-3">Create a new repository</h3>
          <form onSubmit={handleSubmit}>
            {/* Repository Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Repository Name</label>
              <input
                type="text"
                className="form-control"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bold">Description (optional)</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Visibility */}
            <div className="mb-3">
              <label className="form-label fw-bold">Visibility</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={() => setVisibility("public")}
                />
                <label className="form-check-label">Public</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={() => setVisibility("private")}
                />
                <label className="form-check-label">Private</label>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100">
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRepository;

import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Modal } from 'react-bootstrap';

const ProfilePage = ({data}) => {
  // Sample user data (replace with actual API call)
  const [userData, setUserData] = useState({
    username: 'SumitGupta',
    email: 'sumit@example.com',
    avatarUrl: 'https://via.placeholder.com/100', // Default avatar
    repositories: [
      { id: 1, name: 'ConnectHub', description: 'Zoom clone using MERN', stars: 120 },
      { id: 2, name: 'Wanderlust', description: 'Airbnb clone using Node.js', stars: 85 },
    ],
    followedUsers: [
      { id: 1, username: 'shivam28', avatarUrl: 'https://via.placeholder.com/50' },
      { id: 2, username: 'johnDoe', avatarUrl: 'https://via.placeholder.com/50' },
    ],
    starredRepos: [
      { id: 1, name: 'React Guide', description: 'Complete guide to React', stars: 200 },
      { id: 2, name: 'Node.js Best Practices', description: 'Learn Node.js efficiently', stars: 150 },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);

  // Filter data based on search term
  const filteredRepos = userData.repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFollowedUsers = userData.followedUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStarredRepos = userData.starredRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal Handlers
  const handleShowModal = (repo) => setSelectedRepo(repo);
  const handleCloseModal = () => setSelectedRepo(null);

  // Handle Unfollow
  const handleUnfollow = (id) => {
    setUserData((prev) => ({
      ...prev,
      followedUsers: prev.followedUsers.filter((user) => user.id !== id),
    }));
  };

  return (
    <div className="container mt-4">
      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search repositories, followed users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ✅ Profile Header */}
      <Card className="mb-4 p-3 shadow">
        <div className="d-flex align-items-center">
          <img
            src={userData.avatarUrl}
            alt="Avatar"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            <h3 className="mb-1">{userData.username}</h3>
            <p className="text-muted">{userData.email}</p>
          </div>
        </div>
      </Card>

      <div className="row">
        {/* ✅ Repositories Section */}
        <div className="col-md-6 mb-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Repositories</Card.Title>
              <ListGroup className="overflow-auto" style={{ maxHeight: '300px' }}>
                {filteredRepos.length ? (
                  filteredRepos.map((repo) => (
                    <ListGroup.Item key={repo.id} className="d-flex justify-content-between">
                      <div>
                        <h6>{repo.name}</h6>
                        <p className="text-muted">{repo.description || 'No description'}</p>
                      </div>
                      <div>
                        <span className="badge bg-primary me-2">{repo.stars} ⭐</span>
                        <Button size="sm" onClick={() => handleShowModal(repo)}>View</Button>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <p className="text-center">No repositories found.</p>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>

        {/* ✅ Followed Users Section */}
        <div className="col-md-6 mb-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Followed Users</Card.Title>
              <ListGroup className="overflow-auto" style={{ maxHeight: '300px' }}>
                {filteredFollowedUsers.length ? (
                  filteredFollowedUsers.map((user) => (
                    <ListGroup.Item key={user.id} className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img src={user.avatarUrl} alt={user.username} className="rounded-circle me-2" width="40" />
                        <span>{user.username}</span>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleUnfollow(user.id)}
                      >
                        Unfollow
                      </Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <p className="text-center">No followed users.</p>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* ✅ Starred Repositories Section */}
      <Card className="shadow mb-4">
        <Card.Body>
          <Card.Title>Starred Repositories</Card.Title>
          <div className="row">
            {filteredStarredRepos.length ? (
              filteredStarredRepos.map((repo) => (
                <div key={repo.id} className="col-md-6 mb-3">
                  <Card>
                    <Card.Body>
                      <h6>{repo.name}</h6>
                      <p className="text-muted">{repo.description || 'No description'}</p>
                      <div>
                        <span className="badge bg-primary me-2">{repo.stars} ⭐</span>
                        <Button size="sm" onClick={() => handleShowModal(repo)}>View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No starred repositories.</p>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* ✅ Modal for Detailed View */}
      <Modal show={!!selectedRepo} onHide={handleCloseModal}>
        {selectedRepo && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRepo.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedRepo.description || 'No description available.'}</p>
              <p><strong>Stars:</strong> {selectedRepo.stars} ⭐</p>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProfilePage;

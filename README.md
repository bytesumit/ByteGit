# ByteGit 🔁📁  
**GitHub Clone with Git-Like Command Functionality**

ByteGit is a powerful clone of GitHub that replicates the core functionality of version control through Git-like commands. Built with the **MERN** stack and **AWS S3** for file storage, ByteGit allows users to initialize repositories, push and pull code, view commit histories, and revert files — all within a secure and intuitive web interface.

---

## 🚀 Key Features

- 💾 **Git Command Emulation**
  - Initialize repositories (`init`)
  - Stage, commit, push, and pull files
  - Maintain commit history with metadata

- ☁️ **AWS S3 Integration**
  - Secure file storage using AWS S3 buckets
  - Versioned file management
  - Rollbacks and historical version access

- 📂 **Project Repository Management**
  - Create, view, and manage repositories
  - Repository overview and file explorer

- 🔐 **User Authentication**
  - JWT-based secure login & registration
  - bcryptjs for password hashing
  - Role-based access to repositories

- ⚙️ **Real Git-Like Experience**
  - Simulated Git commands through frontend UI
  - Backend logic mimicking Git version tracking and diffing

- 📈 **Commit Logs and File Diffs**
  - View commit messages and timestamps
  - Compare file changes over time

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap or Tailwind (optional)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- AWS SDK (S3 integration)
- JWT & bcryptjs (Auth)

---


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB running locally or Atlas
- AWS S3 Bucket with credentials

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/bytegit.git
   cd bytegit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name


#Install Backend Dependencies


cd backend
npm install
npm start

#Install Frontend Dependencies

cd ../frontend
npm install
npm start


---




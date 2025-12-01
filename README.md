PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_super_secret_key_here


🛠️ Software Installation
Step 1: Install Node.js
Why: Node.js is required to run JavaScript on the server and use npm (Node Package Manager)
Download & Install:

Go to: https://nodejs.org/
Download the LTS version (Long Term Support) - recommended for most users
Run the downloaded .msi file
During installation:

✅ Accept the license agreement
✅ Keep the default installation path (usually C:\Program Files\nodejs\)
✅ IMPORTANT: Check "Automatically install the necessary tools" checkbox
✅ Click "Install"


Wait for installation to complete (2-5 minutes)
RESTART YOUR COMPUTER (Very Important!)

Verify Installation:

Press Win + R, type cmd, press Enter
Run these commands:

cmdnode --version
Expected output: v18.17.0 (or similar)
cmdnpm --version
Expected output: 9.6.7 (or similar)
✅ If you see version numbers, Node.js is installed correctly!
❌ If you see "not recognized" error:

Node.js is not in your PATH
Restart your computer again
If still not working, reinstall Node.js


Step 2: Install MongoDB Community Edition
Why: MongoDB is the database where all your books and user data will be stored
Download:

Go to: https://www.mongodb.com/try/download/community
Select:

Version: 7.0.x (latest stable)
Platform: Windows
Package: msi


Click Download
File size is about 300-400MB, so wait for download to complete

Install:

Locate the downloaded file (usually in Downloads folder)
Right-click on the .msi file → Select "Run as administrator"
Click "Yes" when Windows asks for permission
Follow the installation wizard:

Click "Next"
Accept license → "Next"
Choose "Complete" installation type → "Next"
CRITICAL: On "Service Configuration" screen:

✅ Check "Install MongoDB as a Service"
✅ Keep "Service Name" as MongoDB
✅ Keep "Run service as Network Service user" selected
✅ Keep all default settings
Click "Next"


OPTIONAL: Check "Install MongoDB Compass" (GUI tool for viewing database)
Click "Next" → "Install"
Wait 5-10 minutes for installation
Click "Finish"



Verify MongoDB Installation:
Method 1: Check Windows Services

Press Win + R
Type services.msc and press Enter
Scroll down to find "MongoDB Server"
Check the "Status" column:

✅ If it says "Running" → MongoDB is working!
❌ If blank → Right-click on "MongoDB Server" → Click "Start"



Method 2: Test via Command Line

Open Command Prompt (press Win + R, type cmd, press Enter)
Type:

cmdmongosh
```

Expected output:
```
Current Mongosh Log ID: 65abc123def...
Connecting to: mongodb://127.0.0.1:27017
Using MongoDB: 7.0.4
Using Mongosh: 2.1.0

test>

Type exit to quit the MongoDB shell

✅ If you see this, MongoDB is installed correctly!
❌ If you see "mongosh is not recognized":

MongoDB shell might not be in PATH
Try restarting your computer
Or use the full path: "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"

Starting MongoDB Service (if needed):
If MongoDB is not running:

Open Command Prompt as Administrator:

Press Win key
Type cmd
Right-click on "Command Prompt"
Select "Run as administrator"
Click "Yes"


Run:

cmdnet start MongoDB
```

Expected output:
```
The MongoDB Server (MongoDB) service is starting.
The MongoDB Server (MongoDB) service was started successfully.
```

Or:
```
The requested service has already been started.
```

Both are good! ✅

---

## 📦 Project Setup

### Step 1: Extract Project Files

1. Locate `bookstore_mongodb-main.zip` on your computer
2. **Right-click** on the zip file
3. Select **"Extract All..."**
4. Choose a location (e.g., `C:\Users\YourName\Desktop\`)
5. Click **"Extract"**

**Result:** You should have a folder structure like:
```
C:\Users\YourName\Desktop\bookstore_mongodb-main\
├── backend\
└── frontend\

# 📚 Bookstore MERN Application

A full-stack bookstore with React, Node.js, Express, and MongoDB. Features user authentication and book catalog.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4+)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookstore-mern.git
cd bookstore-mern
```

2. **Setup Backend**
```bash
cd backend
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install --save-dev nodemon
```

3. **Create .env file in backend folder**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_secret_key_change_in_production
```

4. **Seed Database**
```bash
node seedBooks.js
```

5. **Setup Frontend** (open new terminal)
```bash
cd frontend
npm install
npm install react-router-dom axios
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Access:** http://localhost:3000

## 📝 Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_secret_key
```

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcryptjs

## 📂 Project Structure
```
bookstore-mern/
├── backend/
│   ├── config/         # DB config
│   ├── models/         # User, Book models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   ├── .env           # Environment variables (create this!)
│   ├── server.js      # Entry point
│   └── seedBooks.js   # Database seeding
└── frontend/
    ├── src/
    │   ├── App.js     # Main component
    │   └── App.css    # Styles
    └── public/
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get single book |
| POST | `/api/books` | Create book (auth required) |

## 🐛 Troubleshooting

### MongoDB not running
```bash
# Windows (as Administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port already in use
```bash
# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### .env file not loading
- Ensure file is named exactly `.env` (not `.env.txt`)
- Must be in `backend` folder
- No quotes around values

### Dependencies not installed
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## ✅ Verify Installation

1. **Backend:** http://localhost:5000 should return `{"message":"Bookstore API is running"}`
2. **Books API:** http://localhost:5000/api/books should return JSON with books
3. **Frontend:** http://localhost:3000 should show bookstore homepage

## 📖 Usage

1. **Register:** Create account at `/register`
2. **Login:** Login at `/login`
3. **Browse:** View books at `/catalogue`
4. **Search:** Use search bar to find books

## 🔐 Security Notes

- Change `JWT_SECRET` before production
- Use MongoDB Atlas for production
- Never commit `.env` file

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 📄 License

MIT License

Step 3: Check backend is accessible

Open new browser tab
Go to: http://localhost:5000/api/books
Should show JSON with books
If this doesn't work, backend is the problem (check PowerShell window 1)




https://claude.ai/share/8550f732-4628-49d1-b03e-c8f3d223cadb

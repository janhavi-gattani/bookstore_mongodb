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

Step 2: Backend Setup
2.1 Open PowerShell
Recommended: Use PowerShell (better than Command Prompt)

Press Win + X
Select "Windows PowerShell" or "Windows Terminal"

Alternative: Use Command Prompt

Press Win + R, type cmd, press Enter


2.2 Navigate to Backend Folder
Replace YourName with your actual Windows username!
powershellcd C:\Users\YourName\Desktop\bookstore_mongodb-main\backend
Example:
powershellcd C:\Users\Janhavi\Desktop\bookstore_mongodb-main\backend
Or use Tab for auto-complete:
powershellcd C:\Users\<press Tab>\Desktop\bookstore<press Tab>\backend
Verify you're in the correct folder:
powershelldir
```

You should see these files:
```
server.js
package.json
seedBooks.js
config/
models/
routes/
middleware/
❌ If you see "path not found":

Check the folder path is correct
Or use File Explorer: Hold Shift + Right-click on backend folder → "Open PowerShell window here"


2.3 Install Backend Dependencies
IMPORTANT: Run these commands ONE BY ONE, wait for each to complete before running the next!
Command 1: Install main dependencies
powershellnpm install express mongoose cors bcryptjs jsonwebtoken dotenv
```

**What this does:**
- `express` - Web server framework
- `mongoose` - MongoDB connection and data modeling
- `cors` - Allows frontend to talk to backend
- `bcryptjs` - Password encryption
- `jsonwebtoken` - User authentication (JWT tokens)
- `dotenv` - Loads environment variables from .env file

**Wait time:** 2-5 minutes

**Expected output:**
```
added 127 packages, and audited 128 packages in 2m

26 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
✅ Success!

Command 2: Install development dependency
powershellnpm install --save-dev nodemon
```

**What this does:**
- `nodemon` - Automatically restarts server when you make code changes (development tool)

**Expected output:**
```
added 3 packages, and audited 130 packages in 10s

found 0 vulnerabilities
✅ Success!

Verify Installation:
powershellnpm list --depth=0
```

Expected output should include:
```
backend@1.0.0
├── bcryptjs@2.4.3
├── cors@2.8.5
├── dotenv@16.0.3
├── express@4.18.2
├── jsonwebtoken@9.0.0
├── mongoose@7.0.3
└── nodemon@3.0.1

Common Installation Errors:
Error: "npm ERR! network"

Solution: Check your internet connection, try again

Error: "EACCES: permission denied"

Solution: Run PowerShell as Administrator

Press Win + X → Select "Windows PowerShell (Admin)"
Run the commands again



Error: "gyp ERR! stack Error: not found: python"

Solution: This warning is usually okay, continue anyway
If it causes problems: Install Python from python.org, then run npm install again


2.4 Create .env File (CRITICAL!)
Why: This file stores sensitive configuration like database URL and secret keys. It's NOT included in the zip file for security reasons. You MUST create it manually.
What happens if you skip this: Backend will fail to start with "undefined" errors!

Method 1: Create using PowerShell (RECOMMENDED - Copy & Paste)
Copy this ENTIRE BLOCK and paste into PowerShell, then press Enter:
powershell@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=my_super_secret_key_12345_change_this_in_production
"@ | Out-File -FilePath .env -Encoding UTF8
What each line means:

PORT=5000 - Backend will run on port 5000
MONGODB_URI=... - Connection string to MongoDB database
JWT_SECRET=... - Secret key for encrypting user tokens (change this in production!)


Method 2: Create using Notepad

In PowerShell, type:

powershellnotepad .env
```

2. Notepad will open and ask: **"Cannot find the .env file. Do you want to create a new file?"**
3. Click **"Yes"**

4. **Copy and paste EXACTLY this** (no extra spaces!):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=my_super_secret_key_12345_change_this_in_production

Click File → Save
IMPORTANT: In "Save as type" dropdown, select "All Files (.)"
Make sure filename is exactly .env (with the dot at the beginning)
Click Save
Close Notepad


Verify .env File Was Created Correctly:
powershellGet-Content .env
```

**Expected output:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=my_super_secret_key_12345_change_this_in_production
✅ Perfect!

❌ Common .env Problems:
Problem: "Get-Content : Cannot find path"

Solution: File wasn't created. Use Method 1 (PowerShell) above

Problem: File shows as ".env.txt" in File Explorer

Solution: Windows added .txt extension
Fix:

powershellRename-Item -Path .env.txt -NewName .env
Problem: You see weird characters (�) or file is empty

Solution: Wrong encoding. Delete and recreate:

powershellRemove-Item .env
# Then use Method 1 again
Problem: File has extra spaces or quotes

Solution: Delete and use Method 1 (PowerShell) - it creates it perfectly


2.5 Seed Database with Sample Books
Why: This adds 10 sample books to your database so you have something to display
powershellnode seedBooks.js
```

**Expected output:**
```
🔄 Connecting to MongoDB...
MongoDB Connected Successfully
🗑️  Clearing existing books...
   Deleted 0 existing books
📚 Adding new books...
   Successfully inserted 10 books

✅ Database seeding completed!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Total books in database: 10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 Books added:
   1. To Kill a Mockingbird by Harper Lee - $12.99
   2. 1984 by George Orwell - $14.99
   3. The Great Gatsby by F. Scott Fitzgerald - $10.99
   4. Pride and Prejudice by Jane Austen - $11.99
   5. The Hobbit by J.R.R. Tolkien - $13.99
   6. Harry Potter and the Sorcerer's Stone by J.K. Rowling - $15.99
   7. The Catcher in the Rye by J.D. Salinger - $10.99
   8. The Lord of the Rings by J.R.R. Tolkien - $24.99
   9. Jane Eyre by Charlotte Brontë - $12.49
   10. Brave New World by Aldous Huxley - $13.49
✅ If you see this, your database is ready!

❌ Common Seeding Errors:
Error: "Cannot connect to MongoDB" or "MongooseServerSelectionError"

Problem: MongoDB is not running
Solution:

Open Command Prompt as Administrator
Run: net start MongoDB
Try node seedBooks.js again



Error: "The uri parameter to openUri() must be a string, got 'undefined'"

Problem: .env file is missing or not loaded
Solution:

Verify .env exists: Get-Content .env
If not found, go back to Step 2.4 and create it
Make sure you're in the backend folder: cd backend



Error: "Cannot find module './models/Book'"

Problem: Project files are incomplete
Solution: Re-extract the zip file and start over


2.6 Test Backend Server
powershellnpm run dev
```

**Expected output:**
```
> backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
Server running on port 5000
MongoDB Connected Successfully
✅ Perfect! Backend is running!
🔥 KEEP THIS POWERSHELL WINDOW OPEN! Don't close it!

Test in Browser:
While the server is running, open any web browser:

Go to: http://localhost:5000

Expected: {"message":"Bookstore API is running"}


Go to: http://localhost:5000/api/books

Expected: JSON array with all 10 books



✅ If you see data, your backend is working perfectly!

To stop the server: Press Ctrl + C in PowerShell
To restart: Type npm run dev again

Step 3: Frontend Setup
3.1 Open a NEW PowerShell Window
⚠️ IMPORTANT: Don't close the backend window! Open a SECOND PowerShell window!
How to open second PowerShell:

Press Win + X
Select "Windows PowerShell" again
You now have TWO PowerShell windows open


3.2 Navigate to Frontend Folder
In the NEW (second) PowerShell window:
powershellcd C:\Users\YourName\Desktop\bookstore_mongodb-main\frontend
Replace YourName with your actual Windows username!
Example:
powershellcd C:\Users\Janhavi\Desktop\bookstore_mongodb-main\frontend
Verify you're in the correct folder:
powershelldir
```

You should see:
```
public\
src\
package.json
README.md

3.3 Install Frontend Dependencies
⚠️ This step takes the longest! 5-10 minutes depending on internet speed
Command 1: Install all base dependencies
powershellnpm install
```

**What this does:**
- Installs React and all its dependencies (~1400+ packages)

**Wait time:** 5-10 minutes

**You'll see lots of text scrolling - this is normal!**

**Expected output:**
```
added 1432 packages, and audited 1433 packages in 5m

232 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
✅ Success!

Command 2: Install React Router and Axios
powershellnpm install react-router-dom axios
```

**What this does:**
- `react-router-dom` - For page navigation (Home, Login, Register, Catalogue)
- `axios` - For making HTTP requests to backend

**Expected output:**
```
added 7 packages, and audited 1440 packages in 15s

found 0 vulnerabilities
✅ Success!

Verify Installation:
powershellnpm list react react-dom react-router-dom axios
```

**Expected output:**
```
frontend@0.1.0
├── axios@1.6.2
├── react@18.2.0
├── react-dom@18.2.0
└── react-router-dom@6.20.1
✅ All packages installed correctly!

❌ Common Frontend Installation Errors:
Error: "ERESOLVE unable to resolve dependency tree"

Problem: Version conflicts between packages
Solution:

powershellnpm install --legacy-peer-deps
npm install react-router-dom axios --legacy-peer-deps
Error: "npm ERR! code ENOENT"

Problem: You're not in the frontend folder
Solution: Run dir to check current location, navigate to frontend folder

Error: "EACCES: permission denied"

Solution: Run PowerShell as Administrator

Error: Installation gets stuck at "idealTree:..."

Solution: Wait patiently (can take 5-10 minutes) or:

powershellnpm cache clean --force
npm install

🚀 Running the Application
You need TWO PowerShell windows open simultaneously!
PowerShell Window 1: Backend Server
If you closed it, reopen and run:
powershellcd C:\Users\YourName\Desktop\bookstore_mongodb-main\backend
npm run dev
```

**Expected output:**
```
Server running on port 5000
MongoDB Connected Successfully
✅ KEEP THIS WINDOW OPEN!

PowerShell Window 2: Frontend Server
powershellcd C:\Users\YourName\Desktop\bookstore_mongodb-main\frontend
npm start
```

**Wait 30-90 seconds for compilation...**

**Expected output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

**Your default browser should automatically open to http://localhost:3000**

**✅ KEEP THIS WINDOW OPEN TOO!**

---

**⚠️ If port 3000 is already in use:**

You'll see:
```
? Something is already running on port 3000.

Would you like to run the app on another port instead? › (Y/n)
```

**Type `Y` and press Enter.** It will use port 3001 instead.

---

## 🎉 Using the Bookstore Application

### What You Should See

**Browser opens automatically showing:**
```
┌──────────────────────────────────────────────────┐
│  📚 BookStore    [Home] [Catalogue] [Login] [Register]  │
├──────────────────────────────────────────────────┤
│                                                  │
│           Welcome to BookStore                   │
│    Discover your next favorite book             │
│         from our extensive collection            │
│                                                  │
│         [Browse Catalogue] Button                │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │    📖    │  │    🚚    │  │    💰    │      │
│  │   Vast   │  │   Fast   │  │   Best   │      │
│  │Collection│  │ Delivery │  │  Prices  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└──────────────────────────────────────────────────┘
```

---

### Test 1: Register a New User

1. Click **"Register"** in the top navigation bar
2. Fill in the form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** password123 (at least 6 characters)
   - **Confirm Password:** password123
3. Click **"Register"** button
4. **Expected:** You're automatically logged in and redirected to **Catalogue** page

**✅ If you see the catalogue with books, registration worked!**

---

### Test 2: View Books Catalogue

After registration (or click "Catalogue" in navbar):

**You should see 10 books displayed in a grid:**
- To Kill a Mockingbird - $12.99
- 1984 - $14.99
- The Great Gatsby - $10.99
- Pride and Prejudice - $11.99
- The Hobbit - $13.99
- Harry Potter and the Sorcerer's Stone - $15.99
- The Catcher in the Rye - $10.99
- The Lord of the Rings - $24.99
- Jane Eyre - $12.49
- Brave New World - $13.49

Each book shows:
- Cover image
- Title
- Author name
- Description
- Price
- "Add to Cart" button

---

### Test 3: Search for Books

1. Look for the search bar at the top of the Catalogue page
2. Type: **"1984"**
3. **Expected:** Only "1984" by George Orwell appears
4. Clear the search
5. **Expected:** All 10 books reappear

---

### Test 4: Logout and Login

1. Click **"Logout"** in the top right corner (next to "Hello, Test User")
2. **Expected:** You're logged out, navbar shows "Login" and "Register" again
3. Click **"Login"**
4. Enter:
   - **Email:** test@example.com
   - **Password:** password123
5. Click **"Login"**
6. **Expected:** You're logged in, navbar shows "Hello, Test User" and "Logout"

---

## ✅ Complete Success Checklist

**Your setup is 100% complete if ALL of these are true:**

- [ ] ✅ Node.js installed - `node --version` shows version number
- [ ] ✅ npm installed - `npm --version` shows version number
- [ ] ✅ MongoDB installed and running - `mongosh` connects successfully
- [ ] ✅ Backend dependencies installed - `backend/node_modules/` folder exists
- [ ] ✅ `.env` file created in backend folder
- [ ] ✅ Database seeded - `node seedBooks.js` completed successfully
- [ ] ✅ Backend server running - Shows "Server running on port 5000"
- [ ] ✅ Frontend dependencies installed - `frontend/node_modules/` folder exists
- [ ] ✅ Frontend server running - Shows "webpack compiled successfully"
- [ ] ✅ Browser opens to http://localhost:3000
- [ ] ✅ Bookstore homepage displays correctly
- [ ] ✅ Can navigate to different pages (Home, Catalogue, Login, Register)
- [ ] ✅ Can register a new user
- [ ] ✅ After registration, redirected to Catalogue
- [ ] ✅ Can see 10 books in the catalogue
- [ ] ✅ Can search for books
- [ ] ✅ Can logout and login
- [ ] ✅ http://localhost:5000/api/books shows JSON data with books

**If all checked: 🎊 CONGRATULATIONS! Your bookstore is fully functional!**

---

## 🐛 Troubleshooting Guide

### Error 1: "node is not recognized"

**Symptom:** When you type `node --version`, you see:
```
'node' is not recognized as an internal or external command
```

**Cause:** Node.js not installed or not in system PATH

**Solution:**
1. Uninstall Node.js:
   - Press `Win + X` → **"Apps and Features"**
   - Find **Node.js** → Click → **"Uninstall"**
2. **Restart computer**
3. Download fresh installer from https://nodejs.org/
4. Reinstall Node.js (check "Add to PATH" during installation)
5. **Restart computer again**
6. Open new PowerShell and test: `node --version`

---

### Error 2: "MongoDB connection error" or "MongooseServerSelectionError"

**Symptom:** When running `node seedBooks.js` or `npm run dev`:
```
MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
Cause: MongoDB service is not running
Solution A: Start via Services

Press Win + R
Type services.msc and press Enter
Scroll to "MongoDB Server"
If Status is blank: Right-click → "Start"
If Status shows "Running": MongoDB is already running, problem is elsewhere

Solution B: Start via Command Line

Open Command Prompt as Administrator:

Press Win key
Type cmd
Right-click "Command Prompt"
Select "Run as administrator"
Click "Yes"


Run:

cmdnet start MongoDB
```

Expected:
```
The MongoDB Server (MongoDB) service was started successfully.
Solution C: Check if MongoDB is installed
cmdmongosh
```
If this gives "not recognized", MongoDB is not installed. Go back to Software Installation → Step 2.

---

### Error 3: "System error 5 has occurred. Access is denied" (MongoDB)

**Symptom:** When running `net start MongoDB`:
```
System error 5 has occurred.
Access is denied.
```

**Cause:** Need administrator privileges

**Solution:**
1. Close current Command Prompt
2. Press `Win` key
3. Type `cmd`
4. **Right-click** on "Command Prompt"
5. Select **"Run as administrator"**
6. Click **"Yes"** when asked
7. Run: `net start MongoDB`

---

### Error 4: ".env file not loading" - Shows "env (0) from .env"

**Symptom:** When running `node seedBooks.js`:
```
[dotenv@17.2.3] injecting env (0) from .env
The (0) means zero variables loaded!
Cause: .env file doesn't exist or is in wrong format
Solution:
powershell# Navigate to backend folder
cd C:\Users\YourName\Desktop\bookstore_mongodb-main\backend

# Delete any existing .env file
Remove-Item .env -ErrorAction SilentlyContinue

# Create new .env with correct format
@"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=my_super_secret_key_12345_change_this_in_production
"@ | Out-File -FilePath .env -Encoding UTF8

# Verify it was created correctly
Get-Content .env
```

**Expected output:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=my_super_secret_key_12345_change_this_in_production
Now try again:
powershellnode seedBooks.js
Should show: injecting env (3) from .env ← Notice (3) not (0)!

Error 5: ".env.txt" instead of ".env"
Symptom: File Explorer shows .env.txt instead of .env
Cause: Windows adds .txt extension automatically
Solution:
powershell# Rename the file
Rename-Item -Path .env.txt -NewName .env

# Verify
Get-Content .env
```

---

### Error 6: "Port 5000 is already in use"

**Symptom:** When running `npm run dev`:
```
Error: listen EADDRINUSE: address already in use :::5000
Cause: Another program is using port 5000
Solution A: Find and kill the process
powershell# Find what's using port 5000
Get-NetTCPConnection -LocalPort 5000

# You'll see something like:
# LocalPort  RemotePort  State       OwningProcess
# 5000       0           Listen      12345

# Kill that process (replace 12345 with actual PID)
Stop-Process -Id 12345 -Force
Solution B: Change the port

Open .env file:

powershellnotepad .env
```

2. Change first line to:
```
PORT=5001
```

3. Save and close
4. Restart backend: `npm run dev`
5. Backend now runs on port 5001
6. Test: http://localhost:5001/api/books

---

### Error 7: "Port 3000 is already in use"

**Symptom:** When running `npm start` in frontend:
```
? Something is already running on port 3000.

Would you like to run the app on another port instead? › (Y/n)
Solution A: Use another port (easiest)

Type Y and press Enter
Frontend will run on port 3001
Browser opens to http://localhost:3001

Solution B: Kill the process
powershell# Find and kill process on port 3000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

# Then run npm start again
npm start

Error 8: Website shows blank white page
Symptom: Browser opens but shows completely blank white page
Solution:
Step 1: Check browser console

Press F12 (opens Developer Tools)
Click "Console" tab
Look for red error messages
Common errors and fixes:

"Failed to fetch" → Backend is not running (check PowerShell window 1)
"Network Error" → Wrong API URL (check frontend/src/App.js line ~8)
"Unexpected token <" → Build issue, try hard refresh (Ctrl+Shift+R)



Step 2: Hard refresh the page

Press Ctrl + Shift + R (Windows)
Or Ctrl + F5
This clears cache and reloads everything

Step 3: Check backend is accessible

Open new browser tab
Go to: http://localhost:5000/api/books
Should show JSON with books
If this doesn't work, backend is the problem (check PowerShell window 1)

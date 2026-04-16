# 🏏 IPL Auction 2026 — Real-time Multiplayer

A real-time multiplayer IPL auction simulator with 60 IPL 2026 players, live bidding, and squad building.

## How to Play
1. One person creates a room → gets a code
2. Share the code with friends
3. Everyone joins from their device
4. Host starts the auction
5. Bid on players — 15 second timer per player
6. Manage your ₹1000L budget wisely!

---

## 🚀 Deploy to Railway (Free Hosting — ~10 minutes)

### Step 1: Create a GitHub account (if you don't have one)
Go to https://github.com and sign up for free.

### Step 2: Create a new GitHub repository
1. Click the **+** button top right → **New repository**
2. Name it `ipl-auction`
3. Set it to **Public**
4. Click **Create repository**

### Step 3: Upload the files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL files from this folder:
   - `server.js`
   - `package.json`
   - The `public/` folder (with `index.html` inside)
3. Click **Commit changes**

> **Important**: Make sure the `public` folder is uploaded with `index.html` inside it, not just the file alone.

### Step 4: Deploy on Railway
1. Go to https://railway.app
2. Sign in with your GitHub account
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your `ipl-auction` repository
5. Railway will auto-detect it's a Node.js app and deploy!
6. Wait ~2 minutes for deployment

### Step 5: Get your URL
1. Click on your deployed project
2. Go to **Settings** → **Networking** → **Generate Domain**
3. You'll get a URL like `ipl-auction.up.railway.app`
4. **Share this link with your friends!**

---

## 🎮 Game Rules
- Each team starts with **₹1000 Lakhs** budget
- Players have base prices from ₹75L to ₹200L
- **15 second timer** per player — bid before time runs out!
- Highest bid wins the player
- Click any team name to see their current squad
- You can't bid on a player if you're already the highest bidder

## Player Pool (60 players)
Includes all major IPL 2026 stars:
- Virat Kohli, Rohit Sharma, Jasprit Bumrah, Hardik Pandya
- Rashid Khan, Cameron Green, Matheesha Pathirana
- Rishabh Pant, MS Dhoni, Yashasvi Jaiswal
- ...and 50 more!

---

## Run Locally (for testing)
```
npm install
npm start
```
Then open http://localhost:3000

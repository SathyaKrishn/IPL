const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, 'public')));

// ─── REAL IPL 2026 PLAYER POOL ───────────────────────────────────────────────
// Base prices in Lakhs. isOverseas flag for flight icon.
// Sets match real IPL auction order: Marquee → Capped Batters → Capped WK →
// Capped All-Rounders → Capped Fast Bowlers → Capped Spinners →
// Uncapped Batters → Uncapped WK → Uncapped All-Rounders →
// Uncapped Fast Bowlers → Uncapped Spinners

const PLAYER_SETS = [
  {
    setName: "Marquee Players",
    setCode: "MQ",
    players: [
      { name: "Virat Kohli",        role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Rohit Sharma",        role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Jasprit Bumrah",      role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Hardik Pandya",       role: "All-Rounder", country: "India",       basePrice: 200, isOverseas: false },
      { name: "Ravindra Jadeja",     role: "All-Rounder", country: "India",       basePrice: 200, isOverseas: false },
      { name: "Rishabh Pant",        role: "WK-Batter",   country: "India",       basePrice: 200, isOverseas: false },
      { name: "MS Dhoni",            role: "WK-Batter",   country: "India",       basePrice: 200, isOverseas: false },
      { name: "Shubman Gill",        role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Rashid Khan",         role: "Bowler",      country: "Afghanistan", basePrice: 200, isOverseas: true  },
      { name: "Cameron Green",       role: "All-Rounder", country: "Australia",   basePrice: 200, isOverseas: true  },
      { name: "Sunil Narine",        role: "All-Rounder", country: "West Indies", basePrice: 200, isOverseas: true  },
      { name: "Jos Buttler",         role: "WK-Batter",   country: "England",     basePrice: 200, isOverseas: true  },
    ]
  },
  {
    setName: "Capped Batters — Set 1",
    setCode: "CB1",
    players: [
      { name: "Yashasvi Jaiswal",    role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Ruturaj Gaikwad",     role: "Batter",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "Suryakumar Yadav",    role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Tilak Varma",         role: "Batter",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "KL Rahul",            role: "WK-Batter",   country: "India",       basePrice: 200, isOverseas: false },
      { name: "Shreyas Iyer",        role: "Batter",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Sanju Samson",        role: "WK-Batter",   country: "India",       basePrice: 200, isOverseas: false },
      { name: "Riyan Parag",         role: "All-Rounder", country: "India",       basePrice: 150, isOverseas: false },
    ]
  },
  {
    setName: "Capped Batters — Set 2",
    setCode: "CB2",
    players: [
      { name: "Prithvi Shaw",        role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Sarfaraz Khan",       role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Rinku Singh",         role: "Batter",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "Shivam Dube",         role: "All-Rounder", country: "India",       basePrice: 150, isOverseas: false },
      { name: "Nitish Rana",         role: "Batter",      country: "India",       basePrice: 100, isOverseas: false },
      { name: "Manish Pandey",       role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Ajinkya Rahane",      role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
    ]
  },
  {
    setName: "Overseas Batters",
    setCode: "OB1",
    players: [
      { name: "David Miller",        role: "Batter",      country: "South Africa",basePrice: 100, isOverseas: true  },
      { name: "Aiden Markram",       role: "Batter",      country: "South Africa",basePrice: 150, isOverseas: true  },
      { name: "Finn Allen",          role: "Batter",      country: "New Zealand", basePrice: 100, isOverseas: true  },
      { name: "Pathum Nissanka",     role: "Batter",      country: "Sri Lanka",   basePrice: 75,  isOverseas: true  },
      { name: "Rovman Powell",       role: "Batter",      country: "West Indies", basePrice: 75,  isOverseas: true  },
      { name: "Tristan Stubbs",      role: "Batter",      country: "South Africa",basePrice: 75,  isOverseas: true  },
      { name: "Glenn Phillips",      role: "Batter",      country: "New Zealand", basePrice: 75,  isOverseas: true  },
      { name: "Tom Banton",          role: "WK-Batter",   country: "England",     basePrice: 75,  isOverseas: true  },
      { name: "Lhuan-Dre Pretorius", role: "Batter",      country: "South Africa",basePrice: 75,  isOverseas: true  },
    ]
  },
  {
    setName: "Capped Wicketkeepers",
    setCode: "CWK",
    players: [
      { name: "Dhruv Jurel",         role: "WK-Batter",   country: "India",       basePrice: 100, isOverseas: false },
      { name: "Ishan Kishan",        role: "WK-Batter",   country: "India",       basePrice: 150, isOverseas: false },
      { name: "Quinton de Kock",     role: "WK-Batter",   country: "South Africa",basePrice: 100, isOverseas: true  },
      { name: "Nicholas Pooran",     role: "WK-Batter",   country: "West Indies", basePrice: 150, isOverseas: true  },
      { name: "Josh Inglis",         role: "WK-Batter",   country: "Australia",   basePrice: 75,  isOverseas: true  },
      { name: "Tim Seifert",         role: "WK-Batter",   country: "New Zealand", basePrice: 75,  isOverseas: true  },
    ]
  },
  {
    setName: "Capped All-Rounders — Indian",
    setCode: "CAR1",
    players: [
      { name: "Axar Patel",          role: "All-Rounder", country: "India",       basePrice: 200, isOverseas: false },
      { name: "Washington Sundar",   role: "All-Rounder", country: "India",       basePrice: 150, isOverseas: false },
      { name: "Shardul Thakur",      role: "All-Rounder", country: "India",       basePrice: 100, isOverseas: false },
      { name: "Rahul Tewatia",       role: "All-Rounder", country: "India",       basePrice: 100, isOverseas: false },
      { name: "Shahbaz Ahmed",       role: "All-Rounder", country: "India",       basePrice: 100, isOverseas: false },
      { name: "Abdul Samad",         role: "All-Rounder", country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Nitish Kumar Reddy",  role: "All-Rounder", country: "India",       basePrice: 150, isOverseas: false },
    ]
  },
  {
    setName: "Capped All-Rounders — Overseas",
    setCode: "CAR2",
    players: [
      { name: "Mitchell Marsh",      role: "All-Rounder", country: "Australia",   basePrice: 200, isOverseas: true  },
      { name: "Marcus Stoinis",      role: "All-Rounder", country: "Australia",   basePrice: 150, isOverseas: true  },
      { name: "Rachin Ravindra",     role: "All-Rounder", country: "New Zealand", basePrice: 150, isOverseas: true  },
      { name: "Wanindu Hasaranga",   role: "All-Rounder", country: "Sri Lanka",   basePrice: 150, isOverseas: true  },
      { name: "Marco Jansen",        role: "All-Rounder", country: "South Africa",basePrice: 150, isOverseas: true  },
      { name: "Will Jacks",          role: "All-Rounder", country: "England",     basePrice: 100, isOverseas: true  },
      { name: "Mitchell Santner",    role: "All-Rounder", country: "New Zealand", basePrice: 100, isOverseas: true  },
      { name: "Jason Holder",        role: "All-Rounder", country: "West Indies", basePrice: 100, isOverseas: true  },
      { name: "Dasun Shanaka",       role: "All-Rounder", country: "Sri Lanka",   basePrice: 75,  isOverseas: true  },
      { name: "Azmatullah Omarzai",  role: "All-Rounder", country: "Afghanistan", basePrice: 100, isOverseas: true  },
    ]
  },
  {
    setName: "Capped Fast Bowlers — Indian",
    setCode: "CFB1",
    players: [
      { name: "Mohammed Shami",      role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Arshdeep Singh",      role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Mohammed Siraj",      role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Mayank Yadav",        role: "Bowler",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "Prasidh Krishna",     role: "Bowler",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "Deepak Chahar",       role: "Bowler",      country: "India",       basePrice: 100, isOverseas: false },
      { name: "T. Natarajan",        role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Khaleel Ahmed",       role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Avesh Khan",          role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Mukesh Kumar",        role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
    ]
  },
  {
    setName: "Capped Fast Bowlers — Overseas",
    setCode: "CFB2",
    players: [
      { name: "Kagiso Rabada",       role: "Bowler",      country: "South Africa",basePrice: 200, isOverseas: true  },
      { name: "Trent Boult",         role: "Bowler",      country: "New Zealand", basePrice: 200, isOverseas: true  },
      { name: "Mitchell Starc",      role: "Bowler",      country: "Australia",   basePrice: 200, isOverseas: true  },
      { name: "Matheesha Pathirana", role: "Bowler",      country: "Sri Lanka",   basePrice: 200, isOverseas: true  },
      { name: "Anrich Nortje",       role: "Bowler",      country: "South Africa",basePrice: 150, isOverseas: true  },
      { name: "Lockie Ferguson",     role: "Bowler",      country: "New Zealand", basePrice: 100, isOverseas: true  },
      { name: "Kyle Jamieson",       role: "Bowler",      country: "New Zealand", basePrice: 100, isOverseas: true  },
      { name: "Blessing Muzarabani", role: "Bowler",      country: "Zimbabwe",    basePrice: 75,  isOverseas: true  },
      { name: "Dushmantha Chameera", role: "Bowler",      country: "Sri Lanka",   basePrice: 75,  isOverseas: true  },
      { name: "Lungisani Ngidi",     role: "Bowler",      country: "South Africa",basePrice: 75,  isOverseas: true  },
    ]
  },
  {
    setName: "Capped Spinners",
    setCode: "CS1",
    players: [
      { name: "Kuldeep Yadav",       role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Yuzvendra Chahal",    role: "Bowler",      country: "India",       basePrice: 200, isOverseas: false },
      { name: "Varun Chakravarthy",  role: "Bowler",      country: "India",       basePrice: 150, isOverseas: false },
      { name: "Axar Patel",          role: "All-Rounder", country: "India",       basePrice: 150, isOverseas: false },
      { name: "Rahul Chahar",        role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Shreyas Gopal",       role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Noor Ahmad",          role: "Bowler",      country: "Afghanistan", basePrice: 150, isOverseas: true  },
      { name: "Allah Ghazanfar",     role: "Bowler",      country: "Afghanistan", basePrice: 75,  isOverseas: true  },
      { name: "Akeal Hosein",        role: "Bowler",      country: "West Indies", basePrice: 75,  isOverseas: true  },
    ]
  },
  {
    setName: "Uncapped Batters",
    setCode: "UB1",
    players: [
      { name: "Ayush Mhatre",        role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Vaibhav Suryavanshi", role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Musheer Khan",        role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Priyansh Arya",       role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Sai Sudharsan",       role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Shashank Singh",      role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Nehal Wadhera",       role: "Batter",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Sahil Parakh",        role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Himmat Singh",        role: "Batter",      country: "India",       basePrice: 30,  isOverseas: false },
    ]
  },
  {
    setName: "Uncapped Wicketkeepers",
    setCode: "UWK",
    players: [
      { name: "Dhruv Jurel",         role: "WK-Batter",   country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Abishek Porel",       role: "WK-Batter",   country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Anuj Rawat",          role: "WK-Batter",   country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Urvil Patel",         role: "WK-Batter",   country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Robin Minz",          role: "WK-Batter",   country: "India",       basePrice: 30,  isOverseas: false },
    ]
  },
  {
    setName: "Uncapped All-Rounders",
    setCode: "UAR",
    players: [
      { name: "Prashant Veer",       role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Ramakrishna Ghosh",   role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Arshin Kulkarni",     role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Suryansh Shedge",     role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Nishant Sindhu",      role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Vipraj Nigam",        role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Ajay Mandal",         role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Cooper Connolly",     role: "All-Rounder", country: "Australia",   basePrice: 30,  isOverseas: true  },
      { name: "Mitch Owen",          role: "All-Rounder", country: "Australia",   basePrice: 30,  isOverseas: true  },
    ]
  },
  {
    setName: "Uncapped Fast Bowlers",
    setCode: "UFB",
    players: [
      { name: "Anshul Kamboj",       role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Gurjapneet Singh",     role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Digvesh Singh",        role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Yash Thakur",         role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Vyshak Vijaykumar",   role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Xavier Bartlett",     role: "Bowler",      country: "Australia",   basePrice: 30,  isOverseas: true  },
      { name: "Ben Dwarshuis",       role: "Bowler",      country: "Australia",   basePrice: 30,  isOverseas: true  },
      { name: "Luke Wood",           role: "Bowler",      country: "England",     basePrice: 30,  isOverseas: true  },
      { name: "Zak Foulkes",         role: "Bowler",      country: "England",     basePrice: 30,  isOverseas: true  },
      { name: "Auqib Nabi",          role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
    ]
  },
  {
    setName: "Uncapped Spinners",
    setCode: "USP",
    players: [
      { name: "Kartik Sharma",       role: "All-Rounder", country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Manav Suthar",        role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
      { name: "Sai Kishore",         role: "Bowler",      country: "India",       basePrice: 75,  isOverseas: false },
      { name: "Tanveer Sangha",      role: "Bowler",      country: "Australia",   basePrice: 30,  isOverseas: true  },
      { name: "M. Siddharth",        role: "Bowler",      country: "India",       basePrice: 30,  isOverseas: false },
    ]
  },
];

// Flatten players with set info
function buildPlayerList() {
  const players = [];
  PLAYER_SETS.forEach(set => {
    set.players.forEach(p => {
      players.push({ ...p, setName: set.setName, setCode: set.setCode });
    });
  });
  return players;
}

// Real IPL bid increment rules
function getIncrement(currentBid) {
  // amounts in Lakhs. 1 Cr = 100L
  if (currentBid < 100)  return 5;   // up to 1 Cr: +5L
  if (currentBid < 200)  return 10;  // 1–2 Cr: +10L
  if (currentBid < 500)  return 20;  // 2–5 Cr: +20L
  return 25;                          // above 5 Cr: +25L
}

// Get available bid options for a player given current bid
function getBidOptions(currentBid, basePrice) {
  const inc = getIncrement(currentBid);
  const options = [];
  if (currentBid === 0) options.push({ label: `Base ₹${basePrice}L`, amount: basePrice });
  const steps = [1, 2, 3, 5, 10];
  steps.forEach(s => {
    const amt = currentBid + (inc * s);
    if (amt <= 12500) options.push({ label: `+₹${inc * s}L → ₹${amt}L`, amount: amt });
  });
  return options;
}

const rooms = {};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function createRoom() {
  const code = generateCode();
  const allPlayers = buildPlayerList();
  rooms[code] = {
    code,
    host: null,
    teams: [],
    players: allPlayers, // in set order, not shuffled
    currentPlayerIndex: 0,
    currentBid: 0,
    currentBidder: null,
    auctionStarted: false,
    auctionEnded: false,
    bidTimer: null,
    timeLeft: 15,
    status: 'waiting',
    log: [],
    // Accelerated round
    acceleratedMode: false,
    unsoldPlayers: [],     // players that went unsold in main round
    acceleratedQueue: [],  // subset chosen for accelerated round
    acceleratedIndex: 0,
  };
  return code;
}

function broadcastRoom(code) {
  const room = rooms[code];
  if (!room) return;
  const { bidTimer, ...safe } = room;
  io.to(code).emit('room_update', safe);
}

function startBidTimer(code) {
  const room = rooms[code];
  if (!room) return;
  clearInterval(room.bidTimer);
  room.timeLeft = 15;
  room.bidTimer = setInterval(() => {
    room.timeLeft--;
    io.to(code).emit('timer', room.timeLeft);
    if (room.timeLeft <= 0) { clearInterval(room.bidTimer); soldPlayer(code); }
  }, 1000);
}

function soldPlayer(code) {
  const room = rooms[code];
  if (!room) return;
  clearInterval(room.bidTimer);

  let player;
  if (room.acceleratedMode) {
    player = room.acceleratedQueue[room.acceleratedIndex];
  } else {
    player = room.players[room.currentPlayerIndex];
  }

  if (room.currentBidder) {
    const team = room.teams.find(t => t.id === room.currentBidder);
    if (team) {
      team.squad.push({ ...player, soldPrice: room.currentBid });
      team.budget -= room.currentBid;
      if (player.isOverseas) team.overseasCount = (team.overseasCount||0) + 1;
      room.log.unshift(`🏏 ${player.name} SOLD to ${team.teamName} for ₹${formatCr(room.currentBid)}`);
      team.budget -= room.currentBid;
      room.log.unshift(`🏏 ${player.name} SOLD to ${team.teamName} for ₹${formatCr(room.currentBid)}`);
    }
  } else {
    if (!room.acceleratedMode) room.unsoldPlayers.push({ ...player });
    room.log.unshift(`❌ ${player.name} went UNSOLD`);
  }

  room.currentBid = 0;
  room.currentBidder = null;

  if (room.acceleratedMode) {
    room.acceleratedIndex++;
    if (room.acceleratedIndex >= room.acceleratedQueue.length) {
      room.status = 'ended';
      room.auctionEnded = true;
    } else {
      room.status = 'waiting_accel';
    }
  } else {
    room.currentPlayerIndex++;
    if (room.currentPlayerIndex >= room.players.length) {
      // Main auction done — go to accelerated if unsold exist
      if (room.unsoldPlayers.length > 0) {
        room.status = 'accel_lobby';
      } else {
        room.status = 'ended';
        room.auctionEnded = true;
      }
    } else {
      room.status = 'waiting';
    }
  }

  broadcastRoom(code);
}

function formatCr(lakhs) {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(2)}Cr`;
  return `₹${lakhs}L`;
}

io.on('connection', (socket) => {
  socket.on('create_room', ({ playerName, teamName }) => {
    const code = createRoom();
    const room = rooms[code];
    const team = { id: socket.id, playerName, teamName, budget: 12500, squad: [], isHost: true, overseasCount: 0 };
    room.teams.push(team);
    room.host = socket.id;
    socket.join(code);
    socket.data.roomCode = code;
    socket.emit('joined', { code, teamId: socket.id });
    broadcastRoom(code);
  });

  socket.on('join_room', ({ code, playerName, teamName }) => {
    const room = rooms[code];
    if (!room) return socket.emit('err', 'Room not found');
    if (room.auctionStarted) return socket.emit('err', 'Auction already started');
    if (room.teams.length >= 8) return socket.emit('err', 'Room full (max 8 teams)');
    const team = { id: socket.id, playerName, teamName, budget: 12500, squad: [], isHost: false, overseasCount: 0 };
    room.teams.push(team);
    socket.join(code);
    socket.data.roomCode = code;
    socket.emit('joined', { code, teamId: socket.id });
    broadcastRoom(code);
  });

  socket.on('start_auction', () => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    if (room.teams.length < 2) return socket.emit('err', 'Need at least 2 teams');
    room.auctionStarted = true;
    room.status = 'bidding';
    room.currentBid = room.players[0].basePrice;
    startBidTimer(code);
    broadcastRoom(code);
  });

  socket.on('next_player', () => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    if (room.status === 'bidding' || room.status === 'waiting_accel_bid') return;
    if (room.acceleratedMode) {
      room.status = 'waiting_accel_bid';
      const player = room.acceleratedQueue[room.acceleratedIndex];
      room.currentBid = player.basePrice;
      room.currentBidder = null;
      startBidTimer(code);
      room.status = 'bidding';
    } else {
      room.status = 'bidding';
      room.currentBid = room.players[room.currentPlayerIndex].basePrice;
      room.currentBidder = null;
      startBidTimer(code);
    }
    broadcastRoom(code);
  });

  // Host starts accelerated round by nominating unsold players
  socket.on('start_accelerated', ({ nominated }) => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    // nominated is array of player indices from unsoldPlayers
    room.acceleratedQueue = nominated.map(i => room.unsoldPlayers[i]);
    room.acceleratedMode = true;
    room.acceleratedIndex = 0;
    room.status = 'bidding';
    const player = room.acceleratedQueue[0];
    room.currentBid = player.basePrice;
    room.currentBidder = null;
    room.log.unshift(`🔁 Accelerated round started with ${room.acceleratedQueue.length} players`);
    startBidTimer(code);
    broadcastRoom(code);
  });

  socket.on('skip_accelerated', () => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;
    room.status = 'ended';
    room.auctionEnded = true;
    broadcastRoom(code);
  });

  socket.on('place_bid', ({ amount }) => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room || !room.auctionStarted || room.status !== 'bidding') return;
    const team = room.teams.find(t => t.id === socket.id);
    if (!team) return;

    // Validate amount is a legal next bid
    const minNext = room.currentBid === 0
      ? (room.acceleratedMode ? room.acceleratedQueue[room.acceleratedIndex].basePrice : room.players[room.currentPlayerIndex].basePrice)
      : room.currentBid + getIncrement(room.currentBid);

    if (amount < minNext) return socket.emit('err', `Minimum next bid is ₹${minNext}L`);
    if (amount > team.budget) return socket.emit('err', 'Not enough budget!');

    // Overseas limit: max 8
    const player = room.acceleratedMode
      ? room.acceleratedQueue[room.acceleratedIndex]
      : room.players[room.currentPlayerIndex];

    room.currentBid = amount;
    room.currentBidder = socket.id;
    room.log.unshift(`💰 ${team.teamName} bid ${formatCr(amount)} for ${player.name}`);

    clearInterval(room.bidTimer);
    room.timeLeft = 15;
    startBidTimer(code);
    broadcastRoom(code);
  });

  socket.on('disconnect', () => {
    const code = socket.data.roomCode;
    const room = rooms[code];
    if (!room) return;
    room.teams = room.teams.filter(t => t.id !== socket.id);
    if (room.teams.length === 0) { clearInterval(room.bidTimer); delete rooms[code]; }
    else broadcastRoom(code);
  });
});

// Also expose bid options calculator to client via event
io.on('connection', (socket) => {
  socket.on('get_bid_options', ({ currentBid, basePrice }) => {
    socket.emit('bid_options', getBidOptions(currentBid, basePrice));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`IPL Auction 2026 running on port ${PORT}`));

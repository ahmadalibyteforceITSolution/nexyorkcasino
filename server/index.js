import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'nexyork_secret_777';

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ahmedalihafeez25_db_user:%40Sublime12345@cluster0.oe0inne.mongodb.net/newyorkcasiino?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0.00 },
  cryptoBalance: { type: Number, default: 0.00 },
  tokens: { type: Number, default: 0 }, // New Tokens field
  bets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }],
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

const betSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  match: String,
  selection: String,
  odds: Number,
  stake: Number,
  status: { type: String, enum: ['pending', 'win', 'loss'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit', 'withdrawal', 'bonus'] },
  amount: Number,
  method: String,
  status: { type: String, default: 'completed' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Bet = mongoose.model('Bet', betSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, balance: user.balance, cryptoBalance: user.cryptoBalance } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid Credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid Credentials' });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, balance: user.balance, cryptoBalance: user.cryptoBalance, tokens: user.tokens } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'No account found with this email' });
    
    // In a real app, send a real email here.
    res.json({ message: 'Password reset link sent to ' + email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/buy-tokens', authenticate, async (req, res) => {
  try {
    const { amount, tokens } = req.body; // amount is USD paid to the bank
    const user = await User.findById(req.user.id);
    
    // Simulate taking money from their card to the bank
    user.tokens = (user.tokens || 0) + tokens;
    
    const trans = new Transaction({ userId: user._id, type: 'deposit', amount, method: 'bank_transfer_for_tokens' });
    await trans.save();
    user.transactions.push(trans._id);
    await user.save();
    
    res.json({ tokens: user.tokens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/book-vip', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const COST = 50;
    
    if (user.tokens < COST) {
      return res.status(400).json({ error: 'Insufficient Tokens. You need 50 tokens to book a VIP table.' });
    }
    
    user.tokens -= COST;
    await user.save();
    
    res.json({ message: 'VIP Table Booked Successfully!', tokens: user.tokens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/deposit', authenticate, async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = await User.findById(req.user.id);
    user.balance += parseFloat(amount);
    
    const trans = new Transaction({ userId: user._id, type: 'deposit', amount, method });
    await trans.save();
    user.transactions.push(trans._id);
    await user.save();
    
    emitBalanceUpdate(user._id, user.balance);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/withdraw', authenticate, async (req, res) => {
  try {
    const { amount, method } = req.body;
    const user = await User.findById(req.user.id);
    const withdrawAmount = parseFloat(amount);
    
    if (user.balance < withdrawAmount) {
      return res.status(400).json({ error: 'Insufficient Balance for Withdrawal' });
    }
    
    user.balance -= withdrawAmount;
    
    const trans = new Transaction({ userId: user._id, type: 'withdrawal', amount: -withdrawAmount, method });
    await trans.save();
    user.transactions.push(trans._id);
    await user.save();
    
    emitBalanceUpdate(user._id, user.balance);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/claim-bonus', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.balance += 100;
    
    const trans = new Transaction({ userId: user._id, type: 'deposit', amount: 100, method: 'vip_bonus' });
    await trans.save();
    user.transactions.push(trans._id);
    await user.save();
    
    emitBalanceUpdate(user._id, user.balance);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/my-bets', authenticate, async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/transfer', authenticate, async (req, res) => {
  try {
    const { amount, recipientUsername } = req.body;
    const sender = await User.findById(req.user.id);
    const transferAmount = parseFloat(amount);
    
    if (sender.balance < transferAmount) {
      return res.status(400).json({ error: 'Insufficient Balance for Transfer' });
    }
    if (transferAmount <= 0) {
      return res.status(400).json({ error: 'Invalid transfer amount' });
    }
    
    const recipient = await User.findOne({ username: recipientUsername });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient user not found' });
    }
    if (recipient._id.toString() === sender._id.toString()) {
      return res.status(400).json({ error: 'Cannot transfer to yourself' });
    }
    
    // Deduct from sender
    sender.balance -= transferAmount;
    const senderTrans = new Transaction({ userId: sender._id, type: 'withdrawal', amount: -transferAmount, method: `Transfer to ${recipientUsername}` });
    await senderTrans.save();
    sender.transactions.push(senderTrans._id);
    await sender.save();
    
    // Add to recipient
    recipient.balance += transferAmount;
    const recipientTrans = new Transaction({ userId: recipient._id, type: 'deposit', amount: transferAmount, method: `Transfer from ${sender.username}` });
    await recipientTrans.save();
    recipient.transactions.push(recipientTrans._id);
    await recipient.save();
    
    // Emit real-time updates
    emitBalanceUpdate(sender._id, sender.balance);
    emitBalanceUpdate(recipient._id, recipient.balance);
    
    res.json({ balance: sender.balance, message: 'Transfer successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/place-bet', authenticate, async (req, res) => {
  try {
    const { match, selection, odds, stake } = req.body;
    const user = await User.findById(req.user.id);
    if (user.balance < stake) return res.status(400).json({ error: 'Insufficient Balance' });
    
    user.balance -= stake;
    const bet = new Bet({ userId: user._id, match, selection, odds, stake });
    await bet.save();
    user.bets.push(bet._id);
    await user.save();
    
    emitBalanceUpdate(user._id, user.balance);
    res.json({ balance: user.balance, bet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// P2P Challenges Storage
const p2pChallenges = {};

app.post('/api/challenge', authenticate, async (req, res) => {
  try {
    const { targetUsername, amount } = req.body;
    const wager = parseFloat(amount);
    if (wager <= 0) return res.status(400).json({ error: 'Invalid wager' });
    
    const challenger = await User.findById(req.user.id);
    if (challenger.balance < wager) return res.status(400).json({ error: 'Insufficient balance to challenge' });
    
    const target = await User.findOne({ username: targetUsername });
    if (!target) return res.status(404).json({ error: 'User not found' });
    if (target._id.toString() === challenger._id.toString()) return res.status(400).json({ error: 'Cannot challenge yourself' });

    const challengeId = Date.now().toString();
    p2pChallenges[challengeId] = {
      id: challengeId,
      challenger: challenger.username,
      challengerId: challenger._id,
      target: target.username,
      targetId: target._id,
      amount: wager,
      status: 'pending'
    };

    io.emit('newChallenge', p2pChallenges[challengeId]);
    res.json({ message: 'Challenge Sent!', challengeId });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/accept-challenge', authenticate, async (req, res) => {
  try {
    const { challengeId } = req.body;
    const challenge = p2pChallenges[challengeId];
    if (!challenge || challenge.status !== 'pending') return res.status(400).json({ error: 'Challenge expired or invalid' });
    
    const target = await User.findById(req.user.id);
    if (target.username !== challenge.target) return res.status(403).json({ error: 'Not your challenge' });
    if (target.balance < challenge.amount) return res.status(400).json({ error: 'Insufficient balance to accept' });
    
    const challenger = await User.findById(challenge.challengerId);
    if (challenger.balance < challenge.amount) {
       challenge.status = 'cancelled';
       io.emit('challengeUpdate', challenge);
       return res.status(400).json({ error: 'Challenger no longer has funds' });
    }

    // Resolve 50/50 Match
    const challengerWins = Math.random() > 0.5;
    const winner = challengerWins ? challenger : target;
    const loser = challengerWins ? target : challenger;

    winner.balance += challenge.amount;
    loser.balance -= challenge.amount;

    await winner.save();
    await loser.save();

    emitBalanceUpdate(winner._id, winner.balance);
    emitBalanceUpdate(loser._id, loser.balance);

    challenge.status = 'resolved';
    challenge.winner = winner.username;
    
    // Broadcast Match Result to Everyone
    io.emit('challengeUpdate', challenge);
    io.emit('newMessage', {
      id: Date.now(),
      user: 'SYSTEM',
      text: `⚔️ MATCH OVER: ${winner.username} won $${challenge.amount * 2} against ${loser.username}!`,
      time: new Date().toLocaleTimeString()
    });

    res.json({ message: 'Match resolved!', winner: winner.username });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Live Match Data (Synchronized via Sockets)
let liveMatches = [
  // Sports
  { id: 1, league: 'NBA (USA)', time: "Q4 02:45", home: "NY Knicks", homeEmoji: "🏀", homeScore: 102, away: "LA Lakers", awayEmoji: "🏀", awayScore: 98, odds: { home: "1.45", draw: "-", away: "2.80" } },
  { id: 2, league: 'EPL (UK)', time: "88'", home: "Man City", homeEmoji: "⚽", homeScore: 2, away: "Liverpool", awayEmoji: "⚽", awayScore: 2, odds: { home: "2.10", draw: "1.90", away: "3.50" } },
  { id: 3, league: 'LIGUE 1 (FRANCE)', time: "65'", home: "PSG", homeEmoji: "⚽", homeScore: 3, away: "Marseille", awayEmoji: "⚽", awayScore: 1, odds: { home: "1.10", draw: "5.50", away: "12.00" } },
  { id: 4, league: 'ISRAEL PREMIER LEAGUE', time: "71'", home: "Maccabi Haifa", homeEmoji: "⚽", homeScore: 3, away: "Hapoel TA", awayEmoji: "⚽", awayScore: 1, odds: { home: "1.20", draw: "4.50", away: "8.00" } },
  { id: 5, league: 'AFC CHAMPIONS (ASIA)', time: "45'", home: "Al-Hilal", homeEmoji: "⚽", homeScore: 1, away: "Urawa Reds", awayEmoji: "⚽", awayScore: 0, odds: { home: "1.80", draw: "2.80", away: "3.20" } },
  { id: 6, league: 'IPL CRICKET (INDIA)', time: "18.4 Ov", home: "Mumbai", homeEmoji: "🏏", homeScore: "182/4", away: "CSK", awayEmoji: "🏏", awayScore: "165/6", odds: { home: "1.55", draw: "-", away: "2.40" } },
  // E-Sports & Casino Simulations
  { id: 7, league: 'CS:GO MAJOR (GLOBAL)', time: "Rnd 15", home: "FaZe Clan", homeEmoji: "🎮", homeScore: 8, away: "NaVi", awayEmoji: "🎮", awayScore: 7, odds: { home: "1.90", draw: "-", away: "1.90" } },
  { id: 8, league: 'TEXAS HOLDEM (VIP ROOM)', time: "River", home: "Player 1 (AA)", homeEmoji: "🃏", homeScore: "All In", away: "Player 2 (KK)", awayEmoji: "🃏", awayScore: "Call", odds: { home: "1.10", draw: "-", away: "9.00" } },
  { id: 9, league: 'VIRTUAL RACING (UK)', time: "Lap 3/5", home: "Red Stallion", homeEmoji: "🏎️", homeScore: "1st", away: "Blue Bolt", awayEmoji: "🏎️", awayScore: "2nd", odds: { home: "2.50", draw: "-", away: "3.10" } }
];

// Map userId -> socket for real-time personal balance updates
const userSockets = {};
const onlineUsernames = {};

io.on('connection', (socket) => {
  socket.emit('initialMatches', liveMatches);
  
  // Register user's socket on login
  socket.on('registerUser', async (userStr) => {
    try {
      const userObj = JSON.parse(userStr);
      userSockets[userObj.id] = socket.id;
      onlineUsernames[userObj.id] = userObj.username;
      io.emit('onlineUsersUpdate', Object.values(onlineUsernames));
      io.emit('userCountUpdate', Object.keys(userSockets).length);
    } catch(e) {
      // old format support (just string ID)
      userSockets[userStr] = socket.id;
    }
  });
  
  socket.on('disconnect', () => {
    // Clean up on disconnect
    Object.keys(userSockets).forEach(uid => {
      if (userSockets[uid] === socket.id) {
        delete userSockets[uid];
        delete onlineUsernames[uid];
      }
    });
    io.emit('onlineUsersUpdate', Object.values(onlineUsernames));
    io.emit('userCountUpdate', Object.keys(userSockets).length);
  });
  
  socket.on('sendMessage', (data) => {
    io.emit('newMessage', { ...data, id: Date.now(), time: new Date().toLocaleTimeString() });
  });

  socket.on('placePublicBet', (data) => {
    io.emit('betBroadcast', { ...data, id: Date.now() });
  });
});

// Helper to emit balance to a specific user
const emitBalanceUpdate = (userId, balance) => {
  const socketId = userSockets[userId?.toString()];
  if (socketId) {
    io.to(socketId).emit('balanceUpdate', { balance });
  }
};


const globalGameTemplates = [
  { league: 'BUNDESLIGA (GERMANY)', home: 'Bayern', homeEmoji: '⚽', away: 'Dortmund', awayEmoji: '⚽', odds: { home: "1.40", draw: "4.20", away: "6.50" } },
  { league: 'SERIE A (ITALY)', home: 'Juventus', homeEmoji: '⚽', away: 'AC Milan', awayEmoji: '⚽', odds: { home: "2.10", draw: "3.10", away: "3.50" } },
  { league: 'UFC (GLOBAL)', home: 'McGregor', homeEmoji: '🥊', away: 'Chandler', awayEmoji: '🥊', odds: { home: "1.80", draw: "-", away: "2.10" } },
  { league: 'NFL (USA)', home: 'Chiefs', homeEmoji: '🏈', away: 'Eagles', awayEmoji: '🏈', odds: { home: "1.70", draw: "-", away: "2.30" } },
  { league: 'TENNIS WIMBLEDON', home: 'Alcaraz', homeEmoji: '🎾', away: 'Djokovic', awayEmoji: '🎾', odds: { home: "1.95", draw: "-", away: "1.85" } },
  { league: 'F1 MONACO', home: 'Verstappen', homeEmoji: '🏎️', away: 'Leclerc', awayEmoji: '🏎️', odds: { home: "1.30", draw: "-", away: "4.50" } },
  { league: 'DOTA 2 TI', home: 'Team Spirit', homeEmoji: '🎮', away: 'LGD Gaming', awayEmoji: '🎮', odds: { home: "1.60", draw: "-", away: "2.30" } },
  { league: 'BLACKJACK VIP', home: 'Dealer', homeEmoji: '🃏', away: 'Player (19)', awayEmoji: '🃏', odds: { home: "2.10", draw: "-", away: "1.80" } }
];

// Match Logic (Live Updates & Day-to-Day Game Rotation)
setInterval(() => {
  liveMatches = liveMatches.map(m => {
    // Occasionally update scores or states
    if (Math.random() > 0.6) {
      if (typeof m.homeScore === 'number') m.homeScore++;
      else if (typeof m.homeScore === 'string') {
        if (m.homeScore.includes('/')) {
          let [runs, wkts] = m.homeScore.split('/').map(Number);
          m.homeScore = `${runs + Math.floor(Math.random() * 6)}/${wkts}`;
        } else if (m.league.includes('POKER') || m.league.includes('HOLDEM')) {
          const actions = ['Raise $500', 'Call', 'Fold', 'All In', 'Check'];
          m.homeScore = actions[Math.floor(Math.random() * actions.length)];
          m.awayScore = actions[Math.floor(Math.random() * actions.length)];
        } else if (m.league.includes('RACING')) {
          const pos = ['1st', '2nd', '3rd', '4th', 'Pit Stop', 'Crash'];
          m.homeScore = pos[Math.floor(Math.random() * pos.length)];
          m.awayScore = pos[Math.floor(Math.random() * pos.length)];
        } else if (m.league.includes('BLACKJACK')) {
           const states = ['Hitting', 'Stand', 'Bust', 'Blackjack'];
           m.homeScore = states[Math.floor(Math.random() * states.length)];
           m.awayScore = states[Math.floor(Math.random() * states.length)];
        }
      }
    }
    
    // Live Odds Fluctuation
    if (Math.random() > 0.5) {
      m.odds.home = (parseFloat(m.odds.home) + (Math.random() * 0.2 - 0.1)).toFixed(2);
      if (m.odds.draw !== '-') m.odds.draw = (parseFloat(m.odds.draw) + (Math.random() * 0.2 - 0.1)).toFixed(2);
      m.odds.away = (parseFloat(m.odds.away) + (Math.random() * 0.2 - 0.1)).toFixed(2);
    }
    
    return m;
  });

  // Randomly rotate out a game for a new "day-to-day" event (10% chance per tick)
  if (Math.random() > 0.90) {
    const removeIdx = Math.floor(Math.random() * liveMatches.length);
    const newTemplate = globalGameTemplates[Math.floor(Math.random() * globalGameTemplates.length)];
    
    liveMatches[removeIdx] = {
      id: Date.now(),
      league: newTemplate.league,
      time: "LIVE",
      home: newTemplate.home,
      homeEmoji: newTemplate.homeEmoji,
      homeScore: newTemplate.league.includes('BLACKJACK') ? 'Dealing' : 0,
      away: newTemplate.away,
      awayEmoji: newTemplate.awayEmoji,
      awayScore: newTemplate.league.includes('BLACKJACK') ? 'Waiting' : 0,
      odds: { ...newTemplate.odds }
    };
  }

  io.emit('allMatchesUpdate', liveMatches);
}, 3000);

// Casino Roulette Spinner Logic
setInterval(() => {
  const number = Math.floor(Math.random() * 37); // 0-36
  io.emit('casinoUpdate', { number });
}, 10000);

app.post('/api/resolve-casino-win', authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    user.balance += amount;
    
    const trans = new Transaction({ userId: user._id, type: 'deposit', amount, method: 'casino_win' });
    await trans.save();
    user.transactions.push(trans._id);
    await user.save();
    
    emitBalanceUpdate(user._id, user.balance);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

server.listen(PORT, () => console.log(`🚀 Live Server on ${PORT}`));

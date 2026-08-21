import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Curated high-res Unsplash images across luxury, NYC, casino, sports, crypto, nightlife, romance
const curatedImages = [
  "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541278107931-e006523892df?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596838132731-dd93c850b046?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579226905180-636b76d96082?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
];

// Topic pillars
const pillars = [
  {
    category: "Crypto",
    subjects: [
      "Bitcoin New York Spot Liquidity", "Binance NYC Orderbook Arbitrage", "Ethereum Staking Yields in Manhattan",
      "BitLicense Compliance in NY State", "SAFU Cold Vault Multi-Sig Security", "Solana High-Frequency Trading NY",
      "Crypto Tax Strategies for NYC High-Rollers", "Decentralized Finance & Wall Street Bridges",
      "Institutional Bitcoin Custody Manhattan", "Zero-Knowledge Rollups on NexYork Exchange",
      "BNB Chain Liquidity Injections NYC", "Smart Contract Audits for NY Crypto Funds",
      "Layer 2 Scalability & Low-Fee Settlement", "Stablecoin Reserves & Real-Time Attestations",
      "Algorithmic Market Making in New York", "Cross-Chain Bridges & Liquidity Aggregation",
      "Web3 Hardware Wallets & Cold Storage NY", "Bitcoin Lightning Network Adoption NYC",
      "Ethereum Shanghai Upgrade & Staking Rewards", "AI Trading Bots on Binance New York"
    ],
    angles: [
      "Deep Dive Analysis", "Strategic Playbook", "Insider Guide", "Market Outlook 2026",
      "Institutional Framework", "Executive Blueprint", "High-Frequency Review", "Alpha Report"
    ]
  },
  {
    category: "Casino",
    subjects: [
      "High-Stakes European Roulette in Manhattan", "VIP Blackjack Single-Deck Strategies",
      "Baccarat Squeeze in Private NYC Lounges", "Live Dealer Provably Fair Algorithms",
      "Craps Probability & Dice Control Masterclass", "Progressive Jackpots in High-Roller Suites",
      "Texas Hold'em Underground Games NYC", "Casino Bankroll Management for Whales",
      "Pai Gow Poker Nuances in Chinatown NY", "RNG Certification & Provably Fair Mathematics",
      "VIP Diamond Tier Casino Perks Manhattan", "Three Card Poker Optimal Strategy Matrix",
      "Live Roulette Wheel Biases & Tracking", "High-Limit Slot Volatility & RTP Analysis",
      "Private Casino Salons of Upper East Side", "Crypto Roulette Lightning Multipliers",
      "The Psychology of Casino Tilt & Mastery", "Card Counting Legalities in New York State",
      "Casino Host Relations & VIP Comps Playbook", "Manhattan Penthouse Poker Tournaments"
    ],
    angles: [
      "Winning Blueprint", "Mathematical Mastery", "VIP Protocol", "High-Roller Secrets",
      "Exclusive Room Breakdown", "Advanced Probability Guide", "Championship Tactics", "Pro Edition"
    ]
  },
  {
    category: "Sports",
    subjects: [
      "Live ESPN NBA Betting: Knicks vs Celtics", "Brooklyn Nets Spread Betting Analytics",
      "NFL Giants vs Jets Live Odds Breakdown", "Yankees Run-Line & Over/Under Arbitrage",
      "Mets Moneyline Strategy at Citi Field", "English Premier League In-Play Momentum",
      "UEFA Champions League Real-Time Hedging", "La Liga Clásico Live Exchange Tactics",
      "UFC Championship Fight Night Moneylines", "Super Bowl Parlay Construction Masterclass",
      "NBA Live In-Game Possession Probability", "MLB Pitcher Strikeout Props & Weather Bias",
      "MLS New York City FC Derby Wagers", "Tennis Grand Slam Break-Point In-Play Betting",
      "Formula 1 Pit Stop Strategy & Driver Matchups", "NHL Rangers vs Islanders Rivalry Bets",
      "Golf PGA Tour Live Hole-by-Hole Betting", "Esports Live Counter-Strike & Valorant Lines",
      "Hedging Live Sports Parlays on NexYork", "Micro-Betting & Millisecond Latency Execution"
    ],
    angles: [
      "Data Analytics & Edge", "Sharp Money Tactics", "Live Exchange Strategy", "Statistical Model",
      "In-Play Breakdown", "Pro Bettor Guide", "Real-Time Odds Guide", "2026 Matchup Preview"
    ]
  },
  {
    category: "Lifestyle",
    subjects: [
      "Manhattan Penthouse Soirées & High-Rollers", "Tribeca Rooftop Lounges & Crypto Elite",
      "Hamptons Summer Gala Networking for Whales", "Michelin Three-Star Private Dining in NYC",
      "Bespoke Savile Row Tailoring for NY Moguls", "Supercar Rallies through Upstate New York",
      "Private Jet Charters: JFK to Monaco & Vegas", "Ultra-Luxury Swiss Watch Collecting in NY",
      "SoHo Art Gallery Openings & NFT Salons", "Exclusive Speakeasies of Greenwich Village",
      "Upper East Side Black-Tie Charity Galas", "Yacht Charters along the Hudson River",
      "Central Park South Penthouse Living", "Private Cigar Clubs & Cognac Lounges NYC",
      "DUMBO Waterfront Luxury Lofts & Views", "Helicopter Commutes from Manhattan to Hamptons",
      "Bespoke Diamond & High-Jewelry Buying NYC", "VIP Nightclubs of Meatpacking District",
      "Sound Baths & Wellness Retreats for NY Traders", "Private Wine Cellars & Rare Vintage Auctions"
    ],
    angles: [
      "The Elite Connoisseur Guide", "VIP Access Only", "The Luxury Playbook", "Manhattan Society Diary",
      "Curated Experience", "After-Hours Edition", "High-Society Secrets", "The Ultimate Roster"
    ]
  },
  {
    category: "Romance",
    subjects: [
      "The Allure of the High-Stakes Boudoir Bet", "Casanova of the Floor: Seduction & Risk",
      "Silk & Steel: Manhattan High-Society Romance", "Femme Fatales of Underground Poker",
      "Sensual Strategies & Midnight Roulette", "Penthouse Encounters where Bets Turn Personal",
      "Crypto Glamour & Provocative Connections", "Midnight Supercar Runs & High Desire",
      "Secret Rendezvous at The Plaza Manhattan", "Champagne & Secrets in Tribeca Lofts",
      "The Chemistry of Risk: Love & Fortunes", "Whispered Wagers on Rooftop Balconies",
      "Midnight In Manhattan: The Art of Flirtation", "High-Roller Couples Dominating the Arena",
      "Masked Venetian Balls in Upper Manhattan", "The Glamour of Red Velvet VIP Suites",
      "Dangerous Liaisons at the Baccarat Table", "Intimate Skyline Dinners & Rare Tokaji",
      "The Magnetism of Confidence & Winning", "Passion & Power: The NYC Elite Couples"
    ],
    angles: [
      "A Provocative Chronicle", "Intimate Dispatches", "The Seduction Files", "Sensory Guide",
      "Manhattan Nights Edition", "Passionate Encounters", "VIP Romance Review", "Untold Memoirs"
    ]
  },
  {
    category: "Strategy",
    subjects: [
      "Kelly Criterion in High-Frequency Crypto Trading", "Martingale vs Fibonacci Roulette Systems",
      "Expected Value (+EV) Calculation in Sports", "Hedging Binance Futures with Spot Holdings",
      "Implied Volatility & Crypto Options in NYC", "Bankroll Growth Formulas for VIP Players",
      "Arbitrage Bot Architecture & Millisecond Feeds", "Live Dealer Game Theory & Nash Equilibrium",
      "Provably Fair Seed Verification & Cryptography", "Risk of Ruin Calculations for Whale Bettors",
      "Card Shuffling Mathematics & House Edge", "Momentum Breakouts in Live Sports Markets",
      "Dynamic Position Sizing in Multi-Table Arena", "Sentiment Analysis of Crypto Twitter & NYC Whale Wallets",
      "Mines Game Multiplier Optimization Math", "Crash Game Auto Cash-Out Curve Formulas",
      "Orderbook Depth & Slippage Mitigation", "Tax-Loss Harvesting Strategies for New Yorkers",
      "Decentralized Oracle Settlement Mechanics", "Peer-to-Peer Escrow & Multi-Sig Security"
    ],
    angles: [
      "Mathematical Proofs", "Algorithmic Precision", "Quantitative Research", "Masterclass",
      "The Quantitative Blueprint", "Risk Management Guide", "Execution Protocol", "Advanced Playbook"
    ]
  },
  {
    category: "Gaming",
    subjects: [
      "Crash Game Multiplier Mechanics & Rocket Ascent", "Mines Grid Provably Fair Minefield Tactics",
      "Live Roulette Diamond Wheel Special Bets", "Multi-Hand VIP Blackjack Split Rules",
      "Dragon Tiger Fast-Action Baccarat Hybrid", "Lightning Dice Multiplier Volatility",
      "Sweet Bonanza Live Slot Drop Mechanics", "Mega Ball Bingo & Multiplier Cards",
      "Crazy Time Wheel Bonus Round Strategies", "Monopoly Live Board Game Rolls & Tactics",
      "Speed Baccarat 15-Second Action Pace", "Immersive Roulette HD Camera Angles",
      "Double Ball Roulette 1300:1 Jackpot Bets", "Infinite Blackjack Unlimited Seat Dynamics",
      "Dream Catcher Money Wheel Odds Matrix", "Caribbean Stud Poker 5+1 Bonus Payouts",
      "Ultimate Texas Hold'em Blind Play Rules", "Three Card Brag British Casino Classic",
      "Football Studio Top Card In-Play Betting", "Live Craps Automatic Mechanical Arm Action"
    ],
    angles: [
      "Complete Player Guide", "High-Multiplier Tactics", "Full Walkthrough", "Live Stream Review",
      "Provably Fair Verification", "RTP Analysis", "Whale Guide", "Interactive Tutorial"
    ]
  },
  {
    category: "Finance",
    subjects: [
      "New York BitLicense History & Evolution", "Wall Street Spot Bitcoin ETF Inflows",
      "Ethereum Staking Regulatory Clarity in NY", "High-Frequency Market Makers of Financial District",
      "Cold Storage Custody Insurance Policies", "Federal Reserve Interest Rates & Crypto Bull Runs",
      "Stablecoin Yield Farming vs Treasury Bills", "Private Banking Perks for NYC Crypto Millionaires",
      "Venture Capital Investments in Web3 NYC", "Family Office Crypto Allocation Frameworks",
      "Cross-Border Remittances via Solana & Bitcoin", "Decentralized Borrowing & Lending Protocols",
      "Crypto Real Estate Purchases in Manhattan", "Tax Shielding for Digital Asset Liquidity",
      "Smart Contract Audits & Smart Vault Insurance", "Decentralized Identity (DID) & KYC Compliance",
      "Macroeconomic Liquidity Cycles & Bull Run Signals", "The Role of Binance in Global Liquidity",
      "Bitcoin Mining Energy Standards in NY State", "Tokenomics Design & Sustainable Staking APRs"
    ],
    angles: [
      "Economic Report", "Institutional Memo", "Regulatory Breakdown", "Wealth Management Playbook",
      "Financial Analysis", "Macro Insight", "Wall Street Perspective", "Executive Briefing"
    ]
  }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Generate 1000 unique blogs
const blogs = [];
const usedSlugs = new Set();
let idCounter = 1;

// Date formatter
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getRandomDate(index) {
  const month = months[index % 12];
  const day = (index % 28) + 1;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${month} ${dayStr}, 2026`;
}

let pIndex = 0;
let sIndex = 0;
let aIndex = 0;
let variant = 1;

while (blogs.length < 1000) {
  const pillar = pillars[pIndex % pillars.length];
  const subject = pillar.subjects[sIndex % pillar.subjects.length];
  const angle = pillar.angles[aIndex % pillar.angles.length];
  
  let title = `${subject}: ${angle}`;
  if (variant > 1) {
    const prefixes = ["The Definitive", "Elite", "2026 Edition:", "Exclusive:", "VIP Guide to", "Mastering", "Inside", "The Art of"];
    const prefix = prefixes[(variant + pIndex) % prefixes.length];
    title = `${prefix} ${subject} - ${angle}`;
  }

  let slug = slugify(title);
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${idCounter}`;
  }
  usedSlugs.add(slug);

  const img = curatedImages[(idCounter - 1) % curatedImages.length];
  const date = getRandomDate(idCounter);

  const excerpt = `Comprehensive ${pillar.category.toLowerCase()} analysis on ${subject.toLowerCase()} tailored for New York crypto traders, high-stakes casino players, and elite Manhattan lifestyle enthusiasts.`;

  const content = `In the dynamic heartbeat of New York City, where high-frequency Binance orderbooks converge with private Manhattan rooftop lounges and premier casino arenas, **${title}** represents the pinnacle of modern digital entertainment and strategic mastery.

Whether you are navigating the rapid fluctuations of Bitcoin and Ethereum in New York, executing mathematical precision at European Roulette and VIP Blackjack tables, or immersing yourself in the provocative glamour of Manhattan's after-hours scene, NexYork provides the verified infrastructure and SAFU cold vault protection required by elite players.

### Strategic Highlights & Key Takeaways
- **Real-Time NYC Liquidity:** Sub-second execution powered by decentralized price feeds and live ESPN sports trackers.
- **Provably Fair Security:** Cryptographically verified SHA-256 game seeds ensuring 100% transparency on every wager.
- **Exclusive VIP Privileges:** Seamless 20% lifetime affiliate commissions, bespoke concierge matchmaking, and instant crypto payouts.

Experience the evolution of New York gaming, crypto exchange excellence, and luxury romance today at NexYork Elite.`;

  blogs.push({
    id: idCounter,
    slug: slug,
    title: title,
    category: pillar.category,
    date: date,
    excerpt: excerpt,
    image: img,
    content: content,
    readTime: "5 MIN READ",
    author: "NexYork Editorial Board",
    tags: [pillar.category, "New York", "Binance NYC", "VIP Elite", "Crypto", "High Stakes"]
  });

  idCounter++;
  pIndex++;
  if (pIndex % pillars.length === 0) sIndex++;
  if (sIndex % 20 === 0) aIndex++;
  if (aIndex % 8 === 0) variant++;
}

// 1. Write blogs.js
const blogsFileContent = `// Auto-generated 1,000 Verified SEO Pages for NexYork Magazine
export const blogs = ${JSON.stringify(blogs, null, 2)};
`;

fs.writeFileSync(path.join(rootDir, 'src', 'data', 'blogs.js'), blogsFileContent, 'utf-8');
console.log(`✅ Generated ${blogs.length} articles in src/data/blogs.js`);

// 2. Generate public/sitemap.xml
const baseUrl = "https://nexyorkcasino.vercel.app";
const today = new Date().toISOString().split('T')[0];

const coreRoutes = [
  { url: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
  { url: `${baseUrl}/arena`, priority: "0.9", changefreq: "daily" },
  { url: `${baseUrl}/earn`, priority: "0.9", changefreq: "weekly" },
  { url: `${baseUrl}/wallet`, priority: "0.8", changefreq: "weekly" },
  { url: `${baseUrl}/rewards`, priority: "0.8", changefreq: "weekly" },
  { url: `${baseUrl}/magazine`, priority: "0.9", changefreq: "daily" },
];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

// Add core routes
for (const route of coreRoutes) {
  sitemapXml += `  <url>
    <loc>${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
}

// Add all 1000 blog pages
for (const blog of blogs) {
  sitemapXml += `  <url>
    <loc>${baseUrl}/magazine/${blog.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`✅ Generated sitemap.xml with ${coreRoutes.length + blogs.length} URLs`);

// 3. Generate Top 1,000 Keywords List
const keywordCategories = [
  "New York Crypto", "Bitcoin NYC", "Binance New York", "Ethereum NY", "NYC Sports Betting",
  "Manhattan Casino", "Online Roulette NY", "VIP Blackjack NYC", "Provably Fair Gaming",
  "Manhattan Nightlife", "Luxury Romance NYC", "Crypto Cold Storage", "BitLicense NY",
  "Live ESPN Betting", "Brooklyn Crypto", "Wall Street Trading", "Web3 Staking NYC"
];

const keywordModifiers = [
  "exchange", "platform", "app", "trading", "login", "bonus", "live", "rates",
  "guide", "strategy", "review", "legal in NY", "best", "VIP", "rewards", "deposit",
  "withdrawal", "security", "SAFU vault", "odds", "predictions", "scores", "payouts",
  "tournament", "real money", "license", "regulations", "verification", "KYC", "affiliate"
];

const generatedKeywords = new Set();

const coreKeywords = [
  "New York", "New York City", "NYC", "New York USA", "New York City USA", "New York news", "New York today",
  "New York business", "New York companies", "New York services", "New York jobs", "New York online services",
  "New York local services", "New York website", "New York digital services", "New York technology", "New York finance",
  "New York cryptocurrency", "New York crypto", "crypto New York", "cryptocurrency New York", "Bitcoin New York",
  "Ethereum New York", "blockchain New York", "Binance New York", "Binance NYC", "Binance New York USA",
  "Binance crypto New York", "Binance cryptocurrency New York", "Binance exchange New York", "Binance trading New York",
  "Binance account New York", "Binance app New York", "Binance crypto exchange New York", "Binance Bitcoin New York",
  "Binance Ethereum New York", "Binance US New York", "Binance USA New York", "Binance legal in New York",
  "Binance available in New York", "Binance New York users", "Binance New York trading", "Binance New York crypto exchange",
  "Binance New York cryptocurrency exchange", "Binance New York regulations", "Binance New York license",
  "Binance New York laws", "Binance New York restrictions", "Binance New York verification", "Binance New York KYC",
  "Binance New York account verification", "Binance New York customer support", "Binance New York fees",
  "Binance New York deposit", "Binance New York withdrawal", "Binance New York Bitcoin trading", "Binance New York crypto trading",
  "Is Binance available in New York", "Can I use Binance in New York", "Is Binance legal in New York", "How to use Binance in New York",
  "Binance account in New York", "Binance crypto trading in New York", "Best crypto exchange in New York",
  "Best cryptocurrency exchange New York", "Bitcoin exchange New York", "crypto trading platform New York",
  "cryptocurrency trading New York", "crypto exchange NYC", "Bitcoin trading NYC", "cryptocurrency services New York", "NexYork"
];

coreKeywords.forEach(k => generatedKeywords.add(k));

for (const cat of keywordCategories) {
  for (const mod of keywordModifiers) {
    generatedKeywords.add(`${cat} ${mod}`);
    generatedKeywords.add(`${mod} ${cat}`);
    generatedKeywords.add(`${cat} in New York City`);
    generatedKeywords.add(`${cat} Manhattan`);
    generatedKeywords.add(`${cat} Brooklyn NY`);
  }
}

const sportsTeams = ["Knicks", "Nets", "Giants", "Jets", "Yankees", "Mets", "Rangers", "Islanders", "NYCFC", "Red Bulls"];
for (const team of sportsTeams) {
  generatedKeywords.add(`New York ${team} live betting`);
  generatedKeywords.add(`${team} odds today NYC`);
  generatedKeywords.add(`${team} real-time spread betting`);
  generatedKeywords.add(`${team} in-play betting New York`);
}

const casinoGames = ["Roulette", "Blackjack", "Baccarat", "Craps", "Texas Holdem Poker", "Crash Game", "Mines Game", "Slot Machines", "Live Dealer"];
for (const game of casinoGames) {
  generatedKeywords.add(`New York ${game} online`);
  generatedKeywords.add(`Manhattan ${game} VIP`);
  generatedKeywords.add(`Best ${game} platform NYC`);
  generatedKeywords.add(`High stakes ${game} New York`);
  generatedKeywords.add(`Provably fair ${game} crypto`);
}

const finalKeywordsList = Array.from(generatedKeywords).slice(0, 1000);
fs.writeFileSync(path.join(rootDir, 'src', 'data', 'top1000keywords.json'), JSON.stringify(finalKeywordsList, null, 2), 'utf-8');
console.log(`✅ Saved top ${finalKeywordsList.length} keywords in src/data/top1000keywords.json`);

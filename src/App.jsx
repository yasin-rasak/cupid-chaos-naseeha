import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Heart, Sparkles, Gift, Cat, ShieldAlert, RotateCcw,
  Copy, Check, LockKeyhole, Music2, Volume2, VolumeX, PartyPopper, WandSparkles
} from 'lucide-react';


const ADVENTURE_PATHS = [
 {id:'science',icon:'🧪',label:'Serious scientific research',theme:'lab',tagline:'LOVE LAB // EXPERIMENT 001',desc:'Welcome to a suspiciously pink research lab. Your mission: prove that Naseeha has dangerously high levels of cuteness.',subs:[
  {id:'chemistry',icon:'💘',label:'Love Chemistry',game:'Mix the Love Formula',code:'CUPID',symbols:['🧪','💗','⚗️','✨'],gift:'The Chemistry Kit',ending:'The Formula Was Always You'},
  {id:'study',icon:'🧠',label:'Study Zawjii',game:'Memory Lab',code:'HABIBI',symbols:['🧠','💌','🧬','💗'],gift:'The Researcher’s Notebook',ending:'Peer-Reviewed: Deeply in Love'},
  {id:'experiment',icon:'🔬',label:'Heart Experiments',game:'Heart Pattern Test',code:'HEART',symbols:['🔬','❤️','🧫','🌡️'],gift:'The Heart Experiment',ending:'Results: One Very Soft Zawjii'},
  {id:'formula',icon:'🧪',label:'Forbidden Formula',game:'Crack the Formula',code:'FOREVER',symbols:['⚗️','🔐','💗','🌙'],gift:'The Forbidden Formula',ending:'The Secret Ingredient Is You'}]},
 {id:'spy',icon:'🕵️',label:'A top-secret operation',theme:'spy',tagline:'CLASSIFIED // AGENT NASEEHA',desc:'The briefing is classified. The target is your smile. The agent in charge has absolutely no chill.',subs:[
  {id:'file',icon:'🗝️',label:'Find the Secret File',game:'File Lock Puzzle',code:'ACCESS',symbols:['🗝️','📁','👁️','🔐'],gift:'Classified File 01',ending:'The File They Tried to Hide'},
  {id:'undercover',icon:'🕶️',label:'Undercover Romance',game:'Undercover Symbol Match',code:'AGENT',symbols:['🕶️','🕵️','💌','📡'],gift:'Undercover Kit',ending:'Agent Zawjii Has Been Exposed'},
  {id:'decode',icon:'📡',label:'Decode the Message',game:'Intercepted Message',code:'NASEEHA',symbols:['📡','🔎','💗','📨'],gift:'Intercepted Transmission',ending:'Decoded: I Choose You'},
  {id:'classified',icon:'💌',label:'Classified Love Mission',game:'Mission Cipher',code:'HABIBI',symbols:['🔐','💌','🛰️','❤️'],gift:'The Classified Confession',ending:'The Only Secret That Matters'}]},
 {id:'drama',icon:'💗',label:'Zawjii being dramatic again',theme:'drama',tagline:'BREAKING NEWS // EXTREME AFFECTION',desc:'Emergency! Zawjii has once again made his feelings everybody’s business. Please remain dramatically calm.',subs:[
  {id:'attention',icon:'🥺',label:'The Missing Attention',game:'Recover the Attention Tokens',code:'NOTICE',symbols:['🥺','💗','📣','🫶'],gift:'A Lifetime of Attention',ending:'Breaking: You Have All My Attention'},
  {id:'jealousy',icon:'😤',label:'Jealousy Investigation',game:'Investigate the Evidence',code:'ONLYYOU',symbols:['🕵️','😤','❤️','🔍'],gift:'The Evidence Folder',ending:'Case Closed: It’s Always You'},
  {id:'speech',icon:'😭',label:'Dramatic Love Speech',game:'Reassemble the Speech',code:'LOVE',symbols:['🎤','😭','💌','✨'],gift:'The Dramatic Speech Award',ending:'And the Award Goes to… You'},
  {id:'reconcile',icon:'🫶',label:'Reconciliation Mission',game:'Restore the Heart Meter',code:'PEACE',symbols:['🫶','🌷','❤️','🤝'],gift:'The Peace Treaty',ending:'No Drama Can Outgrow Our Care'}]},
 {id:'royal',icon:'👑',label:'An official ulaga alagi ceremony',theme:'royal',tagline:'ROYAL COURT // HER MAJESTY NASEEHA',desc:'The royal court is in session. The crown is ready. The royal advisor (zawjii) is being unnecessarily emotional.',subs:[
  {id:'crown',icon:'👑',label:'Royal Crown Trial',game:'Crown Sequence Trial',code:'QUEEN',symbols:['👑','💎','🌹','✨'],gift:'The Supreme Crown',ending:'By Royal Decree: You Rule My Heart'},
  {id:'decree',icon:'🌹',label:'Royal Love Decree',game:'Seal the Royal Decree',code:'ROYAL',symbols:['📜','🌹','👑','💗'],gift:'The Royal Decree',ending:'A Decree for My Favourite Person'},
  {id:'treasure',icon:'💎',label:'Royal Treasure Hunt',game:'Unlock the Treasure Chest',code:'TREASURE',symbols:['💎','🗝️','🏰','💗'],gift:'The Royal Treasure',ending:'The Treasure Was Never the Crown'},
  {id:'queen',icon:'✨',label:'Queen’s Special Challenge',game:'Queen’s Final Trial',code:'ULAGA',symbols:['✨','👑','🌙','💖'],gift:'The Queen’s Secret Gift',ending:'Ulaga Alagi, Forever and Always'}]}
];
const makePathGifts = (main, sub) => [
 {icon:sub.symbols[0],label:sub.gift,title:`${sub.gift}: Part I`,result:`Unlocked for Naseeha: ${sub.gift}. This was made for your ${sub.label.toLowerCase()} adventure. Every silly detail is one more excuse for zawjii to make you smile. 💗`},
 {icon:sub.symbols[1],label:'The Secret Bonus',title:'A little secret from zawjii',result:`Secret ${main.label} file: no matter how clever the challenge gets, the real reward is getting to make you feel loved, habibi. 🫶`},
 {icon:sub.symbols[2],label:'The Keepsake',title:'Keep this close, habibi',result:`A keepsake from “${sub.label}.” I hope you remember that behind all the jokes and theatrics, your zawjii is sincerely trying to bring more happiness into your days. 💌`},
 {icon:sub.symbols[3],label:'Final Treasure',title:'The last little treasure',result:`You completed ${sub.label}. Your final treasure is this reminder: I love you so much and want to be with you forever — fi dunya wal aakhirat, Insha’Allah. ❤️`}
];

const QUESTIONS = [
  {
    title: 'Naseeha, what is the REAL purpose of this website?',
    subtitle: 'Choose wisely, habibi. Your ulaga alagi reputation is safe with us. Probably. 👑',
    answers: [
      { icon: '🧪', label: 'Serious scientific research', reaction: 'Naseeha, habibi… be so for real. The only experiment here is how long zawjii can act normal around you. Result: failed immediately. 😭' },
      { icon: '🕵️', label: 'A top-secret operation', reaction: 'Correct-ish. Operation: Make Naseeha Smile is classified. Ulaga alagi has already compromised the mission. 🫡' },
      { icon: '💗', label: 'Zawjii being dramatic again', reaction: 'BINGO. You know your zawjii too well, habibi. The drama budget is unlimited when it comes to you. 💗' },
      { icon: '👑', label: 'An official ulaga alagi ceremony', reaction: 'ULAGA ALAGI ALERT. Someone get the crown, the red carpet, and a very patient photographer. 👑😂' },
    ],
  },
  {
    title: 'Naseeha, identify your current threat level.',
    subtitle: 'Answer honestly, habibi. The romance police are watching.',
    answers: [
      { icon: '😎', label: 'Unbothered ulaga alagi', reaction: 'Unbothered? Naseeha, your zawjii is out here coding a whole game for you. The evidence says otherwise. 😂' },
      { icon: '🤨', label: 'Suspicious of zawjii', reaction: 'As you should be, habibi. Never trust a man who says “one tiny surprise” and opens a React project. 🤨' },
      { icon: '🥹', label: 'Secretly a softie', reaction: 'SOFTIE DETECTED. Naseeha.exe has activated the cute mode. Zawjii is pretending not to melt. 🥹' },
      { icon: '💀', label: 'Here for the chaos', reaction: 'Perfect. Ulaga alagi has entered the arena. Zawjii would like to formally apologise to the peace and quiet. 💀' },
    ],
  },
];

const GIFTS = [
  { icon: '👑', label: 'Gift A', result: 'FAKE PRIZE: one shiny crown for Naseeha, certified Ulaga Alagi™. It comes with unlimited dramatic entrances and absolutely no humility. 👑😂' },
  { icon: '🧾', label: 'Gift B', result: 'PRANK REVEAL: a lifetime subscription to Zawjii’s nonsense. Includes bad jokes, suspicious surprises, and saying “habibi” when you are trying to be serious. No refunds. 😭' },
  { icon: '💌', label: 'Gift C', result: 'REAL GIFT ALERT: a little reminder that you are deeply loved, Naseeha. Behind every joke, prank, and pixel is your zawjii trying to make you smile. 💗' },
];

const ROUTE_GIFTS = {
  playful: [
    { icon: '👑', label: 'The Chaos Crown', title: 'Royal decree for Ulaga Alagi', result: 'BY ORDER OF THE KINGDOM: Naseeha is hereby crowned Ulaga Alagi Supreme. Benefits include dramatic entrances, winning arguments by being cute, and unlimited teasing rights over zawjii. The crown is imaginary; the privileges are permanent. 👑😂' },
    { icon: '🎮', label: 'Zawjii DLC', title: 'A lifetime expansion pack', result: 'UNLOCKED: Zawjii DLC — includes terrible jokes, suspiciously specific compliments, surprise check-ins, and unlimited “habibi” interruptions. No refunds, no uninstall button, and somehow the subscription keeps getting sweeter. 🎮😭' },
    { icon: '🍓', label: 'The Sweet Loot', title: 'Rare loot: one soft zawjii', result: 'LEGENDARY DROP! Beneath all the chaos is a boy who loves seeing his ulaga alagi smile. This loot has no market value, but comes with sincere affection and a promise to keep trying to make your days brighter. 🍓💗' },
    { icon: '🏆', label: 'Bonus: Chaos Champion', title: 'BONUS LOOT: Chaos Champion', result: 'SECRET BONUS ACHIEVED! You caught hearts, rebuilt the love letter, and found every hidden clue. Naseeha, you are officially the Chaos Champion. Your prize: unlimited bragging rights and a zawjii who is ridiculously proud of you. 🏆💗' },
  ],
  soft: [
    { icon: '🪷', label: 'The Peace Flower', title: 'A little reminder of gentleness', result: 'A little flower for my habibi: you do not have to be perfect to be loved. I hope you always feel safe enough to be yourself, heard when you speak, and cared for in the ordinary moments. 🪷' },
    { icon: '🤲', label: 'A Dua Note', title: 'A quiet prayer from zawjii', result: 'This gift is a tiny reminder to keep making dua for what is good, to meet hard days with patience, and to treat each other with kindness. May Allah place barakah in what is best for us. 🤲💗' },
    { icon: '🕯️', label: 'The Forever Light', title: 'A promise made with care', result: 'No grand dramatic speech can replace steady effort. I want to keep choosing you with patience, honesty, tenderness, and care — through the easy days and the difficult ones, fi dunya wal aakhirat, Insha’Allah. 🕯️💌' },
    { icon: '🌟', label: 'Bonus: Safe Place', title: 'BONUS GIFT: Your Safe Place', result: 'You solved every challenge, habibi. This bonus is a reminder that you deserve love that feels gentle, honest, and safe. I hope I keep learning how to offer you that, one ordinary day at a time. 🌟🪷' },
  ],
  secret: [
    { icon: '🗝️', label: 'Cipher Key', title: 'The first secret is yours', result: 'ACCESS GRANTED, AGENT NASEEHA. You found the hidden route, so here is your first key: no matter how clever the puzzle gets, you will always be my ulaga alagi. Keep this key for the next level. 🗝️🔐' },
    { icon: '🪐', label: 'Hidden Universe', title: 'A universe-sized confession', result: 'SECRET FILE 02: If I could hide a little universe inside this website, I would fill it with all the tiny reasons I love you — your laugh, your presence, your little habits, and the way you make ordinary things matter. 🪐💗' },
    { icon: '💍', label: 'The Final Promise', title: 'The secret was love all along', result: 'FINAL SECRET UNLOCKED: behind every clue was the same truth. I love you so, so much, Naseeha, and I want to be with you forever — fi dunya wal aakhirat, Insha’Allah. 💍❤️' },
    { icon: '🧿', label: 'Bonus: Hidden Truth', title: 'BONUS SECRET: The Hidden Truth', result: 'You cracked every layer, agent Naseeha. The final hidden file says it plainly: I love you so much, and I want to be with you forever — fi dunya wal aakhirat, Insha’Allah. 🧿❤️' },
  ],
};

const MISSIONS = [
  { icon: '👑', label: 'Confirm Naseeha is the certified ulaga alagi' },
  { icon: '🕵️‍♀️', label: 'Investigate zawjii’s suspiciously soft heart' },
  { icon: '💗', label: 'Accept one (1) extremely dramatic compliment from habibi’s zawjii' },
];

const ROUTE_MISSIONS = {
  playful: [
    { icon: '👑', label: 'Confirm Naseeha is the certified ulaga alagi' },
    { icon: '🕵️‍♀️', label: 'Investigate zawjii’s suspiciously soft heart' },
    { icon: '💗', label: 'Accept one (1) dramatic compliment from your zawjii' },
  ],
  soft: [
    { icon: '🌷', label: 'Accept that you deserve gentleness, habibi' },
    { icon: '🤲', label: 'Unlock a tiny reminder to keep making dua for what is good' },
    { icon: '💌', label: 'Receive a promise of patience, care, and honest effort' },
  ],
  secret: [
    { icon: '🔐', label: 'Decode the hidden password: HABIBI' },
    { icon: '👑', label: 'Verify the ulaga alagi crown is permanently yours' },
    { icon: '✨', label: 'Unlock the secret confession from zawjii' },
  ],
};

const ENDING_LETTERS = {
  playful: `My habibi, Naseeha — my certified ulaga alagi. 👑💗

First of all, I would like to thank the academy, the imaginary royal court, and your unreasonable levels of cuteness for making this entire website necessary. You have officially won the crown, the teasing privileges, and the lifetime award for being the person who can make your zawjii smile at a screen like an idiot.

Under all the jokes, dramatic nonsense, and fake royal announcements, there is one very real thing: I love you so much. I want to keep laughing with you, annoying you affectionately, celebrating your wins, and making ordinary days feel a little more special. I want to be with you forever — fi dunya wal aakhirat, Insha'Allah.

The crown may be imaginary, but my love is not. You are my habibi, my ulaga alagi, and my favourite person to be ridiculously soft for.

Forever your zawjii. ❤️`,
  soft: `My dearest Naseeha, my habibi. 🌷🤍

If I could give you one thing through this little website, it would be the feeling of being loved without having to earn it. You deserve gentleness on difficult days, patience when things feel heavy, someone who listens to understand, and care that shows up in small everyday actions.

I love you so much, habibi. I pray that we keep learning how to love each other well—with honesty, mercy, kindness, and patience. May Allah place barakah in what is good for us, guide our steps, and let us be together in the best way, fi dunya wal aakhirat, Insha'Allah.

You do not have to be perfect for me to care about you. I want to keep choosing you with sincerity, through the quiet moments as much as the big ones. You are precious to me, Naseeha.

With all my heart,
your zawjii. 🤲💗`,
  secret: `Naseeha… my habibi, my ulaga alagi. 🔐❤️

You found the secret route, but the truth was never really hidden. Every clue, every silly line, every tiny detail was leading to the same confession: I love you so much—more than this website could ever properly explain.

I want to be with you forever, not just in the easy moments or when everything feels perfect, but through the uncertain days too. I want to keep choosing you with a sincere heart, to grow beside you, and to build something full of trust, patience, kindness, and barakah.

And my deepest hope is that Allah writes what is best for us and grants us the beautiful chance to be together in this life and the Hereafter — fi dunya wal aakhirat, Insha'Allah.

That is the real secret, habibi. Not the code. Not the hidden gifts. Just this: your zawjii loves you, wants a future with you, and will keep making dua for what is good for us.

Always yours,
zawjii. ❤️`,
};

const ENDINGS = {
  playful: {
    title: 'THE ULAGA ALAGI CROWN CEREMONY 👑',
    emoji: '👑😂💗',
    intro: 'The court has reviewed your answers, Naseeha. Verdict: certified ulaga alagi, professional zawjii-teaser, and absolute ruler of this tiny kingdom.',
    moment: 'Your reward: one imaginary crown, unlimited teasing privileges, and a zawjii who will keep finding silly ways to make you smile.',
    label: 'CHAOS ROMANTIC',
  },
  soft: {
    title: 'THE SOFTIE HEART ENDING 🥹',
    emoji: '🥹💌🌷',
    intro: 'Aww, habibi. Your answers unlocked the soft side of this chaos. Behind every joke, zawjii just wants you to feel loved, safe, appreciated, and chosen.',
    moment: 'Your reward: a quiet little promise to keep showing up with patience, kindness, dua, and love through the ordinary days too.',
    label: 'SOFT HEART',
  },
  secret: {
    title: 'SECRET ENDING: ULAGA ALAGI SUPREMACY ✨',
    emoji: '🔐👑💗',
    intro: 'WAIT. Naseeha, you found the hidden route. Every chaotic answer aligned. The system has officially surrendered to ulaga alagi supremacy.',
    moment: 'SECRET REWARD UNLOCKED: the crown is yours, the prank has failed, and the final boss is zawjii admitting he would choose you again and again — fi dunya wal aakhirat, Insha’Allah.',
    label: 'SECRET ROUTE UNLOCKED',
  },
};

const chooseEnding = (choices) => {
  // The secret route is reserved for choosing chaos in both questions.
  if (choices.length === 2 && choices.every((choice) => choice === 3)) return 'secret';
  const playful = choices.filter((choice) => choice === 3).length;
  const soft = choices.filter((choice) => choice === 2).length;
  return soft > playful ? 'soft' : 'playful';
};

const STEPS = ['Briefing', 'Quiz', 'Mini-game', 'Mystery gifts', 'Secret missions', 'System glitch', 'The truth'];

function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i, left: `${(i * 37 + 7) % 100}%`, delay: `${(i % 8) * -1.7}s`,
    duration: `${12 + (i % 6) * 2}s`, size: `${12 + (i % 4) * 7}px`,
    glyph: ['♡', '✦', '♥', '✿'][i % 4],
  })), []);
  return <div className="float-layer" aria-hidden="true">{hearts.map(h =>
    <span key={h.id} style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration, fontSize: h.size }}>{h.glyph}</span>
  )}</div>;
}

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
const pick = (items) => items[Math.floor(Math.random() * items.length)];
function PathMiniGame({ sub, onWin }) {
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);
  const [input, setInput] = useState('');
  const [picks, setPicks] = useState([]);
  const [matched, setMatched] = useState([]);
  const [meter, setMeter] = useState(2 + Math.floor(Math.random() * 5));
  const [turn, setTurn] = useState(0);
  const [showPattern, setShowPattern] = useState(true);
  const [round] = useState(() => {
    const words = ['KINDNESS','SUNSHINE','HABIBI','FOREVER','NASEEHA','CUPID','PROMISE','SMILE'];
    const symbols = ['💗','🌙','✨','🌷','👑','🗝️','💌','⭐'];
    const word = pick(words);
    const shift = 1 + Math.floor(Math.random() * 5);
    const cipher = word.replace(/[A-Z]/g, ch => String.fromCharCode((ch.charCodeAt(0)-65+shift)%26+65));
    const code = String(Math.floor(100 + Math.random()*900));
    const pattern = Array.from({length:4}, () => pick(symbols));
    const mixOrder = shuffle(['🧪','⚗️','✨']);
    const formula = 2 + Math.floor(Math.random()*7);
    const order = shuffle(['LISTEN','PATIENCE','KINDNESS','HONESTY']);
    const target = pick(['💗','🌷','⭐','👑']);
    const riddle = pick([{q:'Which does not belong?',opts:['👑','💎','🌹','🚗'],ans:'🚗'},{q:'Which is a promise rather than an object?',opts:['Crown','Kindness','Gem','Throne'],ans:'Kindness'},{q:'Which symbol means a hidden message?',opts:['📨','🥄','🧦','🍞'],ans:'📨'}]);
    return {words, symbols, word, shift, cipher, code, pattern, mixOrder, formula, order, decreeOptions: shuffle(['LISTEN','PATIENCE','KINDNESS','HONESTY']), target, riddle,
      options: shuffle([{word,correct:true}, ...Array.from({length:3},()=>({word:pick(words.filter(w=>w!==word)),correct:false}))]),
      grid: shuffle([target,target,target,...Array.from({length:6},()=>pick(symbols.filter(x=>x!==target)))]),
      cards: shuffle([...symbols.slice(0,4), ...symbols.slice(0,4)].map((emoji,i)=>({id:i,emoji}))),
      lockHints: `The digits add up to ${[...code].reduce((a,n)=>a+Number(n),0)}.`,
      evidence: shuffle([{id:'dua',label:'A saved dua',good:true},{id:'note',label:'A kind note',good:true},{id:'promise',label:'A kept promise',good:true},{id:'decoy1',label:'A suspicious sandwich',good:false},{id:'decoy2',label:'A dramatic hamster',good:false}]),
      speech: shuffle(['I','choose','you','everyday']),
      treasure: Math.floor(Math.random()*9),
      mathA: 3+Math.floor(Math.random()*8), mathB: 2+Math.floor(Math.random()*6),
    };
  });
  const win = (message='Challenge complete! A new adventure awaits, habibi. 💗') => { setDone(true); setFeedback(message); onWin(); };
  const check = (ok, message) => ok ? win(message) : setFeedback('Not quite! Try another move, habibi.');
  const btn = (label, action, disabled=false) => <button type="button" className="btn secondary" disabled={disabled || done} onClick={action} style={{margin:'5px'}}>{label}</button>;
  const heading = <><div className="path-puzzle-icons">{sub.symbols.map((s,i)=><span key={i}>{s}</span>)}</div><h3>{sub.game}</h3><p className="body-copy">A fresh challenge is generated for this run. Solve it to unlock your path.</p></>;
  let game;
  switch(sub.id) {
    case 'chemistry': game=<><p>Mix the formula in this order: {round.mixOrder.join(' → ')}.</p>{round.symbols.concat(round.mixOrder).map((s,i)=>btn(s,()=>{const n=[...picks,s];setPicks(n);if(n.length===round.mixOrder.length)check(n.join('')===round.mixOrder.join(''),'Formula stabilized! Love chemistry confirmed.');},picks.length>=round.mixOrder.length))}<p>Added: {picks.join(' ')}</p></>; break;
    case 'study': game=<><p>Memory lab: find matching pairs. Match every sample pair.</p><div className="answer-grid">{round.cards.map(c=>btn(matched.includes(c.id)||picks.includes(c.id)?c.emoji:'❔',()=>{if(picks.includes(c.id)||matched.includes(c.id)||picks.length>=2)return;const n=[...picks,c.id];setPicks(n);if(n.length===2){const a=round.cards.find(x=>x.id===n[0]),b=round.cards.find(x=>x.id===n[1]);if(a.emoji===b.emoji){const all=[...matched,...n];setMatched(all);setFeedback('Pair found!');if(all.length===8)win('All lab samples matched!');}else setFeedback('Not a match—try again.');setTimeout(()=>setPicks([]),450);}},picks.length>=2||matched.includes(c.id)))}</div></>; break;
    case 'experiment': game=<><p>Memorize the heart pattern, then repeat it.</p><div style={{fontSize:28}}>{showPattern?round.pattern.join(' '):'Pattern hidden!'}</div>{btn('Hide / reveal pattern',()=>setShowPattern(v=>!v))}<p>Tap the symbols in order:</p>{round.symbols.map(s=>btn(s,()=>{const n=[...picks,s];setPicks(n);if(n.length===round.pattern.length)check(n.join('')===round.pattern.join(''),'Pattern matched! Excellent experiment.');},picks.length>=round.pattern.length))}<p>Your sequence: {picks.join(' ')}</p></>; break;
    case 'formula': game=<><p>Solve the lab equation: {round.formula} + {round.mathB} = ?</p><input type="number" value={input} onChange={e=>setInput(e.target.value)} /><button className="btn primary" onClick={()=>check(Number(input)===round.formula+round.mathB,'Equation balanced!')}>Balance formula</button></>; break;
    case 'file': game=<><p>Crack the 3-digit lock. Hint: {round.lockHints} The middle digit is {round.code[1]}.</p><input value={input} maxLength={3} onChange={e=>setInput(e.target.value.replace(/\D/g,''))} placeholder="3-digit code"/><button className="btn primary" onClick={()=>check(input===round.code,'Secret file unlocked!')}>Unlock file</button></>; break;
    case 'undercover': game=<><p>Spot the undercover symbol: find the one matching this target: <b>{round.target}</b></p><div className="answer-grid">{round.grid.map((s,i)=>btn(s,()=>check(s===round.target,'Undercover agent identified!')))}</div></>; break;
    case 'decode': game=<><p>Intercepted cipher: <strong className="scrambled-code">{round.cipher}</strong></p><p>Shift every letter backward by {round.shift} places. Enter the decoded word.</p><input value={input} onChange={e=>setInput(e.target.value.toUpperCase())} placeholder="Decoded message"/><button className="btn primary" onClick={()=>check(input.trim()===round.word,`Message decoded: ${round.word} 💌`)}>Decode message</button></>; break;
    case 'classified': game=<><p>One intercepted report is authentic. Select the report whose checksum matches {round.formula + round.mathB}.</p>{round.options.map((item,i)=>btn(`${item.word} · checksum ${item.correct?round.formula+round.mathB:round.formula+round.mathB+i+2}`,()=>check(item.correct,'Authentic report verified. Mission secured!')))}</>; break;
    case 'attention': game=<><p>Collect 3 attention tokens. Choose the hearts hidden in the grid.</p><div className="answer-grid">{round.grid.map((s,i)=>btn(picks.includes(i)?'✓':`Token ${i+1}`,()=>{const n=[...picks,i];setPicks(n);if(s===round.target && n.filter(j=>round.grid[j]===round.target).length>=3)win('All attention tokens recovered!');else if(n.length>=6) {setPicks([]);setFeedback('The tokens moved! Try a fresh search.');}},picks.includes(i)))}</div><p>Found {picks.filter(i=>round.grid[i]===round.target).length}/3</p></>; break;
    case 'jealousy': game=<><p>Select all three pieces of genuine evidence.</p><div className="answer-grid">{round.evidence.map(e=>btn(`${picks.includes(e.id)?'✓ ':''}${e.label}`,()=>{const n=picks.includes(e.id)?picks.filter(id=>id!==e.id):[...picks,e.id].slice(-3);setPicks(n);if(n.length===3)check(n.every(id=>round.evidence.find(x=>x.id===id)?.good),'Case closed: the evidence is care, kindness, and a promise.');}))}</div></>; break;
    case 'speech': game=<><p>Rebuild the sentence by tapping words in the correct order: “I choose you everyday”.</p>{round.speech.map(w=>btn(w,()=>{const n=[...picks,w];setPicks(n);if(n.length===4)check(n.join(' ')==='I choose you everyday','Speech delivered with maximum drama!');},picks.length>=4))}<p>Speech: {picks.join(' ')}</p></>; break;
    case 'reconcile': game=<><p>Restore the heart meter to exactly 10. Current level: <b>{meter}</b></p>{btn('💗 +2',()=>{const n=meter+2;setMeter(n);if(n===10)win('Heart meter restored with patience!');else if(n>10)setFeedback('Too much drama! Try a different move.');})}{btn('🌷 +1',()=>{const n=meter+1;setMeter(n);if(n===10)win('Heart meter restored with kindness!');else if(n>10)setFeedback('Too much drama! Try a different move.');})}{btn('🫶 −1',()=>setMeter(v=>v-1))}</>; break;
    case 'crown': game=<><p>Royal reaction trial: tap the crown before the timer runs out. Every tap adds a point; reach {round.formula} points.</p><div style={{fontSize:30}}>{'👑 '.repeat(Math.min(turn,8))}</div>{btn('👑 TAP THE CROWN',()=>{const n=turn+1;setTurn(n);if(n>=round.formula)win('Royal reflexes approved! The crown is yours.');})}<p>Royal points: {turn}/{round.formula}</p></>; break;
    case 'decree': game=<><p>Seal the decree in this order: {round.order.join(' → ')}. Select the clauses in that order.</p>{round.decreeOptions.map(w=>btn(w,()=>{const n=[...picks,w];setPicks(n);if(n.length===round.order.length)check(n.join('|')===round.order.join('|'),'Decree sealed with honour!');},picks.length>=round.order.length))}<p>Chosen: {picks.join(' → ')}</p></>; break;
    case 'treasure': game=<><p>Find the treasure chest in the 3×3 royal garden. Hint: row {Math.floor(round.treasure/3)+1}.</p><div className="answer-grid">{Array.from({length:9},(_,i)=>btn(picks.includes(i)?(i===round.treasure?'💎':'·'):'🌿',()=>{setPicks(p=>[...p,i]);if(i===round.treasure)win('Treasure discovered! The real treasure is you.');else setFeedback('Empty patch! Try another spot.');}))}</div></>; break;
    case 'queen': { const riddle = round.riddle; game=<><p>Queen’s logic trial: {riddle.q}</p>{shuffle(riddle.opts).map(v=>btn(v,()=>check(v===riddle.ans,'The Queen approves your royal wisdom.')))}</>; break; }
    default: game=<><p>Choose the symbol that belongs to this adventure.</p>{round.symbols.map(s=>btn(s,()=>check(s===round.symbols[0],'Challenge complete!')))}</>;
  }
  return <div className="path-puzzle-panel">{heading}{game}{feedback && <p className="reaction-note" aria-live="polite">{feedback}</p>}{done && <div className="game-win"><span>{sub.icon}</span><h2>{sub.ending}</h2><p>Challenge cleared! Your gifts and unique ending are unlocked.</p><span className="game-win-stars">✦ ✧ 💗 ✧ ✦</span><div className="button-row centered-actions"><button className="btn primary" onClick={()=>{}}>Challenge complete ✓</button></div></div>}</div>;
}


function App() {
  const [screen, setScreen] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerReaction, setAnswerReaction] = useState('');
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [endingType, setEndingType] = useState('playful');
  const [mainPathId, setMainPathId] = useState('drama');
  const [subPathId, setSubPathId] = useState('attention');
  const [pathPuzzleInput, setPathPuzzleInput] = useState('');
  const [pathPuzzleSolved, setPathPuzzleSolved] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesToast, setYesToast] = useState('');
  const [openedGifts, setOpenedGifts] = useState([]);
  const [giftMessage, setGiftMessage] = useState('');
  const [giftRevealIndex, setGiftRevealIndex] = useState(null);
  const [giftRevealKey, setGiftRevealKey] = useState(0);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [glitchStarted, setGlitchStarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('Naseeha');
  const [sender, setSender] = useState('zawjii');
  const [letter, setLetter] = useState(ENDING_LETTERS.playful);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [sfxOn, setSfxOn] = useState(true);
  const [revealActive, setRevealActive] = useState(false);
  const [revealKey, setRevealKey] = useState(0);
  const [revealLabel, setRevealLabel] = useState('A LITTLE SURPRISE FOR NASEEHA');
  const audioRef = useRef(null);
  const [musicError, setMusicError] = useState('');
  const [confetti, setConfetti] = useState(false);
  const [routeGameComplete, setRouteGameComplete] = useState(false);
  const [memoryCards, setMemoryCards] = useState([]);
  const [memoryFlips, setMemoryFlips] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [sequencePicks, setSequencePicks] = useState([]);
  const [codeGuess, setCodeGuess] = useState('');
  const [gameFeedback, setGameFeedback] = useState('');
  const [secretAttempts, setSecretAttempts] = useState(0);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [heartGameActive, setHeartGameActive] = useState(false);
  const [heartTime, setHeartTime] = useState(15);
  const [heartsCaught, setHeartsCaught] = useState(0);
  const [caughtHeartIds, setCaughtHeartIds] = useState([]);
  const [heartGameWon, setHeartGameWon] = useState(false);
  const [letterOrder, setLetterOrder] = useState(['FOREVER', 'LOVE', 'HABIBI', 'YOU']);
  const [letterSolved, setLetterSolved] = useState(false);
  const [hiddenClues, setHiddenClues] = useState([]);
  const [bonusGiftUnlocked, setBonusGiftUnlocked] = useState(false);
  const [routeBonusSolved, setRouteBonusSolved] = useState(false);
  const [routeBonusPicks, setRouteBonusPicks] = useState([]);

  useEffect(() => () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; } }, []);

  const PIANO_TRACKS = {
    science: { title: 'Für Elise — piano', src: '/music/Für Elise — MP3.mp3' },
    spy: { title: 'Moonlight Sonata, Movement I — piano', src: '/music/Moonlight Sonata — MP3.mp3' },
    drama: { title: 'Gymnopédie No. 1 — piano', src: '/music/Gymnopédie No. 1 — MP3.mp3' },
    royal: { title: 'Gymnopédie No. 3 — piano', src: '/music/Gymnopédie No. 3 — MP3.mp3' },
  };

  useEffect(() => {
    if (!musicOn || !audioRef.current) return;
    const track = PIANO_TRACKS[mainPathId] || PIANO_TRACKS.drama;
    const audio = audioRef.current;
    if (audio.dataset.track !== track.src) {
      audio.pause(); audio.src = track.src; audio.dataset.track = track.src; audio.load();
    }
    audio.volume = 0.32; audio.loop = true;
    audio.play().then(() => setMusicError('')).catch(() => setMusicError('Could not load the piano recording. Check your internet connection or use the music button to retry.'));
  }, [mainPathId, musicOn]);

  useEffect(() => {
    if (!heartGameActive || heartGameWon || heartTime <= 0) return undefined;
    const timer = window.setInterval(() => setHeartTime(t => Math.max(0, t - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [heartGameActive, heartGameWon, heartTime]);

  useEffect(() => {
    if (heartTime === 0 && heartsCaught < 8) setHeartGameActive(false);
  }, [heartTime, heartsCaught]);

  const playCuteSound = (kind = 'click') => {
    if (!sfxOn) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const notes = kind === 'reveal'
        ? [{ f: 523.25, t: 0, d: .18 }, { f: 659.25, t: .12, d: .2 }, { f: 783.99, t: .24, d: .22 }, { f: 1046.5, t: .38, d: .32 }]
        : kind === 'gift'
        ? [{ f: 659.25, t: 0, d: .12 }, { f: 987.77, t: .1, d: .2 }]
        : [{ f: 880, t: 0, d: .065 }, { f: 1174.66, t: .055, d: .09 }];
      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(.0001, now + t);
        gain.gain.exponentialRampToValueAtTime(kind === 'reveal' ? .075 : .045, now + t + .015);
        gain.gain.exponentialRampToValueAtTime(.0001, now + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d + .02);
      });
      window.setTimeout(() => ctx.close?.(), kind === 'reveal' ? 1900 : 450);
    } catch { /* Audio is an optional enhancement; the game still works silently. */ }
  };

  const revealNames = ['BRIEFING UNLOCKED', 'QUIZ TIME, HABIBI', 'MINI-GAME UNLOCKED', 'MYSTERY GIFTS INCOMING', 'SECRET MISSIONS UNLOCKED', 'SYSTEM GLITCH DETECTED', 'THE TRUTH, NASEEHA'];
  const go = (next) => {
    setScreen(next);
    setAnswerReaction('');
    setRevealLabel(revealNames[next] || 'A LITTLE SURPRISE FOR NASEEHA');
    setRevealKey(v => v + 1);
    setRevealActive(true);
    playCuteSound('reveal');
    window.setTimeout(() => setRevealActive(false), 1850);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const start = (showWelcome = false) => {
    setQuestionIndex(0);
    setQuizAnswers([]);
    setEndingType('playful');
    setMainPathId('drama');
    setSubPathId('attention');
    setPathPuzzleInput('');
    setPathPuzzleSolved(false);
    setLetter(ENDING_LETTERS.playful);
    setOpenedGifts([]);
    setCompletedMissions([]);
    setNoCount(0);
    setGiftMessage('');
    setGiftRevealIndex(null);
    setGiftRevealKey(0);
    setYesToast('');
    setGlitchStarted(false);
    setRouteGameComplete(false);
    setMemoryCards(['💗', '👑', '🌙', '🗝️', '💗', '👑', '🌙', '🗝️'].sort(() => Math.random() - 0.5).map((emoji, id) => ({ id, emoji })));
    setMemoryFlips([]);
    setMatchedPairs([]);
    setSequencePicks([]);
    setCodeGuess('');
    setGameFeedback('');
    setSecretAttempts(0);
    setMemoryMoves(0);
    setHeartGameActive(false);
    setHeartTime(15);
    setHeartsCaught(0);
    setCaughtHeartIds([]);
    setHeartGameWon(false);
    setLetterOrder(['FOREVER', 'LOVE', 'HABIBI', 'YOU']);
    setLetterSolved(false);
    setHiddenClues([]);
    setBonusGiftUnlocked(false);
    setRouteBonusSolved(false);
    setRouteBonusPicks([]);
    if (!musicOn) startBackgroundMusic();
    go(showWelcome ? 0 : 1);
  };

  const answer = (choice, choiceIndex) => {
    const updatedAnswers = [...quizAnswers, choiceIndex];
    setQuizAnswers(updatedAnswers);
    setAnswerReaction(choice.reaction);
    window.setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        setQuestionIndex(v => v + 1);
        setAnswerReaction('');
      } else {
        const route = chooseEnding(updatedAnswers);
        setEndingType(route);
        setLetter(ENDING_LETTERS[route] || ENDING_LETTERS.playful);
        setRouteGameComplete(false);
        setMemoryCards(['💗', '👑', '🌙', '🗝️', '💗', '👑', '🌙', '🗝️'].sort(() => Math.random() - 0.5).map((emoji, id) => ({ id, emoji })));
        setMemoryFlips([]);
        setMatchedPairs([]);
        setSequencePicks([]);
        setCodeGuess('');
        setGameFeedback('');
        setSecretAttempts(0);
        setMemoryMoves(0);
    setHeartGameActive(false);
    setHeartTime(15);
    setHeartsCaught(0);
    setCaughtHeartIds([]);
    setHeartGameWon(false);
    setLetterOrder(['FOREVER', 'LOVE', 'HABIBI', 'YOU']);
    setLetterSolved(false);
    setHiddenClues([]);
    setBonusGiftUnlocked(false);
        go(2);
      }
    }, 1050);
  };


  const currentMainPath = ADVENTURE_PATHS.find(p => p.id === mainPathId) || ADVENTURE_PATHS[0];
  const currentSubPath = currentMainPath.subs.find(p => p.id === subPathId) || currentMainPath.subs[0];
  const chooseMainPath = (path) => {
    setMainPathId(path.id);
    setEndingType(path.id === 'science' ? 'secret' : path.id === 'spy' ? 'secret' : path.id === 'royal' ? 'playful' : 'soft');
    setSubPathId(path.subs[0].id);
    setPathPuzzleInput(''); setPathPuzzleSolved(false);
    go(7);
  };
  const chooseSubPath = (sub) => {
    setSubPathId(sub.id);
    setPathPuzzleInput(''); setPathPuzzleSolved(false); setRouteGameComplete(false);
    setLetter(`My habibi, Naseeha — my ulaga alagi. 💗\n\nYou chose “${sub.label}” inside “${currentMainPath.label},” and somehow even this little adventure became another way for zawjii to tell you how precious you are. Your ${sub.game.toLowerCase()} may be solved, the gifts may be opened, and the ending may be unique to this path, but the truth underneath it all stays the same: I love you so much and want to be with you forever — fi dunya wal aakhirat, Insha’Allah.\n\nWhatever world we enter, whatever puzzle life gives us, I hope we keep choosing kindness, patience, honesty, and each other.\n\nForever your zawjii. ❤️`);
    go(2);
  };
  const solvePathPuzzle = (event) => {
    event.preventDefault();
    if (pathPuzzleInput.trim().toUpperCase() === currentSubPath.code) {
      setPathPuzzleSolved(true); setRouteGameComplete(true);
      setGameFeedback(`PUZZLE SOLVED! ${currentSubPath.label} unlocked. Your path-specific gifts are ready, habibi. 💗`);
    } else setGameFeedback('Not quite, habibi. Try the clue again — the code is case-insensitive. 🔎');
  };

  const flipMemoryCard = (id) => {
    if (routeGameComplete || memoryFlips.includes(id) || matchedPairs.includes(id) || memoryFlips.length >= 2) return;
    const next = [...memoryFlips, id];
    setMemoryFlips(next);
    if (next.length === 2) setMemoryMoves(v => v + 1);
    if (next.length === 2) {
      const first = memoryCards.find(card => card.id === next[0]);
      const second = memoryCards.find(card => card.id === next[1]);
      if (first?.emoji === second?.emoji) {
        const matches = [...matchedPairs, ...next];
        setMatchedPairs(matches);
        setMemoryFlips([]);
        setGameFeedback('MATCH! Ulaga alagi has excellent detective skills. 👑');
        if (matches.length === memoryCards.length) {
          setRouteGameComplete(true);
          setGameFeedback(`All four pairs found in ${memoryMoves + 1} moves! Naseeha’s memory is dangerously powerful. 💗`);
        }
      } else {
        setGameFeedback('Not a match, habibi. Try another pair. 👀');
        window.setTimeout(() => setMemoryFlips(current => current.length === 2 ? [] : current), 750);
      }
    }
  };

  const pickSequence = (item) => {
    if (routeGameComplete || sequencePicks.includes(item)) return;
    const next = [...sequencePicks, item];
    setSequencePicks(next);
    const target = ['LISTEN', 'PATIENCE', 'CARE', 'KINDNESS', 'DUA'];
    if (next.some((value, i) => value !== target[i])) {
      setSequencePicks([]);
      setGameFeedback('Wrong order, habibi! The sequence has reset. Think carefully and try again. 🌷');
    } else if (next.length === target.length) {
      setRouteGameComplete(true);
      setGameFeedback('Five-step sequence cracked! A soft heart notices every detail. 🌷💗');
    }
  };

  const resetSequence = () => {
    setSequencePicks([]);
    setGameFeedback('Sequence reset. Try the five-step order: LISTEN, PATIENCE, CARE, KINDNESS, DUA. 🌷');
  };

  const submitSecretCode = () => {
    const attempts = secretAttempts + 1;
    setSecretAttempts(attempts);
    if (codeGuess.trim().toUpperCase() === 'HABIBI') {
      setRouteGameComplete(true);
      setGameFeedback('CIPHER CRACKED. You shifted every letter back three places and found HABIBI. ACCESS GRANTED, agent. 🔐💗');
    } else {
      setGameFeedback(attempts >= 3
        ? 'Extra hint unlocked, agent: decode KDELEL by shifting every letter 3 places BACK in the alphabet. Example: D becomes A.'
        : `ACCESS DENIED (${attempts}/3 attempts). Decode KDELEL: shift each letter 3 places BACK in the alphabet. 🕵️`);
    }
  };

  const dodgeNo = () => {
    setNoCount(v => v + 1);
    setYesToast(['The NO button is scared of Naseeha’s ulaga alagi authority. 😭', 'It said it needs a moment to recover from your beauty, habibi.', 'Even the button knows zawjii is committed to you, habibi.', 'Naseeha, this is getting embarrassing. Zawjii, stand up. 😂'][Math.min(noCount, 3)]);
  };

  const openGift = (index) => {
    if (openedGifts.includes(index)) return;
    setOpenedGifts(v => [...v, index]);
    playCuteSound('gift');
    const giftPack = makePathGifts(currentMainPath, currentSubPath);
    setGiftMessage(giftPack[index].result);
    setGiftRevealIndex(index);
    setGiftRevealKey(v => v + 1);
    playCuteSound('reveal');
  };

  const openNextGift = () => {
    const giftLimit = bonusGiftUnlocked ? selectedGifts.length : 3;
    const nextIndex = selectedGifts.slice(0, giftLimit).findIndex((_, index) => !openedGifts.includes(index));
    if (nextIndex !== -1) openGift(nextIndex);
  };

  const continueFromGiftReveal = () => {
    setGiftRevealIndex(null);
    setGiftMessage('');
    go(4);
  };

  const startHeartGame = () => {
    setHeartsCaught(0);
    setCaughtHeartIds([]);
    setHeartTime(15);
    setHeartGameWon(false);
    setHeartGameActive(true);
  };

  const catchHeart = (id) => {
    if (!heartGameActive || heartGameWon || caughtHeartIds.includes(id)) return;
    const next = heartsCaught + 1;
    setCaughtHeartIds(current => [...current, id]);
    setHeartsCaught(next);
    if (next >= 8) {
      setHeartGameWon(true);
      setHeartGameActive(false);
      setGameFeedback('Eight hearts caught! Zawjii has been defeated by your reflexes. 💗');
    }
  };

  const moveLetterWord = (from, to) => {
    if (letterSolved || from === to) return;
    setLetterOrder(current => {
      const next = [...current];
      const [word] = next.splice(from, 1);
      next.splice(to, 0, word);
      if (next.join(' ') === 'LOVE YOU HABIBI FOREVER') {
        setLetterSolved(true);
        setGameFeedback('Love letter reconstructed! The words were hiding in the wrong order. 💌');
      }
      return next;
    });
  };

  const tapRouteBonus = (value) => {
    if (routeBonusSolved) return;
    if (endingType === 'playful') {
      const expected = ['crown', 'cat', 'heart'];
      const next = [...routeBonusPicks, value];
      if (value !== expected[routeBonusPicks.length]) {
        setRouteBonusPicks([]);
        setGameFeedback('Wrong prank-file order! Start again: Crown → Cat → Heart. 👑');
        return;
      }
      setRouteBonusPicks(next);
      if (next.length === expected.length) {
        setRouteBonusSolved(true);
        setGameFeedback('Royal prank sequence cleared! The crown is officially yours. 👑💗');
      }
      return;
    }
    if (endingType === 'soft') {
      const next = routeBonusPicks.includes(value) ? routeBonusPicks : [...routeBonusPicks, value];
      setRouteBonusPicks(next);
      const needed = ['listen', 'patience', 'kindness'];
      if (needed.every(item => next.includes(item))) {
        setRouteBonusSolved(true);
        setGameFeedback('Your comfort bouquet is complete: listening, patience, and kindness. 🌷');
      }
      return;
    }
    if (value === 'truth') {
      setRouteBonusSolved(true);
      setRouteBonusPicks(['truth']);
      setGameFeedback('FILE DECRYPTED: the secret was always how much zawjii loves Naseeha. 🔐💗');
    } else {
      setRouteBonusPicks([]);
      setGameFeedback('Access denied. Look beyond the clues and choose the real secret. 🔐');
    }
  };

  const findHiddenClue = (id) => {
    if (hiddenClues.includes(id)) return;
    const next = [...hiddenClues, id];
    setHiddenClues(next);
    if (next.length === 3) {
      setBonusGiftUnlocked(true);
      setGameFeedback('ALL THREE HIDDEN CLUES FOUND! A fourth bonus gift has been unlocked. 🌟');
      openGift(3);
    }
  };

  const toggleMission = (index) => {
    setCompletedMissions(v => v.includes(index) ? v.filter(x => x !== index) : [...v, index]);
  };

  const startGlitch = () => {
    go(5);
    setGlitchStarted(true);
  };

  const finish = () => {
    go(6);
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 3500);
  };

  const copyLetter = async () => {
    const personalized = `${name.trim() ? `Hey ${name.trim()},\n\n` : ''}${letter}${sender.trim() ? `\n\n— ${sender.trim()}` : ''}`;
    try {
      await navigator.clipboard.writeText(personalized);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      alert('Clipboard access was blocked. Select the message and copy it manually.');
    }
  };

  const stopBackgroundMusic = () => {
    if (audioRef.current) audioRef.current.pause();
    setMusicOn(false);
  };

  const startBackgroundMusic = () => {
    setMusicError('');
    setMusicOn(true);
  };

  const toggleMusic = () => {
    if (musicOn) stopBackgroundMusic();
    else startBackgroundMusic();
  };

  const displayLetter = `${name.trim() ? `Hey ${name.trim()},\n\n` : ''}${letter}${sender.trim() ? `\n\n— ${sender.trim()}` : ''}`;
  const selectedEnding = { ...(ENDINGS[endingType] || ENDINGS.playful), title: currentSubPath.ending, emoji: currentSubPath.icon, label: `${currentMainPath.label.toUpperCase()} · ${currentSubPath.label.toUpperCase()}`, intro: `${currentMainPath.desc} You chose ${currentSubPath.label}. This ending belongs to your exact route, Naseeha.`, moment: `Your unique reward: ${currentSubPath.gift}. The path is yours, habibi — and so is the truth that zawjii loves you deeply.` };
  const selectedMissions = ROUTE_MISSIONS[endingType] || ROUTE_MISSIONS.playful;
  const selectedGifts = makePathGifts(currentMainPath, currentSubPath);

  return (
    <div className={`app-shell theme-${currentMainPath.theme}`} onClickCapture={(event) => { if (event.target.closest("button") && !event.target.closest("button")?.disabled) playCuteSound("click"); }}>
      <audio ref={audioRef} preload="none" aria-label="Background piano music" />
      <FloatingHearts />
      {revealActive && <div key={revealKey} className="reveal-overlay" aria-live="polite" aria-label={revealLabel}>
        <div className="reveal-glow" />
        {Array.from({ length: 46 }, (_, i) => <span key={i} className={`burst-heart burst-heart-${i % 6}`} style={{ '--i': i, '--angle': `${i * 137.5}deg`, '--delay': `${(i % 9) * 0.018}s` }}>{['💗','💖','💕','♡','✨','🌸','💘'][i % 7]}</span>)}
        <div className="reveal-message"><span>✦　♡　✦</span><strong>{revealLabel}</strong><small>made with love by zawjii</small></div>
      </div>}
      {giftRevealIndex !== null && <div className="gift-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="gift-modal-title">
        <div key={giftRevealKey} className="gift-modal">
          <div className="gift-modal-sparkles" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ '--i': i, '--delay': `${(i % 8) * .045}s` }}>{['💗','✨','💕','🌸','💖'][i % 5]}</span>)}</div>
          <div className="gift-modal-topline"><Sparkles size={16} /> GIFT {giftRevealIndex + 1} OF {bonusGiftUnlocked ? 4 : 3} REVEALED <Sparkles size={16} /></div>
          <div className="gift-modal-emoji">{selectedGifts[giftRevealIndex]?.icon}</div>
          <h2 id="gift-modal-title">{selectedGifts[giftRevealIndex]?.title}</h2>
          <p className="gift-modal-message">{giftMessage}</p>
          <div className="gift-modal-progress">{openedGifts.length} of {bonusGiftUnlocked ? 4 : 3} gifts discovered</div>
          <div className="gift-modal-actions">
            {screen === 4 && giftRevealIndex === 3
              ? <button className="btn primary" onClick={() => { setGiftRevealIndex(null); setGiftMessage(''); }}>Keep the bonus gift <Heart size={17} fill="currentColor" /></button>
              : openedGifts.length < (bonusGiftUnlocked ? 4 : 3)
                ? <button className="btn primary" onClick={openNextGift}><Gift size={17} /> Open next gift <ArrowRight size={17} /></button>
                : <button className="btn primary" onClick={continueFromGiftReveal}>Continue to secret missions <Heart size={17} fill="currentColor" /></button>}
            <p>{screen === 4 && giftRevealIndex === 3 ? 'You found the secret bonus gift! Close this reveal when you are ready.' : openedGifts.length < (bonusGiftUnlocked ? 4 : 3) ? 'This reveal will stay right here until you are ready for the next one.' : 'All gifts discovered! Tap when you are ready to continue.'}</p>
          </div>
        </div>
      </div>}
      {confetti && <div className="confetti" aria-hidden="true">{Array.from({ length: 38 }, (_, i) => <span key={i} style={{ left: `${(i * 29) % 100}%`, animationDelay: `${(i % 9) * .11}s` }}>{['💗','✨','🌷','🎉','♡'][i % 5]}</span>)}</div>}
      <div className="site-wrap">
        <nav className="topbar">
          <div className="brand"><span className="brand-mark"><Heart size={16} fill="currentColor" /></span> CUPID LABS <span className="tm">™</span></div>
          <div className="nav-actions">
            <span className="status-pill"><span className="status-dot" /> Zawjii is acting normal 🤨</span>
            <button className="icon-btn" onClick={() => setSfxOn(v => !v)} aria-label={sfxOn ? 'Mute cute sound effects' : 'Enable cute sound effects'} title={sfxOn ? 'Mute button sounds' : 'Enable button sounds'}>
              {sfxOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
            <button className="icon-btn" onClick={toggleMusic} aria-label={musicOn ? 'Stop melody' : 'Play tiny melody'} title="Play classical piano music">
              {musicOn ? <VolumeX size={17} /> : <Music2 size={17} />}
            </button>
          </div>
        </nav>

        <header className="hero">
          <div className="eyebrow-chip"><Sparkles size={14} /> A tiny game made by zawjii for Naseeha</div>
          <h1>Operation:<br /><span>Cupid Chaos</span> <span className="title-heart">♥</span></h1>
          <p>A scientifically questionable mission from zawjii to his habibi. Survive the pranks, claim your ulaga alagi crown, and uncover the very obvious truth.</p>
          <div className="hero-stickers"><span>100% certified silliness</span><span>♡ built with affection</span><span>0% government funding</span></div>
        </header>

        {screen > 0 && screen < 6 && (
          <div className="step-track" aria-label={`Step ${screen + 1} of ${STEPS.length}`}>
            {STEPS.slice(1, 6).map((s, i) => <div key={s} className={`step-dot ${screen >= i + 1 ? 'current' : ''}`}><span>{i + 1}</span><small>{s}</small></div>)}
          </div>
        )}

        <main className={`game-card route-${endingType} theme-${currentMainPath.theme} ${screen === 6 ? 'ending-card' : ''}`}>
          {screen === 0 && <section className="screen-content">
            <div className="big-emoji">🕵️‍♀️💌</div>
            <div className="eyebrow">Agent onboarding</div>
            <h2>Welcome, Naseeha — Agent Ulaga Alagi. 👑</h2>
            <p className="body-copy">Habibi, your zawjii has recruited you for a top-secret mission. Expect silly surprises, fake gifts, affectionate ulaga alagi slander, and a confession he definitely could have delivered without building an entire website. 😭</p>
            <div className="warning-box"><ShieldAlert size={20} /><span><strong>Warning:</strong> Side effects may include giggling, eye-rolling, being called ulaga alagi, and discovering that your zawjii is embarrassingly, ridiculously fond of you.</span></div>
            <div className="button-row">
              <button className="btn primary" onClick={() => start()}>Accept mission <ArrowRight size={17} /></button>
              <button className="btn secondary" onClick={() => setYesToast('Naseeha’s suspicion has been logged. Zawjii is sweating. The hamster has requested a transfer. 🐹')}>I'm suspicious 🤨</button>
            </div>
            {yesToast && <div className="reaction-note">{yesToast}</div>}
            <div className="bottom-note"><LockKeyhole size={13} /> No sign-up. No tracking. Just nonsense.</div>
          </section>}

          {screen === 1 && <section className="screen-content">
            <div className="level-header"><span className="level-tag">CHOOSE YOUR WORLD</span><span>4 main adventures <Heart size={14} /></span></div>
            <div className="big-emoji">💌✨</div>
            <h2>Naseeha, choose your adventure, habibi.</h2>
            <p className="body-copy">Every world has four secondary paths. Your choice changes the theme, puzzle, gifts, ending, and final letter. Choose wisely. 👀</p>
            <div className="answer-grid">{ADVENTURE_PATHS.map(path => <button className={`answer-card path-main-card theme-${path.theme}`} key={path.id} onClick={() => chooseMainPath(path)}><span className="answer-emoji">{path.icon}</span><span>{path.label}</span><ArrowRight size={16} className="answer-arrow" /></button>)}</div>
          </section>}

          {screen === 7 && <section className={`screen-content theme-${currentMainPath.theme}`}>
            <div className="level-header"><span className="level-tag">{currentMainPath.tagline}</span><span>Choose a side quest ✦</span></div>
            <div className="big-emoji">{currentMainPath.icon}</div>
            <h2>{currentMainPath.label}: pick your next move</h2>
            <p className="body-copy">{currentMainPath.desc} Now choose one of four unique adventures. This choice determines your puzzle, gifts, and ending.</p>
            <div className="answer-grid">{currentMainPath.subs.map(sub => <button className="answer-card" key={sub.id} onClick={() => chooseSubPath(sub)}><span className="answer-emoji">{sub.icon}</span><span>{sub.label}</span><ArrowRight size={16} className="answer-arrow" /></button>)}</div>
            <div className="button-row"><button className="btn secondary" onClick={() => go(1)}>← Back to the four worlds</button></div>
          </section>}

          {screen === 2 && <section className={`screen-content theme-${currentMainPath.theme}`}>
            <div className="level-header"><span className="level-tag">PATH CHALLENGE</span><span>{currentMainPath.tagline}</span></div>
            <div className="big-emoji">{currentSubPath.symbols.join(' ')}</div>
            <h2>{currentSubPath.game}</h2>
            <p className="body-copy">{currentMainPath.desc} This challenge has its own mechanic and generates a fresh pattern when you enter it again.</p>
            {!pathPuzzleSolved ? <PathMiniGame key={`${currentMainPath.id}-${currentSubPath.id}`} sub={currentSubPath} onWin={() => { setPathPuzzleSolved(true); setRouteGameComplete(true); setGameFeedback(`${currentSubPath.ending} unlocked!`); }} /> : <div className="game-win"><span>{currentSubPath.icon}</span><h2>{currentSubPath.ending}</h2><p>{currentSubPath.label} complete! Your gifts and ending are ready.</p><span className="game-win-stars">✦ ✧ 💗 ✧ ✦</span><div className="button-row centered-actions"><button className="btn primary" onClick={()=>go(3)}>Reveal my path gifts <ArrowRight size={16}/></button></div></div>}
          </section>}

          {screen === 3 && <section className="screen-content">
            <div className="level-header"><span className="level-tag">LEVEL 3</span><span>Mystery prize department <Gift size={14} /></span></div>
            <div className="big-emoji">🎁</div>
            <h2>Choose your mystery gift, Ulaga Alagi. 👑</h2>
            <p className="body-copy">Your route has three unique gifts. Find all three hidden clues in the mission room to unlock a fourth bonus gift. 😌</p>
            <div className="gift-grid">{selectedGifts.slice(0, bonusGiftUnlocked ? 4 : 3).map((g, i) =>
              <button className={`gift-card ${openedGifts.includes(i) ? 'opened' : ''}`} key={g.label} onClick={() => openGift(i)} disabled={openedGifts.includes(i)}>
                <span className="gift-emoji">{g.icon}</span>
                <span>{openedGifts.includes(i) ? 'Opened!' : g.label}</span>
                {openedGifts.includes(i) && <Check size={15} />}
              </button>
            )}</div>
            <div className="mini-progress">{openedGifts.length}/{bonusGiftUnlocked ? 4 : 3} gifts investigated <span><i style={{ width: `${openedGifts.length / (bonusGiftUnlocked ? 4 : 3) * 100}%` }} /></span></div>
            <div className="button-row"><button className="btn primary" disabled={openedGifts.length < (bonusGiftUnlocked ? 4 : 3) || giftRevealIndex !== null} onClick={() => go(4)}>Continue mission <ArrowRight size={17} /></button></div>
          </section>}

          {screen === 4 && <section className="screen-content">
            <div className="level-header"><span className="level-tag">LEVEL 4</span><span>Secret agent nonsense <Cat size={14} /></span></div>
            <div className="big-emoji">🔎🐈</div>
            <h2>{endingType === 'soft' ? 'Three tiny acts of tenderness. 🌷' : endingType === 'secret' ? 'Secret-route investigations. 🔐' : 'Naseeha’s Official Ulaga Alagi Missions.'}</h2>
            <p className="body-copy">{endingType === 'soft' ? 'Build a comfort bouquet, find the garden symbols, and complete your tenderness missions.' : endingType === 'secret' ? 'Investigate the classified file, find the security markers, and uncover the hidden truth.' : 'Restore the royal prank sequence, uncover the hidden clues, and complete your ulaga alagi missions.'}</p>
            <div className="bonus-challenges route-bonus-challenges">
              {endingType === 'playful' && <div className="challenge-panel route-bonus-panel">
                <div className="challenge-heading"><span>👑</span><div><h3>Royal Prank File: Restore the Order</h3><p>Tap the files in the correct order: Crown → Cat → Heart. One wrong tap resets the combo.</p></div></div>
                <div className="route-choice-grid">
                  {[{id:'crown',icon:'👑',label:'Crown file'},{id:'cat',icon:'🐈',label:'Cat file'},{id:'heart',icon:'💗',label:'Heart file'}].map(item =>
                    <button key={item.id} className={`route-choice ${routeBonusPicks.includes(item.id) ? 'picked' : ''}`} onClick={() => tapRouteBonus(item.id)} disabled={routeBonusSolved}>{item.icon}<span>{item.label}</span></button>
                  )}
                </div>
                <p className="clue-progress">{routeBonusSolved ? 'Royal sequence restored — bonus mission cleared! ✨' : `Sequence progress: ${routeBonusPicks.length}/3`}</p>
              </div>}
              {endingType === 'soft' && <div className="challenge-panel route-bonus-panel">
                <div className="challenge-heading"><span>🌷</span><div><h3>The Comfort Bouquet</h3><p>Choose the three things that make love feel safe: listening, patience, and kindness.</p></div></div>
                <div className="route-choice-grid">
                  {[{id:'listen',icon:'👂',label:'Listening'},{id:'patience',icon:'🌷',label:'Patience'},{id:'kindness',icon:'🌼',label:'Kindness'},{id:'loud',icon:'📣',label:'Loud arguments'},{id:'pride',icon:'🪞',label:'Being right'},{id:'rush',icon:'⏩',label:'Rushing feelings'}].map(item =>
                    <button key={item.id} className={`route-choice ${routeBonusPicks.includes(item.id) ? 'picked' : ''}`} onClick={() => tapRouteBonus(item.id)} disabled={routeBonusSolved || routeBonusPicks.includes(item.id)}>{item.icon}<span>{item.label}</span></button>
                  )}
                </div>
                <p className="clue-progress">{routeBonusSolved ? 'A bouquet of care, just for habibi. 🌷' : `${routeBonusPicks.length}/3 good things chosen`}</p>
              </div>}
              {endingType === 'secret' && <div className="challenge-panel route-bonus-panel">
                <div className="challenge-heading"><span>🔐</span><div><h3>Classified File: What Was the Real Secret?</h3><p>The decoys are convincing. Select the truth that explains this whole operation.</p></div></div>
                <div className="route-choice-grid secret-choice-grid">
                  {[{id:'hamster',icon:'🐹',label:'The hamster took over'},{id:'gift',icon:'🎁',label:'The gifts were the point'},{id:'code',icon:'💻',label:'The code was the secret'},{id:'truth',icon:'❤️',label:'Zawjii loves Naseeha'}].map(item =>
                    <button key={item.id} className={`route-choice ${routeBonusPicks.includes(item.id) ? 'picked' : ''}`} onClick={() => tapRouteBonus(item.id)} disabled={routeBonusSolved}>{item.icon}<span>{item.label}</span></button>
                  )}
                </div>
                <p className="clue-progress">{routeBonusSolved ? 'TRUE FILE OPENED. ACCESS GRANTED. 💗' : 'Choose carefully, agent.'}</p>
              </div>}
              <div className="challenge-panel clue-panel">
                <div className="challenge-heading"><span>{endingType === 'soft' ? '🌼' : endingType === 'secret' ? '🕵️' : '🔎'}</span><div><h3>{endingType === 'soft' ? 'Find the Garden Symbols' : endingType === 'secret' ? 'Locate the Security Markers' : 'Find the Hidden Prank Clues'}</h3><p>{endingType === 'soft' ? 'Find the flower, heart, and star to reveal your bonus gift.' : endingType === 'secret' ? 'Find the key, eye, and moon to expose the hidden bonus file.' : 'Find the moon, key, and sparkle to unlock the fourth gift.'}</p></div></div>
                <div className="hidden-clue-row">
                  {(endingType === 'soft'
                    ? [{id:'moon',icon:'🌼',label:'Flower clue'},{id:'key',icon:'💗',label:'Heart clue'},{id:'sparkle',icon:'⭐',label:'Star clue'}]
                    : endingType === 'secret'
                    ? [{id:'moon',icon:'🗝️',label:'Key clue'},{id:'key',icon:'👁️',label:'Eye clue'},{id:'sparkle',icon:'🌙',label:'Moon clue'}]
                    : [{id:'moon',icon:'🌙',label:'Moon clue'},{id:'key',icon:'🗝️',label:'Key clue'},{id:'sparkle',icon:'✨',label:'Sparkle clue'}]
                  ).map(clue => <button key={clue.id} className={`hidden-clue ${hiddenClues.includes(clue.id) ? 'found' : ''}`} onClick={() => findHiddenClue(clue.id)} aria-label={clue.label}>{hiddenClues.includes(clue.id) ? clue.icon : '❔'}</button>)}
                </div>
                <p className="clue-progress">{hiddenClues.length}/3 clues found {bonusGiftUnlocked ? '— BONUS GIFT UNLOCKED!' : '— keep searching.'}</p>
              </div>
            </div>
            <div className="mission-list">{selectedMissions.map((m, i) =>
              <button className={`mission-card ${completedMissions.includes(i) ? 'complete' : ''}`} key={m.label} onClick={() => toggleMission(i)}>
                <span className="mission-emoji">{m.icon}</span><span>{m.label}</span><span className="mission-check">{completedMissions.includes(i) ? <Check size={18} /> : '＋'}</span>
              </button>
            )}</div>
            <div className="mission-status"><div className="progress-track"><span style={{ width: `${completedMissions.length / MISSIONS.length * 100}%` }} /></div><span>{completedMissions.length} of 3 missions complete · {routeBonusSolved && bonusGiftUnlocked && openedGifts.length >= 4 ? 'all route challenges cleared' : 'route challenges still active'}</span></div>
            <div className="button-row"><button className="btn primary" disabled={completedMissions.length < 3 || !routeBonusSolved || !bonusGiftUnlocked || openedGifts.length < 4} onClick={startGlitch}>Unlock final level <LockKeyhole size={16} /></button></div>
          </section>}

          {screen === 5 && <section className="screen-content glitch-screen">
            <div className="level-header"><span className="level-tag">SYSTEM STATUS</span><span>Definitely fine <ShieldAlert size={14} /></span></div>
            <div className={`big-emoji ${glitchStarted ? 'wiggle' : ''}`}>🚨💗</div>
            <h2>{endingType === 'soft' ? 'The system found something tender. 🥹' : endingType === 'secret' ? 'SECRET ROUTE BREACH DETECTED. 🔐' : 'Uh-oh, Naseeha… the system found zawjii’s secret.'}</h2>
            <p className="body-copy">{endingType === 'soft' ? 'Please remain calm, habibi. The system has detected a promise to keep showing up with patience, kindness, and love.' : endingType === 'secret' ? 'Naseeha, you bypassed the prank firewall. The hidden file contains one truth: zawjii would choose you again and again, fi dunya wal aakhirat, Insha’Allah.' : 'Please remain calm, habibi. The computer has discovered that zawjii is hopelessly in love and has filed a formal complaint.'}</p>
            <div className="terminal"><div className="terminal-top"><i /><i /><i /><span>cupid_diagnostics.exe</span></div><div className="terminal-lines">
              <p>&gt; prank engine... <b>COMPLETE</b></p>
              <p>&gt; ulaga alagi status... <b>CONFIRMED 👑</b></p>
              <p>&gt; recipient... <b>NASEEHA 💗</b></p>
              <p>&gt; scanning website source...</p>
              <p className="terminal-warning">&gt; warning: zawjii affection levels are dangerously high</p>
              <p className="terminal-warning">&gt; error: zawjii cannot stop calling Naseeha habibi</p>
              <p>&gt; initiating emergency honesty protocol<span className="cursor">_</span></p>
            </div></div>
            <div className="button-row"><button className="btn primary" onClick={finish}>Okay, tell me <Heart size={16} fill="currentColor" /></button></div>
          </section>}

          {screen === 6 && <section className="screen-content ending-content">
            <div className="ending-stamp"><PartyPopper size={17} /> MISSION COMPLETE <PartyPopper size={17} /></div>
            <div className="big-emoji ending-emoji">{selectedEnding.emoji}</div>
            <div className="ending-stamp"><Sparkles size={16} /> {selectedEnding.label} <Sparkles size={16} /></div>
            <h2>{selectedEnding.title}</h2>
            <p className="body-copy">{selectedEnding.intro}</p>
            <div className="reveal-box ending-reveal"><Heart size={18} fill="currentColor" /><span>{selectedEnding.moment}</span></div>
            <p className="body-copy">Different route, different confession. This one is yours, habibi. 💗</p>
            <div className="letter-paper">
              <div className="letter-decoration">♡　✦　♡</div>
              <div className="letter-text">{displayLetter}</div>
              <div className="letter-sign">forever your zawjii · fi dunya wal aakhirat, Insha'Allah ♡</div>
            </div>
            <div className="postscript">Your ending came from {currentMainPath.label} → {currentSubPath.label}. This exact combination has its own challenge, gifts, theme, and final letter. P.S. The hamster has resigned. 🐹💗</div>
            <div className="button-row centered-actions ending-replay-row">
              <button className="btn primary" onClick={() => start(true)}><RotateCcw size={17} /> Play again from the beginning</button>
            </div>
          </section>}
        </main>
        <footer className="footer"><span>♡ made with suspicious amounts of affection</span><span>no hamsters were harmed</span></footer>
      </div>
    </div>
  );
}

export default App;

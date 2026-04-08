// ─── DOM ───────────────────────────────────────────────────────────────────
const feed         = document.getElementById('feed');
const focusBtn     = document.getElementById('focusBtn');
const timerPill    = document.getElementById('timerPill');
const timerText    = document.getElementById('timerText');
const taskInput    = document.getElementById('taskInput');
const addTaskBtn   = document.getElementById('addTask');
const taskList     = document.getElementById('taskList');
const taskPanel    = document.getElementById('taskPanel');
const taskOverlay  = document.getElementById('taskOverlay');
const rightActions = document.getElementById('right-actions');
const heartsEl     = document.getElementById('heartsContainer');
const toastEl      = document.getElementById('toast');
const taskBadge    = document.getElementById('taskBadge');

// ─── CONTENT ───────────────────────────────────────────────────────────────
const FUN = [
  { emoji:'📖', text:'POV: you actually opened your textbook',           user:'@studygrind',       song:'Pages Turning',      tags:['#study','#foryou','#studentlife'] },
  { emoji:'✏️', text:'That feeling when you finish\nan assignment early', user:'@aheadofschedule',  song:'Early Bird',         tags:['#productive','#winning','#fyp'] },
  { emoji:'🧠', text:'Your brain after a solid\n2 hour study session',   user:'@bigbrain.mode',    song:'Neural Pathways',    tags:['#studytok','#brainpower','#viral'] },
  { emoji:'☕', text:'Coffee + notes + focus\nthe holy trinity',          user:'@studycafe_',       song:'Lo-fi Study Beats',  tags:['#studywithme','#coffee','#foryoupage'] },
  { emoji:'📅', text:'Planned my whole week on Sunday.\nActually followed it.', user:'@plannergang', song:'Organized Life',  tags:['#planner','#goals','#fyp'] },
  { emoji:'🏆', text:'Submitted the assignment\n2 days before the deadline.', user:'@notlastminute', song:'Champion',        tags:['#winning','#earlybird','#fyp'] },
  { emoji:'🌅', text:'Woke up at 6am to study.\nThis is the way.',        user:'@morninggrind',     song:'Rise and Grind',    tags:['#6am','#morningroutine','#relatable'] },
  { emoji:'📝', text:'Finished all my notes\nbefore the lecture ended',   user:'@fastnotes_irl',    song:'Speed Run',         tags:['#notes','#studytok','#foryou'] },
  { emoji:'🎯', text:'Set a goal. Made a plan.\nExecuted. No excuses.',   user:'@goaldigger',       song:'Mission Complete',   tags:['#goals','#discipline','#fyp'] },
  { emoji:'💡', text:'That moment a concept\nfinally clicks',             user:'@eureka.moment',    song:'Light Bulb',         tags:['#learning','#studytok','#help'] },
  { emoji:'📚', text:'Read 30 pages today.\nYour future self says thanks.',user:'@bookworm.mode',   song:'Knowledge Drop',    tags:['#reading','#growth','#fyp'] },
  { emoji:'🔥', text:'Day 7 of studying consistently.\nStreak intact.',   user:'@streakkeeper',     song:'On Fire',            tags:['#streak','#consistent','#relatable'] },
];

const INTERVENTIONS = [
  { emoji:'🚨', text:'CLOSE THIS APP.\nOpen your notes. Right now.',       user:'@alarm.system',    song:'Emergency Alert',   tags:['#emergency','#study','#now'],      type:'intervention', effect:'glitch' },
  { emoji:'📚', text:'You have an assignment due.\nStop scrolling.',        user:'@deadlines.exe',   song:'Due Tomorrow',      tags:['#deadline','#study','#urgent'],    type:'intervention', effect:'shake'  },
  { emoji:'😤', text:'Your future self is watching.\nThey are not happy.', user:'@future.you',      song:'Regret Hours',      tags:['#future','#regret','#motivation'], type:'intervention', effect:'shake'  },
  { emoji:'⏰', text:'Every scroll = 1 minute\nyou could have studied.',   user:'@time.thief',      song:'Tick Tock',         tags:['#time','#wasted','#truth'],        type:'intervention', effect:'glitch' },
  { emoji:'😰', text:'The exam is in HOW many days?\nGo. Study. Now.',     user:'@exam.countdown',  song:'Panic Mode',        tags:['#exam','#panic','#study'],         type:'intervention', effect:'glitch' },
  { emoji:'🪞', text:'Is this what a top student\nlooks like? Go prove it.',user:'@mirror.talk',    song:'Self Reflect',      tags:['#mirror','#growth','#motivation'], type:'intervention', effect:'shake'  },
  { emoji:'💸', text:'You are paying for this education.\nAct like it.',   user:'@tuition.fees',    song:'Money Well Spent',  tags:['#college','#tuition','#wakeup'],   type:'intervention', effect:'shake'  },
  { emoji:'📉', text:'Your grades called.\nThey miss you.',                 user:'@gradebook.exe',   song:'Declining Fast',    tags:['#grades','#study','#facts'],       type:'intervention', effect:'glitch' },
  { emoji:'🧨', text:'Deadline in 24 hours.\nWhy are you still here?',     user:'@countdown.app',   song:'Final Hours',       tags:['#deadline','#urgent','#goStudy'],  type:'intervention', effect:'glitch' },
  { emoji:'👀', text:'Your professor can see\nyour submission time.',       user:'@professor.mode',  song:'Caught In 4K',      tags:['#professor','#busted','#study'],   type:'intervention', effect:'shake'  },
];

const FOCUS_WARNS = [
  { emoji:'🔒', text:'Focus mode is ON.\nDo not touch this feed.',                        user:'@focus.mode',   song:'Deep Work',       tags:['#focus','#locked','#grind'],    type:'focus-warning', effect:'none'  },
  { emoji:'😡', text:'YOU ARE SUPPOSED\nTO BE STUDYING.',                                 user:'@angry.timer',  song:'No Distractions', tags:['#focus','#discipline','#now'],  type:'focus-warning', effect:'shake' },
  { emoji:'🧘', text:'25 minutes of focus.\nYou can do this.',                            user:'@zen.mode',     song:'Focus Frequency', tags:['#breathe','#focus','#calm'],    type:'focus-warning', effect:'none'  },
  { emoji:'💪', text:'Every minute you study now\nsaves an hour of panic later.',         user:'@pomodoro.pro', song:'Grind Season',    tags:['#pomodoro','#25min','#focus'],  type:'focus-warning', effect:'none'  },
  { emoji:'📵', text:'Phone down.\nNotes open. Go.',                                      user:'@strict.mode',  song:'No Phone Zone',   tags:['#phonedown','#focus','#study'], type:'focus-warning', effect:'shake' },
];

const BG_TYPES = ['fun','fun2','fun3','fun4','fun5','fun6'];

const PFPS = [
  'pfps/memes/meme1.png',
  'pfps/memes/meme2.png',
  'pfps/memes/meme3.png',
];
let pfpIndex = 0;
function nextPfp() { return PFPS[pfpIndex++ % PFPS.length]; }

// ─── STATE ─────────────────────────────────────────────────────────────────
let scrollIdx    = 0;
let lastInject   = -1;
let sessionStart = Date.now();
let lastTimeMins = 0;
let focusActive  = false;
let focusIv      = null;
let focusSecs    = 25 * 60;
let toastTimer   = null;
const postState  = {};

// ─── STORAGE ───────────────────────────────────────────────────────────────
const getTasks  = () => JSON.parse(localStorage.getItem('tasks') || '[]');
const saveTasks = t  => localStorage.setItem('tasks', JSON.stringify(t));

// ─── MAKE CARD ─────────────────────────────────────────────────────────────
function makeCard(data, typeOverride) {
  const type  = typeOverride || data.type || BG_TYPES[Math.floor(Math.random() * BG_TYPES.length)];
  const idx   = feed.children.length;
  const likes = data.likes    || randCount(10, 900, 'K');
  const cmts  = data.comments || randCount(1, 300, 'K');
  const tags  = (data.tags || []).map(t => `<span>${t}</span>`).join('');
  const lines = data.text.split('\n');
  const song  = data.song || 'Original Sound';
  const ticker = song + ' · ' + song + ' · ' + song + ' · ';
  const pfp   = nextPfp();

  postState[idx] = { liked: false, likes: parseInt(likes) || 0, bookmarked: false };

  const card = document.createElement('div');
  card.className = 'post ' + type;
  card.dataset.idx    = idx;
  card.dataset.effect = data.effect || 'none';

  card.innerHTML =
    '<div class="post-bg"></div>' +
    '<div class="post-overlay"></div>' +
    '<div class="post-info">' +
      '<div class="post-username">' +
        '<img class="post-pfp" src="' + pfp + '" alt="pfp"/>' +
        (data.user || '@user') +
        '<button class="follow-btn">Follow</button>' +
      '</div>' +
      '<div class="post-caption">' +
        '<span class="big-text" data-text="' + lines[0] + '">' + lines[0] + '</span>' +
        (lines[1] ? '<span class="sub-text">' + lines[1] + '</span>' : '') +
      '</div>' +
      '<div class="post-hashtags">' + tags + '</div>' +
      '<div class="post-music">' +
        '<span>&#9835;</span>' +
        '<div class="music-ticker"><span class="music-ticker-inner">' + ticker + ticker + '</span></div>' +
        '<div class="sound-wave"><span></span><span></span><span></span><span></span><span></span></div>' +
      '</div>' +
    '</div>';

  bindCard(card, idx);
  return card;
}

function randCount(min, max, suffix) {
  const n = Math.floor(Math.random() * (max - min) + min);
  return n >= 1000 ? (n / 1000).toFixed(1) + suffix : String(n);
}

// ─── BIND CARD EVENTS ──────────────────────────────────────────────────────
function bindCard(card, idx) {
  card.querySelector('.follow-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const following = this.classList.toggle('following');
    this.textContent = following ? 'Following' : 'Follow';
    if (following) showToast('Followed! Stay motivated together.');
  });

  let lastTap = 0;
  card.addEventListener('click', function(e) {
    if (e.target.closest('.follow-btn')) return;
    const now = Date.now();
    if (now - lastTap < 300) doLike(idx, card);
    lastTap = now;
  });
}

// ─── RIGHT SIDEBAR ─────────────────────────────────────────────────────────
function updateSidebar(idx) {
  const state  = postState[idx] || { liked: false, likes: 0, bookmarked: false };
  const cards  = feed.querySelectorAll('.post');
  const card   = cards[idx];
  const pfpSrc = card ? (card.querySelector('.post-pfp') ? card.querySelector('.post-pfp').src : '') : '';

  const avatarInner = pfpSrc
    ? '<img src="' + pfpSrc + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>'
    : '&#128578;';

  rightActions.innerHTML =
    '<div class="r-avatar-wrap">' +
      '<div class="r-avatar">' + avatarInner + '</div>' +
      '<div class="r-avatar-plus">+</div>' +
    '</div>' +
    '<div class="r-action ' + (state.liked ? 'liked' : '') + '" id="ra-like">' +
      '<div class="r-icon">' + (state.liked ? '&#10084;&#65039;' : '&#129293;') + '</div>' +
      '<span class="r-count">' + state.likes + '</span>' +
    '</div>' +
    '<div class="r-action" id="ra-comment">' +
      '<div class="r-icon">&#128172;</div>' +
      '<span class="r-count">Tasks</span>' +
    '</div>' +
    '<div class="r-action" id="ra-share">' +
      '<div class="r-icon">&#8599;&#65039;</div>' +
      '<span class="r-count">Share</span>' +
    '</div>' +
    '<div class="r-action ' + (state.bookmarked ? 'liked' : '') + '" id="ra-bookmark">' +
      '<div class="r-icon">&#128278;</div>' +
      '<span class="r-count">Save</span>' +
    '</div>' +
    '<div class="r-disc">&#127925;</div>';

  document.getElementById('ra-like').addEventListener('click', function() {
    doLike(idx, feed.querySelectorAll('.post')[idx]);
  });
  document.getElementById('ra-comment').addEventListener('click', function() {
    openTaskPanel();
    showToast('Add your study tasks here!');
  });
  document.getElementById('ra-share').addEventListener('click', function() {
    showToast('Link copied! Share the grind.');
  });
  document.getElementById('ra-bookmark').addEventListener('click', function() {
    state.bookmarked = !state.bookmarked;
    showToast(state.bookmarked ? 'Saved to study list!' : 'Removed from saved');
    updateSidebar(idx);
  });
  document.querySelector('.r-avatar-plus').addEventListener('click', function() {
    showToast('Followed! Stay motivated together.');
  });
}

function doLike(idx, card) {
  const state = postState[idx];
  if (!state) return;
  state.liked  = !state.liked;
  state.likes += state.liked ? 1 : -1;
  if (state.liked && card) { spawnLikeFlash(card); spawnHearts(card); }
  updateSidebar(idx);
}

function spawnLikeFlash(card) {
  const el = document.createElement('div');
  el.className   = 'like-flash';
  el.textContent = '❤️';
  card.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function spawnHearts(card) {
  const rect = card.getBoundingClientRect();
  ['❤️','🧡','💕','💖'].forEach(function(h, i) {
    setTimeout(function() {
      const el = document.createElement('div');
      el.className   = 'floating-heart';
      el.textContent = h;
      el.style.left  = (rect.left + rect.width  * 0.5 + (Math.random() - 0.5) * 80) + 'px';
      el.style.top   = (rect.top  + rect.height * 0.6 + (Math.random() - 0.5) * 40) + 'px';
      el.style.animationDuration = (0.7 + Math.random() * 0.4) + 's';
      heartsEl.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    }, i * 70);
  });
}

// ─── BUILD FEED ────────────────────────────────────────────────────────────
function buildFeed() {
  feed.innerHTML = '';
  [...FUN].sort(() => Math.random() - 0.5).forEach(p => feed.appendChild(makeCard(p)));
  for (let i = 0; i < 10; i++) feed.appendChild(makeCard(FUN[Math.floor(Math.random() * FUN.length)]));
  updateSidebar(0);
  setTimeout(function() {
    const first = feed.querySelector('.post');
    if (first) first.classList.add('entering');
  }, 80);
}

// ─── SCROLL ────────────────────────────────────────────────────────────────
feed.addEventListener('scroll', function() {
  const idx = Math.round(feed.scrollTop / feed.clientHeight);
  if (idx === scrollIdx) return;
  scrollIdx = idx;

  const cards = feed.querySelectorAll('.post');
  if (cards[idx]) {
    cards[idx].classList.remove('entering');
    void cards[idx].offsetWidth;
    cards[idx].classList.add('entering');
  }

  updateSidebar(idx);
  checkInjection(idx);
  checkTime();

  if (idx >= cards.length - 4) {
    feed.appendChild(makeCard(FUN[Math.floor(Math.random() * FUN.length)]));
  }
});

function checkInjection(idx) {
  if (idx < 3 || idx === lastInject || (idx - 3) % 3 !== 0) return;
  lastInject = idx;

  const tasks = getTasks();
  let data;

  if (focusActive) {
    data = FOCUS_WARNS[Math.floor(Math.random() * FOCUS_WARNS.length)];
  } else if (tasks.length && Math.random() > 0.45) {
    const t = tasks[Math.floor(Math.random() * tasks.length)];
    data = {
      emoji: '📝',
      text:  typeof t === 'string' ? t : t.text,
      user:  '@your.tasks',
      song:  'Get It Done',
      tags:  ['#todo','#doit','#study'],
      type:  'task',
      effect:'shake'
    };
  } else {
    data = INTERVENTIONS[Math.floor(Math.random() * INTERVENTIONS.length)];
  }

  const newCard = makeCard(data, data.type);
  applyEffect(newCard, data.effect);

  const cards = feed.querySelectorAll('.post');
  const ref   = cards[idx + 1];
  ref ? feed.insertBefore(newCard, ref) : feed.appendChild(newCard);
}

function applyEffect(card, effect) {
  if (effect === 'shake') {
    card.classList.add('do-shake');
    setTimeout(() => card.classList.remove('do-shake'), 600);
  } else if (effect === 'glitch') {
    card.classList.add('do-glitch');
    setTimeout(() => card.classList.remove('do-glitch'), 600);
  }
}

function checkTime() {
  const mins = Math.floor((Date.now() - sessionStart) / 60000);
  if (mins > 0 && mins % 5 === 0 && mins !== lastTimeMins) {
    lastTimeMins = mins;
    feed.appendChild(makeCard({
      emoji:  '🕒',
      text:   mins + ' minutes of scrolling.\nThat\'s ' + mins + ' minutes you could have studied.',
      user:   '@time.tracker',
      song:   'Wasted Time',
      tags:   ['#timecheck','#goStudy','#study'],
      type:   'time-warning',
      effect: 'glitch'
    }, 'time-warning'));
    showToast(mins + ' mins scrolling = ' + mins + ' mins NOT studying');
  }
}

// ─── FOCUS TIMER ───────────────────────────────────────────────────────────
focusBtn.addEventListener('click', function() {
  if (focusActive) {
    clearInterval(focusIv);
    focusActive = false;
    focusSecs   = 25 * 60;
    focusBtn.textContent = '▶ Start Focus';
    focusBtn.classList.remove('active');
    timerPill.classList.add('hidden');
    showToast('Focus stopped — open your notes!');
    return;
  }
  focusActive = true;
  focusBtn.textContent = '⏹ Stop Focus';
  focusBtn.classList.add('active');
  timerPill.classList.remove('hidden');
  showToast('25 min focus started — close this feed!');

  focusIv = setInterval(function() {
    focusSecs--;
    const m = String(Math.floor(focusSecs / 60)).padStart(2, '0');
    const s = String(focusSecs % 60).padStart(2, '0');
    timerText.textContent = m + ':' + s;
    if (focusSecs <= 0) {
      clearInterval(focusIv);
      focusActive = false;
      focusBtn.textContent = '▶ Start Focus';
      focusBtn.classList.remove('active');
      timerPill.classList.add('hidden');
      focusSecs = 25 * 60;
      feed.appendChild(makeCard({
        emoji:  '🎉',
        text:   '25 minutes of pure focus.\nThat is how winners are made.',
        user:   '@pomodoro.pro',
        song:   'Victory Lap',
        tags:   ['#done','#focused','#studytok'],
        type:   'focus-warning',
        effect: 'none'
      }, 'focus-warning'));
      showToast('25 minutes done! Keep going!');
    }
  }, 1000);
});

// ─── TASK PANEL ────────────────────────────────────────────────────────────
function openTaskPanel() {
  taskPanel.classList.add('open');
  taskOverlay.classList.add('show');
  renderTasks();
}
function closeTaskPanel() {
  taskPanel.classList.remove('open');
  taskOverlay.classList.remove('show');
}

document.getElementById('tasksNavBtn').addEventListener('click', function(e) {
  e.preventDefault();
  openTaskPanel();
});
document.getElementById('closeTaskPanel').addEventListener('click', closeTaskPanel);
taskOverlay.addEventListener('click', closeTaskPanel);

function renderTasks() {
  const tasks = getTasks();
  updateBadge(tasks);
  taskList.innerHTML = '';
  if (!tasks.length) {
    taskList.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:0.82rem;text-align:center;padding:24px 0">No study tasks yet. Add one below!</div>';
    return;
  }
  tasks.forEach(function(t, i) {
    const text = typeof t === 'string' ? t : t.text;
    const done = typeof t === 'object' && t.done;
    const item = document.createElement('div');
    item.className = 'task-item' + (done ? ' done' : '');
    item.innerHTML =
      '<div class="task-dot"></div>' +
      '<span style="flex:1">' + text + '</span>' +
      '<span style="font-size:0.7rem;opacity:0.35">click to toggle</span>';
    item.addEventListener('click', function() { toggleTask(i); });
    taskList.appendChild(item);
  });
}

function toggleTask(i) {
  const tasks = getTasks();
  if (typeof tasks[i] === 'string') tasks[i] = { text: tasks[i], done: true };
  else tasks[i].done = !tasks[i].done;
  saveTasks(tasks);
  renderTasks();
}

function updateBadge(tasks) {
  const pending = tasks.filter(t => !(typeof t === 'object' && t.done)).length;
  taskBadge.textContent = pending;
  taskBadge.classList.toggle('hidden', pending === 0);
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addTask(); });

function addTask() {
  const val = taskInput.value.trim();
  if (!val) return;
  const tasks = getTasks();
  tasks.push({ text: val, done: false });
  saveTasks(tasks);
  taskInput.value = '';
  renderTasks();
  showToast('"' + val + '" added to study tasks!');
  feed.appendChild(makeCard({
    emoji:  '📝',
    text:   val,
    user:   '@your.tasks',
    song:   'Get It Done',
    tags:   ['#todo','#study','#doit'],
    type:   'task',
    effect: 'none'
  }, 'task'));
}

// ─── FEED TABS ─────────────────────────────────────────────────────────────
document.getElementById('tab-foryou').addEventListener('click', function() {
  document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
  this.classList.add('active');
});
document.getElementById('tab-following').addEventListener('click', function() {
  document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
  this.classList.add('active');
  showToast('Follow study accounts to stay motivated!');
});

// ─── LEFT NAV ──────────────────────────────────────────────────────────────
document.querySelectorAll('.lnav-item').forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    if (this.dataset.tab === 'tasks') return;
    document.querySelectorAll('.lnav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

document.getElementById('uploadBtn').addEventListener('click', function() { openTaskPanel(); });

document.querySelectorAll('.su-follow').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const following = this.classList.toggle('following');
    this.textContent = following ? 'Following' : 'Follow';
    if (following) showToast('Followed! Stay motivated together.');
  });
});

// ─── TOAST ─────────────────────────────────────────────────────────────────
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { toastEl.classList.remove('show'); }, 2400);
}

// ─── INIT ──────────────────────────────────────────────────────────────────
buildFeed();
renderTasks();

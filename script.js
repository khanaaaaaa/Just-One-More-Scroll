const feed = document.getElementById('feed');
const taskInput = document.getElementById('taskInput');
const focusBtn = document.getElementById('focusBtn');
const timerDisplay = document.getElementById('timerDisplay');
const timerText = document.getElementById('timerText');

const funPosts = [
  { emoji: '😭', text: 'POV: you said "just 5 minutes"' },
  { emoji: '💀', text: 'Me at 3am: I\'ll start tomorrow' },
  { emoji: '🐸', text: 'My brain during exams vs during scrolling' },
  { emoji: '😂', text: 'Bro really opened TikTok to "relax for a sec"' },
  { emoji: '🙃', text: 'The assignment isn\'t going anywhere. Neither are you.' },
];

const interventions = [
  { emoji: '👀', text: 'Be honest. Why are you here?' },
  { emoji: '📚', text: 'You have an assignment due.' },
  { emoji: '🚨', text: 'Open your notes. Right now.' },
  { emoji: '😤', text: 'Your future self is watching. Disappointed.' },
  { emoji: '⏰', text: 'Every scroll is a minute you\'re not getting back.' },
];

const focusWarnings = [
  { emoji: '🔒', text: 'You\'re in focus mode. Stay locked in.' },
  { emoji: '😡', text: 'Focus mode is ON. Put the phone down.' },
  { emoji: '🧠', text: 'Your brain is better than this feed.' },
];

let scrollCount = parseInt(localStorage.getItem('scrollCount') || '0');
let sessionStart = Date.now();
let focusActive = false;
let focusInterval = null;
let focusSeconds = 25 * 60;
let lastInjectedIndex = -1;

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function buildFeed() {
    feed.innerHTML = '';
    funPosts.forEach(p => feed.appendChild(makePost(p, 'fun')));
    for (let i = 0; i < 20; i++) feed.appendChild(makePlaceholder(i));
}

function makePost({ emoji, text }, type) {
    const div - document.createElement('div');
    div.className = `post${type}`;
    div.innerHTML = `<div class="emoji">${emoji}</div><h2>${text}</h2><div class="tag">${type}</div>`;
    return div;
}

function makePlaceHolder(i) {
    const div = document.createElement('div');
    div.className = 'post fun';
    return div;
}

function makePlaceHolder(i) {
    const div = document.createE
}
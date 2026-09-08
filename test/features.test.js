/**
 * Automated Test Suite for MindCare AI / TRACE
 * Comprehensive Unit, Integration, and DOM Feature Tests
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

console.log('\n=======================================================');
console.log('🧪 RUNNING COMPREHENSIVE MINDCARE AI TEST SUITE');
console.log('=======================================================\n');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const languagesCode = fs.readFileSync(path.join(__dirname, '../languages.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

// Mock Web Audio & Speech APIs for jsdom environment
const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost:8085/'
});

const { window } = dom;
const { document } = window;

global.window = window;
global.document = document;
global.localStorage = window.localStorage;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);
window.requestAnimationFrame = global.requestAnimationFrame;
window.cancelAnimationFrame = global.cancelAnimationFrame;

// Mocks
window.SpeechRecognition = function() {
    this.start = () => {};
    this.stop = () => {};
    this.continuous = true;
    this.interimResults = true;
    this.lang = 'en-US';
};
window.webkitSpeechRecognition = window.SpeechRecognition;

window.AudioContext = function() {
    this.state = 'running';
    this.currentTime = 0;
    this.destination = {};
    this.createOscillator = () => ({
        type: 'sine',
        frequency: { setValueAtTime: () => {} },
        connect: () => {},
        start: () => {},
        stop: () => {}
    });
    this.createGain = () => ({
        gain: {
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {}
        },
        connect: () => {}
    });
    this.createBiquadFilter = () => ({
        type: 'lowpass',
        frequency: { value: 1200 },
        connect: () => {}
    });
    this.resume = () => {};
};

window.jspdf = {
    jsPDF: function() {
        this.setFont = () => {};
        this.setFontSize = () => {};
        this.setTextColor = () => {};
        this.setFillColor = () => {};
        this.rect = () => {};
        this.roundedRect = () => {};
        this.text = () => {};
        this.setDrawColor = () => {};
        this.setLineWidth = () => {};
        this.line = () => {};
        this.save = () => {};
    }
};

window.alert = (msg) => console.log('  [Alert Modal]:', msg);

// Execute languages.js and app.js inside the window context
try {
    window.eval(languagesCode);
    window.eval(appCode);
    // Trigger DOMContentLoaded so all event listeners attach
    window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
} catch (e) {
    console.error('❌ Script Execution Error:', e);
    process.exit(1);
}

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
    if (condition) {
        console.log(`  ✅ PASS: ${testName}`);
        passedTests++;
    } else {
        console.error(`  ❌ FAIL: ${testName}`);
        failedTests++;
    }
}

// -------------------------------------------------------------
// TEST GROUP 1: Regional Language & Translation Service
// -------------------------------------------------------------
console.log('\n--- 1. Regional Language & Localization Service ---');

assert(typeof window.LanguageService !== 'undefined', 'LanguageService is defined globally');
assert(Object.keys(window.LanguageService.translations).length === 4, 'Supports exactly 4 regional languages (en, hi, mr, te)');

// Test Language Switch to Marathi
window.setGlobalLanguage('mr');
assert(window.LanguageService.currentLang === 'mr', 'Switched active language to Marathi (mr)');
const homeNavMr = document.querySelector('[data-i18n="nav_home"]');
assert(homeNavMr && homeNavMr.textContent === 'मुख्यपृष्ठ', 'Navigation translated to Marathi: "मुख्यपृष्ठ"');

// Test Language Switch to Hindi
window.setGlobalLanguage('hi');
assert(window.LanguageService.currentLang === 'hi', 'Switched active language to Hindi (hi)');
const homeNavHi = document.querySelector('[data-i18n="nav_home"]');
assert(homeNavHi && homeNavHi.textContent === 'होम', 'Navigation translated to Hindi: "होम"');

// Test Language Switch to Telugu
window.setGlobalLanguage('te');
assert(window.LanguageService.currentLang === 'te', 'Switched active language to Telugu (te)');
const homeNavTe = document.querySelector('[data-i18n="nav_home"]');
assert(homeNavTe && homeNavTe.textContent === 'హోమ్', 'Navigation translated to Telugu: "హోమ్"');

// Test Language Switch back to English
window.setGlobalLanguage('en');
assert(window.LanguageService.currentLang === 'en', 'Switched active language to English (en)');
const homeNavEn = document.querySelector('[data-i18n="nav_home"]');
assert(homeNavEn && homeNavEn.textContent === 'Home', 'Navigation translated to English: "Home"');

// Test Multilingual Distress Keyword Scanner
assert(window.LanguageService.isDistressText('I want to kill myself') === true, 'English suicide distress keyword detected');
assert(window.LanguageService.isDistressText('मुझे आत्महत्या करनी है') === true, 'Hindi suicide distress keyword detected');
assert(window.LanguageService.isDistressText('मला जगावेसे वाटत नाही') === true, 'Marathi distress keyword detected');
assert(window.LanguageService.isDistressText('నేను చనిపోవాలనుకుంటున్నాను') === true, 'Telugu distress keyword detected');
assert(window.LanguageService.isDistressText('Today is a sunny morning') === false, 'Neutral text returns false for distress');

// -------------------------------------------------------------
// TEST GROUP 2: Stress & Trauma Assessment Engine
// -------------------------------------------------------------
console.log('\n--- 2. Stress & Trauma Assessment Form Engine ---');

const nameInput = document.getElementById('fullNameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const feelingsInput = document.getElementById('feelingsInput');
const stressSlider = document.getElementById('stressLevelInput');
const anonymousCheck = document.getElementById('anonymousCheck');
const form = document.getElementById('stressAssessmentForm');

assert(form !== null, 'Assessment form exists in DOM');
assert(stressSlider !== null, 'Stress slider (stressLevelInput) exists in DOM');

// Test Anonymous Checkbox Toggle
anonymousCheck.checked = true;
anonymousCheck.dispatchEvent(new window.Event('change'));
assert(nameInput.value === 'Anonymous Victim / Survivor', 'Anonymous toggle autofills name to "Anonymous Victim / Survivor"');
assert(phoneInput.required === false, 'Anonymous toggle marks phone input as not required');

anonymousCheck.checked = false;
anonymousCheck.dispatchEvent(new window.Event('change'));
assert(nameInput.value === '', 'Unchecking anonymous resets name input');
assert(phoneInput.required === true, 'Unchecking anonymous restores required phone validation');

// Test Stress Slider Emotion Feedback
stressSlider.value = 8;
stressSlider.dispatchEvent(new window.Event('input'));
const stressBadge = document.getElementById('stressLevelBadge');
assert(stressBadge && stressBadge.textContent.includes('8/10'), 'Stress slider updates display badge to 8/10');

// Test Form Submission & Triage Result Generation
nameInput.value = 'Test User';
emailInput.value = 'test@example.com';
phoneInput.value = '9876543210';
feelingsInput.value = 'Experiencing sudden panic attacks and sleep disruption after incident.';
stressSlider.value = 7;

form.dispatchEvent(new window.Event('submit', { cancelable: true }));

const successPanel = document.getElementById('assessmentSuccessPanel');
assert(successPanel !== null, 'Assessment success panel exists in DOM');
const refIdDisplay = document.getElementById('assessmentRefId');
assert(refIdDisplay !== null, 'Reference ID element (assessmentRefId) exists in DOM');

// -------------------------------------------------------------
// TEST GROUP 3: Mindful Breathing Space (4-7-8 Technique)
// -------------------------------------------------------------
console.log('\n--- 3. Mindful Breathing Studio (4-7-8 Technique) ---');

const breathPlayBtn = document.getElementById('breathingPlayBtn');
const breathResetBtn = document.getElementById('breathingResetBtn');
const breathPhaseDisplay = document.getElementById('breathPhaseDisplay');
const breathCycleCountDisplay = document.getElementById('breathingCycleCountDisplay');

assert(breathPlayBtn !== null, 'Breathing Play button exists');
assert(breathResetBtn !== null, 'Breathing Reset button exists');

// Start Breathing Exercise
breathPlayBtn.click();
assert(breathPhaseDisplay.textContent === 'Inhale', 'Breathing started: Active phase is "Inhale"');

// Pause Breathing Exercise
breathPlayBtn.click();
assert(breathPhaseDisplay.textContent === 'Paused', 'Breathing paused: Active phase is "Paused"');

// Reset Breathing Exercise
breathResetBtn.click();
assert(breathPhaseDisplay.textContent === 'Ready', 'Breathing reset: Active phase is "Ready"');
assert(breathCycleCountDisplay.textContent === '0', 'Completed cycles reset to 0');

// -------------------------------------------------------------
// TEST GROUP 4: AI Companion Chatbot & Active Listener
// -------------------------------------------------------------
console.log('\n--- 4. AI Companion Chatbot Engine ---');

const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMessagesWindow = document.getElementById('chatMessagesWindow');

assert(chatInput !== null, 'Chat input exists');
assert(chatSendBtn !== null, 'Chat send button exists');
assert(chatMessagesWindow !== null, 'Chat messages window exists');

// Send Chat Message
chatInput.value = 'I am feeling overwhelmed with work and stress';
chatSendBtn.click();

const chatMessages = chatMessagesWindow.querySelectorAll('.chat-message');
assert(chatMessages.length >= 1, 'User message was added to chat window');

// Test Distress Trigger in Chat
chatInput.value = 'I feel like ending my life';
chatSendBtn.click();
const crisisModal = document.getElementById('crisisAlertModal');
assert(crisisModal && crisisModal.classList.contains('active'), 'Suicide/crisis keywords in chat immediately trigger crisis intervention modal');

// -------------------------------------------------------------
// TEST GROUP 5: Modals Management & Dialogues
// -------------------------------------------------------------
console.log('\n--- 5. Modals Management (SOS, Auth, DBT, Counselor) ---');

const sosModal = document.getElementById('emergencySosModal');
const sosNavBtn = document.getElementById('navEmergencySosBtn');

assert(sosModal !== null, 'Emergency SOS modal exists in DOM');
sosNavBtn.click();
assert(sosModal.classList.contains('active'), 'Emergency SOS modal activates on nav button click');

// Test DBT Registration Modal
window.openDbtRegistrationModal('TIPP Crisis Grounding');
const dbtModal = document.getElementById('dbtRegistrationModal');
const dbtCourseSelect = document.getElementById('dbtCourseSelect');
assert(dbtModal && dbtModal.classList.contains('active'), 'DBT Registration modal opens');
assert(dbtCourseSelect && dbtCourseSelect.value.includes('TIPP'), 'DBT Course Select properly pre-filled with TIPP course');

// Test Counselor Booking Modal
window.openCounselorBookingModal();
const counselorModal = document.getElementById('counselorBookingModal');
assert(counselorModal && counselorModal.classList.contains('active'), 'Counselor Booking modal opens');

// Test Voice Assessment Button & Modal Flow
console.log('\n--- 5b. Voice Assessment Button & Studio Modal ---');
const assessmentVoiceBtn = document.getElementById('assessmentVoiceBtn');
const voiceModal = document.getElementById('voiceAssessmentModal');
assert(assessmentVoiceBtn !== null, 'Voice Assessment CTA Button exists in DOM (#assessmentVoiceBtn)');
assert(voiceModal !== null, 'Voice Assessment Studio Modal exists in DOM (#voiceAssessmentModal)');

// Trigger voice assessment button click
assessmentVoiceBtn.click();
assert(voiceModal.classList.contains('active'), 'Clicking "Voice Assessment - Speak Your Concerns" button activates Voice Assessment Studio modal');

// Switch Voice Language to Marathi
window.setVoiceLanguage('mr-IN');
const marathiBtn = document.querySelector('.lang-pill-btn[data-lang="mr-IN"]');
assert(marathiBtn && marathiBtn.classList.contains('active'), 'Voice language switcher successfully changes to Marathi (mr-IN)');

// Switch Voice Language to Telugu
window.setVoiceLanguage('te-IN');
const teluguBtn = document.querySelector('.lang-pill-btn[data-lang="te-IN"]');
assert(teluguBtn && teluguBtn.classList.contains('active'), 'Voice language switcher successfully changes to Telugu (te-IN)');

// Test Voice Modal Close
window.closeVoiceAssessmentModal();
assert(!voiceModal.classList.contains('active'), 'Voice Assessment modal closes properly');


// -------------------------------------------------------------
// TEST GROUP 6: Dead Code & Function Integrity Check
// -------------------------------------------------------------
console.log('\n--- 6. Global Function & Feature Linkage Check ---');

const criticalFunctions = [
    'initAssessmentForm',
    'generateClinicalPDFReport',
    'openVoiceAssessmentModal',
    'closeVoiceAssessmentModal',
    'setVoiceLanguage',
    'startVoiceRecording',
    'stopVoiceRecording',
    'applyVoiceTranscriptToForm',
    'initBreathingStudio',
    'toggleBreathingSession',
    'pauseBreathingSession',
    'resetBreathingSession',
    'initAIChatbot',
    'handleChatSubmit',
    'generateEmpatheticResponse',
    'checkDistressKeywords',
    'triggerCrisisModal',
    'openDbtRegistrationModal',
    'openCounselorBookingModal',
    'downloadClinicalDossier',
    'setGlobalLanguage'
];

criticalFunctions.forEach(fnName => {
    assert(typeof window[fnName] === 'function', `Core function "${fnName}" is properly exported & executable`);
});

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n=======================================================');
console.log(`📊 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('=======================================================\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    process.exit(0);
}

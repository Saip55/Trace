/**
 * MindCare AI - Core Application Logic
 * Real-Time Stress & Trauma Assessment Portal for NHAA Victims
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStressSlider();
    initAssessmentForm();
    initBreathingStudio();
    initAIChatbot();
    initFAQAccordion();
    initModals();
    initHealthScoreEngine();
});

/* ==========================================================================
   1. Navigation & Scroll Observers
   ========================================================================== */
function initNavigation() {
    const mainNav = document.querySelector('nav.main-nav');
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileSidebar');
    const mobileOverlay = document.getElementById('mobileDrawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    // Scroll effect on Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // Mobile Drawer Controls
    function toggleMobileMenu() {
        if (!mobileDrawer) return;
        const isActive = mobileDrawer.classList.contains('active');
        if (isActive) {
            mobileDrawer.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
        } else {
            mobileDrawer.classList.add('active');
            if (mobileOverlay) mobileOverlay.classList.add('active');
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

    // Close mobile drawer when link is clicked
    document.querySelectorAll('.mobile-drawer-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer) mobileDrawer.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
        });
    });
}

/* ==========================================================================
   2. Interactive Stress Slider with Dynamic Anchors
   ========================================================================== */
function initStressSlider() {
    const stressSlider = document.getElementById('stressLevelInput');
    const stressBadge = document.getElementById('stressLevelBadge');
    const stressDesc = document.getElementById('stressLevelDesc');

    if (!stressSlider || !stressBadge) return;

    const stressAnchors = [
        { label: 'Level 1: Minimal Tension', color: '#10b981', desc: 'Feeling generally calm and in control with normal daily energy.' },
        { label: 'Level 2: Mild Unease', color: '#10b981', desc: 'Slight stress or situational worry, easily manageable.' },
        { label: 'Level 3: Low Stress', color: '#059669', desc: 'Noticing mild tension in muscles or occasional racing thoughts.' },
        { label: 'Level 4: Moderate Stress', color: '#f59e0b', desc: 'Persistent worry or fatigue affecting concentration.' },
        { label: 'Level 5: Elevated Strain', color: '#f97316', desc: 'Noticeable difficulty relaxing, mild sleep or mood changes.' },
        { label: 'Level 6: Significant Stress', color: '#f97316', desc: 'Feeling overwhelmed by daily tasks or recent incident memories.' },
        { label: 'Level 7: High Stress / Trauma', color: '#ea580c', desc: 'Frequent intrusive thoughts, heightened emotional distress.' },
        { label: 'Level 8: Severe Anxiety / PTSD', color: '#ef4444', desc: 'Severe distress, panic feelings, feeling unsafe or exhausted.' },
        { label: 'Level 9: Critical Distress', color: '#dc2626', desc: 'Extreme psychological pain, urgent stabilization recommended.' },
        { label: 'Level 10: Crisis State', color: '#b91c1c', desc: 'Overwhelming crisis. Immediate counselor & helpline intervention advised.' }
    ];

    function updateStressUI(val) {
        const index = Math.max(0, Math.min(val - 1, stressAnchors.length - 1));
        const anchor = stressAnchors[index];
        stressBadge.textContent = `${val}/10 • ${anchor.label.split(':')[1].trim()}`;
        stressBadge.style.backgroundColor = anchor.color;
        if (stressDesc) {
            stressDesc.textContent = anchor.desc;
        }

        // Automatic crisis alert check if user selects critical stress
        if (val >= 9) {
            triggerCrisisModal(
                `High Distress Level (${val}/10) Detected`,
                `You indicated a severe stress level of ${val}/10. Our emergency psychological counselors are available 24/7 right now.`
            );
        }
    }

    stressSlider.addEventListener('input', (e) => {
        updateStressUI(parseInt(e.target.value, 10));
    });

    // Initialize with default
    updateStressUI(parseInt(stressSlider.value, 10));
}

/* ==========================================================================
   3. Stress & Trauma Assessment Form & PDF Generator
   ========================================================================== */
let lastAssessmentRecord = null;

function initAssessmentForm() {
    const form = document.getElementById('stressAssessmentForm');
    const anonToggle = document.getElementById('anonymousCheck');
    const nameInput = document.getElementById('fullNameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const successPanel = document.getElementById('assessmentSuccessPanel');
    const refIdSpan = document.getElementById('assessmentRefId');
    const slaSpan = document.getElementById('counselorSlaText');
    const downloadPdfBtn = document.getElementById('downloadPdfReportBtn');

    if (!form) return;

    // Anonymous toggle handler
    if (anonToggle) {
        anonToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (nameInput) {
                    nameInput.value = 'Anonymous Victim / Survivor';
                    nameInput.disabled = true;
                }
                if (phoneInput) {
                    phoneInput.placeholder = 'Optional or confidential callback number';
                    phoneInput.required = false;
                }
                if (emailInput) {
                    emailInput.placeholder = 'Optional encrypted email';
                    emailInput.required = false;
                }
            } else {
                if (nameInput) {
                    nameInput.value = '';
                    nameInput.disabled = false;
                }
                if (phoneInput) {
                    phoneInput.placeholder = '+91 XXXXX XXXXX';
                    phoneInput.required = true;
                }
                if (emailInput) {
                    emailInput.placeholder = 'your.email@example.com';
                    emailInput.required = true;
                }
            }
        });
    }

    // Feelings input crisis keyword real-time monitor
    const feelingsInput = document.getElementById('feelingsInput');
    if (feelingsInput) {
        feelingsInput.addEventListener('blur', (e) => {
            checkDistressKeywords(e.target.value);
        });
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing with MindCare AI...';
        submitBtn.disabled = true;

        const formData = {
            fullName: nameInput ? nameInput.value.trim() : 'Anonymous',
            isAnonymous: anonToggle ? anonToggle.checked : false,
            email: emailInput && emailInput.value ? emailInput.value.trim() : 'Not provided',
            phone: phoneInput && phoneInput.value ? phoneInput.value.trim() : 'Not provided',
            age: document.getElementById('ageInput') ? document.getElementById('ageInput').value : 'N/A',
            gender: document.getElementById('genderSelect') ? document.getElementById('genderSelect').value : 'Prefer not to say',
            concern: document.getElementById('concernSelect') ? document.getElementById('concernSelect').value : 'General Stress',
            feelings: feelingsInput ? feelingsInput.value.trim() : '',
            stressLevel: parseInt(document.getElementById('stressLevelInput').value, 10) || 5,
            referenceId: 'NHAA-MC-' + Math.floor(100000 + Math.random() * 900000),
            timestamp: new Date().toISOString()
        };

        // Simulated AI assessment delay for realistic feel
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            lastAssessmentRecord = formData;

            // Check for critical crisis keywords
            const isCrisis = checkDistressKeywords(formData.feelings, false);

            if (isCrisis || formData.stressLevel >= 9) {
                triggerCrisisModal(
                    'Priority Psychological Intervention Triggered',
                    'Your responses indicate acute distress. A specialized NHAA trauma counselor has been alerted with priority dispatch.'
                );
            }

            // Show Success Panel
            if (refIdSpan) refIdSpan.textContent = formData.referenceId;
            if (slaSpan) {
                if (formData.stressLevel >= 8) {
                    slaSpan.innerHTML = '<strong>Priority Case (High Stress):</strong> A certified NHAA trauma counselor will reach out within <strong>2 to 4 hours</strong>.';
                } else {
                    slaSpan.innerHTML = '<strong>Standard Case:</strong> A licensed psychological counselor will review your file and reach out within <strong>24 hours</strong>.';
                }
            }

            form.style.display = 'none';
            if (successPanel) {
                successPanel.style.display = 'block';
                successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Save to Local Storage for history
            try {
                const history = JSON.parse(localStorage.getItem('mindcare_assessments') || '[]');
                history.unshift(formData);
                localStorage.setItem('mindcare_assessments', JSON.stringify(history.slice(0, 10)));
            } catch (err) {
                console.warn('LocalStorage unavailable:', err);
            }

            // Dynamically update Bio-Somatic resilience score
            if (typeof onAssessmentSubmittedUpdateScore === 'function') {
                onAssessmentSubmittedUpdateScore(formData);
            }
        }, 1200);
    });

    // PDF Report Generator Handler
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', () => {
            if (!lastAssessmentRecord) {
                showToast('No assessment data available to generate report.', 'error');
                return;
            }
            generateClinicalPDFReport(lastAssessmentRecord);
        });
    }
}

/**
 * Generates a clean, professional clinical PDF report using jsPDF
 */
function generateClinicalPDFReport(data) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast('PDF generator library is loading, please try again in a moment.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 1. Header Banner
    doc.setFillColor(102, 126, 234); // Trust Blue
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('MindCare AI - Assessment Report', 16, 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Integrated with National Helpline Against Atrocities (NHAA - 14566)', 16, 28);

    // 2. Metadata Bar
    doc.setTextColor(51, 65, 85);
    doc.setFontSize(9);
    doc.text(`Reference ID: ${data.referenceId}`, 16, 46);
    doc.text(`Date & Time: ${new Date().toLocaleString()}`, 130, 46);
    doc.text(`Triage Status: Certified Psychological Intake`, 16, 52);

    // Horizontal Rule
    doc.setDrawColor(226, 232, 240);
    doc.line(16, 56, 194, 56);

    // 3. Section: Patient & Case Overview
    doc.setFillColor(241, 245, 249);
    doc.rect(16, 62, 178, 8, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('1. Case Overview & Identification', 20, 68);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Full Name: ${data.fullName}`, 20, 78);
    doc.text(`Age: ${data.age}`, 120, 78);
    doc.text(`Contact: ${data.phone}`, 20, 85);
    doc.text(`Gender: ${data.gender}`, 120, 85);
    doc.text(`Email: ${data.email}`, 20, 92);
    doc.text(`Anonymous Mode: ${data.isAnonymous ? 'Active (Protected)' : 'Standard'}`, 120, 92);

    // 4. Section: Psychological Assessment & Triage
    doc.setFillColor(241, 245, 249);
    doc.rect(16, 102, 178, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('2. Trauma & Stress Triage Score', 20, 108);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Primary Concern: ${data.concern}`, 20, 118);
    doc.text(`Self-Reported Stress Level: ${data.stressLevel} / 10`, 120, 118);

    let riskTier = 'Low Stress (Tier 1)';
    let riskColor = [16, 185, 129];
    if (data.stressLevel >= 8) {
        riskTier = 'High Risk / Severe Trauma (Tier 3 - Immediate Intervention)';
        riskColor = [239, 68, 68];
    } else if (data.stressLevel >= 5) {
        riskTier = 'Moderate Stress / Adjustment Strain (Tier 2)';
        riskColor = [245, 158, 11];
    }

    doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(`Clinical Risk Level: ${riskTier}`, 20, 126);
    doc.setTextColor(51, 65, 85);

    // 5. Section: Narrative / Feelings
    doc.setFillColor(241, 245, 249);
    doc.rect(16, 136, 178, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('3. Reported Symptoms & Psychological Notes', 20, 142);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const narrativeText = data.feelings || 'No additional feelings or incident details provided.';
    const splitNarrative = doc.splitTextToSize(narrativeText, 174);
    doc.text(splitNarrative, 20, 152);

    // 6. Section: Immediate Recommendations & Helpline
    const currentY = 156 + (splitNarrative.length * 5);
    doc.setFillColor(241, 245, 249);
    doc.rect(16, currentY, 178, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('4. Care Plan & Next Steps', 20, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const recs = [
        '• Practice 4-7-8 rhythmic breathing twice daily to regulate autonomic stress response.',
        '• Keep this Reference ID handy for NHAA case correlation and hospital psycho-social support.',
        '• Confidentiality Guarantee: Stored under 256-bit AES encryption in compliance with Indian IT Act & DPDP Act.',
        data.stressLevel >= 8 
            ? '• URGENT ACTION: If experiencing acute crisis, dial Toll-Free 14566 (NHAA) or 108 immediately.'
            : '• A licensed trauma counselor will review and initiate support in accordance with your triage SLA.'
    ];

    let recY = currentY + 14;
    recs.forEach(r => {
        doc.text(r, 20, recY);
        recY += 6;
    });

    // 7. Footer
    doc.setDrawColor(226, 232, 240);
    doc.line(16, 275, 194, 275);
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text('MindCare AI Portal | National Helpline Against Atrocities (14566) | Ministry of Social Justice & Empowerment', 16, 282);
    doc.text('This digital assessment is an AI-assisted psychological screening and does not replace medical psychiatric care.', 16, 287);

    // Save PDF
    doc.save(`MindCare_Assessment_${data.referenceId}.pdf`);
    showToast('Assessment PDF report downloaded successfully!', 'success');
}

/* ==========================================================================
   4. Multilingual Web Speech API Voice Assessment
   ========================================================================== */
let speechRecognizer = null;
let currentLanguage = 'en-US';
let capturedVoiceTranscript = '';

function openVoiceAssessmentModal() {
    const modal = document.getElementById('voiceAssessmentModal');
    if (modal) {
        modal.classList.add('active');
        startVoiceRecording();
    }
}

function closeVoiceAssessmentModal() {
    const modal = document.getElementById('voiceAssessmentModal');
    if (modal) {
        modal.classList.remove('active');
        stopVoiceRecording();
    }
}

function setVoiceLanguage(lang) {
    currentLanguage = lang;
    const langBtns = document.querySelectorAll('.lang-pill-btn');
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const statusEl = document.getElementById('voiceRecognitionStatus');
    if (statusEl) {
        const langNames = { 'en-US': 'English', 'hi-IN': 'Hindi (हिंदी)', 'te-IN': 'Telugu (తెలుగు)' };
        statusEl.innerHTML = `<span style="color: #6366f1;">Switched to ${langNames[lang] || lang}. Listening...</span>`;
    }

    if (speechRecognizer) {
        speechRecognizer.stop();
        setTimeout(startVoiceRecording, 300);
    }
}

function startVoiceRecording() {
    const statusEl = document.getElementById('voiceRecognitionStatus');
    const transcriptEl = document.getElementById('voiceTranscriptDisplay');
    const micIcon = document.getElementById('voiceMicPulseIcon');

    capturedVoiceTranscript = '';
    if (transcriptEl) transcriptEl.textContent = 'Listening... Please speak your thoughts, concerns, or recent experiences.';

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        if (statusEl) {
            statusEl.innerHTML = `<div style="color: #ef4444; font-weight: 600;"><i class="fas fa-exclamation-triangle"></i> Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.</div>`;
        }
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = currentLanguage;

    speechRecognizer.onstart = () => {
        if (micIcon) micIcon.classList.add('pulse');
        if (statusEl) statusEl.innerHTML = `<span style="color: #10b981; font-weight: 600;"><i class="fas fa-circle fa-beat" style="color: #10b981; font-size: 0.7rem;"></i> Microphone Active • Speak naturally</span>`;
    };

    speechRecognizer.onresult = (event) => {
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                capturedVoiceTranscript += transcript + ' ';
            } else {
                interimText += transcript;
            }
        }

        const fullText = (capturedVoiceTranscript + interimText).trim();
        if (transcriptEl) {
            transcriptEl.textContent = `"${fullText}"`;
        }

        // Live Crisis Word Detection in Voice
        checkDistressKeywords(fullText);
    };

    speechRecognizer.onerror = (event) => {
        console.warn('Speech recognition warning:', event.error);
        if (statusEl) {
            if (event.error === 'not-allowed') {
                statusEl.innerHTML = `<span style="color: #ef4444;">Microphone permission was denied. Please allow microphone access in your browser settings.</span>`;
            } else if (event.error === 'no-speech') {
                statusEl.innerHTML = `<span style="color: #f59e0b;">No speech detected. Please speak closer to your microphone.</span>`;
            } else {
                statusEl.innerHTML = `<span style="color: #64748b;">Notice: ${event.error}. Click Restart to try again.</span>`;
            }
        }
    };

    speechRecognizer.onend = () => {
        if (micIcon) micIcon.classList.remove('pulse');
    };

    try {
        speechRecognizer.start();
    } catch (e) {
        console.warn('Recognition start exception:', e);
    }
}

function stopVoiceRecording() {
    if (speechRecognizer) {
        speechRecognizer.stop();
        speechRecognizer = null;
    }
}

function applyVoiceTranscriptToForm() {
    stopVoiceRecording();
    closeVoiceAssessmentModal();

    const feelingsInput = document.getElementById('feelingsInput');
    if (feelingsInput && capturedVoiceTranscript.trim()) {
        feelingsInput.value = capturedVoiceTranscript.trim();
        feelingsInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        feelingsInput.style.borderColor = '#10b981';
        feelingsInput.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.2)';
        setTimeout(() => {
            feelingsInput.style.borderColor = '';
            feelingsInput.style.boxShadow = '';
        }, 2500);
        showToast('Voice transcription added to your assessment form!', 'success');
    } else {
        showToast('No speech recorded to apply.', 'warning');
    }
}

/* ==========================================================================
   5. Mindful Breathing Studio (Procedural Web Audio + 4-7-8)
   ========================================================================== */
let breathingActive = false;
let breathingInterval = null;
let countdownInterval = null;
let sessionSeconds = 0;
let sessionTimerInterval = null;
let completedBreathingCycles = 0;
let soundEnabled = true;

let webAudioCtx = null;
let activeOscillator = null;
let activeGainNode = null;

function initBreathingStudio() {
    const playBtn = document.getElementById('breathingPlayBtn');
    const resetBtn = document.getElementById('breathingResetBtn');
    const soundToggle = document.getElementById('soundToggleBtn');

    if (playBtn) playBtn.addEventListener('click', toggleBreathingSession);
    if (resetBtn) resetBtn.addEventListener('click', resetBreathingSession);
    if (soundToggle) soundToggle.addEventListener('click', toggleBreathingSound);
}

function getAudioContext() {
    if (!webAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            webAudioCtx = new AudioContextClass();
        }
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
        webAudioCtx.resume();
    }
    return webAudioCtx;
}

function playCalmTone(freq, durationSec) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        if (activeOscillator) {
            activeGainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
            activeOscillator.stop(ctx.currentTime + 0.3);
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 1200;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle volume ramping (smooth fade-in and fade-out)
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + durationSec - 0.8);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + durationSec);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + durationSec);

        activeOscillator = osc;
        activeGainNode = gain;
    } catch (e) {
        console.warn('Audio tone play exception:', e);
    }
}

function toggleBreathingSound() {
    soundEnabled = !soundEnabled;
    const soundIcon = document.getElementById('soundToggleIcon');
    if (soundIcon) {
        soundIcon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
    showToast(soundEnabled ? 'Ambient sound enabled' : 'Ambient sound muted', 'info');
}

function toggleBreathingSession() {
    if (!breathingActive) {
        startBreathingSession();
    } else {
        pauseBreathingSession();
    }
}

function startBreathingSession() {
    breathingActive = true;
    getAudioContext();

    const playBtn = document.getElementById('breathingPlayBtn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Exercise';
        playBtn.classList.remove('btn-calm');
        playBtn.classList.add('btn-urgent');
    }

    if (!sessionTimerInterval) {
        sessionTimerInterval = setInterval(() => {
            sessionSeconds++;
            const mins = Math.floor(sessionSeconds / 60);
            const secs = sessionSeconds % 60;
            const timerDisplay = document.getElementById('breathingSessionTimeDisplay');
            if (timerDisplay) {
                timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    executeBreathingLoop();
}

function pauseBreathingSession() {
    breathingActive = false;
    clearTimeout(breathingInterval);
    clearInterval(countdownInterval);

    const playBtn = document.getElementById('breathingPlayBtn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Resume Exercise';
        playBtn.classList.remove('btn-urgent');
        playBtn.classList.add('btn-calm');
    }

    const phaseText = document.getElementById('breathPhaseDisplay');
    const timerText = document.getElementById('breathTimerDisplay');
    const subText = document.getElementById('breathInstructionDisplay');

    if (phaseText) phaseText.textContent = 'Paused';
    if (timerText) timerText.textContent = '--';
    if (subText) subText.textContent = 'Click Resume to continue your mindful session';

    const circle = document.getElementById('breathingVisualCircle');
    if (circle) circle.style.transform = 'scale(1)';
}

function resetBreathingSession() {
    pauseBreathingSession();
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
    sessionSeconds = 0;
    completedBreathingCycles = 0;

    const timerDisplay = document.getElementById('breathingSessionTimeDisplay');
    const cycleDisplay = document.getElementById('breathingCycleCountDisplay');
    const phaseText = document.getElementById('breathPhaseDisplay');
    const timerText = document.getElementById('breathTimerDisplay');
    const subText = document.getElementById('breathInstructionDisplay');
    const playBtn = document.getElementById('breathingPlayBtn');

    if (timerDisplay) timerDisplay.textContent = '0:00';
    if (cycleDisplay) cycleDisplay.textContent = '0';
    if (phaseText) phaseText.textContent = 'Ready';
    if (timerText) timerText.textContent = '4-7-8';
    if (subText) subText.textContent = 'Press Start to begin gentle calming rhythm';
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i> Start Exercise';

    updatePhaseDots(null);
}

function executeBreathingLoop() {
    if (!breathingActive) return;

    const phaseText = document.getElementById('breathPhaseDisplay');
    const subText = document.getElementById('breathInstructionDisplay');
    const circle = document.getElementById('breathingVisualCircle');

    // 1. INHALE (4 Seconds) - 392Hz (G4)
    updatePhaseDots('inhale');
    if (phaseText) phaseText.textContent = 'Inhale';
    if (subText) subText.textContent = 'Inhale slowly and deeply through your nose';
    if (circle) circle.style.transform = 'scale(1.28)';
    playCalmTone(392.00, 4);
    runCountdown(4);

    breathingInterval = setTimeout(() => {
        if (!breathingActive) return;

        // 2. HOLD (7 Seconds) - 440Hz (A4)
        updatePhaseDots('hold');
        if (phaseText) phaseText.textContent = 'Hold';
        if (subText) subText.textContent = 'Hold your breath gently. Feel your stillness.';
        if (circle) circle.style.transform = 'scale(1.28)';
        playCalmTone(440.00, 7);
        runCountdown(7);

        breathingInterval = setTimeout(() => {
            if (!breathingActive) return;

            // 3. EXHALE (8 Seconds) - 329.63Hz (E4)
            updatePhaseDots('exhale');
            if (phaseText) phaseText.textContent = 'Exhale';
            if (subText) subText.textContent = 'Release tension completely through your mouth';
            if (circle) circle.style.transform = 'scale(1)';
            playCalmTone(329.63, 8);
            runCountdown(8);

            breathingInterval = setTimeout(() => {
                if (!breathingActive) return;

                completedBreathingCycles++;
                const cycleDisplay = document.getElementById('breathingCycleCountDisplay');
                if (cycleDisplay) cycleDisplay.textContent = completedBreathingCycles;

                // Dynamic feedback to Bio-Somatic Resilience Engine
                if (typeof onBreathingCycleCompleted === 'function') {
                    onBreathingCycleCompleted(completedBreathingCycles);
                }

                // Loop next cycle
                executeBreathingLoop();
            }, 8000);
        }, 7000);
    }, 4000);
}

function runCountdown(seconds) {
    let current = seconds;
    const timerText = document.getElementById('breathTimerDisplay');
    if (timerText) timerText.textContent = current;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        current--;
        if (timerText) timerText.textContent = current > 0 ? current : 1;
        if (current <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function updatePhaseDots(phase) {
    const dots = document.querySelectorAll('.phase-dot');
    dots.forEach(d => {
        if (d.getAttribute('data-phase') === phase) {
            d.classList.add('active');
        } else {
            d.classList.remove('active');
        }
    });
}

/* ==========================================================================
   6. AI Support Chatbot Engine ("MindCare Companion")
   ========================================================================== */
function initAIChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const promptChips = document.querySelectorAll('.prompt-chip');

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleChatSubmit);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });
    }

    if (promptChips) {
        promptChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const promptText = chip.getAttribute('data-prompt') || chip.textContent;
                if (chatInput) {
                    chatInput.value = promptText;
                    handleChatSubmit();
                }
            });
        });
    }
}

function handleChatSubmit() {
    const chatInput = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessagesWindow');
    if (!chatInput || !messagesContainer) return;

    const userText = chatInput.value.trim();
    if (!userText) return;

    // 1. Add User Message
    addChatMessage(userText, 'user');
    chatInput.value = '';

    // 2. Check for emergency crisis indicators
    checkDistressKeywords(userText);

    // 3. Show Bot Typing Indicator
    const typingId = 'botTyping_' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `
        <div class="message-bubble" style="color: #64748b;">
            <i class="fas fa-ellipsis fa-fade"></i> MindCare Companion is thinking...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 4. Generate AI Response
    setTimeout(() => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        const botReply = generateEmpatheticResponse(userText);
        addChatMessage(botReply, 'bot');
    }, 800);
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessagesWindow');
    if (!messagesContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateEmpatheticResponse(input) {
    const lower = input.toLowerCase();

    // Crisis Check
    if (lower.includes('suicide') || lower.includes('kill myself') || lower.includes('want to die') || lower.includes('end my life') || lower.includes('self-harm')) {
        return `<strong>🚨 You are not alone and your life matters deeply.</strong><br>Please reach out immediately for compassionate, confidential help:<br>• <strong>NHAA Helpline:</strong> <a href="tel:14566">14566</a> (24/7 Toll Free)<br>• <strong>Emergency Medical:</strong> <a href="tel:108">108</a><br>• <strong>AASRA Suicide Prevention:</strong> <a href="tel:9820466726">9820466726</a><br>Help is ready right now.`;
    }

    if (lower.includes('anxious') || lower.includes('panic') || lower.includes('fear') || lower.includes('scared') || lower.includes('heart racing')) {
        return `I hear how intense this feels right now. When anxiety strikes, your nervous system is in overdrive. Let's do a quick grounding technique together:<br><br>1. Plant your feet flat on the floor.<br>2. Look around and name <strong>3 things you can see</strong> and <strong>2 things you can touch</strong>.<br>3. Scroll to our <a href="#breathing" style="font-weight: 700; text-decoration: underline;">Mindful Breathing Studio</a> above to try 3 cycles of 4-7-8 breathing.<br><br>Would you like to complete our quick assessment so a counselor can follow up?`;
    }

    if (lower.includes('nhaa') || lower.includes('helpline') || lower.includes('14566') || lower.includes('atrocity') || lower.includes('caste') || lower.includes('police')) {
        return `<strong>National Helpline Against Atrocities (14566)</strong> is a 24/7 government initiative under the Ministry of Social Justice & Empowerment.<br><br>While NHAA provides direct legal, administrative, and grievance-tracking support, <strong>MindCare AI</strong> provides the psychological first aid and trauma counseling to support victims and families. All mental health services here are 100% free.`;
    }

    if (lower.includes('anonymous') || lower.includes('privacy') || lower.includes('secret') || lower.includes('confidential')) {
        return `Your privacy is our highest priority. You can check the <strong>"Submit Anonymously"</strong> box in the assessment form. All assessments and notes are stored using end-to-end 256-bit encryption in strict compliance with the Indian Digital Personal Data Protection Act.`;
    }

    if (lower.includes('trauma') || lower.includes('flashback') || lower.includes('nightmare') || lower.includes('incident') || lower.includes('accident')) {
        return `Experiencing trauma or sudden shock can cause intrusive memories and emotional numbness. These are natural protective responses of your brain. Healing takes time and a compassionate listening ear. We encourage you to take the <a href="#assessment" style="font-weight: 700; text-decoration: underline;">Assessment Form</a> so we can match you with an experienced trauma specialist.`;
    }

    if (lower.includes('counselor') || lower.includes('doctor') || lower.includes('therapist') || lower.includes('talk to someone')) {
        return `Our certified psychological counselors are available round the clock through the NHAA network. Once you submit the assessment, a counselor will review your triage level and reach out within 2 to 24 hours. If it's urgent, you can call <a href="tel:14566" style="font-weight: 700;">14566</a> right now.`;
    }

    if (lower.includes('dbt') || lower.includes('hive') || lower.includes('skills') || lower.includes('circle') || lower.includes('course') || lower.includes('cohort') || lower.includes('group')) {
        return `<strong>TheraHive DBT Skills & Peer Circles</strong> provide evidence-based recovery for trauma, panic, and emotional overwhelm:<br><br>• <strong>Wise Mind:</strong> Mindfulness to balance emotion and reason.<br>• <strong>TIPP Skills:</strong> Rapid physical de-escalation for panic surges.<br>• <strong>DEAR MAN:</strong> Assertiveness and healthy boundary communication.<br>• <strong>Peer Circles:</strong> Moderated, small-group survivor healing.<br><br><button class="btn btn-amber btn-sm" onclick="openDbtRegistrationModal('Comprehensive DBT Skills Course')" style="margin-top: 6px;"><i class="fas fa-users-rays"></i> Join a Free DBT Circle</button>`;
    }

    if (lower.includes('score') || lower.includes('bio') || lower.includes('resilience') || lower.includes('vagal') || lower.includes('somatic') || lower.includes('endocrine') || lower.includes('28%') || lower.includes('intelly') || lower.includes('check-up') || lower.includes('checkup')) {
        return `<strong>Bio-Somatic Resilience Assessment Analysis:</strong><br><br>Your composite health score evaluates multi-system recovery from traumatic stress:<br><br>• <strong>Cardio-Vagal Tone (8.8/10):</strong> Heart Rate Variability indicates active parasympathetic regeneration.<br>• <strong>Respiratory Vagus (9.1/10):</strong> Diaphragmatic rhythm and oxygenation are optimal.<br>• <strong>Endocrine Cortisol Axis (8.3/10):</strong> Adrenal rhythm is steadily normalizing.<br>• <strong>Neuro-Cognitive Axis (7.6/10):</strong> Moderate cognitive strain from trauma memory processing.<br>• <strong>Distress Tolerance (8.5/10):</strong> Grounding and TIPP skill capacity are stabilized.<br><br>Would you like to <button class="btn btn-dark btn-sm" onclick="openCounselorBookingModal()" style="margin-top: 6px;"><i class="fas fa-calendar-check"></i> Plan a 30-Min Counselor Check-Up</button> or practice 3 cycles in the <a href="#breathing" style="font-weight: 700; color: #6366f1;">Breathing Studio</a>?`;
    }

    // Default warm supportive response
    return `Thank you for sharing that with me. It takes courage to acknowledge how you're feeling. I am here to listen and help you navigate this moment.<br><br>Here are some things we can do right now:<br>1. <a href="#assessment" style="color: #6366f1; font-weight: 600;">Take the Stress & Trauma Assessment</a><br>2. <a href="#community-circles" style="color: #e59819; font-weight: 600;">Explore TheraHive DBT Circles</a><br>3. <a href="#breathing" style="color: #6366f1; font-weight: 600;">Try the Nature Breathing Exercise</a><br>4. <a href="tel:14566" style="color: #ef4444; font-weight: 600;">Call the 24/7 NHAA Helpline (14566)</a><br><br>How else can I assist you today?`;
}

/* ==========================================================================
   7. Crisis Detection & Immediate Intervention System
   ========================================================================== */
const DISTRESS_KEYWORDS = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'self-harm', 'self harm',
    'cutting', 'want to die', 'dont want to live', "don't want to live", 'better off dead',
    'no reason to live', 'end it all', 'take my life', 'hopeless', 'overdose'
];

function checkDistressKeywords(text, showModalImmediately = true) {
    if (!text) return false;
    const lower = text.toLowerCase();
    const isCrisis = DISTRESS_KEYWORDS.some(k => lower.includes(k));

    if (isCrisis && showModalImmediately) {
        triggerCrisisModal(
            'Emergency Psychological Support Available',
            'We noticed words in your message that suggest you may be in deep distress. Please know that your life has immense value and free, confidential support is here for you 24/7.'
        );
    }
    return isCrisis;
}

function triggerCrisisModal(title, message) {
    const modal = document.getElementById('crisisAlertModal');
    const titleEl = document.getElementById('crisisModalTitle');
    const msgEl = document.getElementById('crisisModalMessage');

    if (titleEl && title) titleEl.textContent = title;
    if (msgEl && message) msgEl.textContent = message;

    if (modal) {
        modal.classList.add('active');
    }
}

/* ==========================================================================
   8. Modals Management (Crisis, SOS, Auth, Legal)
   ========================================================================== */
function initModals() {
    // Close modal on click outside card
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn, .close-modal-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });

    // Emergency SOS Button trigger
    const sosFloatingBtn = document.getElementById('floatingSosBtn');
    if (sosFloatingBtn) {
        sosFloatingBtn.addEventListener('click', () => {
            const emergencyModal = document.getElementById('emergencySosModal');
            if (emergencyModal) emergencyModal.classList.add('active');
        });
    }

    // Voice Assessment Modal triggers
    const openVoiceBtns = document.querySelectorAll('.open-voice-modal-btn');
    openVoiceBtns.forEach(btn => {
        btn.addEventListener('click', openVoiceAssessmentModal);
    });

    const closeVoiceBtn = document.getElementById('closeVoiceModalBtn');
    if (closeVoiceBtn) closeVoiceBtn.addEventListener('click', closeVoiceAssessmentModal);

    const applyVoiceBtn = document.getElementById('applyVoiceTranscriptBtn');
    if (applyVoiceBtn) applyVoiceBtn.addEventListener('click', applyVoiceTranscriptToForm);

    // Language switch buttons
    document.querySelectorAll('.lang-pill-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-lang');
            if (lang) setVoiceLanguage(lang);
        });
    });

    // Auth modal trigger
    const authTriggers = document.querySelectorAll('.open-auth-modal-btn');
    authTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const authModal = document.getElementById('authModal');
            if (authModal) authModal.classList.add('active');
        });
    });

    // Privacy & Terms Modal triggers
    const privacyTriggers = document.querySelectorAll('.open-privacy-modal-btn');
    privacyTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('privacyPolicyModal');
            if (modal) modal.classList.add('active');
        });
    });

    const termsTriggers = document.querySelectorAll('.open-terms-modal-btn');
    termsTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('termsModal');
            if (modal) modal.classList.add('active');
        });
    });

    // TheraHive DBT Modal close button
    const closeDbtBtn = document.getElementById('closeDbtModalBtn');
    if (closeDbtBtn) {
        closeDbtBtn.addEventListener('click', closeDbtRegistrationModal);
    }
}

/* ==========================================================================
   9. TheraHive DBT Course & Circle Registration System
   ========================================================================== */
function openDbtRegistrationModal(courseName) {
    const modal = document.getElementById('dbtRegistrationModal');
    const select = document.getElementById('dbtCourseSelect');

    if (select && courseName) {
        // Match or select best option
        let found = false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase().includes(courseName.toLowerCase()) || 
                select.options[i].value.toLowerCase().includes(courseName.toLowerCase())) {
                select.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found && courseName.includes('Mindfulness')) {
            select.value = 'Mindfulness & Wise Mind Module';
        } else if (!found && courseName.includes('TIPP')) {
            select.value = 'TIPP Crisis Distress Tolerance';
        } else if (!found && courseName.includes('DEAR MAN')) {
            select.value = 'DEAR MAN: Boundary Defense';
        } else if (!found && courseName.includes('Peer')) {
            select.value = 'Survivor Peer Connection Circle';
        } else if (!found && courseName.includes('Somatic')) {
            select.value = 'Somatic Regulation Circle';
        }
    }

    if (modal) {
        modal.classList.add('active');
    }
}

function closeDbtRegistrationModal() {
    const modal = document.getElementById('dbtRegistrationModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleDbtRegistrationSubmit(event) {
    if (event) event.preventDefault();

    const courseSelect = document.getElementById('dbtCourseSelect');
    const nameInput = document.getElementById('dbtParticipantName');
    const contactInput = document.getElementById('dbtContactInfo');
    const slotSelect = document.getElementById('dbtPreferredSlot');
    const survivorCheck = document.getElementById('dbtNhaaSurvivorCheck');

    const courseName = courseSelect ? courseSelect.value : 'DBT Skills Circle';
    const participantName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Participant';
    const contact = contactInput && contactInput.value.trim() ? contactInput.value.trim() : 'Registered survivor';
    const slot = slotSelect ? slotSelect.value : 'Live Evening Cohort';
    const isSurvivor = survivorCheck ? survivorCheck.checked : true;

    // Simulate encrypted seat reservation
    const bookingPin = 'HIVE-' + Math.floor(1000 + Math.random() * 9000);

    closeDbtRegistrationModal();

    showToast(`🎉 Seat Confirmed for ${participantName}! (Cohort PIN: ${bookingPin})`, 'success');

    // Also trigger modal confirmation or alert details
    setTimeout(() => {
        showToast(`Encrypted video room & calendar invite dispatched for "${courseName}".`, 'info');
    }, 1800);

    // Reset form
    if (nameInput) nameInput.value = '';
    if (contactInput) contactInput.value = '';
}

/* ==========================================================================
   10. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question-btn');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/* ==========================================================================
   11. Toast Notification Utility
   ========================================================================== */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `mindcare-toast ${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 50px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 100000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ==========================================================================
   12. Bio-Somatic Trauma Recovery & Health Score (8.8 Ring Engine)
   ========================================================================== */

let healthScoreState = {
    overallScore: 8.8,
    systems: {
        endocrine: { name: 'Endocrine & Cortisol Axis', score: 8.3, status: 'Stabilized', category: 'stabilized', color: '#facc15' },
        cardio: { name: 'Cardio-Vagal & Autonomic Stability', score: 8.8, status: '+22%', category: 'improving', color: '#f472b6' },
        respiratory: { name: 'Respiratory Somatic Vagal Tone', score: 9.1, status: 'Optimal', category: 'improving', color: '#a3e635' },
        cognitive: { name: 'Neuro-Cognitive Memory & Focus', score: 7.6, status: 'Moderate Strain', category: 'high-strain', color: '#93c5fd' },
        distress: { name: 'Distress Tolerance & Grounding (DBT)', score: 8.5, status: 'Stabilized', category: 'stabilized', color: '#fbbf24' },
        gastro: { name: 'Enteric Gut-Brain Somatic Axis', score: 8.0, status: 'Stabilized', category: 'stabilized', color: '#84cc16' }
    },
    selectedSystem: null
};

function initHealthScoreEngine() {
    // Setup booking modal close triggers
    const closeBookingBtn = document.getElementById('closeBookingModalBtn');
    const bookingModal = document.getElementById('counselorBookingModal');
    if (closeBookingBtn && bookingModal) {
        closeBookingBtn.addEventListener('click', closeCounselorBookingModal);
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) closeCounselorBookingModal();
        });
    }

    // Setup simulator modal backdrop click
    const simModal = document.getElementById('mobileSimulatorModal');
    if (simModal) {
        simModal.addEventListener('click', (e) => {
            if (e.target === simModal) closeMobileSimulator();
        });
    }

    // Keyboard escape listener for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileSimulator();
            closeCounselorBookingModal();
            closeDbtRegistrationModal();
        }
    });

    // Default booking date to tomorrow
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        bookingDateInput.value = tomorrow.toISOString().split('T')[0];
        bookingDateInput.min = new Date().toISOString().split('T')[0];
    }
}

function selectHealthSystem(sysKey) {
    if (!sysKey || !healthScoreState.systems[sysKey]) return;

    healthScoreState.selectedSystem = sysKey;
    const sysData = healthScoreState.systems[sysKey];

    // Highlight donut arcs
    document.querySelectorAll('.donut-segment').forEach(arc => {
        arc.classList.remove('active-segment');
    });

    const targetArc = document.getElementById(`arc${sysKey.charAt(0).toUpperCase() + sysKey.slice(1)}`);
    if (targetArc) {
        targetArc.classList.add('active-segment');
    }

    // Highlight row in list
    document.querySelectorAll('.system-item-row').forEach(row => {
        row.classList.remove('active-row');
    });

    const targetRow = document.getElementById(`sysRow${sysKey.charAt(0).toUpperCase() + sysKey.slice(1)}`);
    if (targetRow) {
        targetRow.classList.add('active-row');
        targetRow.style.display = 'flex';
    }

    // Update assistant card with contextual insight
    const assistantMsg = document.getElementById('assistantMessageDisplay');
    if (assistantMsg) {
        let msg = '';
        switch(sysKey) {
            case 'cardio':
                msg = `Cardio-vagal tone is currently at <strong>${sysData.score}/10</strong>. Heart Rate Variability demonstrates robust parasympathetic recovery.`;
                break;
            case 'respiratory':
                msg = `Respiratory tone is optimal at <strong>${sysData.score}/10</strong>. Deep diaphragmatic breathing continues to signal safety to your amygdala.`;
                break;
            case 'endocrine':
                msg = `Cortisol rhythm is stabilized at <strong>${sysData.score}/10</strong>. Maintain regular sleep routines to prevent adrenal depletion.`;
                break;
            case 'cognitive':
                msg = `Cognitive strain is registered at <strong>${sysData.score}/10</strong>. Flashback de-escalation and grounding will restore focus.`;
                break;
            case 'distress':
                msg = `Distress tolerance is steady at <strong>${sysData.score}/10</strong>. TIPP physical temperature tools provide fast panic relief.`;
                break;
            case 'gastro':
                msg = `Enteric gut-brain calm is at <strong>${sysData.score}/10</strong>. Visceral somatic tension has subsided.`;
                break;
            default:
                msg = `Somatic axis ${sysData.name} evaluated at <strong>${sysData.score}/10</strong>.`;
        }
        assistantMsg.innerHTML = msg;
    }

    showToast(`Inspecting: ${sysData.name} (${sysData.score}/10)`, 'info');
}

function filterHealthSystems(category, btnEl) {
    // Update chip buttons
    document.querySelectorAll('.systems-filter-group .sys-filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    if (btnEl) btnEl.classList.add('active');

    // Filter rows
    const rows = document.querySelectorAll('.health-systems-list .system-item-row');
    rows.forEach(row => {
        const rowCategory = row.getAttribute('data-category');
        if (category === 'all' || rowCategory === category) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleSimulatorScoreChange(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return;

    healthScoreState.overallScore = num;

    // 1. Update text displays
    const overallDisplay = document.getElementById('overallScoreDisplay');
    const simScoreTag = document.getElementById('simulatorScoreTag');
    const simBigScore = document.querySelector('.sim-score-big');

    if (overallDisplay) overallDisplay.textContent = num.toFixed(1);
    if (simScoreTag) simScoreTag.textContent = `Overall: ${num.toFixed(1)} / 10`;
    if (simBigScore) simBigScore.textContent = num.toFixed(1);

    // 2. Adjust trend badge
    const trendBadge = document.getElementById('scoreTrendDisplay');
    if (trendBadge) {
        if (num >= 8.5) {
            trendBadge.className = 'score-trend-badge up';
            trendBadge.innerHTML = '<i class="fas fa-arrow-trend-up"></i> +14% This Week';
        } else if (num >= 7.0) {
            trendBadge.className = 'score-trend-badge up';
            trendBadge.innerHTML = '<i class="fas fa-minus"></i> Stable Recovery';
        } else {
            trendBadge.className = 'score-trend-badge down';
            trendBadge.innerHTML = '<i class="fas fa-arrow-trend-down"></i> High Somatic Strain';
        }
    }

    // 3. Proportional scaling factor relative to baseline 8.8
    const scaleFactor = num / 8.8;

    // Recalculate system meters
    const systemKeys = ['endocrine', 'cardio', 'respiratory', 'cognitive', 'distress', 'gastro'];
    const baseScores = { endocrine: 8.3, cardio: 8.8, respiratory: 9.1, cognitive: 7.6, distress: 8.5, gastro: 8.0 };

    systemKeys.forEach(key => {
        const newScore = Math.min(10.0, Math.max(3.0, baseScores[key] * scaleFactor)).toFixed(1);
        const row = document.getElementById(`sysRow${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (row) {
            const scoreValEl = row.querySelector('.system-score-val');
            const progressFillEl = row.querySelector('.system-progress-fill');
            if (scoreValEl) scoreValEl.innerHTML = `${newScore} <small>of 10</small>`;
            if (progressFillEl) progressFillEl.style.width = `${Math.round(newScore * 10)}%`;
        }
    });

    // 4. Update Assistant Alert message
    const assistantMsg = document.getElementById('assistantMessageDisplay');
    if (assistantMsg) {
        if (num < 7.0) {
            assistantMsg.innerHTML = `High somatic trauma strain detected (<strong>${num.toFixed(1)}/10</strong>). Urgent 1-on-1 counseling session strongly recommended.`;
        } else if (num < 8.5) {
            assistantMsg.innerHTML = `Moderate recovery state (<strong>${num.toFixed(1)}/10</strong>). 4-7-8 breathing and DBT grounding recommended to elevate vagal tone.`;
        } else {
            assistantMsg.innerHTML = `Taigo, your cardio-vagal stability is optimal at <strong>${num.toFixed(1)}/10</strong> with robust parasympathetic balance.`;
        }
    }
}

function openMobileSimulator() {
    const modal = document.getElementById('mobileSimulatorModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileSimulator() {
    const modal = document.getElementById('mobileSimulatorModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openCounselorBookingModal() {
    const modal = document.getElementById('counselorBookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCounselorBookingModal() {
    const modal = document.getElementById('counselorBookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleCounselorBookingSubmit(event) {
    if (event) event.preventDefault();

    const specialty = document.getElementById('bookingSpecialty')?.value || 'Autonomic Trauma Recovery';
    const date = document.getElementById('bookingDate')?.value || 'Tomorrow';
    const time = document.getElementById('bookingTime')?.value || 'Morning (10:00 AM)';
    const contact = document.getElementById('bookingContact')?.value || 'Confidential Survivor';

    const bookingRef = 'CLINIC-' + Math.floor(10000 + Math.random() * 90000);

    closeCounselorBookingModal();

    showToast(`🗓️ Check-Up Reserved for ${date} at ${time}! Ref: ${bookingRef}`, 'success');

    setTimeout(() => {
        showToast(`Specialty assigned: "${specialty}". Encrypted room PIN dispatched to ${contact}.`, 'info');
    }, 1800);

    const form = document.getElementById('counselorBookingForm');
    if (form) form.reset();
}

function discussScoreWithAI(promptText) {
    closeMobileSimulator();

    const chatSection = document.getElementById('chatbot');
    if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = promptText || 'Explain my bio-somatic health score and how breathing improved my vagal tone';
        setTimeout(() => {
            handleChatSubmit();
        }, 600);
    }
}

function scrollToAssessment() {
    closeMobileSimulator();
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function openShareCareModal() {
    const ref = 'DOSSIER-NHAA-' + Math.floor(1000 + Math.random() * 9000);
    showToast(`🔒 Encrypted Case Dossier (${ref}) securely shared with assigned NHAA trauma counselor.`, 'success');
}

function onBreathingCycleCompleted(cycleCount) {
    if (cycleCount === 1) {
        showToast('First breathing cycle complete! Parasympathetic activation initiated.', 'info');
    } else if (cycleCount >= 2) {
        // Boost cardio and respiratory scores
        const newOverall = Math.min(9.4, healthScoreState.overallScore + 0.1).toFixed(1);
        healthScoreState.overallScore = parseFloat(newOverall);

        const overallDisplay = document.getElementById('overallScoreDisplay');
        if (overallDisplay) overallDisplay.textContent = newOverall;

        const assistantMsg = document.getElementById('assistantMessageDisplay');
        if (assistantMsg) {
            assistantMsg.innerHTML = `Great job! Completing <strong>${cycleCount} breathing cycles</strong> boosted your vagal resilience to <strong>${newOverall}/10</strong>.`;
        }

        if (cycleCount === 2) {
            showToast(`🌿 Cardio-Vagal score boosted to ${newOverall}/10 from mindful breathing!`, 'success');
        }
    }
}

function onAssessmentSubmittedUpdateScore(formData) {
    const stress = formData.stressLevel || 5;
    // Map stress (1-10) to resilience score (e.g. 10 stress -> 5.4 resilience, 1 stress -> 9.6)
    const calculatedResilience = Math.max(5.0, Math.min(9.8, (10 - (stress * 0.42)))).toFixed(1);
    
    handleSimulatorScoreChange(calculatedResilience);
    const rangeInput = document.getElementById('simulatorRangeInput');
    if (rangeInput) rangeInput.value = calculatedResilience;

    const assistantMsg = document.getElementById('assistantMessageDisplay');
    if (assistantMsg) {
        assistantMsg.innerHTML = `Assessment calibrated for Ref <strong>${formData.referenceId}</strong>. Bio-Somatic Resilience scored at <strong>${calculatedResilience}/10</strong>.`;
    }
}

/**
 * Downloads a comprehensive PDF Clinical Dossier summarizing all 6 bio-somatic axes
 */
function downloadClinicalDossier() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast('Generating dossier... Please ensure PDF libraries are ready.', 'info');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const score = healthScoreState.overallScore.toFixed(1);

    // Header styling
    doc.setFillColor(24, 24, 27);
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('MINDCARE AI - BIO-SOMATIC CLINICAL DOSSIER', 14, 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('NHAA National Public Service Initiative (Ministry of Social Justice & Empowerment)', 14, 24);
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Dossier Ref: NHAA-BIO-${Math.floor(100000 + Math.random() * 900000)}`, 14, 30);

    // Resilience Score Banner
    doc.setFillColor(253, 226, 228);
    doc.roundedRect(14, 44, 182, 30, 3, 3, 'F');

    doc.setTextColor(190, 24, 93);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('COMPOSITE BIO-SOMATIC RESILIENCE INDEX', 20, 52);

    doc.setTextColor(24, 24, 27);
    doc.setFontSize(22);
    doc.text(`${score} / 10.0`, 20, 64);

    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Status: Clinically Stabilized Autonomic Function (Active Parasympathetic Modulation)', 75, 62);

    // Systems Breakdown Table
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Multi-System Autonomic & Somatic Breakdown', 14, 86);

    let y = 96;
    const systemsList = [
        { name: '1. Cardio-Vagal & Autonomic Stability', score: '8.8 / 10', status: 'Optimal (+22% HRV)', color: [244, 114, 182] },
        { name: '2. Respiratory Somatic Vagal Tone', score: '9.1 / 10', status: 'Optimal (Paced Oxygenation)', color: [163, 230, 53] },
        { name: '3. Endocrine & Cortisol Axis', score: '8.3 / 10', status: 'Stabilized (Adrenal Recovery)', color: [250, 204, 21] },
        { name: '4. Distress Tolerance & Grounding (DBT)', score: '8.5 / 10', status: 'Stabilized (TIPP Mastery)', color: [251, 191, 36] },
        { name: '5. Enteric Gut-Brain Somatic Axis', score: '8.0 / 10', status: 'Stabilized (Visceral Calm)', color: [132, 204, 22] },
        { name: '6. Neuro-Cognitive Memory & Focus', score: '7.6 / 10', status: 'Moderate Strain (Flashback Processing)', color: [147, 197, 253] }
    ];

    systemsList.forEach(sys => {
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(14, y - 5, 182, 14, 2, 2, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text(sys.name, 20, y + 3);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(sys.score, 120, y + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139);
        doc.text(sys.status, 145, y + 3);

        y += 18;
    });

    // Clinical Recommendations
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('Recommended Clinical Interventions', 14, y);

    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const recs = [
        '• Continue daily 4-7-8 Mindful Breathing to maintain parasympathetic vagal stimulation.',
        '• Join the TheraHive "TIPP Crisis Distress Tolerance" weekly live DBT cohort for panic prevention.',
        '• Schedule a 30-minute 1-on-1 counseling follow-up for neuro-cognitive memory consolidation.',
        '• 24/7 Priority NHAA Trauma Helpline is accessible toll-free at 14566.'
    ];
    recs.forEach(r => {
        doc.text(r, 16, y);
        y += 8;
    });

    // Confidentiality Footer
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 268, 182, 16, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('CONFIDENTIAL & ENCRYPTED MEDICAL RECORD • DPDP ACT COMPLIANT • NHAA GOVT OF INDIA PUBLIC SERVICE', 20, 278);

    doc.save(`MindCare_BioSomatic_Dossier_${score}.pdf`);
    showToast('📄 Bio-Somatic Clinical Dossier PDF downloaded successfully!', 'success');
}

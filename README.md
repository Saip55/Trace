# MindCare AI - Real-Time Stress & Trauma Assessment Portal

> **National Helpline Against Atrocities (NHAA - 14566) • Ministry of Social Justice & Empowerment**
> Developed for Smart India Hackathon 2026 (SIH 2026)

MindCare AI is a calm, trustworthy, crisis-aware mental health support portal reverse-engineered and built for real-time stress screening, trauma assessment, and psychological first-aid for victims, survivors, and complainants.

---

## 🌟 Key Features

1. **24/7 Emergency Crisis Helpline Ribbon**:
   - One-tap calling to `14566` (NHAA Toll-Free), `108` (Ambulance), `100` (Police), `1091` (Women Helpline), and `9820466726` (AASRA Suicide Prevention).
2. **Stress & Trauma Assessment (Form & Voice)**:
   - Form fields for personal details or complete **Anonymous Submission Mode**.
   - Interactive Stress Slider (1–10) with real-time emotion feedback and color-coded distress tiers.
   - **Multilingual Voice Assessment Studio** with speech-to-text transcription for English, Hindi (हिंदी), and Telugu (తెలుగు).
   - Instant triage evaluation, unique Reference ID generation (`NHAA-MC-XXXXXX`), and counselor response SLA timeline (2–4 hrs for high-risk, 24 hrs standard).
   - **Clinical PDF Report Generation** using client-side `jsPDF`.
3. **Automated Crisis Intervention Detection**:
   - Real-time scanner monitoring distress phrases and stress levels $\ge 9/10$, automatically presenting emergency counseling intervention modals.
4. **Mindful Breathing Space (4-7-8 Technique)**:
   - Interactive expanding/contracting breathing visualizer circle with nature backdrop transitions.
   - Zero-latency procedural calming sine wave audio synthesizer using the **Web Audio API** (392Hz, 440Hz, 329Hz).
   - Cycle counter, elapsed stopwatch, and sound mute/unmute toggle.
5. **AI Support Chatbot Companion ("MindCare Companion")**:
   - Trauma-informed active listening engine with contextual recommendations and one-click quick prompt pills.
6. **NHAA Integration Hub**:
   - Explaining the dual legal (NHAA) and psychological (MindCare AI) care framework.
7. **Educational Resources, Testimonials, & FAQ Accordion**:
   - Interactive guides on recognizing stress, panic de-escalation, and expandable FAQ answers.

---

## 🚀 How to Run & Locally Host

The project runs 100% locally with zero external build step dependencies.

### Option 1: Python HTTP Server (Already active on port 8085)
```bash
python3 -m http.server 8085
```
Then visit: **[http://localhost:8085](http://localhost:8085)**

### Option 2: Node.js / NPM
```bash
npm start
# or
npx serve . -l 8085
```

### Option 3: PHP Built-in Server
```bash
php -S localhost:8085
```

---

## 🎨 Design Tokens & Visual Architecture

- **Canvas Background**: `#F8FAFC` (pale blue-gray)
- **Surfaces**: `#FFFFFF` with `#E2E8F0` soft borders and `0 4px 12px -2px rgba(15, 23, 42, 0.08)` shadows
- **Headings & Trust Identity**: `Poppins` font with Trust Blue `#667eea` / `#4f46e5`
- **Body Typography**: `Inter` font (`#475569`)
- **Emergency & Urgency Accents**: Alert Red `#EF4444` and Support Orange `#F97316`
- **Pill Buttons**: `50px` border radius with hover elevations

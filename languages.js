/**
 * MindCare AI / TRACE — Multilingual Localization & Regional Language Service
 * Supported Languages: English (en), Hindi (hi), Marathi (mr), Telugu (te)
 */

const LanguageService = {
    currentLang: localStorage.getItem('mindcare_lang') || 'en',

    // Voice recognition BCP-47 language codes
    speechLangCodes: {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'te': 'te-IN'
    },

    langMeta: {
        'en': { name: 'English', native: 'English', flag: '🇬🇧', speechCode: 'en-US' },
        'hi': { name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', speechCode: 'hi-IN' },
        'mr': { name: 'Marathi', native: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN' },
        'te': { name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN' }
    },

    // Multilingual Crisis & Distress Keywords Scanner Dictionary
    distressKeywords: {
        en: [
            'suicide', 'suicidal', 'kill myself', 'end my life', 'self-harm', 'self harm',
            'cutting', 'want to die', 'dont want to live', "don't want to live", 'better off dead',
            'no reason to live', 'end it all', 'take my life', 'hopeless', 'overdose'
        ],
        hi: [
            'आत्महत्या', 'खुदकुशी', 'मरना चाहता हूँ', 'मरना चाहती हूँ', 'जान देना', 'जान लेना',
            'जीना नहीं चाहता', 'जीना नहीं चाहती', 'खुद को मारना', 'जिंदगी खत्म', 'मौत',
            'खुद को नुकसान', 'सब खत्म करना', 'निराश', 'कोई उम्मीद नहीं'
        ],
        mr: [
            'आत्महत्या', 'मरणे', 'स्वतःला मारणे', 'जीव देणे', 'जीवन संपवणे', 'जगावेसे वाटत नाही',
            'मरावं वाटतंय', 'स्वतःला इजा', 'जीव नकोसा झालाय', 'सगळं संपवावंसं वाटतं',
            'काहीच आशा नाही', 'नैराश्य', 'भीती वाटते', 'अतिशय त्रास'
        ],
        te: [
            'ఆత్మహత్య', 'చనిపోవాలనుకుంటున్నాను', 'ప్రాణం తీసుకోవడం', 'చావాలని ఉంది',
            'జీవితం ముగించాలి', 'బతకాలని లేదు', 'నా ప్రాణం తీసేసుకుంటాను', 'తీవ్ర నిరాశ',
            'స్వయంగా గాయపరచుకోవడం', 'ఆశ లేదు'
        ]
    },

    // Complete UI Translations Dictionary
    translations: {
        en: {
            // Navigation
            nav_home: 'Home',
            nav_nhaa: 'NHAA Link',
            nav_features: 'Features',
            nav_assessment: 'Assessment',
            nav_breathe: 'Breathe',
            nav_companion: 'AI Companion',
            nav_how_it_works: 'How It Works',
            nav_faq: 'FAQ',
            nav_emergency_sos: 'Emergency SOS',
            nav_portal_login: 'Portal Login',
            logo_subtitle: 'NHAA • 14566 PORTAL',

            // Hero Section
            hero_eyebrow: 'AI-Powered Psychological First Aid',
            hero_title_prefix: 'Real-Time Stress &',
            hero_title_highlight: 'Trauma Assessment',
            hero_title_suffix: 'for NHAA Victims',
            hero_description: 'Immediate trauma screening, crisis stabilization, and confidential psychological support for survivors and complainants. Connected directly with the <strong>National Helpline Against Atrocities (14566)</strong>.',
            hero_cta_assessment: 'Start Assessment',
            hero_cta_sos: 'Call 14566 Helpline',
            hero_cta_breathe: 'Mindful Breathing',
            hero_stat_time: 'Instant Triage SLA',
            hero_stat_confidential: '100% Confidential',
            hero_stat_helpline: '24/7 National Support',

            // Assessment Form
            assess_heading: 'Confidential Trauma & Stress Assessment',
            assess_subheading: 'Answer a few calm questions or use the voice studio to speak freely. All data is end-to-end encrypted.',
            assess_anon_toggle: 'Submit Anonymously (No Personal Info Required)',
            assess_name_label: 'Your Name or Alias',
            assess_name_ph: 'e.g., Rahul Sharma or Anonymous',
            assess_contact_label: 'Contact Number / WhatsApp (Optional)',
            assess_contact_ph: '10-digit mobile number',
            assess_age_label: 'Age Group',
            assess_category_label: 'Primary Concern / Incident Nature',
            assess_stress_level_label: 'Current Emotional Distress Level (1 - 10)',
            assess_feelings_label: 'Describe What You Are Experiencing',
            assess_feelings_ph: 'Describe what happened, how you are feeling, or click Voice Studio to speak...',
            assess_voice_btn: 'Voice Assessment Studio',
            assess_submit_btn: 'Submit for Clinical Triage',

            // Breathing Space
            breathe_heading: 'Mindful Breathing Space (4-7-8 Technique)',
            breathe_subheading: 'Regulate your autonomic nervous system with guided rhythmic breathing and harmonic sine tones.',
            breathe_inhale: 'Inhale',
            breathe_hold: 'Hold',
            breathe_exhale: 'Exhale',
            breathe_start_btn: 'Start Exercise',
            breathe_pause_btn: 'Pause',
            breathe_resume_btn: 'Resume Exercise',
            breathe_reset_btn: 'Reset',
            breathe_sound_toggle: 'Sound On/Off',

            // AI Companion
            chat_heading: 'MindCare AI Companion',
            chat_subheading: 'Trauma-informed 24/7 supportive active listener',
            chat_placeholder: 'Type how you are feeling right now...',
            chat_send_btn: 'Send',
            chat_prompt_1: 'I am feeling overwhelmed',
            chat_prompt_2: 'Explain 4-7-8 breathing',
            chat_prompt_3: 'How does NHAA 14566 help?',
            chat_prompt_4: 'Connect with a counselor',

            // Emergency SOS Modal
            sos_modal_title: '24/7 National Emergency Helplines',
            sos_nhaa_desc: 'National Helpline Against Atrocities (Toll-Free)',
            sos_medical_desc: 'Emergency Medical & Ambulance',
            sos_police_desc: 'Police Emergency Response',
            sos_women_desc: 'National Women Helpline',
            sos_aasra_desc: 'AASRA Suicide Prevention & Crisis Support'
        },

        hi: {
            // Navigation
            nav_home: 'होम',
            nav_nhaa: 'NHAA लिंक',
            nav_features: 'सुविधाएं',
            nav_assessment: 'मूल्यांकन',
            nav_breathe: 'प्राणायाम',
            nav_companion: 'AI साथी',
            nav_how_it_works: 'कार्यप्रणाली',
            nav_faq: 'सवाल-जवाब',
            nav_emergency_sos: 'आपातकालीन SOS',
            nav_portal_login: 'लॉग इन',
            logo_subtitle: 'NHAA • 14566 पोर्टल',

            // Hero Section
            hero_eyebrow: 'AI-संचालित मानसिक प्राथमिक उपचार',
            hero_title_prefix: 'त्वरित तनाव और',
            hero_title_highlight: 'आघात मूल्यांकन',
            hero_title_suffix: 'NHAA पीड़ितों हेतु',
            hero_description: 'पीड़ितों और शिकायतकर्ताओं के लिए तत्काल आघात स्क्रीनिंग, संकट स्थिरीकरण और गोपनीय मानसिक स्वास्थ्य सहायता। <strong>राष्ट्रीय अत्याचार निवारण हेल्पलाइन (14566)</strong> से सीधे जुड़ा हुआ।',
            hero_cta_assessment: 'मूल्यांकन शुरू करें',
            hero_cta_sos: '14566 हेल्पलाइन पर कॉल करें',
            hero_cta_breathe: 'शांत प्राणायाम',
            hero_stat_time: 'त्वरित ट्राइएज रिपोर्ट',
            hero_stat_confidential: '100% पूर्ण गोपनीय',
            hero_stat_helpline: '24/7 राष्ट्रीय सहायता',

            // Assessment Form
            assess_heading: 'गोपनीय आघात एवं तनाव मूल्यांकन',
            assess_subheading: 'कुछ आसान प्रश्नों के उत्तर दें या बोलकर अपनी बात कहें। आपकी सभी जानकारी पूर्णतः सुरक्षित है।',
            assess_anon_toggle: 'गुमनाम रूप से जमा करें (व्यक्तिगत जानकारी आवश्यक नहीं)',
            assess_name_label: 'आपका नाम या उपनाम',
            assess_name_ph: 'उदा. राहुल शर्मा या अज्ञात',
            assess_contact_label: 'संपर्क नंबर / व्हाट्सएप (वैकल्पिक)',
            assess_contact_ph: '10 अंकों का मोबाइल नंबर',
            assess_age_label: 'आयु वर्ग',
            assess_category_label: 'मुख्य चिंता / घटना का प्रकार',
            assess_stress_level_label: 'वर्तमान मानसिक तनाव स्तर (1 - 10)',
            assess_feelings_label: 'आप कैसा महसूस कर रहे हैं, साझा करें',
            assess_feelings_ph: 'क्या हुआ और आप कैसा महसूस कर रहे हैं लिखें, या वॉइस स्टूडियो पर क्लिक करके बोलें...',
            assess_voice_btn: 'वॉइस स्टूडियो (बोलकर बताएं)',
            assess_submit_btn: 'मूल्यांकन रिपोर्ट प्राप्त करें',

            // Breathing Space
            breathe_heading: 'मनन एवं प्राणायाम कक्ष (4-7-8 विधि)',
            breathe_subheading: 'लयबद्ध सांस और शांत तरंगों के माध्यम से अपने तंत्रिका तंत्र को शांत करें।',
            breathe_inhale: 'सांस अंदर लें',
            breathe_hold: 'सांस रोकें',
            breathe_exhale: 'सांस बाहर छोड़ें',
            breathe_start_btn: 'अभ्यास शुरू करें',
            breathe_pause_btn: 'रोकें',
            breathe_resume_btn: 'पुनः शुरू करें',
            breathe_reset_btn: 'रीसेट',
            breathe_sound_toggle: 'ध्वनि चालू/बंद',

            // AI Companion
            chat_heading: 'माइंडकेयर AI साथी',
            chat_subheading: '24/7 संवेदनशील मानसिक स्वास्थ्य श्रोता',
            chat_placeholder: 'आप अभी कैसा महसूस कर रहे हैं, यहाँ लिखें...',
            chat_send_btn: 'भेजें',
            chat_prompt_1: 'मुझे बहुत घबराहट हो रही है',
            chat_prompt_2: '4-7-8 प्राणायाम कैसे करें?',
            chat_prompt_3: 'NHAA 14566 कैसे मदद करता है?',
            chat_prompt_4: 'काउंसलर से बात करनी है',

            // Emergency SOS Modal
            sos_modal_title: '24/7 राष्ट्रीय आपातकालीन हेल्पलाइन नंबर',
            sos_nhaa_desc: 'राष्ट्रीय अत्याचार निवारण हेल्पलाइन (टोल-फ्री)',
            sos_medical_desc: 'आपातकालीन एम्बुलेंस व चिकित्सा',
            sos_police_desc: 'पुलिस आपातकालीन सहायता',
            sos_women_desc: 'राष्ट्रीय महिला हेल्पलाइन',
            sos_aasra_desc: 'आसरा आत्महत्या रोकथाम एवं संकट सहायता'
        },

        mr: {
            // Navigation
            nav_home: 'मुख्यपृष्ठ',
            nav_nhaa: 'NHAA लिंक',
            nav_features: 'वैशिष्ट्ये',
            nav_assessment: 'चाचणी',
            nav_breathe: 'श्वसन क्रिया',
            nav_companion: 'AI सोबती',
            nav_how_it_works: 'कार्यपद्धती',
            nav_faq: 'प्रश्नोत्तरे',
            nav_emergency_sos: 'आपत्कालीन SOS',
            nav_portal_login: 'लॉग इन',
            logo_subtitle: 'NHAA • 14566 पोर्टल',

            // Hero Section
            hero_eyebrow: 'AI-आधारित मानसिक प्रथमोपचार',
            hero_title_prefix: 'रिअल-टाइम तणाव आणि',
            hero_title_highlight: 'आघात मूल्यांकन',
            hero_title_suffix: 'NHAA बाधितांसाठी',
            hero_description: 'अत्याचार पीडित आणि तक्रारदारांसाठी त्वरित आघात तपासणी, संकट निवारण आणि अत्यंत गोपनीय मानसिक आरोग्य साहाय्य. <strong>राष्ट्रीय अत्याचार निवारण हेल्पलाइन (14566)</strong> शी थेट जोडलेले.',
            hero_cta_assessment: 'चाचणी सुरू करा',
            hero_cta_sos: '14566 हेल्पलाइनला कॉल करा',
            hero_cta_breathe: 'शांत श्वसन व्यायाम',
            hero_stat_time: 'त्वरित ट्रायज अहवाल',
            hero_stat_confidential: '100% पूर्णतः गोपनीय',
            hero_stat_helpline: '24/7 राष्ट्रीय साहाय्य',

            // Assessment Form
            assess_heading: 'गोपनीय आघात आणि तणाव मूल्यांकन',
            assess_subheading: 'काही सोप्या प्रश्नांची उत्तरे द्या किंवा बोलून आपल्या भावना व्यक्त करा. तुमची सर्व माहिती पूर्णपणे सुरक्षित आहे.',
            assess_anon_toggle: 'नाव गुप्त ठेवून सादर करा (वैयक्तिक माहिती आवश्यक नाही)',
            assess_name_label: 'तुमचे नाव किंवा टोपणनाव',
            assess_name_ph: 'उदा. सागर पाटील किंवा अज्ञात',
            assess_contact_label: 'संपर्क क्रमांक / व्हॉट्सअॅप (ऐच्छिक)',
            assess_contact_ph: '10 अंकी मोबाईल क्रमांक',
            assess_age_label: 'वयोगट',
            assess_category_label: 'घटनेचे स्वरूप / प्रमुख समस्या',
            assess_stress_level_label: 'सध्याचा मानसिक तणाव स्तर (1 - 10)',
            assess_feelings_label: 'तुम्हाला सध्या काय त्रास होत आहे ते सांगा',
            assess_feelings_ph: 'काय घडले आणि तुम्हाला कसे वाटते ते लिहा, किंवा व्हॉईस स्टुडिओद्वारे बोलून सांगा...',
            assess_voice_btn: 'व्हॉईस स्टुडिओ (मराठीत बोला)',
            assess_submit_btn: 'मूल्यांकन अहवाल मिळवा',

            // Breathing Space
            breathe_heading: 'माइंडफुल श्वसन कक्ष (4-7-8 पद्धत)',
            breathe_subheading: 'लयबद्ध श्वासोच्छ्वास आणि शांत स्वरांच्या साहाय्याने मज्जासंस्थेचा तणाव कमी करा.',
            breathe_inhale: 'श्वास आत घ्या',
            breathe_hold: 'श्वास रोखून धरा',
            breathe_exhale: 'श्वास हळूहळू सोडा',
            breathe_start_btn: 'सुरू करा',
            breathe_pause_btn: 'थांबवा',
            breathe_resume_btn: 'पुन्हा सुरू करा',
            breathe_reset_btn: 'रीसेट',
            breathe_sound_toggle: 'आवाज चालू/बंद',

            // AI Companion
            chat_heading: 'माइंडकेअर AI सोबती',
            chat_subheading: '24/7 संवेदनशील मानसिक आधार देणारा मार्गदर्शक',
            chat_placeholder: 'तुम्हाला सध्या कसे वाटत आहे, येथे लिहा...',
            chat_send_btn: 'पाठवा',
            chat_prompt_1: 'मला खूप भीती आणि चिंता वाटतेय',
            chat_prompt_2: '4-7-8 श्वसन पद्धत कशी करायची?',
            chat_prompt_3: 'NHAA 14566 कशी मदत करते?',
            chat_prompt_4: 'समुपदेशकाशी (Counselor) बोलायचे आहे',

            // Emergency SOS Modal
            sos_modal_title: '24/7 राष्ट्रीय आपत्कालीन हेल्पलाइन क्रमांक',
            sos_nhaa_desc: 'राष्ट्रीय अत्याचार निवारण हेल्पलाइन (टोल-फ्री)',
            sos_medical_desc: 'आपत्कालीन रुग्णवाहिका आणि वैद्यकीय मदत',
            sos_police_desc: 'पोलीस आपत्कालीन साहाय्य',
            sos_women_desc: 'राष्ट्रीय महिला हेल्पलाइन',
            sos_aasra_desc: 'आसरा आत्महत्या प्रतिबंध आणि मानसिक आधार'
        },

        te: {
            // Navigation
            nav_home: 'హోమ్',
            nav_nhaa: 'NHAA లింక్',
            nav_features: 'ఫీచర్లు',
            nav_assessment: 'పరీక్ష',
            nav_breathe: 'శ్వాస వ్యాయామం',
            nav_companion: 'AI సహచరి',
            nav_how_it_works: 'ఎలా పనిచేస్తుంది',
            nav_faq: 'ప్రశ్నోత్తరాలు',
            nav_emergency_sos: 'అత్యవసర SOS',
            nav_portal_login: 'లాగిన్',
            logo_subtitle: 'NHAA • 14566 పోర్టల్',

            // Hero Section
            hero_eyebrow: 'AI-ఆధారిత మానసిక ప్రథమ చికిత్స',
            hero_title_prefix: 'రియల్ టైమ్ ఒత్తిడి మరియు',
            hero_title_highlight: 'ట్రామా అసెస్‌మెంట్',
            hero_title_suffix: 'బాధితుల కోసం',
            hero_description: 'బాధితులకు తక్షణ ట్రామా స్క్రీనింగ్, సంక్షోభ నివారణ మరియు అత్యంత రహస్య మానసిక మద్దతు. <strong>జాతీయ అకృత్యాల నిరోధక హెల్ప్‌లైన్ (14566)</strong>తో నేరుగా అనుసంధానించబడింది.',
            hero_cta_assessment: 'పరీక్ష ప్రారంభించండి',
            hero_cta_sos: '14566 హెల్ప్‌లైన్‌కు కాల్ చేయండి',
            hero_cta_breathe: 'శ్వాస వ్యాయామం',
            hero_stat_time: 'తక్షణ ట్రయాజ్ నివేదిక',
            hero_stat_confidential: '100% అత్యంత రహస్యం',
            hero_stat_helpline: '24/7 జాతీయ మద్దతు',

            // Assessment Form
            assess_heading: 'రహస్య ట్రామా మరియు ఒత్తిడి మూల్యాంకనం',
            assess_subheading: 'కొన్ని సాధారణ ప్రశ్నలకు సమాధానం ఇవ్వండి లేదా మాట్లాడండి. మీ సమాచారం పూర్తిగా భద్రపరచబడుతుంది.',
            assess_anon_toggle: 'పేరు లేకుండా సమర్పించండి (వ్యక్తిగత వివరాలు అవసరం లేదు)',
            assess_name_label: 'మీ పేరు లేదా మారుపేరు',
            assess_name_ph: 'ఉదా. రమేష్ లేదా అజ్ఞాత',
            assess_contact_label: 'సంప్రదింపు నంబర్ / వాట్సాప్ (ఐచ్ఛికం)',
            assess_contact_ph: '10 అంకెల మొబైల్ నంబర్',
            assess_age_label: 'వయోవర్గం',
            assess_category_label: 'సమస్య / సంఘటన స్వభావం',
            assess_stress_level_label: 'ప్రస్తుత మానసిక ఒత్తిడి స్థాయి (1 - 10)',
            assess_feelings_label: 'మీరు ఎలా భావిస్తున్నారో వివరించండి',
            assess_feelings_ph: 'ఏమి జరిగిందో మరియు మీరు ఎలా భావిస్తున్నారో రాయండి, లేదా వాయిస్ స్టూడియో ద్వారా మాట్లాడండి...',
            assess_voice_btn: 'వాయిస్ స్టూడియో (తెలుగులో మాట్లాడండి)',
            assess_submit_btn: 'అంచనా నివేదికను పొందండి',

            // Breathing Space
            breathe_heading: 'శ్వాస వ్యాయామ కేంద్రం (4-7-8 పద్ధతి)',
            breathe_subheading: 'లయబద్ధమైన శ్వాస ద్వారా మీ నాడీ వ్యవస్థను ప్రశాంతపరచండి.',
            breathe_inhale: 'శ్వాస తీసుకోండి',
            breathe_hold: 'శ్వాసను ఆపండి',
            breathe_exhale: 'శ్వాస వదలండి',
            breathe_start_btn: 'ప్రారంభించండి',
            breathe_pause_btn: 'ఆపండి',
            breathe_resume_btn: 'పునఃప్రారంభించండి',
            breathe_reset_btn: 'రీసెట్',
            breathe_sound_toggle: 'ధ్వని ఆన్/ఆఫ్',

            // AI Companion
            chat_heading: 'మైండ్‌కేర్ AI సహచరి',
            chat_subheading: '24/7 మానసిక ఆరోగ్య సహాయక మార్గదర్శి',
            chat_placeholder: 'మీరు ప్రస్తుతం ఎలా భావిస్తున్నారో ఇక్కడ రాయండి...',
            chat_send_btn: 'పంపండి',
            chat_prompt_1: 'నాకు చాలా భయం మరియు ఆందోళనగా ఉంది',
            chat_prompt_2: '4-7-8 శ్వాస పద్ధతి ఎలా చేయాలి?',
            chat_prompt_3: 'NHAA 14566 ఎలా సహాయపడుతుంది?',
            chat_prompt_4: 'కౌన్సెలర్‌తో మాట్లాడాలి',

            // Emergency SOS Modal
            sos_modal_title: '24/7 జాతీయ అత్యవసర హెల్ప్‌లైన్ నంబర్లు',
            sos_nhaa_desc: 'జాతీయ అకృత్యాల నిరోధక హెల్ప్‌లైన్ (టోల్-ఫ్రీ)',
            sos_medical_desc: 'అత్యవసర అంబులెన్స్ మరియు వైద్య సేవలు',
            sos_police_desc: 'పోలీస్ అత్యవసర సహాయం',
            sos_women_desc: 'జాతీయ మహిళా హెల్ప్‌లైన్',
            sos_aasra_desc: 'ఆస్రా ఆత్మహత్యల నివారణ మరియు సంక్షోభ మద్దతు'
        }
    },

    /**
     * Initialize language service
     */
    init() {
        this.applyLanguage(this.currentLang);
        this.initLanguageDropdown();
    },

    /**
     * Change current active language
     */
    setLanguage(langCode) {
        if (!this.translations[langCode]) return;
        this.currentLang = langCode;
        localStorage.setItem('mindcare_lang', langCode);
        this.applyLanguage(langCode);

        // Notify Voice Recognition System if active
        if (typeof setVoiceLanguageByCode === 'function') {
            setVoiceLanguageByCode(this.speechLangCodes[langCode]);
        }

        // Show toast notification
        const meta = this.langMeta[langCode];
        if (typeof showToast === 'function') {
            showToast(`Language switched to ${meta.native} (${meta.name})`, 'success');
        }
    },

    /**
     * Apply translations to the entire DOM
     */
    applyLanguage(langCode) {
        const dict = this.translations[langCode] || this.translations['en'];

        // 1. Text Content Translation
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // 2. Placeholder Translation
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        // 3. Update Dropdown Label
        const labelEl = document.getElementById('currentLangLabel');
        const flagEl = document.getElementById('currentLangFlag');
        const meta = this.langMeta[langCode];
        if (labelEl && meta) labelEl.textContent = meta.native;
        if (flagEl && meta) flagEl.textContent = meta.flag;

        // 4. Update Dropdown Active Option
        document.querySelectorAll('.lang-dropdown-option').forEach(opt => {
            if (opt.getAttribute('data-lang') === langCode) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // 5. Update HTML lang attribute
        document.documentElement.lang = langCode;
    },

    /**
     * Get single translated text string
     */
    t(key, fallback = '') {
        const dict = this.translations[this.currentLang] || this.translations['en'];
        return dict[key] || fallback || key;
    },

    /**
     * Check if text contains distress keywords across ALL supported languages
     */
    isDistressText(text) {
        if (!text) return false;
        const lower = text.toLowerCase();

        // Check English, Hindi, Marathi, Telugu keywords
        for (const lang of Object.keys(this.distressKeywords)) {
            const list = this.distressKeywords[lang];
            for (const word of list) {
                if (lower.includes(word.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * Get localized chatbot response
     */
    getLocalizedBotResponse(input) {
        const lower = input.toLowerCase();
        const lang = this.currentLang;

        // 1. Emergency Crisis
        if (this.isDistressText(input)) {
            if (lang === 'mr') {
                return `<strong>🚨 तुम्ही एकटे नाही आहात आणि तुमचे आयुष्य अत्यंत मोलाचे आहे.</strong><br>कृपया त्वरित खालील मोफत व गोपनीय क्रमांकांवर संपर्क करा:<br>• <strong>NHAA राष्ट्रीय हेल्पलाइन:</strong> <a href="tel:14566">14566</a> (24/7 टोल-फ्री)<br>• <strong>आपत्कालीन वैद्यकीय:</strong> <a href="tel:108">108</a><br>• <strong>आसरा हेल्पलाइन:</strong> <a href="tel:9820466726">9820466726</a><br>मदत लगेच उपलब्ध आहे.`;
            } else if (lang === 'hi') {
                return `<strong>🚨 आप अकेले नहीं हैं और आपका जीवन बहुत अनमोल है।</strong><br>कृपया तुरंत इन निःशुल्क व गोपनीय नंबरों पर संपर्क करें:<br>• <strong>NHAA राष्ट्रीय हेल्पलाइन:</strong> <a href="tel:14566">14566</a> (24/7 टोल-फ्री)<br>• <strong>आपातकालीन एम्बुलेंस:</strong> <a href="tel:108">108</a><br>• <strong>आसरा हेल्पलाइन:</strong> <a href="tel:9820466726">9820466726</a><br>सहायता तुरंत उपलब्ध है।`;
            } else if (lang === 'te') {
                return `<strong>🚨 మీరు ఒంటరిగా లేరు, మీ ప్రాణం చాలా విలువైనది.</strong><br>దయచేసి వెంటనే ఈ ఉచిత మరియు రహస్య నంబర్లను సంప్రదించండి:<br>• <strong>NHAA హెల్ప్‌లైన్:</strong> <a href="tel:14566">14566</a> (24/7 టోల్-ఫ్రీ)<br>• <strong>అత్యవసర వైద్యం:</strong> <a href="tel:108">108</a><br>• <strong>ఆస్రా హెల్ప్‌లైన్:</strong> <a href="tel:9820466726">9820466726</a><br>సహాయం వెంటనే అందుబాటులో ఉంది.`;
            } else {
                return `<strong>🚨 You are not alone and your life matters deeply.</strong><br>Please reach out immediately for compassionate, confidential help:<br>• <strong>NHAA Helpline:</strong> <a href="tel:14566">14566</a> (24/7 Toll Free)<br>• <strong>Emergency Medical:</strong> <a href="tel:108">108</a><br>• <strong>AASRA Suicide Prevention:</strong> <a href="tel:9820466726">9820466726</a><br>Help is ready right now.`;
            }
        }

        // 2. Anxiety / Panic / Breathing
        if (lower.includes('anxious') || lower.includes('panic') || lower.includes('भीती') || lower.includes('तणाव') || lower.includes('घबराहट') || lower.includes('ఆందోళన')) {
            if (lang === 'mr') {
                return `मी समजू शकतो की तुम्हाला खूप अस्वस्थ वाटत आहे. तणाव किंवा भीती वाटल्यास आपली मज्जासंस्था संवेदनशील होते. आपण एक सोपा उपाय करूया:<br><br>1. पाय जमिनीवर स्थिर ठेवा.<br>2. भोवतालच्या <strong>३ गोष्टींकडे पाहा</strong> आणि <strong>२ वस्तूंना स्पर्श करा</strong>.<br>3. वरील <a href="#breathing" style="font-weight: 700; color: #5850ec;">श्वसन कक्षात</a> जाऊन ४-७-८ श्वसनाचा अभ्यास करा.`;
            } else if (lang === 'hi') {
                return `मैं समझ सकता हूँ कि आपको बहुत घबराहट महसूस हो रही है। जब तनाव बढ़ता है, तो शरीर को शांत करना जरूरी होता है:<br><br>1. अपने पैरों को जमीन पर रखें।<br>2. आस-पास की <strong>३ चीजों को देखें</strong> और <strong>२ चीजों को छुएं</strong>।<br>3. ऊपर दिए गए <a href="#breathing" style="font-weight: 700; color: #5850ec;">प्राणायाम कक्ष</a> में ४-७-८ श्वसन का अभ्यास करें।`;
            } else if (lang === 'te') {
                return `మీరు తీవ్రమైన ఆందోళనకు గురవుతున్నారని నేను అర్థం చేసుకున్నాను. మీ శరీరానికి ప్రశాంతత అవసరం:<br><br>1. నేలపై పాదాలను నిలపండి.<br>2. మీ చుట్టూ ఉన్న <strong>3 వస్తువులను చూడండి</strong>.<br>3. <a href="#breathing" style="font-weight: 700; color: #5850ec;">శ్వాస వ్యాయామ కేంద్రం</a>లో 4-7-8 శ్వాస సాధన చేయండి.`;
            }
        }

        // Return standard response in current language
        if (lang === 'mr') {
            return `आपल्या भावना व्यक्त केल्याबद्दल धन्यवाद. तुमचे अनुभव ऐकण्यासाठी आणि मदत करण्यासाठी मी सदैव उपस्थित आहे.<br><br>आपण आता काय करू शकतो:<br>1. <a href="#assessment" style="color: #5850ec; font-weight: 600;">गोपनीय आघात चाचणी पूर्ण करा</a><br>2. <a href="#breathing" style="color: #5850ec; font-weight: 600;">४-७-८ शांत श्वसन व्यायाम करा</a><br>3. <a href="tel:14566" style="color: #ef4444; font-weight: 600;">24/7 NHAA हेल्पलाइनला कॉल करा (14566)</a><br><br>मी आपल्याला आणखी कशी मदत करू शकतो?`;
        } else if (lang === 'hi') {
            return `अपनी भावनाएं साझा करने के लिए धन्यवाद। मैं आपको सुनने और मानसिक संबल देने के लिए यहाँ हूँ।<br><br>हम अभी ये कदम उठा सकते हैं:<br>1. <a href="#assessment" style="color: #5850ec; font-weight: 600;">गोपनीय आघात मूल्यांकन फॉर्म भरें</a><br>2. <a href="#breathing" style="color: #5850ec; font-weight: 600;">शांत प्राणायाम अभ्यास करें</a><br>3. <a href="tel:14566" style="color: #ef4444; font-weight: 600;">24/7 NHAA हेल्पलाइन 14566 पर संपर्क करें</a><br><br>मैं आपकी और क्या सहायता कर सकता हूँ?`;
        } else if (lang === 'te') {
            return `మీ భావాలను పంచుకున్నందుకు ధన్యవాదాలు. మీకు మానసిక ధైర్యం అందించడానికి నేను సిద్ధంగా ఉన్నాను.<br><br>ఇప్పుడు మనం చేయగలిగినవి:<br>1. <a href="#assessment" style="color: #5850ec; font-weight: 600;">రహస్య ట్రామా పరీక్షను పూర్తి చేయండి</a><br>2. <a href="#breathing" style="color: #5850ec; font-weight: 600;">4-7-8 శ్వాస వ్యాయామం చేయండి</a><br>3. <a href="tel:14566" style="color: #ef4444; font-weight: 600;">24/7 NHAA హెల్ప్‌లైన్ 14566 కి కాల్ చేయండి</a><br><br>నేను మీకు ఇంకా ఎలా సహాయపడగలను?`;
        } else {
            return `Thank you for sharing that with me. It takes courage to acknowledge how you're feeling. I am here to listen and help you navigate this moment.<br><br>Here are some things we can do right now:<br>1. <a href="#assessment" style="color: #5850ec; font-weight: 600;">Take the Stress & Trauma Assessment</a><br>2. <a href="#breathing" style="color: #5850ec; font-weight: 600;">Try the Nature Breathing Exercise</a><br>3. <a href="tel:14566" style="color: #ef4444; font-weight: 600;">Call the 24/7 NHAA Helpline (14566)</a><br><br>How else can I assist you today?`;
        }
    },

    /**
     * Text-To-Speech Synthesizer (Read aloud in regional accent)
     */
    speak(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.speechLangCodes[this.currentLang] || 'en-US';
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    },

    /**
     * Initialize Language Switcher Dropdown Click Events
     */
    initLanguageDropdown() {
        const toggleBtn = document.getElementById('langDropdownToggleBtn');
        const menu = document.getElementById('langDropdownMenu');

        if (toggleBtn && menu) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        }

        document.querySelectorAll('.lang-dropdown-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = btn.getAttribute('data-lang');
                if (lang) {
                    this.setLanguage(lang);
                    if (menu) menu.classList.remove('active');
                }
            });
        });
    }
};

// Global helper
function setGlobalLanguage(langCode) {
    LanguageService.setLanguage(langCode);
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LanguageService.init());
} else {
    LanguageService.init();
}

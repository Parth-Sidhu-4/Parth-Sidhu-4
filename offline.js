/* offline.js  – only runs on offline.html */
(() => {
  // 1.  Minimal translation table (only the five strings we need)
  const i18n = {
    en: {
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "You're Offline",
    offline_para:
      "Parth's Digital Loom is resting... Try reconnecting to continue exploring.",
    offline_quote: `"Even silence speaks — when the network sleeps."`,
    offline_retry: "Try Again",
  },
  hi: {
    offline_title: "ऑफ़लाइन - पार्थ सिद्धू",
    offline_heading: "आप ऑफलाइन हैं",
    offline_para:
      "पार्थ का डिजिटल करघा थोड़ी देर के लिए थम गया है... दोबारा जुड़ें और आगे बढ़ें।",
    offline_quote: '"ख़ामोशी भी बोलती है — जब नेटवर्क सो जाता है।"',
    offline_retry: "पुनः प्रयास करें",
  },
  bj: {
    offline_title: "ऑफ़लाइन - पार्थ सिद्धू",
    offline_heading: "आप ऑफलाइन बानी",
    offline_para:
      "पार्थ के डिजिटल सपना सुस्ता रहल बा... फिर से जुड़ जाईं आ यात्रा जारी रखीं।",
    offline_quote: '"चुप्पी भी कुछ कहेला — जब नेटवर्क सुत जाला।"',
    offline_retry: "फिर से कोशिश करीं",
  },
  // New Languages (Placeholders - Fill with actual translations if any are incorrect)
  pa: {
    // Punjabi - Gurmukhi
    offline_title: "ਆਫਲਾਈਨ - ਪਾਰਥ ਸਿੱਧੂ",
    offline_heading: "ਤੁਸੀਂ ਆਫਲਾਈਨ ਹੋ",
    offline_para:
      "ਪਾਰਥ ਦਾ ਡਿਜੀਟਲ ਤਾਣਾ-ਬਾਣਾ ਆਰਾਮ ਕਰ ਰਿਹਾ ਹੈ... ਅੱਗੇ ਖੋਜਣ ਲਈ ਦੁਬਾਰਾ ਕਨੈਕਟ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    offline_quote: '"ਚੁੱਪੀ ਵੀ ਬੋਲਦੀ ਹੈ — ਜਦੋਂ ਨੈੱਟਵਰਕ ਸੌਂ ਜਾਂਦਾ ਹੈ।"',
    offline_retry: "ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
  },
  "pa-Arab": {
    // Punjabi - Shahmukhi
    offline_title: "آف لائن - پارتھ سدھو",
    offline_heading: "تُسی آف لائن او",
    offline_para:
      "پارتھ دی ڈیجیٹل لوم آرام کر رہی اے... اگے کھوجݨ لئی دوبارہ جوڑݨ دی کوشش کرو۔",
    offline_quote: '"خاموشی وی بولدی اے — جَدوں نیٹ ورک سوں جاوے۔"',
    offline_retry: "دوبارہ کوشش کرو",
  },
  ur: {
    // Urdu
    offline_title: "آف لائن - پارتھ سدھو",
    offline_heading: "آپ آف لائن ہیں",
    offline_para:
      "پارتھ کا ڈیجیٹل لوم آرام کر رہا ہے... دوبارہ جڑنے کی کوشش کریں تاکہ مزید دریافت کر سکیں۔",
    offline_quote: '"خاموشی بھی بولتی ہے — جب نیٹ ورک سو جاتا ہے۔"',
    offline_retry: "دوبارہ کوشش کریں",
  },
  gu: {
    // Gujarati
    offline_title: "ઑફલાઇન - પાર્થ સિદ્ધુ",
    offline_heading: "તમે ઑફલાઇન છો",
    offline_para:
      "પાર્થનું ડિજિટલ લૂમ આરામ કરી રહ્યું છે... આગળ વધવા માટે ફરીથી કનેક્ટ કરવાનો પ્રયાસ કરો.",
    offline_quote: '"શાંતિ પણ બોલે છે — જ્યારે નેટવર્ક સૂઈ જાય છે."',
    offline_retry: "ફરી પ્રયાસ કરો",
  },
  or: {
    // Odia
    offline_title: "ଅଫଲାଇନ୍ - ପାର୍ଥ ସିଧୁ",
    offline_heading: "ଆପଣ ଅଫଲାଇନ୍ ଅଛନ୍ତି",
    offline_para:
      "ପାର୍ଥଙ୍କ ଡିଜିଟାଲ୍ ଲୁମ୍ ବିଶ୍ରାମ ନେଉଛି... ଅନୁସନ୍ଧାନ ଜାରି ରଖିବାକୁ ପୁନଃସଂଯୋଗ କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ।",
    offline_quote: '"ନୀରବତା ମଧ୍ୟ କହେ — ଯେତେବେଳେ ନେଟୱର୍କ ଶୋଇଯାଏ।"',
    offline_retry: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ",
  },
  bn: {
    // Bengali
    offline_title: "অফলাইন - পার্থ সিদ্ধু",
    offline_heading: "আপনি অফলাইন",
    offline_para:
      "পার্থের ডিজিটাল লুম বিশ্রাম নিচ্ছে... অন্বেষণ চালিয়ে যেতে আবার সংযোগ করার চেষ্টা করুন।",
    offline_quote: `"নীরবতাও কথা বলে — যখন নেটওয়ার্ক ঘুমিয়ে পড়ে।"`,
    offline_retry: "আবার চেষ্টা করুন",
  },
  mr: {
    // Marathi
    offline_title: "ऑफलाइन - पार्थ सिद्धू",
    offline_heading: "आपण ऑफलाइन आहात",
    offline_para:
      "पार्थचे डिजिटल लूम विश्रांती घेत आहे... पुढे शोधण्यासाठी पुन्हा कनेक्ट करण्याचा प्रयत्न करा.",
    offline_quote: '"शांतताही बोलते — जेव्हा नेटवर्क झोपते."',
    offline_retry: "पुन्हा प्रयत्न करा",
  },
  ta: {
    // Tamil
    offline_title: "ஆஃப்லைன் - பார்த்த் சித்து",
    offline_heading: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்",
    offline_para:
      "பார்த்தின் டிஜிட்டல் தறி ஓய்வெடுக்கிறது... மேலும் ஆராய மீண்டும் இணைக்க முயற்சிக்கவும்.",
    offline_quote: `"மௌனமும் பேசும் — நெட்வொர்க் உறங்கும்போது."`,
    offline_retry: "மீண்டும் முயற்சி செய்",
  },
  te: {
    // Telugu
    offline_title: "ఆఫ్‌లైన్ - పార్థ్ సిధు",
    offline_heading: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు",
    offline_para:
      "పార్థ్ యొక్క డిజిటల్ లూమ్ విశ్రాంతి తీసుకుంటోంది... అన్వేషణను కొనసాగించడానికి తిరిగి కనెక్ట్ చేయడానికి ప్రయత్నించండి.",
    offline_quote: '"నిశ్శబ్దం కూడా మాట్లాడుతుంది — నెట్‌వర్క్ నిద్రపోతున్నప్పుడు."',
    offline_retry: "మళ్ళీ ప్రయత్నించు",
  },
  ml: {
    // Malayalam
    offline_title: "ഓഫ്‌ലൈൻ - പാർത്ഥ് സിദ്ധു",
    offline_heading: "നിങ്ങൾ ഓഫ്‌ലൈനാണ്",
    offline_para:
      "പാർത്ഥിന്റെ ഡിജിറ്റൽ ലൂം വിശ്രമിക്കുന്നു... കൂടുതൽ പര്യവേക്ഷണം ചെയ്യാൻ വീണ്ടും കണക്ട് ചെയ്യാൻ ശ്രമിക്കുക.",
    offline_quote: '"നിശബ്ദതയും സംസാരിക്കും — നെറ്റ്‌വർക്ക് ഉറങ്ങുമ്പോൾ."',
    offline_retry: "വീണ്ടും ശ്രമിക്കുക",
  },
  kn: {
    // Kannada
    offline_title: "ಆಫ್‌ಲೈನ್ - ಪಾರ್ಥ್ ಸಿಧು",
    offline_heading: "ನೀವು ಆಫ್‌ಲೈನ್ ಆಗಿದ್ದೀರಿ",
    offline_para:
      "ಪಾರ್ಥ್‌ನ ಡಿಜಿಟಲ್ ಲೂಮ್ ವಿಶ್ರಾಂತಿ ಪಡೆಯುತ್ತಿದೆ... ಅನ್ವೇಷಣೆಯನ್ನು ಮುಂದುವರಿಸಲು ಮತ್ತೆ ಸಂಪರ್ಕಿಸಲು ಪ್ರಯತ್ನಿಸಿ.",
    offline_quote: '"ಮೌನವೂ ಮಾತನಾಡುತ್ತದೆ — ನೆಟ್‌ವರ್ಕ್ ನಿದ್ರಿಸಿದಾಗ."',
    offline_retry: "ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ",
  },
  sd: {
    // Sindhi
    offline_title: "آف لائن - پارتھ سدھو",
    offline_heading: "توهان آف لائن آهيو",
    offline_para:
      "پارتھ جو ڊجيٽل لوم آرام ڪري رهيو آهي... وڌيڪ ڳولڻ لاءِ ٻيهر ڳنڍڻ جي ڪوشش ڪريو.",
    offline_quote: '"خاموشي به ڳالهائي ٿي — جڏهن نيٽ ورڪ سمهي پوي."',
    offline_retry: "ٻيهر ڪوشش ڪريو",
  },
  "zh-Hans": {
    // Simplified Chinese
    offline_title: "离线 - 帕尔特·西杜",
    offline_heading: "您已离线",
    offline_para: "帕尔特的数字织机正在休息... 请尝试重新连接以继续探索。",
    offline_quote: `"即使沉默也会说话 — 当网络沉睡时。"`,
    offline_retry: "重试",
  },
  "zh-Hant": {
    // Traditional Chinese
    offline_title: "離線 - 帕爾特·西杜",
    offline_heading: "您已離線",
    offline_para: "帕爾特的數位織機正在休息... 請嘗試重新連線以繼續探索。",
    offline_quote: `"即使沉默也會說話 — 當網路沉睡時。"`,
    offline_retry: "重試",
  },
  ko: {
    // Korean
    offline_title: "오프라인 - 파르트 시두",
    offline_heading: "오프라인입니다",
    offline_para:
      "파르트의 디지털 베틀이 휴식 중입니다... 탐색을 계속하려면 다시 연결을 시도하세요.",
    offline_quote: `"침묵도 말한다 — 네트워크가 잠들 때."`,
    offline_retry: "다시 시도",
  },
  ja: {
    // Japanese
    offline_title: "オフライン - パース・シドゥ",
    offline_heading: "オフラインです",
    offline_para:
      "パースのデジタル織機は休止中です... 探索を続けるには再接続を試みてください。",
    offline_quote: `"沈黙も語る — ネットワークが眠るとき。"`,
    offline_retry: "再試行",
  },
  ar: {
    // Arabic (Right-to-Left)
    offline_title: "غير متصل - بارث سيدو",
    offline_heading: "أنت غير متصل",
    offline_para:
      "نول بارث الرقمي يستريح... حاول إعادة الاتصال لمواصلة الاستكشاف.",
    offline_quote: `"حتى الصمت يتكلم — عندما ينام الاتصال."`,
    offline_retry: "إعادة المحاولة",
  },
  fa: {
    // Persian (Farsi - Right-to-Left)
    offline_title: "آفلاین - پارث سیدهو",
    offline_heading: "شما آفلاین هستید",
    offline_para:
      "ماشین بافندگی دیجیتال پارث در حال استراحت است... برای ادامه کاوش، دوباره اتصال را امتحان کنید.",
    offline_quote: `"حتی سکوت نیز سخن می گوید — زمانی که شبکه خواب است."`,
    offline_retry: "تلاش مجدد",
  },
  fr: {
    // French
    offline_title: "Hors ligne - Parth Sidhu",
    offline_heading: "Vous êtes hors ligne",
    offline_para:
      "Le métier à tisser numérique de Parth se repose... Essayez de vous reconnecter pour continuer à explorer.",
    offline_quote: `"Même le silence parle — quand le réseau dort."`,
    offline_retry: "Réessayer",
  },
  de: {
    // German
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "Sie sind offline",
    offline_para:
      "Parths digitaler Webstuhl ruht... Versuchen Sie, die Verbindung wiederherzustellen, um die Erkundung fortzusetzen.",
    offline_quote: `"Auch die Stille spricht — wenn das Netzwerk schläft."`,
    offline_retry: "Erneut versuchen",
  },
  es: {
    // Spanish
    offline_title: "Sin conexión - Parth Sidhu",
    offline_heading: "Estás sin conexión",
    offline_para:
      "El telar digital de Parth está descansando... Intenta reconectarte para seguir explorando.",
    offline_quote: `"Incluso el silencio habla — cuando la red duerme."`,
    offline_retry: "Reintentar",
  },
  pt: {
    // Portuguese
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "Você está offline",
    offline_para:
      "O Tear Digital de Parth está descansando... Tente reconectar para continuar explorando.",
    offline_quote: `"Até o silêncio fala — quando a rede dorme."`,
    offline_retry: "Tentar novamente",
  },
  it: {
    // Italian
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "Sei offline",
    offline_para:
      "Il telaio digitale di Parth sta riposando... Prova a riconnetterti per continuare a esplorare.",
    offline_quote: `"Anche il silenzio parla — quando la rete dorme."`,
    offline_retry: "Riprova",
  },
  ru: {
    // Russian
    offline_title: "Офлайн - Партх Сидху",
    offline_heading: "Вы не в сети",
    offline_para:
      "Цифровой станок Партха отдыхает... Попробуйте переподключиться, чтобы продолжить изучение.",
    offline_quote: `"Даже тишина говорит — когда сеть спит."`,
    offline_retry: "Повторить попытку",
  },
  tr: {
    // Turkish
    offline_title: "Çevrimdışı - Parth Sidhu",
    offline_heading: "Çevrimdışısınız",
    offline_para:
      "Parth'ın Dijital Tezgahı dinleniyor... Keşfetmeye devam etmek için yeniden bağlanmayı deneyin.",
    offline_quote: `"Sessizlik bile konuşur — ağ uyuduğunda."`,
    offline_retry: "Tekrar Dene",
  },
  nl: {
    // Dutch
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "U bent offline",
    offline_para:
      "Parths Digitale Weefgetouw rust... Probeer opnieuw verbinding te maken om verder te verkennen.",
    offline_quote: `"Zelfs stilte spreekt — wanneer het netwerk slaapt."`,
    offline_retry: "Opnieuw proberen",
  },
  sv: {
    // Swedish
    offline_title: "Offline - Parth Sidhu",
    offline_heading: "Du är offline",
    offline_para:
      "Parths digitala vävstol vilar... Försök att återansluta för att fortsätta utforska.",
    offline_quote: `"Till och med tystnaden talar — när nätverket sover."`,
    offline_retry: "Försök igen",
  },
};

  // 2.  Pick language: stored choice → browser → fallback
  const lang =
    localStorage.getItem("portfolioLanguage") ||
    navigator.language.slice(0, 2) ||
    "en";

  const dict = i18n[lang] || i18n.en;

  // 3.  Swap text for every [data-i18n] node
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  // 4.  Also update the <title>
  document.title = dict.offline_title;

  // 5.  Optional: retry button just reloads
  // (already in HTML via onclick="location.reload()")
})();

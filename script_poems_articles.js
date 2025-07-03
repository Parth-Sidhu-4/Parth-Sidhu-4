// Disable right-click globally
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
// --- Global Language Setup ---
window.currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

// --- Translations for Poems & Articles Page ---
window.translations = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_connect: "Connect",
    nav_poems_articles: "Poems & Articles",
    page_title_poems: "Parth Sidhu - Poems & Articles",
    section_poems_articles_title: "Poems & Articles",
    loading_content: "Loading content...",
    no_content_found: "No content found.",
    poetry_intro_text:
      "Welcome to my digital sanctuary of thoughts and emotions. Here, I share a collection of poems and articles, each a whisper from my soul or a reflection of the world through my eyes. Writing, for me, is not just a hobby but a profound way to connect, to express, and to explore the depths of human experience. I hope these words resonate with you as much as they do with me.",
    back_to_list: "Back to Poems & Articles",
    content_not_found: "Content not found.",
  },
  hi: {
    nav_home: "होम",
    nav_projects: "प्रोजेक्ट्स",
    nav_connect: "संपर्क करें",
    nav_poems_articles: "कविताएँ और लेख",
    page_title_poems: "पार्थ सिधु - कविताएँ और लेख",
    section_poems_articles_title: "कविताएँ और लेख",
    loading_content: "सामग्री लोड हो रही है...",
    no_content_found: "कोई सामग्री नहीं मिली।",
    poetry_intro_text:
      "विचारों और भावनाओं के मेरे इस डिजिटल अभयारण्य में आपका स्वागत है। यहां, मैं कविताओं और लेखों का एक संग्रह साझा करता हूं, प्रत्येक मेरी आत्मा से एक फुसफुसाहट या मेरी आंखों के माध्यम से दुनिया का प्रतिबिंब है। मेरे लिए लिखना सिर्फ एक शौक नहीं, बल्कि जुड़ने, व्यक्त करने और मानवीय अनुभव की गहराइयों को तलाशने का एक गहरा तरीका है। मुझे उम्मीद है कि ये शब्द आपसे उतनी ही गूंजेंगे जितनी वे मुझसे करते हैं।",
    back_to_list: "कविताएँ और लेख पर वापस",
    content_not_found: "सामग्री नहीं मिली।",
  },
  pa: {
    nav_home: "ਘਰ",
    nav_projects: "ਪ੍ਰੋਜੈਕਟਸ",
    nav_connect: "ਸੰਪਰਕ ਕਰੋ",
    nav_poems_articles: "ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖ",
    page_title_poems: "ਪਾਰਥ ਸਿੱਧੂ - ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖ",
    section_poems_articles_title: "ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖ",
    loading_content: "ਸਮੱਗਰੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    no_content_found: "ਕੋਈ ਸਮੱਗਰੀ ਨਹੀਂ ਮਿਲੀ।",
    poetry_intro_text:
      "ਮੇਰੇ ਵਿਚਾਰਾਂ ਅਤੇ ਭਾਵਨਾਵਾਂ ਦੇ ਡਿਜ਼ੀਟਲ ਅਸਥਾਨ 'ਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਇੱਥੇ, ਮੈਂ ਆਪਣੀਆਂ ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖਾਂ ਦਾ ਇਕ ਸੰਗ੍ਰਹਿ ਸਾਂਝਾ ਕਰਦਾ ਹਾਂ, ਹਰ ਇੱਕ ਮੇਰੀ ਰੂਹ ਦੀ ਇੱਕ ਫੁਸਫੁਸਾਹਟ ਜਾਂ ਦੁਨੀਆ ਦੇ ਪ੍ਰਤੀ ਮੇਰੀ ਦ੍ਰਿਸ਼ਟੀ ਦਾ ਦਰਪਣ। ਮੈਂ ਆਸ ਕਰਦਾ ਹਾਂ ਕਿ ਇਹ ਸ਼ਬਦ ਤੁਹਾਡੇ ਦਿਲ ਨੂੰ ਵੀ ਛੂਹਣ।",
    back_to_list: "ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖਾਂ 'ਤੇ ਵਾਪਸ",
    content_not_found: "ਕੋਈ ਸਮੱਗਰੀ ਨਹੀਂ ਮਿਲੀ।",
  },
  "pa-Arab": {
    nav_home: "گھر",
    nav_projects: "پراجیکٹس",
    nav_connect: "رابطہ کریں",
    nav_poems_articles: "شاعری تے آرٹیکلز",
    page_title_poems: "پارتھ سدھو - شاعری تے آرٹیکلز",
    section_poems_articles_title: "شاعری تے آرٹیکلز",
    loading_content: "مواد لوڈ ہو رہیا اے...",
    no_content_found: "کوئی مواد نہیں لبھیا۔",
    poetry_intro_text:
      "میرے خیالات تے جذبات دی ایس ڈیجیٹل پناہ گاہ وچ تہانوں خوش آمدید۔ ایتھے میں اپنی شاعری تے مضامین دا مجموعہ شیئر کردا آں، ہر اک میری روح دی اک سرگوشی یا دنیا دا میری اکھاں نال عکس۔ میرے لئی لکھنا صرف اک شوق نہیں بلکہ جڑن، اظہار کرن، تے انسانی تجربے دیاں گہرائیاں نوں کھوجن دا اک گہرا طریقہ اے۔ میں امید کردا آں کہ ایہہ الفاظ تہانوں وی اوہناں ای گونجاں گے جناں مینوں۔",
    back_to_list: "شاعری تے آرٹیکلز 'تے واپس",
    content_not_found: "کوئی مواد نہیں لبھیا۔",
  },
  ur: {
    nav_home: "ہوم",
    nav_projects: "پروجیکٹس",
    nav_connect: "رابطہ کریں",
    nav_poems_articles: "نظمیں اور مضامین",
    page_title_poems: "پارتھ سدھو - نظمیں اور مضامین",
    section_poems_articles_title: "نظمیں اور مضامین",
    loading_content: "مواد لوڈ ہو رہا ہے...",
    no_content_found: "کوئی مواد نہیں ملا۔",
    poetry_intro_text:
      "میرے خیالات اور جذبات کے اس ڈیجیٹل پناہ گاہ میں آپ کا خیرمقدم ہے۔ یہاں، میں نظموں اور مضامین کا ایک مجموعہ شیئر کرتا ہوں، ہر ایک میری روح کی ایک سرگوشی یا میری آنکھوں سے دنیا کا عکس ہے۔ میرے لیے لکھنا صرف ایک مشغلہ نہیں بلکہ جڑنے، اظہار کرنے اور انسانی تجربے کی گہرائیوں کو تلاش کرنے کا ایک گہرا طریقہ ہے۔ مجھے امید ہے کہ یہ الفاظ آپ کے لیے بھی اتنے ہی گونجیں گے جتنے میرے لیے۔",
    back_to_list: "نظمیں اور مضامین پر واپس",
    content_not_found: "کوئی مواد نہیں ملا۔",
  },
  gu: {
    nav_home: "હોમ",
    nav_projects: "પ્રોજેક્ટ્સ",
    nav_connect: "જોડાઓ",
    nav_poems_articles: "કવિતાઓ અને લેખો",
    page_title_poems: "પાર્થ સિદ્ધુ - કવિતાઓ અને લેખો",
    section_poems_articles_title: "કવિતાઓ અને લેખો",
    loading_content: "સામગ્રી લોડ થઈ રહી છે...",
    no_content_found: "કોઈ સામગ્રી મળી નથી.",
    poetry_intro_text:
      "વિચારો અને ભાવનાઓના મારા આ ડિજિટલ અભયારણ્યમાં તમારું સ્વાગત છે. અહીં, હું કવિતાઓ અને લેખોનો સંગ્રહ શેર કરું છું, દરેક મારી આત્માનો એક ગણગણાટ અથવા મારી આંખો દ્વારા વિશ્વનું પ્રતિબિંબ છે. મારા માટે લેખન ફક્ત એક શોખ નથી, પરંતુ જોડાવા, વ્યક્ત કરવા અને માનવીય અનુભવની ઊંડાણોને શોધવાનો એક ગહન માર્ગ છે. મને આશા છે કે આ શબ્દો તમને પણ એટલા જ ગુંજશે જેટલા મને કરે છે.",
    back_to_list: "કવિતાઓ અને લેખો પર પાછા",
    content_not_found: "કોઈ સામગ્રી મળી નથી.",
  },
  or: {
    nav_home: "ହୋମ୍",
    nav_projects: "ପ୍ରୋଜେକ୍ଟଗୁଡ଼ିକ",
    nav_connect: "ସଂଯୋଗ କରନ୍ତୁ",
    nav_poems_articles: "କବିତା ଏବଂ ପ୍ରବନ୍ଧ",
    page_title_poems: "ପାର୍ଥ ସିଧୁ - କବିତା ଏବଂ ପ୍ରବନ୍ଧ",
    section_poems_articles_title: "କବିତା ଏବଂ ପ୍ରବନ୍ଧ",
    loading_content: "ବିଷୟବସ୍ତୁ ଲୋଡ୍ ହେଉଛି...",
    no_content_found: "କୌଣସି ବିଷୟବସ୍ତୁ ମିଳିଲା ନାହିଁ।",
    poetry_intro_text:
      "ଚିନ୍ତାଧାରା ଏବଂ ଭାବନାଗୁଡ଼ିକର ମୋର ଏହି ଡିଜିଟାଲ୍ ଅଭୟାରଣ୍ୟକୁ ସ୍ୱାଗତ। ଏଠାରେ, ମୁଁ କବିତା ଏବଂ ପ୍ରବନ୍ଧଗୁଡ଼ିକର ଏକ ସଂଗ୍ରହ ବାଣ୍ଟେ, ପ୍ରତ୍ୟେକଟି ମୋ ଆତ୍ମାର ଏକ ଫୁସଫୁସ କିମ୍ବା ମୋ ଆଖି ଦେଇ ଦୁନିଆର ପ୍ରତିଫଳନ। ମୁଁ ଆଶା କରେ ଯେ ଏହି ଶବ୍ଦଗୁଡ଼ିକ ଆପଣଙ୍କୁ ମଧ୍ୟ ସେତିକି ଅନୁରଣିତ କରିବ ଯେତିକି ମୋତେ କରେ।",
    back_to_list: "କବିତା ଏବଂ ପ୍ରବନ୍ଧକୁ ଫେରନ୍ତୁ",
    content_not_found: "କୌଣସି ବିଷୟବସ୍ତୁ ମିଳିଲା ନାହିଁ।",
  },
  bn: {
    nav_home: "হোম",
    nav_projects: "প্রজেক্টস",
    nav_connect: "যোগাযোগ করুন",
    nav_poems_articles: "কবিতা ও প্রবন্ধ",
    page_title_poems: "পার্থ সিধু - কবিতা ও প্রবন্ধ",
    section_poems_articles_title: "কবিতা ও প্রবন্ধ",
    loading_content: "বিষয়বস্তু লোড হচ্ছে...",
    no_content_found: "কোনও বিষয়বস্তু পাওয়া যায়নি।",
    poetry_intro_text:
      "আমার চিন্তা ও অনুভূতির এই ডিজিটাল অভয়ারণ্যে স্বাগতম। এখানে, আমি কবিতা ও প্রবন্ধের একটি সংগ্রহ শেয়ার করি, প্রতিটি আমার আত্মার একটি ফিসফিসানি অথবা আমার চোখের মাধ্যমে বিশ্বের প্রতিচ্ছবি। আমার জন্য লেখা শুধু একটি শখ নয় বরং সংযোগ স্থাপন, প্রকাশ করা এবং মানব অভিজ্ঞতার গভীরতা অন্বেষণ করার একটি গভীর উপায়। আমি আশা করি এই শব্দগুলো আপনার সাথে ততটাই অনুরণিত হবে যতটা আমার সাথে হয়।",
    back_to_list: "কবিতা ও প্রবন্ধে ফিরে যান",
    content_not_found: "কোনও বিষয়বস্তু পাওয়া যায়নি।",
  },
  mr: {
    nav_home: "मुख्यपृष्ठ",
    nav_projects: "प्रकल्प",
    nav_connect: "संपर्क साधा",
    nav_poems_articles: "कविता आणि लेख",
    page_title_poems: "पार्थ सिधु - कविता आणि लेख",
    section_poems_articles_title: "कविता आणि लेख",
    loading_content: "सामग्री लोड होत आहे...",
    no_content_found: "कोणतीही सामग्री आढळली नाही.",
    poetry_intro_text:
      "विचार आणि भावनांच्या माझ्या या डिजिटल आश्रयस्थानात आपले स्वागत आहे. येथे, मी कविता आणि लेखांचा एक संग्रह सामायिक करतो, प्रत्येक माझ्या आत्म्याची कुजबुज किंवा माझ्या डोळ्यांतून जगाचे प्रतिबिंब आहे. माझ्यासाठी लेखन केवळ एक छंद नाही, तर जोडण्याचा, व्यक्त करण्याचा आणि मानवी अनुभवाच्या खोलवर जाण्याचा एक सखोल मार्ग आहे. मला आशा आहे की हे शब्द तुम्हालाही तितकेच पटतील जितके ते मला पटतात.",
    back_to_list: "कविता आणि लेखांवर परत",
    content_not_found: "कोणतीही सामग्री आढळली नाही.",
  },
  ta: {
    nav_home: "முகப்பு",
    nav_projects: "திட்டங்கள்",
    nav_connect: "தொடர்பு கொள்ளுங்கள்",
    nav_poems_articles: "கவிதைகள் மற்றும் கட்டுரைகள்",
    page_title_poems: "பார்த்த் சித்து - கவிதைகள் மற்றும் கட்டுரைகள்",
    section_poems_articles_title: "கவிதைகள் மற்றும் கட்டுரைகள்",
    loading_content: "உள்ளடக்கம் ஏற்றப்படுகிறது...",
    no_content_found: "உள்ளடக்கம் எதுவும் இல்லை.",
    poetry_intro_text:
      "எனது எண்ணங்கள் மற்றும் உணர்வுகளின் இந்த டிஜிட்டல் சரணாலயத்திற்கு வருக. இங்கே, நான் கவிதைகள் மற்றும் கட்டுரைகளின் தொகுப்பை பகிர்ந்து கொள்கிறேன், ஒவ்வொன்றும் எனது ஆன்மாவின் ஒரு முணுமுணுப்பு அல்லது எனது கண்களின் வழியாக உலகைப் பற்றிய ஒரு பிரதிபலிப்பு. எனக்கு எழுதுவது வெறும் பொழுதுபோக்கு மட்டுமல்ல, இணைப்பதற்கும், வெளிப்படுத்துவதற்கும், மனித அனுபவத்தின் ஆழங்களை ஆராய்வதற்கும் ஒரு ஆழமான வழியாகும். இந்த வார்த்தைகள் உங்களுக்கும் என்னைப் போலவே எதிரொலிக்கும் என்று நம்புகிறேன்.",
    back_to_list: "கவிதைகள் மற்றும் கட்டுரைகளுக்குத் திரும்பு",
    content_not_found: "உள்ளடக்கம் எதுவும் இல்லை.",
  },
  te: {
    nav_home: "హోమ్",
    nav_projects: "ప్రాజెక్ట్‌లు",
    nav_connect: "కనెక్ట్ అవ్వండి",
    nav_poems_articles: "కవితలు మరియు వ్యాసాలు",
    page_title_poems: "పార్థ్ సిధు - కవితలు మరియు వ్యాసాలు",
    section_poems_articles_title: "కవితలు మరియు వ్యాసాలు",
    loading_content: "కంటెంట్ లోడ్ అవుతోంది...",
    no_content_found: "ఎటువంటి కంటెంట్ దొరకలేదు.",
    poetry_intro_text:
      "నా ఆలోచనలు మరియు భావోద్వేగాల ఈ డిజిటల్ అభయారణ్యానికి స్వాగతం. ఇక్కడ, నేను కవితలు మరియు వ్యాసాల సేకరణను పంచుకుంటాను, ప్రతిదీ నా ఆత్మ నుండి ఒక గుసగుస లేదా నా కళ్ళ ద్వారా ప్రపంచం యొక్క ప్రతిబింబం. నాకు రాయడం కేవలం ఒక అభిరుచి మాత్రమే కాదు, అనుసంధానించడానికి, వ్యక్తీకరించడానికి మరియు మానవ అనుభవం యొక్క లోతులను అన్వేషించడానికి ఒక లోతైన మార్గం. ఈ పదాలు మీకు ఎంతగానో ప్రతిధ్వనిస్తాయని ఆశిస్తున్నాను.",
    back_to_list: "కవితలు మరియు వ్యాసాలకు తిరిగి",
    content_not_found: "ఎటువంటి కంటెంట్ దొరకలేదు.",
  },
  ml: {
    nav_home: "ഹോം",
    nav_projects: "പ്രോജക്റ്റുകൾ",
    nav_connect: "ബന്ധപ്പെടുക",
    nav_poems_articles: "കവിത / ലേഖനം",
    page_title_poems: "പാർത്ഥ് സിധു - കവിതകളും ലേഖനങ്ങളും",
    section_poems_articles_title: "കവിതകളും ലേഖനങ്ങളും",
    loading_content: "ഉള്ളടക്കം ലോഡ് ചെയ്യുന്നു...",
    no_content_found: "ഉള്ളടക്കം ഒന്നും കണ്ടെത്തിയില്ല.",
    poetry_intro_text:
      "എന്റെ ചിന്തകളുടെയും വികാരങ്ങളുടെയും ഈ ഡിജിറ്റൽ സങ്കേതത്തിലേക്ക് സ്വാഗതം. ഇവിടെ, ഞാൻ കവിതകളുടെയും ലേഖനങ്ങളുടെയും ഒരു ശേഖരം പങ്കുവെക്കുന്നു, ഓരോന്നും എന്റെ ആത്മാവിൽ നിന്നുള്ള ഒരു മന്ത്രമോ എന്റെ കണ്ണുകളിലൂടെ ലോകത്തിന്റെ പ്രതിഫലനമോ ആണ്. എനിക്ക് എഴുത്ത് ഒരു ഹോബി മാത്രമല്ല, ബന്ധപ്പെടാനും, പ്രകടിപ്പിക്കാനും, മാനുഷിക അനുഭവത്തിന്റെ ആഴങ്ങൾ കണ്ടെത്താനുമുള്ള ഒരു ആഴത്തിലുള്ള മാർഗ്ഗമാണ്. ഈ വാക്കുകൾ എന്നെപ്പോലെ നിങ്ങളെയും സ്വാധീനിക്കുമെന്ന് ഞാൻ പ്രതീക്ഷിക്കുന്നു.",
    back_to_list: "കവിതകളിലേക്കും ലേഖനങ്ങളിലേക്കും തിരികെ",
    content_not_found: "ഉള്ളടക്കം ഒന്നും കണ്ടെത്തിയില്ല.",
  },
  kn: {
    nav_home: "ಮುಖಪುಟ",
    nav_projects: "ಯೋಜನೆಗಳು",
    nav_connect: "ಸಂಪರ್ಕಿಸಿ",
    nav_poems_articles: "ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳು",
    page_title_poems: "ಪಾರ್ಥ್ ಸಿಧು - ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳು",
    section_poems_articles_title: "ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳು",
    loading_content: "ವಿಷಯ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    no_content_found: "ಯಾವುದೇ ವಿಷಯ ಕಂಡುಬಂದಿಲ್ಲ.",
    poetry_intro_text:
      "ನನ್ನ ಆಲೋಚನೆಗಳು ಮತ್ತು ಭಾವನೆಗಳ ಈ ಡಿಜಿಟಲ್ ದೇವಾಲಯಕ್ಕೆ ಸುಸ್ವಾಗತ. ಇಲ್ಲಿ, ನಾನು ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳ ಸಂಗ್ರಹವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತೇನೆ, ಪ್ರತಿಯೊಂದೂ ನನ್ನ ಆತ್ಮದಿಂದ ಒಂದು ಪಿಸುಮಾತು ಅಥವಾ ನನ್ನ ಕಣ್ಣುಗಳ ಮೂಲಕ ಪ್ರಪಂಚದ ಪ್ರತಿಬಿಂಬ. ನನಗೆ ಬರವಣಿಗೆ ಕೇವಲ ಒಂದು ಹವ್ಯಾಸವಲ್ಲ, ಆದರೆ ಸಂಪರ್ಕಿಸಲು, ವ್ಯಕ್ತಪಡಿಸಲು ಮತ್ತು ಮಾನವ ಅನುಭವದ ಆಳವನ್ನು ಅನ್ವೇಷಿಸಲು ಒಂದು ಆಳವಾದ ಮಾರ್ಗವಾಗಿದೆ. ಈ ಪದಗಳು ನನ್ನನ್ನು ಎಷ್ಟು ಪ್ರತಿಧ್ವನಿಸುತ್ತವೋ ಅಷ್ಟೇ ನಿಮ್ಮನ್ನು ಸಹ ಪ್ರತಿಧ್ವನಿಸುತ್ತವೆ ಎಂದು ನಾನು ಭಾವಿಸುತ್ತೇನೆ.",
    back_to_list: "ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    content_not_found: "ಯಾವುದೇ ವಿಷಯ ಕಂಡುಬಂದಿಲ್ಲ.",
  },
  sd: {
    nav_home: "گھر",
    nav_projects: "پروجيڪٽس",
    nav_connect: "رابطو ڪريو",
    nav_poems_articles: "شاعري ۽ مضمون",
    page_title_poems: "پارتھ سڌو - شاعري ۽ مضمون",
    section_poems_articles_title: "شاعري ۽ مضمون",
    loading_content: "مواد لوڊ ٿي رهيو آهي...",
    no_content_found: "ڪو به مواد نه مليو.",
    poetry_intro_text:
      "منهنجي خيالن ۽ احساسن جي هن ڊجيٽل پناهه گاهه ۾ ڀليڪار. هتي، مان شاعري ۽ مضمونن جو هڪ مجموعو شيئر ڪريان ٿو، هر هڪ منهنجي روح جي هڪ سرگوشي يا منهنجي اکين مان دنيا جو عڪس. منهنجي لاءِ لکڻ صرف هڪ شوق ناهي بلڪه ڳنڍڻ، اظهار ڪرڻ، ۽ انساني تجربن جي گهرائين کي ڳولڻ جو هڪ گهرو طريقو آهي. مون کي اميد آهي ته اهي لفظ اوهان کي به اوترو ئي گونجائيندا جيترو مون کي ڪندا آهن.",
    back_to_list: "شاعري ۽ مضمونن ڏانهن واپس",
    content_not_found: "ڪو به مواد نه مليو.",
  },
  "zh-Hans": {
    nav_home: "首页",
    nav_projects: "项目",
    nav_connect: "联系",
    nav_poems_articles: "诗文",
    page_title_poems: "帕斯·西杜 - 诗歌与文章",
    section_poems_articles_title: "诗歌与文章",
    loading_content: "正在加载内容...",
    no_content_found: "未找到内容。",
    poetry_intro_text:
      "欢迎来到我思想与情感的数字避难所。在这里，我分享了一系列诗歌和文章，每一篇都是我灵魂的低语，或是通过我的眼睛对世界的映照。对我来说，写作不仅仅是一种爱好，更是一种深刻的连接、表达和探索人类经验深度的_方式_。我希望这些文字能像触动我一样触动你。",
    back_to_list: "返回诗歌与文章",
    content_not_found: "未找到内容。",
  },
  "zh-Hant": {
    nav_home: "首頁",
    nav_projects: "項目",
    nav_connect: "聯絡",
    nav_poems_articles: "诗文",
    page_title_poems: "帕斯·西杜 - 詩歌與文章",
    section_poems_articles_title: "詩歌與文章",
    loading_content: "正在載入內容...",
    no_content_found: "未找到內容。",
    poetry_intro_text:
      "歡迎來到我思想與情感的數位避難所。在這裡，我分享了一系列詩歌和文章，每一篇都是我靈魂的低語，或是透過我的眼睛對世界的映照。對我來說，寫作不僅僅是一種愛好，更是一種深刻的連結、表達和探索人類經驗深度的_方式_。我希望這些文字能像觸動我一樣觸動你。",
    back_to_list: "返回詩歌與文章",
    content_not_found: "未找到內容。",
  },
  ko: {
    nav_home: "홈",
    nav_projects: "프로젝트",
    nav_connect: "연결",
    nav_poems_articles: "시 및 기사",
    page_title_poems: "파스 시두 - 시 및 기사",
    section_poems_articles_title: "시 및 기사",
    loading_content: "콘텐츠 로드 중...",
    no_content_found: "콘텐츠를 찾을 수 없습니다.",
    poetry_intro_text:
      "나의 생각과 감정의 디지털 안식처에 오신 것을 환영합니다. 여기에서 저는 시와 기사 모음을 공유합니다. 각 작품은 제 영혼의 속삭임이거나 제 눈을 통해 세상을 반영한 것입니다. 저에게 글쓰기는 단순한 취미가 아니라 연결하고, 표현하고, 인간 경험의 깊이를 탐구하는 심오한 방법입니다. 이 글들이 저에게만큼이나 여러분에게도 울림이 있기를 바랍니다.",
    back_to_list: "시 및 기사로 돌아가기",
    content_not_found: "콘텐츠를 찾을 수 없습니다.",
  },
  ja: {
    nav_home: "ホーム",
    nav_projects: "プロジェクト",
    nav_connect: "お問い合わせ",
    nav_poems_articles: "詩と記事",
    page_title_poems: "パース・シドゥ - 詩と記事",
    section_poems_articles_title: "詩と記事",
    loading_content: "コンテンツを読み込み中...",
    no_content_found: "コンテンツが見つかりません。",
    poetry_intro_text:
      "私の思考と感情のデジタル聖域へようこそ。ここでは、詩や記事のコレクションを共有しています。それぞれが私の魂からのささやき、あるいは私の目を通して見た世界の反映です。私にとって、書くことは単なる趣味ではなく、つながり、表現し、人間の経験の奥深さを探求する_深い方法_です。これらの言葉が私にとってと同じくらい、あなたにも響くことを願っています。",
    back_to_list: "詩と記事に戻る",
    content_not_found: "コンテンツが見つかりません。",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_projects: "المشاريع",
    nav_connect: "اتصل",
    nav_poems_articles: "قصائد ومقالات",
    page_title_poems: "بارث سيدو - قصائد ومقالات",
    section_poems_articles_title: "قصائد ومقالات",
    loading_content: "جاري تحميل المحتوى...",
    no_content_found: "لم يتم العثور على محتوى.",
    poetry_intro_text:
      "مرحبًا بكم في ملاذي الرقمي للأفكار والمشاعر. هنا، أشارك مجموعة من القصائد والمقالات، كل منها همسة من روحي أو انعكاس للعالم من خلال عيني. الكتابة، بالنسبة لي، ليست مجرد هواية بل طريقة عميقة للتواصل والتعبير واستكشاف أعماق التجربة البشرية. آمل أن يتردد صدى هذه الكلمات في نفوسكم بقدر ما تتردد في نفسي.",
    back_to_list: "العودة إلى القصائد والمقالات",
    content_not_found: "لم يتم العثور على محتوى.",
  },
  fa: {
    nav_home: "خانه",
    nav_projects: "پروژه‌ها",
    nav_connect: "تماس",
    nav_poems_articles: "اشعار و مقالات",
    page_title_poems: "پارت سیدو - اشعار و مقالات",
    section_poems_articles_title: "اشعار و مقالات",
    loading_content: "در حال بارگذاری محتوا...",
    no_content_found: "محتوایی یافت نشد.",
    poetry_intro_text:
      "به پناهگاه دیجیتالی افکار و احساسات من خوش آمدید. در اینجا، مجموعه‌ای از اشعار و مقالات را به اشتراک می‌گذارم، که هر کدام نجواهایی از روح من یا بازتابی از جهان از دیدگاه من هستند. نوشتن برای من فقط یک سرگرمی نیست، بلکه راهی عمیق برای ارتباط، ابراز وجود و کاوش در اعماق تجربه انسانی است. امیدوارم این کلمات به همان اندازه که در من طنین‌انداز می‌شوند، در شما نیز طنین‌انداز شوند.",
    back_to_list: "بازگشت به اشعار و مقالات",
    content_not_found: "محتوایی یافت نشد.",
  },
  fr: {
    nav_home: "Accueil",
    nav_projects: "Projets",
    nav_connect: "Se connecter",
    nav_poems_articles: "Poèmes et Articles",
    page_title_poems: "Parth Sidhu - Poèmes et Articles",
    section_poems_articles_title: "Poèmes et Articles",
    loading_content: "Chargement du contenu...",
    no_content_found: "Aucun contenu trouvé.",
    poetry_intro_text:
      "Bienvenue dans mon sanctuaire numérique de pensées et d'émotions. Ici, je partage une collection de poèmes et d'articles, chacun étant un murmure de mon âme ou un reflet du monde à travers mes yeux. Écrire, pour moi, n'est pas seulement un passe-temps mais une manière profonde de se connecter, d'exprimer et d'explorer les profondeurs de l'expérience humaine. J'espère que ces mots résonneront en vous autant qu'en moi.",
    back_to_list: "Retour aux poèmes et articles",
    content_not_found: "Aucun contenu trouvé.",
  },
  de: {
    nav_home: "Startseite",
    nav_projects: "Projekte",
    nav_connect: "Verbinden",
    nav_poems_articles: "Gedichte & Artikel",
    page_title_poems: "Parth Sidhu - Gedichte & Artikel",
    section_poems_articles_title: "Gedichte & Artikel",
    loading_content: "Inhalt wird geladen...",
    no_content_found: "Kein Inhalt gefunden.",
    poetry_intro_text:
      "Willkommen in meinem digitalen Refugium der Gedanken und Emotionen. Hier teile ich eine Sammlung von Gedichten und Artikeln, von denen jeder ein Flüstern meiner Seele oder eine Reflexion der Welt durch meine Augen ist. Schreiben ist für mich nicht nur ein Hobby, sondern eine tiefgründige Art, sich zu verbinden, auszudrücken und die Tiefen der menschlichen Erfahrung zu erforschen. Ich hoffe, diese Worte resonieren bei Ihnen genauso stark wie bei mir.",
    back_to_list: "Zurück zu Gedichten & Artikeln",
    content_not_found: "Kein Inhalt gefunden.",
  },
  es: {
    nav_home: "Inicio",
    nav_projects: "Proyectos",
    nav_connect: "Conectar",
    nav_poems_articles: "Poemas y Artículos",
    page_title_poems: "Parth Sidhu - Poemas y Artículos",
    section_poems_articles_title: "Poemas y Artículos",
    loading_content: "Cargando contenido...",
    no_content_found: "No se encontró contenido.",
    poetry_intro_text:
      "Bienvenido a mi santuario digital de pensamientos y emociones. Aquí, comparto una colección de poemas y artículos, cada uno un susurro de mi alma o un reflejo del mundo a través de mis ojos. Escribir, para mí, no es solo un pasatiempo, sino una forma profunda de conectar, expresar y explorar las profundidades de la experiencia humana. Espero que estas palabras resuenen contigo tanto como lo hacen conmigo.",
    back_to_list: "Volver a Poemas y Artículos",
    content_not_found: "No se encontró contenido.",
  },
  pt: {
    nav_home: "Início",
    nav_projects: "Projetos",
    nav_connect: "Conectar",
    nav_poems_articles: "Poemas e Artigos",
    page_title_poems: "Parth Sidhu - Poemas e Artigos",
    section_poems_articles_title: "Poemas e Artigos",
    loading_content: "Carregando conteúdo...",
    no_content_found: "Nenhum conteúdo encontrado.",
    poetry_intro_text:
      "Bem-vindo ao meu santuário digital de pensamentos e emoções. Aqui, compartilho uma coleção de poemas e artigos, cada um um sussurro da minha alma ou um reflexo do mundo através dos meus olhos. Escrever, para mim, não é apenas um hobby, mas uma forma profunda de conectar, expressar e explorar as profundezas da experiência humana. Espero que estas palavras ressoem em você tanto quanto em mim.",
    back_to_list: "Voltar para Poemas e Artigos",
    content_not_found: "Nenhum conteúdo encontrado.",
  },
  it: {
    nav_home: "Home",
    nav_projects: "Progetti",
    nav_connect: "Connetti",
    nav_poems_articles: "Poesie e Articoli",
    page_title_poems: "Parth Sidhu - Poesie e Articoli",
    section_poems_articles_title: "Poesie e Articoli",
    loading_content: "Caricamento del contenuto...",
    no_content_found: "Nessun contenuto trovato.",
    poetry_intro_text:
      "Benvenuti nel mio santuario digitale di pensieri ed emozioni. Qui, condivido una collezione di poesie e articoli, ognuno un sussurro della mia anima o un riflesso del mondo attraverso i miei occhi. Scrivere, per me, non è solo un hobby ma un modo profondo per connettersi, esprimere ed esplorare le profondità dell'esperienza umana. Spero che queste parole risuonino in voi tanto quanto in me.",
    back_to_list: "Torna a Poesie e Articoli",
    content_not_found: "Nessun contenuto trovato.",
  },
  ru: {
    nav_home: "Главная",
    nav_projects: "Проекты",
    nav_connect: "Связаться",
    nav_poems_articles: "Стихи и статьи",
    page_title_poems: "Парф Сидху - Стихи и статьи",
    section_poems_articles_title: "Стихи и статьи",
    loading_content: "Загрузка контента...",
    no_content_found: "Контент не найден.",
    poetry_intro_text:
      "Добро пожаловать в мое цифровое убежище мыслей и эмоций. Здесь я делюсь коллекцией стихов и статей, каждая из которых — это шепот моей души или отражение мира через мои глаза. Писательство для меня — это не просто хобби, а глубокий способ связи, выражения и исследования глубин человеческого опыта. Надеюсь, эти слова найдут отклик у вас так же сильно, как и у меня.",
    back_to_list: "Вернуться к стихам и статьям",
    content_not_found: "Контент не найден.",
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_projects: "Projeler",
    nav_connect: "Bağlan",
    nav_poems_articles: "Şiirler ve Makaleler",
    page_title_poems: "Parth Sidhu - Şiirler ve Makaleler",
    section_poems_articles_title: "Şiirler ve Makaleler",
    loading_content: "İçerik yükleniyor...",
    no_content_found: "İçerik bulunamadı.",
    poetry_intro_text:
      "Düşüncelerimin ve duygularımın dijital sığınağıma hoş geldiniz. Burada, ruhumdan bir fısıltı veya dünyayı gözlerimden bir yansıma olan bir şiir ve makale koleksiyonu paylaşıyorum. Yazmak benim için sadece bir hobi değil, aynı zamanda bağlantı kurmanın, ifade etmenin ve insan deneyiminin derinliklerini keşfetmenin derin bir yoludur. Umarım bu kelimeler benim için olduğu kadar sizin için de yankılanır.",
    back_to_list: "Şiirler ve Makalelere Geri Dön",
    content_not_found: "İçerik bulunamadı.",
  },
  nl: {
    nav_home: "Home",
    nav_projects: "Projecten",
    nav_connect: "Contact",
    nav_poems_articles: "Gedichten & Artikelen",
    page_title_poems: "Parth Sidhu - Gedichten & Artikelen",
    section_poems_articles_title: "Gedichten & Artikelen",
    loading_content: "Inhoud laden...",
    no_content_found: "Geen inhoud gevonden.",
    poetry_intro_text:
      "Welkom in mijn digitale toevluchtsoord van gedachten en emoties. Hier deel ik een verzameling gedichten en artikelen, elk een fluistering van mijn ziel of een weerspiegeling van de wereld door mijn ogen. Schrijven is voor mij niet zomaar een hobby, maar een diepgaande manier om te verbinden, uit te drukken en de diepten van menselijke ervaring te verkennen. Ik hoop dat deze woorden bij u net zo resoneren als bij mij.",
    back_to_list: "Terug naar Gedichten & Artikelen",
    content_not_found: "Geen inhoud gevonden.",
  },
};

// --- Apply Translations ---
function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation =
      translations[currentLanguage]?.[key] || translations.en[key];

    if (!translation) return;

    if (el.tagName === "TITLE") {
      document.title = translation;
    } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });

  document.body.className = `lang-${currentLanguage}`;

  const selectors = document.querySelectorAll(
    ".language-selector-common, #language-selector"
  );
  selectors.forEach((s) => {
    if (s.tagName === "SELECT") {
      s.value = currentLanguage;
    }
  });
}

window.applyTranslations = applyTranslations;

// ... (keep all the code above this, including translations and applyTranslations) ...

// --- Function to render the list of poems/articles ---
const renderContentList = () => {
  const contentListDiv = document.getElementById("content-list");
  if (!contentListDiv) {
    return; // If we're not on the list page, do nothing
  }
  contentListDiv.innerHTML = ""; // Clear existing content

  if (typeof portfolioContent !== "undefined" && portfolioContent.length > 0) {
    // Add a container for the grid layout
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("content-grid"); // This class will define our grid CSS

    portfolioContent.forEach((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("content-card"); // Class for individual card styling

      // Title
      const title =
        item.title[window.currentLanguage] ||
        item.title[item.language] || // Show original language if available
        item.title.en;

      const titleElement = document.createElement("h3");
      titleElement.textContent = title;
      cardDiv.appendChild(titleElement);

      // Abstract (always non-hyperlinked)
      if (item.abstract) {
        let abstractText = "";

        if (typeof item.abstract === "object") {
          abstractText =
            item.abstract[window.currentLanguage] ||
            item.abstract.en ||
            Object.values(item.abstract)[0];
        } else if (typeof item.abstract === "string") {
          abstractText = item.abstract;
        }

        if (abstractText) {
          const abstractParagraph = document.createElement("p");
          abstractParagraph.classList.add("content-abstract");
          abstractParagraph.textContent = abstractText;
          cardDiv.appendChild(abstractParagraph);
        }
      }

      // Read More Button
      const readButton = document.createElement("a");
      readButton.href = `poem-article-detail.html?id=${item.id}`;
      readButton.classList.add("btn"); // Only add the base 'btn' class // Apply your existing button classes
      readButton.textContent = "Read"; // You might want to translate this later

      cardDiv.appendChild(readButton); // Add the button to the card

      gridContainer.appendChild(cardDiv); // Add the completed card to the grid container
    });
    contentListDiv.appendChild(gridContainer); // Add the grid container to the main content list div
  } else {
    // Display "No content found" message
    contentListDiv.innerHTML = `<p data-i18n="no_content_found">${
      window.translations[window.currentLanguage]?.["no_content_found"] ||
      window.translations.en["no_content_found"]
    }</p>`;
  }
};

// ... (keep all the code below this, including DOMContentLoaded listener) ...

// ... (keep all your existing code above this section, including applyTranslations and renderContentList function definitions) ...

// --- DOM Ready Handler ---
document.addEventListener("DOMContentLoaded", () => {
  window.currentLanguage = localStorage.getItem("portfolioLanguage") || "en";
  applyTranslations();

  const langSelectors = document.querySelectorAll(
    ".language-selector-common, #language-selector"
  );
  langSelectors.forEach((selector) => {
    selector.addEventListener("change", (event) => {
      window.currentLanguage = event.target.value;
      localStorage.setItem("portfolioLanguage", window.currentLanguage);
      applyTranslations();
      renderContentList(); // Re-render the list when language changes
    });
  });
  // --- Navigation Toggle Logic (NEW) ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksList = document.querySelector(".navbar ul"); // Select the <ul> element in the navbar

  if (navToggle && navLinksList) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open"); // Toggles hamburger icon animation
      navLinksList.classList.toggle("open"); // Toggles menu visibility
    });

    // Close menu when a navigation link is clicked (optional, but good UX)
    const navLinks = navLinksList.querySelectorAll("li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinksList.classList.contains("open")) {
          navToggle.classList.remove("open");
          navLinksList.classList.remove("open");
        }
      });
    });

    // Close menu if clicked outside (optional)
    document.addEventListener("click", (event) => {
      const isClickInsideNavbar =
        navToggle.contains(event.target) || navLinksList.contains(event.target);
      if (!isClickInsideNavbar && navLinksList.classList.contains("open")) {
        navToggle.classList.remove("open");
        navLinksList.classList.remove("open");
      }
    });
  }
  const initialLangSelector = document.getElementById("language-selector");
  if (initialLangSelector && window.currentLanguage) {
    initialLangSelector.value = window.currentLanguage;
  }

  // --- Logic for the detail page (poem-article-detail.html) ---
  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get("id");

  const contentTitleElement = document.getElementById("content-title");
  const contentBodyElement = document.getElementById("content-body");
  const backButton = document.getElementById("backButton");

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "poems-articles.html";
    });
  }

  // Determine if we are on the list page or a detail page
  if (contentId && contentTitleElement && contentBodyElement) {
    // This is the detail page
    if (typeof portfolioContent !== "undefined") {
      const item = portfolioContent.find((p) => p.id === contentId);

      if (item) {
        const displayTitle =
          item.title[window.currentLanguage] ||
          item.title[item.language] ||
          item.title.en;
        const displayContent =
          item.content[window.currentLanguage] ||
          item.content[item.language] ||
          item.content.en;

        document.title = `Parth Sidhu - ${displayTitle}`;
        contentTitleElement.innerHTML = displayTitle;
        contentBodyElement.innerHTML = displayContent;
      } else {
        contentTitleElement.innerHTML =
          window.translations[window.currentLanguage]?.["content_not_found"] ||
          window.translations.en["content_not_found"];
        contentBodyElement.innerHTML = "";
      }
    } else {
      // If portfolioContent isn't loaded yet on detail page, show loading or error
      contentTitleElement.innerHTML =
        window.translations[window.currentLanguage]?.["loading_content"] ||
        window.translations.en["loading_content"];
      contentBodyElement.innerHTML = "";
    }
  } else {
    // This is the list page (poems-articles.html)
    // IMPORTANT: Call renderContentList here for initial load
    renderContentList(); // <--- THIS IS THE LINE TO ADD/ENSURE IS HERE
  }
});

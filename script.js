// Disable right-click globally
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// --- Carousel Logic ---
let currentSlide = 0;
const slides = document.querySelectorAll(".education-slide");
const dots = document.querySelectorAll(".dot");
const carousel = document.querySelector(".education-carousel");
let intervalId;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function updateCarousel() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentSlide);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlide);
  });
}

function nextEducation() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevEducation() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoSlide();
}

function autoSlide() {
  intervalId = setInterval(() => {
    nextEducation();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(intervalId);
  autoSlide();
}

// Touch event handlers for carousel
carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carousel.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault(); // Prevent scrolling while swiping
    touchEndX = e.touches[0].clientX;
  },
  { passive: false }
); // Use passive: false to allow preventDefault

carousel.addEventListener("touchend", () => {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > swipeThreshold) {
    prevEducation();
    resetAutoSlide();
  } else if (swipeDistance < -swipeThreshold) {
    nextEducation();
    resetAutoSlide();
  }
  touchStartX = 0;
  touchEndX = 0;
});

// --- Internationalization (i18n) Logic ---
const translations = {
  en: {
    page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Projects",
    nav_connect: "Connect",
    hero_welcome: "WELCOME",
    hero_tagline: "Weaving Dreams in the Digital Loom.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE student | AI & Software Dev Enthusiast | Cinematic Mindset",
    about_me_heading: "About Me",
    about_me_para1:
      "Surrounded by the serene hills and tall Deodar trees of Shimla, I’ve learned to appreciate both simplicity and depth. This balance shapes how I approach technology — thoughtfully, creatively, and with steady focus.",
    about_me_para2:
      "I believe meaningful solutions come from combining technical skills with clear thinking and a dash of curiosity. My goal is to build projects that are practical, innovative, and make a positive difference.",
    education_heading: "Education",
    edu_gsv_degree:
      "B. Tech in Electronics and Communication Engineering (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Bachelor of Science (Foundation Program)",
    edu_iitm_institute: "Indian Institute of Technology (IIT) Madras",
    edu_shc_degree: "Class 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobbies",
    hobbies_text:
      "Singing, Poetry, Reading and Drawing — ways I express myself beyond tech.",
    skills_heading: "Skills",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Basic Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projects",
    project_facevision_title: "Face-Vision",
    project_facevision_desc: "Detect faces in images and videos using OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Detect stars in images from NASA's Hubble collection.",
    view_project_link: "View project",
    projects_coming_soon: "More projects coming soon — stay tuned!",
    currently_learning_heading: "Currently Learning",
    learning_java: "Java",
    learning_datastructures: "Data Structures",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Connect",
  },
  hi: {
    page_title: "पार्थ सिद्धू - पोर्टफोलियो",
    nav_home: "होम",
    nav_projects: "प्रोजेक्ट्स",
    nav_connect: "संपर्क करें",
    hero_welcome: "स्वागत है",
    hero_tagline: "डिजिटल करघे में सपनों की बुनाई।",
    profile_name: "पार्थ सिद्धू",
    profile_tagline:
      "ईसीई छात्र | एआई और सॉफ्टवेयर देव उत्साही | सिनेमाई मानसिकता",
    about_me_heading: "मेरे बारे में",
    about_me_para1:
      "शिमला की शांत पहाड़ियों और ऊंचे देवदार के पेड़ों से घिरा, मैंने सादगी और गहराई दोनों की सराहना करना सीखा है। यह संतुलन मेरे प्रौद्योगिकी के दृष्टिकोण को आकार देता है — विचारपूर्वक, रचनात्मक रूप से और स्थिर ध्यान के साथ।",
    about_me_para2:
      "मेरा मानना ​​है कि सार्थक समाधान तकनीकी कौशल को स्पष्ट सोच और थोड़ी जिज्ञासा के साथ जोड़ने से आते हैं। मेरा लक्ष्य ऐसी परियोजनाएं बनाना है जो व्यावहारिक, नवीन और सकारात्मक बदलाव लाएं।",
    education_heading: "शिक्षा",
    edu_gsv_degree: "इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग (ईसीई) में बी. टेक",
    edu_gsv_institute: "गति शक्ति विश्वविद्यालय, वडोदरा",
    edu_iitm_degree: "बैचलर ऑफ साइंस (फाउंडेशन प्रोग्राम)",
    edu_iitm_institute: "भारतीय प्रौद्योगिकी संस्थान (आईआईटी) मद्रास",
    edu_shc_degree: "कक्षा 12 (पीसीएम)",
    edu_shc_institute: "सेक्रेड हार्ट कॉन्वेंट, फ्लूर-डी-लिस, ढली, शिमला",
    hobbies_heading: "शौक",
    hobbies_text:
      "गाना, कविता, पढ़ना और चित्रकारी — ऐसे तरीके जिनसे मैं खुद को तकनीक से परे व्यक्त करता हूं।",
    skills_heading: "कौशल",
    skill_cpp: "सी++",
    skill_python: "पायथन",
    skill_java_basic: "बेसिक जावा",
    skill_ubuntu: "उबंटू",
    skill_git: "गिट",
    projects_heading: "परियोजनाएं",
    project_facevision_title: "फेस-विजन",
    project_facevision_desc:
      "ओपनसीवी का उपयोग करके छवियों और वीडियो में चेहरों का पता लगाएं।",
    project_stardetection_title: "स्टार-डिटेक्शन",
    project_stardetection_desc:
      "नासा के हबल संग्रह से छवियों में सितारों का पता लगाएं।",
    view_project_link: "प्रोजेक्ट देखें",
    projects_coming_soon: "अधिक परियोजनाएं जल्द आ रही हैं — बने रहें!",
    currently_learning_heading: "वर्तमान में सीख रहा हूँ",
    learning_java: "जावा",
    learning_datastructures: "डेटा स्ट्रक्चर्स",
    learning_deep_learning: "डीप लर्निंग",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "जुड़े",
  },
  pa: {
    /* Punjabi - Gurmukhi */ page_title: "ਪਾਰਥ ਸਿੱਧੂ - ਪੋਰਟਫੋਲੀਓ",
    nav_home: "ਘਰ",
    nav_projects: "ਪ੍ਰੋਜੈਕਟ",
    nav_connect: "ਸੰਪਰਕ ਕਰੋ",
    hero_welcome: "ਸੁਆਗਤ ਹੈ",
    hero_tagline: "ਡਿਜੀਟਲ ਲੂਮ ਵਿੱਚ ਸੁਪਨਿਆਂ ਦੀ ਬੁਣਾਈ।",
    profile_name: "ਪਾਰਥ ਸਿੱਧੂ",
    profile_tagline: "ਈਸੀਈ ਵਿਦਿਆਰਥੀ | ਏਆਈ ਉਤਸ਼ਾਹੀ | ਕਹਾਣੀ-ਸੰਚਾਲਿਤ ਦੇਵ",
    about_me_heading: "ਮੇਰੇ ਬਾਰੇ",
    about_me_para1:
      "ਸ਼ਿਮਲਾ ਦੀਆਂ ਸ਼ਾਂਤ ਪਹਾੜੀਆਂ ਤੇ ਉੱਚੇ ਦੇਵਦਾਰ ਦੇ ਰੁੱਖਾਂ ਨਾਲ ਘਿਰਿਆ, ਮੈਂ ਸਾਦਗੀ ਅਤੇ ਡੂੰਘਾਈ ਦੋਵਾਂ ਦੀ ਕਦਰ ਕਰਨਾ ਸਿੱਖਿਆ ਹੈ। ਇਹ ਸੰਤੁਲਨ ਤਕਨਾਲੋਜੀ ਪ੍ਰਤੀ ਮੇਰੇ ਪਹੁੰਚ ਨੂੰ ਆਕਾਰ ਦਿੰਦਾ ਹੈ — ਸੋਚ-ਸਮਝ ਕੇ, ਰਚਨਾਤਮਕ ਤੌਰ 'ਤੇ ਅਤੇ ਸਥਿਰ ਫੋਕਸ ਨਾਲ।",
    about_me_para2:
      "ਮੇਰਾ ਮੰਨਣਾ ਹੈ ਕਿ ਸਾਰਥਕ ਹੱਲ ਤਕਨੀਕੀ ਹੁਨਰਾਂ ਨੂੰ ਸਪੱਸ਼ਟ ਸੋਚ ਅਤੇ ਥੋੜ੍ਹੀ ਜਿਹੀ ਉਤਸੁਕਤਾ ਨਾਲ ਜੋੜਨ ਤੋਂ ਆਉਂਦੇ ਹਨ। ਮੇਰਾ ਟੀਚਾ ਅਜਿਹੇ ਪ੍ਰੋਜੈਕਟ ਬਣਾਉਣਾ ਹੈ ਜੋ ਵਿਹਾਰਕ, ਨਵੀਨਤਾਕਾਰੀ ਅਤੇ ਸਕਾਰਾਤਮਕ ਫਰਕ ਪਾਉਂਦੇ ਹਨ।",
    education_heading: "ਸਿੱਖਿਆ",
    edu_gsv_degree: "ਇਲੈਕਟ੍ਰਾਨਿਕਸ ਅਤੇ ਸੰਚਾਰ ਇੰਜੀਨੀਅਰਿੰਗ (ਈਸੀਈ) ਵਿੱਚ ਬੀ. ਟੈਕ",
    edu_gsv_institute: "ਗਤੀ ਸ਼ਕਤੀ ਵਿਸ਼ਵਵਿਦਿਆਲਿਆ, ਵਡੋਦਰਾ",
    edu_iitm_degree: "ਬੈਚਲਰ ਆਫ਼ ਸਾਇੰਸ (ਫਾਊਂਡੇਸ਼ਨ ਪ੍ਰੋਗਰਾਮ)",
    edu_iitm_institute: "ਇੰਡੀਅਨ ਇੰਸਟੀਚਿਊਟ ਆਫ਼ ਟੈਕਨਾਲੋਜੀ (ਆਈਆਈਟੀ) ਮਦਰਾਸ",
    edu_shc_degree: "ਕਲਾਸ 12 (ਪੀਸੀਐਮ)",
    edu_shc_institute: "ਸੈਕਰਡ ਹਾਰਟ ਕਾਨਵੈਂਟ, ਫਲਿਊਰ-ਡੀ-ਲਾਈਸ, ਢਾਲੀ, ਸ਼ਿਮਲਾ",
    hobbies_heading: "ਸ਼ੌਕ",
    hobbies_text:
      "ਗਾਉਣਾ, ਕਵਿਤਾ, ਪੜ੍ਹਨਾ ਅਤੇ ਡਰਾਇੰਗ — ਤਰੀਕੇ ਜਿਨ੍ਹਾਂ ਨਾਲ ਮੈਂ ਤਕਨੀਕ ਤੋਂ ਪਰੇ ਆਪਣੇ ਆਪ ਨੂੰ ਪ੍ਰਗਟ ਕਰਦਾ ਹਾਂ।",
    skills_heading: "ਹੁਨਰ",
    skill_cpp: "C++",
    skill_python: "ਪਾਈਥਨ",
    skill_java_basic: "ਬੇਸਿਕ ਜਾਵਾ",
    skill_ubuntu: "ਉਬੰਤੂ",
    skill_git: "ਗਿੱਟ",
    projects_heading: "ਪ੍ਰੋਜੈਕਟ",
    project_facevision_title: "ਫੇਸ-ਵਿਜ਼ਨ",
    project_facevision_desc:
      "ਓਪਨਸੀਵੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਚਿੱਤਰਾਂ ਅਤੇ ਵੀਡੀਓਜ਼ ਵਿੱਚ ਚਿਹਰਿਆਂ ਦਾ ਪਤਾ ਲਗਾਓ।",
    project_stardetection_title: "ਸਟਾਰ-ਡਿਟੈਕਸ਼ਨ",
    project_stardetection_desc:
      "ਨਾਸਾ ਦੇ ਹਬਲ ਸੰਗ੍ਰਹਿ ਤੋਂ ਚਿੱਤਰਾਂ ਵਿੱਚ ਤਾਰਿਆਂ ਦਾ ਪਤਾ ਲਗਾਓ।",
    view_project_link: "ਪ੍ਰੋਜੈਕਟ ਦੇਖੋ",
    projects_coming_soon: "ਹੋਰ ਪ੍ਰੋਜੈਕਟ ਜਲਦੀ ਆ ਰਹੇ ਹਨ — ਬਣੇ ਰਹੋ!",
    currently_learning_heading: "ਵਰਤਮਾਨ ਵਿੱਚ ਸਿੱਖ ਰਿਹਾ ਹਾਂ",
    learning_java: "ਜਾਵਾ",
    learning_datastructures: "ਡਾਟਾ ਸਟ੍ਰਕਚਰ",
    learning_deep_learning: "ਡੂੰਘੀ ਸਿਖਲਾਈ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "ਜੁੜੋ",
  },
  "pa-Arab": {
    /* Punjabi - Shahmukhi */ page_title: "پارتھ سدھو - پورٹ فولیو",
    nav_home: "گھر",
    nav_projects: "پروجیکٹس",
    nav_connect: "رابطہ کریں",
    hero_welcome: "خوش آمدید",
    hero_tagline: "ڈیجیٹل لوم وچ سپنیاں دی بنائی۔",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "ای سی ای طالب علم | اے آئی اور سافٹ ویئر ڈویلپمنٹ دا شوقین | سنیما کی ذہنیت",
    about_me_heading: "میرے بارے میں",
    about_me_para1:
      "شملہ دی پُرسکون پہاڑیاں تے اُچے دیودار دے درختاں نال گھرا ہویا، میں سادگی تے گہرائی دوناں دی تعریف کرنا سِکھیا اے۔ ایہ توازن ٹیکنالوجی دے بارے وچ میری سوچ نو‏‏ں تشکیل دیندا ہے — سوچ سمجھ کے، تخلیقی انداز وچ تے مستحکم توجہ دے نال۔",
    about_me_para2:
      "میرا ماننا ہے کہ بامعنی حل تکنیکی مہارتوں نو‏‏ں واضح سوچ تے تھوڑی سی تجسس دے نال جوڑن تو‏ں حاصل ہوندے نيں۔ میرا مقصد ایہو جے منصوبے بنانا ہے جو عملی، اختراعی تے مثبت فرق پیدا کرن۔",
    education_heading: "تعلیم",
    edu_gsv_degree: "بی ٹیک (الیکٹرانکس اینڈ کمیونیکیشن انجینئرنگ)",
    edu_gsv_institute: "گتی شکتی وشو ودیالیہ، وڈودرا",
    edu_iitm_degree: "بیچلر آف سائنس (فاؤنڈیشن پروگرام)",
    edu_iitm_institute: "انڈین انسٹی ٹیوٹ آف ٹیکنالوجی (آئی آئی ٹی) مدراس",
    edu_shc_degree: "کلاس 12 (پی سی ایم)",
    edu_shc_institute: "سیکرڈ ہارٹ کانونٹ، فلور-ڈی-لیس، ڈھالی، شملہ",
    hobbies_heading: "مشاغل",
    hobbies_text:
      "گانا، شاعری، پڑھنا تے ڈرائنگ — اوہ طریقے جن تو‏ں میں ٹیکنالوجی تو‏ں ہٹ کے خود نو‏‏ں ظاہر کردا آں۔",
    skills_heading: "مہارتیں",
    skill_cpp: "سی++",
    skill_python: "پائیتھن",
    skill_java_basic: "بنیادی جاوا",
    skill_ubuntu: "اوبنٹو",
    skill_git: "گٹ",
    projects_heading: "پروجیکٹس",
    project_facevision_title: "فیس ویژن",
    project_facevision_desc:
      "اوپن سی وی دا استعمال کردے ہوئے تصاویر تے ویڈیوز وچ چہریاں دا پتہ لاؤ۔",
    project_stardetection_title: "اسٹار ڈیٹیکشن",
    project_stardetection_desc:
      "ناسا دے ہبل کلیکشن تو‏ں تصاویر وچ ستاریاں دا پتہ لاؤ۔",
    view_project_link: "پروجیکٹ دیکھو",
    projects_coming_soon: "مزید پروجیکٹس جلد آرہے نيں — دیکھتے رہو!",
    currently_learning_heading: "فی الحال سیکھ رہا آں",
    learning_java: "جاوا",
    learning_datastructures: "ڈیٹا سٹرکچرز",
    learning_deep_learning: "ڈیپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "رابطہ",
  },
  ur: {
    /* Urdu */ page_title: "پارتھ سدھو - پورٹ فولیو",
    nav_home: "ہوم",
    nav_projects: "پروجیکٹس",
    nav_connect: "رابطہ کریں",
    hero_welcome: "خوش آمدید",
    hero_tagline: "ڈیجیٹل لوم میں خوابوں کی بنائی۔",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "ای سی ای طالب علم | اے آئی اور سافٹ ویئر ڈویلپمنٹ کا شوقین | سنیما کی ذہنیت",
    about_me_heading: "میرے بارے میں",
    about_me_para1:
      "شملہ کی پُرسکون پہاڑیوں اور اونچے دیودار کے درختوں سے گھرا ہوا، میں نے سادگی اور گہرائی دونوں کی تعریف کرنا سیکھا ہے۔ یہ توازن ٹیکنالوجی کے تئیں میرے نقطہ نظر کو تشکیل دیتا ہے — سوچ سمجھ کر، تخلیقی انداز میں اور مستحکم توجہ کے ساتھ۔",
    about_me_para2:
      "میرا ماننا ہے کہ بامعنی حل تکنیکی مہارتوں کو واضح سوچ اور تھوڑی سی تجسس کے ساتھ جوڑنے سے حاصل ہوتے ہیں۔ میرا مقصد ایسے منصوبے بنانا ہے جو عملی، اختراعی اور مثبت فرق پیدا کریں۔",
    education_heading: "تعلیم",
    edu_gsv_degree: "بی ٹیک (الیکٹرانکس اینڈ کمیونیکیشن انجینئرنگ)",
    edu_gsv_institute: "گتی شکتی وشو ودیالیہ، وڈودرا",
    edu_iitm_degree: "بیچلر آف سائنس (فاؤنڈیشن پروگرام)",
    edu_iitm_institute: "انڈین انسٹی ٹیوٹ آف ٹیکنالوجی (آئی آئی ٹی) مدراس",
    edu_shc_degree: "کلاس 12 (پی سی ایم)",
    edu_shc_institute: "سیکرڈ ہارٹ کانونٹ، فلور-ڈی-لیس، ڈھالی، شملہ",
    hobbies_heading: "مشاغل",
    hobbies_text:
      "گانا، شاعری، پڑھنا اور ڈرائنگ — وہ طریقے جن سے میں ٹیکنالوجی سے ہٹ کر خود کو ظاہر کرتا ہوں۔",
    skills_heading: "مہارتیں",
    skill_cpp: "سی++",
    skill_python: "پائیتھن",
    skill_java_basic: "بنیادی جاوا",
    skill_ubuntu: "اوبنٹو",
    skill_git: "گٹ",
    projects_heading: "پروجیکٹس",
    project_facevision_title: "فیس ویژن",
    project_facevision_desc:
      "اوپن سی وی کا استعمال کرتے ہوئے تصاویر اور ویڈیوز میں چہروں کا پتہ لگائیں۔",
    project_stardetection_title: "اسٹار ڈیٹیکشن",
    project_stardetection_desc:
      "ناسا کے ہبل کلیکشن سے تصاویر میں ستاروں کا پتہ لگائیں۔",
    view_project_link: "پروجیکٹ دیکھیں",
    projects_coming_soon: "مزید پروجیکٹس جلد آرہے ہیں — دیکھتے رہیں!",
    currently_learning_heading: "فی الحال سیکھ رہا ہوں",
    learning_java: "جاوا",
    learning_datastructures: "ڈیٹا سٹرکچرز",
    learning_deep_learning: "ڈیپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "رابطہ",
  },
  gu: {
    /* Gujarati */ page_title: "પાર્થ સિદ્ધુ - પોર્ટફોલિયો",
    nav_home: "ઘર",
    nav_projects: "પ્રોજેક્ટ્સ",
    nav_connect: "સંપર્ક કરો",
    hero_welcome: "સ્વાગત છે",
    hero_tagline: "ડિજિટલ લૂમમાં સપનાનું વણાટ.",
    profile_name: "પાર્થ સિદ્ધુ",
    profile_tagline: "ECE વિદ્યાર્થી | AI ઉત્સાહી | વાર્તા-આધારિત દેવ",
    about_me_heading: "મારા વિશે",
    about_me_para1:
      "શિમલાની શાંત ટેકરીઓ અને ઊંચા દેવદારના વૃક્ષોથી ઘેરાયેલા, મેં સાદગી અને ઊંડાણ બંનેની કદર કરવાનું શીખ્યું છે. આ સંતુલન હું ટેકનોલોજીનો સંપર્ક કેવી રીતે કરું છું તે આકાર આપે છે — વિચારપૂર્વક, સર્જનાત્મક રીતે અને સ્થિર ધ્યાન સાથે.",
    about_me_para2:
      "હું માનું છું કે અર્થપૂર્ણ ઉકેલો તકનીકી કુશળતાને સ્પષ્ટ વિચાર અને જિજ્ઞાસાના થોડા સ્પર્શ સાથે જોડવાથી આવે છે. મારો ધ્યેય એવા પ્રોજેક્ટ્સ બનાવવાનો છે જે વ્યવહારુ, નવીન અને સકારાત્મક તફાવત લાવે.",
    education_heading: "શિક્ષણ",
    edu_gsv_degree:
      "ઇલેક્ટ્રોનિક્સ અને કમ્યુનિકેશન એન્જિનિયરિંગ (ECE) માં બી. ટેક",
    edu_gsv_institute: "ગતિ શક્તિ વિશ્વવિદ્યાલય, વડોદરા",
    edu_iitm_degree: "બેચલર ઑફ સાયન્સ (ફાઉન્ડેશન પ્રોગ્રામ)",
    edu_iitm_institute: "ઇન્ડિયન ઇન્સ્ટિટ્યુટ ઑફ ટેકનોલોજી (IIT) મદ્રાસ",
    edu_shc_degree: "ધોરણ 12 (PCM)",
    edu_shc_institute: "સેક્રેડ હાર્ટ કૉન્વેન્ટ, ફ્લ્યુર-ડી-લિયસ, ઢાલી, શિમલા",
    hobbies_heading: "શોખ",
    hobbies_text:
      "ગાયન, કવિતા, વાંચન અને ચિત્રકામ — એવી રીતો જેનાથી હું ટેકનોલોજીથી આગળ વધીને પોતાને વ્યક્ત કરું છું.",
    skills_heading: "કુશળતા",
    skill_cpp: "સી++",
    skill_python: "પાયથોન",
    skill_java_basic: "બેઝિક જાવા",
    skill_ubuntu: "ઉબુન્ટુ",
    skill_git: "ગિટ",
    projects_heading: "પ્રોજેક્ટ્સ",
    project_facevision_title: "ફેસ-વિઝન",
    project_facevision_desc:
      "OpenCV નો ઉપયોગ કરીને છબીઓ અને વિડિઓઝમાં ચહેરાઓ શોધો.",
    project_stardetection_title: "સ્ટાર-ડિટેક્શન",
    project_stardetection_desc: "નાસાના હબલ સંગ્રહમાંથી છબીઓમાં તારાઓ શોધો.",
    view_project_link: "પ્રોજેક્ટ જુઓ",
    projects_coming_soon: "વધુ પ્રોજેક્ટ્સ જલ્દી આવી રહ્યા છે — જોડાયેલા રહો!",
    currently_learning_heading: "હાલમાં શીખી રહ્યો છું",
    learning_java: "જાવા",
    learning_datastructures: "ડેટા સ્ટ્રક્ચર્સ",
    learning_deep_learning: "ડીપ લર્નિંગ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "જોડાઓ",
  },
  or: {
    /* Odia */ page_title: "ପାର୍ଥ ସିଧୁ - ପୋର୍ଟଫୋଲିଓ",
    nav_home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    nav_projects: "ପ୍ରୋଜେକ୍ଟଗୁଡିକ",
    nav_connect: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    hero_welcome: "ସ୍ଵାଗତ",
    hero_tagline: "ଡିଜିଟାଲ୍ ଲୁମ୍ ରେ ସ୍ୱପ୍ନର ବୁଣା।",
    profile_name: "ପାର୍ଥ ସିଧୁ",
    profile_tagline:
      "ECE ଛାତ୍ର | AI ଓ ସଫ୍ଟୱେର୍ ଦେବ ଉତ୍ସାହୀ | ସିନେମାଟିକ୍ ମାନସିକତା",
    about_me_heading: "ମୋ ବିଷୟରେ",
    about_me_para1:
      "ଶିମଲାର ଶାନ୍ତ ପାହାଡ଼ ଏବଂ ଉଚ୍ଚ ଦେଓଦାର ବୃକ୍ଷରେ ଘେରି ରହି, ମୁଁ ସରଳତା ଏବଂ ଗଭୀରତା ଉଭୟକୁ ପ୍ରଶଂସା କରିବା ଶିଖିଛି। ଏହି ସନ୍ତୁଳନ ମୋର ପ୍ରଯୁକ୍ତି ପ୍ରତି ଦୃଷ୍ଟିକୋଣକୁ ଗଢିଥାଏ — ଚିନ୍ତାଶୀଳ, ସୃଜନଶୀଳ ଏବଂ ସ୍ଥିର ଧ୍ୟାନ ସହିତ।",
    about_me_para2:
      "ମୁଁ ବିଶ୍ୱାସ କରେ ଯେ ଅର୍ଥପୂର୍ଣ୍ଣ ସମାଧାନ ବୈଷୟିକ ଦକ୍ଷତାକୁ ସ୍ପଷ୍ଟ ଚିନ୍ତାଧାରା ଏବଂ ଟିକିଏ କୌତୁହଳ ସହିତ ମିଶାଇବାରୁ ଆସିଥାଏ। ମୋର ଲକ୍ଷ୍ୟ ହେଉଛି ବ୍ୟବହାରିକ, ଅଭିନବ ଏବଂ ସକାରାତ୍ମକ ପରିବର୍ତ୍ତନ ଆଣୁଥିବା ପ୍ରୋଜେକ୍ଟଗୁଡିକ ନିର୍ମାଣ କରିବା।",
    education_heading: "ଶିକ୍ଷା",
    edu_gsv_degree: "ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ଏବଂ ଯୋଗାଯୋଗ ଇଞ୍ଜିନିୟରିଂ (ECE) ରେ ବି. ଟେକ୍",
    edu_gsv_institute: "ଗତି ଶକ୍ତି ବିଶ୍ୱବିଦ୍ୟାଳୟ, ବରୋଦା",
    edu_iitm_degree: "ବିଜ୍ଞାନ ସ୍ନାତକ (ଫାଉଣ୍ଡେସନ୍ ପ୍ରୋଗ୍ରାମ)",
    edu_iitm_institute: "ଭାରତୀୟ ପ୍ରଯୁକ୍ତି ବିଦ୍ୟା ପ୍ରତିଷ୍ଠାନ (IIT) ମାଡ୍ରାସ",
    edu_shc_degree: "ଦ୍ୱାଦଶ ଶ୍ରେଣୀ (PCM)",
    edu_shc_institute: "ସେକ୍ରେଡ ହାର୍ଟ କନଭେଣ୍ଟ, ଫ୍ଲୁର-ଡି-ଲାଇସ୍, ଢାଲି, ଶିମଲା",
    hobbies_heading: "ଶୌକ୍ଷ",
    hobbies_text:
      "ଗାୟନ, କବିତା, ପଢିବା ଏବଂ ଚିତ୍ରାଙ୍କନ — ଯେଉଁ ଉପାୟରେ ମୁଁ ପ୍ରଯୁକ୍ତି ବିଦ୍ୟା ବାହାରେ ନିଜକୁ ପ୍ରକାଶ କରେ।",
    skills_heading: "ଦକ୍ଷତା",
    skill_cpp: "C++",
    skill_python: "ପାଇଥନ୍",
    skill_java_basic: "ମୌଳିକ ଜାଭା",
    skill_ubuntu: "ଉବୁଣ୍ଟୁ",
    skill_git: "ଗିଟ୍",
    projects_heading: "ପ୍ରୋଜେକ୍ଟଗୁଡିକ",
    project_facevision_title: "ଫେସ୍-ଭିଜନ୍",
    project_facevision_desc:
      "OpenCV ବ୍ୟବହାର କରି ଚିତ୍ର ଏବଂ ଭିଡିଓରେ ଚେହେରା ଚିହ୍ନଟ କରନ୍ତୁ।",
    project_stardetection_title: "ଷ୍ଟାର୍-ଡିଟେକ୍ସନ୍",
    project_stardetection_desc:
      "NASA ର ହବଲ୍ ସଂଗ୍ରହରୁ ଚିତ୍ରରେ ଥିବା ତାରା ଚିହ୍ନଟ କରନ୍ତୁ।",
    view_project_link: "ପ୍ରୋଜେକ୍ଟ ଦେଖନ୍ତୁ",
    projects_coming_soon: "ଅଧିକ ପ୍ରୋଜେକ୍ଟ ଶୀଘ୍ର ଆସୁଛି — ଯୋଡି ହୋଇ ରୁହନ୍ତୁ!",
    currently_learning_heading: "ବର୍ତ୍ତମାନ ଶିଖୁଛି",
    learning_java: "ଜାଭା",
    learning_datastructures: "ଡାଟା ଷ୍ଟ୍ରକ୍ଚର",
    learning_deep_learning: "ଡିପ୍ ଲର୍ନିଂ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "ସଂଯୋଗ",
  },
  bn: {
    /* Bengali */ page_title: "পার্থ সিধু - পোর্টফোলিও",
    nav_home: "হোম",
    nav_projects: "প্রকল্প",
    nav_connect: "যোগাযোগ",
    hero_welcome: "স্বাগতম",
    hero_tagline: "ডিজিটাল তাঁতে স্বপ্ন বুনন।",
    profile_name: "পার্থ সিধু",
    profile_tagline: "ইসিই ছাত্র | এআই উৎসাহী | গল্প-চালিত দেব",
    about_me_heading: "আমার সম্পর্কে",
    about_me_para1:
      "শিমলার শান্ত পাহাড় এবং লম্বা দেবদারু গাছের চারপাশে ঘিরে, আমি সরলতা এবং গভীরতা উভয়কেই প্রশংসা করতে শিখেছি। এই ভারসাম্য প্রযুক্তি সম্পর্কে আমার দৃষ্টিভঙ্গিকে রূপ দেয় — চিন্তাভাবনা করে, সৃজনশীলভাবে এবং স্থির মনোযোগ সহকারে।",
    about_me_para2:
      "আমি বিশ্বাস করি যে অর্থপূর্ণ সমাধান প্রযুক্তিগত দক্ষতা, স্পষ্ট চিন্তাভাবনা এবং সামান্য কৌতূহলকে একত্রিত করার মাধ্যমে আসে। আমার লক্ষ্য হল এমন প্রকল্প তৈরি করা যা ব্যবহারিক, উদ্ভাবনী এবং ইতিবাচক পরিবর্তন নিয়ে আসে।",
    education_heading: "শিক্ষা",
    edu_gsv_degree: "ইলেকট্রনিক্স এবং কমিউনিকেশন ইঞ্জিনিয়ারিং (ECE) এ বি. টেক",
    edu_gsv_institute: "গতি শক্তি বিশ্ববিদ্যালয়, ভাদোদরা",
    edu_iitm_degree: "ব্যাচেলর অফ সায়েন্স (ফাউন্ডেশন প্রোগ্রাম)",
    edu_iitm_institute: "ইন্ডিয়ান ইনস্টিটিউট অফ টেকনোলজি (IIT) মাদ্রাজ",
    edu_shc_degree: "ক্লাস 12 (PCM)",
    edu_shc_institute: "স্যাক্রেড হার্ট কনভেন্ট, ফ্লেউর-ডি-লিস, ঢালি, শিমলা",
    hobbies_heading: "শখ",
    hobbies_text:
      "গান করা, কবিতা, পড়া এবং আঁকা — যে উপায়ে আমি প্রযুক্তির বাইরে নিজেকে প্রকাশ করি।",
    skills_heading: "দক্ষতা",
    skill_cpp: "C++",
    skill_python: "পাইথন",
    skill_java_basic: "বেসিক জাভা",
    skill_ubuntu: "উবুন্টু",
    skill_git: "গিট",
    projects_heading: "প্রকল্প",
    project_facevision_title: "ফেস-ভিশন",
    project_facevision_desc:
      "ওপেনসিভি ব্যবহার করে ছবি এবং ভিডিওতে মুখ সনাক্ত করুন।",
    project_stardetection_title: "স্টার-ডিটেকশন",
    project_stardetection_desc:
      "নাসার হাবল সংগ্রহ থেকে ছবিতে তারা সনাক্ত করুন।",
    view_project_link: "প্রকল্প দেখুন",
    projects_coming_soon: "আরও প্রকল্প শীঘ্রই আসছে — সাথে থাকুন!",
    currently_learning_heading: "বর্তমানে শিখছি",
    learning_java: "জাভা",
    learning_datastructures: "ডেটা স্ট্রাকচার্স",
    learning_deep_learning: "ডিপ লার্নিং",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "যোগাযোগ",
  },
  mr: {
    /* Marathi */ page_title: "पार्थ सिधु - पोर्टफोलिओ",
    nav_home: "मुख्यपृष्ठ",
    nav_projects: "प्रकल्प",
    nav_connect: "संपर्क साधा",
    hero_welcome: "स्वागत आहे",
    hero_tagline: "डिजिटल मागावर स्वप्नांची विणकाम.",
    profile_name: "पार्थ सिधु",
    profile_tagline: "ईसीई विद्यार्थी | एआय उत्साही | कथा-प्रेरित देव",
    about_me_heading: "माझ्याबद्दल",
    about_me_para1:
      "शिमल्याच्या शांत टेकड्या आणि उंच देवदार वृक्षांनी वेढलेला, मी साधेपणा आणि सखोलता दोन्हीची प्रशंसा करायला शिकलो आहे. हे संतुलन मी तंत्रज्ञानाकडे कसे पाहतो हे ठरवते — विचारपूर्वक, सर्जनशीलतेने आणि स्थिर लक्ष्याने.",
    about_me_para2:
      "मला विश्वास आहे की अर्थपूर्ण उपाय हे तांत्रिक कौशल्ये, स्पष्ट विचार आणि थोड्या जिज्ञासेच्या संयोगातून येतात. माझे ध्येय असे प्रकल्प तयार करणे आहे जे व्यावहारिक, नाविन्यपूर्ण आणि सकारात्मक बदल घडवतात.",
    education_heading: "शिक्षण",
    edu_gsv_degree:
      "इलेक्ट्रॉनिक्स आणि कम्युनिकेशन इंजिनियरिंग (ECE) मध्ये बी. टेक",
    edu_gsv_institute: "गति शक्ति विश्वविद्यालय, वडोदरा",
    edu_iitm_degree: "बॅचलर ऑफ सायन्स (फाउंडेशन प्रोग्राम)",
    edu_iitm_institute: "इंडियन इन्स्टिट्यूट ऑफ टेक्नॉलॉजी (IIT) मद्रास",
    edu_shc_degree: "इयत्ता 12वी (पीसीएम)",
    edu_shc_institute: "सेक्रेड हार्ट कॉन्व्हेंट, फ्ल्युर-डी-लिस, ढाली, शिमला",
    hobbies_heading: "छंद",
    hobbies_text:
      "गायन, काव्य, वाचन आणि चित्रकला — तंत्रज्ञानापलीकडे स्वतःला व्यक्त करण्याचे माझे मार्ग.",
    skills_heading: "कौशल्ये",
    skill_cpp: "C++",
    skill_python: "पायथन",
    skill_java_basic: "बेसिक जावा",
    skill_ubuntu: "उबंटू",
    skill_git: "गिट",
    projects_heading: "प्रकल्प",
    project_facevision_title: "फेस-व्हिजन",
    project_facevision_desc:
      "ओपनसीव्ही वापरून प्रतिमा आणि व्हिडिओमधील चेहरे शोधा.",
    project_stardetection_title: "स्टार-डिटेक्शन",
    project_stardetection_desc:
      "नासाच्या हबल संग्रहातील प्रतिमांमधून तारे शोधा.",
    view_project_link: "प्रकल्प पहा",
    projects_coming_soon: "अधिक प्रकल्प लवकरच येत आहेत — संपर्कात रहा!",
    currently_learning_heading: "सध्या शिकत आहे",
    learning_java: "जावा",
    learning_datastructures: "डेटा स्ट्रक्चर्स",
    learning_deep_learning: "डीप लर्निंग",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "जोडा",
  },
  ta: {
    /* Tamil */ page_title: "பார்த்த் சித்து - போர்ட்ஃபோலியோ",
    nav_home: "முகப்பு",
    nav_projects: "திட்டங்கள்",
    nav_connect: "தொடர்பு",
    hero_welcome: "வரவேற்பு",
    hero_tagline: "டிஜிட்டல் தறியில் கனவுகளை நெய்தல்.",
    profile_name: "பார்த்த் சித்து",
    profile_tagline:
      "ECE மாணவர் | AI & மென்பொருள் உருவாக்குநர் ஆர்வலர் | சினிமா மனப்பான்மை",
    about_me_heading: "என்னை பற்றி",
    about_me_para1:
      "சிம்லாவின் அமைதியான மலைகள் மற்றும் உயரமான தேவதாரு மரங்களால் சூழப்பட்டு, எளிமையையும் ஆழத்தையும் பாராட்ட நான் கற்றுக்கொண்டேன். இந்த சமநிலை நான் தொழில்நுட்பத்தை அணுகும் விதத்தை வடிவமைக்கிறது — சிந்தனையுடன், படைப்புத்திறனுடன், மற்றும் நிலையான கவனத்துடன்.",
    about_me_para2:
      "அர்த்தமுள்ள தீர்வுகள் தொழில்நுட்ப திறன்கள், தெளிவான சிந்தனை மற்றும் ஒரு துளி ஆர்வத்தை இணைப்பதன் மூலம் வருகின்றன என்று நான் நம்புகிறேன். நடைமுறைக்கு உகந்த, புதுமையான மற்றும் நேர்மறையான மாற்றத்தை உருவாக்கும் திட்டங்களை உருவாக்குவதே எனது குறிக்கோள்.",
    education_heading: "கல்வி",
    edu_gsv_degree:
      "மின்னணுவியல் மற்றும் தொலைத்தொடர்பு பொறியியல் (ECE) இளங்கலை",
    edu_gsv_institute: "கதி சக்தி விஸ்வவித்யாலயா, வதோதரா",
    edu_iitm_degree: "அறிவியல் இளங்கலை (அடித்தள திட்டம்)",
    edu_iitm_institute: "இந்திய தொழில்நுட்ப நிறுவனம் (IIT) மெட்ராஸ்",
    edu_shc_degree: "வகுப்பு 12 (PCM)",
    edu_shc_institute:
      "சேக்ரட் ஹார்ட் கான்வென்ட், ஃப்ளேயர்-டி-லிஸ், தாலி, சிம்லா",
    hobbies_heading: "பொழுதுபோக்குகள்",
    hobbies_text:
      "பாடல், கவிதை, வாசிப்பு மற்றும் வரைதல் — தொழில்நுட்பத்திற்கு அப்பால் என்னை வெளிப்படுத்தும் வழிகள்.",
    skills_heading: "திறன்கள்",
    skill_cpp: "C++",
    skill_python: "பைதான்",
    skill_java_basic: "அடிப்படை ஜாவா",
    skill_ubuntu: "உபுண்டு",
    skill_git: "கிட்",
    projects_heading: "திட்டங்கள்",
    project_facevision_title: "முக-பார்வை",
    project_facevision_desc:
      "OpenCV ஐப் பயன்படுத்தி படங்கள் மற்றும் வீடியோக்களில் முகங்களைக் கண்டறியவும்.",
    project_stardetection_title: "நட்சத்திர-கண்டறிதல்",
    project_stardetection_desc:
      "நாசாவின் ஹப்பிள் சேகரிப்பிலிருந்து படங்களில் நட்சத்திரங்களைக் கண்டறியவும்.",
    view_project_link: "திட்டத்தைப் பார்க்கவும்",
    projects_coming_soon:
      "மேலும் திட்டங்கள் விரைவில் வரவுள்ளன — காத்திருங்கள்!",
    currently_learning_heading: "தற்போது கற்றுக்கொள்கிறேன்",
    learning_java: "ஜாவா",
    learning_datastructures: "தரவு கட்டமைப்புகள்",
    learning_deep_learning: "ஆழமான கற்றல்",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "இணைப்பு",
  },
  te: {
    /* Telugu */ page_title: "పార్థ్ సిద్దు - పోర్ట్‌ఫోలియో",
    nav_home: "హోమ్",
    nav_projects: "ప్రాజెక్టులు",
    nav_connect: "కనెక్ట్ చేయండి",
    hero_welcome: "స్వాగతం",
    hero_tagline: "డిజిటల్ మగ్గంలో కలలు నేయడం.",
    profile_name: "పార్థ్ సిద్దు",
    profile_tagline: "ECE విద్యార్థి | AI ఔత్సాహికుడు | స్టోరీ-డ్రివెన్ దేవ",
    about_me_heading: "నా గురించి",
    about_me_para1:
      "సిమ్లాలోని ప్రశాంతమైన కొండలు మరియు ఎత్తైన దేవదారు వృక్షాల మధ్య నేను నివసిస్తున్నాను, సరళత మరియు లోతు రెండింటినీ అభినందించడం నేర్చుకున్నాను. ఈ సమతుల్యత నేను సాంకేతికతను ఎలా చేరుకుంటానో - ఆలోచనాత్మకంగా, సృజనాత్మకంగా మరియు స్థిరమైన దృష్టితో - రూపొందిస్తుంది.",
    about_me_para2:
      "అర్ధవంతమైన పరిష్కారాలు సాంకేతిక నైపుణ్యాలను స్పష్టమైన ఆలోచన మరియు కొద్దిగా ఉత్సుకతతో కలపడం ద్వారా వస్తాయని నేను నమ్ముతున్నాను. నా లక్ష్యం ఆచరణాత్మకమైన, వినూత్నమైన మరియు సానుకూల వ్యత్యాసాన్ని సృష్టించే ప్రాజెక్టులను నిర్మించడం.",
    education_heading: "విద్య",
    edu_gsv_degree:
      "ఎలక్ట్రానిక్స్ మరియు కమ్యూనికేషన్ ఇంజనీరింగ్ (ECE) లో బి.టెక్",
    edu_gsv_institute: "గతి శక్తి విశ్వవిద్యాలయం, వడోదర",
    edu_iitm_degree: "బ్యాచిలర్ ఆఫ్ సైన్స్ (ఫౌండేషన్ ప్రోగ్రామ్)",
    edu_iitm_institute: "ఇండియన్ ఇన్‌స్టిట్యూట్ ఆఫ్ టెక్నాలజీ (IIT) మద్రాస్",
    edu_shc_degree: "క్లాస్ 12 (PCM)",
    edu_shc_institute:
      "సేక్రెడ్ హార్ట్ కాన్వెంట్, ఫ్లూర్-డి-లైస్, ధాలి, సిమ్లా",
    hobbies_heading: "అలవాట్లు",
    hobbies_text:
      "గానం, కవిత్వం, పఠనం మరియు చిత్రలేఖనం — సాంకేతికతకు మించి నన్ను నేను వ్యక్తపరిచే మార్గాలు.",
    skills_heading: "నైపుణ్యాలు",
    skill_cpp: "C++",
    skill_python: "పైథాన్",
    skill_java_basic: "బేసిక్ జావా",
    skill_ubuntu: "ఉబుంటు",
    skill_git: "గిట్",
    projects_heading: "ప్రాజెక్టులు",
    project_facevision_title: "ఫేస్-విజన్",
    project_facevision_desc:
      "OpenCVని ఉపయోగించి చిత్రాలు మరియు వీడియోలలో ముఖాలను గుర్తించండి.",
    project_stardetection_title: "స్టార్-డిటెక్షన్",
    project_stardetection_desc:
      "NASA యొక్క హబుల్ సేకరణ నుండి చిత్రాలలో నక్షత్రాలను గుర్తించండి.",
    view_project_link: "ప్రాజెక్ట్ చూడండి",
    projects_coming_soon:
      "మరిన్ని ప్రాజెక్టులు త్వరలో వస్తున్నాయి — వేచి ఉండండి!",
    currently_learning_heading: "ప్రస్తుతం నేర్చుకుంటున్నాను",
    learning_java: "జావా",
    learning_datastructures: "డేటా స్ట్రక్చర్స్",
    learning_deep_learning: "డీప్ లెర్నింగ్",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "కనెక్ట్ చేయండి",
  },
  ml: {
    /* Malayalam */ page_title: "പാർത്ഥ് സിദ്ദു - പോർട്ട്ഫോളിയോ",
    nav_home: "ഹോം",
    nav_projects: "പ്രോജക്റ്റുകൾ",
    nav_connect: "ബന്ധപ്പെടുക",
    hero_welcome: "സ്വാഗതം",
    hero_tagline: "ഡിജിറ്റൽ തറിയിൽ സ്വപ്നങ്ങൾ നെയ്യുന്നു.",
    profile_name: "പാർത്ഥ് സിദ്ദു",
    profile_tagline:
      "ECE വിദ്യാർത്ഥി | AI താൽപ്പര്യക്കാരൻ | കഥാധിഷ്ഠിത ഡെവലപ്പർ",
    about_me_heading: "എന്നെക്കുറിച്ച്",
    about_me_para1:
      "ഷിംലയിലെ ശാന്തമായ കുന്നുകളും ഉയരംകൂടിയ ദേവദാരു വൃക്ഷങ്ങളും ചുറ്റിപ്പറ്റി, ലാളിത്യത്തെയും ആഴത്തെയും വിലമതിക്കാൻ ഞാൻ പഠിച്ചു. ഈ സന്തുലിതാവസ്ഥ സാങ്കേതികവിദ്യയോടുള്ള എന്റെ സമീപനത്തെ രൂപപ്പെടുത്തുന്നു — ശ്രദ്ധാപൂർവ്വം, ക്രിയാത്മകമായി, സ്ഥിരമായ ശ്രദ്ധയോടെ.",
    about_me_para2:
      "സാങ്കേതിക വൈദഗ്ധ്യവും വ്യക്തമായ ചിന്തയും അല്പം ജിജ്ഞാസയും സംയോജിപ്പിക്കുന്നതിലൂടെ അർത്ഥവത്തായ പരിഹാരങ്ങൾ ഉണ്ടാകുമെന്ന് ഞാൻ വിശ്വസിക്കുന്നു. പ്രായോഗികവും നൂതനവും ക്രിയാത്മകമായ മാറ്റം വരുത്തുന്നതുമായ പ്രോജക്റ്റുകൾ നിർമ്മിക്കുക എന്നതാണ് എന്റെ ലക്ഷ്യം.",
    education_heading: "വിദ്യാഭ്യാസം",
    edu_gsv_degree:
      "ഇലക്ട്രോണിക്സ് ആൻഡ് കമ്മ്യൂണിക്കേഷൻ എഞ്ചിനീയറിംഗിൽ (ECE) ബി.ടെക്",
    edu_gsv_institute: "ഗതി ശക്തി വിശ്വവിദ്യാലയം, വഡോദര",
    edu_iitm_degree: "ബാച്ചിലർ ഓഫ് സയൻസ് (ഫൗണ്ടേഷൻ പ്രോഗ്രാം)",
    edu_iitm_institute:
      "ഇന്ത്യൻ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ടെക്നോളജി (IIT) മദ്രാസ്",
    edu_shc_degree: "ക്ലാസ് 12 (PCM)",
    edu_shc_institute: "സേക്രഡ് ഹാർട്ട് കോൺവെന്റ്, ഫ്ലൂർ-ഡി-ലിസ്, ധാളി, ഷിംല",
    hobbies_heading: "ഹോബികൾ",
    hobbies_text:
      "പാട്ട്, കവിത, വായന, ഡ്രോയിംഗ് — സാങ്കേതികവിദ്യക്കപ്പുറം എന്നെത്തന്നെ പ്രകടിപ്പിക്കാനുള്ള വഴികൾ.",
    skills_heading: "പാടവം",
    skill_cpp: "C++",
    skill_python: "പൈത്തൺ",
    skill_java_basic: "ബേസിക് ജാവ",
    skill_ubuntu: "ഉബുണ്ടു",
    skill_git: "ഗിറ്റ്",
    projects_heading: "പ്രോജക്റ്റുകൾ",
    project_facevision_title: "ഫേസ്-വിഷൻ",
    project_facevision_desc:
      "OpenCV ഉപയോഗിച്ച് ചിത്രങ്ങളിലും വീഡിയോകളിലും മുഖങ്ങൾ കണ്ടെത്തുക.",
    project_stardetection_title: "സ്റ്റാർ-ഡിറ്റക്ഷൻ",
    project_stardetection_desc:
      "നാസയുടെ ഹബിൾ ശേഖരത്തിൽ നിന്ന് ചിത്രങ്ങളിലെ നക്ഷത്രങ്ങൾ കണ്ടെത്തുക.",
    view_project_link: "പ്രോജക്റ്റ് കാണുക",
    projects_coming_soon: "കൂടുതൽ പ്രോജക്റ്റുകൾ ഉടൻ വരുന്നു — കാത്തിരിക്കുക!",
    currently_learning_heading: "നിലവിൽ പഠിക്കുന്നു",
    learning_java: "ജാവ",
    learning_datastructures: "ഡാറ്റാ സ്ട്രക്ചറുകൾ",
    learning_deep_learning: "ഡീപ് ലേണിംഗ്",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "ബന്ധപ്പെടുക",
  },
  kn: {
    /* Kannada */ page_title: "ಪಾರ್ಥ್ ಸಿಧು - ಪೋರ್ಟ್ಫೋಲಿಯೊ",
    nav_home: "ಮುಖಪುಟ",
    nav_projects: "ಯೋಜನೆಗಳು",
    nav_connect: "ಸಂಪರ್ಕಿಸಿ",
    hero_welcome: "ಸುಸ್ವಾಗತ",
    hero_tagline: "ಡಿಜಿಟಲ್ ಮಗ್ಗದಲ್ಲಿ ಕನಸುಗಳನ್ನು ನೇಯುವುದು.",
    profile_name: "ಪಾರ್ಥ್ ಸಿಧು",
    profile_tagline: "ECE ವಿದ್ಯಾರ್ಥಿ | AI ಉತ್ಸಾಹಿ | ಕಥೆ-ಚಾಲಿತ ಡೆವಲಪರ್",
    about_me_heading: "ನನ್ನ ಬಗ್ಗೆ",
    about_me_para1:
      "ಶಿಮ್ಲಾದ ಪ್ರಶಾಂತ ಬೆಟ್ಟಗಳು ಮತ್ತು ಎತ್ತರದ ದೇವದಾರು ಮರಗಳಿಂದ ಆವೃತವಾಗಿ, ನಾನು ಸರಳತೆ ಮತ್ತು ಆಳ ಎರಡನ್ನೂ ಪ್ರಶಂಸಿಸಲು ಕಲಿತಿದ್ದೇನೆ. ಈ ಸಮತೋಲನವು ನಾನು ತಂತ್ರಜ್ಞಾನವನ್ನು ಹೇಗೆ ಸಮೀಪಿಸುತ್ತೇನೆ ಎಂಬುದನ್ನು ರೂಪಿಸುತ್ತದೆ - ಚಿಂತನಶೀಲವಾಗಿ, ಸೃಜನಾತ್ಮಕವಾಗಿ ಮತ್ತು ಸ್ಥಿರ ಗಮನದಿಂದ.",
    about_me_para2:
      "ಅರ್ಥಪೂರ್ಣ ಪರಿಹಾರಗಳು ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ಸ್ಪಷ್ಟ ಚಿಂತನೆ ಮತ್ತು ಸ್ವಲ್ಪ ಕುತೂಹಲದೊಂದಿಗೆ ಸಂಯೋಜಿಸುವುದರಿಂದ ಬರುತ್ತವೆ ಎಂದು ನಾನು ನಂಬುತ್ತೇನೆ. ನನ್ನ ಗುರಿ ಪ್ರಾಯೋಗಿಕ, ನವೀನ ಮತ್ತು ಸಕಾರಾತ್ಮಕ ವ್ಯತ್ಯಾಸವನ್ನು ಮಾಡುವ ಯೋಜನೆಗಳನ್ನು ನಿರ್ಮಿಸುವುದು.",
    education_heading: "ಶಿಕ್ಷಣ",
    edu_gsv_degree:
      "ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಸಂವಹನ ಎಂಜಿನಿಯರಿಂಗ್ (ECE) ನಲ್ಲಿ ಬಿ.ಟೆಕ್",
    edu_gsv_institute: "ಗತಿ ಶಕ್ತಿ ವಿಶ್ವವಿದ್ಯಾಲಯ, ವಡೋದರಾ",
    edu_iitm_degree: "ಬ್ಯಾಚುಲರ್ ಆಫ್ ಸೈನ್ಸ್ (ಫೌಂಡೇಶನ್ ಪ್ರೋಗ್ರಾಂ)",
    edu_iitm_institute: "ಇಂಡಿಯನ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿ (IIT) ಮದ್ರಾಸ್",
    edu_shc_degree: "ವರ್ಗ 12 (PCM)",
    edu_shc_institute:
      "ಸ್ಯಾಕ್ರೆಡ್ ಹಾರ್ಟ್ ಕಾನ್ವೆಂಟ್, ಫ್ಲೂರ್-ಡಿ-ಲೈಸ್, ಢಾಲಿ, ಶಿಮ್ಲಾ",
    hobbies_heading: "ಹವ್ಯಾಸಗಳು",
    hobbies_text:
      "ಹಾಡುಗಾರಿಕೆ, ಕಾವ್ಯ, ಓದುವುದು ಮತ್ತು ಚಿತ್ರಕಲೆ — ತಂತ್ರಜ್ಞಾನದ ಹೊರತಾಗಿ ನನ್ನನ್ನು ವ್ಯಕ್ತಪಡಿಸುವ ಮಾರ್ಗಗಳು.",
    skills_heading: "ಕೌಶಲ್ಯಗಳು",
    skill_cpp: "C++",
    skill_python: "ಪೈಥಾನ್",
    skill_java_basic: "ಮೂಲ ಜಾವಾ",
    skill_ubuntu: "ಉಬುಂಟು",
    skill_git: "ಗಿಟ್",
    projects_heading: "ಯೋಜನೆಗಳು",
    project_facevision_title: "ಫೇಸ್-ವಿಷನ್",
    project_facevision_desc:
      "OpenCV ಬಳಸಿ ಚಿತ್ರಗಳು ಮತ್ತು ವೀಡಿಯೊಗಳಲ್ಲಿ ಮುಖಗಳನ್ನು ಗುರುತಿಸಿ.",
    project_stardetection_title: "ಸ್ಟಾರ್-ಡಿಟೆಕ್ಷನ್",
    project_stardetection_desc:
      "NASA ದ ಹಬಲ್ ಸಂಗ್ರಹದಿಂದ ಚಿತ್ರಗಳಲ್ಲಿ ನಕ್ಷತ್ರಗಳನ್ನು ಗುರುತಿಸಿ.",
    view_project_link: "ಯೋಜನೆ ವೀಕ್ಷಿಸಿ",
    projects_coming_soon: "ಹೆಚ್ಚಿನ ಯೋಜನೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ — ನಿರೀಕ್ಷಿಸಿ!",
    currently_learning_heading: "ಪ್ರಸ್ತುತ ಕಲಿಯುತ್ತಿದ್ದೇನೆ",
    learning_java: "ಜಾವಾ",
    learning_datastructures: "ಡೇಟಾ ರಚನೆಗಳು",
    learning_deep_learning: "ಡೀಪ್ ಲರ್ನಿಂಗ್",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "ಸಂಪರ್ಕಿಸಿ",
  },
  sd: {
    /* Sindhi */ page_title: "پارتھ سدھو - پورٽفوليو",
    nav_home: "گھر",
    nav_projects: "پروجيڪٽس",
    nav_connect: "رابطو ڪريو",
    hero_welcome: "ڀلي ڪري آيا",
    hero_tagline: "ڊجيٽل لوم ۾ خوابن جي بنائي.",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "اي سي اي جو شاگرد | اي آءِ جو شوقين | ڪهاڻي تي مبني ڊولپر",
    about_me_heading: "منهنجي باري ۾",
    about_me_para1:
      "شملي جي پرامن جبلن ۽ وڏن ديودار جي وڻن سان گهيريل، مون سادگي ۽ گهراڻي ٻنهي جي تعريف ڪرڻ سکي آهي. هي توازن ٽيڪنالاجي ڏانهن منهنجي رويي کي شڪل ڏئي ٿو — سوچي سمجهي، تخليقي ۽ مستحڪم توجہ سان.",
    about_me_para2:
      "منهنجو خيال آهي ته بامعني حل ٽيڪنيڪل صلاحيتن کي واضح سوچ ۽ ٿوري تجسس سان ملائڻ سان اچن ٿا. منهنجو مقصد اهڙا منصوبا ٺاهڻ آهي جيڪي عملي، جديد ۽ مثبت فرق پيدا ڪن.",
    education_heading: "تعليم",
    edu_gsv_degree: "بي. ٽيڪ (اليڪٽرانڪس ۽ ڪميونيڪيشن انجنيئرنگ)",
    edu_gsv_institute: "گتي شکتی وشو ودياليہ، وڊودرا",
    edu_iitm_degree: "بيچلر آف سائنس (فاؤنڊيشن پروگرام)",
    edu_iitm_institute: "انڊين انسٽيٽيوٽ آف ٽيڪنالاجي (آءِ آءِ ٽي) مدراس",
    edu_shc_degree: "ڪلاس 12 (پي سي ايم)",
    edu_shc_institute: "سيڪرڊ هارٽ ڪانونٽ، فلور-ڊي-ليس، ڍالي، شملو",
    hobbies_heading: "شوق",
    hobbies_text:
      "ڳائڻ، شاعري، پڙهڻ ۽ ڊرائنگ — اهي طريقا جن سان مان ٽيڪنالاجي کان سواءِ پاڻ کي ظاهر ڪريان ٿو.",
    skills_heading: "مهارتون",
    skill_cpp: "سي++",
    skill_python: "پائيٿن",
    skill_java_basic: "بنيادي جاوا",
    skill_ubuntu: "اوبنٽو",
    skill_git: "گٽ",
    projects_heading: "پروجيڪٽس",
    project_facevision_title: "فيس-وژن",
    project_facevision_desc:
      "اوپن سي وي استعمال ڪندي تصويرن ۽ وڊيوز ۾ منهن سڃاڻي وٺو.",
    project_stardetection_title: "اسٽار-ڊيٽيڪشن",
    project_stardetection_desc:
      "ناسا جي هبل ڪليڪشن مان تصويرن ۾ ستارا سڃاڻي وٺو.",
    view_project_link: "پروجيڪٽ ڏسو",
    projects_coming_soon: "وڌيڪ پروجيڪٽ جلد اچي رهيا آهن — گڏ رهو!",
    currently_learning_heading: "في الحال سکي رهيو آهيان",
    learning_java: "جاوا",
    learning_datastructures: "ڊيٽا اسٽرڪچرز",
    learning_deep_learning: "ڊيپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "رابطو",
  },
  "zh-Hans": {
    /* Simplified Chinese */ page_title: "帕斯·西杜 - 个人作品集",
    nav_home: "主页",
    nav_projects: "项目",
    nav_connect: "联系",
    hero_welcome: "欢迎",
    hero_tagline: "在数字织机中编织梦想。",
    profile_name: "帕斯·西杜",
    profile_tagline: "ECE学生 | AI & 软件开发爱好者 | 电影思维",
    about_me_heading: "关于我",
    about_me_para1:
      "我住在西姆拉宁静的山丘和高大的雪松林中，学会了欣赏简洁和深度。这种平衡塑造了我对待技术的方式——深思熟虑、富有创造性且专注。",
    about_me_para2:
      "我相信有意义的解决方案来自于技术技能与清晰思维和一点好奇心的结合。我的目标是构建实用、创新并能带来积极影响的项目。",
    education_heading: "教育",
    edu_gsv_degree: "电子与通信工程（ECE）学士",
    edu_gsv_institute: "加蒂·沙克蒂·维什瓦维迪亚拉亚，瓦多达拉",
    edu_iitm_degree: "理学士（基础课程）",
    edu_iitm_institute: "印度理工学院马德拉斯分校",
    edu_shc_degree: "12年级 (PCM)",
    edu_shc_institute: "圣心女修道院，弗勒尔-德-利斯，达利，西姆拉",
    hobbies_heading: "爱好",
    hobbies_text: "唱歌、诗歌、阅读和绘画——我超越技术表达自我的方式。",
    skills_heading: "技能",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "基本Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "项目",
    project_facevision_title: "人脸识别",
    project_facevision_desc: "使用OpenCV检测图像和视频中的人脸。",
    project_stardetection_title: "星星检测",
    project_stardetection_desc: "从NASA哈勃系列图像中检测星星。",
    view_project_link: "查看项目",
    projects_coming_soon: "更多项目即将推出 — 敬请期待！",
    currently_learning_heading: "目前正在学习",
    learning_java: "Java",
    learning_datastructures: "数据结构",
    learning_deep_learning: "深度学习",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "联系",
  },
  "zh-Hant": {
    /* Traditional Chinese */ page_title: "帕斯·西杜 - 作品集",
    nav_home: "首頁",
    nav_projects: "項目",
    nav_connect: "聯繫",
    hero_welcome: "歡迎",
    hero_tagline: "在數位織機中編織夢想。",
    profile_name: "帕斯·西杜",
    profile_tagline: "ECE學生 | AI & 軟體開發愛好者 | 電影思維",
    about_me_heading: "關於我",
    about_me_para1:
      "我住在西姆拉寧靜的山丘和高大的雪松林中，學會了欣賞簡潔和深度。這種平衡塑造了我對待技術的方式——深思熟慮、富有創造性且專注。",
    about_me_para2:
      "我相信有意義的解決方案來自於技術技能與清晰思維和一點好奇心的結合。我的目標是構建實用、創新並能帶來積極影響的項目。",
    education_heading: "教育",
    edu_gsv_degree: "電子與通信工程（ECE）學士",
    edu_gsv_institute: "加蒂·沙克蒂·維什瓦維迪亞拉亞，瓦多達拉",
    edu_iitm_degree: "理學士（基礎課程）",
    edu_iitm_institute: "印度理工學院馬德拉斯分校",
    edu_shc_degree: "12年級 (PCM)",
    edu_shc_institute: "聖心女修道院，弗勒爾-德-利斯，達利，西姆拉",
    hobbies_heading: "愛好",
    hobbies_text: "唱歌、詩歌、閱讀和繪畫——我超越技術表達自我的方式。",
    skills_heading: "技能",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "基本Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "項目",
    project_facevision_title: "人臉識別",
    project_facevision_desc: "使用OpenCV檢測圖像和視頻中的人臉。",
    project_stardetection_title: "星星檢測",
    project_stardetection_desc: "從NASA哈勃系列圖像中檢測星星。",
    view_project_link: "查看項目",
    projects_coming_soon: "更多項目即將推出 — 敬請期待！",
    currently_learning_heading: "目前正在學習",
    learning_java: "Java",
    learning_datastructures: "數據結構",
    learning_deep_learning: "深度學習",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "聯繫",
  },
  ko: {
    /* Korean */ page_title: "파스 시두 - 포트폴리오",
    nav_home: "홈",
    nav_projects: "프로젝트",
    nav_connect: "연락처",
    hero_welcome: "환영합니다",
    hero_tagline: "디지털 베틀에서 꿈을 엮다.",
    profile_name: "파스 시두",
    profile_tagline:
      "ECE 학생 | AI & 소프트웨어 개발 애호가 | 시네마틱 사고방식",
    about_me_heading: "소개",
    about_me_para1:
      "심라의 고요한 언덕과 우뚝 솟은 데오다르 나무에 둘러싸여, 저는 단순함과 깊이 모두를 소중히 여기는 법을 배웠습니다. 이러한 균형은 제가 기술에 접근하는 방식—사려 깊고, 창의적이며, 꾸준한 집중력으로—을 형성합니다.",
    about_me_para2:
      "저는 의미 있는 솔루션이 기술적 능력과 명확한 사고, 그리고 약간의 호기심을 결합함으로써 나온다고 믿습니다. 저의 목표는 실용적이고 혁신적이며 긍정적인 변화를 가져오는 프로젝트를 구축하는 것입니다.",
    education_heading: "교육",
    edu_gsv_degree: "전자통신공학(ECE) 학사",
    edu_gsv_institute: "가티 샤크티 비슈와비디야라야, 바도다라",
    edu_iitm_degree: "이학사 (기초 프로그램)",
    edu_iitm_institute: "인도 공과대학교 (IIT) 마드라스",
    edu_shc_degree: "고등학교 12학년 (PCM)",
    edu_shc_institute: "성심 수녀원, 플뢰르 드 리스, 달히, 심라",
    hobbies_heading: "취미",
    hobbies_text:
      "노래, 시, 독서 및 그림 그리기 — 기술을 넘어 자신을 표현하는 방법입니다.",
    skills_heading: "기술",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "기본 Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "프로젝트",
    project_facevision_title: "페이스 비전",
    project_facevision_desc:
      "OpenCV를 사용하여 이미지 및 비디오에서 얼굴을 감지합니다.",
    project_stardetection_title: "스타 탐지",
    project_stardetection_desc:
      "NASA의 허블 컬렉션 이미지에서 별을 감지합니다.",
    view_project_link: "프로젝트 보기",
    projects_coming_soon: "더 많은 프로젝트가 곧 출시됩니다 — 기대해주세요!",
    currently_learning_heading: "현재 학습 중",
    learning_java: "Java",
    learning_datastructures: "데이터 구조",
    learning_deep_learning: "심층 학습",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "연결",
  },
  ja: {
    page_title: "パース・シドゥー - ポートフォリオ",
    nav_home: "ホーム",
    nav_projects: "プロジェクト",
    nav_connect: "連絡先",
    hero_welcome: "ようこそ",
    hero_tagline: "デジタル織機で夢を織る。",
    profile_name: "パース・シドゥー",
    profile_tagline:
      "ECE学生 | AI＆ソフトウェア開発愛好家 | 映画のような考え方",
    about_me_heading: "私について",
    about_me_para1:
      "シムラの穏やかな丘と高いデオダール杉に囲まれて、私はシンプルさと奥深さの両方を高く評価することを学びました。このバランスが、私がテクノロジーにどのようにアプローチするかを形作っています—思慮深く、創造的に、そして着実な集中力で。",
    about_me_para2:
      "私は、技術スキルと明確な思考、そして少しの好奇心を組み合わせることで、意味のあるソリューションが生まれると信じています。私の目標は、実用的で革新的で、良い変化をもたらすプロジェクトを構築することです。",
    education_heading: "学歴",
    edu_gsv_degree: "電子通信工学（ECE）学士号",
    edu_gsv_institute:
      "ガティ・シャクティ・ヴィシュワヴィディヤラヤ、ヴァドーダラ",
    edu_iitm_degree: "理学士（基礎プログラム）",
    edu_iitm_institute: "インド工科大学（IIT）マドラス",
    edu_shc_degree: "高校12年生（PCM）",
    edu_shc_institute:
      "セイクレッド・ハート・コンベント、フルール・ド・リス、シムラ、ダリ",
    hobbies_heading: "趣味",
    hobbies_text:
      "歌、詩、読書、絵画 — テクノロジーを超えて自分を表現する方法です。",
    skills_heading: "スキル",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "基本的なJava",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "プロジェクト",
    project_facevision_title: "フェイス・ビジョン",
    project_facevision_desc: "OpenCVを使用して画像や動画内の顔を検出します。",
    project_stardetection_title: "スター・ディテクション",
    project_stardetection_desc:
      "NASAのハッブルコレクションの画像から星を検出します。",
    view_project_link: "プロジェクトを見る",
    projects_coming_soon: "他のプロジェクトも近日公開予定です — お楽しみに！",
    currently_learning_heading: "現在学習中",
    learning_java: "Java",
    learning_datastructures: "データ構造",
    learning_deep_learning: "深層学習",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "接続",
  },
  ar: {
    /* Arabic */ page_title: "بارث سيدو - ملف شخصي",
    nav_home: "الرئيسية",
    nav_projects: "المشاريع",
    nav_connect: "تواصل",
    hero_welcome: "مرحبا بك",
    hero_tagline: "نسج الأحلام في نول رقمي.",
    profile_name: "بارث سيدو",
    profile_tagline:
      "طالب ECE | متحمس للذكاء الاصطناعي وتطوير البرمجيات | عقلية سينمائية",
    about_me_heading: "عني",
    about_me_para1:
      "محاطًا بالتلال الهادئة وأشجار الأرز الطويلة في شيملا، تعلمت تقدير البساطة والعمق على حد سواء. هذا التوازن يشكل طريقتي في التعامل مع التكنولوجيا - بتفكير، وإبداع، وتركيز ثابت.",
    about_me_para2:
      "أعتقد أن الحلول الهادفة تأتي من الجمع بين المهارات التقنية والتفكير الواضح ولمسة من الفضول. هدفي هو بناء مشاريع عملية ومبتكرة وتحدث فرقًا إيجابيًا.",
    education_heading: "التعليم",
    edu_gsv_degree: "بكالوريوس في هندسة الإلكترونيات والاتصالات (ECE)",
    edu_gsv_institute: "جامعة غاتي شاكتي، فادودارا",
    edu_iitm_degree: "بكالوريوس العلوم (برنامج تأسيسي)",
    edu_iitm_institute: "المعهد الهندي للتكنولوجيا (IIT) مدراس",
    edu_shc_degree: "الصف 12 (فيزياء وكيمياء ورياضيات)",
    edu_shc_institute: "دير القلب المقدس، فلور دي ليس، دهالي، شيملا",
    hobbies_heading: "الهوايات",
    hobbies_text:
      "الغناء، الشعر، القراءة والرسم — طرق أعبّر بها عن نفسي أبعد من التكنولوجيا.",
    skills_heading: "المهارات",
    skill_cpp: "C++",
    skill_python: "بايثون",
    skill_java_basic: "جافا أساسية",
    skill_ubuntu: "أوبونتو",
    skill_git: "جيت",
    projects_heading: "المشاريع",
    project_facevision_title: "رؤية الوجه",
    project_facevision_desc:
      "اكتشاف الوجوه في الصور ومقاطع الفيديو باستخدام OpenCV.",
    project_stardetection_title: "اكتشاف النجوم",
    project_stardetection_desc:
      "اكتشاف النجوم في الصور من مجموعة هابل التابعة لوكالة ناسا.",
    view_project_link: "عرض المشروع",
    projects_coming_soon: "المزيد من المشاريع قريبا — ترقبوا!",
    currently_learning_heading: "أتعلم حاليا",
    learning_java: "جافا",
    learning_datastructures: "هياكل البيانات",
    learning_deep_learning: "التعلم العميق",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "تواصل",
  },
  fa: {
    /* Persian */ page_title: "پارت سیدو - نمونه کار",
    nav_home: "خانه",
    nav_projects: "پروژه ها",
    nav_connect: "تماس",
    hero_welcome: "خوش آمدید",
    hero_tagline: "بافتن رویاها در تار و پود دیجیتال.",
    profile_name: "پارت سیدو",
    profile_tagline:
      "دانشجوی ECE | علاقه‌مند به هوش مصنوعی و توسعه نرم‌افزار | ذهنیت سینمایی",
    about_me_heading: "درباره من",
    about_me_para1:
      "در میان تپه‌های آرام و درختان بلند دیودار شیملا، یاد گرفته‌ام که هم سادگی و هم عمق را ارج نهم. این تعادل نحوه برخورد من با فناوری را شکل می‌دهد – متفکرانه، خلاقانه و با تمرکز ثابت.",
    about_me_para2:
      "من معتقدم که راه‌حل‌های معنادار از ترکیب مهارت‌های فنی با تفکر روشن و کمی کنجکاوی حاصل می‌شوند. هدف من ساخت پروژه‌هایی است که کاربردی، نوآورانه و تأثیرگذار باشند.",
    education_heading: "تحصیلات",
    edu_gsv_degree: "کارشناسی مهندسی الکترونیک و ارتباطات (ECE)",
    edu_gsv_institute: "دانشگاه گاتی شاکتی، وادودارا",
    edu_iitm_degree: "کارشناسی علوم (برنامه بنیادین)",
    edu_iitm_institute: "موسسه فناوری هند (IIT) مدرس",
    edu_shc_degree: "کلاس 12 (فیزیک، شیمی، ریاضی)",
    edu_shc_institute: "صومعه قلب مقدس، فلور-د-لیس، دهالی، شیملا",
    hobbies_heading: "سرگرمی‌ها",
    hobbies_text:
      "آواز، شعر، مطالعه و نقاشی — راه‌هایی که فراتر از فناوری خود را بیان می‌کنم.",
    skills_heading: "مهارت‌ها",
    skill_cpp: "سی‌پلاس‌پلاس",
    skill_python: "پایتون",
    skill_java_basic: "جاوا پایه",
    skill_ubuntu: "اوبونتو",
    skill_git: "گیت",
    projects_heading: "پروژه‌ها",
    project_facevision_title: "فیس-ویژن",
    project_facevision_desc:
      "تشخیص چهره در تصاویر و ویدئوها با استفاده از OpenCV.",
    project_stardetection_title: "تشخیص ستاره",
    project_stardetection_desc: "تشخیص ستاره‌ها در تصاویر از مجموعه هابل ناسا.",
    view_project_link: "مشاهده پروژه",
    projects_coming_soon: "پروژه‌های بیشتر به زودی — با ما همراه باشید!",
    currently_learning_heading: "در حال یادگیری",
    learning_java: "جاوا",
    learning_datastructures: "ساختمان داده‌ها",
    learning_deep_learning: "یادگیری عمیق",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "تماس",
  },
  fr: {
    /* French */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Accueil",
    nav_projects: "Projets",
    nav_connect: "Connecter",
    hero_welcome: "BIENVENUE",
    hero_tagline: "Tisser des rêves dans le métier à tisser numérique.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Étudiant ECE | Passionné d'IA et de développement logiciel | Mentalité cinématique",
    about_me_heading: "À propos de moi",
    about_me_para1:
      "Entouré des collines sereines et des grands cèdres de Shimla, j'ai appris à apprécier la simplicité et la profondeur. Cet équilibre façonne ma façon d'aborder la technologie — avec réflexion, créativité et une concentration constante.",
    about_me_para2:
      "Je crois que les solutions significatives proviennent de la combinaison des compétences techniques avec une pensée claire et une touche de curiosité. Mon objectif est de construire des projets qui sont pratiques, innovants et qui font une différence positive.",
    education_heading: "Éducation",
    edu_gsv_degree: "B. Tech en ingénierie électronique et communication (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Baccalauréat en sciences (programme de base)",
    edu_iitm_institute: "Institut indien de technologie (IIT) Madras",
    edu_shc_degree: "Classe 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Loisirs",
    hobbies_text:
      "Chant, poésie, lecture et dessin — des façons de m'exprimer au-delà de la technologie.",
    skills_heading: "Compétences",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Java de base",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projets",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Détecter les visages dans les images et les vidéos à l'aide d'OpenCV.",
    project_stardetection_title: "Détection d'étoiles",
    project_stardetection_desc:
      "Détecter les étoiles dans les images de la collection Hubble de la NASA.",
    view_project_link: "Voir le projet",
    projects_coming_soon: "Plus de projets à venir — restez à l'écoute !",
    currently_learning_heading: "Apprentissage en cours",
    learning_java: "Java",
    learning_datastructures: "Structures de données",
    learning_deep_learning: "Apprentissage profond",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Connecter",
  },
  de: {
    /* German */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Startseite",
    nav_projects: "Projekte",
    nav_connect: "Verbinden",
    hero_welcome: "WILLKOMMEN",
    hero_tagline: "Träume im digitalen Webstuhl weben.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE-Student | KI- & Softwareentwicklungs-Enthusiast | Cinematic Mindset",
    about_me_heading: "Über mich",
    about_me_para1:
      "Umgeben von den heiteren Hügeln und hohen Deodar-Bäumen Shimlas habe ich gelernt, sowohl Einfachheit als auch Tiefe zu schätzen. Diese Balance prägt meinen Umgang mit Technologie — nachdenklich, kreativ und mit stetigem Fokus.",
    about_me_para2:
      "Ich glaube, dass bedeutungsvolle Lösungen durch die Kombination von technischen Fähigkeiten mit klarem Denken und einem Hauch von Neugier entstehen. Mein Ziel ist es, Projekte zu entwickeln, die praktisch, innovativ sind und einen positiven Unterschied machen.",
    education_heading: "Bildung",
    edu_gsv_degree: "B. Tech in Elektronik- und Kommunikationstechnik (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Bachelor of Science (Grundstudium)",
    edu_iitm_institute: "Indian Institute of Technology (IIT) Madras",
    edu_shc_degree: "Klasse 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobbys",
    hobbies_text:
      "Singen, Poesie, Lesen und Zeichnen – Wege, mich jenseits der Technik auszudrücken.",
    skills_heading: "Fähigkeiten",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Grundlagen Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projekte",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Erkennen von Gesichtern in Bildern und Videos mit OpenCV.",
    project_stardetection_title: "Sternen-Erkennung",
    project_stardetection_desc:
      "Erkennen von Sternen in Bildern aus der Hubble-Sammlung der NASA.",
    view_project_link: "Projekt ansehen",
    projects_coming_soon:
      "Weitere Projekte folgen in Kürze — bleiben Sie dran!",
    currently_learning_heading: "Aktuell lerne ich",
    learning_java: "Java",
    learning_datastructures: "Datenstrukturen",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Verbinden",
  },
  es: {
    /* Spanish */ page_title: "Parth Sidhu - Portafolio",
    nav_home: "Inicio",
    nav_projects: "Proyectos",
    nav_connect: "Conectar",
    hero_welcome: "BIENVENIDO",
    hero_tagline: "Tejiendo sueños en el telar digital.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Estudiante de ECE | Entusiasta de la IA y el desarrollo de software | Mentalidad Cinematográfica",
    about_me_heading: "Sobre mí",
    about_me_para1:
      "Rodeado por las serenas colinas y los altos árboles de Deodar de Shimla, he aprendido a apreciar tanto la simplicidad como la profundidad. Este equilibrio moldea mi enfoque de la tecnología, de manera reflexiva, creativa y con un enfoque constante.",
    about_me_para2:
      "Creo que las soluciones significativas provienen de la combinación de habilidades técnicas con un pensamiento claro y una pizca de curiosidad. Mi objetivo es construir proyectos que sean prácticos, innovadores y que generen un impacto positivo.",
    education_heading: "Educación",
    edu_gsv_degree:
      "Licenciatura en Ingeniería Electrónica y Comunicación (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Licenciatura en Ciencias (Programa Básico)",
    edu_iitm_institute: "Instituto Indio de Tecnología (IIT) Madras",
    edu_shc_degree: "Clase 12 (PCM)",
    edu_shc_institute:
      "Convento del Sagrado Corazón, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Pasatiempos",
    hobbies_text:
      "Canto, poesía, lectura y dibujo — formas en las que me expreso más allá de la tecnología.",
    skills_heading: "Habilidades",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Java Básico",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Proyectos",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detectar rostros en imágenes y videos usando OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Detectar estrellas en imágenes de la colección Hubble de la NASA.",
    view_project_link: "Ver proyecto",
    projects_coming_soon: "Más proyectos próximamente — ¡mantente atento!",
    currently_learning_heading: "Actualmente aprendiendo",
    learning_java: "Java",
    learning_datastructures: "Estructuras de datos",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Conectar",
  },
  pt: {
    /* Portuguese */ page_title: "Parth Sidhu - Portfólio",
    nav_home: "Início",
    nav_projects: "Projetos",
    nav_connect: "Conectar",
    hero_welcome: "BEM-VINDO",
    hero_tagline: "Tecendo Sonhos no Tear Digital.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Estudante de ECE | Entusiasta de IA e Desenvolvimento de Software | Mentalidade Cinematográfica",
    about_me_heading: "Sobre Mim",
    about_me_para1:
      "Rodeado pelas serenas colinas e altas árvores Deodar de Shimla, aprendi a apreciar tanto a simplicidade quanto a profundidade. Esse equilíbrio molda como abordo a tecnologia — com pensamento, criatividade e foco constante.",
    about_me_para2:
      "Acredito que soluções significativas vêm da combinação de habilidades técnicas com pensamento claro e um toque de curiosidade. Meu objetivo é construir projetos práticos, inovadores e que façam uma diferença positiva.",
    education_heading: "Educação",
    edu_gsv_degree:
      "Bacharelado em Engenharia Eletrônica e de Comunicações (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Bacharelado em Ciências (Programa Básico)",
    edu_iitm_institute: "Instituto Indiano de Tecnologia (IIT) Madras",
    edu_shc_degree: "Classe 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobbies",
    hobbies_text:
      "Cantar, Poesia, Leitura e Desenho — formas de me expressar além da tecnologia.",
    skills_heading: "Habilidades",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Java Básico",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projetos",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detectar rostos em imagens e vídeos usando OpenCV.",
    project_stardetection_title: "Detecção de Estrelas",
    project_stardetection_desc:
      "Detectar estrelas em imagens da coleção Hubble da NASA.",
    view_project_link: "Ver projeto",
    projects_coming_soon: "Mais projetos em breve — fique ligado!",
    currently_learning_heading: "Atualmente Aprendendo",
    learning_java: "Java",
    learning_datastructures: "Estruturas de Dados",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Conectar",
  },
  it: {
    /* Italian */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Progetti",
    nav_connect: "Connetti",
    hero_welcome: "BENVENUTO",
    hero_tagline: "Tessere sogni nel telaio digitale.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Studente ECE | Appassionato di AI | Sviluppatore orientato alla storia",
    about_me_heading: "Su di me",
    about_me_para1:
      "Circondato dalle serene colline e dagli alti alberi di Deodar di Shimla, ho imparato ad apprezzare sia la semplicità che la profondità. Questo equilibrio modella il mio approccio alla tecnologia — con riflessione, creatività e una costante attenzione.",
    about_me_para2:
      "Credo che soluzioni significative derivino dalla combinazione di competenze tecniche con un pensiero chiaro e un pizzico di curiosità. Il mio obiettivo è costruire progetti che siano pratici, innovativi e che facciano una differenza positiva.",
    education_heading: "Istruzione",
    edu_gsv_degree:
      "B. Tech in Ingegneria Elettronica e delle Comunicazioni (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Corso di Laurea in Scienze (Programma Fondamentale)",
    edu_iitm_institute: "Istituto Indiano di Tecnologia (IIT) Madras",
    edu_shc_degree: "Classe 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobby",
    hobbies_text:
      "Canto, poesia, lettura e disegno — modi per esprimermi oltre la tecnologia.",
    skills_heading: "Competenze",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Java Base",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Progetti",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Rileva i volti in immagini e video usando OpenCV.",
    project_stardetection_title: "Rilevamento Stelle",
    project_stardetection_desc:
      "Rileva le stelle nelle immagini dalla collezione Hubble della NASA.",
    view_project_link: "Visualizza progetto",
    projects_coming_soon: "Altri progetti in arrivo — resta sintonizzato!",
    currently_learning_heading: "Attualmente in Apprendimento",
    learning_java: "Java",
    learning_datastructures: "Strutture Dati",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Connetti",
  },
  ru: {
    /* Russian */ page_title: "Парт Сидху - Портфолио",
    nav_home: "Главная",
    nav_projects: "Проекты",
    nav_connect: "Связаться",
    hero_welcome: "ДОБРО ПОЖАЛОВАТЬ",
    hero_tagline: "Плетение мечт на цифровом станке.",
    profile_name: "Парт Сидху",
    profile_tagline:
      "Студент ECE | Энтузиаст ИИ и разработки ПО | Кинематографическое мышление",
    about_me_heading: "Обо мне",
    about_me_para1:
      "Окруженный безмятежными холмами и высокими деодарскими деревьями Шимлы, я научился ценить как простоту, так и глубину. Этот баланс формирует мой подход к технологиям — вдумчивый, творческий и с постоянным фокусом.",
    about_me_para2:
      "Я верю, что значимые решения приходят из сочетания технических навыков с ясным мышлением и толикой любопытства. Моя цель — создавать проекты, которые практичны, инновационны и приносят положительные изменения.",
    education_heading: "Образование",
    edu_gsv_degree:
      "Бакалавр технических наук в области электроники и связи (ECE)",
    edu_gsv_institute: "Университет Гати Шакти, Вадодара",
    edu_iitm_degree: "Бакалавр наук (Базовая программа)",
    edu_iitm_institute: "Индийский институт технологий (IIT) Мадрас",
    edu_shc_degree: "12 класс (PCM)",
    edu_shc_institute: "Священное Сердце Монастыря, Флер-де-лис, Дхалли, Шимла",
    hobbies_heading: "Хобби",
    hobbies_text:
      "Пение, поэзия, чтение и рисование — способы, которыми я выражаю себя за пределами технологий.",
    skills_heading: "Навыки",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Базовый Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Проекты",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Обнаружение лиц на изображениях и видео с использованием OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Обнаружение звезд на изображениях из коллекции Хаббла НАСА.",
    view_project_link: "Посмотреть проект",
    projects_coming_soon:
      "Скоро появятся новые проекты — следите за обновлениями!",
    currently_learning_heading: "В настоящее время изучаю",
    learning_java: "Java",
    learning_datastructures: "Структуры данных",
    learning_deep_learning: "Глубокое обучение",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Связаться",
  },
  tr: {
    /* Turkish */ page_title: "Parth Sidhu - Portföy",
    nav_home: "Ana Sayfa",
    nav_projects: "Projeler",
    nav_connect: "Bağlan",
    hero_welcome: "HOŞ GELDİNİZ",
    hero_tagline: "Dijital Tezgahta Hayaller Dokunuyor.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE öğrencisi | Yapay Zeka ve Yazılım Geliştirme Meraklısı | Sinematik Zihniyet",
    about_me_heading: "Hakkımda",
    about_me_para1:
      "Şimla'nın sakin tepeleri ve uzun Deodar ağaçları ile çevrili olarak, hem sadeliği hem de derinliği takdir etmeyi öğrendim. Bu denge, teknolojiye nasıl yaklaştığımı şekillendiriyor — düşünceli, yaratıcı ve istikrarlı bir odaklanma ile.",
    about_me_para2:
      "Anlamlı çözümlerin teknik becerileri net düşünme ve biraz merakla birleştirmekten geldiğine inanıyorum. Amacım, pratik, yenilikçi ve olumlu bir fark yaratan projeler oluşturmaktır.",
    education_heading: "Eğitim",
    edu_gsv_degree: "Elektronik ve Haberleşme Mühendisliği (ECE) Lisans",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Fen Bilimleri Lisans (Temel Program)",
    edu_iitm_institute: "Hindistan Teknoloji Enstitüsü (IIT) Madras",
    edu_shc_degree: "12. Sınıf (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobiler",
    hobbies_text:
      "Şarkı söylemek, Şiir, Okuma ve Çizim — teknoloji dışında kendimi ifade etme yollarım.",
    skills_heading: "Beceriler",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Temel Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projeler",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "OpenCV kullanarak resimlerde ve videolarda yüzleri algılayın.",
    project_stardetection_title: "Yıldız Algılama",
    project_stardetection_desc:
      "NASA'nın Hubble koleksiyonundaki resimlerde yıldızları algılayın.",
    view_project_link: "Projeyi görüntüle",
    projects_coming_soon:
      "Daha fazla proje yakında gelecek — bizi takipte kalın!",
    currently_learning_heading: "Şu Anda Öğreniyorum",
    learning_java: "Java",
    learning_datastructures: "Veri Yapıları",
    learning_deep_learning: "Derin Öğrenme",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Bağlan",
  },
  nl: {
    /* Dutch */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Projecten",
    nav_connect: "Verbinden",
    hero_welcome: "WELKOM",
    hero_tagline: "Dromen weven in het digitale weefgetouw.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE student | AI & Software Ontwikkelaar Enthousiast | Cinematische Mindset",
    about_me_heading: "Over Mij",
    about_me_para1:
      "Omringd door de serene heuvels en hoge Deodar bomen van Shimla, heb ik geleerd zowel eenvoud als diepte te waarderen. Dit evenwicht vormt mijn benadering van technologie — bedachtzaam, creatief en met een constante focus.",
    about_me_para2:
      "Ik geloof dat zinvolle oplossingen voortkomen uit het combineren van technische vaardigheden met helder denken en een vleugje nieuwsgierigheid. Mijn doel is om projecten te bouwen die praktisch, innovatief en een positief verschil maken.",
    education_heading: "Opleiding",
    edu_gsv_degree: "B. Tech in Elektronica en Communicatie Engineering (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Bachelor of Science (Basisprogramma)",
    edu_iitm_institute: "Indian Institute of Technology (IIT) Madras",
    edu_shc_degree: "Klasse 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobby's",
    hobbies_text:
      "Zingen, Poëzie, Lezen en Tekenen — manieren om mezelf uit te drukken buiten technologie.",
    skills_heading: "Vaardigheden",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Basis Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projecten",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detecteer gezichten in afbeeldingen en video's met behulp van OpenCV.",
    project_stardetection_title: "Sterren-Detectie",
    project_stardetection_desc:
      "Detecteer sterren in afbeeldingen uit NASA's Hubble-collectie.",
    view_project_link: "Bekijk project",
    projects_coming_soon:
      "Meer projecten komen binnenkort — blijf op de hoogte!",
    currently_learning_heading: "Momenteel aan het Leren",
    learning_java: "Java",
    learning_datastructures: "Datastructuren",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Verbinden",
  },
  sv: {
    /* Swedish */ page_title: "Parth Sidhu - Portfölj",
    nav_home: "Hem",
    nav_projects: "Projekt",
    nav_connect: "Anslut",
    hero_welcome: "VÄLKOMMEN",
    hero_tagline: "Väva drömmar i den digitala vävstolen.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE-student | AI & Mjukvaruutvecklingsentusiast | Filmatisk inställning",
    about_me_heading: "Om mig",
    about_me_para1:
      "Omgiven av Shimlas fridfulla kullar och höga Deodar-träd har jag lärt mig att uppskatta både enkelhet och djup. Denna balans formar hur jag närmar mig teknik – eftertänksamt, kreativt och med ett stadigt fokus.",
    about_me_para2:
      "Jag tror att meningsfulla lösningar kommer från att kombinera tekniska färdigheter med klart tänkande och en gnutta nyfikenhet. Mitt mål är att bygga projekt som är praktiska, innovativa och gör en positiv skillnad.",
    education_heading: "Utbildning",
    edu_gsv_degree:
      "Civilingenjör i Elektronik- och Kommunikationsteknik (ECE)",
    edu_gsv_institute: "Gati Shakti Vishwavidyalaya, Vadodara",
    edu_iitm_degree: "Kandidatexamen i naturvetenskap (Grundprogram)",
    edu_iitm_institute: "Indian Institute of Technology (IIT) Madras",
    edu_shc_degree: "Klass 12 (PCM)",
    edu_shc_institute: "Sacred Heart Convent, Fleur-de-lys, Dhalli, Shimla",
    hobbies_heading: "Hobbys",
    hobbies_text:
      "Sång, Poesi, Läsa och Teckna — sätt jag uttrycker mig på bortom teknik.",
    skills_heading: "Färdigheter",
    skill_cpp: "C++",
    skill_python: "Python",
    skill_java_basic: "Grundläggande Java",
    skill_ubuntu: "Ubuntu",
    skill_git: "Git",
    projects_heading: "Projekt",
    project_facevision_title: "Face-Vision",
    project_facevision_desc: "Upptäck ansikten i bilder och videor med OpenCV.",
    project_stardetection_title: "Stjärn-Detektion",
    project_stardetection_desc:
      "Upptäck stjärnor i bilder från NASA:s Hubble-samling.",
    view_project_link: "Visa projekt",
    projects_coming_soon: "Fler projekt kommer snart — håll utkik!",
    currently_learning_heading: "Lär mig för närvarande",
    learning_java: "Java",
    learning_datastructures: "Datastrukturer",
    learning_deep_learning: "Djupinlärning",
    learning_gans: "GANs" /* GANs remains GANs */,
    connect_heading: "Anslut",
  },
};

let currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

// Function to apply translations
function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    } else if (translations["en"][key]) {
      // Fallback to English if translation is missing
      element.textContent = translations["en"][key];
    }
  });

  // Update body class for font styling
  document.body.className = `lang-${currentLanguage}`;
  document.getElementById("language-selector").value = currentLanguage;
}

// --- Event Listeners and Initial Load ---
document.addEventListener("DOMContentLoaded", () => {
  // Disable drag on images with class "profile-image"
  const img = document.querySelector(".profile-image");
  if (img) {
    img.setAttribute("draggable", "false");
    img.setAttribute("oncontextmenu", "return false;");
  }

  // Stagger section animations
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    // Skip the first section (hero) as it has its own animation
    if (section.id !== "about") {
      section.style.setProperty("--section-delay", `${0.3 * index + 0.5}s`);
    }
  });

  // Apply initial translations
  applyTranslations();

  // Initialize carousel
  updateCarousel();
  autoSlide();

  // Carousel touch/hover events
  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", autoSlide);
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });

  // Language selector event listener
  const langSelector = document.getElementById("language-selector");
  langSelector.addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    localStorage.setItem("portfolioLanguage", currentLanguage);
    applyTranslations();
  });
});

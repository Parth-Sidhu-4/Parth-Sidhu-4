// Disable right-click globally
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// --- Global Carousel Variables (for Education Carousel) ---
// These are declared globally because the helper functions (updateCarousel, nextEducation, etc.)
// are also global and rely on these variables. Their values will be assigned inside DOMContentLoaded.
let currentSlide = 0;
let slides; // Will be assigned NodeList of .education-slide inside DOMContentLoaded
let dots; // Will be assigned NodeList of .dot inside DOMContentLoaded
let educationCarouselElement; // Will be assigned the .education-carousel element inside DOMContentLoaded
let intervalId;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Pixels for swipe detection

// --- Global Carousel Helper Functions (for Education Carousel) ---
function updateCarousel() {
  if (slides && dots && slides.length > 0) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentSlide);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }
}

function next() {
  if (slides && slides.length > 0) {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }
}

function prev() {
  if (slides && slides.length > 0) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }
}

function goToSlide(index) {
  if (slides && slides.length > 0) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide(); // Resets auto-slide timer after manual navigation
  }
}

function autoSlide() {
  clearInterval(intervalId); // Clear any existing interval before setting a new one
  if (slides && slides.length > 0) {
    intervalId = setInterval(() => {
      next();
    }, 5000); // Slide every 5 seconds
  }
}

function resetAutoSlide() {
  clearInterval(intervalId);
  autoSlide();
}

// --- Experience Carousel Logic ---
let currentExperienceSlide = 0;
const experienceSlides = document.querySelectorAll(".experience-slide");
const experienceDots = document.querySelectorAll(".experience-dot");
const experienceCarousel = document.querySelector(".experience-carousel"); // Get the carousel container
const experienceLeftArrow = document.querySelector(".experience-arrow.left");
const experienceRightArrow = document.querySelector(".experience-arrow.right");

let experienceIntervalId;
let experienceTouchStartX = 0;
let experienceTouchEndX = 0;
const experienceSwipeThreshold = 50; // pixels for swipe detection

function updateExperienceCarousel() {
  experienceSlides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === currentExperienceSlide);
  });
  experienceDots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentExperienceSlide);
  });
}

function nextExperience() {
  currentExperienceSlide =
    (currentExperienceSlide + 1) % experienceSlides.length;
  updateExperienceCarousel();
}

function prevExperience() {
  currentExperienceSlide =
    (currentExperienceSlide - 1 + experienceSlides.length) %
    experienceSlides.length;
  updateExperienceCarousel();
}

function goToExperienceSlide(index) {
  currentExperienceSlide = index;
  updateExperienceCarousel();
  resetAutoExperienceSlide(); // Reset auto-slide when a dot is clicked
}

function autoExperienceSlide() {
  experienceIntervalId = setInterval(() => {
    nextExperience();
  }, 5000); // Auto-slide every 5 seconds
}

function resetAutoExperienceSlide() {
  clearInterval(experienceIntervalId);
  autoExperienceSlide();
}

// Initialize and add event listeners for Experience Carousel
if (experienceCarousel && experienceSlides.length > 0) {
  updateExperienceCarousel(); // Set initial slide visibility
  autoExperienceSlide(); // Start auto-sliding

  // Click listeners for arrows
  if (experienceLeftArrow) {
    experienceLeftArrow.addEventListener("click", prevExperience);
  }
  if (experienceRightArrow) {
    experienceRightArrow.addEventListener("click", nextExperience);
  }

  // Click listeners for dots
  experienceDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.dataset.slide);
      goToExperienceSlide(slideIndex);
    });
  });

  // Pause/Resume auto-slide on mouse hover
  experienceCarousel.addEventListener("mouseenter", () =>
    clearInterval(experienceIntervalId)
  );
  experienceCarousel.addEventListener("mouseleave", autoExperienceSlide);

  // Touch event handlers for swiping
  experienceCarousel.addEventListener("touchstart", (e) => {
    experienceTouchStartX = e.touches[0].clientX;
  });

  experienceCarousel.addEventListener("touchend", (e) => {
    experienceTouchEndX = e.changedTouches[0].clientX;
    handleExperienceSwipe();
  });

  experienceCarousel.addEventListener(
    "touchmove",
    (e) => {
      // Prevent default only if swiping horizontally to avoid interfering with vertical scroll
      if (
        Math.abs(e.touches[0].clientX - experienceTouchStartX) >
        Math.abs(e.touches[0].clientY - e.touches[0].clientY)
      ) {
        e.preventDefault();
      }
    },
    { passive: false }
  ); // Use passive: false for preventDefault to work

  function handleExperienceSwipe() {
    if (
      experienceTouchEndX <
      experienceTouchStartX - experienceSwipeThreshold
    ) {
      nextExperience(); // Swipe left
    } else if (
      experienceTouchEndX >
      experienceTouchStartX + experienceSwipeThreshold
    ) {
      prevExperience(); // Swipe right
    }
  }
}
// --- Global Language Setup ---
window.currentLanguage = localStorage.getItem("portfolioLanguage") || "en";

// --- Translations for Poems & Articles Page ---
window.translations = {
  en: {
    page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Projects",
    nav_connect: "Connect",
    nav_poems_articles: "Poems & Articles",
    hero_welcome: "WELCOME",
    hero_tagline: "Weaving Dreams in the Digital Loom.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE student | AI & Software Dev Enthusiast | Cinematic Mindset",
    about_me_heading: "About Me",
    about_me_para1:
      "Growing up amidst the quiet hills and Deodar forests of Shimla shaped the way I think \u2014 balancing curiosity with calm observation, and creativity with structure.",
    about_me_para2:
      "I\u2019m a final year Electronics and Communication Engineering student at Gati Shakti Vishwavidyalaya, interested in intelligent systems, applied AI, simulation, and computational engineering, with a focus on building practical and thoughtfully engineered solutions.",
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
    skill_ml: "Machine Learning",
    projects_heading: "Projects",
    project_demand_title: "Hyperlocal Demand Prediction",
    project_demand_desc: "A lightweight AI pipeline for fast & accurate quick-commerce demand prediction, replacing heavy models.",
    project_plant_title: "Plant Disease IoT Monitor",
    project_plant_desc: "An end-to-end TinyML pipeline on ESP32-CAM detecting plant diseases using a custom 18KB CNN.",
    project_robot_title: "ROS 2 Autonomous Robot",
    project_robot_desc: "A mathematically modeled skid-steer robot navigating autonomously via closed-form kinematics in ROS 2 & Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc: "Detect faces in images and videos using OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Detect stars in images from NASA's Hubble collection.",
    view_project_link: "View project",
    project_stardetection_desc:
      "Detect stars in images from NASA's Hubble collection.",
    project_portfolio_title: "Personal Portfolio Website",
    project_portfolio_desc:
      "A vibe - coded personal website showcasing projects, poems, and articles, built with HTML, CSS, and JavaScript, featuring responsive design and multi-language support.",
    view_project_link: "View project",
    projects_coming_soon: "More projects coming soon — stay tuned!",
    experience_heading: "Experience",
    exp_railway_company: "DRM Ambala (Northern Railway)",
    exp_railway_role: "15 Day Internship in S & T Department",
    exp_railway_date: "May 2024",
    exp_railway_description: "Gained insights into Railway Signaling basics.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "1 Month Research Internship",
    exp_nith_date: "June - July 2025",
    exp_nith_description: "Conducted research on GAN Models and Deep Learning.",
    currently_learning_heading: "Currently Learning",
    learning_java: "Java",
    learning_datastructures: "Data Structures",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antenna and Wave Propagation",
    learning_cuda: "Parallel Computing (CUDA)",
    connect_heading: "Connect",
  },
  hi: {
    page_title: "पार्थ सिद्धू - पोर्टफोलियो",
    nav_home: "होम",
    nav_projects: "प्रोजेक्ट्स",
    nav_connect: "संपर्क करें",
    nav_poems_articles: "कविताएँ & लेख",
    hero_welcome: "स्वागत है",
    hero_tagline: "डिजिटल करघे में सपनों की बुनाई।",
    profile_name: "पार्थ सिद्धू",
    profile_tagline:
      "ईसीई छात्र | एआई और सॉफ्टवेयर डेव उत्साही | सिनेमाई मानसिकता",
    about_me_heading: "मेरे बारे में",
    about_me_para1:
      "\u0936\u093f\u092e\u0932\u093e \u0915\u0940 \u0936\u093e\u0902\u0924 \u092a\u0939\u093e\u0921\u093c\u093f\u092f\u094b\u0902 \u0914\u0930 \u0926\u0947\u0935\u0926\u093e\u0930 \u0915\u0947 \u091c\u0902\u0917\u0932\u094b\u0902 \u0915\u0947 \u092c\u0940\u091a \u092a\u0932\u0947-\u092c\u0922\u093c\u0947 \u0939\u094b\u0928\u0947 \u0928\u0947 \u092e\u0947\u0930\u0947 \u0938\u094b\u091a\u0928\u0947 \u0915\u0947 \u0924\u0930\u0940\u0915\u0947 \u0915\u094b \u0906\u0915\u093e\u0930 \u0926\u093f\u092f\u093e \u0939\u0948 \u2014 \u0936\u093e\u0902\u0924 \u0905\u0935\u0932\u094b\u0915\u0928 \u0915\u0947 \u0938\u093e\u0925 \u091c\u093f\u091c\u094d\u091e\u093e\u0938\u093e, \u0914\u0930 \u0938\u0902\u0930\u091a\u0928\u093e \u0915\u0947 \u0938\u093e\u0925 \u0930\u091a\u0928\u093e\u0924\u094d\u092e\u0915\u0924\u093e \u0915\u094b \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u0915\u0930\u0928\u093e\u0964",
    about_me_para2:
      "\u092e\u0948\u0902 \u0917\u0924\u093f \u0936\u0915\u094d\u0924\u093f \u0935\u093f\u0936\u094d\u0935\u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u092e\u0947\u0902 \u0907\u0932\u0947\u0915\u094d\u091f\u094d\u0930\u0949\u0928\u093f\u0915\u094d\u0938 \u0914\u0930 \u0938\u0902\u091a\u093e\u0930 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u0915\u093e \u0905\u0902\u0924\u093f\u092e \u0935\u0930\u094d\u0937 \u0915\u093e \u091b\u093e\u0924\u094d\u0930 \u0939\u0942\u0901, \u091c\u093f\u0938\u0915\u0940 \u0930\u0941\u091a\u093f \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u093e\u0928 \u092a\u094d\u0930\u0923\u093e\u0932\u093f\u092f\u094b\u0902, \u090f\u092a\u094d\u0932\u093e\u0907\u0921 \u090f\u0906\u0908, \u0938\u093f\u092e\u0941\u0932\u0947\u0936\u0928 \u0914\u0930 \u0915\u092e\u094d\u092a\u094d\u092f\u0942\u091f\u0947\u0936\u0928\u0932 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u092e\u0947\u0902 \u0939\u0948, \u0914\u0930 \u092e\u0947\u0930\u093e \u0927\u094d\u092f\u093e\u0928 \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0914\u0930 \u0935\u093f\u091a\u093e\u0930\u0936\u0940\u0932 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u0938\u092e\u093e\u0927\u093e\u0928 \u092c\u0928\u093e\u0928\u0947 \u092a\u0930 \u0915\u0947\u0902\u0926\u094d\u0930\u093f\u0924 \u0939\u0948\u0964",
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
    skill_ml: "मशीन लर्निंग (Machine Learning)",
    projects_heading: "परियोजनाएं",
    project_demand_title: "हाइपरलोकल डिमांड प्रेडिक्शन",
    project_demand_desc: "तेज और सटीक क्विक-कॉमर्स डिमांड प्रेडिक्शन के लिए एक हल्का एआई (AI) पाइपलाइन।",
    project_plant_title: "प्लांट डिसीज IoT मॉनिटर",
    project_plant_desc: "कस्टम 18KB CNN का उपयोग करके पौधों की बीमारियों का पता लगाने वाला ESP32-CAM पर एक एंड-टू-एंड TinyML पाइपलाइन।",
    project_robot_title: "ROS 2 ऑटोनॉमस रोबोट",
    project_robot_desc: "ROS 2 और Gazebo में क्लोज्ड-फॉर्म किनेमेटिक्स के माध्यम से स्वायत्त रूप से नेविगेट करने वाला गणितीय रूप से मॉडल किया गया रोबोट।",
    project_facevision_title: "फेस-विजन",
    project_facevision_desc:
      "ओपनसीवी का उपयोग करके छवियों और वीडियो में चेहरों का पता लगाएं।",
    project_stardetection_title: "स्टार-डिटेक्शन",
    project_stardetection_desc:
      "नासा के हबल संग्रह से छवियों में सितारों का पता लगाएं।",
    view_project_link: "प्रोजेक्ट देखें",
    project_portfolio_title: "व्यक्तिगत पोर्टफोलियो वेबसाइट",
    project_portfolio_desc:
      "एक व्यक्तिगत वेबसाइट जो परियोजनाओं, कविताओं और लेखों को प्रदर्शित करती है, HTML, CSS, और JavaScript के साथ निर्मित, जिसमें उत्तरदायी डिज़ाइन और बहु-भाषा समर्थन शामिल है।",
    view_project_link: "प्रोजेक्ट देखें",
    projects_coming_soon: "अधिक परियोजनाएं जल्द आ रही हैं — बने रहें!",
    experience_heading: "अनुभव",
    exp_railway_company: "डीआरएम अंबाला (उत्तरी रेलवे)",
    exp_railway_role: "S&T विभाग में 15 दिवसीय इंटर्नशिप",
    exp_railway_date: "मई 2024",
    exp_railway_description:
      "रेलवे सिग्नलिंग की मूल बातें में अंतर्दृष्टि प्राप्त की।",
    exp_nith_institute: "एनआईटी हमीरपुर",
    exp_nith_role: "1 महीने का अनुसंधान इंटर्नशिप",
    exp_nith_date: "जून - जुलाई 2025",
    exp_nith_description: "GAN मॉडल और डीप लर्निंग पर शोध किया।",
    currently_learning_heading: "वर्तमान में सीख रहा हूँ",
    learning_java: "जावा",
    learning_datastructures: "डेटा स्ट्रक्चर्स",
    learning_deep_learning: "डीप लर्निंग",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "एंटीना और वेव प्रोपेगेशन",
    learning_cuda: "पैरेलल कंप्यूटिंग (CUDA)",
    connect_heading: "जुड़े",
  },
  pa: {
    /* Punjabi - Gurmukhi */ page_title: "ਪਾਰਥ ਸਿੱਧੂ - ਪੋਰਟਫੋਲੀਓ",
    nav_home: "ਘਰ",
    nav_projects: "ਪ੍ਰੋਜੈਕਟ",
    nav_connect: "ਸੰਪਰਕ ਕਰੋ",
    nav_poems_articles: "ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖ",
    hero_welcome: "ਸੁਆਗਤ ਹੈ",
    hero_tagline: "ਡਿਜੀਟਲ ਲੂਮ ਵਿੱਚ ਸੁਪਨਿਆਂ ਦੀ ਬੁਣਾਈ।",
    profile_name: "ਪਾਰਥ ਸਿੱਧੂ",
    profile_tagline: "ਈਸੀਈ ਵਿਦਿਆਰਥੀ | ਏਆਈ ਉਤਸ਼ਾਹੀ | ਕਹਾਣੀ-ਸੰਚਾਲਿਤ ਦੇਵ",
    about_me_heading: "ਮੇਰੇ ਬਾਰੇ",
    about_me_para1:
      "\u0a38\u0a3c\u0a3f\u0a2e\u0a32\u0a3e \u0a26\u0a40\u0a06\u0a02 \u0a38\u0a3c\u0a3e\u0a02\u0a24 \u0a2a\u0a39\u0a3e\u0a5c\u0a40\u0a06\u0a02 \u0a05\u0a24\u0a47 \u0a26\u0a47\u0a35\u0a26\u0a3e\u0a30 \u0a26\u0a47 \u0a1c\u0a70\u0a17\u0a32\u0a3e\u0a02 \u0a35\u0a3f\u0a71\u0a1a \u0a2a\u0a32\u0a23 \u0a28\u0a47 \u0a2e\u0a47\u0a30\u0a47 \u0a38\u0a4b\u0a1a\u0a23 \u0a26\u0a47 \u0a24\u0a30\u0a40\u0a15\u0a47 \u0a28\u0a42\u0a70 \u0a06\u0a15\u0a3e\u0a30 \u0a26\u0a3f\u0a71\u0a24\u0a3e \u0a39\u0a48 \u2014 \u0a38\u0a3c\u0a3e\u0a02\u0a24 \u0a28\u0a3f\u0a30\u0a40\u0a16\u0a23 \u0a28\u0a3e\u0a32 \u0a09\u0a24\u0a38\u0a41\u0a15\u0a24\u0a3e, \u0a05\u0a24\u0a47 \u0a22\u0a3e\u0a02\u0a1a\u0a47 \u0a28\u0a3e\u0a32 \u0a30\u0a1a\u0a28\u0a3e\u0a24\u0a2e\u0a15\u0a24\u0a3e \u0a26\u0a3e \u0a38\u0a70\u0a24\u0a41\u0a32\u0a28 \u0a15\u0a30\u0a28\u0a3e\u0964",
    about_me_para2:
      "\u0a2e\u0a48\u0a02 \u0a17\u0a24\u0a40 \u0a38\u0a3c\u0a15\u0a24\u0a40 \u0a35\u0a3f\u0a38\u0a3c\u0a35\u0a35\u0a3f\u0a26\u0a3f\u0a06\u0a32\u0a3f\u0a06 \u0a35\u0a3f\u0a71\u0a1a \u0a07\u0a32\u0a48\u0a15\u0a1f\u0a4d\u0a30\u0a4b\u0a28\u0a3f\u0a15\u0a38 \u0a05\u0a24\u0a47 \u0a38\u0a70\u0a1a\u0a3e\u0a30 \u0a07\u0a70\u0a1c\u0a40\u0a28\u0a40\u0a05\u0a30\u0a3f\u0a70\u0a17 \u0a26\u0a3e \u0a05\u0a70\u0a24\u0a3f\u0a2e \u0a38\u0a3e\u0a32 \u0a26\u0a3e \u0a35\u0a3f\u0a26\u0a3f\u0a06\u0a30\u0a25\u0a40 \u0a39\u0a3e\u0a02, \u0a1c\u0a3f\u0a38\u0a26\u0a40 \u0a26\u0a3f\u0a32\u0a1a\u0a38\u0a2a\u0a40 \u0a2c\u0a41\u0a71\u0a27\u0a40\u0a2e\u0a3e\u0a28 \u0a2a\u0a4d\u0a30\u0a23\u0a3e\u0a32\u0a40\u0a06\u0a02, \u0a05\u0a2a\u0a32\u0a3e\u0a08\u0a21 \u0a0f\u0a06\u0a08, \u0a38\u0a3f\u0a2e\u0a42\u0a32\u0a47\u0a38\u0a3c\u0a28 \u0a05\u0a24\u0a47 \u0a15\u0a70\u0a2a\u0a3f\u0a0a\u0a1f\u0a47\u0a38\u0a3c\u0a28\u0a32 \u0a07\u0a70\u0a1c\u0a40\u0a28\u0a40\u0a05\u0a30\u0a3f\u0a70\u0a17 \u0a35\u0a3f\u0a71\u0a1a \u0a39\u0a48, \u0a05\u0a24\u0a47 \u0a2e\u0a47\u0a30\u0a3e \u0a27\u0a3f\u0a06\u0a28 \u0a35\u0a3f\u0a35\u0a39\u0a3e\u0a30\u0a15 \u0a05\u0a24\u0a47 \u0a38\u0a4b\u0a1a-\u0a38\u0a2e\u0a1d \u0a15\u0a47 \u0a07\u0a70\u0a1c\u0a40\u0a28\u0a40\u0a05\u0a30 \u0a15\u0a40\u0a24\u0a47 \u0a39\u0a71\u0a32 \u0a2c\u0a23\u0a3e\u0a09\u0a23 '\u0a24\u0a47 \u0a15\u0a47\u0a02\u0a26\u0a4d\u0a30\u0a3f\u0a24 \u0a39\u0a48\u0964",
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
    skill_ml: "ਮਸ਼ੀਨ ਲਰਨਿੰਗ (Machine Learning)",
    projects_heading: "ਪ੍ਰੋਜੈਕਟ",
    project_demand_title: "ਹਾਇਪਰਲੋਕਲ ਡਿਮਾਂਡ ਪ੍ਰੀਡਿਕਸ਼ਨ",
    project_demand_desc: "ਤੇਜ਼ ਅਤੇ ਸਹੀ ਕੁਇੱਕ-ਕਾਮਰਸ ਡਿਮਾਂਡ ਪ੍ਰੀਡਿਕਸ਼ਨ ਲਈ ਇੱਕ ਹਲਕਾ AI ਪਾਈਪਲਾਈਨ।",
    project_plant_title: "ਪਲਾਂਟ ਡਿਜ਼ੀਜ਼ IoT ਮਾਨੀਟਰ",
    project_plant_desc: "ਕਸਟਮ 18KB CNN ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪੌਦਿਆਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਉਣ ਵਾਲਾ ESP32-CAM 'ਤੇ ਇੱਕ TinyML ਪਾਈਪਲਾਈਨ।",
    project_robot_title: "ROS 2 ਆਟੋਨੋਮਸ ਰੋਬੋਟ",
    project_robot_desc: "ROS 2 ਅਤੇ Gazebo ਵਿੱਚ ਆਟੋਨੋਮਸ ਨੇਵੀਗੇਟ ਕਰਨ ਵਾਲਾ ਇੱਕ ਗਣਿਤਕ ਮਾਡਲ ਵਾਲਾ ਰੋਬੋਟ।",
    project_facevision_title: "ਫੇਸ-ਵਿਜ਼ਨ",
    project_facevision_desc:
      "ਓਪਨਸੀਵੀ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਚਿੱਤਰਾਂ ਅਤੇ ਵੀਡੀਓਜ਼ ਵਿੱਚ ਚਿਹਰਿਆਂ ਦਾ ਪਤਾ ਲਗਾਓ।",
    project_stardetection_title: "ਸਟਾਰ-ਡਿਟੈਕਸ਼ਨ",
    project_stardetection_desc:
      "ਨਾਸਾ ਦੇ ਹਬਲ ਸੰਗ੍ਰਹਿ ਤੋਂ ਚਿੱਤਰਾਂ ਵਿੱਚ ਤਾਰਿਆਂ ਦਾ ਪਤਾ ਲਗਾਓ।",
    view_project_link: "ਪ੍ਰੋਜੈਕਟ ਦੇਖੋ",
    project_portfolio_title: "ਨਿੱਜੀ ਪੋਰਟਫੋਲੀਓ ਵੈੱਬਸਾਈਟ",
    project_portfolio_desc:
      "ਇੱਕ ਵਾਈਬ-ਕੋਡਿਡ ਨਿੱਜੀ ਵੈੱਬਸਾਈਟ ਜਿਸ ਵਿੱਚ ਪ੍ਰੋਜੈਕਟ, ਕਵਿਤਾਵਾਂ ਅਤੇ ਲੇਖ ਪ੍ਰਦਰਸ਼ਿਤ ਕੀਤੇ ਗਏ ਹਨ, HTML, CSS, ਅਤੇ JavaScript ਨਾਲ ਬਣਾਈ ਗਈ ਹੈ, ਜਿਸ ਵਿੱਚ ਜਵਾਬਦੇਹ ਡਿਜ਼ਾਈਨ ਅਤੇ ਬਹੁ-ਭਾਸ਼ਾਈ ਸਹਾਇਤਾ ਸ਼ਾਮਲ ਹੈ।",
    view_project_link: "ਪ੍ਰੋਜੈਕਟ ਦੇਖੋ",
    projects_coming_soon: "ਹੋਰ ਪ੍ਰੋਜੈਕਟ ਜਲਦੀ ਆ ਰਹੇ ਹਨ — ਬਣੇ ਰਹੋ!",
    experience_heading: "ਅਨੁਭਵ",
    exp_railway_company: "ਡੀਆਰਐਮ ਅੰਬਾਲਾ (ਉੱਤਰੀ ਰੇਲਵੇ)",
    exp_railway_role: "ਐਸ ਐਂਡ ਟੀ ਵਿਭਾਗ ਵਿੱਚ 15 ਦਿਨਾਂ ਦੀ ਇੰਟਰਨਸ਼ਿਪ",
    exp_railway_date: "ਮਈ 2024",
    exp_railway_description:
      "ਰੇਲਵੇ ਸਿਗਨਲਿੰਗ ਦੇ ਮੂਲ ਸਿਧਾਂਤਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।",
    exp_nith_institute: "ਐਨਆਈਟੀ ਹਮੀਰਪੁਰ",
    exp_nith_role: "1 ਮਹੀਨੇ ਦੀ ਖੋਜ ਇੰਟਰਨਸ਼ਿਪ",
    exp_nith_date: "ਜੂਨ - ਜੁਲਾਈ 2025",
    exp_nith_description: "GAN ਮਾਡਲਾਂ ਅਤੇ ਡੀਪ ਲਰਨਿੰਗ 'ਤੇ ਖੋਜ ਕੀਤੀ।",
    currently_learning_heading: "ਵਰਤਮਾਨ ਵਿੱਚ ਸਿੱਖ ਰਿਹਾ ਹਾਂ",
    learning_java: "ਜਾਵਾ",
    learning_datastructures: "ਡਾਟਾ ਸਟ੍ਰਕਚਰ",
    learning_deep_learning: "ਡੂੰਘੀ ਸਿਖਲਾਈ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "ਐਂਟੀਨਾ ਅਤੇ ਵੇਵ ਪ੍ਰੋਪੇਗੇਸ਼ਨ",
    learning_cuda: "ਪੈਰਲਲ ਕੰਪਿਊਟਿੰਗ (CUDA)",
    connect_heading: "ਜੁੜੋ",
  },
  "pa-Arab": {
    /* Punjabi - Shahmukhi */ page_title: "پارتھ سدھو - پورٹ فولیو",
    nav_home: "گھر",
    nav_projects: "پروجیکٹس",
    nav_connect: "رابطہ کریں",
    nav_poems_articles: "نظماں تے لیکھ",
    hero_welcome: "خوش آمدید",
    hero_tagline: "ڈیجیٹل لوم وچ سپنیاں دی بنائی۔",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "ای سی ای طالب علم | اے آئی اور سافٹ ویئر ڈویلپمنٹ دا شوقین | سنیما کی ذہنیت",
    about_me_heading: "میرے بارے میں",
    about_me_para1:
      "\u0634\u0645\u0644\u06c1 \u06a9\u06cc \u067e\u0631\u0633\u06a9\u0648\u0646 \u067e\u06c1\u0627\u0691\u06cc\u0648\u06ba \u0627\u0648\u0631 \u062f\u06cc\u0648\u062f\u0627\u0631 \u06a9\u06d2 \u062c\u0646\u06af\u0644\u0627\u062a \u0645\u06cc\u06ba \u067e\u0631\u0648\u0631\u0634 \u067e\u0627\u0646\u06d2 \u0646\u06d2 \u0645\u06cc\u0631\u06d2 \u0633\u0648\u0686\u0646\u06d2 \u06a9\u06d2 \u0627\u0646\u062f\u0627\u0632 \u06a9\u0648 \u062a\u0634\u06a9\u06cc\u0644 \u062f\u06cc\u0627 \u06c1\u06d2 \u2014 \u067e\u0631\u0633\u06a9\u0648\u0646 \u0645\u0634\u0627\u06c1\u062f\u06d2 \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u062c\u0633\u0633\u060c \u0627\u0648\u0631 \u0633\u0627\u062e\u062a \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u062e\u0644\u06cc\u0642\u06cc \u0635\u0644\u0627\u062d\u06cc\u062a\u0648\u06ba \u06a9\u0627 \u062a\u0648\u0627\u0632\u0646 \u0628\u0631\u0642\u0631\u0627\u0631 \u0631\u06a9\u06be\u0646\u0627\u06d4",
    about_me_para2:
      "\u0645\u06cc\u06ba \u06af\u062a\u06cc \u0634\u06a9\u062a\u06cc \u0648\u0634\u0648 \u0648\u062f\u06cc\u0627\u0644\u06cc\u06c1 \u0645\u06cc\u06ba \u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633 \u0627\u0648\u0631 \u06a9\u0645\u06cc\u0648\u0646\u06cc\u06a9\u06cc\u0634\u0646 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u06a9\u0627 \u0641\u0627\u0626\u0646\u0644 \u0627\u06cc\u0626\u0631 \u06a9\u0627 \u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u06c1\u0648\u06ba\u060c \u062c\u0633 \u06a9\u06cc \u062f\u0644\u0686\u0633\u067e\u06cc \u0630\u06c1\u06cc\u0646 \u0633\u0633\u0679\u0645\u0632\u060c \u0627\u067e\u0644\u0627\u0626\u06cc\u0688 \u0627\u06d2 \u0622\u0626\u06cc\u060c \u0633\u0645\u0648\u0644\u06cc\u0634\u0646 \u0627\u0648\u0631 \u06a9\u0645\u067e\u06cc\u0648\u0679\u06cc\u0634\u0646\u0644 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0645\u06cc\u06ba \u06c1\u06d2\u060c \u0627\u0648\u0631 \u0645\u06cc\u0631\u0627 \u0641\u0648\u06a9\u0633 \u0639\u0645\u0644\u06cc \u0627\u0648\u0631 \u0633\u0648\u0686 \u0633\u0645\u062c\u06be \u06a9\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u0631\u062f\u06c1 \u062d\u0644 \u0628\u0646\u0627\u0646\u06d2 \u067e\u0631 \u06c1\u06d2\u06d4",
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
    skill_ml: "مشین لرننگ",
    projects_heading: "پروجیکٹس",
    project_demand_title: "ہائپر لوکل ڈیمانڈ پریڈکشن",
    project_demand_desc: "تیز اور درست کوئیک کامرس ڈیمانڈ پریڈکشن کے لیے ایک ہلکا AI پائپ لائن۔",
    project_plant_title: "پلانٹ ڈیزیز IoT مانیٹر",
    project_plant_desc: "کسٹم 18KB CNN کا استعمال کرتے ہوئے پودوں کی بیماریوں کا پتہ لگانے والا ESP32-CAM پر ایک TinyML پائپ لائن۔",
    project_robot_title: "ROS 2 خود مختار روبوٹ",
    project_robot_desc: "ROS 2 اور Gazebo میں خود مختار طور پر نیویگیٹ کرنے والا ایک ریاضیاتی ماڈل والا روبوٹ۔",
    project_facevision_title: "فیس ویژن",
    project_facevision_desc:
      "اوپن سی وی دا استعمال کردے ہوئے تصاویر تے ویڈیوز وچ چہریاں دا پتہ لاؤ۔",
    project_stardetection_title: "اسٹار ڈیٹیکشن",
    project_stardetection_desc:
      "ناسا دے ہبل کلیکشن تو‏ں تصاویر وچ ستاریاں دا پتہ لاؤ۔",
    view_project_link: "پروجیکٹ دیکھو",
    project_portfolio_title: "نجی پورٹ فولیو ویبسائٹ",
    project_portfolio_desc:
      "اک وائب-کوڈڈ نجی ویبسائٹ جیدے وِچ پروجیکٹ، نظماں تے مضمون پیش کیتے گئے نیں، HTML، CSS، تے JavaScript نال بنائی گئی اے، جیدے وِچ رسپانسیو ڈیزائن تے کئی زباناں دی حمایت شامل اے۔",
    view_project_link: "پروجیکٹ دیکھو",
    projects_coming_soon: "مزید پروجیکٹس جلد آرہے نيں — دیکھتے رہو!",
    experience_heading: "تجربہ",
    exp_railway_company: "ڈی آر ایم امبالہ (شمالی ریلوے)",
    exp_railway_role: "ایس اینڈ ٹی ڈیپارٹمنٹ میں 15 دن کی انٹرن شپ",
    exp_railway_date: "مئی 2024",
    exp_railway_description: "ریلوے سگنلنگ کی بنیادی باتوں میں بصیرت حاصل کی۔",
    exp_nith_institute: "این آئی ٹی ہمیرپور",
    exp_nith_role: "1 ماہ کی تحقیقی انٹرن شپ",
    exp_nith_date: "جون - جولائی 2025",
    exp_nith_description: "GAN ماڈلز اور ڈیپ لرننگ پر تحقیق کی۔",
    currently_learning_heading: "فی الحال سیکھ رہا آں",
    learning_java: "جاوا",
    learning_datastructures: "ڈیٹا سٹرکچرز",
    learning_deep_learning: "ڈیپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "اینٹینا اور ویو پروپیگیشن",
    learning_cuda: "پیرالل کمپیوٹنگ (CUDA)",
    connect_heading: "رابطہ",
  },
  ur: {
    /* Urdu */ page_title: "پارتھ سدھو - پورٹ فولیو",
    nav_home: "ہوم",
    nav_projects: "پروجیکٹس",
    nav_connect: "رابطہ کریں",
    nav_poems_articles: "نظم اور مضامین",
    hero_welcome: "خوش آمدید",
    hero_tagline: "ڈیجیٹل لوم میں خوابوں کی بنائی۔",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "ای سی ای طالب علم | اے آئی اور سافٹ ویئر ڈویلپمنٹ کا شوقین | سنیما کی ذہنیت",
    about_me_heading: "میرے بارے میں",
    about_me_para1:
      "\u0634\u0645\u0644\u06c1 \u06a9\u06cc \u067e\u0631\u0633\u06a9\u0648\u0646 \u067e\u06c1\u0627\u0691\u06cc\u0648\u06ba \u0627\u0648\u0631 \u062f\u06cc\u0648\u062f\u0627\u0631 \u06a9\u06d2 \u062c\u0646\u06af\u0644\u0627\u062a \u0645\u06cc\u06ba \u067e\u0631\u0648\u0631\u0634 \u067e\u0627\u0646\u06d2 \u0646\u06d2 \u0645\u06cc\u0631\u06d2 \u0633\u0648\u0686\u0646\u06d2 \u06a9\u06d2 \u0627\u0646\u062f\u0627\u0632 \u06a9\u0648 \u062a\u0634\u06a9\u06cc\u0644 \u062f\u06cc\u0627 \u06c1\u06d2 \u2014 \u067e\u0631\u0633\u06a9\u0648\u0646 \u0645\u0634\u0627\u06c1\u062f\u06d2 \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u062c\u0633\u0633\u060c \u0627\u0648\u0631 \u0633\u0627\u062e\u062a \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u062e\u0644\u06cc\u0642\u06cc \u0635\u0644\u0627\u062d\u06cc\u062a\u0648\u06ba \u06a9\u0627 \u062a\u0648\u0627\u0632\u0646 \u0628\u0631\u0642\u0631\u0627\u0631 \u0631\u06a9\u06be\u0646\u0627\u06d4",
    about_me_para2:
      "\u0645\u06cc\u06ba \u06af\u062a\u06cc \u0634\u06a9\u062a\u06cc \u0648\u0634\u0648 \u0648\u062f\u06cc\u0627\u0644\u06cc\u06c1 \u0645\u06cc\u06ba \u0627\u0644\u06cc\u06a9\u0679\u0631\u0627\u0646\u06a9\u0633 \u0627\u0648\u0631 \u06a9\u0645\u06cc\u0648\u0646\u06cc\u06a9\u06cc\u0634\u0646 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u06a9\u0627 \u0641\u0627\u0626\u0646\u0644 \u0627\u06cc\u0626\u0631 \u06a9\u0627 \u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u06c1\u0648\u06ba\u060c \u062c\u0633 \u06a9\u06cc \u062f\u0644\u0686\u0633\u067e\u06cc \u0630\u06c1\u06cc\u0646 \u0633\u0633\u0679\u0645\u0632\u060c \u0627\u067e\u0644\u0627\u0626\u06cc\u0688 \u0627\u06d2 \u0622\u0626\u06cc\u060c \u0633\u0645\u0648\u0644\u06cc\u0634\u0646 \u0627\u0648\u0631 \u06a9\u0645\u067e\u06cc\u0648\u0679\u06cc\u0634\u0646\u0644 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0645\u06cc\u06ba \u06c1\u06d2\u060c \u0627\u0648\u0631 \u0645\u06cc\u0631\u0627 \u0641\u0648\u06a9\u0633 \u0639\u0645\u0644\u06cc \u0627\u0648\u0631 \u0633\u0648\u0686 \u0633\u0645\u062c\u06be \u06a9\u0631 \u062a\u06cc\u0627\u0631 \u06a9\u0631\u062f\u06c1 \u062d\u0644 \u0628\u0646\u0627\u0646\u06d2 \u067e\u0631 \u06c1\u06d2\u06d4",
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
    skill_ml: "مشین لرننگ",
    projects_heading: "پروجیکٹس",
    project_demand_title: "ہائپر لوکل ڈیمانڈ پریڈکشن",
    project_demand_desc: "تیز اور درست کوئیک کامرس ڈیمانڈ پریڈکشن کے لیے ایک ہلکا AI پائپ لائن۔",
    project_plant_title: "پلانٹ ڈیزیز IoT مانیٹر",
    project_plant_desc: "کسٹم 18KB CNN کا استعمال کرتے ہوئے پودوں کی بیماریوں کا پتہ لگانے والا ESP32-CAM پر ایک TinyML پائپ لائن۔",
    project_robot_title: "ROS 2 خود مختار روبوٹ",
    project_robot_desc: "ROS 2 اور Gazebo میں خود مختار طور پر نیویگیٹ کرنے والا ایک ریاضیاتی ماڈل والا روبوٹ۔",
    project_facevision_title: "فیس ویژن",
    project_facevision_desc:
      "اوپن سی وی کا استعمال کرتے ہوئے تصاویر اور ویڈیوز میں چہروں کا پتہ لگائیں۔",
    project_stardetection_title: "اسٹار ڈیٹیکشن",
    project_stardetection_desc:
      "ناسا کے ہبل کلیکشن سے تصاویر میں ستاروں کا پتہ لگائیں۔",
    view_project_link: "پروجیکٹ دیکھیں",
    project_portfolio_title: "ذاتی پورٹ فولیو ویب سائٹ",
    project_portfolio_desc:
      "ایک وائب-کوڈڈ ذاتی ویب سائٹ جو پروجیکٹس، نظموں اور مضامین کی نمائش کرتی ہے، HTML، CSS، اور JavaScript کے ساتھ بنائی گئی ہے، جس میں ریسپانسیو ڈیزائن اور کثیر لسانی حمایت شامل ہے۔",
    view_project_link: "پروجیکٹ دیکھیں",
    projects_coming_soon: "مزید پروجیکٹس جلد آرہے ہیں — دیکھتے رہیں!",
    experience_heading: "تجربہ",
    exp_railway_company: "ڈی آر ایم امبالہ (ناردرن ریلوے)",
    exp_railway_role: "ایس اینڈ ٹی ڈیپارٹمنٹ میں 15 دن کی انٹرن شپ",
    exp_railway_date: "مئی 2024",
    exp_railway_description:
      "ریلوے سگنلنگ کی بنیادی باتوں کے بارے میں بصیرت حاصل کی۔",
    exp_nith_institute: "این آئی ٹی ہمیرپور",
    exp_nith_role: "1 ماہ کی تحقیقی انٹرن شپ",
    exp_nith_date: "جون - جولائی 2025",
    exp_nith_description: "GAN ماڈلز اور ڈیپ لرننگ پر تحقیق کی۔",
    currently_learning_heading: "فی الحال سیکھ رہا ہوں",
    learning_java: "جاوا",
    learning_datastructures: "ڈیٹا سٹرکچرز",
    learning_deep_learning: "ڈیپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "اینٹینا اور ویو پروپیگیشن",
    learning_cuda: "پیرالل کمپیوٹنگ (CUDA)",
    connect_heading: "رابطہ",
  },
  gu: {
    /* Gujarati */ page_title: "પાર્થ સિદ્ધુ - પોર્ટફોલિયો",
    nav_home: "ઘર",
    nav_projects: "પ્રોજેક્ટ્સ",
    nav_connect: "સંપર્ક કરો",
    nav_poems_articles: "કવિતાઓ અને લેખો",
    hero_welcome: "સ્વાગત છે",
    hero_tagline: "ડિજિટલ લૂમમાં સપનાનું વણાટ.",
    profile_name: "પાર્થ સિદ્ધુ",
    profile_tagline: "ECE વિદ્યાર્થી | AI ઉત્સાહી | વાર્તા-આધારિત દેવ",
    about_me_heading: "મારા વિશે",
    about_me_para1:
      "\u0ab6\u0abf\u0aae\u0ab2\u0abe\u0aa8\u0ac0 \u0ab6\u0abe\u0a82\u0aa4 \u0a9f\u0ac7\u0a95\u0ab0\u0ac0\u0a93 \u0a85\u0aa8\u0ac7 \u0aa6\u0ac7\u0ab5\u0aa6\u0abe\u0ab0\u0aa8\u0abe \u0a9c\u0a82\u0a97\u0ab2\u0acb \u0ab5\u0a9a\u0acd\u0a9a\u0ac7 \u0a89\u0a9b\u0ab0\u0acd\u0aaf\u0abe \u0ab9\u0acb\u0ab5\u0abe\u0aa5\u0ac0 \u0aae\u0abe\u0ab0\u0ac0 \u0ab5\u0abf\u0a9a\u0abe\u0ab0\u0ab5\u0abe\u0aa8\u0ac0 \u0ab0\u0ac0\u0aa4 \u0a98\u0aa1\u0abe\u0a88 \u0a9b\u0ac7 \u2014 \u0ab6\u0abe\u0a82\u0aa4 \u0a85\u0ab5\u0ab2\u0acb\u0a95\u0aa8 \u0ab8\u0abe\u0aa5\u0ac7 \u0a9c\u0abf\u0a9c\u0acd\u0a9e\u0abe\u0ab8\u0abe, \u0a85\u0aa8\u0ac7 \u0aae\u0abe\u0ab3\u0a96\u0abe \u0ab8\u0abe\u0aa5\u0ac7 \u0ab8\u0ab0\u0acd\u0a9c\u0aa8\u0abe\u0aa4\u0acd\u0aae\u0a95\u0aa4\u0abe\u0aa8\u0ac7 \u0ab8\u0a82\u0aa4\u0ac1\u0ab2\u0abf\u0aa4 \u0a95\u0ab0\u0ab5\u0ac0.",
    about_me_para2:
      "\u0ab9\u0ac1\u0a82 \u0a97\u0aa4\u0abf \u0ab6\u0a95\u0acd\u0aa4\u0abf \u0ab5\u0abf\u0ab6\u0acd\u0ab5\u0ab5\u0abf\u0aa6\u0acd\u0aaf\u0abe\u0ab2\u0aaf\u0aae\u0abe\u0a82 \u0a88\u0ab2\u0ac7\u0a95\u0acd\u0a9f\u0acd\u0ab0\u0acb\u0aa8\u0abf\u0a95\u0acd\u0ab8 \u0a85\u0aa8\u0ac7 \u0a95\u0acb\u0aae\u0acd\u0aaf\u0ac1\u0aa8\u0abf\u0a95\u0ac7\u0ab6\u0aa8 \u0a8f\u0aa8\u0acd\u0a9c\u0abf\u0aa8\u0abf\u0aaf\u0ab0\u0abf\u0a82\u0a97\u0aa8\u0acb \u0a85\u0a82\u0aa4\u0abf\u0aae \u0ab5\u0ab0\u0acd\u0ab7\u0aa8\u0acb \u0ab5\u0abf\u0aa6\u0acd\u0aaf\u0abe\u0ab0\u0acd\u0aa5\u0ac0 \u0a9b\u0ac1\u0a82, \u0a9c\u0ac7\u0aa8\u0ac7 \u0a88\u0aa8\u0acd\u0a9f\u0ac7\u0ab2\u0abf\u0a9c\u0aa8\u0acd\u0a9f \u0ab8\u0abf\u0ab8\u0acd\u0a9f\u0aae\u0acd\u0ab8, \u0a8f\u0aaa\u0acd\u0ab2\u0abe\u0a88\u0aa1 \u0a8f\u0a86\u0a88, \u0ab8\u0abf\u0aae\u0acd\u0aaf\u0ac1\u0ab2\u0ac7\u0ab6\u0aa8 \u0a85\u0aa8\u0ac7 \u0a95\u0aae\u0acd\u0aaa\u0acd\u0aaf\u0ac1\u0a9f\u0ac7\u0ab6\u0aa8\u0ab2 \u0a8f\u0aa8\u0acd\u0a9c\u0abf\u0aa8\u0abf\u0aaf\u0ab0\u0abf\u0a82\u0a97\u0aae\u0abe\u0a82 \u0ab0\u0ab8 \u0a9b\u0ac7, \u0a85\u0aa8\u0ac7 \u0aae\u0abe\u0ab0\u0ac1\u0a82 \u0aa7\u0acd\u0aaf\u0abe\u0aa8 \u0ab5\u0acd\u0aaf\u0ab5\u0ab9\u0abe\u0ab0\u0ac1 \u0a85\u0aa8\u0ac7 \u0ab5\u0abf\u0a9a\u0abe\u0ab0\u0aaa\u0ac2\u0ab0\u0acd\u0ab5\u0a95 \u0a8f\u0aa8\u0acd\u0a9c\u0abf\u0aa8\u0abf\u0aaf\u0ab0 \u0a95\u0ab0\u0ac7\u0ab2\u0abe \u0a89\u0a95\u0ac7\u0ab2\u0acb \u0aac\u0aa8\u0abe\u0ab5\u0ab5\u0abe \u0aaa\u0ab0 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0\u0abf\u0aa4 \u0a9b\u0ac7.",
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
    skill_ml: "મશીન લર્નિંગ",
    projects_heading: "પ્રોજેક્ટ્સ",
    project_demand_title: "હાઇપરલોકલ ડિમાન્ડ પ્રેડિક્શન",
    project_demand_desc: "ઝડપી અને સચોટ ક્વિક-કોમર્સ ડિમાન્ડ પ્રેડિક્શન માટે હલકી AI પાઇપલાઇન.",
    project_plant_title: "પ્લાન્ટ ડિસીઝ IoT મોનિટર",
    project_plant_desc: "કસ્ટમ 18KB CNN નો ઉપયોગ કરીને છોડના રોગો શોધવા માટે ESP32-CAM પર TinyML પાઇપલાઇન.",
    project_robot_title: "ROS 2 ઓટોનોમસ રોબોટ",
    project_robot_desc: "ROS 2 અને Gazebo માં સ્વાયત્ત રીતે નેવિગેટ કરતો ગાણિતિક રીતે મોડલ કરેલ રોબોટ.",
    project_facevision_title: "ફેસ-વિઝન",
    project_facevision_desc:
      "OpenCV નો ઉપયોગ કરીને છબીઓ અને વિડિઓઝમાં ચહેરાઓ શોધો.",
    project_stardetection_title: "સ્ટાર-ડિટેક્શન",
    project_stardetection_desc: "નાસાના હબલ સંગ્રહમાંથી છબીઓમાં તારાઓ શોધો.",
    view_project_link: "પ્રોજેક્ટ જુઓ",
    project_portfolio_title: "વ્યક્તિગત પોર્ટફોલિયો વેબસાઇટ",
    project_portfolio_desc:
      "એક વાઇબ-કોડેડ વ્યક્તિગત વેબસાઇટ જેમાં પ્રોજેક્ટ્સ, કવિતાઓ અને લેખો પ્રદર્શિત કરવામાં આવ્યા છે, HTML, CSS, અને JavaScript સાથે બનાવેલ છે, જેમાં રિસ્પોન્સિવ ડિઝાઇન અને બહુભાષી સપોર્ટનો સમાવેશ થાય છે.",
    view_project_link: "પ્રોજેક્ટ જુઓ",
    projects_coming_soon: "વધુ પ્રોજેક્ટ્સ જલ્દી આવી રહ્યા છે — જોડાયેલા રહો!",
    experience_heading: "અનુભવ",
    exp_railway_company: "ડીઆરએમ અંબાલા (ઉત્તર રેલવે)",
    exp_railway_role: "એસ એન્ડ ટી વિભાગમાં 15 દિવસની ઇન્ટર્નશિપ",
    exp_railway_date: "મે 2024",
    exp_railway_description:
      "રેલવે સિગ્નલિંગના મૂળભૂત સિદ્ધાંતો વિશે સમજ મેળવી.",
    exp_nith_institute: "એનઆઈટી હમીરપુર",
    exp_nith_role: "1 મહિનાની સંશોધન ઇન્ટર્નશિપ",
    exp_nith_date: "જૂન - જુલાઈ 2025",
    exp_nith_description: "GAN મોડેલ્સ અને ડીપ લર્નિંગ પર સંશોધન કર્યું.",
    currently_learning_heading: "હાલમાં શીખી રહ્યો છું",
    learning_java: "જાવા",
    learning_datastructures: "ડેટા સ્ટ્રક્ચર્સ",
    learning_deep_learning: "ડીપ લર્નિંગ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "એન્ટેના અને વેવ પ્રોપેગેશન",
    learning_cuda: "પેરેલલ કમ્પ્યુટિંગ (CUDA)",
    connect_heading: "જોડાઓ",
  },
  or: {
    /* Odia */ page_title: "ପାର୍ଥ ସିଧୁ - ପୋର୍ଟଫୋଲିଓ",
    nav_home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    nav_projects: "ପ୍ରୋଜେକ୍ଟଗୁଡିକ",
    nav_connect: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    nav_poems_articles: "କବିତା ଏବଂ ପ୍ରବନ୍ଧ",
    hero_welcome: "ସ୍ଵାଗତ",
    hero_tagline: "ଡିଜିଟାଲ୍ ଲୁମ୍ ରେ ସ୍ୱପ୍ନର ବୁଣା।",
    profile_name: "ପାର୍ଥ ସିଧୁ",
    profile_tagline:
      "ECE ଛାତ୍ର | AI ଓ ସଫ୍ଟୱେର୍ ଦେବ ଉତ୍ସାହୀ | ସିନେମାଟିକ୍ ମାନସିକତା",
    about_me_heading: "ମୋ ବିଷୟରେ",
    about_me_para1:
      "\u0b36\u0b3f\u0b2e\u0b32\u0b3e\u0b30 \u0b36\u0b3e\u0b28\u0b4d\u0b24 \u0b2a\u0b3e\u0b39\u0b3e\u0b21 \u0b0f\u0b2c\u0b02 \u0b26\u0b47\u0b13\u0b26\u0b3e\u0b30 \u0b1c\u0b19\u0b4d\u0b17\u0b32 \u0b2e\u0b27\u0b4d\u0b5f\u0b30\u0b47 \u0b2c\u0b22\u0b3f\u0b2c\u0b3e \u0b2e\u0b4b\u0b30 \u0b1a\u0b3f\u0b28\u0b4d\u0b24\u0b3e\u0b27\u0b3e\u0b30\u0b3e\u0b15\u0b41 \u0b06\u0b15\u0b3e\u0b30 \u0b26\u0b47\u0b07\u0b1b\u0b3f - \u0b36\u0b3e\u0b28\u0b4d\u0b24 \u0b2a\u0b30\u0b4d\u0b2f\u0b4d\u0b5f\u0b2c\u0b47\u0b15\u0b4d\u0b37\u0b23 \u0b38\u0b39\u0b3f\u0b24 \u0b15\u0b4c\u0b24\u0b41\u0b39\u0b33, \u0b0f\u0b2c\u0b02 \u0b38\u0b02\u0b30\u0b1a\u0b28\u0b3e \u0b38\u0b39\u0b3f\u0b24 \u0b38\u0b43\u0b1c\u0b28\u0b36\u0b40\u0b33\u0b24\u0b3e\u0b15\u0b41 \u0b38\u0b28\u0b4d\u0b24\u0b41\u0b33\u0b3f\u0b24 \u0b15\u0b30\u0b3f\u0b2c\u0b3e |",
    about_me_para2:
      "\u0b2e\u0b41\u0b01 \u0b17\u0b24\u0b3f \u0b36\u0b15\u0b4d\u0b24\u0b3f \u0b2c\u0b3f\u0b36\u0b4d\u0b71\u0b2c\u0b3f\u0b26\u0b4d\u0b5f\u0b3e\u0b33\u0b5f\u0b30\u0b47 \u0b07\u0b32\u0b47\u0b15\u0b4d\u0b1f\u0b4d\u0b30\u0b4b\u0b28\u0b3f\u0b15\u0b4d\u0b38 \u0b0f\u0b2c\u0b02 \u0b15\u0b2e\u0b4d\u0b5f\u0b41\u0b28\u0b3f\u0b15\u0b47\u0b38\u0b28\u0b4d \u0b07\u0b1e\u0b4d\u0b1c\u0b3f\u0b28\u0b3f\u0b5f\u0b30\u0b3f\u0b02\u0b30 \u0b36\u0b47\u0b37 \u0b2c\u0b30\u0b4d\u0b37\u0b30 \u0b1b\u0b3e\u0b24\u0b4d\u0b30, \u0b07\u0b23\u0b4d\u0b1f\u0b47\u0b32\u0b3f\u0b1c\u0b47\u0b23\u0b4d\u0b1f \u0b38\u0b3f\u0b37\u0b4d\u0b1f\u0b2e\u0b4d, \u0b06\u0b2a\u0b4d\u0b32\u0b3e\u0b0f\u0b21\u0b4d \u0b0f\u0b06\u0b07, \u0b38\u0b3f\u0b2e\u0b41\u0b32\u0b47\u0b38\u0b28\u0b4d \u0b0f\u0b2c\u0b02 \u0b15\u0b2e\u0b4d\u0b2a\u0b4d\u0b5f\u0b41\u0b1f\u0b47\u0b38\u0b28\u0b3e\u0b32\u0b4d \u0b07\u0b1e\u0b4d\u0b1c\u0b3f\u0b28\u0b3f\u0b5f\u0b30\u0b3f\u0b02\u0b30\u0b47 \u0b06\u0b17\u0b4d\u0b30\u0b39\u0b40, \u0b2c\u0b4d\u0b5f\u0b2c\u0b39\u0b3e\u0b30\u0b3f\u0b15 \u0b0f\u0b2c\u0b02 \u0b1a\u0b3f\u0b28\u0b4d\u0b24\u0b3e\u0b2e\u0b42\u0b33\u0b15 \u0b38\u0b2e\u0b3e\u0b27\u0b3e\u0b28 \u0b28\u0b3f\u0b30\u0b4d\u0b2e\u0b3e\u0b23 \u0b09\u0b2a\u0b30\u0b47 \u0b27\u0b4d\u0b5f\u0b3e\u0b28 \u0b26\u0b47\u0b07\u0b25\u0b3e\u0b0f |",
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
    skill_ml: "ମେସିନ୍ ଲର୍ଣ୍ଣିଂ",
    projects_heading: "ପ୍ରୋଜେକ୍ଟଗୁଡିକ",
    project_demand_title: "ହାଇପରଲୋକାଲ୍ ଡିମାଣ୍ଡ୍ ପ୍ରେଡିକ୍ସନ୍",
    project_demand_desc: "ଦ୍ରୁତ ଏବଂ ସଠିକ୍ କୁଇକ୍-କମର୍ସ ଡିମାଣ୍ଡ ପ୍ରେଡିକ୍ସନ୍ ପାଇଁ ଏକ ହାଲୁକା AI ପାଇପଲାଇନ୍ |",
    project_plant_title: "ପ୍ଲାଣ୍ଟ ଡିଜିଜ୍ IoT ମନିଟର୍",
    project_plant_desc: "କଷ୍ଟମ୍ 18KB CNN ବ୍ୟବହାର କରି ଉଦ୍ଭିଦ ରୋଗ ଚିହ୍ନଟ କରୁଥିବା ESP32-CAM ରେ ଏକ TinyML ପାଇପଲାଇନ୍ |",
    project_robot_title: "ROS 2 ଅଟୋନୋମସ୍ ରୋବଟ୍",
    project_robot_desc: "ROS 2 ଏବଂ Gazebo ରେ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ନେଭିଗେଟ୍ କରୁଥିବା ଏକ ଗାଣିତିକ ରୋବଟ୍ |",
    project_facevision_title: "ଫେସ୍-ଭିଜନ୍",
    project_facevision_desc:
      "OpenCV ବ୍ୟବହାର କରି ଚିତ୍ର ଏବଂ ଭିଡିଓରେ ଚେହେରା ଚିହ୍ନଟ କରନ୍ତୁ।",
    project_stardetection_title: "ଷ୍ଟାର୍-ଡିଟେକ୍ସନ୍",
    project_stardetection_desc:
      "NASA ର ହବଲ୍ ସଂଗ୍ରହରୁ ଚିତ୍ରରେ ଥିବା ତାରା ଚିହ୍ନଟ କରନ୍ତୁ।",
    view_project_link: "ପ୍ରୋଜେକ୍ଟ ଦେଖନ୍ତୁ",
    project_portfolio_title: "ବ୍ୟକ୍ତିଗତ ପୋର୍ଟଫୋଲିଓ ୱେବସାଇଟ୍",
    project_portfolio_desc:
      "ଏକ ଭାଇବ୍-କୋଡେଡ୍ ବ୍ୟକ୍ତିଗତ ୱେବସାଇଟ୍ ଯାହା ପ୍ରୋଜେକ୍ଟ, କବିତା, ଏବଂ ପ୍ରବନ୍ଧ ପ୍ରଦର୍ଶିତ କରେ, HTML, CSS, ଏବଂ JavaScript ସହିତ ନିର୍ମିତ, ଯେଉଁଥିରେ ରେସପନ୍ସିଭ୍ ଡିଜାଇନ୍ ଏବଂ ବହୁଭାଷୀ ସମର୍ଥନ ଅନ୍ତର୍ଭୁକ୍ତ।",
    view_project_link: "ପ୍ରୋଜେକ୍ଟ ଦେଖନ୍ତୁ",
    projects_coming_soon: "ଅଧିକ ପ୍ରୋଜେକ୍ଟ ଶୀଘ୍ର ଆସୁଛି — ଯୋଡି ହୋଇ ରୁହନ୍ତୁ!",
    experience_heading: "ଅନୁଭବ",
    exp_railway_company: "ଡିଆରଏମ୍ ଅମ୍ବାଲା (ଉତ୍ତର ରେଳବାଇ)",
    exp_railway_role: "ଏସ ଆଣ୍ଡ ଟି ବିଭାଗରେ ୧୫ ଦିନର ଇଣ୍ଟର୍ନସିପ୍",
    exp_railway_date: "ମେ 2024",
    exp_railway_description: "ରେଳବାଇ ସିଗନାଲିଂ ମୌଳିକ ବିଷୟରେ ଜ୍ଞାନ ଆହରଣ କଲା।",
    exp_nith_institute: "ଏନଆଇଟି ହମିରପୁର",
    exp_nith_role: "୧ ମାସର ଗବେଷଣା ଇଣ୍ଟର୍ନସିପ୍",
    exp_nith_date: "ଜୁନ - ଜୁଲାଇ 2025",
    exp_nith_description: "GAN ମଡେଲ୍ ଏବଂ ଡିପ୍ ଲର୍ନିଂ ଉପରେ ଗବେଷଣା କଲା।",
    currently_learning_heading: "ବର୍ତ୍ତମାନ ଶିଖୁଛି",
    learning_java: "ଜାଭା",
    learning_datastructures: "ଡାଟା ଷ୍ଟ୍ରକ୍ଚର",
    learning_deep_learning: "ଡିପ୍ ଲର୍ନିଂ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "ଆଣ୍ଟେନା ଏବଂ ୱେଭ୍ ପ୍ରୋପେଗେସନ୍",
    learning_cuda: "ପାରାଲାଲ୍ କମ୍ପ୍ୟୁଟିଂ (CUDA)",
    connect_heading: "ସଂଯୋଗ",
  },
   bj: {
    page_title: "पार्थ सिद्धू - पोर्टफोलियो",
    nav_home: "घर",
    nav_projects: "परियोजना",
    nav_connect: "जोड़े",
    nav_poems_articles: "कविता आ लेख",
    hero_welcome: "स्वागत बा",
    hero_tagline: "डिजिटल करघा में सपना बुनत बानी.",
    profile_name: "पार्थ सिद्धू",
    profile_tagline:
      "ईसीई के छात्र | एआई आ सॉफ्टवेयर डेव उत्साही | सिनेमाई मानसिकता",
    about_me_heading: "मोहरा के बारे में",
    about_me_para1:
      "\u0936\u093f\u092e\u0932\u093e \u0915\u0947 \u0936\u093e\u0902\u0924 \u092a\u0939\u093e\u0921\u093c\u0940 \u0906 \u0926\u0947\u0935\u0926\u093e\u0930 \u0915\u0947 \u091c\u0902\u0917\u0932 \u0915\u0947 \u092c\u0940\u091a \u092a\u0932\u0947-\u092c\u0922\u093c\u0947 \u0938\u0947 \u0939\u092e\u093e\u0930 \u0938\u094b\u091a\u0947 \u0915\u0947 \u0924\u0930\u0940\u0915\u093e \u0915\u0947 \u0906\u0915\u093e\u0930 \u092e\u093f\u0932\u0932 \u092c\u093e \u2014 \u0936\u093e\u0902\u0924 \u0905\u0935\u0932\u094b\u0915\u0928 \u0915\u0947 \u0938\u093e\u0925\u0947 \u091c\u093f\u091c\u094d\u091e\u093e\u0938\u093e, \u0906 \u0938\u0902\u0930\u091a\u0928\u093e \u0915\u0947 \u0938\u093e\u0925\u0947 \u0930\u091a\u0928\u093e\u0924\u094d\u092e\u0915\u0924\u093e \u0915\u0947 \u0938\u0902\u0924\u0941\u0932\u093f\u0924 \u0915\u0907\u0932\u0964",
    about_me_para2:
      "\u0939\u092e \u0917\u0924\u093f \u0936\u0915\u094d\u0924\u093f \u0935\u093f\u0936\u094d\u0935\u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u092e\u0947\u0902 \u0907\u0932\u0947\u0915\u094d\u091f\u094d\u0930\u0949\u0928\u093f\u0915\u094d\u0938 \u0906 \u0938\u0902\u091a\u093e\u0930 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u0915\u0947 \u0905\u0902\u0924\u093f\u092e \u0935\u0930\u094d\u0937 \u0915\u0947 \u091b\u093e\u0924\u094d\u0930 \u092c\u093e\u0928\u0940, \u091c\u0947\u0915\u0930 \u0930\u0941\u091a\u093f \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u093e\u0928 \u092a\u094d\u0930\u0923\u093e\u0932\u0940, \u090f\u092a\u094d\u0932\u093e\u0907\u0921 \u090f\u0906\u0908, \u0938\u093f\u092e\u0941\u0932\u0947\u0936\u0928 \u0906 \u0915\u092e\u094d\u092a\u094d\u092f\u0942\u091f\u0947\u0936\u0928\u0932 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u092e\u0947\u0902 \u092c\u093e, \u0906 \u0939\u092e\u093e\u0930 \u0927\u094d\u092f\u093e\u0928 \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0906 \u0935\u093f\u091a\u093e\u0930\u0936\u0940\u0932 \u0907\u0902\u091c\u0940\u0928\u093f\u092f\u0930\u093f\u0902\u0917 \u0938\u092e\u093e\u0927\u093e\u0928 \u092c\u0928\u093e\u0935\u0947 \u092a\u0930 \u0915\u0947\u0902\u0926\u094d\u0930\u093f\u0924 \u092c\u093e\u0964",
    education_heading: "शिक्षा",
    edu_gsv_degree: "इलेक्ट्रॉनिक्स आ संचार इंजीनियरिंग (ईसीई) में बी. टेक",
    edu_gsv_institute: "गति शक्ति विश्वविद्यालय, वडोदरा",
    edu_iitm_degree: "बैचलर ऑफ साइंस (फाउंडेशन प्रोग्राम)",
    edu_iitm_institute: "भारतीय प्रौद्योगिकी संस्थान (आईआईटी) मद्रास",
    edu_shc_degree: "कक्षा 12 (पीसीएम)",
    edu_shc_institute: "सेक्रेड हार्ट कॉन्वेंट, फ्लेउर-डी-लिस, ढाली, शिमला",
    hobbies_heading: "शौक",
    hobbies_text:
      "गायन, कविता, पढ़ल आ चित्रकारी — अइसन तरीका जेह में हम टेक से आगे खुद के व्यक्त करेनीं.",
    skills_heading: "कौशल",
    skill_cpp: "सी++",
    skill_python: "पायथन",
    skill_java_basic: "बेसिक जावा",
    skill_ubuntu: "उबंटू",
    skill_git: "गिट",
    skill_ml: "मशीन लर्निंग",
    projects_heading: "परियोजना",
    project_demand_title: "हाइपरलोकल डिमांड प्रेडिक्शन",
    project_demand_desc: "तेज आउर सटीक क्विक-कॉमर्स डिमांड प्रेडिक्शन खातिर एगो हल्का AI पाइपलाइन।",
    project_plant_title: "प्लांट डिसीज IoT मॉनिटर",
    project_plant_desc: "कस्टम 18KB CNN के उपयोग क के पौधा के बीमारी के पता लगावे वाला ESP32-CAM पर एगो TinyML पाइपलाइन।",
    project_robot_title: "ROS 2 ऑटोनॉमस रोबोट",
    project_robot_desc: "ROS 2 आउर Gazebo में स्वायत्त रूप से नेविगेट करे वाला गणितीय रोबोट।",
    project_facevision_title: "फेस-विजन",
    project_facevision_desc:
      "ओपनसीवी के इस्तेमाल से फोटो आ वीडियो में चेहरा के पता लगाईं.",
    project_stardetection_title: "स्टार-डिटेक्शन",
    project_stardetection_desc:
      "नासा के हबल संग्रह से फोटो में तारा के पता लगाईं.",
    view_project_link: "परियोजना देखीं",
    project_portfolio_title: "व्यक्तिगत पोर्टफोलियो वेबसाइट",
    project_portfolio_desc:
      "एकटा वाइब - एचटीएमएल, सीएसएस, आ जावास्क्रिप्ट के साथ बनल व्यक्तिगत वेबसाइट जवन परियोजना, कविता आ लेख देखावेला, जेकरा में उत्तरदायी डिजाइन आ बहु-भाषा समर्थन बा.",
    projects_coming_soon: "आउर परियोजना जल्दीए आ रहल बा — बनल रहीं!",
    experience_heading: "अनुभव",
    exp_railway_company: "डीआरएम अंबाला (उत्तर रेलवे)",
    exp_railway_role: "एस एंड टी विभाग में 15 दिन के इंटर्नशिप",
    exp_railway_date: "मई 2024",
    exp_railway_description:
      "रेलवे सिग्नलिंग के मूल बात के बारे में जानकारी मिलल.",
    exp_nith_institute: "एनआईटी हमीरपुर",
    exp_nith_role: "1 महीना के रिसर्च इंटर्नशिप",
    exp_nith_date: "जून - जुलाई 2025",
    exp_nith_description: "GAN मॉडल आ डीप लर्निंग पर रिसर्च कइल गइल.",
    currently_learning_heading: "फिलहाल सीखत बानी",
    learning_java: "जावा",
    learning_datastructures: "डेटा संरचना",
    learning_deep_learning: "डीप लर्निंग",
    learning_gans: "GANs",
    learning_awp: "एंटीना आउर वेव प्रोपेगेशन",
    learning_cuda: "पैरेलल कंप्यूटिंग (CUDA)",
    connect_heading: "जोड़े",
  },
  bn: {
    /* Bengali */ page_title: "পার্থ সিধু - পোর্টফোলিও",
    nav_home: "হোম",
    nav_projects: "প্রকল্প",
    nav_connect: "যোগাযোগ",
    nav_poems_articles: "কবিতা এবং প্রবন্ধ",
    hero_welcome: "স্বাগতম",
    hero_tagline: "ডিজিটাল তাঁতে স্বপ্ন বুনন।",
    profile_name: "পার্থ সিধু",
    profile_tagline: "ইসিই ছাত্র | এআই উৎসাহী | গল্প-চালিত দেব",
    about_me_heading: "আমার সম্পর্কে",
    about_me_para1:
      "\u09b6\u09bf\u09ae\u09b2\u09be\u09b0 \u09b6\u09be\u09a8\u09cd\u09a4 \u09aa\u09be\u09b9\u09be\u09a1\u09bc \u098f\u09ac\u0982 \u09a6\u09c7\u0993\u09a6\u09be\u09b0 \u09ac\u09a8\u09c7\u09b0 \u09ae\u09be\u099d\u09c7 \u09ac\u09c7\u09a1\u09bc\u09c7 \u0993\u09a0\u09be \u0986\u09ae\u09be\u09b0 \u099a\u09bf\u09a8\u09cd\u09a4\u09be\u09ad\u09be\u09ac\u09a8\u09be\u09b0 \u09a7\u09b0\u09a8\u0995\u09c7 \u09b0\u09c2\u09aa \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09c7 \u2014 \u09b6\u09be\u09a8\u09cd\u09a4 \u09aa\u09b0\u09cd\u09af\u09ac\u09c7\u0995\u09cd\u09b7\u09a3\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u0995\u09cc\u09a4\u09c2\u09b9\u09b2, \u098f\u09ac\u0982 \u0995\u09be\u09a0\u09be\u09ae\u09cb\u09b0 \u09b8\u09be\u09a5\u09c7 \u09b8\u09c3\u099c\u09a8\u09b6\u09c0\u09b2\u09a4\u09be\u09b0 \u09ad\u09be\u09b0\u09b8\u09be\u09ae\u09cd\u09af \u09ac\u099c\u09be\u09af\u09bc \u09b0\u09be\u0996\u09be\u0964",
    about_me_para2:
      "\u0986\u09ae\u09bf \u0997\u09a4\u09bf \u09b6\u0995\u09cd\u09a4\u09bf \u09ac\u09bf\u09b6\u09cd\u09ac\u09ac\u09bf\u09a6\u09cd\u09af\u09be\u09b2\u09af\u09bc\u09c7\u09b0 \u0987\u09b2\u09c7\u0995\u099f\u09cd\u09b0\u09a8\u09bf\u0995\u09cd\u09b8 \u098f\u09ac\u0982 \u0995\u09ae\u09bf\u0989\u09a8\u09bf\u0995\u09c7\u09b6\u09a8 \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09af\u09bc\u09be\u09b0\u09bf\u0982\u09af\u09bc\u09c7\u09b0 \u099a\u09c2\u09a1\u09bc\u09be\u09a8\u09cd\u09a4 \u09ac\u09b0\u09cd\u09b7\u09c7\u09b0 \u099b\u09be\u09a4\u09cd\u09b0, \u0987\u09a8\u09cd\u099f\u09c7\u09b2\u09bf\u099c\u09c7\u09a8\u09cd\u099f \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae, \u0985\u09cd\u09af\u09be\u09aa\u09cd\u09b2\u09be\u09af\u09bc\u09c7\u09a1 \u098f\u0986\u0987, \u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u09b6\u09a8 \u098f\u09ac\u0982 \u0995\u09ae\u09cd\u09aa\u09bf\u0989\u099f\u09c7\u09b6\u09a8\u09be\u09b2 \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09af\u09bc\u09be\u09b0\u09bf\u0982\u09af\u09bc\u09c7 \u0986\u0997\u09cd\u09b0\u09b9\u09c0, \u098f\u09ac\u0982 \u0986\u09ae\u09be\u09b0 \u09b2\u0995\u09cd\u09b7\u09cd\u09af \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0\u09bf\u0995 \u098f\u09ac\u0982 \u099a\u09bf\u09a8\u09cd\u09a4\u09be\u09b6\u09c0\u09b2 \u0987\u099e\u09cd\u099c\u09bf\u09a8\u09bf\u09af\u09bc\u09be\u09b0\u09bf\u0982 \u09b8\u09ae\u09be\u09a7\u09be\u09a8 \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09be\u0964",
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
    skill_ml: "মেশিন লার্নিং",
    projects_heading: "প্রকল্প",
    project_demand_title: "হাইপারলোকাল ডিমান্ড প্রেডিকশন",
    project_demand_desc: "দ্রুত এবং নির্ভুল কুইক-কমার্স ডিমান্ড প্রেডিকশনের জন্য একটি হালকা AI পাইপলাইন।",
    project_plant_title: "প্ল্যান্ট ডিজিজ IoT মনিটর",
    project_plant_desc: "কাস্টম 18KB CNN ব্যবহার করে উদ্ভিদের রোগ শনাক্ত করার জন্য ESP32-CAM-এ একটি TinyML পাইপলাইন।",
    project_robot_title: "ROS 2 অটোনোমাস রোবট",
    project_robot_desc: "ROS 2 এবং Gazebo তে স্বয়ংক্রিয়ভাবে নেভিগেট করা একটি গাণিতিক রোবট।",
    project_facevision_title: "ফেস-ভিশন",
    project_facevision_desc:
      "ওপেনসিভি ব্যবহার করে ছবি এবং ভিডিওতে মুখ সনাক্ত করুন।",
    project_stardetection_title: "স্টার-ডিটেকশন",
    project_stardetection_desc:
      "নাসার হাবল সংগ্রহ থেকে ছবিতে তারা সনাক্ত করুন।",
    view_project_link: "প্রকল্প দেখুন",
    project_portfolio_title: "ব্যক্তিগত পোর্টফোলিও ওয়েবসাইট",
    project_portfolio_desc:
      "একটি ভাইব-কোডেড ব্যক্তিগত ওয়েবসাইট যা প্রোজেক্ট, কবিতা এবং প্রবন্ধ প্রদর্শন করে, HTML, CSS, এবং জাভাস্ক্রিপ্ট দিয়ে নির্মিত, প্রতিক্রিয়াশীল ডিজাইন এবং বহু-ভাষা সমর্থন বৈশিষ্ট্যযুক্ত।",
    view_project_link: "প্রোজেক্ট দেখুন",
    projects_coming_soon: "আরও প্রকল্প শীঘ্রই আসছে — সাথে থাকুন!",
    experience_heading: "অভিজ্ঞতা",
    exp_railway_company: "ডিআরএম আম্বালা (নর্দার্ন রেলওয়ে)",
    exp_railway_role: "এস অ্যান্ড টি বিভাগে ১৫ দিনের ইন্টার্নশিপ",
    exp_railway_date: "মে 2024",
    exp_railway_description:
      "রেলওয়ে সিগনালিং এর মৌলিক বিষয়াবলী সম্পর্কে ধারণা লাভ করেছে।",
    exp_nith_institute: "এনআইটি হামিরপুর",
    exp_nith_role: "১ মাসের গবেষণা ইন্টার্নশিপ",
    exp_nith_date: "জুন - জুলাই 2025",
    exp_nith_description: "GAN মডেল এবং ডিপ লার্নিং নিয়ে গবেষণা করেছে।",
    currently_learning_heading: "বর্তমানে শিখছি",
    learning_java: "জাভা",
    learning_datastructures: "ডেটা স্ট্রাকচার্স",
    learning_deep_learning: "ডিপ লার্নিং",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "অ্যান্টেনা এবং ওয়েভ প্রোপাগেশন",
    learning_cuda: "প্যারালাল কম্পিউটিং (CUDA)",
    connect_heading: "যোগাযোগ",
  },
  mr: {
    /* Marathi */ page_title: "पार्थ सिधु - पोर्टफोलिओ",
    nav_home: "मुख्यपृष्ठ",
    nav_projects: "प्रकल्प",
    nav_connect: "संपर्क साधा",
    nav_poems_articles: "कविता आणि लेख",
    hero_welcome: "स्वागत आहे",
    hero_tagline: "डिजिटल मागावर स्वप्नांची विणकाम.",
    profile_name: "पार्थ सिधु",
    profile_tagline: "ईसीई विद्यार्थी | एआय उत्साही | कथा-प्रेरित देव",
    about_me_heading: "माझ्याबद्दल",
    about_me_para1:
      "\u0936\u093f\u092e\u0932\u093e\u091a\u094d\u092f\u093e \u0936\u093e\u0902\u0924 \u091f\u0947\u0915\u0921\u094d\u092f\u093e \u0906\u0923\u093f \u0926\u0947\u0935\u0926\u093e\u0930\u091a\u094d\u092f\u093e \u091c\u0902\u0917\u0932\u093e\u0902\u092e\u0927\u094d\u092f\u0947 \u0935\u093e\u0922\u0932\u094d\u092f\u093e\u0928\u0947 \u092e\u093e\u091d\u094d\u092f\u093e \u0935\u093f\u091a\u093e\u0930 \u0915\u0930\u0923\u094d\u092f\u093e\u091a\u094d\u092f\u093e \u092a\u0926\u094d\u0927\u0924\u0940\u0932\u093e \u0906\u0915\u093e\u0930 \u092e\u093f\u0933\u093e\u0932\u093e \u0906\u0939\u0947 \u2014 \u0936\u093e\u0902\u0924 \u0928\u093f\u0930\u0940\u0915\u094d\u0937\u0923\u093e\u0938\u0939 \u0915\u0941\u0924\u0942\u0939\u0932 \u0906\u0923\u093f \u0938\u0902\u0930\u091a\u0928\u0947\u0938\u0939 \u0938\u0930\u094d\u091c\u0928\u0936\u0940\u0932\u0924\u093e \u092f\u093e\u0902\u091a\u093e \u0938\u092e\u0924\u094b\u0932 \u0938\u093e\u0927\u0923\u0947.",
    about_me_para2:
      "\u092e\u0940 \u0917\u0924\u0940 \u0936\u0915\u094d\u0924\u0940 \u0935\u093f\u0936\u094d\u0935\u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f\u093e\u092e\u0927\u094d\u092f\u0947 \u0907\u0932\u0947\u0915\u094d\u091f\u094d\u0930\u0949\u0928\u093f\u0915\u094d\u0938 \u0906\u0923\u093f \u0915\u092e\u094d\u092f\u0941\u0928\u093f\u0915\u0947\u0936\u0928 \u0907\u0902\u091c\u093f\u0928\u093f\u0905\u0930\u093f\u0902\u0917\u091a\u093e \u0905\u0902\u0924\u093f\u092e \u0935\u0930\u094d\u0937\u093e\u091a\u093e \u0935\u093f\u0926\u094d\u092f\u093e\u0930\u094d\u0925\u0940 \u0906\u0939\u0947, \u092e\u0932\u093e \u0907\u0902\u091f\u0947\u0932\u093f\u091c\u0902\u091f \u0938\u093f\u0938\u094d\u091f\u0940\u092e\u094d\u0938, \u0905\u092a\u094d\u0932\u093e\u0907\u0921 \u090f\u0906\u092f, \u0938\u093f\u092e\u094d\u092f\u0941\u0932\u0947\u0936\u0928 \u0906\u0923\u093f \u0915\u0949\u092e\u094d\u092a\u094d\u092f\u0941\u091f\u0947\u0936\u0928\u0932 \u0907\u0902\u091c\u093f\u0928\u093f\u0905\u0930\u093f\u0902\u0917\u092e\u0927\u094d\u092f\u0947 \u0930\u0938 \u0906\u0939\u0947 \u0906\u0923\u093f \u0935\u094d\u092f\u093e\u0935\u0939\u093e\u0930\u093f\u0915 \u0906\u0923\u093f \u0935\u093f\u091a\u093e\u0930\u092a\u0942\u0930\u094d\u0935\u0915 \u0907\u0902\u091c\u093f\u0928\u093f\u0905\u0930 \u0915\u0947\u0932\u0947\u0932\u0947 \u0909\u092a\u093e\u092f \u0924\u092f\u093e\u0930 \u0915\u0930\u0923\u094d\u092f\u093e\u0935\u0930 \u092e\u093e\u091d\u0947 \u0932\u0915\u094d\u0937 \u0915\u0947\u0902\u0926\u094d\u0930\u093f\u0924 \u0906\u0939\u0947.",
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
    skill_ml: "मशीन लर्निंग",
    projects_heading: "प्रकल्प",
    project_demand_title: "हायपरलोकल डिमांड प्रेडिक्शन",
    project_demand_desc: "जलद आणि अचूक क्विक-कॉमर्स डिमांड प्रेडिक्शनसाठी एक हलकी AI पाईपलाईन.",
    project_plant_title: "प्लांट डिसीज IoT मॉनिटर",
    project_plant_desc: "कस्टम 18KB CNN चा वापर करून झाडांचे रोग शोधणारी ESP32-CAM वरील TinyML पाईपलाईन.",
    project_robot_title: "ROS 2 ऑटोनॉमस रोबोट",
    project_robot_desc: "ROS 2 आणि Gazebo मध्ये स्वायत्तपणे नेव्हिगेट करणारा गणितीय मॉडेल केलेला रोबोट.",
    project_facevision_title: "फेस-व्हिजन",
    project_facevision_desc:
      "ओपनसीव्ही वापरून प्रतिमा आणि व्हिडिओमधील चेहरे शोधा.",
    project_stardetection_title: "स्टार-डिटेक्शन",
    project_stardetection_desc:
      "नासाच्या हबल संग्रहातील प्रतिमांमधून तारे शोधा.",
    view_project_link: "प्रकल्प पहा",
    project_portfolio_title: "वैयक्तिक पोर्टफोलिओ वेबसाइट",
    project_portfolio_desc:
      "एक 'व्हाइब-कोडेड' वैयक्तिक वेबसाइट जी प्रकल्प, कविता आणि लेख प्रदर्शित करते, HTML, CSS आणि JavaScript वापरून तयार केली आहे, ज्यात प्रतिसाद देणारा डिझाइन आणि बहु-भाषा समर्थन समाविष्ट आहे.",
    view_project_link: "प्रकल्प पहा",
    projects_coming_soon: "अधिक प्रकल्प लवकरच येत आहेत — संपर्कात रहा!",
    experience_heading: "अनुभव",
    exp_railway_company: "डीआरएम अंबाला (उत्तर रेल्वे)",
    exp_railway_role: "एस अँड टी विभागात 15 दिवसांची इंटर्नशिप",
    exp_railway_date: "मे 2024",
    exp_railway_description:
      "रेल्वे सिग्नलिंगच्या मूलभूत गोष्टींची माहिती मिळाली.",
    exp_nith_institute: "एनआयटी हमीरपूर",
    exp_nith_role: "1 महिन्याची संशोधन इंटर्नशिप",
    exp_nith_date: "जून - जुलै 2025",
    exp_nith_description: "GAN मॉडेल्स आणि डीप लर्निंगवर संशोधन केले.",
    currently_learning_heading: "सध्या शिकत आहे",
    learning_java: "जावा",
    learning_datastructures: "डेटा स्ट्रक्चर्स",
    learning_deep_learning: "डीप लर्निंग",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "अँटेना आणि वेव्ह प्रोपेगेशन",
    learning_cuda: "पॅरलल कॉम्प्युटिंग (CUDA)",
    connect_heading: "जोडा",
  },
  ta: {
    /* Tamil */ page_title: "பார்த்த் சித்து - போர்ட்ஃபோலியோ",
    nav_home: "முகப்பு",
    nav_projects: "திட்டங்கள்",
    nav_connect: "தொடர்பு",
    nav_poems_articles: "கவிதைகள் மற்றும் கட்டுரைகள்",
    hero_welcome: "வரவேற்பு",
    hero_tagline: "டிஜிட்டல் தறியில் கனவுகளை நெய்தல்.",
    profile_name: "பார்த்த் சித்து",
    profile_tagline:
      "ECE மாணவர் | AI & மென்பொருள் உருவாக்குநர் ஆர்வலர் | சினிமா மனப்பான்மை",
    about_me_heading: "என்னை பற்றி",
    about_me_para1:
      "\u0b9a\u0bbf\u0bae\u0bcd\u0bb2\u0bbe\u0bb5\u0bbf\u0ba9\u0bcd \u0b85\u0bae\u0bc8\u0ba4\u0bbf\u0baf\u0bbe\u0ba9 \u0bae\u0bb2\u0bc8\u0b95\u0bb3\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0ba4\u0bbf\u0baf\u0bcb\u0b9f\u0bb0\u0bcd \u0b95\u0bbe\u0b9f\u0bc1\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0bae\u0ba4\u0bcd\u0ba4\u0bbf\u0baf\u0bbf\u0bb2\u0bcd \u0bb5\u0bb3\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4\u0ba4\u0bc1 \u0ba8\u0bbe\u0ba9\u0bcd \u0b9a\u0bbf\u0ba8\u0bcd\u0ba4\u0bbf\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0bb5\u0bbf\u0ba4\u0ba4\u0bcd\u0ba4\u0bc8 \u0bb5\u0b9f\u0bbf\u0bb5\u0bae\u0bc8\u0ba4\u0bcd\u0ba4\u0bc1\u0bb3\u0bcd\u0bb3\u0ba4\u0bc1 - \u0b85\u0bae\u0bc8\u0ba4\u0bbf\u0baf\u0bbe\u0ba9 \u0b95\u0bb5\u0ba9\u0bbf\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0ba9\u0bcd \u0b86\u0bb0\u0bcd\u0bb5\u0ba4\u0bcd\u0ba4\u0bc8\u0baf\u0bc1\u0bae\u0bcd, \u0b95\u0b9f\u0bcd\u0b9f\u0bae\u0bc8\u0baa\u0bcd\u0baa\u0bc1\u0b9f\u0ba9\u0bcd \u0baa\u0b9f\u0bc8\u0baa\u0bcd\u0baa\u0bbe\u0bb1\u0bcd\u0bb1\u0bb2\u0bc8\u0baf\u0bc1\u0bae\u0bcd \u0b9a\u0bae\u0ba8\u0bbf\u0bb2\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1.",
    about_me_para2:
      "\u0ba8\u0bbe\u0ba9\u0bcd \u0b95\u0ba4\u0bbf \u0b9a\u0b95\u0bcd\u0ba4\u0bbf \u0bb5\u0bbf\u0bb8\u0bcd\u0bb5\u0bb5\u0bbf\u0ba4\u0bcd\u0baf\u0bbe\u0bb2\u0baf\u0bbe\u0bb5\u0bbf\u0bb2\u0bcd \u0b8e\u0bb2\u0b95\u0bcd\u0b9f\u0bcd\u0bb0\u0bbe\u0ba9\u0bbf\u0b95\u0bcd\u0bb8\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b95\u0bae\u0bcd\u0baf\u0bc2\u0ba9\u0bbf\u0b95\u0bc7\u0bb7\u0ba9\u0bcd \u0b87\u0ba9\u0bcd\u0b9c\u0bbf\u0ba9\u0bbf\u0baf\u0bb0\u0bbf\u0b99\u0bcd \u0b87\u0bb1\u0bc1\u0ba4\u0bbf\u0baf\u0bbe\u0ba3\u0bcd\u0b9f\u0bc1 \u0bae\u0bbe\u0ba3\u0bb5\u0ba9\u0bcd. \u0ba8\u0bc1\u0ba3\u0bcd\u0ba3\u0bb1\u0bbf\u0bb5\u0bc1 \u0b85\u0bae\u0bc8\u0baa\u0bcd\u0baa\u0bc1\u0b95\u0bb3\u0bcd, \u0b85\u0baa\u0bcd\u0bb3\u0bc8\u0b9f\u0bc1 AI, \u0b89\u0bb0\u0bc1\u0bb5\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0ba4\u0bb2\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc0\u0b9f\u0bcd\u0b9f\u0bc1 \u0baa\u0bca\u0bb1\u0bbf\u0baf\u0bbf\u0baf\u0bb2\u0bcd \u0b86\u0b95\u0bbf\u0baf\u0bb5\u0bb1\u0bcd\u0bb1\u0bbf\u0bb2\u0bcd \u0b86\u0bb0\u0bcd\u0bb5\u0bae\u0bc1\u0bb3\u0bcd\u0bb3\u0bb5\u0ba9\u0bcd, \u0bae\u0bc7\u0bb2\u0bc1\u0bae\u0bcd \u0ba8\u0b9f\u0bc8\u0bae\u0bc1\u0bb1\u0bc8 \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9a\u0bbf\u0ba8\u0bcd\u0ba4\u0ba9\u0bc8\u0baf\u0bc1\u0b9f\u0ba9\u0bcd \u0bb5\u0b9f\u0bbf\u0bb5\u0bae\u0bc8\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f \u0ba4\u0bc0\u0bb0\u0bcd\u0bb5\u0bc1\u0b95\u0bb3\u0bc8 \u0b89\u0bb0\u0bc1\u0bb5\u0bbe\u0b95\u0bcd\u0b95\u0bc1\u0bb5\u0ba4\u0bbf\u0bb2\u0bcd \u0b95\u0bb5\u0ba9\u0bae\u0bcd \u0b9a\u0bc6\u0bb2\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd.",
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
    skill_ml: "மெஷின் லேர்னிங்",
    projects_heading: "திட்டங்கள்",
    project_demand_title: "ஹைப்பர்லோக்கல் டிமாண்ட் பிரிடிக்‌ஷன்",
    project_demand_desc: "வேகமான மற்றும் துல்லியமான குயிக்-காமர்ஸ் தேவை கணிப்பிற்கான ஒரு இலகுவான AI பைப்லைன்.",
    project_plant_title: "தாவர நோய் IoT மானிட்டர்",
    project_plant_desc: "தனிப்பயன் 18KB CNN ஐப் பயன்படுத்தி தாவர நோய்களைக் கண்டறியும் ESP32-CAM இல் ஒரு TinyML பைப்லைன்.",
    project_robot_title: "ROS 2 ஆட்டோனமஸ் ரோபோ",
    project_robot_desc: "ROS 2 மற்றும் Gazebo இல் தன்னிச்சையாக செல்லக்கூடிய ஒரு கணித ரீதியாக மாதிரி செய்யப்பட்ட ரோபோ.",
    project_facevision_title: "முக-பார்வை",
    project_facevision_desc:
      "OpenCV ஐப் பயன்படுத்தி படங்கள் மற்றும் வீடியோக்களில் முகங்களைக் கண்டறியவும்.",
    project_stardetection_title: "நட்சத்திர-கண்டறிதல்",
    project_stardetection_desc:
      "நாசாவின் ஹப்பிள் சேகரிப்பிலிருந்து படங்களில் நட்சத்திரங்களைக் கண்டறியவும்.",
    view_project_link: "திட்டத்தைப் பார்க்கவும்",
    project_portfolio_title: "தனிப்பட்ட போர்ட்ஃபோலியோ வலைத்தளம்",
    project_portfolio_desc:
      "திட்டங்கள், கவிதைகள் மற்றும் கட்டுரைகளை காட்சிப்படுத்தும் ஒரு வைப்-கோடட் தனிப்பட்ட வலைத்தளம், HTML, CSS மற்றும் JavaScript உடன் உருவாக்கப்பட்டது, இது மறுமொழி வடிவமைப்பு மற்றும் பல மொழி ஆதரவைக் கொண்டுள்ளது.",
    view_project_link: "திட்டத்தைப் பார்க்கவும்",
    projects_coming_soon:
      "மேலும் திட்டங்கள் விரைவில் வரவுள்ளன — காத்திருங்கள்!",
    experience_heading: "அனுபவம்",
    exp_railway_company: "DRM அம்பாலா (வடக்கு ரயில்வே)",
    exp_railway_role: "S & T துறையில் 15 நாள் பயிற்சி",
    exp_railway_date: "மே 2024",
    exp_railway_description:
      "ரயில்வே சிக்னலிங் அடிப்படைகள் பற்றிய புரிதலைப் பெற்றது.",
    exp_nith_institute: "NIT ஹமிர்பூர்",
    exp_nith_role: "1 மாத ஆராய்ச்சி பயிற்சி",
    exp_nith_date: "ஜூன் - ஜூலை 2025",
    exp_nith_description:
      "GAN மாதிரிகள் மற்றும் ஆழமான கற்றல் குறித்து ஆராய்ச்சி நடத்தப்பட்டது.",
    currently_learning_heading: "தற்போது கற்றுக்கொள்கிறேன்",
    learning_java: "ஜாவா",
    learning_datastructures: "தரவு கட்டமைப்புகள்",
    learning_deep_learning: "ஆழமான கற்றல்",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "ஆண்டெனா மற்றும் வேவ் ப்ரோபகேஷன்",
    learning_cuda: "பாரலல் கம்ப்யூட்டிங் (CUDA)",
    connect_heading: "இணைப்பு",
  },
  te: {
    /* Telugu */ page_title: "పార్థ్ సిద్దు - పోర్ట్‌ఫోలియో",
    nav_home: "హోమ్",
    nav_projects: "ప్రాజెక్టులు",
    nav_connect: "కనెక్ట్ చేయండి",
    nav_poems_articles: "కవితలు మరియు వ్యాసాలు",
    hero_welcome: "స్వాగతం",
    hero_tagline: "డిజిటల్ మగ్గంలో కలలు నేయడం.",
    profile_name: "పార్థ్ సిద్దు",
    profile_tagline: "ECE విద్యార్థి | AI ఔత్సాహికుడు | స్టోరీ-డ్రివెన్ దేవ",
    about_me_heading: "నా గురించి",
    about_me_para1:
      "\u0c38\u0c3f\u0c2e\u0c4d\u0c32\u0c3e\u0c32\u0c4b\u0c28\u0c3f \u0c2a\u0c4d\u0c30\u0c36\u0c3e\u0c02\u0c24\u0c2e\u0c48\u0c28 \u0c15\u0c4a\u0c02\u0c21\u0c32\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c26\u0c47\u0c35\u0c26\u0c3e\u0c30\u0c4d \u0c05\u0c21\u0c35\u0c41\u0c32 \u0c2e\u0c27\u0c4d\u0c2f \u0c2a\u0c46\u0c30\u0c17\u0c21\u0c02 \u0c28\u0c3e \u0c06\u0c32\u0c4b\u0c1a\u0c28\u0c3e \u0c35\u0c3f\u0c27\u0c3e\u0c28\u0c3e\u0c28\u0c4d\u0c28\u0c3f \u0c24\u0c40\u0c30\u0c4d\u0c1a\u0c3f\u0c26\u0c3f\u0c26\u0c4d\u0c26\u0c3f\u0c02\u0c26\u0c3f \u2014 \u0c2a\u0c4d\u0c30\u0c36\u0c3e\u0c02\u0c24\u0c2e\u0c48\u0c28 \u0c2a\u0c30\u0c3f\u0c36\u0c40\u0c32\u0c28\u0c24\u0c4b \u0c09\u0c24\u0c4d\u0c38\u0c41\u0c15\u0c24\u0c28\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c28\u0c3f\u0c30\u0c4d\u0c2e\u0c3e\u0c23\u0c02\u0c24\u0c4b \u0c38\u0c43\u0c1c\u0c28\u0c3e\u0c24\u0c4d\u0c2e\u0c15\u0c24\u0c28\u0c41 \u0c38\u0c2e\u0c24\u0c41\u0c32\u0c4d\u0c2f\u0c02 \u0c1a\u0c47\u0c2f\u0c21\u0c02.",
    about_me_para2:
      "\u0c28\u0c47\u0c28\u0c41 \u0c17\u0c24\u0c3f \u0c36\u0c15\u0c4d\u0c24\u0c3f \u0c35\u0c3f\u0c36\u0c4d\u0c35\u0c35\u0c3f\u0c26\u0c4d\u0c2f\u0c3e\u0c32\u0c2f\u0c02\u0c32\u0c4b \u0c0e\u0c32\u0c15\u0c4d\u0c1f\u0c4d\u0c30\u0c3e\u0c28\u0c3f\u0c15\u0c4d\u0c38\u0c4d \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c15\u0c2e\u0c4d\u0c2f\u0c42\u0c28\u0c3f\u0c15\u0c47\u0c37\u0c28\u0c4d \u0c07\u0c02\u0c1c\u0c28\u0c40\u0c30\u0c3f\u0c02\u0c17\u0c4d \u0c2b\u0c48\u0c28\u0c32\u0c4d \u0c07\u0c2f\u0c30\u0c4d \u0c35\u0c3f\u0c26\u0c4d\u0c2f\u0c3e\u0c30\u0c4d\u0c25\u0c3f\u0c28\u0c3f, \u0c07\u0c02\u0c1f\u0c46\u0c32\u0c3f\u0c1c\u0c46\u0c02\u0c1f\u0c4d \u0c38\u0c3f\u0c38\u0c4d\u0c1f\u0c2e\u0c4d\u0c38\u0c4d, \u0c05\u0c2a\u0c4d\u0c32\u0c48\u0c21\u0c4d \u0c0f\u0c10, \u0c38\u0c3f\u0c2e\u0c4d\u0c2f\u0c41\u0c32\u0c47\u0c37\u0c28\u0c4d \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c15\u0c02\u0c2a\u0c4d\u0c2f\u0c42\u0c1f\u0c47\u0c37\u0c28\u0c32\u0c4d \u0c07\u0c02\u0c1c\u0c28\u0c40\u0c30\u0c3f\u0c02\u0c17\u0c4d\u200c\u0c2a\u0c48 \u0c06\u0c38\u0c15\u0c4d\u0c24\u0c3f \u0c15\u0c32\u0c3f\u0c17\u0c3f \u0c09\u0c28\u0c4d\u0c28\u0c3e\u0c28\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c06\u0c1a\u0c30\u0c23\u0c3e\u0c24\u0c4d\u0c2e\u0c15\u0c2e\u0c48\u0c28 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c06\u0c32\u0c4b\u0c1a\u0c28\u0c3e\u0c24\u0c4d\u0c2e\u0c15\u0c02\u0c17\u0c3e \u0c30\u0c42\u0c2a\u0c4a\u0c02\u0c26\u0c3f\u0c02\u0c1a\u0c3f\u0c28 \u0c2a\u0c30\u0c3f\u0c37\u0c4d\u0c15\u0c3e\u0c30\u0c3e\u0c32\u0c28\u0c41 \u0c28\u0c3f\u0c30\u0c4d\u0c2e\u0c3f\u0c02\u0c1a\u0c21\u0c02\u0c2a\u0c48 \u0c26\u0c43\u0c37\u0c4d\u0c1f\u0c3f \u0c38\u0c3e\u0c30\u0c3f\u0c02\u0c1a\u0c3e\u0c28\u0c41.",
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
    skill_ml: "మెషిన్ లెర్నింగ్",
    projects_heading: "ప్రాజెక్టులు",
    project_demand_title: "హైపర్‌లోకల్ డిమాండ్ ప్రెడిక్షన్",
    project_demand_desc: "వేగవంతమైన మరియు ఖచ్చితమైన క్విక్-కామర్స్ డిమాండ్ అంచనా కోసం ఒక తేలికపాటి AI పైప్‌లైన్.",
    project_plant_title: "ప్లాంట్ డిసీజ్ IoT మానిటర్",
    project_plant_desc: "కస్టమ్ 18KB CNN ఉపయోగించి మొక్కల వ్యాధులను గుర్తించే ESP32-CAM పై ఒక TinyML పైప్‌లైన్.",
    project_robot_title: "ROS 2 అటానమస్ రోబోట్",
    project_robot_desc: "ROS 2 మరియు Gazebo లో స్వయంప్రతిపత్తితో నావిగేట్ చేసే ఒక గణితపరంగా మోడల్ చేయబడిన రోబోట్.",
    project_facevision_title: "ఫేస్-విజన్",
    project_facevision_desc:
      "OpenCVని ఉపయోగించి చిత్రాలు మరియు వీడియోలలో ముఖాలను గుర్తించండి.",
    project_stardetection_title: "స్టార్-డిటెక్షన్",
    project_stardetection_desc:
      "NASA యొక్క హబుల్ సేకరణ నుండి చిత్రాలలో నక్షత్రాలను గుర్తించండి.",
    view_project_link: "ప్రాజెక్ట్ చూడండి",
    project_portfolio_title: "వ్యక్తిగత పోర్ట్‌ఫోలియో వెబ్‌సైట్",
    project_portfolio_desc:
      "ప్రాజెక్టులు, కవితలు మరియు వ్యాసాలను ప్రదర్శించే వైబ్-కోడెడ్ వ్యక్తిగత వెబ్‌సైట్, HTML, CSS మరియు JavaScript తో నిర్మించబడింది, ప్రతిస్పందించే డిజైన్ మరియు బహుళ-భాషా మద్దతును కలిగి ఉంది.",
    view_project_link: "ప్రాజెక్ట్ చూడండి",
    projects_coming_soon:
      "మరిన్ని ప్రాజెక్టులు త్వరలో వస్తున్నాయి — వేచి ఉండండి!",
    experience_heading: "అనుభవం",
    exp_railway_company: "DRM అంబాలా (నార్తర్న్ రైల్వే)",
    exp_railway_role: "S & T విభాగంలో 15 రోజుల ఇంటర్న్‌షిప్",
    exp_railway_date: "మే 2024",
    exp_railway_description:
      "రైల్వే సిగ్నలింగ్ ప్రాథమిక అంశాలపై అవగాహన పొందింది.",
    exp_nith_institute: "NIT హమీర్‌పూర్",
    exp_nith_role: "1 నెల పరిశోధన ఇంటర్న్‌షిప్",
    exp_nith_date: "జూన్ - జూలై 2025",
    exp_nith_description:
      "GAN మోడల్స్ మరియు డీప్ లెర్నింగ్‌పై పరిశోధన నిర్వహించబడింది.",
    currently_learning_heading: "ప్రస్తుతం నేర్చుకుంటున్నాను",
    learning_java: "జావా",
    learning_datastructures: "డేటా స్ట్రక్చర్స్",
    learning_deep_learning: "డీప్ లెర్నింగ్",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "యాంటెన్నా మరియు వేవ్ ప్రోపగేషన్",
    learning_cuda: "పారలల్ కంప్యూటింగ్ (CUDA)",
    connect_heading: "కనెక్ట్ చేయండి",
  },
  ml: {
    /* Malayalam */ page_title: "പാർത്ഥ് സിദ്ദു - പോർട്ട്ഫോളിയോ",
    nav_home: "ഹോം",
    nav_projects: "പ്രോജക്റ്റുകൾ",
    nav_connect: "ബന്ധപ്പെടുക",
    nav_poems_articles: "കവിത / ലേഖനം",
    hero_welcome: "സ്വാഗതം",
    hero_tagline: "ഡിജിറ്റൽ തറിയിൽ സ്വപ്നങ്ങൾ നെയ്യുന്നു.",
    profile_name: "പാർത്ഥ് സിദ്ദു",
    profile_tagline:
      "ECE വിദ്യാർത്ഥി | AI താൽപ്പര്യക്കാരൻ | കഥാധിഷ്ഠിത ഡെവലപ്പർ",
    about_me_heading: "എന്നെക്കുറിച്ച്",
    about_me_para1:
      "\u0d37\u0d3f\u0d02\u0d32\u0d2f\u0d3f\u0d32\u0d46 \u0d36\u0d3e\u0d28\u0d4d\u0d24\u0d2e\u0d3e\u0d2f \u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41\u0d15\u0d7e\u0d15\u0d4d\u0d15\u0d41\u0d02 \u0d26\u0d47\u0d35\u0d26\u0d3e\u0d30\u0d41 \u0d35\u0d28\u0d19\u0d4d\u0d19\u0d7e\u0d15\u0d4d\u0d15\u0d41\u0d02 \u0d07\u0d1f\u0d2f\u0d3f\u0d7d \u0d35\u0d33\u0d7c\u0d28\u0d4d\u0d28\u0d24\u0d4d \u0d0e\u0d7b\u0d4d\u0d31\u0d46 \u0d1a\u0d3f\u0d28\u0d4d\u0d24\u0d3e\u0d30\u0d40\u0d24\u0d3f\u0d2f\u0d46 \u0d30\u0d42\u0d2a\u0d2a\u0d4d\u0d2a\u0d46\u0d1f\u0d41\u0d24\u0d4d\u0d24\u0d3f \u2014 \u0d36\u0d3e\u0d28\u0d4d\u0d24\u0d2e\u0d3e\u0d2f \u0d28\u0d3f\u0d30\u0d40\u0d15\u0d4d\u0d37\u0d23\u0d35\u0d41\u0d02 \u0d1c\u0d3f\u0d1c\u0d4d\u0d1e\u0d3e\u0d38\u0d2f\u0d41\u0d02, \u0d18\u0d1f\u0d28\u0d2f\u0d41\u0d02 \u0d38\u0d7c\u0d17\u0d4d\u0d17\u0d3e\u0d24\u0d4d\u0d2e\u0d15\u0d24\u0d2f\u0d41\u0d02 \u0d38\u0d28\u0d4d\u0d24\u0d41\u0d32\u0d3f\u0d24\u0d2e\u0d3e\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41.",
    about_me_para2:
      "\u0d1e\u0d3e\u0d7b \u0d17\u0d24\u0d3f \u0d36\u0d15\u0d4d\u0d24\u0d3f \u0d35\u0d3f\u0d36\u0d4d\u0d35\u0d35\u0d3f\u0d26\u0d4d\u0d2f\u0d3e\u0d32\u0d2f\u0d24\u0d4d\u0d24\u0d3f\u0d32\u0d46 \u0d07\u0d32\u0d15\u0d4d\u0d1f\u0d4d\u0d30\u0d4b\u0d23\u0d3f\u0d15\u0d4d\u0d38\u0d4d \u0d06\u0d7b\u0d21\u0d4d \u0d15\u0d2e\u0d4d\u0d2e\u0d4d\u0d2f\u0d42\u0d23\u0d3f\u0d15\u0d4d\u0d15\u0d47\u0d37\u0d7b \u0d0e\u0d1e\u0d4d\u0d1a\u0d3f\u0d28\u0d40\u0d2f\u0d31\u0d3f\u0d02\u0d17\u0d4d \u0d05\u0d35\u0d38\u0d3e\u0d28 \u0d35\u0d7c\u0d37 \u0d35\u0d3f\u0d26\u0d4d\u0d2f\u0d3e\u0d7c\u0d24\u0d4d\u0d25\u0d3f\u0d2f\u0d3e\u0d23\u0d4d. \u0d07\u0d7b\u0d4d\u0d31\u0d32\u0d3f\u0d1c\u0d7b\u0d4d\u0d31\u0d4d \u0d38\u0d3f\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d19\u0d4d\u0d19\u0d7e, \u0d05\u0d2a\u0d4d\u0d32\u0d48\u0d21\u0d4d \u0d0e\u0d10, \u0d38\u0d3f\u0d2e\u0d41\u0d32\u0d47\u0d37\u0d7b, \u0d15\u0d2e\u0d4d\u0d2a\u0d4d\u0d2f\u0d42\u0d1f\u0d4d\u0d1f\u0d47\u0d37\u0d23\u0d7d \u0d0e\u0d1e\u0d4d\u0d1a\u0d3f\u0d28\u0d40\u0d2f\u0d31\u0d3f\u0d02\u0d17\u0d4d \u0d0e\u0d28\u0d4d\u0d28\u0d3f\u0d35\u0d2f\u0d3f\u0d7d \u0d24\u0d3e\u0d7d\u0d2a\u0d4d\u0d2a\u0d30\u0d4d\u0d2f\u0d2e\u0d41\u0d33\u0d4d\u0d33 \u0d1e\u0d3e\u0d7b \u0d2a\u0d4d\u0d30\u0d3e\u0d2f\u0d4b\u0d17\u0d3f\u0d15\u0d35\u0d41\u0d02 \u0d1a\u0d3f\u0d28\u0d4d\u0d24\u0d3e\u0d2a\u0d30\u0d2e\u0d3e\u0d2f\u0d3f \u0d30\u0d42\u0d2a\u0d15\u0d7d\u0d2a\u0d4d\u0d2a\u0d28 \u0d1a\u0d46\u0d2f\u0d4d\u0d24\u0d24\u0d41\u0d2e\u0d3e\u0d2f \u0d2a\u0d30\u0d3f\u0d39\u0d3e\u0d30\u0d19\u0d4d\u0d19\u0d7e \u0d28\u0d3f\u0d7c\u0d2e\u0d4d\u0d2e\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d24\u0d3f\u0d7d \u0d36\u0d4d\u0d30\u0d26\u0d4d\u0d27 \u0d15\u0d47\u0d28\u0d4d\u0d26\u0d4d\u0d30\u0d40\u0d15\u0d30\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41.",
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
    skill_ml: "മെഷീൻ ലേണിംഗ്",
    projects_heading: "പ്രോജക്റ്റുകൾ",
    project_demand_title: "ഹൈപ്പർലോക്കൽ ഡിമാൻഡ് പ്രെഡിക്ഷൻ",
    project_demand_desc: "വേഗമേറിയതും കൃത്യവുമായ ക്വിക്ക്-കൊമേഴ്‌സ് ഡിമാൻഡ് പ്രവചനത്തിനായുള്ള ഒരു ഭാരം കുറഞ്ഞ AI പൈപ്പ്‌ലൈൻ.",
    project_plant_title: "പ്ലാന്റ് ഡിസീസ് IoT മോണിറ്റർ",
    project_plant_desc: "കസ്റ്റം 18KB CNN ഉപയോഗിച്ച് സസ്യരോഗങ്ങൾ കണ്ടെത്തുന്ന ESP32-CAM-ലെ ഒരു TinyML പൈപ്പ്‌ലൈൻ.",
    project_robot_title: "ROS 2 ഓട്ടോണമസ് റോബോട്ട്",
    project_robot_desc: "ROS 2, Gazebo എന്നിവയിൽ സ്വയം നാവിഗേറ്റ് ചെയ്യുന്ന ഗണിതശാസ്ത്രപരമായി മാതൃകയാക്കിയ റോബോട്ട്.",
    project_facevision_title: "ഫേസ്-വിഷൻ",
    project_facevision_desc:
      "OpenCV ഉപയോഗിച്ച് ചിത്രങ്ങളിലും വീഡിയോകളിലും മുഖങ്ങൾ കണ്ടെത്തുക.",
    project_stardetection_title: "സ്റ്റാർ-ഡിറ്റക്ഷൻ",
    project_stardetection_desc:
      "നാസയുടെ ഹബിൾ ശേഖരത്തിൽ നിന്ന് ചിത്രങ്ങളിലെ നക്ഷത്രങ്ങൾ കണ്ടെത്തുക.",
    view_project_link: "പ്രോജക്റ്റ് കാണുക",
    project_portfolio_title: "വ്യക്തിഗത പോർട്ട്‌ഫോളിയോ വെബ്സൈറ്റ്",
    project_portfolio_desc:
      "പ്രോജക്റ്റുകൾ, കവിതകൾ, ലേഖനങ്ങൾ എന്നിവ പ്രദർശിപ്പിക്കുന്ന ഒരു വൈബ്-കോഡഡ് വ്യക്തിഗത വെബ്സൈറ്റ്, HTML, CSS, JavaScript എന്നിവ ഉപയോഗിച്ച് നിർമ്മിച്ചത്, പ്രതികരണാത്മക രൂപകൽപ്പനയും ബഹുഭാഷാ പിന്തുണയും ഇതിൽ ഉൾപ്പെടുന്നു.",
    view_project_link: "പ്രോജക്റ്റ് കാണുക",
    projects_coming_soon: "കൂടുതൽ പ്രോജക്റ്റുകൾ ഉടൻ വരുന്നു — കാത്തിരിക്കുക!",
    experience_heading: "അനുഭവം",
    exp_railway_company: "ഡിആർഎം അംബാല (നോർത്തേൺ റെയിൽവേ)",
    exp_railway_role: "എസ് & ടി വകുപ്പിൽ 15 ദിവസത്തെ ഇന്റേൺഷിപ്പ്",
    exp_railway_date: "മെയ് 2024",
    exp_railway_description:
      "റെയിൽവേ സിഗ്നലിംഗിന്റെ അടിസ്ഥാനകാര്യങ്ങളെക്കുറിച്ച് ഉൾക്കാഴ്ച നേടി.",
    exp_nith_institute: "എൻഐടി ഹമീർപൂർ",
    exp_nith_role: "1 മാസത്തെ ഗവേഷണ ഇന്റേൺഷിപ്പ്",
    exp_nith_date: "ജൂൺ - ജൂലൈ 2025",
    exp_nith_description: "GAN മോഡലുകളിലും ഡീപ് ലേണിംഗിലും ഗവേഷണം നടത്തി.",
    currently_learning_heading: "നിലവിൽ പഠിക്കുന്നു",
    learning_java: "ജാവ",
    learning_datastructures: "ഡാറ്റാ സ്ട്രക്ചറുകൾ",
    learning_deep_learning: "ഡീപ് ലേണിംഗ്",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "ആന്റിന ആൻഡ് വേവ് പ്രൊപഗേഷൻ",
    learning_cuda: "പാരലൽ കമ്പ്യൂട്ടിംഗ് (CUDA)",
    connect_heading: "ബന്ധപ്പെടുക",
  },
  kn: {
    /* Kannada */ page_title: "ಪಾರ್ಥ್ ಸಿಧು - ಪೋರ್ಟ್ಫೋಲಿಯೊ",
    nav_home: "ಮುಖಪುಟ",
    nav_projects: "ಯೋಜನೆಗಳು",
    nav_connect: "ಸಂಪರ್ಕಿಸಿ",
    nav_poems_articles: "ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳು",
    hero_welcome: "ಸುಸ್ವಾಗತ",
    hero_tagline: "ಡಿಜಿಟಲ್ ಮಗ್ಗದಲ್ಲಿ ಕನಸುಗಳನ್ನು ನೇಯುವುದು.",
    profile_name: "ಪಾರ್ಥ್ ಸಿಧು",
    profile_tagline: "ECE ವಿದ್ಯಾರ್ಥಿ | AI ಉತ್ಸಾಹಿ | ಕಥೆ-ಚಾಲಿತ ಡೆವಲಪರ್",
    about_me_heading: "ನನ್ನ ಬಗ್ಗೆ",
    about_me_para1:
      "\u0cb6\u0cbf\u0cae\u0ccd\u0cb2\u0cbe\u0ca6 \u0cb6\u0cbe\u0c82\u0ca4 \u0cac\u0cc6\u0c9f\u0ccd\u0c9f\u0c97\u0cb3\u0cc1 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0ca6\u0cc7\u0cb5\u0ca6\u0cbe\u0cb0\u0ccd \u0c95\u0cbe\u0ca1\u0cc1\u0c97\u0cb3 \u0ca8\u0ca1\u0cc1\u0cb5\u0cc6 \u0cac\u0cc6\u0cb3\u0cc6\u0ca6\u0ca6\u0ccd\u0ca6\u0cc1 \u0ca8\u0ca8\u0ccd\u0ca8 \u0c86\u0cb2\u0ccb\u0c9a\u0ca8\u0cbe \u0cb5\u0cbf\u0ca7\u0cbe\u0ca8\u0cb5\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb0\u0cc2\u0caa\u0cbf\u0cb8\u0cbf\u0ca6\u0cc6 - \u0cb6\u0cbe\u0c82\u0ca4 \u0cb5\u0cc0\u0c95\u0ccd\u0cb7\u0ca3\u0cc6\u0caf\u0cca\u0c82\u0ca6\u0cbf\u0c97\u0cc6 \u0c95\u0cc1\u0ca4\u0cc2\u0cb9\u0cb2\u0cb5\u0ca8\u0ccd\u0ca8\u0cc1 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0cb0\u0c9a\u0ca8\u0cc6\u0caf\u0cca\u0c82\u0ca6\u0cbf\u0c97\u0cc6 \u0cb8\u0cc3\u0c9c\u0ca8\u0cb6\u0cc0\u0cb2\u0ca4\u0cc6\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0cae\u0ca4\u0ccb\u0cb2\u0ca8\u0c97\u0cca\u0cb3\u0cbf\u0cb8\u0cc1\u0cb5\u0cc1\u0ca6\u0cc1.",
    about_me_para2:
      "\u0ca8\u0cbe\u0ca8\u0cc1 \u0c97\u0ca4\u0cbf \u0cb6\u0c95\u0ccd\u0ca4\u0cbf \u0cb5\u0cbf\u0cb6\u0ccd\u0cb5\u0cb5\u0cbf\u0ca6\u0ccd\u0caf\u0cbe\u0cb2\u0caf\u0ca6\u0cb2\u0ccd\u0cb2\u0cbf \u0c8e\u0cb2\u0cc6\u0c95\u0ccd\u0c9f\u0ccd\u0cb0\u0cbe\u0ca8\u0cbf\u0c95\u0ccd\u0cb8\u0ccd \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0c95\u0cae\u0ccd\u0caf\u0cc1\u0ca8\u0cbf\u0c95\u0cc7\u0cb7\u0ca8\u0ccd \u0c87\u0c82\u0c9c\u0cbf\u0ca8\u0cbf\u0caf\u0cb0\u0cbf\u0c82\u0c97\u0ccd \u0c85\u0c82\u0ca4\u0cbf\u0cae \u0cb5\u0cb0\u0ccd\u0cb7\u0ca6 \u0cb5\u0cbf\u0ca6\u0ccd\u0caf\u0cbe\u0cb0\u0ccd\u0ca5\u0cbf\u0caf\u0cbe\u0c97\u0cbf\u0ca6\u0ccd\u0ca6\u0cc7\u0ca8\u0cc6. \u0c87\u0c82\u0c9f\u0cc6\u0cb2\u0cbf\u0c9c\u0cc6\u0c82\u0c9f\u0ccd \u0cb8\u0cbf\u0cb8\u0ccd\u0c9f\u0cae\u0ccd\u0cb8\u0ccd, \u0c85\u0caa\u0ccd\u0cb2\u0cc8\u0ca1\u0ccd \u0c8e\u0c90, \u0cb8\u0cbf\u0cae\u0ccd\u0caf\u0cc1\u0cb2\u0cc7\u0cb6\u0ca8\u0ccd \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0c95\u0c82\u0caa\u0ccd\u0caf\u0cc2\u0c9f\u0cc7\u0cb6\u0ca8\u0cb2\u0ccd \u0c87\u0c82\u0c9c\u0cbf\u0ca8\u0cbf\u0caf\u0cb0\u0cbf\u0c82\u0c97\u0ccd\u200c\u0ca8\u0cb2\u0ccd\u0cb2\u0cbf \u0c86\u0cb8\u0c95\u0ccd\u0ca4\u0cbf \u0cb9\u0cca\u0c82\u0ca6\u0cbf\u0ca6\u0ccd\u0ca6\u0cc1, \u0caa\u0ccd\u0cb0\u0cbe\u0caf\u0ccb\u0c97\u0cbf\u0c95 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0c9a\u0cbf\u0c82\u0ca4\u0ca8\u0cb6\u0cc0\u0cb2\u0cb5\u0cbe\u0c97\u0cbf \u0cb5\u0cbf\u0ca8\u0ccd\u0caf\u0cbe\u0cb8\u0c97\u0cca\u0cb3\u0cbf\u0cb8\u0cbf\u0ca6 \u0caa\u0cb0\u0cbf\u0cb9\u0cbe\u0cb0\u0c97\u0cb3\u0ca8\u0ccd\u0ca8\u0cc1 \u0ca8\u0cbf\u0cb0\u0ccd\u0cae\u0cbf\u0cb8\u0cc1\u0cb5\u0cc1\u0ca6\u0cb0 \u0cae\u0cc7\u0cb2\u0cc6 \u0c95\u0cc7\u0c82\u0ca6\u0ccd\u0cb0\u0cc0\u0c95\u0cb0\u0cbf\u0cb8\u0cbf\u0ca6\u0ccd\u0ca6\u0cc7\u0ca8\u0cc6.",
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
    skill_ml: "ಮಷಿನ್ ಲರ್ನಿಂಗ್",
    projects_heading: "ಯೋಜನೆಗಳು",
    project_demand_title: "ಹೈಪರ್‌ಲೋಕಲ್ ಡಿಮ್ಯಾಂಡ್ ಪ್ರೆಡಿಕ್ಷನ್",
    project_demand_desc: "ವೇಗದ ಮತ್ತು ನಿಖರವಾದ ಕ್ವಿಕ್-ಕಾಮರ್ಸ್ ಡಿಮ್ಯಾಂಡ್ ಮುನ್ಸೂಚನೆಗಾಗಿ ಹಗುರವಾದ AI ಪೈಪ್‌ಲೈನ್.",
    project_plant_title: "ಪ್ಲಾಂಟ್ ಡಿಸೀಸ್ IoT ಮಾನಿಟರ್",
    project_plant_desc: "ಕಸ್ಟಮ್ 18KB CNN ಬಳಸಿ ಸಸ್ಯ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುವ ESP32-CAM ನಲ್ಲಿನ TinyML ಪೈಪ್‌ಲೈನ್.",
    project_robot_title: "ROS 2 ಆಟೋನಮಸ್ ರೋಬೋಟ್",
    project_robot_desc: "ROS 2 ಮತ್ತು Gazebo ನಲ್ಲಿ ಸ್ವಾಯತ್ತವಾಗಿ ನ್ಯಾವಿಗೇಟ್ ಮಾಡುವ ಗಣಿತೀಯವಾಗಿ ರೂಪಿಸಲಾದ ರೋಬೋಟ್.",
    project_facevision_title: "ಫೇಸ್-ವಿಷನ್",
    project_facevision_desc:
      "OpenCV ಬಳಸಿ ಚಿತ್ರಗಳು ಮತ್ತು ವೀಡಿಯೊಗಳಲ್ಲಿ ಮುಖಗಳನ್ನು ಗುರುತಿಸಿ.",
    project_stardetection_title: "ಸ್ಟಾರ್-ಡಿಟೆಕ್ಷನ್",
    project_stardetection_desc:
      "NASA ದ ಹಬಲ್ ಸಂಗ್ರಹದಿಂದ ಚಿತ್ರಗಳಲ್ಲಿ ನಕ್ಷತ್ರಗಳನ್ನು ಗುರುತಿಸಿ.",
    view_project_link: "ಯೋಜನೆ ವೀಕ್ಷಿಸಿ",
    project_portfolio_title: "ವೈಯಕ್ತಿಕ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ವೆಬ್‌ಸೈಟ್",
    project_portfolio_desc:
      "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು, ಕವನಗಳು ಮತ್ತು ಲೇಖನಗಳನ್ನು ಪ್ರದರ್ಶಿಸುವ ವೈಬ್-ಕೋಡೆಡ್ ವೈಯಕ್ತಿಕ ವೆಬ್‌ಸೈಟ್, HTML, CSS, ಮತ್ತು ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್‌ನೊಂದಿಗೆ ನಿರ್ಮಿಸಲಾಗಿದೆ, ಇದು ಪ್ರತಿಕ್ರಿಯಾಶೀಲ ವಿನ್ಯಾಸ ಮತ್ತು ಬಹು-ಭಾಷಾ ಬೆಂಬಲವನ್ನು ಒಳಗೊಂಡಿದೆ.",
    view_project_link: "ಯೋಜನೆ ವೀಕ್ಷಿಸಿ",
    projects_coming_soon: "ಹೆಚ್ಚಿನ ಯೋಜನೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ — ನಿರೀಕ್ಷಿಸಿ!",
    experience_heading: "ಅನುಭವ",
    exp_railway_company: "DRM ಅಂಬಾಲಾ (ಉತ್ತರ ರೈಲ್ವೆ)",
    exp_railway_role: "ಎಸ್ & ಟಿ ವಿಭಾಗದಲ್ಲಿ 15 ದಿನಗಳ ಇಂಟರ್ನ್‌ಶಿಪ್",
    exp_railway_date: "ಮೇ 2024",
    exp_railway_description:
      "ರೈಲ್ವೆ ಸಿಗ್ನಲಿಂಗ್ ಮೂಲಭೂತ ಅಂಶಗಳ ಬಗ್ಗೆ ಒಳನೋಟಗಳನ್ನು ಪಡೆದುಕೊಂಡಿದೆ.",
    exp_nith_institute: "NIT ಹಮೀರ್‌ಪುರ",
    exp_nith_role: "1 ತಿಂಗಳ ಸಂಶೋಧನಾ ಇಂಟರ್ನ್‌ಶಿಪ್",
    exp_nith_date: "ಜೂನ್ - ಜುಲೈ 2025",
    exp_nith_description:
      "GAN ಮಾದರಿಗಳು ಮತ್ತು ಡೀಪ್ ಲರ್ನಿಂಗ್ ಕುರಿತು ಸಂಶೋಧನೆ ನಡೆಸಲಾಯಿತು.",
    currently_learning_heading: "ಪ್ರಸ್ತುತ ಕಲಿಯುತ್ತಿದ್ದೇನೆ",
    learning_java: "ಜಾವಾ",
    learning_datastructures: "ಡೇಟಾ ರಚನೆಗಳು",
    learning_deep_learning: "ಡೀಪ್ ಲರ್ನಿಂಗ್",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "ಆಂಟೆನಾ ಮತ್ತು ವೇವ್ ಪ್ರೊಪಗೇಷನ್",
    learning_cuda: "ಪ್ಯಾರಲಲ್ ಕಂಪ್ಯೂಟಿಂಗ್ (CUDA)",
    connect_heading: "ಸಂಪರ್ಕಿಸಿ",
  },
  sd: {
    /* Sindhi */ page_title: "پارتھ سدھو - پورٽفوليو",
    nav_home: "گھر",
    nav_projects: "پروجيڪٽس",
    nav_connect: "رابطو ڪريو",
    nav_poems_articles: "نظمون ۽ مضمون",
    hero_welcome: "ڀلي ڪري آيا",
    hero_tagline: "ڊجيٽل لوم ۾ خوابن جي بنائي.",
    profile_name: "پارتھ سدھو",
    profile_tagline:
      "اي سي اي جو شاگرد | اي آءِ جو شوقين | ڪهاڻي تي مبني ڊولپر",
    about_me_heading: "منهنجي باري ۾",
    about_me_para1:
      "\u0634\u0645\u0644\u06c1 \u062c\u064a \u062e\u0627\u0645\u0648\u0634 \u067d\u06aa\u0631\u064a\u0646 \u06fd \u062f\u064a\u0648\u062f\u0627\u0631 \u062c\u064a \u062c\u0646\u06af\u0644\u0646 \u06fe \u067e\u0644\u062c\u06bb \u0645\u0646\u0647\u0646\u062c\u064a \u0633\u0648\u0686\u06bb \u062c\u064a \u0627\u0646\u062f\u0627\u0632 \u06a9\u064a \u0634\u06aa\u0644 \u068f\u0646\u064a \u0622\u0647\u064a \u2014 \u067e\u0631\u0633\u06a9\u0648\u0646 \u0645\u0634\u0627\u0647\u062f\u064a \u0633\u0627\u0646 \u06af\u068f \u062a\u062c\u0633\u0633\u060c \u06fd \u0633\u0627\u062e\u062a \u0633\u0627\u0646 \u06af\u068f \u062a\u062e\u0644\u064a\u0642\u064a \u0635\u0644\u0627\u062d\u064a\u062a\u0646 \u062c\u0648 \u062a\u0648\u0627\u0632\u0646 \u0628\u0631\u0642\u0631\u0627\u0631 \u0631\u06a9\u06bb.",
    about_me_para2:
      "\u0645\u0627\u0646 \u06af\u062a\u064a \u0634\u06aa\u062a\u064a \u0648\u0634\u0648 \u0648\u062f\u064a\u0627\u0644\u064a\u0647 \u06fe \u0627\u0644\u064a\u06aa\u067d\u0631\u0627\u0646\u06aa\u0633 \u06fd \u06aa\u0645\u064a\u0648\u0646\u064a\u06aa\u064a\u0634\u0646 \u0627\u0646\u062c\u0646\u064a\u0626\u0631\u0646\u06af \u062c\u0648 \u0641\u0627\u0626\u0646\u0644 \u0627\u064a\u0626\u0631 \u062c\u0648 \u0634\u0627\u06af\u0631\u062f \u0622\u0647\u064a\u0627\u0646\u060c \u062c\u0646\u0647\u0646 \u062c\u064a \u062f\u0644\u0686\u0633\u067e\u064a \u0630\u0647\u064a\u0646 \u0633\u0633\u067d\u0645\u0632\u060c \u0627\u067e\u0644\u0627\u0626\u064a\u068a \u0627\u064a \u0622\u0626\u064a\u060c \u0633\u0645\u0648\u0644\u064a\u0634\u0646 \u06fd \u06aa\u0645\u067e\u064a\u0648\u067d\u064a\u0634\u0646\u0644 \u0627\u0646\u062c\u0646\u064a\u0626\u0631\u0646\u06af \u06fe \u0622\u0647\u064a\u060c \u06fd \u0645\u0646\u0647\u0646\u062c\u0648 \u0641\u0648\u06aa\u0633 \u0639\u0645\u0644\u064a \u06fd \u0633\u0648\u0686\u064a \u0633\u0645\u062c\u0647\u064a \u062a\u064a\u0627\u0631 \u06aa\u064a\u0644 \u062d\u0644 \u067a\u0627\u0647\u06bb \u062a\u064a \u0622\u0647\u064a.",
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
    skill_ml: "مشين لرننگ",
    projects_heading: "پروجيڪٽس",
    project_demand_title: "هائپر لوڪل ڊيمانڊ پريڊڪشن",
    project_demand_desc: "تيز ۽ درست ڪوئڪ ڪامرس ڊيمانڊ پريڊڪشن لاءِ هڪ هلڪي AI پائپ لائن.",
    project_plant_title: "پلانٽ ڊيزيز IoT مانيٽر",
    project_plant_desc: "ڪسٽم 18KB CNN استعمال ڪندي ٻوٽن جي بيمارين جو پتو لڳائيندڙ ESP32-CAM تي هڪ TinyML پائپ لائن.",
    project_robot_title: "ROS 2 خود مختيار روبوٽ",
    project_robot_desc: "ROS 2 ۽ Gazebo ۾ خود مختيار طور تي نيويگيٽ ڪندڙ رياضياتي ماڊل وارو روبوٽ.",
    project_facevision_title: "فيس-وژن",
    project_facevision_desc:
      "اوپن سي وي استعمال ڪندي تصويرن ۽ وڊيوز ۾ منهن سڃاڻي وٺو.",
    project_stardetection_title: "اسٽار-ڊيٽيڪشن",
    project_stardetection_desc:
      "ناسا جي هبل ڪليڪشن مان تصويرن ۾ ستارا سڃاڻي وٺو.",
    view_project_link: "پروجيڪٽ ڏسو",
    project_portfolio_title: "ذاتي پورٽفوليو ويبسائيٽ",
    project_portfolio_desc:
      "هڪ وائيب-ڪوڊڊ ذاتي ويبسائيٽ جنهن ۾ منصوبا، شعر، ۽ مضمون ڏيکاريا ويا آهن، HTML، CSS، ۽ JavaScript سان ٺهيل آهي، جنهن ۾ جوابي ڊيزائن ۽ گھڻن ٻولين جي حمايت شامل آهي.",
    view_project_link: "منصوبو ڏسو",
    projects_coming_soon: "وڌيڪ پروجيڪٽ جلد اچي رهيا آهن — گڏ رهو!",
    experience_heading: "تجربو",
    exp_railway_company: "ڊي آر ايم امبالا (اتر ريلوي)",
    exp_railway_role: "ايس ۽ ٽي ڊپارٽمينٽ ۾ 15 ڏينهن جي انٽرنشپ",
    exp_railway_date: "مئي 2024",
    exp_railway_description: "ريلوي سگنلنگ جي بنيادي ڳالهين ۾ بصيرت حاصل ڪئي.",
    exp_nith_institute: "اين آءِ ٽي هميرپور",
    exp_nith_role: "1 مهيني جي ريسرچ انٽرنشپ",
    exp_nith_date: "جون - جولاءِ 2025",
    exp_nith_description: "GAN ماڊلز ۽ ڊيپ لرننگ تي تحقيق ڪئي وئي.",
    currently_learning_heading: "في الحال سکي رهيو آهيان",
    learning_java: "جاوا",
    learning_datastructures: "ڊيٽا اسٽرڪچرز",
    learning_deep_learning: "ڊيپ لرننگ",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "اينٽينا ۽ ويو پروپيگيشن",
    learning_cuda: "پيرالل ڪمپيوٽنگ (CUDA)",
    connect_heading: "رابطو",
  },
  "zh-Hans": {
    /* Simplified Chinese */ page_title: "帕斯·西杜 - 个人作品集",
    nav_home: "主页",
    nav_projects: "项目",
    nav_connect: "联系",
    nav_poems_articles: "诗文",
    hero_welcome: "欢迎",
    hero_tagline: "在数字织机中编织梦想。",
    profile_name: "帕斯·西杜",
    profile_tagline: "ECE学生 | AI & 软件开发爱好者 | 电影思维",
    about_me_heading: "关于我",
    about_me_para1:
      "\u5728\u897f\u59c6\u62c9\u5b81\u9759\u7684\u7fa4\u5c71\u548c\u96ea\u677e\u6797\u4e2d\u957f\u5927\uff0c\u5851\u9020\u4e86\u6211\u7684\u601d\u7ef4\u65b9\u5f0f\u2014\u2014\u5728\u597d\u5947\u5fc3\u4e0e\u51b7\u9759\u89c2\u5bdf\u4e4b\u95f4\uff0c\u5728\u521b\u9020\u529b\u4e0e\u7ed3\u6784\u4e4b\u95f4\u4fdd\u6301\u5e73\u8861\u3002",
    about_me_para2:
      "\u6211\u662f Gati Shakti Vishwavidyalaya \u7535\u5b50\u4e0e\u901a\u4fe1\u5de5\u7a0b\u4e13\u4e1a\u7684\u6700\u540e\u4e00\u5e74\u5b66\u751f\uff0c\u5bf9\u667a\u80fd\u7cfb\u7edf\u3001\u5e94\u7528\u4eba\u5de5\u667a\u80fd\u3001\u4eff\u771f\u548c\u8ba1\u7b97\u5de5\u7a0b\u611f\u5174\u8da3\uff0c\u81f4\u529b\u4e8e\u6784\u5efa\u5b9e\u7528\u4e14\u7ecf\u8fc7\u6df1\u601d\u719f\u8651\u7684\u5de5\u7a0b\u89e3\u51b3\u65b9\u6848\u3002",
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
    skill_ml: "机器学习",
    projects_heading: "项目",
    project_demand_title: "超本地化需求预测",
    project_demand_desc: "一种轻量级的 AI 管道，用于快速准确地进行快速商务需求预测。",
    project_plant_title: "植物病害 IoT 监视器",
    project_plant_desc: "ESP32-CAM 上的端到端 TinyML 管道，使用自定义 18KB CNN 检测植物病害。",
    project_robot_title: "ROS 2 自主机器人",
    project_robot_desc: "一个数学模型的滑动转向机器人，在 ROS 2 和 Gazebo 中通过闭式运动学自主导航。",
    project_facevision_title: "人脸识别",
    project_facevision_desc: "使用OpenCV检测图像和视频中的人脸。",
    project_stardetection_title: "星星检测",
    project_stardetection_desc: "从NASA哈勃系列图像中检测星星。",
    view_project_link: "查看项目",
    project_portfolio_title: "个人作品集网站",
    project_portfolio_desc:
      "一个通过“感觉编程”开发的个人网站，展示项目、诗歌和文章，使用HTML、CSS和JavaScript构建，具有响应式设计和多语言支持。",
    view_project_link: "查看项目",
    projects_coming_soon: "更多项目即将推出 — 敬请期待！",
    experience_heading: "经验",
    exp_railway_company: "安巴拉铁路局 (北部铁路)",
    exp_railway_role: "S & T 部门15天实习",
    exp_railway_date: "2024年5月",
    exp_railway_description: "获得了铁路信号基础知识的见解。",
    exp_nith_institute: "哈米尔布尔国立理工学院",
    exp_nith_role: "1个月研究实习",
    exp_nith_date: "2025年6月 - 7月",
    exp_nith_description: "对GAN模型和深度学习进行了研究。",
    currently_learning_heading: "目前正在学习",
    learning_java: "Java",
    learning_datastructures: "数据结构",
    learning_deep_learning: "深度学习",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "天线与电波传播",
    learning_cuda: "并行计算 (CUDA)",
    connect_heading: "联系",
  },
  "zh-Hant": {
    /* Traditional Chinese */ page_title: "帕斯·西杜 - 作品集",
    nav_home: "首頁",
    nav_projects: "項目",
    nav_connect: "聯繫",
    nav_poems_articles: "诗文",
    hero_welcome: "歡迎",
    hero_tagline: "在數位織機中編織夢想。",
    profile_name: "帕斯·西杜",
    profile_tagline: "ECE學生 | AI & 軟體開發愛好者 | 電影思維",
    about_me_heading: "關於我",
    about_me_para1:
      "\u5728\u897f\u59c6\u62c9\u5be7\u975c\u7684\u7fa4\u5c71\u548c\u96ea\u677e\u6797\u4e2d\u9577\u5927\uff0c\u5851\u9020\u4e86\u6211\u7684\u601d\u7dad\u65b9\u5f0f\u2014\u2014\u5728\u597d\u5947\u5fc3\u8207\u51b7\u975c\u89c0\u5bdf\u4e4b\u9593\uff0c\u5728\u5275\u9020\u529b\u8207\u7d50\u69cb\u4e4b\u9593\u4fdd\u6301\u5e73\u8861\u3002",
    about_me_para2:
      "\u6211\u662f Gati Shakti Vishwavidyalaya \u96fb\u5b50\u8207\u901a\u4fe1\u5de5\u7a0b\u5c08\u696d\u7684\u6700\u5f8c\u4e00\u5e74\u5b78\u751f\uff0c\u5c0d\u667a\u80fd\u7cfb\u7d71\u3001\u61c9\u7528\u4eba\u5de5\u667a\u80fd\u3001\u4eff\u771f\u548c\u8a08\u7b97\u5de5\u7a0b\u611f\u8208\u8da3\uff0c\u81f4\u529b\u65bc\u69cb\u5efa\u5be6\u7528\u4e14\u7d93\u904e\u6df1\u601d\u719f\u616e\u7684\u5de5\u7a0b\u89e3\u6c7a\u65b9\u6848\u3002",
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
    skill_ml: "機器學習",
    projects_heading: "項目",
    project_demand_title: "超本地化需求預測",
    project_demand_desc: "一種輕量級的 AI 管道，用於快速準確地進行快速商務需求預測。",
    project_plant_title: "植物病害 IoT 監視器",
    project_plant_desc: "ESP32-CAM 上的端到端 TinyML 管道，使用自定義 18KB CNN 檢測植物病害。",
    project_robot_title: "ROS 2 自主機器人",
    project_robot_desc: "一個數學模型的滑動轉向機器人，在 ROS 2 和 Gazebo 中通過閉式運動學自主導航。",
    project_facevision_title: "人臉識別",
    project_facevision_desc: "使用OpenCV檢測圖像和視頻中的人臉。",
    project_stardetection_title: "星星檢測",
    project_stardetection_desc: "從NASA哈勃系列圖像中檢測星星。",
    view_project_link: "查看項目",
    project_portfolio_title: "個人作品集網站",
    project_portfolio_desc:
      "一個透過「感覺編程」開發的個人網站，展示項目、詩歌和文章，使用HTML、CSS和JavaScript構建，具有響應式設計和多語言支持。",
    view_project_link: "查看項目",
    projects_coming_soon: "更多項目即將推出 — 敬請期待！",
    experience_heading: "經驗",
    exp_railway_company: "安巴拉鐵路局 (北部鐵路)",
    exp_railway_role: "S & T 部門15天實習",
    exp_railway_date: "2024年5月",
    exp_railway_description: "獲得了鐵路信號基礎知識的見解。",
    exp_nith_institute: "哈米爾布爾國立理工學院",
    exp_nith_role: "1個月研究實習",
    exp_nith_date: "2025年6月 - 7月",
    exp_nith_description: "對GAN模型和深度學習進行了研究。",
    currently_learning_heading: "目前正在學習",
    learning_java: "Java",
    learning_datastructures: "數據結構",
    learning_deep_learning: "深度學習",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "天線與電波傳播",
    learning_cuda: "並行計算 (CUDA)",
    connect_heading: "聯繫",
  },
  ko: {
    /* Korean */ page_title: "파스 시두 - 포트폴리오",
    nav_home: "홈",
    nav_projects: "프로젝트",
    nav_connect: "연락처",
    nav_poems_articles: "시와 기사",
    hero_welcome: "환영합니다",
    hero_tagline: "디지털 베틀에서 꿈을 엮다.",
    profile_name: "파스 시두",
    profile_tagline:
      "ECE 학생 | AI & 소프트웨어 개발 애호가 | 시네마틱 사고방식",
    about_me_heading: "소개",
    about_me_para1:
      "\uc2ec\ub77c\uc758 \uace0\uc694\ud55c \uc5b8\ub355\uacfc \ub370\uc624\ub2e4\ub974 \uc232 \uc18d\uc5d0\uc11c \uc790\ub77c\uba74\uc11c \uc81c \uc0ac\uace0\ubc29\uc2dd\uc774 \ud615\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \ud638\uae30\uc2ec\uacfc \ucc28\ubd84\ud55c \uad00\ucc30\ub825, \ucc3d\uc758\uc131\uacfc \uad6c\uc870 \uc0ac\uc774\uc758 \uade0\ud615\uc744 \ub9de\ucd94\ub294 \ubc95\uc744 \ubc30\uc6e0\uc2b5\ub2c8\ub2e4.",
    about_me_para2:
      "\uc800\ub294 Gati Shakti Vishwavidyalaya\uc5d0\uc11c \uc804\uc790 \ubc0f \ud1b5\uc2e0 \uacf5\ud559\uc744 \uc804\uacf5\ud558\ub294 4\ud559\ub144 \ud559\uc0dd\uc785\ub2c8\ub2e4. \uc9c0\ub2a5\ud615 \uc2dc\uc2a4\ud15c, \uc751\uc6a9 AI, \uc2dc\ubbac\ub808\uc774\uc158 \ubc0f \ucef4\ud4e8\ud130 \uacf5\ud559\uc5d0 \uad00\uc2ec\uc774 \uc788\uc73c\uba70, \uc2e4\uc6a9\uc801\uc774\uace0 \uc2e0\uc911\ud558\uac8c \uc124\uacc4\ub41c \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1 \uc194\ub8e8\uc158\uc744 \uad6c\ucd95\ud558\ub294 \ub370 \uc911\uc810\uc744 \ub450\uace0 \uc788\uc2b5\ub2c8\ub2e4.",
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
    skill_ml: "머신러닝",
    projects_heading: "프로젝트",
    project_demand_title: "초지역적 수요 예측",
    project_demand_desc: "빠르고 정확한 퀵커머스 수요 예측을 위한 경량 AI 파이프라인.",
    project_plant_title: "식물 질병 IoT 모니터",
    project_plant_desc: "맞춤형 18KB CNN을 사용하여 식물 질병을 감지하는 ESP32-CAM의 종단간 TinyML 파이프라인.",
    project_robot_title: "ROS 2 자율 로봇",
    project_robot_desc: "ROS 2 및 Gazebo에서 폐쇄형 운동학을 통해 자율적으로 탐색하는 수학적으로 모델링된 스키드 스티어 로봇.",
    project_facevision_title: "페이스 비전",
    project_facevision_desc:
      "OpenCV를 사용하여 이미지 및 비디오에서 얼굴을 감지합니다.",
    project_stardetection_title: "스타 탐지",
    project_stardetection_desc:
      "NASA의 허블 컬렉션 이미지에서 별을 감지합니다.",
    view_project_link: "프로젝트 보기",
    project_portfolio_title: "개인 포트폴리오 웹사이트",
    project_portfolio_desc:
      "프로젝트, 시, 기사를 선보이는 '바이브 코딩' 방식으로 개발된 개인 웹사이트로, HTML, CSS, JavaScript로 구축되었으며 반응형 디자인 및 다국어 지원 기능을 제공합니다.",
    view_project_link: "프로젝트 보기",
    projects_coming_soon: "더 많은 프로젝트가 곧 출시됩니다 — 기대해주세요!",
    experience_heading: "경험",
    exp_railway_company: "DRM 암발라 (북부 철도)",
    exp_railway_role: "S & T 부서 15일 인턴십",
    exp_railway_date: "2024년 5월",
    exp_railway_description: "철도 신호 기본 사항에 대한 통찰력을 얻었습니다.",
    exp_nith_institute: "NIT 하미르푸르",
    exp_nith_role: "1개월 연구 인턴십",
    exp_nith_date: "2025년 6월 - 7월",
    exp_nith_description: "GAN 모델 및 딥러닝에 대한 연구를 수행했습니다.",
    currently_learning_heading: "현재 학습 중",
    learning_java: "Java",
    learning_datastructures: "데이터 구조",
    learning_deep_learning: "심층 학습",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "안테나 및 전파 전파",
    learning_cuda: "병렬 컴퓨팅 (CUDA)",
    connect_heading: "연결",
  },
  ja: {
    page_title: "パース・シドゥー - ポートフォリオ",
    nav_home: "ホーム",
    nav_projects: "プロジェクト",
    nav_connect: "連絡先",
    nav_poems_articles: "「詩と記事」",
    hero_welcome: "ようこそ",
    hero_tagline: "デジタル織機で夢を織る。",
    profile_name: "パース・シドゥー",
    profile_tagline:
      "ECE学生 | AI＆ソフトウェア開発愛好家 | 映画のような考え方",
    about_me_heading: "私について",
    about_me_para1:
      "\u30b7\u30e0\u30e9\u30fc\u306e\u9759\u304b\u306a\u4e18\u3068\u30d2\u30de\u30e9\u30e4\u30b9\u30ae\u306e\u68ee\u306e\u4e2d\u3067\u80b2\u3063\u305f\u7d4c\u9a13\u306f\u3001\u79c1\u306e\u601d\u8003\u30d7\u30ed\u30bb\u30b9\u3092\u5f62\u6210\u3057\u307e\u3057\u305f\u3002\u597d\u5947\u5fc3\u3068\u51b7\u9759\u306a\u89b3\u5bdf\u3001\u5275\u9020\u6027\u3068\u69cb\u9020\u306e\u30d0\u30e9\u30f3\u30b9\u3092\u4fdd\u3064\u3053\u3068\u3092\u5b66\u3073\u307e\u3057\u305f\u3002",
    about_me_para2:
      "\u79c1\u306f Gati Shakti Vishwavidyalaya \u3067\u96fb\u5b50\u901a\u4fe1\u5de5\u5b66\u3092\u5c02\u653b\u3059\u308b\u6700\u7d42\u5b66\u5e74\u306e\u5b66\u751f\u3067\u3059\u3002\u30a4\u30f3\u30c6\u30ea\u30b8\u30a7\u30f3\u30c8 \u30b7\u30b9\u30c6\u30e0\u3001\u5fdc\u7528 AI\u3001\u30b7\u30df\u30e5\u30ec\u30fc\u30b7\u30e7\u30f3\u3001\u8a08\u7b97\u5de5\u5b66\u306b\u8208\u5473\u304c\u3042\u308a\u3001\u5b9f\u7528\u7684\u3067\u601d\u616e\u6df1\u304f\u8a2d\u8a08\u3055\u308c\u305f\u30bd\u30ea\u30e5\u30fc\u30b7\u30e7\u30f3\u306e\u69cb\u7bc9\u306b\u91cd\u70b9\u3092\u7f6e\u3044\u3066\u3044\u307e\u3059\u3002",
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
    skill_ml: "機械学習",
    projects_heading: "プロジェクト",
    project_demand_title: "ハイパーローカル需要予測",
    project_demand_desc: "高速で正確なクイックコマース需要予測のための軽量なAIパイプライン。",
    project_plant_title: "植物病害IoTモニター",
    project_plant_desc: "カスタム18KB CNNを使用して植物の病気を検出するESP32-CAM上のエンドツーエンドのTinyMLパイプライン。",
    project_robot_title: "ROS 2 自律ロボット",
    project_robot_desc: "ROS 2とGazeboにおいて閉形式運動学により自律的にナビゲートする数学的にモデル化されたスキッドステアロボット。",
    project_facevision_title: "フェイス・ビジョン",
    project_facevision_desc: "OpenCVを使用して画像や動画内の顔を検出します。",
    project_stardetection_title: "スター・ディテクション",
    project_stardetection_desc:
      "NASAのハッブルコレクションの画像から星を検出します。",
    view_project_link: "プロジェクトを見る",
    project_portfolio_title: "個人ポートフォリオウェブサイト",
    project_portfolio_desc:
      "プロジェクト、詩、記事を展示する、感覚でコーディングされた個人ウェブサイトです。HTML、CSS、JavaScriptで構築されており、レスポンシブデザインと多言語対応が特徴です。",
    view_project_link: "プロジェクトを見る",
    projects_coming_soon: "他のプロジェクトも近日公開予定です — お楽しみに！",
    experience_heading: "経験",
    exp_railway_company: "DRMアンバラ (北部鉄道)",
    exp_railway_role: "S & T部門での15日間のインターンシップ",
    exp_railway_date: "2024年5月",
    exp_railway_description: "鉄道信号の基礎に関する洞察を得た。",
    exp_nith_institute: "NITハミールプル",
    exp_nith_role: "1ヶ月間の研究インターンシップ",
    exp_nith_date: "2025年6月 - 7月",
    exp_nith_description: "GANモデルと深層学習に関する研究を実施した。",
    currently_learning_heading: "現在学習中",
    learning_java: "Java",
    learning_datastructures: "データ構造",
    learning_deep_learning: "深層学習",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "アンテナと電波伝搬",
    learning_cuda: "並列コンピューティング (CUDA)",
    connect_heading: "接続",
  },
  ar: {
    /* Arabic */ page_title: "بارث سيدو - ملف شخصي",
    nav_home: "الرئيسية",
    nav_projects: "المشاريع",
    nav_connect: "تواصل",
    nav_poems_articles: "قصائد ومقالات",
    hero_welcome: "مرحبا بك",
    hero_tagline: "نسج الأحلام في نول رقمي.",
    profile_name: "بارث سيدو",
    profile_tagline:
      "طالب ECE | متحمس للذكاء الاصطناعي وتطوير البرمجيات | عقلية سينمائية",
    about_me_heading: "عني",
    about_me_para1:
      "\u0644\u0642\u062f \u0634\u0643\u0644\u062a \u0646\u0634\u0623\u062a\u064a \u0648\u0633\u0637 \u062a\u0644\u0627\u0644 \u0634\u064a\u0645\u0644\u0627 \u0627\u0644\u0647\u0627\u062f\u0626\u0629 \u0648\u063a\u0627\u0628\u0627\u062a \u0627\u0644\u062f\u0648\u062f\u0627\u0631 \u0627\u0644\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062a\u064a \u0623\u0641\u0643\u0631 \u0628\u0647\u0627 - \u062d\u064a\u062b \u0627\u0644\u0645\u0648\u0627\u0632\u0646\u0629 \u0628\u064a\u0646 \u0627\u0644\u0641\u0636\u0648\u0644 \u0648\u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0629 \u0627\u0644\u0647\u0627\u062f\u0626\u0629\u060c \u0648\u0628\u064a\u0646 \u0627\u0644\u0625\u0628\u062f\u0627\u0639 \u0648\u0627\u0644\u0647\u064a\u0643\u0644 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a.",
    about_me_para2:
      "\u0623\u0646\u0627 \u0637\u0627\u0644\u0628 \u0641\u064a \u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629 \u0641\u064a \u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u0627\u062a\u0635\u0627\u0644\u0627\u062a \u0641\u064a \u062c\u0627\u0645\u0639\u0629 \u062c\u0627\u062a\u064a \u0634\u0627\u0643\u062a\u064a \u0641\u064a\u0634\u0648\u0627\u0641\u064a\u062f\u064a\u0627\u0644\u0627\u064a\u0627\u060c \u0645\u0647\u062a\u0645 \u0628\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0630\u0643\u064a\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a \u0648\u0627\u0644\u0645\u062d\u0627\u0643\u0627\u0629 \u0648\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u062d\u0627\u0633\u0648\u0628\u064a\u0629\u060c \u0645\u0639 \u0627\u0644\u062a\u0631\u0643\u064a\u0632 \u0639\u0644\u0649 \u0628\u0646\u0627\u0621 \u062d\u0644\u0648\u0644 \u0647\u0646\u062f\u0633\u064a\u0629 \u0639\u0645\u0644\u064a\u0629 \u0648\u0645\u062f\u0631\u0648\u0633\u0629 \u0628\u0639\u0646\u0627\u064a\u0629.",
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
    skill_ml: "تعلم الآلة",
    projects_heading: "المشاريع",
    project_demand_title: "تنبؤ الطلب المحلي الفائق",
    project_demand_desc: "خط أنابيب ذكاء اصطناعي خفيف الوزن لتنبؤ سريع ودقيق بطلب التجارة السريعة.",
    project_plant_title: "مراقب أمراض النباتات بإنترنت الأشياء",
    project_plant_desc: "خط أنابيب TinyML على ESP32-CAM لاكتشاف أمراض النبات باستخدام شبكة CNN مخصصة بسعة 18 كيلو بايت.",
    project_robot_title: "روبوت ROS 2 المستقل",
    project_robot_desc: "روبوت بنموذج رياضي يتنقل بشكل مستقل عبر حركيات مغلقة في ROS 2 و Gazebo.",
    project_facevision_title: "رؤية الوجه",
    project_facevision_desc:
      "اكتشاف الوجوه في الصور ومقاطع الفيديو باستخدام OpenCV.",
    project_stardetection_title: "اكتشاف النجوم",
    project_stardetection_desc:
      "اكتشاف النجوم في الصور من مجموعة هابل التابعة لوكالة ناسا.",
    view_project_link: "عرض المشروع",
    project_portfolio_title: "موقع المحفظة الشخصية",
    project_portfolio_desc:
      "موقع شخصي مبرمج بأسلوب 'فايبر كودينج' يعرض المشاريع والقصائد والمقالات، مبني باستخدام HTML وCSS وجافاسكريبت، ويتميز بتصميم متجاوب ودعم متعدد اللغات.",
    view_project_link: "عرض المشروع",
    projects_coming_soon: "المزيد من المشاريع قريبا — ترقبوا!",
    experience_heading: "الخبرة",
    exp_railway_company: "DRM أمبالا (السكك الحديدية الشمالية)",
    exp_railway_role: "تدريب لمدة 15 يومًا في قسم S & T",
    exp_railway_date: "مايو 2024",
    exp_railway_description: "اكتسبت رؤى حول أساسيات إشارات السكك الحديدية.",
    exp_nith_institute: "معهد NIT هاميربور",
    exp_nith_role: "تدريب بحثي لمدة شهر واحد",
    exp_nith_date: "يونيو - يوليو 2025",
    exp_nith_description: "أجرى بحثًا عن نماذج GAN والتعلم العميق.",
    currently_learning_heading: "أتعلم حاليا",
    learning_java: "جافا",
    learning_datastructures: "هياكل البيانات",
    learning_deep_learning: "التعلم العميق",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "الهوائيات وانتشار الموجات",
    learning_cuda: "الحوسبة المتوازية (CUDA)",
    connect_heading: "تواصل",
  },
  fa: {
    /* Persian */ page_title: "پارت سیدو - نمونه کار",
    nav_home: "خانه",
    nav_projects: "پروژه ها",
    nav_connect: "تماس",
    nav_poems_articles: "«اشعار و مقالات»",
    hero_welcome: "خوش آمدید",
    hero_tagline: "بافتن رویاها در تار و پود دیجیتال.",
    profile_name: "پارت سیدو",
    profile_tagline:
      "دانشجوی ECE | علاقه‌مند به هوش مصنوعی و توسعه نرم‌افزار | ذهنیت سینمایی",
    about_me_heading: "درباره من",
    about_me_para1:
      "\u0628\u0632\u0631\u06af \u0634\u062f\u0646 \u062f\u0631 \u0645\u06cc\u0627\u0646 \u062a\u067e\u0647\u200c\u0647\u0627\u06cc \u0622\u0631\u0627\u0645 \u0648 \u062c\u0646\u06af\u0644\u200c\u0647\u0627\u06cc \u062f\u0626\u0648\u062f\u0627\u0631 \u0634\u06cc\u0645\u0644\u0627\u060c \u0637\u0631\u0632 \u0641\u06a9\u0631 \u0645\u0646 \u0631\u0627 \u0634\u06a9\u0644 \u062f\u0627\u062f\u0647 \u0627\u0633\u062a \u2014 \u0627\u06cc\u062c\u0627\u062f \u062a\u0639\u0627\u062f\u0644 \u0628\u06cc\u0646 \u06a9\u0646\u062c\u06a9\u0627\u0648\u06cc \u0648 \u0645\u0634\u0627\u0647\u062f\u0647 \u0622\u0631\u0627\u0645\u060c \u0648 \u062e\u0644\u0627\u0642\u06cc\u062a \u0628\u0627 \u0633\u0627\u062e\u062a\u0627\u0631.",
    about_me_para2:
      "\u0645\u0646 \u062f\u0627\u0646\u0634\u062c\u0648\u06cc \u0633\u0627\u0644 \u0622\u062e\u0631 \u0645\u0647\u0646\u062f\u0633\u06cc \u0627\u0644\u06a9\u062a\u0631\u0648\u0646\u06cc\u06a9 \u0648 \u0627\u0631\u062a\u0628\u0627\u0637\u0627\u062a \u062f\u0631 \u062f\u0627\u0646\u0634\u06af\u0627\u0647 \u06af\u0627\u062a\u06cc \u0634\u0627\u06a9\u062a\u06cc \u0648\u06cc\u0634\u0648\u0627\u0648\u06cc\u062f\u06cc\u0627\u0644\u0627\u06cc\u0627 \u0647\u0633\u062a\u0645 \u06a9\u0647 \u0628\u0647 \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f\u060c \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u06a9\u0627\u0631\u0628\u0631\u062f\u06cc\u060c \u0634\u0628\u06cc\u0647\u200c\u0633\u0627\u0632\u06cc \u0648 \u0645\u0647\u0646\u062f\u0633\u06cc \u0645\u062d\u0627\u0633\u0628\u0627\u062a\u06cc \u0639\u0644\u0627\u0642\u0647\u200c\u0645\u0646\u062f\u0645 \u0648 \u062a\u0645\u0631\u06a9\u0632\u0645 \u0628\u0631 \u0633\u0627\u062e\u062a \u0631\u0627\u0647\u200c\u062d\u0644\u200c\u0647\u0627\u06cc \u0645\u0647\u0646\u062f\u0633\u06cc \u0639\u0645\u0644\u06cc \u0648 \u0645\u062a\u0641\u06a9\u0631\u0627\u0646\u0647 \u0627\u0633\u062a.",
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
    skill_ml: "یادگیری ماشین",
    projects_heading: "پروژه‌ها",
    project_demand_title: "پیش‌بینی تقاضای بیش‌محلی",
    project_demand_desc: "یک خط لوله هوش مصنوعی سبک برای پیش‌بینی سریع و دقیق تقاضای تجارت سریع.",
    project_plant_title: "نمایشگر بیماری‌های گیاهی IoT",
    project_plant_desc: "یک خط لوله TinyML در ESP32-CAM برای تشخیص بیماری‌های گیاهی با استفاده از CNN سفارشی 18KB.",
    project_robot_title: "ربات خودمختار ROS 2",
    project_robot_desc: "یک ربات با مدل‌سازی ریاضی که به‌طور خودمختار از طریق سینماتیک در ROS 2 و Gazebo حرکت می‌کند.",
    project_facevision_title: "فیس-ویژن",
    project_facevision_desc:
      "تشخیص چهره در تصاویر و ویدئوها با استفاده از OpenCV.",
    project_stardetection_title: "تشخیص ستاره",
    project_stardetection_desc: "تشخیص ستاره‌ها در تصاویر از مجموعه هابل ناسا.",
    view_project_link: "مشاهده پروژه",
    project_portfolio_title: "وب‌سایت نمونه کار شخصی",
    project_portfolio_desc:
      "یک وب‌سایت شخصی 'با کدینگ حسی' که پروژه‌ها، شعرها و مقالات را به نمایش می‌گذارد، با HTML، CSS و JavaScript ساخته شده و دارای طراحی واکنش‌گرا و پشتیبانی چندزبانه است.",
    view_project_link: "مشاهده پروژه",
    projects_coming_soon: "پروژه‌های بیشتر به زودی — با ما همراه باشید!",
    experience_heading: "تجربه",
    exp_railway_company: "DRM امبالا (راه‌آهن شمالی)",
    exp_railway_role: "دوره کارآموزی 15 روزه در بخش S & T",
    exp_railway_date: "مه 2024",
    exp_railway_description:
      "بینش‌هایی در مورد اصول سیگنالینگ راه‌آهن به دست آورد.",
    exp_nith_institute: "NIT هامیرپور",
    exp_nith_role: "دوره کارآموزی تحقیقاتی 1 ماهه",
    exp_nith_date: "ژوئن - ژوئیه 2025",
    exp_nith_description:
      "تحقیقاتی در مورد مدل‌های GAN و یادگیری عمیق انجام داد.",
    currently_learning_heading: "در حال یادگیری",
    learning_java: "جاوا",
    learning_datastructures: "ساختمان داده‌ها",
    learning_deep_learning: "یادگیری عمیق",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "آنتن و انتشار امواج",
    learning_cuda: "محاسبات موازی (CUDA)",
    connect_heading: "تماس",
  },
  fr: {
    /* French */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Accueil",
    nav_projects: "Projets",
    nav_connect: "Connecter",
    nav_poems_articles: "Poèmes et articles",
    hero_welcome: "BIENVENUE",
    hero_tagline: "Tisser des rêves dans le métier à tisser numérique.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Étudiant ECE | Passionné d'IA et de développement logiciel | Mentalité cinématique",
    about_me_heading: "À propos de moi",
    about_me_para1:
      "Grandir au milieu des collines tranquilles et des for\u00eats de c\u00e8dres de l'Himalaya \u00e0 Shimla a fa\u00e7onn\u00e9 ma fa\u00e7on de penser \u2014 \u00e9quilibrant curiosit\u00e9 et observation calme, cr\u00e9ativit\u00e9 et structure.",
    about_me_para2:
      "Je suis \u00e9tudiant en derni\u00e8re ann\u00e9e d'ing\u00e9nierie \u00e9lectronique et de communication \u00e0 Gati Shakti Vishwavidyalaya, int\u00e9ress\u00e9 par les syst\u00e8mes intelligents, l'IA appliqu\u00e9e, la simulation et l'ing\u00e9nierie informatique, avec un accent sur la cr\u00e9ation de solutions d'ing\u00e9nierie pratiques et r\u00e9fl\u00e9chies.",
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
    skill_ml: "Apprentissage Automatique",
    projects_heading: "Projets",
    project_demand_title: "Prévision de la Demande Hyperlocale",
    project_demand_desc: "Un pipeline d'IA léger pour des prévisions de demande rapides et précises dans le commerce rapide.",
    project_plant_title: "Moniteur IoT de Maladies des Plantes",
    project_plant_desc: "Un pipeline TinyML de bout en bout sur ESP32-CAM détectant les maladies des plantes avec un CNN personnalisé de 18 Ko.",
    project_robot_title: "Robot Autonome ROS 2",
    project_robot_desc: "Un robot modélisé mathématiquement naviguant de manière autonome via la cinématique dans ROS 2 et Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Détecter les visages dans les images et les vidéos à l'aide d'OpenCV.",
    project_stardetection_title: "Détection d'étoiles",
    project_stardetection_desc:
      "Détecter les étoiles dans les images de la collection Hubble de la NASA.",
    view_project_link: "Voir le projet",
    project_portfolio_title: "Site Web de Portfolio Personnel",
    project_portfolio_desc:
      "Un site web personnel codé « à l'instinct » présentant des projets, des poèmes et des articles, construit avec HTML, CSS et JavaScript, avec un design réactif et un support multilingue.",
    view_project_link: "Voir le projet",
    projects_coming_soon: "Plus de projets à venir — restez à l'écoute !",
    experience_heading: "Expérience",
    exp_railway_company: "DRM Ambala (Chemins de fer du Nord)",
    exp_railway_role: "Stage de 15 jours au Département S & T",
    exp_railway_date: "Mai 2024",
    exp_railway_description:
      "A acquis des connaissances sur les bases de la signalisation ferroviaire.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "Stage de recherche d'1 mois",
    exp_nith_date: "Juin - Juillet 2025",
    exp_nith_description:
      "A mené des recherches sur les modèles GAN et le Deep Learning.",
    currently_learning_heading: "Apprentissage en cours",
    learning_java: "Java",
    learning_datastructures: "Structures de données",
    learning_deep_learning: "Apprentissage profond",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antennes et Propagation des Ondes",
    learning_cuda: "Calcul Parallèle (CUDA)",
    connect_heading: "Connecter",
  },
  de: {
    /* German */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Startseite",
    nav_projects: "Projekte",
    nav_connect: "Verbinden",
    nav_poems_articles: "Gedichte und Artikel",
    hero_welcome: "WILLKOMMEN",
    hero_tagline: "Träume im digitalen Webstuhl weben.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE-Student | KI- & Softwareentwicklungs-Enthusiast | Cinematic Mindset",
    about_me_heading: "Über mich",
    about_me_para1:
      "Das Aufwachsen inmitten der ruhigen H\u00fcgel und Deodar-W\u00e4lder von Shimla hat meine Denkweise gepr\u00e4gt \u2014 eine Balance zwischen Neugier und ruhiger Beobachtung sowie Kreativit\u00e4t und Struktur.",
    about_me_para2:
      "Ich bin ein Student im letzten Jahr der Elektronik- und Informationstechnik an der Gati Shakti Vishwavidyalaya. Meine Interessen liegen in intelligenten Systemen, angewandter KI, Simulation und Computer-Engineering, mit dem Fokus auf die Entwicklung praktischer und durchdachter technischer L\u00f6sungen.",
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
    skill_ml: "Maschinelles Lernen",
    projects_heading: "Projekte",
    project_demand_title: "Hyperlokale Nachfragevorhersage",
    project_demand_desc: "Eine leichte KI-Pipeline für schnelle und genaue Nachfragevorhersagen im Quick-Commerce.",
    project_plant_title: "IoT-Pflanzenkrankheitsmonitor",
    project_plant_desc: "Eine End-to-End TinyML-Pipeline auf ESP32-CAM zur Erkennung von Pflanzenkrankheiten mit einem 18-KB-CNN.",
    project_robot_title: "Autonomer ROS 2-Roboter",
    project_robot_desc: "Ein mathematisch modellierter Roboter, der in ROS 2 und Gazebo autonom navigiert.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Erkennen von Gesichtern in Bildern und Videos mit OpenCV.",
    project_stardetection_title: "Sternen-Erkennung",
    project_stardetection_desc:
      "Erkennen von Sternen in Bildern aus der Hubble-Sammlung der NASA.",
    view_project_link: "Projekt ansehen",
    project_portfolio_title: "Persönliche Portfolio-Website",
    project_portfolio_desc:
      "Eine 'Vibe-codierte' persönliche Website, die Projekte, Gedichte und Artikel präsentiert, erstellt mit HTML, CSS und JavaScript, mit responsivem Design und mehrsprachiger Unterstützung.",
    view_project_link: "Projekt ansehen",
    projects_coming_soon:
      "Weitere Projekte folgen in Kürze — bleiben Sie dran!",
    experience_heading: "Erfahrung",
    exp_railway_company: "DRM Ambala (Nordbahn)",
    exp_railway_role: "15-tägiges Praktikum in der S & T Abteilung",
    exp_railway_date: "Mai 2024",
    exp_railway_description:
      "Einblicke in die Grundlagen der Eisenbahnsignaltechnik gewonnen.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "1-monatiges Forschungspraktikum",
    exp_nith_date: "Juni - Juli 2025",
    exp_nith_description:
      "Forschung zu GAN-Modellen und Deep Learning durchgeführt.",
    currently_learning_heading: "Aktuell lerne ich",
    learning_java: "Java",
    learning_datastructures: "Datenstrukturen",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antennen und Wellenausbreitung",
    learning_cuda: "Paralleles Rechnen (CUDA)",
    connect_heading: "Verbinden",
  },
  es: {
    /* Spanish */ page_title: "Parth Sidhu - Portafolio",
    nav_home: "Inicio",
    nav_projects: "Proyectos",
    nav_connect: "Conectar",
    nav_poems_articles: "Poemas y artículos",
    hero_welcome: "BIENVENIDO",
    hero_tagline: "Tejiendo sueños en el telar digital.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Estudiante de ECE | Entusiasta de la IA y el desarrollo de software | Mentalidad Cinematográfica",
    about_me_heading: "Sobre mí",
    about_me_para1:
      "Crecer en medio de las tranquilas colinas y los bosques de cedros del Himalaya en Shimla molde\u00f3 mi forma de pensar: equilibrando la curiosidad con la observaci\u00f3n tranquila, y la creatividad con la estructura.",
    about_me_para2:
      "Soy estudiante de \u00faltimo a\u00f1o de Ingenier\u00eda Electr\u00f3nica y de Comunicaciones en Gati Shakti Vishwavidyalaya, interesado en sistemas inteligentes, IA aplicada, simulaci\u00f3n e ingenier\u00eda computacional, con un enfoque en la construcci\u00f3n de soluciones de ingenier\u00eda pr\u00e1cticas y bien pensadas.",
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
    skill_ml: "Aprendizaje Automático",
    projects_heading: "Proyectos",
    project_demand_title: "Predicción de Demanda Hiperlocal",
    project_demand_desc: "Una canalización de IA ligera para predicciones rápidas y precisas de la demanda en el comercio rápido.",
    project_plant_title: "Monitor IoT de Enfermedades de Plantas",
    project_plant_desc: "Una canalización TinyML de extremo a extremo en ESP32-CAM que detecta enfermedades de plantas con un CNN de 18 KB.",
    project_robot_title: "Robot Autónomo ROS 2",
    project_robot_desc: "Un robot modelado matemáticamente que navega de forma autónoma a través de cinemática en ROS 2 y Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detectar rostros en imágenes y videos usando OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Detectar estrellas en imágenes de la colección Hubble de la NASA.",
    view_project_link: "Ver proyecto",
    project_portfolio_title: "Sitio Web de Portafolio Personal",
    project_portfolio_desc:
      "Un sitio web personal 'codificado con la vibra' que muestra proyectos, poemas y artículos, construido con HTML, CSS y JavaScript, con diseño responsivo y soporte multilingüe.",
    view_project_link: "Ver proyecto",
    projects_coming_soon: "Más proyectos próximamente — ¡mantente atento!",
    experience_heading: "Experiencia",
    exp_railway_company: "DRM Ambala (Ferrocarril del Norte)",
    exp_railway_role: "Prácticas de 15 días en el Departamento de S & T",
    exp_railway_date: "Mayo 2024",
    exp_railway_description:
      "Obtuvo conocimientos sobre los fundamentos de la señalización ferroviaria.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "Prácticas de investigación de 1 mes",
    exp_nith_date: "Junio - Julio 2025",
    exp_nith_description:
      "Realizó investigaciones sobre modelos GAN y aprendizaje profundo.",
    currently_learning_heading: "Actualmente aprendiendo",
    learning_java: "Java",
    learning_datastructures: "Estructuras de datos",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antenas y Propagación de Ondas",
    learning_cuda: "Computación Paralela (CUDA)",
    connect_heading: "Conectar",
  },
  pt: {
    /* Portuguese */ page_title: "Parth Sidhu - Portfólio",
    nav_home: "Início",
    nav_projects: "Projetos",
    nav_connect: "Conectar",
    nav_poems_articles: "Poemas e Artigos",
    hero_welcome: "BEM-VINDO",
    hero_tagline: "Tecendo Sonhos no Tear Digital.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Estudante de ECE | Entusiasta de IA e Desenvolvimento de Software | Mentalidade Cinematográfica",
    about_me_heading: "Sobre Mim",
    about_me_para1:
      "Crescer no meio das colinas tranquilas e das florestas de cedros do Himalaia em Shimla moldou a minha forma de pensar \u2014 equilibrando a curiosidade com a observa\u00e7\u00e3o calma, e a criatividade com a estrutura.",
    about_me_para2:
      "Sou aluno do \u00faltimo ano de Engenharia Eletr\u00f3nica e de Comunica\u00e7\u00f5es na Gati Shakti Vishwavidyalaya, interessado em sistemas inteligentes, IA aplicada, simula\u00e7\u00e3o e engenharia computacional, com foco na constru\u00e7\u00e3o de solu\u00e7\u00f5es de engenharia pr\u00e1ticas e bem pensadas.",
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
    skill_ml: "Aprendizado de Máquina",
    projects_heading: "Projetos",
    project_demand_title: "Previsão de Demanda Hiperlocal",
    project_demand_desc: "Um pipeline de IA leve para previsão rápida e precisa da demanda de comércio rápido.",
    project_plant_title: "Monitor IoT de Doenças de Plantas",
    project_plant_desc: "Um pipeline TinyML de ponta a ponta no ESP32-CAM detectando doenças de plantas com um CNN de 18 KB.",
    project_robot_title: "Robô Autônomo ROS 2",
    project_robot_desc: "Um robô modelado matematicamente navegando de forma autônoma via cinemática no ROS 2 e Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detectar rostos em imagens e vídeos usando OpenCV.",
    project_stardetection_title: "Detecção de Estrelas",
    project_stardetection_desc:
      "Detectar estrelas em imagens da coleção Hubble da NASA.",
    view_project_link: "Ver projeto",
    project_portfolio_title: "Website de Portfólio Pessoal",
    project_portfolio_desc:
      "Um website pessoal 'vibe-coded' que exibe projetos, poemas e artigos, construído com HTML, CSS e JavaScript, apresentando design responsivo e suporte a múltiplos idiomas.",
    view_project_link: "Ver projeto",
    projects_coming_soon: "Mais projetos em breve — fique ligado!",
    currently_learning_heading: "Atualmente Aprendendo",
    experience_heading: "Experiência",
    exp_railway_company: "DRM Ambala (Ferrovia do Norte)",
    exp_railway_role: "Estágio de 15 dias no Departamento de S & T",
    exp_railway_date: "Maio 2024",
    exp_railway_description:
      "Obteve insights sobre os fundamentos da sinalização ferroviária.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "Estágio de Pesquisa de 1 Mês",
    exp_nith_date: "Junho - Julho 2025",
    exp_nith_description:
      "Conduziu pesquisas sobre Modelos GAN e Aprendizagem Profunda.",
    learning_java: "Java",
    learning_datastructures: "Estruturas de Dados",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antenas e Propagação de Ondas",
    learning_cuda: "Computação Paralela (CUDA)",
    connect_heading: "Conectar",
  },
  it: {
    /* Italian */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Progetti",
    nav_connect: "Connetti",
    nav_poems_articles: "Poesie e articoli",
    hero_welcome: "BENVENUTO",
    hero_tagline: "Tessere sogni nel telaio digitale.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "Studente ECE | Appassionato di AI | Sviluppatore orientato alla storia",
    about_me_heading: "Su di me",
    about_me_para1:
      "Crescere tra le tranquille colline e le foreste di cedri dell'Himalaya a Shimla ha plasmato il mio modo di pensare: in equilibrio tra curiosit\u00e0 e osservazione calma, tra creativit\u00e0 e struttura.",
    about_me_para2:
      "Sono uno studente all'ultimo anno di Ingegneria Elettronica e delle Telecomunicazioni presso Gati Shakti Vishwavidyalaya, interessato ai sistemi intelligenti, all'IA applicata, alla simulazione e all'ingegneria computazionale, con un focus sulla costruzione di soluzioni ingegneristiche pratiche e ponderate.",
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
    skill_ml: "Apprendimento Automatico",
    projects_heading: "Progetti",
    project_demand_title: "Previsione della Domanda Iperlocale",
    project_demand_desc: "Una pipeline AI leggera per previsioni rapide e accurate della domanda nel quick-commerce.",
    project_plant_title: "Monitor IoT delle Malattie delle Piante",
    project_plant_desc: "Una pipeline TinyML end-to-end su ESP32-CAM che rileva malattie delle piante utilizzando una CNN personalizzata da 18 KB.",
    project_robot_title: "Robot Autonomo ROS 2",
    project_robot_desc: "Un robot modellato matematicamente che naviga autonomamente tramite cinematica in ROS 2 e Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Rileva i volti in immagini e video usando OpenCV.",
    project_stardetection_title: "Rilevamento Stelle",
    project_stardetection_desc:
      "Rileva le stelle nelle immagini dalla collezione Hubble della NASA.",
    view_project_link: "Visualizza progetto",
    project_portfolio_title: "Sito Web Portfolio Personale",
    project_portfolio_desc:
      "Un sito web personale 'vibe-coded' che mostra progetti, poesie e articoli, costruito con HTML, CSS e JavaScript, con design reattivo e supporto multilingue.",
    view_project_link: "Vedi progetto",
    projects_coming_soon: "Altri progetti in arrivo — resta sintonizzato!",
    experience_heading: "Esperienza",
    exp_railway_company: "DRM Ambala (Ferrovie del Nord)",
    exp_railway_role: "Tirocinio di 15 giorni nel Dipartimento S & T",
    exp_railway_date: "Maggio 2024",
    exp_railway_description:
      "Ha acquisito conoscenze sulle basi della segnalazione ferroviaria.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "Tirocinio di ricerca di 1 mese",
    exp_nith_date: "Giugno - Luglio 2025",
    exp_nith_description:
      "Ha condotto ricerche sui modelli GAN e sul Deep Learning.",
    currently_learning_heading: "Attualmente in Apprendimento",
    learning_java: "Java",
    learning_datastructures: "Strutture Dati",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antenne e Propagazione delle Onde",
    learning_cuda: "Calcolo Parallelo (CUDA)",
    connect_heading: "Connetti",
  },
  ru: {
    /* Russian */ page_title: "Парт Сидху - Портфолио",
    nav_home: "Главная",
    nav_projects: "Проекты",
    nav_connect: "Связаться",
    nav_poems_articles: "Стихи и статьи",
    hero_welcome: "ДОБРО ПОЖАЛОВАТЬ",
    hero_tagline: "Плетение мечт на цифровом станке.",
    profile_name: "Парт Сидху",
    profile_tagline:
      "Студент ECE | Энтузиаст ИИ и разработки ПО | Кинематографическое мышление",
    about_me_heading: "Обо мне",
    about_me_para1:
      "\u0412\u0437\u0440\u043e\u0441\u043b\u0435\u043d\u0438\u0435 \u0441\u0440\u0435\u0434\u0438 \u0442\u0438\u0445\u0438\u0445 \u0445\u043e\u043b\u043c\u043e\u0432 \u0438 \u043a\u0435\u0434\u0440\u043e\u0432\u044b\u0445 \u043b\u0435\u0441\u043e\u0432 \u0428\u0438\u043c\u043b\u044b \u0441\u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043b\u043e \u043c\u043e\u0439 \u043e\u0431\u0440\u0430\u0437 \u043c\u044b\u0448\u043b\u0435\u043d\u0438\u044f \u2014 \u0431\u0430\u043b\u0430\u043d\u0441 \u043c\u0435\u0436\u0434\u0443 \u043b\u044e\u0431\u043e\u043f\u044b\u0442\u0441\u0442\u0432\u043e\u043c \u0438 \u0441\u043f\u043e\u043a\u043e\u0439\u043d\u044b\u043c \u043d\u0430\u0431\u043b\u044e\u0434\u0435\u043d\u0438\u0435\u043c, \u0442\u0432\u043e\u0440\u0447\u0435\u0441\u0442\u0432\u043e\u043c \u0438 \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u043e\u0439.",
    about_me_para2:
      "\u042f \u0441\u0442\u0443\u0434\u0435\u043d\u0442 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0444\u0430\u043a\u0443\u043b\u044c\u0442\u0435\u0442\u0430 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u0438\u043a\u0438 \u0438 \u0441\u0432\u044f\u0437\u0438 \u0432 Gati Shakti Vishwavidyalaya, \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0441\u044c \u0438\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0441\u0438\u0441\u0442\u0435\u043c\u0430\u043c\u0438, \u043f\u0440\u0438\u043a\u043b\u0430\u0434\u043d\u044b\u043c \u0418\u0418, \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435\u043c \u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u0438\u0435\u0439, \u0441 \u0430\u043a\u0446\u0435\u043d\u0442\u043e\u043c \u043d\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u044b\u0445 \u0438 \u043f\u0440\u043e\u0434\u0443\u043c\u0430\u043d\u043d\u044b\u0445 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u043d\u044b\u0445 \u0440\u0435\u0448\u0435\u043d\u0438\u0439.",
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
    skill_ml: "Машинное обучение",
    projects_heading: "Проекты",
    project_demand_title: "Гиперлокальное прогнозирование спроса",
    project_demand_desc: "Легкий конвейер ИИ для быстрого и точного прогнозирования спроса в сфере быстрой коммерции.",
    project_plant_title: "IoT-монитор болезней растений",
    project_plant_desc: "Сквозной конвейер TinyML на ESP32-CAM, обнаруживающий болезни растений с помощью пользовательской CNN на 18 КБ.",
    project_robot_title: "Автономный робот ROS 2",
    project_robot_desc: "Математически смоделированный робот, автономно перемещающийся с помощью кинематики в ROS 2 и Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Обнаружение лиц на изображениях и видео с использованием OpenCV.",
    project_stardetection_title: "Star-Detection",
    project_stardetection_desc:
      "Обнаружение звезд на изображениях из коллекции Хаббла НАСА.",
    view_project_link: "Посмотреть проект",
    project_portfolio_title: "Сайт личного портфолио",
    project_portfolio_desc:
      "Персональный веб-сайт, созданный «по наитию», демонстрирующий проекты, стихи и статьи, разработанный с использованием HTML, CSS и JavaScript, с адаптивным дизайном и многоязычной поддержкой.",
    view_project_link: "Посмотреть проект",
    projects_coming_soon:
      "Скоро появятся новые проекты — следите за обновлениями!",
    experience_heading: "Опыт",
    exp_railway_company: "DRM Амбала (Северная железная дорога)",
    exp_railway_role: "15-дневная стажировка в отделе S & T",
    exp_railway_date: "Май 2024",
    exp_railway_description:
      "Получены знания об основах железнодорожной сигнализации.",
    exp_nith_institute: "НИТ Хамирпур",
    exp_nith_role: "1-месячная исследовательская стажировка",
    exp_nith_date: "Июнь - Июль 2025",
    exp_nith_description:
      "Проведены исследования по моделям GAN и глубокому обучению.",
    currently_learning_heading: "В настоящее время изучаю",
    learning_java: "Java",
    learning_datastructures: "Структуры данных",
    learning_deep_learning: "Глубокое обучение",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Антенны и распространение радиоволн",
    learning_cuda: "Параллельные вычисления (CUDA)",
    connect_heading: "Связаться",
  },
  tr: {
    /* Turkish */ page_title: "Parth Sidhu - Portföy",
    nav_home: "Ana Sayfa",
    nav_projects: "Projeler",
    nav_connect: "Bağlan",
    nav_poems_articles: "Şiirler ve Makaleler",
    hero_welcome: "HOŞ GELDİNİZ",
    hero_tagline: "Dijital Tezgahta Hayaller Dokunuyor.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE öğrencisi | Yapay Zeka ve Yazılım Geliştirme Meraklısı | Sinematik Zihniyet",
    about_me_heading: "Hakkımda",
    about_me_para1:
      "Shimla'n\u0131n sessiz tepeleri ve Deodar ormanlar\u0131n\u0131n ortas\u0131nda b\u00fcy\u00fcmek, d\u00fc\u015f\u00fcnce tarz\u0131m\u0131 \u015fekillendirdi \u2014 merak\u0131 sakin bir g\u00f6zlemle, yarat\u0131c\u0131l\u0131\u011f\u0131 ise yap\u0131yla dengelememi sa\u011flad\u0131.",
    about_me_para2:
      "Gati Shakti Vishwavidyalaya'da Elektronik ve Haberle\u015fme M\u00fchendisli\u011fi son s\u0131n\u0131f \u00f6\u011frencisiyim. Ak\u0131ll\u0131 sistemler, uygulamal\u0131 yapay zeka, sim\u00fclasyon ve hesaplamal\u0131 m\u00fchendislik ile ilgileniyor, pratik ve d\u00fc\u015f\u00fcnceli bir \u015fekilde tasarlanm\u0131\u015f \u00e7\u00f6z\u00fcmler olu\u015fturmaya odaklan\u0131yorum.",
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
    skill_ml: "Makine Öğrenimi",
    projects_heading: "Projeler",
    project_demand_title: "Hiperlokal Talep Tahmini",
    project_demand_desc: "Hızlı ve doğru hızlı ticaret talep tahmini için hafif bir AI boru hattı.",
    project_plant_title: "Bitki Hastalığı IoT Monitörü",
    project_plant_desc: "Özel bir 18KB CNN kullanarak bitki hastalıklarını tespit eden ESP32-CAM üzerinde uçtan uca bir TinyML boru hattı.",
    project_robot_title: "ROS 2 Otonom Robot",
    project_robot_desc: "ROS 2 ve Gazebo'da kapalı form kinematiği aracılığıyla otonom olarak gezinen matematiksel olarak modellenmiş bir robot.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "OpenCV kullanarak resimlerde ve videolarda yüzleri algılayın.",
    project_stardetection_title: "Yıldız Algılama",
    project_stardetection_desc:
      "NASA'nın Hubble koleksiyonundaki resimlerde yıldızları algılayın.",
    view_project_link: "Projeyi görüntüle",
    project_portfolio_title: "Kişisel Portföy Web Sitesi",
    project_portfolio_desc:
      "Projeleri, şiirleri ve makaleleri sergileyen, HTML, CSS ve JavaScript ile oluşturulmuş, duyarlı tasarıma ve çoklu dil desteğine sahip, 'içgüdüsel kodlanmış' kişisel bir web sitesi.",
    view_project_link: "Projeyi Görüntüle",
    projects_coming_soon:
      "Daha fazla proje yakında gelecek — bizi takipte kalın!",
    experience_heading: "Deneyim",
    exp_railway_company: "DRM Ambala (Kuzey Demiryolu)",
    exp_railway_role: "S & T Departmanında 15 Günlük Staj",
    exp_railway_date: "Mayıs 2024",
    exp_railway_description:
      "Demiryolu Sinyalizasyon Temelleri hakkında bilgi edindi.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "1 Aylık Araştırma Stajı",
    exp_nith_date: "Haziran - Temmuz 2025",
    exp_nith_description:
      "GAN Modelleri ve Derin Öğrenme üzerine araştırma yaptı.",
    currently_learning_heading: "Şu Anda Öğreniyorum",
    learning_java: "Java",
    learning_datastructures: "Veri Yapıları",
    learning_deep_learning: "Derin Öğrenme",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Anten ve Dalga Yayılımı",
    learning_cuda: "Paralel Hesaplama (CUDA)",
    connect_heading: "Bağlan",
  },
  nl: {
    /* Dutch */ page_title: "Parth Sidhu - Portfolio",
    nav_home: "Home",
    nav_projects: "Projecten",
    nav_connect: "Verbinden",
    nav_poems_articles: "Gedichten en artikelen",
    hero_welcome: "WELKOM",
    hero_tagline: "Dromen weven in het digitale weefgetouw.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE student | AI & Software Ontwikkelaar Enthousiast | Cinematische Mindset",
    about_me_heading: "Over Mij",
    about_me_para1:
      "Opgroeien te midden van de rustige heuvels en cederbossen van Shimla heeft mijn manier van denken gevormd \u2014 een balans tussen nieuwsgierigheid en rustige observatie, en creativiteit en structuur.",
    about_me_para2:
      "Ik ben een laatstejaarsstudent Elektronica en Communicatietechniek aan Gati Shakti Vishwavidyalaya, ge\u00efnteresseerd in intelligente systemen, toegepaste AI, simulatie en computationele engineering, met een focus op het bouwen van praktische en doordachte technische oplossingen.",
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
    skill_ml: "Machine Learning",
    projects_heading: "Projecten",
    project_demand_title: "Hyperlokale Vraagvoorspelling",
    project_demand_desc: "Een lichtgewicht AI-pijplijn voor snelle en nauwkeurige vraagvoorspellingen in quick-commerce.",
    project_plant_title: "IoT-Plantenziekte Monitor",
    project_plant_desc: "Een end-to-end TinyML-pijplijn op ESP32-CAM die plantenziekten detecteert met behulp van een 18KB CNN.",
    project_robot_title: "Autonome ROS 2 Robot",
    project_robot_desc: "Een wiskundig gemodelleerde robot die autonoom navigeert via gesloten-vorm kinematica in ROS 2 en Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc:
      "Detecteer gezichten in afbeeldingen en video's met behulp van OpenCV.",
    project_stardetection_title: "Sterren-Detectie",
    project_stardetection_desc:
      "Detecteer sterren in afbeeldingen uit NASA's Hubble-collectie.",
    view_project_link: "Bekijk project",
    project_portfolio_title: "Persoonlijke Portfolio Website",
    project_portfolio_desc:
      "Een 'vibe-coded' persoonlijke website met projecten, gedichten en artikelen, gebouwd met HTML, CSS en JavaScript, voorzien van responsief ontwerp en meertalige ondersteuning.",
    view_project_link: "Project bekijken",
    projects_coming_soon:
      "Meer projecten komen binnenkort — blijf op de hoogte!",
    experience_heading: "Ervaring",
    exp_railway_company: "DRM Ambala (Noordelijke Spoorwegen)",
    exp_railway_role: "15 dagen stage bij de S & T afdeling",
    exp_railway_date: "Mei 2024",
    exp_railway_description:
      "Inzichten verkregen in de basisprincipes van spoorwegsignalering.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "1 maand onderzoeksstage",
    exp_nith_date: "Juni - Juli 2025",
    exp_nith_description:
      "Onderzoek gedaan naar GAN-modellen en Deep Learning.",
    currently_learning_heading: "Momenteel aan het Leren",
    learning_java: "Java",
    learning_datastructures: "Datastructuren",
    learning_deep_learning: "Deep Learning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antennes en Golfvoortplanting",
    learning_cuda: "Parallel Computing (CUDA)",
    connect_heading: "Verbinden",
  },
  sv: {
    /* Swedish */ page_title: "Parth Sidhu - Portfölj",
    nav_home: "Hem",
    nav_projects: "Projekt",
    nav_connect: "Anslut",
    nav_poems_articles: "Dikter och artiklar",
    hero_welcome: "VÄLKOMMEN",
    hero_tagline: "Väva drömmar i den digitala vävstolen.",
    profile_name: "Parth Sidhu",
    profile_tagline:
      "ECE-student | AI & Mjukvaruutvecklingsentusiast | Filmatisk inställning",
    about_me_heading: "Om mig",
    about_me_para1:
      "Att v\u00e4xa upp bland de lugna kullarna och ceder-skogarna i Shimla har format mitt s\u00e4tt att t\u00e4nka \u2014 att balansera nyfikenhet med lugn observation, och kreativitet med struktur.",
    about_me_para2:
      "Jag \u00e4r sista\u00e5rsstudent i elektronik och kommunikationsteknik vid Gati Shakti Vishwavidyalaya, intresserad av intelligenta system, till\u00e4mpad AI, simulering och ber\u00e4kningsteknik, med fokus p\u00e5 att bygga praktiska och genomt\u00e4nkta tekniska l\u00f6sningar.",
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
    skill_ml: "Maskininlärning",
    projects_heading: "Projekt",
    project_demand_title: "Hyperlokal Efterfrågeprognos",
    project_demand_desc: "En lättviktig AI-pipeline för snabba och exakta efterfrågeprognoser inom quick-commerce.",
    project_plant_title: "IoT-Växtsjukdomsmonitor",
    project_plant_desc: "En end-to-end TinyML-pipeline på ESP32-CAM som upptäcker växtsjukdomar med en 18 KB CNN.",
    project_robot_title: "Autonom ROS 2 Robot",
    project_robot_desc: "En matematiskt modellerad robot som navigerar autonomt via sluten kinematik i ROS 2 och Gazebo.",
    project_facevision_title: "Face-Vision",
    project_facevision_desc: "Upptäck ansikten i bilder och videor med OpenCV.",
    project_stardetection_title: "Stjärn-Detektion",
    project_stardetection_desc:
      "Upptäck stjärnor i bilder från NASA:s Hubble-samling.",
    view_project_link: "Visa projekt",
    project_portfolio_title: "Personlig Portföljwebbplats",
    project_portfolio_desc:
      "En 'vibe-kodad' personlig webbplats som visar upp projekt, dikter och artiklar, byggd med HTML, CSS och JavaScript, med responsiv design och flerspråkigt stöd.",
    view_project_link: "Visa projekt",
    projects_coming_soon: "Fler projekt kommer snart — håll utkik!",
    experience_heading: "Erfarenhet",
    exp_railway_company: "DRM Ambala (Norra järnvägen)",
    exp_railway_role: "15 dagars praktik inom S & T-avdelningen",
    exp_railway_date: "Maj 2024",
    exp_railway_description:
      "Fick insikter i grunderna för järnvägssignalering.",
    exp_nith_institute: "NIT Hamirpur",
    exp_nith_role: "1 månads forskningspraktik",
    exp_nith_date: "Juni - Juli 2025",
    exp_nith_description: "Utfört forskning om GAN-modeller och djupinlärning.",
    currently_learning_heading: "Lär mig för närvarande",
    learning_java: "Java",
    learning_datastructures: "Datastrukturer",
    learning_deep_learning: "Djupinlärning",
    learning_gans: "GANs" /* GANs remains GANs */,
    learning_awp: "Antenner och Vågutbredning",
    learning_cuda: "Parallell Beräkning (CUDA)",
    connect_heading: "Anslut",
  },
};

// --- Apply Translations ---
function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    // Prioritize specific script codes (e.g., pa-Arab) over generic ones (e.g., pa) if both exist
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

  // It's better to select the specific language selector for this page,
  // or use the common class if it's genuinely common.
  // The HTML currently uses 'language-selector' for the select element.
  const selectors = document.querySelectorAll(
    ".language-selector-common, #language-selector"
  );
  selectors.forEach((s) => {
    if (s.tagName === "SELECT") {
      // Only set value for select elements
      s.value = currentLanguage;
    }
  });
}

window.applyTranslations = applyTranslations; // Make it globally accessible

// --- DOM Ready Handler ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Language Selector Setup ---
  const allLangSelectors = document.querySelectorAll(
    ".language-selector-common, #language-selector"
  );

  allLangSelectors.forEach((selector) => {
    if (window.currentLanguage) {
      selector.value = window.currentLanguage;
    }
  });

  allLangSelectors.forEach((selector) => {
    selector.addEventListener("change", (event) => {
      window.currentLanguage = event.target.value;
      localStorage.setItem("portfolioLanguage", window.currentLanguage);
      document.body.className = `lang-${window.currentLanguage}`;
      if (typeof applyTranslations === "function") {
        applyTranslations();
      }

      allLangSelectors.forEach((otherSelector) => {
        if (otherSelector !== event.target) {
          otherSelector.value = window.currentLanguage;
        }
      });
    });
  });

  if (typeof applyTranslations === "function") {
    applyTranslations();
  }

  // --- Navigation Toggle Logic ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksList = document.querySelector(".navbar ul");

  if (navToggle && navLinksList) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navLinksList.classList.toggle("open");
    });

    const navLinks = navLinksList.querySelectorAll("li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinksList.classList.contains("open")) {
          navToggle.classList.remove("open");
          navLinksList.classList.remove("open");
        }
      });
    });

    document.addEventListener("click", (event) => {
      const isClickInsideNavbar =
        navToggle.contains(event.target) || navLinksList.contains(event.target);
      if (!isClickInsideNavbar && navLinksList.classList.contains("open")) {
        navToggle.classList.remove("open");
        navLinksList.classList.remove("open");
      }
    });
  }

  // --- Poems & Articles Detail Page Logic ---
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

  if (contentId && contentTitleElement && contentBodyElement) {
    if (typeof portfolioContent !== "undefined") {
      const item = portfolioContent.find((p) => p.id === contentId);

      if (item) {
        const displayTitle = item.title[item.language] || item.title.en;
        const displayContent = item.content[item.language] || item.content.en;

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
      contentTitleElement.innerHTML =
        window.translations[window.currentLanguage]?.["loading_content"] ||
        window.translations.en["loading_content"];
      contentBodyElement.innerHTML = "";
    }
  }

  // --- General DOM Modifications & Event Listeners ---
  const img = document.querySelector(".profile-image");
  if (img) {
    img.setAttribute("draggable", "false");
    img.setAttribute("oncontextmenu", "return false;");
  }

  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    if (section.id !== "about") {
      section.style.setProperty("--section-delay", `${0.3 * index + 0.5}s`);
    }
  });
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((reg) => console.log("SW registered ✅", reg))
        .catch((err) => console.error("SW registration failed ❌", err));
    });
  }
  // --- Education Carousel Initialization (IMPROVED with robust selection) ---
  // Assign global variables to elements found AFTER DOMContentLoaded
  slides = document.querySelectorAll(".education-slide");
  dots = document.querySelectorAll(".dot");
  educationCarouselElement = document.querySelector(".education-carousel");

  if (educationCarouselElement && slides.length > 0 && dots.length > 0) {
    updateCarousel();
    autoSlide(); // Start auto-sliding

    educationCarouselElement.addEventListener("mouseenter", () =>
      clearInterval(intervalId)
    );
    educationCarouselElement.addEventListener("mouseleave", autoSlide);
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Touch event handlers for Education Carousel - MOVED INSIDE DOMContentLoaded
    educationCarouselElement.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    educationCarouselElement.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault(); // Prevent scrolling while swiping
        touchEndX = e.touches[0].clientX;
      },
      { passive: false } // Use passive: false to allow preventDefault
    );

    educationCarouselElement.addEventListener("touchend", () => {
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
  }

// --- Projects Carousel Logic (Encapsulated to prevent conflicts) ---
(function() { // Start of IIFE for Project Carousel
  // Define project carousel variables (now scoped locally within this function)
  const projectCarouselTrack = document.querySelector(".project-carousel-track");
  const projectLeftArrow = document.querySelector(".project-arrow.left");
  const projectRightArrow = document.querySelector(".project-arrow.right");
  const projectCards = document.querySelectorAll(".project-carousel-track .project-card");

  let projectCurrentIndex = 0; // Index of the first visible card in the view

  // Guard clause: Exit if required elements are not found on the page
  if (
    !projectCarouselTrack ||
    projectCards.length === 0 ||
    !projectLeftArrow ||
    !projectRightArrow
  ) {
    console.warn("Project carousel elements not found. Skipping initialization.");
    return; // Stop execution of this IIFE if elements are missing
  }

  // Function to dynamically get the number of cards visible based on screen size
  function getProjectCardsPerView() {
    // Adjust this breakpoint (760px) if your CSS media query for mobile layout is different
    // (A common breakpoint is often around 768px, but verify with your CSS)
    if (window.innerWidth <= 760) {
      return 1; // On mobile, show 1 card per view
    } else {
      return 3; // On desktop, show 3 cards per view
    }
  }

  // Function to update the projects carousel's position and arrow states
  function updateProjectCarouselPosition() {
    const cardsPerView = getProjectCardsPerView(); // Get the dynamically determined cardsPerView

    // Recalculate slideDistance dynamically in case card sizes or gaps change responsively via CSS
    const firstProjectCard = projectCards[0];
    const cardWidth = firstProjectCard.offsetWidth; // Actual rendered width of a card (includes padding/border)
    // Safely get gap from CSS computed style
    const gap = parseFloat(getComputedStyle(projectCarouselTrack).gap || "0");
    const slideDistance = cardWidth + gap;

    // Adjust projectCurrentIndex if it falls outside valid bounds after cardsPerView changes
    // This prevents it from being stuck at an invalid index (e.g., if you switch from mobile to desktop
    // and the current index is now "too far" for the wider view).
    projectCurrentIndex = Math.min(
      projectCurrentIndex,
      projectCards.length - cardsPerView
    );
    projectCurrentIndex = Math.max(0, projectCurrentIndex); // Ensure it's never less than 0

    // Apply the transform to position the carousel
    projectCarouselTrack.style.transform = `translateX(-${projectCurrentIndex * slideDistance}px)`;

    // Update the disabled state of the arrows based on the current index and dynamic cardsPerView
    projectLeftArrow.disabled = projectCurrentIndex === 0;
    projectRightArrow.disabled = (projectCurrentIndex + cardsPerView) >= projectCards.length;
  }

  // Function to slide to the next project
  function slideNextProject() {
    const cardsPerView = getProjectCardsPerView();
    // Calculate the maximum allowed index to ensure the last set of cards is fully visible
    const maxIndex = projectCards.length - cardsPerView;

    // Only move if we are not at the end
    if (projectCurrentIndex < maxIndex) {
      // Increment by 1 to allow seeing "the other two" on mobile, scrolling one by one.
      // If you wanted to jump by 'cardsPerView' at a time, you'd change '1' to 'cardsPerView'.
      projectCurrentIndex++;
      updateProjectCarouselPosition();
    }
  }

  // Function to slide to the previous project
  function slidePrevProject() {
    // Only move if we are not at the beginning
    if (projectCurrentIndex > 0) {
      projectCurrentIndex--;
      updateProjectCarouselPosition();
    }
  }

  // --- Initial Setup and Event Listeners ---
  // Attach event listeners to projects carousel arrows
  projectRightArrow.addEventListener("click", slideNextProject);
  projectLeftArrow.addEventListener("click", slidePrevProject);

  // Initial position update for projects carousel on page load
  updateProjectCarouselPosition();

  // Add a resize listener to update carousel position and arrow states
  // This is crucial for responsiveness if cardsPerView changes when resizing the window
  // (e.g., rotating a mobile device or resizing a browser window on desktop).
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateProjectCarouselPosition, 250); // Debounce for performance
  });

  // Optional: Auto-slide for projects carousel (uncomment and adjust if desired)
  // let projectAutoSlideInterval;
  // function startProjectAutoSlide() {
  //   projectAutoSlideInterval = setInterval(() => {
  //     const cardsPerView = getProjectCardsPerView();
  //     const maxIndex = projectCards.length - cardsPerView;
  //     if (projectCurrentIndex < maxIndex) {
  //       slideNextProject();
  //     } else {
  //       // If at the end during auto-slide, loop back to the beginning
  //       projectCurrentIndex = 0;
  //       updateProjectCarouselPosition();
  //     }
  //   }, 5000); // Adjust auto-slide interval (e.g., 5000ms = 5 seconds)
  // }
  // startProjectAutoSlide(); // Start auto-slide on page load

  // // Pause/resume auto-slide on mouse enter/leave for accessibility
  // projectCarouselTrack.addEventListener("mouseenter", () =>
  //   clearInterval(projectAutoSlideInterval)
  // );
  // projectCarouselTrack.addEventListener("mouseleave", startProjectAutoSlide);

})(); // End of IIFE for Project Carousel
});

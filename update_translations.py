import re
import json

translations = {
    'en': {
        'para1': 'Growing up amidst the quiet hills and Deodar forests of Shimla shaped the way I think — balancing curiosity with calm observation, and creativity with structure.',
        'para2': 'I’m a final year Electronics and Communication Engineering student at Gati Shakti Vishwavidyalaya, interested in intelligent systems, applied AI, simulation, and computational engineering, with a focus on building practical and thoughtfully engineered solutions.'
    },
    'hi': {
        'para1': 'शिमला की शांत पहाड़ियों और देवदार के जंगलों के बीच पले-बढ़े होने ने मेरे सोचने के तरीके को आकार दिया है — शांत अवलोकन के साथ जिज्ञासा, और संरचना के साथ रचनात्मकता को संतुलित करना।',
        'para2': 'मैं गति शक्ति विश्वविद्यालय में इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग का अंतिम वर्ष का छात्र हूँ, जिसकी रुचि बुद्धिमान प्रणालियों, एप्लाइड एआई, सिमुलेशन और कम्प्यूटेशनल इंजीनियरिंग में है, और मेरा ध्यान व्यावहारिक और विचारशील इंजीनियरिंग समाधान बनाने पर केंद्रित है।'
    },
    'pa': {
        'para1': 'ਸ਼ਿਮਲਾ ਦੀਆਂ ਸ਼ਾਂਤ ਪਹਾੜੀਆਂ ਅਤੇ ਦੇਵਦਾਰ ਦੇ ਜੰਗਲਾਂ ਵਿੱਚ ਪਲਣ ਨੇ ਮੇਰੇ ਸੋਚਣ ਦੇ ਤਰੀਕੇ ਨੂੰ ਆਕਾਰ ਦਿੱਤਾ ਹੈ — ਸ਼ਾਂਤ ਨਿਰੀਖਣ ਨਾਲ ਉਤਸੁਕਤਾ, ਅਤੇ ਢਾਂਚੇ ਨਾਲ ਰਚਨਾਤਮਕਤਾ ਦਾ ਸੰਤੁਲਨ ਕਰਨਾ।',
        'para2': 'ਮੈਂ ਗਤੀ ਸ਼ਕਤੀ ਵਿਸ਼ਵਵਿਦਿਆਲਿਆ ਵਿੱਚ ਇਲੈਕਟ੍ਰੋਨਿਕਸ ਅਤੇ ਸੰਚਾਰ ਇੰਜੀਨੀਅਰਿੰਗ ਦਾ ਅੰਤਿਮ ਸਾਲ ਦਾ ਵਿਦਿਆਰਥੀ ਹਾਂ, ਜਿਸਦੀ ਦਿਲਚਸਪੀ ਬੁੱਧੀਮਾਨ ਪ੍ਰਣਾਲੀਆਂ, ਅਪਲਾਈਡ ਏਆਈ, ਸਿਮੂਲੇਸ਼ਨ ਅਤੇ ਕੰਪਿਊਟੇਸ਼ਨਲ ਇੰਜੀਨੀਅਰਿੰਗ ਵਿੱਚ ਹੈ, ਅਤੇ ਮੇਰਾ ਧਿਆਨ ਵਿਵਹਾਰਕ ਅਤੇ ਸੋਚ-ਸਮਝ ਕੇ ਇੰਜੀਨੀਅਰ ਕੀਤੇ ਹੱਲ ਬਣਾਉਣ \'ਤੇ ਕੇਂਦ੍ਰਿਤ ਹੈ।'
    },
    '"pa-Arab"': {
        'para1': 'شملہ کی پرسکون پہاڑیوں اور دیودار کے جنگلات میں پرورش پانے نے میرے سوچنے کے انداز کو تشکیل دیا ہے — پرسکون مشاہدے کے ساتھ تجسس، اور ساخت کے ساتھ تخلیقی صلاحیتوں کا توازن برقرار رکھنا۔',
        'para2': 'میں گتی شکتی وشو ودیالیہ میں الیکٹرانکس اور کمیونیکیشن انجینئرنگ کا فائنل ایئر کا طالبعلم ہوں، جس کی دلچسپی ذہین سسٹمز، اپلائیڈ اے آئی، سمولیشن اور کمپیوٹیشنل انجینئرنگ میں ہے، اور میرا فوکس عملی اور سوچ سمجھ کر تیار کردہ حل بنانے پر ہے۔'
    },
    'ur': {
        'para1': 'شملہ کی پرسکون پہاڑیوں اور دیودار کے جنگلات میں پرورش پانے نے میرے سوچنے کے انداز کو تشکیل دیا ہے — پرسکون مشاہدے کے ساتھ تجسس، اور ساخت کے ساتھ تخلیقی صلاحیتوں کا توازن برقرار رکھنا۔',
        'para2': 'میں گتی شکتی وشو ودیالیہ میں الیکٹرانکس اور کمیونیکیشن انجینئرنگ کا فائنل ایئر کا طالبعلم ہوں، جس کی دلچسپی ذہین سسٹمز، اپلائیڈ اے آئی، سمولیشن اور کمپیوٹیشنل انجینئرنگ میں ہے، اور میرا فوکس عملی اور سوچ سمجھ کر تیار کردہ حل بنانے پر ہے۔'
    },
    'gu': {
        'para1': 'શિમલાની શાંત ટેકરીઓ અને દેવદારના જંગલો વચ્ચે ઉછર્યા હોવાથી મારી વિચારવાની રીત ઘડાઈ છે — શાંત અવલોકન સાથે જિજ્ઞાસા, અને માળખા સાથે સર્જનાત્મકતાને સંતુલિત કરવી.',
        'para2': 'હું ગતિ શક્તિ વિશ્વવિદ્યાલયમાં ઈલેક્ટ્રોનિક્સ અને કોમ્યુનિકેશન એન્જિનિયરિંગનો અંતિમ વર્ષનો વિદ્યાર્થી છું, જેને ઈન્ટેલિજન્ટ સિસ્ટમ્સ, એપ્લાઈડ એઆઈ, સિમ્યુલેશન અને કમ્પ્યુટેશનલ એન્જિનિયરિંગમાં રસ છે, અને મારું ધ્યાન વ્યવહારુ અને વિચારપૂર્વક એન્જિનિયર કરેલા ઉકેલો બનાવવા પર કેન્દ્રિત છે.'
    },
    'or': {
        'para1': 'ଶିମଲାର ଶାନ୍ତ ପାହାଡ ଏବଂ ଦେଓଦାର ଜଙ୍ଗଲ ମଧ୍ୟରେ ବଢିବା ମୋର ଚିନ୍ତାଧାରାକୁ ଆକାର ଦେଇଛି - ଶାନ୍ତ ପର୍ଯ୍ୟବେକ୍ଷଣ ସହିତ କୌତୁହଳ, ଏବଂ ସଂରଚନା ସହିତ ସୃଜନଶୀଳତାକୁ ସନ୍ତୁଳିତ କରିବା |',
        'para2': 'ମୁଁ ଗତି ଶକ୍ତି ବିଶ୍ୱବିଦ୍ୟାଳୟରେ ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ଏବଂ କମ୍ୟୁନିକେସନ୍ ଇଞ୍ଜିନିୟରିଂର ଶେଷ ବର୍ଷର ଛାତ୍ର, ଇଣ୍ଟେଲିଜେଣ୍ଟ ସିଷ୍ଟମ୍, ଆପ୍ଲାଏଡ୍ ଏଆଇ, ସିମୁଲେସନ୍ ଏବଂ କମ୍ପ୍ୟୁଟେସନାଲ୍ ଇଞ୍ଜିନିୟରିଂରେ ଆଗ୍ରହୀ, ବ୍ୟବହାରିକ ଏବଂ ଚିନ୍ତାମୂଳକ ସମାଧାନ ନିର୍ମାଣ ଉପରେ ଧ୍ୟାନ ଦେଇଥାଏ |'
    },
    'bj': {
        'para1': 'शिमला के शांत पहाड़ी आ देवदार के जंगल के बीच पले-बढ़े से हमार सोचे के तरीका के आकार मिलल बा — शांत अवलोकन के साथे जिज्ञासा, आ संरचना के साथे रचनात्मकता के संतुलित कइल।',
        'para2': 'हम गति शक्ति विश्वविद्यालय में इलेक्ट्रॉनिक्स आ संचार इंजीनियरिंग के अंतिम वर्ष के छात्र बानी, जेकर रुचि बुद्धिमान प्रणाली, एप्लाइड एआई, सिमुलेशन आ कम्प्यूटेशनल इंजीनियरिंग में बा, आ हमार ध्यान व्यावहारिक आ विचारशील इंजीनियरिंग समाधान बनावे पर केंद्रित बा।'
    },
    'bn': {
        'para1': 'শিমলার শান্ত পাহাড় এবং দেওদার বনের মাঝে বেড়ে ওঠা আমার চিন্তাভাবনার ধরনকে রূপ দিয়েছে — শান্ত পর্যবেক্ষণের সাথে কৌতূহল, এবং কাঠামোর সাথে সৃজনশীলতার ভারসাম্য বজায় রাখা।',
        'para2': 'আমি গতি শক্তি বিশ্ববিদ্যালয়ের ইলেকট্রনিক্স এবং কমিউনিকেশন ইঞ্জিনিয়ারিংয়ের চূড়ান্ত বর্ষের ছাত্র, ইন্টেলিজেন্ট সিস্টেম, অ্যাপ্লায়েড এআই, সিমুলেশন এবং কম্পিউটেশনাল ইঞ্জিনিয়ারিংয়ে আগ্রহী, এবং আমার লক্ষ্য ব্যবহারিক এবং চিন্তাশীল ইঞ্জিনিয়ারিং সমাধান তৈরি করা।'
    },
    'mr': {
        'para1': 'शिमलाच्या शांत टेकड्या आणि देवदारच्या जंगलांमध्ये वाढल्याने माझ्या विचार करण्याच्या पद्धतीला आकार मिळाला आहे — शांत निरीक्षणासह कुतूहल आणि संरचनेसह सर्जनशीलता यांचा समतोल साधणे.',
        'para2': 'मी गती शक्ती विश्वविद्यालयामध्ये इलेक्ट्रॉनिक्स आणि कम्युनिकेशन इंजिनिअरिंगचा अंतिम वर्षाचा विद्यार्थी आहे, मला इंटेलिजंट सिस्टीम्स, अप्लाइड एआय, सिम्युलेशन आणि कॉम्प्युटेशनल इंजिनिअरिंगमध्ये रस आहे आणि व्यावहारिक आणि विचारपूर्वक इंजिनिअर केलेले उपाय तयार करण्यावर माझे लक्ष केंद्रित आहे.'
    },
    'ta': {
        'para1': 'சிம்லாவின் அமைதியான மலைகள் மற்றும் தியோடர் காடுகளுக்கு மத்தியில் வளர்ந்தது நான் சிந்திக்கும் விதத்தை வடிவமைத்துள்ளது - அமைதியான கவனிப்புடன் ஆர்வத்தையும், கட்டமைப்புடன் படைப்பாற்றலையும் சமநிலைப்படுத்துகிறது.',
        'para2': 'நான் கதி சக்தி விஸ்வவித்யாலயாவில் எலக்ட்ரானிக்ஸ் மற்றும் கம்யூனிகேஷன் இன்ஜினியரிங் இறுதியாண்டு மாணவன். நுண்ணறிவு அமைப்புகள், அப்ளைடு AI, உருவகப்படுத்துதல் மற்றும் கணக்கீட்டு பொறியியல் ஆகியவற்றில் ஆர்வமுள்ளவன், மேலும் நடைமுறை மற்றும் சிந்தனையுடன் வடிவமைக்கப்பட்ட தீர்வுகளை உருவாக்குவதில் கவனம் செலுத்துகிறேன்.'
    },
    'te': {
        'para1': 'సిమ్లాలోని ప్రశాంతమైన కొండలు మరియు దేవదార్ అడవుల మధ్య పెరగడం నా ఆలోచనా విధానాన్ని తీర్చిదిద్దింది — ప్రశాంతమైన పరిశీలనతో ఉత్సుకతను మరియు నిర్మాణంతో సృజనాత్మకతను సమతుల్యం చేయడం.',
        'para2': 'నేను గతి శక్తి విశ్వవిద్యాలయంలో ఎలక్ట్రానిక్స్ మరియు కమ్యూనికేషన్ ఇంజనీరింగ్ ఫైనల్ ఇయర్ విద్యార్థిని, ఇంటెలిజెంట్ సిస్టమ్స్, అప్లైడ్ ఏఐ, సిమ్యులేషన్ మరియు కంప్యూటేషనల్ ఇంజనీరింగ్‌పై ఆసక్తి కలిగి ఉన్నాను మరియు ఆచరణాత్మకమైన మరియు ఆలోచనాత్మకంగా రూపొందించిన పరిష్కారాలను నిర్మించడంపై దృష్టి సారించాను.'
    },
    'ml': {
        'para1': 'ഷിംലയിലെ ശാന്തമായ കുന്നുകൾക്കും ദേവദാരു വനങ്ങൾക്കും ഇടയിൽ വളർന്നത് എൻ്റെ ചിന്താരീതിയെ രൂപപ്പെടുത്തി — ശാന്തമായ നിരീക്ഷണവും ജിജ്ഞാസയും, ഘടനയും സർഗ്ഗാത്മകതയും സന്തുലിതമാക്കുന്നു.',
        'para2': 'ഞാൻ ഗതി ശക്തി വിശ്വവിദ്യാലയത്തിലെ ഇലക്ട്രോണിക്സ് ആൻഡ് കമ്മ്യൂണിക്കേഷൻ എഞ്ചിനീയറിംഗ് അവസാന വർഷ വിദ്യാർത്ഥിയാണ്. ഇൻ്റലിജൻ്റ് സിസ്റ്റങ്ങൾ, അപ്ലൈഡ് എഐ, സിമുലേഷൻ, കമ്പ്യൂട്ടേഷണൽ എഞ്ചിനീയറിംഗ് എന്നിവയിൽ താൽപ്പര്യമുള്ള ഞാൻ പ്രായോഗികവും ചിന്താപരമായി രൂപകൽപ്പന ചെയ്തതുമായ പരിഹാരങ്ങൾ നിർമ്മിക്കുന്നതിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നു.'
    },
    'kn': {
        'para1': 'ಶಿಮ್ಲಾದ ಶಾಂತ ಬೆಟ್ಟಗಳು ಮತ್ತು ದೇವದಾರ್ ಕಾಡುಗಳ ನಡುವೆ ಬೆಳೆದದ್ದು ನನ್ನ ಆಲೋಚನಾ ವಿಧಾನವನ್ನು ರೂಪಿಸಿದೆ - ಶಾಂತ ವೀಕ್ಷಣೆಯೊಂದಿಗೆ ಕುತೂಹಲವನ್ನು ಮತ್ತು ರಚನೆಯೊಂದಿಗೆ ಸೃಜನಶೀಲತೆಯನ್ನು ಸಮತೋಲನಗೊಳಿಸುವುದು.',
        'para2': 'ನಾನು ಗತಿ ಶಕ್ತಿ ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಕಮ್ಯುನಿಕೇಷನ್ ಇಂಜಿನಿಯರಿಂಗ್ ಅಂತಿಮ ವರ್ಷದ ವಿದ್ಯಾರ್ಥಿಯಾಗಿದ್ದೇನೆ. ಇಂಟೆಲಿಜೆಂಟ್ ಸಿಸ್ಟಮ್ಸ್, ಅಪ್ಲೈಡ್ ಎಐ, ಸಿಮ್ಯುಲೇಶನ್ ಮತ್ತು ಕಂಪ್ಯೂಟೇಶನಲ್ ಇಂಜಿನಿಯರಿಂಗ್‌ನಲ್ಲಿ ಆಸಕ್ತಿ ಹೊಂದಿದ್ದು, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಚಿಂತನಶೀಲವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಪರಿಹಾರಗಳನ್ನು ನಿರ್ಮಿಸುವುದರ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದ್ದೇನೆ.'
    },
    'sd': {
        'para1': 'شملہ جي خاموش ٽڪرين ۽ ديودار جي جنگلن ۾ پلجڻ منهنجي سوچڻ جي انداز کي شڪل ڏني آهي — پرسکون مشاهدي سان گڏ تجسس، ۽ ساخت سان گڏ تخليقي صلاحيتن جو توازن برقرار رکڻ.',
        'para2': 'مان گتي شڪتي وشو ودياليه ۾ اليڪٽرانڪس ۽ ڪميونيڪيشن انجنيئرنگ جو فائنل ايئر جو شاگرد آهيان، جنهن جي دلچسپي ذهين سسٽمز، اپلائيڊ اي آئي، سموليشن ۽ ڪمپيوٽيشنل انجنيئرنگ ۾ آهي، ۽ منهنجو فوڪس عملي ۽ سوچي سمجهي تيار ڪيل حل ٺاهڻ تي آهي.'
    },
    '"zh-Hans"': {
        'para1': '在西姆拉宁静的群山和雪松林中长大，塑造了我的思维方式——在好奇心与冷静观察之间，在创造力与结构之间保持平衡。',
        'para2': '我是 Gati Shakti Vishwavidyalaya 电子与通信工程专业的最后一年学生，对智能系统、应用人工智能、仿真和计算工程感兴趣，致力于构建实用且经过深思熟虑的工程解决方案。'
    },
    '"zh-Hant"': {
        'para1': '在西姆拉寧靜的群山和雪松林中長大，塑造了我的思維方式——在好奇心與冷靜觀察之間，在創造力與結構之間保持平衡。',
        'para2': '我是 Gati Shakti Vishwavidyalaya 電子與通信工程專業的最後一年學生，對智能系統、應用人工智能、仿真和計算工程感興趣，致力於構建實用且經過深思熟慮的工程解決方案。'
    },
    'ko': {
        'para1': '심라의 고요한 언덕과 데오다르 숲 속에서 자라면서 제 사고방식이 형성되었습니다. 호기심과 차분한 관찰력, 창의성과 구조 사이의 균형을 맞추는 법을 배웠습니다.',
        'para2': '저는 Gati Shakti Vishwavidyalaya에서 전자 및 통신 공학을 전공하는 4학년 학생입니다. 지능형 시스템, 응용 AI, 시뮬레이션 및 컴퓨터 공학에 관심이 있으며, 실용적이고 신중하게 설계된 엔지니어링 솔루션을 구축하는 데 중점을 두고 있습니다.'
    },
    'ja': {
        'para1': 'シムラーの静かな丘とヒマラヤスギの森の中で育った経験は、私の思考プロセスを形成しました。好奇心と冷静な観察、創造性と構造のバランスを保つことを学びました。',
        'para2': '私は Gati Shakti Vishwavidyalaya で電子通信工学を専攻する最終学年の学生です。インテリジェント システム、応用 AI、シミュレーション、計算工学に興味があり、実用的で思慮深く設計されたソリューションの構築に重点を置いています。'
    },
    'ar': {
        'para1': 'لقد شكلت نشأتي وسط تلال شيملا الهادئة وغابات الدودار الطريقة التي أفكر بها - حيث الموازنة بين الفضول والملاحظة الهادئة، وبين الإبداع والهيكل التنظيمي.',
        'para2': 'أنا طالب في السنة النهائية في هندسة الإلكترونيات والاتصالات في جامعة جاتي شاكتي فيشوافيديالايا، مهتم بالأنظمة الذكية والذكاء الاصطناعي التطبيقي والمحاكاة والهندسة الحاسوبية، مع التركيز على بناء حلول هندسية عملية ومدروسة بعناية.'
    },
    'fa': {
        'para1': 'بزرگ شدن در میان تپه‌های آرام و جنگل‌های دئودار شیملا، طرز فکر من را شکل داده است — ایجاد تعادل بین کنجکاوی و مشاهده آرام، و خلاقیت با ساختار.',
        'para2': 'من دانشجوی سال آخر مهندسی الکترونیک و ارتباطات در دانشگاه گاتی شاکتی ویشواویدیالایا هستم که به سیستم‌های هوشمند، هوش مصنوعی کاربردی، شبیه‌سازی و مهندسی محاسباتی علاقه‌مندم و تمرکزم بر ساخت راه‌حل‌های مهندسی عملی و متفکرانه است.'
    },
    'fr': {
        'para1': 'Grandir au milieu des collines tranquilles et des forêts de cèdres de l\'Himalaya à Shimla a façonné ma façon de penser — équilibrant curiosité et observation calme, créativité et structure.',
        'para2': 'Je suis étudiant en dernière année d\'ingénierie électronique et de communication à Gati Shakti Vishwavidyalaya, intéressé par les systèmes intelligents, l\'IA appliquée, la simulation et l\'ingénierie informatique, avec un accent sur la création de solutions d\'ingénierie pratiques et réfléchies.'
    },
    'de': {
        'para1': 'Das Aufwachsen inmitten der ruhigen Hügel und Deodar-Wälder von Shimla hat meine Denkweise geprägt — eine Balance zwischen Neugier und ruhiger Beobachtung sowie Kreativität und Struktur.',
        'para2': 'Ich bin ein Student im letzten Jahr der Elektronik- und Informationstechnik an der Gati Shakti Vishwavidyalaya. Meine Interessen liegen in intelligenten Systemen, angewandter KI, Simulation und Computer-Engineering, mit dem Fokus auf die Entwicklung praktischer und durchdachter technischer Lösungen.'
    },
    'es': {
        'para1': 'Crecer en medio de las tranquilas colinas y los bosques de cedros del Himalaya en Shimla moldeó mi forma de pensar: equilibrando la curiosidad con la observación tranquila, y la creatividad con la estructura.',
        'para2': 'Soy estudiante de último año de Ingeniería Electrónica y de Comunicaciones en Gati Shakti Vishwavidyalaya, interesado en sistemas inteligentes, IA aplicada, simulación e ingeniería computacional, con un enfoque en la construcción de soluciones de ingeniería prácticas y bien pensadas.'
    },
    'pt': {
        'para1': 'Crescer no meio das colinas tranquilas e das florestas de cedros do Himalaia em Shimla moldou a minha forma de pensar — equilibrando a curiosidade com a observação calma, e a criatividade com a estrutura.',
        'para2': 'Sou aluno do último ano de Engenharia Eletrónica e de Comunicações na Gati Shakti Vishwavidyalaya, interessado em sistemas inteligentes, IA aplicada, simulação e engenharia computacional, com foco na construção de soluções de engenharia práticas e bem pensadas.'
    },
    'it': {
        'para1': 'Crescere tra le tranquille colline e le foreste di cedri dell\'Himalaya a Shimla ha plasmato il mio modo di pensare: in equilibrio tra curiosità e osservazione calma, tra creatività e struttura.',
        'para2': 'Sono uno studente all\'ultimo anno di Ingegneria Elettronica e delle Telecomunicazioni presso Gati Shakti Vishwavidyalaya, interessato ai sistemi intelligenti, all\'IA applicata, alla simulazione e all\'ingegneria computazionale, con un focus sulla costruzione di soluzioni ingegneristiche pratiche e ponderate.'
    },
    'ru': {
        'para1': 'Взросление среди тихих холмов и кедровых лесов Шимлы сформировало мой образ мышления — баланс между любопытством и спокойным наблюдением, творчеством и структурой.',
        'para2': 'Я студент последнего курса факультета электроники и связи в Gati Shakti Vishwavidyalaya, интересуюсь интеллектуальными системами, прикладным ИИ, моделированием и вычислительной инженерией, с акцентом на создание практичных и продуманных инженерных решений.'
    },
    'tr': {
        'para1': 'Shimla\'nın sessiz tepeleri ve Deodar ormanlarının ortasında büyümek, düşünce tarzımı şekillendirdi — merakı sakin bir gözlemle, yaratıcılığı ise yapıyla dengelememi sağladı.',
        'para2': 'Gati Shakti Vishwavidyalaya\'da Elektronik ve Haberleşme Mühendisliği son sınıf öğrencisiyim. Akıllı sistemler, uygulamalı yapay zeka, simülasyon ve hesaplamalı mühendislik ile ilgileniyor, pratik ve düşünceli bir şekilde tasarlanmış çözümler oluşturmaya odaklanıyorum.'
    },
    'nl': {
        'para1': 'Opgroeien te midden van de rustige heuvels en cederbossen van Shimla heeft mijn manier van denken gevormd — een balans tussen nieuwsgierigheid en rustige observatie, en creativiteit en structuur.',
        'para2': 'Ik ben een laatstejaarsstudent Elektronica en Communicatietechniek aan Gati Shakti Vishwavidyalaya, geïnteresseerd in intelligente systemen, toegepaste AI, simulatie en computationele engineering, met een focus op het bouwen van praktische en doordachte technische oplossingen.'
    },
    'sv': {
        'para1': 'Att växa upp bland de lugna kullarna och ceder-skogarna i Shimla har format mitt sätt att tänka — att balansera nyfikenhet med lugn observation, och kreativitet med struktur.',
        'para2': 'Jag är sistaårsstudent i elektronik och kommunikationsteknik vid Gati Shakti Vishwavidyalaya, intresserad av intelligenta system, tillämpad AI, simulering och beräkningsteknik, med fokus på att bygga praktiska och genomtänkta tekniska lösningar.'
    }
}

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

count_replaced = 0
for lang, texts in translations.items():
    pattern = r'("?' + lang + r'"?\s*:\s*\{[\s\S]*?about_me_para1:\s*)"([^"]*)"([\s\S]*?about_me_para2:\s*)"([^"]*)(\")'
    
    def repl(m):
        return m.group(1) + json.dumps(texts['para1']) + m.group(3) + json.dumps(texts['para2'])

    new_content, num_subs = re.subn(pattern, repl, content, count=1)
    if num_subs > 0:
        content = new_content
        count_replaced += 1
    else:
        print(f"Failed to replace for {lang}")

print(f"Replaced {count_replaced} translations.")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)

// Natural Language Processing utilities
export class NLPProcessor {
  private language: string;

  constructor(language: string = 'en') {
    this.language = language;
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  // Analyze user intent from natural language input
  analyzeIntent(text: string): { intent: string; confidence: number; entities: any[] } {
    const normalizedText = text.toLowerCase().trim();
    
    // End conversation detection
    if (this.detectEndIntent(normalizedText)) {
      return { intent: 'end_conversation', confidence: 1.0, entities: [] };
    }

    // Greeting detection
    if (this.detectGreeting(normalizedText)) {
      return { intent: 'greeting', confidence: 0.9, entities: [] };
    }

    // Interest detection
    if (this.detectInterest(normalizedText)) {
      return { intent: 'show_interest', confidence: 0.8, entities: [] };
    }

    // Biology/eligibility detection
    if (this.detectBiologyMention(normalizedText)) {
      return { intent: 'biology_eligibility', confidence: 0.8, entities: [] };
    }

    // Fee-related queries
    if (this.detectFeeQuery(normalizedText)) {
      return { intent: 'fee_inquiry', confidence: 0.8, entities: [] };
    }

    // Hostel queries
    if (this.detectHostelQuery(normalizedText)) {
      return { intent: 'hostel_inquiry', confidence: 0.8, entities: [] };
    }

    // Location queries
    if (this.detectLocationQuery(normalizedText)) {
      return { intent: 'location_inquiry', confidence: 0.8, entities: [] };
    }

    // Scholarship queries
    if (this.detectScholarshipQuery(normalizedText)) {
      return { intent: 'scholarship_inquiry', confidence: 0.8, entities: [] };
    }

    // Career queries
    if (this.detectCareerQuery(normalizedText)) {
      return { intent: 'career_inquiry', confidence: 0.8, entities: [] };
    }

    // Admission form request
    if (this.detectAdmissionFormRequest(normalizedText)) {
      return { intent: 'admission_form_request', confidence: 0.8, entities: [] };
    }

    // Default fallback
    return { intent: 'unknown', confidence: 0.1, entities: [] };
  }

  private detectEndIntent(text: string): boolean {
    const endPatterns = {
      en: ['end', 'stop', 'quit', 'exit', 'bye', 'goodbye', 'finish', 'done', 'terminate'],
      hi: ['समाप्त', 'बंद', 'रुको', 'खत्म', 'अलविदा', 'बाई', 'पूरा', 'हो गया'],
      bn: ['শেষ', 'বন্ধ', 'থামো', 'বিদায়', 'সমাপ্ত'],
      te: ['ముగింపు', 'ఆపు', 'వదిలేయ్', 'బై'],
      mr: ['संपले', 'बंद', 'थांब', 'निरोप'],
      ta: ['முடிவு', 'நிறுத்து', 'விடை', 'பை'],
      gu: ['અંત', 'બંધ', 'રોકો', 'વિદાય'],
      ur: ['ختم', 'بند', 'رک', 'الوداع'],
      kn: ['ಅಂತ್ಯ', 'ನಿಲ್ಲಿಸು', 'ಬೈ', 'ಮುಗಿಸು'],
      ml: ['അവസാനം', 'നിർത്തുക', 'ബൈ', 'പൂർത്തിയാക്കുക']
    };

    const patterns = endPatterns[this.language as keyof typeof endPatterns] || endPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectGreeting(text: string): boolean {
    const greetingPatterns = {
      en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
      hi: ['नमस्ते', 'हैलो', 'हाय', 'सुप्रभात', 'शुभ दोपहर', 'शुभ संध्या'],
      bn: ['নমস্কার', 'হ্যালো', 'হাই', 'সুপ্রভাত'],
      te: ['నమస్కారం', 'హలో', 'హాయ్', 'శుభోదయం'],
      mr: ['नमस्कार', 'हॅलो', 'हाय', 'सुप्रभात'],
      ta: ['வணக்கம்', 'ஹலோ', 'ஹாய்', 'காலை வணக்கம்'],
      gu: ['નમસ્તે', 'હેલો', 'હાય', 'સુપ્રભાત'],
      ur: ['السلام علیکم', 'ہیلو', 'ہائے', 'صبح بخیر'],
      kn: ['ನಮಸ್ಕಾರ', 'ಹಲೋ', 'ಹಾಯ್', 'ಶುಭೋದಯ'],
      ml: ['നമസ്കാരം', 'ഹലോ', 'ഹായ്', 'സുപ്രഭാതം']
    };

    const patterns = greetingPatterns[this.language as keyof typeof greetingPatterns] || greetingPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectInterest(text: string): boolean {
    const interestPatterns = {
      en: ['interested', 'want to know', 'tell me', 'information', 'details', 'admission', 'nursing'],
      hi: ['रुचि', 'जानना चाहते', 'बताओ', 'जानकारी', 'विवरण', 'प्रवेश', 'नर्सिंग'],
      bn: ['আগ্রহী', 'জানতে চাই', 'বলুন', 'তথ্য', 'বিস্তারিত'],
      te: ['ఆసక్తి', 'తెలుసుకోవాలి', 'చెప్పండి', 'సమాచారం'],
      mr: ['स्वारस्य', 'जाणून घ्यायचे', 'सांगा', 'माहिती'],
      ta: ['ஆர்வம்', 'தெரிந்து கொள்ள', 'சொல்லுங்கள்', 'தகவல்'],
      gu: ['રસ', 'જાણવું છે', 'કહો', 'માહિતી'],
      ur: ['دلچسپی', 'جاننا چاہتے', 'بتائیں', 'معلومات'],
      kn: ['ಆಸಕ್ತಿ', 'ತಿಳಿಯಲು', 'ಹೇಳಿ', 'ಮಾಹಿತಿ'],
      ml: ['താൽപ്പര്യം', 'അറിയാൻ', 'പറയൂ', 'വിവരം']
    };

    const patterns = interestPatterns[this.language as keyof typeof interestPatterns] || interestPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectBiologyMention(text: string): boolean {
    const biologyPatterns = {
      en: ['biology', 'bio', 'science', '12th', 'twelfth', 'pcb', 'eligible', 'qualification'],
      hi: ['जीव विज्ञान', 'बायो', 'विज्ञान', '12वीं', 'बारहवीं', 'योग्य', 'योग्यता'],
      bn: ['জীববিজ্ঞান', 'বায়ো', 'বিজ্ঞান', '১২তম', 'যোগ্য'],
      te: ['జీవశాస్త్రం', 'బయో', 'సైన్స్', '12వ', 'అర్హత'],
      mr: ['जीवशास्त्र', 'बायो', 'विज्ञान', '12वी', 'पात्रता'],
      ta: ['உயிரியல்', 'பயோ', 'அறிவியல்', '12வது', 'தகுதி'],
      gu: ['જીવવિજ્ઞાન', 'બાયો', 'વિજ્ઞાન', '12મી', 'લાયકાત'],
      ur: ['حیاتیات', 'بائیو', 'سائنس', '12ویں', 'اہلیت'],
      kn: ['ಜೀವಶಾಸ್ತ್ರ', 'ಬಯೋ', 'ಸೈನ್ಸ್', '12ನೇ', 'ಅರ್ಹತೆ'],
      ml: ['ജീവശാസ്ത്രം', 'ബയോ', 'സയൻസ്', '12ാം', 'യോഗ്യത']
    };

    const patterns = biologyPatterns[this.language as keyof typeof biologyPatterns] || biologyPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectFeeQuery(text: string): boolean {
    const feePatterns = {
      en: ['fee', 'fees', 'cost', 'price', 'money', 'payment', 'tuition', 'expensive', 'cheap'],
      hi: ['फीस', 'शुल्क', 'लागत', 'कीमत', 'पैसा', 'भुगतान', 'महंगा', 'सस्ता'],
      bn: ['ফি', 'খরচ', 'দাম', 'টাকা', 'পেমেন্ট'],
      te: ['ఫీజు', 'ఖర్చు', 'ధర', 'డబ్బు', 'చెల్లింపు'],
      mr: ['फी', 'खर्च', 'किंमत', 'पैसे', 'पेमेंट'],
      ta: ['கட்டணம்', 'செலவு', 'விலை', 'பணம்', 'பேமெண்ட்'],
      gu: ['ફી', 'ખર્ચ', 'કિંમત', 'પૈસા', 'પેમેન્ટ'],
      ur: ['فیس', 'خرچ', 'قیمت', 'پیسے', 'ادائیگی'],
      kn: ['ಫೀಸ್', 'ಖರ್ಚು', 'ಬೆಲೆ', 'ಹಣ', 'ಪೇಮೆಂಟ್'],
      ml: ['ഫീസ്', 'ചെലവ്', 'വില', 'പണം', 'പേയ്മെന്റ്']
    };

    const patterns = feePatterns[this.language as keyof typeof feePatterns] || feePatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectHostelQuery(text: string): boolean {
    const hostelPatterns = {
      en: ['hostel', 'accommodation', 'stay', 'room', 'boarding', 'residence', 'facility'],
      hi: ['हॉस्टल', 'आवास', 'रहना', 'कमरा', 'निवास', 'सुविधा'],
      bn: ['হোস্টেল', 'থাকার জায়গা', 'রুম', 'বাসস্থান'],
      te: ['హాస్టల్', 'వసతి', 'గది', 'నివాసం'],
      mr: ['हॉस्टेल', 'निवास', 'खोली', 'राहण्याची जागा'],
      ta: ['விடுதி', 'தங்குமிடம்', 'அறை', 'வசிப்பிடம்'],
      gu: ['હોસ્ટેલ', 'રહેઠાણ', 'રૂમ', 'નિવાસ'],
      ur: ['ہاسٹل', 'رہائش', 'کمرہ', 'قیام'],
      kn: ['ಹಾಸ್ಟೆಲ್', 'ವಸತಿ', 'ಕೋಣೆ', 'ನಿವಾಸ'],
      ml: ['ഹോസ്റ്റൽ', 'താമസം', 'മുറി', 'വസതി']
    };

    const patterns = hostelPatterns[this.language as keyof typeof hostelPatterns] || hostelPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectLocationQuery(text: string): boolean {
    const locationPatterns = {
      en: ['location', 'where', 'address', 'place', 'situated', 'delhi', 'city'],
      hi: ['स्थान', 'कहाँ', 'पता', 'जगह', 'स्थित', 'दिल्ली', 'शहर'],
      bn: ['অবস্থান', 'কোথায়', 'ঠিকানা', 'জায়গা'],
      te: ['స్థానం', 'ఎక్కడ', 'చిరునామా', 'ప్రదేశం'],
      mr: ['स्थान', 'कुठे', 'पत्ता', 'जागा'],
      ta: ['இடம்', 'எங்கே', 'முகவரி', 'ஊர்'],
      gu: ['સ્થાન', 'ક્યાં', 'સરનામું', 'જગ્યા'],
      ur: ['مقام', 'کہاں', 'پتہ', 'جگہ'],
      kn: ['ಸ್ಥಳ', 'ಎಲ್ಲಿ', 'ವಿಳಾಸ', 'ಜಾಗ'],
      ml: ['സ്ഥലം', 'എവിടെ', 'വിലാസം', 'ഇടം']
    };

    const patterns = locationPatterns[this.language as keyof typeof locationPatterns] || locationPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectScholarshipQuery(text: string): boolean {
    const scholarshipPatterns = {
      en: ['scholarship', 'financial aid', 'funding', 'grant', 'assistance', 'help'],
      hi: ['छात्रवृत्ति', 'स्कॉलरशिप', 'वित्तीय सहायता', 'अनुदान', 'सहायता'],
      bn: ['বৃত্তি', 'আর্থিক সাহায্য', 'অনুদান'],
      te: ['స్కాలర్‌షిప్', 'ఆర్థిక సహాయం', 'గ్రాంట్'],
      mr: ['शिष्यवृत्ती', 'आर्थिक मदत', 'अनुदान'],
      ta: ['உதவித்தொகை', 'நிதி உதவி', 'மானியம்'],
      gu: ['શિષ્યવૃત્તિ', 'આર્થિક સહાય', 'ગ્રાન્ટ'],
      ur: ['وظیفہ', 'مالی امداد', 'گرانٹ'],
      kn: ['ವಿದ್ಯಾರ್ಥಿವೇತನ', 'ಆರ್ಥಿಕ ಸಹಾಯ', 'ಅನುದಾನ'],
      ml: ['സ്കോളർഷിപ്പ്', 'സാമ്പത്തിക സഹായം', 'ഗ്രാന്റ്']
    };

    const patterns = scholarshipPatterns[this.language as keyof typeof scholarshipPatterns] || scholarshipPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectCareerQuery(text: string): boolean {
    const careerPatterns = {
      en: ['career', 'job', 'employment', 'future', 'opportunities', 'salary', 'work'],
      hi: ['करियर', 'नौकरी', 'रोजगार', 'भविष्य', 'अवसर', 'वेतन', 'काम'],
      bn: ['ক্যারিয়ার', 'চাকরি', 'কর্মসংস্থান', 'ভবিষ্যৎ'],
      te: ['కెరీర్', 'ఉద్యోగం', 'ఉపాధి', 'భవిష్యత్తు'],
      mr: ['करिअर', 'नोकरी', 'रोजगार', 'भविष्य'],
      ta: ['தொழில்', 'வேலை', 'வேலைவாய்ப்பு', 'எதிர்காலம்'],
      gu: ['કેરિયર', 'નોકરી', 'રોજગાર', 'ભવિષ્ય'],
      ur: ['کیریئر', 'نوکری', 'روزگار', 'مستقبل'],
      kn: ['ವೃತ್ತಿ', 'ಕೆಲಸ', 'ಉದ್ಯೋಗ', 'ಭವಿಷ್ಯ'],
      ml: ['കരിയർ', 'ജോലി', 'തൊഴിൽ', 'ഭാവി']
    };

    const patterns = careerPatterns[this.language as keyof typeof careerPatterns] || careerPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }

  private detectAdmissionFormRequest(text: string): boolean {
    const formPatterns = {
      en: ['form', 'application', 'apply', 'admission form', 'register', 'enroll'],
      hi: ['फॉर्म', 'आवेदन', 'प्रवेश फॉर्म', 'पंजीकरण', 'दाखिला'],
      bn: ['ফর্ম', 'আবেদন', 'ভর্তির ফর্ম', 'নিবন্ধন'],
      te: ['ఫారం', 'దరఖాస్తు', 'అడ్మిషన్ ఫారం', 'రిజిస్ట్రేషన్'],
      mr: ['फॉर्म', 'अर्ज', 'प्रवेश फॉर्म', 'नोंदणी'],
      ta: ['படிவம்', 'விண்ணப்பம்', 'சேர்க்கை படிவம்', 'பதிவு'],
      gu: ['ફોર્મ', 'અરજી', 'પ્રવેશ ફોર્મ', 'નોંધણી'],
      ur: ['فارم', 'درخواست', 'داخلہ فارم', 'رجسٹریشن'],
      kn: ['ಫಾರಂ', 'ಅರ್ಜಿ', 'ಪ್ರವೇಶ ಫಾರಂ', 'ನೋಂದಣಿ'],
      ml: ['ഫോം', 'അപേക്ഷ', 'പ്രവേശന ഫോം', 'രജിസ്ട്രേഷൻ']
    };

    const patterns = formPatterns[this.language as keyof typeof formPatterns] || formPatterns.en;
    return patterns.some(pattern => text.includes(pattern));
  }
}
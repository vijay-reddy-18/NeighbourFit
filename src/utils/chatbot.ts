import { Message, ChatState, ButtonOption } from '../types/chat';
import { getTranslation } from './languages';
import { NLPProcessor } from './nlp';

export class NursingChatbot {
  private state: ChatState;
  private nlpProcessor: NLPProcessor;

  constructor() {
    this.state = {
      currentStep: 'greeting',
      userInterested: null,
      hasBiology: null,
      wantsMoreInfo: null,
      askedAbout: [],
      language: 'en'
    };
    this.nlpProcessor = new NLPProcessor('en');
  }

  setLanguage(language: string): void {
    this.state.language = language;
    this.nlpProcessor.setLanguage(language);
  }

  generateResponse(userInput: string, action?: string): Message {
    const messageId = Date.now().toString();
    
    // Check for end conversation intent first
    const intent = this.nlpProcessor.analyzeIntent(userInput);
    if (intent.intent === 'end_conversation') {
      return {
        id: messageId,
        text: this.getLocalizedText('conversationEnded'),
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    if (action) {
      return this.handleButtonAction(action, userInput, messageId);
    }

    return this.handleTextInput(userInput, messageId);
  }

  private handleButtonAction(action: string, value: string, messageId: string): Message {
    switch (action) {
      case 'interested':
        this.state.userInterested = value === 'yes';
        this.state.currentStep = value === 'yes' ? 'eligibility' : 'not_interested';
        break;
      
      case 'biology':
        this.state.hasBiology = value === 'yes';
        this.state.currentStep = value === 'yes' ? 'program_details' : 'no_biology';
        break;
      
      case 'more_info':
        this.state.wantsMoreInfo = value === 'yes';
        this.state.currentStep = value === 'yes' ? 'choose_topic' : 'thanks';
        break;
      
      case 'topic':
        this.state.askedAbout.push(value);
        this.state.currentStep = value;
        break;
      
      case 'continue':
        this.state.currentStep = 'choose_topic';
        break;

      case 'back':
        this.state.currentStep = 'choose_topic';
        break;

      case 'admission_form':
        this.state.currentStep = 'admission_form';
        break;
    }

    return this.getResponseForStep(messageId);
  }

  private handleTextInput(userInput: string, messageId: string): Message {
    const intent = this.nlpProcessor.analyzeIntent(userInput);
    
    // Handle different intents
    switch (intent.intent) {
      case 'end_conversation':
        return {
          id: messageId,
          text: this.getLocalizedText('conversationEnded'),
          sender: 'bot',
          timestamp: new Date()
        };
        
      case 'greeting':
        if (this.state.currentStep === 'greeting') {
          return this.getResponseForStep(messageId);
        }
        break;
        
      case 'show_interest':
        if (this.state.currentStep === 'greeting') {
          this.state.userInterested = true;
          this.state.currentStep = 'eligibility';
          return this.getResponseForStep(messageId);
        }
        break;
        
      case 'biology_eligibility':
        if (this.state.currentStep === 'eligibility') {
          this.state.hasBiology = true;
          this.state.currentStep = 'program_details';
          return this.getResponseForStep(messageId);
        }
        break;
        
      case 'fee_inquiry':
        this.state.askedAbout.push('fees');
        this.state.currentStep = 'fees';
        return this.getResponseForStep(messageId);
        
      case 'hostel_inquiry':
        this.state.askedAbout.push('hostel');
        this.state.currentStep = 'hostel';
        return this.getResponseForStep(messageId);
        
      case 'location_inquiry':
        this.state.askedAbout.push('location');
        this.state.currentStep = 'location';
        return this.getResponseForStep(messageId);
        
      case 'scholarship_inquiry':
        this.state.askedAbout.push('scholarship');
        this.state.currentStep = 'scholarship';
        return this.getResponseForStep(messageId);
        
      case 'career_inquiry':
        this.state.askedAbout.push('career');
        this.state.currentStep = 'career';
        return this.getResponseForStep(messageId);
        
      case 'admission_form_request':
        this.state.currentStep = 'admission_form';
        return this.getResponseForStep(messageId);
    }
    
    const input = userInput.toLowerCase();
    
    // Check for positive responses
    if (input.includes('yes') || input.includes('sure') || input.includes('okay') || input.includes('tell me') ||
        input.includes('हाँ') || input.includes('हां') || input.includes('जी') || input.includes('बताओ')) {
      if (this.state.currentStep === 'greeting') {
        this.state.userInterested = true;
        this.state.currentStep = 'eligibility';
      } else if (this.state.currentStep === 'eligibility') {
        this.state.hasBiology = true;
        this.state.currentStep = 'program_details';
      } else if (this.state.currentStep === 'program_details') {
        this.state.wantsMoreInfo = true;
        this.state.currentStep = 'choose_topic';
      }
    }
    
    // Check for negative responses
    else if (input.includes('no') || input.includes('not interested') || input.includes('nope') ||
             input.includes('नहीं') || input.includes('ना') || input.includes('नही')) {
      if (this.state.currentStep === 'greeting') {
        this.state.userInterested = false;
        this.state.currentStep = 'not_interested';
      } else if (this.state.currentStep === 'eligibility') {
        this.state.hasBiology = false;
        this.state.currentStep = 'no_biology';
      } else if (this.state.currentStep === 'program_details') {
        this.state.wantsMoreInfo = false;
        this.state.currentStep = 'thanks';
      }
    }
    
    // Check for specific topics
    else if (input.includes('fee') || input.includes('fees') || input.includes('cost') || input.includes('price') ||
             input.includes('फीस') || input.includes('शुल्क')) {
      this.state.askedAbout.push('fees');
      this.state.currentStep = 'fees';
    } else if (input.includes('hostel') || input.includes('accommodation') || input.includes('housing') ||
               input.includes('हॉस्टल') || input.includes('आवास')) {
      this.state.askedAbout.push('hostel');
      this.state.currentStep = 'hostel';
    } else if (input.includes('location') || input.includes('address') || input.includes('where') ||
               input.includes('स्थान') || input.includes('पता') || input.includes('कहाँ')) {
      this.state.askedAbout.push('location');
      this.state.currentStep = 'location';
    } else if (input.includes('scholarship') || input.includes('financial aid') || input.includes('funding') ||
               input.includes('छात्रवृत्ति') || input.includes('स्कॉलरशिप')) {
      this.state.askedAbout.push('scholarship');
      this.state.currentStep = 'scholarship';
    } else if (input.includes('seat') || input.includes('availability') || input.includes('admission') ||
               input.includes('सीट') || input.includes('प्रवेश')) {
      this.state.askedAbout.push('seats');
      this.state.currentStep = 'seats';
    } else if (input.includes('recognition') || input.includes('accreditation') || input.includes('approved') ||
               input.includes('मान्यता') || input.includes('प्रत्यायन')) {
      this.state.askedAbout.push('recognition');
      this.state.currentStep = 'recognition';
    } else if (input.includes('training') || input.includes('clinical') || input.includes('practical') ||
               input.includes('प्रशिक्षण') || input.includes('क्लिनिकल')) {
      this.state.askedAbout.push('training');
      this.state.currentStep = 'training';
    }

    return this.getResponseForStep(messageId);
  }

  private getResponseForStep(messageId: string): Message {
    const timestamp = new Date();
    const lang = this.state.language;

    switch (this.state.currentStep) {
      case 'greeting':
        return {
          id: messageId,
          text: this.getLocalizedText('greeting'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('yesInterested'), value: 'yes', action: 'interested' },
            { label: this.getLocalizedText('noThanks'), value: 'no', action: 'interested' }
          ]
        };

      case 'eligibility':
        return {
          id: messageId,
          text: this.getLocalizedText('eligibilityCheck'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('yesBiology'), value: 'yes', action: 'biology' },
            { label: this.getLocalizedText('noBiology'), value: 'no', action: 'biology' }
          ]
        };

      case 'no_biology':
        return {
          id: messageId,
          text: this.getLocalizedText('noBiologyResponse'),
          sender: 'bot',
          timestamp
        };

      case 'program_details':
        return {
          id: messageId,
          text: this.getLocalizedText('programDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('yesEverything'), value: 'yes', action: 'more_info' },
            { label: this.getLocalizedText('noEnough'), value: 'no', action: 'more_info' }
          ]
        };

      case 'choose_topic':
        return {
          id: messageId,
          text: this.getLocalizedText('chooseTopicTitle'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('feeStructure'), value: 'fees', action: 'topic' },
            { label: this.getLocalizedText('hostelTraining'), value: 'hostel', action: 'topic' },
            { label: this.getLocalizedText('collegeLocation'), value: 'location', action: 'topic' },
            { label: this.getLocalizedText('scholarships'), value: 'scholarship', action: 'topic' },
            { label: this.getLocalizedText('seatAvailability'), value: 'seats', action: 'topic' },
            { label: this.getLocalizedText('recognition'), value: 'recognition', action: 'topic' },
            { label: this.getLocalizedText('careerProspects'), value: 'career', action: 'topic' },
            { label: this.getLocalizedText('facultyProfile'), value: 'faculty', action: 'topic' },
            { label: this.getLocalizedText('campusLife'), value: 'campus', action: 'topic' },
            { label: this.getLocalizedText('alumniNetwork'), value: 'alumni', action: 'topic' },
            { label: this.getLocalizedText('admissionProcess'), value: 'admission_process', action: 'topic' },
            { label: this.getLocalizedText('admissionForm'), value: 'form', action: 'admission_form' }
          ]
        };

      case 'fees':
        return {
          id: messageId,
          text: this.getLocalizedText('feeDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'hostel':
        return {
          id: messageId,
          text: this.getLocalizedText('hostelDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'location':
        return {
          id: messageId,
          text: this.getLocalizedText('locationDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'scholarship':
        return {
          id: messageId,
          text: this.getLocalizedText('scholarshipDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'seats':
        return {
          id: messageId,
          text: this.getLocalizedText('seatsDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'recognition':
        return {
          id: messageId,
          text: this.getLocalizedText('recognitionDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'career':
        return {
          id: messageId,
          text: this.getLocalizedText('careerDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'faculty':
        return {
          id: messageId,
          text: this.getLocalizedText('facultyDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'campus':
        return {
          id: messageId,
          text: this.getLocalizedText('campusDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'alumni':
        return {
          id: messageId,
          text: this.getLocalizedText('alumniDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'admission_process':
        return {
          id: messageId,
          text: this.getLocalizedText('admissionProcessDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' },
            { label: this.getLocalizedText('askSomethingElse'), value: 'continue', action: 'continue' }
          ]
        };

      case 'admission_form':
        return {
          id: messageId,
          text: this.getLocalizedText('admissionFormDetails'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('fillFormButton'), value: 'yes', action: 'show_form' },
            { label: this.getLocalizedText('backToMenu'), value: 'back', action: 'back' }
          ]
        };

      case 'not_interested':
        return {
          id: messageId,
          text: this.getLocalizedText('notInterested'),
          sender: 'bot',
          timestamp
        };

      case 'thanks':
        return {
          id: messageId,
          text: this.getLocalizedText('thanks'),
          sender: 'bot',
          timestamp
        };

      default:
        return {
          id: messageId,
          text: this.getLocalizedText('defaultResponse'),
          sender: 'bot',
          timestamp,
          buttons: [
            { label: this.getLocalizedText('backToMenu'), value: 'continue', action: 'continue' }
          ]
        };
    }
  }

  private getLocalizedText(key: string): string {
    return getTranslation(this.state.language, key);
  }

  getInitialMessage(): Message {
    return this.generateResponse('', 'start');
  }

  reset(): void {
    const currentLanguage = this.state.language;
    this.nlpProcessor.setLanguage(currentLanguage);
    this.state = {
      currentStep: 'greeting',
      userInterested: null,
      hasBiology: null,
      wantsMoreInfo: null,
      askedAbout: [],
      language: currentLanguage
    };
  }
}
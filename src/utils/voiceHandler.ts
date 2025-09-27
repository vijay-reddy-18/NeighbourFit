// Voice handling utilities
export class VoiceHandler {
  private recognition: any;
  private synthesis: SpeechSynthesis;
  private currentLanguage: string;

  constructor(language: string = 'en') {
    this.currentLanguage = language;
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      
      this.updateLanguage(this.currentLanguage);
    }
  }

  updateLanguage(language: string): void {
    this.currentLanguage = language;
    if (this.recognition) {
      const languageMap: { [key: string]: string } = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'bn': 'bn-IN',
        'te': 'te-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'gu': 'gu-IN',
        'ur': 'ur-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN'
      };
      
      this.recognition.lang = languageMap[language] || 'en-US';
    }
  }

  startListening(onResult: (text: string) => void, onError: (error: string) => void): void {
    if (!this.recognition) {
      onError('Speech recognition not supported');
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.start();
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text: string): void {
    if (this.synthesis) {
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice based on language
      const voices = this.synthesis.getVoices();
      const languageVoice = voices.find(voice => 
        voice.lang.startsWith(this.getVoiceLanguage(this.currentLanguage))
      );
      
      if (languageVoice) {
        utterance.voice = languageVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      this.synthesis.speak(utterance);
    }
  }

  private getVoiceLanguage(language: string): string {
    const voiceMap: { [key: string]: string } = {
      'en': 'en',
      'hi': 'hi',
      'bn': 'bn',
      'te': 'te',
      'mr': 'mr',
      'ta': 'ta',
      'gu': 'gu',
      'ur': 'ur',
      'kn': 'kn',
      'ml': 'ml'
    };
    
    return voiceMap[language] || 'en';
  }

  isSupported(): boolean {
    return !!(this.recognition && this.synthesis);
  }
}
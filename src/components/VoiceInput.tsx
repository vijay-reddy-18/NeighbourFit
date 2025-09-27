import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { VoiceHandler } from '../utils/voiceHandler';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
  language: string;
  disabled?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onVoiceInput, 
  language, 
  disabled = false 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceHandler, setVoiceHandler] = useState<VoiceHandler | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const handler = new VoiceHandler(language);
    setVoiceHandler(handler);
    setIsSupported(handler.isSupported());
  }, []);

  useEffect(() => {
    if (voiceHandler) {
      voiceHandler.updateLanguage(language);
    }
  }, [language, voiceHandler]);

  const startListening = () => {
    if (!voiceHandler || disabled) return;

    setIsListening(true);
    voiceHandler.startListening(
      (text: string) => {
        setIsListening(false);
        onVoiceInput(text);
      },
      (error: string) => {
        setIsListening(false);
        console.error('Voice recognition error:', error);
      }
    );
  };

  const stopListening = () => {
    if (voiceHandler) {
      voiceHandler.stopListening();
      setIsListening(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        disabled={disabled}
        className={`p-2 rounded-full transition-all duration-200 ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      
      {isListening && (
        <div className="flex items-center space-x-1 text-red-500 text-sm">
          <Volume2 size={16} className="animate-pulse" />
          <span>Listening...</span>
        </div>
      )}
    </div>
  );
};
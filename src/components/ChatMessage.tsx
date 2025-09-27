import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  onButtonClick: (value: string, action: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onButtonClick }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            message.sender === 'user'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto'
              : 'bg-white text-gray-800 border border-gray-200'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        
        {message.buttons && message.buttons.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => onButtonClick(button.value, button.action)}
                className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors duration-200 hover:shadow-sm"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-1 text-xs text-gray-500">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
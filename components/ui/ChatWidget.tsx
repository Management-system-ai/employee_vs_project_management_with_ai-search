'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { generateGeminiResponse } from '@/app/server-actions/gemini/generateResponse';
import { ChatHistory } from '@/types/types';
import { USER_ROLE, BOT_ROLE } from '@/constants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

const suggestedQuestions = [
  "Tìm tất cả các dự án thuộc domain 'X'",
  "Tìm các dự án mà nhân viên 'Nguyễn Đức Quyền' đang tham gia",
  "Đưa ra các kỹ năng mà dự án 'X' đang yêu cầu",
  'Lấy các dự án còn hoạt động, bao gồm thông tin phase và nhân viên tham gia',
  "Tìm nhân viên có vai trò 'DEVELOPER' và đang làm việc",
  "Tìm nhân viên có kỹ năng 'PHP'",
  "Tìm nhân viên đang làm trong dự án 'Project A'"
];

const SuggestedQuestions = ({
  onSelectQuestion
}: {
  onSelectQuestion: (question: string) => void;
}) => (
  <div className="flex flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-sm">
    <p className="mb-2 text-sm font-semibold text-gray-700">
      Suggested Questions:
    </p>
    <div className="grid gap-2">
      {suggestedQuestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelectQuestion(question)}
          className="rounded-md border border-gray-200 bg-white px-4 py-2 text-left text-sm text-purple-600 shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] hover:border-purple-300 hover:bg-purple-50 hover:shadow-md"
        >
          {question}
        </button>
      ))}
    </div>
  </div>
);
export default function ChatBot({ hidden }: { hidden: boolean }) {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState<ChatHistory[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const addMessage = (
    content: string,
    role: typeof USER_ROLE | typeof BOT_ROLE
  ) => {
    setMessages(prevMessages => [...prevMessages, { content, role }]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      addMessage(inputMessage, USER_ROLE);
      respondToUser(inputMessage);
      setInputMessage('');
    }
  };

  const respondToUser = async (userMessage: string) => {
    try {
      const response = await generateGeminiResponse(userMessage, messages);
      addMessage(response, BOT_ROLE);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const handleSelectQuestion = (question: string) => {
    setInputMessage(question);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 mb-4 mr-6 ${hidden === true ? 'hidden' : ''}`}
      >
        <button
          onClick={toggleChatbox}
          className="flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <PlusIcon className="animate-spin-slow mr-2 h-6 w-6" />
          Chat with Admin Bot
        </button>
      </div>
      {isChatboxOpen && (
        <div className="animate-slideUp fixed bottom-16 right-6 w-96">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between rounded-t-lg border-b bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <p className="text-lg font-semibold">Admin Bot</p>
              <button
                onClick={toggleChatbox}
                className="text-white opacity-75 transition-opacity hover:opacity-100 focus:outline-none"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div
              ref={chatboxRef}
              className="h-80 overflow-y-auto bg-gray-50 p-4"
            >
              {messages.length === 0 ? (
                <SuggestedQuestions onSelectQuestion={handleSelectQuestion} />
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`animate-fadeIn mb-2 ${message.role === USER_ROLE ? 'text-right' : ''}`}
                  >
                    <div
                      className={`${
                        message.role === USER_ROLE
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white text-gray-700 shadow-md'
                      } inline-block rounded-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg`}
                    >
                      {message.role === USER_ROLE ? (
                        message.content
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          className="prose prose-sm max-w-none"
                        >
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex border-t bg-gray-50 p-4">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message"
                className="w-full rounded-l-full border px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="rounded-r-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

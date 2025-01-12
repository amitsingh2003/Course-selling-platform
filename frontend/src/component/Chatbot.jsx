import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  RefreshCcw,
  Copy,
  Check,
  Sparkles,
  Loader,
  BookOpen,
  Lightbulb,
  Code,
  Palette,
  History,
} from "lucide-react";

// Formatted Message Component
const FormattedMessage = ({ content }) => {
  // Helper function to parse and format code blocks
  const formatCodeBlock = (text) => {
    const parts = text.split("```");
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        // Extract language if specified
        const lines = part.split("\n");
        const language = lines[0].trim();
        const code = lines.slice(1).join("\n");

        return (
          <pre
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg my-2 font-mono text-sm overflow-x-auto"
          >
            {language && (
              <div className="text-xs text-gray-500 mb-2">{language}</div>
            )}
            <code>{code.trim()}</code>
          </pre>
        );
      }
      return formatText(part);
    });
  };

  // Helper function to parse and format text with markdown
  const formatText = (text) => {
    if (!text.trim()) return null;

    // Check for code blocks first
    if (text.includes("```")) {
      return formatCodeBlock(text);
    }

    // Split into lines for processing
    const lines = text.split("\n");
    const formattedLines = [];
    let currentList = [];
    let listType = null;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle headers
      const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        if (currentList.length) {
          formattedLines.push(createList(currentList, listType));
          currentList = [];
          listType = null;
        }

        const level = headerMatch[1].length;
        const title = headerMatch[2];
        formattedLines.push(
          <div
            key={`header-${index}`}
            className={`font-bold ${
              level === 1
                ? "text-2xl"
                : level === 2
                ? "text-xl"
                : level === 3
                ? "text-lg"
                : "text-base"
            } mb-2 mt-4`}
          >
            {title}
          </div>
        );
        return;
      }

      // Handle bullet points
      if (trimmedLine.match(/^[*-]\s/)) {
        if (listType === "numbered") {
          formattedLines.push(createList(currentList, listType));
          currentList = [];
        }
        listType = "bullet";
        currentList.push(trimmedLine.replace(/^[*-]\s/, ""));
        return;
      }

      // Handle numbered lists
      const numberedListMatch = trimmedLine.match(/^\d+\.\s(.+)/);
      if (numberedListMatch) {
        if (listType === "bullet") {
          formattedLines.push(createList(currentList, listType));
          currentList = [];
        }
        listType = "numbered";
        currentList.push(numberedListMatch[1]);
        return;
      }

      // Handle regular paragraphs
      if (currentList.length) {
        formattedLines.push(createList(currentList, listType));
        currentList = [];
        listType = null;
      }

      if (trimmedLine) {
        formattedLines.push(
          <p
            key={`p-${index}`}
            className="my-2 text-gray-700 dark:text-gray-300"
          >
            {trimmedLine}
          </p>
        );
      }
    });

    // Handle any remaining list items
    if (currentList.length) {
      formattedLines.push(createList(currentList, listType));
    }

    return formattedLines;
  };

  // Helper function to create lists
  const createList = (items, type) => {
    const ListComponent = type === "bullet" ? "ul" : "ol";
    const listClass = type === "bullet" ? "list-disc" : "list-decimal";

    return (
      <ListComponent
        key={`list-${Date.now()}`}
        className={`${listClass} pl-6 space-y-2 my-2`}
      >
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-700 dark:text-gray-300">
            {item}
          </li>
        ))}
      </ListComponent>
    );
  };

  return <div className="space-y-2">{formatText(content)}</div>;
};

// Main Chatbot Component
const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestions] = useState([
    "Explain machine learning concepts",
    "Help with coding problems",
    "Design principles tutorial",
    "Study techniques advice",
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          type: "system",
          content: "Welcome to your AI Learning Assistant! 👋",
          suggestions: [
            { icon: BookOpen, text: "Learning Paths", color: "text-blue-500" },
            { icon: Code, text: "Coding Help", color: "text-green-500" },
            {
              icon: Palette,
              text: "Creative Projects",
              color: "text-purple-500",
            },
            { icon: Lightbulb, text: "Quick Tips", color: "text-yellow-500" },
          ],
        },
      ]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = { type: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://course-selling-platform.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: data.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content:
            "I apologize, but I'm having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMessage = (message, index) => {
    switch (message.type) {
      case "system":
        return (
          <div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                         p-4 rounded-xl space-y-4"
          >
            <p className="text-lg font-medium">{message.content}</p>
            <div className="grid grid-cols-2 gap-3">
              {message.suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion.text)}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md 
                           transition-all duration-300 hover:-translate-y-1"
                >
                  <suggestion.icon className={`w-5 h-5 ${suggestion.color}`} />
                  <span className="font-medium">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "user":
        return (
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-xl max-w-[80%]">
              {message.content}
            </div>
          </div>
        );

      case "assistant":
        return (
          <div className="flex gap-2 max-w-[80%]">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-2 w-full">
              <div className="prose dark:prose-invert max-w-none">
                <FormattedMessage content={message.content} />
              </div>
              <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t dark:border-gray-700">
                <button
                  onClick={() => handleCopy(message.content)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl max-w-[80%]">
            {message.content}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 dark:bg-gray-900 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Learning Assistant</h2>
              <p className="text-sm text-gray-500">Powered by GPT-4</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <div key={index}>{renderMessage(message, index)}</div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader className="w-4 h-4 animate-spin" />
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t dark:border-gray-800">
              <div className="space-y-4">
                {/* Suggestions */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="flex-shrink-0 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 
                               dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 
                               transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(newMessage);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask anything about learning..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                             focus:border-transparent outline-none transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !newMessage.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-colors 
                             flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* History Sidebar */}
          {showHistory && (
            <div className="w-64 border-l dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
              <h3 className="font-medium mb-3">Chat History</h3>
              <div className="space-y-2">
                {messages
                  .filter((m) => m.type === "user")
                  .map((m, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(m.content)}
                      className="text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 
                               dark:hover:text-blue-400 truncate w-full"
                    >
                      {m.content}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

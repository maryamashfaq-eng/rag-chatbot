import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { sendChatMessage, checkHealth } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    checkHealth()
      .then(ok => setStatus(ok ? 'online' : 'offline'))
      .catch(() => setStatus('offline'));
  }, []);

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);
    try {
      const data = await sendChatMessage(text);
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer, sources: data.sources }]);
    } catch (e) {
      console.log(e);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error: Backend se connect nahi ho raha. Check karo backend 8000 par chal raha hai?' }]);
      setStatus('offline');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto border h-screen flex flex-col bg-gray-900">
      <div className="p-4 bg-black text-white flex justify-between">
        <h1 className="text-2xl font-bold">RAG Chatbot</h1>
        <span className={status === 'online' ? 'text-green-400' : status === 'offline' ? 'text-red-400' : 'text-yellow-400'}>{status}</span>
      </div>
      <ChatWindow messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}
export default App;
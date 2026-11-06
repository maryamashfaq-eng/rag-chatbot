import { useState } from 'react';
export default function ChatInput({ onSend, loading }) {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSend(text);
        setText('');
    };
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask something..." className="flex-1 border rounded p-2" />
            <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">Send</button>
        </form>
    );
}
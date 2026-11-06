export default function ChatMessage({ role, text, sources }) {
    const isUser = role === 'user';
    return (
        <div className={`p-3 my-2 rounded-lg ${isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-black'} max-w-[80%]`}>
            <p>{text}</p>
            {sources && sources.length > 0 && (
                <div className="mt-2 text-xs opacity-70">
                    <b>Sources:</b> {sources.map((s, i) => <span key={i}>{s} </span>)}
                </div>
            )}
        </div>
    );
}
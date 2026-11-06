import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
export default function ChatWindow({ messages, loading }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 h-[70vh]">
            {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
            {loading && <LoadingIndicator />}
        </div>
    );
}
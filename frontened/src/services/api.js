const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function checkHealth() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
}

export async function sendChatMessage(message) {
    const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
    });
    if (!res.ok) throw new Error("Backend error");
    return await res.json();
}
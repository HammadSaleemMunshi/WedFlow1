// WedFlow AI Chatbot Logic

// Inject Chatbot HTML into the DOM
const chatbotHTML = `
    <div class="chatbot-container" id="chatbot">
        <button class="chatbot-toggle" id="chat-toggle">
            <span>💬</span>
        </button>
        <div class="chat-window hidden" id="chat-window">
            <div class="chat-header">
                <h3>WedFlow AI Assistant</h3>
                <button id="close-chat">&times;</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot">
                    Hello! I'm your WedFlow assistant. How can I help you find the perfect venue today?
                </div>
            </div>
            <form class="chat-input" id="chat-form">
                <input type="text" id="user-input" placeholder="Ask me anything..." required>
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Select elements after injection
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "That's a great question! Our venues are filling up fast for 2026.",
                "I can help you with that. Are you looking for a specific location?",
                "WedFlow offers the best price guarantee for all our listed venues.",
                "You can check availability directly on the venue details page!",
                "I'm here to make your wedding planning as smooth as possible."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    });
}

class WebSocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000;
    }

    connect() {
        // Use ws:// for local development, wss:// for production
        const wsUrl = process.env.NODE_ENV === 'production'
            ? 'wss://your-production-url.com'
            : 'ws://localhost:3000';

        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
            this.triggerEvent('connected', true);
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('WebSocket message received:', data);
                this.triggerEvent(data.type, data.payload);
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.triggerEvent('error', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.triggerEvent('disconnected', true);
            this.attemptReconnect();
        };
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            setTimeout(() => this.connect(), this.reconnectDelay);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    // Join a chat room
    joinChat(chatId) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'join',
                payload: { chatId }
            }));
            console.log(`Joined chat: ${chatId}`);
        } else {
            console.error('WebSocket not connected');
        }
    }

    // Send a chat message
    sendMessage(chatId, content, mediaUrl = null) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'chat',
                payload: { chatId, content, mediaUrl }
            }));
        } else {
            console.error('WebSocket not connected');
        }
    }

    // Subscribe to events
    on(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(callback);
    }

    // Unsubscribe from events
    off(eventType, callback) {
        if (this.listeners.has(eventType)) {
            const callbacks = this.listeners.get(eventType);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    // Trigger event callbacks
    triggerEvent(eventType, data) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).forEach(callback => {
                callback(data);
            });
        }
    }

    isConnected() {
        return this.socket && this.socket.readyState === WebSocket.OPEN;
    }
}

// Create a singleton instance
const wsService = new WebSocketService();
export default wsService;
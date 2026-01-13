import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, addMessageFromSocket } from "../slices/messagesSlice";
import wsService from "../../utils/websocket";

function ChatInput({ chatId }) {
    const [message, setMessage] = useState('');

    const handleSend = useCallback(() => {
        if (message.trim() && chatId) {
            wsService.sendMessage(chatId, message.trim());
            setMessage('');
        }
    }, [message, chatId]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    const handleImageClick = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Image selected:', file.name);
                // TODO: Upload image to your server/cloud storage
            }
        };
        input.click();
    }, []);

    return (
        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-t border-[#2a3942]">
            <button
                onClick={handleImageClick}
                className="text-[#8696a0] hover:text-[#00a884] transition-colors p-2 hover:bg-[#2a3942] rounded-full"
                title="Attach image"
            >
                <i className="ri-attachment-2 text-2xl"></i>
            </button>

            <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 shadow-sm">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-[#e9edef] py-3 text-base outline-none placeholder-[#8696a0]"
                />
                <button
                    className="text-[#8696a0] hover:text-[#00a884] transition-colors p-1"
                    title="Emoji"
                >
                    <i className="ri-emotion-happy-line text-xl"></i>
                </button>
            </div>

            {message.trim() ? (
                <button
                    onClick={handleSend}
                    className="bg-[#00a884] hover:bg-[#00c997] text-white transition-all duration-200 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                    title="Send message"
                >
                    <i className="ri-send-plane-fill text-2xl"></i>
                </button>
            ) : (
                <button
                    className="text-[#8696a0] hover:text-[#00a884] transition-colors p-2 hover:bg-[#2a3942] rounded-full"
                    title="Voice message"
                >
                    <i className="ri-mic-line text-2xl"></i>
                </button>
            )}
        </div>
    );
}

const MessageBubble = ({ msg, isMe, showSenderName, selectedChat }) => {
    const formattedTime = useMemo(() => {
        if (msg.createdAt) {
            return new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return msg.time || 'Now';
    }, [msg.createdAt, msg.time]);

    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className="group relative max-w-[85%] md:max-w-[70%]">
                {showSenderName && msg.sender?.name && (
                    <p className="text-[11px] text-[#00a884] font-semibold mb-1 ml-3">
                        {msg.sender.name}
                    </p>
                )}

                <div className={`relative rounded-lg px-4 py-2.5 shadow-md transition-shadow hover:shadow-lg ${isMe ? "bg-[#005c4b] rounded-tr-none" : "bg-[#202c33] rounded-tl-none"
                    }`}>
                    <div className={`absolute top-0 w-0 h-0 ${isMe
                        ? "right-0 -mr-2 border-l-[16px] border-l-[#005c4b] border-t-[16px] border-t-transparent"
                        : "left-0 -ml-2 border-r-[16px] border-r-[#202c33] border-t-[16px] border-t-transparent"
                        }`}></div>

                    <p className={`text-[15px] leading-6 break-words pr-12 ${isMe ? "text-white" : "text-[#e9edef]"}`}>
                        {msg.content || msg.text || ''}
                    </p>

                    <div className={`absolute bottom-1 right-2 flex items-center gap-1 text-[11px] ${isMe ? "text-[#ffffff99]" : "text-[#8696a0]"
                        }`}>
                        <span className="font-medium">{formattedTime}</span>
                        {isMe && <i className="ri-check-double-line text-sm text-[#53bdeb]"></i>}
                    </div>
                </div>

                <button className={`absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2a3942] hover:bg-[#374248] rounded-full p-1 shadow-lg ${isMe ? "left-0 -ml-2" : "right-0 -mr-2"
                    }`}>
                    <i className="ri-emotion-happy-line text-base text-[#8696a0]"></i>
                </button>
            </div>
        </div>
    );
};

const EmptyState = () => (
    <div className="flex-1 h-screen flex flex-col items-center justify-center bg-[#0b141a] text-[#8696a0] p-4">
        <div className="relative mb-8">
            <div className="w-40 h-40 bg-[#202c33] rounded-full flex items-center justify-center">
                <i className="ri-message-3-line text-7xl text-[#00a884] opacity-80"></i>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#00a884] rounded-full flex items-center justify-center">
                <i className="ri-chat-smile-3-line text-2xl text-white"></i>
            </div>
        </div>
        <h2 className="text-4xl font-bold text-[#e9edef] mb-4 text-center">ChatFlow</h2>
        <p className="text-base text-center max-w-md leading-6 text-[#8696a0] mb-8">
            Start a conversation by selecting a chat or creating a new one
        </p>
        <div className="flex items-center gap-2 text-xs text-[#8696a0]">
            <i className="ri-lock-line text-[#00a884]"></i>
            <span>End-to-end encrypted</span>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#00a884] border-t-transparent"></div>
            <p className="text-[#8696a0] text-sm">Loading messages...</p>
        </div>
    </div>
);

const NoMessagesState = () => (
    <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 bg-[#202c33] rounded-full flex items-center justify-center">
                <i className="ri-chat-3-line text-4xl text-[#00a884]"></i>
            </div>
            <div>
                <p className="text-[#e9edef] font-medium mb-1">No messages yet</p>
                <p className="text-[#8696a0] text-sm">Start the conversation!</p>
            </div>
        </div>
    </div>
);

export default function ChatWindow({ onMobile, onBack }) {
    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state) => state.chats);
    const { messagesByChat, loading } = useSelector((state) => state.messages);
    const { currentUser } = useSelector((state) => state.users);

    const messagesEndRef = useRef(null);
    const messages = useMemo(() =>
        selectedChat ? messagesByChat[selectedChat._id] || [] : [],
        [selectedChat, messagesByChat]
    );

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (!wsService.isConnected()) {
            wsService.connect();
        }

        const handleIncomingMessage = (message) => {
            dispatch(addMessageFromSocket({
                chatId: message.chat,
                message: message
            }));
        };

        wsService.on('chat', handleIncomingMessage);
        return () => wsService.off('chat', handleIncomingMessage);
    }, [dispatch]);

    useEffect(() => {
        if (selectedChat?._id) {
            dispatch(fetchMessages(selectedChat._id));
            if (wsService.isConnected()) {
                wsService.joinChat(selectedChat._id);
            }
        }
    }, [selectedChat, dispatch]);

    const chatName = useMemo(() => {
        if (!selectedChat) return '';
        if (selectedChat.isGroupChat) {
            return selectedChat.chatName || selectedChat.name || 'Group Chat';
        }
        const otherUser = selectedChat.users?.find(user => user._id !== currentUser?._id);
        return otherUser?.name || 'Unknown User';
    }, [selectedChat, currentUser]);

    const chatInitial = useMemo(() => chatName.charAt(0).toUpperCase(), [chatName]);

    if (!selectedChat) return <EmptyState />;

    return (
        <div className="flex-1 flex flex-col bg-[#0b141a] h-full">
            {/* Header */}
            <div className="bg-[#202c33] px-4 py-3.5 flex items-center gap-4 border-l border-[#111b21] shadow-md">
                {onMobile && (
                    <button
                        onClick={onBack}
                        className="text-[#8696a0] hover:text-[#00a884] transition-colors p-1.5 hover:bg-[#2a3942] rounded-full"
                    >
                        <i className="ri-arrow-left-line text-xl"></i>
                    </button>
                )}

                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-lg ${selectedChat.isGroupChat
                    ? "bg-gradient-to-br from-[#00a884] to-[#008069]"
                    : "bg-gradient-to-br from-[#667781] to-[#54656f]"
                    }`}>
                    {selectedChat.isGroupChat ? (
                        <i className="ri-group-line text-2xl"></i>
                    ) : (
                        <span className="text-base">{chatInitial}</span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-[#e9edef] font-semibold text-lg truncate">
                        {chatName}
                    </h3>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${wsService.isConnected() ? 'bg-[#00a884]' : 'bg-[#8696a0]'}`}></div>
                        <p className="text-xs text-[#8696a0]">
                            {wsService.isConnected() ? 'online' : 'connecting...'}
                        </p>
                    </div>
                </div>

                <div className="flex gap-5">
                    <button className="text-[#8696a0] hover:text-[#00a884] transition-colors p-1.5 hover:bg-[#2a3942] rounded-full">
                        <i className="ri-vidicon-line text-2xl"></i>
                    </button>
                    <button className="text-[#8696a0] hover:text-[#00a884] transition-colors p-1.5 hover:bg-[#2a3942] rounded-full">
                        <i className="ri-phone-line text-2xl"></i>
                    </button>
                    <button className="text-[#8696a0] hover:text-[#00a884] transition-colors p-1.5 hover:bg-[#2a3942] rounded-full">
                        <i className="ri-more-2-fill text-2xl"></i>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-6 bg-[#0b141a]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23182229' fill-opacity='0.08'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`
                }}
            >
                {loading ? (
                    <LoadingState />
                ) : messages.length === 0 ? (
                    <NoMessagesState />
                ) : (
                    <div className="max-w-4xl mx-auto space-y-3">
                        {messages.map((msg, index) => {
                            const senderId = typeof msg.sender === 'object' ? msg.sender?._id : msg.sender;
                            const isMe = senderId === currentUser?._id || msg.sender === "me";
                            const prevMsg = messages[index - 1];
                            const prevSenderId = prevMsg ? (typeof prevMsg.sender === 'object' ? prevMsg.sender?._id : prevMsg.sender) : null;
                            const showSenderName = !isMe && selectedChat.isGroupChat && (senderId !== prevSenderId);

                            return (
                                <MessageBubble
                                    key={msg._id}
                                    msg={msg}
                                    isMe={isMe}
                                    showSenderName={showSenderName}
                                    selectedChat={selectedChat}
                                />
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <ChatInput chatId={selectedChat._id} />
        </div>
    );
}
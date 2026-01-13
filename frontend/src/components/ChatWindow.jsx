import { useState } from "react";


function ChatInput() {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Image selected:', file.name);
            }
        };
        input.click();
    };

    return (
        <div className="bg-[#202c33] px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2">
            <button
                onClick={handleImageClick}
                className="text-[#8696a0] hover:text-[#56B9FE] transition-colors p-1"
            >
                <i className="ri-image-line text-xl md:text-2xl"></i>
            </button>
            <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-2.5 md:px-3">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent text-[#e9edef] py-2 text-sm md:text-base outline-none placeholder-[#8696a0]"
                />
            </div>
            {message.trim() ? (
                <button
                    onClick={handleSend}
                    className="text-[#56B9FE] hover:text-[#3ea4e8] transition-colors p-1"
                >
                    <i className="ri-send-plane-fill text-xl md:text-2xl"></i>
                </button>
            ) : (
                <button className="text-[#8696a0] hover:text-[#56B9FE] transition-colors p-1">
                    <i className="ri-mic-line text-xl md:text-2xl"></i>
                </button>
            )}
        </div>
    );
}

export default function ChatWindow({ chat, onMobile, onBack }) {
    const messages = [
        { id: 1, text: "Hey! How are you doing?", sender: "other", time: "10:30 AM" },
        { id: 2, text: "I'm doing great, thanks for asking!", sender: "me", time: "10:31 AM" },
        { id: 3, text: "Did you finish the project?", sender: "other", time: "10:32 AM" },
        { id: 4, text: "Yes, just submitted it this morning 🎉", sender: "me", time: "10:33 AM" },
        { id: 5, text: "That's awesome! Congrats!", sender: "other", time: "10:34 AM" },
    ];

    if (!chat)
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#222e35] text-[#8696a0] p-4">
                <div className="mb-6 md:mb-8">
                    <i className="ri-message-3-line text-[80px] md:text-[120px] opacity-50"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-[#e9edef] mb-3 md:mb-4">ChatFlow</h2>
                <p className="text-xs md:text-sm text-center max-w-md px-4 md:px-8 leading-5 md:leading-6">
                    Send and receive messages without keeping your phone online.<br />
                    Use ChatFlow on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>
        );

    return (
        <div className="flex-1 flex flex-col bg-[#0b141a]">
            {/* Header */}
            <div className="bg-[#202c33] px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3 border-l border-[#111b21]">
                {onMobile && (
                    <button
                        onClick={onBack}
                        className="text-[#8696a0] hover:text-[#56B9FE] transition-colors p-1 mr-1"
                    >
                        <i className="ri-arrow-left-line text-xl"></i>
                    </button>
                )}
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${chat.type === "group" ? "bg-[#56B9FE]" : "bg-[#6b7c85]"
                    }`}>
                    {chat.type === "group" ? (
                        <i className="ri-group-line text-lg md:text-xl"></i>
                    ) : (
                        <span className="text-xs md:text-sm">{chat.avatar}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[#e9edef] font-medium text-sm md:text-base truncate">{chat.name}</h3>
                    <p className="text-[10px] md:text-xs text-[#8696a0]">online</p>
                </div>
                <div className="flex gap-3 md:gap-5">
                    <button className="text-[#8696a0] hover:text-[#56B9FE] transition-colors p-1">
                        <i className="ri-search-line text-lg md:text-xl"></i>
                    </button>
                    <button className="text-[#8696a0] hover:text-[#56B9FE] transition-colors p-1">
                        <i className="ri-more-2-fill text-lg md:text-xl"></i>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-[#0b141a]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
                <div className="max-w-4xl mx-auto space-y-1.5 md:space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[80%] md:max-w-[65%] ${msg.sender === "me"
                                ? "bg-[#56B9FE]"
                                : "bg-[#202c33]"
                                } rounded-lg px-2.5 md:px-3 py-1.5 md:py-2 shadow-md`}>
                                <p className={`text-xs md:text-sm leading-4 md:leading-5 break-words ${msg.sender === "me" ? "text-black" : "text-white"
                                    }`}>
                                    {msg.text}
                                </p>
                                <span className={`text-[9px] md:text-[10px] float-right ml-2 mt-0.5 md:mt-1 flex items-center gap-1 ${msg.sender === "me" ? "text-black/60" : "text-[#8696a0]"
                                    }`}>
                                    {msg.time}
                                    {msg.sender === "me" && (
                                        <i className="ri-check-double-line text-[10px] md:text-xs"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input */}
            <ChatInput />
        </div>
    );
}

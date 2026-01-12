import { useState } from 'react';

function ChatInput() {
    const [message, setMessage] = useState('');

    return (
        <div className="bg-[#202c33] px-4 py-3 flex items-center gap-2">
            <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
                </svg>
            </button>
            <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z" />
                </svg>
            </button>
            <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-3">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent text-[#e9edef] py-2 outline-none placeholder-[#8696a0]"
                />
            </div>
            <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z" />
                </svg>
            </button>
        </div>
    );
}

export default function ChatWindow({ chat }) {
    const messages = [
        { id: 1, text: "Hey! How are you doing?", sender: "other", time: "10:30 AM" },
        { id: 2, text: "I'm doing great, thanks for asking!", sender: "me", time: "10:31 AM" },
        { id: 3, text: "Did you finish the project?", sender: "other", time: "10:32 AM" },
        { id: 4, text: "Yes, just submitted it this morning 🎉", sender: "me", time: "10:33 AM" },
        { id: 5, text: "That's awesome! Congrats!", sender: "other", time: "10:34 AM" },
    ];

    if (!chat)
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#222e35] text-[#8696a0]">
                <div className="mb-8">
                    <svg className="w-32 h-32 opacity-50" fill="currentColor" viewBox="0 0 303 172">
                        <path d="M113.313 90.638a15.062 15.062 0 0 0 15.062-15.062c0-8.32-6.742-15.062-15.062-15.062s-15.062 6.742-15.062 15.062c0 8.32 6.742 15.062 15.062 15.062zm0-25.124c5.522 0 10.062 4.489 10.062 10.062 0 5.572-4.489 10.062-10.062 10.062s-10.062-4.49-10.062-10.062c0-5.573 4.54-10.062 10.062-10.062z" />
                        <path d="M210.482 56.844a15.06 15.06 0 1 0 .001 30.119 15.06 15.06 0 0 0-.001-30.119zm0 25.119c-5.523 0-10.062-4.489-10.062-10.062s4.49-10.062 10.062-10.062c5.573 0 10.062 4.489 10.062 10.062s-4.489 10.062-10.062 10.062z" />
                        <path d="M249.054 75.573c0-49.082-39.942-89.025-89.025-89.025s-89.025 39.943-89.025 89.025c0 22.268 8.183 42.646 21.704 58.244l-14.24 42.487a2.5 2.5 0 0 0 3.187 3.186l42.436-14.214c15.62 13.54 35.997 21.723 58.363 21.723 49.082 0 88.6-39.943 88.6-89.426zm-89.025 84.427c-21.28 0-41.1-7.891-56.135-20.924a2.497 2.497 0 0 0-2.034-.576l-37.207 12.463 12.487-37.273a2.5 2.5 0 0 0-.576-2.034c-13.008-15.011-20.899-34.856-20.899-56.084 0-46.304 37.696-84.025 84.025-84.025S244.029 29.27 244.029 75.573c.05 46.329-37.646 84.427-84.001 84.427z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-light text-[#e9edef] mb-4">WhatsApp Web</h2>
                <p className="text-sm text-center max-w-md px-8 leading-6">
                    Send and receive messages without keeping your phone online.<br />
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>
        );

    return (
        <div className="flex-1 flex flex-col bg-[#0b141a]">
            {/* Header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-l border-[#111b21]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${chat.type === "group" ? "bg-[#4848ff]" : "bg-[#6b7c85]"
                    }`}>
                    {chat.type === "group" ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.5 12.068c1.378 0 2.5-1.122 2.5-2.5S18.878 7.068 17.5 7.068s-2.5 1.122-2.5 2.5 1.122 2.5 2.5 2.5zm-11 0c1.378 0 2.5-1.122 2.5-2.5S7.878 7.068 6.5 7.068s-2.5 1.122-2.5 2.5 1.122 2.5 2.5 2.5zm0 2c-2.067 0-6.2.833-6.2 2.5v1.932h12.4v-1.932c0-1.667-4.133-2.5-6.2-2.5zm11 0c-.26 0-.557.017-.883.05.883.717 1.483 1.65 1.483 2.45v1.932h5.6v-1.932c0-1.667-4.133-2.5-6.2-2.5z" />
                        </svg>
                    ) : (
                        <span className="text-sm">{chat.avatar}</span>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-[#e9edef] font-medium">{chat.name}</h3>
                    <p className="text-xs text-[#8696a0]">online</p>
                </div>
                <div className="flex gap-5">
                    <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z" />
                        </svg>
                    </button>
                    <button className="text-[#8696a0] hover:text-[#aebac1] transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182229' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
                <div className="max-w-4xl mx-auto space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[65%] ${msg.sender === "me"
                                ? "bg-[#4848ff]"
                                : "bg-[#202c33]"
                                } rounded-lg px-3 py-2 shadow-md`}>
                                <p className="text-white text-sm leading-5 break-words">
                                    {msg.text}
                                </p>
                                <span className={`text-[10px] float-right ml-2 mt-1 ${msg.sender === "me" ? "text-white/70" : "text-[#8696a0]"
                                    }`}>
                                    {msg.time}
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
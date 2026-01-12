import { useState } from 'react';

export default function Sidebar({ selectedChat, setSelectedChat }) {
    const [searchQuery, setSearchQuery] = useState('');

    const chats = [
        {
            id: 1,
            name: "Alice Johnson",
            type: "user",
            lastMessage: "Hey! How are you doing?",
            time: "10:30 AM",
            unread: 2,
            avatar: "AJ"
        },
        {
            id: 2,
            name: "Bob Smith",
            type: "user",
            lastMessage: "Did you see the latest update?",
            time: "9:15 AM",
            unread: 0,
            avatar: "BS"
        },
        {
            id: 3,
            name: "Project Team",
            type: "group",
            lastMessage: "Meeting at 3 PM today",
            time: "Yesterday",
            unread: 5,
            avatar: "PT"
        },
        {
            id: 4,
            name: "Sarah Williams",
            type: "user",
            lastMessage: "Thanks for your help!",
            time: "Monday",
            unread: 0,
            avatar: "SW"
        },
        {
            id: 5,
            name: "Design Team",
            type: "group",
            lastMessage: "New mockups uploaded",
            time: "Sunday",
            unread: 1,
            avatar: "DT"
        },
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full md:w-96 bg-[#111b21] flex flex-col h-screen">
            {/* Header */}
            <div className="bg-[#202c33] p-4 flex items-center justify-between">
                <h2 className="font-semibold text-base text-[#e9edef]">Chats</h2>
                <div className="flex gap-5">
                    <button className="text-[#aebac1] hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                        </svg>
                    </button>
                    <button className="text-[#aebac1] hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-2 bg-[#111b21]">
                <div className="relative">
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-4 py-2 bg-[#202c33] text-[#e9edef] rounded-lg border-none outline-none placeholder-[#8696a0]"
                    />
                </div>
            </div>

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto bg-[#111b21]">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8696a0]">
                        <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646z" />
                        </svg>
                        <p className="text-sm">No chats found</p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-[#202c33] ${selectedChat?.id === chat.id ? "bg-[#2a3942]" : ""
                                }`}
                        >
                            {/* Avatar */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${chat.type === "group" ? "bg-[#4848ff]" : "bg-[#6b7c85]"
                                }`}>
                                {chat.type === "group" ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.5 12.068c1.378 0 2.5-1.122 2.5-2.5S18.878 7.068 17.5 7.068s-2.5 1.122-2.5 2.5 1.122 2.5 2.5 2.5zm-11 0c1.378 0 2.5-1.122 2.5-2.5S7.878 7.068 6.5 7.068s-2.5 1.122-2.5 2.5 1.122 2.5 2.5 2.5zm0 2c-2.067 0-6.2.833-6.2 2.5v1.932h12.4v-1.932c0-1.667-4.133-2.5-6.2-2.5zm11 0c-.26 0-.557.017-.883.05.883.717 1.483 1.65 1.483 2.45v1.932h5.6v-1.932c0-1.667-4.133-2.5-6.2-2.5z" />
                                    </svg>
                                ) : (
                                    <span className="text-base">{chat.avatar}</span>
                                )}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-normal text-[#e9edef] truncate text-base">
                                        {chat.name}
                                    </h3>
                                    <span className="text-xs text-[#8696a0] flex-shrink-0 ml-2">
                                        {chat.time}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-[#8696a0] truncate">
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="bg-[#4848ff] text-white text-xs font-semibold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 flex-shrink-0 ml-2">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
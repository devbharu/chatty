import { useState } from "react";

// Sidebar Component
export default function Sidebar({ selectedChat, setSelectedChat, onMobile, setShowChat }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [searchUsers, setSearchUsers] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');

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

    const availableUsers = [
        { id: 6, name: "John Doe", avatar: "JD" },
        { id: 7, name: "Emma Wilson", avatar: "EW" },
        { id: 8, name: "Michael Brown", avatar: "MB" },
        { id: 9, name: "Lisa Anderson", avatar: "LA" },
        { id: 10, name: "David Lee", avatar: "DL" },
        { id: 11, name: "Sophie Taylor", avatar: "ST" },
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredUsers = availableUsers.filter(user =>
        user.name.toLowerCase().includes(searchUsers.toLowerCase())
    );

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
        setSearchUsers('');
        setSelectedUsers([]);
        setGroupName('');
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType(null);
        setSearchUsers('');
        setSelectedUsers([]);
        setGroupName('');
    };

    const toggleUserSelection = (user) => {
        if (selectedUsers.find(u => u.id === user.id)) {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreateChat = () => {
        if (selectedUsers.length === 1) {
            console.log('Creating chat with:', selectedUsers[0]);
            closeModal();
        }
    };

    const handleCreateGroup = () => {
        if (selectedUsers.length >= 2 && groupName.trim()) {
            console.log('Creating group:', groupName, 'with users:', selectedUsers);
            closeModal();
        }
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        if (onMobile) {
            setShowChat(true);
        }
    };

    return (
        <div className="w-full md:w-96 bg-[#111b21] flex flex-col h-screen relative">
            {/* Header */}
            <div className="bg-[#202c33] p-4 md:p-6 border-b border-[#2a3942]/50">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h2 className="font-bold text-xl md:text-2xl text-[#e9edef]">ChatFlow</h2>
                    <div className="flex gap-2 md:gap-3">
                        <button
                            onClick={() => setShowModal(!showModal)}
                            className="text-[#aebac1] hover:text-[#56B9FE] transition-all duration-200 hover:scale-110 p-1"
                        >
                            <i className="ri-add-line text-xl md:text-2xl"></i>
                        </button>
                        <button className="text-[#aebac1] hover:text-[#56B9FE] transition-all duration-200 hover:scale-110 p-1">
                            <i className="ri-more-2-fill text-xl md:text-2xl"></i>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <i className="ri-search-line absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#8696a0] text-lg md:text-xl"></i>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base bg-[#202c33] text-[#e9edef] rounded-xl border border-[#2a3942] outline-none placeholder-[#8696a0] focus:border-[#56B9FE] transition-all duration-200"
                    />
                </div>
            </div>

            {/* Selection Modal */}
            {showModal && !modalType && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={closeModal}
                    ></div>

                    <div className="absolute top-16 md:top-20 right-4 md:right-6 z-50 bg-[#202c33] rounded-xl shadow-2xl w-56 md:w-64 overflow-hidden border border-[#2a3942]">
                        <div className="py-2">
                            <button
                                onClick={() => openModal('chat')}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-3 md:gap-4 hover:bg-[#111b21] transition-colors text-[#e9edef]"
                            >
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-[#56B9FE] rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="ri-user-add-line text-lg md:text-xl text-white"></i>
                                </div>
                                <span className="font-medium text-sm md:text-base">New Chat</span>
                            </button>

                            <button
                                onClick={() => openModal('group')}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-3 md:gap-4 hover:bg-[#111b21] transition-colors text-[#e9edef]"
                            >
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-[#56B9FE] rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="ri-group-line text-lg md:text-xl text-white"></i>
                                </div>
                                <span className="font-medium text-sm md:text-base">New Group</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* New Chat/Group Modal */}
            {showModal && modalType && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 z-40"
                        onClick={closeModal}
                    ></div>

                    <div className="fixed inset-4 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto z-50 bg-[#202c33] rounded-2xl shadow-2xl w-auto md:w-[90%] md:max-w-md max-h-[calc(100vh-2rem)] md:max-h-[80vh] flex flex-col border border-[#2a3942]">
                        <div className="p-4 md:p-6 border-b border-[#2a3942]">
                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                <h3 className="text-lg md:text-xl font-bold text-[#e9edef]">
                                    {modalType === 'chat' ? 'New Chat' : 'New Group'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-[#8696a0] hover:text-[#e9edef] transition-colors p-1"
                                >
                                    <i className="ri-close-line text-xl md:text-2xl"></i>
                                </button>
                            </div>

                            {modalType === 'group' && (
                                <input
                                    type="text"
                                    placeholder="Group name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-[#111b21] text-[#e9edef] rounded-xl border border-[#2a3942] outline-none placeholder-[#8696a0] focus:border-[#56B9FE] transition-all mb-3 md:mb-4"
                                />
                            )}

                            <div className="relative">
                                <i className="ri-search-line absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#8696a0] text-lg md:text-xl"></i>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchUsers}
                                    onChange={(e) => setSearchUsers(e.target.value)}
                                    className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base bg-[#111b21] text-[#e9edef] rounded-xl border border-[#2a3942] outline-none placeholder-[#8696a0] focus:border-[#56B9FE] transition-all"
                                />
                            </div>

                            {modalType === 'group' && selectedUsers.length > 0 && (
                                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                                    {selectedUsers.map(user => (
                                        <div
                                            key={user.id}
                                            className="bg-[#56B9FE] text-white px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center gap-1.5 md:gap-2"
                                        >
                                            <span>{user.name}</span>
                                            <button
                                                onClick={() => toggleUserSelection(user)}
                                                className="hover:bg-white/20 rounded-full"
                                            >
                                                <i className="ri-close-line text-sm md:text-base"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 md:p-4">
                            {filteredUsers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-[#8696a0]">
                                    <i className="ri-user-search-line text-4xl md:text-5xl mb-2 md:mb-3"></i>
                                    <p className="text-xs md:text-sm">No users found</p>
                                </div>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => {
                                            if (modalType === 'chat') {
                                                setSelectedUsers([user]);
                                                handleCreateChat();
                                            } else {
                                                toggleUserSelection(user);
                                            }
                                        }}
                                        className={`flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 rounded-xl cursor-pointer transition-all hover:bg-[#111b21] ${selectedUsers.find(u => u.id === user.id) ? 'bg-[#111b21] border-2 border-[#56B9FE]' : ''
                                            }`}
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6b7c85] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm md:text-base">
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[#e9edef] font-medium text-sm md:text-base truncate">{user.name}</h4>
                                        </div>
                                        {modalType === 'group' && selectedUsers.find(u => u.id === user.id) && (
                                            <i className="ri-checkbox-circle-fill text-[#56B9FE] text-xl md:text-2xl flex-shrink-0"></i>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {modalType === 'group' && (
                            <div className="p-3 md:p-4 border-t border-[#2a3942]">
                                <button
                                    onClick={handleCreateGroup}
                                    disabled={selectedUsers.length < 2 || !groupName.trim()}
                                    className={`w-full py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base transition-all ${selectedUsers.length >= 2 && groupName.trim()
                                        ? 'bg-[#56B9FE] text-white hover:bg-[#3ea4e8]'
                                        : 'bg-[#2a3942] text-[#8696a0] cursor-not-allowed'
                                        }`}
                                >
                                    Create Group ({selectedUsers.length} selected)
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto px-2 md:px-3 py-2 bg-[#111b21]">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8696a0]">
                        <div className="bg-[#202c33] rounded-full p-4 md:p-6 mb-3 md:mb-4">
                            <i className="ri-message-3-line text-4xl md:text-5xl"></i>
                        </div>
                        <p className="text-xs md:text-sm font-medium">No conversations found</p>
                        <p className="text-[10px] md:text-xs text-[#667781] mt-1">Try a different search term</p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat)}
                            className={`flex items-center gap-3 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 my-1 cursor-pointer rounded-xl md:rounded-2xl transition-all duration-200 hover:bg-[#202c33] group ${selectedChat?.id === chat.id
                                ? "bg-[#202c33]"
                                : ""
                                }`}
                        >
                            <div className="relative">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg transition-all duration-200 group-hover:scale-105 ${chat.type === "group"
                                    ? "bg-[#56B9FE]"
                                    : "bg-[#6b7c85]"
                                    }`}>
                                    {chat.type === "group" ? (
                                        <i className="ri-group-line text-xl md:text-2xl"></i>
                                    ) : (
                                        <span className="text-base md:text-lg">{chat.avatar}</span>
                                    )}
                                </div>
                                {chat.unread > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-[#56B9FE] rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold border-2 border-[#111b21] shadow-lg">
                                        {chat.unread}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5 md:mb-1">
                                    <h3 className={`font-semibold truncate text-sm md:text-base transition-colors ${selectedChat?.id === chat.id ? "text-[#e9edef]" : "text-[#e9edef] group-hover:text-white"
                                        }`}>
                                        {chat.name}
                                    </h3>
                                    <span className="text-[10px] md:text-xs text-[#8696a0] flex-shrink-0 ml-2 font-medium">
                                        {chat.time}
                                    </span>
                                </div>
                                <p className={`text-xs md:text-sm truncate transition-colors ${chat.unread > 0 ? "text-[#d1d7db] font-medium" : "text-[#8696a0]"
                                    }`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
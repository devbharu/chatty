import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";


export default function Home() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleBackToChats = () => {
        setShowChat(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Hide on mobile when chat is open */}
            <div className={`${isMobile && showChat ? 'hidden' : 'flex'} ${isMobile ? 'w-full' : ''}`}>
                <Sidebar
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    onMobile={isMobile}
                    setShowChat={setShowChat}
                />
            </div>

            {/* Chat Window - Show based on screen size and selection */}
            <div className={`${isMobile ? (showChat ? 'flex w-full' : 'hidden') : 'flex flex-1'}`}>
                <ChatWindow
                    chat={selectedChat}
                    onMobile={isMobile}
                    onBack={handleBackToChats}
                />
            </div>
        </div>
    );
}
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../slices/chatSlice";
import { fetchUsers, fetchMe } from "../slices/userSlice";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
    const dispatch = useDispatch();
    const [showChat, setShowChat] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const { selectedChat } = useSelector((state) => state.chats);
    const { currentUser } = useSelector((state) => state.users);

    // Fetch initial data on mount
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch current user first, then fetch users and chats in parallel
                await dispatch(fetchMe()).unwrap();
                await Promise.all([
                    dispatch(fetchChats()).unwrap(),
                    dispatch(fetchUsers()).unwrap()
                ]);
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
            }
        };

        fetchInitialData();
    }, [dispatch]);

    // Detect mobile screen size with debouncing
    useEffect(() => {
        let timeoutId;

        const checkMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
            }, 150);
        };

        window.addEventListener('resize', checkMobile);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Auto-show chat on mobile when a chat is selected
    useEffect(() => {
        if (isMobile && selectedChat) {
            setShowChat(true);
        }
    }, [isMobile, selectedChat]);

    const handleBackToChats = useCallback(() => {
        setShowChat(false);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-[#111b21]">
            {/* Sidebar */}
            {(!isMobile || !showChat) && (
                <div className={isMobile ? 'w-full' : 'w-auto'}>
                    <Sidebar
                        onMobile={isMobile}
                        setShowChat={setShowChat}
                    />
                </div>
            )}

            {/* Chat Window */}
            {(!isMobile || showChat) && (
                <div className={isMobile ? 'w-full' : 'flex-1'}>
                    <ChatWindow
                        onMobile={isMobile}
                        onBack={handleBackToChats}
                    />
                </div>
            )}
        </div>
    );
}
// pages/Home.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar selectedChat={selectedChat} setSelectedChat={setSelectedChat} />

            {/* Chat Window */}
            <ChatWindow chat={selectedChat} />
        </div>
    );
}

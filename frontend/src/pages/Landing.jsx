import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
const ChatAppLanding = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Wait for DOM to be ready
        const initAnimations = () => {
            // ===== HERO SECTION ANIMATIONS =====
            const heroTimeline = gsap.timeline({
                defaults: { ease: 'power4.out' }
            });

            if (document.querySelector('.hero-content')) {
                heroTimeline
                    .from('.hero-content', {
                        y: 80,
                        opacity: 0,
                        duration: 1,
                        delay: 0.3
                    })
                    .from('.hero-title', {
                        y: 60,
                        opacity: 0,
                        duration: 1,
                        ease: 'power4.out'
                    }, '-=0.6')
                    .from('.hero-subtitle', {
                        y: 30,
                        opacity: 0,
                        duration: 0.8
                    }, '-=0.5')
                    .from('.hero-btn', {
                        y: 30,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.6,
                        stagger: 0.15
                    }, '-=0.4')
                    .from('.hero-chat-mockup', {
                        scale: 0.85,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'back.out(1.4)'
                    }, '-=0.7')
                    .from('.hero-stats-card', {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15
                    }, '-=0.6');

                // Floating animation for chat bubbles
                gsap.to('.float-bubble-1', {
                    y: -15,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut'
                });

                gsap.to('.float-bubble-2', {
                    y: -20,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                    delay: 0.5
                });

                gsap.to('.float-bubble-3', {
                    y: -12,
                    duration: 2.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut',
                    delay: 1
                });
            }

            // ===== FEATURES SECTION ANIMATIONS =====
            if (document.querySelector('.features-header')) {
                gsap.from('.features-header', {
                    scrollTrigger: {
                        trigger: '.features-section',
                        start: 'top 70%',
                        end: 'top 40%',
                        scrub: 1
                    },
                    y: 80,
                    opacity: 0,
                    duration: 1
                });

                gsap.from('.features-mockup-left', {
                    scrollTrigger: {
                        trigger: '.features-section',
                        start: 'top 60%',
                        end: 'top 30%',
                        scrub: 1
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1
                });

                gsap.from('.features-content-right', {
                    scrollTrigger: {
                        trigger: '.features-section',
                        start: 'top 60%',
                        end: 'top 30%',
                        scrub: 1
                    },
                    x: 100,
                    opacity: 0,
                    duration: 1
                });

                // Animate feature points
                const featurePoints = document.querySelectorAll('.feature-point');
                featurePoints.forEach((point, index) => {
                    gsap.from(point, {
                        scrollTrigger: {
                            trigger: point,
                            start: 'top 85%',
                            end: 'top 60%',
                            scrub: 1
                        },
                        x: 50,
                        opacity: 0,
                        duration: 0.8,
                        delay: index * 0.1
                    });
                });
            }

            // ===== NAVBAR ANIMATION ON SCROLL =====
            ScrollTrigger.create({
                start: 'top -80',
                end: 99999,
                toggleClass: { className: 'scrolled', targets: '.navbar' }
            });
        };

        // Initialize after a small delay to ensure DOM is ready
        const timeout = setTimeout(initAnimations, 100);

        // Cleanup function
        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-[#57B9FF]/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#57B9FF]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#57B9FF]/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <nav className="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <style>{`
          .navbar.scrolled {
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px rgba(87, 185, 255, 0.1);
          }
        `}</style>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <i className="ri-chat-4-fill text-3xl text-[#57B9FF]"></i>
                            <span className="text-2xl font-bold text-white">
                                ChatFlow
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={() => navigate("/login")} className="px-6 py-2 text-white hover:text-[#57B9FF] transition-colors font-medium">
                                Login
                            </button>
                            <button onClick={() => navigate("/signup")} className="px-6 py-2 bg-[#57B9FF] text-black rounded-full hover:bg-[#4AA8EE] transition-all font-semibold">
                                Sign Up
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-2xl"
                        >
                            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden mt-4 space-y-4 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                            <button onClick={() => navigate("/login")} className="w-full px-6 py-2 text-white hover:text-[#57B9FF] transition-colors font-medium text-left">
                                Login
                            </button>
                            <button onClick={() => navigate("/signup")} className="w-full px-6 py-2 bg-[#57B9FF] text-black rounded-full font-semibold">
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 pt-24 pb-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Content */}
                        <div className="hero-content space-y-8">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#57B9FF]/10 border border-[#57B9FF]/20 rounded-full backdrop-blur-sm">
                                <i className="ri-sparkling-fill text-[#57B9FF]"></i>
                                <span className="text-sm text-white">Trusted by 50M+ users worldwide</span>
                            </div>

                            <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight">
                                Your Conversations,
                                <br />
                                <span className="text-[#57B9FF]">Perfectly Simple</span>
                            </h1>

                            <p className="hero-subtitle text-xl text-gray-400 leading-relaxed max-w-xl">
                                Experience messaging the way it should be. Fast, secure, and beautifully designed for the way you communicate.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                                <button className="hero-btn group relative px-8 py-4 bg-[#57B9FF] text-black rounded-full text-lg font-semibold hover:bg-[#4AA8EE] transition-all">
                                    <span className="flex items-center space-x-2">
                                        <span>Get Started Free</span>
                                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                                    </span>
                                </button>

                                <button className="hero-btn px-8 py-4 border-2 border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/5 transition-colors">
                                    Download App
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-8 pt-8">
                                <div className="hero-stats-card">
                                    <div className="text-3xl font-bold text-white">50M+</div>
                                    <div className="text-sm text-gray-400">Active Users</div>
                                </div>
                                <div className="hero-stats-card">
                                    <div className="text-3xl font-bold text-white">150+</div>
                                    <div className="text-sm text-gray-400">Countries</div>
                                </div>
                                <div className="hero-stats-card">
                                    <div className="text-3xl font-bold text-white">4.9★</div>
                                    <div className="text-sm text-gray-400">App Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Chat Mockup */}
                        <div className="hero-chat-mockup relative">
                            {/* Main chat window */}
                            <div className="relative bg-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/10 shadow-2xl">
                                {/* Chat header */}
                                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#57B9FF] to-[#3A8FD9] rounded-full"></div>
                                        <div>
                                            <div className="text-white font-semibold">Sarah Wilson</div>
                                            <div className="text-xs text-gray-400">Online now</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <i className="ri-phone-fill text-xl text-gray-400 hover:text-[#57B9FF] cursor-pointer transition-colors"></i>
                                        <i className="ri-more-2-fill text-xl text-gray-400 hover:text-[#57B9FF] cursor-pointer transition-colors"></i>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="space-y-4 py-6">
                                    {/* Received message */}
                                    <div className="flex justify-start float-bubble-1">
                                        <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs">
                                            <p className="text-white text-sm">Hey! How's the new chat app working for you?</p>
                                            <span className="text-xs text-gray-500 mt-2 block">2:45 PM</span>
                                        </div>
                                    </div>

                                    {/* Sent message */}
                                    <div className="flex justify-end float-bubble-2">
                                        <div className="bg-[#57B9FF] rounded-2xl rounded-tr-sm px-5 py-3 max-w-xs">
                                            <p className="text-black text-sm">It's amazing! Super fast and the interface is so clean 🚀</p>
                                            <span className="text-xs text-black/60 mt-2 block text-right">2:46 PM</span>
                                        </div>
                                    </div>

                                    {/* Received message */}
                                    <div className="flex justify-start float-bubble-3">
                                        <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs">
                                            <p className="text-white text-sm">I know right! And it's so secure too 🔒</p>
                                            <span className="text-xs text-gray-500 mt-2 block">2:47 PM</span>
                                        </div>
                                    </div>

                                    {/* Typing indicator */}
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 rounded-2xl rounded-tl-sm px-5 py-3">
                                            <div className="flex items-center space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input area */}
                                <div className="flex items-center space-x-3 pt-5 border-t border-white/10">
                                    <button className="text-gray-400 hover:text-[#57B9FF] transition-colors">
                                        <i className="ri-emotion-happy-line text-2xl"></i>
                                    </button>
                                    <button className="text-gray-400 hover:text-[#57B9FF] transition-colors">
                                        <i className="ri-attachment-line text-2xl"></i>
                                    </button>
                                    <div className="flex-1 bg-white/5 rounded-full px-5 py-3">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm"
                                        />
                                    </div>
                                    <button className="w-12 h-12 bg-[#57B9FF] rounded-full flex items-center justify-center hover:bg-[#4AA8EE] transition-all">
                                        <i className="ri-send-plane-fill text-black text-xl"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Floating notification card */}
                            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-[#57B9FF] to-[#3A8FD9] rounded-2xl p-4 shadow-2xl border-4 border-black max-w-xs">
                                <div className="flex items-start space-x-3">
                                    <i className="ri-notification-fill text-2xl text-black flex-shrink-0"></i>
                                    <div>
                                        <div className="text-sm font-bold text-black">New Message</div>
                                        <div className="text-xs text-black/80 mt-1">Alex: "Let's catch up later!"</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <div className="absolute -bottom-8 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold text-white">Live & Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="features-header text-center space-y-6 mb-20">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#57B9FF]/10 border border-[#57B9FF]/20 rounded-full">
                            <i className="ri-star-fill text-[#57B9FF]"></i>
                            <span className="text-sm">Powerful Features</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Built for Modern
                            <br />
                            <span className="text-[#57B9FF]">Communication</span>
                        </h2>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to stay connected, all in one place
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Phone Mockup */}
                        <div className="features-mockup-left relative">
                            <div className="relative mx-auto max-w-sm">
                                <div className="relative bg-white/5 rounded-[3rem] p-3 border-4 border-white/10 shadow-2xl">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10"></div>

                                    <div className="bg-black rounded-[2.5rem] overflow-hidden">
                                        <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-black">
                                            <span className="text-xs text-white font-semibold">9:41</span>
                                            <div className="flex items-center space-x-1">
                                                <i className="ri-signal-wifi-fill text-white text-xs"></i>
                                                <i className="ri-battery-fill text-white text-xs"></i>
                                            </div>
                                        </div>

                                        <div className="bg-black px-4 pb-6 pt-2">
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 bg-[#57B9FF]/20 rounded-2xl p-3 border border-[#57B9FF]/30">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-[#57B9FF] to-[#3A8FD9] rounded-full"></div>
                                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black"></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-white font-semibold text-sm">Sarah Wilson</span>
                                                            <span className="text-[#57B9FF] text-xs">2m ago</span>
                                                        </div>
                                                        <p className="text-gray-400 text-xs truncate">See you at the coffee shop! ☕</p>
                                                    </div>
                                                    <div className="w-5 h-5 bg-[#57B9FF] rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-black text-xs font-bold">3</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-white font-semibold text-sm">Team Chat</span>
                                                            <span className="text-gray-500 text-xs">1h ago</span>
                                                        </div>
                                                        <p className="text-gray-500 text-xs truncate">Alex: Great work everyone! 🎉</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 p-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-white font-semibold text-sm">Mike Johnson</span>
                                                            <span className="text-gray-500 text-xs">3h ago</span>
                                                        </div>
                                                        <p className="text-gray-500 text-xs truncate">Thanks for the update!</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-around pt-6 mt-4 border-t border-white/10">
                                                <i className="ri-message-3-fill text-[#57B9FF] text-2xl"></i>
                                                <i className="ri-contacts-fill text-gray-600 text-2xl"></i>
                                                <div className="w-14 h-14 bg-[#57B9FF] rounded-full flex items-center justify-center -mt-8 shadow-lg">
                                                    <i className="ri-add-line text-black text-2xl font-bold"></i>
                                                </div>
                                                <i className="ri-notification-fill text-gray-600 text-2xl"></i>
                                                <i className="ri-settings-3-fill text-gray-600 text-2xl"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-[#57B9FF] to-[#3A8FD9] rounded-2xl p-3 shadow-xl border-4 border-black">
                                    <i className="ri-chat-check-fill text-2xl text-black"></i>
                                </div>

                                <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 shadow-xl">
                                    <div className="text-sm font-semibold text-white">Fully Encrypted</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Feature Points */}
                        <div className="features-content-right space-y-8">
                            <div className="feature-point flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-[#57B9FF]/20 rounded-2xl flex items-center justify-center">
                                    <i className="ri-message-3-fill text-3xl text-[#57B9FF]"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Instant Messaging</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Send messages that arrive instantly. Share text, emojis, and stay connected in real-time with anyone, anywhere.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-point flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-[#57B9FF]/20 rounded-2xl flex items-center justify-center">
                                    <i className="ri-group-fill text-3xl text-[#57B9FF]"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Group Conversations</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Create groups with friends, family, or colleagues. Organize conversations and keep everyone connected effortlessly.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-point flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-[#57B9FF]/20 rounded-2xl flex items-center justify-center">
                                    <i className="ri-lock-2-fill text-3xl text-[#57B9FF]"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Private & Secure</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        End-to-end encryption keeps your conversations private. Your messages are protected with bank-level security.
                                    </p>
                                </div>
                            </div>

                            <div className="feature-point flex items-start space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-[#57B9FF]/20 rounded-2xl flex items-center justify-center">
                                    <i className="ri-smartphone-fill text-3xl text-[#57B9FF]"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white mb-3">Cross-Platform Sync</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Access your chats from any device. Seamlessly switch between phone, tablet, and desktop without missing a beat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChatAppLanding;
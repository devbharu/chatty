import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black py-12">
            <div className="grid lg:grid-cols-2 gap-20 w-full max-w-7xl px-8 items-center">
                {/* Left Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    {/* Logo/Brand */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#57B9FF]">
                                <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
                            </svg>
                            <h1 className="text-5xl font-bold text-white">ChatFlow</h1>
                        </div>
                        <p className="text-gray-400 text-lg">Welcome back!</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

                        <div className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                                            <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#57B9FF] focus:ring-1 focus:ring-[#57B9FF] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                                            <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#57B9FF] focus:ring-1 focus:ring-[#57B9FF] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <span className="text-sm text-[#57B9FF] hover:text-[#3da5f5] cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full py-3.5 bg-[#57B9FF] text-black font-bold rounded-xl hover:bg-[#3da5f5] transition-all shadow-lg hover:shadow-[#57B9FF]/50"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center mt-8 text-gray-400">
                        Don't have an account?{" "}
                        <span className="text-[#57B9FF] font-semibold hover:text-[#3da5f5] hover:underline cursor-pointer transition-colors">
                            Sign Up
                        </span>
                    </p>
                </div>

                {/* Right Side - Animated Grid */}
                <div className="hidden m-13 pt-15 lg:block">
                    <div className="grid grid-cols-3 gap-6 max-w-lg">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl relative overflow-hidden group"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#57B9FF]/30 to-transparent"
                                    style={{
                                        animation: `sweep 3s ease-in-out ${i * 0.3}s infinite`,
                                        transform: 'translateX(-100%)'
                                    }}
                                />
                                <div className="absolute inset-0 bg-[#57B9FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>

                    <style>{`
                        @keyframes shimmerText {
                            0% {
                                background-position: -200% 0;
                            }
                            100% {
                                background-position: 200% 0;
                            }
                        }
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        @keyframes sweep {
                            0% {
                                transform: translateX(-100%);
                            }
                            50% {
                                transform: translateX(100%);
                            }
                            100% {
                                transform: translateX(100%);
                            }
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}
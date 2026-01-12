import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl px-8 items-center">
                {/* Left Side - Sign Up Form */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                    {/* Logo/Brand */}
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#57B9FF]">
                                <path d="M6.455 19L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455zM7 10v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
                            </svg>
                            <h1 className="text-5xl font-bold text-white">ChatFlow</h1>
                        </div>
                        <p className="text-gray-400 text-lg">Join the conversation</p>
                    </div>

                    {/* Sign Up Form */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

                        <div className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3.5 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#57B9FF] focus:ring-1 focus:ring-[#57B9FF] transition-all"
                                    />
                                </div>
                            </div>

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

                            {/* Terms Checkbox */}
                            <div className="flex items-start pt-1">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="w-4 h-4 mt-1 accent-[#57B9FF] bg-black border-gray-700"
                                />
                                <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                                    I agree to the{" "}
                                    <span className="text-[#57B9FF] hover:text-[#3da5f5] underline cursor-pointer">
                                        Terms of Service
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#57B9FF] hover:text-[#3da5f5] underline cursor-pointer">
                                        Privacy Policy
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full py-3.5 bg-[#57B9FF] text-black font-bold rounded-xl hover:bg-[#3da5f5] transition-all shadow-lg hover:shadow-[#57B9FF]/50 mt-2"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center mt-8 text-gray-400">
                        Already have an account?{" "}
                        <span className="text-[#57B9FF] font-semibold hover:text-[#3da5f5] hover:underline cursor-pointer transition-colors">
                            Log in
                        </span>
                    </p>
                </div>

                {/* Right Side - Animated Grid */}
                <div className="hidden  m-12 lg:block">
                    <div className="grid grid-cols-3 gap-4 ">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl relative overflow-hidden group"
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
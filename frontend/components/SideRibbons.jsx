"use client";

export default function SideRibbons() {
    return (
        <>
            {/* Left Ribbon */}
            <div className="fixed left-0 top-0 h-full w-[40px] sm:w-[50px] z-0 pointer-events-none hidden lg:block">
                {/* Main Ribbon */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to right, #b8935e 0%, #d4b07a 50%, #b8935e 100%)',
                        boxShadow: '3px 0 10px rgba(0,0,0,0.2)'
                    }}
                >
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-[60px] border-b border-[#8b6f47]"
                                style={{
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(139, 111, 71, 0.1)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Center Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#8b6f47] opacity-30" />

                    {/* Decorative Dots */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[100px] flex flex-col gap-[100px]">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-[#8b6f47] opacity-40" />
                        ))}
                    </div>
                </div>

                {/* Inner Edge Shadow */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-[6px]"
                    style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.15), transparent)'
                    }}
                />
            </div>

            {/* Right Ribbon */}
            <div className="fixed right-0 top-0 h-full w-[40px] sm:w-[50px] z-0 pointer-events-none hidden lg:block">
                {/* Main Ribbon */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to left, #b8935e 0%, #d4b07a 50%, #b8935e 100%)',
                        boxShadow: '-3px 0 10px rgba(0,0,0,0.2)'
                    }}
                >
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-[60px] border-b border-[#8b6f47]"
                                style={{
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(139, 111, 71, 0.1)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Center Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#8b6f47] opacity-30" />

                    {/* Decorative Dots */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[150px] flex flex-col gap-[100px]">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-[#8b6f47] opacity-40" />
                        ))}
                    </div>
                </div>

                {/* Inner Edge Shadow */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-[6px]"
                    style={{
                        background: 'linear-gradient(to left, rgba(0,0,0,0.15), transparent)'
                    }}
                />
            </div>
        </>
    );
}

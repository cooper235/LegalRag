"use client";

export default function AnimatedGavel() {
    return (
        <div className="relative w-[180px] h-[150px] flex items-end justify-center">
            {/* Sound Block (Base) - Stays Fixed */}
            <div className="absolute bottom-0 z-10">
                {/* Base Platform */}
                <div className="w-[80px] h-[12px] bg-[#c9a66b] border-2 border-[#5c4a32] rounded-sm shadow-md"></div>
                {/* Base Top */}
                <div
                    className="w-[60px] h-[20px] mx-auto -mt-[2px] rounded-t-lg border-2 border-b-0 border-[#5c4a32]"
                    style={{
                        background: 'linear-gradient(to bottom, #d4b07a 0%, #c9a66b 50%, #b8935e 100%)'
                    }}
                ></div>
            </div>

            {/* Gavel (Hammer) - Animated */}
            <div
                className="absolute bottom-[28px] left-1/2 origin-bottom-left gavel-swing"
                style={{ marginLeft: '-5px' }}
            >
                {/* Handle */}
                <div
                    className="w-[8px] h-[70px] rounded-full border border-[#5c4a32]"
                    style={{
                        background: 'linear-gradient(to right, #c9a66b 0%, #d4b07a 50%, #c9a66b 100%)'
                    }}
                ></div>

                {/* Hammer Head */}
                <div
                    className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-[50px] h-[24px] rounded-lg border-2 border-[#5c4a32]"
                    style={{
                        background: 'linear-gradient(to bottom, #d4b07a 0%, #c9a66b 30%, #b8935e 100%)'
                    }}
                >
                    {/* Head Rings */}
                    <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[2px] h-[16px] bg-[#5c4a32] opacity-40 rounded"></div>
                    <div className="absolute right-[6px] top-1/2 -translate-y-1/2 w-[2px] h-[16px] bg-[#5c4a32] opacity-40 rounded"></div>
                </div>
            </div>

            {/* Impact Lines (appear on strike) */}
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 impact-lines">
                <div className="absolute -left-[20px] w-[8px] h-[2px] bg-[#5c4a32] opacity-0 impact-line-left"></div>
                <div className="absolute -right-[20px] w-[8px] h-[2px] bg-[#5c4a32] opacity-0 impact-line-right"></div>
                <div className="absolute -left-[15px] -top-[8px] w-[6px] h-[2px] bg-[#5c4a32] opacity-0 impact-line-top-left rotate-45"></div>
                <div className="absolute -right-[15px] -top-[8px] w-[6px] h-[2px] bg-[#5c4a32] opacity-0 impact-line-top-right -rotate-45"></div>
            </div>

            <style jsx>{`
        .gavel-swing {
          animation: gavelSwing 1.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
        
        @keyframes gavelSwing {
          0%, 100% {
            transform: rotate(-35deg);
          }
          40% {
            transform: rotate(5deg);
          }
          45% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(0deg);
          }
          55% {
            transform: rotate(-35deg);
          }
        }

        .impact-line-left,
        .impact-line-right,
        .impact-line-top-left,
        .impact-line-top-right {
          animation: impactFlash 1.5s ease-in-out infinite;
        }

        @keyframes impactFlash {
          0%, 35%, 55%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          45%, 50% {
            opacity: 0.7;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}

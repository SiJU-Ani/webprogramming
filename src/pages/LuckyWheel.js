/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './LuckyWheel.css';

// Coupon options with updated color scheme - moved to top
const coupons = [
  { name: "10% OFF", color: "#0A3E42", code: "LUCKY10", discount: 0.10 },
  { name: "Free Dessert", color: "#0F6B73", code: "SWEETTREAT", freeItem: "dessert" },
  { name: "15% OFF", color: "#0D565C", code: "SAVE15", discount: 0.15 },
  { name: "Buy 1 Get 1", color: "#FFD700", code: "BOGO", textColor: "#0A3E42", specialOffer: "bogo" },
  { name: "Free Appetizer", color: "#0A3E42", code: "APPETIZER", freeItem: "appetizer" },
  { name: "20% OFF", color: "#0F6B73", code: "SPECIAL20", discount: 0.20 },
  { name: "No Luck", color: "#0D565C", code: null },
  { name: "5% OFF", color: "#FFD700", code: "SMALL5", discount: 0.05, textColor: "#0A3E42" }
];

const LuckyWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const segmentAngle = 360 / coupons.length;

  const spinWheel = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);
   
    const spinCount = 5 + Math.floor(Math.random() * 5);
    const randomCouponIndex = Math.floor(Math.random() * coupons.length);
    const destinationAngle = 360 - (segmentAngle * randomCouponIndex + segmentAngle / 2);
    const newRotation = spinCount * 360 + destinationAngle;
   
    setRotation(newRotation);
   
    setTimeout(() => {
      setSpinning(false);
      setResult(coupons[randomCouponIndex]);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lucky-wheel-container"
    >
      <div className="content-container">
        <h1 className="page-title">Try Your Luck</h1>
        
        <h2 className="section-title">Spin & Win</h2>
        
        <div className="wheel-container">
          <div className="wheel-outer-ring"></div>
          
          <div
            ref={wheelRef}
            className="wheel"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
            }}
          >
            {coupons.map((coupon, index) => (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${index * segmentAngle}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI/coupons.length)}% ${50 - 50 * Math.sin(Math.PI/coupons.length)}%)`,
                  backgroundColor: coupon.color
                }}
              >
                <div className="segment-divider"></div>
                <div 
                  className="segment-content"
                  style={{
                    transform: `translateX(-50%) rotate(${segmentAngle/2}deg)`,
                    color: coupon.textColor || 'white'
                  }}
                >
                  <span className="segment-text">{coupon.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="wheel-center">
            <div className="wheel-center-inner"></div>
          </div>
          
          <div className="wheel-pointer">
            <div className="pointer-triangle"></div>
            <div className="pointer-base"></div>
          </div>
        </div>
        
        <button
          className="spin-button"
          onClick={spinWheel}
          disabled={spinning}
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-container"
          >
            <h3 className="result-title">
              {result.code ? 'Congratulations!' : 'Try Again!'}
            </h3>
            <p className="result-prize">{result.name}</p>
            {result.code && (
              <>
                <p className="result-code">
                  Use code: <span className="code-text">{result.code}</span>
                </p>
                <button
                  className="apply-button"
                  onClick={() => {
                    // You can implement the coupon application logic here
                    setResult(null);
                  }}
                >
                  Apply Discount
                </button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LuckyWheel; 
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa';
import './Billing.css';

const Billing = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [tip, setTip] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  
  // Define callbacks with useCallback to prevent recreation on each render
  const loadCartFromStorage = useCallback(() => {
    const savedCart = localStorage.getItem('foodigoodiCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCart([]);
      }
    }
    
    const savedCoupon = localStorage.getItem('foodigoodiCoupon');
    if (savedCoupon) {
      try {
        setCoupon(JSON.parse(savedCoupon));
      } catch (error) {
        console.error("Error parsing coupon data:", error);
        setCoupon(null);
      }
    }
  }, []);
  
  const handleStorageChange = useCallback((e) => {
    if (e.key === 'foodigoodiCart') {
      loadCartFromStorage();
    }
  }, [loadCartFromStorage]);
  
  // Load cart from localStorage and set up event listener for storage changes
  useEffect(() => {
    // Initial load
    loadCartFromStorage();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', loadCartFromStorage);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', loadCartFromStorage);
    };
  }, [handleStorageChange, loadCartFromStorage]);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('foodigoodiCart', JSON.stringify(cart));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);
  
  // Update localStorage when coupon changes
  useEffect(() => {
    if (coupon) {
      localStorage.setItem('foodigoodiCoupon', JSON.stringify(coupon));
    }
  }, [coupon]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    setTip(0);
    localStorage.removeItem('foodigoodiCart');
    localStorage.removeItem('foodigoodiCoupon');
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.09; // 9% tax
  };

  const calculateGST = (subtotal) => {
    return subtotal * 0.05; // 5% GST
  };

  const calculateDiscount = (subtotal) => {
    if (!coupon) return 0;
    return subtotal * (coupon.discountPercentage / 100);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const gst = calculateGST(subtotal);
    const discount = calculateDiscount(subtotal);
    return subtotal + tax + gst + Number(tip) - discount;
  };
  
  const applyCoupon = () => {
    // Mock coupon codes - in a real app, these would be validated against a database
    const coupons = {
      "WELCOME10": { discountPercentage: 10, code: "WELCOME10" },
      "SAVE20": { discountPercentage: 20, code: "SAVE20" },
      "SPECIAL30": { discountPercentage: 30, code: "SPECIAL30" }
    };
    
    if (couponCode && coupons[couponCode.toUpperCase()]) {
      setCoupon(coupons[couponCode.toUpperCase()]);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <motion.div 
      className="billing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Billing Summary</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingCart size={50} />
          <h3>Your cart is empty</h3>
          <p>Add items from the menu to see your bill</p>
        </div>
      ) : (
        <div className="billing-content">
          <div className="cart-items">
            <h3>Your Order</h3>
            {cart.map(item => (
              <motion.div 
                key={item.id} 
                className="cart-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                  <p className="item-total">₹{(item.price * item.quantity)}</p>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
          
          <div className="billing-details">
            <div className="coupon-section">
              <h3>Apply Discount</h3>
              <div className="coupon-input">
                <input 
                  type="text" 
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {coupon && (
                <div className="applied-coupon">
                  <p>Applied: <span>{coupon.code}</span> ({coupon.discountPercentage}% off)</p>
                </div>
              )}
              <p className="coupon-hint">
                Try: WELCOME10, SAVE20, or win discounts from the Lucky Wheel!
              </p>
            </div>
            
            <div className="calculations">
              <h3>Bill Details</h3>
              <div className="calculation-row">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              <div className="calculation-row">
                <span>Tax (9%):</span>
                <span>₹{calculateTax(calculateSubtotal())}</span>
              </div>
              <div className="calculation-row">
                <span>GST (5%):</span>
                <span>₹{calculateGST(calculateSubtotal())}</span>
              </div>
              {coupon && (
                <div className="calculation-row discount">
                  <span>Discount ({coupon.discountPercentage}%):</span>
                  <span>-₹{calculateDiscount(calculateSubtotal())}</span>
                </div>
              )}
              <div className="calculation-row tip">
                <span>Tip:</span>
                <div className="tip-input">
                  <span>₹</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={tip}
                    onChange={(e) => setTip(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="calculation-row total">
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
            
            <div className="payment-section">
              <button className="checkout-btn">
                <FaCreditCard /> Proceed to Payment
              </button>
              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" />
                  <img src="https://cdn-icons-png.flaticon.com/512/217/217445.png" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default Billing; 
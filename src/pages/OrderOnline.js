import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, Truck, Home, Phone, User, CreditCard, MessagesSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const styles = {
  container: {
    backgroundColor: '#0A3E42',
    color: '#ffffff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    minHeight: '100vh'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  },
  formContainer: {
    backgroundColor: '#0F6B73',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  inputLabel: {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.875rem'
  },
  inputWrapper: {
    display: 'flex',
    borderBottom: '1px solid #1D9AAA',
    paddingBottom: '0.5rem'
  },
  icon: {
    marginRight: '0.5rem',
    color: '#4FD1C5'
  },
  input: {
    backgroundColor: 'transparent',
    width: '100%',
    outline: 'none',
    color: '#ffffff',
    border: 'none'
  },
  radioGroup: {
    display: 'flex',
    gap: '1rem'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  radio: {
    marginRight: '0.5rem'
  },
  orderSummary: {
    backgroundColor: '#0F6B73',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem'
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    marginBottom: '0.25rem'
  },
  divider: {
    borderTop: '1px solid #1D9AAA',
    margin: '0.5rem 0'
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#FFD700',
    color: '#0A3E42',
    fontWeight: 'bold',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  trackingContainer: {
    backgroundColor: '#0F6B73',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  mapContainer: {
    position: 'relative',
    backgroundColor: '#0F6B73',
    borderRadius: '0.5rem',
    height: '16rem',
    marginBottom: '1.5rem',
    overflow: 'hidden'
  },
  road: {
    position: 'absolute',
    backgroundColor: '#4A5568'
  },
  roadHorizontal: {
    left: 0,
    right: 0,
    height: '0.5rem'
  },
  roadVertical: {
    top: 0,
    bottom: 0,
    width: '0.5rem'
  },
  locationMarker: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%'
  },
  restaurant: {
    backgroundColor: '#FFD700',
    color: '#0A3E42'
  },
  destination: {
    backgroundColor: '#4FD1C5',
    color: '#0A3E42'
  },
  delivery: {
    backgroundColor: '#ffffff',
    color: '#0A3E42',
    transition: 'all 1s'
  },
  cityBlock: {
    position: 'absolute',
    width: '3.5rem',
    height: '3rem',
    backgroundColor: '#0F6B73',
    borderRadius: '0.125rem'
  },
  mapLabels: {
    position: 'absolute',
    bottom: '0.5rem',
    left: '0.5rem',
    fontSize: '0.75rem'
  },
  labelDisplay: {
    display: 'flex',
    alignItems: 'center'
  },
  labelDot: {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    marginRight: '0.25rem'
  },
  progressContainer: {
    marginBottom: '1.5rem'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#0F6B73',
    borderRadius: '9999px',
    height: '0.5rem',
    marginBottom: '1rem'
  },
  progressFill: {
    backgroundColor: '#FFD700',
    height: '100%',
    borderRadius: '9999px',
    transition: 'width 0.5s'
  },
  steps: {
    position: 'relative',
    paddingTop: '2.5rem'
  },
  stepsLine: {
    position: 'absolute',
    top: '3.5rem',
    left: '1.25rem',
    width: 'calc(100% - 2.5rem)',
    height: '0.25rem',
    backgroundColor: '#0F6B73'
  },
  stepsList: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepCircle: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepLabel: {
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    textAlign: 'center'
  },
  statusMessage: {
    backgroundColor: '#0F6B73',
    padding: '1rem',
    borderRadius: '0.5rem'
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  statusIcon: {
    marginRight: '0.75rem',
    marginTop: '0.25rem'
  },
  statusContent: {
    flex: 1
  },
  statusTitle: {
    fontWeight: 'bold'
  },
  statusText: {
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  },
  driverInfo: {
    marginTop: '0.5rem',
    fontSize: '0.875rem'
  },
  driverActions: {
    marginTop: '0.25rem'
  },
  actionButton: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#0D565C',
    borderRadius: '0.375rem',
    color: 'white',
    fontSize: '0.75rem',
    marginRight: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0A3E42'
    }
  }
};

const OrderOnline = () => {
  const { user } = useAuth();
  const [deliveryStatus, setDeliveryStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(35);
  const [progress, setProgress] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState(user ? user.username : '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [currentLocation, setCurrentLocation] = useState({ x: 30, y: 70 });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get cart items from localStorage
  const getCartItems = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('foodigoodiCart') || '[]');
      return cart;
    } catch (error) {
      console.error('Error parsing cart:', error);
      return [];
    }
  };

  // Calculate order details from cart
  const calculateOrderDetails = () => {
    const items = getCartItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 4.99;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + deliveryFee + tax;

    return {
      orderId: 'ORD-' + Math.floor(Math.random() * 10000),
      items,
      subtotal,
      deliveryFee,
      tax,
      total
    };
  };

  const [orderDetails, setOrderDetails] = useState(calculateOrderDetails());

  // Initialize and update order details when component mounts or cart changes
  useEffect(() => {
    // Initial calculation
    setOrderDetails(calculateOrderDetails());
    
    // Set up event listeners for cart changes
    const handleStorageChange = (e) => {
      if (e.key === 'foodigoodiCart') {
        setOrderDetails(calculateOrderDetails());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates (dispatched by other components)
    const handleCartUpdated = () => {
      setOrderDetails(calculateOrderDetails());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, []);

  // Create a dummy cart for testing
  const addDummyItemsToCart = () => {
    const dummyItems = [
      {
        id: Date.now(),
        name: "Butter Chicken",
        price: 350,
        quantity: 1
      },
      {
        id: Date.now() + 1,
        name: "Naan Bread",
        price: 50,
        quantity: 2
      }
    ];
    localStorage.setItem('foodigoodiCart', JSON.stringify(dummyItems));
    setOrderDetails(calculateOrderDetails());
  };

  // Simulate delivery progress after order is placed
  useEffect(() => {
    if (!orderPlaced) return;
    
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 1;
          
          if (newProgress === 25) {
            setDeliveryStatus('cooking');
          } else if (newProgress === 50) {
            setDeliveryStatus('on-the-way');
          } else if (newProgress === 100) {
            setDeliveryStatus('delivered');
          }
          
          if (newProgress % 10 === 0 && estimatedTime > 5) {
            setEstimatedTime(prev => prev - 3);
          }
          
          if (newProgress >= 50 && newProgress < 100) {
            setCurrentLocation(prev => ({
              x: prev.x + (60 - prev.x) / 20,
              y: prev.y - (prev.y - 20) / 20
            }));
          }
          
          return newProgress;
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [progress, estimatedTime, orderPlaced, calculateOrderDetails]);

  const statusText = {
    'preparing': 'Restaurant is preparing your order',
    'cooking': 'Your food is being cooked',
    'on-the-way': 'Driver is on the way to your location',
    'delivered': 'Your order has been delivered'
  };

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    const orderData = {
      ...orderDetails,
      deliveryDetails: {
        name,
        address: deliveryAddress,
        phone,
        paymentMethod,
        notes: deliveryNote
      }
    };

    try {
      // For now, we'll just simulate a successful order
      console.log('Order submitted:', orderData);
      alert('Order placed successfully! Your food will arrive soon.');
      
      // Clear cart after successful order
      localStorage.setItem('foodigoodiCart', '[]');
      localStorage.removeItem('foodigoodiCoupon');
      
      // Reset form
      setDeliveryAddress('');
      setDeliveryNote('');
      setPhone('');
      setPaymentMethod('card');
      
      // Start delivery tracking
      setProgress(0);
      setDeliveryStatus('preparing');
      setEstimatedTime(35);
      setOrderPlaced(true);
      
      // Notify other components that cart has been updated
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Online Delivery</h1>
      
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem'}}>
        <button 
          onClick={addDummyItemsToCart}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#FFD700',
            color: '#0A3E42',
            fontWeight: 'bold',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Add Test Items to Cart
        </button>
        <button 
          onClick={() => setOrderPlaced(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4FD1C5',
            color: '#0A3E42',
            fontWeight: 'bold',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Start Tracking Demo
        </button>
      </div>
      
      <div style={styles.gridContainer}>
        {/* Left column - Order form */}
        <div style={styles.formContainer}>
          <h2 style={styles.sectionTitle}>Delivery Details</h2>
          
          {orderDetails.items.length === 0 && !orderPlaced ? (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              color: 'white'
            }}>
              <p style={{ marginBottom: '20px' }}>Your cart is empty. Add items from the menu to place an order.</p>
              <button 
                onClick={addDummyItemsToCart}
                style={{
                  ...styles.submitButton,
                  maxWidth: '300px',
                  margin: '0 auto'
                }}
              >
                Add Test Items to Cart
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitDelivery}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <div style={styles.inputWrapper}>
                  <User size={20} style={styles.icon} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    style={styles.input}
                    required
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Delivery Address</label>
                <div style={styles.inputWrapper}>
                  <Home size={20} style={styles.icon} />
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    style={styles.input}
                    required
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <div style={styles.inputWrapper}>
                  <Phone size={20} style={styles.icon} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    style={styles.input}
                    required
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Delivery Notes (Optional)</label>
                <div style={styles.inputWrapper}>
                  <MessagesSquare size={20} style={styles.icon} />
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Special instructions for delivery"
                    style={styles.input}
                  />
                </div>
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Payment Method</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      style={styles.radio}
                    />
                    <CreditCard size={16} style={styles.icon} />
                    Credit Card
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      style={styles.radio}
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>
              
              <div style={styles.orderSummary}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                {orderDetails.items.length === 0 ? (
                  <div style={{textAlign: 'center', padding: '1rem', color: 'white'}}>
                    <p>Your cart is empty.</p>
                    <p>Add items from the menu or use the test button above.</p>
                  </div>
                ) : (
                  <>
                    {orderDetails.items.map((item, index) => (
                      <div key={index} style={styles.itemRow}>
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div style={styles.divider} />
                    <div style={styles.itemRow}>
                      <span>Subtotal</span>
                      <span>₹{orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={styles.itemRow}>
                      <span>Delivery Fee</span>
                      <span>₹{orderDetails.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div style={styles.itemRow}>
                      <span>Tax</span>
                      <span>₹{orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <div style={{...styles.itemRow, fontWeight: 'bold', marginTop: '0.5rem'}}>
                      <span>Total</span>
                      <span>₹{orderDetails.total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
              
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  opacity: orderDetails.items.length === 0 ? 0.5 : 1
                }}
                disabled={orderDetails.items.length === 0}
              >
                {orderDetails.items.length === 0 ? 'Cart is Empty' : 'Place Order'}
              </button>
            </form>
          )}
        </div>
        
        {/* Right column - Map and delivery tracking */}
        <div style={styles.trackingContainer}>
          <h2 style={styles.sectionTitle}>Delivery Tracking</h2>
          
          {/* Simulated map area */}
          <div style={styles.mapContainer}>
            {/* Roads */}
            <div style={{...styles.road, ...styles.roadHorizontal, top: '25%'}} />
            <div style={{...styles.road, ...styles.roadHorizontal, top: '75%'}} />
            <div style={{...styles.road, ...styles.roadVertical, left: '25%'}} />
            <div style={{...styles.road, ...styles.roadVertical, left: '75%'}} />
            
            {/* Restaurant location */}
            <div style={{...styles.locationMarker, ...styles.restaurant, top: '70%', left: '30%'}}>
              <span style={{fontSize: '0.75rem', fontWeight: 'bold'}}>R</span>
            </div>
            
            {/* Destination/home location */}
            <div style={{...styles.locationMarker, ...styles.destination, top: '20%', left: '60%'}}>
              <Home size={16} />
            </div>
            
            {/* Delivery person location */}
            {deliveryStatus === 'on-the-way' && (
              <div style={{
                ...styles.locationMarker,
                ...styles.delivery,
                top: `${currentLocation.y}%`,
                left: `${currentLocation.x}%`
              }}>
                <Truck size={16} />
              </div>
            )}
            
            {/* City blocks */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.cityBlock,
                  top: `${20 + Math.floor(i / 4) * 20}%`,
                  left: `${10 + (i % 4) * 25}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            
            {/* Map labels */}
            <div style={styles.mapLabels}>
              <div style={styles.labelDisplay}>
                <div style={{...styles.labelDot, backgroundColor: '#FFD700'}} />
                <span>Restaurant</span>
              </div>
              <div style={{...styles.labelDisplay, marginTop: '0.25rem'}}>
                <div style={{...styles.labelDot, backgroundColor: '#4FD1C5'}} />
                <span>Your Location</span>
              </div>
            </div>
          </div>
          
          {/* Delivery status */}
          <div style={styles.progressContainer}>
            <div style={styles.progressHeader}>
              <div style={styles.labelDisplay}>
                <Clock size={20} style={{...styles.icon, color: '#FFD700'}} />
                <span>Estimated delivery in {estimatedTime} min</span>
              </div>
              <div style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#FFD700'}}>
                {progress}%
              </div>
            </div>
            
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${progress}%`}} />
            </div>
            
            {/* Status steps */}
            <div style={styles.steps}>
              <div style={styles.stepsLine} />
              <div style={styles.stepsList}>
                {['Order Received', 'Preparing', 'On the Way', 'Delivered'].map((status, index) => (
                  <div key={status} style={styles.step}>
                    <div style={{
                      ...styles.stepCircle,
                      backgroundColor: progress >= index * 33 ? '#FFD700' : '#0F6B73',
                      color: progress >= index * 33 ? '#0A3E42' : '#ffffff'
                    }}>
                      {progress >= index * 33 ? <CheckCircle size={20} /> : index + 1}
                    </div>
                    <span style={styles.stepLabel}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Delivery status message */}
          <div style={styles.statusMessage}>
            <div style={styles.statusHeader}>
              {deliveryStatus === 'on-the-way' ? (
                <Truck size={24} style={{...styles.statusIcon, color: '#FFD700'}} />
              ) : deliveryStatus === 'delivered' ? (
                <CheckCircle size={24} style={{...styles.statusIcon, color: '#4FD1C5'}} />
              ) : (
                <Clock size={24} style={{...styles.statusIcon, color: '#FFD700'}} />
              )}
              <div style={styles.statusContent}>
                <h3 style={styles.statusTitle}>{statusText[deliveryStatus]}</h3>
                <p style={styles.statusText}>
                  {deliveryStatus === 'preparing' && "Our chefs are preparing your meal with the freshest ingredients."}
                  {deliveryStatus === 'cooking' && "Your food is being cooked to perfection. It won't be long now!"}
                  {deliveryStatus === 'on-the-way' && "Your food has left our restaurant and is on its way to your location."}
                  {deliveryStatus === 'delivered' && "Enjoy your meal! Thank you for ordering with us."}
                </p>
                {deliveryStatus === 'on-the-way' && (
                  <div style={styles.driverInfo}>
                    <div style={styles.labelDisplay}>
                      <MapPin size={14} style={{...styles.icon, marginRight: '0.25rem'}} />
                      <span>Delivery Partner: FoodiGoodi Express</span>
                    </div>
                    <div style={styles.driverActions}>
                      <button style={styles.actionButton}>Track Order</button>
                      <button style={styles.actionButton}>Support</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOnline; 
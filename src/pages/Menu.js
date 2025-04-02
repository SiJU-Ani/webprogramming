import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import '../components/Menu.css';
import ImageWithFallback from '../components/ImageWithFallback';

// Flatten all menu items into one array
const allMenuItems = [
  ...Object.entries({
    appetizers: [
    
      { name: 'Mini Tacos', price: 600, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=60' },
      { name: 'Hummus Platter', price: 750, image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=60' },
      { name: 'Caprese Skewers', price: 700, image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&w=800&q=60' },
      { name: 'Spinach Dip', price: 700, image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=800&q=60' },
      { name: 'Onion Rings', price: 600, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=60' },
      { name: 'Stuffed Jalapeños', price: 800, image: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5?auto=format&fit=crop&w=800&q=60' },
      { name: 'Crab Cakes', price: 1100, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=60' }
    ],
    mainCourse: [
      { name: 'Grilled Salmon', price: 1600, image: 'https://images.unsplash.com/photo-1567189022371-cc754891cdc9?auto=format&fit=crop&w=800&q=60' },
      { name: 'Spaghetti Carbonara', price: 1300, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=60' },
      { name: 'Chicken Parmesan', price: 1400, image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=60' },
      { name: 'Vegetarian Lasagna', price: 1200, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=60' },
      { name: 'Lamb Chops', price: 2000, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=60' },
      { name: 'Butter Chicken', price: 1500, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=60' }
    ],
    desserts: [
      { name: 'Cheesecake', price: 700, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=60' },
      { name: 'Chocolate Lava Cake', price: 800, image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=800&q=60' },
      { name: 'Ice Cream Sundae', price: 600, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=60' },
      { name: 'Tiramisu', price: 750, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=60' },
      { name: 'Creme Brulee', price: 800, image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=800&q=60' }
    ],
    beverages: [
      { name: 'Coffee', price: 300, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=60' },
      { name: 'Fresh Juice', price: 400, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=60' },
      { name: 'Soda', price: 200, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=60' },
      { name: 'Milkshake', price: 200, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=60' },
      { name: 'Tea', price: 50, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=60' },
      { name: 'Hot Chocolate', price: 300, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=60' },
      { name: 'Protein Shake', price: 400, image: 'https://images.unsplash.com/photo-1626078293023-97c7980e31ca?auto=format&fit=crop&w=800&q=60' },
      { name: 'Coconut Water', price: 300, image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=60' }
    ]
  }).map(([category, items]) => 
    items.map(item => ({
      ...item, 
      category
    }))
  ).flat()
];

const Menu = () => {
  const [cartNotification, setCartNotification] = useState(false);
  
  const addToCart = (item) => {
    // Get existing cart from localStorage
    let cart = [];
    const savedCart = localStorage.getItem('foodigoodiCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
    
    // Check if item is already in cart
    const existingItem = cart.find(cartItem => 
      cartItem.name === item.name && cartItem.price === item.price
    );
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: Date.now(), // Use timestamp as id
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }
    
    // Save to localStorage
    localStorage.setItem('foodigoodiCart', JSON.stringify(cart));
    
    // Show notification
    setCartNotification(true);
    setTimeout(() => setCartNotification(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <h1>Our Menu</h1>
      <p className="menu-description">Explore our diverse menu offerings, from appetizers to desserts.</p>
      
      <motion.div 
        className="menu-grid"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {allMenuItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="menu-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="category-badge">{item.category}</div>
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              className="food-image"
            />
            <div className="food-details">
              <div className="food-name">{item.name}</div>
              <div className="food-price">₹{item.price}</div>
            </div>
            <div className="item-actions">
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
              >
                <FaPlus /> Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {cartNotification && (
        <motion.div 
          className="cart-notification"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <FaShoppingCart /> Item added to cart!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Menu; 

import React from 'react';
import './Menu.css';

const Menu = () => {
  return (
    <main className="menu-container">
      <section id="appetizers">
        <h2>Appetizers</h2>
        <ul>
          <li>
            <div className="food-details">Spring Rolls - ₹300</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Garlic Bread - ₹400</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Mini Tacos - ₹600</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Hummus Platter - ₹750</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Caprese Skewers - ₹700</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Spinach Dip - ₹700</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Onion Rings - ₹600</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Stuffed Jalapeños - ₹800</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Crab Cakes - ₹1100</div>
            <div className="quantity"></div>
          </li>
        </ul>
      </section>
      <section id="main-course">
        <h2>Main Course</h2>
        <ul>
          <li>
            <div className="food-details">Grilled Salmon - ₹1600</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Spaghetti Carbonara - ₹1300</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Chicken Parmesan - ₹1400</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Vegetarian Lasagna - ₹1200</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Lamb Chops - ₹2000</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Butter Chicken - ₹1500</div>
            <div className="quantity"></div>
          </li>
        </ul>
      </section>
      <section id="desserts">
        <h2>Desserts</h2>
        <ul>
          <li>
            <div className="food-details">Cheesecake - ₹700</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Chocolate Lava Cake - ₹800</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Ice Cream Sundae - ₹600</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Tiramisu - ₹750</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Creme Brulee - ₹800</div>
            <div className="quantity"></div>
          </li>
        </ul>
      </section>
      <section id="beverages">
        <h2>Beverages</h2>
        <ul>
          <li>
            <div className="food-details">Coffee - ₹300</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Fresh Juice - ₹400</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Soda - ₹200</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Milkshake - ₹200</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Tea - ₹50</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Hot Chocolate - ₹300</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Protein Shake - ₹400</div>
            <div className="quantity"></div>
          </li>
          <li>
            <div className="food-details">Coconut Water - ₹300</div>
            <div className="quantity"></div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Menu; 
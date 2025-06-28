import React from 'react';

const categories = [
  { name: 'Fashion', img: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1573&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Latest trends and styles.' },
  { name: 'Electronics', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Cutting-edge gadgets and electronics.' },
  { name: 'Home', img: 'https://plus.unsplash.com/premium_photo-1661964014750-963a28aeddea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Essentials for a cozy home.' },
  { name: 'Sports', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Gear up for your next adventure.' },
  { name: 'Beauty', img: 'https://images.unsplash.com/photo-1598528738936-c50861cc75a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Explore our beauty products.' },
  { name: 'Books', img: 'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Explore our book collection.' },
  { name: 'Clothing', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Explore our clothing collection.' },
  { name: 'Other', img: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1573&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', desc: 'Explore our Items.' },
];

const Categories = () => (
  <div className="container py-5">
    <h1 className="display-5 fw-bold mb-4 text-center">Shop by Category</h1>
    <div className="row g-4">
      {categories.map((cat, idx) => (
        <div className="col-12 col-sm-6 col-lg-3" key={idx}>
          <div className="card h-100 shadow-sm border-0 text-center category-card">
            <div className="overflow-hidden rounded-top category-img-wrap">
              <img src={cat.img} className="card-img-top category-img" alt={cat.name} />
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-between">
              <h5 className="card-title fw-bold mb-2">{cat.name}</h5>
              <p className="text-muted small mb-3">{cat.desc}</p>
              <a href={`/${cat.name}`} className="btn btn-gradient btn-sm">Shop {cat.name}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Categories; 
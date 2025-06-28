const products = [
  // Home/Shop products
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    title: 'Smart Watch',
    price: 199,
    desc: 'Stay connected in style with our latest smart watch.'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
    title: 'Wireless Headphones',
    price: 149,
    desc: 'Experience true freedom with noise-cancelling headphones.'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    title: 'Sneakers',
    price: 89,
    desc: 'Step up your game with our new sneaker collection.'
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c5c?auto=format&fit=crop&w=600&q=80',
    title: 'Home Decor Lamp',
    price: 59,
    desc: 'Light up your space with modern, elegant lamps.'
  },
  {
    id: 5,
    img: 'https://source.unsplash.com/600x400/?product,5',
    title: 'Fitness Tracker',
    price: 79,
    desc: 'Track your health and fitness goals.'
  },
  {
    id: 6,
    img: 'https://source.unsplash.com/600x400/?product,6',
    title: 'Bluetooth Speaker',
    price: 49,
    desc: 'Enjoy music anywhere with this portable speaker.'
  },
  {
    id: 7,
    img: 'https://source.unsplash.com/600x400/?product,7',
    title: 'Sunglasses',
    price: 39,
    desc: 'Stylish sunglasses for every occasion.'
  },
  {
    id: 8,
    img: 'https://source.unsplash.com/600x400/?product,8',
    title: 'Backpack',
    price: 59,
    desc: 'Carry your essentials in style.'
  },
  // Fashion products (unique IDs to avoid collision)
  {
    id: 101,
    img: 'https://images.unsplash.com/photo-1599434085846-04bf5fc9ef6f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Yellow Robe (chinese style)',
    price: 199,
    desc: 'This is a chinese style robe, it is very comfortable to wear.'
  },
  {
    id: 102,
    img: 'https://images.unsplash.com/photo-1639748727422-08ded2876045?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'White chinese historical costume',
    price: 149,
    desc: 'This is a chinese historical costume, it is very comfortable to wear.'
  },
  {
    id: 103,
    img: 'https://images.unsplash.com/photo-1741675122705-6bf839fded09?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Modren stylish shirt',
    price: 89,
    desc: 'This is a modern stylish shirt, it is very comfortable to wear.'
  },
  {
    id: 104,
    img: 'https://images.unsplash.com/photo-1664215122947-95ac9eaed0b8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Shirt for summer',
    price: 59,
    desc: 'This is a modern stylish shirt, it is very comfortable to wear.'
  },
  {
    id: 105,
    img: 'https://images.unsplash.com/photo-1645798847755-6c6cb4bef316?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'black shirt and white pants',
    price: 59,
    desc: 'A casual outfit for summer'
  },
  {
    id: 106,
    img: 'https://images.unsplash.com/photo-1655203092913-377fd909240f?q=80&w=1581&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Stylish outfit for events',
    price: 59,
    desc: 'This is a stylish outfit for events, it is very comfortable to wear.'
  },
  {
    id: 107,
    img: 'https://images.unsplash.com/photo-1675388135186-4ab6fb74abbd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Stylish outfit',
    price: 59,
    desc: 'This is a stylish outfit , it is very comfortable to wear.'
  },
  {
    id: 108,
    img: 'https://images.unsplash.com/photo-1655203092971-573e2c0cab90?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Modern stylish outfit',
    price: 59,
    desc: 'This is a modern stylish outfit, it is very comfortable to wear.'
  },
];

export default products; 
import React from 'react';

const dummyItems = {
  chairs: [
    '/assets/chairs/chair1.png',
    '/assets/chairs/chair2.png',
    '/assets/chairs/chair3.png',
  ],
  glasses: [
    '/assets/glasses/glass1.png',
    '/assets/glasses/glass2.png',
  ],
  // أكمل الباقي حسب الصور الموجودة لديك
};

const ItemSidebar = ({ category }) => {
  const items = dummyItems[category] || [];

  return (
    <div style={{ padding: 10 }}>
      {items.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('item-src', src);
          }}
          style={{ width: '100%', marginBottom: 10, cursor: 'grab' }}
        />
      ))}
    </div>
  );
};

export default ItemSidebar;

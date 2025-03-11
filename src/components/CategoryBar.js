import React from 'react';

const categories = ['chairs', 'glasses', 'dishes', 'spoon', 'tableclothes'];

const CategoryBar = ({ onSelect, selected }) => {
  return (
    <div style={{ display: 'flex', gap: 10, padding: 10, position: 'absolute', top: 0, left: 100, zIndex: 1 }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            backgroundColor: selected === cat ? 'red' : '#444',
            color: 'white',
            padding: '8px 12px',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;

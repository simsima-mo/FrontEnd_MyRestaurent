import React, { useState } from 'react';
import Table3D from './components/Table3D';
import CategoryBar from './components/CategoryBar';
import ItemSidebar from './components/ItemSidebar';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('chairs');

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#000' }}>
      <div style={{ width: '80px', backgroundColor: '#111' }}>
        <ItemSidebar category={selectedCategory} />
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <CategoryBar onSelect={setSelectedCategory} selected={selectedCategory} />
        <Table3D />
      </div>
    </div>
  );
};

export default App;

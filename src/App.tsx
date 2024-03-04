import { useState, useEffect } from 'react';
import { Blocks } from './pages/blocks/blocks';
import { IProduct } from './types/types';
import { callAPI } from './api/api';
import './App.css'
import { Buttons } from './pages/buttons/buttons';
import { Filters } from './pages/filters/filters';

export const App = () => {
  const [loading, setLoading] = useState(true); // Loading - ждет загрузку данных


  const [products, setProducts] = useState<IProduct[]>([]); // Тут хранятся данные о карточках(продуктах)
  const [offset, setOffset] = useState(0); 
  const limit = 50;

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const fetchProducts = async () => {
    setLoading(false)
    const idsResult = await callAPI('get_ids', { offset, limit });  

    if (idsResult && idsResult.result) {
      const ids = idsResult.result;
      const itemsResult = await callAPI('get_items', { ids });

      if (itemsResult && itemsResult.result) {
        setProducts(itemsResult.result);
      }
    }
    setLoading(true)
  };

  return (

    <div className='container'>
      <h1 style={{ margin: '30px 0', textAlign: 'center' }}>Список товаров</h1>
      <Filters setProducts={setProducts} setLoading={setLoading}/>
      <Blocks loading = {loading} products = { products }/>
      <Buttons offset={offset} setOffset={setOffset} limit={limit}/>
    </div>
  );
};



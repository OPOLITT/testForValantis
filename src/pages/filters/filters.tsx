import { useState } from 'react';
import '../../App.css'
//@ts-ignore
import cls from './filters.module.css';
import { callAPI } from '../../api/api';
import { IProduct } from '../../types/types';


type IFilters = {
    setProducts: (value: IProduct[]) => void;
    setLoading: (value: boolean) => void;

}

export const Filters = ({ setProducts, setLoading}: IFilters) => {
    const [filterData, setFilterData] = useState({ product: '', price: '', brand: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const value = e.target.value;

        setFilterData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const clearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setFilterData({ product: '', price: '', brand: '' });
    }

    const filterApi = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(false);

        const idsResult = await callAPI('filter', filterData);

        if (idsResult && idsResult.result) {
            const ids = idsResult.result;
            const itemsResult = await callAPI('get_items', { ids });

            if (itemsResult && itemsResult.result) {
                setProducts(itemsResult.result);
            }
        }

        setLoading(true);
    }

    return (
        <>
            <span className={cls.title}>Фильтрация</span>
            <form className={cls.block}>
                <input className={cls.input} value={filterData.product} onChange={(e) => handleChange(e, 'product')} type="text" placeholder='Название' />
                <input className={cls.input} value={filterData.price} onChange={(e) => handleChange(e, 'price')} type="number" placeholder='Цена' />
                <input className={cls.input} value={filterData.brand} onChange={(e) => handleChange(e, 'brand')} type="text" placeholder='Бренд' />
                <button onClick={filterApi} className='btn' style={{ margin: '0' }}>Фильтровать</button>
                <button onClick={clearFilters} type="button" className='btn' style={{ margin: '0', marginLeft: '10px' }}>Очистить фильтры</button>
            </form>
        </>
    );
}

import { IProduct } from '../../types/types';


interface IBlocks {
    loading: boolean;
    products: IProduct[]; 
}

export const Blocks = ({ loading, products }: IBlocks) => {

    if (products.length === 0){
        return (
            <span>Блоков нет</span>
        )
    }
    
    return (
        <>
            {loading ? (
                <div>
                    {products.filter((product, index, self) =>
                        index === self.findIndex((z) => z.id === product.id)
                    ).map((product) => ( 
                        <div className='block' key={product.id}>
                            <span className='text'>Название: {product.product}</span>
                            <span className='text'>ID: {product.id}</span>
                            <span className='text'>Цена: {product.price}</span>
                            <span className='text'>Бренд: {product.brand || 'Нет бренда'}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <span style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px' }}>
                    Загрузка...
                </span>
            )}
        </>
    );
}

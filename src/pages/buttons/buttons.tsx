type IButtons = {
    offset: number,
    setOffset: (value: number) => void,
    limit: number
}

export const Buttons = ({offset, setOffset, limit}: IButtons) => {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                {offset > 0 && (
                    <button className='btn' onClick={() => setOffset(Math.max(0, offset - limit))}>Предыдущая страница</button>
                )}
                <button className='btn' onClick={() => setOffset(offset + limit)}>Следующая страница</button>
            </div>
        </>
    )
}

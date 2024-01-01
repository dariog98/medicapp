const Container = ({ children }) => {
    return (
        <div className='w-100 overflow-auto' style={{ maxHeight: '100vh' }}>
            <div className='my-4'>
                <div className='container'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container
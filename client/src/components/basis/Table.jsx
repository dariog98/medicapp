import { useSettingsContext } from '../providers/SettingsProvider'
import { ORDER } from '../../constants/order'
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

const TableHeadColumn = ({ data, isOrdered, order, handleSorted }) => {
    const { isThemeDark } = useSettingsContext()
    const isActive = order[data.key] !== undefined

    return (
        <th>
            <div className='d-flex align-items-center gap-3'>
                {data.name}
                {
                    isOrdered &&
                    <div 
                        className={`btn ${isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'} ${isActive ? 'active' : ''} border-0 d-flex justify-content-center align-items-center`}
                        style={{ padding: 0, margin: 0, borderRadius: '50%', width: '1.5rem', height: '1.5rem' }}
                        onClick={() => {handleSorted(data.dbKey || data.key)}}
                    >
                        {
                            isActive && order[data.key] === ORDER.Descending
                            ? <FontAwesomeIcon icon={faChevronUp}/>
                            : <FontAwesomeIcon icon={faChevronDown}/>
                        }
                    </div>
                }
            </div>
        </th>
    )
}

const Table = ({ isLoading, items, columns, order, handleOrder, tableHeight, isPressable, handleOnPress, caption }) => {
    const { language } = useSettingsContext()

    const controlOrder = (row) => {
        if (order[row] === undefined) {
            return handleOrder(row, ORDER.Ascending)
        } else {
            if (order[row] === ORDER.Ascending) {
                return handleOrder(row, ORDER.Descending)
            } else {
                return handleOrder('id', ORDER.Ascending)
            }
        }
    }

    return (
        <div>
            <table className='table table-striped table-overflow table-hover mb-0'>
                <caption>{caption}</caption>
                <thead style={{ borderColor: '#00000000' }}>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <TableHeadColumn
                                    key={index}
                                    data={column}
                                    isOrdered={column.ordered}
                                    order={order}
                                    handleSorted={controlOrder}
                                />
                            )
                        }
                    </tr>
                </thead>
                {
                    <tbody className='border rounded-2 bg-body' style={{ maxHeight: tableHeight }}>
                        {
                            isLoading ?
                                <tr className='h-100'>
                                    <td className='h-100 border-bottom-0'>
                                        <div className='h-100 d-flex justify-content-center align-items-center p-4'>
                                            <Loading size='small'/>
                                        </div>    
                                    </td>
                                </tr>
                            : items?.length
                            ? items.map((item, itemIndex) => 
                                <tr
                                    key={itemIndex}
                                    className={isPressable ? 'cursor-pointer' : ''}
                                    onClick={isPressable ? () => handleOnPress(item) : undefined}
                                >
                                    {
                                        columns.map((column, columnIndex) => 
                                            <td
                                                key={columnIndex}
                                                className={`text-truncate ${itemIndex === items.length - 1 ? 'border-bottom-0' : ''}`}
                                            >
                                                {column.value ? column.value(item[column.key], item) : item[column.key]}
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                            : <tr className='h-100'>
                                <td className='h-100 border-bottom-0'>
                                    <div className='h-100 d-flex justify-content-center align-items-center'>
                                        {language.messages.NoResults}
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                }
            </table>
        </div>
    )
}

export default Table
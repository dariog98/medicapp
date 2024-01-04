import { getEventHeight, getEventPositionY } from '../../constants/schedule'

const EventContainer = ({ rowHeight, dateStart, dateEnd, data, children }) => {
    return (
        <div
        className='d-flex'
        style={{
            position: 'absolute',
            width: '85%',
            height: `${rowHeight * 2 * getEventHeight(dateStart, dateEnd, new Date(data.startTime), new Date(data.endTime))}%`,
            top: `${rowHeight * 2 * getEventPositionY(dateStart, new Date(data.startTime))}%`,
            left: `${15}%`,
            zIndex: 2,
            pointerEvents: 'initial'
        }}
    >
        {children}
    </div>
    )
}

export default EventContainer
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useThumbnail } from '../../hooks'
import { useSettingsContext } from '../providers/SettingsProvider'

const imageStyle = { objectFit: 'cover', width: '100%', height: '200px' }
const imagePlaceholder = { width: '100%', height: '250px', borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' }

const Image = ({ photo, columns, handleOnPress }) => {
    const { isLoading, data } = useThumbnail({ photo })

    return (
        <div className='card cursor-pointer' onClick={handleOnPress}>
            {
                data
                ? <img className='card-img-top' src={data} alt={photo.name} style={imageStyle}/>
                : <div
                    className='d-flex justify-content-center align-items-center bg-secondary'
                    style={imagePlaceholder}
                >
                    <FontAwesomeIcon icon={faImage} size='8x'/>
                </div>
            }
            <div className='card-body'>
                <div>
                    {
                        columns.map(column => 
                            <div key={column.key} className='text-truncate'>{photo[column.key]}</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const ImagesViewer = ({ items, columns, height, handleOnPress }) => {
    const { language } = useSettingsContext()
    return (
            items.length ?
            <div 
                className='border rounded-2 p-2 w-100 d-grid gap-3 overflow-auto'
                style={{ maxHeight: height, backgroundColor: '#0000000d', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr' }}
            >
                {
                    items.map((photo) => 
                        <Image
                            key={photo.id}
                            photo={photo}
                            columns={columns}
                            handleOnPress={() => handleOnPress(photo)}
                        />
                    )
                }
            </div>
            :
            <div className='w-100 border rounded d-flex justify-content-center align-items-center p-2'>
                {language.messages.NoResults}
            </div>
    )
}

export default ImagesViewer
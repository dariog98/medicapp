import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../providers/SettingsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './Button'

const Pagination = ({ page, totalPages, handlePage }) => {
    const { isThemeDark } = useSettingsContext()
    const buttons = Array.from({ length: totalPages }, (_, i) => i + 1)

    const goToFirstPage = () => {
        handlePage(1)
    }

    const goToLastPage = () => {
        handlePage(totalPages)
    }

    return (
        <div>
            <div className='input-group'>
                <Button
                    className='btn-outline-system'
                    isDisabled={!totalPages}
                    handleOnClick={goToFirstPage}
                    icon={faChevronLeft}
                />

                {
                    buttons.map(index => {
                        const isActived = page === index
                        return (
                            <Button
                                key={index}
                                className={isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'}
                                isActived={isActived}
                                handleOnClick={() => handlePage(index)}
                                text={index}
                            />
                        )
                    })
                }

                <Button
                    className='btn-outline-system'
                    isDisabled={!totalPages}
                    handleOnClick={goToLastPage}
                    icon={faChevronRight}
                />
            </div>
        </div>
    )
}

export default Pagination
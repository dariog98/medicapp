import { useEffect, useRef } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = ({ placeholder, handleSearch, value }) => {
    const searchRef = useRef()

    const handleEnter = ({key}) => {
        if (key === 'Enter') {
            handleSearch(searchRef.current.value)
        }
    }

    useEffect(() => {
        searchRef.current.value = value ?? ''
    }, [])

    return (
        <>
            <div className='input-group'>
                <label className='input-group-text'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='1x'/>
                </label>

                <input
                    ref={searchRef}
                    type='text'
                    className='form-control'
                    placeholder={placeholder}
                    onKeyDown={handleEnter}
                />
            </div>
        </>
    )
}

export default SearchBar

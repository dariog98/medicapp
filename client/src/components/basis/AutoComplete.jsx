import { useRef, useState } from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../providers/SettingsProvider'
import Button from './Button'
import Loading from './Loading'

const AutoComplete = ({ label, before, after, form, name, items, value, isRequired, isDisabled, handleSearch, defaultValue, isLoading }) => {
    const { language } = useSettingsContext()
    const [currentValue, setCurrentValue] = useState(defaultValue)
    const searchInput = useRef()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSearch(searchInput.current.value)
            return
        }
    }

    const handleOnClickItem = (item) => {
        setCurrentValue(item)
        if (form) form.setValue(name, item)
    }

    const handleRemove = () => {
        handleSearch('')
        setCurrentValue(undefined)
        if (form) form.setValue(name, undefined)
    }

    return (
        <div>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group flex-nowrap'>
                { before && <div className='input-group-text'>{before}</div> }
                {
                    currentValue ?
                    <>
                        <input className='form-control' value={value(currentValue)} disabled readOnly/>
                        {
                            !isDisabled &&
                            <Button
                                className='btn-outline-system px-3'
                                icon={faX}
                                handleOnClick={handleRemove}
                            />
                        }
                    </>
                    :
                    <>
                        <div tabIndex='0' className='position-relative rounded w-100 autocomplete'>
                            <input
                                ref={searchInput}
                                className='form-control autocomplete-input'
                                onKeyDown={handleKeyDown}
                                style={{
                                    borderTopLeftRadius: before ? 0 : 'inherit', borderBottomLeftRadius: before ? 0 : 'inherit',
                                    borderTopRightRadius: after ? 0 : 'inherit', borderBottomRightRadius: after ? 0 : 'inherit'
                                }}
                                disabled={isDisabled}
                                required={isRequired}
                            />
                            <div
                                className='border rounded-2 position-absolute overflow-auto list'
                                style={{ top: '100%', left: 0, right: 0, zIndex: 1055, maxHeight: '410px' }}
                            >
                                {
                                    isLoading ?
                                    <div className='py-4 bg-body-tertiary'>
                                        <Loading size='small'/>
                                    </div>
                                    : items.length
                                    ? <>
                                        {
                                            items.map((item, index) => {
                                                    return (
                                                    <div
                                                        key={item.id}
                                                        className={`p-2 bg-body-tertiary list-item ${index === items.length - 1 ? '' : 'border-bottom'}`}
                                                        onClick={() => handleOnClickItem(item)}
                                                    >
                                                        <div>{value(item)}</div>
                                                    </div>
                                                    )
                                                }
                                            )
                                        }
                                    </>
                                    : <>
                                        <div className='d-flex justify-content-center align-items-center p-2 bg-body-tertiary'>
                                            {language.messages.NoResults}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                }
                { after && <div className='input-group-text'>{after}</div> }
            </div>
            <div>
            {
                form && form.formState.errors[name] &&
                <div className='invalid-feedback' style={{ display: 'inherit' }}>{form.formState.errors[name].message}</div>
            }
            </div>
        </div>
    )
}

export default AutoComplete
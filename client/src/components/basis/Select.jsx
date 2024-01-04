const Select = ({ label, before, after, form, name, options, isDisabled, isReadOnly, defaultValue, handleOnChange }) => {
    return (
        <div>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group'>
                {before && <div className='input-group-text'>{before}</div>}
                <select
                    className='form-select'
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    { ...form?.register(name) }
                    defaultValue={defaultValue}
                    onChange={handleOnChange}
                >
                    {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                </select>
                {after && <div className='input-group-text'>{after}</div>}
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

export default Select
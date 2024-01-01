const Textarea = ({ label, before, after, form, name, height, placeholder, isDisabled, isReadOnly, value }) => {
    return (
        <div>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group'>
                {before && <div className='input-group-text'>{before}</div>}
                <textarea
                    className={`form-control ${form?.formState.errors[name] ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    value={value}
                    style={{ resize : 'none', height }}
                    { ...form?.register(name) }
                />
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

export default Textarea
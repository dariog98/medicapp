import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

const Password = ({ label, before, form, name, see, handleSee, isDisabled, isReadOnly }) => {
    return (
        <div>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group'>
                {before && <div className='input-group-text'>{before}</div>}
                <input
                    className={`form-control ${form?.formState.errors[name] ? 'is-invalid' : ''}`}
                    type={see ? 'text' : 'password'}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    { ...form?.register(name) }
                />
                <Button
                    className='btn-outline-system'
                    style={{ width: '3rem' }}
                    icon={see ? faEyeSlash : faEye}
                    handleOnClick={handleSee}
                    tabIndex='-1'
                />
            </div>
            <div>
            {
                form && form.formState.errors[name]
                ? <div className='invalid-feedback' style={{ display: 'inherit' }}>{form.formState.errors[name]?.message}</div>
                : <div className='invalid-feedback' style={{ display: 'inherit', visibility: 'hidden' }}>Example text</div>
            }
            </div>
        </div>
    )
}

export default Password
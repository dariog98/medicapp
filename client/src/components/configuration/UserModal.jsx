import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { Button, Input, Modal, Select } from '../basis'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useCharges } from '../../hooks'

const UserModal = ({ showModal, handleClose, form, isLoading }) => {
    const { language } = useSettingsContext()
    const { isLoading: isLoadingCharges, data: dataCharges } = useCharges()
    
    return (
        <Modal title={language.Profile} show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>
                <Input
                    form={form}
                    label={language.rows.Surnames}
                    type='text'
                    name='surnames'
                />
                
                <Input
                    form={form}
                    label={language.rows.Names}
                    type='text'
                    name='names'
                />

                <Input
                    form={form}
                    label={language.rows.Username}
                    type='text'
                    name='username'
                />

                {
                    !isLoadingCharges &&
                    <Select
                        form={form}
                        label={language.rows.Charge}
                        name='idCharge'
                        options={dataCharges?.data.map(charge => ({ value: charge.id, label: charge.description })) || []}
                    />
                }

                <Input
                    form={form}
                    label={language.rows.Mail}
                    type='text'
                    name='mail'
                />

                <Input
                    form={form}
                    label={language.rows.Phone}
                    type='text'
                    name='phone'
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={language.buttons.Confirm}
                        handleOnClick={form.handleSubmit}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    />

                    <Button
                        className='btn-danger'
                        icon={faX}
                        text={language.buttons.Cancel}
                        handleOnClick={handleClose}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UserModal
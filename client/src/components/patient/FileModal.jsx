import { Button, Input, Modal, Textarea } from '../basis'
import { MODALMODES } from '../../constants/modal'
import { faCheck, faDownload, faPen, faTrashCan, faX } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../providers/SettingsProvider'
import { useEffect, useState } from 'react'
import { usePhoto } from '../../hooks'

const Image = ({ photo }) => {
    const { isLoading, data } = usePhoto({ photo })

    return (
        <div className='card overflow-hidden'>
            {
                data &&
                <img className='w-100' src={data} alt={photo.name}/>
            }
        </div>
    )
}

const FileModal = ({ showModal, modalMode, handleClose, handleDownload, handleEdit, handleDelete, form, isLoading }) => {
    const { language } = useSettingsContext()
    const [image, setImage] = useState()
    const { name, filename, description } = form.getValues()

    const handleOnFileChange = ({ target }) => {
        const file = target.files[0]
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp']

        if (validImageTypes.includes(file.type)) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                const source = fileReader.result
                setImage(source)
            }
            fileReader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        setImage(undefined)
    }, [showModal, modalMode])

    if (modalMode === MODALMODES.Preview) {
        return (
            <Modal title={language.Files} show={showModal} handleClose={handleClose} modalSize='modal-lg'>
                <div className='d-flex gap-3'>

                    <div className='flex-grow-1 d-flex flex-column gap-3'>
                        <Image photo={{ name, filename }}/>

                        <div>
                            <strong>{language.rows.Filename}</strong>
                            <div className='text-break'>{name}</div>
                        </div>
                        <div>
                            <strong>{language.rows.Description}</strong>
                            <div className='text-break'>{description}</div>
                        </div>

                        <div className='d-flex justify-content-end gap-2'>
                            <Button
                                className='btn-primary'
                                icon={faDownload}
                                text={language.buttons.Download}
                                handleOnClick={handleDownload}
                            />

                            <Button
                                className='btn-success'
                                icon={faPen}
                                text={language.buttons.Edit}
                                handleOnClick={handleEdit}
                            />
                            <Button
                                className='btn-danger'
                                icon={faTrashCan}
                                text={language.buttons.Delete}
                                handleOnClick={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal  title={language.Files} show={showModal} handleClose={handleClose}>
            <div className='d-flex flex-column gap-3'>

                {
                    image &&
                    <div className='card overflow-hidden'>
                        <img src={image} alt='image'/>
                    </div>
                }

                {
                    modalMode === MODALMODES.Add &&
                    <Input
                        form={form}
                        type='file'
                        name='file'
                        handleOnChange={handleOnFileChange}
                    />
                }

                {
                    modalMode !== MODALMODES.Add &&
                    <Input
                        form={form}
                        type='text'
                        name='name'
                        label={language.rows.Filename}
                        isDisabled={modalMode === MODALMODES.Delete}
                    />
                }
                
                <Textarea
                    form={form}
                    name='description'
                    label={language.rows.Description}
                    placeholder={language.messages.WriteHere}
                    isDisabled={modalMode === MODALMODES.Delete}
                    height='128px'
                />

                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className='btn-success'
                        icon={faCheck}
                        text={modalMode === MODALMODES.Delete ? language.buttons.Confirm : language.buttons.Save}
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

export default FileModal
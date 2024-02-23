import { Button, Input, Password } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useLogin, useSwitch } from '../hooks'
import logo from '../assets/main.svg'

const Login = () => {
    const { language } = useSettingsContext()
    const { isLoading, form } = useLogin()
    const { mode, toggleSwitch } = useSwitch()

    return (
        <div className='bg-body-tertiary d-flex justify-content-center align-items-center w-100 vh-100'>
            <div className='card border-0 shadow-lg overflow-hidden'>
                <div className='card-body p-0'>
                    <div className='d-flex flex-wrap'>
                        <div className='d-flex justify-content-center align-items-center p-5'>
                            <div className='d-flex flex-column gap-3' style={{ width: '300px' }}>
                                <div>
                                    <h2>{language.messages.LogIn}</h2>
                                </div>
                                <Input
                                    form={form}
                                    label={language.rows.Username}
                                    name='user'
                                    type='text'
                                />

                                <Password
                                    form={form}
                                    label={language.rows.Password}
                                    name='password'
                                    see={mode}
                                    handleSee={toggleSwitch}
                                />

                                <Button
                                    className='btn-primary'
                                    text={language.messages.LogIn}
                                    isLoading={isLoading}
                                    isDisabled={isLoading}
                                    handleOnClick={form.handleSubmit}
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center' style={{ background: '#3f7496', width: '600px', height: '600px' }}>
                            <img src={logo} style={{ maxWidth: '500px' }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
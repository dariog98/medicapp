import logo from '../assets/main.svg'
import { Button, Input, Password } from '../components/basis'
import { useSettingsContext } from '../components/providers/SettingsProvider'
import { useLogin, useSwitch } from '../hooks'

const Login = () => {
    const { language } = useSettingsContext()
    const { isLoading, form } = useLogin()
    const { mode, toggleSwitch } = useSwitch()

    return (
        <div className='text-light' data-bs-theme='light' style={{ backgroundColor: '#3f7496' }}>
            <div className='d-flex'>
                <div className='bg-dark mx-5'>
                    <div className='d-flex justify-content-center align-items-center vh-100' style={{ width: '360px' }}>
                        <div className='d-flex flex-column gap-3'>
                            <h2>{language.messages.LogIn}</h2>
                            <Input form={form} label={language.rows.Username} name='user' type='text'/>
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
                                handleOnClick={form.handleSubmit}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center w-100 vh-100'>
                    <img src={logo} style={{ width: '750px' }}/>
                </div>
            </div>
        </div>
    )
}

export default Login
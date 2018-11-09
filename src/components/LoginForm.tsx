import * as React from 'react'
import { Link } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";

import Button from './Button';
import Center from './Center';
import Input from './input';


class LoginForm extends React.Component<InjectedFormProps> {
    public render() {
        const { handleSubmit } = this.props
      return (
        <form onSubmit={ handleSubmit }>
            <Input placeholder='Correo' label='Correo' />
            <Input placeholder='Contraseña' label= 'Contraseña' />
            <Button block={ true } >Enviar</Button>
            <Center>
                <Link to='/register'>Registrar</Link>
            </Center>
        </form>
      )
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm)
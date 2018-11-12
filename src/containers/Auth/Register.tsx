import * as React from 'react'
import { Link } from "react-router-dom";

import Button from '../../components/Button';
import Card from '../../components/Card';
import Center from '../../components/Center';
import Container from '../../components/Container';
// import Input from '../../components/Input';
import Title from '../../components/Title';

export default class Register extends React.Component {
    public render() {
        return (
            <Container center={ true }>
                <Card>
                    <Title>Registro</Title>
                    {/* <Input placeholder='Correo' label='Correo' />
                    <Input placeholder='Contraseña' label= 'Contraseña' /> */}
                    <Button block={ true } >Enviar</Button>
                    <Center>
                        <Link to='/'>Iniciar Sesión</Link>
                    </Center>
                </Card>
            </Container>
        )
    }
}

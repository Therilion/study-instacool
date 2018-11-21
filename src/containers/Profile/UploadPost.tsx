import * as React from 'react'
import Card from '../../components/Card';
import Container from '../../components/Container';
import Title from '../../components/Title';
import UploadPostForm from '../../components/UploadPostForm';

export default class UploadPost extends React.Component {
    public render() {
        return (
            <Container>
                <Card>
                    <Title>Subir una Imagen</Title>
                    <UploadPostForm />
                </Card>
            </Container>
        )
    }
}
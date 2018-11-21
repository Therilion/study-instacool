import * as React from 'react'
import { Field, InjectedFormProps, reduxForm, } from 'redux-form';
import Button from './Button';
import Input from './Input';
// import Input from './Input';

class UploadPostForm extends React.Component<InjectedFormProps> {
    
    public render() {
        return (
            <form>
                <Field label="Imagen" type='file' name='file' component={ Input } />
                <Field label="Comentario" name='comment' type="text" component={ Input } />
                <Button>Enviar</Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'upload-new-post'
})(UploadPostForm)
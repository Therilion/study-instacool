import * as React from 'react'
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldProps, } from 'redux-form';
import Button from './Button';
import Input, { style as inputStyle} from './Input';
// import Input from './Input';

const handleChange = (input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { onChange } = input
    const { files } = e.target
    if(files){
        await onChange(files[0])
    }
}

interface IUploadInputField {
    label: string
}

interface IUploadPostFormProps {
    disabled: boolean
}

const RenderFileField: React.StatelessComponent<WrappedFieldProps & IUploadInputField> = ({input, label}) => 
    <div>
        <span style={ inputStyle.span }>{ label }</span>
        <input onChange={handleChange(input)} type='file' style={ inputStyle.input } />
    </div>

class UploadPostForm extends React.Component<InjectedFormProps<{}, IUploadPostFormProps> & IUploadPostFormProps> {
    
    public render() {
        const { handleSubmit, disabled } = this.props
        return (
            <form onSubmit={ handleSubmit }>
                <Field name='file' label='Imagen' component={ RenderFileField } />
                <Field label="Comentario" name='comment' type="text" component={ Input } />
                <Button disabled={disabled}>Enviar</Button>
            </form>
        )
    }
}

export default reduxForm<{}, IUploadPostFormProps>({
    form: 'upload-new-post'
})(UploadPostForm)
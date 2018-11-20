import * as React from 'react'
import { Field, InjectedFormProps, reduxForm, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';

const style = {
  file: {
    display: 'none'
  }, 
  img: {
    borderRadius: '100%',
    height: '100px',
    width: '100px'
  } as React.CSSProperties
}

const handleChange = (submitProfileImage: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault()
  const { onChange } = input
  const { files } = e.target
  if(files){
    await onChange(files[0])
    submitProfileImage()
  }
}
interface IProfileImg {
  submitProfileImage: () => void
  profileImage: string
}

const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({ input, submitProfileImage, profileImage }) => 
  <div>
    <input onChange={ handleChange(submitProfileImage, input) } type='file' style={ style.file } id='profileImage' />
    <label htmlFor="profileImage">
      <img style={ style.img } src={ profileImage } />
    </label>
  </div>



class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
    public render() {
      const { handleSubmit, profileImage, submitProfileImage } = this.props
      return (
        <form onSubmit={handleSubmit}>
        <Field 
          name='file'
          component={RenderField}
          submitProfileImage={submitProfileImage}
          profileImage={profileImage} 
        />
          
        </form>
      )
    }
}

export default reduxForm<{}, IProfileImg>({
  form: 'profileImg'
})(ProfileImg)
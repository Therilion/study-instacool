import { History } from "history"
import * as React from 'react'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Title from '../../components/Title';
import UploadPostForm from '../../components/UploadPostForm';
import { IState } from '../../ducks';
import { IUploadPost, uploadPost } from '../../ducks/Posts';

interface IUploadPostProps {
    history: History
    upload: (a: IUploadPost) => void
    uploading: boolean
    uploaded: boolean
}

class UploadPost extends React.Component<IUploadPostProps> {

    

    public componentDidUpdate() {
        const { history, uploaded } = this.props
        if(uploaded){
            this.setState({
                uploaded: false,
            })
            history.push('/app/newsfeed')
        }
    }

    public render() {
        const { upload, uploading } = this.props
        return (
            <Container>
                <Card>
                    <Title>Subir una Imagen</Title>
                    <UploadPostForm onSubmit={ upload } disabled={uploading}/>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { uploading, uploaded }} = state
    return {
        uploaded,
        uploading,
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    upload: (payload: any) => dispatch(uploadPost(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadPost)
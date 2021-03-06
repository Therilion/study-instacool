import * as React from 'react'
import Footer from './Footer';



const style = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #ddd',
    marginBottom: '10px',
    padding: '10px 15px',

}

interface IPostProps {
    image: string
    comment: string
    like:  () => void
    share: () => void
}

export default class Post extends React.Component<IPostProps> {
    public render() {
        const { comment, image, like, share } = this.props
        return (
            <div style={ style }>
                <img style={{width: '300px'}} src={image}/>
                <p>{ comment }</p>
                <Footer like={like} share={share} />
            </div>
        )
    }
}
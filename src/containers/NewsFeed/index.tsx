import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Container from '../../components/Container';
import Post from '../../components/Post';
import * as postsDuck from '../../ducks/Posts';

interface INewsFeedProps {
    fetchPosts: () => void
    like: (a: string) => void
    share: (a: string) => void
    data: postsDuck.IDataPosts
    loading: boolean 
    fetched: boolean
}

class NewsFeed extends React.Component<INewsFeedProps> {
    constructor(props: INewsFeedProps) {
        super(props)
        const { fetched, fetchPosts } = props
        // Si ya se trajeron los post, no se vuelven a traer
        if(fetched){
            return
        }
        fetchPosts()
    }

    public render () {
        const { data } = this.props
        return (
            <Container>
                { Object.keys(data).map(x => {
                    const post = data[x]
                    return <div key={x} style={{ margin: '0 auto'}}>
                        <Post 
                            image={post.imageUrl} 
                            like={this.handleLike(x)} 
                            share={this.handleShare(x)}
                        />
                    </div>
                }) }
                
            </Container>
        )
    }

    private handleLike = (id: string) => () => {
        const { like } = this.props
        like(id)
    }
    
    private handleShare = (id: string) => () => {
        const { share } = this.props
        share(id)
    }
}




const mapStateToProps = (state: any) => {
    const { Posts : { data, fetched, fetching} } = state
    const loading = fetching || !fetched
    return {
        data,
        fetched,
        loading,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)
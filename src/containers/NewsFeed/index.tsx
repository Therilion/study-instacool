import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Container from '../../components/Container';
import Post from '../../components/Post';
import { IState } from '../../ducks';
import * as postsDuck from '../../ducks/Posts';

interface IPosts extends postsDuck.IPosts {
    postId: string
}

interface INewsFeedProps {
    fetchPosts: () => void
    like: (a: string) => void
    share: (a: string) => void
    data: IPosts[]
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
                { data.map(post => {

                    return <div key={post.postId} style={{ margin: '0 auto'}}>
                        <Post 
                            image={post.imageUrl}
                            comment={post.comment}
                            like={this.handleLike(post.postId)} 
                            share={this.handleShare(post.postId)}
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




const mapStateToProps = (state: IState) => {
    const { Posts : { data, fetched, fetching} } = state
    const loading = fetching || !fetched
    const reduced: any = {}
    reduced.data = []
    if(!loading && data) {
        reduced.data = Object.keys(data).reduce((acc, el) => {
            const { comment, createdAt, imageUrl, userId } = data[el]
            return acc.concat([{comment, createdAt, imageUrl, userId, postId: el}])
        }, [] as IPosts[] )
    }

    const ordered = reduced.data.sort((a: IPosts, b: IPosts) => {
        if(a.createdAt.toDate() < b.createdAt.toDate()){
          return 1
        }
        if(a.createdAt.toDate() > b.createdAt.toDate()){
          return -1
        }
        return 0
      })
    
    return {
        data: ordered,
        fetched,
        loading,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)
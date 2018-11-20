import { chunk } from "lodash";
import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Button from '../../components/Button';
import Card from '../../components/Card';
import ProfileImg from '../../components/ProfileImg';
import { IState } from '../../ducks';
import * as postsDuck from '../../ducks/Posts';
import * as usersDuck from '../../ducks/Posts';

import { submit } from "redux-form"
import services from "../../services";

const { auth } = services
const style = {
  container: {
    padding: '15px',
  },
  img: {
    width: '150px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  } as React.CSSProperties
}

interface IProfileProps {
  fetchPosts: () => void
  submitProfileImage: () => void
  handleProfileImageSubmit: (a: {file: File}) => void
  data: postsDuck.IPosts[][]
  fetched: boolean
  loading: boolean 
  profileImage: string
}

class Profile extends React.Component<IProfileProps> {

    constructor(props: IProfileProps) {
      super(props)
      const { fetched, fetchPosts } = props
      // Si ya se trajeron los post, no se vuelven a traer
      if(fetched){
          return
      }
      fetchPosts()
    }

    public render() {
      const { data, profileImage, submitProfileImage, handleProfileImageSubmit } = this.props
      return (
        <div style={style.container}>
          <div style={ style.row }>
            <ProfileImg 
              profileImage={profileImage} 
              onSubmit={handleProfileImageSubmit} 
              submitProfileImage={submitProfileImage} 
            />
            <Button> Agregar </Button>
          </div>
          { data.map((x, i) => 
            <div key={ i } style={ style.row }>
              { x.map(y => <Card key={ y.imageUrl } > <img style={ style.img } src={y.imageUrl}/> </Card>) }
            </div>
        ) }
        </div>
      )
    }
}

const mapStateToProps = (state: IState) => {
  
    const { Posts : { data, fetched, fetching} } = state
    const { Users : { profileImage: temPI } } = state
    const loading = fetching || !fetched
    const profileImage = temPI || "https://placekitten.com/100/100"

    // acc: Acumulador (segundo parámetro de reduce), el: elemento
    const filtered = Object.keys(data).reduce((acc, el) => {
        if(data[el].userId !== (auth.currentUser && auth.currentUser.uid)){
            return acc
        }
        return acc.concat(data[el])
    }, [] as postsDuck.IPosts[])

    const ordered = filtered.sort((a, b) => {
      if(a.createdAt.toDate() < b.createdAt.toDate()){
        return 1
      }
      if(a.createdAt.toDate() > b.createdAt.toDate()){
        return -1
      }
      return 0
    })
    
    return {
        data: chunk(ordered, 3),
        fetched,
        loading,
        profileImage,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators({ 
  ...postsDuck,
  ...usersDuck,
  submitProfileImage: () => submit('profileImg'),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

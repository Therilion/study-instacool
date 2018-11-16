import { chunk } from "lodash";
import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Button from '../../components/Button';
import Card from '../../components/Card';
import ProfileImg from '../../components/ProfileImg';
import * as postsDuck from '../../ducks/Posts';
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
  data: postsDuck.IPosts[][]
  fetched: boolean
  loading: boolean 
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
      const { data } = this.props
      return (
        <div style={style.container}>
          <div style={ style.row }>
            <ProfileImg />
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

const mapStateToProps = (state: any) => {
    const { Posts : { data, fetched, fetching} } = state
    const loading = fetching || !fetched
    // acc: Acumulador (segundo parámetro de reduce), el: elemento
    const filtered = Object.keys(data).reduce((acc, el) => {
        if(data[el].userId !== (auth.currentUser && auth.currentUser.uid)){
            return acc
        }
        return acc.concat(data[el])
    }, [] as postsDuck.IPosts[])
    
    return {
        data: chunk(filtered, 3),
        fetched,
        loading,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

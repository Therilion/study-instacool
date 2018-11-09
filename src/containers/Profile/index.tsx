import * as React from 'react'
import Button from '../../components/Button';
import Card from '../../components/Card';
import ProfileImg from '../../components/ProfileImg';

const style = {
  container: {
    padding: '15px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  } as React.CSSProperties
}

export default class Profile extends React.Component {
    public render() {
      return (
        <div style={style.container}>
          <div style={ style.row }>
            <ProfileImg />
            <Button> Agregar </Button>
          </div>
          <div style={ style.row }>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
          </div>
          <div style={ style.row }>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
            <Card> <img src="https://placekitten.com/200/200"/> </Card>
          </div>
        </div>
      )
    }
}

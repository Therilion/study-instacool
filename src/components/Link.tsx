import * as React from "react"

const style = {
    color   : 'blue',
    cursor: 'pointer',
    fontSize: '14px',
    padding : '15px',
}

export default class Card extends React.Component {

    public render () {
        return (
            <a { ...this.props } style={style} />
        )
    }
}
import * as React from "react"

const style = {
    textAlign: 'center',
    width: '100%',
} as React.CSSProperties

export default class Card extends React.Component {

    public render () {
        
        return (
            <div { ...this.props } style={style} />
        )
    }
}
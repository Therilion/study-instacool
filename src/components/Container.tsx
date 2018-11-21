import * as React from 'react'

const style = (center: boolean) :React.CSSProperties => ({
    alignItems: center ? 'center':undefined,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: center ? 'center':undefined,
    minHeight: 'calc(100vh - 60px)',
    padding: '10px 15px',
    width: 'calc(100vw - 30px)',
})

interface IContainerProps {
    center?: boolean
}

export default class Container extends React.Component<IContainerProps> {

    public render () {
        const { children, center = false } = this.props
        return (
            <div style={ style(center) }>
                { children }
            </div>
        )
    }
}

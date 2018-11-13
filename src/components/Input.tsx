import * as React from 'react'
import { WrappedFieldProps } from "redux-form";

const style = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    padding: '10px 15px',
    width: 'calc(100% - 30px)'
}

const spanStyle = {
    color: '#777',
    fontSize: '10px',
    fontWeight: 900,
    textTransform: 'uppercase',
} as React.CSSProperties

interface IInputProps {
    placeholder?: string
    label: string

}

// Componente puro. Componente sin estado. Más facil de escribir y testear,
// Pero no accede al ciclo de vida de los componentes de React
const Input: React.StatelessComponent<WrappedFieldProps & IInputProps> = props => {
    const { label } = props
    return (
        <div>
            <span style={ spanStyle }>{ label }</span>
            <input { ...props } style={ style } />
        </div>
    )
    
}

export default Input
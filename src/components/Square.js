import React from 'react'


const Square = (props) => {
    return (
        <td style={{backgroundColor: 'red', width: '100px', height: '100px'}} onClick={(e) => alert(props.r)}>
            {props.r}
        </td>
    )
    
}

export default Square
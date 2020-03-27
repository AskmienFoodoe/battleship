import React from 'react'


const Square = (props) => {

    let color;

    if (props.ship) {
        color = 'gray'
    } else{
        color = 'white'
    }

    return (
        <td 
            style={{backgroundColor: color, border: '1px solid black', width: '50px', height: '50px'}} 
            onClick={e => props.handleClick(props.r, props.c)}
        >
            ({props.ship ? props.ship.name[0] : 'e'},{props.hit})
        </td>
    )
    
}

export default Square
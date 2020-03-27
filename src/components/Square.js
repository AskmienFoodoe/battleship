import React from 'react'


const Square = (props) => {

    let color;

    if (props.hit && props.ship) {
        color = 'orange'
    } else if (props.ship && !props.invisible) {
        color = 'gray'
    } else if (props.hit && !props.ship) {
        color = 'cyan'
    } else{
        color = 'white'
    }

    return (
        <td 
            style={{backgroundColor: color, border: '1px solid black', width: '50px', height: '50px'}} 
            onClick={e => props.handleClick(props)}
        >
            ({props.ship ? props.ship.name[0] : 'e'},{props.hit})
        </td>
    )
    
}

export default Square
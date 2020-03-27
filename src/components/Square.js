import React from 'react'


const Square = (props) => {

    let color;
    let label = '';

    if (props.ship) {
        if (!props.invisible || props.ship.health === 0) {
            label = props.ship.name[0].toUpperCase()
        }
    }
    if (props.hit && props.ship) {
        color = 'orange'
    } else if (props.ship && !props.invisible) {
        color = 'silver'
    } else if (props.hit && !props.ship) {
        color = 'cyan'
    } else{
        color = 'white'
    }

    return (
        <td 
            style={{backgroundColor: color, border: '1px solid black', width: '50px', height: '50px', textAlign: 'center', fontSize: '36px'}} 
            onClick={e => props.handleClick(props)}
        >
            {label}
        </td>
    )
    
}

export default Square
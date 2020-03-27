import React from 'react'
import Square from './Square'


class Grid extends React.Component {

    makeRow = (row) => {
        return (
            <tr>
                {row.map(r => <Square r={r}/>)}
            </tr>
        )
    }

    render = () => {
        return (
            <table>
                {this.props.grid.map(this.makeRow)}
            </table>
            
        )
        
    }
    
}

export default Grid
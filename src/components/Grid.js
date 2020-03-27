import React from 'react'
import {Ship} from './App'
import Square from './Square'
import * as lodash from 'lodash'


class Grid extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (r,c) => {
        if (this.props.gameState === 'setup') {
            this.props.addShip(new Ship(3), r, c)
        }
    }

    makeRow = (row, rowIndex) => {
        return (
            <tr>
                {row.map((info, colIndex) => <Square ship={info[0]} hit={info[1]} r={rowIndex} c={colIndex} handleClick={this.handleClick}/>)}
            </tr>
        )
    }

    componentDidUpdate = () => {

    }

    render = () => {
        let gridInfo = lodash.zipWith(this.props.shipGrid, this.props.hitGrid, lodash.zip)
        return (
            <table>
                {gridInfo.map(this.makeRow)}
            </table>
            
        )
        
    }
    
}

export default Grid
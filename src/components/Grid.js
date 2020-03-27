import React from 'react'
import Square from './Square'
import * as lodash from 'lodash'


class Grid extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (values) => {
        if (this.props.handleClick) {
            this.props.handleClick(values)
        }
    }

    makeRow = (row, rowIndex) => {
        return (
            <tr>
                {row.map((info, colIndex) => <Square 
                                                ship={info[0]}
                                                hit={info[1]} 
                                                r={rowIndex}
                                                c={colIndex} 
                                                invisible={this.props.invisible} 
                                                handleClick={this.handleClick}
                                                />
                )}
            </tr>
        )
    }

    render = () => {
        
        //Zips the shipGrid and hitGrid together to make it easier to map over
        let gridInfo = lodash.zipWith(this.props.shipGrid, this.props.hitGrid, lodash.zip)
        return (
            <table>
                {gridInfo.map(this.makeRow)}
            </table>
            
        )
        
    }
    
}

export default Grid
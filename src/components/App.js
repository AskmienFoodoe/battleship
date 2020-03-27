import React, {Fragment} from 'react'
import Grid from './Grid';


export class Ship {
    constructor(size) {
        this.size = size
        this.health = size
        switch(size) {
            case 1:
                this.name = 'submarine'
                break
            case 2:
                this.name = 'destroyer'
                break
            case 3:
                this.name = 'cruiser'
                break
            case 4:
                this.name = 'battleship'
                break
            case 5:
                this.name = 'aircraft carrier'
                break
            default:
                this.name = 'ship'
                break
        }
    }
}

class Player {
    constructor() {
        this.ships = [new Ship(1), new Ship(1), new Ship(2),new Ship(2), new Ship(3), new Ship(4), new Ship(5)]
        this.shipGrid = Array(10).fill().map(()=>Array(10).fill(null))
        this.hitGrid = Array(10).fill().map(()=>Array(10).fill(-1))
    }
}

class App extends React.Component {
    
    state = {
        gameState: 'setup',
        turn: 1,
        orientation: 'h',
        players: {1: new Player, 2: new Player}
    }

    addShip = (ship, r, c) => {

        let players = this.state.players
        let turn = this.state.turn

        if (this.state.orientation === 'v') {
            for (let i = r; i < r + ship.size; i++) {
                if (i > 9) {
                    alert('Invalid placement, out of bounds')
                    return
                } else if (players[turn].shipGrid[i][c]) {
                    alert('Invalid placement, overlaps with existing ship')
                    return
                }
            }

            for (let i = r; i < r + ship.size; i++) {
                players[turn].shipGrid[i][c] = ship
            }
        } else if (this.state.orientation === 'h') {
            for (let i = c; i < c + ship.size; i++) {
                if (i > 9) {
                    alert('Invalid placement, out of bounds')
                    return
                } else if (players[turn].shipGrid[r][i]) {
                    alert('Invalid placement, overlaps with existing ship')
                    return
                }
            }

            for (let i = c; i < c + ship.size; i++) {
                players[turn].shipGrid[r][i] = ship
            }
        }

        this.setState({players: players})
    }

    changeOrientation = () => {
        if (this.state.orientation === 'h') {
            this.setState({orientation: 'v'})
        }
        if (this.state.orientation === 'v') {
            this.setState({orientation: 'h'})
        }
    }

    componentDidUpdate = () => {
        console.log(this.state)
    }

    render = () => {

        if (this.state.gameState === 'setup') {
            return (
                <Fragment>
                    <Grid 
                        shipGrid={this.state.players[this.state.turn].shipGrid}
                        hitGrid={this.state.players[this.state.turn].hitGrid} 
                        gameState={this.state.gameState}
                        addShip={this.addShip}
                    />
                    <button onClick={e => this.changeOrientation()}>
                        Change Orientation (currently {this.state.orientation})
                    </button>
                </Fragment>
            )
        } else if (this.state.gameState === 'battle') {
            
        }

        return (
            <div>something is wrong</div>
        )
    }
}

export default App;
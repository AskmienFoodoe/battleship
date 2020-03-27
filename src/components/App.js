import React, {Fragment} from 'react'
import Grid from './Grid';

/**
 * A ship has a size, a name, and a health value (to keep track of when it is destroyed)
 *  - size: the length of the ship. the ship always has dimensions size x 1 or 1 x size
 *  - name: depends on the size
 *  - health: when this value depletes, the ship is removed from the player's list of surviving ships
 *              and added to the opponents list of destroyed ships
 */
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

/**
 * Keeps tracks of the player's ships and grid
 *  - ships: contains the player's surviving ships
 *  - shipsDestroyed: contains the ships the player has destroyed
 *  - shipGrid: keeps track of the positions of the player's ships
 *  - hitGrid: keeps track of which squares have been hit by the opponent
 */
class Player {
    constructor() {
        this.ships = []
        this.shipsDestroyed = []
        this.shipGrid = Array(10).fill().map(()=>Array(10).fill(null))
        this.hitGrid = Array(10).fill().map(()=>Array(10).fill(0))
    }
}

class App extends React.Component {
    
    /**
     * Three gameStates: setup, battle, victory. During setup, ships are placed. During battle, players 
     *  fire at each other. During victory, the victory message is shown.
     */
    state = {
        gameState: 'setup',
        turn: 1,
        orientation: 'horizontal',
        players: {1: new Player, 2: new Player},
        shipsToAdd: [new Ship(5),new Ship(4),new Ship(3),new Ship(2),new Ship(2),new Ship(1),new Ship(1),
            new Ship(5),new Ship(4),new Ship(3),new Ship(2),new Ship(2),new Ship(1),new Ship(1)]

    }

    //Attempts to add a ship to the grid at position (r,c), alerts if out of bounds or overlaps.
    //Only accessible during setup.
    addShip = ({r, c}) => {

        let players = this.state.players
        let turn = this.state.turn
        let shipsToAdd = this.state.shipsToAdd
        let ship = shipsToAdd[0]

        if (this.state.orientation === 'vertical') {
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
        } else if (this.state.orientation === 'horizontal') {
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
        players[turn].ships.push(shipsToAdd.shift())
        this.setState({players: players, shipsToAdd: shipsToAdd})
    }

    //Changes orientation from vertical to horizontal. Only accessible during setup.
    changeOrientation = () => {
        if (this.state.orientation === 'horizontal') {
            this.setState({orientation: 'vertical'})
        }
        if (this.state.orientation === 'vertical') {
            this.setState({orientation: 'horizontal'})
        }
    }

    //Attempts to hit position (r,c), then switches turns after a delay.
    //Only accessible during battle.
    tryHit = ({r, c, ship}) => {
        let players = this.state.players
        let turn = this.state.turn

        if (players[turn % 2 + 1].hitGrid[r][c] === 1) {
            return
        }

        players[turn % 2 + 1].hitGrid[r][c] = 1

        if (ship) {
            ship.health -= 1
            if (ship.health === 0) {
                players[turn].shipsDestroyed.push(ship)
                players[turn % 2 + 1].ships = players[turn % 2 + 1].ships.filter(ship => ship.health > 0)
            }
        }

        this.setState({players: players})
        this.timer = setTimeout(() => {this.setState({turn: turn % 2 + 1})}, 1000)
    }

    //Switches to P2's setup when P1 is done, and switches between setup and battle, battle and victory.
    componentDidUpdate = () => {
        console.log(this.state)
        if (this.state.gameState === 'setup') {
            if (this.state.turn === 1 && this.state.players[1].ships.length === 7) {
                this.setState({turn: 2})
            }
            if (this.state.turn === 2 && this.state.players[2].ships.length === 7) {
                this.setState({turn: 1, gameState: 'battle'})
            }
        } else if (this.state.gameState === 'battle') {
            if (this.state.players[1].ships.length === 0) {
                clearTimeout(this.timer)
                this.setState({turn: 2,gameState: 'victory'})
            }
            if (this.state.players[2].ships.length === 0) {
                clearTimeout(this.timer)
                this.setState({turn: 1, gameState: 'victory'})
            }
        }
    }

    render = () => {

        //Shows only current player's grid for placing ships.
        if (this.state.gameState === 'setup') {
            return (
                <Fragment>
                    <h2>Player {this.state.turn}'s turn to add ships</h2>
                    <Grid 
                        shipGrid={this.state.players[this.state.turn].shipGrid}
                        hitGrid={this.state.players[this.state.turn].hitGrid} 
                        gameState={this.state.gameState}
                        handleClick={this.addShip}
                    />
                    <h4>Currently adding {this.state.shipsToAdd[0] ? this.state.shipsToAdd[0].name : 'null'} (size {this.state.shipsToAdd[0] ? this.state.shipsToAdd[0].size : 0})</h4>
                    <button onClick={e => this.changeOrientation()}>
                        Change Orientation (currently {this.state.orientation})
                    </button>
                </Fragment>
            )
        } 

        //Shows both players' grids, ships are hidden on opponents grid and it is clickable.
        //Current player's grid is uninteractable.
        else if (this.state.gameState === 'battle') {
            return (
                <Fragment>
                    <h2>Player {this.state.turn}'s turn to attack</h2>
                    <table>
                        <tr>
                            <td>
                                <h4>Opponent's Grid</h4>
                                <Grid 
                                    shipGrid={this.state.players[this.state.turn % 2 + 1].shipGrid}
                                    hitGrid={this.state.players[this.state.turn % 2 + 1].hitGrid} 
                                    gameState={this.state.gameState}
                                    handleClick={this.tryHit}
                                    invisible
                                />
                            </td>
                            <td>
                                <h4>Your Grid</h4>
                                <Grid 
                                    shipGrid={this.state.players[this.state.turn].shipGrid}
                                    hitGrid={this.state.players[this.state.turn].hitGrid} 
                                    gameState={this.state.gameState}
                                />                         
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign: 'top'}}>
                                <table>
                                    <th style={{textAlign: 'left'}}>Ships Destroyed:</th>
                                    {this.state.players[this.state.turn].shipsDestroyed.map(ship => <tr>{ship.name} (size {ship.size})</tr>)}
                                </table>
                            </td>
                            <td style={{verticalAlign: 'top'}}>
                                <table>
                                    <th style={{textAlign: 'left'}}>Ships Remaining:</th>
                                    {this.state.players[this.state.turn].ships.map(ship => <tr>{ship.name} (size {ship.size})</tr>)}
                                </table>
                            </td>

                        </tr>
                    </table>
                    
                    
                </Fragment>
            )
        } 
        
        //Same grids as battle, but now uninteractable. Also shows victory message.
        else if (this.state.gameState === 'victory') {
            return (
                <Fragment>
                    <h1>Player {this.state.turn} wins!</h1>
                    <table>
                        <tr>
                            <td>
                                <h4>Opponent's Grid</h4>
                                <Grid 
                                    shipGrid={this.state.players[this.state.turn % 2 + 1].shipGrid}
                                    hitGrid={this.state.players[this.state.turn % 2 + 1].hitGrid} 
                                    gameState={this.state.gameState}
                                    invisible
                                />
                            </td>
                            <td>
                                <h4>Your Grid</h4>
                                <Grid 
                                    shipGrid={this.state.players[this.state.turn].shipGrid}
                                    hitGrid={this.state.players[this.state.turn].hitGrid} 
                                    gameState={this.state.gameState}
                                />                         
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign: 'top'}}>
                                <table>
                                    <th style={{textAlign: 'left'}}>Ships Destroyed:</th>
                                    {this.state.players[this.state.turn].shipsDestroyed.map(ship => <tr>{ship.name} (size {ship.size})</tr>)}
                                </table>
                            </td>
                            <td style={{verticalAlign: 'top'}}>
                                <table>
                                    <th style={{textAlign: 'left'}}>Ships Remaining:</th>
                                    {this.state.players[this.state.turn].ships.map(ship => <tr>{ship.name} (size {ship.size})</tr>)}
                                </table>
                            </td>

                        </tr>
                    </table>
                </Fragment>
            )
        }

        return (
            <div>something is wrong</div>
        )
    }
}

export default App;
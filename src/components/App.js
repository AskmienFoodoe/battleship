import React from 'react'
import Grid from './Grid';

const grid = [[1,2],[3,4,4,5,6,7,7,3]]

class App extends React.Component {
    
    render = () => {
        return (
            <Grid grid={grid}/>
        )
    }
}

export default App;
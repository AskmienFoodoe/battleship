# battleship

Basic web app to simulate the game battleship.

### Libraries used
* React
* Lodash

### Instructions
* First, player one sets all seven of their ships in order of length (5, 4, 3, 2, 2, 1, 1) by clicking on the grid. The button at the bottom can be used to switch the orientation (in vertical orientation, the top of the ship will be placed at the clicked square; in horizontal orientation, the left end of the ship will be placed at the clicked square).
* Then, player two does the same.
* Afterwards, players take turns firing at each others grids, until one player's ships have all been destroyed.
    * Gray tiles represent ships. Orange tiles represent hits, blue tiles represent misses.

### Known Issues
* There is a small pause after firing before turns switch, to make it easier to assess whether it was a hit or miss. However, it is possible to take multiple additional shots during this pause.

// FISHER-YATES SHUFFLE ALGORITHM
function shuffle(array) {
  for(let i = array.length - 1; i > 0; i--){
     const j = Math.floor(Math.random() * i)
     const temp = array[i]
     array[i] = array[j]
     array[j] = temp
  }
  return array
}

const Navbar = ({onNewGame}) => {
  return (
    <header>
      <h2>
        <a>Memory Game</a>
      </h2>
      <nav>
        <li>
          <a onClick={onNewGame}>New Game</a>
        </li>
      </nav>
    </header>
  )
}

const Card = ({bgColor, showing, onClick}) => {
const style = {
  width: '10%',
  minWidth: '100px',
  height: '130px',
  margin: '10px',
  display: 'inline-block',
  backgroundColor: 'grey',
  border: '5px solid grey',
  borderRadius: '20px',
  textAlign: 'center',
}

if (showing) {
  style.backgroundColor = bgColor
}

return <div onClick={onClick} style={style}></div>
}

const CardState = {
 HIDING: 0,   // the card is not being shown
 SHOWING: 1,  // the card is being shown, but not match
 MATCHING: 2  // the card is being shown and has a match
}

class App extends React.Component {
constructor(props) {
  super(props)
  
 let cards = [
    {id: 0,  cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 1,  cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 2,  cardState: CardState.HIDING, backgroundColor: 'blue'},
    {id: 3,  cardState: CardState.HIDING, backgroundColor: 'blue'},
    {id: 4,  cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 5,  cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 6,  cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 7,  cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 8,  cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 9,  cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
    {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
  ]; 
  
  // SHUFFLE CARDS
  cards = shuffle(cards)
  this.state = { cards, noClick: false } 
}

handleNewGame = () => {
  // HIDING ALL CARDS
  let cards = this.state.cards.map(c => ({
    ...c,
    cardState: CardState.HIDING
  }))
  // SHUFFLE
  cards = shuffle(cards)
  // SET NEW STATE
  this.setState({cards})
}

handleClick = (id) => {
  
  const mapCardState = (cards, idsToChange, newCardState) => {
    return cards.map(c => {
      if (idsToChange.includes(c.id)) {
        // CHANGE CARD STATE
        return {
          ...c,
          cardState: newCardState
        }
      }
      // RETURN DEFAULT
      return c
    })
  }
  // GET THE CLICKED CARD
  const foundCard = this.state.cards.find(c => c.id === id)
  // DO NOTHING IF THE CARD IS SHOWING
  if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
    return
  }
  
  let noClick = false
  // MAP THE CLICKED CARD TO BE SHOWING
  let cards = mapCardState(this.state.cards, [id], CardState.SHOWING)
  // GET SHOWING CARDS
  const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING)
  
  const ids = showingCards.map((c) => c.id)
  // CHECK IF 2 CARDS ARE SHOWING AND THEIR BACKGROUND MATCH
  if (showingCards.length === 2 &&
     showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
    cards = mapCardState(cards, ids, CardState.MATCHING)
  } else if (showingCards.length === 2) {
    let hidingCards = mapCardState(cards, ids, CardState.HIDING)
    
    noClick = true
    
    // WHILE 2 CARDS ARE SHOWING, NOT ALLOWED TO CLICK, AFTER 1.3 seconds THEY ARE HIDEN
    this.setState({cards, noClick}, () => {
      setTimeout(() => {
        // SET THE STATE OF THE CARDS TO HIDING AFTER 1.3 seconds
        this.setState({cards: hidingCards, noClick: false})
      }, 1300)
    })
    return
  }
  
  this.setState({cards, noClick})
}
 
render() {
  const cards = this.state.cards.map(card => (
    <Card 
      key={card.id} 
      showing={card.cardState !== CardState.HIDING} 
      bgColor={card.backgroundColor} 
      onClick={()=> this.handleClick(card.id)}  
    />)
  )
                                     
  return <div>
            <Navbar onNewGame={this.handleNewGame} />
            {cards}
         </div>
}
}

ReactDOM.render(<App />, document.getElementById('game'))




// const gameContainer = document.getElementById("game");

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

// // here is a helper function to shuffle an array
// // it returns the same array with values shuffled
// // it is based on an algorithm called Fisher Yates if you want ot research more
// function shuffle(array) {
//   let counter = array.length;

//   // While there are elements in the array
//   while (counter > 0) {
//     // Pick a random index
//     let index = Math.floor(Math.random() * counter);

//     // Decrease counter by 1
//     counter--;

//     // And swap the last element with it
//     let temp = array[counter];
//     array[counter] = array[index];
//     array[index] = temp;
//   }

//   return array;
// }

// let shuffledColors = shuffle(COLORS);

// // this function loops over the array of colors
// // it creates a new div and gives it a class with the value of the color
// // it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
// }

// // when the DOM loads
// createDivsForColors(shuffledColors);

import React from 'react'
import ReactDOM from 'react-dom'

class DrawerContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isClassHidden: true,
      style: {
        display: 'none',
        transition: 'height 350ms ease-in-out',
        height: 0
      }
    };
    this.drawerRef = React.createRef();
    this.findHeight = this.findHeight.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  findHeight() {
    return (this.setState(
      {
        style: {
          height: this.drawerRef.current.clientHeight
        }
      }
      )
    )
  }

  toggleDrawer(e) {
   this.state.isClassHidden ? this.pullTheDrawer() : this.closeTheDrawer()
  }

  closeTheDrawer(){
    this.setState({
      isClassHidden: true,
      style: {
        display: 'none',
        height: 0,
        transition: 'height 350ms ease-in-out'
      }
    });
  }

  pullTheDrawer() {
    this.setState({
      isClassHidden: false,
      style: {
        display: 'block',
        height: this.findHeight(),
        transition: 'height 350ms ease-in-out'
      }
    });
  }

  render(){
    return(
    <div>
      <header
      style = {this.state.style}
      ref = {this.drawerRef}
      >
        <TitleTag />
        <SearchBar />
      </header>

      <button onClick= {this.toggleDrawer}>
        "Click Me"
      </button>
    </div>
    );
  }
}

class TitleTag extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      className: 'title',
      style: {
        color: '#fff',
        width: 100 + 'vw',
      }
    };
  }
  render() {
    return (
      <h1
      className = {this.state.className}
      style = {this.state.style}
      >
      Welcome to Telescope: Earth
      </h1>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: "You can search by country, name or coordinates...",
      style: {
        width: 75 + "%",
        padding: "10px 5px",
        zIndex: 2,
        fontSize: 3 + 'em'
      }
    }
  }
  render() {
    return (
      <input
      placeholder = {this.state.placeholder}
      style = {this.state.style}
      />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <DrawerContainer />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App

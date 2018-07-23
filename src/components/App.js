import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'


class DrawerContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isClassHidden: true,
      style: {
        display: 'none',
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
      }
    });
  }

  pullTheDrawer() {
    this.setState({
      isClassHidden: false,
      style: {
        display: 'block',
        height: this.findHeight(),
      }
    });
  }

  render(){
    return(
    <div style= {
      {
        textAlign: 'center'
      }
    }>
      <header
      style = {this.state.style}
      ref = {this.drawerRef}
      >
        <TitleTag />
        <SearchBar />
      </header>

      <button
      onClick= {this.toggleDrawer}
      style = {
        {
          width: 25 + "%",
          backgroundColor: 'rgba(0,0,0,0)',
          color: '#fff',
          borderRadius: '0 0 50% 50%',
          borderTop: 'none',
          borderColor: '#fff',
          padding: '10px 0'
        }
      }
      >
        <FontAwesomeIcon icon={faChevronCircleDown} size='6x'/>
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
      },
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <input
      onChange = {this.handleChange}
      placeholder = {this.state.placeholder}
      style = {this.state.style}
      value = {this.state.value}
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

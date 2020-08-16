import React, { Component } from 'react';
import './App.css';
import TabMenu from './components/tabMenu';
import Login from './components/login';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';

export class App extends Component {
  state = {
    login: true,
    token: "",
    open: false,
    openstatus: false,
    message: ""
  }
  logOut = () => {
    this.setState({ login: false, token: true })
  }
  openloader = () => {
    this.setState({ open: true })
  }
  closeloader = () => {
    this.setState({ open: false })
  }
  handleClose = () => {
    this.setState({ openstatus: false, message: "" })
  }
  openstatusbar = (message) => {
    this.setState({ openstatus: true, message: message })
  }
  login = (id, password) => {
    this.openloader()
    fetch("/login", {
      method: 'post',
      body: JSON.stringify({
        id: id,
        password: password
      }),
    }).then(res => res.json()).then(data => {
      if (data.error) {
        this.openstatusbar(data.error)
      }
      else {
        this.setState({ login: true, token: data.token })
        this.closeloader()
        this.openstatusbar("sucess fully loged in")
      }
    })
  }
  render() {
    return (
      <div className="App">
        <>
          < Dialog open={this.state.open}  >
            <CircularProgress color="inherit" />
          </ Dialog>
          {!this.state.login && <Login login={this.login} ></Login>}

          {this.state.login && <TabMenu token={this.state.token} closeloader={this.closeloader}
            openloader={this.openloader} openstatusbar={this.openstatusbar} logout={this.logOut}></TabMenu>}

          {this.state.login && <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <IconButton variant="contained" style={{ borderRadius: "60%" }} color="secondary" onClick={this.logOut}>
              <ExitToAppIcon /></IconButton></div>}

        </>
        <Snackbar
          open={this.state.openstatus}
          message={this.state.message}
          onClose={this.handleClose}
          autoHideDuration={6000}
        />
      </div>
    )
  }
}

export default App



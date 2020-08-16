import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, AppBar } from '@material-ui/core';
export class Login extends Component {
    state = {
        userId: "",
        password: "",
        passworderror: false,
        useriderror: false,
    }
    userIdChange = (e) => {
        this.setState({ userId: e.target.value })
    }
    passwordChange = (e) => {
        this.setState({ password: e.target.value })
    }
    login = () => {
        if (this.state.password !== "" && this.state.userId !== "") {
            this.setState({ passworderror: false, useriderror: false })
            this.props.login(this.state.userId, this.state.password)
        }
        else {
            if (this.state.password === "") {
                this.setState({ passworderror: true })
            }
            else {
                this.setState({ passworderror: false })
            }
            if (this.state.userId === "") {
                this.setState({ useriderror: true })
            }
            else {
                this.setState({ useriderror: false })
            }
        }
    }
    render() {
        return (
            <><AppBar position="static" style={{
                height: "50px", justifyContent: "center", fontSize: "x-large",
                fontWeight: "400"
            }}>
                Login
            </AppBar>
                <div className="App-header">
                    <TextField label="UserId" variant="outlined" value={this.state.userId} onChange={this.userIdChange} error={this.state.useriderror} helperText="Enter UserId" /><br></br>
                    <TextField type="password" label="password" variant="outlined" value={this.state.password} error={this.state.passworderror} helperText="Enter Password" onChange={this.passwordChange} />
                    <br></br>
                    <Button variant="contained" color="primary" onClick={this.login}>Login</Button>
                </div>
            </>)
    }
}

export default Login

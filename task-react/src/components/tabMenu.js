import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Upload from './upload';
import ViewData from './view-data';
import StorageIcon from '@material-ui/icons/Storage';


export class TabMenu extends Component {
    state = {
        value: 0,
        showSucess: false
    }
    handleChange = (e, newValue) => {
        this.setState({ value: newValue, showSucess: false })
    }
    showSucess = () => {
        this.setState({ showSucess: true })
    }
    render() {
        const { value, showSucess } = this.state
        return (
            <div>
                <AppBar position="static" >
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        variant="fullWidth"
                    >
                        <Tab label="Upload Csv" icon={<CloudUploadIcon />} />
                        <Tab label="View Data" icon={<StorageIcon />} />
                    </Tabs>
                </AppBar>
                <header className="App-header">
                    {!showSucess && <>{value === 0 && <Upload showSucess={this.showSucess}{...this.props}></Upload>}
                        {value === 1 && <ViewData  {...this.props}></ViewData>}</>}
                    {showSucess &&
                        <div style={{ color: "black" }}>
                            <h5>Sucessfully Inserted Data,
                                 Click above to chose option</h5>
                        </div>}
                </header>
            </div>
        )
    }
}

export default TabMenu

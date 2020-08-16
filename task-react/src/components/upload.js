import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CSVReader from 'react-csv-reader'

export class Upload extends Component {
    state = {
        json: []
    }
    handleForce = (data, fileinfo) => {
        let header = data[0]
        let jsonReturn = []
        let jsonSQLFormat = []
        this.props.openloader()
        for (let i = 1; i < data.length; i++) {
            let jsonfile = {}
            if (data[i].length === header.length) {
                let sqlData = []
                for (let j = 0; j < header.length; j++) {
                    jsonfile[header[j]] = data[i][j]
                    sqlData.push(data[i][j])
                }
                jsonReturn.push(jsonfile)
                jsonSQLFormat.push(sqlData)
            }
        }
        let requestdata = {
            token: this.props.token, jsonSQLFormat
        }
        console.log(jsonSQLFormat)
        this.setState({ json: jsonReturn })
        fetch("/getCsv", {
            method: 'post',
            body: JSON.stringify(requestdata),
        }).then(res => res.json()).then(data => {
            if (data.error === "token had expired") {
                this.props.openstatusbar("Session had Expired")
                this.props.closeloader()
                this.props.logout()
            }
            else if (data.error) {
                this.props.openstatusbar("Unable insert data")
                this.props.closeloader()
            }
            else {
                this.props.closeloader()
                this.props.openstatusbar("Inserted sucessfully")
                this.props.showSucess()
            }
        })
    }
    componentDidMount() {
        this.props.openloader()
        fetch("/verifyToken", {
            method: 'post',
            body: JSON.stringify({
                token: this.props.token
            }),
        }).then(res => res.json()).then(data => {
            this.props.closeloader()
            if (data.error === "token had expired") {
                this.props.openstatusbar("Session had Expired")
                this.props.logout()
            }
            else if (data.error) {
                this.props.openstatusbar("Unable insert data")
            }
        })
    }
    render() {
        return (
            <div>
                <CSVReader accept=".csv" onFileLoaded={this.handleForce} inputId="upload-button-file"
                    inputStyle={{ display: 'none' }} />
                <label htmlFor="upload-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                        Upload Csv
                    </Button>
                </label>
            </div>
        )
    }
}

export default Upload

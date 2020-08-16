import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from '@material-ui/core';
export class ViewData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "id", field: "id", minWidth: 150,
            }, {
                headerName: "level", field: "level", minWidth: 150,
            }, {
                headerName: "cvss", field: "cvss", minWidth: 150,
            }, {
                headerName: "title", field: "title", minWidth: 150,
            }, {
                headerName: "Vulnerability", field: "Vulnerability", minWidth: 150,
            }, {
                headerName: "Solution", field: "Solution", minWidth: 150,
            }, {
                headerName: "reference", field: "reference", minWidth: 150,
            }],
            rowData: [],
            defaultColDef: {
                flex: 1,
                sortable: true,
                filter: true,
                floatingFilter: true,
                resizable: true
            },
        }
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    downloadCsv = () => {
        let params = {
            fileName: "data"
        }
        this.gridApi.exportDataAsCsv(params);
    };
    componentDidMount() {
        this.props.openloader()
        fetch("/view", {
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
            else {
                this.setState({ rowData: data })
            }
        })
    }
    render() {
        return (
            <> <div style={{ width: "100%" }}><div style={{ float: "right" }}>
                <IconButton onClick={() => this.downloadCsv()}>
                    <GetAppIcon />
                </IconButton>
            </div></div>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '475px',
                        width: '100%',
                        overflow: "visable"
                    }}  >
                    {this.state.rowData &&
                        <AgGridReact
                            columnDefs={this.state.columnDefs} defaultColDef={this.state.defaultColDef}
                            rowData={this.state.rowData} onGridReady={this.onGridReady}>
                        </AgGridReact>
                    }
                </div></>
        );
    }
}

export default ViewData

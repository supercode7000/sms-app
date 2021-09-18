import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'

import 'react-table/react-table.css'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Center = styled.div`
    text-align:center
`

class UpdateData extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/datas/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteData extends Component {

    deleteUser = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Do tou want to delete the data ${this.props.city} permanently?`,
            )
        ) {
            api.deleteDataById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class DatasList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: [],
            columns: [],
            isLoading: false,
            start: "",
            end: ""
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllDatas().then(datas => {
            this.setState({
                datas: datas.data.data,
                isLoading: false,
            })
        })
    }
    handleChangeInputStart = async event => {
        const start = event.target.value
        //Convert to Format DB
        let dbDate = new Date(start)
        dbDate = new Intl.DateTimeFormat('en-US').format(dbDate)
        this.setState({ start: dbDate })
    }
    handleChangeInputEnd = async event => {
        const end = event.target.value
        //Convert to Format DB
        let dbDate = new Date(end)
        dbDate = new Intl.DateTimeFormat('en-US').format(dbDate)
        this.setState({ end: dbDate })
    }
    handleFilterByRange = (event) => {
        event.preventDefault()
        if (this.state.start.length === 0 && this.state.end.length === 0) {
            window.alert('please give the dates ...')
        } else {
            console.log('test')
            let newData = [...this.state.datas]
            newData = newData.filter(elt => new Date(elt.start_date).getTime() > new Date(this.state.start).getTime() &&
                new Date(elt.start_date).getTime() < new Date(this.state.end).getTime()
            )

            console.log(newData)
            this.setState({ datas: newData });
        }

    }
    render() {
        const { datas, isLoading } = this.state
        const columns = [
            {
                Header: 'City',
                accessor: 'city',
                filterable: true,
            },
            {
                Header: 'Start Date',
                accessor: 'start_date',
                filterable: true,
                sortMethod: (a, b) => {
                    let a1 = new Date(a).getTime();
                    let b1 = new Date(b).getTime();
                    if (a1 < b1)
                        return 1;
                    else if (a1 > b1)
                        return -1;
                    else
                        return 0;
                }
            },
            {
                Header: 'End Date',
                accessor: 'end_date',
                filterable: true,
                sortMethod: (a, b) => {
                    let a1 = new Date(a).getTime();
                    let b1 = new Date(b).getTime();
                    if (a1 < b1)
                        return 1;
                    else if (a1 > b1)
                        return -1;
                    else
                        return 0;
                }
            },
            {
                Header: 'Price',
                accessor: 'price',
                filterable: true,

            },
            {
                Header: 'Status',
                accessor: 'status',
                filterable: true,

            },
            {
                Header: 'color',
                accessor: 'color',
                filterable: true,

            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteData id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateData id={props.original._id} />
                        </span>
                    )
                },
            },
        ]
        let showTable = true
        if (!datas.length) {
            showTable = false
        }
        return (
            <>
                <Center>
                    <form onSubmit={this.handleFilterByRange}>
                        <label htmlFor="start">From: </label>
                        <input type="date" name="start" id="" className="p-1 m-2" onChange={this.handleChangeInputStart} />
                        <label htmlFor="start">Until: </label>
                        <input type="date" name="end" id="" className="p-1 m-2" onChange={this.handleChangeInputEnd} />
                        <input type="submit" value="Filter by Range Start Date" className='btn btn-secondary' />
                    </form>
                </Center>
                <Wrapper>
                    {showTable && (
                        <ReactTable
                            data={datas}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={50}
                            showPageSizeOptions={true}
                            minRows={0}
                        />
                    )}
                </Wrapper>
            </>

        )
    }
}

export default DatasList
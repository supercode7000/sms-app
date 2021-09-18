import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-secondary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class DatasUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            city: '',
            start_date: '',
            end_date: '',
            price: '',
            status: '',
            color: ''
        }
    }

    handleChangeInputCity = async event => {
        const city = event.target.value
        this.setState({ city })
    }
    handleChangeInputStartDate = async event => {
        const start_date = event.target.value
        this.setState({ start_date })
    }
    handleChangeInputEndDate = async event => {
        const end_date = event.target.value
        this.setState({ end_date })
    }
    handleChangeInputPrice = async event => {
        const price = event.target.value
        this.setState({ price })
    }
    handleChangeInputstatus = async event => {
        const status = event.target.value
        this.setState({ status })
    }
    handleChangeInputColor = async event => {
        const color = event.target.value
        this.setState({ color })
    }

    handleUpdateData = async () => {
        const { id, city, start_date, end_date, price, status, color } = this.state

        const payload = { city, start_date, end_date, price, status, color }

        await api.updateDataById(id, payload).then(res => {
            window.alert(`Data updated successfully`)
            this.setState({
                city: '',
                start_date: '',
                end_date: '',
                price: '',
                status: '',
                color: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const data = await api.getDataById(id)

        this.setState({
            city: data.data.data.city,
            start_date: data.data.data.start_date,
            end_date: data.data.data.end_date,
            price: data.data.data.price,
            status: data.data.data.status,
            color: data.data.data.color
        })
    }

    render() {
        const { city, start_date, end_date, price, status, color } = this.state
        return (
            <Wrapper>
                <Title>Create Data</Title>

                <Label>City: </Label>
                <InputText
                    type="text"
                    value={city}
                    onChange={this.handleChangeInputCity}
                />
                <Label>Start Date: </Label>
                <InputText
                    type="text"
                    value={start_date}
                    onChange={this.handleChangeInputStartDate}
                />
                <Label>End Date: </Label>
                <InputText
                    type="text"
                    value={end_date}
                    onChange={this.handleChangeInputEndDate}
                />
                <Label>Price: </Label>
                <InputText
                    type="text"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />
                <Label>Status: </Label>
                <InputText
                    type="text"
                    value={status}
                    onChange={this.handleChangeInputStatus}
                />
                <Label>Color: </Label>
                <InputText
                    type="text"
                    value={color}
                    onChange={this.handleChangeInputColor}
                />
                <Button onClick={this.handleUpdateData}>Update Data</Button>
                <CancelButton href={'/datas/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default DatasUpdate
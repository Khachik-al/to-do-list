import React, { Component } from 'react';
import Description from './Description';
import Name from './Name';
import Price from './Price';

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price : props.price,
            name: props.name,
            descripton: props.descripton
        }
    }
    
    handleClickChangeCurrency = () => {
        this.setState({
            price : this.state.price.includes('$') ?
                this.state.price.slice(0, -1) * 500 + '֏' :
                this.state.price.slice(0, -1) / 500 + '$'
        })
    }

    render() {
        return (
            <span>
            <div>{this.props.icon}</div>
                <Price price={this.state.price} />
                <button onClick={this.handleClickChangeCurrency}>
                    change the currency
                </button>
                <Name name={this.state.name} />
                <Description description={this.state.descripton} />
            </span>

        )
    }
}
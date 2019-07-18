import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(iKey => {
            return (
                <li key={iKey}>
                    <span style={ {textTransform : 'capitalize'} }>{iKey}</span> : {this.props.ingredients[iKey]}
                </li>
            )
        });
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
        </Aux>
        )
    }


}
export default OrderSummary;
import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const PRICE_INGREDIENTS = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;
        const priceAddition = PRICE_INGREDIENTS[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient })
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;

        const priceAddition = PRICE_INGREDIENTS[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient })
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;



// removeIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCount = oldCount - 1;
//     const updatedIngredient = {...this.state.ingredients};
//     updatedIngredient[type] = updatedCount;

//     const priceAddition = PRICE_INGREDIENTS[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice  =  oldPrice - priceAddition;
//     this.setState({totalPrice : newPrice , ingredients : updatedIngredient})
// }
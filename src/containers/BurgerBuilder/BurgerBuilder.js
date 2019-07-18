import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable : false,
        purchasing : false
    }
    updatePurchaseState(updatedIngredient){
        
        const ingredients = { ...updatedIngredient};
        const sum = Object.keys(ingredients)
        .map(iKeys => {
            return ingredients[iKeys];
        }).reduce((sum,ele) => {
            return sum+ele;
        },0);
        
        this.setState({purchasable : sum > 0})

        // var sums=0;
        // for(let i=0;i<sum.length;i++){
        //     sums += sum[i];
            
        // }
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
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchaseState(updatedIngredient);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = { ...this.state.ingredients };
        updatedIngredient[type] = updatedCount;

        const priceAddition = PRICE_INGREDIENTS[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
        this.updatePurchaseState(updatedIngredient);
    }
    purchaseHandler = () => {
        this.setState({purchasing : true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }
    purchaseContinueHandler = () => {
       alert('continue')
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0 ;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} 
                        closeModal={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
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
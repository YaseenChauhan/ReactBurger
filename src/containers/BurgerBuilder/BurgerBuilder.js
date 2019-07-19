import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error : false
    }
    updatePurchaseState(updatedIngredient) {

        const ingredients = { ...updatedIngredient };
        const sum = Object.keys(ingredients)
            .map(iKeys => {
                return ingredients[iKeys];
            }).reduce((sum, ele) => {
                return sum + ele;
            }, 0);

        this.setState({ purchasable: sum > 0 })

        // var sums=0;
        // for(let i=0;i<sum.length;i++){
        //     sums += sum[i];

        // }
    }
    componentDidMount = () => {
        axios.get('https://reactburger-bd7a4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error=> {
                this.setState({error:true})
            })
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
        if (oldCount <= 0) {
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
        this.setState({ purchasing: true });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        //alert('continue')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Muhammad',
                address: {
                    street: '17th',
                    zipcode: '101011',
                    country: 'India'
                },
                email: 'xyzz2gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders', order)
            .then(response => {
                this.setState(
                    {
                        loading: false, purchasing: false
                    })
            })
            .catch(error => {
                this.setState(
                    {
                        loading: false, purchasing: false
                    })
            })
    }
    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary= <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);



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
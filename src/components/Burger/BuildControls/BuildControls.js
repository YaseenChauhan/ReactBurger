import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes  from './BuildControls.css'

const controls = [
    { label : 'Meat',type: 'meat'},
    { label : 'Bacon',type: 'bacon'},
    { label : 'Cheese',type: 'cheese'},
    { label : 'Salad',type: 'salad'}
]
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(ctrl => {
                return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}/>
            })}
        </div>
    );
}

export default buildControls;



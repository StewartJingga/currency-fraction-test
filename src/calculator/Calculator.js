import { findAndSortEligibleFractions } from './CalculatorHelpers';

class Calculator {
    denominations = null;

    static FindMinimumDenomination = (value, fractions) => {
        let calculator = new Calculator();
        let result = calculator._findMinimumDenomination(value, fractions);
        return result;
    }

    _findMinimumDenomination = (value, fractions) => {
        let denominations = {
            remainder: value,
            quantity: 0,
            list: []
        };

        this._findMinimum(denominations, fractions);

        return this.denominations;
    }
    
    _findMinimum = (denominations, fractions) => {
        fractions = findAndSortEligibleFractions(fractions, denominations.remainder);
        
        if(fractions.length > 0)
        {
            for(let fraction of fractions) {
                // Deep copy denominations to a new value
                let newDenomination = {...denominations, list: [...denominations.list]};

                // Find quantity
                let quantity = newDenomination.remainder / fraction; // 1.8
                
                // If there is no more remainder
                if(quantity%1 == 0) { // No decimal value means no remainder
                    newDenomination.remainder = 0;
                    newDenomination.quantity += quantity;
                    newDenomination.list.push([quantity, fraction]);
                    this._done(newDenomination);
                }
                else {
                    quantity = Math.floor(quantity);
                    newDenomination.remainder = newDenomination.remainder%fraction;
                    newDenomination.quantity += quantity;
                    newDenomination.list.push([quantity, fraction]);
                    
                    this._findMinimum(newDenomination, fractions);
                }
            }
        }
        else
        {
            this._done(denominations);
        }
    }

    _done = (denominations) => {
        // Set denominations with some conditions
        if(
            !this.denominations || // Current denominations is null
            (this.denominations.remainder > 0 && denominations.remainder == 0) || // Current denominations remainder is greater than zero while the new one is zero
            this.denominations.quantity == 0 || // Current denominations quantity is zero
            this.denominations.quantity > denominations.quantity // Current denominations quantity is greater than the new one
        ) 
        {
            this.denominations = denominations;
        }
    }
}

export default Calculator;
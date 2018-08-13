import React, { Component } from 'react';
import { Parser } from './parser';
import { Calculator, RP_FRACTIONS } from './calculator';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            invalidInput: false,
            result: null
        }
    }

    onInputChange = (e) => {
        this.setState({
            input: e.target.value,
            invalidInput: false
        });
    }

    calculateMinimum = (value) => {
        let result = Calculator.FindMinimumDenomination(value, RP_FRACTIONS);
        this.setState({ result });
    }

    submit = (e) => {
        // Pressed enter
        if (e.which == 13) {
            e.preventDefault();

            const { input } = this.state;
            let parsedInput = Parser.Parse(input);

            if (parsedInput) { // If valid
                this.calculateMinimum(parsedInput);
            }
            else { // If invalid
                this.setState({
                    invalidInput: true,
                    result: null
                });
            }
        }
    }

    render() {
        const { input, invalidInput, result } = this.state;
        return (
            <form onKeyPress={this.submit}>
                <h2>Input your value below and press enter to submit</h2>

                <input type="string" 
                    value={input} 
                    onChange={this.onInputChange} 
                    placeholder="Input your value here..." 
                />
                {invalidInput && <span className="error-message">Invalid Input</span>}
                
                {
                    result &&
                    <div>
                        <h3>Result</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th className="text-right">Quantity</th>
                                    <th className="text-right">Rupiah</th>
                                </tr>
                            </thead>
                            {
                                result.list.map((item, key) => (
                                    <tr>
                                        <td className="text-right" width="1">{key + 1}</td>
                                        <td className="text-right">x{item[0]}</td>
                                        <td className="text-right">{item[1]}</td>
                                    </tr>
                                ))
                            }
                            <tfoot>
                                <tr>
                                    <td>Summary</td>
                                    <td className="text-right total-quantity">
                                        <b>{result.quantity}</b>
                                    </td>
                                    <td className={"text-right" + (result.remainder > 0 ? ' text-red' : '')}>
                                        <b>{result.remainder}</b>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                }


            </form>
        );
    }
}
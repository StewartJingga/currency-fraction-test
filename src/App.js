import React, { Component } from 'react';
import { ExtractNumberIncludingThousandSeparators, ParseToNumber } from './parser';
import { Calculator, RP_FRACTIONS } from './calculator';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            invalidInput: false,
            extractedValue: null,
            result: null
        }
    }

    onInputChange = (e) => {
        let { value } = e.target;

        // Extract value from string
        let extractedValue = ExtractNumberIncludingThousandSeparators(value);

        // If null value is invalid
        let invalidInput = extractedValue == null;

        // Update states
        this.setState({
            input: value,
            invalidInput,
            extractedValue,
            result: null
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

            const { extractedValue } = this.state;
            if (extractedValue) {
                let parsed = ParseToNumber(extractedValue);
                this.calculateMinimum(parsed);
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

        let total = 0;
        return (
            <div className="container">
                <h3>This is a program to find the minimum number of rupiahs to create inputted valid rupiah value.</h3>
                <p>Example of valid values are "18.215", "Rp17500", "Rp17.500,00", "Rp 120.325", "005.000", "001000".</p>
                <p>Example of invalid values are "17,500", "2 500", "3000 Rp", "Rp ".</p>
                <p>
                    Fractions being used in the program are {RP_FRACTIONS.join(", ")}.
                <br />
                    <small style={{color: 'red', fontStyle: 'italic'}}>Notice that 2000 fraction are not being included due to requirements.</small>
                </p>
                <div>
                    <strong>Input your value below and press enter to submit</strong>
                </div>
                <form onKeyPress={this.submit}>

                    <input type="string"
                        value={input}
                        onChange={this.onInputChange}
                        placeholder="Input your value here..."
                    />
                    {invalidInput && <span className="error-message">Invalid Input</span>}

                    {
                        result &&
                        <div id="result">
                            <h3>Result</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th className="text-right">Qty</th>
                                        <th className="text-right">Rupiah</th>
                                        <th className="text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                {
                                    result.list.map((item, key) => (
                                        <tr key={key}>
                                            <td className="text-right" width="1">{key + 1}</td>
                                            <td className="text-right">x{item[0]}</td>
                                            <td className="text-right">{item[1]}</td>
                                            <td className="text-right">
                                                {item[0] * item[1]}
                                                <span style={{ display: 'none' }}>{total += item[0] * item[1]}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tfoot>
                                    <tr>
                                        <td>Total</td>
                                        <td className="text-right total-quantity">
                                            <b>{result.quantity}</b>
                                        </td>
                                        <td colSpan={2} className="text-right">
                                            <b>{total}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Remainder</td>
                                        <td colSpan={3} className={"text-right" + (result.remainder > 0 ? ' text-red' : '')}>
                                            <b>{result.remainder}</b>
                                        </td>
                                    </tr>

                                </tfoot>
                            </table>
                        </div>
                    }


                </form>
            </div>
        );
    }
}
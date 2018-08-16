import Calculator from './Calculator';
import { sortFractionsDescending, findAndSortEligibleFractions, RP_FRACTIONS } from './CalculatorHelpers';

describe('Calculator function', () => {
    describe('Test utilities', () => {
        it("Function will sort the array descending", () => {
            let testSamples = [3, 4, 1, 2, 5];
            let expectedResults = [5, 4, 3, 2, 1];
            let result = sortFractionsDescending(testSamples);
            expect(result).toEqual(expectedResults);
        })

        it("Function will filter out of range value and sort the array descending", () => {
            let value = 3;
            let testSamples = [3, 4, 1, 2, 5];
            let expectedResults = [3, 2, 1];
            let result = findAndSortEligibleFractions(testSamples, value);
            expect(result).toEqual(expectedResults);
        })
    })

    describe('Passing Tests with no remainders', () => {
        let testSamples = [
            [15000, 2], // [Sample, ExpectedResult]
            [3900, 8]
        ];

        for(let sample of testSamples)
        {
            it(`${sample[0]} has ${sample[1]} rupiahs`, () => {
                let result = Calculator.FindMinimumDenomination(sample[0], RP_FRACTIONS);
                expect(result.quantity).toEqual(sample[1]);
            })
        }
    })

    describe('Passing Tests with remainders', () => {

        let testSample = 12510;
        let testResult = 4;
        let remainder = 10;
        let result = Calculator.FindMinimumDenomination(testSample, RP_FRACTIONS);

        it(`${testSample} has ${testResult} rupiahs`, () => {
            expect(result.quantity).toEqual(testResult);
        })

        it(`${testSample} has ${remainder} remainder`, () => {
            expect(result.remainder).toEqual(remainder);
        })
    })

    // describe('Failing Tests', () => {
    //     let testSamples = [
    //         "17,500",
    //         "2 500",
    //         "3000 Rp",
    //         "Rp "
    //     ];

    //     for(let sample of testSamples)
    //     {
    //         it(sample + " should fail", () => {
    //             let result = Parser.Parse(sample);
    //             expect(result).toEqual(null);
    //         })
    //     }
    // })
    
});
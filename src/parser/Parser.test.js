import Parser from './Parser';

describe('Parser function', () => {
    describe('Passing Tests', () => {
        let testSamples = [
            ["18.215", 18215], // [Sample, ExpectedResult]
            ["Rp17500", 17500],
            ["Rp17.500,00", 17500],
            ["Rp 120.325", 120325],
            ["005.000", 5000],
            ["001000", 1000]
        ];

        for(let sample of testSamples)
        {
            it(sample[0] + " should be parsed into " + sample[1], () => {
                let result = Parser.Parse(sample[0]);
                expect(result).toEqual(sample[1]);
            })
        }
    })

    describe('Failing Tests', () => {
        let testSamples = [
            "17,500",
            "2 500",
            "3000 Rp",
            "Rp "
        ];

        for(let sample of testSamples)
        {
            it(sample + " should fail", () => {
                let result = Parser.Parse(sample);
                expect(result).toEqual(null);
            })
        }
    })
    
});
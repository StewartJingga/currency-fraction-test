import { ExtractNumberIncludingThousandSeparators, ParseToNumber } from './Parser';

describe('Parser function', () => {
    describe('Extract Numeric with/o Thousand Separator from \"valid\" String', () => {
        let testSamples = [
            ["18.215", '18.215'], // [Sample, ExpectedResult]
            ["Rp17500", '17500'],
            ["Rp17.500,00", '17.500'],
            ["Rp 120.325", '120.325'],
            ["005.000", '5.000'],
            ["001000", '1000']
        ];

        for(let sample of testSamples)
        {
            it(sample[1] + " will be extracted from " + sample[0], () => {
                let result = ExtractNumberIncludingThousandSeparators(sample[0]);
                expect(result).toEqual(sample[1]);
            })
        }
    })

    describe('Parse Numeric with/o Thousand Separator to Number format', () => {
        let testSamples = [
            ['18.215', 18215], // [Sample, ExpectedResult]
            ['17500', 17500],
            ['17.500', 17500],
            ['120.325', 120325],
            ['5.000', 5000],
            ['1000', 1000]
        ];

        for(let sample of testSamples)
        {
            it(sample[0] + " should be parsed into " + sample[1], () => {
                let result = ParseToNumber(sample[0]);
                expect(result).toEqual(sample[1]);
            })
        }
    })

    describe('Extract Numeric with/o Thousand Separator from \"invalid\" String', () => {
        let testSamples = [
            "17,500",
            "2 500",
            "3000 Rp",
            "Rp "
        ];

        for(let sample of testSamples)
        {
            it(sample + " should return null", () => {
                let result = ExtractNumberIncludingThousandSeparators(sample);
                expect(result).toEqual(null);
            })
        }
    })
    
});
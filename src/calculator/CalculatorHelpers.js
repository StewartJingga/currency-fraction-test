export const findAndSortEligibleFractions = (fractions, value) => {
    return sortFractionsDescending(
            fractions.filter(fraction => fraction <= value)
        );
}

export const sortFractionsDescending = (fractions) => (
    fractions.sort((a, b) => b - a)
)

export const RP_FRACTIONS = [
    100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50
];
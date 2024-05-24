function calculateTax(totalBill, taxPercentage) {
    return totalBill * (taxPercentage / 100);
}

function splitBill(totalBill, itemsByPerson, taxPercentage) {
    const totalTaxByPerson = itemsByPerson.map((items) =>
        calculateTax(calculateTotal(items), taxPercentage)
    );

    return {
        totalTaxByPerson,
    };
}

module.exports = {
    calculateTax,
    splitBill,
};

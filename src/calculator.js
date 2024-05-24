function calculateTax(totalBill, taxPercentage) {
    return totalBill * (taxPercentage / 100);
}

function splitBill(totalBill, itemsByPerson, taxPercentage) {
    const totalTaxByPerson = itemsByPerson.map((items) =>
        calculateTax(calculateTotal(items), taxPercentage)
    );
    const totalBillByPerson = itemsByPerson.map(
        (items, index) => calculateTotal(items) + totalTaxByPerson[index]
    );
    const totalBillWithTax = totalBillByPerson.reduce(
        (acc, bill) => acc + bill,
        0
    );

    return {
        totalTaxByPerson,
    };
}

module.exports = {
    calculateTax,
    splitBill,
};

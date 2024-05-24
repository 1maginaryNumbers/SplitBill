function calculateTotal(items) {
    return items.reduce((acc, item) => acc + item.price, 0);
}

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
    const amountPerPerson = totalBillWithTax / itemsByPerson.length;
    const totalTax = totalTaxByPerson.reduce((acc, tax) => acc + tax, 0);
    const subtotalByPerson = totalBillByPerson.map(
        (bill, index) => bill - totalTaxByPerson[index]
    );
    const totalBillWithoutTax = totalBill - totalTax;
    return {
        totalBillWithTax,
        totalBillByPerson,
        totalTaxByPerson,
        amountPerPerson,
        totalTax,
        subtotalByPerson,
        totalBillWithoutTax,
    };
}

module.exports = {
    calculateTotal,
    calculateTax,
    splitBill,
};

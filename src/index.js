const readline = require("readline");
const { calculateTotal, calculateTax, splitBill } = require("./calculator");
const { askForItemsForPerson, askTaxPercentage } = require("./prompts");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Masukkan jumlah orang: ", (numberOfPeople) => {
    const peopleItems = [];
    const peopleNames = [];

    askForItemsForPerson(
        rl,
        peopleNames,
        peopleItems,
        0,
        numberOfPeople,
        () => {
            askTaxPercentage(rl, (taxPercentage) => {
                const totalBill = peopleItems.reduce(
                    (acc, items) => acc + calculateTotal(items),
                    0
                );
                const {
                    totalBillWithTax,
                    totalBillByPerson,
                    totalTaxByPerson,
                    amountPerPerson,
                    totalTax,
                    subtotalByPerson,
                    totalBillWithoutTax,
                } = splitBill(
                    totalBill,
                    peopleItems,
                    parseFloat(taxPercentage)
                );
                console.log(
                    `Total tagihan tanpa pajak: ${totalBillWithoutTax}`
                );
                console.log(`Total pajak keseluruhan: ${totalTax}`);
                console.log(`Total tagihan dengan pajak: ${totalBillWithTax}`);
                console.log("Tagihan masing-masing orang:");
                totalBillByPerson.forEach((bill, index) => {
                    console.log(
                        `${peopleNames[index]}: Total Tagihan: ${bill}, Pajak: ${totalTaxByPerson[index]}, Subtotal: ${subtotalByPerson[index]}`
                    );
                });
            });
        }
    );
});

function askForItemsForPerson(
    rl,
    peopleNames,
    peopleItems,
    personIndex,
    numberOfPeople,
    callback
) {
    rl.question(`Masukkan nama orang ke-${personIndex + 1}: `, (name) => {
        peopleNames.push(name);
        rl.question(`Masukkan jumlah item untuk ${name}: `, (numItems) => {
            const items = [];
            let currentItem = 1;

            function askForItemPrice() {
                rl.question(
                    `Masukkan harga item ${currentItem} untuk ${name}: `,
                    (price) => {
                        items.push({ price: parseFloat(price) });
                        currentItem++;

                        if (currentItem <= numItems) {
                            askForItemPrice();
                        } else {
                            peopleItems.push(items);
                            if (personIndex + 1 < numberOfPeople) {
                                askForItemsForPerson(
                                    rl,
                                    peopleNames,
                                    peopleItems,
                                    personIndex + 1,
                                    numberOfPeople,
                                    callback
                                );
                            } else {
                                callback();
                            }
                        }
                    }
                );
            }

            askForItemPrice();
        });
    });
}

function askTaxPercentage(rl, callback) {
    rl.question("Masukkan persentase pajak: ", (taxPercentage) => {
        callback(taxPercentage);
    });
}

module.exports = {
    askForItemsForPerson,
    askTaxPercentage,
};

function askNumberOfPeople(rl, callback) {
    rl.question("Masukkan jumlah orang: ", (input) => {
        if (!/^\d+$/.test(input)) {
            console.log(
                "Input tidak valid. Masukkan angka yang lebih besar dari 1."
            );
            askNumberOfPeople(rl, callback);
        } else {
            const numberOfPeople = parseInt(input);
            if (numberOfPeople <= 1) {
                console.log(
                    "Input tidak valid. Masukkan angka yang lebih besar dari 1."
                );
                askNumberOfPeople(rl, callback);
            } else {
                callback(numberOfPeople);
            }
        }
    });
}

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
        rl.question(`Masukkan jumlah item untuk ${name}: `, (input) => {
            if (!/^\d+$/.test(input)) {
                console.log(
                    "Input tidak valid. Masukkan angka yang lebih besar dari 0."
                );
                askForItemsForPerson(
                    rl,
                    peopleNames,
                    peopleItems,
                    personIndex,
                    numberOfPeople,
                    callback
                );
            } else {
                const numItems = parseInt(input);
                if (numItems <= 0) {
                    console.log(
                        "Input tidak valid. Masukkan angka yang lebih besar dari 0."
                    );
                    askForItemsForPerson(
                        rl,
                        peopleNames,
                        peopleItems,
                        personIndex,
                        numberOfPeople,
                        callback
                    );
                } else {
                    const items = [];
                    let currentItem = 1;

                    function askForItemPrice() {
                        rl.question(
                            `Masukkan harga item ${currentItem} untuk ${name}: `,
                            (input) => {
                                const price = parseFloat(input);
                                if (isNaN(price) || price < 0) {
                                    console.log(
                                        "Input tidak valid. Masukkan harga yang sesuai."
                                    );
                                    askForItemPrice();
                                } else {
                                    items.push({ price: price });
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
                            }
                        );
                    }

                    askForItemPrice();
                }
            }
        });
    });
}

function askTaxPercentage(rl, callback) {
    rl.question("Masukkan persentase pajak: ", (input) => {
        const taxPercentage = parseFloat(input);
        if (isNaN(taxPercentage) || taxPercentage < 0) {
            console.log(
                "Input tidak valid. Masukkan persentase pajak yang sesuai."
            );
            askTaxPercentage(rl, callback);
        } else {
            callback(taxPercentage);
        }
    });
}

module.exports = {
    askForItemsForPerson,
    askTaxPercentage,
    askNumberOfPeople,
};

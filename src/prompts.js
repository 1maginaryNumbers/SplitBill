function askTaxPercentage(rl, callback) {
    rl.question("Masukkan persentase pajak: ", (taxPercentage) => {
        callback(taxPercentage);
    });
}

module.exports = {
    askTaxPercentage,
};

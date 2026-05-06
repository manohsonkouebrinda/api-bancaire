function generateAccountNumber() {
  const random = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `XAF-${random}`;
}

module.exports = generateAccountNumber;

const { encryptionCaesarCipher, decryptionCaesarCipher, encryptFile, decryptFile, afineCipher, decryptAfineCipher } = require('./helpers');

// Input parameters
const message = 'Hello World!';
const shift = 3;
const a = 3, b = 5;

// Testing
const encryptedMessage = encryptionCaesarCipher(message, shift);
console.log('Encrypted message:', encryptedMessage);

const descryptedMessage = decryptionCaesarCipher(encryptedMessage, shift);
console.log('Decrypted message:', descryptedMessage);

// Read message from the file
encryptFile('test.txt'); 

const savedShift = encryptFile('test.txt');
decryptFile('encrypted_test.txt', savedShift); 

// Test afin encryption
const afineEncryptedMessage = afineCipher(message, a, b);
console.log("Afine encr result: ", afineEncryptedMessage);

const afineDecryptedMessage = decryptAfineCipher(afineEncryptedMessage, a, b);
console.log("Afine decryption result: ", afineDecryptedMessage);
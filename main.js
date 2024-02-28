const { encryptionCaesarCipher, decryptionCaesarCipher, encryptFile, decryptFile } = require('./helpers');

// Input parameters
const message = 'Hello, World AABBWWZZXX!';
const shift = 3;

// Testing
const encryptedMessage = encryptionCaesarCipher(message, shift);
console.log('Encrypted message:', encryptedMessage);

const descryptedMessage = decryptionCaesarCipher(encryptedMessage, shift);
console.log('Decrypted message:', descryptedMessage);

// Read message from the file
encryptFile('test.txt'); 

const savedShift = encryptFile('test.txt');
decryptFile('encrypted_test.txt', savedShift); 
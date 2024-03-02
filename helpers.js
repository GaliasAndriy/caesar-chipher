const fs = require('fs');

function encryptionCaesarCipher(message, shift) {
    let result = '';
    
    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      
      // Encryption only for upper/lowercase letters of alphabet 
      if (char.match(/[a-z]/i)) {
        const code = message.charCodeAt(i);
        
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      
      result += char;
    }

    return result;
}

function afineCipher(message, a, b) {
  let result = '';
  
  for (let i = 0; i < message.length; i++) {
    let char = message[i];
    
    
    // Encryption only for upper/lowercase letters of alphabet 
    if (char.match(/[a-z]/i)) {
      const code = message.charCodeAt(i);
      
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode((((code - 65) * a + b) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode((((code - 97) * a + b) % 26) + 97);
      }
    }
    
    result += char;
  }

  return result;
}

function decryptAfineCipher(message, a, b) {
  let result = '';
  
  let aInverse = 0;
  for (let i = 1; i < 26; i++) {
    if ((a * i) % 26 === 1) {
      aInverse = i;
      break;
    }
  }

  console.log("a Inverse: ", aInverse);
  for (let i = 0; i < message.length; i++) {
    let char = message[i];
    
    if (char.match(/[a-z]/i)) {
      const code = message.charCodeAt(i);
      
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode((((code - 65 - b + 26) * aInverse) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode((((code - 97 - b + 26) * aInverse) % 26) + 97);
      }
    }
    
    result += char;
  }

  return result;
}


// All whitespaces, signs of punctoation etc. left as it is 

function decryptionCaesarCipher(message, shift) {
    let result = '';
    
    for (let i = 0; i < message.length; i++) {
      let char = message[i];

      if (char.match(/[a-z]/i)) {
        const code = message.charCodeAt(i);
        
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }
      }
      
      result += char;
    }
    
    return result;
}

function encryptFile(fileName, shift) {
  try {
    const data = fs.readFileSync(fileName, 'utf8').split('\n');
    if (data.length < 2) {
      throw new Error('Shift value not provided in the file.');
    }

    shift = parseInt(data[0]);

    if (isNaN(shift) || shift > 26 || shift < -26) {
      throw new Error('Invalid shift value. It should be between -25 and 25.');
    }
    
    const message = data.slice(1).join('\n');
    const encryptedMessage = encryptionCaesarCipher(message, shift);

    fs.writeFileSync('encrypted_' + fileName, encryptedMessage, 'utf8');
    console.log('Encryption complete. Check encrypted_' + fileName);
  } catch (err) {
    console.error('Error reading file:', err);
  }

  return shift;
}

function decryptFile(fileName, savedShift) {
  try {
    const data = fs.readFileSync(fileName, 'utf8').split('\n');
    const message = data.slice(0).join('\n');
    const decryptedMessage = decryptionCaesarCipher(message, savedShift);

    fs.writeFileSync('decrypted_' + fileName, decryptedMessage, 'utf8');
    console.log('Decryption complete. Check decrypted_' + fileName);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

module.exports = {
  encryptionCaesarCipher,
  decryptionCaesarCipher,
  encryptFile,
  decryptFile,
  afineCipher,
  decryptAfineCipher,
};
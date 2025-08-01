const crypto = require('crypto');

export default function Encrypt(text: string): string {
    try{
        const cipher = crypto.createCipheriv('aes-256-ecb', process.env.ENCRYPTION_SECRET_KEY, null);    
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error){
        console.log(error);
        return '';
    }
}
  
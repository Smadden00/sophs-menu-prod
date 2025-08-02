const crypto = require('crypto');

export default function Encrypt(text: string): string {
    try {
        // Validate that encryption key exists
        if (!process.env.ENCRYPTION_SECRET_KEY) {
            throw new Error('ENCRYPTION_SECRET_KEY environment variable is not set');
        }
        
        // Ensure key is 32 bytes for AES-256
        const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_SECRET_KEY).digest();
        
        // Generate random IV for each encryption (more secure than ECB)
        const iv = crypto.randomBytes(16);
        
        // Use CBC mode instead of ECB for better security
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Prepend IV to encrypted data (needed for decryption)
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}
  
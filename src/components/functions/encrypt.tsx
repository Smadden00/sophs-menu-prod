const crypto = require('crypto');

export default function Encrypt(text: string): string {
    try {
        // Validate that encryption key exists
        if (!process.env.ENCRYPTION_SECRET_KEY) {
            throw new Error('ENCRYPTION_SECRET_KEY environment variable is not set');
        }
        
        // Create a deterministic 64-character hash
        // Use HMAC-SHA256 which produces 32 bytes = 64 hex characters
        const hmac = crypto.createHmac('sha256', process.env.ENCRYPTION_SECRET_KEY);
        hmac.update(text);
        const hash = hmac.digest('hex');
        
        // Return exactly 64 characters
        return hash;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}
  
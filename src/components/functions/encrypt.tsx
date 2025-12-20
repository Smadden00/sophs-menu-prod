export default function Encrypt(text: string): string {
    return "You thought! (encryption was moved to api)"
}

/*const crypto = require('crypto');

export default function Encrypt(text: string): string {
    try {
        // Validate that encryption key exists
        if (!import.meta.env.VITE_ENCRYPTION_SECRET_KEY) {
            throw new Error('VITE_ENCRYPTION_SECRET_KEY environment variable is not set');
        }
        
        // Create a deterministic 64-character hash
        // Use HMAC-SHA256 which produces 32 bytes = 64 hex characters
        const hmac = crypto.createHmac('sha256', import.meta.env.VITE_ENCRYPTION_SECRET_KEY);
        hmac.update(text);
        const hash = hmac.digest('hex');
        
        // Return exactly 64 characters
        return hash;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
}*/
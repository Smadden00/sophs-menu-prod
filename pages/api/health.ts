import { NextApiRequest, NextApiResponse } from 'next';
import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: Number(process.env.PGPORT) || 5432,
    },
});

interface HealthStatus {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    version: string;
    environment: string;
    checks: {
        database: {
            status: 'up' | 'down';
            latency?: number;
            error?: string;
        };
        environment: {
            status: 'up' | 'down';
            missing?: string[];
        };
        encryption: {
            status: 'up' | 'down';
            error?: string;
        };
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthStatus>) {
    const startTime = Date.now();
    
    const health: HealthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        checks: {
            database: { status: 'down' },
            environment: { status: 'down' },
            encryption: { status: 'down' }
        }
    };

    // Database health check
    try {
        const dbStart = Date.now();
        await db.raw('SELECT 1');
        health.checks.database = {
            status: 'up',
            latency: Date.now() - dbStart
        };
    } catch (error) {
        health.checks.database = {
            status: 'down',
            error: error instanceof Error ? error.message : 'Unknown database error'
        };
        health.status = 'unhealthy';
    }

    // Environment variables check
    const requiredEnvVars = [
        'PGHOST',
        'PGUSER', 
        'PGPASSWORD',
        'PGDATABASE',
        'NEXTAUTH_SECRET',
        'NEXTAUTH_URL',
        'ENCRYPTION_SECRET_KEY',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length === 0) {
        health.checks.environment = { status: 'up' };
    } else {
        health.checks.environment = {
            status: 'down',
            missing: missingEnvVars
        };
        health.status = 'unhealthy';
    }

    // Encryption health check
    try {
        const crypto = require('crypto');
        if (!process.env.ENCRYPTION_SECRET_KEY) {
            throw new Error('ENCRYPTION_SECRET_KEY not set');
        }
        
        // Test encryption/decryption
        const key = crypto.createHash('sha256').update(process.env.ENCRYPTION_SECRET_KEY).digest();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const testText = 'health-check';
        
        let encrypted = cipher.update(testText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        health.checks.encryption = { status: 'up' };
    } catch (error) {
        health.checks.encryption = {
            status: 'down',
            error: error instanceof Error ? error.message : 'Unknown encryption error'
        };
        health.status = 'unhealthy';
    }

    // Set appropriate HTTP status code
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    // Set security headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.status(statusCode).json(health);
}

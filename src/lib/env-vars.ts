import { loadEnvConfig } from '@next/env';
import { z } from 'zod';

// Cargar variables de entorno desde .env.local o .env en tiempo de desarrollo
loadEnvConfig(process.cwd());

/** Validación para entorno de aplicación */
const AppSchema = z.object({
    APP_ENV: z.enum(['production', 'local']).default('production'),
    APP_LOG_LEVEL: z.enum(['info', 'error', 'warn', 'debug']).default('info'),
});

/** Validación para base de datos */
const DatabaseSchema = z.object({
    DATABASE_URL: z.string().url(),
    DATABASE_DIRECT_URL: z.string().url(),
    DATABASE_DEBUG: z
        .enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
});

/** Validación para entorno general de Node.js */
const NodeEnvSchema = z.object({
    NODE_ENV: z.enum(['production', 'development']).default('production'),
});

/** Validación para autenticación */
const AuthSchema = z.object({
    AUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    AUTH_TRUST_HOST: z
        .enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
    AUTH_DEBUG: z
        .enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
});

/** Validación para envío de correos */
const MailerSchema = z.object({
    MAILER_SMTP_HOST: z.string(),
    MAILER_SMTP_PORT: z.coerce.number(),
    MAILER_SMTP_USERNAME: z.string(),
    MAILER_SMTP_PASSWORD: z.string(),
    MAILER_SMTP_ENCRYPTION: z.enum(['tls', 'ssl']).default('tls'),
    MAILER_FROM_EMAIL: z.string().email(),
});

/** Función auxiliar para validar cada schema */
function validateEnvWithSchema<TSchema extends z.ZodTypeAny>(schema: TSchema, schemaName: string): z.infer<TSchema> {
    const result = schema.safeParse(process.env);

    if (!result.success) {
        console.error(`❌ (${schemaName}) Error con las variables de entorno:\n`);
        console.error(result.error.format());
        process.exit(1); // ⛔ Detener el build si falta alguna obligatoria
    }

    return result.data;
}

/** Exportar todas las variables ya validadas */
export const ENV_VARS = {
    ...validateEnvWithSchema(AppSchema, 'AppSchema'),
    ...validateEnvWithSchema(AuthSchema, 'AuthSchema'),
    ...validateEnvWithSchema(DatabaseSchema, 'DatabaseSchema'),
    ...validateEnvWithSchema(NodeEnvSchema, 'NodeEnvSchema'),
    ...validateEnvWithSchema(MailerSchema, 'MailerSchema'),
};

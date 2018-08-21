'use strict';

/* eslint no-process-env: off */
function parseIntEnv (name, defaultValue) {
    if (typeof name !== 'string') {
        throw new Error(`invalid key ${name}`);
    }

    if (process.env[name] === undefined) {
        return defaultValue;
    }

    const parsed = parseInt(process.env[name]);

    if (isNaN(parsed)) {
        throw new Error(`invalid value ${name}=${process.env[name]}`);
    }

    return parsed;
}

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: (process.env.NODE_ENV === 'test') ? 9003 : 9002,
    commit: process.env.OPENSHIFT_BUILD_COMMIT,

    // general timeout for HTTP invocations of external services
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,

    logging: {
        level: process.env.LOG_LEVEL || ((process.env.NODE_ENV === 'test') ? 'error' : 'debug'),
        pretty: (process.env.NODE_ENV !== 'production')
    },

    advisor: {
        host: process.env.ADVISOR_HOST || 'https://accessqa.usersys.redhat.com',
        auth: process.env.ADVISOR_AUTH || '',
        insecure: (process.env.ADVISOR_INSECURE === 'true') ? true : false
    },

    contentServer: {
        host: process.env.CONTENT_SERVER_HOST || 'https://accessqa.usersys.redhat.com',
        auth: process.env.CONTENT_SERVER_AUTH || '',
        insecure: (process.env.CONTENT_SERVER_INSECURE === 'true') ? true : false
    },

    vmaas: {
        host: process.env.VMAAS_HOST || 'http://webapp-vmaas-stable.1b13.insights.openshiftapps.com'
    },

    vulnerabilities: {
        host: process.env.VULNERABILITIES_HOST || 'https://accessqa.usersys.redhat.com',
        auth: process.env.VULNERABILITIES_AUTH || '',
        insecure: (process.env.VULNERABILITIES_INSECURE === 'true') ? true : false
    },

    ssg: {
        repository: process.env.SSG_REPO ||
            'https://raw.githubusercontent.com/OpenSCAP/scap-security-guide/255a015c92b869d579cb1af98ff1e83f1babbd55/' +
                'shared/fixes/ansible'
    },

    redis: {
        enabled: process.env.REDIS_ENABLED === 'true' ? true : false,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseIntEnv('REDIS_PORT', 6379),
        password: process.env.REDIS_PASSWORD || undefined
    },

    cache: {
        ttl: parseIntEnv('CACHE_TTL', 24 * 60 * 60), // 24 hours
        revalidationInterval: parseIntEnv('CACHE_REVALIDATION_INVERVAL', 10 * 60) // 10 mins
    }
};

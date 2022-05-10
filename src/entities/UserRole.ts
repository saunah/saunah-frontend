export namespace UserRole {
    export const enum Local {
        USER = 'USER',
        ADMIN = 'ADMIN',
    }

    export const enum Remote {
        USER = 'ROLE_USER',
        ADMIN = 'ROLE_ADMIN',
    }

    export function isRemote(role: unknown): role is Remote {
        switch (role) {
            case Remote.USER:
            case Remote.ADMIN:
                return true
        }
        return false
    }

    export function mapIn(role: Remote): Local {
        switch (role) {
            case Remote.USER:
                return Local.USER
            case Remote.ADMIN:
                return Local.ADMIN
        }
    }

    export function mapOut(role: Local): Remote {
        switch (role) {
            case Local.USER:
                return Remote.USER
            case Local.ADMIN:
                return Remote.ADMIN
        }
    }
}

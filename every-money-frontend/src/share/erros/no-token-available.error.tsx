
export class NoTokenAvailableError extends Error {
    constructor() {
        super('No token available');
    }
}
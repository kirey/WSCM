/**
 * Interface for Role object
 * @author Mario Petrovic
 */
export class Role {
    /**
     * Full name of the role (same as name property)
     */
    authority: string;

    /**
     * Id of the role
     */
    id: number;

    /**
     * Full name of the role
     */
    name: string;

    /**
     * Timeout value expressed in milliseconds
     */
    timeout: number;
}
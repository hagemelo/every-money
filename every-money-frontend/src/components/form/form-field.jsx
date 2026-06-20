import { FormGroup, FormLabel, FormError } from './form.styles.jsx';

export function FormField({ label, error, children }) {
    return (
        <FormGroup>
            {label && <FormLabel>{label}</FormLabel>}
            {children}
            {error && <FormError>{error}</FormError>}
        </FormGroup>
    );
}

export { FormInput, FormSelect, FormGroup, FormRow } from './form.styles.jsx';

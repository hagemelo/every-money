import { StyledButton } from './button.styles.jsx';

function Button({ children, variant = 'primary', type = 'button', ...props }) {
    return (
        <StyledButton $variant={variant} type={type} {...props}>
            {children}
        </StyledButton>
    );
}

export { ButtonGroup } from './button.styles.jsx';
export default Button;

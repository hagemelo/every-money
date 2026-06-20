import { EmptyContainer, EmptyTitle, EmptyText } from './empty-state.styles.jsx';
import Button from '../button/button.jsx';

function EmptyState({ title, message, actionLabel, onAction }) {
    return (
        <EmptyContainer>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyText>{message}</EmptyText>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </EmptyContainer>
    );
}

export default EmptyState;

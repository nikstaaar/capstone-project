import StyledButton from './styled';

/**
 *
 * @param {React.ReactNode} children
 * @param {React.HTMLAttributes<HTMLButtonElement>} props
 * @return {JSX.Element}
 * @constructor
 */
export default function Button({children, type = 'button', ...props}) {
	return (
		<StyledButton type={type} {...props}>
			{children}
		</StyledButton>
	);
}

Button.propTypes = {};

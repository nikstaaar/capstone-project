import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledTitle = styled(motion.h2)`
	${({expanded}) =>
		expanded
			? `
		font-size: 1.5em
  `
			: `
            
            font-size: 76%`}
`;

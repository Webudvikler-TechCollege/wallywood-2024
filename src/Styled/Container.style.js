import styled from 'styled-components'

export const ContainerStyle = styled.section`
	background-color: ${props => props.theme.colors.light};
	width: 100%;
	max-width: ${props => props.maxwidth}px;
	margin: 0 auto;
	padding: 0rem 2.3rem;

	@media screen and (width < 820px) {
		padding: 0rem 1rem;		
	}
`


import Alert from '@reach/alert';
import styled from 'styled-components/macro';

const StyledAlert = styled(Alert)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ErrorFallback({ error }) {
  return (
    <StyledAlert>
      <p>Quelque chose s'est mal passé... Désolé</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </StyledAlert>
  );
}

export default ErrorFallback;

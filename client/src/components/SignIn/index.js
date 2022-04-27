import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputGroup from 'components/InputGroup';
import { Button } from 'shared/components';
import { Container } from 'shared/layout';
import { SignInContainer, Title, Form, Helper, ErrorMessage } from './style';
import { FaAngleDoubleRight } from 'react-icons/fa';
import 'styled-components/macro';

function SignIn({ username, password, onSubmit, errors }) {
  return (
    <Container>
      <SignInContainer>
        <Title>S'identifier</Title>
        {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        <Form onSubmit={onSubmit} data-cy="signin-form">
          <InputGroup
            data-cy="signin-username-input"
            type="text"
            name="username"
            {...username}
            placeholder="Email ou login"
            autocomplete="username"
            error={!!(errors?.username || errors.message)}
            errorMsg={errors?.username}
          />
          <InputGroup
            data-cy="signin-password-input"
            type="password"
            name="password"
            {...password}
            placeholder="Password"
            autocomplete="current-password"
            error={!!(errors?.password || errors.message)}
            errorMsg={errors?.password}
          />
          <Button data-cy="signin-button" type="submit" primary>
          Connexion
          </Button>
        </Form>
        <Helper>
          Maintenant?{' '}
          <Link
            to="/signup"
            css={`
              display: inline-flex;
              align-items: center;
            `}
          >
            S'inscrire maintenant{' '}
            <FaAngleDoubleRight
              css={`
                margin-left: 2px;
              `}
            />
          </Link>
        </Helper>
      </SignInContainer>
    </Container>
  );
}

SignIn.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default SignIn;

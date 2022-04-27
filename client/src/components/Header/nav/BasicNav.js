import React from 'react';
import { StyledNavLink } from 'shared/components';
import { NavItem } from './style';

export default function BasicNav() {
  return (
    <>
      <NavItem>
        <StyledNavLink exact to="/">
          Accueil
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink data-cy="nav-signin-link" to="/signin">
        S'identifier
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink data-cy="nav-signup-link" to="/signup">
        S'inscrire
        </StyledNavLink>
      </NavItem>
    </>
  );
}

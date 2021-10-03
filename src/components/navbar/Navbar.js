import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import { ReactComponent as XMarkIcon } from '../../assets/x-mark.svg';
import {
  Container,
  Div,
  Logo,
  Button,
  IconWrapper,
  Nav,
  StyledLink,
} from './NavbarStyles';

export default function Navbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Div>
        <Logo to='/'>Picketer</Logo>
        <Button onClick={() => setOpen(!open)}>
          <IconWrapper>{open ? <XMarkIcon /> : <MenuIcon />}</IconWrapper>
        </Button>
      </Div>

      <Nav open={open} onClick={() => setOpen(false)}>
        <StyledLink to='/'>Posts</StyledLink>
        <StyledLink to='/users'>Users</StyledLink>
        <StyledLink to='/' onClick={() => dispatch(logout())}>
          Sign Out
        </StyledLink>
      </Nav>
    </Container>
  );
}

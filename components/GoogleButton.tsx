import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
const GoogleButton = styled(FcGoogle)`
  font-size: 1.5rem;
  color: #fff;
  background-color: #db4437;
  border-radius: 50%;
  padding: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0c0c0c;
    transform: scale(1.1);
  }
`;
export default GoogleButton
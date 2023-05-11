import { FcGoogle } from 'react-icons/fc'
import * as React from 'react'
import Button from '@mui/material/Button'
import { FC } from 'react'

interface GoogleButtonProps {
  onClick: () => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button
      sx={{
        '& .MuiButton-startIcon': {
          marginRight: '0px',
          p: 1.25,
          mr: 1.5,
          ml:0,
          backgroundColor: '#ffffff',
          borderRadius: '4px',
          height: '100%',
          '& svg': {
            fontSize: '20px',

          },
        },
        p:0,
        pr: 1.5,
        pl: 0.2,
        pt: 0.2,
        pb: 0.2,
        // ml: 0,
        lineHeight: 0,
        borderRadius: '4px',
        backgroundColor: 'background.google',
        color: 'text.custom',
        textTransform: 'unset',
         boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'background.google',
          boxShadow: 'none',
          textDecoration: 'none',
        },
      }}
      variant='contained'
      startIcon={<FcGoogle height={60} width={40} />}
      onClick={onClick}

    >
      Sign in with Google
    </Button>

  )
}
export default GoogleButton
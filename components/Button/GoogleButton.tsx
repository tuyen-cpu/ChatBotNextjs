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
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          height: '100%',
          '& svg': {
            fontSize: '20px',
          },
        },

        pr: 1.5,
        pl: 0.5,
        pt: 0,
        pb: 0,
        ml: 0,
        lineHeight: 0,
        borderRadius: '2px',
        backgroundColor: 'background.google',
        color: 'text.primary',
        textTransform: 'unset',
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
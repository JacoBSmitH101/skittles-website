import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, createTheme, ListItem, withStyles } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title, enabled, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  //set text colour to secondary.main if active, neutral.400 if not active and if not enabled set to neutral.300
  const textColor = enabled ? (active ? 'secondary.main' : 'neutral.400') : 'secondary.light';
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          disabled={!enabled} 
          sx={{
            backgroundColor: enabled ? active && 'rgba(255,255,255, 0.08)' : active && 'rgba(255,255,255, 0.04)',
            borderRadius: 1,
            color: textColor,
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : (enabled ? 'neutral.400' : 'rgba(255,255,255, 0.24)'),
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)'
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title} 
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};

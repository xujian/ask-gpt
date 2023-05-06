export default function MuiPopper () {
  return {
    MuiPopper: {
      styleOverrides: {
        root: {
          padding: '1em 1em 1em 1em',
          backgroundColor: '#00000088',
          backdropFilter: 'saturate(120%) blur(20px)',
          border: 'solid 1px #ffffff33',
          borderRadius: 20,
          overflow: 'hidden',
          '&.focused': {
            borderColor: '#ffffff33',
          }
        },
      }
    }
  }
}
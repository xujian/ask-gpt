export default function MuiPopover () {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: '#00000033',
            backdropFilter: 'saturate(120%) blur(20px)',
            border: 'solid 1px #ffffff33',
          }
        },
      }
    }
  }
}
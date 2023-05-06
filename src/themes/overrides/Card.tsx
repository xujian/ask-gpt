export default function MuiCard () {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: 20,
          borderColor: '#a8b3cf33',
          borderWidth: 1,
          borderStyle: 'solid'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 12,
          '&:last-child': {
            paddingBottom: 20
          }
        }
      }
    }
  }
}
export default function MuiList () {
  return {
    MuiList: {
      styleOverrides: {
        root: {
          fontSize: 14,
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#ffffff22'
          }
        }
      }
    }
  }
}
import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import { createContext } from "react";
import { CssBaseline } from "@material-ui/core";
const TemplateContext = createContext(null);

// internal css of material ui
export const TemplateProvider = ({ children }) => {
    const theme = createTheme({
        overrides: {
            MuiDialog: {
                paperWidthSm: {
                    maxWidth: 'none'
                }
            },
            MuiDialogContent: {
                root: {
                    padding: 0,
                    '&:first-child': {
                        paddingTop: 0
                    }
                }
            },
            MuiTableCell: {
                root: {
                    borderBottom: 'none',
                }
            },            
            // MuiDrawer: {
            //         paper: {
            //             backgroundColor: "#23282C",
            //             color: "white",
            //         }
            //     }

        }
    });
    return (
        <TemplateContext.Provider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </TemplateContext.Provider>
    )
}
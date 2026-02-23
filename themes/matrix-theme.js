import { PikabootPlugin } from '../plugin-manager.js';
import { themeManager } from '../storage.js';

export class MatrixThemePlugin extends PikabootPlugin {
    constructor() {
        super({
            id: 'theme-matrix',
            name: 'Matrix Theme',
            version: '1.0.0',
            author: 'Example User',
            description: 'Enter the Matrix with this green-on-black theme.'
        });
        
        this.originalTheme = null;
    }

    /**
     * Called when plugin is enabled
     * @param {Object} context
     */
    async onEnable(context) {
        console.log('[MatrixTheme] Plugin Enabled');
        
        // Save current custom theme to restore later
        this.originalTheme = themeManager.getCustomTheme();

        const matrixTheme = {
            colors: {
                // Backgrounds
                "--background": "#000000",
                "--card": "#0d0208",
                "--border": "#003b00",
                "--sidebar": "#050505",
                
                // Text
                "--foreground": "#00ff41",
                "--muted": "#008f11",
                "--muted-foreground": "#008f11",
                
                // Accents
                "--primary": "#00ff41",
                "--primary-foreground": "#000000",
                "--secondary": "#003b00",
                "--secondary-foreground": "#00ff41",
                
                "--highlight": "#00ff41",
                "--accent": "#00ff41"
            },
            css: `
                /* Matrix Font */
                @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

                body, button, input, textarea {
                    font-family: 'Courier Prime', monospace !important;
                }

                /* Glowing Text */
                h1, h2, h3, h4, .title, .card-title {
                    text-shadow: 0 0 5px #00ff41;
                }

                /* Border Glows */
                .card, .now-playing-bar, .sidebar {
                    border: 1px solid #003b00 !important;
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.1);
                }

                .card:hover {
                    border-color: #00ff41 !important;
                    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
                }

                /* Progress Bar */
                .progress-fill {
                    background: #00ff41 !important;
                    box-shadow: 0 0 10px #00ff41;
                }

                /* Scrollbar */
                ::-webkit-scrollbar-thumb {
                    background: #003b00;
                    border: 1px solid #00ff41;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #008f11;
                }
            `
        };

        // Apply the custom theme
        themeManager.setCustomTheme(matrixTheme);
        themeManager.setTheme('custom');
    }

    /**
     * Called when plugin is disabled
     */
    async onDisable(context) {
        console.log('[MatrixTheme] Plugin Disabled');
        
        // Restore original custom theme if it existed, or switch to system theme
        if (this.originalTheme) {
            themeManager.setCustomTheme(this.originalTheme);
        } else {
            // Reset to default/system theme if no previous custom theme
            themeManager.setTheme('system');
        }
    }
}

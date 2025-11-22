class BaseThemeConfig {
  static primaryColor = "#F7374F"
  static secondaryColor
  static backgroundColor
  static textColor
  
  static _font = "Quicksand"

  static get font(){
    return `${this._font}-Regular`
  }
  static get fontBold(){
    return `${this._font}-Bold`
  }
  static get fontLight(){
    return `${this._font}-Light`
  }

}

export class ModalTheme extends BaseThemeConfig{
  static backgroundColor = "#fff"
  static textColor = "#19183B"
  static iconColor = "#DC143C"
  static _font = "Lato"
}


export class LoginTheme extends BaseThemeConfig{
    static primaryColor = "#FF0066"
    static secondaryColor = "#6A0066"
    static backgroundColor = null
    static textColor = "#000"
    static extraColor = "#7b7a7a"
}

export class SplashTheme extends BaseThemeConfig{
    static secondaryColor = "#6A0066"
    static backgroundColor = null
    static textColor = "#fff"
    static extraColor = "#E8D4B7"
}

export class DashboardTheme extends BaseThemeConfig {

    // --- I. Base Colors (Dark Mode Foundation) ---

    // Main background color for the entire app screen.
    static backgroundPrimary = '#0E0E12';

    // Background for cards, containers, and elevated surfaces.
    static surfaceCard = '#1D1D24';

    // Background for subtle elements like input fields, chips, or separators.
    static surfaceSecondary = '#2C2C35';

    // Primary text color for titles and critical data (High Contrast).
    static textPrimary = '#F0F0F5';

    // Secondary text color for labels, timestamps, and helper text (Subtle Contrast).
    static textSecondary = '#A3A3B4';

    // --- II. Accent & Interaction Colors (Gradient & Active States) ---

    // The starting point of the primary brand gradient (Vibrant Blue).
    static accentPrimaryStart = '#3E7BFF';

    // The ending point of the primary brand gradient (Vibrant Violet).
    static accentPrimaryEnd = '#7E57FF';

    // Color for mini trend sparklines and subtle highlights.
    static accentSparkline = '#C7C7FF';

    // --- III. Status & Severity Colors ---

    // P1 / Critical Incidents (Red)
    static statusCritical = '#FF4D4D';
    static statusCriticalLight = 'rgba(255, 77, 77, 0.1)'; // For subtle backgrounds or fills

    // P2 / High Incidents (Orange)
    static statusHigh = '#FFB347';
    static statusHighLight = 'rgba(255, 179, 71, 0.1)';

    // P3 / Medium Incidents (Yellow)
    static statusMedium = '#EBC958';

    // P4 / Low / Info Incidents (Teal/Cyan)
    static statusLow = '#4ECDC4';

    // --- IV. Functional Colors ---

    // For positive outcomes, success messages, or 'All Clear' states (Green)
    static functionalSuccess = '#4CAF50'; 

    // For warnings, maintenance, or caution states (Yellow, similar to statusMedium)
    static functionalWarning = '#EBC958';
    static progress = "#00FF9D"

    // For error messages or failed actions (Red, similar to statusCritical)
    static functionalError = '#FF4D4D';
    static _font_2 = "FiraCode"
    static _font ="OpenSans"
    static get font2(){
      return `${this._font_2}-Regular`
    }
    static get fontBold2(){
      return `${this._font_2}-Bold`
    }
    static get fontLight2(){
      return `${this._font2}-Light`
    }

}

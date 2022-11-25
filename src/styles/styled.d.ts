import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    borderColor: string;
    accentColor: string;
    accentBackgroundColor: string;
    accentLightColor: string;
  }
}
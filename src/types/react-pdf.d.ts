// Type definitions for @react-pdf/renderer
declare module "@react-pdf/renderer" {
  import React from "react";

  export interface PDFDownloadLinkProps {
    document: React.ReactElement;
    fileName?: string;
    children: (params: {
      loading: boolean;
      url: string | null;
      error: Error | null;
    }) => React.ReactNode;
  }

  export const PDFDownloadLink: React.ComponentType<PDFDownloadLinkProps>;

  export interface StyleSheet {
    create<T>(styles: { [K in keyof T]: any }): T;
  }

  export const StyleSheet: StyleSheet;

  export interface FontStyle {
    src: string;
    fontWeight?: number | string;
  }

  export interface FontFamily {
    family: string;
    fonts: FontStyle[];
  }

  export const Font: {
    register: (font: FontFamily) => void;
  };

  export interface PageProps {
    size?: string;
    style?: any;
    children: React.ReactNode;
  }

  export const Page: React.ComponentType<PageProps>;

  export interface DocumentProps {
    children: React.ReactNode;
  }

  export const Document: React.ComponentType<DocumentProps>;

  export interface TextProps {
    style?: any;
    children?: React.ReactNode;
  }

  export const Text: React.ComponentType<TextProps>;

  export interface ViewProps {
    style?: any;
    children?: React.ReactNode;
  }

  export const View: React.ComponentType<ViewProps>;

  export interface LinkProps {
    src?: string;
    style?: any;
    children?: React.ReactNode;
  }

  export const Link: React.ComponentType<LinkProps>;
}

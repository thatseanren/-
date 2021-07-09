import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheets } from "@material-ui/styles"
import React from "react";

export default class MyCocument extends Document {
    static async getInitialProps(ctx) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
            })

        const initialProps = await Document.getInitialProps(ctx)
        return {
            ...initialProps,
            Styles: [...React.Children.toArray(initialProps.Styles), sheets.getStyleElement()]
        }
    }
}
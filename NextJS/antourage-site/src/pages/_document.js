import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* eslint-disable @next/next/no-css-tags */}
          <link
            rel="stylesheet"
            href="//cameratag.com/static/14/cameratag.css"
          />

          {/* eslint-disable @next/next/no-sync-scripts */}
          <script
            src="//cameratag.com/api/v14/js/cameratag.min.js"
            type="text/javascript"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

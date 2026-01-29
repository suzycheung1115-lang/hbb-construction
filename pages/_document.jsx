import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class SandBox extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon and icons for different platforms */}
          <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/img/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/img/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/img/favicon/site.webmanifest" />
          {/* Century Gothic is a system font, no need for Google Fonts import */}
          {/* If you need to load Century Gothic from a CDN or local file, add it here */}
        </Head>
        <body>
          {/* Main React app content will be injected here */}
          <Main />
          {/* Scripts required by Next.js will be injected here */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Optional: Customize initial document props (mostly used for server-side rendering extensions)
SandBox.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // Enhance app/component rendering if needed
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => App,               // You can wrap your App component here
      enhanceComponent: (Component) => Component // You can wrap individual components here
    });

  // Get default initial props from Next.js
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};

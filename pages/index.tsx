import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/home.css" />
      </Head>

      <main className="coming-soon">
        <div className="content">
          <div className="icon-wrapper">
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M480 288c0-80.25-49.28-148.92-119.19-177.62L320 192V80a16 16 0 0 0-16-16h-96a16 16 0 0 0-16 16v112l-40.81-81.62C81.28 139.08 32 207.75 32 288v64h448zm16 96H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h480a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
            </svg>
          </div>
          <h1 className="title">We're working on it!</h1>
          <p className="text">This site is currently under construction.</p>
          <p className="text">Please check back soon.</p>
        </div>
      </main>
    </>
  );
}

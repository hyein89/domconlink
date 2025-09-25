// pages/[imgCode]/[title].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import Script from "next/script"; // ✅ untuk script lazyload
import { decodeBase58 } from "../../lib/base58";

type Props = {
  imageUrl: string;
  pageTitle: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const imgCode = params?.imgCode as string | undefined;
  const titleParam = params?.title as string | undefined;

  if (!imgCode || !titleParam) {
    return { notFound: true };
  }

  try {
    const decoded = decodeBase58(imgCode);
    if (!/^https?:\/\//i.test(decoded)) throw new Error("invalid image url");

    const cleanTitle = titleParam.replace(/\.html$/i, "").replace(/-/g, " ");
    return {
      props: { imageUrl: decoded, pageTitle: cleanTitle },
    };
  } catch {
    return { notFound: true };
  }
};

export default function ImagePage({ imageUrl, pageTitle }: Props) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image:alt" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="stylesheet" href="/loading.css" />
      </Head>

      {/* preload hidden img */}
      <div style={{ display: "none" }}>
        <img src={`${imageUrl}?resize=720,512`} alt="" />
        <img src="https://i0.wp.com/domconlink.vercel.app/829e1d9f6758e0399cfaf4150cc83429.gif?resize=720,512" alt="" />
      </div>

      {/* loader */}
      <section>
        <div className="loader">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{ ["--i" as any]: i + 1 }}></span>
          ))}
        </div>
      </section>

      {/* lazyload script */}
      <Script id="lazyload">
        {`
          document.addEventListener("DOMContentLoaded", function() {
            var lazyloadImages = document.querySelectorAll("img.lazy");    
            var lazyloadThrottleTimeout;
            function lazyload () {
              if(lazyloadThrottleTimeout) clearTimeout(lazyloadThrottleTimeout);    
              lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                  if(img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                  }
                });
                if(lazyloadImages.length == 0) {
                  document.removeEventListener("scroll", lazyload);
                  window.removeEventListener("resize", lazyload);
                  window.removeEventListener("orientationChange", lazyload);
                }
              }, 20);
            }
            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
          });
        `}
      </Script>
    </>
  );
}

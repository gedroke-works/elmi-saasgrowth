
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const pageview = (GA_MEASUREMENT_ID : string, url : string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};
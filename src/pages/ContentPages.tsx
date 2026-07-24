import { Link } from "react-router-dom";
import { contact, copy, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

type ContentPageProps = {
  kind: "about" | "residential" | "commercial";
};

const content = {
  about: {
    title: {
      en: "Practical product help. Local support.",
      zh: "实用产品建议，本地团队支持。",
    },
    intro: {
      en: "We help Australian project teams find the right building products sooner.",
      zh: "我们帮助澳大利亚项目团队更快找到合适的建筑产品。",
    },
    heading: { en: "Clear choices, earlier", zh: "更早明确选择" },
    body: {
      en: "Tell us the application, substrate and finish. We’ll help narrow the range and point you to the useful product information.",
      zh: "告诉我们应用、基面与饰面要求，我们将缩小产品范围并提供实用信息。",
    },
  },
  residential: {
    title: { en: "Products for homes that work hard.", zh: "适合日常使用的住宅产品。" },
    intro: {
      en: "Options for wet areas, balconies, outdoor spaces and interiors.",
      zh: "适用于湿区、阳台、户外空间与室内的产品。",
    },
    heading: { en: "Choose with confidence", zh: "更有把握地选择" },
    body: {
      en: "Call us with the application and finish you need. We’ll help compare the practical trade-offs.",
      zh: "来电说明应用与饰面要求，我们帮您比较实际取舍。",
    },
  },
  commercial: {
    title: { en: "Performance that fits the job.", zh: "性能适合项目。" },
    intro: {
      en: "Product support for offices, retail, hospitality and public spaces.",
      zh: "为办公、零售、酒店餐饮与公共空间提供产品支持。",
    },
    heading: { en: "Get to a shortlist faster", zh: "更快形成候选清单" },
    body: {
      en: "Share the exposure, traffic and finish requirements. We’ll help focus the product choice.",
      zh: "提供暴露环境、人流与饰面要求，我们帮您聚焦产品选择。",
    },
  },
} as const;

export const ContentPage = ({ kind }: ContentPageProps) => {
  const locale = useLocale();
  const page = content[kind];
  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <h1>{t(page.title, locale)}</h1>
        <p>{t(page.intro, locale)}</p>
      </header>
      <section className={styles.story}>
        <h2>{t(page.heading, locale)}</h2>
        <p>{t(page.body, locale)}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={contact.phoneHref}>
            {t(copy.common.call, locale)}
          </a>
          {kind !== "about" && (
            <Link className={styles.textLink} to={withLocale("/products", locale)}>
              {t(copy.common.explore, locale)}
            </Link>
          )}
        </div>
      </section>
      {kind === "about" && (
        <figure className={styles.editorialImage}>
          <img
            src="/images/scraped/photo_1552664730_d307ca884978_91e34f5057.avif"
            alt={locale === "zh" ? "CITAMAT 团队协作" : "CITAMAT team collaboration"}
            loading="lazy"
          />
        </figure>
      )}
    </div>
  );
};

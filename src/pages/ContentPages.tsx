import { Link } from "react-router-dom";
import { copy, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

type ContentPageProps = {
  kind: "about" | "residential" | "commercial";
};

const content = {
  about: {
    eyebrow: { en: "About CITAMAT", zh: "关于 CITAMAT" },
    title: {
      en: "Thirty years close to the way Australia builds.",
      zh: "三十年，贴近澳大利亚的建造方式。",
    },
    intro: {
      en: "CITAMAT connects Australian projects with focused building material systems and practical local support.",
      zh: "CITAMAT 将专注的建筑材料系统与本地务实支持带给澳大利亚项目。",
    },
    heading: { en: "Clarity at the point of choice", zh: "在选材节点提供清晰方向" },
    body: {
      en: "Building products are rarely chosen in isolation. Substrate, exposure, installation skill, programme and finish all matter. Our role is to ask the useful questions early, make the shortlist smaller and connect project teams with the right technical information.",
      zh: "建筑产品很少能脱离项目条件单独选择。基面、暴露环境、施工能力、工期和最终效果都很重要。我们的工作是在早期提出有用的问题，缩小候选范围，并为项目团队连接适合的技术信息。",
    },
  },
  residential: {
    eyebrow: { en: "Residential", zh: "住宅方案" },
    title: { en: "Materials selected around everyday living.", zh: "围绕日常生活选择材料。" },
    intro: {
      en: "Practical systems for wet areas, balconies, outdoor living and expressive interiors.",
      zh: "适用于湿区、阳台、户外生活与个性化室内空间的实用系统。",
    },
    heading: { en: "Designed for the whole-life outcome", zh: "关注整个使用周期" },
    body: {
      en: "Residential choices need to balance installation, maintenance, comfort and appearance. We help builders, designers and homeowners compare those trade-offs before the work begins.",
      zh: "住宅选材需要平衡施工、维护、舒适度与外观。我们帮助建造商、设计师和业主在开工前看清这些取舍。",
    },
  },
  commercial: {
    eyebrow: { en: "Commercial", zh: "商业方案" },
    title: { en: "Performance that fits the programme.", zh: "性能适配项目进度。" },
    intro: {
      en: "Focused material support for offices, retail, hospitality and public-facing environments.",
      zh: "面向办公、零售、酒店餐饮与公共空间的专注材料支持。",
    },
    heading: { en: "Fewer specification gaps", zh: "减少规格信息缺口" },
    body: {
      en: "Commercial teams need clear performance information and predictable installation. We help align the material direction with exposure, traffic, sequencing and finish expectations.",
      zh: "商业项目团队需要清晰的性能信息与可预期的施工过程。我们协助将材料方向与暴露环境、人流强度、工序和效果预期对齐。",
    },
  },
} as const;

export const ContentPage = ({ kind }: ContentPageProps) => {
  const locale = useLocale();
  const page = content[kind];
  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <span className={styles.eyebrow}>{t(page.eyebrow, locale)}</span>
        <h1>{t(page.title, locale)}</h1>
        <p>{t(page.intro, locale)}</p>
      </header>
      <section className={styles.story}>
        <h2>{t(page.heading, locale)}</h2>
        <p>{t(page.body, locale)}</p>
        {kind !== "about" && (
          <div className={styles.actions}>
            <Link className={styles.primary} to={withLocale("/contact", locale)}>
              {t(copy.common.enquire, locale)}
            </Link>
            <Link className={styles.textLink} to={withLocale("/products", locale)}>
              {t(copy.common.explore, locale)}
            </Link>
          </div>
        )}
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

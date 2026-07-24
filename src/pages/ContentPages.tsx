import { Link, useParams } from "react-router-dom";
import { copy, projects, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import { NotFound } from "./ProductDetail";
import styles from "./Page.module.scss";

type ContentPageProps = {
  kind: "about" | "solutions" | "residential" | "commercial" | "projects";
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
  solutions: {
    eyebrow: { en: "Project solutions", zh: "项目解决方案" },
    title: {
      en: "One brief. A coordinated material direction.",
      zh: "一份需求，形成协调的材料方向。",
    },
    intro: {
      en: "Bring the project context together before comparing individual products.",
      zh: "先整合项目条件，再比较单个产品。",
    },
    heading: { en: "From context to shortlist", zh: "从项目条件到材料清单" },
    body: {
      en: "Share the building type, application, substrate, exposure, programme and desired finish. We use that context to identify a practical shortlist across waterproofing, composite surfaces and decorative finishes.",
      zh: "提供建筑类型、应用部位、基面、暴露环境、工期和目标效果。我们据此从防水、塑木与装饰饰面中形成实用的候选清单。",
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
  projects: {
    eyebrow: { en: "Project cases", zh: "项目案例" },
    title: { en: "See the application, not just the product.", zh: "不只看产品，也看应用场景。" },
    intro: {
      en: "A selection of public, commercial and residential contexts.",
      zh: "精选公共、商业与住宅应用场景。",
    },
    heading: { en: "Selected projects", zh: "精选项目" },
    body: {
      en: "Explore how material requirements change across building types and environments.",
      zh: "了解材料需求如何随建筑类型与环境变化。",
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
        {kind !== "about" && kind !== "projects" && (
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
      {kind === "projects" && (
        <section className={styles.section}>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <Link
                className={styles.projectCard}
                key={project.slug}
                to={withLocale(`/cases/${project.slug}`, locale)}
              >
                <img src={project.image} alt="" />
                <div>
                  <small>{t(project.type, locale)}</small>
                  <h3>{t(project.name, locale)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export const CaseStudy = () => {
  const locale = useLocale();
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return <NotFound />;
  }
  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <span className={styles.eyebrow}>{t(project.type, locale)}</span>
        <h1>{t(project.name, locale)}</h1>
        <p>
          {locale === "zh"
            ? "案例概览：项目环境、材料方向与关键选择因素。"
            : "A project overview covering context, material direction and the factors shaping selection."}
        </p>
      </header>
      <div className={styles.detailVisual}>
        <img src={project.image} alt="" />
      </div>
      <section className={styles.story}>
        <h2>{locale === "zh" ? "项目背景" : "Project context"}</h2>
        <p>
          {locale === "zh"
            ? "不同项目对耐久性、施工顺序、维护与设计效果有不同要求。CITAMAT 通过早期确认应用条件，帮助项目团队将关注点放在适合的材料系统上。"
            : "Every project balances durability, sequencing, maintenance and design intent differently. CITAMAT helps project teams focus on suitable material systems by establishing the application conditions early."}
        </p>
        <Link className={styles.primary} to={withLocale("/contact", locale)}>
          {t(copy.common.enquire, locale)}
        </Link>
      </section>
    </div>
  );
};

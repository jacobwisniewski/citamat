import { Link } from "react-router-dom";
import { brands, categories, copy, products, projects, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

export const Home = () => {
  const locale = useLocale();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            {locale === "zh" ? "澳大利亚建筑材料合作伙伴" : "Australian building materials partner"}
          </span>
          <h1>
            {locale === "zh"
              ? "选对材料，项目少走弯路。"
              : "The right material system. Without the costly guesswork."}
          </h1>
          <p>
            {locale === "zh"
              ? "告诉我们项目类型、基面与目标，我们将从可靠的防水、塑木和装饰系统中为您缩小选择范围。"
              : "Tell us the project, substrate and outcome. We’ll narrow the choice across proven waterproofing, composite and decorative systems."}
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to={withLocale("/contact", locale)}>
              {t(copy.common.enquire, locale)} <span>→</span>
            </Link>
            <Link className={styles.secondary} to={withLocale("/products", locale)}>
              {t(copy.common.explore, locale)}
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroFrame}>
            <img src="/images/hero.avif" alt="" />
          </div>
        </div>
      </section>

      <div className={styles.proofBar}>
        <div>
          <strong>{locale === "zh" ? "本地项目支持" : "Local project support"}</strong>
          <span>
            {locale === "zh" ? "墨尔本团队直接响应" : "Direct access to the Melbourne team"}
          </span>
        </div>
        <div>
          <strong>{locale === "zh" ? "系统化选择" : "System-led selection"}</strong>
          <span>
            {locale === "zh" ? "按应用与基面推荐" : "Matched to application and substrate"}
          </span>
        </div>
        <div>
          <strong>{locale === "zh" ? "品牌组合" : "Focused brand portfolio"}</strong>
          <span>
            {locale === "zh" ? "防水、塑木与装饰饰面" : "Waterproofing, composite and finishes"}
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>
            {locale === "zh"
              ? "从项目问题出发，而不是从产品清单出发。"
              : "Start with the project problem, not a product list."}
          </h2>
          <p>
            {locale === "zh"
              ? "我们将材料性能、施工环境与设计目标放在一起考虑，让选材更快、更清晰。"
              : "We consider performance, site conditions and design intent together—making specification faster and clearer."}
          </p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link
              className={styles.categoryCard}
              key={category.slug}
              to={withLocale(`/products?category=${category.category}`, locale)}
            >
              <span>{category.icon}</span>
              <h3>{t(category.title, locale)}</h3>
              <p>{t(category.text, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.sectionIntro}>
          <h2>
            {locale === "zh"
              ? "三个专注领域，一个项目伙伴。"
              : "Three focused disciplines. One project partner."}
          </h2>
          <p>
            {locale === "zh"
              ? "精简的品牌组合让技术支持更深入，也让决策更简单。"
              : "A focused portfolio means deeper product knowledge and simpler decisions."}
          </p>
        </div>
        <div className={styles.brandGrid}>
          {brands.map((brand) => (
            <Link
              className={styles.brandCard}
              key={brand.slug}
              to={withLocale(`/brands/${brand.slug}`, locale)}
            >
              <img src={brand.logo} alt={brand.name} />
              <h3>{brand.name}</h3>
              <p>{t(brand.description, locale)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>{locale === "zh" ? "常用项目系统" : "Frequently specified systems"}</h2>
          <p>
            {locale === "zh"
              ? "先了解应用，再查看适合的性能与施工特性。"
              : "Begin with the application, then compare the performance and installation fit."}
          </p>
        </div>
        <div className={styles.productGrid}>
          {products.slice(0, 3).map((product) => (
            <Link
              className={styles.productCard}
              key={product.slug}
              to={withLocale(`/products/${product.slug}`, locale)}
            >
              <div
                className={`${styles.productImage} ${
                  product.category === "waterproofing" ? styles.packagingImage : ""
                }`}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className={styles.cardBody}>
                <small>{brands.find((brand) => brand.slug === product.brand)?.name}</small>
                <h3>{product.name}</h3>
                <p>{t(product.summary, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>{locale === "zh" ? "材料在真实空间中的表现" : "Materials in real spaces"}</h2>
          <p>
            {locale === "zh"
              ? "从公共场馆到多户住宅，查看不同应用场景。"
              : "From public venues to multi-residential projects, explore the application context."}
          </p>
        </div>
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

      <section className={styles.offer}>
        <div>
          <h2>
            {locale === "zh"
              ? "把项目需求发给我们，获得一份更短、更适合的材料清单。"
              : "Send the project brief. Get a shorter, better-fit material shortlist."}
          </h2>
          <p>
            {locale === "zh"
              ? "这是选材建议，不是强制销售。信息越具体，我们给出的方向越有用。"
              : "It’s a practical selection conversation, not a hard sell. The more context you share, the more useful the direction."}
          </p>
        </div>
        <Link className={styles.primary} to={withLocale("/contact", locale)}>
          {t(copy.common.enquire, locale)} <span>→</span>
        </Link>
      </section>
    </div>
  );
};

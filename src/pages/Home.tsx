import { Link } from "react-router-dom";
import { brands, categories, contact, copy, products, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

export const Home = () => {
  const locale = useLocale();

  return (
    <div className={styles.page}>
      <section className={styles.hero} data-theme="dark">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            {locale === "zh" ? "澳大利亚建筑材料" : "Materials for Australian builds"}
          </span>
          <h1>
            {locale === "zh"
              ? "选对系统，安心施工。"
              : "Choose the right system. Build with confidence."}
          </h1>
          <p>
            {locale === "zh"
              ? "需要防水、塑木或饰面？来电说明项目，我们帮您缩小选择范围。"
              : "Waterproofing, decking or finishes—call us with your project. We’ll narrow the options."}
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href={contact.phoneHref}>
              {t(copy.common.call, locale)} <span>→</span>
            </a>
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
          <strong>{locale === "zh" ? "直接沟通" : "Talk to Melbourne"}</strong>
          <span>{locale === "zh" ? "本地团队项目建议" : "Direct project guidance"}</span>
        </div>
        <div>
          <strong>{locale === "zh" ? "更快筛选" : "A faster shortlist"}</strong>
          <span>{locale === "zh" ? "按应用与基面匹配" : "Matched to use and substrate"}</span>
        </div>
        <div>
          <strong>{locale === "zh" ? "三类产品" : "Three product areas"}</strong>
          <span>
            {locale === "zh" ? "防水、塑木与装饰饰面" : "Waterproofing, composite and finishes"}
          </span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>{locale === "zh" ? "告诉我们您要建什么。" : "Tell us what you’re building."}</h2>
          <p>
            {locale === "zh"
              ? "我们根据应用、基面与饰面要求，提供实用的产品方向。"
              : "We’ll match the application, substrate and finish to a practical product shortlist."}
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

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>{locale === "zh" ? "常用产品" : "Popular products"}</h2>
          <p>
            {locale === "zh"
              ? "快速比较要点。来电确认是否适合您的项目。"
              : "Compare the essentials. Call us to confirm the right fit."}
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
                  product.category !== "composite" ? styles.packagingImage : ""
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

      <section className={styles.offer}>
        <div>
          <h2>
            {locale === "zh" ? "不确定选哪款？直接来电。" : "Not sure which product fits? Call us."}
          </h2>
          <p>
            {locale === "zh"
              ? "几分钟沟通，就能更快找到适合项目的方向。"
              : "A quick conversation can save hours of product comparison."}
          </p>
        </div>
        <a className={styles.primary} href={contact.phoneHref}>
          {t(copy.common.call, locale)} <span>→</span>
        </a>
      </section>
    </div>
  );
};

import { Link, useParams } from "react-router-dom";
import { brands, contact, copy, products, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

export const ProductDetail = () => {
  const locale = useLocale();
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const brand = brands.find((item) => item.slug === product.brand);

  return (
    <article className={styles.detail}>
      <div
        className={`${styles.detailVisual} ${
          product.category !== "composite" ? styles.packagingDetail : ""
        }`}
      >
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.detailBody}>
        <span className={styles.eyebrow}>{brand?.name}</span>
        <h1>{product.name}</h1>
        <p>{t(product.summary, locale)}</p>
        <div className={styles.specs}>
          <div>
            <h2>{locale === "zh" ? "主要特性" : "Key features"}</h2>
            <ul>
              {product.features.map((feature) => (
                <li key={feature.en}>{t(feature, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{locale === "zh" ? "常见应用" : "Typical applications"}</h2>
            <ul>
              {product.applications.map((application) => (
                <li key={application.en}>{t(application, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href={contact.phoneHref}>
            {t(copy.common.call, locale)}
          </a>
          <Link
            className={styles.textLink}
            to={`${withLocale("/contact", locale)}?subject=${encodeURIComponent(product.name)}`}
          >
            {t(copy.common.enquire, locale)}
          </Link>
          <Link className={styles.textLink} to={withLocale("/products", locale)}>
            {locale === "zh" ? "返回产品" : "Back to products"}
          </Link>
        </div>
      </div>
    </article>
  );
};

export const NotFound = () => {
  const locale = useLocale();
  return (
    <section className={styles.notFound}>
      <strong>404</strong>
      <h1>{locale === "zh" ? "未找到该页面" : "Page not found"}</h1>
      <Link className={styles.primary} to={withLocale("/", locale)}>
        {locale === "zh" ? "返回首页" : "Return home"}
      </Link>
    </section>
  );
};

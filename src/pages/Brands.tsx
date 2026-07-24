import { Link, useParams } from "react-router-dom";
import { brands, products, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import { NotFound } from "./ProductDetail";
import styles from "./Page.module.scss";

export const Brands = () => {
  const locale = useLocale();
  return (
    <div className={styles.page}>
      <header className={styles.compactHero}>
        <span className={styles.eyebrow}>{locale === "zh" ? "合作品牌" : "Brand partners"}</span>
        <h1>{locale === "zh" ? "更专注的产品组合。" : "A more focused product portfolio."}</h1>
        <p>
          {locale === "zh"
            ? "我们围绕三个互补领域建立产品组合，提供更深入的项目支持。"
            : "Our portfolio is built around three complementary disciplines so project support can go deeper."}
        </p>
      </header>
      <section className={styles.darkSection}>
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
    </div>
  );
};

type BrandDetailProps = {
  fixedSlug?: string;
};

export const BrandDetail = ({ fixedSlug }: BrandDetailProps) => {
  const locale = useLocale();
  const { slug } = useParams();
  const activeSlug = fixedSlug ?? slug;
  const brand = brands.find((item) => item.slug.toLowerCase() === activeSlug?.toLowerCase());
  if (!brand) {
    return <NotFound />;
  }
  const range = products.filter((item) => item.brand === brand.slug);

  return (
    <div className={styles.page}>
      <header className={styles.compactHero}>
        <span className={styles.eyebrow}>{t(brand.category, locale)}</span>
        <h1>{brand.name}</h1>
        <p>{t(brand.description, locale)}</p>
      </header>
      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>{locale === "zh" ? "精选产品" : "Selected range"}</h2>
          <p>
            {locale === "zh"
              ? "浏览当前系列，或联系我们讨论项目适配。"
              : "Browse the current range or contact us to discuss project fit."}
          </p>
        </div>
        <div className={styles.productGrid}>
          {range.map((product) => (
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
                <small>{brand.name}</small>
                <h3>{product.name}</h3>
                <p>{t(product.summary, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

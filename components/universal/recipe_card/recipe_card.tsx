import Link from "next/link";
import { CustomImage } from "../../utils/image";
import styles from "./recipe_card.module.css";
import noimage from "../../../public/media/logo.png";
import { play } from "../../../public/icons";
import { useContext } from "react";
import { TranslationsContext } from "../../../contexts/translations";

export function RecipeCard({ recipe }: { recipe: any }) {
  const { t } = useContext(TranslationsContext);

  return (
    <Link href={`/${recipe.slug}`} className={styles.card}>
      <div className={styles.card_img}>
        <CustomImage
          source={recipe.image ? recipe.image : noimage}
          alt={recipe.title}
          width={330}
          height={320}
        />
      </div>
      <div className={styles.card_content}>
        <p className={styles.card_title}>{recipe.title}</p>
        <p className={`subtitle ${styles.card_subtitle}`}>{recipe.subtitle}</p>
        <p className={styles.tipa_link}>
          {play} {t["main.view_recipe"]}
        </p>
      </div>
    </Link>
  );
}

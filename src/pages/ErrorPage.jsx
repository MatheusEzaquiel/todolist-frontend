import { useRouteError } from "react-router-dom";

import styles from "./ErrorPage.module.css"
import image from "./../assets/img/errorpage-figure.svg"

export default function ErrorPage() {

  const error = useRouteError();
  console.error(error);

  return (

    <section className={styles.section}>

      <div className={styles.content}>
        <img className={styles.imageError} src={image} alt="" />
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.text}>An unexpected error has occurred. Come back to homepage and try again <a className={styles.errorMessage} href="/">home</a></p>
        <p>
          <i>Error: Page {error.statusText || error.message}</i>
        </p>
      </div>


    </section>

    
  );
}
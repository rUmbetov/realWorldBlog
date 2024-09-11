import styles from './_titleForm.module.scss';

const FormTitle = ({ title }) => (
  <div className={styles.title}>
    <h3>{title}</h3>
  </div>
);

export default FormTitle;

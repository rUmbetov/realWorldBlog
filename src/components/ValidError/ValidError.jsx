import styles from './_validError.module.scss';
const ValidError = ({ message }) => {
  return <p className={styles.validError}>{message}</p>;
};
export default ValidError;

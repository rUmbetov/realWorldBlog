import FormTitle from '../FormTitle';
import styles from '../_editPage.module.scss';

import EditProfileForm from './EditProfileForm';

const EditProfilePage = () => {
  return (
    <>
      <div className={styles.userAuth}>
        <FormTitle title="Edit Profile" />
        <EditProfileForm />
      </div>
    </>
  );
};
export default EditProfilePage;

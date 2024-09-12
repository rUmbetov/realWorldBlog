import { Button } from 'antd';

import ValidError from '../../components/ValidError/ValidError';

import styles from './_form.module.scss';

const CreatePostForm = ({ tags, register, handleSubmit, handleSend, errors, setTags }) => {
  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleTagChange = (index, event) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };
  return (
    <form className={styles.createForm} onSubmit={handleSubmit(handleSend)}>
      <label className={styles.createLabel}>
        Title
        <input
          placeholder="Title"
          className={styles.createInput}
          {...register('title', {
            required: 'Это поле обязательно',
          })}
        />
        {errors.title && <ValidError message={errors.title.message} />}
      </label>
      <label className={styles.createLabel}>
        Short description
        <input
          className={styles.createInput}
          placeholder="Short description"
          {...register('description', {
            required: 'Это поле обязательно',
          })}
        />
        {errors.descriptions && <ValidError message={errors.descriptions.message} />}
      </label>
      <label className={styles.createLabel}>
        Text
        <textarea
          className={styles.postBody}
          placeholder="Text"
          {...register('body', {
            required: 'Это поле обязательно',
          })}
        ></textarea>
        {errors.body && <ValidError message={errors.body.message} />}
      </label>

      <label className={styles.createLabel}>
        Tags
        {tags.map((tag, index) => (
          <div key={index} className={styles.tagInputWrapper}>
            <input
              className={styles.createTagInput}
              value={tag}
              placeholder="Tag"
              onChange={(e) => handleTagChange(index, e)}
            />
            {tags.length > 1 && (
              <Button danger onClick={() => handleRemoveTag(index)} className={styles.deleteTagButton}>
                Delete
              </Button>
            )}
          </div>
        ))}
        <Button type="primary" onClick={handleAddTag} className={styles.addTagButton}>
          Add Tag
        </Button>
      </label>

      <Button type="primary" htmlType="submit" className={styles.createButton}>
        Send
      </Button>
    </form>
  );
};

export default CreatePostForm;

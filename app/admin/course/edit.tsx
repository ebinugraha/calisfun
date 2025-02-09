import { Edit, required, SimpleForm, TextInput } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title"  label="Title" validate={[required()]}/>
        <TextInput source="imageSrc" label="Image"  validate={[required()]}/>
        <TextInput source="description" label="Description"  validate={[required()]}/>
      </SimpleForm>
    </Edit>
  );
};

import { Create, ReferenceInput, required, SimpleForm, TextInput } from "react-admin";

export const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title"  label="Title" validate={[required()]}/>
        <TextInput source="description" label="Description"  validate={[required()]}/>
        <ReferenceInput source="courseId" reference="courses" label="Course"/>
      </SimpleForm>
    </Create>
  );
};

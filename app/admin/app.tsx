"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitsList } from "./units/list";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="courses" list={CourseList} recordRepresentation={"title"} create={CourseCreate} edit={CourseEdit} />
      <Resource name="units" list={UnitsList} recordRepresentation={"title"} create={CourseCreate}/>
    </Admin>
  );
};

export default App;

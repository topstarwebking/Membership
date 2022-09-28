import React from "react";
import { Card, CardBody } from "reactstrap";
import CreateStudentForm from "./createStudent";
import "../../../assets/scss/pages/users.scss";

const CreateMembermain = () => {
  return (
    <div>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-left mb-0">
                {"New Student"}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Card>
        <CardBody className="pt-2">
          <CreateStudentForm update={false} isCreate={true} />
        </CardBody>
      </Card>
    </div>
  );
};
export default CreateMembermain;

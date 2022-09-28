import React, { Fragment, useEffect, useState } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import {
  ADD_NEW_STUDENT,
  UPDATE_STUDENT,
} from "../../../redux/actions/newstudent";
import {
  GET_CATEGORIES,
  GET_PROGRAM_LIST,
} from "../../../redux/actions/programe";
import {
  GET_ACTIVE_STUDENT_INFO,
  GET_LEADS_TRACKING,
  GET_AFTER_CAMPS,
} from "../../../redux/actions/member";
import usaStateCity from "./usa-state-list/startAndCity.json";
import { CardContent, Grid, Card, Typography } from "@material-ui/core";
import InfoPreViewCard from "./components/infoPreViewcard";
import ProfileInput from "./components/profileInputs";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileAddress from "./components/profileAddress";
import ProfileSchoolInfo from "./components/profileSchoolInfo";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import { useHistory } from "react-router-dom";

function CreateStudent(props) {
  const { viewActiveStudentInfo, programList, getLeadTrackingList } = props;
  const history = useHistory()
  const [studentinfo, setStudentInfo] = useState(null);
  // const { studentId } = useParams();
  const [defaultprogram, setdefaultprogram] = useState(null);
  const [FilteredProgram, setFilteredProgram] = useState(null);
  const [listOfTwon, setlistOfTwon] = useState(null);
  const [isEdit, setIsEdit] = useState(!props?.update);
  const [isdisable, setIsdisable] = useState(false);
  let {
    GET_CATEGORIES,
    GET_PROGRAM_LIST,
    getstudentInfoById,
    GET_LEADS_TRACKING,
    GET_AFTER_CAMPS,
    update,
  } = props;
  useEffect(() => {
    GET_CATEGORIES();
    GET_PROGRAM_LIST();
    GET_LEADS_TRACKING();
    GET_AFTER_CAMPS();
    if (update) {
      // GET_ACTIVE_STUDENT_INFO(studentId);
    } else {
      setInitialState(viewActiveStudentInfo);
    }
    if (programList?.length) {
      setdefaultprogram(programList);
    }
  }, [
    GET_CATEGORIES,
    GET_PROGRAM_LIST,
    getstudentInfoById,
    GET_LEADS_TRACKING,
    GET_AFTER_CAMPS,
    update,
  ]);

  useEffect(() => {
    if (studentinfo?.studentType !== undefined) {
      filterProgram(viewActiveStudentInfo?.program);
    }
    setInitialState(viewActiveStudentInfo);
  }, [viewActiveStudentInfo]);
  useEffect(() => {
    if (studentinfo?.studentType !== undefined) {
      let afterFilter = usaStateCity?.filter(
        (item) => item["state"] === studentinfo?.state
      )[0];
      setlistOfTwon(afterFilter?.towns);
    }
  }, [studentinfo?.state]);
  const setInitialState = (viewActiveStudentInfo) => {
    if (viewActiveStudentInfo) {
      const {
        firstName,
        lastName,
        gender,
        dob,
        age,
        primaryPhone,
        email,
        secondaryNumber,
        street,
        zipPostalCode,
        town,
        country,
        notes,
        studentType,
        school,
        location,
        customId,
        intrested,
        program,
        category,
        subcategory,
        state,
        memberprofileImage,
        leadsTracking,
        after_camp,
        buyerInfo,
      } = viewActiveStudentInfo;
      setStudentInfo({
        firstName: props.update && firstName ? firstName : "",
        lastName: props.update && lastName ? lastName : "",
        gender: props.update && gender ? gender : "",
        dob: props.update && dob ? dob : new Date(),
        age: props.update && age ? age : "",
        primaryPhone: props.update && primaryPhone ? primaryPhone : "",
        email: props.update && email ? email : "",
        secondaryNumber: props.update && secondaryNumber ? secondaryNumber : "",
        street: props.update && street ? street : "",
        zipPostalCode: props.update && zipPostalCode ? zipPostalCode : "",
        town: props.update && town ? town : "",
        country: props.update && country ? country : "",
        notes: props.update && notes ? notes : "",
        studentType: props.update && studentType ? studentType : "Leads",
        school: props.update && school ? school : "",
        location: props.update && location ? location : "",
        customId: props.update && customId ? customId : "",
        intrested: props.update && intrested ? intrested : "",
        program:
          props.update && program ? program : programList[0]?.programName,
        category: props.update && category ? category : "",
        subcategory: props.update && subcategory ? subcategory : "",
        state: props.update && state ? state : "",
        leadsTracking: props.update && leadsTracking ? leadsTracking : [],
        memberProfileUrl:
          props.update && memberprofileImage ? memberprofileImage : "",
        after_camp: props.update && after_camp ? after_camp : [],
        buyerInfo:
          props.update && buyerInfo
            ? buyerInfo
            : {
                firstName: "",
                lastName: "",
                dob: new Date(),
                gender: "",
                age: "",
              },
      });
    }
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    if(['primaryPhone', 'secondaryNumber'].includes(name)){
      value = value.replace(/-/g, '')
    }
    setStudentInfo({
      ...studentinfo,
      [name]: value,
    });
  };
  const changeHandler2forbuyerinfo = (e) => {
    let { name, value } = e.target;
    setStudentInfo({
      ...studentinfo,
      buyerInfo: { ...studentinfo?.buyerInfo, [name]: value },
    });
  };
  const handleDateofBirth = (date) => {
    function getAge() {
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    let age = getAge();
    setStudentInfo({
      ...studentinfo,
      dob: date === null ? "" : new Date(date),
      age: age,
    });
    if (studentinfo?.dob < 18) {
      setIsdisable(true);
    } else {
      setIsdisable(true);
    }
  };
  const handleDateofBirth2 = (date) => {
    function getAge() {
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    let age = getAge();
    setStudentInfo({
      ...studentinfo,
      buyerInfo: {
        ...studentinfo.buyerInfo,
        dob: date === null ? "" : new Date(date),
        age: age,
      },
    });
  };

  const stateHandeler = (e, newValue) => {
    setStudentInfo({
      ...studentinfo,
      state: newValue.state,
    });
    setlistOfTwon(newValue?.towns);
  };
  const townHandler = (e, newValue) => {
    setStudentInfo({
      ...studentinfo,
      town: newValue.town,
    });
  };

  const handleRegister = async () => {
    let copyData = studentinfo;
    if (props.handlestudentImage !== null) {
      copyData.memberprofileImage = props.handlestudentImage;
    }
    if (copyData.age > 18) {
      copyData.buyerInfo = {
        firstName: studentinfo.firstName,
        lastName: studentinfo.lastName,
        age: studentinfo.age,
        dob: studentinfo.dob,
        gender: studentinfo.gender,
      };
    }
    delete copyData.memberProfileUrl;
    if (!props.update) {
      if (programList?.length > 0) {
        copyData["program"] = programList[0]?.programName;
      } else {
        copyData["program"] = "no program";
      }
    }
    let formData = new FormData();
    for (let key in copyData) {
      if (key === "after_camp") {
        formData.append(key, JSON.stringify(copyData[key]));
      } else if (key === "leadsTracking") {
        formData.append(key, JSON.stringify(copyData[key]));
      } else if (key === "buyerInfo") {
        formData.append(key, JSON.stringify(copyData[key]));
      } else {
        formData.append(key, copyData[key]);
      }
    }
    if (!props.update) {
      await props.ADD_NEW_STUDENT(formData);
    } else {
      history.updated = true
      await props.UPDATE_STUDENT(
        copyData?.studentType,
        formData,
        viewActiveStudentInfo?._id
      );
      setIsEdit(false);
    }
  };

  const filterProgram = (program) => {
    let filterProgram = programList?.filter(
      (item) => item?.programName === program
    )[0];
    setFilteredProgram({
      SelectProgramitem: filterProgram,
      program: filterProgram?.programName,
    });
    setStudentInfo({
      ...studentinfo,
      program: filterProgram?.programName,
    });
  };
  const changeHandlerfortags = (value) => {
    let data = studentinfo.after_camp;
    if (data.includes(value)) {
      let filteredState = data.filter((i) => i !== value);
      setStudentInfo({
        ...studentinfo,
        after_camp: filteredState,
      });
    } else {
      setStudentInfo({
        ...studentinfo,
        after_camp: [...studentinfo.after_camp, value],
      });
    }
  };
  const changeHandlerforleads = (value) => {
    let data = studentinfo.leadsTracking;
    if (data.includes(value)) {
      let filteredState = data.filter((i) => i !== value);
      setStudentInfo({
        ...studentinfo,
        leadsTracking: filteredState,
      });
    } else {
      setStudentInfo({
        ...studentinfo,
        leadsTracking: [...studentinfo.leadsTracking, value],
      });
    }
  };
  const handeEdit = () => {
    if (props?.handelIsEdit) {
      props.handelIsEdit();
    }
    setIsEdit(true);
  };

  return (
    <Fragment>
      <Card
        style={{
          boxShadow: "none",
          borderRadius: "0.8em",
        }}
      >
        <CardContent>
          {props?.isCreate ? null : (
            <div className="d-flex justify-content-between ">
              <div className="d-flex align-items-center">
                <ContactPhoneIcon style={{color:"#757575"}}/>
                <Typography
                  style={{ fontSize: "1.2em" }}
                  color="textSecondary"
                  className="mt-1 ml-1"
                >
                  Member Type
                </Typography>
              </div>
              <div>
                <Button.Ripple
                  color="primary"
                  style={{fontSize: "14px"}}
                  onClick={!isEdit ? handeEdit : handleRegister}
                >
                  {isEdit ? "Save" : "Edit"}
                </Button.Ripple>
              </div>
            </div>
          )}
          <Grid container spacing={2}>
            {props.isCreate ? (
              <Grid item sm={12} md={4} lg={3}>
                <div className="d-flex justify-content-center">
                  <Card
                    style={{
                      boxShadow: "0px 4px 25px 0px rgb(0 0 0 / 10%)",
                      height: "100%",
                      width: "100%",
                      margin: "8px",
                    }}
                  >
                    <CardContent className="pb-0">
                      <ProfileAvatar
                        isEdit={isEdit}
                        studentinfo={studentinfo}
                        viewActiveStudentInfo={viewActiveStudentInfo}
                        update={props.update}
                      />
                      <InfoPreViewCard studentinfo={getstudentInfoById} />
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ) : null}
            {props?.isCreate ? (
              <Grid item sm={9} md={9} lg={9}>
                {props.isCreate ? (
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex align-items-center">
                      <ContactPhoneIcon />
                      <Typography
                        style={{ fontSize: "1.2em" }}
                        color="textSecondary"
                        className="mt-1 ml-1"
                      >
                        Contact Info
                      </Typography>
                    </div>
                    <div>
                      <Button.Ripple
                        color="success"
                        onClick={!isEdit ? handeEdit : handleRegister}
                      >
                        {isEdit ? "Save" : "Edit"}
                      </Button.Ripple>
                    </div>
                  </div>
                ) : null}
                <ProfileInput
                  handleDateofBirth={handleDateofBirth}
                  studentinfo={studentinfo}
                  changeHandler={changeHandler}
                  update={props.update}
                  isEdit={isEdit}
                  stateHandeler={stateHandeler}
                  listOfTwon={listOfTwon}
                  townHandler={townHandler}
                />
                <ProfileAddress
                  handleDateofBirth={handleDateofBirth2}
                  isdisable={isdisable}
                  changeHandler2forbuyerinfo={changeHandler2forbuyerinfo}
                  studentinfo={studentinfo}
                  changeHandler={changeHandler}
                  stateHandeler={stateHandeler}
                  listOfTwon={listOfTwon}
                  townHandler={townHandler}
                  update={props.update}
                  isEdit={isEdit}
                />
                <div>
                  <ProfileSchoolInfo
                    changeHandlerfortags={changeHandlerfortags}
                    studentinfo={studentinfo}
                    changeHandler={changeHandler}
                    update={props.update}
                    getLeadTrackingList={getLeadTrackingList}
                    isEdit={isEdit}
                    changeHandlerforleads={changeHandlerforleads}
                  />
                </div>
              </Grid>
            ) : (
              <Grid item sm={12} md={12} lg={12}>
                {props.isCreate ? (
                  <div className="d-flex justify-content-between ">
                    <div className="d-flex align-items-center">
                      <ContactPhoneIcon />
                      <Typography
                        style={{ fontSize: "1.2em" }}
                        color="textSecondary"
                        className="mt-1 ml-1"
                      >
                        Contact Info
                      </Typography>
                    </div>
                    <div>
                      <Button.Ripple
                        color="success"
                        onClick={!isEdit ? handeEdit : handleRegister}
                      >
                        {isEdit ? "Save" : "Edit"}
                      </Button.Ripple>
                    </div>
                  </div>
                ) : null}
                <ProfileInput
                  handleDateofBirth={handleDateofBirth}
                  studentinfo={studentinfo}
                  changeHandler={changeHandler}
                  update={props.update}
                  isEdit={isEdit}
                  stateHandeler={stateHandeler}
                  listOfTwon={listOfTwon}
                  townHandler={townHandler}
                />

                <ProfileAddress
                  handleDateofBirth={handleDateofBirth2}
                  isdisable={isdisable}
                  changeHandler2forbuyerinfo={changeHandler2forbuyerinfo}
                  studentinfo={studentinfo}
                  changeHandler={changeHandler}
                  stateHandeler={stateHandeler}
                  listOfTwon={listOfTwon}
                  townHandler={townHandler}
                  update={props.update}
                  isEdit={isEdit}
                />
                <div>
                  <ProfileSchoolInfo
                    changeHandlerfortags={changeHandlerfortags}
                    studentinfo={studentinfo}
                    changeHandler={changeHandler}
                    update={props.update}
                    isEdit={isEdit}
                    changeHandlerforleads={changeHandlerforleads}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    programList: state.program.categoryList,
    viewActiveStudentInfo: state.member.viewActiveStudentInfo,
    getstudentInfoById: state.member.getstudentInfoById,
    handlestudentImage: state.student.handlestudentImage,
    getLeadTrackingList: state.member.getLeadTrackingList,
    getAfterCamps: state.member.getAfterCamps,
    getSummerCampList: state.member.getSummerCampList,
    getSpecialiatyProgram: state.member.getSpecialiatyProgram,
    getSpecialiatyProgram2: state.member.getSpecialiatyProgram2,
  };
};
export default connect(mapStateToProps, {
  ADD_NEW_STUDENT,
  UPDATE_STUDENT,
  GET_CATEGORIES,
  GET_PROGRAM_LIST,
  GET_LEADS_TRACKING,
  GET_AFTER_CAMPS,
  GET_ACTIVE_STUDENT_INFO,
})(CreateStudent);

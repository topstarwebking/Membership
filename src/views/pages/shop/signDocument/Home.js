import React, { useRef, useState } from 'react';
import HomePdfViewer from './components/home-pdfViewer.js';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import TargetBox from './components/TargetBox';
import { Grid, List, ListItem, Typography, Card, CardContent, Divider } from '@material-ui/core';
import MainAdditionalSigner from './components/addMMUSigner.js';
import AddAdditionalSigner from './components/Addinvite'
import MymeberSigner from './components/ListmymeberSigner.js';
import AdditonalSigner from './components/ListadditionalSigner'
import { ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER, REQUEST_USERS_FOR_SIGNATURE, SEND_INVITATION_TO_EMAIL_SIGNATURE } from '../../../../redux/actions/docuSign/index.js';
import { connect } from 'react-redux';
import HowToUseDocuSign from './components/howToUse.js';

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH
// const demoPdf = 'https://storage.googleapis.com/mymember-storage/All-Images/30504871-c6d2-472c-b0b4-489b78c100eb-Test.pdf'
function Home(props) {
  const { setOpen, REQUEST_USERS_FOR_SIGNATURE, ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER, SEND_INVITATION_TO_EMAIL_SIGNATURE, signaturePDFLinkNIP, agreementType, setIslinksent2Email, userinformation } = props
  const [items, setItems] = useState(null);
  const [dataAfterInviteUser, setDataAfterInviteUser] = useState(null)
  const [currentPage, setPage] = useState(1);
  const [startProcess, setStartprocess] = useState(false)
  const [addAdditionalUser, setAddAdditionalUser] = useState([])
  const [currentEmailToken, setCurrentEmailToken] = useState('')
  const topLevelRef = useRef(null)

  const [heightAndWidth, setHeightAndWidth] = useState({
    height: 0,
    width: 0
  })

  const handleSubmitDate = async () => {
    if (items === null) return
    setStartprocess(true)
    let copyItems = { ...items };
    let viewed = [];

    for (let [key, value] of Object.entries(copyItems)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itm of v) {
          delete itm.component;
        }
      }
    }
    let emails = []

    for (let [key, value] of Object.entries(copyItems)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (!emails?.includes(itmObj?.email)) {
            emails.push(itmObj?.email)
          }
          viewed.push({
            fullname: itmObj?.fullname,
            email: itmObj?.email,
            time: '',
            Status: 'Not seen',
            ipAddress: '',
            signer: itmObj?.signer === 'owner' ? 'Mymember' : 'Invite'
          })
        }
      }
    }
    let afterFilterView = viewed?.filter((v, i, a) => a.findIndex(t => (t?.email === v?.email)) === i)
    let payload = {
      items: copyItems,
      signDocFor: agreementType,
      signDocForId: signaturePDFLinkNIP?.Buy_MSId, // membership id or product id
      viewed: afterFilterView
    }
    let data = await REQUEST_USERS_FOR_SIGNATURE(payload)
    setDataAfterInviteUser(data?.data)
    if (data?.success) {
      let pdfLink = signaturePDFLinkNIP?.data?.split(urlGStorage)[1]
      let docLink = `${process.env.REACT_APP_BASE_URL}/docusign/sign/${data?.data?._id}/${pdfLink}/${data?.emailToken}`
      setCurrentEmailToken(data?.emailToken)
      let emailSendLinkPayload = { emails, docLink }
      let res = await SEND_INVITATION_TO_EMAIL_SIGNATURE(emailSendLinkPayload)
      if (res.success) {
        setIslinksent2Email(true)
      }
      setStartprocess(false)
      setOpen(false)
    } else {
      setStartprocess(false)
    }
  }

  const genrateSignature = () => {
    // eslint-disable-next-line no-undef
    if (userinformation?.signature !== undefined || userinformation?.signature !== '') {
      ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER(userinformation?.signature, userinformation)
      return
    }
    const sdfsd = require("text-image")
    var style = {
      font: 'system-ui',
      align: 'center',
      color: 'Black',
      size: 20,
      background: 'transparent',
      stroke: 1,
      strokeColor: 'rgba(0, 0, 0, 0)',
    };

    // eslint-disable-next-line no-undef
    var textImage = TextImage(style);
    let sign = textImage.toDataURL(userinformation?.firstname + '...');
    ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER(sign, userinformation)

  }
  React.useEffect(() => {
    setHeightAndWidth({
      height: topLevelRef.current.clientHeight,
      width: topLevelRef.current.clientWidth
    })
  }, [])

  React.useEffect(() => {
    if (userinformation !== null) {
      genrateSignature()
    }
  }, [userinformation])
  return (
    <div ref={topLevelRef}>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={12} lg={12}>
            <Card className="shadow-sm h-100">
              <CardContent className='p-0'>
                <HowToUseDocuSign
                  // pdfUrl={demoPdf}
                  pdfUrl={urlGStorage + signaturePDFLinkNIP?.data?.split(urlGStorage)[1]}
                  setItems={setItems}
                  currentEmailToken={currentEmailToken}
                  dataAfterInviteUser={dataAfterInviteUser}
                  items={items}
                  startProcess={startProcess}
                  handleSubmitDate={handleSubmitDate} />
              </CardContent>
            </Card>
          </Grid>
          <Grid style={{ width: '100%' }} item sm={12} md={3} lg={3}>
            <Card className="h-100 shadow-sm">
              <CardContent>
                <List
                  style={{
                    position: "relative",
                    overflow: "auto",
                  }}
                  dense
                >
                  <ListItem className="pl-0 pr-0 d-flex justify-content-between align-items-center">
                    <Typography
                      style={{ color: "#0e0e0e" }}
                      className="mb-0"
                    >
                      <b>MYMEMBER USER</b>
                    </Typography>
                    <MainAdditionalSigner
                      color="#c43d4a"
                      buttonText="Add"
                      title="Add Mymember user"
                      id={1}
                      isEdit={false}
                    />
                  </ListItem>
                  <MymeberSigner ipAddress={signaturePDFLinkNIP?.ipAddress} />
                  <Divider />
                  <ListItem className="pl-0 pr-0 d-flex justify-content-between align-items-center">
                    <Typography
                      style={{ color: "#0e0e0e" }}
                      className="mb-0"
                    >
                      <b>ADDITIONAL SIGNER</b>
                    </Typography>
                    <AddAdditionalSigner
                      setAddAdditionalUser={setAddAdditionalUser}
                      addAdditionalUser={addAdditionalUser}
                      color="#c43d4a"
                      buttonText="Add"
                      title="Add Additional Signer"
                    />
                  </ListItem>
                  <AdditonalSigner addAdditionalUser={addAdditionalUser} />
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sm={12} md={9} lg={9}>
            <div className="d-flex justify-content-center">
              <TargetBox
                currentPage={currentPage}
                type="sign"
                setSignBtns={setItems}
                boxes={items}
                onDropItem={(item) => {
                  const copyItems = { ...items };
                  if (!copyItems[item.signer]) copyItems[item.signer] = {};
                  if (!copyItems[item.signer][currentPage])
                    copyItems[item.signer][currentPage] = [];
                  copyItems[item.signer][currentPage].push({ ...item, id: Date.now() });
                  setItems(copyItems);
                }}
              >
                <HomePdfViewer
                  ipAddress={signaturePDFLinkNIP?.ipAddress}
                  onPageChange={setPage}
                  setSignBtns={setItems}
                  signBtns={items}
                  // url={demoPdf}
                  width={heightAndWidth.width}
                  height={heightAndWidth.height}
                  url={urlGStorage + signaturePDFLinkNIP?.data?.split(urlGStorage)[1]}
                />
              </TargetBox>
            </div>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    signaturePDFLinkNIP: state.shop?.signaturePDFLinkNIP,
    userinformation: state.userinfo?.userinformation
  };
};
export default connect(mapStateToProps, { REQUEST_USERS_FOR_SIGNATURE, SEND_INVITATION_TO_EMAIL_SIGNATURE, ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER })(Home);

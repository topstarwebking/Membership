import React, { useEffect, useState, useCallback, Fragment, useMemo } from 'react';
import { isAndroid, osVersion } from 'react-device-detect';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import styled from 'styled-components';
import Signature from './Signiture';
import { useParams } from 'react-router-dom';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import { Type, PenTool, Edit2 } from 'react-feather';
import { SAVE_DOCUMENT_AFTER_SIGNATURE } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import PopUpDownloadCopy from './popUpDownloadCopy';
import './docSign.css'
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
}
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const handleWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSize)
    handleWindowSize()
    return () => {
      window.removeEventListener('resize', handleWindowSize)
    }
  }, [])
  return windowSize
}

const SimplePdfViewer = (props) => {
  let { docuSignId, emailToken } = useParams();
  const [openDownload, setOpenDownload] = useState(false)
  const { setSignBtns, url, is_invite = false, signBtns = [], onPageChange = () => { }, SAVE_DOCUMENT_AFTER_SIGNATURE, ipAddress, completed, setCompleted } = props;
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    is_center: false,
    progress: 0,
    pdf: null,
    pageValue: 1,
    currentPage: 1,
    loading: true,
    timer: 0,
    fscale: 0,
    signer_email: null
  });
  const [signModal, setSignModal] = useState(null);
  const isLagecy = (isAndroid && parseInt(osVersion) <= 7)
  const [formValue, setFormValue] = useState({})
  const [startcomplete, setStartComplete] = useState(false)
  const windowSize = useWindowSize()
  const [scale_Size, setScale_Size] = useState(1)
  const [activeSpot, setActiveSpot] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const loadingTask = PDFJS.getDocument({ url: url })
    loadingTask.onProgress = ((data) => {
      if (data.total === data.loaded) {
        state.progress = 0
      } else {
        const progress = ((data.loaded * 100) / data.total).toFixed(0)
        state.progress = progress
      }
      setState({ ...state })
    })
    loadingTask.promise.then(doc => {
      state.pdf = doc
      state.loading = false
      setState({ ...state })
    }, function (reason) {
    });
  }, [url]);

  useEffect(() => {
    renderPage();
  }, [state.pdf, page, scale_Size]);

  useEffect(() => {

    onPageChange(page);
  }, [page]);

  const applyToAll = (item) => {
    setFormValue({ ...formValue, ...item })
    let copySignBtns = { ...signBtns };
    for (let [key, value] of Object.entries(copySignBtns)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (itmObj?.email === props?.invite) {
            itmObj['ipAddress'] = ipAddress
            if (itmObj?.type === 'sign') {
              itmObj['value'] = item?.signature
            } else if (itmObj?.type === 'field') {
              itmObj['value'] = item?.value
            }
          }
        }
      }
    }
    setSignBtns(copySignBtns)
    setSignModal(null)
  }

  const handleSignCompelete = async () => {
    setStartComplete(true)
    let copyItems = { ...signBtns };
    for (let [key, value] of Object.entries(copyItems)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (itmObj?.email === props?.invite) {
            itmObj['ipAddress'] = ipAddress
            if (itmObj?.value === '' || itmObj?.value === undefined) {
              if (itmObj?.type === 'date') {
                itmObj['value'] = new Date().toLocaleDateString()
              }
              toast.info('Please complete all fields', toastCSS());
              setStartComplete(false)
              return
            }
          }
        }
      }
    }
    let payload = {
      items: copyItems,
      signDocFor: props?.completeStatesOfSignature?.signDocFor,
      signDocForId: props?.completeStatesOfSignature?.signDocForId,// membership orv product 
      viewed: props?.completeStatesOfSignature?.viewed
    }
    let res = await SAVE_DOCUMENT_AFTER_SIGNATURE(payload, docuSignId, emailToken)
    if (res.success) {
      setStartComplete(false)
      setOpenDownload(true)
      setCompleted(true)
    } else {
      setStartComplete(false)
    }
  }

  const renderPage = useCallback(() => {
    state.pdf && state.pdf.getPage(page).then(function (page) {
      let canvas_box = document.getElementById('canvas_box')
      let pdf_size = page.getViewport({ scale: 0.6 });
      let scaleSize = canvas_box.getBoundingClientRect().width / pdf_size.width
      let viewport = page.getViewport({ scale: scaleSize })
      setScale_Size(scaleSize)

      if (!isLagecy) {
        let canvas = document.createElement('canvas')
        canvas.style.margin = "0px auto"
        canvas.id = 'canvas_pdf'
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.width = "100%";

        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        page.render(renderContext).promise.then(
          function pdfPageRenderCallback() {
            canvas_box.innerHTML = ''
            canvas_box.appendChild(canvas)

          },
          function pdfPageRenderError(error) { }
        )
      } else {
        page.getOperatorList()
          .then(function (opList) {
            var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
            return svgGfx.getSVG(opList, viewport);
          })
          .then(function (svg) {
            let container = document.createElement('div')
            container.className = 'mx-auto abolute left-0 right-0 top-0 w-full bg-gray-50'
            container.id = 'canvas_pdf'
            svg.style.width = `100%`
            svg.style.height = `100%`
            container.appendChild(svg)
            canvas_box.innerHTML = ''
            canvas_box.appendChild(container)
            if (!state.is_center) {
              state.is_center = true
            }
          });
      }
    });
  }, [state.pdf, page]);

  // Handle pdf next page
  const nextPage = () => {
    setPage((page) => page < state.pdf.numPages ? page + 1 : page)
  };

  // Handle pdf prev page
  const prevPage = () => {
    setPage((page) => page > 1 ? page - 1 : page)
  };

  const getSignatureValue = (item) => {
    setFormValue({ ...formValue, ...item })
    let copySignBtns = { ...signBtns };
    for (let [key, value] of Object.entries(copySignBtns)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (itmObj?.id === signModal?.id) {
            if (itmObj?.type === 'sign') {
              itmObj['value'] = item?.signature
            } else if (itmObj?.type === 'field') {
              itmObj['value'] = item?.signature
            } else if (itmObj?.type === 'date') {
              itmObj['value'] = new Date().toLocaleDateString()
            }
          }
        }
      }
    }
    setSignBtns(copySignBtns)
    setSignModal(null)
  }

  const renderButtons = (item) => {
    if (item.component) return item.component
    switch (item.type) {
      case "text":
        return <span className='text-dark responsive-text'>{item.value}</span>
      case "sign":
        if (item.value) {
          return <img className='sign_img' src={item.value} alt={item.name} />
        } else {
          return <>
            {item?.email !== props?.invite ? null :
              <Button style={{ background: '#2191fd', color: '#fff', border: (activeSpot?.id === item?.id) ? '2px solid red' : 'none' }} className='rounded' variant="contained" size='small' onClick={() => { setSignModal(item) }}><PenTool size={16} className='mr-1' /> <span>Sign</span> </Button>
            }
          </>

        }
      case "field":
        return <div style={{ border: (activeSpot?.id === item?.id) ? '2px solid red' : 'none' }}>
          {
            item?.value === undefined || item?.value === '' ?
              // true ?
              <Fragment>
                {item?.email !== props?.invite ? '' : <Button
                  className='rounded'
                  style={{ background: '#2191fd', color: '#fff' }}
                  variant="contained" size='small'
                  onClick={() => { setSignModal(item) }}>
                  <Type size={16} className='mr-1' /> <span>Field</span> </Button>}
              </Fragment> :
              <div className='responsive-text border text-dark rounded' style={{ padding: '0 10px' }}>
                {item.value}
              </div>
          }
        </div>
      case "date":
        return <span className='text-dark responsive-text'>{new Date().toLocaleDateString()}</span>
      default:
        return null
    }
  }

  const deletefield = (item) => {
    let copySignBtns = { ...signBtns };
    for (let value of Object.values(copySignBtns)) {
      for (let pageNumber of Object.keys(value)) {
        if (!window.location.pathname.includes('docusign/sign')) {
          value[pageNumber] = value[pageNumber].filter(itemObj => item?.id !== itemObj?.id)
        } else {
          value[pageNumber] = value[pageNumber].map((itemObj) => {
            if (item?.id === itemObj?.id) {
              return { ...itemObj, value: '' }
            }
            return itemObj
          })
        }
      }
    }
    setSignBtns(copySignBtns)
  }

  const autoMoveCursorToPostion = () => {
    let copySignBtns = { ...signBtns };
    for (let [key, value] of Object.entries(copySignBtns)) {
      for (let [pageNo, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if ((itmObj?.email === props?.invite) && (itmObj?.value === '' || itmObj?.value === undefined)) {
            setActiveSpot(itmObj)
            setPage(Number(pageNo))
            return
          }
        }
      }
    }
  }

  useEffect(() => {
    autoMoveCursorToPostion()
  }, [signBtns])

  return (
    <div>
      {state.loading &&
        <div className='loading'>
          <Typography>Loading...</Typography>
        </div>
      }
      <Wrapper>
        <div className='main_box'>
          <div id={'viewer'} style={{
            position: "relative",
            display: "flex",
            flex: 1,
            overflow: "hidden",
            width: windowSize?.width > 700 ? 700 : windowSize?.width - 20
          }}>
            <div
              id={'canvas_box'}
              style={{
                width: document.getElementById('viewer') ? `${(document.getElementById('viewer').getBoundingClientRect().width)}px` : null,
              }}
            >
            </div>

            {signBtns && Object.entries(signBtns).map(([signer, value], index) => {
              return (
                value[page] && value[page].map((item, index) => {
                  return <div key={item.id + item.x + item.y} style={{ position: "absolute", left: item.x * (scale_Size * 0.6), top: item.y * (scale_Size * 0.6) }}>
                    <div className='d-flex justify-content-center'>
                      {
                        (props?.invite === item?.email && (item?.type === 'sign' || item?.type === 'field')) ? ((item?.value !== '' && item?.value !== undefined) && <Fragment>
                          {completed ? '' : <Edit2
                            onClick={() => {
                              deletefield(item)
                            }} size={18} style={{ color: '#EB5757' }} />}
                        </Fragment>) : null
                      }
                    </div>
                    {renderButtons(item)}
                  </div>
                })
              )
            })}
          </div>
          <div className='d-flex justify-content-between mt-1'>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={prevPage}> Pre</Button>
              <Button>
                <span>{page}</span>
                <span>/</span>
                <span>{state.pdf && state.pdf.numPages}</span>
              </Button>
              <Button onClick={nextPage}>Next</Button>
            </ButtonGroup>
            {completed ? "" : <Button style={{ background: '#2191fd' }} disabled={startcomplete} className='signbtn rounded' onClick={handleSignCompelete} >
              {startcomplete ? 'Processing' : 'Complete'}
            </Button>}
          </div>
        </div>
        <Signature getSignatureValue={getSignatureValue}
          signModal={signModal}
          setSignModal={setSignModal}
          applyToAll={applyToAll}
          onSave={(image) => {
            signModal['value'] = image
            setSignModal(null)
          }} />
      </Wrapper>
      <PopUpDownloadCopy
        openDownload={openDownload}
        setOpenDownload={setOpenDownload}
      />
    </div>
  );
};


const Wrapper = styled.div`
    display: flex;
    // flex: 1;
    justifyContent: center;
    position: relative ;
    flexDirection: column;
    width: 100%;
    height: 100%;
    #viewer{
        position: relative;
        display: flex;
        margin : 0 auto;
        width:fit-content;
        overflow: auto;
    }
    .loading{
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justifyContent: center;
        alignItems: center;
    }
    .box-pageBtn-complete{
        padding:1rem;
        border-radius:8px;
        // z-index: 2000;
        // position: absolute;
        bottom:10px;
        width: 100%;
        margin: 0 auto;
        mariginBottom:2rem;
    }
   .page_buttons{
           background:gray;
           color:#fff;
           display: flex;
           justifyContent: start;
           alignItems: center;
           border-radius:8px;
       }
    .nextBtn,.preBtn{
    color:#ff
    }
    .signbtn {
        // position: absolute;
        // right : 10px;
        // bottom : 10px;
        color:white;
        background-color: #4664e1;
    }`
  ;

export default connect(null, { SAVE_DOCUMENT_AFTER_SIGNATURE })(SimplePdfViewer);
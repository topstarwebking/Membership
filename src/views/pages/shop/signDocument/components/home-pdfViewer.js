import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { isAndroid, osVersion } from 'react-device-detect';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import styled from 'styled-components';
import Signature from './Signiture';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import { Type, PenTool } from 'react-feather';
import { SAVE_DOCUMENT_AFTER_SIGNATURE } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { XCircle } from "react-feather";
import "react-toastify/dist/ReactToastify.css"
import { useDrag } from 'react-dnd';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

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
  // let { docuSignId, itemId, agreementType, emailToken } = useParams();
  const { setSignBtns, url, is_invite = false, signBtns = [], onPageChange = () => { }, SAVE_DOCUMENT_AFTER_SIGNATURE, ipAddress } = props;
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
  const windowSize = useWindowSize()

  useEffect(() => {
    const loadingTask = PDFJS.getDocument({ url: `${url}` })
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
      // makeThumbs()
    }, function (reason) {
    });
  }, [url]);

  useEffect(() => {
    renderPage();
  }, [state.pdf, page, windowSize]);

  useEffect(() => {
    onPageChange(page);
  }, [page]);

  // MainRender pdf function
  const renderPage = useCallback(() => {
    state.pdf && state.pdf.getPage(page).then(function (page) {
      let canvas_box = document.getElementById('canvas_box')
      const scaleSize = windowSize.width > 680 ? 1 : windowSize.width / 680
      let viewport = page.getViewport({ scale: scaleSize });

      if (!isLagecy) {
        let canvas = document.createElement('canvas')
        canvas.style.margin = "0 auto"
        canvas.id = 'canvas_pdf'
        canvas.width = viewport.width
        canvas.height = viewport.height
        // canvas.id = 'canvas_pdf';
        let renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        page.render(renderContext).promise.then(
          function pdfPageRenderCallback() {
            canvas_box.innerHTML = ''
            canvas_box.appendChild(canvas)
            if (!state.is_center) {
              state.is_center = true
            }
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
              // fitDocument(scale, true, 0, 0)
              state.is_center = true
            }
          });
      }
    });
  }, [state.pdf, page, windowSize]);


  // Handle pdf next page
  const nextPage = () => {
    setPage((page) => page < state.pdf.numPages ? page + 1 : page)
  };

  // Handle pdf prev page
  const prevPage = () => {
    setPage((page) => page > 1 ? page - 1 : page)
  };

  const renderButtons = (item) => {
    switch (item.type) {
      case "text":
        return <div>
          <span className='text-dark'>{item.value}</span>
        </div>

      case "sign":
        if (item.value) {
          return <div><img className='sign_img' src={item.value} alt={item.name} /></div>
        } else {
          return <Button
            disabled={item?.email !== props?.invite} className='rounded' variant="contained" size='small' style={{ background: '#2191fd', color: '#fff' }} onClick={() => { setSignModal(item) }}><PenTool size={16} className='mr-1' /> <span>Sign</span> </Button>
        }
      case "field":
        return <div>
          {
            item?.value === undefined || item?.value === '' ?
              // true ?
              <Fragment>
                <Button
                  className='rounded'
                  style={{ background: '#2191fd', color: '#fff' }}
                  variant="contained" size='small'
                  onClick={() => { setSignModal(item) }}>
                  <Type size={16} className='mr-1' /> <span>Field</span> </Button>
              </Fragment> :
              <div className='responsive-text border text-dark rounded' style={{ padding: '0 10px' }}>
                {item.value}
              </div>
          }
        </div>
      case "date":
        return <div><span className='text-dark'>{new Date().toLocaleDateString()}</span></div>

      default:
        return null
    }
  }
  const getSignatureValue = (item) => {
    setFormValue({ ...formValue, ...item })
    let copySignBtns = { ...signBtns };
    for (let [key, value] of Object.entries(copySignBtns)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (itmObj?.email === signModal?.email) {
            if (!item?.fieldItem && itmObj?.type === 'sign') {
              itmObj['value'] = item?.signature
            } if (item?.fieldItem && itmObj?.type === 'field') {
              itmObj['value'] = item?.signature
            }
          }
        }
      }
    }
    setSignBtns(copySignBtns)
    setSignModal(null)
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

  return (

    <div>
      {state.loading &&
        <div className='loading'>
          <div style={{ width: 220 }} className='d-flex flex-column justify-content-center'>
            <img style={{ width: '200px' }} src='/images/no-doc-in-file.png' alt='loading file' />
            <Typography>Please wait <span className='text-primary text-bold'>Loading...</span> your Agreement</Typography>
          </div>
        </div>
      }
      <Wrapper>
        <div className='main_box'>
          <div id={'viewer'} className='shadow'>
            <div
              id={'canvas_box'}
              style={{
                width: 'fit-content',
                margin: "0 auto", position: "relative",
              }}
            >
            </div>
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              border: '1px solid black',
            }}>
              {signBtns && Object.entries(signBtns).map(([signer, value], index) => {
                return (
                  value[page] && value[page].map((item, index) => {
                    return (
                      <Box key={`${item.id}_${index}`} boxes={signBtns} item={item} hideSourceOnDrag={true}>
                        <div>
                          <div className='d-flex justify-content-end'>
                            {renderButtons(item)}
                            <XCircle onClick={() => { deletefield(item) }} size={18} style={{ color: '#EB5757' }} />
                          </div>
                        </div>
                      </Box>)
                  })
                )
              })}
            </div>
          </div>
          <div className='d-flex justify-content-between mt-2'>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={prevPage}> Pre</Button>
              <Button>
                <span>{page}</span>
                <span>/</span>
                <span>{state.pdf && state.pdf.numPages}</span>
              </Button>
              <Button onClick={nextPage}>Next</Button>
            </ButtonGroup>
          </div>
        </div>

        <Signature
          getSignatureValue={getSignatureValue}
          signModal={signModal}
          setSignModal={setSignModal}
          onSave={(image) => {
            signModal['value'] = image
            setSignModal(null)
          }} />
      </Wrapper>
      <ToastContainer />
    </div>
  );
};

export const Box = ({ item, hideSourceOnDrag, children, }) => {
  const style = {
    position: 'absolute',
    cursor: 'move',
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "sign",
    item: { ...item, upt: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item]);

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return item?.x ? (<div ref={drag} style={{ ...style, left: item.x, top: item.y }} role="sign">
    {children}
  </div>) : null;
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
      .sign_img{
      object-fit:contain;
      width : 100px;
      height : 60px;
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
      z-index: 2000;
      position: absolute;
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
        position: absolute;
      right : 10px;
      bottom : 10px;
      color:white;
      background-color: #4664e1;
    }
      `;

export default connect(null, { SAVE_DOCUMENT_AFTER_SIGNATURE })(SimplePdfViewer);
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import EmailEditor from "react-email-editor";
import styled from "styled-components";

const ReactEmailTemplater = (props, ref) => {
  const emailEditorRef = useRef(null);
  const [ready, setReady] = React.useState(false);
  const { design = null } = props;
  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => {
        return new Promise((resolve, reject) => {
          emailEditorRef.current.editor.exportHtml((data) => {
            resolve(data);
          });
        });
      },
      loadHtml: (html) => {
        emailEditorRef.current.editor.loadDesign(html);
      },
    }),
    [emailEditorRef, ready]
  );
  
  const exportHtml = () => {
    ref.current.editor.exportHtml((data) => {
      return data;
    });
  };

  useEffect(() => {
    if (design) {
      emailEditorRef.current.editor &&
        emailEditorRef.current.editor.loadDesign(JSON.parse(props.design));
    }
  }, [design, ready]);

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
    // frame.contentWindow.document.querySelector(".blockbuilder-branding").style.display = "none";
  };

  const onReady = () => {
    // editor is ready
    // const frame = document.querySelector('iframe[src="http://editor.unlayer.com/1.2.132/editor.html"]')
    setReady(true);
  };

  return (
    <Wrapper>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 65vh;
  width: 100%;
  overflow: scroll;
`;

export default forwardRef(ReactEmailTemplater);

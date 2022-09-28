import React from "react";

const Scripts = () => {
  const schoolId = localStorage.getItem('user_id');
  return (
    <div style={{ height: "80vh" }}>
      <div style={{ paddingBottom: 10 }}>
        Add the following scripts before the end of the body tag in your HTML
      </div>
      <div>
        <code>{`<div id="chatbot"></div>`}</code>
      </div>

      <div>
        <code>
          {`<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>`}
        </code>
      </div>

      <div>
        <code>
          {`<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>`}
        </code>
      </div>

      <div>
        <code>{`<script src="https://chat.mymember.com/"></script>`}</code>
      </div>

      <div>
        <code>{`<script data-id="${schoolId}" data-name="schoolId"></script>`}</code>
      </div>
    </div>
  );
};

export default Scripts;

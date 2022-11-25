import React, { useState, useEffect } from 'react';
import { LoginButton, useSession } from "@inrupt/solid-ui-react";

export const LoginForm = ({ onClick }) => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [help, setHelp] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://React-tictactoe-tutorial.thomaskarlrichter.repl.co");
  return (<>
    <input
      id="idp"
      label="IDP"
      placeholder="Identity Provider"
      defaultValue={idp}
      onChange={(e) => setIdp(e.target.value)}
    />
       <LoginButton
        oidcIssuer={idp}
        onError={function noRefCheck() { }}
        redirectUrl={currentUrl}
      >
        <div className="loginbutton">Log In</div>
      </LoginButton>
  </>
  );
};

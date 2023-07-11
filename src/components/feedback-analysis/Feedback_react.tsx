// @ts-nocheck
import React from "react";
import { Button, Space, notification, Spin, Modal } from "antd";
import qs from "query-string";
import {
  init,
  PinboardEmbed,
  AuthType,
  EmbedEvent,
  SearchEmbed,
  SearchBarEmbed,
  HostEvent,
  Action,
  LiveboardEmbed,
  AppEmbed,
  Page,
  getInitConfig,
  logout
} from "@thoughtspot/visual-embed-sdk/react";
// import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { useSurveySender } from "../send-survey-modal/SendSurveyModal";
// import { ActionData, LiveboardActionData, tabularDataToCSV } from "./dataclasses";
import { getDataForColumnName } from "./FeedbackAnalysis.util";
import "./FeedbackAnalysis.css";
import { encode } from "querystring";
// import { showPayload } from "./custom-actions";

const queryParams = qs.parse(window.location.search);

const customHosts = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://embed-1-do-not-delete.thoughtspotdev.cloud',
  'http://172.19.251.228:8088/',
  'https://172.19.240.168:8443/',
  'https://stage-grapes-champagne.thoughtspotstaging.cloud'
]
let count  = 0
init({
  thoughtSpotHost: customHosts[2],
  // authType: AuthType.None,
  // authType: AuthType.EmbeddedSSO,
  authType: AuthType.TrustedAuthToken,
  // authType: AuthType.TrustedAuthTokenCookieless,
  // blockNonEmbedFullAppAccess: false,
  username: 'demouser2',
  autoLogin:  true,
  getAuthToken: (...args) => {
    console.log('getAuthToken===>', args)
    const secretKey = 'd65604a2-dc64-4442-bbc5-a959ae1545e2'
    const orgId = '0'
  },
}as any);

export const FeedbackAnalysis = () => {
  const embedRef = React.useRef(null);
  const [val, setVal] = React.useState(0)
  const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
  const { sendSurvey, modalJSX } = useSurveySender();

  React.useEffect(() => {
    if (embedRef !== null) {
      embedRef!.current.innerHTML = "";
    }

    const tsSearch = new AppEmbed(document.getElementById("tsEmbed"), {
      pageId: Page.Home,
      frameParams: {},
      showPrimaryNavbar: true,
      // liveboardV2: false,
      // fullHeight: true,
      liveboardId: "601be8e5-140e-477c-8812-843795306438",
       
  });
  tsSearch
    .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
    .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
    .on('filterChanged', (e) => {
      console.log('filterChanged==>', e.data)
    })
    .on(EmbedEvent.Error, console.log)
    .render();

}, []);


  return (
    <div className="feedbackAnalysis">
      {isEmbedLoading ? (
        <div className="embedSpinner">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <AppEmbed 
        pageId={Page.Home}
        showPrimaryNavbar
      />
    </div>
  );
};
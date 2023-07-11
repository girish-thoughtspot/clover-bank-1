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
  Page
} from "@thoughtspot/visual-embed-sdk";
import { useSurveySender } from "../send-survey-modal/SendSurveyModal";
// import { ActionData, LiveboardActionData, tabularDataToCSV } from "./dataclasses";
import { getDataForColumnName } from "./FeedbackAnalysis.util";
import "./index.css";
import { encode } from "querystring";
// import { showPayload } from "./custom-actions";

const queryParams = qs.parse(window.location.search);
const customHost: string = queryParams.host as string;

// const thoughtSpotHost = !!customHost
//   ? `https://${customHost}`
//   : "https://embed-1-do-not-delete.thoughtspotdev.cloud";

init({
  // thoughtSpotHost: "https://172.19.225.151:8443/", //"http://localhost:3000",
  thoughtSpotHost: "http://localhost:3000", //"http://localhost:3000",
  authType: AuthType.None,
  // blockNonEmbedFullAppAccess: true,
  // authType: AuthType.TrustedAuthTokenCookieless,
  username: 'tsadmin',
  autoLogin:  true,
  getAuthToken: (...args) => {
    console.log('getAuthToken===>', args)
    const secretKey = '5302952e-5e6a-4d07-9b46-9f834356d494'
    const orgId = '265925087'
    return new Promise((resolve) => {
      fetch("https://172.19.177.211:8443/callosum/v1/v2/auth/token", {
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "body": `username=tsadmin&credential=%7B%22type%22%3A%22CLUSTER_SECRET_KEY%22%2C%22value%22%3A%22${secretKey}%22%7D&scope=%7B%22access_type%22%3A%22FULL%22%2C%22org_id%22%3A${orgId}%7D&validity_time_in_sec=300`,
        "method": "POST",
      }).then(response => response.json()).then(data => {
        console.log(data)
        resolve(data.data.token)
      })
    });
  },
}as any);

export const MultipleEmbed = () => {
  const embedRef = React.useRef(null);
  const [val, setVal] = React.useState(1)
  const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
  const { sendSurvey, modalJSX } = useSurveySender();

  React.useEffect(() => {
    if (embedRef !== null) {
      embedRef!.current.innerHTML = "";
    }

    const tsSearch = new SearchBarEmbed("#tsEmbed", {
      // pageId: Page.Home,
      showPrimaryNavbar: true,
      // liveboardId: "601be8e5-140e-477c-8812-843795306438",
      liveboardId: "9bd202f5-d431-44bf-9a07-b4f7be372125",
      // vizId: "db0badd5-47c6-400a-842d-133a7b44d435",
      searchOptions:{
        searchTokenString: "[city]",
        executeSearch: true
      },
      dataSource:[
        "540c4503-5bc7-4727-897b-f7f4d78dd2ff", //view
      ],
      dataSources:[
        "540c4503-5bc7-4727-897b-f7f4d78dd2ff", //view
      ],
       
  });
    tsSearch
      .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
      .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
      .on(EmbedEvent.Data, (res) => {
        console.group('Data---')
        console.log(res)
        console.groupEnd()
      })
      .on('filterChanged', (e) => {

        tsSearch.trigger(HostEvent.getFilters).then((res) => {
          console.log('ree2',res)
        })
        console.log('cl_authexpire4', e)
      })
      .on(EmbedEvent.QueryChanged, console.log)
      .on(EmbedEvent.Data, console.log)
      .render();


  const tsSearch2 = new LiveboardEmbed("#tsEmbed1", {
    // pageId: Page.Home,
    showPrimaryNavbar: true,
    // liveboardId: "601be8e5-140e-477c-8812-843795306438",
    liveboardId: "9bd202f5-d431-44bf-9a07-b4f7be372125",
    // vizId: "db0badd5-47c6-400a-842d-133a7b44d435",
    searchOptions:{
      searchTokenString: "[city]",
      executeSearch: true
    },
    dataSource:[
      "540c4503-5bc7-4727-897b-f7f4d78dd2ff", //view
    ],
    dataSources:[
      "540c4503-5bc7-4727-897b-f7f4d78dd2ff", //view
    ],
    // frameParams: {
    //   loading: 'eager'
    // },
    fullHeight: true
     
});
  tsSearch2
    .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
    .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
    .on(EmbedEvent.Data, (res) => {
      console.group('Data2---')
      console.log(res)
      console.groupEnd()
    })
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
      <div onClick={() => setVal(0)}>
        SearchEmbed {`${!val ? '- selected' : ''}`}
      </div>
      <div onClick={() => setVal(1)}>
        liveboard {`${val ? '- selected' : ''}`}
      </div>
      <div className="tsembed-wrapper">
        {/* <div className="tsEmbed2" ref={embedRef} id="tsEmbed" style={{zIndex: `${val ? -1 : 1}`}}></div>
        <div className="tsEmbed2" ref={embedRef} id="tsEmbed1" style={{zIndex: `${val ? 1 : -1}`}}></div> */}
        <div className="tsEmbed2" ref={embedRef} id="tsEmbed" style={{display: `${val ? 'none' : 'block'}`}}></div>
        <div className="tsEmbed2" ref={embedRef} id="tsEmbed1" style={{display: `${!val ? 'none' : 'block'}`}}></div>
      </div>
      {modalJSX}
    </div>
  );
};

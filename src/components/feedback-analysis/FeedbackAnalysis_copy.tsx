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
} from "@thoughtspot/visual-embed-sdk/react";
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
  'https://172.19.225.151:8443/',
  'http://172.19.225.151:8088/'
]

init({
  thoughtSpotHost: customHosts[2], 
  // authType: AuthType.None,
  authType: AuthType.TrustedAuthTokenCookieless,
  // authType: AuthType.TrustedAuthToken,
  // blockNonEmbedFullAppAccess: true,
  username: 'tsadmin',
  autoLogin:  true,
  getAuthToken: (...args) => {
    console.log('getAuthToken===>', args)
    const secretKey = '5302952e-5e6a-4d07-9b46-9f834356d494'
    const orgId = '265925087'
    return new Promise((resolve) => {
      // fetch("https://172.19.177.211:8443/callosum/v1/v2/auth/token", {
      //   "headers": {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   "body": `username=tsadmin&credential=%7B%22type%22%3A%22CLUSTER_SECRET_KEY%22%2C%22value%22%3A%22${secretKey}%22%7D&scope=%7B%22access_type%22%3A%22FULL%22%2C%22org_id%22%3A${orgId}%7D&validity_time_in_sec=300`,
      //   "method": "POST",
      // }).then(response => response.json()).then(data => {
      //   console.log(data)
      //   resolve(data.data.token)
      // })
      resolve('ZGVtb3VzZXIyOkpITm9hWEp2TVNSVFNFRXRNalUySkRVd01EQXdNQ1JDZWxoV2JUaDRURTVHY1dvMVkwdG5SV1ZLU3pGQlBUMGtUVVV4Y21waGFrVjBTRlV6Um1oUFJESlVkRkZ3TVRFMGRFbFBVemxXU0dka0sxUjFkSFJJZDBjNVZUMA==')
      // fetch("https://172.19.177.211:8443/callosum/v1/tspublic/v1/session/auth/token", {
      //   "headers": {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   "body": "secret_key=94c90a43-ceed-43e3-8226-9479e5f8e8de&username=tsadmin&access_level=FULL",
      //   "method": "POST",
      // }).then(response => response.text()).then(responseText => resolve(responseText));
    });
  },
}as any);

export const FeedbackAnalysis = () => {
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
        // "cd252e5c-b552-49a8-821d-3eadaa049cca", //sample-retail

        // "aabe9f0b-620a-4f16-82a0-f8385518d52e", //sf-france
        // "25267a89-32e2-4749-bcb9-ff5d5e6a1b2a", //unique-501-ui-ws
        // "08f07a95-1f6d-45f3-a41e-790e0a813de3" //date
      ],
      // frameParams: {},
      // answerId: "21f35c49-c1f8-4f3d-a124-a0fbe5c978aa",
      // hideDataSources: true,
      // dataSources: !!customHost ? [] : ["d3845440-5af6-451b-8e12-36b40591fc9f"],
      //  locale: "en-AU",
       
  });
  // setTimeout(()=>{
  //         console.log("hi");
  //         tsSearch.trigger(HostEvent.Share);
  //       },20000)
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
      // setTimeout(() => {
      //   console.log('hi')
      //   tsSearch.trigger(HostEvent.getFilters).then((res) => {
      //     console.log('reeeeeeee',res)
      //   })
      //   tsSearch.trigger(HostEvent.updateFilters, {
      //     filter: {
      //       column: 'Tax',
      //       oper: 'GE',
      //       values: [4],
      //       is_mandatory: true,
      //     },
      //     filter: {
      //       column: 'Category',
      //       oper: 'IN',
      //       values: ['mfgr#11','mfgr#12','mfgr#15','mfgr#22'],
      //       is_mandatory: false,
      //     }
      //   })
      //   tsSearch.trigger(HostEvent.OpenFilter, {
      //     column: {
      //       columnId: 'fa683b9b-58b5-4d02-b834-5838ca1f500d',
      //       type: 'MEASURE',
      //       dataType: 'INT64',
      //       name: 'Tax',
      //     }
      //   })
      // }, 20000)


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
      // "cd252e5c-b552-49a8-821d-3eadaa049cca", //sample-retail

      // "aabe9f0b-620a-4f16-82a0-f8385518d52e", //sf-france
      // "25267a89-32e2-4749-bcb9-ff5d5e6a1b2a", //unique-501-ui-ws
      // "08f07a95-1f6d-45f3-a41e-790e0a813de3" //date
    ],
    // frameParams: {},
    // answerId: "21f35c49-c1f8-4f3d-a124-a0fbe5c978aa",
    // hideDataSources: true,
    // dataSources: !!customHost ? [] : ["d3845440-5af6-451b-8e12-36b40591fc9f"],
    //  locale: "en-AU",
     
});
// setTimeout(()=>{
//         console.log("hi");
//         tsSearch.trigger(HostEvent.Share);
//       },20000)
  tsSearch2
    .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
    .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
    .on(EmbedEvent.Data, (res) => {
      console.group('Data2---')
      console.log(res)
      console.groupEnd()
    })
    .on('filterChanged', (e) => {

      tsSearch.trigger(HostEvent.getFilters).then((res) => {
        console.log('ree---2',res)
      })
      console.log('cl_authexpire4', e)
    })
    .render();
    // setTimeout(() => {
    //   console.log('hi')
    //   tsSearch.trigger(HostEvent.getFilters).then((res) => {
    //     console.log('reeeeeeee',res)
    //   })
    //   tsSearch.trigger(HostEvent.updateFilters, {
    //     filter: {
    //       column: 'Tax',
    //       oper: 'GE',
    //       values: [4],
    //       is_mandatory: true,
    //     },
    //     filter: {
    //       column: 'Category',
    //       oper: 'IN',
    //       values: ['mfgr#11','mfgr#12','mfgr#15','mfgr#22'],
    //       is_mandatory: false,
    //     }
    //   })
    //   tsSearch.trigger(HostEvent.OpenFilter, {
    //     column: {
    //       columnId: 'fa683b9b-58b5-4d02-b834-5838ca1f500d',
    //       type: 'MEASURE',
    //       dataType: 'INT64',
    //       name: 'Tax',
    //     }
    //   })
    // }, 20000)
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
      <div className="tsEmbed" ref={embedRef} id="tsEmbed" style={{zIndex: `${val ? -1 : 1}`}}></div>
      <div className="tsEmbed1" ref={embedRef} id="tsEmbed1" style={{zIndex: `${val ? 1 : -1}`}}></div>
      {modalJSX}
    </div>
  );
};

// export const FeedbackAnalysis = () => {
//   const embedRef = React.useRef(null);
//   const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
//   const {sendSurvey, modalJSX} = useSurveySender();

//   React.useEffect(() => {
//     if (embedRef !== null) {
//       embedRef!.current.innerHTML = "";
//     }

//     const tsSearch = new SearchEmbed("#tsEmbed", {
//       frameParams: {},
//     });

//     const tsPinboard = new PinboardEmbed("#tsEmbed", {
//       frameParams: {},
//       pinboardId: "601be8e5-140e-477c-8812-843795306438",
//       /*param-end-pinboardId*/
//       disabledActions: [Action.SyncToSheets],
//       hiddenActions: [Action.SyncToOtherApps],
//       /*param-start-runtimeFilters*//*param-end-runtimeFilters*/
//     });

//     // setTimeout(()=>{
//     //   console.log("hi");
//     //   tsPinboard.trigger();
//     //   tsSearch.trigger(HostEvent.SyncToSheets);
//     // },40000)

//     tsPinboard
//       .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
//       .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
//       .on(EmbedEvent.CustomAction, (payload: any) => {
//         const data = payload.data;
//         if (data.id === "send-survey") {
//           const recipients = getDataForColumnName(
//             data.columnsAndData,
//             "email address"
//           );
//           sendSurvey(recipients);
//         }
//       })
//       .render();
//   }, []);
//   return (
//     <div className="feedbackAnalysis">
//       {isEmbedLoading ? (
//         <div className="embedSpinner">
//           <Spin size="large" />
//         </div>
//       ) : (
//           ""
//         )}
//       <div className="tsEmbed" ref={embedRef} id="tsEmbed"></div>
//       {modalJSX}
//     </div>
//   );
// };

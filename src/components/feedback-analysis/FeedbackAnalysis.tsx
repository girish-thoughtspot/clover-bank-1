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
} from "@thoughtspot/visual-embed-sdk";
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
  'https://172.19.218.146:8443/',
  'https://stage-grapes-champagne.thoughtspotstaging.cloud'
]
let count  = 0
init({
  thoughtSpotHost: customHosts[0],
  authType: AuthType.None,
  // authType: AuthType.EmbeddedSSO,
  // authType: AuthType.TrustedAuthToken,
  // authType: AuthType.TrustedAuthTokenCookieless,
  // blockNonEmbedFullAppAccess: false,
  // ignoreNoCookieAccessAlert: true,
  // username: 'tsadmin',
  // autoLogin:  true,
  getAuthToken: (...args) => {
    console.log('getAuthToken===>', args)
    const secretKey = 'd65604a2-dc64-4442-bbc5-a959ae1545e2'
    const orgId = '0'
    return new Promise((resolve) => {
      // fetch(`https://172.19.160.110:8443/api/rest/2.0/auth/token/full`, {
      //   headers: {
      //     "content-type": "application/json"
      //   },
      //   body: `{\"username\":\"tsadmin\",\"validity_time_in_sec\":3000,\"org_id\":0,\"auto_create\":false,\"secret_key\":\"${secretKey}\"}`,
      //   method: "POST"
      // })
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log(data.token);
      //   resolve(data.token);
      // });
      console.log(queryParams)
      if(queryParams['user'] === 'guest')
        resolve("Z3Vlc3Q6SkhOb2FYSnZNU1JUU0VFdE1qVTJKRFV3TURBd01DUkpLeXRGYW1oM2QxaDVOblZXUjJoS2JGTnZORkJSUFQwa1ZFNDFaRVlyTmxGWk0zYzVkREZZVURaRWNVZFRibEl3WWpKTFRXMXRhVmx0UkU1VlkwcFplVGxQU1Qw")
      else
        resolve("dHNhZG1pbjpKSE5vYVhKdk1TUlRTRUV0TWpVMkpEVXdNREF3TUNSVlZuTjFaRFV5YXpoTmRVVnRWRFpQV1UxTVJFcFJQVDBrWW1SWE9UWjRkVk16WlRnMllrRXdORVpGUzNGMlMweEdPWGxYWVZCRVZFaGpibWNyVEhoVmRtWnFSVDA=")
      // fetch("https://172.19.201.236:8443/callosum/v1/tspublic/v1/session/auth/token", {
      //   "headers": {
      //     "content-type": "application/x-www-form-urlencoded",
      //   },
      //   "body": "secret_key=d65604a2-dc64-4442-bbc5-a959ae1545e2&username=tsadmin&access_level=FULL",
      //   "method": "POST",
      // }).then(response => response.text()).then(responseText => {
      //   if(count)
      //     resolve(responseText.replace('0','1'))
      //   else{
      //     count++;
      //     resolve(responseText)
      //   }
      // });
    });
  },
}as any);

export const FeedbackAnalysis = () => {
  const embedRef = React.useRef(null);
  const [isEmbedLoading, setIsEmbedLoading] = React.useState(true);
  const { sendSurvey, modalJSX } = useSurveySender();

  React.useEffect(() => {
    // if (embedRef !== null) {
    //   embedRef!.current.innerHTML = "";
    // }

    const tsSearch = new LiveboardEmbed(document.getElementById("tsEmbed"), {
      pageId: Page.Home,
      frameParams: {
        loading: 'lazy'
      },
      showPrimaryNavbar: true,
      // liveboardV2: false,
      // fullHeight: true,
      // liveboardId: '9bd202f5-d431-44bf-9a07-b4f7be372125',
      liveboardId: "601be8e5-140e-477c-8812-843795306438",
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
      ],
      // answerId: "21f35c49-c1f8-4f3d-a124-a0fbe5c978aa",
      // hideDataSources: true,
      //  locale: "en-AU",
       
  });

  embedRef.current = tsSearch
  tsSearch
    .on(EmbedEvent.Init, () => setIsEmbedLoading(true))
    .on(EmbedEvent.Load, () => setIsEmbedLoading(false))
    // .on(EmbedEvent.ALL, (res) => {
    //   console.log(res)
    // })
    .on('filterChanged', (e) => {
      console.log('filterChanged==>', e.data)
    })
    // .on(EmbedEvent.QueryChanged, console.log)
    .on(EmbedEvent.Error, console.log)
    .render();
    setTimeout(() => {
      console.log('hi')
      // tsSearch.trigger(HostEvent.getFilters).then((res) => {
      //   console.log('reeeeeeee',res)
      // })
      // tsSearch.trigger('updateFilters', {
      //   filter: [{
      //     column: 'Tax',
      //     oper: 'GE',
      //     values: [4],
      //     is_mandatory: true,
      //   },
      //   {
      //     column: 'Category',
      //     oper: 'IN',
      //     values: ['mfgr#11','mfgr#12','mfgr#15','mfgr#22'],
      //     is_mandatory: false,
      //   }]
      // })
      // tsSearch.trigger(HostEvent.OpenFilter, {
      //   column: {
      //     columnId: 'fa683b9b-58b5-4d02-b834-5838ca1f500d',
      //     type: 'MEASURE',
      //     dataType: 'INT64',
      //     name: 'Tax',
      //   }
      // })
    }, 20000)
    // setTimeout(logout, 30000)

}, []);

  const btnHandler = (e, key) => {
    if(embedRef.current){   
      if(key === 1) {
        console.log('key', key)
        embedRef.current.trigger(HostEvent.OpenFilter, {
          column: {
            columnId: 'fa683b9b-58b5-4d02-b834-5838ca1f500d',
            type: 'MEASURE',
            dataType: 'INT64',
            name: 'Tax',
          }
        })
      } else if(key === 2) {
        embedRef.current.trigger('getFilters').then((res) => {
          console.log('getFilters',res)
        })
      } else if(key === 3) {
        embedRef.current.trigger('updateFilters', {
          filter: [{
            column: 'Tax',
            oper: 'GE',
            values: [4],
            is_mandatory: true,
          },{
            column: 'Category',
            oper: 'IN',
            values: ['mfgr#11','mfgr#12','mfgr#15','mfgr#22'],
            is_mandatory: false,
          }]
        })
        // embedRef.current.trigger('updateFilters', {
        //   filter: {
        //     column: 'Category',
        //     oper: 'IN',
        //     values: ['mfgr#11','mfgr#12','mfgr#15','mfgr#22'],
        //     is_mandatory: false,
        //   }
        // })
      } else if(key === 4) {
        embedRef.current.trigger(HostEvent.Share).then((res) => {
          console.log('getFilters',res)
        })
      }
    }
  }
  return (
    <div className="feedbackAnalysis">
      <div style={{display: 'flex'}}>
        <button onClick={(e)=>btnHandler(e, 1)}> Button 1</button>
        <button onClick={(e)=>btnHandler(e, 2)}> Button 2</button>
        <button onClick={(e)=>btnHandler(e, 3)}> Button 3</button>
        <button onClick={(e)=>btnHandler(e, 4)}> Button 4</button>
      </div>
      {isEmbedLoading ? (
        <div className="embedSpinner">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="tsEmbed" id="tsEmbed"></div>
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

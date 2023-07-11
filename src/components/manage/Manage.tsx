import React from 'react';
import { Button, notification } from 'antd';
import { useSurveySender } from '../send-survey-modal/SendSurveyModal.tsx';
import { sendFeedbackSurvey } from '../../services/survey/survey-service';

export const Manage = () => {
    const { sendSurvey, modalJSX } = useSurveySender();
    const _sendSurvey = React.useCallback(async () => {
        // sendSurvey([
        //     'ashish.shubham@thoughtspot.com',
        //     'dave.eyler@thoughtspot.com'
        // ]);
        window.open('http://localhost:3002/', '_blank')
    }, []);
    React.useEffect(() => {
        window.addEventListener('message', console.log);
    }, [])

    return (<div style={{display: 'flex', flexDirection: 'column'}}>
        <Button onClick={_sendSurvey} type="primary">Test send Survey</Button>
        <iframe
            width='100%'
            height='800px'
            // src='https://172.19.228.72:8443/?embedApp=true&primaryNavHidden=true&profileAndHelpInNavBarHidden=false&hostAppUrl=hjbabd--run.stackblitz.io&viewPortHeight=535&viewPortWidth=1149&sdkVersion=1.20.2&authType=None&hideAction=["reportError"]#/answer'
            // src='https://172.19.228.72:8443/v2/?hostAppUrl=hjbabd--run.stackblitz.io&viewPortHeight=535&viewPortWidth=1149&sdkVersion=1.20.2&authType=None&hideAction=["reportError","editACopy","saveAsView","updateTSL","editTSL","onDeleteAnswer"]&dataSourceMode=expand&useLastSelectedSources=false&isSearchEmbed=true#/embed/saved-answer/d0e16150-6a70-4c6c-8b4b-0afc4915d752'
            // src='https://172.19.228.72:8443/?embedApp=true#/saved-answer/0fb54198-868d-45de-8929-139b0089e964'
            src='https://172.19.228.72:8443/?embedApp=true&pageId=answer&dataSources=["82da8e20-4ed9-4dd1-be1f-a5d32aeec294"]&dataSourceSelected=["82da8e20-4ed9-4dd1-be1f-a5d32aeec294"]&&dataSourceMode=expand&useLastSelectedSources=false&isSearchEmbed=true#/embed/answer'
            title="Dummy service worker page"
        ></iframe>
        {modalJSX}
    </div>);
}
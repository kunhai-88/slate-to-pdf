import React from 'react'
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css'; 
import 'moment/locale/zh-cn';
import App from './Canner';

ReactDOM.render(
  <LocaleProvider locale={zh_CN}><App /></LocaleProvider>,
  document.getElementById('target')
);
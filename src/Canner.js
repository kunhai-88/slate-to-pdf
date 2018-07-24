
import React from 'react';
import ReactDOM from 'react-dom';
import {Value} from 'slate';
import CannerEditor from 'canner-slate-editor';
import Undo from '@canner/slate-icon-undo';
import Redo from '@canner/slate-icon-redo';
import {OlList, UlList} from '@canner/slate-icon-list';
import {Indent, Outdent} from '@canner/slate-icon-indent';
import {AlignCenter, AlignLeft, AlignRight} from '@canner/slate-icon-align';
import Table from '@canner/slate-icon-table';
import Hr from '@canner/slate-icon-hr';
import Image from '@canner/slate-icon-image';
import Bold from '@canner/slate-icon-bold';
import Underline from '@canner/slate-icon-underline';
import {Header1, Header2, Header3 } from '@canner/slate-icon-header';
import stateToPdfMake  from './state-to-pdf-make';

const font = 'SourceHanSerifCN';
const ttf = 'SourceHanSerifCN-Regular.ttf';

const menuToolbarOption = [
  { type: Undo, title: "Undo" },
  { type: Redo, title: "Redo" },
  'seperator',
  { type: Header1, title: "Header One" },
  { type: Header2, title: "Header Two" },
  { type: Header3, title: "Header Three" },
  { type: Bold, title: "Bold" },
  { type: Underline, title: "underline" },
  { type: Hr, title: "Ruler" },
  'seperator',
  { type: AlignLeft, title: "Align Left" },
  { type: AlignCenter, title: "Align Center" },
  { type: AlignRight, title: "Align Right" },
  { type: Indent, title: "Indent" },
  { type: Outdent, title: "Outdent" },
  'seperator',
  { type: OlList, title: "Order List" },
  { type: UlList, title: "Unorder List" },
  'seperator',
  // { type: Link, title: "Link" },
  { type: Image, title: "Image" },
 
  // { type: CodeBlock, title: "Code Bloack" },
  { type: Table, title: "Table" },
  // 'seperator',
  // { type: FontColor, title: "Font Color" },
  // { type: FontBgColor, title: "Font Background Color" },
  'seperator',
  { type: 'fullScreen', title: "Full Screen" },
]

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              }
            ],
          },
        ],
      },
    ],
  },
});

class DemoEditor extends React.Component {
  // Set the initial state when the app is first constructed.
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue
    };
    if (window.pdfMake) {
      window.pdfMake.fonts = {
        [font]: {
          normal: ttf,
          bold: 'SourceHanSerifCN-Bold.ttf',
          italics: ttf,
          bolditalics: ttf,
        } };
    }
  }
  onExport = (event)=> {
    const { value } = this.state;
    console.log(value.toJS());
    const pdfmakeContents = stateToPdfMake(value.toJS());
    console.log(pdfmakeContents);
    window.pdfMake.createPdf({
      ...pdfmakeContents,
      defaultStyle: {
        font,
      },
      info: {
        title:  'Betalpha',
        author: 'Betalpha',
        keywords: 'Betalpha',
      },
    }).download('Beptalpha');
  };

  render() {
    const {value} = this.state;
    const onChange = ({value}) => this.setState({value});

    return (
      <div style={{margin: '20px'}}>
        <h1>Canner-slate-editor demo</h1>
        <div onClick={this.onExport} >导出</div>
        <CannerEditor
          value={value}
          onChange={onChange}
          menuToolbarOption={menuToolbarOption}
          serviceConfig={{
            name: 'image',
            accept: 'image/*',
            action: 'https://api.imgur.com/3/image',
            headers: {
              'Authorization': 'Client-ID a214c4836559c77',
              'X-Requested-With': null
            }
          }}
          galleryConfig={null}
          />
      </div>
    );
  }
}

export default DemoEditor;
import { prop, map, includes } from 'lodash/fp'

const LEAF = 'leaf';
const BLOCK = 'block';
const TABLE ='table';
const BOLD = 'bold';
const UNDERLINE = 'underlined';

const parse = (nodes)=>map((node)=>{
  const object = prop('object')(node);
  const type = prop('type')(node);
  const leaves = prop('leaves')(node);
  const nextNodes = prop('nodes')(node);
  if(nextNodes){
    if(type === TABLE){
      return 	{
        style: 'tableExample',
        table: {
          body:  parse(nextNodes),
        }
      };
    }
    return parse(nextNodes);
  }
  const data = map((leaf)=>{
    const marks = prop('marks')(leaf);
    const types = map(prop('type'))(marks);
    return {
        text: prop('text')(leaf),
        bold: includes(BOLD)(types),
        decoration: includes(UNDERLINE)(types) ? 'underline': '' ,
      };
  })(leaves);
   return data.length ? { text: [...data], fontSize: 12, lineHeight: 1.5 } : { text: '\n' };
})(nodes);


export default (state) => {

  const nodes = prop('document.nodes')(state);
  const res = parse(nodes);
  const content = parse(nodes);
  console.log(nodes);
  console.log(content);
  console.log(JSON.stringify(content));


  var dd = {
    content:[
      ...content,
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }

  }
  return dd;
}

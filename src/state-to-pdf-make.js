import { prop, map } from 'lodash/fp'

const LEAF = 'leaf';
const BLOCK = 'block';
const TABLE ='table';

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
  return map((leaf)=>{
    const marks = prop('marks')(leaf);
    const types = map(prop('type'))(marks);
    return prop('text')(leaf);
  })(leaves);
})(nodes);


export default (state) => {

  const nodes = prop('document.nodes')(state);
  const res = parse(nodes);
  console.log(nodes);
  console.log(parse(nodes));


  var dd = {
    content: [
      ...parse(nodes),
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

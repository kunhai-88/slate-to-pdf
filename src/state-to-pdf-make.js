import {
  prop,
  map,
  includes,
  flow,
} from 'lodash/fp'

import {
  fastNth,
  fastHas,
  fastProp,
} from './opt';

const LEAF = 'leaf';
const BLOCK = 'block';

const TABLE = 'table';
const BOLD = 'bold';
const UNDERLINE = 'underline';
const OL = 'ol';
const UL = 'ul';

const H1 = 'header_one';
const H2 = 'header_two';
const H3 = 'header_three';

const head = fastNth(0);

const H_TITLE = {
  [H1]: H1,
  [H2]: H2,
  [H3]: H3,
};

const parseText = (leaf) => {
  const marks = prop('marks')(leaf);
  const types = map(prop('type'))(marks);
  return {
    text: prop('text')(leaf),
    bold: includes(BOLD)(types),
    decoration: includes(UNDERLINE)(types) ? 'underline' : '',
  };
};

const parseH = (nodes) => {
  const leaf = flow(
    head,
    fastProp('leaves'),
    head,
  )(nodes);
  const marks = fastProp('marks')(leaf);
  const types = map(fastProp('type'))(marks);
  return {
    text: fastProp('text')(leaf),
    bold: true,
    decoration: includes(UNDERLINE)(types) ? 'underline' : '',
  };
};

const parse = (nodes) => map((node) => {
  const object = prop('object')(node);
  const type = prop('type')(node);
  const leaves = prop('leaves')(node);
  const nextNodes = prop('nodes')(node);
  if (nextNodes) {
    if (type === TABLE) {
      return {
        style: 'tableExample',
        table: {
          body: parse(nextNodes),
        }
      };
    }
    if (fastHas(type)(H_TITLE)) {
      return {
        style: type,
        text: parseH(nextNodes),
      };
    }
    if (type === OL) {
      return {
        ol: parse(nextNodes),
      };
    }
    if (type === UL) {
      return {
        ul: parse(nextNodes),
      };
    }
    return parse(nextNodes);
  }
  const data = map(parseText)(leaves);
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
    content: [
      ...content,
    ],
    styles: {
      header_one: {
        fontSize: 24,
        bold: true,
        margin: [0, 5, 0, 0]
      },
      header_two: {
        fontSize: 20,
        bold: true,
        margin: [0, 5, 0, 0]
      },
      header_three: {
        fontSize: 16,
        bold: true,
        margin: [0, 5, 0, 10]
      },
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

import React, { createRef, useEffect, useState } from 'react'
import { Research, Research2 } from 'src/reserch'
import './app.less'

// const Index = ({ data }) => {
//   return (
//     <div className="index">
//       <ul>
//         {data.map((d, i) => (
//           <li key={`#session-${i}`}>
//             <a href={`#session-${i}`}>{d.text}</a>
//             <ul>
//               {d.children.map((d2, i2) => (
//                 <li key={`#session-${i}-${i2}`}>
//                   <a href={`#session-${i}-${i2}`}>{d2.text}</a>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Research />
    </>
  )
}

// useEffect(() => {
//   const sections = containerRef.current.querySelectorAll(':scope > section');
//   const arr = [];
//   sections.forEach((section, i) => {
//     const indexData = {
//       text: '',
//       children: [],
//     }
//     const h4 = section.querySelector('h4');
//     h4.setAttribute('id', `session-${i}`);
//     indexData.text = h4.innerText;
//     const ol = section.querySelector('ol');
//     const secondIndex = ol.querySelectorAll(':scope > li');
//     secondIndex.forEach((second, i2) => {
//       second.setAttribute('id', `session-${i}-${i2}`);
//       const h5 = second.querySelector('h5')
//       if (h5) {
//         indexData.children.push({
//           text: h5.innerText
//         })
//       }
//     })

//     arr.push(indexData);
//   });
//   setIndex([...arr]);
// }, []);

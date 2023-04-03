


const loadRemoteComponentFromOneModule = (exposedId, moduleId, url) => {
    const stringInject = 
       `promise new Promise(resolve => {
         const proxy = {
           get: () =>  {
             return window.${exposedId}.get("./expose").then(r => {
              const m = r();
              console.log(m)
              return () => m["${moduleId}"];
             })
           },
           init: (arg) => {
             try {
               return window.${exposedId}.init(arg)
             } catch(e) {
               console.log("remote container ${exposedId} already initialized")
   
             }
           }
         }
         if (window["${exposedId}"] !== undefined) {
           return resolve(proxy);
         }
         const script = document.createElement('script')
         script.src = "${url}";
         script.onload = () => {
           resolve(proxy)
         }
         document.head.appendChild(script);
       })`;
    return stringInject;
}

const registerBundleLib = (libName, url, modules) => {
    const config = {};
    modules.forEach(id => {
      config[id] = loadRemoteComponentFromOneModule(libName, id, url);
    });
    return config;
  }

   

  const loadRemoteComponentFromOneModule2 = (exposedId, moduleId, url) => {
    const stringInject = 
       `promise new Promise(resolve => {
         const proxy = {
           get: () =>  {
             const m = window["${exposedId}"];
             console.log(m)
             return Promise.resolve(() => m.default["${moduleId}"])
           },
           init: (arg) => {
           }
         }
         if (window["${exposedId}"] !== undefined) {
           return resolve(proxy);
         }
         const script = document.createElement('script')
         script.src = "${url}";
         script.onload = () => {
           resolve(proxy)
         }
         document.head.appendChild(script);
       })`;
    return stringInject;
}

const registerBundleLib2 = (libName, url, modules) => {
    const config = {};
    modules.forEach(id => {
      config[id] = loadRemoteComponentFromOneModule2(libName, id, url);
    });
    return config;
  }

   

  module.exports = {
    registerBundleLib,
    registerBundleLib2
  }
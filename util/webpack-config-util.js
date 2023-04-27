

const loadRemoteComponentFromOneModule = (exposedId, moduleId, url) => {
    const stringInject = 
       `promise new Promise(resolve => {
         const proxy = {
           get: () =>  {
             const m = window["${exposedId}"];
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

const registerBundleLib = (libName, url, modules) => {
    const config = {};
    modules.forEach(id => {
      config[id] = loadRemoteComponentFromOneModule(libName, id, url);
    });
    return config;
  }

   

  module.exports = {
    registerBundleLib,
  }
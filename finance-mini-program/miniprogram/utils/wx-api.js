const WX_API = {};

Object.keys(wx).forEach(key => {
  const fx = wx[key];
  if (typeof fx === "function") {
    WX_API[key] = function(data) {
      return new Promise(function(success, fail) {
        fx({
          ...data,
          success,
          fail
        });
      });
    };
  }
});

export default WX_API;

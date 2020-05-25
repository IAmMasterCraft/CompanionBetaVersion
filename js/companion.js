function isInstalled() {
  if (navigator.standalone) {
    return true; // iOS
  }
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return true; // Android with "display": "standalone" in Manifest
  }
  return false;
}

$(document).ready(function () {
  if ("serviceWorker" in navigator) {
    // window.addEventListener("load", function() {
    //   navigator.serviceWorker
    //     .register("./serviceWorker.js")
    //     .then(res => console.log("service worker registered"))
    //     .catch(err => console.log("service worker not registered", err))
    // })

    navigator.serviceWorker.register("./serviceWorker.js").then((res) => {
      res.installing; // the installing worker, or undefined
      res.waiting; // the waiting worker, or undefined
      res.active; // the active worker, or undefined

      res.addEventListener("updatefound", () => {
        // A wild service worker has appeared in reg.installing!
        const newWorker = res.installing;

        newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener("statechange", () => {
          // newWorker.state has changed
        });
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
    });
  }

  if(isInstalled() == false) {
    //   $("body").text("App Not Installed");
  }

});

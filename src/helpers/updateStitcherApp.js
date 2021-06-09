function updateStitcherApp(msg) {
  const stitcherAppDomain = process.env.VUE_APP_STITCHER_DOMAIN // get stitcher app URL

  try {
    // postmessage to stitcher app
    window.parent.postMessage(msg, stitcherAppDomain);
  } catch(e) {
    console.error('error posting message to stitcher app', e);
  }
}

export { updateStitcherApp };
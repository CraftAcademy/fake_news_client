const stubLocation = options => ({
  onBeforeLoad(win) {
    const stubLocation = {
      coords: {
        latitude: options.latitude || null,
        longitude: options.longitude || null
      }
    };
    cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
      callback => {
        console.log("Hello from cypess")
        return callback(stubLocation);
      }
    );
  }
});

export default stubLocation;


// const stubLocation = (latitude, longitude) => {
//   return {
//     onBeforeLoad(win) {
//       cy.stub(win.navigator.geolocation, "getCurrentPosition", (cb, err) => {
//         if (latitude && longitude) {
//           return cb({ coords: { latitude, longitude } });
//         }
//         throw err({ code: 1 }); // 1: rejected, 2: unable, 3: timeout
//       });
//     }
//   };
// }



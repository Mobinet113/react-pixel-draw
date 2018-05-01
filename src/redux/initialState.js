export const pixelState = () => {
  let defaultPixelFormation = [];

  for ( let i = 0; i < 2500; i++ ){
    defaultPixelFormation.push({key: i, colour: "#FFF"});
  }

  return defaultPixelFormation;
};
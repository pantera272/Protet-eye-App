const timeFormat = seconds => {
  let secondsSS = seconds % 60;
  let minutesMM = (seconds - secondsSS)/60;

  secondsSS < 10 ? secondsSS = '0' + secondsSS : secondsSS;
  minutesMM < 10 ? minutesMM = '0' + minutesMM : minutesMM;

  const view = minutesMM + ':' + secondsSS;
  return view;
};

module.exports = {
  timeFormat
};

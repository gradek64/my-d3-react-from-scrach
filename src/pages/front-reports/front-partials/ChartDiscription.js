import React from 'react';


const ChartDiscription = (props) =>{

  const { tabActive, config} = props;
  const confCurrentTab = config[ tabActive ];



  return (
    <div>
      {
        confCurrentTab.buttons.map((item)=>item)
      }
    </div>
  );
};

export default ChartDiscription;
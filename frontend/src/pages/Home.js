import { BodyComponent } from 'reactjs-human-body';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [bodyModel, setBodyModel] = useState('male');
  const onChange = (parts) => console.log('Changed Parts:', parts);
  const onClick = (id) => {
    if(id === "head"){
        navigate("/part/Head");
    }else if(id === "chest"){
        navigate("/part/Chest");
    }else if(id === "leftShoulder" || id === "rightShoulder"){
        navigate("/part/Shoulders");
    }else if(id === "leftArm" || id === "rightArm"){
        navigate("/part/Arms");
    }else if(id === "leftHand" || id === "rightHand"){
        navigate("/part/Hands");
    }else if(id === "stomach"){
        navigate("/part/Stomach");
    }else if(id === "leftLeg" || id === "rightLeg"){
        navigate("/part/Legs");
    }else if(id === "leftFoot" || id === "rightFoot"){
        navigate("/part/Feet");
    } 
   
  }
  
  return (
    <div className="home-container">
        <h1>Select A Body Part!</h1>
        <button onClick={() => setBodyModel('male')}>Male Model</button>
        <button onClick={() => setBodyModel('female')}>Female Model</button>
        <BodyComponent 
          bodyModel={bodyModel}
          onChange={onChange}
          onClick={onClick}
        />
  </div>
  )
}
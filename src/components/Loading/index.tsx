import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  justify-content: center;
  flex-direction: collum;
  border-color: #fff;
`;

function LoadingComponent() {
  return (
    <div className="loading-container">
      <ScaleLoader
        color="#fff"
        css={override}
        height={35}
        width={4}
        radius={2}
        margin={2}
      />
    </div>
  );
}

export default LoadingComponent;

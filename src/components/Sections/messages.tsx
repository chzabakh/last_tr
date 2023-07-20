import { useEffect } from "react";
import Dmpreview from "../messages/dmpreview";

interface ChatProps  {
  updateItem: (newValue: string) => void;
};

const Messages: React.FC<ChatProps> = ({ updateItem }) => {
  


  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden flex flex-col border-2 h-full w-[77%] border-opacity-30 border-green-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
        <div className="overflow-y-auto overflow-x-hidden  my-auto  h-[90%] ">
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
          <Dmpreview updateItem={updateItem}/>
        </div>
      </div>
    </>
  );
};
export default Messages;

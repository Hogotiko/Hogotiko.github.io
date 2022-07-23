import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={210}
    height={260}
    viewBox="0 0 500 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="29" cy="98" r="12" />
    <rect x="51" y="90" rx="5" ry="5" width="328" height="15" />
    <circle cx="29" cy="143" r="12" />
    <rect x="51" y="135" rx="5" ry="5" width="328" height="15" />
    <circle cx="29" cy="187" r="12" />
    <rect x="51" y="180" rx="5" ry="5" width="328" height="15" />
    <circle cx="29" cy="232" r="12" />
    <rect x="53" y="224" rx="5" ry="5" width="328" height="15" />
    <rect x="42" y="358" rx="0" ry="0" width="330" height="205" />
    <circle cx="124" cy="306" r="36" />
    <circle cx="292" cy="308" r="38" />
  </ContentLoader>
);

export default MyLoader;

import React from "react";

const ErrorComponent = ({ error }: { error: string | Error }) => {
  return (
    <div>
      <pre>
        <code>{typeof error === "string" ? error : error.message}</code>
      </pre>
    </div>
  );
};

export default ErrorComponent;

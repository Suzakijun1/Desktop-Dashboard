import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
export default function Email({ electron, google, ipcRenderer }) {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    // Send an IPC message to the main process
    electron = window.electron;
    electron.sendIPCMessage("request-emails", null);

    // Listen for an IPC message from the main process
    electron.receiveIPCMessage("emails", (receivedEmails) => {
      setEmails(receivedEmails);
      console.log("RECEIVED EMAILS: ", receivedEmails);
    });
  }, [electron]);

  const decodeBase64Data = (base64Data) => {
    const decodedString = Base64.decode(base64Data);
    return decodedString;
  };

  const loadMoreEmails = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };

  const displayedEmails = emails.slice(startIndex, startIndex + 10);
  return (
    <div
      className="email-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <h1 className="page-title">Gmail</h1>
      {displayedEmails.map((email) => (
        // Render email cards
        <div
          key={email.id}
          className="email-card"
          style={{
            width: "80%",
            borderRadius: "4px",
            padding: "16px",
            backgroundColor: "white",

            boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
          }}
          onClick={() => setSelectedEmail(email)}
        >
          <h3
            className="email-subject"
            style={{ fontWeight: "bold", color: "black" }}
          >
            {
              email.payload.headers.find((header) => header.name === "Subject")
                .value
            }
          </h3>
          <p className="email-sender">
            From:{" "}
            {
              email.payload.headers.find((header) => header.name === "From")
                .value
            }
          </p>
          <p className="email-date">
            Date:{" "}
            {
              email.payload.headers.find((header) => header.name === "Date")
                .value
            }
          </p>

          <div className="email-body" style={{ color: "black" }}>
            <p>{email.snippet}</p>
          </div>
        </div>
      ))}
      {emails.length > startIndex + 5 && (
        <button style={{ color: "red" }} onClick={loadMoreEmails}>
          Load More
        </button>
      )}
      {selectedEmail && (
        <div
          className="email-modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="email-modal-content"
            style={{
              width: "80%",
              height: "80%",
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "16px",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1
              className="email-subject"
              style={{ fontWeight: "bold", color: "black" }}
            >
              {
                selectedEmail.payload.headers.find(
                  (header) => header.name === "Subject"
                ).value
              }
            </h1>
            <p className="email-sender">
              From:{" "}
              {
                selectedEmail.payload.headers.find(
                  (header) => header.name === "From"
                ).value
              }
            </p>
            <p className="email-date">
              Date:{" "}
              {
                selectedEmail.payload.headers.find(
                  (header) => header.name === "Date"
                ).value
              }
            </p>

            <div className="email-body" style={{ color: "black" }}>
              <p>{selectedEmail.snippet}</p>
              {/* Display the full content of the email */}
              {selectedEmail.payload.parts &&
                selectedEmail.payload.parts.map((part, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: decodeBase64Data(part.body.data),
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

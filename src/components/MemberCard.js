import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import Image from "next/image";

export default function MemberCard({
  src,
  post,
  alt,
  name,
  email,
  phone,
  linkedin,
}) {
  return (
    <div className="member-card">
      <div className="member-card--top">
        <Image alt={alt} src={src} width={600} height={600} priority={true} />
      </div>
      <div className="member-card--bottom">
        <div className="member-card--content">
          <h3>{name}</h3>
          <span>{post}</span>

          <div className="member-card--contactinfo">
            <a href={"mailto:" + email}>
              <FontAwesomeIcon icon={faEnvelope} />
              {email}
            </a>
            <br />
            <br />
            <a href={"tel:" + phone}>
              <FontAwesomeIcon icon={faPhone} />
              {phone}
            </a>
          </div>
          <div className="member-card--spacer"></div>
            {/* If linkedin is not provided, don't show the icon */
            linkedin === "" ? null : (
              <div className="member-card--linked-in">
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            )}
          {/* <div className="member-card--linked-in">
            <a href={linkedin} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

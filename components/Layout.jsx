import { useEffect, useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    fetch('/data/siteData.json')
      .then((res) => res.json())
      .then(setSiteData)
      .catch((err) => console.error('Failed to load site data:', err));
  }, []);

  const header = siteData?.layout?.header;
  const footer = siteData?.layout?.footer;

  return (
    <>
      <header className="header">
        <div className="nav">
          <h2 className="logo">
            <Link href="/">
              <img src={header?.logo || '/images/lotusinn-logo.png'} alt="Lotus Inn Guest House" />
            </Link>
          </h2>
          <div className="menu">
            {(header?.menu || []).map((item) => (
              <Link key={item.path} href={item.path}>
                {item.label}
              </Link>
            ))}
            <Link href={header?.bookNow?.href || '/book-now'} className="btn">
              {header?.bookNow?.label || 'Book Now'}
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-top">
          <div>
            <h4>Quick Links</h4>
            {(footer?.quickLinks || []).map((item, index) => (
              <Link key={`${item.label}-${index}`} href={item.href}>
                <p>{item.label}</p>
              </Link>
            ))}
          </div>

          <div>
            <h4>Contact Us</h4>
            <p>
              <strong>Address:</strong>
              {footer?.contact?.address ? (
                <>
                  {footer.contact.address.split(', ').slice(0, 2).join(', ')}
                  <br /> {footer.contact.address.split(', ').slice(2).join(', ')}
                </>
              ) : null}
            </p>
            <p>
              <strong>Phone:</strong> {footer?.contact?.phone}
            </p>
            <p>
              <strong>Email:</strong> {footer?.contact?.email}
            </p>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="socials">
              {(footer?.socials || []).map((item, index) => (
                <a key={index} href={item.href} target="_blank" rel="noreferrer">
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">{footer?.copyright}</div>
      </footer>
    </>
  );
}

import React from 'react';
import { ImHome, ImMail, ImPhone } from "react-icons/im";
import { BsGeo } from "react-icons/bs";
import './Footer.css';

function Footer(props) {
    return (
        <footer className="footer">
            <div className="footer__content"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}>
            </div>
            <div class="footer__bottom">
                <div class="grid wide">
                    <p class="footer__text">© 2021 - Bản quyền thuộc về nhóm 5 DUE</p>
                    <ul className="socials">
                        <ImHome /> Trường đại học Kinh Tế - Đại học Đà Nẵng          <br />
                        <BsGeo /> 71 Ngũ Hành Sơn, phường Mỹ An, quận Ngũ Hành Sơn, Đà Nẵng <br />
                        <ImPhone />  18007878 <br />
                        <ImMail /> thuvien@due.udn.vn
                    </ul>
                    <p class="name"> </p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
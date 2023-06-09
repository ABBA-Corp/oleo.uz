import Image from "next/image";
import styles from "./form.module.css";
import logo from "../../../public/media/logo.png";
import { useContext, useState } from "react";
import { Toast } from "../toast/toast";
import { IMaskInput } from "react-imask";
import axios from "axios";
import { TranslationsContext } from "../../../contexts/translations";

export function MainForm() {
  const { t } = useContext(TranslationsContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");

  async function postRequest(name, number, message) {
    const data = {
      full_name: name,
      nbm: number,
      comment: message ? message : null,
    };

    const res = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "/add_aplication",
      data
    );

    return await res;
  }

  const handleRequest = (e) => {
    e.preventDefault();
    postRequest(name, number, message)
      .then((res) => {
        if (res.status === 201) {
          setIsSuccess(true);
          setName("");
          setNumber("");
          setMessage("");
          setTimeout(() => {
            setIsSuccess(false);
          }, 1000);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className={styles.bottom_form_div}>
        <div className={styles.bottom_form_top}>
          <Image src={logo} alt="logo" className={styles.bottom_form_logo} />
          <div className={styles.bottom_form_top_texts}>
            <h3 style={{ color: "var(--white)" }} className="section_title">
              {t["form.title"]}
            </h3>
            <p>{t["form.desc"]}</p>
          </div>
        </div>
        <form className={styles.bottom_form} onSubmit={handleRequest}>
          <input
            type="text"
            placeholder={t["form.name"]}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <IMaskInput
            mask={"+998 (00) 000 00 00"}
            type="text"
            placeholder={t["form.phone"]}
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <textarea
            cols="30"
            rows="6"
            placeholder={t["form.message"]}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">{t["form.send"]}</button>
        </form>
      </div>
      <Toast toastCase="post" isSuccess={isSuccess} />
    </>
  );
}

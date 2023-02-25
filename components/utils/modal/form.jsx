import axios from "axios";
import { useContext, useState } from "react";
import { IMaskInput } from "react-imask";
import { ModalContext } from "../../../contexts/modal";
import { SiteInfoContext } from "../../../contexts/siteinfo";
import { Toast } from "../../universal/toast/toast";
import styles from "./modal.module.css";

export function ModalForm() {
  const { siteInfo } = useContext(SiteInfoContext);
  const { setIsModal } = useContext(ModalContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  async function postRequest(name, number) {
    const data = {
      full_name: name,
      nbm: `+998 ${number}`,
    };

    const res = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "/add_aplication",
      data
    );

    return await res;
  }

  const handleRequest = (e) => {
    e.preventDefault();
    postRequest(name, number)
      .then((res) => {
        if (res.status === 201) {
          setIsSuccess(true);
          setName("");
          setNumber("");
          setTimeout(() => {
            setIsModal(false);
            setIsSuccess(false);
          }, 1000);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleRequest}>
        <div className={styles.inputs_container}>
          <div className={styles.input_div}>
            <label htmlFor="name">Ваши ФИО</label>
            <input
              type="text"
              id="name"
              placeholder="Ваши ФИО"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input_div}>
            <label htmlFor="name">Ваш телефон</label>
            <div className={styles.withSpan}>
              <span>+998</span>
              <IMaskInput
                mask={"(00) 000 00 00"}
                id="name"
                placeholder="Введите телефон"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.post_buttons}>
          <button type="submit">Отправить</button>
          <a href={siteInfo.telegram} target={"_blank"} rel={"noreferrer"}>
            Написать в telegram
          </a>
        </div>
      </form>
      <Toast toastCase="post" isSuccess={isSuccess} />
    </>
  );
}
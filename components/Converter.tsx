import Image from "next/image";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import CurrentPrice from "./CurrentPrice";
import PriceUpdate from "./PriceUpdate";

const Converter: FC = () => {
  const [fiatAmount, setFiatAmount] = useState<string>("");
  const [satAmount, setSatAmount] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>("");
  const inputFiat = useRef<HTMLInputElement | null>(null);

  const onChangeFiatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const formattedInput = input.endsWith(".") ? input : new Intl.NumberFormat("en-US").format(+input);
    setFiatAmount(formattedInput);
    // format output
    const converted = ((+input / price!) * 100_000_000).toFixed(0);
    const formatted = new Intl.NumberFormat("en-US").format(+converted);
    setSatAmount(formatted);
  };

  const onChangeSatHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const formattedInput = input.endsWith(".") ? input : new Intl.NumberFormat("en-US").format(+input);
    setSatAmount(formattedInput);
    // format output
    const converted = ((+input * price!) / 100_000_000).toFixed(2);
    const formatted = new Intl.NumberFormat("en-US").format(+converted);
    setFiatAmount(formatted);
  };

  useEffect(() => {
    fetchData();

    if (inputFiat.current) {
      inputFiat.current.focus();
    }
  }, []);

  const fetchData = () => {
    fetch("/api/price")
      .then((res) => res.json())
      .then((data: { price: number; date: string }) => {
        setPrice(data.price);
        setDate(data.date);
        setFormattedPrice(
          new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            currency: "EUR",
          }).format(data.price)
        );
      });
  };

  return (
    <>
      <section className="flex w-11/12 flex-col items-center rounded border border-blue-400 bg-white shadow-md md:w-auto">
        <CurrentPrice formattedPrice={formattedPrice} />
        {/* input 1 */}
        <article className="flex w-full justify-center rounded-t-xl p-10">
          <input
            ref={inputFiat}
            id="input-fiat"
            className="input-underscore"
            type="text"
            inputMode="decimal"
            value={fiatAmount}
            onChange={onChangeFiatHandler}
          ></input>
          <label className="w-1/12 p-2" htmlFor="input-fiat">
            €
          </label>
        </article>
        {/* input 2 */}
        <article className="flex w-full justify-center rounded-b-xl p-10">
          <input
            id="input-sat"
            className="input-underscore"
            type="text"
            inputMode="decimal"
            value={satAmount}
            onChange={onChangeSatHandler}
          ></input>
          <label className="w-1/12 p-2" htmlFor="input-sat">
            SATS
          </label>
        </article>
      </section>
      <PriceUpdate date={date} />
    </>
  );
};

export default Converter;
